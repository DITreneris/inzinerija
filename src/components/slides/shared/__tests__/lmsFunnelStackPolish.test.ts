import { describe, expect, it } from 'vitest';
import {
  FUNNEL_STACK_ETALON_GAP,
  funnelStackMarginsEqual,
  funnelStageRects,
  funnelStageWidths,
  funnelWidthsNarrowing,
  stackColumnRects,
} from '../funnelStackGeometry';
import { DIAGRAM_TOKENS } from '../diagramTokens';

describe('lmsFunnelStackPolish (Type Etalon W3)', () => {
  it('tapers AEC funnel widths 300 → 220 → 140 and centers stages', () => {
    const widths = funnelStageWidths({ count: 3, topW: 300, bottomW: 140 });
    expect(widths).toEqual([300, 220, 140]);
    expect(funnelWidthsNarrowing(widths)).toBe(true);

    const rects = funnelStageRects({
      viewBoxW: 360,
      widths,
      boxH: 58,
      startY: 44,
      gapY: 16,
    });
    expect(rects.map((r) => r.y)).toEqual([44, 118, 192]);
    expect(rects[0]).toMatchObject({ x: 30, w: 300, h: 58 });
    expect(rects[1]).toMatchObject({ x: 70, w: 220 });
    expect(rects[2]).toMatchObject({ x: 110, w: 140 });
    expect(funnelStackMarginsEqual(rects[0], 360)).toBe(true);
  });

  it('centers prompt stack column with etalon GAP 18', () => {
    expect(FUNNEL_STACK_ETALON_GAP).toBe(18);
    const rects = stackColumnRects({
      viewBoxW: 320,
      boxW: 260,
      boxH: 60,
      count: 3,
      startY: 44,
      gap: FUNNEL_STACK_ETALON_GAP,
    });
    expect(rects[0]).toMatchObject({ x: 30, y: 44, w: 260, h: 60 });
    expect(rects[1].y).toBe(122);
    expect(rects[2].y).toBe(200);
    expect(funnelStackMarginsEqual(rects[0], 320)).toBe(true);
  });

  it('keeps LMS caption and inactive floors', () => {
    expect(DIAGRAM_TOKENS.opacity.inactive).toBeGreaterThanOrEqual(0.85);
    expect(DIAGRAM_TOKENS.typography.titleWeight).toBe(700);
    expect(DIAGRAM_TOKENS.typography.title.desktop).toBe(17);
  });
});
