export interface StepExplanation {
  title: string;
  body: string;
}

export type M13BusinessLocale = 'lt' | 'en';

export const M13_BUSINESS_WORKFLOW_EXPLANATIONS_LT: StepExplanation[] = [
  {
    title: 'Brief',
    body: '**Marketing brief** – kam skirta, kokiam tikslui (Awareness / Engagement / Conversion), kokia auditorija. Trumpas dokumentas – pagrindas visam darbui. Techninę medijos grandinę (stills → I2V → garsas → QA) žr. skaidrę „Generatyvinės medijos pipeline“ (13.12).',
  },
  {
    title: 'Prompt generavimas',
    body: 'Pagal brief ir **brand consistency** (spalvos, tonas, stilius) sugeneruok vaizdo ar video promptą. Naudok šablonus iš modulio (stilius, proporcijos, ko vengti).',
  },
  {
    title: 'Variantai',
    body: 'Sugeneruok **3–5 variantų** vienam testui – skirtingi vaizdai, antraštės ar kompozicijos. Daugiau variantų – geriau A/B testavimui.',
  },
  {
    title: 'Iteracija',
    body: 'Gerinimas pagal grįžtamąjį ryšį – „šviesesnis“, „mažiau teksto“, „veidas į kamerą“. Pakartok generavimą su pakeistu promptu.',
  },
  {
    title: 'Adaptacija platformoms',
    body: 'Skirtingi kadrai ir formatai – LinkedIn, Instagram, TikTok, Meta Ads. Proporcijos ir teksto kiekis skiriasi – koreguok promptą.',
  },
  {
    title: 'Testavimas',
    body: '**A/B testavimas** – hipotezė, KPI (CTR, CVR, scroll stop). Palygink variantus ir išsirink geriausią.',
  },
  {
    title: 'Optimizacija',
    body: 'Remiantis rezultatais – pakartok ciklą. Naudok duomenis kitai kampanijai.',
  },
];

export const M13_BUSINESS_WORKFLOW_EXPLANATIONS_EN: StepExplanation[] = [
  {
    title: 'Brief',
    body: '**Marketing brief** – who it is for, goal (Awareness / Engagement / Conversion), audience. Short document – foundation for all work. For the technical media chain (stills → I2V → audio → QA), see the slide “Generative media pipeline” (13.12).',
  },
  {
    title: 'Prompt generation',
    body: 'From the brief and **brand consistency** (colours, tone, style) generate an image or video prompt. Use module templates (style, proportions, what to avoid).',
  },
  {
    title: 'Variants',
    body: 'Generate **3–5 variants** for one test – different images, headlines or compositions. More variants – better for A/B testing.',
  },
  {
    title: 'Iteration',
    body: 'Improve from feedback – “lighter”, “less text”, “face to camera”. Repeat generation with an updated prompt.',
  },
  {
    title: 'Platform adaptation',
    body: 'Different frames and formats – LinkedIn, Instagram, TikTok, Meta Ads. Proportions and text amount differ – adjust the prompt.',
  },
  {
    title: 'Testing',
    body: '**A/B testing** – hypothesis, KPIs (CTR, CVR, scroll stop). Compare variants and pick the best.',
  },
  {
    title: 'Optimisation',
    body: 'Based on results – repeat the cycle. Use data for the next campaign.',
  },
];

export function getM13BusinessWorkflowExplanations(
  locale: M13BusinessLocale
): StepExplanation[] {
  return locale === 'en'
    ? M13_BUSINESS_WORKFLOW_EXPLANATIONS_EN
    : M13_BUSINESS_WORKFLOW_EXPLANATIONS_LT;
}

export interface M13BusinessWorkflowDiagramStep {
  label: string;
  desc: string;
}

export interface M13BusinessWorkflowDiagramLabels {
  steps: M13BusinessWorkflowDiagramStep[];
  title: string;
  hint: string;
  ariaBase: string;
  ariaInteractiveSuffix: string;
  stepAria: (index: number, label: string) => string;
}

const LABELS_LT: M13BusinessWorkflowDiagramLabels = {
  steps: [
    { label: 'Brief', desc: 'Kam, tikslas, auditorija' },
    { label: 'Prompt', desc: 'Brand consistency' },
    { label: 'Variantai', desc: '3–5 vaizdų' },
    { label: 'Iteracija', desc: 'Gerinimas pagal atsiliepimus' },
    { label: 'Adaptacija', desc: 'Platformos, formatai' },
    { label: 'Testavimas', desc: 'A/B, KPI' },
    { label: 'Optimizacija', desc: 'Rezultatai → ciklas' },
  ],
  title: 'Nuo brief iki publikacijos',
  hint: 'Paspausk žingsnį – paaiškinimas apačioje',
  ariaBase: 'Turinio workflow: nuo brief iki optimizacijos.',
  ariaInteractiveSuffix: 'Paspausk žingsnį, kad pamatytum paaiškinimą.',
  stepAria: (i, label) => `Žingsnis ${i + 1}: ${label}. Paspausk paaiškinimui.`,
};

const LABELS_EN: M13BusinessWorkflowDiagramLabels = {
  steps: [
    { label: 'Brief', desc: 'Who, goal, audience' },
    { label: 'Prompt', desc: 'Brand consistency' },
    { label: 'Variants', desc: '3–5 images' },
    { label: 'Iteration', desc: 'Improve from feedback' },
    { label: 'Adaptation', desc: 'Platforms, formats' },
    { label: 'Testing', desc: 'A/B, KPI' },
    { label: 'Optimisation', desc: 'Results → cycle' },
  ],
  title: 'From brief to publication',
  hint: 'Click a step – explanation below',
  ariaBase: 'Content workflow: from brief to optimisation.',
  ariaInteractiveSuffix: 'Click a step to see the explanation.',
  stepAria: (i, label) => `Step ${i + 1}: ${label}. Click for explanation.`,
};

export function getM13BusinessWorkflowDiagramLabels(
  locale: M13BusinessLocale
): M13BusinessWorkflowDiagramLabels {
  return locale === 'en' ? LABELS_EN : LABELS_LT;
}

/** @deprecated Use getM13BusinessWorkflowExplanations */
export const getTurinioWorkflowStepExplanations =
  getM13BusinessWorkflowExplanations;
/** @deprecated Use getM13BusinessWorkflowDiagramLabels */
export const getTurinioWorkflowDiagramLabels =
  getM13BusinessWorkflowDiagramLabels;
export type TurinioWorkflowDiagramLabels = M13BusinessWorkflowDiagramLabels;
export type TurinioWorkflowDiagramStep = M13BusinessWorkflowDiagramStep;
export const TURINIO_WORKFLOW_STEP_EXPLANATIONS =
  M13_BUSINESS_WORKFLOW_EXPLANATIONS_LT;
export const TURINIO_WORKFLOW_STEP_EXPLANATIONS_EN =
  M13_BUSINESS_WORKFLOW_EXPLANATIONS_EN;
