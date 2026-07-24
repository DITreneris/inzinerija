/**
 * ContextEngineeringPipeline – geometrijos ir turinio konfigūracija (SOT).
 * Viena vertikali schema: 6 mazgai, du vizualiai paryškinti keliai.
 * Prompt engineering kelias: Tikslas → Prompt → LLM → Output (brand, navy).
 * Konteksto inžinerija prideda: Kontekstas + Įrankiai/Duomenys (emerald).
 * SCHEME_AGENT: rodyklės kraštas į kraštą, refX=0, path nekerta blokų.
 * Locale-aware: node labels, mode labels, UI strings – getPipelineNodes(locale), getModeLabels(locale), getDiagramUiLabels(locale).
 */

import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';

export type Locale = 'lt' | 'en';

/* ═══ SVG Viewbox (B+1: room for right annotation lane) ═══ */
export const VB_WIDTH = 580;
export const VB_HEIGHT = 530;
/** Hard floors guarded by contextEngineeringPipelineLayout.test.ts */
export const MIN_ANNOTATION_RIGHT_ROOM = 140;
export const MAX_BOX_TO_VB_RATIO = 0.48;
/**
 * Prompt režime context mazgai (3, 5) = dashed placeholder slots (variant B),
 * not ghost-filled boxes. Layout keeps 6 fixed NODE_Y positions.
 * Context režime = full emerald boxes. Badge strings double as slot labels.
 */
export const PLACEHOLDER_STROKE_WIDTH = 1.8;
export const PLACEHOLDER_DASH = '5 4';

/* ═══ Box geometry ═══ */
export const BOX_W = 250;
export const BOX_H = 62;
export const BOX_R = 10;
export const BOX_X = (VB_WIDTH - BOX_W) / 2; // = 165
export const CX = VB_WIDTH / 2; // = 290

/* ═══ Vertical layout ═══ */
/** Gap between consecutive boxes */
export const NODE_GAP = 24;
/** Y position of first node (room for title + mode legend) */
export const FIRST_NODE_Y = 62;

/** Computed Y start positions for all 6 nodes */
export const NODE_Y: readonly number[] = Array.from(
  { length: 6 },
  (_, i) => FIRST_NODE_Y + i * (BOX_H + NODE_GAP)
);
// NODE_Y = [62, 148, 234, 320, 406, 492]

/* ═══ Arrow ═══ */
export const ARROW_MARKER_LEN = 8;

/* ═══ Annotation / bypass routing (SCHEME: path nekerta blokų) ═══ */
/** L-path vertical stem – closer to boxes, not through label lane */
export const ROUTE_X_RIGHT = BOX_X + BOX_W + 8;
/** Etiketės (INPUT, LLM↔Tools) – further right than ROUTE_X_RIGHT */
export const ANNOTATION_LANE_X = BOX_X + BOX_W + 14;
/** Right padding so text never clips viewBox edge */
export const ANNOTATION_RIGHT_PAD = 8;

/** INPUT grupės etiketės Y – vertikaliai centre Prompt+Kontekstas zonoje */
export function getInputLabelY(): number {
  return (NODE_Y[1] + NODE_Y[2] + BOX_H) / 2 + 4;
}

/** LLM↔Tools etiketės Y – centre tarpe tarp LLM ir Tools */
export function getLlmToolsLabelY(): number {
  return (NODE_Y[3] + BOX_H + NODE_Y[4]) / 2 + 4;
}

/** L-forma Prompt → LLM (context mode): dešinėn, apeina Kontekstas bloką */
export function getPromptToLlmPath(): string {
  const startX = BOX_X + BOX_W;
  const startY = NODE_Y[1] + BOX_H / 2;
  const entryY = NODE_Y[3] - ARROW_MARKER_LEN;
  const endY = NODE_Y[3];
  return `M ${startX} ${startY} H ${ROUTE_X_RIGHT} V ${entryY} H ${CX} V ${endY}`;
}

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
  {
    id: 'goal',
    label: '1. Vartotojo tikslas',
    sub: 'ko siekiame',
    mode: 'both',
  },
  {
    id: 'prompt',
    label: '2. Prompt',
    sub: 'aiški instrukcija modeliui',
    mode: 'both',
  },
  {
    id: 'context',
    label: '3. Kontekstas',
    sub: 'dokumentai, CRM, taisyklės',
    mode: 'context',
    badgeContext: '+ kontekstas',
  },
  { id: 'llm', label: '4. LLM', sub: 'planuoja ir generuoja', mode: 'both' },
  {
    id: 'tools',
    label: '5. Įrankiai / Duomenys',
    sub: 'paieška, DB, API',
    mode: 'context',
    badgeTools: '+ įrankiai',
  },
  {
    id: 'output',
    label: '6. Output ✓',
    sub: 'paruoštas rezultatas',
    mode: 'both',
  },
];

const PIPELINE_NODES_EN: readonly PipelineNode[] = [
  { id: 'goal', label: '1. User goal', sub: 'what we want', mode: 'both' },
  {
    id: 'prompt',
    label: '2. Prompt',
    sub: 'clear instruction to model',
    mode: 'both',
  },
  {
    id: 'context',
    label: '3. Context',
    sub: 'documents, CRM, rules',
    mode: 'context',
    badgeContext: '+ extra context',
  },
  { id: 'llm', label: '4. LLM', sub: 'plans and generates', mode: 'both' },
  {
    id: 'tools',
    label: '5. Tools / Data',
    sub: 'search, DB, API',
    mode: 'context',
    badgeTools: '+ tools',
  },
  { id: 'output', label: '6. Output ✓', sub: 'ready result', mode: 'both' },
];

