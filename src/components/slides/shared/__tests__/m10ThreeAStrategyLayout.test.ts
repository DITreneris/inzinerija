import { describe, expect, it } from 'vitest';
import {
  getThreeAHitRects,
  getThreeALegendItems,
  getThreeASegmentRects,
  M10_THREE_A_LAYOUT,
  THREE_A_LEGEND_MIN_ROW_GAP,
  threeASegmentWidths,
  threeASegmentWidthsMatchShares,
  threeATrackW,
  THREE_A_SHARES,
} from '../m10ThreeAStrategyLayout';

describe('m10ThreeAStrategyLayout (horizontal 100% bar)', () => {
  it('builds three proportional segment widths ≈ 80∶15∶5', () => {
    const widths = threeASegmentWidths();
    expect(widths).toHaveLength(3);
    expect(widths.reduce((a, b) => a + b, 0)).toBe(threeATrackW());
    expect(threeASegmentWidthsMatchShares(widths)).toBe(true);
    expect(widths[0]).toBeGreaterThan(widths[1]);
    expect(widths[1]).toBeGreaterThan(widths[2]);
    expect(widths[0] / widths[2]).toBeCloseTo(
      THREE_A_SHARES[0] / THREE_A_SHARES[2],
      0
    );
  });

  it('keeps segments on one row and hit targets ≥ minHitW', () => {
    const { barY, barH, minHitW, viewBoxW } = M10_THREE_A_LAYOUT;
    const segs = getThreeASegmentRects();
    const hits = getThreeAHitRects();

    expect(segs).toHaveLength(3);
    expect(hits).toHaveLength(3);

    for (let i = 0; i < segs.length; i++) {
      expect(segs[i].y).toBe(barY);
      expect(segs[i].h).toBe(barH);
      expect(segs[i].x + segs[i].w).toBeLessThanOrEqual(viewBoxW);
      expect(hits[i].w).toBeGreaterThanOrEqual(minHitW);
      expect(hits[i].h).toBe(barH);
    }

    for (let i = 0; i < segs.length - 1; i++) {
      expect(segs[i + 1].x).toBe(segs[i].x + segs[i].w);
    }
  });

  it('stacks legend rows vertically under the bar (not on 5% center)', () => {
    const segs = getThreeASegmentRects();
    const legend = getThreeALegendItems();
    const { legendStartY, legendRowH, viewBoxH, barY, barH } =
      M10_THREE_A_LAYOUT;

    expect(legend).toHaveLength(3);
    expect(viewBoxH).toBeGreaterThanOrEqual(220);

    for (let i = 0; i < legend.length; i++) {
      expect(legend[i].y).toBe(legendStartY + i * legendRowH);
      expect(legend[i].y).toBeGreaterThan(barY + barH);
      expect(legend[i].y).toBeLessThanOrEqual(viewBoxH);
    }

    for (let i = 0; i < legend.length - 1; i++) {
      expect(legend[i + 1].y - legend[i].y).toBeGreaterThanOrEqual(
        THREE_A_LEGEND_MIN_ROW_GAP
      );
      // Same column (vertical stack), not horizontal slots
      expect(legend[i + 1].x).toBe(legend[i].x);
    }

    // Legend X must not sit on the 5% segment midpoint
    const lastSegCx = segs[2].x + segs[2].w / 2;
    expect(Math.abs(legend[2].x - lastSegCx)).toBeGreaterThan(20);
  });
});
