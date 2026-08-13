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
  markerLen: number = DIAGRAM_TOKENS.arrow.processTipLen,
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

/** Axis-aligned box for pill ∩ stroke / pill ∩ pill tests (W7 / T05–T06). */
export type LayoutRect = { x: number; y: number; w: number; h: number };

export function rectsAabbIntersect(a: LayoutRect, b: LayoutRect): boolean {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

/** Treat an axis-aligned stroke as a thin rect (horizontal or vertical). */
export function strokeAabb(opts: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
}): LayoutRect {
  const minX = Math.min(opts.x1, opts.x2);
  const minY = Math.min(opts.y1, opts.y2);
  const maxX = Math.max(opts.x1, opts.x2);
  const maxY = Math.max(opts.y1, opts.y2);
  const hw = opts.strokeWidth / 2;
  return {
    x: minX - hw,
    y: minY - hw,
    w: maxX - minX + opts.strokeWidth,
    h: maxY - minY + opts.strokeWidth,
  };
}

export function pillIntersectsStroke(
  pill: LayoutRect,
  stroke: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    strokeWidth: number;
  }
): boolean {
  return rectsAabbIntersect(pill, strokeAabb(stroke));
}

/** Centered pill rect from an edge-label anchor (cx, cy). */
export function pillRectFromCenter(
  cx: number,
  cy: number,
  w: number,
  h: number
): LayoutRect {
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}
