/**
 * M10 10.482 – Agentų orkestravimo geometrijos SOT (model).
 * View: M10OrchestratorDiagram.tsx
 * Retry: orchestratorRetryPath.ts · W7 v06 error/retry hierarchy
 */

import { DIAGRAM_TOKENS } from './diagramTokens';
import { shortenToTip } from './diagramPathGeom';
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
  /** +22 top-row caption air + +20 agents cascade + HITL note clearance */
  desktop: { width: 760, height: 490 },
  compact: { width: 420, height: 700 },
} as const;

/** Shift so content is centered in desktop viewBox (pad L≈R). */
export const M10_ORCHESTRATOR_DESKTOP_X_OFFSET = 18;

/** Desktop SVG caption baseline (matches M10OrchestratorDiagram title y). */
export const M10_ORCHESTRATOR_TITLE_Y_DESKTOP = 28;

/**
 * Full-map: !active node dim (not hide). Below LMS inactive floor.
 * Step-4 error uses DIAGRAM_TOKENS.opacity.inactive for !active instead.
 */
export const ORCHESTRATOR_ORPHAN_OPACITY = DIAGRAM_TOKENS.opacity.orphanMap;

/** Non-focus topology edges (always painted, dimmed). */
export const ORCHESTRATOR_MAP_EDGE_OPACITY = 0.4;

/** Local data/resource stroke (thinner than flow). */
export const M10_ORCHESTRATOR_STROKE_DATA = 2;

/** Agents lane header height (Title Case band inside soft lane). */
export const M10_ORCHESTRATOR_AGENTS_HEADER_H = 34;

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

/**
 * Focus-path edge ids per step (emphasis = full opacity).
 * All edges always painted; non-focus → map dim. Step 4: eval-output = map only.
 */
export const M10_ORCHESTRATOR_FOCUS_BY_STEP: readonly (readonly string[])[] = [
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
    'eval-retry',
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
    'eval-retry',
  ],
];

/** @deprecated use M10_ORCHESTRATOR_FOCUS_BY_STEP (full-map: no cull). */
export const M10_ORCHESTRATOR_PAINT_BY_STEP = M10_ORCHESTRATOR_FOCUS_BY_STEP;

export type OrchestratorEdgeEmphasis = 'focus' | 'map';

export function shouldShowEdgeLabel(
  stepIndex: number,
  edgeId: string
): boolean {
  const set = M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP[stepIndex];
  return Boolean(set?.includes(edgeId));
}

/** Full-map: every topology edge is always painted (incl. retry). */
export function shouldPaintEdge(_stepIndex: number, _edgeId: string): boolean {
  return true;
}

export function getOrchestratorEdgeEmphasis(
  stepIndex: number,
  edgeId: string
): OrchestratorEdgeEmphasis {
  if (edgeId === 'eval-retry') {
    return shouldShowRetryLabel(stepIndex) ? 'focus' : 'map';
  }
  const set = M10_ORCHESTRATOR_FOCUS_BY_STEP[stepIndex];
  return set?.includes(edgeId) ? 'focus' : 'map';
}

export function getOrchestratorEdgeOpacity(
  stepIndex: number,
  edgeId: string
): number {
  return getOrchestratorEdgeEmphasis(stepIndex, edgeId) === 'focus'
    ? 1
    : ORCHESTRATOR_MAP_EDGE_OPACITY;
}

/** Fan-out always on (full-map). */
export function shouldPaintFanout(_stepIndex: number): boolean {
  return true;
}

/** Fan-in always on (full-map). */
export function shouldPaintFanin(_stepIndex: number): boolean {
  return true;
}

/** Whether fan-out group uses focus opacity this step. */
export function isOrchestratorFanoutFocus(stepIndex: number): boolean {
  return M10_ORCHESTRATOR_FANOUT_EDGE_IDS.some(
    (id) => getOrchestratorEdgeEmphasis(stepIndex, id) === 'focus'
  );
}

/** Whether fan-in group uses focus opacity this step. */
export function isOrchestratorFaninFocus(stepIndex: number): boolean {
  return (
    getOrchestratorEdgeEmphasis(stepIndex, M10_ORCHESTRATOR_FANIN_EDGE_ID) ===
    'focus'
  );
}

