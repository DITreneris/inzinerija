/**
 * M10 10.482 – Agentų orkestravimo geometrijos SOT (model).
 * View: M10OrchestratorDiagram.tsx
 * Retry: orchestratorRetryPath.ts · W7 v06 error/retry hierarchy
 */

import type { M10OrchestratorLabels } from './m10OrchestratorContent';
import {
  ORCHESTRATOR_ARROW_TIP_LEN,
  getOrchestratorRetryPathCompact,
  getOrchestratorRetryPathDesktop,
  type OrchestratorBoxLike,
} from './orchestratorRetryPath';

export type M10OrchestratorNodeId =
  | 'input'
  | 'router'
  | 'orchestrator'
  | 'state'
  | 'research'
  | 'summarize'
  | 'validate'
  | 'tools'
  | 'evaluator'
  | 'output';

export type M10OrchestratorTone =
  | 'slate'
  | 'brand'
  | 'violet'
  | 'teal'
  | 'amber'
  | 'rose';

/** Role-band fill semantics (Schema3 DNA, no layer frames). */
export const M10_ORCHESTRATOR_ROLE_BAND = {
  hub: 'violet',
  specialist: 'teal',
  gate: 'amber',
  infra: 'slate',
  memory: 'brand',
} as const;

export interface M10OrchestratorBox {
  id: M10OrchestratorNodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: M10OrchestratorTone;
  label: [string, string];
}

export type M10OrchestratorEdgeKind = 'flow' | 'retry' | 'state' | 'tools';

export interface M10OrchestratorEdge {
  id: string;
  from: M10OrchestratorNodeId;
  to: M10OrchestratorNodeId;
  kind: M10OrchestratorEdgeKind;
  fromAnchor?: 'top' | 'right' | 'bottom' | 'left';
  toAnchor?: 'top' | 'right' | 'bottom' | 'left';
}

export const M10_ORCHESTRATOR_VIEWBOX = {
  desktop: { width: 760, height: 448 },
  compact: { width: 420, height: 700 },
} as const;

/** Local data/resource stroke (thinner than flow). */
export const M10_ORCHESTRATOR_STROKE_DATA = 2;

/** Agents lane header height (Title Case band inside soft lane). */
export const M10_ORCHESTRATOR_AGENTS_HEADER_H = 28;

/** Soft-rose fan-in on error step (thinner than flow). */
export const M10_ORCHESTRATOR_FANIN_ERROR_STROKE = 2.5;

/** Local tip ≥10; do not change global DIAGRAM_TOKENS.arrow.markerLen. */
export const M10_ORCHESTRATOR_ARROW_TIP = ORCHESTRATOR_ARROW_TIP_LEN;

/** @deprecated use M10_ORCHESTRATOR_ARROW_TIP */
export const M10_ORCHESTRATOR_MARKER_LEN = M10_ORCHESTRATOR_ARROW_TIP;

export const M10_ORCHESTRATOR_STEP_COUNT = 6;

export const M10_ORCHESTRATOR_FANOUT_EDGE_IDS = [
  'orch-research',
  'orch-summarize',
  'orch-validate',
] as const;

/** Desktop fan-in uses validate-eval id as trunk label/paint SOT. */
export const M10_ORCHESTRATOR_FANIN_EDGE_ID = 'validate-eval';

/** Macro step → highlighted node ids */
export const M10_ORCHESTRATOR_STEP_NODE_IDS: M10OrchestratorNodeId[][] = [
  ['input'],
  ['router'],
  ['orchestrator', 'state'],
  ['research', 'summarize', 'tools'],
  ['validate', 'evaluator'],
  ['research', 'validate', 'evaluator', 'output'],
];

/**
 * Edge ids whose verb label is live for a given shell step (0–5).
 * Step 2: single assign verb on trunk (orch-summarize id).
 */
export const M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP: readonly (readonly string[])[] =
  [
    ['input-router'],
    ['input-router', 'router-orch'],
    ['router-orch', 'state-orch', 'orch-summarize'],
    ['orch-research', 'orch-summarize', 'research-tools'],
    ['validate-eval', 'eval-retry'],
    ['research-tools', 'validate-eval', 'eval-output', 'eval-retry'],
  ];