/** Locale-aware pipeline nodes (diagram labels, badges). */
export function getPipelineNodes(locale: Locale): readonly PipelineNode[] {
  return locale === 'en' ? PIPELINE_NODES_EN : PIPELINE_NODES_LT;
}

/** @deprecated Use getPipelineNodes(locale) for locale-aware labels. */
export const PIPELINE_NODES = PIPELINE_NODES_LT;

/* ═══ Colors (B+1: token emerald – no pastel wash) ═══ */
export const COLORS = {
  brand: DIAGRAM_TOKENS.colors.brand,
  brandStart: DIAGRAM_TOKENS.colors.brandTop,
  brandDarker: DIAGRAM_TOKENS.colors.brandDark,
  emerald: DIAGRAM_TONE_COLORS.emerald.bottom,
  /** Gradient top – must stay AA with white (≥4.5); tone.top #2f9f88 is too light */
  emeraldLight: '#117a72',
  emeraldDarker: DIAGRAM_TONE_COLORS.emerald.stroke,
  /** Badge pill fill – light mint, dark text */
  badgePillBg: '#ecfdf5',
  badgePillText: DIAGRAM_TOKENS.colors.brandDark,
  neutral: DIAGRAM_TOKENS.colors.flow,
  neutralLight: '#94a3b8',
  border: DIAGRAM_TOKENS.colors.border,
  bgStart: DIAGRAM_TOKENS.colors.bgStart,
  bgEnd: DIAGRAM_TOKENS.colors.bgEnd,
  textDark: DIAGRAM_TOKENS.colors.brandDark,
  textMuted: DIAGRAM_TOKENS.colors.flow,
  textWhite: DIAGRAM_TOKENS.colors.whiteText,
  arrow: DIAGRAM_TOKENS.colors.flow,
  arrowContext: DIAGRAM_TOKENS.colors.emerald,
  groupStroke: 'rgba(15,118,110,0.55)',
} as const;

/* ═══ Interactive mode ═══ */
export type PipelineActiveMode = 'prompt' | 'context';

const MODE_LABELS_LT: Record<PipelineActiveMode, string> = {
  prompt: 'Promptų inžinerija',
  context: 'Konteksto inžinerija',
};

const MODE_LABELS_EN: Record<PipelineActiveMode, string> = {
  prompt: 'Prompt engineering',
  context: 'Context engineering',
};

export const MODE_LABELS = MODE_LABELS_LT;

/** Locale-aware mode names (toggle buttons, aria). */
export function getModeLabels(
  locale: Locale
): Record<PipelineActiveMode, string> {
  return locale === 'en' ? MODE_LABELS_EN : MODE_LABELS_LT;
}

const MODE_CONSEQUENCE_LT: Record<PipelineActiveMode, string> = {
  prompt:
    'Promptų inžinerija: promptas eina tiesiai į modelį. Kontekstas ir įrankiai nedalyvauja.',
  context:
    '✓ Promptas ir kontekstas sudaro įvestį, o LLM su įrankiais dirba iteratyviai.',
};

const MODE_CONSEQUENCE_EN: Record<PipelineActiveMode, string> = {
  prompt:
    'Prompt engineering: the prompt goes straight to the model. Context and tools are not used.',
  context:
    '✓ Prompt and context form the input; the LLM works iteratively with tools.',
};

export const MODE_CONSEQUENCE = MODE_CONSEQUENCE_LT;

/** Locale-aware consequence line text. */
export function getModeConsequence(
  locale: Locale
): Record<PipelineActiveMode, string> {
  return locale === 'en' ? MODE_CONSEQUENCE_EN : MODE_CONSEQUENCE_LT;
}

/** UI strings for diagram (toggle, aria, SVG annotations, consequence header). */
export interface ContextPipelineUiLabels {
  nowLabel: string;
  compareLabel: string;
  modeLabel: string;
  ariaGroup: string;
  /** Single-line fallback / aria */
  inputPromptContext: string;
  /** Two-line SVG annotation (fits annotation lane) */
  inputPromptContextLines: readonly [string, string];
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
  inputPromptContext: 'Įvestis: promptas + kontekstas',
  inputPromptContextLines: ['Įvestis:', 'promptas + kontekstas'],
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
  inputPromptContextLines: ['INPUT:', 'Prompt + Context'],
  llmToolsLabel: 'LLM ↔ Tools',
  stepDetailAria: 'Step detail',
  keyRuleLabel: 'Key rule',
  noteLabel: 'Note',
  ariaStepsPrompt: '4 steps (Goal → Prompt → LLM → Output)',
  ariaStepsContext: '6 steps (Prompt + Context + Tools)',
};

/** Approx SVG text width for layout guards (bold sans ~0.55em). */
export function approxLabelWidthPx(
  text: string,
  fontSize: number,
  charFactor = 0.55
): number {
  return Math.ceil(text.length * fontSize * charFactor);
}

export function getAnnotationRightRoom(): number {
  return VB_WIDTH - ANNOTATION_LANE_X;
}

export function getDiagramUiLabels(locale: Locale): ContextPipelineUiLabels {
  return locale === 'en' ? UI_LABELS_EN : UI_LABELS_LT;
}

/** VB_HEIGHT sutrumpintas – legenda perkelta į HTML (consequence line) */
export const VB_HEIGHT_INTERACTIVE = NODE_Y[5] + BOX_H + 10;
