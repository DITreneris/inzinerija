import { describe, expect, it } from 'vitest';
import {
  pillIntersectsStroke,
  pillRectFromCenter,
  rectsAabbIntersect,
} from '../diagramLayoutMath';

describe('diagramLayoutMath AABB (Wave 1 helper)', () => {
  it('detects overlapping rects', () => {
    expect(
      rectsAabbIntersect(
        { x: 0, y: 0, w: 10, h: 10 },
        { x: 5, y: 5, w: 10, h: 10 }
      )
    ).toBe(true);
  });

  it('detects non-overlapping rects', () => {
    expect(
      rectsAabbIntersect(
        { x: 0, y: 0, w: 10, h: 10 },
        { x: 20, y: 0, w: 10, h: 10 }
      )
    ).toBe(false);
  });

  it('treats a vertical stroke as a thin rect that a on-shaft pill hits', () => {
    const pill = pillRectFromCenter(100, 40, 48, 16);
    expect(
      pillIntersectsStroke(pill, {
        x1: 100,
        y1: 0,
        x2: 100,
        y2: 80,
        strokeWidth: 2,
      })
    ).toBe(true);
  });

  it('clears when the pill sits 8px off a vertical shaft', () => {
    const pill = pillRectFromCenter(100 + 24 + 8, 40, 48, 16);
    expect(
      pillIntersectsStroke(pill, {
        x1: 100,
        y1: 0,
        x2: 100,
        y2: 80,
        strokeWidth: 2,
      })
    ).toBe(false);
  });
});
