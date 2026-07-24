/**
 * LlmArch diagram layout – geometrijos ir turinio SOT.
 * LLM agentinė sistema: Input → LLM → Output; Tool Use; Database.
 * Režimai: Bazinis, RAG, Agentinis (mode id 'tool' lieka).
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
    label: 'Bazinis',
    desc: 'Įvestis → LLM → Išvestis',
    showVertical: false,
    returnFrom: null,
    activeCard: 0,
  },
  rag: {
    tabLabel: 'RAG',
    label: 'RAG',
    desc: 'Įvestis → LLM → Įrankiai → DB → LLM → Išvestis',
    showVertical: true,
    returnFrom: 'db',
    activeCard: 1,
  },
  tool: {
    tabLabel: 'Agentinis',
    label: 'Agentinis',
    desc: 'LLM → Įrankiai → API → LLM → Išvestis',
    showVertical: true,
    returnFrom: 'tool',
    activeCard: 2,
  },
};

export const LLM_ARCH_MODES_EN: Record<LlmArchMode, LlmArchModeConfig> = {
  basic: {
    tabLabel: 'Basic',
    label: 'Basic',
    desc: 'Input → LLM → Output',
    showVertical: false,
    returnFrom: null,
    activeCard: 0,
  },
  rag: {
    tabLabel: 'RAG',
    label: 'RAG',
    desc: 'Input → LLM → Tools → DB → LLM → Output',
    showVertical: true,
    returnFrom: 'db',
    activeCard: 1,
  },
  tool: {
    tabLabel: 'Agent',
    label: 'Agent',
    desc: 'LLM → Tools → API → LLM → Output',
    showVertical: true,
    returnFrom: 'tool',
    activeCard: 2,
  },
};

export function getLlmArchModes(
  locale: Locale
): Record<LlmArchMode, LlmArchModeConfig> {
  return locale === 'en' ? LLM_ARCH_MODES_EN : LLM_ARCH_MODES;
}

export interface LlmArchCard {
  num: string;
  title: string;
  text: string;
  tags: string[];
  /** Mode id this card selects when clicked */
  mode: LlmArchMode;
}

export const LLM_ARCH_CARDS: LlmArchCard[] = [
  {
    num: '01 — Bazinis',
    title: 'Pagrindinis srautas',
    text: 'Užklausa eina tiesiai į LLM – atsakymas be papildomų įrankių ar žinių bazės.',
    tags: ['Įvestis', '→ LLM', '→ Išvestis'],
    mode: 'basic',
  },
  {
    num: '02 — RAG',
    title: 'Paieška žinių bazėje',
    text: 'LLM kreipiasi į DB per įrankių sluoksnį, tada generuoja atsakymą su kontekstu.',
    tags: ['LLM', '→ Įrankiai', '→ DB → LLM'],
    mode: 'rag',
  },
  {
    num: '03 — Agentinis',
    title: 'Valdymo centras',
    text: 'LLM sprendžia, kviečia įrankius (API) ir grąžina rezultatą į srautą.',
    tags: ['LLM', '→ Įrankiai', '→ API → LLM'],
    mode: 'tool',
  },
];

export const LLM_ARCH_CARDS_EN: LlmArchCard[] = [
  {
    num: '01 — Basic',
    title: 'Main flow',
    text: 'The query goes straight to the LLM – a response with no extra tools or knowledge base.',
    tags: ['Input', '→ LLM', '→ Output'],
    mode: 'basic',
  },
  {
    num: '02 — RAG',
    title: 'Knowledge base search',
    text: 'The LLM queries the DB via the tools layer, then answers with that context.',
    tags: ['LLM', '→ Tools', '→ DB → LLM'],
    mode: 'rag',
  },
  {
    num: '03 — Agent',
    title: 'Control centre',
    text: 'The LLM decides, calls tools (API), and feeds the result back into the flow.',
    tags: ['LLM', '→ Tools', '→ API → LLM'],
    mode: 'tool',
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
  inactiveBadge: string;
  edgeCall: string;
  edgeReturn: string;
  activeModePrefix: string;
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
  dbSubtitle: 'Dokumentai · žinių bazė',
  dbHint: 'Papildo modelį kontekstu',
  sectionFlow: 'Sistemos srautas',
  sectionArch: 'Kaip keičiasi architektūra',
  inactiveBadge: 'Neaktyvu',
  edgeCall: 'kviečia',
  edgeReturn: 'grąžina',
  activeModePrefix: 'Aktyvus režimas',
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
  dbSubtitle: 'Documents · knowledge base',
  dbHint: 'Supplies context to the model',
  sectionFlow: 'System flow',
  sectionArch: 'How the architecture changes',
  inactiveBadge: 'Inactive',
  edgeCall: 'calls',
  edgeReturn: 'returns',
  activeModePrefix: 'Active mode',
};

export function getLlmArchDiagramLabels(locale: Locale): LlmArchDiagramLabels {
  return locale === 'en'
    ? LLM_ARCH_DIAGRAM_LABELS_EN
    : LLM_ARCH_DIAGRAM_LABELS_LT;
}

/** Bloko UI etiketės (region aria, enlarge mygtukas) */
export interface LlmArchBlockLabels {
  regionAria: string;
  enlargeLabel: string;
}

const LLM_ARCH_BLOCK_LABELS_LT: LlmArchBlockLabels = {
  regionAria: 'DI sistemos veikimo režimai – perjungimas',
  enlargeLabel: 'DI sistemos režimai: Bazinis, RAG, Agentinis',
};

const LLM_ARCH_BLOCK_LABELS_EN: LlmArchBlockLabels = {
  regionAria: 'AI system operating modes – switching',
  enlargeLabel: 'AI system modes: Basic, RAG, Agent',
};

export function getLlmArchBlockLabels(locale: Locale): LlmArchBlockLabels {
  return locale === 'en' ? LLM_ARCH_BLOCK_LABELS_EN : LLM_ARCH_BLOCK_LABELS_LT;
}
