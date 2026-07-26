/**
 * M12 120.5 – Verslo multi-agent geometrijos SOT (W7 layout brother).
 * View: M12MultiAgentSchemaDiagram.tsx
 */
import { DIAGRAM_TOKENS } from './diagramTokens';
import { shortenToTip } from './diagramPathGeom';
import type { M12MultiAgentSchemaLabels } from './m12MultiAgentSchemaContent';

export type M12MultiAgentNodeId =
  | 'input'
  | 'router'
  | 'coordinator'
  | 'specialistA'
  | 'specialistB'
  | 'evaluator'
  | 'output';

export type M12MultiAgentTone =
  | 'slate'
  | 'violet'
  | 'teal'
  | 'amber'
  | 'amberSoft';

export interface M12MultiAgentBox {
  id: M12MultiAgentNodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: M12MultiAgentTone;
  label: [string, string];
}

export type M12Anchor = 'top' | 'right' | 'bottom' | 'left';

export interface M12MultiAgentEdge {
  id: string;
  from: M12MultiAgentNodeId;
  to: M12MultiAgentNodeId;
  kind: 'flow' | 'hitl' | 'feedback';
  fromAnchor: M12Anchor;
  toAnchor: M12Anchor;
  /** Curved / orthogonal path when anchors alone would diagonal-cross. */
  path?: string;
}

/** Full-map orphan dim (W7 brother; ≠ kill-map inactive 0.88). */
export const M12_ORPHAN_OPACITY = DIAGRAM_TOKENS.opacity.orphanMap;
export const M12_MAP_EDGE_OPACITY = 0.42;
export const M12_EDGE_PILL_OPACITY = 0.9;

export const M12_MULTI_AGENT_VIEWBOX = {
  desktop: { width: 960, height: 392 },
  compact: { width: 420, height: 640 },
} as const;

export const M12_MULTI_AGENT_TITLE_Y = {
  desktop: 28,
  compact: 40,
} as const;

export const M12_MULTI_AGENT_BOX_H = 60;
export const M12_MULTI_AGENT_STEP_COUNT = 6;

export const M12_MULTI_AGENT_STEP_NODE_IDS: M12MultiAgentNodeId[][] = [
  ['input'],
  ['router'],
  ['coordinator'],
  ['specialistA', 'specialistB'],
  ['evaluator'],
  ['output'],
];

export const M12_MULTI_AGENT_MARKER_LEN = DIAGRAM_TOKENS.arrow.processTipLen;

/** Edge ids whose verb pills stage in by shell step (0-based). */
export const M12_EDGE_LABEL_BY_STEP: string[][] = [
  ['input-router'],
  ['input-router', 'router-coordinator'],
  ['router-coordinator', 'coord-assign'],
  ['coord-assign', 'spec-handoff'],
  ['spec-handoff', 'evaluator-coordinator'],
  ['evaluator-output', 'evaluator-coordinator'],
];

export const M12_MULTI_AGENT_EDGES_DESKTOP: M12MultiAgentEdge[] = [
  {
    id: 'input-router',
    from: 'input',
    to: 'router',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'router-coordinator',
    from: 'router',
    to: 'coordinator',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'coordinator-specialistA',
    from: 'coordinator',
    to: 'specialistA',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'coordinator-specialistB',
    from: 'coordinator',
    to: 'specialistB',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'specialistA-evaluator',
    from: 'specialistA',
    to: 'evaluator',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'specialistB-evaluator',
    from: 'specialistB',
    to: 'evaluator',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'evaluator-output',
    from: 'evaluator',
    to: 'output',
    kind: 'hitl',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'evaluator-coordinator',
    from: 'evaluator',
    to: 'coordinator',
    kind: 'feedback',
    fromAnchor: 'bottom',
    toAnchor: 'bottom',
  },
];

export const M12_MULTI_AGENT_EDGES_COMPACT: M12MultiAgentEdge[] = [
  {
    id: 'input-router',
    from: 'input',
    to: 'router',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'router-coordinator',
    from: 'router',
    to: 'coordinator',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'coordinator-specialistA',
    from: 'coordinator',
    to: 'specialistA',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'coordinator-specialistB',
    from: 'coordinator',
    to: 'specialistB',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'specialistA-evaluator',
    from: 'specialistA',
    to: 'evaluator',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'specialistB-evaluator',
    from: 'specialistB',
    to: 'evaluator',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'evaluator-output',
    from: 'evaluator',
    to: 'output',
    kind: 'hitl',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'evaluator-coordinator',
    from: 'evaluator',
    to: 'coordinator',
    kind: 'feedback',
    fromAnchor: 'left',
    toAnchor: 'left',
  },
];

