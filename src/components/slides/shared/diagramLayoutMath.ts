/**
 * Shared diagram layout math (LMS 1A) – center rows/columns without copying box sizes.
 * @see docs/development/DIAGRAM_KIT_STANDARD.md
 */
import { DIAGRAM_TOKENS } from './diagramTokens';

/** Equal side margin: START = (viewBox − content) / 2 */
export function centerAxisStart(
  viewBoxSize: number,
  contentSize: number
): number {
  return Math.round((viewBoxSize - contentSize) / 2);
}

/**
 * Centered vertical column origin (Type Etalon Wave 2).
 * Prefer this over hand-coded colsX / cx on linear spines.
 */
export function buildVerticalColumnOrigin(opts: {
  viewBoxW: number;
  colW: number;
}): { colsX: number; cx: number } {
  const { viewBoxW, colW } = opts;
  return {
    colsX: centerAxisStart(viewBoxW, colW),
    cx: viewBoxW / 2,
  };
}

/** Equal left/right margins for a centered vertical column. */
export function verticalColumnMarginsEqual(
  colsX: number,
  colW: number,
  viewBoxW: number,
  tolerance = 1
): boolean {
  const right = viewBoxW - (colsX + colW);
  return Math.abs(colsX - right) <= tolerance;
}

/** Visible shaft length for a gap and arrow marker (horizontal or vertical). */
export function visibleShaftLen(gap: number, markerLen: number): number {
  return gap - markerLen;
}

export function visibleShaftMeetsFloor(
  gap: number,
  markerLen: number = DIAGRAM_TOKENS.arrow.markerLen,
  floor: number = DIAGRAM_TOKENS.verticalFlow.minStem
): boolean {
  return visibleShaftLen(gap, markerLen) >= floor;
}

/** Row width for equal boxes + equal gaps (horizontal process). */
export function equalBoxRowWidth(
  boxCount: number,
  boxW: number,
  gap: number
): number {
  if (boxCount <= 0) return 0;
  return boxCount * boxW + Math.max(0, boxCount - 1) * gap;
}
