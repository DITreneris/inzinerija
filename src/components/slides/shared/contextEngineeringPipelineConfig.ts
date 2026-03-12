/**
 * ContextEngineeringPipeline – geometrijos ir turinio konfigūracija (SOT).
 * Viena vertikali schema: 6 mazgai, du vizualiai paryškinti keliai.
 * Prompt engineering kelias: Tikslas → Prompt → LLM → Output (brand, navy).
 * Konteksto inžinerija prideda: Kontekstas + Įrankiai/Duomenys (emerald).
 * SCHEME_AGENT: rodyklės kraštas į kraštą, refX=0, path nekerta blokų.
 * Locale-aware: node labels, mode labels, UI strings – getPipelineNodes(locale), getModeLabels(locale), getDiagramUiLabels(locale).
 */

export type Locale = 'lt' | 'en';

/* ═══ SVG Viewbox ═══ */
export const VB_WIDTH = 460;
export const VB_HEIGHT = 530;

/* ═══ Box geometry ═══ */
export const BOX_W = 300;
export const BOX_H = 62;
export const BOX_R = 10;
export const BOX_X = (VB_WIDTH - BOX_W) / 2; // = 80
export const CX = VB_WIDTH / 2;               // = 230

/* ═══ Vertical layout ═══ */
/** Gap between consecutive boxes */
export const NODE_GAP = 24;
/** Y position of first node (room for title + mode legend) */
export const FIRST_NODE_Y = 62;

/** Computed Y start positions for all 6 nodes */
export const NODE_Y: readonly number[] = Array.from(
  { length: 6 },
  (_, i) => FIRST_NODE_Y + i * (BOX_H + NODE_GAP),
);
// NODE_Y = [62, 138, 214, 290, 366, 442]
// Last node bottom: 442 + 56 = 498; legend: 512

/* ═══ Arrow ═══ */
export const ARROW_MARKER_LEN = 8;

/* ═══ Node definitions ═══ */
export type PipelineMode = 'both' | 'context';

export interface PipelineNode {
  readonly id: string;
  readonly label: string;
  readonly sub: string;
  /** 'both' = Prompt engineering + Context engineering; 'context' = Context engineering addition */
  readonly mode: PipelineMode;
  /** Badge text for context node (e.g. "+ papildomas kontekstas") */
  readonly badgeContext?: string;
  /** Badge text for tools node (e.g. "+ papildomi įrankiai") */
  readonly badgeTools?: string;
}

const PIPELINE_NODES_LT: readonly PipelineNode[] = [
  { id: 'goal', label: '1. Vartotojo tikslas', sub: 'ko siekiame', mode: 'both' },
  { id: 'prompt', label: '2. Prompt', sub: 'aiški instrukcija modeliui', mode: 'both' },
  { id: 'context', label: '3. Kontekstas', sub: 'dokumentai, CRM, taisyklės', mode: 'context', badgeContext: '+ papildomas kontekstas' },
  { id: 'llm', label: '4. LLM', sub: 'planuoja ir generuoja', mode: 'both' },
  { id: 'tools', label: '5. Įrankiai / Duomenys', sub: 'paieška, DB, API', mode: 'context', badgeTools: '+ papildomi įrankiai' },
  { id: 'output', label: '6. Output ✓', sub: 'paruoštas rezultatas', mode: 'both' },
];

const PIPELINE_NODES_EN: readonly PipelineNode[] = [
  { id: 'goal', label: '1. User goal', sub: 'what we want', mode: 'both' },
  { id: 'prompt', label: '2. Prompt', sub: 'clear instruction to model', mode: 'both' },
  { id: 'context', label: '3. Context', sub: 'documents, CRM, rules', mode: 'context', badgeContext: '+ extra context' },
  { id: 'llm', label: '4. LLM', sub: 'plans and generates', mode: 'both' },
  { id: 'tools', label: '5. Tools / Data', sub: 'search, DB, API', mode: 'context', badgeTools: '+ tools' },
  { id: 'output', label: '6. Output ✓', sub: 'ready result', mode: 'both' },
];

/** Locale-aware pipeline nodes (diagram labels, badges). */
export function getPipelineNodes(locale: Locale): readonly PipelineNode[] {
  return locale === 'en' ? PIPELINE_NODES_EN : PIPELINE_NODES_LT;
}

/** @deprecated Use getPipelineNodes(locale) for locale-aware labels. */
export const PIPELINE_NODES = PIPELINE_NODES_LT;

