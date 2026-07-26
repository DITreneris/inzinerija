import { DIAGRAM_TOKENS } from './diagramTokens';
import type { M10LearningLoopLabels } from './m10LearningLoopContent';
import {
  LEARNING_LOOP_POLYGON_TIP_GAP,
  LEARNING_LOOP_UPDATE_TIP_LEN,
  getLearningLoopBusX,
  getLearningLoopUpdateBusGeom,
  shortenToTip,
  type LearningLoopUpdateBusGeom,
} from './learningLoopUpdateBus';

export type M10LearningLoopNodeId =
  | 'task'
  | 'rules'
  | 'orchestrator'
  | 'agents'
  | 'skills'
  | 'output'
  | 'logs'
  | 'evaluation'
  | 'lessons'
  | 'update';

export interface M10LearningLoopBox {
  id: M10LearningLoopNodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: 'brand' | 'teal' | 'violet' | 'amber' | 'slate';
  label: [string, string];
}

/** Desktop panels – gutter between exec.right and learn.left holds update bus. */
export const M10_LEARNING_LOOP_PANELS = {
  desktop: {
    exec: { x: 16, y: 46, w: 400, h: 372 },
    learn: { x: 500, y: 46, w: 444, h: 372 },
  },
  compact: {
    exec: { x: 10, y: 12, w: 400, h: 430 },
    learn: { x: 10, y: 455, w: 400, h: 340 },
  },
} as const;

export const M10_LEARNING_LOOP_VIEWBOX = {
  desktop: { width: 960, height: 440 },
  /** Stacked panels; learn zone includes 2×2 + room for bridge note. */
  compact: { width: 420, height: 820 },
} as const;

/**
 * Primary step membership for HitArea navigation (first match wins).
 * Visual chrome uses getLearningLoopNodeVisualState (active/live/orphan).
 */
export const M10_LEARNING_LOOP_STEP_NODE_IDS: M10LearningLoopNodeId[][] = [
  ['task', 'rules', 'orchestrator', 'agents', 'skills', 'output'],
  ['logs'],
  ['evaluation', 'lessons', 'update', 'logs'],
  ['update', 'rules', 'skills'],
];

/** Gold-ring focus nodes per makro step (subset of live). */
export const M10_LEARNING_LOOP_ACTIVE_NODE_IDS: readonly (readonly M10LearningLoopNodeId[])[] =
  [['orchestrator', 'output'], ['logs'], ['evaluation', 'lessons'], ['update']];

/** Full-opacity nodes without gold ring (in addition to active). */
export const M10_LEARNING_LOOP_LIVE_NODE_IDS: readonly (readonly M10LearningLoopNodeId[])[] =
  [
    ['task', 'rules', 'agents', 'skills'],
    ['output'],
    ['logs', 'update'],
    ['rules', 'skills'],
  ];

export type LearningLoopNodeVisual = 'active' | 'live' | 'orphan';

/**
 * Local orphan dim – DIAGRAM_TOKENS.opacity.orphanLearningLoop (0.5).
 * Documented exception vs orphanMap (0.55); do not silently unify.
 */
export const M10_LEARNING_LOOP_ORPHAN_OPACITY =
  DIAGRAM_TOKENS.opacity.orphanLearningLoop;

/** Learn-panel cycle inset ring when step >= this. */
export const M10_LEARNING_LOOP_CYCLE_RING_MIN_STEP = 2;

export function getLearningLoopNodeVisualState(
  stepIndex: number,
  id: M10LearningLoopNodeId
): LearningLoopNodeVisual {
  const step = Math.max(0, Math.min(3, stepIndex));
  if (M10_LEARNING_LOOP_ACTIVE_NODE_IDS[step]?.includes(id)) return 'active';
  if (M10_LEARNING_LOOP_LIVE_NODE_IDS[step]?.includes(id)) return 'live';
  return 'orphan';
}

export function shouldShowLearningLoopCycleRing(stepIndex: number): boolean {
  return stepIndex >= M10_LEARNING_LOOP_CYCLE_RING_MIN_STEP;
}

