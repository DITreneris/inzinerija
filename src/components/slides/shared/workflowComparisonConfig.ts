/**
 * WorkflowComparison – geometrijos ir turinio konfigūracija (SOT).
 * Basic (Pokalbis) vs Workflow: Input → LLM → Output.
 * V2: output tipai (Dokumentas / Planas / Analizė), input placeholderiai.
 * Spalvos: brand, emerald, accent (tailwind.config.js).
 * Locale-aware: use getWorkflowModes(locale), getOutputTypes(locale), etc. for EN/LT.
 */

export type Locale = 'lt' | 'en';
export type WorkflowMode = 'basic' | 'workflow';

export interface WorkflowModeConfig {
  label: string;
  desc: string;
  consequenceLine: string;
  diagramTitle: string;
  noteText: string;
  noteIcon: string;
  outputTitle: string;
  outputExample: string;
}

export const WORKFLOW_MODES: Record<WorkflowMode, WorkflowModeConfig> = {
  basic: {
    label: 'Pokalbis',
    desc: 'Klausimas → Atsakymas',
    consequenceLine: 'Rezultatas bus laisvos formos.',
    diagramTitle: 'Pokalbis su DI',
    noteText: 'Ribota kontrolė – DI spėlioja, ką norite.',
    noteIcon: '⚠',
    outputTitle: 'Atsakymas (laisva forma)',
    outputExample:
      'DI atsako savo nuožiūra – formatas, ilgis ir turinys priklauso nuo DI sprendimo.',
  },
  workflow: {
    label: 'Workflow',
    desc: 'Promptas + Duomenys → Struktūruotas rezultatas',
    consequenceLine: 'Rezultatas bus struktūruotas – pagal tavo nurodymus.',
    diagramTitle: 'DI kaip darbo įrankis',
    noteText: 'Pagal tavo planą.',
    noteIcon: '✓',
    outputTitle: 'Dokumentas / Planas / Analizė',
    outputExample:
      'Aiškus formatas, struktūra ir turinys – pagal tavo nurodymus ir pateiktus duomenis.',
  },
};

const WORKFLOW_MODES_EN: Record<WorkflowMode, WorkflowModeConfig> = {
  basic: {
    label: 'Chat',
    desc: 'Question → Answer',
    consequenceLine: 'Result will be free-form.',
    diagramTitle: 'Chat with AI',
    noteText: 'Limited control – AI guesses what you want.',
    noteIcon: '⚠',
    outputTitle: 'Answer (free form)',
    outputExample: 'AI responds at its discretion – format, length and content depend on the AI.',
  },
  workflow: {
    label: 'Workflow',
    desc: 'Prompt + Data → Structured result',
    consequenceLine: 'Result will be structured – according to your instructions.',
    diagramTitle: 'AI as a work tool',
    noteText: 'According to your plan.',
    noteIcon: '✓',
    outputTitle: 'Document / Plan / Analysis',
    outputExample: 'Clear format, structure and content – according to your instructions and provided data.',
  },
};

export function getWorkflowModes(locale: Locale): Record<WorkflowMode, WorkflowModeConfig> {
  return locale === 'en' ? WORKFLOW_MODES_EN : WORKFLOW_MODES;
}

/* ═══ UX: įrėminimas, sprendimo blokas, mikro-užduotis ═══ */
export const FRAMING_SENTENCE =
  'Skirtumas paprastas: Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas.';

export const DECISION_BLOCK: { whenPokalbis: string[]; whenWorkflow: string[] } = {
  whenPokalbis: [
    'Kai reikia idėjos',
    'Kai reikia paaiškinimo',
    'Kai formatas nesvarbus',
  ],
  whenWorkflow: [
    'Kai reikia dokumento',
    'Kai reikia plano',
    'Kai reikia aiškios struktūros',
  ],
};

export const MICRO_TASK_LABEL =
  'Mini užduotis: sugalvok vieną situaciją, kur naudotum Pokalbį, ir vieną – Workflow.';

/** Vienas CTA po schema (Kiss/Marry/Kill) */
export const CTA_SENTENCE =
  'Paspausk Workflow – pamatysi skirtumą.';

const CTA_SENTENCE_EN = 'Click Workflow – you\'ll see the difference.';

export function getCtaSentence(locale: Locale): string {
  return locale === 'en' ? CTA_SENTENCE_EN : CTA_SENTENCE;
}