/** Desktop: spine centerY shared by Input/Router/Coord/Eval/Output. */
const DESKTOP_SPINE_CY = 168;
const DESKTOP_BOX_Y = DESKTOP_SPINE_CY - M12_MULTI_AGENT_BOX_H / 2;

export function getM12MultiAgentDesktopBoxes(
  labels: M12MultiAgentSchemaLabels
): M12MultiAgentBox[] {
  const h = M12_MULTI_AGENT_BOX_H;
  return [
    {
      id: 'input',
      x: 28,
      y: DESKTOP_BOX_Y,
      w: 118,
      h,
      tone: 'slate',
      label: labels.input,
    },
    {
      id: 'router',
      x: 168,
      y: DESKTOP_BOX_Y,
      w: 128,
      h,
      tone: 'slate',
      label: labels.router,
    },
    {
      id: 'coordinator',
      x: 318,
      y: DESKTOP_BOX_Y,
      w: 128,
      h,
      tone: 'violet',
      label: labels.coordinator,
    },
    {
      id: 'specialistA',
      x: 490,
      y: 72,
      w: 128,
      h,
      tone: 'teal',
      label: labels.specialistA,
    },
    {
      id: 'specialistB',
      x: 490,
      y: 204,
      w: 128,
      h,
      tone: 'teal',
      label: labels.specialistB,
    },
    {
      id: 'evaluator',
      x: 662,
      y: DESKTOP_BOX_Y,
      w: 122,
      h,
      tone: 'amber',
      label: labels.evaluator,
    },
    {
      id: 'output',
      x: 812,
      y: DESKTOP_BOX_Y,
      w: 128,
      h,
      tone: 'amberSoft',
      label: labels.output,
    },
  ];
}

export function getM12MultiAgentCompactBoxes(
  labels: M12MultiAgentSchemaLabels
): M12MultiAgentBox[] {
  const h = M12_MULTI_AGENT_BOX_H;
  return [
    {
      id: 'input',
      x: 110,
      y: 58,
      w: 200,
      h,
      tone: 'slate',
      label: labels.input,
    },
    {
      id: 'router',
      x: 110,
      y: 142,
      w: 200,
      h,
      tone: 'slate',
      label: labels.router,
    },
    {
      id: 'coordinator',
      x: 110,
      y: 226,
      w: 200,
      h,
      tone: 'violet',
      label: labels.coordinator,
    },
    {
      id: 'specialistA',
      x: 22,
      y: 330,
      w: 176,
      h,
      tone: 'teal',
      label: labels.specialistA,
    },
    {
      id: 'specialistB',
      x: 222,
      y: 330,
      w: 176,
      h,
      tone: 'teal',
      label: labels.specialistB,
    },
    {
      id: 'evaluator',
      x: 110,
      y: 434,
      w: 200,
      h,
      tone: 'amber',
      label: labels.evaluator,
    },
    {
      id: 'output',
      x: 110,
      y: 528,
      w: 200,
      h,
      tone: 'amberSoft',
      label: labels.output,
    },
  ];
}

export function getM12BoxMap(
  boxes: M12MultiAgentBox[]
): Record<M12MultiAgentNodeId, M12MultiAgentBox> {
  return boxes.reduce(
    (acc, box) => {
      acc[box.id] = box;
      return acc;
    },
    {} as Record<M12MultiAgentNodeId, M12MultiAgentBox>
  );
}

export function getM12AnchorPoint(
  box: M12MultiAgentBox,
  anchor: M12Anchor
): { x: number; y: number } {
  switch (anchor) {
    case 'top':
      return { x: box.x + box.w / 2, y: box.y };
    case 'right':
      return { x: box.x + box.w, y: box.y + box.h / 2 };
    case 'left':
      return { x: box.x, y: box.y + box.h / 2 };
    case 'bottom':
    default:
      return { x: box.x + box.w / 2, y: box.y + box.h };
  }
}

export function getM12LineEnd(
  from: { x: number; y: number },
  to: { x: number; y: number },
  markerLen = M12_MULTI_AGENT_MARKER_LEN
): { x: number; y: number } {
  return shortenToTip(from, to, markerLen);
}

export function getM12EdgePoints(
  edge: M12MultiAgentEdge,
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>
) {
  const fromBox = boxes[edge.from];
  const toBox = boxes[edge.to];
  const start = getM12AnchorPoint(fromBox, edge.fromAnchor);
  const endRaw = getM12AnchorPoint(toBox, edge.toAnchor);
  const end = getM12LineEnd(start, endRaw);
  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
}

