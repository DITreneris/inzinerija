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

export interface FunnelStageTrapezoid {
  /** SVG path `d` for the stage trapezoid */
  d: string;
  /** Inset ring path (fill=none focus), or null if stage too small */
  ringD: string | null;
  upperW: number;
  lowerW: number;
  /** Axis-aligned hit box (max width × boxH, centered) */
  hit: FunnelStackRect;
  /** Vertical center of the stage (label baseline target) */
  labelY: number;
  /** Top-left of stage (for separators / outline) */
  y: number;
  topX: number;
  botX: number;
}

function trapezoidPath(
  topX: number,
  y: number,
  upperW: number,
  botX: number,
  lowerW: number,
  boxH: number
): string {
  return [
    `M ${topX} ${y}`,
    `L ${topX + upperW} ${y}`,
    `L ${botX + lowerW} ${y + boxH}`,
    `L ${botX} ${y + boxH}`,
    'Z',
  ].join(' ');
}

/**
 * Recharts-style funnel trapezoids: stage i upper = widths[i], lower = widths[i+1]
 * (last stage necks via neckRatio). Gaps preserved between stages.
 */
export function funnelStageTrapezoids(opts: {
  viewBoxW: number;
  widths: number[];
  boxH: number;
  startY: number;
  gapY: number;
  /** Last stage lowerW = round(lastWidth * neckRatio). Default 0.78. */
  neckRatio?: number;
  /** Inset for active focus ring (px). Default 3. */
  ringInset?: number;
}): FunnelStageTrapezoid[] {
  const {
    viewBoxW,
    widths,
    boxH,
    startY,
    gapY,
    neckRatio = 0.78,
    ringInset = 3,
  } = opts;
  const n = widths.length;
  return widths.map((upperW, i) => {
    const lowerW =
      i < n - 1 ? widths[i + 1] : Math.max(1, Math.round(upperW * neckRatio));
    const y = startY + (boxH + gapY) * i;
    const topX = centerAxisStart(viewBoxW, upperW);
    const botX = centerAxisStart(viewBoxW, lowerW);
    const d = trapezoidPath(topX, y, upperW, botX, lowerW, boxH);

    const minW = Math.min(upperW, lowerW);
    let ringD: string | null = null;
    if (minW > ringInset * 4 && boxH > ringInset * 4) {
      const u = upperW - ringInset * 2;
      const l = lowerW - ringInset * 2;
      ringD = trapezoidPath(
        centerAxisStart(viewBoxW, u),
        y + ringInset,
        u,
        centerAxisStart(viewBoxW, l),
        l,
        boxH - ringInset * 2
      );
    }

    const hitW = Math.max(upperW, lowerW);
    return {
      d,
      ringD,
      upperW,
      lowerW,
      hit: {
        x: centerAxisStart(viewBoxW, hitW),
        y,
        w: hitW,
        h: boxH,
      },
      labelY: y + boxH / 2,
      y,
      topX,
      botX,
    };
  });
}

/** Hairline y positions between stages when gapY === 0 (shared edges). */
export function funnelHairlineYs(opts: {
  count: number;
  boxH: number;
  startY: number;
  gapY: number;
}): number[] {
  const { count, boxH, startY, gapY } = opts;
  if (gapY !== 0 || count < 2) return [];
  return Array.from({ length: count - 1 }, (_, i) => startY + boxH * (i + 1));
}

/** Outer funnel outline path through all stage corners (continuous silhouette). */
export function funnelOuterOutlinePath(
  stages: Pick<
    FunnelStageTrapezoid,
    'topX' | 'botX' | 'upperW' | 'lowerW' | 'y' | 'hit'
  >[]
): string | null {
  if (stages.length === 0) return null;
  const first = stages[0];
  const last = stages[stages.length - 1];
  const bottomY = last.y + last.hit.h;
  const parts: string[] = [
    `M ${first.topX} ${first.y}`,
    `L ${first.topX + first.upperW} ${first.y}`,
  ];
  for (let i = 1; i < stages.length; i++) {
    const s = stages[i];
    parts.push(`L ${s.topX + s.upperW} ${s.y}`);
  }
  parts.push(`L ${last.botX + last.lowerW} ${bottomY}`);
  parts.push(`L ${last.botX} ${bottomY}`);
  for (let i = stages.length - 2; i >= 0; i--) {
    const s = stages[i];
    parts.push(`L ${s.botX} ${s.y + s.hit.h}`);
  }
  parts.push('Z');
  return parts.join(' ');
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
