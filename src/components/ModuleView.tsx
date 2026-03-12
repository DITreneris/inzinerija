import { useState, useEffect, useCallback, useMemo, useRef, memo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, AlertTriangle, RefreshCw, Play, RotateCcw, Sparkles } from 'lucide-react';
import { spacingClasses, radiusClasses } from '../design-tokens';
import { Progress } from '../utils/progress';
import { getModulesSync, preloadModules } from '../data/modulesLoader';
import { useLocale } from '../contexts/LocaleContext';
import { useSlideNavigation } from '../utils/useSlideNavigation';
import { LoadingSpinner } from './ui';
import { ModuleCompleteScreen } from './ModuleCompleteScreen';
import ErrorBoundary from './ui/ErrorBoundary';
import { selectQuestions } from '../utils/questionPoolSelector';
import { buildSlideGroups, type SlideGroup } from '../utils/slidePhaseConfig';
import { track } from '../utils/analytics';
import type { Slide, TestQuestion } from '../types/modules';
import SlideContent from './SlideContent';

const FAST_TRACK_KEY = 'prompt-anatomy-fast-track';

function getFastTrack(): boolean {
  try {
    return localStorage.getItem(FAST_TRACK_KEY) === '1';
  } catch {
    return false;
  }
}

/** Map phase labels from slidePhaseConfig to module namespace translation keys (for EN/LT UI). */
const PHASE_LABEL_TO_KEY: Record<string, string> = {
  'Pagrindai': 'phaseBasics',
  'Šablonas': 'phaseTemplate',
  '6 Blokai': 'phase6Blocks',
  'Santrauka': 'phaseSummary',
  'Įvadas': 'phaseIntro',
  'Teorija': 'phaseTheory',
  'RAG': 'phaseRAG',
  'Deep research': 'phaseDeepResearch',
  'Tokenai': 'phaseTokens',
  'Manipuliacijos': 'phaseManipulations',
  'Skyrius': 'phaseSection',
  'Kelionė': 'phaseJourney',
  'Savitikra': 'phaseSelfCheck',
  'Testas': 'phaseTest',
  'Praktika': 'phasePractice',
  'Sprintas': 'phaseSprint',
  'Pagalba': 'phaseHelp',
  'Projektas': 'phaseProject',
  'COMBO ir HTML': 'phaseComboHtml',
  'SUPER': 'phaseSuper',
  'Refleksija': 'phaseReflection',
  'Duomenų tvarkymas': 'phaseDataHandling',
  'Custom GPT': 'phaseCustomGpt',
  'Vaizdai': 'phaseImages',
  'Video': 'phaseVideo',
  'Muzika': 'phaseMusic',
  'Verslas': 'phaseBusiness',
  'Kita': 'phaseOther',
};

/* ─── Slide Group Progress Bar ─── */

