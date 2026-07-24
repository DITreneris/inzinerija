/**
 * M10 3A strategy – horizontal 100% stacked bar (80 / 15 / 5)
 * + vertical legend under the bar (3 rows).
 * Comparison singleton layout (not W3 funnelStack / portal bars).
 */
import { centerAxisStart } from './diagramLayoutMath';

export const THREE_A_SHARES = [0.8, 0.15, 0.05] as const;

/** Min vertical gap between legend row baselines (center-to-center). */
export const THREE_A_LEGEND_MIN_ROW_GAP = 22;

export const M10_THREE_A_LAYOUT = {
  viewBoxW: 600,
  viewBoxH: 232,
  padX: 24,
  barY: 28,
  barH: 56,
  /** Gap from bar bottom to first legend baseline. */
  legendGapY: 28,
  legendRowH: 28,
  legendStartY: 28 + 56 + 28, // barY + barH + legendGapY
  /** Min hit width for touch (5% visual may be narrower). */
  minHitW: 44,
} as const;

export type ThreeARect = { x: number; y: number; w: number; h: number };

export type ThreeALegendItem = {
  /** Left edge of legend row (aligned to track + inset) */
  x: number;
  y: number;
  toneIndex: number;
};

export function threeATrackW(): number {
  return M10_THREE_A_LAYOUT.viewBoxW - M10_THREE_A_LAYOUT.padX * 2;
}

export function threeATrackX(): number {
  return centerAxisStart(M10_THREE_A_LAYOUT.viewBoxW, threeATrackW());
}

/** Segment widths; last absorbs rounding so sum === trackW. */
export function threeASegmentWidths(): number[] {
  const track = threeATrackW();
  const widths = THREE_A_SHARES.map((s) => Math.round(s * track));
  const sumExceptLast = widths.slice(0, -1).reduce((acc, w) => acc + w, 0);
  widths[widths.length - 1] = track - sumExceptLast;
  return widths;
}

/** Horizontal stacked segments on one Y. */
export function getThreeASegmentRects(): ThreeARect[] {
  const { barY, barH } = M10_THREE_A_LAYOUT;
  const widths = threeASegmentWidths();
  let x = threeATrackX();
  return widths.map((w) => {
    const rect = { x, y: barY, w, h: barH };
    x += w;
    return rect;
  });
}

/**
 * Vertical legend: same X (track left + inset), Y = legendStartY + i * legendRowH.
 * Not placed on 5% segment center (horizontal collision model retired).
 */
export function getThreeALegendItems(): ThreeALegendItem[] {
  const { legendStartY, legendRowH } = M10_THREE_A_LAYOUT;
  const trackX = threeATrackX();
  const inset = 8;
  const count = THREE_A_SHARES.length;
  return Array.from({ length: count }, (_, i) => ({
    x: trackX + inset,
    y: legendStartY + i * legendRowH,
    toneIndex: i,
  }));
}

/**
 * Hit targets for each segment; width ≥ minHitW, centered on segment.
 * Clamped so hits stay inside the track.
 */
export function getThreeAHitRects(): ThreeARect[] {
  const { barY, barH, minHitW } = M10_THREE_A_LAYOUT;
  const trackX = threeATrackX();
  const trackW = threeATrackW();
  const trackRight = trackX + trackW;

  return getThreeASegmentRects().map((seg) => {
    const w = Math.max(seg.w, minHitW);
    let x = seg.x + seg.w / 2 - w / 2;
    if (x < trackX) x = trackX;
    if (x + w > trackRight) x = trackRight - w;
    return { x, y: barY, w, h: barH };
  });
}

/** True when widths match shares within relative tolerance. */
export function threeASegmentWidthsMatchShares(
  widths: number[],
  tolerance = 0.02
): boolean {
  if (widths.length !== THREE_A_SHARES.length) return false;
  const total = widths.reduce((a, b) => a + b, 0);
  if (total <= 0) return false;
  return widths.every((w, i) => {
    const expected = THREE_A_SHARES[i] * total;
    return Math.abs(w - expected) / total <= tolerance;
  });
}