export function isM12NodeFocused(
  nodeId: M12MultiAgentNodeId,
  step: number
): boolean {
  const ids = M12_MULTI_AGENT_STEP_NODE_IDS[step] ?? [];
  return ids.includes(nodeId);
}

export function getM12NodeOpacity(
  nodeId: M12MultiAgentNodeId,
  step: number,
  interactive: boolean
): number {
  if (!interactive) return 1;
  return isM12NodeFocused(nodeId, step) ? 1 : M12_ORPHAN_OPACITY;
}

/** Live path edges for emphasis (always painted; opacity differs). */
export function getM12LiveEdgeIds(step: number): Set<string> {
  const live = new Set<string>();
  if (step >= 0) live.add('input-router');
  if (step >= 1) live.add('router-coordinator');
  if (step >= 2) {
    live.add('coordinator-specialistA');
    live.add('coordinator-specialistB');
  }
  if (step >= 3) {
    live.add('specialistA-evaluator');
    live.add('specialistB-evaluator');
  }
  if (step >= 4) live.add('evaluator-coordinator');
  if (step >= 5) live.add('evaluator-output');
  return live;
}

export function getM12EdgeOpacity(edgeId: string, step: number): number {
  return getM12LiveEdgeIds(step).has(edgeId)
    ? DIAGRAM_TOKENS.opacity.active
    : M12_MAP_EDGE_OPACITY;
}

export function shouldShowM12EdgeLabel(
  labelKey: string,
  step: number
): boolean {
  const keys = M12_EDGE_LABEL_BY_STEP[step] ?? [];
  return keys.includes(labelKey);
}

export function estimateM12PillSize(label: string): { w: number; h: number } {
  const len = label.length;
  return {
    w: Math.max(48, Math.min(120, 8 + len * 6.2)),
    h: 18,
  };
}

export interface M12FanoutGeometry {
  trunkPath: string;
  busPath: string;
  dropA: string;
  dropB: string;
  assignPill: { x: number; y: number };
}

/** Orthogonal fan-out: Coord → bus → Spec A/B (desktop). */
export function getM12FanoutGeometry(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>,
  tipLen = M12_MULTI_AGENT_MARKER_LEN
): M12FanoutGeometry | null {
  const coord = boxes.coordinator;
  const a = boxes.specialistA;
  const b = boxes.specialistB;
  if (!coord || !a || !b) return null;

  const startX = coord.x + coord.w;
  const spineY = coord.y + coord.h / 2;
  /** Bus left of tip inset so horizontal drops have shaft length. */
  const tipX = a.x - tipLen;
  const busX = Math.min(tipX - 10, (startX + a.x) / 2);
  const aCy = a.y + a.h / 2;
  const bCy = b.y + b.h / 2;

  return {
    trunkPath: `M ${startX} ${spineY} L ${busX} ${spineY}`,
    busPath: `M ${busX} ${aCy} L ${busX} ${bCy}`,
    dropA: `M ${busX} ${aCy} L ${tipX} ${aCy}`,
    dropB: `M ${busX} ${bCy} L ${b.x - tipLen} ${bCy}`,
    assignPill: {
      x: (startX + busX) / 2,
      y: spineY - 16,
    },
  };
}

export interface M12FaninGeometry {
  riseA: string;
  riseB: string;
  busPath: string;
  trunkPath: string;
  handoffPill: { x: number; y: number };
}

/** Orthogonal fan-in: Spec A/B → collect → Evaluator (desktop). */
export function getM12FaninGeometry(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>,
  tipLen = M12_MULTI_AGENT_MARKER_LEN
): M12FaninGeometry | null {
  const a = boxes.specialistA;
  const b = boxes.specialistB;
  const evalBox = boxes.evaluator;
  if (!a || !b || !evalBox) return null;

  const collectX = a.x + a.w + 18;
  const aCy = a.y + a.h / 2;
  const bCy = b.y + b.h / 2;
  const evalCy = evalBox.y + evalBox.h / 2;
  const evalLeft = evalBox.x - tipLen;

  return {
    riseA: `M ${a.x + a.w} ${aCy} L ${collectX} ${aCy}`,
    riseB: `M ${b.x + b.w} ${bCy} L ${collectX} ${bCy}`,
    busPath: `M ${collectX} ${aCy} L ${collectX} ${bCy}`,
    trunkPath: `M ${collectX} ${evalCy} L ${evalLeft} ${evalCy}`,
    handoffPill: {
      x: (collectX + evalLeft) / 2,
      y: evalCy - 16,
    },
  };
}

export interface M12CompactFanGeometry {
  downLeft: string;
  downRight: string;
  upLeft: string;
  upRight: string;
  assignPill: { x: number; y: number };
  handoffPill: { x: number; y: number };
}

