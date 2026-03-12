/**
 * Autoregresinio LLM diagramos geometrijos SOT (SCHEME_AGENT §3.1, §3.10).
 * Viena tiesa: visos koordinatės ir rodyklės iš čia.
 * Blokų dydžiai padidinti skaitomumui (BOX_H 88, OUTPUT_W 220).
 * VIEWBOX 780×444: šrifto mastelis + oro virš „Šaltinis“ (SOURCE_LABEL_Y).
 */

export const VIEWBOX_W = 780;
export const VIEWBOX_H = 444;
/** Šaltinio eilutės Y – oro virš teksto (24 vnt tarpas nuo diagramos) */
export const SOURCE_LABEL_Y = VIEWBOX_H - 18;
export const VIEWBOX = `0 0 ${VIEWBOX_W} ${VIEWBOX_H}`;

export const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

// Tipografija: GOLDEN_STANDARD atitiktis, blokuose ne mažiau 14–16
export const SIZE_H1 = 28;
export const SIZE_H2 = 22;
export const SIZE_SCHEMA_LABEL = 16;
export const SIZE_BODY = 17;
export const SIZE_BODY_OUTPUT = 17;
export const SIZE_MICRO = 12;

// Blokų dydžiai – skaitomumui (planas §2.2)
export const BOX_H = 88;
export const GAP = 24;
/** Centruota 780 viewBox: turinio plotis 660, (780-660)/2 = 60 */
export const START_X = 60;
export const INPUT_W = 156;
export const LLM_W = 100;
export const OUTPUT_W = 220;
export const PASIRINKTA_W = 112;

const PAD_TOP = 12;
const LINE_HEIGHT = 22;
/** Išvesties bloke 4 eilutės turi tilpti į BOX_H 88 – mažesnis padding/lineHeight */
const PAD_TOP_OUTPUT = 8;
const LINE_HEIGHT_OUTPUT = 20;

export interface RowLayout {
  labelY: number;
  boxY: number;
  boxH: number;
  centerY: number;
  input: readonly [number, number, number, number];
  llm: readonly [number, number, number, number];
  output: readonly [number, number, number, number];
  pasirinkta: readonly [number, number, number, number];
}

const _rowN: RowLayout = {
  labelY: 88,
  boxY: 98,
  boxH: BOX_H,
  centerY: 98 + BOX_H / 2,
  input: [START_X, 98, INPUT_W, BOX_H],
  llm: [START_X + INPUT_W + GAP, 98, LLM_W, BOX_H],
  output: [START_X + INPUT_W + GAP + LLM_W + GAP, 98, OUTPUT_W, BOX_H],
  pasirinkta: [START_X + INPUT_W + GAP + LLM_W + GAP + OUTPUT_W + GAP, 98, PASIRINKTA_W, BOX_H],
};

const _rowN1: RowLayout = {
  labelY: 216,
  boxY: 226,
  boxH: BOX_H,
  centerY: 226 + BOX_H / 2,
  input: [START_X, 226, INPUT_W, BOX_H],
  llm: [START_X + INPUT_W + GAP, 226, LLM_W, BOX_H],
  output: [START_X + INPUT_W + GAP + LLM_W + GAP, 226, OUTPUT_W, BOX_H],
  pasirinkta: [START_X + INPUT_W + GAP + LLM_W + GAP + OUTPUT_W + GAP, 226, PASIRINKTA_W, BOX_H],
};

export const ROW_N: RowLayout = _rowN;
export const ROW_N1: RowLayout = _rowN1;

// Forward rodyklės: x1 = ištekančio bloko dešinė, x2 = įeinančio bloko kairė - ARROW_MARKER_LEN
export const ARROW_MARKER_LEN = 6;

const inputRight = START_X + INPUT_W;
const llmRight = START_X + INPUT_W + GAP + LLM_W;
const outputRight = START_X + INPUT_W + GAP + LLM_W + GAP + OUTPUT_W;
const llmLeft = START_X + INPUT_W + GAP;
const outputLeft = START_X + INPUT_W + GAP + LLM_W + GAP;
const pasirinktaLeft = START_X + INPUT_W + GAP + LLM_W + GAP + OUTPUT_W + GAP;

export const ARROWS_ROW_N: [number, number, number][] = [
  [inputRight, _rowN.centerY, llmLeft - ARROW_MARKER_LEN],
  [llmRight, _rowN.centerY, outputLeft - ARROW_MARKER_LEN],
  [outputRight, _rowN.centerY, pasirinktaLeft - ARROW_MARKER_LEN],
];

