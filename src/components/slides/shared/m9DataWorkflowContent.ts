import type { StepExplanation } from './stepExplanations';

/** Trumpi antraštės tekstai diagramos dėžutėse (LT) – sinchronas su Modulio 9 id 93–94 */
export const M9_DATA_WORKFLOW_STEPS_LT: { label: string; desc: string }[] = [
  { label: 'Surinkimas', desc: 'Šaltiniai, tema' },
  { label: 'Metodika', desc: 'Struktūra, rodikliai' },
  { label: 'Deep research', desc: 'Prompto paruošimas' },
  { label: '4× tyrimas', desc: 'Kelios DI platformos' },
  { label: 'Valymas', desc: 'Dublių šalinimas' },
  { label: 'Integracija', desc: 'Vienas dokumentas' },
  { label: 'Atvaizdavimas', desc: 'Spalvos, grafikai' },
  { label: 'Dashboard', desc: '.html snippet' },
];

export const M9_DATA_WORKFLOW_STEPS_EN: { label: string; desc: string }[] = [
  { label: 'Collection', desc: 'Sources, topic' },
  { label: 'Methodology', desc: 'Structure, KPIs' },
  { label: 'Deep research', desc: 'Prompt prep' },
  { label: '4× research', desc: 'Multiple LLMs' },
  { label: 'Cleaning', desc: 'Dedupe, format' },
  { label: 'Integration', desc: 'Single doc' },
  { label: 'Visualisation', desc: 'Colours, charts' },
  { label: 'Dashboard', desc: '.html snippet' },
];

export const M9_DATA_WORKFLOW_STEP_EXPLANATIONS: StepExplanation[] = [
  {
    title: '1. Duomenų surinkimas',
    body: 'Išvardink **10–15 šaltinių** temai: oficialūs, vieši; formatas (CSV, API, ataskaitos) ir atnaujinimo dažnis. Tai Modulio 9 **žingsnio 1** CopyButton – nukopijuok ir pritaikyk savo temai.',
  },
  {
    title: '2. Metodikos promptas',
    body: 'Paruošk **analizės metodiką**: struktūra, rodikliai, lentelės šablonas. Ryšys su Moduliu 7 – MASTER ir verslo analizės šablonai.',
  },
  {
    title: '3. Deep research promptas',
    body: 'Vienas **gilusis tyrimo** promptas su šaltinių taisykle – prieš paleidimą 4 platformose. Žr. skaidrę 94 – bendras promptas žingsniui 3–4.',
  },
  {
    title: '4. Keturi tyrimai vienu metu',
    body: 'Tą patį promptą paleisk **ChatGPT, Gemini, DeepSeek, Grok** (ar prieinamus). Vėliau sujungsi išvestis į vieną dokumentą.',
  },
  {
    title: '5. Duomenų išvalymas',
    body: '**Checklist**: dublių šalinimas, datos ir skaičių formatas, trūkstamos reikšmės, metaduomenys (kuris DI, data). Žr. Modulio 7 skaidrę 7.16a.',
  },
  {
    title: '6. Integracija',
    body: 'Sujunk 4 fragmentus į **vieną markdown** – skyriai: santrauka, faktai, rizikos, šaltiniai; pašalink pasikartojimus.',
  },
  {
    title: '7. Atvaizdavimas',
    body: '**Vizualizacijos spec**: spalvos (hex), ašys, legenda, 2 grafikų tipai, KPI blokai – mažai kodo, aiškios instrukcijos DI.',
  },
  {
    title: '8. Dashboard (.html)',
    body: 'Pilnas **.html** su CSS (ir jei reikia Chart.js per CDN) – nukopijuok į Notepad, išsaugok, atidaryk naršyklėje. Pavyzdys: `m9_dashboard_snippet.html` public aplanke.',
  },
];

export const M9_DATA_WORKFLOW_STEP_EXPLANATIONS_EN: StepExplanation[] = [
  {
    title: '1. Data collection',
    body: 'List **10–15 sources** for the topic: official, public; format (CSV, API, reports) and refresh cadence. This is Module 9 **step 1** CopyButton – copy and adapt.',
  },
  {
    title: '2. Methodology prompt',
    body: 'Prepare **analysis methodology**: structure, KPIs, table template. Links to Module 7 – MASTER and business analysis templates.',
  },
  {
    title: '3. Deep research prompt',
    body: 'One **deep research** prompt with source rules – before running on 4 platforms. See slide 94 – shared prompt for steps 3–4.',
  },
  {
    title: '4. Four parallel runs',
    body: 'Run the same prompt on **ChatGPT, Gemini, DeepSeek, Grok** (or available). You will merge outputs into one document later.',
  },
  {
    title: '5. Data cleaning',
    body: '**Checklist**: dedupe, date and number formats, missing values, metadata (which LLM, date). See Module 7 slide 7.16a.',
  },
  {
    title: '6. Integration',
    body: 'Merge four fragments into **one markdown** – sections: summary, facts, risks, sources; remove duplicates.',
  },
  {
    title: '7. Visualisation',
    body: '**Viz spec**: colours (hex), axes, legend, two chart types, KPI blocks – minimal code, clear LLM instructions.',
  },
  {
    title: '8. Dashboard (.html)',
    body: 'Full **.html** with CSS (and Chart.js via CDN if needed) – copy to Notepad, save, open in browser. Example: `m9_dashboard_snippet.html` in public.',
  },
];

export function getM9DataWorkflowSteps(locale: 'lt' | 'en') {
  return locale === 'en'
    ? M9_DATA_WORKFLOW_STEPS_EN
    : M9_DATA_WORKFLOW_STEPS_LT;
}

export function getM9DataWorkflowStepExplanations(
  locale: 'lt' | 'en'
): StepExplanation[] {
  return locale === 'en'
    ? M9_DATA_WORKFLOW_STEP_EXPLANATIONS_EN
    : M9_DATA_WORKFLOW_STEP_EXPLANATIONS;
}
