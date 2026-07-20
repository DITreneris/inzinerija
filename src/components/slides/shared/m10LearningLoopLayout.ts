import type { M10LearningLoopLabels } from './m10LearningLoopContent';

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

export const M10_LEARNING_LOOP_VIEWBOX = {
  desktop: { width: 900, height: 430 },
  /** Includes update node below lessons (step 3 highlight). */
  compact: { width: 420, height: 800 },
} as const;

export const M10_LEARNING_LOOP_STEP_NODE_IDS: M10LearningLoopNodeId[][] = [
  ['task', 'rules', 'orchestrator', 'agents', 'skills', 'output'],
  ['logs'],
  ['evaluation', 'lessons'],
  ['update', 'rules', 'skills'],
];

/** Desktop edge ids highlighted per macro step (partitions EDGES_DESKTOP). */
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
  ['logs-eval', 'eval-lessons'],
  ['lessons-update', 'update-rules', 'update-skills'],
];

export type M10LearningLoopEdgeKind =
  | 'flow'
  | 'record'
  | 'eval'
  | 'lessons'
  | 'to-update'
  | 'update-rules'
  | 'update-skills';

export interface M10LearningLoopEdge {
  id: string;
  from: M10LearningLoopNodeId;
  to: M10LearningLoopNodeId;
  kind: M10LearningLoopEdgeKind;
  /** Desktop-only cubic path when simple anchors are insufficient. */
  desktopPath?: string;
  dashed?: boolean;
}

/** Desktop edges – straight segments use anchors; curves use desktopPath. */
export const M10_LEARNING_LOOP_EDGES_DESKTOP: M10LearningLoopEdge[] = [
  { id: 'task-rules', from: 'task', to: 'rules', kind: 'flow' },
  { id: 'rules-orch', from: 'rules', to: 'orchestrator', kind: 'flow' },
  { id: 'orch-agents', from: 'orchestrator', to: 'agents', kind: 'flow' },
  { id: 'orch-skills', from: 'orchestrator', to: 'skills', kind: 'flow' },
  { id: 'agents-output', from: 'agents', to: 'output', kind: 'flow' },
  { id: 'skills-output', from: 'skills', to: 'output', kind: 'flow' },
  {
    id: 'output-logs',
    from: 'output',
    to: 'logs',
    kind: 'record',
    dashed: true,
  },
  {
    id: 'logs-eval',
    from: 'logs',
    to: 'evaluation',
    kind: 'eval',
    desktopPath: 'M 755 150 C 842 166, 842 202, 850 226',
  },
  {
    id: 'eval-lessons',
    from: 'evaluation',
    to: 'lessons',
    kind: 'lessons',
    desktopPath: 'M 770 256 C 760 292, 732 315, 725 329',
  },
  { id: 'lessons-update', from: 'lessons', to: 'update', kind: 'to-update' },
  {
    id: 'update-rules',
    from: 'update',
    to: 'rules',
    kind: 'update-rules',
    desktopPath: 'M 455 297 C 395 250, 395 168, 380 121',
  },
  {
    id: 'update-skills',
    from: 'update',
    to: 'skills',
    kind: 'update-skills',
    desktopPath: 'M 455 297 C 420 346, 390 354, 340 326',
    dashed: true,
  },
];

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
  anchor: 'top' | 'right' | 'bottom' | 'left' | 'center'
): { x: number; y: number } {
  if (anchor === 'center') {
    return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
  }
  if (anchor === 'top') return { x: box.x + box.w / 2, y: box.y };
  if (anchor === 'right') return { x: box.x + box.w, y: box.y + box.h / 2 };
  if (anchor === 'left') return { x: box.x, y: box.y + box.h / 2 };
  return { x: box.x + box.w / 2, y: box.y + box.h };
}

const MARKER_LEN = 6;

export function getLearningLoopStraightEdge(
  from: M10LearningLoopBox,
  to: M10LearningLoopBox,
  fromAnchor: 'top' | 'right' | 'bottom' | 'left',
  toAnchor: 'top' | 'right' | 'bottom' | 'left'
) {
  const start = getLearningLoopAnchor(from, fromAnchor);
  const endRaw = getLearningLoopAnchor(to, toAnchor);
  const dx = endRaw.x - start.x;
  const dy = endRaw.y - start.y;
  const dist = Math.hypot(dx, dy) || 1;
  return {
    x1: start.x,
    y1: start.y,
    x2: endRaw.x - (dx / dist) * MARKER_LEN,
    y2: endRaw.y - (dy / dist) * MARKER_LEN,
  };
}

