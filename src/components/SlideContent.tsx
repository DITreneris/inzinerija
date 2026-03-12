import { useCallback, Suspense, type ReactNode, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from '../utils/progress';
import { logWarning } from '../utils/logger';
import { track } from '../utils/analytics';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { PracticalTask } from './slides';
import { LoadingSpinner } from './ui';
import HallucinationRatesDashboard from './HallucinationRatesDashboard';
import AiDetectorsSlide from '@ai-detectors-slide';
import VaizdoGeneratoriusSlide from '@vaizdo-generatorius-slide';

/* Lazy by group (B): ContentSlides, BlockSlides, TestPracticeSlides – separate chunks.
   lazyWithRetry retries up to 3× on chunk load failure (mobile networks). */
const LazyActionIntroSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.ActionIntroSlide })));
const LazyActionIntroJourneySlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.ActionIntroJourneySlide })));
const LazyIntroSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.IntroSlide })));
const LazyModuleIntroSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.ModuleIntroSlide })));
const LazyContentBlockSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.ContentBlockSlide })));
const LazySectionBreakSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.SectionBreakSlide })));
const LazyWarmUpQuizSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.WarmUpQuizSlide })));
const LazyPathStepSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.PathStepSlide })));
const LazyGlossarySlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.GlossarySlide })));
const LazyDefinitionsSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.DefinitionsSlide })));
const LazyPromptTypesSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.PromptTypesSlide })));
const LazyPromptTechniquesSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.PromptTechniquesSlide })));
const LazyWorkflowSummarySlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.WorkflowSummarySlide })));
const LazyPromptTemplateSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.PromptTemplateSlide })));
const LazyTransitionSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.TransitionSlide })));
const LazyHierarchySlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.HierarchySlide })));
const LazyComparisonSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.ComparisonSlide })));
const LazySummarySlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.SummarySlide })));
const LazyProductivityInfographicSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.ProductivityInfographicSlide })));
const LazyDiParadoxInfographicSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.DiParadoxInfographicSlide })));
const LazyNewsPortalInfographicSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.NewsPortalInfographicSlide })));
const LazyDiModalitiesSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.DiModalitiesSlide })));
const LazyPieChartSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.PieChartSlide })));
const LazyIntroActionPieSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.IntroActionPieSlide })));
const LazyAiWorkflowSlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.AiWorkflowSlide })));
const LazyPracticeSummarySlide = lazyWithRetry(() => import('./slides/types/ContentSlides').then((m) => ({ default: m.PracticeSummarySlide })));
const LazyMetaBlockSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.MetaBlockSlide })));
const LazyInputBlockSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.InputBlockSlide })));
const LazyOutputBlockSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.OutputBlockSlide })));
const LazyReasoningModelsSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.ReasoningModelsSlide })));
const LazyReasoningBlockSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.ReasoningBlockSlide })));
const LazyQualityBlockSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.QualityBlockSlide })));
const LazyAdvancedBlockSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.AdvancedBlockSlide })));
const LazyAdvancedParameters2Slide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.AdvancedParameters2Slide })));
const LazyFullExampleSlide = lazyWithRetry(() => import('./slides/types/BlockSlides').then((m) => ({ default: m.FullExampleSlide })));
const LazyTestIntroSlide = lazyWithRetry(() => import('./slides/types/TestPracticeSlides').then((m) => ({ default: m.TestIntroSlide })));
const LazyTestSectionSlide = lazyWithRetry(() => import('./slides/types/TestPracticeSlides').then((m) => ({ default: m.TestSectionSlide })));
const LazyTestResultsSlide = lazyWithRetry(() => import('./slides/types/TestPracticeSlides').then((m) => ({ default: m.TestResultsSlide })));
const LazyPracticeIntroSlide = lazyWithRetry(() => import('./slides/types/TestPracticeSlides').then((m) => ({ default: m.PracticeIntroSlide })));
const LazyPracticeScenarioHubSlide = lazyWithRetry(() => import('./slides/types/TestPracticeSlides').then((m) => ({ default: m.PracticeScenarioHubSlide })));
const LazyPracticeScenarioSlide = lazyWithRetry(() => import('./slides/types/TestPracticeSlides').then((m) => ({ default: m.PracticeScenarioSlide })));
import type {
  Slide,
  ActionIntroContent,
  ActionIntroJourneyContent,
  DefinitionsContent,
  PromptTypesContent,
  PromptTechniquesContent,
  WorkflowSummaryContent,
  PromptTemplateContent,
  TransitionContent,
  ProductivityInfographicContent,
  DiParadoxInfographicContent,
  NewsPortalInfographicContent,
  DiModalitiesContent,
  PieChartContent,
  IntroActionPieContent,
  AiWorkflowContent,
  IntroContent,
  ModuleIntroContent,
  ContentBlockContent,
  HierarchyContent,
  ComparisonContent,
  SummaryContent,
  PracticeSummaryContent,
  PracticeScenarioHubContent,
  SectionBreakContent,
  WarmUpQuizContent,
  PathStepContent,
  GlossaryContent,
  M9Character,
} from '../types/modules';
import m9CharactersData from '@m9-characters-data';