/* ═══ Colors ═══ */
export const COLORS = {
  brand: '#334e68',
  brandStart: '#5a6d7d',
  brandDarker: '#2a3f54',
  emerald: '#4f8f80',
  emeraldLight: '#6ca999',
  emeraldDarker: '#3a7568',
  emeraldGlow: '#90c7b8',
  neutral: '#64748b',
  neutralLight: '#94a3b8',
  border: '#bcccdc',
  bgStart: '#f0f4f8',
  bgEnd: '#e8eef4',
  textDark: '#102a43',
  textMuted: '#64748b',
  textWhite: '#ffffff',
  arrow: '#6b7c8c',
  arrowContext: '#4f8f80',
} as const;

/* ═══ Interactive mode ═══ */
export type PipelineActiveMode = 'prompt' | 'context';

const MODE_LABELS_LT: Record<PipelineActiveMode, string> = {
  prompt: 'Prompt engineering',
  context: 'Konteksto inžinerija',
};

const MODE_LABELS_EN: Record<PipelineActiveMode, string> = {
  prompt: 'Prompt engineering',
  context: 'Context engineering',
};

export const MODE_LABELS = MODE_LABELS_LT;

/** Locale-aware mode names (toggle buttons, aria). */
export function getModeLabels(locale: Locale): Record<PipelineActiveMode, string> {
  return locale === 'en' ? MODE_LABELS_EN : MODE_LABELS_LT;
}

const MODE_CONSEQUENCE_LT: Record<PipelineActiveMode, string> = {
  prompt: 'Prompt engineering: promptas eina tiesiai į modelį. Kontekstas ir įrankiai nedalyvauja.',
  context: '✓ Promptas ir kontekstas sudaro įvestį, o LLM su įrankiais dirba iteratyviai.',
};

const MODE_CONSEQUENCE_EN: Record<PipelineActiveMode, string> = {
  prompt: 'Prompt engineering: the prompt goes straight to the model. Context and tools are not used.',
  context: '✓ Prompt and context form the input; the LLM works iteratively with tools.',
};

export const MODE_CONSEQUENCE = MODE_CONSEQUENCE_LT;

/** Locale-aware consequence line text. */
export function getModeConsequence(locale: Locale): Record<PipelineActiveMode, string> {
  return locale === 'en' ? MODE_CONSEQUENCE_EN : MODE_CONSEQUENCE_LT;
}

/** UI strings for diagram (toggle, aria, SVG annotations, consequence header). */
export interface ContextPipelineUiLabels {
  nowLabel: string;
  compareLabel: string;
  modeLabel: string;
  ariaGroup: string;
  inputPromptContext: string;
  llmToolsLabel: string;
  stepDetailAria: string;
  keyRuleLabel: string;
  noteLabel: string;
  ariaStepsPrompt: string;
  ariaStepsContext: string;
}

const UI_LABELS_LT: ContextPipelineUiLabels = {
  nowLabel: 'Dabar:',
  compareLabel: 'Palygink:',
  modeLabel: 'Režimas:',
  ariaGroup: 'Pipeline režimas',
  inputPromptContext: 'INPUT: Prompt + Kontekstas',
  llmToolsLabel: 'LLM ↔ Tools',
  stepDetailAria: 'Žingsnio detalė',
  keyRuleLabel: 'Svarbiausia taisyklė',
  noteLabel: 'Pastaba',
  ariaStepsPrompt: '4 žingsniai (Tikslas → Prompt → LLM → Output)',
  ariaStepsContext: '6 žingsniai (Prompt + Kontekstas + Įrankiai)',
};

const UI_LABELS_EN: ContextPipelineUiLabels = {
  nowLabel: 'Now:',
  compareLabel: 'Compare:',
  modeLabel: 'Mode:',
  ariaGroup: 'Pipeline mode',
  inputPromptContext: 'INPUT: Prompt + Context',
  llmToolsLabel: 'LLM ↔ Tools',
  stepDetailAria: 'Step detail',
  keyRuleLabel: 'Key rule',
  noteLabel: 'Note',
  ariaStepsPrompt: '4 steps (Goal → Prompt → LLM → Output)',
  ariaStepsContext: '6 steps (Prompt + Context + Tools)',
};

export function getDiagramUiLabels(locale: Locale): ContextPipelineUiLabels {
  return locale === 'en' ? UI_LABELS_EN : UI_LABELS_LT;
}

/** VB_HEIGHT sutrumpintas – legenda perkelta į HTML (consequence line) */
export const VB_HEIGHT_INTERACTIVE = NODE_Y[5] + BOX_H + 10; // = 508