/** Retry verb pill on error + fix steps (4–5); path always on. */
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
 * Focus / "live" for teaching emphasis: step highlight or on a focus-path edge.
 * Full-map: all nodes always render; use this for emerald / soft cues only.
 */
export function isOrchestratorNodeLive(
  stepIndex: number,
  nodeId: M10OrchestratorNodeId
): boolean {
  const active = M10_ORCHESTRATOR_STEP_NODE_IDS[stepIndex];
  if (active?.includes(nodeId)) return true;
  return M10_ORCHESTRATOR_EDGES.some(
    (edge) =>
      getOrchestratorEdgeEmphasis(stepIndex, edge.id) === 'focus' &&
      (edge.from === nodeId || edge.to === nodeId)
  );
}

export function getM10OrchestratorDesktopBoxes(
  labels: M10OrchestratorLabels
): M10OrchestratorBox[] {
  const ox = M10_ORCHESTRATOR_DESKTOP_X_OFFSET;
  // validate cx 425+ox; evaluator w 196 → x = cx - 98 so trunk is vertical under Tikrintojas
  return [
    {
      id: 'input',
      x: 28 + ox,
      y: 62,
      w: 150,
      h: 52,
      tone: 'slate',
      label: labels.nodes.input,
    },
    {
      // gap after input ≥ pill(nukreipia)+16 ≈ 91.4
      id: 'router',
      x: 270 + ox,
      y: 62,
      w: 168,
      h: 52,
      tone: 'slate',
      label: labels.nodes.router,
    },
    {
      // cx === router.cx → vertical router→orch (no hypotenuse)
      id: 'orchestrator',
      x: 239 + ox,
      y: 142,
      w: 230,
      h: 64,
      tone: 'violet',
      label: labels.nodes.orchestrator,
    },
    {
      id: 'state',
      // centerY === orch centerY (142+32); gap after orch ≥24
      x: 548 + ox,
      y: 140,
      w: 156,
      h: 68,
      tone: 'brand',
      label: labels.nodes.state,
    },
    {
      id: 'research',
      x: 40 + ox,
      y: 278,
      w: 130,
      h: 58,
      tone: 'teal',
      label: labels.nodes.research,
    },
    {
      id: 'summarize',
      x: 200 + ox,
      y: 278,
      w: 130,
      h: 58,
      tone: 'teal',
      label: labels.nodes.summarize,
    },
    {
      id: 'validate',
      x: 360 + ox,
      y: 278,
      w: 130,
      h: 58,
      tone: 'amber',
      label: labels.nodes.validate,
    },
    {
      id: 'tools',
      x: 40 + ox,
      y: 394,
      w: 130,
      h: 48,
      tone: 'slate',
      label: labels.nodes.tools,
    },
    {
      // Centered under validate (Tikrintojas) → vertical handoff, no hypotenuse
      id: 'evaluator',
      x: 327 + ox,
      y: 394,
      w: 196,
      h: 58,
      tone: 'amber',
      label: labels.nodes.evaluator,
    },
    {
      // gap after eval ≥24: 327+196+24 = 547
      id: 'output',
      x: 547 + ox,
      y: 394,
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
  return shortenToTip(from, to, tipLen);
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
 * Horizontal same-row: above both boxes (min y), not above shaft midY.
 * Vertical: pillW/2+14 clear; research-tools +4 bump.
 * HARD: router-orch always LEFT of shaft (State / skaito zone is RIGHT).
 * HARD: state-orch pill biased toward State (not into router-orch pocket).
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
    const aboveBoxes = Math.min(from.y, to.y) - (pillH / 2 + 8);
    // Top row (near title): keep above shaft mid for caption air.
    // Bottom row (eval→output): above both boxes so pill ∉ box AABB.
    const y =
      Math.min(from.y, to.y) < 120 ? midY - (pillH / 2 + 8) : aboveBoxes;
    // state↔orch: pull toward State so not in router→orch label pocket
    const x =
      edgeId === 'state-orch'
        ? midX + Math.min(36, Math.abs(b.x - a.x) * 0.18)
        : midX;
    return { x, y, midX, midY };
  }

  const edgeBump = edgeId === 'research-tools' ? 4 : 0;
  const vClear = pillW / 2 + 14 + edgeBump;
  const rightX = midX + vClear;
  const leftX = midX - vClear;
  // router→orch: NEVER right (collides with state↔orch "skaito / įrašo")
  if (edgeId === 'router-orch') {
    return { x: leftX, y: midY, midX, midY };
  }
  const x = rightX + pillW / 2 + 8 < viewBoxW ? rightX : leftX;
  return { x, y: midY, midX, midY };
}

/**
 * Retry annotation: above the horizontal U leg (evaluator → gutter),
 * not on the vertical shaft / not on the stroke.
 */
export function getOrchestratorRetryLabelAnchor(
  from: OrchestratorBoxLike,
  _to: OrchestratorBoxLike,
  leftX: number,
  label: string
): { x: number; y: number } {
  const startY = from.y + from.h / 2;
  const { h } = estimateOrchestratorPillSize(label);
  return {
    x: (leftX + from.x) / 2,
    y: startY - (h / 2 + 10),
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
  tipLen = M10_ORCHESTRATOR_ARROW_TIP,
  /** Assign verb for off-shaft pill width (default ≈ LT/EN short phrase). */
  assignLabel = 'paskiria agentus'
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
  const { w: pillW, h: pillH } = estimateOrchestratorPillSize(assignLabel);
  // Off-shaft left (State / skaito zone is right of trunk)
  const assignPillX = trunkX - (pillW / 2 + 12);
  const assignPillYMin = orchBottom + 10 + pillH / 2;
  // Bus above lane; keep ≥6 px air under pill bottom
  const busY = Math.max(assignPillYMin + pillH / 2 + 6, laneTop - 4);
  const assignPillY = Math.min(assignPillYMin, busY - (pillH / 2 + 6));
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
    assignPill: { x: assignPillX, y: assignPillY },
    agentsLane,
    /**
     * Start just right of research drop (LT “Vykdymo agentai” too wide for
     * left-of-drop pocket); below bus, above agent tops.
     */
    agentsBand: {
      x: leftCx + 10,
      // ≥16 px under bus before agent tops (header zone air)
      y: busY + 14,
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
  // Bus low enough that handoff pill above bus clears agent bottoms
  const { w: handoffPillW, h: handoffPillH } =
    estimateOrchestratorPillSize('perduoda');
  const busY = Math.max(agentsBottom + 22, agentsBottom + handoffPillH + 16);
  const validateCx = validate.x + validate.w / 2;
  const trunkX = evaluator.x + evaluator.w / 2;
  const leftCx = research.x + research.w / 2;
  const rightCx = validateCx;
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

  // Pill above bus, right of trunk (vertical handoff under Tikrintojas)
  return {
    trunkX,
    busY,
    busPath: `M ${leftCx} ${busY} L ${rightCx} ${busY}`,
    trunkPath: `M ${trunkX} ${busY} L ${trunkX} ${trunkEndY}`,
    dropPaths,
    handoffPill: {
      x: trunkX + handoffPillW / 2 + 14,
      y: busY - (handoffPillH / 2 + 8),
    },
  };
}

/**
 * Orthogonal validate→eval elbow (no hypotenuse). Used on compact
 * and as reference for handoff geometry tests.
 */
export function getValidateEvalOrthogonalPath(
  validate: OrchestratorBoxLike,
  evaluator: OrchestratorBoxLike,
  tipLen = M10_ORCHESTRATOR_ARROW_TIP
): string {
  const fromCx = validate.x + validate.w / 2;
  const toCx = evaluator.x + evaluator.w / 2;
  const busY = validate.y + validate.h + 22;
  const endY = evaluator.y - tipLen;
  if (Math.abs(fromCx - toCx) < 0.5) {
    return `M ${fromCx} ${validate.y + validate.h} L ${fromCx} ${endY}`;
  }
  return `M ${fromCx} ${validate.y + validate.h} L ${fromCx} ${busY} L ${toCx} ${busY} L ${toCx} ${endY}`;
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