/** Edges painted per step (hidden, not dim). Fan-out = trunk/bus/drops. */
export const M10_ORCHESTRATOR_PAINT_BY_STEP: readonly (readonly string[])[] = [
  ['input-router'],
  ['input-router', 'router-orch'],
  [
    'input-router',
    'router-orch',
    'state-orch',
    'orch-research',
    'orch-summarize',
    'orch-validate',
  ],
  [
    'input-router',
    'router-orch',
    'state-orch',
    'orch-research',
    'orch-summarize',
    'orch-validate',
    'research-tools',
    'validate-eval',
    'eval-output',
  ],
  [
    // Step 4 (Klaida ir KARTOTI): no eval-output — success path culled
    'input-router',
    'router-orch',
    'state-orch',
    'orch-research',
    'orch-summarize',
    'orch-validate',
    'research-tools',
    'validate-eval',
  ],
  [
    'input-router',
    'router-orch',
    'state-orch',
    'orch-research',
    'orch-summarize',
    'orch-validate',
    'research-tools',
    'validate-eval',
    'eval-output',
  ],
];

export function shouldShowEdgeLabel(
  stepIndex: number,
  edgeId: string
): boolean {
  const set = M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP[stepIndex];
  return Boolean(set?.includes(edgeId));
}

export function shouldPaintEdge(stepIndex: number, edgeId: string): boolean {
  if (edgeId === 'eval-retry') return shouldShowRetryLabel(stepIndex);
  const set = M10_ORCHESTRATOR_PAINT_BY_STEP[stepIndex];
  return Boolean(set?.includes(edgeId));
}

export function shouldPaintFanout(stepIndex: number): boolean {
  return M10_ORCHESTRATOR_FANOUT_EDGE_IDS.some((id) =>
    shouldPaintEdge(stepIndex, id)
  );
}

export function shouldPaintFanin(stepIndex: number): boolean {
  return shouldPaintEdge(stepIndex, M10_ORCHESTRATOR_FANIN_EDGE_ID);
}

/** Retry label / path visible on error + fix steps (4–5). */
export function shouldShowRetryLabel(stepIndex: number): boolean {
  return stepIndex === 4 || stepIndex === 5;
}