const M9_CHARACTERS: M9Character[] = (m9CharactersData as { characters: M9Character[] }).characters;

export interface PracticeScenarioSlideInfo {
  slideIndex: number;
  slideId: number;
  title: string;
}

interface SlideContentProps {
  slide: Slide;
  moduleId: number;
  onTaskComplete: (taskId: number, testScore?: number) => void;
  progress: Progress;
  onGoToModule?: (moduleId: number, slideIndex?: number, fromRemediationSourceModuleId?: number) => void;
  onGoToGlossary?: () => void;
  onGoToGlossaryTerm?: (term: string) => void;
  onGoToTools?: (moduleId: number) => void;
  onNextSlide?: () => void;
  /** Modulio 3: scenarijų skaidrės – progresas ir navigacija (#8) */
  practiceScenarioSlides?: PracticeScenarioSlideInfo[];
  onNavigateToSlide?: (slideIndex: number) => void;
  /** Modulio 3: iš scenarijaus skaidrės pereiti į santrauką (grįžti prie darbo vėliau) */
  onGoToSummary?: () => void;
  /** Modulio 9: iš hub skaidrės naviguoti į scenarijaus skaidrę pagal id */
  onNavigateToSlideById?: (slideId: number) => void;
  /** M9 žaidimo logika: grįžus iš scenarijaus – atidaryti hub su šiuo veikėju (0–3) */
  initialHubLevel1?: number | null;
  /** M9 įvade: paspaudus veikėją – atidaryti hub su tuo veikėju (characterIndex 0–3) */
  onNavigateToHubWithCharacter?: (characterIndex: number) => void;
}

/** Context passed to each slide type renderer in the registry */
export interface SlideRenderContext {
  slide: Slide;
  moduleId: number;
  progress: Progress;
  isTaskCompleted: boolean;
  handleTaskComplete: (taskId: number, testScore?: number) => void;
  /** Block slides expect () => ReactElement | null */
  PracticalTaskSection: () => ReactElement | null;
  fallbackMissingContent: () => ReactNode;
  onGoToModule?: (moduleId: number, slideIndex?: number, fromRemediationSourceModuleId?: number) => void;
  onGoToGlossary?: () => void;
  onGoToGlossaryTerm?: (term: string) => void;
  onGoToTools?: (moduleId: number) => void;
  onNextSlide?: () => void;
  practiceScenarioSlides?: PracticeScenarioSlideInfo[];
  onNavigateToSlide?: (slideIndex: number) => void;
  onGoToSummary?: () => void;
  onNavigateToSlideById?: (slideId: number) => void;
  initialHubLevel1?: number | null;
  onNavigateToHubWithCharacter?: (characterIndex: number) => void;
}

