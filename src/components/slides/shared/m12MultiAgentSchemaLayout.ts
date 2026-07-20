/**
 * M12 120.5 – Verslo multi-agent geometrijos SOT (model).
 * View: M12MultiAgentSchemaDiagram.tsx
 */
import { DIAGRAM_TOKENS } from './diagramTokens';
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
  kind: 'flow' | 'hitl';
  fromAnchor: M12Anchor;
  toAnchor: M12Anchor;
}

export const M12_MULTI_AGENT_VIEWBOX = {
  desktop: { width: 930, height: 330 },
  compact: { width: 420, height: 620 },
} as const;

export const M12_MULTI_AGENT_STEP_NODE_IDS: M12MultiAgentNodeId[][] = [
  ['input'],
  ['router'],
  ['coordinator'],
  ['specialistA', 'specialistB'],
  ['evaluator'],
  ['output'],
];

export const M12_MULTI_AGENT_MARKER_LEN = DIAGRAM_TOKENS.arrow.markerLen;

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
];

export function getM12MultiAgentDesktopBoxes(
  labels: M12MultiAgentSchemaLabels
): M12MultiAgentBox[] {
  return [
    {
      id: 'input',
      x: 30,
      y: 132,
      w: 112,
      h: 58,
      tone: 'slate',
      label: labels.input,
    },
    {
      id: 'router',
      x: 172,
      y: 132,
      w: 124,
      h: 58,
      tone: 'slate',
      label: labels.router,
    },
    {
      id: 'coordinator',
      x: 326,
      y: 132,
      w: 124,
      h: 58,
      tone: 'violet',
      label: labels.coordinator,
    },
    {
      id: 'specialistA',
      x: 484,
      y: 72,
      w: 124,
      h: 58,
      tone: 'teal',
      label: labels.specialistA,
    },
    {
      id: 'specialistB',
      x: 484,
      y: 192,
      w: 124,
      h: 58,
      tone: 'teal',
      label: labels.specialistB,
    },
    {
      id: 'evaluator',
      x: 642,
      y: 132,
      w: 118,
      h: 58,
      tone: 'amber',
      label: labels.evaluator,
    },
    {
      id: 'output',
      x: 780,
      y: 132,
      w: 120,
      h: 58,
      tone: 'amberSoft',
      label: labels.output,
    },
  ];
}

export function getM12MultiAgentCompactBoxes(
  labels: M12MultiAgentSchemaLabels
): M12MultiAgentBox[] {
  return [
    {
      id: 'input',
      x: 110,
      y: 62,
      w: 200,
      h: 58,
      tone: 'slate',
      label: labels.input,
    },
    {
      id: 'router',
      x: 110,
      y: 145,
      w: 200,
      h: 58,
      tone: 'slate',
      label: labels.router,
    },
    {
      id: 'coordinator',
      x: 110,
      y: 228,
      w: 200,
      h: 58,
      tone: 'violet',
      label: labels.coordinator,
    },
    {
      id: 'specialistA',
      x: 22,
      y: 333,
      w: 176,
      h: 58,
      tone: 'teal',
      label: labels.specialistA,
    },
    {
      id: 'specialistB',
      x: 222,
      y: 333,
      w: 176,
      h: 58,
      tone: 'teal',
      label: labels.specialistB,
    },
    {
      id: 'evaluator',
      x: 110,
      y: 438,
      w: 200,
      h: 58,
      tone: 'amber',
      label: labels.evaluator,
    },
    {
      id: 'output',
      x: 110,
      y: 528,
      w: 200,
      h: 58,
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
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  return {
    x: to.x - (dx / dist) * markerLen,
    y: to.y - (dy / dist) * markerLen,
  };
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

/** Handoff / HITL label positions derived from midpoints. */
export function getM12HandoffLabelPos(
  boxes: Record<M12MultiAgentNodeId, M12MultiAgentBox>,
  compact: boolean
): { handoff: { x: number; y: number }; hitl: { x: number; y: number } } {
  if (compact) {
    const midY =
      (boxes.coordinator.y + boxes.coordinator.h + boxes.specialistA.y) / 2;
    return {
      handoff: { x: 210, y: midY - 8 },
      hitl: {
        x: 210,
        y: (boxes.evaluator.y + boxes.evaluator.h + boxes.output.y) / 2 + 4,
      },
    };
  }
  return {
    handoff: {
      x: (boxes.coordinator.x + boxes.coordinator.w + boxes.specialistA.x) / 2,
      y: boxes.specialistA.y + boxes.specialistA.h + 12,
    },
    hitl: {
      x: (boxes.evaluator.x + boxes.evaluator.w + boxes.output.x) / 2,
      y: boxes.evaluator.y - 8,
    },
  };
}
