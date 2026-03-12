/**
 * LlmArch diagram layout – geometrijos ir turinio SOT.
 * LLM agentinė sistema: Input → LLM → Output; Tool Use; Database.
 * Režimai: Bazinis, RAG, Tool Use.
 * Projekto spalvos: brand, accent, emerald (tailwind.config.js).
 */

export type Locale = 'lt' | 'en';
export type LlmArchMode = 'basic' | 'rag' | 'tool';

export interface LlmArchModeConfig {
  /** Trumpa etiketė tab mygtukui */
  tabLabel: string;
  label: string;
  desc: string;
  /** Ar rodomas vertikalus flow (Tool, DB) */
  showVertical: boolean;
  /** Return path iš kurio elemento: 'tool' | 'db' | null */
  returnFrom: 'tool' | 'db' | null;
  /** Kuris card aktyvus (0, 1, 2) */
  activeCard: number;
}

export const LLM_ARCH_MODES: Record<LlmArchMode, LlmArchModeConfig> = {
  basic: {
    tabLabel: 'Bazinis',
    label: 'Bazinis srautas',
    desc: 'Įvestis → LLM → Išvestis',
    showVertical: false,
    returnFrom: null,
    activeCard: 0,
  },
  rag: {
    tabLabel: 'RAG',
    label: 'RAG režimas',
    desc: 'Įvestis → LLM → Įrankiai → DB → LLM → Išvestis',
    showVertical: true,
    returnFrom: 'db',
    activeCard: 1,
  },
  tool: {
    tabLabel: 'Įrankiai',
    label: 'Įrankių režimas',
    desc: 'LLM → Įrankiai → API → LLM → Išvestis',
    showVertical: true,
    returnFrom: 'tool',
    activeCard: 2,
  },
};

export const LLM_ARCH_MODES_EN: Record<LlmArchMode, LlmArchModeConfig> = {
  basic: {
    tabLabel: 'Basic',
    label: 'Basic flow',
    desc: 'Input → LLM → Output',
    showVertical: false,
    returnFrom: null,
    activeCard: 0,
  },
  rag: {
    tabLabel: 'RAG',
    label: 'RAG mode',
    desc: 'Input → LLM → Tools → DB → LLM → Output',
    showVertical: true,
    returnFrom: 'db',
    activeCard: 1,
  },
  tool: {
    tabLabel: 'Tools',
    label: 'Tool use mode',
    desc: 'LLM → Tools → API → LLM → Output',
    showVertical: true,
    returnFrom: 'tool',
    activeCard: 2,
  },
};

export function getLlmArchModes(locale: Locale): Record<LlmArchMode, LlmArchModeConfig> {
  return locale === 'en' ? LLM_ARCH_MODES_EN : LLM_ARCH_MODES;
}

export interface LlmArchCard {
  num: string;
  title: string;
  text: string;
  tags: string[];
}

export const LLM_ARCH_CARDS: LlmArchCard[] = [
  {
    num: '01 — Bazinis',
    title: 'Pagrindinis srautas',
    text: 'Vartotojas pateikia užklausą. LLM apdoroja ir generuoja atsakymą tiesiogiai, be papildomų įrankių.',
    tags: ['Įvestis', '→ LLM', '→ Išvestis'],
  },
  {
    num: '02 — RAG',
    title: 'RAG – paieška žinių bazėje',
    text: 'LLM nusprendžia, kad reikia papildomos informacijos. Kreipiasi į duomenų bazę per įrankių sluoksnį.',
    tags: ['LLM', '→ Įrankiai', '→ DB → LLM'],
  },
  {
    num: '03 — Agentinė',
    title: 'Valdymo centras',
    text: 'LLM ≠ izoliuotas generatorius. LLM = valdymo centras, kuris sprendžia, kviečia įrankius ir jungiasi prie žinių bazės.',
    tags: ['◈ Orchestratorius', '⚙ Veiksmai'],
  },
];