/* ═══ V2: Output tipai ═══ */

export type OutputType = 'document' | 'plan' | 'analysis';

export interface OutputTypeConfig {
  label: string;
  icon: string;
  diagramLabel: string;
  diagramSub: string;
  previewTitle: string;
  previewLines: (prompt: string, data: string) => string[];
}

const fallback = (v: string, fb: string) => (v.trim() ? v.trim() : fb);

export const OUTPUT_TYPES: Record<OutputType, OutputTypeConfig> = {
  document: {
    label: 'Dokumentas',
    icon: '📋',
    diagramLabel: 'Dokumentas',
    diagramSub: 'struktūruotas',
    previewTitle: 'Dokumentas',
    previewLines: (p, d) => [
      `Tema: ${fallback(p, 'tavo nurodymas')}`,
      `Duomenys: ${fallback(d, 'pateiktas kontekstas')}`,
      '',
      '1. Įžanga ir kontekstas',
      '2. Pagrindiniai radiniai',
      '3. Išvados ir rekomendacijos',
    ],
  },
  plan: {
    label: 'Planas',
    icon: '📌',
    diagramLabel: 'Planas',
    diagramSub: 'veiksmų seka',
    previewTitle: 'Veiksmų planas',
    previewLines: (p, d) => [
      `Užduotis: ${fallback(p, 'tavo nurodymas')}`,
      `Kontekstas: ${fallback(d, 'pateikti duomenys')}`,
      '',
      '1. žingsnis – situacijos analizė',
      '2. žingsnis – tikslų formulavimas',
      '3. žingsnis – veiksmų prioritetizavimas',
      '4. žingsnis – įgyvendinimas ir matavimas',
    ],
  },
  analysis: {
    label: 'Analizė',
    icon: '📊',
    diagramLabel: 'Analizė',
    diagramSub: 'įžvalgos',
    previewTitle: 'Analizė',
    previewLines: (p, d) => [
      `Objektas: ${fallback(p, 'tavo nurodymas')}`,
      `Šaltinis: ${fallback(d, 'pateikti duomenys')}`,
      '',
      '✅ Stiprybės – remiantis pateiktais duomenimis',
      '⚠ Rizikos – identifikuotos pagal kontekstą',
      '💡 Rekomendacijos – konkrečios, paremtos analize',
    ],
  },
};

export const OUTPUT_TYPE_KEYS: OutputType[] = ['document', 'plan', 'analysis'];

const OUTPUT_TYPES_EN: Record<OutputType, OutputTypeConfig> = {
  document: {
    label: 'Document',
    icon: '📋',
    diagramLabel: 'Document',
    diagramSub: 'structured',
    previewTitle: 'Document',
    previewLines: (p, d) => [
      `Topic: ${fallback(p, 'your instruction')}`,
      `Data: ${fallback(d, 'provided context')}`,
      '',
      '1. Introduction and context',
      '2. Main findings',
      '3. Conclusions and recommendations',
    ],
  },
  plan: {
    label: 'Plan',
    icon: '📌',
    diagramLabel: 'Plan',
    diagramSub: 'action sequence',
    previewTitle: 'Action plan',
    previewLines: (p, d) => [
      `Task: ${fallback(p, 'your instruction')}`,
      `Context: ${fallback(d, 'provided data')}`,
      '',
      'Step 1 – situation analysis',
      'Step 2 – goal formulation',
      'Step 3 – action prioritization',
      'Step 4 – implementation and measurement',
    ],
  },
  analysis: {
    label: 'Analysis',
    icon: '📊',
    diagramLabel: 'Analysis',
    diagramSub: 'insights',
    previewTitle: 'Analysis',
    previewLines: (p, d) => [
      `Subject: ${fallback(p, 'your instruction')}`,
      `Source: ${fallback(d, 'provided data')}`,
      '',
      '✅ Strengths – based on provided data',
      '⚠ Risks – identified from context',
      '💡 Recommendations – specific, evidence-based',
    ],
  },
};

export function getOutputTypes(locale: Locale): Record<OutputType, OutputTypeConfig> {
  return locale === 'en' ? OUTPUT_TYPES_EN : OUTPUT_TYPES;
}

/* ═══ V2: Input placeholderiai (Kiss: vienas laukas Workflow režime) ═══ */
export const INPUT_PLACEHOLDERS = {
  prompt: 'Įrašyk (pvz. SWOT analizė)',
  data: 'Pvz.: Tikslinė rinka – mažmeninė prekyba, biudžetas – 50 000 €...',
} as const;