/** Four learn-cycle edges that close the 2×2 clock (step 2). */
export const M10_LEARNING_LOOP_LEARN_CYCLE_EDGE_IDS = [
  'logs-eval',
  'eval-lessons',
  'lessons-update',
  'update-logs',
] as const;

/** Desktop/compact edge ids highlighted per makro step (hide, not dim). */
export const M10_LEARNING_LOOP_STEP_EDGE_IDS: readonly (readonly string[])[] = [
  [
    'task-rules',
    'rules-orch',
    'orch-agents',
    'orch-skills',
    'agents-output',
    'skills-output',
  ],
  ['output-logs'],
  ['logs-eval', 'eval-lessons', 'lessons-update', 'update-logs'],
  ['update-rules', 'update-skills'],
];

/** Labels shown only when their edge is live. */
export const M10_LEARNING_LOOP_EDGE_LABEL_BY_STEP: readonly (readonly string[])[] =
  [[], ['output-logs'], ['eval-lessons'], ['update-bus']];

export type M10LearningLoopEdgeKind = 'flow' | 'record' | 'learn' | 'update';

export interface M10LearningLoopEdge {
  id: string;
  from: M10LearningLoopNodeId;
  to: M10LearningLoopNodeId;
  kind: M10LearningLoopEdgeKind;
  /** Orthogonal path when simple anchors are insufficient. */
  path?: string;
  dashed?: boolean;
  /** Tip direction for learn/update manual polygons. */
  tip?: 'up' | 'down' | 'left' | 'right';
}

export const M10_LEARNING_LOOP_EDGES: M10LearningLoopEdge[] = [
  { id: 'task-rules', from: 'task', to: 'rules', kind: 'flow', tip: 'right' },
  {
    id: 'rules-orch',
    from: 'rules',
    to: 'orchestrator',
    kind: 'flow',
    tip: 'down',
  },
  {
    id: 'orch-agents',
    from: 'orchestrator',
    to: 'agents',
    kind: 'flow',
    tip: 'down',
  },
  {
    id: 'orch-skills',
    from: 'orchestrator',
    to: 'skills',
    kind: 'flow',
    tip: 'down',
  },
  {
    id: 'agents-output',
    from: 'agents',
    to: 'output',
    kind: 'flow',
    tip: 'down',
  },
  {
    id: 'skills-output',
    from: 'skills',
    to: 'output',
    kind: 'flow',
    tip: 'down',
  },
  {
    id: 'output-logs',
    from: 'output',
    to: 'logs',
    kind: 'record',
    dashed: true,
    tip: 'right',
  },
  {
    id: 'logs-eval',
    from: 'logs',
    to: 'evaluation',
    kind: 'learn',
    tip: 'right',
  },
  {
    id: 'eval-lessons',
    from: 'evaluation',
    to: 'lessons',
    kind: 'learn',
    tip: 'down',
  },
  {
    id: 'lessons-update',
    from: 'lessons',
    to: 'update',
    kind: 'learn',
    tip: 'left',
  },
  {
    id: 'update-logs',
    from: 'update',
    to: 'logs',
    kind: 'learn',
    tip: 'up',
  },
  {
    id: 'update-rules',
    from: 'update',
    to: 'rules',
    kind: 'update',
    tip: 'left',
  },
  {
    id: 'update-skills',
    from: 'update',
    to: 'skills',
    kind: 'update',
    tip: 'left',
  },
];

/** @deprecated Use M10_LEARNING_LOOP_EDGES – kept for import compatibility in tests. */
export const M10_LEARNING_LOOP_EDGES_DESKTOP = M10_LEARNING_LOOP_EDGES;

export function shouldPaintLearningLoopEdge(
  stepIndex: number,
  edgeId: string
): boolean {
  const set = M10_LEARNING_LOOP_STEP_EDGE_IDS[stepIndex];
  return Boolean(set?.includes(edgeId));
}

export function shouldShowLearningLoopEdgeLabel(
  stepIndex: number,
  labelId: string
): boolean {
  const set = M10_LEARNING_LOOP_EDGE_LABEL_BY_STEP[stepIndex];
  return Boolean(set?.includes(labelId));
}

