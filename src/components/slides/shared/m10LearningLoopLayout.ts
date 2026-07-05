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
  compact: { width: 420, height: 720 },
} as const;

export const M10_LEARNING_LOOP_STEP_NODE_IDS: M10LearningLoopNodeId[][] = [
  ['task', 'rules', 'orchestrator', 'agents', 'skills', 'output'],
  ['logs'],
  ['evaluation', 'lessons'],
  ['update', 'rules', 'skills'],
];

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
  ];
}
