import { useState, useEffect, useRef, Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import {
  CheckCircle,
  Sparkles,
  Target,
  ChevronRight,
  ChevronDown,
  Info,
  ExternalLink,
  ArrowRight,
  Wrench,
} from 'lucide-react';
import { track } from '../../../../utils/analytics';
import { logError } from '../../../../utils/logger';
import {
  downloadM6HandoutPdf,
  type M6HandoutContent,
} from '../../../../utils/m6HandoutPdf';
import { getM6HandoutContent } from '../../../../data/handoutContentLoader';
import { useLocale } from '../../../../contexts/LocaleContext';
import {
  DownloadTemplateButton,
  TemplateBlock,
  PromptFilterToolSurface,
  ManipulationContrastToolSurface,
  FigmaEmbed,
  InstructGptQualityBlock,
  WorkflowChainsBlock,
  ContextEngineeringPipelineDiagram,
  TableHorizontalScroll,
} from '../../shared';
import { extractFormatPreview } from '../../../../utils/extractFormatPreview';
import { HandoutDownloadButton } from '../../../HandoutDownloadButton';
import { getContentBlockVariantClasses } from '../../utils/blockVariantClasses';
import Banner from '../../../ui/Banner';
import ChoiceControl from '../../../ui/ChoiceControl';
import CTAButton from '../../../ui/CTAButton';
import { typographyClasses } from '../../../../design-tokens';
import type { ContentBlockContent, Slide } from '../../../../types/modules';
import { renderBodyWithBold, RecognitionExerciseBlock } from '../shared';
import { renderDiagramSection } from './diagramRenderers';

const PREMIUM_DIAGRAM_IMAGE_KEYS = [
  'm7_analysis_types',
  'm7_data_prep_workflow',
  'm7_data_story_cycle',
  'm7_three_agents_flow',
  'm7_master_workflow',
  'm7_da_pipeline',
  'm7_bi_schema',
  'm9_data_workflow',
  'm9_workflow_step_prompts',
  'da_pipeline_6',
  'da_bi_schema_4',
  'rl_process_diagram',
  /** LMS polish pilot – slim chrome around hero diagram */
  'agent_workflow_diagram',
  /** M4/56 comparison-mode-architecture etalon – slim chrome (no emerald frame) */
  'llm_arch',
  /** M10–12 LMS polish + labs – slim chrome parity */
  'm10_three_a_strategy',
  'm10_team_readiness_lab',
  'm10_human_control_simulator',
  'm4_prompt_mode_simulator',
  'm10_tool_decision_tree',
  'm10_agent_taxonomy',
  'm10_trigger_flow',
  'm10_agent_orchestrator',
  'm10_learning_loop',
  'm10_workflow_spec',
  'm10_incident_playbook',
  'm12_three_labs',
  'm12_multi_agent_schema',
  /** M13–15 hero spines */
  'm13_aec_funnel',
  'm13_prompt_stack',
  'm13_media_pipeline',
  'm13_consistency_lock',
  'm13_consistency_lab',
  'm13_postprod_steps',
  'turinio_workflow',
  'm15_practice_loop',
  /** M16–18 signature schemas (TE-M1618) */
  'm16_delivery_gates',
  'm16_vsr_maturity',
  'm16_user_cycle',
  'm18_packet_stack',
  'm18_diff_ritual',
  'm18_launch_gates',
] as const;

function isPremiumDiagramSection(image?: string) {
  if (!image) return false;
  const normalized = image.replace(/^\//, '').toLowerCase();
  return PREMIUM_DIAGRAM_IMAGE_KEYS.some(
    (key) =>
      normalized === key ||
      normalized === `${key}.svg` ||
      normalized.endsWith(`/${key}`) ||
      normalized.endsWith(`/${key}.svg`)
  );
}

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

/** Jei practicalTask.template sutampa su copyable sekcija – nerodyti antro bloko (M8 801–802). */
function isDuplicateOfSectionCopyable(
  template: string,
  sections: { copyable?: string }[]
): boolean {
  const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();
  const nt = norm(template);
  if (!nt) return false;
  return sections.some((sec) => {
    const nc = norm(sec.copyable ?? '');
    if (!nc) return false;
    return nt === nc || nt.startsWith(nc) || nc.startsWith(nt);
  });
}

export function ContentBlockSlide({
  content,
  slide,
  moduleId,
  onGoToTools,
  onGoToSummary,
}: {
  content: ContentBlockContent;
  slide?: Slide;
  moduleId?: number;
  onGoToTools?: (moduleId: number) => void;
  /** M9 skaidrė 94: praleisti hub ir scenarijus – tiesiai į praktikos santrauką */
  onGoToSummary?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const tCommon = getT('common');
  const tQuiz = getT('quiz');
  const tPractice = getT('testPractice');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const isDiVisata = !!content.comparisonImages;
  const isBonusSlide =
    slide?.id === 51 ||
    slide?.id === 52 ||
    slide?.id === 516 ||
    slide?.id === 801 ||
    slide?.id === 802;
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [showCorrectPromptSolution, setShowCorrectPromptSolution] =
    useState(false);
  const [correctPromptUserText, setCorrectPromptUserText] = useState('');
  const [handoutError, setHandoutError] = useState(false);
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
  const toolChoiceSection = sectionsList.find((s) => s.toolChoiceBar);
  const hasLinkedCopySections = sectionsList.some(
    (s) => s.linkedRowIndex !== undefined
  );
  const tableRowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const linkedCopySectionRefs = useRef<(HTMLDivElement | null)[]>([]);
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
    try {
      setHandoutError(false);
      await downloadM6HandoutPdf(
        getM6HandoutContent(locale) as M6HandoutContent,
        undefined,
        locale
      );
    } catch (error) {
      logError(error instanceof Error ? error : new Error(String(error)), {
        feature: 'handout_pdf',
        moduleId: 6,
        slideId: slide?.id,
        locale,
        surface: 'content_slide',
      });
      setHandoutError(true);
    }
  }, [locale, slide?.id]);

  useEffect(() => {
    if (selectedToolRowIndex == null) return;
    const linkedEl = linkedCopySectionRefs.current[selectedToolRowIndex];
    if (linkedEl?.scrollIntoView) {
      linkedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const el = tableRowRefs.current[selectedToolRowIndex];
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedToolRowIndex]);

  useEffect(() => {
    if (!toolChoiceSection?.toolChoiceBar || selectedToolRowIndex !== null)
      return;
    const bar = toolChoiceSection.toolChoiceBar;
    const toolVariant = bar.variant;
    // prompt-tool / manipulation-contrast / chips default: null until pick
    if (
      toolVariant === 'prompt-tool' ||
      toolVariant === 'manipulation-contrast' ||
      bar.autoSelect !== true
    ) {
      return;
    }
    // Opt-in legacy catalog: auto-select first choice
    const defaultRow = bar.choices?.[0]?.rowIndex ?? 0;
    setSelectedToolRowIndex(defaultRow);
  }, [toolChoiceSection, selectedToolRowIndex]);

  const preCopyGatePassed =
    !content.preCopyCheckBlock ||
    preCopyCheckAnswer === content.preCopyCheckBlock.correct;
  const copyLockedHint = content.preCopyCheckBlock
    ? t('preCopyGateLockedHint')
    : undefined;

  const scrollToFirstAction = useCallback(() => {
    const root = slideContainerRef.current;
    if (!root) return;
    const targets = [
      '[data-linked-copy] [data-action="copy"]',
      '[data-linked-copy]',
      '[data-action="copy"]',
      '#practical-task-heading',
      '[data-brief-check]',
      '[data-pre-copy-check]',
      '[data-section-variant="brand"]',
    ];
    for (const selector of targets) {
      const el = root.querySelector(selector);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  }, []);

  const firstCopyableSectionIndex = sectionsList.findIndex(
    (s) => (s.copyable ?? '').trim().length > 0
  );
  const hasCopyableSection = firstCopyableSectionIndex >= 0;
  /** When no linked-copy filter: place preCopy before first copyable (not slide top). */
  const preCopyBeforeFirstCopyable =
    Boolean(content.preCopyCheckBlock) &&
    !hasLinkedCopySections &&
    hasCopyableSection;
  const hasBrandActionSection = sectionsList.some(
    (s) => s.blockVariant === 'brand'
  );
  const hasActionContent =
    hasCopyableSection ||
    Boolean(content.practicalTask) ||
    Boolean(content.briefCheckBlock) ||
    Boolean(content.preCopyCheckBlock) ||
    Boolean(content.firstActionCTA) ||
    hasBrandActionSection;

  const showGotoActionButton =
    !isTabsMode &&
    (sectionsList.length > 2 ||
      Boolean(content.firstActionCTA) ||
      Boolean(content.practicalTask)) &&
    hasActionContent;

  const m9SkipToSummaryHandler =
    moduleId === 9 && slide?.id === 94 ? onGoToSummary : undefined;

  const renderPreCopyCheck = () => {
    if (!content.preCopyCheckBlock) return null;
    const block = content.preCopyCheckBlock;
    const choiceOptions = block.options.map((opt, idx) => ({
      id: String(idx),
      label: opt,
    }));
    const selectedId =
      preCopyCheckAnswer === null ? null : String(preCopyCheckAnswer);
    const isCorrect =
      preCopyCheckAnswer !== null && preCopyCheckAnswer === block.correct;
    return (
      <div
        data-pre-copy-check
        className="p-5 rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10 space-y-3"
      >
        <h3
          className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-0 flex items-center gap-2`}
        >
          <span className="inline-flex p-1.5 rounded-lg bg-accent-500/20">
            <Target className="w-4 h-4 text-accent-600 dark:text-accent-400" />
          </span>
          {block.heading ?? t('preCopyCheckHeading')}
        </h3>
        <ChoiceControl
          legend={block.question}
          options={choiceOptions}
          value={selectedId}
          onChange={(id) => {
            if (preCopyGatePassed) return;
            setPreCopyCheckAnswer(Number(id));
          }}
          columns={1}
          size="compact"
          statusHint={
            preCopyGatePassed
              ? t('preCopyGateUnlockedHint')
              : preCopyCheckAnswer !== null
                ? t('preCopyGateRetryHint')
                : t('preCopyGateLockedHint')
          }
        />
        {preCopyCheckAnswer !== null && (
          <p
            className={`${typographyClasses.bodyMuted}`}
            role="status"
            aria-live="polite"
            data-pre-copy-result
          >
            <strong>
              {isCorrect ? tQuiz('correctLabel') : tQuiz('incorrectLabel')}
            </strong>{' '}
            {block.explanation}
          </p>
        )}
      </div>
    );
  };

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
            <p
              className={`${typographyClasses.body} font-bold leading-snug tracking-tight`}
            >
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
          <p
            className={`${typographyClasses.body} font-medium text-gray-800 dark:text-gray-200`}
          >
            {isEn
              ? 'You passed the test. Here\u2019s a bonus.'
              : 'Tu įveikei testą. Čia – papildoma nauda.'}
          </p>
        </div>
      )}
      {content.whyBenefit && (
        <div
          className={getContentBlockVariantClasses({ variant: 'accent' })}
          role="region"
          aria-label={t('whyBenefitAria')}
        >
          <p
            className={`${typographyClasses.body} font-medium text-accent-900 dark:text-accent-100`}
          >
            {content.whyBenefit}
          </p>
        </div>
      )}
      {content.comparisonImages && (
        <div className="space-y-6">
          {content.comparisonImages.bridgeText && (
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 border border-brand-200 dark:border-brand-800">
              <p
                className={`${typographyClasses.body} text-gray-800 dark:text-gray-200 font-medium`}
              >
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
                <p
                  className={`${typographyClasses.label} text-di-visata-text-muted dark:text-gray-300`}
                >
                  {content.comparisonImages.left.label}
                </p>
              )}
              {content.comparisonImages.left.explanation && (
                <p
                  className={`${typographyClasses.bodyMuted} text-di-visata-text-muted dark:text-gray-400`}
                >
                  {content.comparisonImages.left.explanation}
                </p>
              )}
              {content.comparisonImages.left.source && (
                <p
                  className={`${typographyClasses.small} text-gray-500 dark:text-gray-400 italic`}
                >
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
                <p
                  className={`${typographyClasses.label} text-di-visata-text-muted dark:text-gray-300`}
                >
                  {content.comparisonImages.right.label}
                </p>
              )}
              {content.comparisonImages.right.explanation && (
                <p
                  className={`${typographyClasses.bodyMuted} text-di-visata-text-muted dark:text-gray-400`}
                >
                  {content.comparisonImages.right.explanation}
                </p>
              )}
              {content.comparisonImages.right.source && (
                <p
                  className={`${typographyClasses.small} text-gray-500 dark:text-gray-400 italic`}
                >
                  {content.comparisonImages.right.source}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {content.briefCheckBlock && (
        <div
          data-brief-check
          className="p-5 rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10"
        >
          <h3
            className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-2 flex items-center gap-2`}
          >
            <span className="inline-flex p-1.5 rounded-lg bg-accent-500/20">
              <Target className="w-4 h-4 text-accent-600 dark:text-accent-400" />
            </span>
            {t('briefCheckHeading')}
          </h3>
          <p className={`${typographyClasses.bodyMuted} mb-3`}>
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
                  <span
                    className={`${typographyClasses.body} text-gray-700 dark:text-gray-300`}
                  >
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
            <p className={`mt-3 ${typographyClasses.bodyMuted}`}>
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
      {!hasLinkedCopySections &&
        !preCopyBeforeFirstCopyable &&
        renderPreCopyCheck()}

      {isTabsMode && tabSections.length > 0 && (
        <div className="space-y-6">
          {(content.sections ?? [])[0] && (
            <div className="p-4 lg:p-5 rounded-xl border-l-4 border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h3
                className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-2`}
              >
                {(content.sections ?? [])[0].heading}
              </h3>
              {(content.sections ?? [])[0].body && (
                <p className={`${typographyClasses.bodyMuted} mb-0`}>
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
                  className={`min-h-[44px] px-4 py-2 rounded-t-lg ${typographyClasses.body} font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
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
            const blockClasses = getContentBlockVariantClasses({ variant });
            return (
              <div
                key={idx}
                id={`help-tab-panel-${idx}`}
                role="tabpanel"
                aria-labelledby={`help-tab-${idx}`}
                className={blockClasses}
              >
                {tab.heading && (
                  <h3
                    className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-2`}
                  >
                    {tab.heading}
                  </h3>
                )}
                {tab.body && (
                  <p className={`${typographyClasses.bodyMuted} mb-4`}>
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
          <CTAButton
            variant="secondary"
            onClick={expandAll}
            className="px-4 py-2 text-sm rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            aria-label={t('expandAllAria')}
          >
            {t('expandAllLabel')}
          </CTAButton>
          <CTAButton
            variant="secondary"
            onClick={collapseAll}
            className="px-4 py-2 text-sm rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            aria-label={t('collapseAllAria')}
          >
            {t('collapseAllLabel')}
          </CTAButton>
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
          if (
            hasLinkedCopySections &&
            section.linkedRowIndex !== undefined &&
            (selectedToolRowIndex === null ||
              section.linkedRowIndex !== selectedToolRowIndex)
          ) {
            return null;
          }
          const isOptional = section.heading
            ?.toLowerCase()
            .includes('(optional)');
          const variant = section.blockVariant || 'default';
          const isBottomLine = isDiVisata && variant === 'accent';
          const isRlDiagramSection = section.image === 'rl_process_diagram';
          const isInteractiveDiagram = isPremiumDiagramSection(section.image);
          const isCollapsible =
            Boolean(section.collapsible) && !isShortContent(section);
          const isOpen = isCollapsible ? Boolean(openSections[i]) : true;
          const contentId = `content-section-${i}`;
          const sectionPadding = isRlDiagramSection ? 'p-4' : 'p-4 lg:p-5';
          const blockClasses = getContentBlockVariantClasses({
            variant,
            isOptional,
            isBottomLine,
            isInteractiveDiagram,
            sectionPadding,
          });
          const isLinkedCopySection = section.linkedRowIndex !== undefined;
          const isActiveLinkedCopy =
            isLinkedCopySection &&
            selectedToolRowIndex !== null &&
            section.linkedRowIndex === selectedToolRowIndex;
          const isFirstCollapsible =
            Boolean(section.collapsible) &&
            !sectionsList.slice(0, i).some((s) => s.collapsible);
          return (
            <Fragment key={i}>
              {isFirstCollapsible &&
                hasLinkedCopySections &&
                renderPreCopyCheck()}
              {preCopyBeforeFirstCopyable &&
                i === firstCopyableSectionIndex &&
                renderPreCopyCheck()}
              <div
                className={blockClasses}
                ref={(el) => {
                  if (section.linkedRowIndex !== undefined) {
                    linkedCopySectionRefs.current[section.linkedRowIndex] = el;
                  }
                }}
                {...(variant === 'brand'
                  ? { 'data-section-variant': 'brand' }
                  : {})}
                {...(isActiveLinkedCopy ? { 'data-linked-copy': '' } : {})}
              >
                {section.heading && !isCollapsible && (
                  <h3
                    className={
                      isOptional
                        ? `${typographyClasses.small} font-semibold text-gray-600 dark:text-gray-400 mb-2`
                        : isBottomLine
                          ? `${typographyClasses.h2} text-gray-800 dark:text-gray-100 mb-2`
                          : isInteractiveDiagram
                            ? `${typographyClasses.h1} font-semibold text-gray-900 dark:text-white mb-2`
                            : `${typographyClasses.h3} text-gray-900 dark:text-white mb-2`
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
                          ? `${typographyClasses.small} font-semibold text-gray-600 dark:text-gray-400`
                          : isBottomLine
                            ? `${typographyClasses.h2} font-semibold text-gray-800 dark:text-gray-100`
                            : `${typographyClasses.h3} text-gray-900 dark:text-white`
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
                      <p className={`${typographyClasses.bodyMuted} mb-0`}>
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
                            <span
                              className={`${typographyClasses.label} font-bold text-brand-700 dark:text-brand-300 group-hover:text-brand-800 dark:group-hover:text-brand-200 flex items-center gap-1.5`}
                            >
                              {tool.name}
                              <ExternalLink
                                className="w-3.5 h-3.5 shrink-0"
                                aria-hidden
                              />
                            </span>
                            <span
                              className={`${typographyClasses.bodyMuted} mt-0.5`}
                            >
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
                        <figcaption
                          className={`mt-2 ${typographyClasses.bodyMuted}`}
                        >
                          {renderBodyWithBold(section.body)}
                        </figcaption>
                      )}
                    </figure>
                  ) : section.image ? (
                    (renderDiagramSection(section.image, section.body, {
                      moduleId,
                      slideId: slide?.id,
                      imageAlt: section.imageAlt ?? section.heading ?? '',
                    }) ?? (
                      <figure className="my-4">
                        <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 max-h-80">
                          <img
                            src={`${import.meta.env.BASE_URL || '/'}${section.image.replace(/^\//, '')}`}
                            alt={section.imageAlt ?? section.heading ?? ''}
                            className="w-full h-auto bg-transparent border-0 rounded-lg object-contain"
                          />
                        </div>
                        {section.body && (
                          <figcaption
                            className={`mt-2 ${typographyClasses.bodyMuted}`}
                          >
                            {renderBodyWithBold(section.body)}
                          </figcaption>
                        )}
                        <a
                          href={`${import.meta.env.BASE_URL || '/'}${section.image.replace(/^\//, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-1.5 inline-block ${typographyClasses.small} font-medium text-brand-600 dark:text-brand-400 hover:underline`}
                        >
                          {t('openInNewTabLabel')}
                        </a>
                      </figure>
                    ))
                  ) : null}
                  {!section.image &&
                    !section.presentationToolsBlock &&
                    section.body &&
                    section.table?.comparisonStyle !== true && (
                      <div
                        className={
                          isOptional
                            ? `${typographyClasses.bodyMuted} whitespace-pre-line`
                            : `${typographyClasses.body} text-gray-700 dark:text-gray-300 whitespace-pre-line`
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
                        copyDisabled={!preCopyGatePassed}
                        copyLockedHint={copyLockedHint}
                      />
                    </div>
                  )}
                  {section.workflowChains &&
                    section.workflowChains.length > 0 &&
                    !section.presentationToolsBlock && (
                      <WorkflowChainsBlock chains={section.workflowChains} />
                    )}
                  {section.toolChoiceBar &&
                    !section.presentationToolsBlock &&
                    section.toolChoiceBar.variant === 'prompt-tool' &&
                    (() => {
                      const bar = section.toolChoiceBar!;
                      const activeLinked = sectionsList.find(
                        (s) =>
                          s.linkedRowIndex !== undefined &&
                          s.linkedRowIndex === selectedToolRowIndex
                      );
                      const activeChoice = (bar.choices ?? []).find(
                        (c) => c.rowIndex === selectedToolRowIndex
                      );
                      const formatPreview =
                        activeLinked?.formatPreview ??
                        extractFormatPreview(activeLinked?.copyable);
                      return (
                        <PromptFilterToolSurface
                          question={bar.question}
                          sequenceHint={bar.sequenceHint}
                          sampleData={bar.sampleData}
                          choices={bar.choices ?? []}
                          selectedRowIndex={selectedToolRowIndex}
                          onSelect={setSelectedToolRowIndex}
                          formatPreview={formatPreview}
                          whenHint={activeChoice?.whenHint}
                        />
                      );
                    })()}
                  {section.toolChoiceBar &&
                    !section.presentationToolsBlock &&
                    section.toolChoiceBar.variant === 'manipulation-contrast' &&
                    (() => {
                      const bar = section.toolChoiceBar!;
                      const activeLinked = sectionsList.find(
                        (s) =>
                          s.linkedRowIndex !== undefined &&
                          s.linkedRowIndex === selectedToolRowIndex
                      );
                      return (
                        <ManipulationContrastToolSurface
                          question={bar.question}
                          sequenceHint={bar.sequenceHint}
                          choices={bar.choices ?? []}
                          selectedRowIndex={selectedToolRowIndex}
                          onSelect={setSelectedToolRowIndex}
                          goodExample={activeLinked?.copyable ?? null}
                        />
                      );
                    })()}
                  {section.toolChoiceBar &&
                    !section.presentationToolsBlock &&
                    section.toolChoiceBar.variant !== 'prompt-tool' &&
                    section.toolChoiceBar.variant !==
                      'manipulation-contrast' && (
                      <div
                        className="mb-4 space-y-3"
                        role="region"
                        aria-label={t('chooseTaskTypeAria')}
                      >
                        {section.toolChoiceBar.question && (
                          <p
                            className={`${typographyClasses.label} text-gray-700 dark:text-gray-300`}
                          >
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
                                  className={`min-h-[44px] px-4 py-2.5 rounded-xl ${typographyClasses.body} font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
                                    isSelected
                                      ? 'bg-accent-500 text-white dark:bg-accent-600 dark:text-white'
                                      : 'bg-slate-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                                  }`}
                                  aria-pressed={isSelected}
                                  aria-label={`${choice.label}${isSelected ? t('choiceSelectedSuffix') : ''}`}
                                >
                                  {choice.label}
                                </button>
                              );
                            }
                          )}
                        </div>
                        {hasLinkedCopySections && (
                          <p className={`${typographyClasses.bodyMuted} mb-0`}>
                            {t('toolChoiceLinkedCopyHint')}
                          </p>
                        )}
                        <div
                          role="status"
                          aria-live="polite"
                          data-tool-choice-live
                        >
                          {selectedToolRowIndex != null &&
                            (() => {
                              const activeChoice = (
                                section.toolChoiceBar!.choices ?? []
                              ).find(
                                (c) => c.rowIndex === selectedToolRowIndex
                              );
                              const activeWhenHint = activeChoice?.whenHint;
                              return (
                                <>
                                  <span className="sr-only">
                                    {t('toolChoicePromptRevealed', {
                                      label: activeChoice?.label ?? '',
                                    })}
                                  </span>
                                  {activeWhenHint ? (
                                    <p
                                      className={`${typographyClasses.body} text-gray-700 dark:text-gray-300`}
                                      data-tool-choice-when-hint
                                    >
                                      {activeWhenHint}
                                    </p>
                                  ) : null}
                                </>
                              );
                            })()}
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
                          ? t('tableComparisonAria', {
                              headers: (section.table.headers ?? []).join(
                                isEn ? ' and ' : ' ir '
                              ),
                            })
                          : numCols === 3 &&
                              (section.heading?.includes('Sprendimo matrica') ??
                                section.heading?.includes('Decision matrix') ??
                                false)
                            ? (section.heading ?? t('tableDecisionMatrixAria'))
                            : numCols >= 3
                              ? t('tableGenericAria', {
                                  heading:
                                    section.heading ??
                                    section.table.headers?.join(', ') ??
                                    t('tableInContentFallback'),
                                })
                              : t('tableToolComparisonAria');
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
                      const showScrollChrome = isComparison || isSolutionMatrix;
                      return (
                        <>
                          <TableHorizontalScroll
                            showChrome={showScrollChrome}
                            ariaLabel={ariaLabel}
                            viewportClassName={`rounded-lg ${isComparison ? 'border border-gray-100 dark:border-gray-700' : 'border border-gray-200 dark:border-gray-600'} ${isTermsTable ? 'bg-white dark:bg-slate-900/40 border-l-4 border-slate-400 dark:border-slate-500' : ''}`}
                          >
                            <table
                              className={`border-collapse ${typographyClasses.body} ${isComparison ? 'min-w-[36rem] w-full' : isSolutionMatrix ? 'min-w-[32rem] w-full' : 'w-full'}`}
                            >
                              <thead>
                                <tr>
                                  {(section.table.headers ?? []).map((h, j) => (
                                    <th
                                      key={j}
                                      className={`text-left ${typographyClasses.h3} text-gray-900 dark:text-white align-top border-b-2 ${
                                        isComparison
                                          ? `px-5 py-5 border-b-gray-100 dark:border-b-gray-700 ${j === 0 ? 'sticky left-0 z-10 bg-brand-200 dark:bg-brand-900/40 shadow-sm' : 'bg-slate-200 dark:bg-slate-800/50'}`
                                          : isSolutionMatrix
                                            ? `px-4 py-4 border-gray-200 dark:border-gray-600 bg-brand-100 dark:bg-brand-900/40 ${j === 0 ? 'sticky left-0 z-10 shadow-sm' : ''}`
                                            : `px-4 py-3 border-gray-200 dark:border-gray-600 bg-brand-100 dark:bg-brand-900/40 ${j === 0 ? 'sticky left-0 z-10 shadow-sm' : ''}`
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
                                  const isToolChoiceRow = Boolean(
                                    section.toolChoiceBar
                                  );
                                  return (
                                    <tr
                                      key={ri}
                                      ref={(el) => {
                                        if (section.toolChoiceBar)
                                          tableRowRefs.current[ri] = el;
                                      }}
                                      role={
                                        isToolChoiceRow ? 'button' : undefined
                                      }
                                      tabIndex={isToolChoiceRow ? 0 : undefined}
                                      aria-pressed={
                                        isToolChoiceRow
                                          ? selectedToolRowIndex === ri
                                          : undefined
                                      }
                                      onClick={
                                        isToolChoiceRow
                                          ? () => setSelectedToolRowIndex(ri)
                                          : undefined
                                      }
                                      onKeyDown={
                                        isToolChoiceRow
                                          ? (e) => {
                                              if (
                                                e.key === 'Enter' ||
                                                e.key === ' '
                                              ) {
                                                e.preventDefault();
                                                setSelectedToolRowIndex(ri);
                                              }
                                            }
                                          : undefined
                                      }
                                      className={`${isComparison ? 'border-b border-gray-100 dark:border-gray-700 last:border-b-0' : 'border-b border-gray-200 dark:border-gray-600 last:border-b-0'} ${isComparison && isLastRow ? 'bg-brand-50/50 dark:bg-brand-900/20 font-semibold' : ''} ${isWarningRow ? 'bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500' : ''} ${zebraClass} ${isHighlighted ? 'ring-2 ring-accent-500 ring-inset bg-accent-50/80 dark:bg-accent-900/40' : ''} ${isToolChoiceRow ? 'cursor-pointer hover:bg-accent-50/50 dark:hover:bg-accent-900/20' : ''}`}
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
                                                ? `sticky left-0 z-10 font-medium text-gray-900 dark:text-white align-top shadow-sm ${stickyFirstCellBg} ${isComparison ? 'min-w-[14rem] sm:min-w-[16rem] w-1/2' : isSolutionMatrix ? 'min-w-[10rem] sm:min-w-[12rem]' : 'min-w-[10rem] sm:min-w-40'}`
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
                                                <span
                                                  className={`block ${typographyClasses.h3} text-gray-900 dark:text-white`}
                                                >
                                                  {cellContent}
                                                </span>
                                                <span
                                                  className={`block ${typographyClasses.small} text-gray-500 dark:text-gray-400`}
                                                >
                                                  {meta.bestFor}
                                                </span>
                                              </div>
                                            ) : isStrengthCol &&
                                              meta?.strengthBadge != null ? (
                                              <span
                                                className={`inline-block rounded-full px-2.5 py-1 ${typographyClasses.label} whitespace-nowrap ${toolBadgeClasses[meta.badgeVariant ?? 'blue'] ?? toolBadgeClasses.blue}`}
                                                aria-label={t(
                                                  'strengthBadgeAria',
                                                  {
                                                    badge: meta.strengthBadge,
                                                  }
                                                )}
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
                          </TableHorizontalScroll>
                          {isComparison && section.body && (
                            <p
                              className={`mt-2 ${typographyClasses.body} text-gray-700 dark:text-gray-300`}
                            >
                              {renderBodyWithBold(section.body)}
                            </p>
                          )}
                        </>
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
                    <h3
                      className={`${typographyClasses.h2} font-extrabold text-xl lg:text-2xl text-brand-800 dark:text-brand-200 mb-1`}
                    >
                      {content.workflowImagesHeading}
                    </h3>
                  )}
                  {content.pipelineDiagramSubtitle && (
                    <p
                      className={`${typographyClasses.body} font-medium text-gray-600 dark:text-gray-300 -mt-2 whitespace-pre-line`}
                    >
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
                      <h3
                        className={`${typographyClasses.h2} text-brand-800 dark:text-brand-200`}
                      >
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
                            <figcaption
                              className={`p-3 ${typographyClasses.label} text-brand-800 dark:text-brand-200 flex items-center gap-2`}
                            >
                              {img.label}
                              {img.tooltip && (
                                <button
                                  type="button"
                                  className="relative inline-flex rounded-md p-1.5 min-h-[44px] min-w-[44px] items-center justify-center hover:bg-brand-100 dark:hover:bg-brand-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                                  aria-label={t('additionalInfoAria', {
                                    label: img.label,
                                  })}
                                  aria-describedby={`workflow-tooltip-${j}`}
                                >
                                  <Info
                                    className="w-4 h-4 text-brand-500 dark:text-brand-400 shrink-0"
                                    aria-hidden
                                  />
                                  <span
                                    id={`workflow-tooltip-${j}`}
                                    className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-64 p-3 ${typographyClasses.small} font-normal text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity z-10 pointer-events-none`}
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
      {hasLinkedCopySections &&
        !sectionsList.some((s) => s.collapsible) &&
        renderPreCopyCheck()}
      {content.tools &&
        content.tools.length > 0 &&
        (() => {
          const toolsList = content.tools!;
          const toolsGrid = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolsList.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    {tool.url ? (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${typographyClasses.h3} text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-200 underline underline-offset-2 inline-flex items-center gap-1`}
                      >
                        {tool.name}
                        <ExternalLink
                          className="w-3.5 h-3.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <span
                        className={`${typographyClasses.h3} text-gray-900 dark:text-white`}
                      >
                        {tool.name}
                      </span>
                    )}
                  </div>
                  {tool.description && (
                    <p
                      className={`${typographyClasses.bodyMuted} leading-snug mb-3`}
                    >
                      {tool.description}
                    </p>
                  )}
                  {tool.useCases && tool.useCases.length > 0 && (
                    <div>
                      <p
                        className={`${typographyClasses.labelUpper} text-gray-500 dark:text-gray-400 mb-1.5`}
                      >
                        {tPractice('popularUseCases')}
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {tool.useCases.map((uc, i) => (
                          <li key={i}>
                            <span
                              className={`inline-block ${typographyClasses.small} px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300`}
                            >
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
          );
          const toolsIntroBlock = content.toolsIntro ? (
            <p
              className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 mb-6`}
            >
              {content.toolsIntro}
            </p>
          ) : null;
          const toolsFooter = (
            <p
              className={`${typographyClasses.small} text-gray-500 dark:text-gray-400 italic mt-5`}
            >
              {tPractice('toolsPrincipleNote')}
            </p>
          );
          const shellClass =
            'border-2 border-brand-200 dark:border-brand-800 rounded-2xl bg-gradient-to-b from-brand-50/80 to-white dark:from-brand-950/50 dark:to-gray-900';

          if (content.toolsCollapsible) {
            return (
              <details className={`group ${shellClass} overflow-hidden`}>
                <summary
                  className={`flex cursor-pointer list-none items-center gap-2 p-4 sm:p-5 ${typographyClasses.h2} text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 rounded-2xl`}
                  aria-label={tPractice('toolsCollapsibleAria')}
                >
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-brand-500 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                  <Wrench className="h-5 w-5 text-brand-500" aria-hidden />
                  <span>{tPractice('toolsHeading')}</span>
                  <span
                    className={`${typographyClasses.body} font-normal text-gray-500 dark:text-gray-400`}
                  >
                    ({toolsList.length})
                  </span>
                </summary>
                <div className="border-t border-brand-200 dark:border-brand-700 px-4 pb-6 pt-2 sm:px-8 sm:pt-4">
                  {toolsIntroBlock}
                  {toolsGrid}
                  {toolsFooter}
                </div>
              </details>
            );
          }

          return (
            <div className={`${shellClass} p-6 sm:p-8`}>
              <h3
                className={`${typographyClasses.h2} text-gray-900 dark:text-white mb-2 flex items-center gap-2`}
              >
                <Wrench className="w-5 h-5 text-brand-500" aria-hidden="true" />
                {tPractice('toolsHeading')}
              </h3>
              {toolsIntroBlock}
              {toolsGrid}
              {toolsFooter}
            </div>
          );
        })()}
      {content.recognitionExercise && (
        <RecognitionExerciseBlock
          exercise={content.recognitionExercise}
          useAiAccent={isDiVisata}
        />
      )}
      {content.artifactDownload &&
        (() => {
          const ad = content.artifactDownload;
          let templateText = '';
          if (
            ad.source === 'practicalTask' &&
            content.practicalTask?.template
          ) {
            templateText = content.practicalTask.template;
          } else if (ad.source === 'copyable') {
            const match = sectionsList.find((s) =>
              ad.sectionHeading
                ? s.heading === ad.sectionHeading
                : Boolean((s.copyable ?? '').trim())
            );
            templateText = match?.copyable ?? '';
          }
          if (!templateText.trim()) return null;
          return (
            <div className="flex justify-end">
              <DownloadTemplateButton
                text={templateText}
                filename={ad.filename}
                label={t('downloadTemplateLabel')}
                ariaLabel={t('downloadTemplateAria')}
              />
            </div>
          );
        })()}
      {content.practicalTask &&
        !isDuplicateOfSectionCopyable(
          content.practicalTask.template,
          sectionsList
        ) && (
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
                content.practicalTask.templateLabel ||
                t('blockMetaTemplateLabel')
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
            className={`${typographyClasses.h2} text-gray-900 dark:text-white`}
          >
            {t('correctPromptPracticeHeading')}
          </h2>
          <Banner variant="warning" className="p-4">
            <p
              className={`${typographyClasses.body} text-gray-800 dark:text-gray-200`}
            >
              {practice.intro}
            </p>
          </Banner>
          <Banner variant="terms" className="p-4">
            <h3
              className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-2`}
            >
              {t('badExample')}
            </h3>
            <p
              className={`${typographyClasses.code} text-gray-700 dark:text-gray-300 whitespace-pre-wrap`}
            >
              {practice.badPrompt}
            </p>
          </Banner>
          <Banner variant="info" className="p-4">
            <label
              htmlFor="correct-prompt-textarea"
              className={`block ${typographyClasses.h3} text-gray-900 dark:text-white mb-2`}
            >
              {t('correctPromptYourVersionLabel')}
            </label>
            <textarea
              id="correct-prompt-textarea"
              value={correctPromptUserText}
              onChange={(e) => setCorrectPromptUserText(e.target.value)}
              placeholder={t('promptPlaceholder')}
              rows={4}
              className={`w-full px-3 py-2 ${typographyClasses.body} rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[44px]`}
              aria-label={t('correctPromptTextareaAria')}
            />
          </Banner>
          <div>
            <CTAButton
              variant="secondary"
              onClick={() => setShowCorrectPromptSolution(true)}
              className="px-4 py-2 text-sm rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-expanded={showCorrectPromptSolution}
              aria-controls="correct-prompt-solution"
            >
              {practice.revealButtonLabel}
            </CTAButton>
          </div>
          {showCorrectPromptSolution && (
            <div
              id="correct-prompt-solution"
              className="space-y-4"
              role="region"
              aria-label={t('solutionAria')}
            >
              <div className="p-4 rounded-xl border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h3
                  className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-2`}
                >
                  {t('correctPromptPrinciplesHeading')}
                </h3>
                <div
                  className={`${typographyClasses.body} text-gray-700 dark:text-gray-300`}
                >
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
                <h3
                  className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-2`}
                >
                  {t('correctPromptChangesHeading')}
                </h3>
                <p
                  className={`${typographyClasses.body} text-gray-800 dark:text-gray-200`}
                >
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
          <HandoutDownloadButton
            label={content.handoutDownloadLabel}
            onClick={handleM6HandoutDownload}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            iconClassName="w-4 h-4 shrink-0"
          />
          {handoutError && (
            <p
              className={`mt-3 ${typographyClasses.body} text-rose-700 dark:text-rose-300`}
              role="alert"
            >
              {tCommon('handoutPdfError')}
            </p>
          )}
        </div>
      )}
      {m9SkipToSummaryHandler && (
        <div
          className="rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 p-4"
          role="region"
          aria-label={tPractice('m9SkipToSummaryAria')}
        >
          <p
            className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 mb-3`}
          >
            {tPractice('m9SkipToSummaryHint')}
          </p>
          <button
            type="button"
            onClick={m9SkipToSummaryHandler}
            className={`min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl ${typographyClasses.label} border-2 border-slate-400 dark:border-slate-500 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900`}
          >
            {tPractice('m9SkipToSummaryCta')}
          </button>
        </div>
      )}
    </div>
  );
}
