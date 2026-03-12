/**
 * Schema 4 layout – vienas geometrijos SOT.
 * Logika pagal skaidrės body (modules.json): pagrindinis srautas; Įrankiai; atminties SKAITYMAS
 * (saugykla → informacijos gavimas → kontekstas Į modelį); pasirinktinis ĮRAŠYMAS (modelis → saugykla, punktyrinė).
 */

export type Anchor = 'top' | 'right' | 'bottom' | 'left';

export interface Schema4Node {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Schema4Edge {
  from: string;
  to: string;
  fromAnchor: Anchor;
  toAnchor: Anchor;
  label?: string;
  /** Pasirinktinis įrašymas – punktyrinė rodyklė */
  dashed?: boolean;
}

const PAD = 10;
export const VIEWBOX = '0 0 540 280';
export const INNER_W = 520;
export const INNER_H = 260;
export const ARROW_MARKER_LEN = 6;
export const MARKER_WIDTH = 10;
export const LINE_END_OFFSET = MARKER_WIDTH - ARROW_MARKER_LEN;

/**
 * Nodes. Atminties sluoksnis: Saugykla (apačioje), Informacijos gavimas (virš jos) – skaito iš saugyklos,
 * tiekia kontekstą Į modelį. Nėra „Atmintis“ tarp modelio ir retrieval – kontekstas eina retrieval → model.
 */
export const SCHEMA4_NODES: Schema4Node[] = [
  { id: 'input', x: 12, y: 48, w: 100, h: 48 },
  { id: 'model', x: 158, y: 48, w: 80, h: 48 },
  { id: 'output', x: 284, y: 48, w: 100, h: 48 },
  { id: 'generation', x: 158, y: 118, w: 80, h: 36 },
  { id: 'retrieval', x: 40, y: 132, w: 100, h: 32 },
  { id: 'storage', x: 40, y: 178, w: 100, h: 28 },
];

/**
 * Edges pagal skaidrės logiką:
 * - Pagrindinis: įvestis → modelis → išvestis
 * - Įrankiai: modelis → Generavimas (etiketė „Įrankiai“)
 * - Skaito: saugykla → informacijos gavimas
 * - Kontekstas į modelį: informacijos gavimas → modelis (modelis naudoja atmintį prieš generavimą)
 * - Pasirinktinis įrašymas: modelis ⇢ saugykla (dashed)
 */
export const SCHEMA4_EDGES: Schema4Edge[] = [
  { from: 'input', to: 'model', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'model', to: 'output', fromAnchor: 'right', toAnchor: 'left' },
  { from: 'model', to: 'generation', fromAnchor: 'bottom', toAnchor: 'top', label: 'Įrankiai' },
  { from: 'storage', to: 'retrieval', fromAnchor: 'top', toAnchor: 'bottom', label: undefined },
  { from: 'retrieval', to: 'model', fromAnchor: 'right', toAnchor: 'left', label: 'kontekstas' },
  { from: 'model', to: 'storage', fromAnchor: 'bottom', toAnchor: 'top', dashed: true },
];

const nodeMap = new Map(SCHEMA4_NODES.map((n) => [n.id, n]));

export function getAnchorPoint(node: Schema4Node, anchor: Anchor): { x: number; y: number } {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  switch (anchor) {
    case 'top': return { x: cx, y: node.y };
    case 'right': return { x: node.x + node.w, y: cy };
    case 'bottom': return { x: cx, y: node.y + node.h };
    case 'left': return { x: node.x, y: cy };
    default: return { x: cx, y: cy };
  }
}

export function getLineEndPoint(node: Schema4Node, anchor: Anchor, offset: number = LINE_END_OFFSET): { x: number; y: number } {
  const p = getAnchorPoint(node, anchor);
  switch (anchor) {
    case 'top': return { x: p.x, y: p.y - offset };
    case 'right': return { x: p.x + offset, y: p.y };
    case 'bottom': return { x: p.x, y: p.y + offset };
    case 'left': return { x: p.x - offset, y: p.y };
    default: return p;
  }
}

export function getNode(id: string): Schema4Node | undefined {
  return nodeMap.get(id);
}

export const TITLE_Y = 24;
export const PAD_TRANSFORM = PAD;
