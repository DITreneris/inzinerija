import type { M15PracticePath } from './m15PracticeLoopContent';

export const M15_PRACTICE_LOOP_LAYOUT = {
  viewBoxWidth: 620,
  viewBoxHeight: 240,
  boxHeight: 38,
  activeY: 72,
  quickSteps: [
    { x: 76, w: 74 },
    { x: 172, w: 88 },
    { x: 282, w: 88 },
    { x: 392, w: 88 },
    { x: 502, w: 76 },
  ],
  fullSteps: [
    { x: 110, w: 82 },
    { x: 225, w: 82 },
    { x: 340, w: 82 },
    { x: 455, w: 70 },
    { x: 545, w: 58 },
  ],
  accentIndex: 3,
} as const;

export function getM15PracticeLoopStepBoxes(path: M15PracticePath) {
  return path === 'quick'
    ? M15_PRACTICE_LOOP_LAYOUT.quickSteps
    : M15_PRACTICE_LOOP_LAYOUT.fullSteps;
}

export function getM15PracticeLoopHorizontalConnector(
  from: { x: number; w: number },
  to: { x: number },
  y: number,
  markerLen: number
) {
  return {
    x1: from.x + from.w,
    y1: y,
    x2: to.x - markerLen,
    y2: y,
  };
}

export function getM15PracticeLoopFeedbackPath(markerLen: number): string {
  const steps = M15_PRACTICE_LOOP_LAYOUT.quickSteps;
  const from = steps[4];
  const to = steps[2];
  const topY =
    M15_PRACTICE_LOOP_LAYOUT.activeY + M15_PRACTICE_LOOP_LAYOUT.boxHeight;
  const loopY = topY + 36;
  const startX = from.x + from.w / 2;
  const endX = to.x + markerLen;
  const firstControlX = startX + 36;
  const secondControlX = to.x + to.w / 2;

  return `M ${startX} ${topY} Q ${firstControlX} ${loopY} ${from.x - 32} ${loopY} Q ${secondControlX} ${loopY} ${endX} ${topY}`;
}
