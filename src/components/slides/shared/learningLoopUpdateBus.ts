/**
 * M10 learning-loop update magistrale (gutter trunk + drops into rules/skills).
 * Orthogonal L-paths – not cycle feedbackUPath, not C-curves through the center.
 */
import {
  DIAGRAM_PROCESS_TIP_LEN,
  shortenToTip,
  type DiagramPoint,
} from './diagramPathGeom';

export interface LearningLoopBoxLike {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type LearningLoopPoint = DiagramPoint;

export const LEARNING_LOOP_UPDATE_TIP_LEN = DIAGRAM_PROCESS_TIP_LEN;
/** Gap from tip apex to target box edge (SCHEME §3.7.4 ~3). */
export const LEARNING_LOOP_POLYGON_TIP_GAP = 3;
export const LEARNING_LOOP_POLYGON_TIP_H = 12;
export const LEARNING_LOOP_POLYGON_TIP_W = 8;

/** @deprecated Prefer `shortenToTip` from `diagramPathGeom` – re-export for callers. */
export { shortenToTip };

/** Mid-gutter X between execution panel right and learn panel left. */
export function getLearningLoopBusX(
  execPanelRight: number,
  learnPanelLeft: number
): number {
  return (execPanelRight + learnPanelLeft) / 2;
}

export interface LearningLoopUpdateBusGeom {
  busX: number;
  trunkPath: string;
  dropRules: { start: LearningLoopPoint; end: LearningLoopPoint };
  dropSkills: { start: LearningLoopPoint; end: LearningLoopPoint };
  tipRules: { tipX: number; tipY: number; dir: 'left' | 'right' };
  tipSkills: { tipX: number; tipY: number; dir: 'left' | 'right' };
  label: LearningLoopPoint;
}

/**
 * From update into vertical shaft at busX, then horizontal drops into rules/skills.
 * Tips are manual polygons; direction depends on whether bus is right or left of targets.
 */
export function getLearningLoopUpdateBusGeom(
  update: LearningLoopBoxLike,
  rules: LearningLoopBoxLike,
  skills: LearningLoopBoxLike,
  busX: number,
  tipGap: number = LEARNING_LOOP_POLYGON_TIP_GAP
): LearningLoopUpdateBusGeom {
  const updateCy = update.y + update.h / 2;
  const updateAnchor: LearningLoopPoint =
    busX >= update.x + update.w / 2
      ? { x: update.x + update.w, y: updateCy }
      : { x: update.x, y: updateCy };

  const rulesCy = rules.y + rules.h / 2;
  const skillsCy = skills.y + skills.h / 2;
  const tipH = LEARNING_LOOP_POLYGON_TIP_H;

  const rulesFromRight = busX >= rules.x + rules.w;
  const skillsFromRight = busX >= skills.x + skills.w;

  const rulesEdgeX = rulesFromRight ? rules.x + rules.w : rules.x;
  const skillsEdgeX = skillsFromRight ? skills.x + skills.w : skills.x;

  const rulesTipX = rulesFromRight ? rulesEdgeX + tipGap : rulesEdgeX - tipGap;
  const skillsTipX = skillsFromRight
    ? skillsEdgeX + tipGap
    : skillsEdgeX - tipGap;

  const rulesBaseX = rulesFromRight ? rulesTipX + tipH : rulesTipX - tipH;
  const skillsBaseX = skillsFromRight ? skillsTipX + tipH : skillsTipX - tipH;

  const trunkPath = [
    `M ${updateAnchor.x} ${updateAnchor.y}`,
    `L ${busX} ${updateAnchor.y}`,
    `L ${busX} ${Math.min(rulesCy, skillsCy)}`,
  ].join(' ');

  return {
    busX,
    trunkPath,
    dropRules: {
      start: { x: busX, y: rulesCy },
      end: { x: rulesBaseX, y: rulesCy },
    },
    dropSkills: {
      start: { x: busX, y: skillsCy },
      end: { x: skillsBaseX, y: skillsCy },
    },
    tipRules: {
      tipX: rulesTipX,
      tipY: rulesCy,
      dir: rulesFromRight ? 'left' : 'right',
    },
    tipSkills: {
      tipX: skillsTipX,
      tipY: skillsCy,
      dir: skillsFromRight ? 'left' : 'right',
    },
    label: {
      x: busX - (rulesFromRight ? 8 : -8),
      y: (rulesCy + skillsCy) / 2,
    },
  };
}

export function learningLoopLeftTipPoints(
  tipX: number,
  tipY: number,
  tipH: number = LEARNING_LOOP_POLYGON_TIP_H,
  tipW: number = LEARNING_LOOP_POLYGON_TIP_W
): string {
  const baseX = tipX + tipH;
  return `${tipX},${tipY} ${baseX},${tipY - tipW} ${baseX},${tipY + tipW}`;
}

export function learningLoopDownTipPoints(
  tipX: number,
  tipY: number,
  tipH: number = LEARNING_LOOP_POLYGON_TIP_H,
  tipW: number = LEARNING_LOOP_POLYGON_TIP_W
): string {
  return `${tipX - tipW},${tipY - tipH} ${tipX + tipW},${tipY - tipH} ${tipX},${tipY}`;
}

export function learningLoopUpTipPoints(
  tipX: number,
  tipY: number,
  tipH: number = LEARNING_LOOP_POLYGON_TIP_H,
  tipW: number = LEARNING_LOOP_POLYGON_TIP_W
): string {
  return `${tipX},${tipY} ${tipX - tipW},${tipY + tipH} ${tipX + tipW},${tipY + tipH}`;
}

export function learningLoopRightTipPoints(
  tipX: number,
  tipY: number,
  tipH: number = LEARNING_LOOP_POLYGON_TIP_H,
  tipW: number = LEARNING_LOOP_POLYGON_TIP_W
): string {
  return `${tipX},${tipY} ${tipX - tipH},${tipY - tipW} ${tipX - tipH},${tipY + tipW}`;
}

export function learningLoopTipPoints(
  dir: 'up' | 'down' | 'left' | 'right',
  tipX: number,
  tipY: number
): string {
  if (dir === 'left') return learningLoopLeftTipPoints(tipX, tipY);
  if (dir === 'right') return learningLoopRightTipPoints(tipX, tipY);
  if (dir === 'up') return learningLoopUpTipPoints(tipX, tipY);
  return learningLoopDownTipPoints(tipX, tipY);
}