/** Compact: orthogonal elbows Coord↔specs↔Eval (no hypotenuse). */
export function getM12CompactFanGeometry(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>,
  tipLen = M12_MULTI_AGENT_MARKER_LEN
): M12CompactFanGeometry | null {
  const coord = boxes.coordinator;
  const a = boxes.specialistA;
  const b = boxes.specialistB;
  const evalBox = boxes.evaluator;
  if (!coord || !a || !b || !evalBox) return null;

  const coordBottom = coord.y + coord.h;
  const midY = (coordBottom + a.y) / 2;
  const aCx = a.x + a.w / 2;
  const bCx = b.x + b.w / 2;
  const spineX = coord.x + coord.w / 2;
  const evalTop = evalBox.y - tipLen;
  const aBottom = a.y + a.h;
  const bBottom = b.y + b.h;
  const midY2 = (Math.max(aBottom, bBottom) + evalBox.y) / 2;

  return {
    downLeft: `M ${spineX} ${coordBottom} L ${spineX} ${midY} L ${aCx} ${midY} L ${aCx} ${a.y - tipLen}`,
    downRight: `M ${spineX} ${coordBottom} L ${spineX} ${midY} L ${bCx} ${midY} L ${bCx} ${b.y - tipLen}`,
    upLeft: `M ${aCx} ${aBottom} L ${aCx} ${midY2} L ${spineX} ${midY2} L ${spineX} ${evalTop}`,
    upRight: `M ${bCx} ${bBottom} L ${bCx} ${midY2} L ${spineX} ${midY2} L ${spineX} ${evalTop}`,
    assignPill: { x: spineX + 36, y: midY - 4 },
    handoffPill: { x: spineX + 36, y: midY2 - 4 },
  };
}

export function getM12FeedbackPathDesktop(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>
): string {
  const evalBox = boxes.evaluator;
  const coord = boxes.coordinator;
  const startX = evalBox.x + evalBox.w / 2;
  const startY = evalBox.y + evalBox.h;
  const endX = coord.x + coord.w / 2;
  const endY = coord.y + coord.h;
  const troughY = Math.max(
    boxes.specialistB.y + boxes.specialistB.h + 36,
    startY + 48
  );
  return `M ${startX} ${startY} L ${startX} ${troughY} L ${endX} ${troughY} L ${endX} ${endY + M12_MULTI_AGENT_MARKER_LEN}`;
}

export function getM12FeedbackPathCompact(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>
): string {
  const evalBox = boxes.evaluator;
  const coord = boxes.coordinator;
  const startY = evalBox.y + evalBox.h / 2;
  const endY = coord.y + coord.h / 2;
  const gutterX = 36;
  return `M ${evalBox.x} ${startY} L ${gutterX} ${startY} L ${gutterX} ${endY} L ${coord.x - M12_MULTI_AGENT_MARKER_LEN} ${endY}`;
}

export function getM12FeedbackLabelPos(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>,
  compact: boolean
): { x: number; y: number } {
  if (compact) {
    return { x: 48, y: (boxes.coordinator.y + boxes.evaluator.y) / 2 + 20 };
  }
  const troughY = boxes.specialistB.y + boxes.specialistB.h + 36;
  return {
    x: (boxes.coordinator.x + boxes.evaluator.x + boxes.evaluator.w) / 2,
    y: troughY + 14,
  };
}

export interface M12PillRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function m12PillAabb(
  cx: number,
  cy: number,
  label: string
): M12PillRect {
  const { w, h } = estimateM12PillSize(label);
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

export function m12PillsOverlap(a: M12PillRect, b: M12PillRect): boolean {
  return !(
    a.x + a.w <= b.x ||
    b.x + b.w <= a.x ||
    a.y + a.h <= b.y ||
    b.y + b.h <= a.y
  );
}

export function m12DesktopBoxesFitViewBox(boxes: M12MultiAgentBox[]): boolean {
  const { width, height } = M12_MULTI_AGENT_VIEWBOX.desktop;
  return boxes.every(
    (b) => b.x >= 0 && b.y >= 0 && b.x + b.w <= width && b.y + b.h <= height
  );
}

export function m12SpineCenterYAligned(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>
): boolean {
  const cy = (id: M12MultiAgentNodeId) => boxes[id].y + boxes[id].h / 2;
  const spine = cy('input');
  return (
    Math.abs(cy('router') - spine) < 0.5 &&
    Math.abs(cy('coordinator') - spine) < 0.5 &&
    Math.abs(cy('evaluator') - spine) < 0.5 &&
    Math.abs(cy('output') - spine) < 0.5
  );
}
