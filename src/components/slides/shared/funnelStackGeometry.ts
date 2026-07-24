/**
 * Funnel / stack type helpers (LMS Type Etalon Wave 3).
 * Share math – never copy AgentWorkflow / da_pipeline BOX sizes.
 * Stack GAP etalon = 18 (no connectors; do not force VERTICAL_FLOW_MIN_GAP 24).
 * @see docs/development/LMS_DIAGRAM_POLISH_10_2.md §funnel/stack
 */
import {
  centerAxisStart,
  verticalColumnMarginsEqual,
} from './diagramLayoutMath';

export interface FunnelStackRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Linear taper of stage widths (top → bottom). */
export function funnelStageWidths(opts: {
  count: number;
  topW: number;
  bottomW: number;
}): number[] {
  const { count, topW, bottomW } = opts;
  if (count <= 0) return [];
  if (count === 1) return [topW];
  return Array.from({ length: count }, (_, i) =>
    Math.round(topW + ((bottomW - topW) * i) / (count - 1))
  );
}

/** Centered funnel stage rects (narrowing widths, fixed Y rhythm). */
export function funnelStageRects(opts: {
  viewBoxW: number;
  widths: number[];
  boxH: number;
  startY: number;
  /** Gap between box bottom and next box top */
  gapY: number;
}): FunnelStackRect[] {
  const { viewBoxW, widths, boxH, startY, gapY } = opts;
  return widths.map((w, i) => ({
    x: centerAxisStart(viewBoxW, w),
    y: startY + (boxH + gapY) * i,
    w,
    h: boxH,
  }));
}

/** Equal-width centered stack column. */
export function stackColumnRects(opts: {
  viewBoxW: number;
  boxW: number;
  boxH: number;
  count: number;
  startY: number;
  gap: number;
}): FunnelStackRect[] {
  const { viewBoxW, boxW, boxH, count, startY, gap } = opts;
  const x = centerAxisStart(viewBoxW, boxW);
  return Array.from({ length: count }, (_, i) => ({
    x,
    y: startY + (boxH + gap) * i,
    w: boxW,
    h: boxH,
  }));
}

/** True when each width is strictly smaller than the previous. */
export function funnelWidthsNarrowing(widths: number[]): boolean {
  if (widths.length < 2) return widths.length === 1;
  for (let i = 1; i < widths.length; i++) {
    if (!(widths[i] < widths[i - 1])) return false;
  }
  return true;
}

/** Equal L/R margins for the widest funnel stage (or any stack column). */
export function funnelStackMarginsEqual(
  rect: Pick<FunnelStackRect, 'x' | 'w'>,
  viewBoxW: number,
  tolerance = 1
): boolean {
  return verticalColumnMarginsEqual(rect.x, rect.w, viewBoxW, tolerance);
}

/** Etalon stack gap (no shafts) – not VERTICAL_FLOW_MIN_GAP. */
export const FUNNEL_STACK_ETALON_GAP = 18;
