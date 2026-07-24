/**
 * Cycle-feedback type helpers (LMS Type Etalon Wave 1).
 * Share math – never copy AgentWorkflow BOX / viewBox sizes into other cycles.
 * @see docs/development/LMS_DIAGRAM_POLISH_10_2.md §cycle-feedback
 */
import { centerAxisStart, equalBoxRowWidth } from './diagramLayoutMath';

export interface HorizontalRowBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Centered horizontal spine of equal boxes (AgentWorkflow / DataStory / RlProcess). */
export function horizontalRowBoxes(opts: {
  count: number;
  boxW: number;
  boxH: number;
  gap: number;
  viewBoxW: number;
  rowY: number;
}): HorizontalRowBox[] {
  const { count, boxW, boxH, gap, viewBoxW, rowY } = opts;
  const rowW = equalBoxRowWidth(count, boxW, gap);
  const startX = centerAxisStart(viewBoxW, rowW);
  return Array.from({ length: count }, (_, i) => ({
    x: startX + (boxW + gap) * i,
    y: rowY,
    w: boxW,
    h: boxH,
  }));
}

/**
 * Unidirectional U feedback path: last box down → trough → tip up into first.
 * Diagrams own Y offsets; this only builds the SVG `d` string.
 */
export function feedbackUPath(opts: {
  firstCx: number;
  lastCx: number;
  /** Y under last box where the path starts */
  startY: number;
  /** Bottom trough Y of the U */
  troughY: number;
  /** Tip Y into the first (loop-start) box */
  tipY: number;
  cornerR: number;
}): string {
  const { firstCx, lastCx, startY, troughY, tipY, cornerR: R } = opts;
  return `M ${lastCx} ${startY}
       L ${lastCx} ${troughY - R}
       Q ${lastCx} ${troughY}, ${lastCx - R} ${troughY}
       L ${firstCx + R} ${troughY}
       Q ${firstCx} ${troughY}, ${firstCx} ${troughY - R}
       L ${firstCx} ${tipY}`;
}

/**
 * Inter-row feedback (2-row diagrams, e.g. LLM autoregressive):
 * fromCx down → trough → across → tipY **down** into the lower row target.
 * Not the same as feedbackUPath (that turns tip **up** into the first box).
 * Assumes tipY > troughY (path ends below the trough).
 */
export function feedbackInterRowPath(opts: {
  fromCx: number;
  toCx: number;
  /** Y under source box where the path starts */
  startY: number;
  /** Horizontal trough Y (between rows) */
  troughY: number;
  /** Tip Y above the target box (path ends going down) */
  tipY: number;
  cornerR: number;
}): string {
  const { fromCx, toCx, startY, troughY, tipY, cornerR: R } = opts;
  const goingLeft = fromCx >= toCx;
  const hSign = goingLeft ? -1 : 1;
  return `M ${fromCx} ${startY}
       L ${fromCx} ${troughY - R}
       Q ${fromCx} ${troughY}, ${fromCx + hSign * R} ${troughY}
       L ${toCx - hSign * R} ${troughY}
       Q ${toCx} ${troughY}, ${toCx} ${troughY + R}
       L ${toCx} ${tipY}`;
}

/** Equal left/right margins for a horizontal row inside viewBox. */
export function horizontalRowMarginsEqual(
  boxes: HorizontalRowBox[],
  viewBoxW: number,
  tolerance = 1
): boolean {
  if (boxes.length === 0) return false;
  const left = boxes[0].x;
  const last = boxes[boxes.length - 1];
  const right = viewBoxW - (last.x + last.w);
  return Math.abs(left - right) <= tolerance;
}