export const M10_ORCHESTRATOR_EDGES: M10OrchestratorEdge[] = [
  {
    id: 'input-router',
    from: 'input',
    to: 'router',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'router-orch',
    from: 'router',
    to: 'orchestrator',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'state-orch',
    from: 'state',
    to: 'orchestrator',
    kind: 'state',
    fromAnchor: 'left',
    toAnchor: 'right',
  },
  {
    id: 'orch-research',
    from: 'orchestrator',
    to: 'research',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'orch-summarize',
    from: 'orchestrator',
    to: 'summarize',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'orch-validate',
    from: 'orchestrator',
    to: 'validate',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'research-tools',
    from: 'research',
    to: 'tools',
    kind: 'tools',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'validate-eval',
    from: 'validate',
    to: 'evaluator',
    kind: 'flow',
    fromAnchor: 'bottom',
    toAnchor: 'top',
  },
  {
    id: 'eval-output',
    from: 'evaluator',
    to: 'output',
    kind: 'flow',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  {
    id: 'eval-retry',
    from: 'evaluator',
    to: 'orchestrator',
    kind: 'retry',
    fromAnchor: 'left',
    toAnchor: 'left',
  },
];

/**
 * Node is "live" (full opacity) if highlighted this step or participates
 * in a painted edge. Otherwise dim as orphan (early-step cull).
 */
export function isOrchestratorNodeLive(
  stepIndex: number,
  nodeId: M10OrchestratorNodeId
): boolean {
  const active = M10_ORCHESTRATOR_STEP_NODE_IDS[stepIndex];
  if (active?.includes(nodeId)) return true;
  return M10_ORCHESTRATOR_EDGES.some(
    (edge) =>
      shouldPaintEdge(stepIndex, edge.id) &&
      (edge.from === nodeId || edge.to === nodeId)
  );
}

export function getM10OrchestratorDesktopBoxes(
  labels: M10OrchestratorLabels
): M10OrchestratorBox[] {
  return [
    {
      id: 'input',
      x: 28,
      y: 40,
      w: 150,
      h: 52,
      tone: 'slate',
      label: labels.nodes.input,
    },
    {
      id: 'router',
      x: 232,
      y: 40,
      w: 168,
      h: 52,
      tone: 'slate',
      label: labels.nodes.router,
    },
    {
      id: 'orchestrator',
      x: 200,
      y: 120,
      w: 230,
      h: 64,
      tone: 'violet',
      label: labels.nodes.orchestrator,
    },
    {
      id: 'state',
      // centerY === orch centerY (120+32)
      x: 548,
      y: 118,
      w: 156,
      h: 68,
      tone: 'brand',
      label: labels.nodes.state,
    },
    {
      id: 'research',
      x: 40,
      y: 236,
      w: 130,
      h: 58,
      tone: 'teal',
      label: labels.nodes.research,
    },
    {
      id: 'summarize',
      x: 200,
      y: 236,
      w: 130,
      h: 58,
      tone: 'teal',
      label: labels.nodes.summarize,
    },
    {
      id: 'validate',
      x: 360,
      y: 236,
      w: 130,
      h: 58,
      tone: 'amber',
      label: labels.nodes.validate,
    },
    {
      id: 'tools',
      x: 40,
      y: 352,
      w: 130,
      h: 48,
      tone: 'slate',
      label: labels.nodes.tools,
    },
    {
      id: 'evaluator',
      x: 312,
      y: 352,
      w: 196,
      h: 58,
      tone: 'amber',
      label: labels.nodes.evaluator,
    },
    {
      // gap after eval ≥24: 312+196+24 = 532
      id: 'output',
      x: 532,
      y: 352,
      w: 150,
      h: 58,
      tone: 'slate',
      label: labels.nodes.output,
    },
  ];
}

export function getM10OrchestratorCompactBoxes(
  labels: M10OrchestratorLabels
): M10OrchestratorBox[] {
  const w = 280;
  const x = 70;
  return [
    {
      id: 'input',
      x,
      y: 36,
      w,
      h: 52,
      tone: 'slate',
      label: labels.nodes.input,
    },
    {
      id: 'router',
      x,
      y: 108,
      w,
      h: 52,
      tone: 'slate',
      label: labels.nodes.router,
    },
    {
      id: 'orchestrator',
      x,
      y: 180,
      w,
      h: 56,
      tone: 'violet',
      label: labels.nodes.orchestrator,
    },
    {
      id: 'state',
      x,
      y: 252,
      w,
      h: 52,
      tone: 'brand',
      label: labels.nodes.state,
    },
    {
      id: 'research',
      x: 40,
      y: 340,
      w: 150,
      h: 52,
      tone: 'teal',
      label: labels.nodes.research,
    },
    {
      id: 'summarize',
      x: 220,
      y: 340,
      w: 150,
      h: 52,
      tone: 'teal',
      label: labels.nodes.summarize,
    },
    {
      id: 'tools',
      x: 40,
      y: 412,
      w: 150,
      h: 48,
      tone: 'slate',
      label: labels.nodes.tools,
    },
    {
      id: 'validate',
      x: 220,
      y: 412,
      w: 150,
      h: 48,
      tone: 'amber',
      label: labels.nodes.validate,
    },
    {
      id: 'evaluator',
      x,
      y: 490,
      w,
      h: 52,
      tone: 'amber',
      label: labels.nodes.evaluator,
    },
    {
      id: 'output',
      x,
      y: 562,
      w,
      h: 52,
      tone: 'slate',
      label: labels.nodes.output,
    },
  ];
}

export function getBoxMap(
  boxes: M10OrchestratorBox[]
): Record<M10OrchestratorNodeId, M10OrchestratorBox> {
  return boxes.reduce(
    (acc, box) => {
      acc[box.id] = box;
      return acc;
    },
    {} as Record<M10OrchestratorNodeId, M10OrchestratorBox>
  );
}

export function getAnchorPoint(
  box: M10OrchestratorBox,
  anchor: 'top' | 'right' | 'bottom' | 'left' = 'bottom'
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

/** Line end short of target edge so marker tip (refX=0) meets the box. */
export function getLineEndPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  tipLen = M10_ORCHESTRATOR_ARROW_TIP
): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x: to.x - ux * tipLen,
    y: to.y - uy * tipLen,
  };
}