export const ARROWS_ROW_N1: [number, number, number][] = [
  [inputRight, _rowN1.centerY, llmLeft - ARROW_MARKER_LEN],
  [llmRight, _rowN1.centerY, outputLeft - ARROW_MARKER_LEN],
  [outputRight, _rowN1.centerY, pasirinktaLeft - ARROW_MARKER_LEN],
];

// Feedback path: Pasirinkta N (bottom center) → Įvestis N+1 (top center)
const pasirinktaNCenterX = _rowN.pasirinkta[0] + PASIRINKTA_W / 2;
const pasirinktaNBottom = _rowN.pasirinkta[1] + BOX_H;
const inputN1CenterX = _rowN1.input[0] + INPUT_W / 2;
const inputN1Top = _rowN1.input[1];
const feedbackMidY = (pasirinktaNBottom + inputN1Top) / 2;

export const FEEDBACK = {
  startCircle: { cx: pasirinktaNCenterX, cy: pasirinktaNBottom - 4 },
  pathEnd: { x: inputN1CenterX, y: inputN1Top },
  pathMidY: feedbackMidY,
  labelY: feedbackMidY - 8,
  labelX: VIEWBOX_W / 2,
  /** Path d: nuo Pasirinkta N apačios iki Įvestis N+1 viršaus */
  pathD: `M ${pasirinktaNCenterX} ${pasirinktaNBottom} L ${pasirinktaNCenterX} ${pasirinktaNBottom + 12} Q ${pasirinktaNCenterX} ${feedbackMidY} ${inputN1CenterX} ${inputN1Top - 6} L ${inputN1CenterX} ${inputN1Top}`,
  // Arrow polygon: tip at bottom (points down into block), base at inputN1Top
  arrowTip: { x: inputN1CenterX, y: inputN1Top },
  arrowBaseY: inputN1Top + 10,
  arrowHalfW: 6,
} as const;

/** Teksto centras bloke: x iš rect + w/2, y iš rect + padding + line offset */
export function getBlockTextCenter(
  rect: readonly [number, number, number, number],
  lineIndex: number
): { x: number; y: number } {
  const [rx, ry, rw] = [rect[0], rect[1], rect[2]];
  const y = ry + PAD_TOP + (lineIndex + 0.5) * LINE_HEIGHT;
  return { x: rx + rw / 2, y };
}

/** Išvesties blokui 4 eilutės: antraštė, „Tokenų tikimybės:“, procentai 1, procentai 2 (kad tilptų į BOX_H 88) */
export function getOutputTextPositions(rect: readonly [number, number, number, number]) {
  const [rx, ry, rw] = [rect[0], rect[1], rect[2]];
  const cx = rx + rw / 2;
  return {
    title: { x: cx, y: ry + PAD_TOP_OUTPUT + 8 },
    label: { x: cx, y: ry + PAD_TOP_OUTPUT + LINE_HEIGHT_OUTPUT + 8 },
    body: { x: cx, y: ry + PAD_TOP_OUTPUT + 2 * LINE_HEIGHT_OUTPUT + 8 },
    body2: { x: cx, y: ry + PAD_TOP_OUTPUT + 3 * LINE_HEIGHT_OUTPUT + 8 },
  };
}

/** Įvesties / Pasirinkta: 2 eilutės */
export function getTwoLineTextPositions(rect: readonly [number, number, number, number]) {
  const [rx, ry, rw] = [rect[0], rect[1], rect[2]];
  const cx = rx + rw / 2;
  return {
    line1: { x: cx, y: ry + PAD_TOP + LINE_HEIGHT / 2 + 4 },
    line2: { x: cx, y: ry + PAD_TOP + LINE_HEIGHT + LINE_HEIGHT / 2 + 4 },
  };
}

/** Įvesties blokui 3 eilutės: etiketė + 2 turinio (pvz. „Rytas tapo“ / „čempionais“ kad tilptų) */
export function getInputTextPositions(rect: readonly [number, number, number, number]) {
  const [rx, ry, rw] = [rect[0], rect[1], rect[2]];
  const cx = rx + rw / 2;
  return {
    label: { x: cx, y: ry + PAD_TOP + LINE_HEIGHT / 2 + 4 },
    content1: { x: cx, y: ry + PAD_TOP + LINE_HEIGHT + LINE_HEIGHT / 2 + 4 },
    content2: { x: cx, y: ry + PAD_TOP + 2 * LINE_HEIGHT + LINE_HEIGHT / 2 + 4 },
  };
}

/** LLM: viena eilutė centre */
export function getCenterTextPosition(rect: readonly [number, number, number, number]) {
  const [rx, ry, rw, rh] = [rect[0], rect[1], rect[2], rect[3]];
  return { x: rx + rw / 2, y: ry + rh / 2 + 6 };
}
