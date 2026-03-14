import { useState, useEffect, useRef, Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../i18n';
import {
  CheckCircle,
  Sparkles,
  MessageCircle,
  Languages,
  Lightbulb,
  Target,
  Layers,
  Repeat,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
  ArrowRight,
  Zap,
  Copy,
  Wrench,
  BookMarked,
  BookOpen,
  Rocket,
  Trophy,
  TrendingUp,
  Image,
  Cpu,
  Users,
  Briefcase,
  Compass,
  Download,
  Settings,
  User,
  MapPin,
  FileSearch,
} from 'lucide-react';
import { track } from '../../../utils/analytics';
import {
  downloadM6HandoutPdf,
  type M6HandoutContent,
} from '../../../utils/m6HandoutPdf';
import { getM6HandoutContent } from '../../../data/handoutContentLoader';
import { useLocale } from '../../../contexts/LocaleContext';
import {
  CopyButton,
  TemplateBlock,
  ProcessStepper,
  DiPrezentacijosWorkflowBlock,
  FigmaEmbed,
  InstructGptQualityBlock,
  RlProcessBlock,
  AgentWorkflowBlock,
  AgentOrchestratorBlock,
  Schema3InteractiveBlock,
  LlmArchDiagramBlock,
  StrukturuotasProcesasBlock,
  WorkflowChainsBlock,
  TurinioWorkflowBlock,
  LlmAutoregressiveBlock,
  WorkflowComparisonInteractiveBlock,
  RagDuomenuRuosimasBlock,
  ContextEngineeringPipelineDiagram,
} from '../shared';
import { getColorClasses } from '../utils/colorStyles';
import type {
  ActionIntroJourneyContent,
  JourneyChoice,
  DefinitionsContent,
  DiModalitiesContent,
  DiModalityGroup,
  PieChartContent,
  IntroActionPieContent as _IntroActionPieContent,
  AiWorkflowContent,
  IntroContent,
  ModuleIntroContent,
  ContentBlockContent,
  SectionBreakContent,
  WarmUpQuizContent,
  PathStepContent,
  GlossaryContent,
  PromptTypesContent,
  PromptTechniquesContent,
  WorkflowSummaryContent,
  PromptTemplateContent,
  TransitionContent,
  HierarchyContent,
  HierarchyBlock,
  ComparisonContent,
  SummaryContent,
  PracticeSummaryContent,
  ProductivityInfographicContent,
  DiParadoxInfographicContent,
  DiParadoxStatTooltip,
  NewsPortalInfographicContent,
  NewsPortalKpiCard as _NewsPortalKpiCard,
  NewsPortalSectionCard as _NewsPortalSectionCard,
  NewsPortalToolsAndYouth as _NewsPortalToolsAndYouth,
  NewsPortalInsightCard as _NewsPortalInsightCard,
  Slide,
} from '../../../types/modules';
import { renderBodyWithBold, RecognitionExerciseBlock } from './shared';
import {
  ActionIntroSlide,
  type ActionIntroSlideProps,
} from './content/ActionIntroSlide';
import {
  IntroActionPieSlide,
  type IntroActionPieSlideProps,
} from './content/IntroActionPieSlide';
export { ActionIntroSlide, type ActionIntroSlideProps };
export { IntroActionPieSlide, type IntroActionPieSlideProps };

/* ─── StatWithTooltip – skaičius su custom hover/focus tooltip (DI paradoksas) ─── */
function StatWithTooltip({
  value,
  tooltip,
  className = '',
  colorClass = 'text-brand-600 dark:text-brand-400',
}: {
  value: string;
  tooltip?: DiParadoxStatTooltip;
  className?: string;
  colorClass?: string;
}) {
  const id = tooltip
    ? `stat-tooltip-${value.replace(/\s/g, '-')}-${Math.random().toString(36).slice(2, 9)}`
    : undefined;
  return (
    <span
      className={`group/stat relative inline-flex ${tooltip ? 'cursor-help underline decoration-dotted decoration-brand-400/60 underline-offset-2 rounded py-1 px-1.5 -my-1 -mx-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900' : ''} ${colorClass} ${className}`}
      title={tooltip ? undefined : undefined}
      aria-label={tooltip ? `${value}: ${tooltip.explanation}` : undefined}
      aria-describedby={tooltip ? id : undefined}
      tabIndex={tooltip ? 0 : undefined}
    >
      {value}
      {tooltip && id && (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2 text-xs text-left text-white bg-slate-800 dark:bg-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover/stat:opacity-100 group-hover/stat:visible group-focus/stat:opacity-100 group-focus/stat:visible transition-opacity duration-150 z-50"
        >
          <span className="block">{tooltip.explanation}</span>
          {tooltip.trend && (
            <span className="mt-1 block text-accent-300 font-medium border-t border-slate-600 pt-1.5">
              Tendencija: {tooltip.trend}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/* ActionIntroSlide exported from ./content/ActionIntroSlide */

/* ─── Action Intro Journey (Modulio 7) – pasirink savo kelionę, tada CTA tęsti ─── */
const JOURNEY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  TrendingUp,
  Image,
  Cpu,
  Users,
  Briefcase,
  Compass,
  Sparkles,
};

export interface ActionIntroJourneySlideProps {
  content: ActionIntroJourneyContent;
  onJourneyComplete?: () => void;
}

export function ActionIntroJourneySlide({
  content,
  onJourneyComplete,
}: ActionIntroJourneySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const [selected, setSelected] = useState<JourneyChoice | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const journeyHeading = content.journeyHeading ?? t('journeyHeading');
  const confirmMessage = content.confirmMessage ?? t('journeyConfirmMessage');
  const ctaContinue = content.ctaContinue ?? t('journeyStartCta');

  const handleConfirm = () => {
    setConfirmed(true);
    onJourneyComplete?.();
  };

  return (
    <div className="space-y-6">
      {/* Hero – tamsus, provokuojantis */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-6 sm:p-8 lg:p-10 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-3 right-5 text-[90px] sm:text-[110px] font-black leading-none select-none">
            ?
          </div>
          <div className="absolute bottom-3 left-5 text-[90px] sm:text-[110px] font-black leading-none select-none">
            !
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 max-w-lg mx-auto">
          {content.whyBenefit && (
            <p className="text-sm sm:text-base text-brand-200 dark:text-brand-300 font-medium leading-snug max-w-md">
              {content.whyBenefit}
            </p>
          )}
          <h2 className="text-lg lg:text-xl font-bold tracking-tight leading-tight">
            {content.heroStat}
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">
              {content.heroText}
            </span>
          </h2>
          {content.heroSubText && (
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 font-medium leading-relaxed max-w-sm">
              {content.heroSubText}
            </p>
          )}
        </div>
      </div>

      {/* Kelionės pasirinkimas – kortelės */}
      <div className="animate-fade-in">
        <h3 className="text-center text-base font-bold text-gray-900 dark:text-white mb-4">
          {journeyHeading}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {content.journeyChoices.map((choice) => {
            const IconComponent =
              (choice.icon && JOURNEY_ICONS[choice.icon]) || Compass;
            const isSelected = selected?.id === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => setSelected(choice)}
                aria-pressed={isSelected}
                className={`relative flex flex-col items-start text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-lg shadow-brand-500/20 ring-2 ring-brand-200 dark:ring-brand-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md'
                }`}
              >
                <span className="flex items-center gap-3 mb-2">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-xl ${isSelected ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {choice.label}
                  </span>
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {choice.subtitle}
                </span>
                {isSelected && (
                  <span
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Patvirtinimas + CTA po pasirinkimo */}
      {selected && !confirmed && (
        <div className="animate-slide-in rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 p-5 sm:p-6">
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
            {confirmMessage.replace('{label}', selected.label)}
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-accent-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
          >
            <Rocket className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span>{ctaContinue}</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      )}

      {confirmed && (
        <div className="animate-fade-in flex items-center gap-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 px-4 py-3">
          <CheckCircle
            className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Kelionė pasirinkta. Gali pereiti prie kitos skaidrės.
          </p>
        </div>
      )}
    </div>
  );
}

// Survives remounts so "Atidaryti visus" / "Suskleisti visus" state is restored when ContentBlockSlide remounts.
const collapsibleStateCache = new Map<string, Record<number, boolean>>();

function getCollapsibleSignature(
  sections: { collapsible?: boolean; collapsedByDefault?: boolean }[]
): string {
  return JSON.stringify(
    sections
      .map((s, idx) =>
        s.collapsible ? `${idx}:${s.collapsedByDefault ?? true}` : null
      )
      .filter(Boolean)
  );
}

/** Collapsible turi taupyti vietą – neapsunkinti UI. Viena eilutė ar labai trumpas tekstas rodomas kaip paprastas blokas. Sekcijos su lentele arba su copyable nelaikomos trumpomis – gali būti collapsible. */
function isShortContent(section: {
  body?: string;
  table?: { rows?: unknown[] };
  copyable?: string;
}): boolean {
  if (section.table?.rows?.length) return false;
  if ((section.copyable ?? '').trim().length > 0) return false;
  const body = (section.body ?? '').trim();
  if (body.length < 180) return true;
  const lines = body.split(/\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1 && body.length < 280) return true;
  return false;
}

export function ContentBlockSlide({
  content,
  slide,
  moduleId,
  onGoToTools,
}: {
  content: ContentBlockContent;
  slide?: Slide;
  moduleId?: number;
  onGoToTools?: (moduleId: number) => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const tQuiz = getT('quiz');
  const { locale } = useLocale();
  const isDiVisata = !!content.comparisonImages;
  const isBonusSlide =
    slide?.id === 51 ||
    slide?.id === 52 ||
    slide?.id === 801 ||
    slide?.id === 802;
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [showCorrectPromptSolution, setShowCorrectPromptSolution] =
    useState(false);
  const [correctPromptUserText, setCorrectPromptUserText] = useState('');
  const sectionsList = content.sections ?? [];
  const collapsibleSections = sectionsList.filter(
    (s) => Boolean(s.collapsible) && !isShortContent(s)
  );
  const hasCollapsibleSections = collapsibleSections.length > 0;
  const showExpandCollapseAll =
    hasCollapsibleSections && collapsibleSections.length >= 2;
  const isTabsMode = content.displayMode === 'tabs';
  const tabSections = isTabsMode
    ? (content.sections ?? []).slice(1).filter((s) => s.copyable || s.heading)
    : [];
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [briefCheckAnswer, setBriefCheckAnswer] = useState<number | null>(null);
  const [preCopyCheckAnswer, setPreCopyCheckAnswer] = useState<number | null>(
    null
  );
  const practice = content.correctPromptPractice;
  const [selectedToolRowIndex, setSelectedToolRowIndex] = useState<
    number | null
  >(null);
  const tableRowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const slideContainerRef = useRef<HTMLDivElement | null>(null);

  const sectionsSignatureRef = useRef<string | null>(null);
  useEffect(() => {
    const sections = content.sections ?? [];
    const signature = getCollapsibleSignature(sections);
    const skip = sectionsSignatureRef.current === signature;
    if (skip) return;
    sectionsSignatureRef.current = signature;
    const cached = collapsibleStateCache.get(signature);
    if (cached) {
      setOpenSections(cached);
      return;
    }
    const initial: Record<number, boolean> = {};
    sections.forEach((s, idx) => {
      if (s.collapsible) {
        initial[idx] = !(s.collapsedByDefault ?? true);
      }
    });
    setOpenSections(initial);
  }, [content]);

  const expandAll = () => {
    const sections = content.sections ?? [];
    const next: Record<number, boolean> = {};
    sections.forEach((s, idx) => {
      if (s.collapsible) next[idx] = true;
    });
    const signature = getCollapsibleSignature(sections);
    collapsibleStateCache.set(signature, next);
    setOpenSections(next);
  };

  const collapseAll = () => {
    const sections = content.sections ?? [];
    const next: Record<number, boolean> = {};
    sections.forEach((s, idx) => {
      if (s.collapsible) next[idx] = false;
    });
    const signature = getCollapsibleSignature(sections);
    collapsibleStateCache.set(signature, next);
    setOpenSections(next);
  };

  const handleM6HandoutDownload = useCallback(async () => {
    await downloadM6HandoutPdf(
      getM6HandoutContent(locale) as M6HandoutContent,
      undefined,
      locale
    );
  }, [locale]);

  useEffect(() => {
    if (selectedToolRowIndex == null) return;
    const el = tableRowRefs.current[selectedToolRowIndex];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedToolRowIndex]);

  const scrollToFirstAction = useCallback(() => {
    const el = slideContainerRef.current?.querySelector?.(
      '[data-action="copy"]'
    );
    if (el instanceof HTMLElement)
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  const showGotoActionButton =
    !isTabsMode &&
    sectionsList.length > 3 &&
    sectionsList.some((s) => (s.copyable ?? '').trim().length > 0);

  return (
    <div
      ref={slideContainerRef}
      className={`space-y-6 rounded-2xl p-6 -mx-2 sm:-mx-4 ${
        isDiVisata
          ? 'bg-gradient-to-b from-di-visata-bg-top to-di-visata-bg-bottom dark:from-gray-900/80 dark:to-gray-800/90'
          : ''
      }`}
    >
      {/* M1 Faze 3: „Kas čia?“ blokas pirmose skaidrėse – DefinitionsSlide stilius */}
      {content.contextIntro && (
        <div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-4 sm:p-5 text-white"
          role="region"
          aria-label={t('contextIntroAria')}
        >
          <div className="relative z-10 text-center max-w-md mx-auto">
            <p className="text-sm sm:text-base font-bold leading-snug tracking-tight">
              {content.contextIntro}
            </p>
          </div>
        </div>
      )}
      {isBonusSlide && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent-50 to-amber-50 dark:from-accent-900/20 dark:to-amber-900/20 border-l-4 border-accent-500 animate-fade-in"
          role="region"
          aria-label={t('bonusSlideAria')}
        >
          <Sparkles
            className="w-5 h-5 text-accent-600 dark:text-accent-400 shrink-0"
            aria-hidden
          />
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Tu įveikei testą. Čia – papildoma nauda.
          </p>
        </div>
      )}
      {content.whyBenefit && (
        <div
          className="rounded-xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 p-4 border border-accent-200 dark:border-accent-800"
          role="region"
          aria-label={t('whyBenefitAria')}
        >
          <p className="text-sm font-medium text-accent-900 dark:text-accent-100">
            {content.whyBenefit}
          </p>
        </div>
      )}
      {content.comparisonImages && (
        <div className="space-y-6">
          {content.comparisonImages.bridgeText && (
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 border border-brand-200 dark:border-brand-800">
              <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                {content.comparisonImages.bridgeText}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kairė: Dantė – metafora (paprastas vaizdas, GOLDEN §3.2 enlarge nenaudoti) */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-di-visata-dante-paper dark:bg-gray-800/80 border-t-4 border-t-di-visata-dante-accent border border-amber-100 dark:border-amber-900/30 shadow-sm">
              <img
                src={`${import.meta.env.BASE_URL || '/'}${content.comparisonImages.left.src.replace(/^\//, '')}`}
                alt={content.comparisonImages.left.label || ''}
                className="w-full h-auto object-contain rounded-lg border border-amber-200/60 dark:border-amber-800/40 max-h-64"
              />
              {content.comparisonImages.left.label && (
                <p className="text-sm font-semibold text-di-visata-text-muted dark:text-gray-300">
                  {content.comparisonImages.left.label}
                </p>
              )}
              {content.comparisonImages.left.explanation && (
                <p className="text-sm text-di-visata-text-muted dark:text-gray-400 leading-relaxed">
                  {content.comparisonImages.left.explanation}
                </p>
              )}
              {content.comparisonImages.left.source && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  {content.comparisonImages.left.source}
                </p>
              )}
            </div>
            {/* Dešinė: DI visata (paprastas vaizdas, GOLDEN §3.2 enlarge nenaudoti) */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-di-visata-ai-cool dark:bg-gray-800/80 border-t-4 border-t-di-visata-ai-accent border border-blue-100 dark:border-blue-900/30 shadow-sm">
              <img
                src={`${import.meta.env.BASE_URL || '/'}${content.comparisonImages.right.src.replace(/^\//, '')}`}
                alt={content.comparisonImages.right.label || ''}
                className="w-full h-auto object-contain rounded-lg border border-blue-200/60 dark:border-blue-800/40 max-h-64"
              />
              {content.comparisonImages.right.label && (
                <p className="text-sm font-semibold text-di-visata-text-muted dark:text-gray-300">
                  {content.comparisonImages.right.label}
                </p>
              )}
              {content.comparisonImages.right.explanation && (
                <p className="text-sm text-di-visata-text-muted dark:text-gray-400 leading-relaxed">
                  {content.comparisonImages.right.explanation}
                </p>
              )}
              {content.comparisonImages.right.source && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  {content.comparisonImages.right.source}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {content.briefCheckBlock && (
        <div className="p-5 rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="inline-flex p-1.5 rounded-lg bg-accent-500/20">
              <Target className="w-4 h-4 text-accent-600 dark:text-accent-400" />
            </span>
            {t('briefCheckHeading')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {content.briefCheckBlock.question}
          </p>
          <div className="space-y-2">
            {content.briefCheckBlock.options.map((opt, idx) => {
              const isSelected = briefCheckAnswer === idx;
              const isCorrect = idx === content.briefCheckBlock!.correct;
              const showResult = briefCheckAnswer !== null;
              const showAsCorrect = showResult && isCorrect;
              const showAsWrong = showResult && isSelected && !isCorrect;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    briefCheckAnswer === null && setBriefCheckAnswer(idx)
                  }
                  disabled={briefCheckAnswer !== null}
                  className={`w-full text-left p-3 rounded-lg border-2 min-h-[44px] transition-colors ${
                    showResult
                      ? showAsCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : showAsWrong
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600'
                  }`}
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {opt}
                  </span>
                  {showAsCorrect && (
                    <CheckCircle className="w-4 h-4 inline ml-2 text-emerald-600" />
                  )}
                  {showAsWrong && <span className="ml-2 text-rose-600">✗</span>}
                </button>
              );
            })}
          </div>
          {briefCheckAnswer !== null && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>
                {briefCheckAnswer === content.briefCheckBlock!.correct
                  ? tQuiz('correctLabel')
                  : tQuiz('incorrectLabel')}
              </strong>{' '}
              {content.briefCheckBlock!.explanation}
            </p>
          )}
        </div>
      )}
      {content.preCopyCheckBlock && (
        <div className="p-5 rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="inline-flex p-1.5 rounded-lg bg-accent-500/20">
              <Target className="w-4 h-4 text-accent-600 dark:text-accent-400" />
            </span>
            {t('preCopyCheckHeading')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {content.preCopyCheckBlock.question}
          </p>
          <div className="space-y-2">
            {content.preCopyCheckBlock.options.map((opt, idx) => {
              const isSelected = preCopyCheckAnswer === idx;
              const isCorrect = idx === content.preCopyCheckBlock!.correct;
              const showResult = preCopyCheckAnswer !== null;
              const showAsCorrect = showResult && isCorrect;
              const showAsWrong = showResult && isSelected && !isCorrect;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    preCopyCheckAnswer === null && setPreCopyCheckAnswer(idx)
                  }
                  disabled={preCopyCheckAnswer !== null}
                  className={`w-full text-left p-3 rounded-lg border-2 min-h-[44px] transition-colors ${
                    showResult
                      ? showAsCorrect
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : showAsWrong
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600'
                  }`}
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    {opt}
                  </span>
                  {showAsCorrect && (
                    <CheckCircle className="w-4 h-4 inline ml-2 text-emerald-600" />
                  )}
                  {showAsWrong && <span className="ml-2 text-rose-600">✗</span>}
                </button>
              );
            })}
          </div>
          {preCopyCheckAnswer !== null && (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              <strong>
                {preCopyCheckAnswer === content.preCopyCheckBlock!.correct
                  ? tQuiz('correctLabel')
                  : tQuiz('incorrectLabel')}
              </strong>{' '}
              {content.preCopyCheckBlock!.explanation}
            </p>
          )}
        </div>
      )}

      {isTabsMode && tabSections.length > 0 && (
        <div className="space-y-6">
          {(content.sections ?? [])[0] && (
            <div className="p-4 lg:p-5 rounded-xl border-l-4 border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {(content.sections ?? [])[0].heading}
              </h3>
              {(content.sections ?? [])[0].body && (
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {renderBodyWithBold((content.sections ?? [])[0].body)}
                </p>
              )}
            </div>
          )}
          <div
            role="tablist"
            aria-label={t('helpCardsTablistAria')}
            className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-3"
          >
            {tabSections.map((tab, idx) => {
              const label = tab.heading?.includes(':')
                ? tab.heading.split(':')[0].trim()
                : tab.heading || t('cardFallback', { n: idx + 1 });
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`help-tab-panel-${idx}`}
                  id={`help-tab-${idx}`}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`min-h-[44px] px-4 py-2 rounded-t-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                    isActive
                      ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200 border border-brand-300 dark:border-brand-700 border-b-0 -mb-px'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          {tabSections.map((tab, idx) => {
            if (idx !== activeTabIdx) return null;
            const variant = tab.blockVariant || 'default';
            const blockClasses =
              variant === 'accent'
                ? 'bg-accent-50 dark:bg-accent-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-accent-500 border border-accent-200 dark:border-accent-800'
                : variant === 'brand'
                  ? 'bg-brand-50 dark:bg-brand-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-l-brand-500 border border-brand-200 dark:border-brand-800'
                  : variant === 'terms'
                    ? 'bg-slate-50 dark:bg-slate-800/60 p-4 lg:p-5 rounded-xl border-l-4 border-slate-500 dark:border-slate-600 border border-slate-300 dark:border-slate-700'
                    : variant === 'emerald'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-emerald-500 border border-emerald-200 dark:border-emerald-800'
                      : variant === 'violet'
                        ? 'bg-violet-50 dark:bg-violet-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-violet-500 border border-violet-200 dark:border-violet-800'
                        : 'bg-white dark:bg-gray-800 p-4 lg:p-5 rounded-xl border-l-4 border-brand-200 dark:border-brand-800 border border-gray-200 dark:border-gray-700';
            return (
              <div
                key={idx}
                id={`help-tab-panel-${idx}`}
                role="tabpanel"
                aria-labelledby={`help-tab-${idx}`}
                className={blockClasses}
              >
                {tab.heading && (
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    {tab.heading}
                  </h3>
                )}
                {tab.body && (
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
                    {renderBodyWithBold(tab.body)}
                  </p>
                )}
                {tab.copyable && (
                  <TemplateBlock
                    label={tCommon('copy')}
                    template={tab.copyable}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {showExpandCollapseAll && !isTabsMode && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="btn-secondary px-4 py-2 text-sm min-h-[44px] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            aria-label={t('expandAllAria')}
          >
            {t('expandAllLabel')}
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="btn-secondary px-4 py-2 text-sm min-h-[44px] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            aria-label={t('collapseAllAria')}
          >
            {t('collapseAllLabel')}
          </button>
        </div>
      )}

      {showGotoActionButton && (
        <div className="lg:hidden">
          <button
            type="button"
            onClick={scrollToFirstAction}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl font-medium bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700 hover:bg-brand-200 dark:hover:bg-brand-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            aria-label={t('gotoActionAria')}
          >
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
            {t('gotoActionLabel')}
          </button>
        </div>
      )}

      {!isTabsMode &&
        sectionsList.map((section, i) => {
          const isOptional = section.heading
            ?.toLowerCase()
            .includes('(optional)');
          const variant = section.blockVariant || 'default';
          const isBottomLine = isDiVisata && variant === 'accent';
          const isRlDiagramSection = section.image === 'rl_process_diagram';
          const isCollapsible =
            Boolean(section.collapsible) && !isShortContent(section);
          const isOpen = isCollapsible ? Boolean(openSections[i]) : true;
          const contentId = `content-section-${i}`;
          const sectionPadding = isRlDiagramSection ? 'p-4' : 'p-4 lg:p-5';
          const blockClasses = isOptional
            ? 'bg-gray-50 dark:bg-gray-800/70 p-4 lg:p-5 rounded-xl border-l-4 border-gray-300 dark:border-gray-600 border border-gray-200 dark:border-gray-700'
            : isBottomLine
              ? 'bg-white/90 dark:bg-gray-800/90 p-4 lg:p-5 rounded-xl border-l-4 border-l-di-visata-ai-accent border border-blue-200/60 dark:border-blue-800/40 shadow-md'
              : variant === 'accent'
                ? 'bg-accent-50 dark:bg-accent-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-accent-500 border border-accent-200 dark:border-accent-800'
                : variant === 'brand'
                  ? `bg-brand-50 dark:bg-brand-900/20 ${sectionPadding} rounded-xl border-l-4 border-l-brand-500 border border-brand-200 dark:border-brand-800`
                  : variant === 'terms'
                    ? 'bg-slate-50 dark:bg-slate-800/60 p-4 lg:p-5 rounded-xl border-l-4 border-slate-500 dark:border-slate-600 border border-slate-300 dark:border-slate-700'
                    : variant === 'emerald'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-emerald-500 border border-emerald-200 dark:border-emerald-800'
                      : variant === 'violet'
                        ? 'bg-violet-50 dark:bg-violet-900/20 p-4 lg:p-5 rounded-xl border-l-4 border-violet-500 border border-violet-200 dark:border-violet-800'
                        : 'bg-white dark:bg-gray-800 p-4 lg:p-5 rounded-xl border-l-4 border-brand-200 dark:border-brand-800 border border-gray-200 dark:border-gray-700';
          return (
            <Fragment key={i}>
              <div className={blockClasses}>
                {section.heading && !isCollapsible && (
                  <h3
                    className={
                      isOptional
                        ? 'font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2'
                        : isBottomLine
                          ? 'text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2'
                          : 'text-base font-semibold text-gray-900 dark:text-white mb-2'
                    }
                  >
                    {section.heading}
                  </h3>
                )}

                {section.heading && isCollapsible && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSections((prev) => {
                        const next = { ...prev, [i]: !prev[i] };
                        if (
                          !prev[i] &&
                          next[i] &&
                          moduleId != null &&
                          slide?.id != null &&
                          typeof slide.id === 'number'
                        ) {
                          track('collapse_open', {
                            module_id: moduleId,
                            slide_id: slide.id,
                            section_index: i,
                          });
                        }
                        const sig = getCollapsibleSignature(
                          content.sections ?? []
                        );
                        collapsibleStateCache.set(sig, next);
                        return next;
                      });
                    }}
                    className={`w-full flex items-center justify-between gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-lg ${
                      isOptional ? 'mb-2' : 'mb-2'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    aria-label={t('expandCollapseAria', {
                      action: isOpen ? t('collapseLabel') : t('expandLabel'),
                      section: section.heading,
                    })}
                  >
                    <span
                      className={
                        isOptional
                          ? 'font-semibold text-sm text-gray-600 dark:text-gray-400'
                          : isBottomLine
                            ? 'text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-100'
                            : 'text-base font-semibold text-gray-900 dark:text-white'
                      }
                    >
                      {section.heading}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 text-gray-500 dark:text-gray-400 transition-transform ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                )}

                <div
                  id={contentId}
                  className={
                    isCollapsible && !isOpen
                      ? 'hidden'
                      : isCollapsible && isOpen
                        ? 'border-l-4 border-slate-400 dark:border-slate-500 bg-slate-50/50 dark:bg-slate-800/30 pl-4 rounded-r-lg mt-1'
                        : ''
                  }
                  style={
                    isCollapsible && !isOpen ? { display: 'none' } : undefined
                  }
                >
                  {section.presentationToolsBlock &&
                  (() => {
                    const tools =
                      section.presentationTools ?? content.presentationTools;
                    return tools && tools.length > 0;
                  })() ? (
                    <div
                      className="space-y-3"
                      role="region"
                      aria-label={t('presentationToolsAria')}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('presentationToolsHint')}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(
                          section.presentationTools ??
                          content.presentationTools ??
                          []
                        ).map((tool, idx) => (
                          <a
                            key={idx}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col p-3 rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-900/10 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-100/80 dark:hover:bg-brand-900/20 transition-colors group"
                            aria-label={`${tool.name}: ${tool.forWhom}. ${t('openInNewTabHint')}`}
                          >
                            <span className="font-bold text-brand-700 dark:text-brand-300 group-hover:text-brand-800 dark:group-hover:text-brand-200 flex items-center gap-1.5">
                              {tool.name}
                              <ExternalLink
                                className="w-3.5 h-3.5 shrink-0"
                                aria-hidden
                              />
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                              {tool.forWhom}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : section.figmaUrl ? (
                    <figure className="my-4">
                      <FigmaEmbed
                        src={section.figmaUrl}
                        title={
                          section.imageAlt ??
                          section.heading ??
                          t('figmaDiagramTitle')
                        }
                      />
                      {section.body && (
                        <figcaption className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                          {renderBodyWithBold(section.body)}
                        </figcaption>
                      )}
                    </figure>
                  ) : section.image ? (
                    section.image.includes('agent_workflow') ? (
                      <div className="my-4">
                        <AgentWorkflowBlock />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image.includes('agent_orchestrator') ? (
                      <div className="my-4">
                        <AgentOrchestratorBlock />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image.includes('rl_process_diagram') ? (
                      <div className="my-4">
                        <RlProcessBlock
                          moduleId={moduleId}
                          slideId={slide?.id}
                          showHero={false}
                        />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image.includes('di_prezentacijos_workflow') ? (
                      <div className="my-4">
                        <DiPrezentacijosWorkflowBlock />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image.includes('turinio_workflow') ? (
                      <div className="my-4">
                        <TurinioWorkflowBlock />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image.includes('rag_duomenu_ruosimas') ? (
                      <div className="my-4">
                        <RagDuomenuRuosimasBlock />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image.includes('custom_gpt_process') ? (
                      <div className="my-4">
                        <ProcessStepper />
                      </div>
                    ) : section.image.includes('strukturuotas_procesas') ? (
                      <div className="my-4">
                        {section.body && (
                          <p className="mb-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                        <StrukturuotasProcesasBlock />
                      </div>
                    ) : section.image?.includes('llm_arch') ? (
                      <div className="my-4">
                        {section.body && (
                          <p className="mb-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                        <LlmArchDiagramBlock />
                      </div>
                    ) : section.image?.includes('llm_autoregressive') ? (
                      <div className="my-4">
                        <LlmAutoregressiveBlock />
                        {section.body && (
                          <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                      </div>
                    ) : section.image?.includes('schema3') ? (
                      <div className="my-4">
                        {section.body && (
                          <p className="mb-3 text-base text-gray-600 dark:text-gray-400">
                            {renderBodyWithBold(section.body)}
                          </p>
                        )}
                        <Schema3InteractiveBlock />
                      </div>
                    ) : (
                      <figure className="my-4">
                        <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 max-h-80">
                          <img
                            src={`${import.meta.env.BASE_URL || '/'}${section.image.replace(/^\//, '')}`}
                            alt={section.imageAlt ?? section.heading ?? ''}
                            className="w-full h-auto bg-transparent border-0 rounded-lg object-contain"
                          />
                        </div>
                        {section.body && (
                          <figcaption className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            {renderBodyWithBold(section.body)}
                          </figcaption>
                        )}
                        <a
                          href={`${import.meta.env.BASE_URL || '/'}${section.image.replace(/^\//, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-block text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                        >
                          {t('openInNewTabLabel')}
                        </a>
                      </figure>
                    )
                  ) : null}
                  {!section.image &&
                    !section.presentationToolsBlock &&
                    section.body && (
                      <div
                        className={
                          isOptional
                            ? 'text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line'
                            : 'text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line'
                        }
                      >
                        {renderBodyWithBold(section.body)}
                      </div>
                    )}
                  {section.copyable && !section.presentationToolsBlock && (
                    <div className="mt-2 mb-3">
                      <TemplateBlock
                        label={tCommon('copy')}
                        template={section.copyable}
                        copyAriaLabel={t('copyPrompt')}
                        copyCopiedLabel={tCommon('copiedExclaim')}
                      />
                    </div>
                  )}
                  {section.workflowChains &&
                    section.workflowChains.length > 0 &&
                    !section.presentationToolsBlock && (
                      <WorkflowChainsBlock chains={section.workflowChains} />
                    )}
                  {section.toolChoiceBar &&
                    section.table &&
                    !section.presentationToolsBlock && (
                      <div
                        className="mb-4 space-y-3"
                        role="region"
                        aria-label={t('chooseTaskTypeAria')}
                      >
                        {section.toolChoiceBar.question && (
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {section.toolChoiceBar.question}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {(section.toolChoiceBar.choices ?? []).map(
                            (choice, idx) => {
                              const isSelected =
                                selectedToolRowIndex === choice.rowIndex;
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() =>
                                    setSelectedToolRowIndex(choice.rowIndex)
                                  }
                                  className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
                                    isSelected
                                      ? 'bg-accent-500 text-white dark:bg-accent-600 dark:text-white'
                                      : 'bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                                  }`}
                                  aria-pressed={isSelected}
                                  aria-label={`${choice.label}${isSelected ? ', pasirinkta' : ''}`}
                                >
                                  {choice.label}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                  {!section.workflowChains?.length &&
                    section.table &&
                    !section.presentationToolsBlock &&
                    (() => {
                      const isComparison =
                        section.table?.comparisonStyle === true;
                      const isSolutionMatrix =
                        section.table?.solutionMatrixStyle === true;
                      const tableRows = section.table.rows ?? [];
                      const rowMeta = section.table.rowMeta;
                      const hasRowMeta =
                        rowMeta && rowMeta.length >= tableRows.length;
                      const numCols = section.table.headers?.length ?? 0;
                      const ariaLabel =
                        numCols === 2
                          ? `Palyginimo lentelė: ${(section.table.headers ?? []).join(' ir ')}`
                          : numCols === 3 &&
                              (section.heading?.includes('Sprendimo matrica') ??
                                false)
                            ? (section.heading ?? 'Sprendimo matrica')
                            : numCols >= 3
                              ? `Lentelė: ${section.heading ?? section.table.headers?.join(', ') ?? 'turinyje'}`
                              : 'Įrankių palyginimo lentelė';
                      const toolBadgeClasses: Record<string, string> = {
                        blue: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
                        green:
                          'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200',
                        violet:
                          'bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200',
                        yellow:
                          'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200',
                        orange:
                          'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200',
                      };
                      const isTermsTable = section.blockVariant === 'terms';
                      return (
                        <div
                          className={`overflow-x-auto my-3 rounded-lg ${isComparison ? 'border border-gray-100 dark:border-gray-700' : 'border border-gray-200 dark:border-gray-600'} ${isTermsTable ? 'bg-white dark:bg-slate-900/40 border-l-4 border-slate-400 dark:border-slate-500' : ''}`}
                          role="region"
                          aria-label={ariaLabel}
                        >
                          <table
                            className={`border-collapse text-base ${isComparison ? 'min-w-[36rem] w-full' : isSolutionMatrix ? 'min-w-[32rem] w-full' : 'w-full'}`}
                          >
                            <thead>
                              <tr>
                                {(section.table.headers ?? []).map((h, j) => (
                                  <th
                                    key={j}
                                    className={`text-left font-bold text-gray-900 dark:text-white align-top border-b-2 ${
                                      isComparison
                                        ? `px-5 py-5 border-b-gray-100 dark:border-b-gray-700 ${j === 0 ? 'sticky left-0 z-10 bg-brand-200 dark:bg-brand-900/40 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]' : 'bg-slate-200 dark:bg-slate-800/50'}`
                                        : isSolutionMatrix
                                          ? `px-4 py-4 border-gray-200 dark:border-gray-600 bg-brand-100 dark:bg-brand-900/40 ${j === 0 ? 'sticky left-0 z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]' : ''}`
                                          : `px-4 py-3 border-gray-200 dark:border-gray-600 bg-brand-100 dark:bg-brand-900/40 ${j === 0 ? 'sticky left-0 z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]' : ''}`
                                    }`}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableRows.map((row, ri) => {
                                const isLastRow = ri === tableRows.length - 1;
                                const meta = hasRowMeta
                                  ? rowMeta[ri]
                                  : undefined;
                                const isHighlighted =
                                  section.toolChoiceBar &&
                                  selectedToolRowIndex === ri;
                                const isWarningRow = meta?.isWarning === true;
                                const zebraClass = isSolutionMatrix
                                  ? 'even:bg-gray-100 dark:even:bg-gray-700/50'
                                  : !isComparison
                                    ? 'even:bg-gray-50/50 dark:even:bg-gray-800/30'
                                    : '';
                                return (
                                  <tr
                                    key={ri}
                                    ref={(el) => {
                                      if (section.toolChoiceBar)
                                        tableRowRefs.current[ri] = el;
                                    }}
                                    className={`${isComparison ? 'border-b border-gray-100 dark:border-gray-700 last:border-b-0' : 'border-b border-gray-200 dark:border-gray-600 last:border-b-0'} ${isComparison && isLastRow ? 'bg-brand-50/50 dark:bg-brand-900/20 font-semibold' : ''} ${isWarningRow ? 'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500' : ''} ${zebraClass} ${isHighlighted ? 'ring-2 ring-accent-500 ring-inset bg-accent-50/80 dark:bg-accent-900/40' : ''}`}
                                  >
                                    {row.map((cell, ci) => {
                                      const isFirstCol = ci === 0;
                                      const isStrengthCol = ci === 1;
                                      const isPriceCol =
                                        numCols >= 4 && ci === numCols - 1;
                                      const isThirdCol =
                                        numCols === 3 && ci === 2;
                                      const cellContent =
                                        typeof cell === 'string'
                                          ? renderBodyWithBold(cell)
                                          : cell;
                                      const cellPadding = isSolutionMatrix
                                        ? 'px-4 py-5'
                                        : isComparison
                                          ? 'px-5 py-5'
                                          : 'px-4 py-3.5';
                                      const stickyFirstCellBg = isFirstCol
                                        ? isComparison && isLastRow
                                          ? 'bg-brand-50/50 dark:bg-brand-900/20'
                                          : isSolutionMatrix
                                            ? ri % 2 === 1
                                              ? 'bg-gray-100 dark:bg-gray-700/50'
                                              : 'bg-white dark:bg-gray-900'
                                            : ri % 2 === 1
                                              ? 'bg-gray-50 dark:bg-gray-800/30'
                                              : 'bg-white dark:bg-gray-900'
                                        : '';
                                      return (
                                        <td
                                          key={ci}
                                          className={`align-top min-h-[2.5rem] ${cellPadding} ${isComparison ? 'leading-loose' : 'leading-relaxed'} ${
                                            isFirstCol
                                              ? `sticky left-0 z-10 font-medium text-gray-900 dark:text-white align-top shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)] ${stickyFirstCellBg} ${isComparison ? 'min-w-[14rem] sm:min-w-[16rem] w-1/2' : isSolutionMatrix ? 'min-w-[10rem] sm:min-w-[12rem]' : 'min-w-[10rem] sm:min-w-40'}`
                                              : isPriceCol
                                                ? 'text-gray-500 dark:text-gray-400'
                                                : isThirdCol
                                                  ? 'text-gray-600 dark:text-gray-400 min-w-[12rem] sm:min-w-[14rem]'
                                                  : `text-gray-700 dark:text-gray-300 ${isComparison ? 'min-w-[14rem] sm:min-w-[16rem] w-1/2' : ''} ${numCols === 2 && !isSolutionMatrix && ci === 1 ? 'min-w-[10rem]' : ''} ${hasRowMeta && isStrengthCol ? 'font-semibold' : ''}`
                                          }`}
                                        >
                                          {isFirstCol &&
                                          meta?.bestFor != null ? (
                                            <div className="space-y-0.5">
                                              <span className="block text-base font-semibold text-gray-900 dark:text-white">
                                                {cellContent}
                                              </span>
                                              <span className="block text-xs text-gray-500 dark:text-gray-400">
                                                {meta.bestFor}
                                              </span>
                                            </div>
                                          ) : isStrengthCol &&
                                            meta?.strengthBadge != null ? (
                                            <span
                                              className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${toolBadgeClasses[meta.badgeVariant ?? 'blue'] ?? toolBadgeClasses.blue}`}
                                              aria-label={`Stiprybė: ${meta.strengthBadge}`}
                                            >
                                              {meta.strengthBadge}
                                            </span>
                                          ) : (
                                            cellContent
                                          )}
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  {(section.heading === 'Įrankiai' ||
                    section.heading === 'Tools') &&
                    moduleId != null &&
                    onGoToTools && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => onGoToTools(moduleId)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                          aria-label={t('openToolsListAria', {
                            moduleId: moduleId ?? 0,
                          })}
                        >
                          <Wrench className="w-4 h-4" aria-hidden />
                          {t('viewToolsLabel')}
                        </button>
                      </div>
                    )}
                </div>
              </div>
              {i === 5 && content.instructGptQuality && (
                <InstructGptQualityBlock data={content.instructGptQuality} />
              )}
              {i === 1 && content.pipelineDiagram === 'context-engineering' && (
                <div
                  className="space-y-4"
                  role="region"
                  aria-label={
                    content.workflowImagesHeading ??
                    t('contextEngineeringPipelineAria')
                  }
                >
                  {content.workflowImagesHeading && (
                    <h3 className="font-extrabold text-xl lg:text-2xl text-brand-800 dark:text-brand-200 mb-1">
                      {content.workflowImagesHeading}
                    </h3>
                  )}
                  {content.pipelineDiagramSubtitle && (
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 -mt-2 whitespace-pre-line">
                      {content.pipelineDiagramSubtitle}
                    </p>
                  )}
                  <ContextEngineeringPipelineDiagram
                    interactiveContent={content.interactivePipeline}
                  />
                </div>
              )}
              {i === 1 &&
                !content.pipelineDiagram &&
                content.workflowImages &&
                content.workflowImages.length > 0 && (
                  <div
                    className="space-y-3"
                    role="region"
                    aria-label={
                      content.workflowImagesHeading ??
                      'Inžinerijos workflow pavyzdžiai'
                    }
                  >
                    {content.workflowImagesHeading && (
                      <h3 className="font-bold text-lg lg:text-xl text-brand-800 dark:text-brand-200">
                        {content.workflowImagesHeading}
                      </h3>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {content.workflowImages.slice(0, 2).map((img, j) => (
                        <figure
                          key={j}
                          className="group relative rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10 overflow-visible"
                        >
                          <div className="p-2 bg-gray-50/50 dark:bg-gray-900/30">
                            <img
                              src={`${import.meta.env.BASE_URL || '/'}${String(img.src).replace(/^\//, '')}`}
                              alt={img.alt ?? img.label ?? 'Workflow schema'}
                              className="w-full h-auto object-contain border border-brand-200 dark:border-brand-800 rounded-lg max-h-72"
                            />
                          </div>
                          {img.label && (
                            <figcaption className="p-3 text-sm font-semibold text-brand-800 dark:text-brand-200 flex items-center gap-2">
                              {img.label}
                              {img.tooltip && (
                                <button
                                  type="button"
                                  className="relative inline-flex rounded-md p-1.5 min-h-[44px] min-w-[44px] items-center justify-center hover:bg-brand-100 dark:hover:bg-brand-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                                  aria-label={`Papildoma informacija: ${img.label}`}
                                  aria-describedby={`workflow-tooltip-${j}`}
                                >
                                  <Info
                                    className="w-4 h-4 text-brand-500 dark:text-brand-400 shrink-0"
                                    aria-hidden
                                  />
                                  <span
                                    id={`workflow-tooltip-${j}`}
                                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-64 p-3 text-xs font-normal text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity z-10 pointer-events-none"
                                    role="tooltip"
                                  >
                                    {img.tooltip}
                                  </span>
                                </button>
                              )}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
            </Fragment>
          );
        })}
      {content.tools && content.tools.length > 0 && (
        <div className="border-2 border-brand-200 dark:border-brand-800 rounded-2xl bg-gradient-to-b from-brand-50/80 to-white dark:from-brand-950/50 dark:to-gray-900 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-500" aria-hidden="true" />
            DI įrankiai – kur pradėti
          </h3>
          {content.toolsIntro && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {content.toolsIntro}
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.tools?.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  {t.url ? (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-200 underline underline-offset-2 inline-flex items-center gap-1"
                    >
                      {t.name}
                      <ExternalLink
                        className="w-3.5 h-3.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </span>
                  )}
                </div>
                {t.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug mb-3">
                    {t.description}
                  </p>
                )}
                {t.useCases && t.useCases.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                      Populiariausi naudojimo atvejai
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {t.useCases.map((uc, i) => (
                        <li key={i}>
                          <span className="inline-block text-xs px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
                            {uc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-5">
            Principai veikia visuose įrankiuose – svarbi prompto struktūra, ne
            platforma.
          </p>
        </div>
      )}
      {content.recognitionExercise && (
        <RecognitionExerciseBlock
          exercise={content.recognitionExercise}
          useAiAccent={isDiVisata}
        />
      )}
      {content.practicalTask && (
        <section
          className={
            isDiVisata
              ? 'mt-8 rounded-xl border-l-4 border-l-di-visata-ai-accent bg-di-visata-ai-cool/80 dark:bg-gray-800/80 p-6'
              : 'mt-8 rounded-xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 p-6'
          }
          aria-labelledby="practical-task-heading"
          role="region"
        >
          <TemplateBlock
            id="practical-task-heading"
            label={
              content.practicalTask.templateLabel || 'Kopijuojamas šablonas'
            }
            template={content.practicalTask.template}
          />
        </section>
      )}

      {practice && (
        <section
          className="mt-8 space-y-4"
          aria-labelledby="correct-prompt-practice-heading"
          role="region"
        >
          <h2
            id="correct-prompt-practice-heading"
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            {t('correctPromptPracticeHeading')}
          </h2>
          <div className="p-4 rounded-xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {practice.intro}
            </p>
          </div>
          <div className="p-4 rounded-xl border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t('badExample')}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">
              {practice.badPrompt}
            </p>
          </div>
          <div className="p-4 rounded-xl border-l-4 border-l-brand-500 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800">
            <label
              htmlFor="correct-prompt-textarea"
              className="block font-semibold text-gray-900 dark:text-white mb-2"
            >
              {t('correctPromptYourVersionLabel')}
            </label>
            <textarea
              id="correct-prompt-textarea"
              value={correctPromptUserText}
              onChange={(e) => setCorrectPromptUserText(e.target.value)}
              placeholder={t('promptPlaceholder')}
              rows={4}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[44px]"
              aria-label={t('correctPromptTextareaAria')}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowCorrectPromptSolution(true)}
              className="btn-secondary px-4 py-2 text-sm min-h-[44px] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-expanded={showCorrectPromptSolution}
              aria-controls="correct-prompt-solution"
            >
              {practice.revealButtonLabel}
            </button>
          </div>
          {showCorrectPromptSolution && (
            <div
              id="correct-prompt-solution"
              className="space-y-4"
              role="region"
              aria-label={t('solutionAria')}
            >
              <div className="p-4 rounded-xl border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('correctPromptPrinciplesHeading')}
                </h3>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {renderBodyWithBold(practice.solutionAnalysis)}
                </div>
              </div>
              <div className="p-4 rounded-xl border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <TemplateBlock
                  label={t('correctPromptTemplateLabel')}
                  template={practice.solutionCopyable}
                />
              </div>
              <div className="p-4 rounded-xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {t('correctPromptChangesHeading')}
                </h3>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {practice.solutionSummary}
                </p>
              </div>
            </div>
          )}
        </section>
      )}
      {moduleId === 6 && slide?.id === 64 && content.handoutDownloadLabel && (
        <div
          className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4"
          role="region"
          aria-label={t('pdfHandoutAria')}
        >
          <button
            type="button"
            onClick={handleM6HandoutDownload}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={content.handoutDownloadLabel}
          >
            <Download className="w-4 h-4 shrink-0" aria-hidden />
            {content.handoutDownloadLabel}
          </button>
        </div>
      )}
    </div>
  );
}

const sectionBreakColorMap = {
  brand: {
    heroBg: 'bg-brand-800 dark:bg-brand-900',
    heroBorder: 'border-brand-700 dark:border-brand-600',
    badge:
      'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300',
    pill: 'bg-brand-100 dark:bg-brand-800/50 text-brand-800 dark:text-brand-100 border-brand-300 dark:border-brand-600',
    footerBg:
      'bg-brand-700 dark:bg-brand-800 border-brand-700 dark:border-brand-600',
    progressBar: 'bg-brand-600 dark:bg-brand-400',
    kasToliau: 'border-brand-500',
  },
  emerald: {
    heroBg: 'bg-emerald-800 dark:bg-emerald-900',
    heroBorder: 'border-emerald-700 dark:border-emerald-600',
    badge:
      'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    pill: 'bg-emerald-100 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-100 border-emerald-300 dark:border-emerald-600',
    footerBg:
      'bg-emerald-700 dark:bg-emerald-800 border-emerald-700 dark:border-emerald-600',
    progressBar: 'bg-emerald-600 dark:bg-emerald-400',
    kasToliau: 'border-emerald-500',
  },
  violet: {
    heroBg: 'bg-violet-800 dark:bg-violet-900',
    heroBorder: 'border-violet-700 dark:border-violet-600',
    badge:
      'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
    pill: 'bg-violet-100 dark:bg-violet-800/50 text-violet-800 dark:text-violet-100 border-violet-300 dark:border-violet-600',
    footerBg:
      'bg-violet-700 dark:bg-violet-800 border-violet-700 dark:border-violet-600',
    progressBar: 'bg-violet-600 dark:bg-violet-400',
    kasToliau: 'border-violet-500',
  },
} as const;

export function SectionBreakSlide({
  content,
  onGoToGlossaryTerm,
}: {
  content?: SectionBreakContent | null;
  onGoToGlossaryTerm?: (term: string) => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  if (!content) return null;
  const hck = content.heroColorKey ?? 'brand';
  const colors = sectionBreakColorMap[hck] ?? sectionBreakColorMap.brand;
  const hasRecap = content.recap?.items?.length;
  const hasNextSteps = (content.nextSteps?.length ?? 0) > 0;
  const hasSubtitle = Boolean(content.subtitle);
  const showKasToliau = hasNextSteps || hasSubtitle;

  const recapIconList =
    content.recap?.items?.length === 3
      ? [Settings, User, Repeat]
      : content.recap?.items?.length === 5
        ? [Settings, User, Repeat, Wrench, Cpu]
        : content.recap?.items?.length === 7
          ? [Settings, User, Repeat, Wrench, Cpu, FileSearch, Layers]
          : [Layers, Settings, User, Repeat];
  const recapIcons = recapIconList;

  const pillLabels = ['Sisteminis', 'Master', 'Procesas'] as const;
  const pillIcons = [Settings, User, Repeat] as const;
  const pillLabels5 = [
    'Sisteminis',
    'Master',
    'Procesas',
    'Metodinis',
    'Agentinis',
  ] as const;
  const pillIcons5 = [Settings, User, Repeat, Wrench, Cpu] as const;
  const pillLabels7 = [
    'Sisteminis',
    'Master',
    'Procesas',
    'Metodinis',
    'Agentinis',
    'RAG promptai',
    'Combo promptai',
  ] as const;
  const pillIcons7 = [
    Settings,
    User,
    Repeat,
    Wrench,
    Cpu,
    FileSearch,
    Layers,
  ] as const;
  const itemsLength = content.recap?.items?.length ?? 0;
  const progressTotal = content.recap?.progressTotal ?? itemsLength;
  const showPills =
    content.celebrationText &&
    ((itemsLength === 3 && progressTotal === 7) ||
      itemsLength === 5 ||
      itemsLength === 7 ||
      (itemsLength === 5 && progressTotal === 7));
  const pillsCount = showPills
    ? itemsLength === 5 && progressTotal === 7
      ? 7
      : itemsLength
    : 0;
  const getPillLabel = (i: number) =>
    (i < 7
      ? itemsLength === 7
        ? pillLabels7[i]
        : itemsLength === 5 && progressTotal === 7
          ? pillLabels7[i]
          : itemsLength === 5
            ? pillLabels5[i]
            : pillLabels[i]
      : null) ?? 'Item';
  const getPillIcon = (i: number) =>
    (i < 7
      ? itemsLength === 7
        ? pillIcons7[i]
        : itemsLength === 5 && progressTotal === 7
          ? pillIcons7[i]
          : itemsLength === 5
            ? pillIcons5[i]
            : pillIcons[i]
      : null) ?? Layers;
  const isPillUpcoming = (i: number) =>
    itemsLength === 5 && progressTotal === 7 && i >= 5;

  if (hasRecap) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
        <div className="flex flex-col items-center text-center">
          {content.sectionNumber && (
            <span
              className={`inline-block px-4 py-1.5 rounded-full ${colors.badge} font-semibold text-sm mb-4`}
            >
              {content.sectionNumber}
            </span>
          )}
          {!content.celebrationText && (
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              {content.title}
            </h2>
          )}
          {content.celebrationText && (
            <div
              className={`mt-1 relative flex flex-col sm:flex-row items-center justify-center gap-2 rounded-[20px] border-2 ${colors.heroBorder} ${colors.heroBg} pl-4 pr-36 sm:pr-32 py-4 text-left w-full`}
              role="region"
              aria-label={t('sectionCompleteAria')}
            >
              <div className="flex items-center gap-4 w-full flex-wrap sm:flex-nowrap">
                <Sparkles
                  className="w-6 h-6 flex-shrink-0 text-accent-300 dark:text-accent-400 opacity-90"
                  aria-hidden
                />
                <h2 className="text-xl lg:text-2xl m-0 max-w-md">
                  {(() => {
                    const text =
                      typeof content.celebrationText === 'string'
                        ? content.celebrationText
                        : String(content.celebrationText ?? '');
                    const idx = text.indexOf('! ');
                    if (idx !== -1) {
                      const exclamation = text.slice(0, idx + 1);
                      const rest = text.slice(idx + 2);
                      return (
                        <span className="flex flex-col">
                          <span className="font-bold text-accent-300 dark:text-accent-400 mb-1.5 text-xl lg:text-2xl leading-tight">
                            {exclamation}
                          </span>
                          <span className="font-semibold text-white dark:text-brand-100 leading-[1.2] tracking-[-0.01em]">
                            {rest}
                          </span>
                        </span>
                      );
                    }
                    return (
                      <span className="font-bold text-white dark:text-brand-100">
                        {text}
                      </span>
                    );
                  })()}
                </h2>
              </div>
              {(content.recap?.items?.length === 3 ||
                content.recap?.items?.length === 5 ||
                content.recap?.items?.length === 7) &&
                (() => {
                  const total =
                    content.recap?.progressTotal ??
                    content.recap?.items?.length ??
                    0;
                  const current = content.recap?.items?.length ?? 0;
                  const pct = total > 0 ? (current / total) * 100 : 0;
                  return (
                    <div
                      className="absolute top-4 right-5 flex flex-col items-center justify-center rounded-[14px] border border-[#DCE3EA] dark:border-slate-600 bg-[#F5F7FA] dark:bg-slate-800/90 px-3.5 pt-2.5 pb-0 min-w-[5.5rem] leading-[1.35] overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
                      role="status"
                      aria-label={`${current} iš ${total}`}
                    >
                      <span className="text-[1.25rem] font-semibold tabular-nums text-brand-700 dark:text-brand-300 tracking-[-0.02em]">
                        {current}/{total}
                      </span>
                      <div
                        className="w-full mt-2 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-500"
                        style={{ height: '4px' }}
                        role="presentation"
                      >
                        <div
                          className={`h-full rounded-full ${colors.progressBar}`}
                          style={{
                            width: `${pct}%`,
                            minWidth: pct > 0 ? `${pct}%` : '0',
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}
            </div>
          )}
        </div>

        {showPills && pillsCount > 0 && (
          <div
            className="flex flex-wrap gap-3 justify-center"
            role="list"
            aria-label="Promptų tipai – žodyno nuorodos"
          >
            {Array.from({ length: pillsCount }, (_, i) => {
              const Icon = getPillIcon(i);
              const label = getPillLabel(i);
              const term = content.recap?.itemGlossaryTerms?.[i];
              const isLink = Boolean(term && onGoToGlossaryTerm);
              const upcoming = isPillUpcoming(i);
              const pillStyle = upcoming
                ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600'
                : colors.pill;
              const baseClass = `inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg ${pillStyle} text-sm font-semibold border-2`;
              const linkClass =
                ' focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 hover:text-brand-700 dark:hover:text-brand-200 hover:underline underline-offset-2 cursor-pointer';
              const numCircleClass = upcoming
                ? 'bg-blue-500 text-white'
                : 'bg-brand-500 text-white';
              const iconClass = upcoming
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-brand-600 dark:text-brand-400';
              if (isLink && term) {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onGoToGlossaryTerm?.(term)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onGoToGlossaryTerm?.(term);
                      }
                    }}
                    className={baseClass + linkClass}
                    aria-label={`Atidaryti žodynėlį: ${term}`}
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full ${numCircleClass} text-xs font-bold`}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${iconClass} shrink-0`}
                      aria-hidden
                    />
                    {label}
                    <BookOpen
                      className={`w-3.5 h-3.5 ${iconClass} shrink-0 opacity-80`}
                      aria-hidden
                    />
                  </button>
                );
              }
              return (
                <span key={i} className={baseClass}>
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full ${numCircleClass} text-xs font-bold`}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <Icon className={`w-4 h-4 ${iconClass}`} aria-hidden />
                  {label}
                </span>
              );
            })}
          </div>
        )}

        <section
          className="rounded-r-lg border-l-4 border-emerald-500 bg-slate-100 dark:bg-slate-800/60 pl-4 pr-3 py-3 text-left"
          aria-label={content.recap?.heading ?? ''}
        >
          <h3 className="font-bold text-sm mb-1.5 text-gray-900 dark:text-white">
            {content.recap?.heading}
          </h3>
          {content.recap?.lead && (
            <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-2 leading-relaxed">
              {content.recap.lead}
            </p>
          )}
          <ul className="space-y-2" role="list">
            {(content.recap?.items ?? []).map((item, idx) => {
              const TermIcon = recapIcons[idx % recapIcons.length];
              const term = content.recap?.itemGlossaryTerms?.[idx];
              const hasGlossaryLink = Boolean(term && onGoToGlossaryTerm);
              const termStart =
                hasGlossaryLink && term ? item.indexOf(term) : -1;
              const hasTermInItem = termStart >= 0;
              const before = hasTermInItem ? item.slice(0, termStart) : '';
              const after =
                hasTermInItem && term
                  ? item.slice(termStart + term.length)
                  : '';
              return (
                <li
                  key={idx}
                  className="flex items-start gap-3 pl-3 border-l-4 border-emerald-500 animate-fade-in"
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animationFillMode: 'backwards',
                  }}
                  role="listitem"
                >
                  {hasGlossaryLink && term ? (
                    <button
                      type="button"
                      onClick={() => onGoToGlossaryTerm?.(term)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onGoToGlossaryTerm?.(term);
                        }
                      }}
                      className="flex-shrink-0 mt-0.5 p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                      aria-label={`Atidaryti žodynėlį: ${term}`}
                    >
                      <TermIcon className="w-4 h-4" aria-hidden />
                    </button>
                  ) : (
                    <TermIcon
                      className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5"
                      aria-hidden
                    />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {hasTermInItem && term ? (
                      <>
                        {before}
                        <button
                          type="button"
                          onClick={() => onGoToGlossaryTerm!(term)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onGoToGlossaryTerm!(term);
                            }
                          }}
                          className="font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded align-baseline"
                          aria-label={`Atidaryti žodynėlį: ${term}`}
                        >
                          {term}
                        </button>
                        {after}
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {showKasToliau && (
          <section
            className={`pl-3 py-2 border-l-4 ${colors.kasToliau} text-left`}
            aria-label="Kas toliau"
          >
            <h3 className="font-bold text-sm mb-1 text-gray-900 dark:text-white">
              Kas toliau
            </h3>
            {hasNextSteps ? (
              <ul className="space-y-0.5 text-xs text-gray-700 dark:text-gray-300 list-disc list-inside">
                {(content.nextSteps ?? []).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {content.subtitle}
              </p>
            )}
          </section>
        )}

        {content.footer && (
          <section
            className={`rounded-lg border-2 ${colors.footerBg} p-3 text-left`}
            aria-label={t('nextStepAria')}
          >
            <p className="text-xs font-semibold text-white flex items-center gap-2">
              <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden />
              {content.footer}
            </p>
          </section>
        )}

        {content.spinoffCta && (
          <a
            href={content.spinoffCta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border-2 border-accent-400 dark:border-accent-500 bg-transparent text-accent-700 dark:text-accent-300 font-semibold text-sm shadow-sm hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-accent-500 dark:hover:border-accent-400 hover:shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            aria-label={`${content.spinoffCta.label} (atidaroma naujame lange)`}
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" aria-hidden />
            <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden />
            {content.spinoffCta.label}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[280px] text-center px-4 py-8">
      {content.sectionNumber && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-semibold text-sm mb-4">
          {content.sectionNumber}
        </span>
      )}
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
        {content.title}
      </h2>
      {content.subtitle && (
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          {content.subtitle}
        </p>
      )}
    </div>
  );
}

export function WarmUpQuizSlide({ content }: { content: WarmUpQuizContent }) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const tQuiz = getT('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const questions = content.questions ?? [];
  const q = questions[currentIndex];
  const isDone = currentIndex >= questions.length;

  const handleOptionClick = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setCurrentIndex(questions.length);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-400">
        Bandomųjų klausimų nėra.
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="space-y-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl text-center">
          <CheckCircle
            className="w-12 h-12 text-emerald-500 mx-auto mb-3"
            aria-hidden
          />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
            Pasiruošimo savitikra baigta
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Gali pradėti testą – įskaita neįskaitoma, tai tik pasiruošimas.
          </p>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === q.correct;

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('warmUpQuestionInfo', {
          n: currentIndex + 1,
          total: questions.length,
        })}
      </p>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700">
        <p className="font-bold text-gray-900 dark:text-white mb-4">
          {q.question}
        </p>
        <div className="space-y-2">
          {(q.options ?? []).map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === q.correct;
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  showFeedback
                    ? isCorrectOption
                      ? 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30'
                      : isSelected && !isCorrectOption
                        ? 'border-rose-500 bg-rose-100 dark:bg-rose-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                    : isSelected
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showFeedback
                        ? isCorrectOption
                          ? 'border-emerald-500 bg-emerald-500'
                          : isSelected
                            ? 'border-rose-500 bg-rose-500'
                            : 'border-gray-300'
                        : isSelected
                          ? 'border-brand-500 bg-brand-500'
                          : 'border-gray-300'
                    }`}
                  >
                    {showFeedback && isCorrectOption && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                    {isSelected && !showFeedback && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {showFeedback && (
        <div
          className={`p-4 rounded-xl ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800'}`}
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {isCorrect ? tQuiz('correctLabel') : tQuiz('incorrectLabel')}
          </p>
          {q.explanation && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {q.explanation}
            </p>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="mt-3 px-4 py-2 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
          >
            {currentIndex + 1 < questions.length
              ? tCommon('next')
              : tCommon('finish')}
          </button>
        </div>
      )}
    </div>
  );
}

export function GlossarySlide({
  content,
  optional,
}: {
  content: GlossaryContent;
  optional?: boolean;
}) {
  useTranslation();
  const t = getT('contentSlides');
  return (
    <div className="space-y-4">
      {/* ── Header ── */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-5 rounded-r-xl">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-bold text-lg text-brand-900 dark:text-brand-100">
            {t('glossaryLabel')}
          </h4>
          {optional && (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200"
              aria-label={t('optionalSlideAria')}
            >
              {t('optionalSlideLabel')}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {t('glossarySlideIntro')}
        </p>
      </div>

      {/* ── Terminai ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(content.terms ?? []).map((item, i) => (
          <article
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
            role="article"
            aria-label={item.term}
          >
            <dt className="font-bold text-sm text-brand-700 dark:text-brand-300 mb-1">
              {item.term}
            </dt>
            <dd className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.definition}
            </dd>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ModuleIntroSlide({ content }: { content: ModuleIntroContent }) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          {isEn
            ? 'After this module you will be able to:'
            : 'Po šio modulio galėsite:'}
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {(content.learningOutcomes ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle
                className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-accent-900 dark:text-accent-100">
          {isEn ? 'Why context engineering?' : 'Kodėl konteksto inžinerija?'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.whyAdvanced}
        </p>
      </div>
      {content.connectionToModule1 && (
        <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 dark:border-slate-600 border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            {t('linkToModule1')}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {content.connectionToModule1}
          </p>
        </div>
      )}
    </div>
  );
}

function getDefaultIntro(locale: string): IntroContent {
  const isEn = locale === 'en';
  return {
    aboutText: isEn
      ? 'This training will help you create effective prompts that produce consistent, professional results. You will learn a hierarchical structure that transforms chaotic AI communication into a systematic and manageable process.'
      : 'Šis mokymas padės jums kurti efektyvius promptus, kurie duoda nuoseklius, profesionalius rezultatus. Išmoksite hierarchinę struktūrą, kuri paverčia chaotišką DI komunikaciją sistemingu ir valdomu procesu.',
    tools: [
      { name: 'ChatGPT (OpenAI)', url: 'https://chat.openai.com' },
      { name: 'Claude (Anthropic)', url: 'https://claude.ai' },
      { name: 'Gemini (Google)', url: 'https://gemini.google.com' },
      { name: 'Copilot (Microsoft)', url: 'https://copilot.microsoft.com' },
      { name: 'Grok (xAI)', url: 'https://grok.x.ai' },
    ],
    outcomes: isEn
      ? [
          'Structure prompts professionally',
          'Get predictable results',
          'Save time and resources',
        ]
      : [
          'Struktūruoti promptus profesionaliai',
          'Gauti nuspėjamus rezultatus',
          'Taupyti laiką ir išteklius',
        ],
    toolsTip: isEn
      ? 'The training focuses on prompt structure, so the same principles apply across different tools.'
      : 'Mokymuose dėmesys skiriamas promptų struktūrai, todėl tie patys principai veikia skirtinguose įrankiuose.',
    tip: isEn
      ? 'Think of one business task you would like to automate or improve using AI. We will use this example throughout the training.'
      : 'Pagalvokite apie vieną verslo užduotį, kurią norėtumėte automatizuoti ar pagerinti naudojant DI. Šį pavyzdį naudosime viso mokymo metu.',
  };
}

export interface IntroSlideProps {
  content?: IntroContent | null;
}
export function IntroSlide({ content: contentProp }: IntroSlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const content = contentProp ?? getDefaultIntro(locale);
  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          {isEn ? 'About this training' : 'Apie šį mokymą'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.aboutText}
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-amber-900 dark:text-amber-100 flex items-center gap-2">
          <span className="text-2xl">🛠️</span> Kokius DI įrankius naudoti?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {t('practiceTasksHint')}
        </p>
        <div className="mb-4">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
            Galimi įrankiai:
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {content.tools.map((t, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-1">
                  •
                </span>
                <span>
                  <strong>{t.name}</strong>
                  {t.url && (
                    <>
                      {' '}
                      –{' '}
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-700 dark:text-amber-300 underline hover:text-amber-900 dark:hover:text-amber-100"
                      >
                        {t.url}
                      </a>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {content.toolsTip && (
          <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-100 flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                🔹
              </span>
              <span>
                <strong>{isEn ? 'Important:' : 'Svarbu:'}</strong>{' '}
                {content.toolsTip}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">
            {isEn
              ? 'After this training you will be able to:'
              : 'Po šio mokymo galėsite:'}
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {content.outcomes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* M-DS2: neutral (slate) vietoj violet – vienas gradientas/akcentas per skaidrę */}
        <div className="bg-slate-50 dark:bg-slate-900/20 p-5 rounded-xl">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3">
            {isEn ? 'Training duration:' : 'Mokymo trukmė:'}
          </h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• {isEn ? '3 modules' : '3 moduliai'}</li>
            <li>• {isEn ? 'Practical tasks' : 'Praktinės užduotys'}</li>
            <li>• {isEn ? '~45 minutes' : '~45 minučių'}</li>
          </ul>
        </div>
      </div>

      {content.tip && (
        <div className="mt-6 p-5 bg-accent-50 dark:bg-accent-900/20 rounded-xl border-l-4 border-accent-500">
          <p className="text-sm text-accent-900 dark:text-accent-100 leading-relaxed">
            <strong className="block mb-2 flex items-center gap-2">
              <Lightbulb
                className="w-4 h-4 text-accent-600 dark:text-accent-400"
                strokeWidth={1.5}
              />
              {isEn ? 'Practical task:' : 'Praktinė užduotis:'}
            </strong>
            {content.tip}
          </p>
        </div>
      )}
    </div>
  );
}

export function DefinitionsSlide({
  content,
}: {
  content?: DefinitionsContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showEngineering, setShowEngineering] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const bothRevealed = showPrompt && showEngineering;

  const getAspectIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      MessageCircle: <MessageCircle className="w-6 h-6" />,
      Languages: <Languages className="w-6 h-6" />,
      Lightbulb: <Lightbulb className="w-6 h-6" />,
      Target: <Target className="w-6 h-6" />,
      Layers: <Layers className="w-6 h-6" />,
      Repeat: <Repeat className="w-6 h-6" />,
    };
    return icons[iconName] || <Sparkles className="w-6 h-6" />;
  };

  const aspectColors = ['violet', 'brand', 'accent'];

  return (
    <div className="space-y-6">
      {/* ── A) Hook (tamsus, provokuojantis) ── */}
      {content?.contextIntro && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-2 right-4 text-[80px] font-black leading-none select-none">
              💬
            </div>
            <div className="absolute bottom-2 left-4 text-[80px] font-black leading-none select-none">
              🔧
            </div>
          </div>
          <div className="relative z-10 text-center max-w-md mx-auto">
            <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
              {content.contextIntro}
            </p>
            {!bothRevealed && (
              <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
                {t('clickCardsHint')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Optional hero/comparison images ── */}
      {(content?.heroImage || content?.comparisonImage) && (
        <div
          className={
            content?.comparisonImage
              ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
              : 'flex justify-center'
          }
        >
          {content?.heroImage && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={content.heroImage}
                alt={content.heroImageLabel || t('definitionsHeroImageAlt')}
                className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 object-contain max-h-64"
              />
              {content.comparisonImage && content.heroImageLabel && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {content.heroImageLabel}
                </p>
              )}
            </div>
          )}
          {content?.comparisonImage && (
            <div className="flex flex-col items-center gap-2">
              <img
                src={content.comparisonImage}
                alt={
                  content.comparisonImageLabel ||
                  t('definitionsComparisonImageAlt')
                }
                className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 object-contain max-h-64"
              />
              {content?.comparisonImageLabel && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {content.comparisonImageLabel}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── B) Dvi interaktyvios kortelės ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kortelė 1: Promptas */}
        <button
          onClick={() => setShowPrompt(true)}
          disabled={showPrompt}
          className={`text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
            showPrompt
              ? 'border-brand-300 dark:border-brand-700 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 cursor-default'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-xl flex-shrink-0 transition-colors duration-300 ${
                  showPrompt
                    ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {t('promptCardTitle')}
                </h3>
                {!showPrompt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('clickToFindOut')}
                  </p>
                )}
              </div>
              {!showPrompt && (
                <ArrowRight
                  className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
            {showPrompt && (
              <div className="animate-fade-in">
                <div className="border-l-4 border-brand-500 pl-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content?.promptDefinition}
                  </p>
                </div>
              </div>
            )}
          </div>
        </button>

        {/* Kortelė 2: Promptų Inžinerija */}
        <button
          onClick={() => setShowEngineering(true)}
          disabled={showEngineering}
          className={`text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
            showEngineering
              ? 'border-accent-300 dark:border-accent-700 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 cursor-default'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-accent-300 dark:hover:border-accent-600 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`p-2.5 rounded-xl flex-shrink-0 transition-colors duration-300 ${
                  showEngineering
                    ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                }`}
              >
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {t('engineeringCardTitle')}
                </h3>
                {!showEngineering && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('clickToFindOut')}
                  </p>
                )}
              </div>
              {!showEngineering && (
                <ArrowRight
                  className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
            {showEngineering && (
              <div className="animate-fade-in">
                <div className="border-l-4 border-accent-500 pl-4 mb-4">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content?.engineeringDefinition}
                  </p>
                </div>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* ── 3 Dedamosios (rodomi po Inžinerijos atskleidimo) ── */}
      {showEngineering && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-slide-in">
          {(content?.aspects ?? []).map((aspect, idx) => {
            const color = aspectColors[idx] || 'brand';
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 bg-${color === 'accent' ? 'accent' : color}-50 dark:bg-${color === 'accent' ? 'accent' : color}-900/20 border-${color === 'accent' ? 'accent' : color}-200 dark:border-${color === 'accent' ? 'accent' : color}-800`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`p-1.5 rounded-lg bg-${color === 'accent' ? 'accent' : color}-100 dark:bg-${color === 'accent' ? 'accent' : color}-900/30 text-${color === 'accent' ? 'accent' : color}-600 dark:text-${color === 'accent' ? 'accent' : color}-400`}
                  >
                    {getAspectIcon(aspect.icon)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded-full bg-${color === 'accent' ? 'accent' : color}-200 dark:bg-${color === 'accent' ? 'accent' : color}-800 text-${color === 'accent' ? 'accent' : color}-700 dark:text-${color === 'accent' ? 'accent' : color}-300`}
                    >
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      {aspect.title}
                    </h4>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-2">
                  {aspect.description}
                </p>
                <div className="bg-white dark:bg-gray-900/50 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                      {t('example')}
                    </p>
                    <CopyButton text={aspect.example} size="sm" />
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    {aspect.example}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── C) Key Insight (rodomas kai abu terminai atskleisti) ── */}
      {bothRevealed && (
        <div className="animate-bounce-in">
          <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-5 sm:p-6 rounded-2xl text-white text-center shadow-lg shadow-brand-500/20">
            <p className="text-base sm:text-lg font-bold flex items-center justify-center gap-2 leading-snug">
              <Sparkles className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>{content?.keyInsight}</span>
              <Sparkles className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            </p>
          </div>
        </div>
      )}

      {/* ── Šaltiniai (collapsible) ── */}
      {content?.sources && content.sources.length > 0 && bothRevealed && (
        <div className="animate-fade-in">
          <button
            onClick={() => setShowSources(!showSources)}
            className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 transition-colors min-h-[44px]"
            aria-expanded={showSources}
          >
            <span>Šaltiniai ir gairės</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${showSources ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {showSources && (
            <div className="mt-2 text-xs text-brand-700 dark:text-brand-300 space-y-1 animate-fade-in">
              {content.sources.map((source, idx) => (
                <div key={idx}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-brand-900 dark:hover:text-brand-100"
                  >
                    {source.label}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DiModalityCard({
  group,
  idx,
}: {
  group: DiModalityGroup;
  idx: number;
}) {
  useTranslation();
  const t = getT('contentSlides');
  return (
    <article
      key={idx}
      className="relative bg-white dark:bg-slate-800/80 pl-5 pr-5 py-5 rounded-2xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-brand-500 dark:border-l-brand-400 shadow-sm hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-700 transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2"
    >
      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
          {group.modality}
        </span>
      </div>
      <p className="text-slate-700 dark:text-slate-200 text-sm mb-1.5 font-semibold leading-snug">
        {group.tasks}
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 leading-snug">
        {group.description}
      </p>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
        Įrankiai:
      </p>
      <ul
        className="flex flex-wrap gap-2"
        aria-label={t('toolsForCategoryAria')}
      >
        {group.examples.map((ex, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            {ex.url ? (
              <a
                href={ex.url}
                target="_blank"
                rel="noreferrer noopener"
                title={ex.tooltip}
                className="inline-flex items-center gap-1.5 min-h-[32px] px-2.5 py-1.5 rounded-lg text-sm font-medium text-brand-700 dark:text-brand-300 bg-slate-100 dark:bg-slate-700/60 hover:bg-brand-100 dark:hover:bg-brand-900/40 hover:text-brand-800 dark:hover:text-brand-200 border border-transparent hover:border-brand-200 dark:hover:border-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1"
              >
                {ex.name}
              </a>
            ) : (
              <span
                className="inline-flex items-center min-h-[32px] px-2.5 py-1.5 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 bg-slate-100 dark:bg-slate-700/60"
                title={ex.tooltip}
              >
                {ex.name}
              </span>
            )}
            {ex.recommended && (
              <span
                className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap min-h-[28px] items-center"
                title={t('recommendedToolAria')}
                aria-label={t('recommendedToolAria')}
              >
                <CheckCircle className="w-3 h-3 shrink-0" aria-hidden />
                Rek.
              </span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function DiModalitiesSlide({
  content,
}: {
  content?: DiModalitiesContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const groups = content?.groups ?? [];
  const showFirst = content?.showFirst ?? 0;
  const useProgressive = showFirst > 0 && groups.length > showFirst;
  const [showAll, setShowAll] = useState(false);
  const visibleGroups =
    useProgressive && !showAll ? groups.slice(0, showFirst) : groups;
  const remainingCount = groups.length - showFirst;

  const intro =
    content?.intro ??
    (isEn
      ? 'AI models based on transformers can work with various input and output forms. Below are the main categories with examples and links. Recommended tools are marked for each category.'
      : 'DI modeliai, pagrįsti transformeriais, gali dirbti su įvairiomis įvesties ir išvesties formomis. Žemiau – pagrindinės kategorijos su pavyzdžiais ir nuorodomis. Pažymėta rekomenduojami įrankiai kiekvienai kategorijai.');
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto space-y-2">
        <p className="text-center text-slate-500 dark:text-slate-400 text-xs">
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300 font-medium"
            role="status"
            aria-label={t('recommendedToolStatusAria')}
          >
            <CheckCircle className="w-3 h-3 shrink-0" aria-hidden />
            {isEn
              ? 'Rec. = recommended tool for this category'
              : 'Rek. = rekomenduojamas įrankis šiai kategorijai'}
          </span>
        </p>
        <p className="text-center text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          {intro}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleGroups.map((group, idx) => (
          <DiModalityCard key={idx} group={group} idx={idx} />
        ))}
      </div>

      {useProgressive && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-expanded={showAll}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 shrink-0" aria-hidden />
                {isEn ? 'Hide other categories' : 'Slėpti kitas kategorijas'}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 shrink-0" aria-hidden />
                {isEn
                  ? `Show ${remainingCount} more categories`
                  : `Rodyti kitas ${remainingCount} kategorijas`}
              </>
            )}
          </button>
        </div>
      )}

      {content?.takeaway && (
        <div className="rounded-2xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 dark:border-accent-600 p-5 shadow-sm">
          <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
            <span className="font-bold text-accent-700 dark:text-accent-300">
              {t('takeawayLabel')}
            </span>
            {content.takeaway}
          </p>
        </div>
      )}

      {/* Footer rodomas SlideContent lygmenyje pagal content.footer */}
    </div>
  );
}

/** Projekto spalvų paletė pie diagramai (atitinka tailwind brand/emerald/orange/rose/violet/amber/slate/fuchsia) */
const PIE_COLORS: Record<string, string> = {
  brand: '#627d98',
  emerald: '#10b981',
  orange: '#f97316',
  rose: '#f43f5e',
  violet: '#8b5cf6',
  amber: '#f59e0b',
  slate: '#94a3b8',
  fuchsia: '#d946ef',
};

function getPieColor(colorKey?: string, index?: number): string {
  const key =
    colorKey ||
    [
      'brand',
      'emerald',
      'orange',
      'rose',
      'violet',
      'amber',
      'slate',
      'fuchsia',
    ][index ?? 0];
  return PIE_COLORS[key] ?? PIE_COLORS.brand;
}

export function PieChartSlide({ content }: { content?: PieChartContent }) {
  const segments = content?.segments ?? [];
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const cx = 100;
  const cy = 100;
  const r = 80;

  let acc = 0;
  const paths = segments.map((seg, i) => {
    const pct = seg.value / total;
    const startAngle = (acc / 100) * 2 * Math.PI - Math.PI / 2;
    acc += pct * 100;
    const endAngle = (acc / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = pct > 0.5 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    const fill = getPieColor(seg.colorKey, i);
    return { d, fill, label: seg.label, value: seg.value };
  });

  return (
    <div className="space-y-6">
      {content?.title && (
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          {content.title}
        </h2>
      )}
      {content?.subtitle && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          {content.subtitle}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <div className="flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-48 h-48 lg:w-56 lg:h-56">
            {paths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill={p.fill}
                stroke="white"
                strokeWidth={1.5}
              />
            ))}
          </svg>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          {paths.map((p, i) => (
            <li key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: p.fill }}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {p.label}{' '}
                <span className="font-medium text-gray-900 dark:text-white">
                  {p.value}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer rodomas SlideContent lygmenyje pagal content.footer */}
    </div>
  );
}

const STAGE_COLORS = [
  {
    bg: 'bg-brand-100 dark:bg-brand-900/30',
    border: 'border-brand-500',
    text: 'text-brand-800 dark:text-brand-200',
  },
  {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    border: 'border-amber-500',
    text: 'text-amber-800 dark:text-amber-200',
  },
  {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    border: 'border-violet-500',
    text: 'text-violet-800 dark:text-violet-200',
  },
];
const EXAMPLE_STEP_COLORS = [
  'bg-emerald-500',
  'bg-orange-500',
  'bg-violet-500',
  'bg-brand-500',
  'bg-rose-500',
];

export function AiWorkflowSlide({ content }: { content?: AiWorkflowContent }) {
  const stages = content?.stages ?? [];
  const examples = content?.examples ?? [];

  return (
    <div className="space-y-6">
      {content?.title && (
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          {content.title}
        </h2>
      )}
      {content?.subtitle && (
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          {content.subtitle}
        </p>
      )}

      {stages.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {stages.map((stage, i) => {
            const style = STAGE_COLORS[i % STAGE_COLORS.length];
            return (
              <div
                key={i}
                className={`rounded-xl border-2 p-4 ${style.bg} ${style.border}`}
              >
                <h3 className={`font-bold mb-2 ${style.text}`}>
                  {stage.step}. {stage.title}
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                  {stage.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {examples.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
            Pavyzdžiai: DI įrankių grandinės
          </h3>
          <div className="space-y-4">
            {examples.map((ex, exIdx) => (
              <div
                key={exIdx}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                  {ex.steps.map((s, stepIdx) => (
                    <span key={stepIdx} className="flex items-center gap-1">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-white text-sm font-medium ${EXAMPLE_STEP_COLORS[stepIdx % EXAMPLE_STEP_COLORS.length]}`}
                      >
                        {s.tool}
                      </span>
                      {stepIdx < ex.steps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {ex.steps.map((s) => s.description).join(' → ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PromptTypesSlide({
  content,
}: {
  content?: PromptTypesContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const typeStyles: Record<
    string,
    { bg: string; border: string; text: string; badge: string; num: string }
  > = {
    brand: {
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-300 dark:border-brand-700',
      text: 'text-brand-700 dark:text-brand-300',
      badge:
        'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300',
      num: 'bg-brand-500',
    },
    accent: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-300 dark:border-cyan-700',
      text: 'text-cyan-700 dark:text-cyan-300',
      badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      num: 'bg-cyan-500',
    },
    violet: {
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
      border: 'border-fuchsia-300 dark:border-fuchsia-700',
      text: 'text-fuchsia-700 dark:text-fuchsia-300',
      badge:
        'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300',
      num: 'bg-fuchsia-500',
    },
  };

  return (
    <div className="space-y-6">
      {/* ── Hook intro: provokuojantis, ne generiškas ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-2 right-4 select-none"
            aria-hidden="true"
          >
            <Target
              className="w-20 h-20 text-current opacity-100"
              strokeWidth={1}
            />
          </div>
        </div>
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
            {t('promptTypesHeroTitle')}
          </p>
          <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
            {t('promptTypesHeroSubtitle')}
          </p>
        </div>
      </div>

      {/* ── Kortelės su numeracija ir progresija ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {content?.types.map((type, idx) => {
          const s = typeStyles[type.color] || typeStyles.brand;
          return (
            <article
              key={idx}
              className={`p-5 rounded-2xl border-2 ${s.bg} ${s.border} shadow-md transition-all hover:shadow-lg`}
              role="article"
              aria-label={type.name}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className={`w-7 h-7 rounded-full ${s.num} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}
                >
                  {idx + 1}
                </span>
                <h4 className={`font-bold text-lg ${s.text}`}>{type.name}</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {type.description}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {t('example')}:
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                        &ldquo;{type.example}&rdquo;
                      </p>
                      <CopyButton text={type.example} size="sm" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {t('resultLabel')}:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.result}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Praktinis patarimas: accent CTA stilius ── */}
      <div className="bg-accent-50 dark:bg-accent-900/20 p-5 rounded-xl border-l-4 border-accent-500">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex-shrink-0">
            <Lightbulb
              className="w-5 h-5 text-accent-600 dark:text-accent-400"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="font-bold text-accent-800 dark:text-accent-200 mb-1">
              {t('practicalTipTitle')}:
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {content?.practicalTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PromptTechniquesSlide({
  content,
}: {
  content?: PromptTechniquesContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  return (
    <div className="space-y-6">
      {/* ── Intro: vizualus žingsnių kelias, ne sąrašas ── */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-5 rounded-r-xl">
        <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
          {t('promptTechniquesLogicTitle')}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5 text-sm">
          {content?.logicSteps.map((step, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-700 text-gray-700 dark:text-gray-300 font-medium">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                {step}
              </span>
              {idx < (content?.logicSteps.length ?? 0) - 1 && (
                <ChevronRight
                  className="w-4 h-4 text-brand-400 dark:text-brand-600 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── Technikos: geros (5) + antipattern (1) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {content?.techniques.map((technique, idx) => {
          const lowerTitle = technique.title.toLowerCase();
          const isAntiPattern =
            lowerTitle.includes('manipuliacija') ||
            lowerTitle.includes('vengti') ||
            lowerTitle.includes('manipulation') ||
            lowerTitle.includes('avoid');
          return (
            <article
              key={idx}
              className={
                isAntiPattern
                  ? 'bg-rose-50 dark:bg-rose-900/10 border-2 border-rose-300 dark:border-rose-800 rounded-2xl p-5'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5'
              }
              role="article"
              aria-label={technique.title}
            >
              <div className="flex items-center gap-2 mb-2">
                {isAntiPattern && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-200 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 flex-shrink-0">
                    {t('promptTechniquesAvoidLabel')}
                  </span>
                )}
                <h4
                  className={`font-bold ${isAntiPattern ? 'text-rose-800 dark:text-rose-200' : 'text-gray-900 dark:text-white'}`}
                >
                  {technique.title}
                </h4>
              </div>
              <p
                className={`text-sm mb-3 ${isAntiPattern ? 'text-rose-700 dark:text-rose-300' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {technique.description}
              </p>
              <div
                className={`rounded-xl p-3 ${
                  isAntiPattern
                    ? 'bg-rose-100/60 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800'
                    : 'bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {isAntiPattern ? t('badExample') : t('example')}
                  </p>
                  {!isAntiPattern && (
                    <CopyButton text={technique.example} size="sm" />
                  )}
                </div>
                <p
                  className={`text-sm whitespace-pre-line font-mono ${isAntiPattern ? 'text-rose-600 dark:text-rose-400 line-through decoration-rose-400/50' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {technique.example}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function WorkflowSummarySlide({
  content,
}: {
  content?: WorkflowSummaryContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const baseUrl = import.meta.env.BASE_URL || '/';
  const diagramImages = [`${baseUrl}LLM_1.png`, `${baseUrl}LLM_2.png`];
  const useInteractive = content?.interactive?.enabled ?? false;

  return (
    <div className="space-y-6">
      {/* ── Intro: vienas sakinys (be gradient, be emoji) ── */}
      {content?.intro && (
        <p className="text-center text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 max-w-2xl mx-auto tracking-tight leading-snug">
          {content.intro}
        </p>
      )}

      {/* ── Diagramos: interaktyvus arba statinis režimas ── */}
      {useInteractive ? (
        <WorkflowComparisonInteractiveBlock locale={locale} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content?.diagrams.map((diagram, idx) => {
            const isWorkflow = diagram.variant === 'workflow' || idx === 1;
            const cardClasses = isWorkflow
              ? 'bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 ring-2 ring-emerald-200/60 dark:ring-emerald-800/40 shadow-md'
              : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5';
            const noteClasses = isWorkflow
              ? 'inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800';
            const noteIcon = isWorkflow ? '✓' : '⚠';

            return (
              <article
                key={idx}
                className={cardClasses}
                role="article"
                aria-label={diagram.title}
              >
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {diagram.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {diagram.subtitle}
                  </p>
                </div>

                {diagramImages[idx] && (
                  <div
                    className={`mb-3 rounded-xl p-2 border ${isWorkflow ? 'bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}
                  >
                    <img
                      src={diagramImages[idx]}
                      alt={diagram.title}
                      className={`w-full h-auto object-contain ${isWorkflow ? 'border border-emerald-200/60 dark:border-emerald-800/40' : 'border border-gray-200 dark:border-gray-700'} rounded-lg`}
                    />
                  </div>
                )}

                {diagram.note && (
                  <div>
                    <span className={noteClasses}>
                      <span aria-hidden="true">{noteIcon}</span>
                      {diagram.note}
                    </span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* ── Palygink promptus: Pokalbis vs Workflow ── */}
      {content?.examples && content.examples.length > 0 && (
        <div className="max-w-[800px] mx-auto mt-8">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
            {t('comparePrompts')}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.examples.map((example, idx) => {
              const isWf = example.title.toLowerCase().includes('workflow');
              return (
                <div
                  key={idx}
                  className={`relative rounded-xl border-2 p-5 transition-colors ${
                    isWf
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700'
                      : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        isWf
                          ? 'bg-emerald-500 text-white'
                          : 'bg-accent-500 text-brand-900'
                      }`}
                    >
                      {example.title}
                    </span>
                    <CopyButton text={example.prompt} size="sm" />
                  </div>
                  <p
                    className={`text-[15px] leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 ${
                      isWf ? 'font-mono' : ''
                    }`}
                  >
                    {example.prompt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function PromptTemplateSlide({
  content,
}: {
  content?: PromptTemplateContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const blockColors = [
    {
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-300 dark:border-brand-700',
      num: 'bg-brand-500',
    },
    {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-300 dark:border-amber-700',
      num: 'bg-amber-500',
    },
    {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-300 dark:border-emerald-700',
      num: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Intro: provokuojantis, ne generiškas ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-2 right-4 text-[80px] font-black leading-none select-none">
            📋
          </div>
        </div>
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
            {t('promptTemplateIntro')}
          </p>
          <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
            {t('promptTemplateSub')}
          </p>
        </div>
      </div>

      {/* ── 3 blokai su spalvomis ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {(content?.blocks ?? []).map((block, idx) => {
          const c = blockColors[idx] || blockColors[0];
          return (
            <article
              key={idx}
              className={`${c.bg} border-2 ${c.border} rounded-2xl p-5`}
              role="article"
              aria-label={block.title}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-8 h-8 rounded-full ${c.num} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}
                >
                  {idx + 1}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {block.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {block.description}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {t('example')}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {block.example}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Šablonai: ryškesni su accent akcentu ── */}
      {content?.template && (
        <div className="border-l-4 border-accent-500 rounded-r-xl bg-accent-50 dark:bg-accent-900/20 p-1">
          <TemplateBlock
            label={t('copyTemplateLabel')}
            template={content.template}
          />
        </div>
      )}
      {content?.example && (
        <div className="border-l-4 border-emerald-500 rounded-r-xl bg-emerald-50 dark:bg-emerald-900/10 p-1">
          <TemplateBlock
            label={t('fullExampleLabel')}
            template={content.example}
          />
        </div>
      )}
    </div>
  );
}

export function TransitionSlide({ content }: { content?: TransitionContent }) {
  // Pirmoji kortelė = "kas padaryta" (emerald), antroji = "kas toliau" (brand)
  const cardStyles = [
    {
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
      border: 'border-emerald-300 dark:border-emerald-700',
      num: 'bg-emerald-500',
      icon: '✓',
    },
    {
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-300 dark:border-brand-700',
      num: 'bg-brand-500',
      icon: '→',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Intro: aiškus perėjimo signalas ── */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-6 rounded-r-xl">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {content?.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{content?.note}</p>
      </div>

      {/* ── Kortelės: padaryta vs toliau ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(content?.mapping ?? []).map((item, idx) => {
          const s = cardStyles[idx] || cardStyles[1];
          return (
            <article
              key={idx}
              className={`${s.bg} border-2 ${s.border} rounded-2xl p-5`}
              role="article"
              aria-label={item.from}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-8 h-8 rounded-full ${s.num} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}
                >
                  {s.icon}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {item.from}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.to}
              </p>
            </article>
          );
        })}
      </div>

      {/* ── Takeaway: neutral blokas (M-DS2 – vienas gradientas per skaidrę) ── */}
      <div className="bg-brand-100 dark:bg-brand-900/20 p-5 rounded-xl text-brand-900 dark:text-brand-100 text-center shadow-md border border-brand-200 dark:border-brand-800">
        <p className="text-sm sm:text-base font-bold">{content?.takeaway}</p>
      </div>
    </div>
  );
}

/** Blokų sąrašas su collapsible: jei bloke yra concepts arba tip, rodomas mygtukas išskleisti; viduje – sąvokos ir patarimas */
function HierarchyBlocksList({ blocks }: { blocks: HierarchyBlock[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const safeBlocks = blocks ?? [];
  return (
    <div className="space-y-3">
      {safeBlocks.map((item, idx) => {
        const colors = getColorClasses(item.color);
        const hasExpandable =
          (item.concepts?.length ?? 0) > 0 ||
          (item.tip?.trim().length ?? 0) > 0;
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.num}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              type="button"
              onClick={
                hasExpandable
                  ? () => setOpenIdx(isOpen ? null : idx)
                  : undefined
              }
              className={`w-full flex items-center gap-4 p-4 text-left ${hasExpandable ? 'cursor-pointer' : 'cursor-default'}`}
              aria-expanded={hasExpandable ? isOpen : undefined}
              aria-controls={
                hasExpandable ? `hierarchy-block-${idx}` : undefined
              }
              aria-label={`${item.name}. ${item.priority}${hasExpandable ? (isOpen ? '. Suskleisti' : '. Išskleisti') : ''}`}
              id={`hierarchy-block-btn-${idx}`}
            >
              <div
                className={`w-10 h-10 rounded-full ${colors.bg} ${colors.bgDark} flex items-center justify-center font-bold ${colors.text} ${colors.textDark} flex-shrink-0`}
              >
                {item.num}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {item.desc}
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium min-w-0 max-w-[14rem] truncate ${colors.bg} ${colors.bgDark} ${colors.text} ${colors.textDark}`}
              >
                {item.priority}
              </div>
              {hasExpandable && (
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              )}
            </button>
            {hasExpandable && isOpen && (
              <div
                id={`hierarchy-block-${idx}`}
                role="region"
                aria-labelledby={`hierarchy-block-btn-${idx}`}
                className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-700"
              >
                <div className="pl-14 space-y-3 text-sm">
                  {item.concepts && item.concepts.length > 0 && (
                    <div>
                      <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sąvokos, padėsiančios suprasti:
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-400">
                        {item.concepts.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.tip?.trim() && (
                    <div className="flex gap-2 p-3 rounded-lg bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
                      <Lightbulb
                        className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <p className="text-accent-900 dark:text-accent-100">
                        {item.tip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** M-DS1: max 2 semantinės + brand per skaidrę – brand (1–4), emerald (5–6 Rekomenduojama/Pasirenkama) */
function getDefaultHierarchy(locale: string): HierarchyContent {
  const isEn = locale === 'en';
  return {
    introHeading: isEn
      ? 'Why is hierarchy important?'
      : 'Kodėl hierarchija svarbi?',
    introBody: '',
    blocks: [
      {
        num: '1',
        name: isEn ? 'Meta block' : 'Meta blokas',
        desc: isEn
          ? 'Role, experience, goal, audience'
          : 'Rolė, patirtis, tikslas, auditorija',
        priority: isEn ? 'Critical' : 'Kritinis',
        color: 'brand',
      },
      {
        num: '2',
        name: isEn ? 'Input block' : 'Input blokas',
        desc: isEn
          ? 'Data, numbers, facts, constraints'
          : 'Duomenys, skaičiai, faktai, apribojimai',
        priority: isEn ? 'Very important' : 'Labai svarbus',
        color: 'brand',
      },
      {
        num: '3',
        name: isEn ? 'Output block' : 'Output blokas',
        desc: isEn
          ? 'Format, structure, length, language'
          : 'Formatas, struktūra, ilgis, kalba',
        priority: isEn ? 'Very important' : 'Labai svarbus',
        color: 'brand',
      },
      {
        num: '4',
        name: isEn ? 'Reasoning block' : 'Reasoning blokas',
        desc: isEn
          ? 'Thinking sequence, logic, steps'
          : 'Mąstymo seka, logika, žingsniai',
        priority: isEn ? 'Important' : 'Svarbus',
        color: 'brand',
      },
      {
        num: '5',
        name: 'Quality Control',
        desc: isEn
          ? 'Validation criteria, checks'
          : 'Tikrinimo kriterijai, validacija',
        priority: isEn ? 'Recommended' : 'Rekomenduojama',
        color: 'emerald',
      },
      {
        num: '6',
        name: 'Advanced Parameters',
        desc: isEn
          ? 'Temperature, reasoning depth'
          : 'Temperature, reasoning gylis',
        priority: isEn ? 'Optional' : 'Pasirenkama',
        color: 'emerald',
      },
    ],
    tip: isEn
      ? 'Try creating a prompt without structure (as you normally do). Save it – we will compare it with a structured version at the end.'
      : 'Pabandykite sukurti promptą be struktūros (kaip paprastai darote). Išsaugokite - palyginsime su struktūruota versija pabaigoje.',
  };
}

export interface HierarchySlideProps {
  content?: HierarchyContent | null;
}
export function HierarchySlide({ content: contentProp }: HierarchySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const content = contentProp ?? getDefaultHierarchy(locale);
  return (
    <div className="space-y-6">
      {/* ── Intro: tamsus hook ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-2 right-4 text-[80px] font-black leading-none select-none">
            📐
          </div>
        </div>
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight mb-2">
            {content.introHeading ??
              (isEn
                ? 'Why is hierarchy important?'
                : 'Kodėl hierarchija svarbi?')}
          </h3>
          <p className="text-sm sm:text-base text-brand-200/90 leading-relaxed">
            {content.introBody || t('introBodyRlOrder')}
          </p>
        </div>
      </div>

      <HierarchyBlocksList blocks={content.blocks ?? []} />

      {content.practiceCopyable ? (
        <>
          <div className="mt-6 p-5 rounded-xl border border-accent-200 dark:border-accent-800 bg-accent-50 dark:bg-accent-900/20">
            <h3 className="font-bold text-lg text-accent-900 dark:text-accent-100 mb-2 flex items-center gap-2">
              <Lightbulb
                className="w-5 h-5 text-accent-600 dark:text-accent-400 shrink-0"
                strokeWidth={1.5}
              />
              {content.practiceHeading ??
                (isEn ? 'Practical task' : 'Praktinė užduotis')}
            </h3>
            {content.practiceBody && (
              <p className="text-sm text-accent-900 dark:text-accent-100 mb-3">
                {content.practiceBody}
              </p>
            )}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <pre className="flex-1 min-w-0 text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border border-accent-200 dark:border-accent-800">
                {content.practiceCopyable}
              </pre>
              <CopyButton
                text={content.practiceCopyable}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                ariaLabel={t('copyPrompt')}
                copiedLabel={tCommon('copiedExclaim')}
              />
            </div>
          </div>
          {content.tip && (
            <div className="mt-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-slate-800/60 border-l-4 border-l-slate-400">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {isEn ? 'Key takeaway' : 'Ką prisiminti'}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {content.tip}
              </p>
            </div>
          )}
        </>
      ) : content.tip ? (
        <div className="mt-6 p-5 bg-accent-50 dark:bg-accent-900/20 rounded-xl border border-accent-200 dark:border-accent-800">
          <p className="text-sm text-accent-900 dark:text-accent-100">
            <strong className="inline-flex items-center gap-1.5">
              <Lightbulb
                className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0"
                strokeWidth={1.5}
              />
              {isEn ? 'Practical task:' : 'Praktinė užduotis:'}
            </strong>{' '}
            {content.tip}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function getDefaultComparison(locale: string): ComparisonContent {
  const isEn = locale === 'en';
  return {
    introText: isEn
      ? 'What is compared: the same task, but different structure (without blocks vs with blocks).'
      : 'Kas lyginama: ta pati užduotis, bet skirtinga struktūra (be blokų vs su blokais).',
    unstructuredPrompt: isEn
      ? 'Create a training program about AI for me. It should be interesting and practical.'
      : 'Sukurk man mokymo programą apie DI. Turi būti įdomi ir praktinė.',
    structuredPrompt: isEn
      ? 'META: You are a training creator. Goal – prepare a 4-hour introductory AI training. Audience – 12–15 beginners.\nINPUT: Constraints – 1 instructor, no practical tool demos.\nOUTPUT: Table with 5 columns: module, duration, goal, activity, outcome. Tone – clear, professional.'
      : 'META: Tu esi mokymo kūrėjas. Tikslas – parengti 4 val. DI įvadinį mokymą. Auditorija – 12–15 pradedančiųjų.\nINPUT: Apribojimai – 1 lektorius, be praktinių įrankių demonstracijų.\nOUTPUT: Lentelė su 5 stulpeliais: modulis, trukmė, tikslas, veikla, rezultatas. Tonas – aiškus, profesionalus.',
    unstructuredCons: isEn
      ? ['Unclear target audience', 'No concrete data', 'Undefined format']
      : [
          'Neaiški tikslinė auditorija',
          'Nėra konkretių duomenų',
          'Neapibrėžtas formatas',
        ],
    structuredPros: isEn
      ? ['Clear audience', 'Concrete parameters', 'Precise format']
      : ['Aiški auditorija', 'Konkretūs parametrai', 'Tikslus formatas'],
    labelLeft: isEn ? 'Unstructured' : 'Nestruktūruotas',
    labelRight: isEn ? 'Structured' : 'Struktūruotas',
    stats: { leftPct: 40, rightPct: 85, lessEditsPct: 60 },
  };
}

export interface ComparisonSlideProps {
  content?: ComparisonContent | null;
}
export function ComparisonSlide({
  content: contentProp,
}: ComparisonSlideProps) {
  useTranslation();
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const defaults = getDefaultComparison(locale);
  const c = contentProp ?? defaults;
  const cons = c.unstructuredCons ?? defaults.unstructuredCons!;
  const pros = c.structuredPros ?? defaults.structuredPros!;
  const stats = c.stats ?? defaults.stats!;
  return (
    <div className="space-y-6">
      {/* ── Intro: tamsus hook ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
            {isEn
              ? 'Same task. Two different prompts. Which one wins?'
              : 'Ta pati užduotis. Du skirtingi promptai. Kuris laimi?'}
          </p>
          {c.introText && (
            <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
              {c.introText}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-xl border-2 border-rose-200 dark:border-rose-800">
          <h4 className="font-bold text-rose-900 dark:text-rose-100 mb-3 flex items-center gap-2">
            ❌ {c.labelLeft ?? (isEn ? 'Unstructured' : 'Nestruktūruotas')}
          </h4>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-sm italic text-gray-700 dark:text-gray-300 mb-4 relative whitespace-pre-line">
            <CopyButton
              text={c.unstructuredPrompt}
              className="absolute top-2 right-2"
              size="sm"
            />
            <p>{c.unstructuredPrompt}</p>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {cons.map((item, i) => (
              <p key={i} className="flex items-start gap-2">
                <span className="text-rose-600">•</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
          <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
            ✓ {c.labelRight ?? (isEn ? 'Structured' : 'Struktūruotas')}
          </h4>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-xs text-gray-700 dark:text-gray-300 max-h-40 overflow-y-auto mb-4 relative whitespace-pre-line">
            <CopyButton
              text={c.structuredPrompt}
              className="absolute top-2 right-2"
              size="sm"
            />
            <p>{c.structuredPrompt}</p>
          </div>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {pros.map((item, i) => (
              <p key={i} className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {stats && (
        <div className="bg-brand-50 dark:bg-brand-900/20 p-6 rounded-xl">
          <h4 className="font-bold mb-4 text-gray-900 dark:text-white">
            Rezultatų palyginimas:
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-rose-600">
                {stats.leftPct}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {c.labelLeft?.toLowerCase() ?? 'nestruktūruotas'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-emerald-600">
                {stats.rightPct}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {c.labelRight?.toLowerCase() ?? 'struktūruotas'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-brand-600">
                {stats.lessEditsPct}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                mažiau taisymų
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Summary Slide v2 (2026-02) ─────────────────────────────────────────
 *  Dizainas pagal top e-learning platformų šablonus:
 *  - Duolingo: celebration animations, confetti, achievement feel
 *  - Design+Code: success modal, gradient hero, glass morphism
 *  - Articulate: beyond bullet points – visual cards, next step CTA
 *  - Gamification patterns: stats, badges, staggered card entrance
 * ─────────────────────────────────────────────────────────────────────── */

function getDefaultSummary(locale: string): SummaryContent {
  const isEn = locale === 'en';
  return {
    introHeading: isEn ? 'What you learned' : 'Ką išmokote',
    introBody: isEn
      ? 'Congratulations! Now you know how to professionally structure prompts using the 6-block system, workflow concepts and prompting techniques.'
      : 'Sveikiname! Dabar žinote, kaip profesionaliai struktūruoti promptus naudojant 6 blokų sistemą, workflow sampratą ir promptavimo technikas.',
    stats: [
      { label: isEn ? 'Blocks' : 'Blokai', value: '6' },
      { label: isEn ? 'Techniques' : 'Technikos', value: '5' },
      { label: 'Workflow', value: '2' },
    ],
    sections: [
      {
        heading: isEn ? '6 Key Blocks' : '6 Pagrindiniai Blokai',
        icon: 'Layers',
        color: 'brand',
        items: isEn
          ? [
              'Meta – role, context and goal (who you are and what you do)',
              'Input – data, facts and constraints (what you have)',
              'Output – format, structure and tone (what you want)',
              'Reasoning – thinking structure (CoT or ToT)',
              'Quality – quality criteria (how to check)',
              'Advanced – parameters (Temperature, Reasoning depth)',
            ]
          : [
              'Meta - rolė, kontekstas ir tikslas (kas esate ir ką darote)',
              'Input - duomenys, faktai ir apribojimai (ką turite)',
              'Output - formatas, struktūra ir tonas (ko norite)',
              'Reasoning - mąstymo struktūra (CoT arba ToT)',
              'Quality - kokybės kriterijai (kaip patikrinti)',
              'Advanced - parametrai (Temperature, Reasoning depth)',
            ],
      },
      {
        heading: isEn ? 'Workflow & Techniques' : 'Workflow ir Technikos',
        icon: 'Workflow',
        color: 'violet',
        items: isEn
          ? [
              'Basic usage – for chats, ideas',
              'Workflow usage – for documents, processes',
              'Zero-shot, Few-shots, CoT, ToT, Instructing',
              'Manipulation – what to avoid',
            ]
          : [
              'Basic naudojimas – pokalbiams, idėjoms',
              'Workflow naudojimas – dokumentams, procesams',
              'Zero-shot, Few-shots, CoT, ToT, Instruktavimas',
              'Manipuliacija – ko vengti',
            ],
      },
      {
        heading: isEn ? 'Key Ideas' : 'Pagrindinės Idėjos',
        icon: 'Lightbulb',
        color: 'amber',
        items: isEn
          ? [
              'Hierarchy is critical (most important first)',
              'Specificity > generality (exact numbers)',
              'Examples improve results (Few-shots)',
              'Quality control is essential (Quality block)',
              'Workflow > Basic (for processes)',
              'Thinking models matter (CoT/ToT choice)',
            ]
          : [
              'Hierarchija yra kritinė (nuo svarbiausio)',
              'Konkretumas > bendrumas (tikslūs skaičiai)',
              'Pavyzdžiai pagerina rezultatus (Few-shots)',
              'Kokybės kontrolė būtina (Quality blokas)',
              'Workflow > Basic (procesams)',
              'Mąstymo modeliai svarbūs (CoT/ToT pasirinkimas)',
            ],
      },
      {
        heading: isEn ? 'Next Step' : 'Kitas Žingsnis',
        icon: 'ArrowRight',
        color: 'emerald',
        items: isEn
          ? [
              'Now that you have learned the 6-block system, workflow and techniques, it is time to test your knowledge – Module 2 test.',
            ]
          : [
              'Dabar, kai išmokote 6 blokų sistemą, workflow ir technikas, laikas patikrinti savo žinias – Modulio 2 testas.',
            ],
      },
    ],
    tagline: isEn
      ? 'Structured prompts = predictable results = greater efficiency'
      : 'Struktūruoti promptai = nuspėjami rezultatai = didesnis efektyvumas',
  };
}

/** Ikona pagal sekcijos pavadinimą – fallback CheckCircle */
function SectionIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  switch (name) {
    case 'Layers':
      return <Layers className={className} />;
    case 'Workflow':
      return <Repeat className={className} />;
    case 'Lightbulb':
      return <Lightbulb className={className} />;
    case 'ArrowRight':
      return <ArrowRight className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    default:
      return <CheckCircle className={className} />;
  }
}

/** Spalvų žemėlapis sekcijų kortelėms */
const sectionColorMap: Record<
  string,
  {
    card: string;
    iconBg: string;
    iconText: string;
    border: string;
    checkColor: string;
  }
> = {
  brand: {
    card: 'bg-brand-50/80 dark:bg-brand-900/20',
    iconBg: 'bg-brand-500',
    iconText: 'text-white',
    border: 'border-brand-200 dark:border-brand-800',
    checkColor: 'text-brand-500',
  },
  violet: {
    card: 'bg-violet-50/80 dark:bg-violet-900/20',
    iconBg: 'bg-violet-500',
    iconText: 'text-white',
    border: 'border-violet-200 dark:border-violet-800',
    checkColor: 'text-violet-500',
  },
  amber: {
    card: 'bg-amber-50/80 dark:bg-amber-900/20',
    iconBg: 'bg-amber-500',
    iconText: 'text-white',
    border: 'border-amber-200 dark:border-amber-800',
    checkColor: 'text-amber-500',
  },
  emerald: {
    card: 'bg-emerald-50/80 dark:bg-emerald-900/20',
    iconBg: 'bg-emerald-500',
    iconText: 'text-white',
    border: 'border-emerald-200 dark:border-emerald-800',
    checkColor: 'text-emerald-500',
  },
  rose: {
    card: 'bg-rose-50/80 dark:bg-rose-900/20',
    iconBg: 'bg-rose-500',
    iconText: 'text-white',
    border: 'border-rose-200 dark:border-rose-800',
    checkColor: 'text-rose-500',
  },
  orange: {
    card: 'bg-orange-50/80 dark:bg-orange-900/20',
    iconBg: 'bg-orange-500',
    iconText: 'text-white',
    border: 'border-orange-200 dark:border-orange-800',
    checkColor: 'text-orange-500',
  },
};
const defaultColor = sectionColorMap.brand;

/** Confetti dalelės – CSS-only animacija */
function ConfettiParticles() {
  const colors = ['#627d98', '#d4a520']; // brand + accent per DESIGN_GUIDE
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 0.8}s`,
    size: 4 + Math.random() * 6,
    duration: `${1.2 + Math.random() * 1.5}s`,
    rotation: Math.random() * 360,
  }));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm opacity-0"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            backgroundColor: p.color,
            animation: `summaryConfettiFall ${p.duration} ${p.delay} ease-out forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/** Kopijuojamo refleksijos prompto mygtukas su „Nukopijuota!" atsakymu */
function ReflectionCopyButton({ text }: { text: string }) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* silent */
    }
  };
  return (
    <button
      onClick={handleCopy}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm shadow-md active:scale-[0.98] transition-all ${
        copied
          ? 'bg-emerald-500 text-white shadow-emerald-500/20'
          : 'bg-gradient-to-r from-accent-400 to-accent-500 hover:from-accent-500 hover:to-accent-600 text-white shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/30'
      }`}
      aria-label={t('copyReflectionPromptAria')}
    >
      {copied ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      <span>{copied ? tCommon('copiedExclaim') : t('copyPrompt')}</span>
    </button>
  );
}

export interface SummarySlideProps {
  content?: SummaryContent | null;
  /** Kai paskutinė skaidrė – mygtukas „Pereikite prie kito modulio“ kviečia šią funkciją */
  onNextStep?: () => void;
}
export function SummarySlide({
  content: contentProp,
  onNextStep,
}: SummarySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const content = contentProp ?? getDefaultSummary(locale);
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Staggered entrance: show cards after hero animates
    const timer = setTimeout(() => setShowContent(true), 400);
    // Hide confetti after animation completes
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const nextStepHeadings = ['Kitas Žingsnis', 'Next Step'];
  const allKnowledge = (content.sections ?? []).filter(
    (s) =>
      s.icon !== 'ArrowRight' && !nextStepHeadings.includes(s.heading ?? '')
  );
  const knowledgeSections = allKnowledge.slice(0, 4);
  const nextStepSection = (content.sections ?? []).find(
    (s) => s.icon === 'ArrowRight' || nextStepHeadings.includes(s.heading ?? '')
  );

  return (
    <div className="space-y-8">
      {/* ── Hero Celebration Header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 dark:from-brand-800 dark:via-brand-700 dark:to-accent-700 p-8 lg:p-10 text-white">
        {/* Confetti overlay */}
        {showConfetti && <ConfettiParticles />}

        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"
          aria-hidden="true"
        />

        {/* Trophy icon */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10 animate-celebrate">
            <Trophy
              className="w-10 h-10 text-white"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
          <h2 className="text-lg lg:text-xl font-bold mb-2 drop-shadow-sm">
            {content.introHeading ?? t('whatYouLearnedHeading')}
          </h2>
          <p className="text-white/85 max-w-lg text-base lg:text-lg leading-relaxed">
            {content.introBody ?? ''}
          </p>

          {/* Stats row */}
          {content.stats && content.stats.length > 0 && (
            <div className="mt-6 flex gap-4 lg:gap-8 justify-center">
              {content.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 min-w-[80px] border border-white/10"
                  style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                >
                  <span className="text-3xl lg:text-4xl font-black leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs lg:text-sm text-white/70 mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Knowledge Section Cards (staggered entrance) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {knowledgeSections.map((section, sIdx) => {
          const colors =
            sectionColorMap[section.color ?? 'brand'] ?? defaultColor;
          return (
            <div
              key={sIdx}
              className={`relative rounded-2xl border-2 ${colors.border} ${colors.card} p-6 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                showContent
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${sIdx * 120}ms` }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl ${colors.iconBg} shadow-md`}
                >
                  <SectionIcon
                    name={section.icon}
                    className={`w-5 h-5 ${colors.iconText}`}
                  />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                  {section.heading}
                </h4>
              </div>

              {/* Items */}
              <ul className="space-y-2.5">
                {(section.items ?? []).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.checkColor}`}
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Item count badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${colors.iconBg} ${colors.iconText} shadow-sm`}
                >
                  {(section.items ?? []).length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Reflection Prompt (full-width, dedicated section) ── */}
      {content.reflectionPrompt && (
        <div
          className={`relative rounded-2xl border-2 border-accent-200 dark:border-accent-800 bg-accent-50 dark:bg-accent-900/20 p-6 lg:p-8 flex flex-col transition-all duration-300 shadow-md ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${knowledgeSections.length * 120}ms` }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 shadow-md">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 dark:text-white text-xl leading-tight">
                {content.reflectionTitle ?? 'Refleksijos promptas'}
              </h4>
              <p className="text-sm text-accent-700 dark:text-accent-300 font-medium mt-0.5">
                {isEn ? 'Copy and use with AI' : 'Nukopijuok ir naudok su DI'}
              </p>
            </div>
          </div>

          {/* Steps instruction */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs font-medium text-accent-700 dark:text-accent-300">
            <span className="inline-flex items-center gap-1.5 bg-accent-100 dark:bg-accent-800/40 px-3 py-1.5 rounded-lg">
              <span className="font-bold text-accent-600 dark:text-accent-200">
                1.
              </span>{' '}
              {isEn ? 'Copy' : 'Nukopijuok'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent-100 dark:bg-accent-800/40 px-3 py-1.5 rounded-lg">
              <span className="font-bold text-accent-600 dark:text-accent-200">
                2.
              </span>{' '}
              {isEn
                ? 'Paste into ChatGPT / Claude'
                : 'Įklijuok į ChatGPT / Claude'}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-accent-100 dark:bg-accent-800/40 px-3 py-1.5 rounded-lg">
              <span className="font-bold text-accent-600 dark:text-accent-200">
                3.
              </span>{' '}
              {isEn ? 'Reflect' : 'Atsakyk'}
            </span>
          </div>

          {/* Prompt text */}
          <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-xl p-5 border border-accent-200/50 dark:border-accent-700/50 mb-4">
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
              {content.reflectionPrompt}
            </pre>
          </div>

          {/* Copy button */}
          <ReflectionCopyButton text={content.reflectionPrompt ?? ''} />
        </div>
      )}

      {/* ── Pirmas veiksmas per 24–48 val. (User Journey) ── */}
      {content.firstAction24h && (
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-accent-200 dark:border-accent-700 bg-accent-50/50 dark:bg-accent-900/20 p-6 lg:p-8 transition-all duration-500 ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${knowledgeSections.length * 120 + 80}ms`,
          }}
        >
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Pirmas veiksmas per 24–48 val.
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.firstAction24h}
          </p>
        </div>
      )}

      {/* ── Next Step CTA ── */}
      {(nextStepSection || content.nextStepCTA) && (
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/30 dark:to-brand-900/20 p-6 lg:p-8 transition-all duration-500 ${
            showContent
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${knowledgeSections.length * 120 + 100}ms`,
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500 shadow-md">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t('nextStepHeading')}
              </h4>
              {nextStepSection ? (
                (nextStepSection.items ?? []).map((item, i) => (
                  <p
                    key={i}
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {item}
                  </p>
                ))
              ) : content.nextStepCTA ? (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content.nextStepCTA}
                </p>
              ) : null}
              {onNextStep ? (
                <button
                  type="button"
                  onClick={onNextStep}
                  className="mt-4 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-4 py-2 rounded-xl border border-emerald-600 shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label={t('goToNextModuleAria')}
                >
                  <span>{t('nextStepCtaLabel')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-700 dark:text-emerald-300 font-semibold text-sm px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <span>{t('nextStepCtaLabel')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* Decorative pulse dot */}
          <div className="absolute top-6 right-6" aria-hidden="true">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
        </div>
      )}

      {/* ── Motivational Footer ── */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 p-6 lg:p-8 text-center transition-all duration-500 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionDelay: `${(knowledgeSections.length + 1) * 120 + 200}ms`,
        }}
      >
        <div className="relative z-10">
          <div className="mb-3 flex justify-center" aria-hidden="true">
            <Sparkles
              className="w-8 h-8 text-brand-500 dark:text-brand-400"
              strokeWidth={1.5}
            />
          </div>
          <h2 className="text-lg lg:text-xl font-bold mb-2 text-brand-800 dark:text-brand-200">
            {isEn ? 'Good luck with AI!' : 'Sėkmės su DI!'}
          </h2>
          <p className="text-brand-600 dark:text-brand-400 text-base lg:text-lg max-w-md mx-auto">
            {content.tagline ??
              (isEn
                ? 'Structured prompts = predictable results = greater efficiency'
                : 'Struktūruoti promptai = nuspėjami rezultatai = didesnis efektyvumas')}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── DI Paradoksas Infographic (skaidrė 725) – pilna interaktyvi infografika ─── */
export function DiParadoxInfographicSlide({
  content,
  onGoToGlossary,
}: {
  content?: DiParadoxInfographicContent;
  onGoToGlossary?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const [showSources, setShowSources] = useState(false);
  if (!content || content.variant !== 'di-paradox') return null;

  const heroColorMap: Record<string, string> = {
    rose: 'text-rose-600 dark:text-rose-400',
    brand: 'text-brand-600 dark:text-brand-400',
    amber: 'text-amber-600 dark:text-amber-400',
  };

  const barColorMap: Record<string, string> = {
    accent: 'bg-accent-500',
    amber: 'bg-amber-500',
    slate: 'bg-slate-400 dark:bg-slate-500',
  };

  const funnelColorMap: Record<string, string> = {
    accent: 'bg-accent-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
  };

  const actionBorderMap: Record<string, string> = {
    accent: 'border-t-accent-500',
    amber: 'border-t-amber-500',
    slate: 'border-t-slate-500',
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-5 lg:p-6 border-b border-slate-200 dark:border-slate-700 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            {content.badge && (
              <span className="inline-flex items-center gap-1.5 bg-accent-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded mb-3">
                {content.badge}
              </span>
            )}
            <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                {content.subtitle}
              </p>
            )}
          </div>
          {content.sourceBox && (
            <div className="text-right">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {content.sourceBox.label}
              </div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">
                {content.sourceBox.title}
              </div>
              {content.sourceBox.meta && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  {content.sourceBox.meta}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-700 bg-slate-900 dark:bg-slate-950">
          {(content.heroStats ?? []).map((stat, idx) => (
            <div
              key={idx}
              className="relative p-5 lg:p-6 flex flex-col gap-2 min-h-[52px] py-4 hover:bg-slate-800/50 dark:hover:bg-slate-800/30 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 lg:after:left-6 lg:after:right-6 after:h-0.5 after:bg-transparent hover:after:bg-accent-500 after:transition-colors"
            >
              <div
                className={`text-3xl lg:text-4xl font-extrabold ${heroColorMap[stat.colorKey ?? 'brand'] ?? heroColorMap.brand}`}
              >
                <StatWithTooltip
                  value={stat.value}
                  tooltip={stat.tooltip}
                  colorClass={
                    heroColorMap[stat.colorKey ?? 'brand'] ?? heroColorMap.brand
                  }
                />
              </div>
              <div className="text-xs text-slate-300 dark:text-slate-400 leading-snug max-w-[180px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paradox Cards */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
          Paradoksas: asmeninis vs. organizacinis lygmuo
          <span className="flex-1 h-px bg-slate-200 dark:bg-slate-600" />
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(content.paradoxCards ?? []).map((card, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-gray-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="absolute -top-3 left-5 bg-accent-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded">
                {card.number}
              </span>
              <div className="text-2xl mb-2">{card.icon}</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                {card.title}
              </h4>
              <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {renderBodyWithBold(card.body, { numberAccent: true })}
              </div>
              {card.stats && card.stats.length > 0 && (
                <div className="space-y-1.5">
                  {card.stats.map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded"
                    >
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {s.label}
                      </span>
                      <span className="text-sm font-extrabold text-brand-600 dark:text-brand-400">
                        <StatWithTooltip value={s.value} tooltip={s.tooltip} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shadow Section – Bar Chart */}
      {content.shadowSection && (
        <div className="rounded-xl bg-slate-900 dark:bg-slate-950 p-5 lg:p-6">
          <div className="mb-4">
            {content.shadowSection.sublabel && (
              <div className="text-[10px] font-normal uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {content.shadowSection.sublabel}
              </div>
            )}
            <div className="font-bold text-white text-sm">
              {content.shadowSection.label}
            </div>
          </div>
          <div className="space-y-3">
            {(content.shadowSection.bars ?? []).map((bar, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="text-[11px] text-slate-400 w-44 flex-shrink-0">
                  {bar.label}
                </div>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColorMap[bar.colorKey ?? 'accent'] ?? barColorMap.accent} transition-[width] duration-1000 ease-out`}
                    style={{ width: `${bar.percent}%` }}
                    role="progressbar"
                    aria-valuenow={bar.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${bar.label}: ${bar.value}`}
                  />
                </div>
                <span
                  className="font-bold text-white text-sm w-10 text-right"
                  title={
                    bar.tooltip
                      ? `${bar.tooltip.explanation} ${bar.tooltip.trend ?? ''}`
                      : undefined
                  }
                >
                  <StatWithTooltip
                    value={bar.value}
                    tooltip={bar.tooltip}
                    colorClass="text-white"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funnel + Value – two columns */}
      {(content.funnelSection || content.valueSection) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content.funnelSection && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                {content.funnelSection.title}
              </h3>
              <div className="space-y-4">
                {(content.funnelSection.steps ?? []).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-14 h-10 flex items-center justify-center font-extrabold text-white text-sm rounded ${funnelColorMap[step.colorKey ?? 'accent'] ?? funnelColorMap.accent}`}
                      title={
                        step.tooltip
                          ? `${step.tooltip.explanation} ${step.tooltip.trend ?? ''}`
                          : undefined
                      }
                    >
                      <StatWithTooltip
                        value={step.value}
                        tooltip={step.tooltip}
                        colorClass="text-white"
                      />
                    </div>
                    <div className="pt-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {content.valueSection && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                {content.valueSection.title}
              </h3>
              <div className="space-y-1">
                {(content.valueSection.items ?? []).map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded border-l-4 ${
                      item.tag
                        ? 'bg-white dark:bg-gray-800 border-l-accent-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-l-transparent'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${idx === 0 ? 'bg-accent-500' : 'bg-slate-400'}`}
                    />
                    <span className="text-sm text-gray-900 dark:text-white flex-1">
                      {item.text}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/30 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    )}
                  </div>
                ))}
                {content.valueSection.commonCondition && (
                  <div className="mt-4 p-3 rounded bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-1">
                      {content.valueSection.commonCondition.label}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {content.valueSection.commonCondition.text}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Solution Pipeline */}
      {content.solutionSection && (
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
            {content.solutionSection.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {(content.solutionSection.pipeline ?? []).map((step, idx) => (
              <div
                key={idx}
                className={`relative rounded-lg border-2 p-4 text-center transition-all ${
                  step.highlighted
                    ? 'border-accent-500 bg-accent-50/50 dark:bg-accent-900/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-accent-400'
                }`}
              >
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-1">
                  {step.num}
                </div>
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {step.name}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  {step.description}
                </div>
                {idx < (content.solutionSection!.pipeline?.length ?? 0) - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-1 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-lg">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Cards */}
      {content.actionSection && (
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
            {content.actionSection.label}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(content.actionSection.cards ?? []).map((card, idx) => (
              <div
                key={idx}
                className={`relative rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5 pt-6 overflow-hidden hover:bg-white dark:hover:bg-gray-800 transition-colors ${
                  actionBorderMap[card.colorKey ?? 'accent'] ??
                  actionBorderMap.accent
                } border-t-4`}
              >
                <div className="text-4xl font-extrabold text-slate-200 dark:text-slate-600 mb-2">
                  {card.num}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {card.body}
                </p>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 flex items-center gap-1.5">
                  <span className="w-4 h-px bg-accent-500" />
                  {card.kpi}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conclusion */}
      {content.conclusionSection && (
        <div className="rounded-xl bg-slate-900 dark:bg-slate-950 p-5 lg:p-6 flex gap-4 items-start">
          <div className="text-4xl opacity-80" aria-hidden="true">
            {content.conclusionSection.icon}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg mb-2">
              {content.conclusionSection.heading.includes('technologinė') ? (
                <>
                  {content.conclusionSection.heading.replace(
                    ' technologinė',
                    ''
                  )}{' '}
                  <span className="text-accent-400">technologinė</span>
                </>
              ) : (
                content.conclusionSection.heading
              )}
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
              {content.conclusionSection.body}
            </p>
            {content.conclusionSection.chips &&
              content.conclusionSection.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {content.conclusionSection.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-slate-300 dark:text-slate-400 bg-white/10 border border-white/15 px-3 py-1 rounded"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>
      )}

      {/* Footer rodomas SlideContent lygmenyje pagal content.footer */}

      {/* Glossary CTA */}
      {onGoToGlossary && content.onGoToGlossaryTerm && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onGoToGlossary}
            className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-sm font-medium py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg"
            aria-label={t('openGlossaryAria', {
              term: content.onGoToGlossaryTerm ?? '',
            })}
          >
            <BookMarked className="w-4 h-4" aria-hidden />
            <span>{t('glossaryLabel')}</span>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden />
          </button>
        </div>
      )}

      {/* Sources – Collapsible */}
      {content.sources && content.sources.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <button
            type="button"
            onClick={() => setShowSources(!showSources)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors min-h-[44px]"
            aria-expanded={showSources}
          >
            <span className="flex items-center gap-1.5">
              {t('showSourcesAria')} ({content.sources.length})
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showSources ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          {showSources && (
            <ul
              className="mt-3 divide-y divide-slate-200 dark:divide-slate-700"
              role="list"
            >
              {content.sources.map((source, idx) => (
                <li key={idx} className="py-3 first:pt-0 last:pb-0">
                  <div className="text-xs leading-relaxed">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {source.title ?? source.label}
                    </div>
                    <div className="mt-0.5 text-slate-600 dark:text-slate-400">
                      {source.year && <span>({source.year})</span>}
                      {source.institution && (
                        <span> · {source.institution}</span>
                      )}
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-[11px] font-medium"
                      >
                        {t('viewStudyLabel')}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function ProductivityInfographicSlide({
  content,
  onGoToGlossary,
}: {
  content?: ProductivityInfographicContent;
  onGoToGlossary?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const [showSources, setShowSources] = useState(false);

  if (!content) return null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[550px]">
          {/* Left Section - Hero */}
          <div className="lg:col-span-1 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 dark:from-brand-700 dark:via-brand-600 dark:to-brand-800 text-white p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
            {/* Background decoration – Lucide per M-DS4 */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 select-none pointer-events-none"
              aria-hidden="true"
            >
              <Rocket className="w-32 h-32" strokeWidth={1} />
            </div>

            <h2 className="text-xl lg:text-2xl font-black mb-2 leading-tight relative z-10">
              {content.title}
            </h2>
            {onGoToGlossary && (
              <button
                type="button"
                onClick={onGoToGlossary}
                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-medium mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg py-1 min-h-[44px]"
                aria-label={t('openGlossaryAria', {
                  term: content.title ?? '',
                })}
              >
                <BookMarked className="w-4 h-4" aria-hidden />
                <span>{t('glossaryLabel')}</span>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden />
              </button>
            )}

            <div className="mb-6 relative z-10">
              <div className="text-5xl lg:text-6xl font-black mb-2 drop-shadow-lg">
                {content.heroNumber}
              </div>
              <div className="text-lg lg:text-xl font-bold uppercase tracking-wider">
                {content.heroText}
              </div>
            </div>

            <div className="mt-auto relative z-10 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-xs lg:text-sm leading-relaxed italic">
                &ldquo;{content.conclusion}&rdquo;
              </p>
            </div>
          </div>

          {/* Right Section - Cards and Insights */}
          <div className="lg:col-span-2 p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              {(content.cards ?? []).map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-t-4 border-brand-500 dark:border-brand-400"
                >
                  <div className="text-3xl mb-2">{card.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">
                    {card.title}
                  </h3>
                  <div className="space-y-1.5">
                    {(card.stats ?? []).map((stat, statIdx) => (
                      <div
                        key={statIdx}
                        className="flex justify-between items-center p-1.5 bg-gray-50 dark:bg-gray-900/50 rounded"
                      >
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </span>
                        <span className="text-base font-black text-brand-600 dark:text-brand-400">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Insights Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {(content.insights ?? []).map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center shadow-sm dark:shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-2xl mb-1">{insight.emoji}</div>
                  <div className="text-lg font-black text-brand-600 dark:text-brand-400 mb-0.5">
                    {insight.value}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 leading-tight">
                    {insight.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Sources Section - Collapsible */}
            {content.sources && content.sources.length > 0 && (
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span>📚</span> {t('showSourcesAria')} (
                    {content.sources.length})
                  </span>
                  <span
                    className={`transform transition-transform ${showSources ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>
                {showSources && (
                  <ul
                    className="mt-3 divide-y divide-gray-200 dark:divide-gray-700"
                    role="list"
                  >
                    {content.sources.map((source, idx) => (
                      <li key={idx} className="py-3 first:pt-0 last:pb-0">
                        <div className="text-xs leading-relaxed">
                          <div className="font-bold text-gray-900 dark:text-gray-100">
                            {source.title ?? source.label}
                          </div>
                          <div className="mt-0.5 text-gray-600 dark:text-gray-400">
                            {source.journal && <span>{source.journal}</span>}
                            {source.year && (
                              <span className="text-gray-400 dark:text-gray-500">
                                {' '}
                                ({source.year})
                              </span>
                            )}
                            {source.institution && (
                              <span>
                                {source.journal || source.year ? ' · ' : ''}
                                {source.institution}
                              </span>
                            )}
                          </div>
                          {source.url && (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1.5 inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-[11px] font-medium"
                            >
                              {t('viewStudyLabel')}
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── News-portal infographic (DI galimybės praktiškai) – data from docs/archive/root/portalas.txt ─── */
function parsePercent(s: string): number {
  const normalized = String(s)
    .replace(',', '.')
    .replace(/[^\d.]/g, '');
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0;
}

const NUM_COLORS: Record<string, string> = {
  brand: 'text-brand-600 dark:text-brand-400',
  violet: 'text-violet-600 dark:text-violet-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  amber: 'text-amber-600 dark:text-amber-400',
  rose: 'text-rose-600 dark:text-rose-400',
  slate: 'text-slate-600 dark:text-slate-400',
};

const BAR_COLORS: Record<string, string> = {
  brand: 'bg-brand-500 dark:bg-brand-400',
  violet: 'bg-violet-500 dark:bg-violet-400',
  emerald: 'bg-emerald-500 dark:bg-emerald-400',
  amber: 'bg-amber-500 dark:bg-amber-400',
  rose: 'bg-rose-500 dark:bg-rose-400',
  slate: 'bg-slate-300 dark:bg-slate-500',
};

const PORTAL_BASE_URL = import.meta.env.BASE_URL || '/';
function portalImageSrc(src: string): string {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  return `${PORTAL_BASE_URL}${src.replace(/^\//, '')}`;
}

export function NewsPortalInfographicSlide({
  content,
}: {
  content?: NewsPortalInfographicContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const [showSources, setShowSources] = useState(false);
  if (!content) return null;

  const {
    portalBrand,
    eyebrow,
    headline,
    subline,
    takeaway,
    takeawayCta,
    featured,
    heroImageVertical,
    bannerImageHorizontal,
    bannerBetweenKpiAndSections,
    kpiCards,
    sectionCards,
    mainInsightBlock,
    secondaryCards,
    toolsAndYouth,
    insightCard,
    ctaBlock,
    footerBrand,
    footerSub,
    sources,
  } = content;

  const useTwoLevelLayout = Boolean(
    mainInsightBlock && secondaryCards && secondaryCards.length === 2
  );

  const hasHeroImage = Boolean(heroImageVertical?.src);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 lg:space-y-8">
      {/* Portal masthead – "shouting" brand (Next Level AI), not report header */}
      {portalBrand && (
        <div className="flex items-center gap-3 border-b border-accent-200 dark:border-accent-800 py-4 bg-accent-50 dark:bg-accent-900/10 px-1 -mx-1 rounded-lg">
          <span
            className="text-xl lg:text-2xl font-extrabold text-accent-700 dark:text-accent-300 tracking-tight"
            aria-label={`Redakcija: ${portalBrand}`}
          >
            {portalBrand}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Žiniasklaida
          </span>
        </div>
      )}
      {/* Header: optional vertical image | eyebrow + headline + subline + takeaway | hero stat */}
      <div
        className={`grid gap-6 items-center ${hasHeroImage ? 'grid-cols-1 lg:grid-cols-[minmax(200px,280px)_1fr_minmax(200px,280px)]' : 'grid-cols-1 lg:grid-cols-[1fr_minmax(200px,280px)]'}`}
      >
        {hasHeroImage && (
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0 shadow-sm">
            <div className="p-3 bg-gray-50/50 dark:bg-gray-900/30">
              <img
                src={portalImageSrc(heroImageVertical!.src)}
                alt={heroImageVertical!.alt}
                className="block w-full h-auto object-cover max-h-72 rounded-lg"
              />
            </div>
          </div>
        )}
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 bg-brand-500 dark:bg-brand-600 text-white text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-full mb-3">
            <span
              className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"
              aria-hidden
            />
            {eyebrow}
          </div>
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-tight">
            {headline}
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300 max-w-xl">
            {subline}
          </p>
          {(takeaway || takeawayCta) && (
            <div
              className="mt-4 max-w-xl border-l-4 border-accent-400 dark:border-accent-600 pl-3"
              role="complementary"
              aria-label={t('mainTakeawaySummaryAria')}
            >
              {takeaway && (
                <p className="text-base font-bold text-accent-700 dark:text-accent-300">
                  {takeaway}
                </p>
              )}
              {takeawayCta && (
                <p className="mt-2 text-base lg:text-lg font-extrabold bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 dark:from-accent-500 dark:via-accent-600 dark:to-accent-700 bg-clip-text text-transparent">
                  {takeawayCta}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 dark:from-brand-700 dark:to-brand-800 text-white rounded-2xl p-5 text-center min-w-[200px] shadow-lg">
          <div className="text-3xl lg:text-4xl font-extrabold">
            {featured.bigNumber}
          </div>
          <div className="mt-2 text-xs lg:text-sm opacity-95 leading-snug">
            {featured.labelStrong && (
              <strong className="block">{featured.labelStrong}</strong>
            )}
            {featured.label}
          </div>
          {featured.source && (
            <div className="mt-3 text-xs opacity-60">{featured.source}</div>
          )}
        </div>
      </div>

      {bannerImageHorizontal?.src && (
        <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-[21/9] max-h-40">
          <div className="p-2 h-full">
            <img
              src={portalImageSrc(bannerImageHorizontal.src)}
              alt={bannerImageHorizontal.alt}
              className="block w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {/* KPI strip – vienoda border (brand) mažesniam vizualiniam triukšmui; skaičiai spalvoti (NUM_COLORS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(kpiCards ?? []).map((card, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 border-t-4 border-t-brand-500 dark:border-t-brand-400 animate-fade-in`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="text-xl mb-1">{card.icon}</div>
            <div
              className={`text-2xl font-extrabold ${NUM_COLORS[card.colorKey ?? 'brand'] ?? NUM_COLORS.brand}`}
            >
              {card.value}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">
              {card.desc}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">
              {card.source}
            </div>
          </div>
        ))}
      </div>

      {bannerBetweenKpiAndSections?.src && (
        <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-[21/9] max-h-40">
          <div className="p-2 h-full">
            <img
              src={portalImageSrc(bannerBetweenKpiAndSections.src)}
              alt={bannerBetweenKpiAndSections.alt}
              className="block w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {useTwoLevelLayout ? (
        <>
          {/* Level 1: full-width main insight block */}
          {mainInsightBlock && (
            <div
              className="rounded-xl p-6 lg:p-8 bg-gradient-to-br from-brand-600 to-brand-700 dark:from-brand-700 dark:to-brand-800 text-white flex flex-col sm:flex-row items-center gap-6 shadow-lg"
              role="region"
              aria-label={t('mainTakeawayAria')}
            >
              {mainInsightBlock.imageVertical?.src && (
                <div className="w-full sm:w-48 shrink-0 rounded-xl overflow-hidden border border-white/20">
                  <div className="p-2">
                    <img
                      src={portalImageSrc(mainInsightBlock.imageVertical.src)}
                      alt={mainInsightBlock.imageVertical.alt}
                      className="block w-full h-auto object-cover max-h-40 rounded-lg"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="text-4xl lg:text-5xl font-extrabold">
                  {mainInsightBlock.bigNumber}
                </div>
                <p className="mt-3 text-lg lg:text-xl font-semibold opacity-95">
                  {mainInsightBlock.label}
                </p>
                {mainInsightBlock.source && (
                  <p className="mt-2 text-sm opacity-75">
                    {mainInsightBlock.source}
                  </p>
                )}
              </div>
            </div>
          )}
          {/* Level 2: 2 smaller KPI cards */}
          {secondaryCards && secondaryCards.length === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {secondaryCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm animate-fade-in ${card.imageVertical?.src ? 'grid grid-cols-1 sm:grid-cols-[minmax(100px,140px)_1fr] gap-4 items-stretch' : ''}`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {card.imageVertical?.src && (
                    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                      <div className="p-2 bg-gray-50/50 dark:bg-gray-900/30">
                        <img
                          src={portalImageSrc(card.imageVertical.src)}
                          alt={card.imageVertical.alt}
                          className="block w-full h-auto object-cover max-h-36 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      {card.sectionLabel}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <div
                      className={`text-3xl font-extrabold ${NUM_COLORS[card.colorKey ?? 'brand'] ?? NUM_COLORS.brand}`}
                    >
                      {card.value}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-normal">
                      {card.label}
                    </p>
                    {card.source && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">
                        {card.source}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Legacy: 3 section cards */
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 items-stretch">
          {(sectionCards ?? []).map((card, idx) => {
            const sectionImage =
              'imageVertical' in card ? card.imageVertical : undefined;
            const hasSectionImage = Boolean(sectionImage?.src);
            return (
              <div
                key={idx}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm min-h-0 animate-fade-in ${hasSectionImage ? 'grid grid-cols-1 sm:grid-cols-[minmax(80px,120px)_minmax(260px,1fr)]' : ''}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {hasSectionImage && (
                  <div className="min-w-0 w-full max-w-[120px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 sm:max-w-none">
                    <div className="p-2 bg-gray-50/50 dark:bg-gray-900/30">
                      <img
                        src={portalImageSrc(sectionImage!.src)}
                        alt={sectionImage!.alt}
                        className="block w-full h-auto object-cover max-h-48 rounded-lg"
                      />
                    </div>
                  </div>
                )}
                <div className="p-4 min-w-0 min-h-0 overflow-x-auto">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    {card.sectionLabel}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    {card.title}
                  </h3>
                  {'type' in card && card.type === 'split' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <div className="text-center min-w-0">
                          <div
                            className={`text-2xl font-extrabold ${NUM_COLORS.brand}`}
                          >
                            {card.leftNum}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 break-normal">
                            {card.leftLabel}
                          </div>
                        </div>
                        <div className="text-center border-l border-gray-200 dark:border-gray-700 min-w-0">
                          <div
                            className={`text-2xl font-extrabold ${NUM_COLORS.rose}`}
                          >
                            {card.rightNum}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 break-normal">
                            {card.rightLabel}
                          </div>
                        </div>
                      </div>
                      {card.gapLabel && (
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                          {card.gapLabel}
                        </p>
                      )}
                      <div className="space-y-2">
                        {card.bars.map((bar, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-0.5 gap-2">
                              <span className="text-gray-600 dark:text-gray-400 break-normal min-w-0">
                                {bar.name}
                              </span>
                              <span
                                className={`font-bold shrink-0 whitespace-nowrap ${NUM_COLORS[bar.colorKey ?? 'brand'] ?? NUM_COLORS.brand}`}
                              >
                                {bar.pct}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${BAR_COLORS[bar.colorKey ?? 'brand'] ?? BAR_COLORS.brand}`}
                                style={{ width: `${parsePercent(bar.pct)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {'type' in card && card.type === 'business' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {card.sectorTiles.map((tile, i) => {
                          const bgMap: Record<string, string> = {
                            brand: 'bg-brand-50 dark:bg-brand-900/20',
                            violet: 'bg-violet-50 dark:bg-violet-900/20',
                            emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
                            amber: 'bg-amber-50 dark:bg-amber-900/20',
                          };
                          return (
                            <div
                              key={i}
                              className={`flex items-center gap-2 p-2 rounded-xl min-w-0 ${bgMap[tile.colorKey ?? 'brand'] ?? bgMap.brand}`}
                            >
                              <span className="text-lg shrink-0">
                                {tile.icon}
                              </span>
                              <div className="min-w-0 overflow-hidden">
                                <div
                                  className={`text-lg font-extrabold whitespace-nowrap ${NUM_COLORS[tile.colorKey ?? 'brand'] ?? NUM_COLORS.brand}`}
                                >
                                  {tile.pct}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 break-normal">
                                  {tile.name}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl min-w-0">
                        <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 shrink-0 whitespace-nowrap">
                          {card.calloutValue}
                        </span>
                        <div className="text-xs text-gray-600 dark:text-gray-400 min-w-0 break-normal space-y-1.5">
                          {card.calloutText.includes('**Pagal dydį:**') ? (
                            (() => {
                              const [first, ...rest] =
                                card.calloutText.split(/\*\*Pagal dydį:\*\*/);
                              const second = rest
                                .join('**Pagal dydį:**')
                                .trim();
                              const toHtml = (s: string) =>
                                s.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong>$1</strong>'
                                );
                              return (
                                <>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: toHtml(first.trim()),
                                    }}
                                  />
                                  {second ? (
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          '<strong>Pagal dydį:</strong> ' +
                                          toHtml(second),
                                      }}
                                    />
                                  ) : null}
                                </>
                              );
                            })()
                          ) : (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: card.calloutText.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong>$1</strong>'
                                ),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {'type' in card && card.type === 'lithuania' && (
                    <>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {card.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-center min-w-0"
                          >
                            <div
                              className={`text-2xl font-extrabold whitespace-nowrap ${NUM_COLORS[stat.colorKey ?? 'emerald'] ?? NUM_COLORS.emerald}`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 break-normal">
                              {stat.sub}
                            </div>
                            {stat.badge && (
                              <span className="inline-block mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded whitespace-nowrap">
                                {stat.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {card.bars.map((bar, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-0.5 gap-2">
                              <span className="text-gray-600 dark:text-gray-400 break-normal min-w-0">
                                {bar.name}
                              </span>
                              <span
                                className={`font-bold shrink-0 whitespace-nowrap ${NUM_COLORS[bar.colorKey ?? 'slate'] ?? NUM_COLORS.slate}`}
                              >
                                {bar.pct}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${BAR_COLORS[bar.colorKey ?? 'slate'] ?? BAR_COLORS.slate}`}
                                style={{ width: `${parsePercent(bar.pct)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Row 2 → Variant C: 3 atskiros zonos (Įrankiai | Jaunimas | Pagrindinė žinutė) – vertikali seka, 8pt grid: space-y-5 */}
      <div className="space-y-5">
        {toolsAndYouth && (
          <>
            {/* Zona 1: Įrankiai – pilno pločio kortelė */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                {toolsAndYouth.toolsLabel}
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                {toolsAndYouth.toolsTitle}
              </h3>
              <div className="space-y-2 max-w-2xl">
                {(toolsAndYouth.tools ?? []).map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm shrink-0">
                      {t.name.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {t.name}
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${BAR_COLORS[t.colorKey ?? 'brand'] ?? BAR_COLORS.brand}`}
                          style={{ width: `${parsePercent(t.pct)}%` }}
                        />
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold shrink-0 ${NUM_COLORS[t.colorKey ?? 'brand'] ?? NUM_COLORS.brand}`}
                    >
                      {t.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Zona 2: Jaunimas – pilno pločio kortelė */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div
                className={`grid grid-cols-1 ${toolsAndYouth.youthImageVertical?.src ? 'lg:grid-cols-[minmax(140px,200px)_1fr]' : ''} gap-4 items-stretch`}
              >
                {toolsAndYouth.youthImageVertical?.src && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-2 bg-gray-50/50 dark:bg-gray-900/30">
                      <img
                        src={portalImageSrc(
                          toolsAndYouth.youthImageVertical.src
                        )}
                        alt={toolsAndYouth.youthImageVertical.alt}
                        className="block w-full h-auto object-cover max-h-52 rounded-lg"
                      />
                    </div>
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    {toolsAndYouth.youthLabel}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    {toolsAndYouth.youthTitle}
                  </h3>
                  <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl text-center mb-3 inline-block">
                    <div className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">
                      {toolsAndYouth.youthBigNum}
                    </div>
                    <div
                      className="text-xs text-gray-600 dark:text-gray-400 mt-1"
                      dangerouslySetInnerHTML={{
                        __html: toolsAndYouth.youthLabelText.replace(
                          /<br\s*\/?>/g,
                          '<br />'
                        ),
                      }}
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    {(toolsAndYouth.youthBars ?? []).map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-gray-600 dark:text-gray-400">
                            {bar.name}
                          </span>
                          <span
                            className={`font-bold ${NUM_COLORS[bar.colorKey ?? 'slate'] ?? NUM_COLORS.slate}`}
                          >
                            {bar.pct}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${BAR_COLORS[bar.colorKey ?? 'slate'] ?? BAR_COLORS.slate}`}
                            style={{ width: `${parsePercent(bar.pct)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {toolsAndYouth.youthFootnote && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {toolsAndYouth.youthFootnote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {insightCard && (
          /* Zona 3: Pagrindinė žinutė – pilno pločio blokas */
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 dark:from-brand-700 dark:to-brand-800 text-white rounded-xl p-5 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-wider opacity-75 mb-2">
              {insightCard.tag}
            </div>
            <h3 className="text-base font-bold leading-snug mb-4 flex-1">
              {insightCard.headline}
            </h3>
            <ul className="space-y-2">
              {(insightCard.points ?? []).map((p, i) => (
                <li key={i} className="flex gap-2 text-sm opacity-95">
                  <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold shrink-0">
                    {p.num}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: p.text.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="opacity-100">$1</strong>'
                      ),
                    }}
                  />
                </li>
              ))}
            </ul>
            {insightCard.illustrationHorizontal?.src && (
              <div className="mt-4 w-full rounded-xl overflow-hidden border border-white/20 max-h-20 aspect-[3/1] shrink-0">
                <div className="p-2 h-full">
                  <img
                    src={portalImageSrc(insightCard.illustrationHorizontal.src)}
                    alt={insightCard.illustrationHorizontal.alt}
                    className="block w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Single CTA block – invitation to act, not dashboard (GOLDEN_STANDARD: accent) */}
      {ctaBlock?.label && (
        <div
          className="rounded-xl p-5 lg:p-6 bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 shadow-sm"
          role="region"
          aria-label={t('whatToDoNextAria')}
        >
          <p className="text-base lg:text-lg font-bold text-gray-900 dark:text-white leading-snug">
            {ctaBlock.label}
          </p>
          {ctaBlock.subline && (
            <p className="mt-2 text-sm font-semibold text-accent-700 dark:text-accent-300">
              {ctaBlock.subline}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-3">
        <div>
          <div className="font-bold text-gray-900 dark:text-white">
            {footerBrand}
          </div>
          {footerSub && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {footerSub}
            </div>
          )}
        </div>
        {sources && sources.length > 0 ? (
          <div>
            <button
              type="button"
              onClick={() => setShowSources(!showSources)}
              aria-label={t('showSourcesAria')}
              aria-expanded={showSources}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-lg"
            >
              {t('showSourcesAria')} ({sources.length}){' '}
              {showSources ? '▲' : '▼'}
            </button>
            {showSources && (
              <ul
                className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1"
                role="list"
              >
                {sources.map((s, i) => {
                  const name = s.title ?? s.label ?? s.institution ?? '';
                  const y = (s as { year?: string }).year;
                  return <li key={i}>{y ? `${name} (${y})` : name}</li>;
                })}
              </ul>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
            {t('sourcesLabel')}: KPMG · McKinsey · Eurostat · Stat.gov.lt ·
            AIPRM
          </div>
        )}
      </div>
    </div>
  );
}

const DEFAULT_PRACTICE_SUMMARY: PracticeSummaryContent = {
  title: 'Mokymas Baigtas!',
  subtitle:
    'Sveikiname! Tu sėkmingai baigei Prompt Anatomijos mokymą ir dabar gali kurti profesionalius, struktūruotus promptus.',
  learnedItems: [
    '6 blokų sistemą',
    'Hierarchijos svarbą',
    'Konkretaus input naudą',
    'Kokybės kontrolę',
  ],
  nextStepsItems: [
    'Praktikuokite kasdien',
    'Kurkite šablonų biblioteką',
    'Dalinkitės su komanda',
    'Iteruokite ir tobulinkite',
  ],
  taglineTitle: 'Struktūra = Rezultatas',
  taglineSub: '5 minutės geram promptui = valandos sutaupytos vėliau',
};

export interface PracticeSummarySlideProps {
  content?: PracticeSummaryContent | null;
  /** M9: rodyti „Užbaigta X iš 16 scenarijų“ */
  completedScenarioCount?: number;
  totalScenarioCount?: number;
}
export function PracticeSummarySlide({
  content: contentProp,
  completedScenarioCount,
  totalScenarioCount,
}: PracticeSummarySlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const c = contentProp ?? DEFAULT_PRACTICE_SUMMARY;
  const isDefault = contentProp == null;
  const displaySubtitle = isDefault
    ? t('practiceSummaryDefaultSubtitle')
    : (c.subtitle ?? '');
  const displayLearned = isDefault
    ? [
        t('practiceSummaryDefaultLearned1'),
        t('practiceSummaryDefaultLearned2'),
        t('practiceSummaryDefaultLearned3'),
        t('practiceSummaryDefaultLearned4'),
      ]
    : (c.learnedItems ?? DEFAULT_PRACTICE_SUMMARY.learnedItems!);
  const displayNextSteps = isDefault
    ? [
        t('practiceSummaryDefaultNext1'),
        t('practiceSummaryDefaultNext2'),
        t('practiceSummaryDefaultNext3'),
        t('practiceSummaryDefaultNext4'),
      ]
    : (c.nextStepsItems ?? DEFAULT_PRACTICE_SUMMARY.nextStepsItems!);
  const displayTaglineTitle = isDefault
    ? t('practiceSummaryDefaultTaglineTitle')
    : (c.taglineTitle ?? '');
  const displayTaglineSub = isDefault
    ? t('practiceSummaryDefaultTaglineSub')
    : (c.taglineSub ?? '');
  const hasSections = (c.sections?.length ?? 0) > 0;
  const showScenarioProgress =
    completedScenarioCount != null &&
    totalScenarioCount != null &&
    totalScenarioCount > 0;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-accent-50 dark:from-emerald-900/20 dark:to-accent-900/20 p-8 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-brand-500 mb-4">
          <span className="text-4xl">🎓</span>
        </div>
        <h2 className="text-lg lg:text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {(c as { introHeading?: string }).introHeading ??
            c.title ??
            t('trainingCompleteTitle')}{' '}
          🎉
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
          {(c as { introBody?: string }).introBody ?? displaySubtitle}
        </p>
        {(c as { stats?: { label: string; value: string }[] }).stats?.length ? (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {(c as { stats: { label: string; value: string }[] }).stats.map(
              (s, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-accent-700 dark:text-accent-300"
                >
                  {s.value} {s.label}
                </span>
              )
            )}
          </div>
        ) : null}
        {showScenarioProgress && (
          <p className="mt-3 text-sm font-semibold text-accent-700 dark:text-accent-300">
            {t('completedScenariosText', {
              count: completedScenarioCount,
              total: totalScenarioCount,
            })}
          </p>
        )}
      </div>

      {hasSections ? (
        <div className="space-y-4">
          {c.sections!.map((section, i) => (
            <div
              key={i}
              className={`p-5 rounded-xl border ${
                section.blockVariant === 'accent'
                  ? 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800'
                  : section.blockVariant === 'emerald'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                    : section.blockVariant === 'violet'
                      ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                {section.heading}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckCircle
                className="w-4 h-4 text-emerald-500"
                strokeWidth={1.5}
              />{' '}
              {t('whatYouLearnedHeading')}
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              {displayLearned.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Rocket className="w-4 h-4" strokeWidth={1.5} />{' '}
              {t('nextStepsHeading')}
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              {displayNextSteps.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {c.reflectionPrompt && (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-accent-200 dark:border-accent-700">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">
            Refleksijos promptas
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Įklijuok į DI ir atsakyk trumpai.
          </p>
          <div className="relative bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-3">
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
              {c.reflectionPrompt}
            </pre>
          </div>
          <ReflectionCopyButton text={c.reflectionPrompt} />
        </div>
      )}

      {(c as { nextStepCTA?: string }).nextStepCTA && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl p-4 text-center">
          <p className="font-bold text-emerald-800 dark:text-emerald-200 mb-1">
            {t('nextStepHeading')}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {(c as { nextStepCTA: string }).nextStepCTA}
          </p>
        </div>
      )}
      {((c as { tagline?: string }).tagline ??
        displayTaglineTitle ??
        displayTaglineSub) && (
        <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-6 rounded-xl text-white text-center">
          {(c as { tagline?: string }).tagline && (
            <p className="text-lg font-bold">
              {(c as { tagline: string }).tagline}
            </p>
          )}
          {!(c as { tagline?: string }).tagline && displayTaglineTitle && (
            <h4 className="text-xl font-bold mb-2">{displayTaglineTitle}</h4>
          )}
          {!(c as { tagline?: string }).tagline && displayTaglineSub && (
            <p className="text-brand-100">{displayTaglineSub}</p>
          )}
        </div>
      )}
    </div>
  );
}

/** path-step (kelio žingsnis) – Duomenų analizės kelias; badge atrakina žodynėlio terminus */
export function PathStepSlide({
  content,
  isCompleted,
  onMarkComplete,
}: {
  content: PathStepContent;
  isCompleted: boolean;
  onMarkComplete: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const hasSections = (content.sections?.length ?? 0) > 0;
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin
            className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0"
            aria-hidden
          />
          <span className="text-sm font-semibold text-brand-800 dark:text-brand-200">
            Duomenų analizės kelias
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/40 text-accent-800 dark:text-accent-200 text-sm font-medium">
          Žingsnis {content.stepNumber}
        </span>
      </div>
      <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
        {content.title}
      </h2>
      {content.body && (
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {content.body}
        </p>
      )}
      {hasSections && (
        <div className="space-y-4">
          {content.sections!.map((sec, i) => (
            <div
              key={i}
              className="rounded-lg border-l-4 border-brand-500 bg-slate-50 dark:bg-slate-800/40 pl-4 py-3 pr-3"
            >
              {sec.heading && (
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {sec.heading}
                </h3>
              )}
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      )}
      {content.unlockedGlossaryTerms &&
        content.unlockedGlossaryTerms.length > 0 && (
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Užbaigę žingsnį atrakinsite žodynėlyje:{' '}
            {content.unlockedGlossaryTerms.join(', ')}.
          </p>
        )}
      {!isCompleted ? (
        <button
          type="button"
          onClick={onMarkComplete}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl font-medium bg-accent-600 hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          aria-label={t('markStepDoneAria')}
        >
          <CheckCircle className="w-5 h-5" aria-hidden />
          Pažymėjau kaip atliktą
        </button>
      ) : (
        <p className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          <CheckCircle className="w-5 h-5" aria-hidden />
          Šis žingsnis jau atliktas
        </p>
      )}
      {content.footer && (
        <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
          {content.footer}
        </p>
      )}
    </div>
  );
}