const INPUT_PLACEHOLDERS_EN = {
  prompt: 'Enter (e.g. SWOT analysis)',
  data: 'E.g.: Target market – retail, budget – 50,000 €...',
} as const;

export function getInputPlaceholders(locale: Locale): { prompt: string; data: string } {
  return locale === 'en' ? INPUT_PLACEHOLDERS_EN : INPUT_PLACEHOLDERS;
}

/* ═══ V3: LLM info panelio turinys ═══ */
export interface LlmInfoItem {
  label: string;
  value: string;
  icon: string;
}

export interface LlmInfoConfig {
  title: string;
  items: LlmInfoItem[];
}

export const LLM_INFO: Record<WorkflowMode, LlmInfoConfig> = {
  basic: {
    title: 'LLM pokalbio režime',
    items: [
      { label: 'Temperatūra', value: 'Aukštesnė – kūrybiškesni, bet mažiau tikslūs atsakymai', icon: '🌡' },
      { label: 'Atmintis', value: 'Tik šio pokalbio istorija', icon: '🧠' },
      { label: 'Žinių bazė', value: 'Nenaudojama – atsakymas iš LLM treniravimo duomenų', icon: '📚' },
      { label: 'Struktūra', value: 'Nėra – DI sprendžia formatą pats', icon: '📐' },
    ],
  },
  workflow: {
    title: 'LLM workflow režime',
    items: [
      { label: 'Temperatūra', value: 'Žemesnė – tikslesni, nuoseklesni rezultatai', icon: '🌡' },
      { label: 'Atmintis', value: 'Kontekstas iš tavo pateiktų duomenų', icon: '🧠' },
      { label: 'Žinių bazė', value: 'Galima naudoti RAG – jungtis prie tavo dokumentų', icon: '📚' },
      { label: 'Struktūra', value: 'Aiški – formatas, sekcijos ir tonas pagal nurodymus', icon: '📐' },
    ],
  },
};

const LLM_INFO_EN: Record<WorkflowMode, LlmInfoConfig> = {
  basic: {
    title: 'LLM in chat mode',
    items: [
      { label: 'Temperature', value: 'Higher – more creative, less precise answers', icon: '🌡' },
      { label: 'Memory', value: 'This conversation only', icon: '🧠' },
      { label: 'Knowledge base', value: 'Not used – answer from LLM training data', icon: '📚' },
      { label: 'Structure', value: 'None – AI decides format', icon: '📐' },
    ],
  },
  workflow: {
    title: 'LLM in workflow mode',
    items: [
      { label: 'Temperature', value: 'Lower – more precise, consistent results', icon: '🌡' },
      { label: 'Memory', value: 'Context from your provided data', icon: '🧠' },
      { label: 'Knowledge base', value: 'RAG possible – connect your documents', icon: '📚' },
      { label: 'Structure', value: 'Clear – format, sections and tone per instructions', icon: '📐' },
    ],
  },
};

export function getLlmInfo(locale: Locale): Record<WorkflowMode, LlmInfoConfig> {
  return locale === 'en' ? LLM_INFO_EN : LLM_INFO;
}

/* ═══ Diagram labels (SVG text) – locale-aware ═══ */
export interface WorkflowDiagramLabels {
  basic: { inputMain: string; inputSub: string; llmSub: string; outputMain: string; outputSub: string };
  workflow: {
    promptMain: string; promptSub: string; dataMain: string; dataSub: string;
    llmSub: string; outputDefaultLabel: string; outputDefaultSub: string;
    bottomNoteBasic: string; bottomNoteWorkflow: string; llmClickAria: string; llmHint: string;
  };
}

const DIAGRAM_LABELS_LT: WorkflowDiagramLabels = {
  basic: {
    inputMain: 'Klausimas',
    inputSub: 'įvestis',
    llmSub: 'kalbos modelis',
    outputMain: 'Atsakymas',
    outputSub: 'laisva forma',
  },
  workflow: {
    promptMain: 'Promptas',
    promptSub: 'nurodymai',
    dataMain: 'Duomenys',
    dataSub: 'kontekstas',
    llmSub: 'apdoroja struktūriškai',
    outputDefaultLabel: 'Dokumentas',
    outputDefaultSub: 'struktūruotas',
    bottomNoteBasic: '⚠ Ribota kontrolė – DI spėlioja, ką norite',
    bottomNoteWorkflow: '✓ Struktūruotas rezultatas – DI dirba pagal tavo planą',
    llmClickAria: 'LLM informacija – paspausk daugiau',
    llmHint: 'ℹ Paspausk LLM – daugiau info',
  },
};