function SlideGroupProgressBar({
  groups,
  currentSlide,
  totalSlides,
  getPhaseDisplayLabel,
}: {
  groups: SlideGroup[];
  currentSlide: number;
  totalSlides: number;
  getPhaseDisplayLabel: (label: string) => string;
}) {
  if (groups.length <= 1 && !groups[0]?.label) return null;

  const activeGroupIdx = groups.findIndex(
    (g) => currentSlide >= g.startIdx && currentSlide <= g.endIdx
  );

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {groups.map((group, idx) => {
        const groupSize = group.endIdx - group.startIdx + 1;
        const widthPct = (groupSize / totalSlides) * 100;
        const isActive = idx === activeGroupIdx;
        const isPast = idx < activeGroupIdx;
        // Progress within this group
        const groupProgress = isActive
          ? ((currentSlide - group.startIdx + 1) / groupSize) * 100
          : isPast
          ? 100
          : 0;
        const displayLabel = getPhaseDisplayLabel(group.label);

        return (
          <div
            key={idx}
            className="flex flex-col items-center gap-0.5"
            style={{ width: `${widthPct}%`, minWidth: '40px' }}
          >
            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isActive
                    ? 'bg-brand-500 dark:bg-brand-400'
                    : isPast
                    ? 'bg-emerald-400 dark:bg-emerald-600'
                    : 'bg-transparent'
                }`}
                style={{ width: `${groupProgress}%` }}
              />
            </div>
            {group.label && (
              <span
                className={`text-[10px] font-medium max-w-full text-center break-words ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : isPast
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
                title={displayLabel}
              >
                {displayLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ModuleViewProps {
  moduleId: number;
  /** F2-3: open module at this slide index (remediation deep link) */
  initialSlideIndex?: number | null;
  onClearInitialSlideIndex?: () => void;
  onBack: () => void;
  onComplete: (moduleId: number) => void;
  onTaskComplete: (moduleId: number, taskId: number, testScore?: number) => void;
  onContinueToNext: (currentModuleId: number) => void;
  onGoToModule?: (moduleId: number, slideIndex?: number, fromRemediationSourceModuleId?: number) => void;
  onGoToGlossary?: (slideIndex: number) => void;
  onGoToGlossaryTerm?: (term: string) => void;
  onGoToTools?: (moduleId: number) => void;
  /** A-M3: when set, show "Grįžti į testo rezultatą" and call onReturnToRemediation to go back */
  remediationFrom?: { sourceModuleId: number } | null;
  onReturnToRemediation?: () => void;
  /** Hidden treasure: parsisiųsti sertifikatą (tier 1 po 3 mod., tier 2 po 6 mod. + quiz ≥70%). */
  onRequestCertificate?: (tier: 1 | 2 | 3) => void;
  progress: Progress;
  totalModules: number;
}

function ModuleView({
  moduleId,
  initialSlideIndex,
  onClearInitialSlideIndex,
  onBack,
  onComplete,
  onTaskComplete,
  onContinueToNext,
  onGoToModule,
  onGoToGlossary,
  onGoToGlossaryTerm,
  onGoToTools,
  remediationFrom,
  onReturnToRemediation,
  onRequestCertificate,
  progress,
  totalModules,
}: ModuleViewProps) {
  const { t } = useTranslation(['module', 'common']);
  const { locale } = useLocale();
  const modules = getModulesSync(locale);

  const getPhaseDisplayLabel = useCallback(
    (label: string) => (PHASE_LABEL_TO_KEY[label] ? t(`module:${PHASE_LABEL_TO_KEY[label]}`) : label),
    [t]
  );

  // ─── Question Pool: Module 2 enrichment ───
  const prevPoolModuleRef = useRef<number | null>(null);
  const poolRef = useRef<TestQuestion[] | null>(null);

  // Regenerate pool when entering Module 2 (each visit = new random set)
  if (moduleId === 2 && prevPoolModuleRef.current !== 2) {
    poolRef.current = selectQuestions(locale);
  }
  prevPoolModuleRef.current = moduleId;

  const module = useMemo(() => {
    const raw = modules?.find((m) => m.id === moduleId);
    if (!raw) return raw;

    // Module 2: collapse test-section slides into one with pool questions + bonus slides after test
    if (moduleId === 2 && poolRef.current) {
      const testIntro = raw.slides.find((s) => s.type === 'test-intro');
      const testResults = raw.slides.find((s) => s.type === 'test-results');
      const bonusSlides = raw.slides.filter((s) => s.id === 51 || s.id === 52);

      const enrichedIntro: Slide | null = testIntro
        ? {
            ...testIntro,
            title: t('module:m2TestTitle'),
            subtitle: t('module:m2TestSubtitle'),
          }
        : null;

      const singleTestSection: Slide = {
        id: 21,
        title: t('module:m2TestTitle'),
        subtitle: t('module:m2TestSubtitle'),
        type: 'test-section',
        testQuestions: poolRef.current,
      };

      return {
        ...raw,
        subtitle: t('module:m2TestSubtitle'),
        slides: [
          ...(enrichedIntro ? [enrichedIntro] : []),
          singleTestSection,
          ...(testResults ? [testResults] : []),
          ...bonusSlides,
        ],
      };
    }

    // Module 8: bonus slides (801, 802) tik po testo rezultatų – ta pati logika kaip M2
    if (moduleId === 8 && raw.slides) {
      const bonusSlides = raw.slides.filter((s) => s.id === 801 || s.id === 802);
      const mainSlides = raw.slides.filter((s) => s.id !== 801 && s.id !== 802);
      if (bonusSlides.length > 0) {
        return {
          ...raw,
          slides: [...mainSlides, ...bonusSlides],
        };
      }
    }

    return raw;
  }, [modules, moduleId, t]);
  const moduleIndex = useMemo(
    () => modules?.findIndex((m) => m.id === moduleId) ?? -1,
    [modules, moduleId]
  );
  const isLastModule = useMemo(
    () =>
      moduleIndex >= 0 && moduleIndex === (modules?.length ?? 0) - 1,
    [moduleIndex, modules?.length]
  );

  const [resumeDecided, setResumeDecided] = useState(false);
  const [resumeImmediate, setResumeImmediate] = useState(false);
  const [fastTrack, setFastTrack] = useState(() => getFastTrack());

  /** MVP Analytics: slide_view / slide_complete with time_on_slide */
  const slideEnterTimeRef = useRef<number>(Date.now());
  const prevSlideIndexRef = useRef<number | null>(null);

  const {
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    isFirstSlide,
    isLastSlide,
    hasIncompletePracticalTask,
    slideProgress: _slideProgress,
    currentSlideData,
    handleTouchStart,
    handleTouchEnd,
    showModuleComplete,
    setShowModuleComplete,
    savedSlidePosition,
  } = useSlideNavigation({
    module,
    moduleId,
    progress,
    onComplete,
    resumeImmediately: resumeImmediate,
    initialSlideIndex,
    skipOptional: fastTrack,
  });

  const toggleFastTrack = useCallback(() => {
    setFastTrack((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(FAST_TRACK_KEY, next ? '1' : '0');
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Show resume prompt if user has saved position > 0 (skip when opening via F2-3 deep link)
  const showResumePrompt = !resumeDecided && savedSlidePosition > 0 && initialSlideIndex == null;

  const handleResumeFromSaved = useCallback(() => {
    setResumeImmediate(true);
    setCurrentSlide(savedSlidePosition);
    setResumeDecided(true);
  }, [savedSlidePosition, setCurrentSlide]);

  const handleStartFromBeginning = useCallback(() => {
    setCurrentSlide(0);
    setResumeDecided(true);
  }, [setCurrentSlide]);

  // Reset resume state when module changes
  useEffect(() => {
    setResumeDecided(false);
    setResumeImmediate(false);
  }, [moduleId]);

  // F2-3: when opening via remediation deep link, skip resume prompt and clear so Back doesn't reuse
  useEffect(() => {
    if (initialSlideIndex != null) {
      setResumeDecided(true);
      onClearInitialSlideIndex?.();
    }
  }, [initialSlideIndex, onClearInitialSlideIndex]);

  const handleTaskComplete = useCallback(
    (taskId: number, testScore?: number) => {
      if (!progress.completedTasks[moduleId]?.includes(taskId)) {
        onTaskComplete(moduleId, taskId, testScore);
      }
    },
    [progress.completedTasks, moduleId, onTaskComplete]
  );

  const isModuleCompleted = useMemo(
    () => progress.completedModules.includes(moduleId),
    [progress.completedModules, moduleId]
  );
  const hasIncompleteCurrentTestSection = useMemo(() => {
    if (!currentSlideData || currentSlideData.type !== 'test-section') return false;
    return !progress.completedTasks[moduleId]?.includes(currentSlideData.id);
  }, [currentSlideData, progress.completedTasks, moduleId]);
  const isNextDisabled = hasIncompletePracticalTask || hasIncompleteCurrentTestSection;

  /** Modulio 3 / 9: scenarijų skaidrės (indeksas, id, pavadinimas) – progresui ir navigacijai */
  const practiceScenarioSlides = useMemo(() => {
    if (!module) return [];
    return module.slides
      .map((s, i) => ({ slideIndex: i, slideId: s.id, title: s.title, type: s.type }))
      .filter((x) => x.type === 'practice-scenario');
  }, [module]);

  /** Modulio 3 / 9: santraukos skaidrės indeksas – kad iš bet kurio scenarijaus galėtų išeiti į santrauką */
  const practiceSummarySlideIndex = useMemo(() => {
    if (!module) return null;
    const idx = module.slides.findIndex((s) => s.type === 'practice-summary');
    return idx >= 0 ? idx : null;
  }, [module]);

  const onNavigateToSlide = useCallback(
    (slideIndex: number) => {
      setCurrentSlide(slideIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setCurrentSlide]
  );

  const onGoToSummary = useCallback(() => {
    if (practiceSummarySlideIndex != null) {
      onNavigateToSlide(practiceSummarySlideIndex);
    }
  }, [practiceSummarySlideIndex, onNavigateToSlide]);

  /** Modulio 9: iš hub naviguoti į scenarijaus skaidrę pagal slide id */
  const onNavigateToSlideById = useCallback(
    (slideId: number) => {
      if (!module?.slides) return;
      const idx = module.slides.findIndex((s) => s.id === slideId);
      if (idx >= 0) onNavigateToSlide(idx);
    },
    [module?.slides, onNavigateToSlide]
  );

  /** M9 žaidimo logika: po scenarijaus grįžti į to paties veikėjo 4 užduotis (hub su pasirinktu veikėju) */
  const [returnToHubWithLevel1, setReturnToHubWithLevel1] = useState<number | null>(null);
  const hubSlideIndex = useMemo(
    () => (module?.slides ? module.slides.findIndex((s) => s.id === 99) : -1),
    [module?.slides]
  );
  const handleNextOrReturnToHub = useCallback(() => {
    if (
      moduleId === 9 &&
      currentSlideData?.type === 'practice-scenario' &&
      (currentSlideData as { characterId?: number }).characterId != null &&
      module?.slides &&
      hubSlideIndex >= 0
    ) {
      const characterId = (currentSlideData as { characterId: number }).characterId;
      setReturnToHubWithLevel1(characterId - 1);
      onNavigateToSlide(hubSlideIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      nextSlide();
    }
  }, [moduleId, currentSlideData, module?.slides, hubSlideIndex, onNavigateToSlide, nextSlide]);

  useEffect(() => {
    if (module && currentSlide < module.slides.length && hubSlideIndex >= 0 && currentSlide === hubSlideIndex && returnToHubWithLevel1 != null) {
      const t = setTimeout(() => setReturnToHubWithLevel1(null), 50);
      return () => clearTimeout(t);
    }
  }, [currentSlide, hubSlideIndex, module, returnToHubWithLevel1]);

  /** M9 įvade: paspaudus veikėją – atidaryti hub su tuo veikėju (initialLevel1). */
  const onNavigateToHubWithCharacter = useCallback(
    (characterIndex: number) => {
      if (moduleId !== 9 || hubSlideIndex < 0 || !module?.slides) return;
      setReturnToHubWithLevel1(characterIndex);
      onNavigateToSlide(hubSlideIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [moduleId, hubSlideIndex, module?.slides, onNavigateToSlide]
  );

  /** MVP Analytics: on "Baigti" / next from last slide – track slide_complete for last slide before showing complete screen */
  const handleNextOrCompleteClick = useCallback(() => {
    if (isLastSlide && module && currentSlideData) {
      const timeOnSlideSec = Math.round((Date.now() - slideEnterTimeRef.current) / 1000);
      track('slide_complete', {
        module_id: moduleId,
        slide_id: typeof currentSlideData.id === 'number' ? currentSlideData.id : currentSlide,
        slide_index: currentSlide,
        slide_type: currentSlideData.type ?? undefined,
        time_on_slide_sec: timeOnSlideSec,
      });
    }
    if (moduleId === 9 && currentSlideData?.type === 'practice-scenario') {
      handleNextOrReturnToHub();
    } else {
      nextSlide();
    }
  }, [isLastSlide, module, moduleId, currentSlide, currentSlideData, nextSlide, handleNextOrReturnToHub]);

  /** Po Modulio 3 / 9: grįžti į santraukos skaidrę iš completion ekrano. (Hook turi būti prieš bet kurį early return.) */
  const onViewPart1Summary = useCallback(() => {
    if ((moduleId !== 3 && moduleId !== 9) || !module?.slides?.length) return;
    setShowModuleComplete(false);
    setCurrentSlide(module.slides.length - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [moduleId, module?.slides?.length, setShowModuleComplete, setCurrentSlide]);

  /** Modulio 3 / M9: konkretus CTA tekstas – locale-aware. */
  const nextSlideLabel = useMemo(() => {
    if (!module || (moduleId !== 3 && moduleId !== 9) || currentSlide >= module.slides.length) return null;
    const current = module.slides[currentSlide];
    if (moduleId === 9 && current?.type === 'practice-scenario') return t('module:nextSelectOtherTask');
    if (currentSlide >= module.slides.length - 1) return null;
    const next = module.slides[currentSlide + 1];
    if (next.type === 'practice-scenario-hub') return t('module:nextSelectScenario');
    if (next.type === 'practice-scenario') {
      const scenarioSlides = module.slides.filter((s) => s.type === 'practice-scenario');
      const idx = scenarioSlides.findIndex((s) => s.id === next.id);
      const n = idx >= 0 ? idx + 1 : currentSlide + 2;
      return t('module:nextStartScenarioN', { n });
    }
    if (next.type === 'practice-summary') return t('module:nextToPracticeSummary');
    if (moduleId === 3 && next.type === 'summary') return t('module:nextToPracticeSummary');
    return null;
  }, [module, moduleId, currentSlide, t]);

  /** Kontekstinė etiketė „Tęsti: [2–3 žodžiai]“ – locale-aware. */
  const nextSlideContextLabel = useMemo(() => {
    if (nextSlideLabel) return nextSlideLabel;
    if (!module || isLastSlide || currentSlide + 1 >= module.slides.length) return null;
    const next = module.slides[currentSlide + 1];
    const raw = (next.shortTitle ?? next.title ?? '').trim();
    if (!raw) return null;
    const text = raw
      .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u{FE0F}\u{20E3}]+\s*/u, '')
      .replace(/^(Papildoma|Praktika|Skyrius|Savitikra|Projektas|Pavyzdys iš praktikos)[:\s]+/i, '')
      .replace(/\s*\([^)]*\)?\s*/g, ' ')
      .trim();
    const words = text.split(/\s+/).slice(0, 3);
    const TRAIL_LT = /^(ir|su|iš|ar|be|per|po|nuo|dėl|apie|kaip|savo|kurios|kodėl|tai)$/i;
    const TRAIL_EN = /^(and|with|from|for|the|to|or|of|in|on|a|an|by|at|into|as)$/i;
    const TRAIL = locale === 'en' ? TRAIL_EN : TRAIL_LT;
    while (words.length > 1 && TRAIL.test(words[words.length - 1])) words.pop();
    let label = words.join(' ').replace(/[,:;\u2013\u2014?!\u2026.]+$/, '').trim();
    if (label.length < 3 && text.length > 0) label = text.split(/\s+/).slice(0, 2).join(' ');
    if (label.length > 20) return t('continueShort');
    return t('module:nextContinueWith', { label });
  }, [nextSlideLabel, module, isLastSlide, currentSlide, t, locale]);

  const nextButtonLabel = nextSlideLabel ?? nextSlideContextLabel;

  useEffect(() => {
    if (!modules) return;
    preloadModules();
  }, [modules]);

  /** MVP Analytics: on slide change – slide_complete for previous, slide_view for current */
  useEffect(() => {
    if (!module?.slides?.length || currentSlideData == null) return;
    const prevIdx = prevSlideIndexRef.current;
    const slides = module.slides;

    if (prevIdx !== null && prevIdx !== currentSlide && prevIdx >= 0 && prevIdx < slides.length) {
      const prevSlideData = slides[prevIdx];
      const timeOnSlideSec = Math.round((Date.now() - slideEnterTimeRef.current) / 1000);
      track('slide_complete', {
        module_id: moduleId,
        slide_id: typeof prevSlideData.id === 'number' ? prevSlideData.id : prevIdx,
        slide_index: prevIdx,
        slide_type: prevSlideData.type ?? undefined,
        time_on_slide_sec: timeOnSlideSec,
      });
    }

    track('slide_view', {
      module_id: moduleId,
      slide_id: typeof currentSlideData.id === 'number' ? currentSlideData.id : currentSlide,
      slide_index: currentSlide,
      slide_type: currentSlideData.type ?? undefined,
    });

    prevSlideIndexRef.current = currentSlide;
    slideEnterTimeRef.current = Date.now();
  }, [moduleId, module?.slides, currentSlide, currentSlideData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  /** MVP Analytics D4: nudge prieš išeinant – jei modulyje peržiūrėta 1+ skaidrė ir < 80 % */
  useEffect(() => {
    if (!module?.slides?.length) return;
    const total = module.slides.length;
    const viewed = currentSlide + 1;
    const pct = viewed / total;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (viewed > 1 && pct < 0.8) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [module?.slides?.length, currentSlide]);

  // Show loading if modules not yet loaded
  if (!modules) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text={t('common:loading')} />
      </div>
    );
  }

  // Module not in list (e.g. MVP mode: 4–6 locked) – show fallback and back
  if (!module) {
    return (
      <div className="space-y-6">
        <div className="card p-4 md:p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg px-3 py-2 min-h-[44px]"
            aria-label={t('module:backToModules')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('module:backToModules')}</span>
          </button>
        </div>
        <div className="card p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t('notAccessible')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('notAccessibleHint')}
          </p>
        </div>
      </div>
    );
  }

  // Show loading if current slide data is not available
  if (!currentSlideData) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text={t('slideShort')} />
      </div>
    );
  }

  // Resume prompt – rodomas tik kai vartotojas turi saved poziciją
  if (showResumePrompt && module) {
    return (
      <div className="space-y-6">
        <div className="card p-4 md:p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg px-3 py-2 min-h-[44px]"
            aria-label={t('module:backToModules')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('module:backToModules')}</span>
          </button>
        </div>

        <div className="card p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-full mb-6">
            <Play className="w-10 h-10 text-brand-600 dark:text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {t('module:resumeWelcome')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-md">
            {t('module:resumeFromSlide', { n: savedSlidePosition + 1, total: module.slides.length })}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {t('module:resumeModuleLabel')} {module.title}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleResumeFromSaved}
              className="btn-primary flex items-center justify-center gap-2 min-h-[48px] px-6"
            >
              <Play className="w-5 h-5" />
              {t('module:resumeContinueFrom', { n: savedSlidePosition + 1 })}
            </button>
            <button
              onClick={handleStartFromBeginning}
              className="btn-secondary flex items-center justify-center gap-2 min-h-[48px] px-6"
            >
              <RotateCcw className="w-5 h-5" />
              {t('module:resumeStartOver')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showModuleComplete && module && modules) {
    return (
      <ModuleCompleteScreen
        module={module}
        moduleIndex={moduleIndex}
        totalModules={totalModules}
        modules={modules}
        progress={progress}
        onBack={onBack}
        onContinueToNext={onContinueToNext}
        isLastModule={isLastModule}
        onViewPart1Summary={moduleId === 3 ? onViewPart1Summary : undefined}
        onRequestCertificate={onRequestCertificate}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* A-M3: Remediation return – grįžti į testo rezultatą */}
      {remediationFrom && onReturnToRemediation && (
        <div className="rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/20 p-3 md:p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-brand-800 dark:text-brand-200">
            {t('remediationBannerText', { moduleId: remediationFrom.sourceModuleId })}
          </p>
          <button
            type="button"
            onClick={onReturnToRemediation}
            className="btn-primary flex items-center gap-2 shrink-0 px-4 py-2 min-h-[44px]"
            aria-label={t('backToTestResult')}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToTestResult')}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="card p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg px-3 py-2 min-h-[44px]"
            aria-label={t('module:backToModules')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t('module:backToModules')}</span>
            <span className="sm:hidden">{t('module:backShort')}</span>
          </button>

          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2" aria-label={t('slideOf', { current: currentSlide + 1, total: module.slides.length })}>
              <span>{t('slideShort')}</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                {currentSlide + 1} / {module.slides.length} {t('slidesSuffix')}
              </span>
            </span>
            {module.slides.some((s) => s.optional) && (
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={fastTrack}
                  onChange={toggleFastTrack}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  aria-label={t('module:fastTrackAria')}
                />
                <span>{t('module:fastTrackLabel')}</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Slide Content (desktop: single column; mobile: full width, bottom nav) */}
      <div className="grid grid-cols-1">
        <div
          className={`card ${spacingClasses.slideWrapper} min-h-[500px] animate-fade-in touch-pan-y ${radiusClasses.card}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label={t('slideNavAria')}
        >
          {currentSlideData.type !== 'action-intro' && !(currentSlideData.type === 'section-break' && currentSlideData.content && typeof (currentSlideData.content as Record<string, unknown>).celebrationText === 'string') && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className={moduleId === 2 || moduleId === 3 ? 'badge-slate' : 'badge-brand'}>
                  {t('moduleLabel', { n: moduleIndex + 1 })}
                </span>
                {isModuleCompleted && (
                  <span className="badge-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t('completedLabel')}
                  </span>
                )}
                {currentSlideData.optional && (
                  currentSlideData.badgeVariant === 'bonus' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-accent-100 to-amber-100 dark:from-accent-900/30 dark:to-amber-900/20 text-accent-800 dark:text-accent-200 border border-accent-200 dark:border-accent-700/50">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
                      {t('bonusLabel')}
                    </span>
                  ) : currentSlideData.badgeVariant === 'optional' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50" aria-label={t('optionalSlideAria')}>
                      {t('common:optional')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
                      {t('additionalLabel')}
                    </span>
                  )
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                {currentSlideData.shortTitle ?? currentSlideData.title}
              </h1>
              {currentSlideData.subtitle != null && (
                <p className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">{currentSlideData.subtitle}</p>
              )}
            </div>
          )}

          {/* Single nav bar; sticky. Compact "12/41" + 2px progress line; Primary CTA = Tęsti */}
          <nav className="sticky top-[var(--app-nav-height,4rem)] z-20 flex flex-col mb-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm" aria-label={t('slideNavBarAria')}>
            <div className="flex items-center justify-between gap-3 py-2">
              <button
                type="button"
                onClick={prevSlide}
                disabled={isFirstSlide}
                className="flex items-center gap-1.5 px-2.5 py-2.5 rounded-lg text-sm font-medium min-h-[44px] min-w-[44px] bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                aria-label={t('prevSlide')}
              >
                <ChevronLeft className="w-5 h-5 shrink-0" aria-hidden />
                <span>{t('backShort')}</span>
              </button>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400 tabular-nums whitespace-nowrap" aria-label={t('slideOf', { current: currentSlide + 1, total: module.slides.length })}>
                <span className="md:hidden">{t('moduleLabel', { n: moduleId })} · </span>
                {currentSlide + 1}/{module.slides.length}
              </span>
              <button
                type="button"
                onClick={handleNextOrCompleteClick}
                disabled={isNextDisabled}
                title={nextSlideContextLabel ?? undefined}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium min-h-[48px] bg-brand-600 dark:bg-brand-500 text-white hover:bg-brand-700 dark:hover:bg-brand-600 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                aria-label={isLastSlide ? t('completeAria') : nextButtonLabel ?? t('nextSlide')}
              >
                <span title={nextSlideContextLabel ?? undefined}>{isLastSlide ? t('complete') : (nextButtonLabel ?? t('continueShort'))}</span>
                {!isLastSlide && <ChevronRight className="w-5 h-5 shrink-0" aria-hidden />}
                {isLastSlide && <CheckCircle className="w-5 h-5 shrink-0" aria-hidden />}
              </button>
            </div>
            <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden" role="presentation" aria-hidden>
              <div
                className="h-full bg-brand-500 dark:bg-brand-400 transition-all duration-500 ease-out"
                style={{ width: `${((currentSlide + 1) / module.slides.length) * 100}%` }}
              />
            </div>
          </nav>

          <ErrorBoundary
            key={currentSlideData.id}
            fallback={
              <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
                <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-full mb-3">
                  <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('module:slideLoadError')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {t('module:slideLoadErrorHint')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4" aria-hidden>
                  {currentSlideData.title} (id: {String(currentSlideData.id)}, type: {currentSlideData.type ?? '—'})
                </p>
                <div className="flex gap-3">
                  <button onClick={() => window.location.reload()} className="btn-secondary flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    {t('module:refresh')}
                  </button>
                  <button onClick={nextSlide} className="btn-primary">
                    {t('module:nextSlide')}
                  </button>
                </div>
              </div>
            }
          >
            <Suspense fallback={<LoadingSpinner size="md" text={t('module:slideShort')} />}>
              <SlideContent
                slide={currentSlideData}
                moduleId={moduleId}
                onTaskComplete={handleTaskComplete}
                progress={progress}
                onGoToModule={onGoToModule}
                onGoToGlossary={onGoToGlossary ? () => onGoToGlossary(currentSlide) : undefined}
                onGoToGlossaryTerm={onGoToGlossaryTerm}
                onGoToTools={onGoToTools}
                onNextSlide={nextSlide}
                practiceScenarioSlides={practiceScenarioSlides}
                onNavigateToSlide={onNavigateToSlide}
                onGoToSummary={moduleId === 3 || moduleId === 9 ? onGoToSummary : undefined}
                onNavigateToSlideById={moduleId === 9 ? onNavigateToSlideById : undefined}
                initialHubLevel1={moduleId === 9 ? returnToHubWithLevel1 : undefined}
                onNavigateToHubWithCharacter={moduleId === 9 ? onNavigateToHubWithCharacter : undefined}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>

      {/* Mobile: Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800 shadow-lg z-30 safe-area-inset-bottom">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={prevSlide}
              disabled={isFirstSlide}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 touch-manipulation"
              aria-label={t('prevSlide')}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{t('backShort')}</span>
            </button>

            <div className="flex items-center justify-center px-2 min-w-[60px] shrink-0" aria-label={t('slideOf', { current: currentSlide + 1, total: module.slides.length })}>
              <p className="text-xs font-medium text-brand-600 dark:text-brand-400 tabular-nums whitespace-nowrap">
                {t('moduleLabel', { n: moduleId })} · {currentSlide + 1}/{module.slides.length}
              </p>
            </div>

            <button
              onClick={handleNextOrCompleteClick}
              disabled={isNextDisabled}
              title={nextSlideContextLabel ?? undefined}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold min-h-[52px] bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md hover:shadow-lg shadow-brand-500/20 hover:from-brand-600 hover:to-brand-700 hover:shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 touch-manipulation"
              aria-label={isLastSlide ? t('completeAria') : nextButtonLabel ?? t('nextSlide')}
            >
              <span className="font-medium truncate max-w-[140px] sm:max-w-none" title={nextSlideContextLabel ?? undefined}>{isLastSlide ? t('complete') : (nextButtonLabel ?? t('continueShort'))}</span>
              {!isLastSlide && <ChevronRight className="w-5 h-5" />}
              {isLastSlide && <CheckCircle className="w-5 h-5" />}
            </button>
          </div>
          {isNextDisabled && (
            <p className="text-xs text-amber-700 dark:text-amber-300 text-center mt-1">
              {hasIncompleteCurrentTestSection
                ? t('nextDisabledMiniTest')
                : t('nextDisabledTask')}
            </p>
          )}
        </div>
      </div>

      {/* Spacer for mobile bottom nav; safe-area for notch/gesture bar */}
      <div className="md:hidden min-h-[5rem] pb-[env(safe-area-inset-bottom)]" />

      {/* Progress info moved below content */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between gap-4">
          {/* Module indicator: skaičius = modulio nr., žalia varnelė = baigtas */}
          <div className="hidden sm:flex flex-col gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-300">{t('modulesProgressHint')}</p>
            <div className="flex items-center gap-2" role="group" aria-label={t('modulesProgressAria')}>
              {modules.map((m, idx) => (
                <div
                  key={m.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    m.id === moduleId
                      ? 'bg-brand-500 text-white scale-110'
                      : progress.completedModules.includes(m.id)
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                  title={m.id === moduleId ? t('moduleDotTitleCurrent', { n: idx + 1 }) : progress.completedModules.includes(m.id) ? t('moduleDotTitleCompleted', { n: idx + 1 }) : t('moduleDotTitle', { n: idx + 1 })}
                >
                  {progress.completedModules.includes(m.id) ? (
                    <CheckCircle className="w-4 h-4" aria-hidden />
                  ) : (
                    idx + 1
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Slide counter */}
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-300">{t('slideShort')}</p>
            <p className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {currentSlide + 1}/{module.slides.length}
            </p>
          </div>
        </div>

        {/* Grouped progress bar */}
        <SlideGroupProgressBar
          groups={buildSlideGroups(module.slides, module.id, locale as 'lt' | 'en')}
          currentSlide={currentSlide}
          totalSlides={module.slides.length}
          getPhaseDisplayLabel={getPhaseDisplayLabel}
        />
        
        <p className="hidden md:block text-xs text-gray-500 dark:text-gray-300 text-center">
          {t('keyboardNavHint')}
        </p>
      </div>

      {/* Slide dots: viena eilutė + horizontalus scroll; gradient mask dešinėje („yra daugiau") */}
      <div className="mt-4 flex justify-center relative">
        <div
          className="flex overflow-x-auto overflow-y-hidden justify-start max-w-full scroll-smooth pb-2 mask-gradient-dots"
          role="group"
          aria-label={t('slideDotsAria', { count: module.slides.length })}
        >
          <div className="flex gap-1 md:gap-2 flex-nowrap justify-start min-w-max mx-auto">
            {module.slides.map((_, idx) => {
              const isLongModule = module.slides.length > 24;
              const sizeClass = isLongModule
                ? 'min-w-[36px] min-h-[36px]'
                : 'min-w-[44px] min-h-[44px]';
              const dotShape =
                idx === currentSlide
                  ? isLongModule
                    ? 'bg-brand-500 w-6 h-2.5 shadow-md'
                    : 'bg-brand-500 w-8 h-3 shadow-md'
                  : isLongModule
                    ? 'w-2.5 h-2.5'
                    : 'w-3 h-3';
              const dotColor =
                idx === currentSlide
                  ? ''
                  : idx < currentSlide
                    ? 'bg-brand-300 dark:bg-brand-700'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400';
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${sizeClass} touch-manipulation ${
                    idx === currentSlide ? 'bg-brand-50 dark:bg-brand-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
                  aria-label={t('goToSlideAria', { n: idx + 1 })}
                  aria-current={idx === currentSlide ? 'true' : 'false'}
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${dotShape} ${idx === currentSlide ? '' : dotColor}`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
// Custom comparison to handle early return case
export default memo(ModuleView, (prevProps, nextProps) => {
  if (prevProps.moduleId !== nextProps.moduleId) return false;
  if (prevProps.remediationFrom?.sourceModuleId !== nextProps.remediationFrom?.sourceModuleId) return false;
  if (
    prevProps.progress.completedModules.length !== nextProps.progress.completedModules.length ||
    JSON.stringify(prevProps.progress.completedTasks) !== JSON.stringify(nextProps.progress.completedTasks)
  ) {
    return false;
  }
  if (prevProps.totalModules !== nextProps.totalModules) return false;
  return true;
});
