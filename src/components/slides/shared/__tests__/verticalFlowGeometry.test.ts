import { describe, expect, it } from 'vitest';
import { resolveVerticalFlowGeometry } from '../verticalFlowGeometry';

const config = {
  stepCount: 5,
  boxHeight: 46,
  gap: 14,
  startY: 72,
  desktop: {
    viewBoxWidth: 520,
    viewBoxHeight: 430,
    colsX: 60,
    colsW: 400,
    cx: 260,
  },
  compact: {
    viewBoxWidth: 300,
    viewBoxHeight: 430,
    colsX: 22,
    colsW: 256,
    cx: 150,
  },
};

describe('resolveVerticalFlowGeometry', () => {
  it('creates one box per step with a consistent vertical rhythm', () => {
    const layout = resolveVerticalFlowGeometry(config, false);

    expect(layout.stepBoxes).toHaveLength(5);
    expect(layout.stepBoxes[0]).toEqual([60, 72, 400, 46]);
    expect(layout.stepBoxes[1][1] - layout.stepBoxes[0][1]).toBe(60);
    expect(layout.stepBoxes[4]).toEqual([60, 312, 400, 46]);
  });

  it('switches frame and columns for compact diagrams', () => {
    const layout = resolveVerticalFlowGeometry(config, true);

    expect(layout.viewBoxWidth).toBe(300);
    expect(layout.viewBoxHeight).toBe(430);
    expect(layout.cx).toBe(150);
    expect(layout.stepBoxes[0]).toEqual([22, 72, 256, 46]);
  });
});