export default function SlideContent({
  slide,
  moduleId,
  onTaskComplete,
  progress,
  onGoToModule,
  onGoToGlossary,
  onGoToGlossaryTerm,
  onGoToTools,
  onNextSlide,
  practiceScenarioSlides,
  onNavigateToSlide,
  onGoToSummary,
  onNavigateToSlideById,
  initialHubLevel1,
  onNavigateToHubWithCharacter,
}: SlideContentProps) {
  const { t } = useTranslation('module');
  const isTaskCompleted = progress.completedTasks[moduleId]?.includes(slide.id) || false;

  /** MVP Analytics: cta_click when navigating to another module from this slide */
  const wrappedOnGoToModule = useCallback(
    (targetModuleId: number, slideIndex?: number, fromRemediationSourceModuleId?: number) => {
      track('cta_click', {
        module_id: moduleId,
        slide_id: typeof slide.id === 'number' ? slide.id : undefined,
        cta_id: 'go_module',
        cta_label: `Modulis ${targetModuleId}`,
        destination: 'internal',
      });
      onGoToModule?.(targetModuleId, slideIndex, fromRemediationSourceModuleId);
    },
    [moduleId, slide.id, onGoToModule]
  );

  const handleTaskComplete = (taskId: number, testScore?: number) => {
    if (!progress.completedTasks[moduleId]?.includes(taskId)) {
      onTaskComplete(taskId, testScore);
    }
  };

  // Practical Task wrapper component
  const PracticalTaskSection = () => {
    if (!slide.practicalTask) return null;
    return (
      <PracticalTask
        task={slide.practicalTask}
        slideId={slide.id}
        moduleId={moduleId}
        onTaskComplete={handleTaskComplete}
        progress={progress}
      />
    );
  };

  // Fallback kai skaidrei būtinas content, bet jis trūksta (apsauga nuo neteisingo JSON)
  const fallbackMissingContent = () => {
    logWarning('Trūksta content skaidrei', { slideId: slide.id, slideType: slide.type });
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{slide.title}</h2>
          {slide.subtitle && (
            <p className="mt-1 text-gray-600 dark:text-gray-400">{slide.subtitle}</p>
          )}
        </div>
        {import.meta.env.DEV && (
          <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm text-amber-800 dark:text-amber-200" role="alert">
            Skaidrei trūksta turinio (type: <code className="font-mono">{String(slide.type)}</code>, id: {slide.id})
          </div>
        )}
        <PracticalTaskSection />
      </div>
    );
  };

  const defaultFallback = (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{slide.title}</h2>
        {slide.subtitle && (
          <p className="mt-1 text-gray-600 dark:text-gray-400">{slide.subtitle}</p>
        )}
      </div>
      {import.meta.env.DEV && (
        <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm text-amber-800 dark:text-amber-200" role="alert">
          {t('slideTypeUnknown', { type: String(slide.type), id: slide.id })}
        </div>
      )}
      <PracticalTaskSection />
    </div>
  );

  const ctx: SlideRenderContext = {
    slide,
    moduleId,
    progress,
    isTaskCompleted,
    handleTaskComplete,
    PracticalTaskSection,
    fallbackMissingContent,
    onGoToModule: wrappedOnGoToModule,
    onGoToGlossary,
    onGoToGlossaryTerm,
    onGoToTools,
    onNextSlide,
    practiceScenarioSlides,
    onNavigateToSlide,
    onGoToSummary,
    onNavigateToSlideById,
    initialHubLevel1,
    onNavigateToHubWithCharacter,
  };

  const renderer = slideRegistry[slide.type];
  if (!renderer) {
    logWarning('Slide type not recognized', { slideId: slide.id, slideType: slide.type });
    return defaultFallback;
  }
  const main = renderer(ctx);
  const footer = (slide.content as { footer?: string } | undefined)?.footer;
  const content = footer ? (
    <>
      {main}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 mt-6 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 italic">
        <span>{footer}</span>
      </div>
    </>
  ) : main;
  return (
    <Suspense fallback={<LoadingSpinner size="sm" text="Kraunama..." />}>
      {content}
    </Suspense>
  );
}