export const LLM_ARCH_CARDS_EN: LlmArchCard[] = [
  {
    num: '01 — Basic',
    title: 'Main flow',
    text: 'User submits a query. The LLM processes it and generates a response directly, without additional tools.',
    tags: ['Input', '→ LLM', '→ Output'],
  },
  {
    num: '02 — RAG',
    title: 'RAG – knowledge base search',
    text: 'The LLM decides it needs more information. It queries the database through the tools layer.',
    tags: ['LLM', '→ Tools', '→ DB → LLM'],
  },
  {
    num: '03 — Agent',
    title: 'Control centre',
    text: 'LLM ≠ isolated generator. LLM = control centre that decides, calls tools, and connects to the knowledge base.',
    tags: ['◈ Orchestrator', '⚙ Actions'],
  },
];

export function getLlmArchCards(locale: Locale): LlmArchCard[] {
  return locale === 'en' ? LLM_ARCH_CARDS_EN : LLM_ARCH_CARDS;
}

/** Diagramos konteinerio plotis (px) – return path skaičiavimui */
export const DIAGRAM_CONTAINER_WIDTH = 560;
export const DIAGRAM_CONTAINER_HEIGHT = 420;

/** Diagramos mazgų ir sekcijų etiketės (įvestis, išvestis, DI, įrankiai, DB, sekcijos antraštės) */
export interface LlmArchDiagramLabels {
  inputRole: string;
  inputTitle: string;
  inputSubtitle: string;
  diBadge: string;
  diSubtitle: string;
  outputRole: string;
  outputTitle: string;
  outputSubtitle: string;
  toolTitle: string;
  toolSubtitle: string;
  dbRagLabel: string;
  dbTitle: string;
  dbSubtitle: string;
  dbHint: string;
  sectionFlow: string;
  sectionArch: string;
}

const LLM_ARCH_DIAGRAM_LABELS_LT: LlmArchDiagramLabels = {
  inputRole: 'Žmogus',
  inputTitle: 'Įvestis',
  inputSubtitle: 'Vartotojo užklausa',
  diBadge: 'Branduolys',
  diSubtitle: 'Valdymo centras · Apdorojimas',
  outputRole: 'Sistema',
  outputTitle: 'Išvestis',
  outputSubtitle: 'Galutinis atsakymas',
  toolTitle: 'Įrankiai',
  toolSubtitle: 'API · Paieška',
  dbRagLabel: 'RAG sluoksnis',
  dbTitle: 'Duomenų bazė',
  dbSubtitle: 'Dokumentai · Žinių bazė',
  dbHint: 'Papildo modelį kontekstu',
  sectionFlow: 'Sistemos srautas',
  sectionArch: 'Architektūros logika',
};

const LLM_ARCH_DIAGRAM_LABELS_EN: LlmArchDiagramLabels = {
  inputRole: 'Human',
  inputTitle: 'Input',
  inputSubtitle: 'User query',
  diBadge: 'Core',
  diSubtitle: 'Orchestrator · Processing',
  outputRole: 'System',
  outputTitle: 'Output',
  outputSubtitle: 'Final response',
  toolTitle: 'Tools',
  toolSubtitle: 'API · Search',
  dbRagLabel: 'RAG layer',
  dbTitle: 'Database',
  dbSubtitle: 'Documents · Knowledge base',
  dbHint: 'Supplies context to the model',
  sectionFlow: 'System flow',
  sectionArch: 'Architecture logic',
};

export function getLlmArchDiagramLabels(locale: Locale): LlmArchDiagramLabels {
  return locale === 'en' ? LLM_ARCH_DIAGRAM_LABELS_EN : LLM_ARCH_DIAGRAM_LABELS_LT;
}

/** Bloko UI etiketės (region aria, enlarge mygtukas) */
export interface LlmArchBlockLabels {
  regionAria: string;
  enlargeLabel: string;
}

const LLM_ARCH_BLOCK_LABELS_LT: LlmArchBlockLabels = {
  regionAria: 'LLM agentinė sistema – režimų perjungimas',
  enlargeLabel: 'LLM agentinė sistema: režimai Bazinis, RAG, Įrankiai',
};

const LLM_ARCH_BLOCK_LABELS_EN: LlmArchBlockLabels = {
  regionAria: 'LLM agent system – mode switching',
  enlargeLabel: 'LLM agent system: Basic, RAG, Tools modes',
};

export function getLlmArchBlockLabels(locale: Locale): LlmArchBlockLabels {
  return locale === 'en' ? LLM_ARCH_BLOCK_LABELS_EN : LLM_ARCH_BLOCK_LABELS_LT;
}