const DIAGRAM_LABELS_EN: WorkflowDiagramLabels = {
  basic: {
    inputMain: 'Question',
    inputSub: 'input',
    llmSub: 'language model',
    outputMain: 'Answer',
    outputSub: 'free form',
  },
  workflow: {
    promptMain: 'Prompt',
    promptSub: 'instructions',
    dataMain: 'Data',
    dataSub: 'context',
    llmSub: 'processes structurally',
    outputDefaultLabel: 'Document',
    outputDefaultSub: 'structured',
    bottomNoteBasic: '⚠ Limited control – AI guesses what you want',
    bottomNoteWorkflow: '✓ Structured result – AI works to your plan',
    llmClickAria: 'LLM info – click for more',
    llmHint: 'ℹ Click LLM – more info',
  },
};

export function getDiagramLabels(locale: Locale): WorkflowDiagramLabels {
  return locale === 'en' ? DIAGRAM_LABELS_EN : DIAGRAM_LABELS_LT;
}

/** Interactive block UI strings (badge "Now:", label "Enter", etc.) */
export interface WorkflowBlockLabels {
  nowLabel: string;
  enterLabel: string;
  structuredResult: string;
  structuredResultHint: string;
  modeLabel: string;
  ariaRegion: string;
}

const BLOCK_LABELS_LT: WorkflowBlockLabels = {
  nowLabel: 'Dabar:',
  enterLabel: 'Įrašyk',
  structuredResult: 'Struktūruotas rezultatas',
  structuredResultHint: '(dokumentas, planas, analizė, instrukcija)',
  modeLabel: 'Režimas:',
  ariaRegion: 'DI naudojimo palyginimas – Pokalbis ir Workflow',
};

const BLOCK_LABELS_EN: WorkflowBlockLabels = {
  nowLabel: 'Now:',
  enterLabel: 'Enter',
  structuredResult: 'Structured result',
  structuredResultHint: '(document, plan, analysis, instruction)',
  modeLabel: 'Mode:',
  ariaRegion: 'AI usage comparison – Chat and Workflow',
};

export function getBlockLabels(locale: Locale): WorkflowBlockLabels {
  return locale === 'en' ? BLOCK_LABELS_EN : BLOCK_LABELS_LT;
}

/* ═══ SVG Viewbox ═══ */
export const VB_WIDTH = 820;
export const VB_HEIGHT = 270;

/* ═══ Box geometry ═══ */
export const BOX_W = 170;
export const BOX_H = 70;
export const BOX_R = 10;
export const ARROW_MARKER_LEN = 6;

/* ═══ Column X positions ═══ */
export const COL_INPUT = 30;
export const COL_LLM = 310;
export const COL_OUTPUT = 600;

/* ═══ Basic mode: single row ═══ */
export const BASIC_ROW_Y = 80;

/* ═══ Workflow mode: dual input, taller center/output ═══ */
export const WF_PROMPT_Y = 38;
export const WF_PROMPT_H = 58;
export const WF_DATA_Y = 120;
export const WF_DATA_H = 58;
export const WF_LLM_Y = 46;
export const WF_LLM_H = 108;
export const WF_OUTPUT_Y = 46;
export const WF_OUTPUT_H = 108;

/* ═══ Colors ═══ */
export const COLORS = {
  brand: '#334e68',
  brandLight: '#486581',
  brandStart: '#5a6d7d',
  /** ~10% darker for LLM center block emphasis */
  brandDarker: '#2a3f54',
  emerald: '#059669',
  emeraldLight: '#10b981',
  emeraldGlow: '#34d399',
  /** ~10% darker for LLM center block emphasis */
  emeraldDarker: '#047857',
  neutral: '#64748b',
  neutralLight: '#94a3b8',
  border: '#bcccdc',
  bgStart: '#f0f4f8',
  bgEnd: '#e8eef4',
  textDark: '#102a43',
  textMuted: '#64748b',
  textWhite: '#ffffff',
  arrow: '#475569',
} as const;