/** Registry: slide type → render function. Lazy components load ContentSlides / BlockSlides / TestPracticeSlides by group. */
const slideRegistry: Record<string, (ctx: SlideRenderContext) => ReactNode> = {
  'action-intro': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyActionIntroSlide content={ctx.slide.content as ActionIntroContent} />;
  },
  'action-intro-journey': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return (
      <LazyActionIntroJourneySlide
        content={ctx.slide.content as ActionIntroJourneyContent}
        onJourneyComplete={() => ctx.handleTaskComplete(ctx.slide.id)}
      />
    );
  },
  'intro': (ctx) => (
    <LazyIntroSlide {...(ctx.slide.content != null ? { content: ctx.slide.content as IntroContent } : {})} />
  ),
  'module-intro': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyModuleIntroSlide content={ctx.slide.content as ModuleIntroContent} />;
  },
  'content-block': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return (
      <LazyContentBlockSlide
        content={ctx.slide.content as ContentBlockContent}
        slide={ctx.slide}
        moduleId={ctx.moduleId}
        onGoToTools={ctx.onGoToTools}
      />
    );
  },
  'evaluator-prompt-block': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return (
      <LazyContentBlockSlide
        content={ctx.slide.content as ContentBlockContent}
        slide={ctx.slide}
        moduleId={ctx.moduleId}
        onGoToTools={ctx.onGoToTools}
      />
    );
  },
  'section-break': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return (
      <LazySectionBreakSlide
        content={ctx.slide.content as SectionBreakContent}
        onGoToGlossaryTerm={ctx.onGoToGlossaryTerm}
      />
    );
  },
  'warm-up-quiz': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyWarmUpQuizSlide content={ctx.slide.content as WarmUpQuizContent} />;
  },
  'path-step': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return (
      <LazyPathStepSlide
        content={ctx.slide.content as PathStepContent}
        isCompleted={ctx.isTaskCompleted}
        onMarkComplete={() => ctx.handleTaskComplete(ctx.slide.id)}
      />
    );
  },
  'glossary': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyGlossarySlide content={ctx.slide.content as GlossaryContent} optional={ctx.slide.optional === true} />;
  },
  'definitions': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyDefinitionsSlide content={ctx.slide.content as DefinitionsContent} />;
  },
  'di-modalities': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyDiModalitiesSlide content={ctx.slide.content as DiModalitiesContent} />;
  },
  'pie-chart': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyPieChartSlide content={ctx.slide.content as PieChartContent} />;
  },
  'intro-action-pie': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyIntroActionPieSlide content={ctx.slide.content as IntroActionPieContent} />;
  },
  'ai-workflow': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyAiWorkflowSlide content={ctx.slide.content as AiWorkflowContent} />;
  },
  'prompt-types': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyPromptTypesSlide content={ctx.slide.content as PromptTypesContent} />;
  },
  'prompt-techniques': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyPromptTechniquesSlide content={ctx.slide.content as PromptTechniquesContent} />;
  },
  'workflow-summary': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyWorkflowSummarySlide content={ctx.slide.content as WorkflowSummaryContent} />;
  },
  'prompt-template': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyPromptTemplateSlide content={ctx.slide.content as PromptTemplateContent} />;
  },
  'transition-3-to-6': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazyTransitionSlide content={ctx.slide.content as TransitionContent} />;
  },
  'hierarchy': (ctx) => (
    <LazyHierarchySlide {...(ctx.slide.content != null ? { content: ctx.slide.content as HierarchyContent } : {})} />
  ),
  'meta': (ctx) => <LazyMetaBlockSlide onRenderTask={ctx.PracticalTaskSection} />,
  'input': (ctx) => <LazyInputBlockSlide onRenderTask={ctx.PracticalTaskSection} />,
  'output': (ctx) => <LazyOutputBlockSlide onRenderTask={ctx.PracticalTaskSection} />,
  'reasoning-models': (ctx) => <LazyReasoningModelsSlide slide={ctx.slide} onRenderTask={ctx.PracticalTaskSection} />,
  'reasoning': (ctx) => <LazyReasoningBlockSlide slide={ctx.slide} onRenderTask={ctx.PracticalTaskSection} />,
  'quality': (ctx) => <LazyQualityBlockSlide slide={ctx.slide} onRenderTask={ctx.PracticalTaskSection} />,
  'advanced': (ctx) => <LazyAdvancedBlockSlide slide={ctx.slide} onRenderTask={ctx.PracticalTaskSection} />,
  'advanced-2': (ctx) => <LazyAdvancedParameters2Slide slide={ctx.slide} onRenderTask={ctx.PracticalTaskSection} />,
  'full-example': (ctx) => <LazyFullExampleSlide onRenderTask={ctx.PracticalTaskSection} />,
  'comparison': (ctx) => (
    <LazyComparisonSlide {...(ctx.slide.content != null ? { content: ctx.slide.content as ComparisonContent } : {})} />
  ),
  'summary': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    return <LazySummarySlide content={ctx.slide.content as SummaryContent} onNextStep={ctx.onNextSlide} />;
  },
  'test-intro': (ctx) => <LazyTestIntroSlide slide={ctx.slide} moduleId={ctx.moduleId} />,
  'test-section': (ctx) => (
    <LazyTestSectionSlide
      questions={ctx.slide.testQuestions || []}
      onComplete={(score) => ctx.handleTaskComplete(ctx.slide.id, score)}
      isCompleted={ctx.isTaskCompleted}
      moduleId={ctx.moduleId}
      onGoToModule={ctx.onGoToModule}
    />
  ),
  'test-results': (ctx) => (
    <LazyTestResultsSlide
      moduleId={ctx.moduleId}
      progress={ctx.progress}
      onGoToModule={ctx.onGoToModule}
      onNextSlide={ctx.onNextSlide}
    />
  ),
  'practice-intro': (ctx) => (
    <LazyPracticeIntroSlide
      slide={ctx.slide}
      moduleId={ctx.moduleId}
      progress={ctx.progress}
      scenarioSlides={ctx.practiceScenarioSlides}
      onNavigateToSlide={ctx.onNavigateToSlide}
      onNavigateToSlideById={ctx.onNavigateToSlideById}
      onNavigateToHubWithCharacter={ctx.onNavigateToHubWithCharacter}
    />
  ),
  'practice-scenario-hub': (ctx) => {
    if (!ctx.slide.content || !ctx.onNavigateToSlideById) return ctx.fallbackMissingContent();
    return (
      <LazyPracticeScenarioHubSlide
        content={ctx.slide.content as PracticeScenarioHubContent}
        onNavigateToSlideById={ctx.onNavigateToSlideById}
        initialLevel1={ctx.initialHubLevel1 ?? undefined}
        onGoToSummary={ctx.onGoToSummary ?? undefined}
      />
    );
  },
  'practice-scenario': (ctx) => {
    const character =
      ctx.moduleId === 9 && ctx.slide.characterId != null
        ? M9_CHARACTERS.find((c) => c.id === ctx.slide.characterId)
        : undefined;
    return (
      <LazyPracticeScenarioSlide
        slide={ctx.slide}
        onRenderTask={ctx.PracticalTaskSection}
        onGoToSummary={ctx.onGoToSummary}
        character={character}
      />
    );
  },
  'practice-summary': (ctx) => {
    const summaryContent = ctx.slide.content != null ? (ctx.slide.content as PracticeSummaryContent) : undefined;
    const isM9 = ctx.moduleId === 9;
    const completedScenarioCount = isM9 ? (ctx.progress.completedTasks[9]?.length ?? 0) : undefined;
    const totalScenarioCount = isM9 ? 16 : undefined;
    return (
      <LazyPracticeSummarySlide
        content={summaryContent}
        completedScenarioCount={completedScenarioCount}
        totalScenarioCount={totalScenarioCount}
      />
    );
  },
  'infographic': (ctx) => {
    if (ctx.slide.content == null) return ctx.fallbackMissingContent();
    const c = ctx.slide.content as { variant?: string };
    if (c.variant === 'news-portal') {
      return <LazyNewsPortalInfographicSlide content={ctx.slide.content as NewsPortalInfographicContent} />;
    }
    if (c.variant === 'di-paradox') {
      return (
        <LazyDiParadoxInfographicSlide
          content={ctx.slide.content as DiParadoxInfographicContent}
          onGoToGlossary={ctx.onGoToGlossary}
        />
      );
    }
    return (
      <LazyProductivityInfographicSlide
        content={ctx.slide.content as ProductivityInfographicContent}
        onGoToGlossary={ctx.onGoToGlossary}
      />
    );
  },
  'hallucination-dashboard': (_ctx) => <HallucinationRatesDashboard />,
  'ai-detectors': (_ctx) => <AiDetectorsSlide />,
  'vaizdo-generatorius': (_ctx) => <VaizdoGeneratoriusSlide />,
};
