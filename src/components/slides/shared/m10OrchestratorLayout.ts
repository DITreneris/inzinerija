/**
 * M10 10.482 – Agentų orkestravimo geometrijos SOT (model).
 * View: M10OrchestratorDiagram.tsx
 */

import type { M10OrchestratorLabels } from './m10OrchestratorContent';
import { DIAGRAM_TOKENS } from './diagramTokens';

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
  desktop: { width: 760, height: 420 },
  compact: { width: 420, height: 700 },
} as const;

export const M10_ORCHESTRATOR_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;

/** Macro step → highlighted node ids */
export const M10_ORCHESTRATOR_STEP_NODE_IDS: M10OrchestratorNodeId[][] = [
  ['input'],
  ['router'],
  ['orchestrator', 'state'],
  ['research', 'summarize', 'tools'],
  ['validate', 'evaluator'],
  ['research', 'validate', 'evaluator', 'output'],
];

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

export function getM10OrchestratorDesktopBoxes(
  labels: M10OrchestratorLabels
): M10OrchestratorBox[] {
  return [
    {
      id: 'input',
      x: 28,
      y: 28,
      w: 150,
      h: 52,
      tone: 'slate',
      label: labels.nodes.input,
    },
    {
      id: 'router',
      x: 240,
      y: 28,
      w: 150,
      h: 52,
      tone: 'slate',
      label: labels.nodes.router,
    },
    {
      id: 'orchestrator',
      x: 200,
      y: 110,
      w: 230,
      h: 64,
      tone: 'violet',
      label: labels.nodes.orchestrator,
    },
    {
      id: 'state',
      x: 520,
      y: 90,
      w: 200,
      h: 100,
      tone: 'brand',
      label: labels.nodes.state,
    },
    {
      id: 'research',
      x: 40,
      y: 220,
      w: 130,
      h: 56,
      tone: 'teal',
      label: labels.nodes.research,
    },
    {
      id: 'summarize',
      x: 200,
      y: 220,
      w: 130,
      h: 56,
      tone: 'teal',
      label: labels.nodes.summarize,
    },
    {
      id: 'validate',
      x: 360,
      y: 220,
      w: 130,
      h: 56,
      tone: 'amber',
      label: labels.nodes.validate,
    },
    {
      id: 'tools',
      x: 40,
      y: 310,
      w: 130,
      h: 48,
      tone: 'slate',
      label: labels.nodes.tools,
    },
    {
      id: 'evaluator',
      x: 320,
      y: 310,
      w: 180,
      h: 56,
      tone: 'amber',
      label: labels.nodes.evaluator,
    },
    {
      id: 'output',
      x: 560,
      y: 314,
      w: 150,
      h: 52,
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

/** Line end short of target edge so marker tip touches the box. */
export function getLineEndPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  markerLen = M10_ORCHESTRATOR_MARKER_LEN
): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x: to.x - ux * markerLen,
    y: to.y - uy * markerLen,
  };
}

/** Retry loop path around the left side (desktop). */
export function getRetryPathDesktop(
  from: M10OrchestratorBox,
  to: M10OrchestratorBox
): string {
  const start = getAnchorPoint(from, 'left');
  const end = getAnchorPoint(to, 'left');
  const leftX = 14;
  const midY = (start.y + end.y) / 2;
  const endAdj = getLineEndPoint({ x: leftX, y: midY }, end);
  return `M ${start.x} ${start.y} L ${leftX} ${start.y} L ${leftX} ${endAdj.y} L ${endAdj.x} ${endAdj.y}`;
}

/** Compact vertical retry: evaluator left → up along left → orchestrator left. */
export function getRetryPathCompact(
  from: M10OrchestratorBox,
  to: M10OrchestratorBox
): string {
  const start = getAnchorPoint(from, 'left');
  const end = getAnchorPoint(to, 'left');
  const leftX = 28;
  const endAdj = getLineEndPoint({ x: leftX, y: end.y }, end);
  return `M ${start.x} ${start.y} L ${leftX} ${start.y} L ${leftX} ${endAdj.y} L ${endAdj.x} ${endAdj.y}`;
}