export function getLearningLoopBoxMap(
  boxes: M10LearningLoopBox[]
): Record<M10LearningLoopNodeId, M10LearningLoopBox> {
  return boxes.reduce(
    (acc, box) => {
      acc[box.id] = box;
      return acc;
    },
    {} as Record<M10LearningLoopNodeId, M10LearningLoopBox>
  );
}

export function getLearningLoopAnchor(
  box: M10LearningLoopBox,
  anchor: 'top' | 'right' | 'bottom' | 'left'
): { x: number; y: number } {
  if (anchor === 'top') return { x: box.x + box.w / 2, y: box.y };
  if (anchor === 'right') return { x: box.x + box.w, y: box.y + box.h / 2 };
  if (anchor === 'left') return { x: box.x, y: box.y + box.h / 2 };
  return { x: box.x + box.w / 2, y: box.y + box.h };
}

/** LMS process tip – processTipLen (not legacy markerLen). */
export const M10_LEARNING_LOOP_ARROW_TIP = LEARNING_LOOP_UPDATE_TIP_LEN;
const MARKER_LEN = M10_LEARNING_LOOP_ARROW_TIP;
const POLY_GAP = LEARNING_LOOP_POLYGON_TIP_GAP;

/** Orthogonal elbow: vertical then horizontal (or reverse) into target. */
export function getLearningLoopOrthogonalPath(
  from: M10LearningLoopBox,
  to: M10LearningLoopBox,
  mode: 'v-then-h' | 'h-then-v',
  tipLen: number = MARKER_LEN
): string {
  const start =
    mode === 'v-then-h'
      ? getLearningLoopAnchor(from, 'bottom')
      : getLearningLoopAnchor(from, from.x < to.x ? 'right' : 'left');
  const endRaw =
    mode === 'v-then-h'
      ? getLearningLoopAnchor(to, 'top')
      : getLearningLoopAnchor(to, to.x < from.x ? 'right' : 'left');
  const end = shortenToTip(start, endRaw, tipLen);

  if (mode === 'v-then-h') {
    const midY = (start.y + endRaw.y) / 2;
    return `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
  }
  const midX = (start.x + endRaw.x) / 2;
  return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
}

export function getLearningLoopStraightEdge(
  from: M10LearningLoopBox,
  to: M10LearningLoopBox,
  fromAnchor: 'top' | 'right' | 'bottom' | 'left',
  toAnchor: 'top' | 'right' | 'bottom' | 'left',
  tipLen: number = MARKER_LEN
) {
  const start = getLearningLoopAnchor(from, fromAnchor);
  const endRaw = getLearningLoopAnchor(to, toAnchor);
  const end = shortenToTip(start, endRaw, tipLen);
  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y, endRaw };
}

/** Polygon tip end (gap outside box) for learn edges – path ends at base of tip. */
export function getLearningLoopLearnSegment(
  from: M10LearningLoopBox,
  to: M10LearningLoopBox,
  fromAnchor: 'top' | 'right' | 'bottom' | 'left',
  toAnchor: 'top' | 'right' | 'bottom' | 'left'
) {
  const start = getLearningLoopAnchor(from, fromAnchor);
  const endRaw = getLearningLoopAnchor(to, toAnchor);
  const tipH = 12;
  let tip = {
    tipX: endRaw.x,
    tipY: endRaw.y,
    baseX: endRaw.x,
    baseY: endRaw.y,
  };
  if (toAnchor === 'left') {
    const tipX = endRaw.x - POLY_GAP;
    tip = { tipX, tipY: endRaw.y, baseX: tipX - tipH, baseY: endRaw.y };
  } else if (toAnchor === 'right') {
    const tipX = endRaw.x + POLY_GAP;
    tip = { tipX, tipY: endRaw.y, baseX: tipX + tipH, baseY: endRaw.y };
  } else if (toAnchor === 'top') {
    const tipY = endRaw.y - POLY_GAP;
    tip = { tipX: endRaw.x, tipY, baseX: endRaw.x, baseY: tipY - tipH };
  } else {
    const tipY = endRaw.y + POLY_GAP;
    tip = { tipX: endRaw.x, tipY, baseX: endRaw.x, baseY: tipY + tipH };
  }
  return {
    x1: start.x,
    y1: start.y,
    x2: tip.baseX,
    y2: tip.baseY,
    tip,
  };
}

export type ResolvedLearningLoopEdge =
  | {
      id: string;
      kind: M10LearningLoopEdgeKind;
      dashed?: boolean;
      mode: 'line';
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      tip?: M10LearningLoopEdge['tip'];
      tipGeom?: { tipX: number; tipY: number; baseX: number; baseY: number };
    }
  | {
      id: string;
      kind: M10LearningLoopEdgeKind;
      dashed?: boolean;
      mode: 'path';
      d: string;
      tip?: M10LearningLoopEdge['tip'];
      tipGeom?: { tipX: number; tipY: number; baseX: number; baseY: number };
    }
  | {
      id: string;
      kind: 'update';
      mode: 'bus';
      bus: LearningLoopUpdateBusGeom;
    };

export function resolveLearningLoopEdge(
  edge: M10LearningLoopEdge,
  map: Record<M10LearningLoopNodeId, M10LearningLoopBox>,
  opts: { busX: number; useMarkerTip: boolean; compact?: boolean }
): ResolvedLearningLoopEdge | null {
  const from = map[edge.from];
  const to = map[edge.to];
  if (!from || !to) return null;

  if (edge.id === 'update-rules' || edge.id === 'update-skills') {
    const bus = getLearningLoopUpdateBusGeom(
      map.update,
      map.rules,
      map.skills,
      opts.busX
    );
    return { id: edge.id, kind: 'update', mode: 'bus', bus };
  }

  if (edge.id === 'rules-orch') {
    const d = getLearningLoopOrthogonalPath(from, to, 'v-then-h');
    return {
      id: edge.id,
      kind: edge.kind,
      mode: 'path',
      d,
      tip: 'down',
    };
  }

  if (
    edge.id === 'orch-agents' ||
    edge.id === 'orch-skills' ||
    edge.id === 'agents-output' ||
    edge.id === 'skills-output'
  ) {
    const d = getLearningLoopOrthogonalPath(from, to, 'v-then-h');
    return { id: edge.id, kind: edge.kind, mode: 'path', d, tip: 'down' };
  }

  if (edge.id === 'task-rules') {
    // Desktop: horizontal; compact stack: vertical
    if (opts.compact || from.y + from.h < to.y) {
      const tipLen = opts.useMarkerTip ? MARKER_LEN : 0;
      const pts = getLearningLoopStraightEdge(
        from,
        to,
        'bottom',
        'top',
        tipLen
      );
      return {
        id: edge.id,
        kind: edge.kind,
        dashed: edge.dashed,
        mode: 'line',
        x1: pts.x1,
        y1: pts.y1,
        x2: pts.x2,
        y2: pts.y2,
        tip: 'down',
      };
    }
    const tipLen = opts.useMarkerTip ? MARKER_LEN : 0;
    const pts = getLearningLoopStraightEdge(from, to, 'right', 'left', tipLen);
    return {
      id: edge.id,
      kind: edge.kind,
      dashed: edge.dashed,
      mode: 'line',
      x1: pts.x1,
      y1: pts.y1,
      x2: pts.x2,
      y2: pts.y2,
      tip: 'right',
    };
  }

  if (edge.id === 'output-logs') {
    // Desktop: horizontal bridge; compact: vertical into learn panel
    if (opts.compact || from.y + from.h < to.y - 20) {
      const tipLen = opts.useMarkerTip ? MARKER_LEN : 0;
      const pts = getLearningLoopStraightEdge(
        from,
        to,
        'bottom',
        'top',
        tipLen
      );
      return {
        id: edge.id,
        kind: edge.kind,
        dashed: edge.dashed,
        mode: 'line',
        x1: pts.x1,
        y1: pts.y1,
        x2: pts.x2,
        y2: pts.y2,
        tip: 'down',
      };
    }
    const tipLen = opts.useMarkerTip ? MARKER_LEN : 0;
    const pts = getLearningLoopStraightEdge(from, to, 'right', 'left', tipLen);
    return {
      id: edge.id,
      kind: edge.kind,
      dashed: edge.dashed,
      mode: 'line',
      x1: pts.x1,
      y1: pts.y1,
      x2: pts.x2,
      y2: pts.y2,
      tip: 'right',
    };
  }

  if (edge.id === 'logs-eval') {
    const seg = getLearningLoopLearnSegment(from, to, 'right', 'left');
    return {
      id: edge.id,
      kind: edge.kind,
      mode: 'line',
      x1: seg.x1,
      y1: seg.y1,
      x2: seg.x2,
      y2: seg.y2,
      tip: 'right',
      tipGeom: seg.tip,
    };
  }

  if (edge.id === 'eval-lessons') {
    const seg = getLearningLoopLearnSegment(from, to, 'bottom', 'top');
    return {
      id: edge.id,
      kind: edge.kind,
      mode: 'line',
      x1: seg.x1,
      y1: seg.y1,
      x2: seg.x2,
      y2: seg.y2,
      tip: 'down',
      tipGeom: seg.tip,
    };
  }

  if (edge.id === 'lessons-update') {
    const seg = getLearningLoopLearnSegment(from, to, 'left', 'right');
    return {
      id: edge.id,
      kind: edge.kind,
      mode: 'line',
      x1: seg.x1,
      y1: seg.y1,
      x2: seg.x2,
      y2: seg.y2,
      tip: 'left',
      tipGeom: seg.tip,
    };
  }

  if (edge.id === 'update-logs') {
    const seg = getLearningLoopLearnSegment(from, to, 'top', 'bottom');
    return {
      id: edge.id,
      kind: edge.kind,
      mode: 'line',
      x1: seg.x1,
      y1: seg.y1,
      x2: seg.x2,
      y2: seg.y2,
      tip: 'up',
      tipGeom: seg.tip,
    };
  }

  return null;
}

/** @deprecated Prefer resolveLearningLoopEdge. */
export function resolveLearningLoopStraight(
  edge: M10LearningLoopEdge,
  map: Record<M10LearningLoopNodeId, M10LearningLoopBox>
) {
  const resolved = resolveLearningLoopEdge(edge, map, {
    busX: 0,
    useMarkerTip: true,
  });
  if (!resolved || resolved.mode !== 'line') return null;
  return { x1: resolved.x1, y1: resolved.y1, x2: resolved.x2, y2: resolved.y2 };
}

export function getLearningLoopDesktopBusX(): number {
  const { exec, learn } = M10_LEARNING_LOOP_PANELS.desktop;
  return getLearningLoopBusX(exec.x + exec.w, learn.x);
}

export function getLearningLoopCompactBusX(): number {
  // Compact: bus along right margin; drops left into rules/skills
  return 400;
}

export function getM10LearningLoopDesktopBoxes(labels: M10LearningLoopLabels): {
  execution: M10LearningLoopBox[];
  loop: M10LearningLoopBox[];
} {
  return {
    execution: [
      {
        id: 'task',
        x: 36,
        y: 88,
        w: 150,
        h: 56,
        tone: 'slate',
        label: labels.nodes.task,
      },
      {
        id: 'rules',
        x: 246,
        y: 88,
        w: 150,
        h: 56,
        tone: 'brand',
        label: labels.nodes.rules,
      },
      {
        id: 'orchestrator',
        x: 126,
        y: 180,
        w: 180,
        h: 56,
        tone: 'violet',
        label: labels.nodes.orchestrator,
      },
      {
        id: 'agents',
        x: 40,
        y: 278,
        w: 160,
        h: 56,
        tone: 'brand',
        label: labels.nodes.agents,
      },
      {
        id: 'skills',
        x: 248,
        y: 278,
        w: 160,
        h: 56,
        tone: 'teal',
        label: labels.nodes.skills,
      },
      {
        id: 'output',
        x: 126,
        y: 358,
        w: 180,
        h: 56,
        tone: 'slate',
        label: labels.nodes.output,
      },
    ],
    loop: [
      {
        id: 'logs',
        x: 520,
        y: 88,
        w: 170,
        h: 56,
        tone: 'violet',
        label: labels.nodes.logs,
      },
      {
        id: 'evaluation',
        x: 740,
        y: 88,
        w: 170,
        h: 56,
        tone: 'amber',
        label: labels.nodes.evaluation,
      },
      {
        id: 'update',
        x: 520,
        y: 300,
        w: 170,
        h: 56,
        tone: 'teal',
        label: labels.nodes.update,
      },
      {
        id: 'lessons',
        x: 740,
        y: 300,
        w: 170,
        h: 56,
        tone: 'violet',
        label: labels.nodes.lessons,
      },
    ],
  };
}

export function getM10LearningLoopCompactBoxes(
  labels: M10LearningLoopLabels
): M10LearningLoopBox[] {
  // Execution column (keep Agentai ∥ Įgūdžiai side-by-side)
  const task: M10LearningLoopBox = {
    id: 'task',
    x: 110,
    y: 48,
    w: 200,
    h: 52,
    tone: 'slate',
    label: labels.nodes.task,
  };
  const rules: M10LearningLoopBox = {
    id: 'rules',
    x: 110,
    y: 118,
    w: 200,
    h: 52,
    tone: 'brand',
    label: labels.nodes.rules,
  };
  const orch: M10LearningLoopBox = {
    id: 'orchestrator',
    x: 110,
    y: 188,
    w: 200,
    h: 52,
    tone: 'violet',
    label: labels.nodes.orchestrator,
  };
  const agents: M10LearningLoopBox = {
    id: 'agents',
    x: 30,
    y: 258,
    w: 160,
    h: 52,
    tone: 'brand',
    label: labels.nodes.agents,
  };
  const skills: M10LearningLoopBox = {
    id: 'skills',
    x: 230,
    y: 258,
    w: 160,
    h: 52,
    tone: 'teal',
    label: labels.nodes.skills,
  };
  const output: M10LearningLoopBox = {
    id: 'output',
    x: 110,
    y: 328,
    w: 200,
    h: 52,
    tone: 'slate',
    label: labels.nodes.output,
  };
  // Learn 2×2 below
  const logs: M10LearningLoopBox = {
    id: 'logs',
    x: 30,
    y: 480,
    w: 160,
    h: 52,
    tone: 'violet',
    label: labels.nodes.logs,
  };
  const evaluation: M10LearningLoopBox = {
    id: 'evaluation',
    x: 230,
    y: 480,
    w: 160,
    h: 52,
    tone: 'amber',
    label: labels.nodes.evaluation,
  };
  const update: M10LearningLoopBox = {
    id: 'update',
    x: 30,
    y: 600,
    w: 160,
    h: 52,
    tone: 'teal',
    label: labels.nodes.update,
  };
  const lessons: M10LearningLoopBox = {
    id: 'lessons',
    x: 230,
    y: 600,
    w: 160,
    h: 52,
    tone: 'violet',
    label: labels.nodes.lessons,
  };
  return [
    task,
    rules,
    orch,
    agents,
    skills,
    output,
    logs,
    evaluation,
    update,
    lessons,
  ];
}

export function getLearningLoopUpdateBusForBoxes(
  map: Record<M10LearningLoopNodeId, M10LearningLoopBox>,
  busX: number
): LearningLoopUpdateBusGeom {
  return getLearningLoopUpdateBusGeom(map.update, map.rules, map.skills, busX);
}

/** Gutter width desktop (learn.left − exec.right). */
export function getLearningLoopDesktopGutter(): number {
  const { exec, learn } = M10_LEARNING_LOOP_PANELS.desktop;
  return learn.x - (exec.x + exec.w);
}

export function isUpdateInsideLearnPanel(
  update: M10LearningLoopBox,
  learn = M10_LEARNING_LOOP_PANELS.desktop.learn
): boolean {
  return (
    update.x >= learn.x &&
    update.x + update.w <= learn.x + learn.w &&
    update.y >= learn.y &&
    update.y + update.h <= learn.y + learn.h
  );
}
