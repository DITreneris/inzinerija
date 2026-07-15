import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  memo,
  Suspense,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  focusRingClasses,
  radiusClasses,
  spacingClasses,
  surfaceGlass,
  touchTargetClasses,
} from '../design-tokens';
import CTAButton from './ui/CTAButton';
import { Progress } from '../utils/progress';
import { findJourneyChoiceByStored } from '../utils/moduleJourneyFocus';
import { isSlideLikelyUntranslatedForEn } from '../utils/enPartialCoverage';
import { computeNextSlideContextLabel } from '../utils/navLabel';
import { getM7MacroBlockLabel } from '../utils/m7MacroBlocks';
import { getModulesSync, preloadModules } from '../data/modulesLoader';
import { useLocale } from '../contexts/LocaleContext';
import {
  useSlideNavigation,
  clampSlideIndex,
  getVisiblePosition,
} from '../utils/useSlideNavigation';
import { useCompactViewport } from '../utils/useCompactViewport';
import { LoadingSpinner } from './ui';
import { ModuleCompleteScreen } from './ModuleCompleteScreen';
import ErrorBoundary from './ui/ErrorBoundary';
import { selectQuestions } from '../utils/questionPoolSelector';
import { buildSlideGroups, type SlideGroup } from '../utils/slidePhaseConfig';
import { track } from '../utils/analytics';
import type {
  Slide,
  ActionIntroJourneyContent,
  NewsPortalInfographicContent,
} from '../types/modules';
import { isNewsPortalImmersive } from './slides/news-portal/portalUtils';
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
  Pagrindai: 'phaseBasics',
  Šablonas: 'phaseTemplate',
  '6 Blokai': 'phase6Blocks',
  Santrauka: 'phaseSummary',
  Įvadas: 'phaseIntro',
  Teorija: 'phaseTheory',
  RAG: 'phaseRAG',
  'Deep research': 'phaseDeepResearch',
  Tokenai: 'phaseTokens',
  Manipuliacijos: 'phaseManipulations',
  Skyrius: 'phaseSection',
  Kelionė: 'phaseJourney',
  Savitikra: 'phaseSelfCheck',
  Testas: 'phaseTest',
  Praktika: 'phasePractice',
  Sprintas: 'phaseSprint',
  Pagalba: 'phaseHelp',
  Projektas: 'phaseProject',
  'COMBO ir HTML': 'phaseComboHtml',
  SUPER: 'phaseSuper',
  Refleksija: 'phaseReflection',
  'Duomenų tvarkymas': 'phaseDataHandling',
  'Custom GPT': 'phaseCustomGpt',
  Vaizdai: 'phaseImages',
  Video: 'phaseVideo',
  Muzika: 'phaseMusic',
  Verslas: 'phaseBusiness',
  Kita: 'phaseOther',
  Pamatas: 'phaseFoundation',
  'Pipeline ir promptai': 'phasePipelinePrompts',
  Patikimumas: 'phaseTrustEthics',
  'Analizė ir BI': 'phaseAnalysisBi',
  MASTER: 'phaseMasterPrompt',
  Vizualizacija: 'phaseVisualization',
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
                className={`hidden lg:inline text-[10px] font-medium max-w-full text-center break-words ${
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
  onTaskComplete: (
    moduleId: number,
    taskId: number,
    testScore?: number
  ) => void;
  /** Modulio 7: išsaugoti kelionės fokusą (juostai virš skaidrės) */
  onJourneyFocusChoice?: (moduleId: number, choiceId: string) => void;
  onContinueToNext: (currentModuleId: number) => void;
  onGoToModule?: (
    moduleId: number,
    slideIndex?: number,
    fromRemediationSourceModuleId?: number
  ) => void;
  onGoToGlossary?: (slideIndex: number) => void;
  onGoToGlossaryTerm?: (term: string) => void;
  onGoToTools?: (moduleId: number) => void;
  /** A-M3: when set, show "Grįžti į testo rezultatą" and call onReturnToRemediation to go back */
  remediationFrom?: { sourceModuleId: number } | null;
  onReturnToRemediation?: () => void;
  /** Hidden treasure: parsisiųsti sertifikatą pagal completionArtifacts registry. */
  onRequestCertificate?: (tier: 1 | 2 | 3 | 4 | 5) => void;
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
  onJourneyFocusChoice,
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
    (label: string) =>
      PHASE_LABEL_TO_KEY[label]
        ? t(`module:${PHASE_LABEL_TO_KEY[label]}`)
        : label,
    [t]
  );

  // ─── Question Pool: Module 2 enrichment ───
  const m2Questions = useMemo(
    () => (moduleId === 2 ? selectQuestions(locale) : null),
    [moduleId, locale]
  );

  const module = useMemo(() => {
    const raw = modules?.find((m) => m.id === moduleId);
    if (!raw) return raw;

    // Module 2: collapse test-section slides into one with pool questions + bonus slides after test
    if (moduleId === 2 && m2Questions) {
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
        testQuestions: m2Questions,
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
      const bonusSlides = raw.slides.filter(
        (s) => s.id === 801 || s.id === 802
      );
      const mainSlides = raw.slides.filter((s) => s.id !== 801 && s.id !== 802);
      if (bonusSlides.length > 0) {
        return {
          ...raw,
          slides: [...mainSlides, ...bonusSlides],
        };
      }
    }

    return raw;
  }, [modules, moduleId, t, m2Questions]);
  const moduleIndex = useMemo(
    () => modules?.findIndex((m) => m.id === moduleId) ?? -1,
    [modules, moduleId]
  );
  const isLastModule = useMemo(
    () => moduleIndex >= 0 && moduleIndex === (modules?.length ?? 0) - 1,
    [moduleIndex, modules?.length]
  );

  const [resumeDecided, setResumeDecided] = useState(false);
  const [resumeImmediate, setResumeImmediate] = useState(false);
  const [fastTrack, setFastTrack] = useState(() => getFastTrack());
  const [enPartialNoticeDismissed, setEnPartialNoticeDismissed] =
    useState(false);

  /**
   * Lygis B (M7 keliai): aktyvios teminės šakos pagal pasirinktą fokusą.
   * `null` = fokusas nepasirinktas → rodyti visas skaidres. Tuščias masyvas
   * = pasirinktas fokusas be šakų → tik branduolys.
   */
  const activeBranchIds = useMemo<string[] | null>(() => {
    if (!module) return null;
    const storedFocus = progress.moduleJourneyFocus?.[moduleId];
    if (!storedFocus) return null;
    const journeySlide = module.slides.find(
      (s) => s.type === 'action-intro-journey'
    );
    const choices = (
      journeySlide?.content as ActionIntroJourneyContent | undefined
    )?.journeyChoices;
    const choice = choices
      ? findJourneyChoiceByStored(choices, storedFocus)
      : undefined;
    return choice?.branchIds ?? [];
  }, [module, progress.moduleJourneyFocus, moduleId]);

  const m7JourneyFocusLabel = useMemo(() => {
    if (moduleId !== 7 || !module) return null;
    const storedFocus = progress.moduleJourneyFocus?.[7];
    if (!storedFocus) return null;
    const journeySlide = module.slides.find(
      (s) => s.type === 'action-intro-journey'
    );
    const choices = (
      journeySlide?.content as ActionIntroJourneyContent | undefined
    )?.journeyChoices;
    return choices
      ? (findJourneyChoiceByStored(choices, storedFocus)?.label ?? storedFocus)
      : storedFocus;
  }, [module, moduleId, progress.moduleJourneyFocus]);

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
    handleTouchCancel,
    showModuleComplete,
    setShowModuleComplete,
    savedSlidePosition,
    visibleSlideCount,
    visiblePosition,
  } = useSlideNavigation({
    module,
    moduleId,
    progress,
    onComplete,
    resumeImmediately: resumeImmediate,
    initialSlideIndex,
    skipOptional: fastTrack,
    activeBranchIds,
  });

  useEffect(() => {
    setEnPartialNoticeDismissed(false);
  }, [currentSlideData?.id]);

  const showEnPartialNotice = useMemo(() => {
    if (locale !== 'en' || enPartialNoticeDismissed) return false;
    if (moduleId < 7 || moduleId > 9 || !currentSlideData) return false;
    return isSlideLikelyUntranslatedForEn(
      currentSlideData.title,
      currentSlideData.subtitle
    );
  }, [locale, moduleId, currentSlideData, enPartialNoticeDismissed]);

  const m7MacroBlockLabel = useMemo(() => {
    if (moduleId !== 7 || !currentSlideData) return null;
    const lang = locale === 'en' ? 'en' : 'lt';
    return getM7MacroBlockLabel(currentSlideData.id, lang);
  }, [moduleId, currentSlideData, locale]);

  const isImmersiveNewsPortal = useMemo(() => {
    if (!currentSlideData || currentSlideData.type !== 'infographic') {
      return false;
    }
    return isNewsPortalImmersive(
      currentSlideData.content as NewsPortalInfographicContent | undefined
    );
  }, [currentSlideData]);

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

  /** Lygis B rerun: iš santraukos grįžti į fokuso pasirinkimą (skaidrė 70). */
  const handleRerunFocus = useCallback(() => {
    if (!module) return;
    const idx = module.slides.findIndex(
      (s) => s.type === 'action-intro-journey'
    );
    if (idx >= 0) {
      setShowModuleComplete(false);
      setCurrentSlide(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [module, setCurrentSlide, setShowModuleComplete]);

  const { isCompactNav } = useCompactViewport();
  const mobileCounterClass = isCompactNav ? 'py-1 px-3' : 'py-1.5 px-3';
  const mobileBottomShellClass = isCompactNav ? 'px-3 py-1.5' : 'px-4 py-2';
  const mobileNavButtonClass = isCompactNav
    ? 'px-3 py-2 min-h-[44px]'
    : 'px-4 py-3 min-h-[52px]';
  const mobileBottomSpacerClass = isCompactNav
    ? 'min-h-[3.75rem]'
    : 'min-h-[5rem]';

  // Show resume prompt if user has saved position > 0 (skip when opening via F2-3 deep link)
  const showResumePrompt =
    !resumeDecided && savedSlidePosition > 0 && initialSlideIndex == null;

  /** Resume modal: tas pats skaitiklis kaip navigacijoje (filtruotas kelias), ne pilnas slides[] */
  const resumeSlideLabel = useMemo(() => {
    if (!module?.slides?.length) return { n: 1, total: 1 };
    return {
      n: getVisiblePosition(module.slides, savedSlidePosition, {
        skipOptional: fastTrack,
        activeBranchIds,
      }),
      total: visibleSlideCount,
    };
  }, [
    module?.slides,
    savedSlidePosition,
    fastTrack,
    activeBranchIds,
    visibleSlideCount,
  ]);

  const handleResumeFromSaved = useCallback(() => {
    setResumeImmediate(true);
    setCurrentSlide(
      clampSlideIndex(savedSlidePosition, module?.slides?.length ?? 0)
    );
    setResumeDecided(true);
  }, [savedSlidePosition, setCurrentSlide, module?.slides?.length]);

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
    if (!currentSlideData || currentSlideData.type !== 'test-section')
      return false;
    return !progress.completedTasks[moduleId]?.includes(currentSlideData.id);
  }, [currentSlideData, progress.completedTasks, moduleId]);
  const isNextDisabled =
    hasIncompletePracticalTask || hasIncompleteCurrentTestSection;

  /** Modulio 3 / 9: scenarijų skaidrės (indeksas, id, pavadinimas) – progresui ir navigacijai */
  const practiceScenarioSlides = useMemo(() => {
    if (!module) return [];
    return module.slides
      .map((s, i) => ({
        slideIndex: i,
        slideId: s.id,
        title: s.title,
        type: s.type,
      }))
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
  const [returnToHubWithLevel1, setReturnToHubWithLevel1] = useState<
    number | null
  >(null);
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
      const characterId = (currentSlideData as { characterId: number })
        .characterId;
      setReturnToHubWithLevel1(characterId - 1);
      onNavigateToSlide(hubSlideIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      nextSlide();
    }
  }, [
    moduleId,
    currentSlideData,
    module?.slides,
    hubSlideIndex,
    onNavigateToSlide,
    nextSlide,
  ]);

  useEffect(() => {
    if (
      module &&
      currentSlide < module.slides.length &&
      hubSlideIndex >= 0 &&
      currentSlide === hubSlideIndex &&
      returnToHubWithLevel1 != null
    ) {
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
      const timeOnSlideSec = Math.round(
        (Date.now() - slideEnterTimeRef.current) / 1000
      );
      track('slide_complete', {
        module_id: moduleId,
        slide_id:
          typeof currentSlideData.id === 'number'
            ? currentSlideData.id
            : currentSlide,
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
  }, [
    isLastSlide,
    module,
    moduleId,
    currentSlide,
    currentSlideData,
    nextSlide,
    handleNextOrReturnToHub,
  ]);

  /** Po Modulio 3 / 9: grįžti į santraukos skaidrę iš completion ekrano. (Hook turi būti prieš bet kurį early return.) */
  const onViewPart1Summary = useCallback(() => {
    if ((moduleId !== 3 && moduleId !== 9) || !module?.slides?.length) return;
    setShowModuleComplete(false);
    setCurrentSlide(module.slides.length - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [
    moduleId,
    module?.slides?.length,
    setShowModuleComplete,
    setCurrentSlide,
  ]);

  /** Modulio 3 / M9: konkretus CTA tekstas – locale-aware. */
  const nextSlideLabel = useMemo(() => {
    if (
      !module ||
      (moduleId !== 3 && moduleId !== 9) ||
      currentSlide >= module.slides.length
    )
      return null;
    const current = module.slides[currentSlide];
    if (moduleId === 9 && current?.type === 'practice-scenario')
      return t('module:nextSelectOtherTask');
    if (currentSlide >= module.slides.length - 1) return null;
    const next = module.slides[currentSlide + 1];
    if (next.type === 'practice-scenario-hub')
      return t('module:nextSelectScenario');
    if (next.type === 'practice-scenario') {
      const scenarioSlides = module.slides.filter(
        (s) => s.type === 'practice-scenario'
      );
      const idx = scenarioSlides.findIndex((s) => s.id === next.id);
      const n = idx >= 0 ? idx + 1 : currentSlide + 2;
      return t('module:nextStartScenarioN', { n });
    }
    if (next.type === 'practice-summary')
      return t('module:nextToPracticeSummary');
    if (moduleId === 3 && next.type === 'summary')
      return t('module:nextToPracticeSummary');
    return null;
  }, [module, moduleId, currentSlide, t]);

  /** Kontekstinė etiketė „Tęsti: [2–3 žodžiai]“ – locale-aware. */
  const nextSlideContextLabel = useMemo(() => {
    if (nextSlideLabel) return nextSlideLabel;
    if (!module || isLastSlide || currentSlide + 1 >= module.slides.length)
      return null;
    const next = module.slides[currentSlide + 1];
    const result = computeNextSlideContextLabel(
      next.shortTitle ?? next.title,
      locale === 'en' ? 'en' : 'lt'
    );
    if (result.kind === 'none') return null;
    if (result.kind === 'fallback') return t('continueShort');
    return t('module:nextContinueWith', { label: result.label });
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

    if (
      prevIdx !== null &&
      prevIdx !== currentSlide &&
      prevIdx >= 0 &&
      prevIdx < slides.length
    ) {
      const prevSlideData = slides[prevIdx];
      const timeOnSlideSec = Math.round(
        (Date.now() - slideEnterTimeRef.current) / 1000
      );
      track('slide_complete', {
        module_id: moduleId,
        slide_id:
          typeof prevSlideData.id === 'number' ? prevSlideData.id : prevIdx,
        slide_index: prevIdx,
        slide_type: prevSlideData.type ?? undefined,
        time_on_slide_sec: timeOnSlideSec,
      });
    }

    track('slide_view', {
      module_id: moduleId,
      slide_id:
        typeof currentSlideData.id === 'number'
          ? currentSlideData.id
          : currentSlide,
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
    const total = visibleSlideCount;
    const viewed = visiblePosition;
    const pct = total > 0 ? viewed / total : 0;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (viewed > 1 && pct < 0.8) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [module?.slides?.length, visiblePosition, visibleSlideCount]);

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
        <div className="card p-4 lg:p-6">
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
        <div className="card p-4 lg:p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg px-3 py-2 min-h-[44px]"
            aria-label={t('module:backToModules')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('module:backToModules')}</span>
          </button>
        </div>

        <div className="card p-8 lg:p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-4 rounded-full mb-6">
            <Play className="w-10 h-10 text-brand-600 dark:text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {t('module:resumeWelcome')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-md">
            {t('module:resumeFromSlide', {
              n: resumeSlideLabel.n,
              total: resumeSlideLabel.total,
            })}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {t('module:resumeModuleLabel')} {module.title}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <CTAButton
              onClick={handleResumeFromSaved}
              className="min-h-[48px] px-6"
            >
              <Play className="w-5 h-5" />
              {t('module:resumeContinueFrom', { n: resumeSlideLabel.n })}
            </CTAButton>
            <CTAButton
              variant="secondary"
              onClick={handleStartFromBeginning}
              className="min-h-[48px] px-6"
            >
              <RotateCcw className="w-5 h-5" />
              {t('module:resumeStartOver')}
            </CTAButton>
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
        <div className="rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/20 p-3 lg:p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-brand-800 dark:text-brand-200">
            {t('remediationBannerText', {
              moduleId: remediationFrom.sourceModuleId,
            })}
          </p>
          <CTAButton
            type="button"
            onClick={onReturnToRemediation}
            className="shrink-0 px-4 py-2"
            aria-label={t('backToTestResult')}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToTestResult')}
          </CTAButton>
        </div>
      )}

      {/* Header */}
      <div className="card p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg px-3 py-2 min-h-[44px]"
            aria-label={t('module:backToModules')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">
              {t('module:backToModules')}
            </span>
            <span className="sm:hidden">{t('module:backShort')}</span>
          </button>

          <div className="hidden lg:flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span
              className="flex items-center gap-2"
              aria-label={t('slideOf', {
                current: visiblePosition,
                total: visibleSlideCount,
              })}
            >
              <span>{t('slideShort')}</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                {visiblePosition} / {visibleSlideCount} {t('slidesSuffix')}
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
          className={`${isImmersiveNewsPortal ? 'bg-transparent shadow-none border-0 p-0 lg:p-2 lg:pb-24' : 'card'} ${spacingClasses.slideWrapper} min-h-[500px] animate-fade-in touch-pan-y ${isImmersiveNewsPortal ? '' : radiusClasses.card}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          role="region"
          aria-label={t('slideNavAria')}
        >
          {currentSlideData.type !== 'action-intro' &&
            !isImmersiveNewsPortal &&
            !(
              currentSlideData.type === 'section-break' &&
              currentSlideData.content &&
              typeof (currentSlideData.content as Record<string, unknown>)
                .celebrationText === 'string'
            ) && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={
                      moduleId === 2 || moduleId === 3
                        ? 'badge-slate'
                        : 'badge-brand'
                    }
                  >
                    {t('moduleLabel', { n: moduleIndex + 1 })}
                  </span>
                  {isModuleCompleted && (
                    <span className="badge-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {t('completedLabel')}
                    </span>
                  )}
                  {currentSlideData.optional &&
                    (currentSlideData.badgeVariant === 'bonus' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-accent-100 to-amber-100 dark:from-accent-900/30 dark:to-amber-900/20 text-accent-800 dark:text-accent-200 border border-accent-200 dark:border-accent-700/50">
                        <Sparkles
                          className="w-3.5 h-3.5"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        {t('bonusLabel')}
                      </span>
                    ) : currentSlideData.badgeVariant === 'optional' ? (
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50"
                        aria-label={t('optionalSlideAria')}
                      >
                        {t('common:optional')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
                        {t('additionalLabel')}
                      </span>
                    ))}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {currentSlideData.shortTitle ?? currentSlideData.title}
                </h1>
                {currentSlideData.subtitle != null && (
                  <p className="hidden lg:block text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
                    {currentSlideData.subtitle}
                  </p>
                )}
              </div>
            )}

          {/* Immersive: slim progress (desktop) + floating FAB; mobile uses bottom nav only */}
          {isImmersiveNewsPortal ? (
            <>
              <div
                className="hidden lg:block sticky top-[var(--app-nav-height,4rem)] z-20 h-0.5 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
                role="progressbar"
                aria-valuenow={visiblePosition}
                aria-valuemin={1}
                aria-valuemax={visibleSlideCount}
                aria-label={t('slideOf', {
                  current: visiblePosition,
                  total: visibleSlideCount,
                })}
              >
                <div
                  className="h-full bg-brand-500 dark:bg-brand-400 transition-all duration-500 ease-out"
                  style={{
                    width: `${visibleSlideCount > 0 ? (visiblePosition / visibleSlideCount) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="hidden lg:block fixed bottom-6 right-6 z-30">
                <CTAButton
                  type="button"
                  onClick={handleNextOrCompleteClick}
                  disabled={isNextDisabled}
                  title={nextSlideContextLabel ?? undefined}
                  variant="primary"
                  className="px-5 py-3 rounded-xl text-sm min-h-[48px] shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  aria-label={
                    isLastSlide
                      ? t('completeAria')
                      : (nextButtonLabel ?? t('nextSlide'))
                  }
                >
                  <span
                    className="truncate"
                    title={nextSlideContextLabel ?? undefined}
                  >
                    {isLastSlide
                      ? t('complete')
                      : (nextButtonLabel ?? t('continueShort'))}
                  </span>
                  {!isLastSlide && (
                    <ChevronRight className="w-5 h-5 shrink-0" aria-hidden />
                  )}
                  {isLastSlide && (
                    <CheckCircle className="w-5 h-5 shrink-0" aria-hidden />
                  )}
                </CTAButton>
              </div>
            </>
          ) : (
          <nav
            className={`sticky top-[var(--app-nav-height,4rem)] z-20 flex flex-col mb-4 border-b shadow-sm ${surfaceGlass.shell}`}
            aria-label={t('slideNavBarAria')}
          >
            {/* Mobile: compact counter only (buttons are in bottom nav) */}
            <div
              className={`lg:hidden flex items-center justify-center ${mobileCounterClass}`}
            >
              <span
                className="text-xs font-medium text-brand-600 dark:text-brand-400 tabular-nums whitespace-nowrap"
                aria-label={t('slideOf', {
                  current: visiblePosition,
                  total: visibleSlideCount,
                })}
              >
                {t('moduleLabel', { n: moduleId })}
                {m7MacroBlockLabel ? ` · ${m7MacroBlockLabel}` : ''} ·{' '}
                {visiblePosition}/{visibleSlideCount}
              </span>
            </div>
            {/* Desktop (lg+): full nav with Atgal / counter / Tęsti */}
            <div className="hidden lg:flex items-center justify-between gap-3 py-2">
              <CTAButton
                type="button"
                onClick={prevSlide}
                disabled={isFirstSlide}
                variant="secondary"
                className="shrink-0 rounded-lg text-sm font-medium min-w-[44px] whitespace-nowrap bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-none"
                aria-label={t('prevSlide')}
              >
                <ChevronLeft className="w-5 h-5 shrink-0" aria-hidden />
                <span>{t('backShort')}</span>
              </CTAButton>
              <span
                className="text-xs font-medium text-brand-600 dark:text-brand-400 tabular-nums whitespace-nowrap"
                aria-label={t('slideOf', {
                  current: visiblePosition,
                  total: visibleSlideCount,
                })}
              >
                {m7MacroBlockLabel ? (
                  <span className="text-gray-500 dark:text-gray-400 mr-1.5">
                    {m7MacroBlockLabel} ·
                  </span>
                ) : null}
                {visiblePosition}/{visibleSlideCount}
              </span>
              <CTAButton
                type="button"
                onClick={handleNextOrCompleteClick}
                disabled={isNextDisabled}
                title={nextSlideContextLabel ?? undefined}
                variant="primary"
                className="px-5 py-3 rounded-xl text-sm min-h-[48px] shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                aria-label={
                  isLastSlide
                    ? t('completeAria')
                    : (nextButtonLabel ?? t('nextSlide'))
                }
              >
                <span
                  className="truncate"
                  title={nextSlideContextLabel ?? undefined}
                >
                  {isLastSlide
                    ? t('complete')
                    : (nextButtonLabel ?? t('continueShort'))}
                </span>
                {!isLastSlide && (
                  <ChevronRight className="w-5 h-5 shrink-0" aria-hidden />
                )}
                {isLastSlide && (
                  <CheckCircle className="w-5 h-5 shrink-0" aria-hidden />
                )}
              </CTAButton>
            </div>
            <div
              className="h-0.5 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
              role="progressbar"
              aria-valuenow={visiblePosition}
              aria-valuemin={1}
              aria-valuemax={visibleSlideCount}
              aria-label={t('slideOf', {
                current: visiblePosition,
                total: visibleSlideCount,
              })}
            >
              <div
                className="h-full bg-brand-500 dark:bg-brand-400 transition-all duration-500 ease-out"
                style={{
                  width: `${visibleSlideCount > 0 ? (visiblePosition / visibleSlideCount) * 100 : 0}%`,
                }}
              />
            </div>
            {moduleId === 7 && m7JourneyFocusLabel && (
              <div
                className="px-3 py-2 text-center text-xs sm:text-sm font-medium text-brand-800 dark:text-brand-200 bg-brand-50/90 dark:bg-brand-950/50 border-t border-brand-100 dark:border-brand-900/60"
                role="status"
                aria-label={t('module:m7JourneyFocusAria')}
              >
                {t('module:m7JourneyFocus', {
                  label: m7JourneyFocusLabel,
                })}
              </div>
            )}
          </nav>
          )}

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
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 mb-4"
                  aria-hidden
                >
                  {currentSlideData.title} (id: {String(currentSlideData.id)},
                  type: {currentSlideData.type ?? '—'})
                </p>
                <div className="flex gap-3">
                  <CTAButton
                    variant="secondary"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="w-4 h-4" />
                    {t('module:refresh')}
                  </CTAButton>
                  <CTAButton onClick={nextSlide}>
                    {t('module:nextSlide')}
                  </CTAButton>
                </div>
              </div>
            }
          >
            <Suspense
              fallback={
                <LoadingSpinner size="md" text={t('module:slideShort')} />
              }
            >
              {showEnPartialNotice && (
                <div
                  className="mb-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-900 dark:text-amber-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  role="status"
                >
                  <p>{t('module:enPartialContentNotice')}</p>
                  <button
                    type="button"
                    onClick={() => setEnPartialNoticeDismissed(true)}
                    className="text-xs font-semibold underline shrink-0 self-end sm:self-center"
                  >
                    {t('module:enPartialContentDismiss')}
                  </button>
                </div>
              )}
              <SlideContent
                slide={currentSlideData}
                moduleId={moduleId}
                onTaskComplete={handleTaskComplete}
                progress={progress}
                onGoToModule={onGoToModule}
                onGoToGlossary={
                  onGoToGlossary
                    ? () => onGoToGlossary(currentSlide)
                    : undefined
                }
                onGoToGlossaryTerm={onGoToGlossaryTerm}
                onGoToTools={onGoToTools}
                onNextSlide={nextSlide}
                practiceScenarioSlides={practiceScenarioSlides}
                onNavigateToSlide={onNavigateToSlide}
                onGoToSummary={
                  moduleId === 3 || moduleId === 9 ? onGoToSummary : undefined
                }
                onNavigateToSlideById={
                  moduleId === 9 ? onNavigateToSlideById : undefined
                }
                initialHubLevel1={
                  moduleId === 9 ? returnToHubWithLevel1 : undefined
                }
                onNavigateToHubWithCharacter={
                  moduleId === 9 ? onNavigateToHubWithCharacter : undefined
                }
                onJourneyFocusChoice={onJourneyFocusChoice}
                visiblePosition={visiblePosition}
                visibleSlideCount={visibleSlideCount}
              />
            </Suspense>
          </ErrorBoundary>

          {moduleId === 7 &&
            currentSlideData?.type === 'summary' &&
            m7JourneyFocusLabel && (
              <div className="mt-6 rounded-2xl border-2 border-dashed border-brand-300 dark:border-brand-700 bg-brand-50/60 dark:bg-brand-900/20 p-5 sm:p-6 text-center">
                <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {t('module:rerunHint')}
                </p>
                <button
                  type="button"
                  onClick={handleRerunFocus}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-accent-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <RotateCcw className="w-5 h-5 flex-shrink-0" aria-hidden />
                  <span>{t('module:rerunWithNewFocus')}</span>
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Mobile: Bottom Navigation Bar */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 border-t shadow-lg z-30 safe-area-inset-bottom ${surfaceGlass.shell}`}
      >
        <div className={`max-w-7xl mx-auto ${mobileBottomShellClass}`}>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={prevSlide}
              disabled={isFirstSlide}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 touch-manipulation ${mobileNavButtonClass}`}
              aria-label={t('prevSlide')}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium whitespace-nowrap">
                {t('backShort')}
              </span>
            </button>

            <div
              className="hidden lg:flex items-center justify-center px-2 min-w-[60px] shrink-0"
              aria-label={t('slideOf', {
                current: visiblePosition,
                total: visibleSlideCount,
              })}
            >
              <p className="text-xs font-medium text-brand-600 dark:text-brand-400 tabular-nums whitespace-nowrap">
                {t('moduleLabel', { n: moduleId })} · {visiblePosition}/
                {visibleSlideCount}
              </p>
            </div>

            <button
              onClick={handleNextOrCompleteClick}
              disabled={isNextDisabled}
              title={nextSlideContextLabel ?? undefined}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-semibold bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md hover:shadow-lg shadow-brand-500/20 hover:from-brand-600 hover:to-brand-700 hover:shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 touch-manipulation ${mobileNavButtonClass}`}
              aria-label={
                isLastSlide
                  ? t('completeAria')
                  : (nextButtonLabel ?? t('nextSlide'))
              }
            >
              <span
                className="font-medium min-w-0 flex-1 text-center leading-tight line-clamp-2 break-words hyphens-auto"
                title={nextSlideContextLabel ?? undefined}
              >
                {isLastSlide
                  ? t('complete')
                  : (nextButtonLabel ?? t('continueShort'))}
              </span>
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
      <div
        className={`lg:hidden ${mobileBottomSpacerClass} pb-[env(safe-area-inset-bottom)]`}
      />

      {/* Progress info moved below content – hidden on mobile (sticky + bottom bar show progress) */}
      <div className="hidden lg:block mt-6 space-y-3">
        <div className="flex items-center justify-between gap-4">
          {/* Module indicator: skaičius = modulio nr., žalia varnelė = baigtas */}
          <div className="hidden sm:flex flex-col gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {t('modulesProgressHint')}
            </p>
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label={t('modulesProgressAria')}
            >
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
                  title={
                    m.id === moduleId
                      ? t('moduleDotTitleCurrent', { n: idx + 1 })
                      : progress.completedModules.includes(m.id)
                        ? t('moduleDotTitleCompleted', { n: idx + 1 })
                        : t('moduleDotTitle', { n: idx + 1 })
                  }
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
            <p className="text-xs text-gray-500 dark:text-gray-300">
              {t('slideShort')}
            </p>
            <p className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {visiblePosition}/{visibleSlideCount}
            </p>
          </div>
        </div>

        {/* Grouped progress bar */}
        <SlideGroupProgressBar
          groups={buildSlideGroups(
            module.slides,
            module.id,
            locale as 'lt' | 'en'
          )}
          currentSlide={currentSlide}
          totalSlides={module.slides.length}
          getPhaseDisplayLabel={getPhaseDisplayLabel}
        />

        <p className="hidden lg:block text-xs text-gray-500 dark:text-gray-300 text-center">
          {t('keyboardNavHint')}
        </p>
      </div>

      {/* Slide dots: viena eilutė + horizontalus scroll; gradient mask dešinėje („yra daugiau") – hidden on mobile */}
      <div className="hidden lg:flex mt-4 justify-center relative">
        <div
          className="flex overflow-x-auto overflow-y-hidden justify-start max-w-full scroll-smooth pb-2 mask-gradient-dots"
          role="group"
          aria-label={t('slideDotsAria', { count: module.slides.length })}
        >
          <div className="flex gap-1 lg:gap-2 flex-nowrap justify-start min-w-max mx-auto">
            {module.slides.map((_, idx) => {
              const isLongModule = module.slides.length > 24;
              const sizeClass = touchTargetClasses.minimum;
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
                  className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 ${focusRingClasses.brand} ${sizeClass} touch-manipulation ${
                    idx === currentSlide
                      ? 'bg-brand-50 dark:bg-brand-900/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/60'
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
  if (
    prevProps.remediationFrom?.sourceModuleId !==
    nextProps.remediationFrom?.sourceModuleId
  )
    return false;
  if (
    prevProps.progress.completedModules.length !==
      nextProps.progress.completedModules.length ||
    JSON.stringify(prevProps.progress.completedTasks) !==
      JSON.stringify(nextProps.progress.completedTasks) ||
    JSON.stringify(prevProps.progress.moduleJourneyFocus ?? {}) !==
      JSON.stringify(nextProps.progress.moduleJourneyFocus ?? {})
  ) {
    return false;
  }
  if (prevProps.totalModules !== nextProps.totalModules) return false;
  return true;
});
