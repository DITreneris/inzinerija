import { describe, expect, it } from 'vitest';
import {
  getVerticalFlowConnector,
  MIN_VISIBLE_STEM,
  resolveVerticalFlowGeometry,
  VERTICAL_FLOW_MIN_GAP,
  verticalFlowStemLength,
} from '../verticalFlowGeometry';
import {
  buildVerticalColumnOrigin,
  verticalColumnMarginsEqual,
  visibleShaftMeetsFloor,
} from '../diagramLayoutMath';
import { DIAGRAM_TOKENS } from '../diagramTokens';

const config = {
  stepCount: 5,
  boxHeight: 46,
  gap: VERTICAL_FLOW_MIN_GAP,
  startY: 72,
  desktop: {
    viewBoxWidth: 520,
    viewBoxHeight: 480,
    colsX: 60,
    colsW: 400,
    cx: 260,
  },
  compact: {
    viewBoxWidth: 300,
    viewBoxHeight: 480,
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
    expect(layout.stepBoxes[1][1] - layout.stepBoxes[0][1]).toBe(70);
    expect(layout.stepBoxes[4]).toEqual([60, 352, 400, 46]);
  });

  it('switches frame and columns for compact diagrams', () => {
    const layout = resolveVerticalFlowGeometry(config, true);

    expect(layout.viewBoxWidth).toBe(300);
    expect(layout.viewBoxHeight).toBe(480);
    expect(layout.cx).toBe(150);
    expect(layout.stepBoxes[0]).toEqual([22, 72, 256, 46]);
  });
});

describe('verticalFlowStemLength', () => {
  it('meets SCHEME minimum stem for recommended gap', () => {
    expect(
      verticalFlowStemLength(VERTICAL_FLOW_MIN_GAP, 6)
    ).toBeGreaterThanOrEqual(MIN_VISIBLE_STEM);
  });

  it('documents legacy GAP=14 bug (stem too short)', () => {
    expect(verticalFlowStemLength(14, 6)).toBeLessThan(MIN_VISIBLE_STEM);
  });
});

describe('getVerticalFlowConnector', () => {
  it('returns edge-to-edge vertical line coordinates', () => {
    const from: [number, number, number, number] = [80, 74, 400, 46];
    const to: [number, number, number, number] = [80, 144, 400, 46];
    const conn = getVerticalFlowConnector(from, to, 280, 6);

    expect(conn).toEqual({
      x1: 280,
      y1: 120,
      x2: 280,
      y2: 138,
    });
    expect(conn.y2 - conn.y1).toBeGreaterThanOrEqual(MIN_VISIBLE_STEM);
  });
});

describe('M7 da_pipeline linear etalon (LMS promote)', () => {
  it('centers the column and keeps vertical shaft floor with local tip 10', () => {
    const origin = buildVerticalColumnOrigin({ viewBoxW: 600, colW: 440 });
    expect(origin.colsX).toBe(80);
    expect(verticalColumnMarginsEqual(origin.colsX, 440, 600)).toBe(true);
    expect(visibleShaftMeetsFloor(VERTICAL_FLOW_MIN_GAP, 10)).toBe(true);
    expect(DIAGRAM_TOKENS.stroke.flowStrong).toBeGreaterThanOrEqual(3.5);
  });
});
