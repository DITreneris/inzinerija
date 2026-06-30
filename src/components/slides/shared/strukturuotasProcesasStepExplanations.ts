/**
 * Struktūruotas procesas (3 žingsniai) – paaiškinimai ir bloko UI LT/EN.
 * Skaidrė 43 „Darbas su DI: struktūruotas procesas“.
 */
export type StrukturuotasProcesasStep = { title: string; body: string };

export const STRUKTUOTAS_PROCESAS_STEP_EXPLANATIONS: StrukturuotasProcesasStep[] =
  [
    {
      title: 'Įvestis',
      body: '**Kas čia:** Pradiniai duomenys ir kontekstas – tekstinės užklausos, failai, aprašymai. Pvz. „Noriu 5 skaidrių įžangą vadovams“ arba „Santrauka į el. laišką“. Čia nusprendi **ką** nori gauti ir **kam** – vienu sakiniu.',
    },
    {
      title: 'Apdorojimas',
      body: '**Kas čia:** DI ir įrankiai dirba – analizė, sintezė, struktūros kūrimas, optimizavimas. Pvz. ChatGPT paruošia turinį, Gamma formatuoja skaidres. Kiekvienam žingsniui priskiri **įrankį** (ChatGPT, Claude, Gamma, Figma ir kt.) ir gauni **įgyvendinimo instrukciją** – ką atidaryti, ką įvesti, ką kopijuoti.',
    },
    {
      title: 'Rezultatas',
      body: '**Kas čia:** Galutinis produktas – vizualizacija, prezentacija, dokumentas, vaizdo įrašas. Konkretus išvesties formatas (pvz. „5 skaidrės“, „1 puslapio santrauka“). Šie trys žingsniai tinka bet kuriai užduočiai.',
    },
  ];

export const STRUKTUOTAS_PROCESAS_STEP_EXPLANATIONS_EN: StrukturuotasProcesasStep[] =
  [
    {
      title: 'Input',
      body: '**What this is:** Initial data and context – text prompts, files, descriptions. E.g. “I want a 5-slide intro for managers” or “Summary for an email”. Here you decide **what** you want to get and **for whom** – in one sentence.',
    },
    {
      title: 'Processing',
      body: '**What this is:** The LLM and tools do the work – analysis, synthesis, structure creation, optimisation. E.g. ChatGPT prepares content, Gamma formats slides. For each step you assign a **tool** (ChatGPT, Claude, Gamma, Figma, etc.) and get an **implementation instruction** – what to open, what to enter, what to copy.',
    },
    {
      title: 'Output',
      body: '**What this is:** The final product – visualisation, presentation, document, video. A concrete output format (e.g. “5 slides”, “1-page summary”). These three steps fit any task.',
    },
  ];

export type StrukturuotasProcesasLocale = 'lt' | 'en';

export function getStrukturuotasProcesasStepExplanations(
  locale: StrukturuotasProcesasLocale
): StrukturuotasProcesasStep[] {
  return locale === 'en'
    ? STRUKTUOTAS_PROCESAS_STEP_EXPLANATIONS_EN
    : STRUKTUOTAS_PROCESAS_STEP_EXPLANATIONS;
}

export interface StrukturuotasProcesasBlockLabels {
  regionAria: string;
  youAreHere: string;
  clickHint: string;
  enlargeLabel: string;
  navAria: string;
  stepAria: (index: number, title: string) => string;
}

const BLOCK_LABELS_LT: StrukturuotasProcesasBlockLabels = {
  regionAria: 'Proceso schema: Įvestis, Apdorojimas, Rezultatas',
  youAreHere: 'Tu esi čia:',
  clickHint:
    'Paspausk žingsnį diagramoje arba skaičių 1–3 – paaiškinimas rodomas apačioje.',
  enlargeLabel: 'Struktūruotas procesas: Įvestis, Apdorojimas, Rezultatas',
  navAria: 'Žingsnių pasirinkimas',
  stepAria: (i, title) => `Žingsnis ${i + 1}: ${title}`,
};

const BLOCK_LABELS_EN: StrukturuotasProcesasBlockLabels = {
  regionAria: 'Process diagram: Input, Processing, Output',
  youAreHere: 'You are here:',
  clickHint:
    'Click a step in the diagram or number 1–3 – explanation shown below.',
  enlargeLabel: 'Structured process: Input, Processing, Output',
  navAria: 'Step selection',
  stepAria: (i, title) => `Step ${i + 1}: ${title}`,
};

export function getStrukturuotasProcesasBlockLabels(
  locale: StrukturuotasProcesasLocale
): StrukturuotasProcesasBlockLabels {
  return locale === 'en' ? BLOCK_LABELS_EN : BLOCK_LABELS_LT;
}

export interface StrukturuotasProcesasDiagramStep {
  title: string;
  items: string[];
}

export interface StrukturuotasProcesasDiagramLabels {
  steps: StrukturuotasProcesasDiagramStep[];
  /** Visos diagramos aria-label. */
  regionAria: string;
  /** Žingsnio aria-label (kortelė). */
  stepAria: (index: number, title: string) => string;
}

const DIAGRAM_LABELS_LT: StrukturuotasProcesasDiagramLabels = {
  steps: [
    {
      title: 'Įvestis',
      items: ['Tekstinės užklausos', 'Pradiniai duomenys', 'Kontekstas'],
    },
    {
      title: 'Apdorojimas',
      items: ['Analizė ir sintezė', 'Struktūros kūrimas', 'Optimizavimas'],
    },
    {
      title: 'Rezultatas',
      items: ['Vizualizacija', 'Prezentacija', 'Galutinis produktas'],
    },
  ],
  regionAria:
    'Proceso schema: Įvestis, Apdorojimas, Rezultatas – kiekvieną užduotį galima suskirstyti į šiuos 3 žingsnius.',
  stepAria: (i, title) => `Žingsnis ${i + 1}: ${title}`,
};

const DIAGRAM_LABELS_EN: StrukturuotasProcesasDiagramLabels = {
  steps: [
    { title: 'Input', items: ['Text prompts', 'Initial data', 'Context'] },
    {
      title: 'Processing',
      items: ['Analysis and synthesis', 'Structure creation', 'Optimisation'],
    },
    {
      title: 'Output',
      items: ['Visualisation', 'Presentation', 'Final product'],
    },
  ],
  regionAria:
    'Process diagram: Input, Processing, Output – any task can be broken down into these 3 steps.',
  stepAria: (i, title) => `Step ${i + 1}: ${title}`,
};

export function getStrukturuotasProcesasDiagramLabels(
  locale: StrukturuotasProcesasLocale
): StrukturuotasProcesasDiagramLabels {
  return locale === 'en' ? DIAGRAM_LABELS_EN : DIAGRAM_LABELS_LT;
}
