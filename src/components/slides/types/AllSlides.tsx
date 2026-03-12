/** Barrel: re-export visų skaidrių komponentų ir tipų iš ContentSlides, BlockSlides, TestPracticeSlides. */

export type {
  ActionIntroSlideProps,
  ActionIntroJourneySlideProps,
  IntroSlideProps,
  IntroActionPieSlideProps,
  HierarchySlideProps,
  ComparisonSlideProps,
  SummarySlideProps,
  PracticeSummarySlideProps,
} from './ContentSlides';

export {
  ActionIntroSlide,
  ActionIntroJourneySlide,
  IntroSlide,
  ModuleIntroSlide,
  ContentBlockSlide,
  SectionBreakSlide,
  WarmUpQuizSlide,
  GlossarySlide,
  DefinitionsSlide,
  DiModalitiesSlide,
  PieChartSlide,
  IntroActionPieSlide,
  AiWorkflowSlide,
  PromptTypesSlide,
  PromptTechniquesSlide,
  WorkflowSummarySlide,
  PromptTemplateSlide,
  TransitionSlide,
  HierarchySlide,
  ComparisonSlide,
  SummarySlide,
  ProductivityInfographicSlide,
  DiParadoxInfographicSlide,
  NewsPortalInfographicSlide,
  PracticeSummarySlide,
} from './ContentSlides';

export { MetaBlockSlide, InputBlockSlide, OutputBlockSlide, ReasoningModelsSlide, ReasoningBlockSlide, QualityBlockSlide, AdvancedBlockSlide, AdvancedParameters2Slide, FullExampleSlide } from './BlockSlides';

export { TestIntroSlide, TestSectionSlide, TestResultsSlide, PracticeIntroSlide, PracticeScenarioHubSlide, PracticeScenarioSlide } from './TestPracticeSlides';