/** Infer reasonable anchors for desktop straight edges. */
export function resolveLearningLoopStraight(
  edge: M10LearningLoopEdge,
  map: Record<M10LearningLoopNodeId, M10LearningLoopBox>
) {
  const from = map[edge.from];
  const to = map[edge.to];
  if (!from || !to) return null;

  if (edge.id === 'task-rules') {
    return getLearningLoopStraightEdge(from, to, 'right', 'left');
  }
  if (edge.id === 'rules-orch') {
    return getLearningLoopStraightEdge(from, to, 'bottom', 'top');
  }
  if (edge.id === 'orch-agents') {
    return getLearningLoopStraightEdge(from, to, 'bottom', 'top');
  }
  if (edge.id === 'orch-skills') {
    return getLearningLoopStraightEdge(from, to, 'bottom', 'top');
  }
  if (edge.id === 'agents-output') {
    return getLearningLoopStraightEdge(from, to, 'bottom', 'left');
  }
  if (edge.id === 'skills-output') {
    return getLearningLoopStraightEdge(from, to, 'bottom', 'right');
  }
  if (edge.id === 'output-logs') {
    return getLearningLoopStraightEdge(from, to, 'right', 'left');
  }
  if (edge.id === 'lessons-update') {
    return getLearningLoopStraightEdge(from, to, 'left', 'right');
  }
  return getLearningLoopStraightEdge(from, to, 'right', 'left');
}

export function getM10LearningLoopDesktopBoxes(labels: M10LearningLoopLabels): {
  execution: M10LearningLoopBox[];
  loop: M10LearningLoopBox[];
} {
  return {
    execution: [
      {
        id: 'task',
        x: 50,
        y: 92,
        w: 145,
        h: 58,
        tone: 'slate',
        label: labels.nodes.task,
      },
      {
        id: 'rules',
        x: 235,
        y: 92,
        w: 145,
        h: 58,
        tone: 'brand',
        label: labels.nodes.rules,
      },
      {
        id: 'orchestrator',
        x: 150,
        y: 180,
        w: 190,
        h: 58,
        tone: 'violet',
        label: labels.nodes.orchestrator,
      },
      {
        id: 'agents',
        x: 58,
        y: 268,
        w: 160,
        h: 58,
        tone: 'brand',
        label: labels.nodes.agents,
      },
      {
        id: 'skills',
        x: 260,
        y: 268,
        w: 160,
        h: 58,
        tone: 'teal',
        label: labels.nodes.skills,
      },
      {
        id: 'output',
        x: 170,
        y: 348,
        w: 160,
        h: 58,
        tone: 'slate',
        label: labels.nodes.output,
      },
    ],
    loop: [
      {
        id: 'logs',
        x: 570,
        y: 92,
        w: 185,
        h: 58,
        tone: 'violet',
        label: labels.nodes.logs,
      },
      {
        id: 'evaluation',
        x: 690,
        y: 198,
        w: 160,
        h: 58,
        tone: 'amber',
        label: labels.nodes.evaluation,
      },
      {
        id: 'lessons',
        x: 565,
        y: 300,
        w: 160,
        h: 58,
        tone: 'violet',
        label: labels.nodes.lessons,
      },
      {
        id: 'update',
        x: 455,
        y: 268,
        w: 175,
        h: 58,
        tone: 'teal',
        label: labels.nodes.update,
      },
    ],
  };
}

export function getM10LearningLoopCompactBoxes(
  labels: M10LearningLoopLabels
): M10LearningLoopBox[] {
  return [
    {
      id: 'task',
      x: 110,
      y: 70,
      w: 200,
      h: 56,
      tone: 'slate',
      label: labels.nodes.task,
    },
    {
      id: 'rules',
      x: 110,
      y: 145,
      w: 200,
      h: 56,
      tone: 'brand',
      label: labels.nodes.rules,
    },
    {
      id: 'orchestrator',
      x: 110,
      y: 220,
      w: 200,
      h: 56,
      tone: 'violet',
      label: labels.nodes.orchestrator,
    },
    {
      id: 'agents',
      x: 110,
      y: 295,
      w: 200,
      h: 56,
      tone: 'brand',
      label: labels.nodes.agents,
    },
    {
      id: 'skills',
      x: 110,
      y: 370,
      w: 200,
      h: 56,
      tone: 'teal',
      label: labels.nodes.skills,
    },
    {
      id: 'output',
      x: 110,
      y: 445,
      w: 200,
      h: 56,
      tone: 'slate',
      label: labels.nodes.output,
    },
    {
      id: 'logs',
      x: 110,
      y: 540,
      w: 200,
      h: 56,
      tone: 'violet',
      label: labels.nodes.logs,
    },
    {
      id: 'evaluation',
      x: 30,
      y: 625,
      w: 160,
      h: 56,
      tone: 'amber',
      label: labels.nodes.evaluation,
    },
    {
      id: 'lessons',
      x: 230,
      y: 625,
      w: 160,
      h: 56,
      tone: 'violet',
      label: labels.nodes.lessons,
    },
    {
      id: 'update',
      x: 110,
      y: 710,
      w: 200,
      h: 56,
      tone: 'teal',
      label: labels.nodes.update,
    },
  ];
}