export function estimateOrchestratorPillSize(label: string): {
  w: number;
  h: number;
} {
  const w = Math.max(52, Math.min(148, label.length * 6.6 + 16));
  return { w, h: 18 };
}

/**
 * Off-shaft annotation anchor (not midpoint-on-stroke).
 * Clearance = pillW/2+10 (vertical) or pillH/2+8 (horizontal).
 * research-tools: +4 px extra horizontal clear.
 */
export function getOrchestratorEdgeLabelAnchor(
  from: M10OrchestratorBox,
  to: M10OrchestratorBox,
  fromAnchor: 'top' | 'right' | 'bottom' | 'left' = 'bottom',
  toAnchor: 'top' | 'right' | 'bottom' | 'left' = 'top',
  viewBoxW: number = M10_ORCHESTRATOR_VIEWBOX.desktop.width,
  label = 'xxxxxxxx',
  edgeId?: string
): { x: number; y: number; midX: number; midY: number } {
  const a = getAnchorPoint(from, fromAnchor);
  const b = getAnchorPoint(to, toAnchor);
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const { w: pillW, h: pillH } = estimateOrchestratorPillSize(label);
  const horizontal =
    fromAnchor === 'left' ||
    fromAnchor === 'right' ||
    toAnchor === 'left' ||
    toAnchor === 'right';

  if (horizontal && Math.abs(a.y - b.y) < Math.abs(a.x - b.x)) {
    return { x: midX, y: midY - (pillH / 2 + 8), midX, midY };
  }

  const toolsBump = edgeId === 'research-tools' ? 4 : 0;
  const vClear = pillW / 2 + 10 + toolsBump;
  const rightX = midX + vClear;
  const leftX = midX - vClear;
  const x = rightX + pillW / 2 + 8 < viewBoxW ? rightX : leftX;
  return { x, y: midY, midX, midY };
}

/** Retry annotation center clear of left U shaft: leftX + pillW/2 + 12. */
export function getOrchestratorRetryLabelAnchor(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX: number,
  label: string
): { x: number; y: number } {
  const startY = from.y + from.h / 2;
  const endY = to.y + to.h / 2;
  const { w } = estimateOrchestratorPillSize(label);
  return {
    x: leftX + w / 2 + 12,
    y: (startY + endY) / 2,
  };
}

export interface DesktopFanoutGeometry {
  trunkX: number;
  busY: number;
  orchBottom: number;
  trunkPath: string;
  busPath: string;
  dropPaths: { id: M10OrchestratorNodeId; d: string }[];
  assignPill: { x: number; y: number };
  agentsLane: { x: number; y: number; w: number; h: number };
  agentsBand: { x: number; y: number };
}

export interface DesktopFaninGeometry {
  trunkX: number;
  busY: number;
  trunkPath: string;
  busPath: string;
  dropPaths: { id: M10OrchestratorNodeId; d: string }[];
  handoffPill: { x: number; y: number };
}

