/**
 * Schema 3 layout – vienas geometrijos SOT.
 * Produkto lygis: visi blokai centre, rodyklės tiesios, vienodi dydžiai.
 * LLM.centerX = Tools.centerX = Paieška.centerX = DB.centerX
 */
export type Anchor = 'top' | 'right' | 'bottom' | 'left';

export type LayerId = 'control' | 'execution' | 'data';

export interface Schema3Node {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  layer: LayerId;
}

export interface Schema3Edge {
  from: string;
  to: string;
  fromAnchor: Anchor;
  toAnchor: Anchor;
  /** Pasirinktinis įrašymas į atmintį – punktyrinė rodyklė (suvienyta su Schema 4) */
  dashed?: boolean;
}

const PAD = 10;
export const VIEWBOX = '0 0 540 400';
export const INNER_W = 520;
export const INNER_H = 380;
export const ARROW_MARKER_LEN = 5;

/* Blokai: LLM platesnis (centras), kiti vienodi */
const BOX_W = 100;
const LLM_W = 120;
const BOX_H = 36;
const GAP_H = 28;
const GAP_V = 46;
const CENTER_X = Math.round(INNER_W / 2);
const ROW_Y = 52;

/* Horizontalė: Įvestis – LLM – Išvestis, vienodas tarpas GAP_H, LLM centre */
const MODEL_X = Math.round(CENTER_X - LLM_W / 2);
const INPUT_X = Math.round(MODEL_X - BOX_W - GAP_H);
const OUTPUT_X = Math.round(MODEL_X + LLM_W + GAP_H);

/* Vertikalė: visi centre, GAP_V ≥ 44, daug oro apačioje */
const TOOL_USE_Y = ROW_Y + BOX_H + GAP_V;
const RETR_Y = TOOL_USE_Y + BOX_H + GAP_V;
const DB_Y = RETR_Y + BOX_H + GAP_V;

/* Visi vertikalūs blokai vienodo pločio, centre */
const VERT_X = Math.round(CENTER_X - BOX_W / 2);

export const SCHEMA3_NODES: Schema3Node[] = [
  { id: 'input', x: INPUT_X, y: ROW_Y, w: BOX_W, h: BOX_H, layer: 'control' },
  { id: 'model', x: MODEL_X, y: ROW_Y, w: LLM_W, h: BOX_H, layer: 'control' },
  { id: 'output', x: OUTPUT_X, y: ROW_Y, w: BOX_W, h: BOX_H, layer: 'control' },
  { id: 'toolUse', x: VERT_X, y: TOOL_USE_Y, w: BOX_W, h: BOX_H, layer: 'execution' },
  { id: 'retrieval', x: VERT_X, y: RETR_Y, w: BOX_W, h: BOX_H, layer: 'execution' },
  { id: 'storage', x: VERT_X, y: DB_Y, w: BOX_W, h: BOX_H, layer: 'data' },
];

export const SCHEMA3_EDGES: Schema3Edge[] = [
  { from: 'input', to: 'model', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'model', to: 'output', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'model', to: 'toolUse', fromAnchor: 'bottom', toAnchor: 'top' },
  { from: 'toolUse', to: 'model', fromAnchor: 'top', toAnchor: 'bottom' },
  { from: 'toolUse', to: 'retrieval', fromAnchor: 'bottom', toAnchor: 'top' },
  { from: 'retrieval', to: 'toolUse', fromAnchor: 'top', toAnchor: 'bottom' },
  { from: 'retrieval', to: 'storage', fromAnchor: 'bottom', toAnchor: 'top' },
  { from: 'storage', to: 'retrieval', fromAnchor: 'top', toAnchor: 'bottom' },
  { from: 'model', to: 'storage', fromAnchor: 'bottom', toAnchor: 'top', dashed: true },
];

const nodeMap = new Map(SCHEMA3_NODES.map((n) => [n.id, n]));

export function getAnchorPoint(node: Schema3Node, anchor: Anchor): { x: number; y: number } {
  const cx = Math.round(node.x + node.w / 2);
  const cy = Math.round(node.y + node.h / 2);
  switch (anchor) {
    case 'top': return { x: cx, y: node.y };
    case 'right': return { x: node.x + node.w, y: cy };
    case 'bottom': return { x: cx, y: node.y + node.h };
    case 'left': return { x: node.x, y: cy };
    default: return { x: cx, y: cy };
  }
}

export function getLineEndPoint(node: Schema3Node, anchor: Anchor, offset: number = ARROW_MARKER_LEN): { x: number; y: number } {
  const p = getAnchorPoint(node, anchor);
  switch (anchor) {
    case 'top': return { x: p.x, y: Math.round(p.y - offset) };
    case 'right': return { x: Math.round(p.x - offset), y: p.y };
    case 'bottom': return { x: p.x, y: Math.round(p.y + offset) };
    case 'left': return { x: Math.round(p.x + offset), y: p.y };
    default: return p;
  }
}

export function getNode(id: string): Schema3Node | undefined {
  return nodeMap.get(id);
}

export const TITLE_Y = 24;
export const PAD_TRANSFORM = PAD;

export const LAYER_BOUNDS: { y: number; h: number }[] = [
  { y: ROW_Y, h: BOX_H },
  { y: TOOL_USE_Y, h: RETR_Y + BOX_H - TOOL_USE_Y },
  { y: DB_Y, h: BOX_H },
];