/** Orthogonal trunk → bus → drops for desktop fan-out. */
export function getDesktopFanoutGeometry(
  boxes: Record<M10OrchestratorNodeId, M10OrchestratorBox>,
  tipLen = M10_ORCHESTRATOR_ARROW_TIP
): DesktopFanoutGeometry | null {
  const orch = boxes.orchestrator;
  const research = boxes.research;
  const summarize = boxes.summarize;
  const validate = boxes.validate;
  if (!orch || !research || !summarize || !validate) return null;

  const trunkX = orch.x + orch.w / 2;
  const orchBottom = orch.y + orch.h;
  const headerH = M10_ORCHESTRATOR_AGENTS_HEADER_H;
  const agentsTop = research.y;
  const laneTop = agentsTop - headerH;
  // Bus above lane; assign pill ≥12 below orch and ≥10 above bus
  const assignPillY = orchBottom + 12;
  const busY = Math.max(assignPillY + 10, laneTop - 4);
  const leftCx = research.x + research.w / 2;
  const rightCx = validate.x + validate.w / 2;

  const trunkPath = `M ${trunkX} ${orchBottom} L ${trunkX} ${busY}`;
  const busPath = `M ${leftCx} ${busY} L ${rightCx} ${busY}`;

  const dropPaths = (
    [
      ['research', research],
      ['summarize', summarize],
      ['validate', validate],
    ] as const
  ).map(([id, box]) => {
    const cx = box.x + box.w / 2;
    const endY = box.y - tipLen;
    return {
      id: id as M10OrchestratorNodeId,
      d: `M ${cx} ${busY} L ${cx} ${endY}`,
    };
  });

  const lanePad = 10;
  const agentsLane = {
    x: research.x - lanePad,
    y: laneTop,
    w: validate.x + validate.w - research.x + lanePad * 2,
    h: headerH + research.h + 8,
  };

  return {
    trunkX,
    busY,
    orchBottom,
    trunkPath,
    busPath,
    dropPaths,
    assignPill: { x: trunkX, y: assignPillY },
    agentsLane,
    /** Start-aligned in header — clear of mid-drop / trunk shafts. */
    agentsBand: {
      x: agentsLane.x + 12,
      y: Math.max(busY + 10, agentsLane.y + headerH / 2 + 4),
    },
  };
}

/** Orthogonal drops → collect bus → trunk into evaluator (desktop). */
export function getDesktopFaninGeometry(
  boxes: Record<M10OrchestratorNodeId, M10OrchestratorBox>,
  tipLen = M10_ORCHESTRATOR_ARROW_TIP
): DesktopFaninGeometry | null {
  const research = boxes.research;
  const summarize = boxes.summarize;
  const validate = boxes.validate;
  const evaluator = boxes.evaluator;
  if (!research || !summarize || !validate || !evaluator) return null;

  const agentsBottom = research.y + research.h;
  const evalTop = evaluator.y;
  const busY = agentsBottom + 14;
  const trunkX = evaluator.x + evaluator.w / 2;
  const leftCx = research.x + research.w / 2;
  const rightCx = validate.x + validate.w / 2;
  const trunkEndY = evalTop - tipLen;

  const dropPaths = (
    [
      ['research', research],
      ['summarize', summarize],
      ['validate', validate],
    ] as const
  ).map(([id, box]) => {
    const cx = box.x + box.w / 2;
    const startY = box.y + box.h;
    return {
      id: id as M10OrchestratorNodeId,
      d: `M ${cx} ${startY} L ${cx} ${busY}`,
    };
  });

  return {
    trunkX,
    busY,
    busPath: `M ${leftCx} ${busY} L ${rightCx} ${busY}`,
    trunkPath: `M ${trunkX} ${busY} L ${trunkX} ${trunkEndY}`,
    dropPaths,
    handoffPill: {
      x: trunkX,
      y: (busY + evalTop) / 2,
    },
  };
}

export function getRetryPathDesktop(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX?: number
): string {
  return getOrchestratorRetryPathDesktop(from, to, leftX);
}

export function getRetryPathCompact(
  from: OrchestratorBoxLike,
  to: OrchestratorBoxLike,
  leftX?: number
): string {
  return getOrchestratorRetryPathCompact(from, to, leftX);
}

/** Role-band tone checks for polish tests. */
export function getRoleBandTone(
  id: M10OrchestratorNodeId
): M10OrchestratorTone {
  if (id === 'orchestrator') return M10_ORCHESTRATOR_ROLE_BAND.hub;
  if (id === 'research' || id === 'summarize')
    return M10_ORCHESTRATOR_ROLE_BAND.specialist;
  if (id === 'validate' || id === 'evaluator')
    return M10_ORCHESTRATOR_ROLE_BAND.gate;
  if (id === 'state') return M10_ORCHESTRATOR_ROLE_BAND.memory;
  return M10_ORCHESTRATOR_ROLE_BAND.infra;
}
