import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import {
  centerAxisStart,
  equalBoxRowWidth,
  visibleShaftLen,
  visibleShaftMeetsFloor,
} from '../diagramLayoutMath';
import {
  feedbackUPath,
  horizontalRowBoxes,
  horizontalRowMarginsEqual,
} from '../cycleFeedbackGeometry';

describe('DIAGRAM_TOKENS LMS floors (DS promote)', () => {
  it('keeps inactive readable (no grey wash)', () => {
    expect(DIAGRAM_TOKENS.opacity.inactive).toBeGreaterThanOrEqual(0.85);
    expect(DIAGRAM_TOKENS.opacity.inactiveSoft).toBe(
      DIAGRAM_TOKENS.opacity.inactive
    );
  });

  it('uses thick process and feedback strokes', () => {
    expect(DIAGRAM_TOKENS.stroke.flow).toBeGreaterThanOrEqual(3.5);
    expect(DIAGRAM_TOKENS.stroke.flowStrong).toBeGreaterThanOrEqual(3.5);
    expect(DIAGRAM_TOKENS.stroke.feedback).toBeGreaterThanOrEqual(3.5);
  });

  it('uses caption-scale title and lighter edge labels', () => {
    expect(DIAGRAM_TOKENS.typography.title.desktop).toBe(17);
    expect(DIAGRAM_TOKENS.typography.titleWeight).toBe(700);
    expect(DIAGRAM_TOKENS.typography.edgeLabel.size).toBe(12);
    expect(DIAGRAM_TOKENS.typography.edgeLabel.weight).toBe(500);
  });

  it('keeps lmsCycle alias aligned with canonical floors', () => {
    const lms = DIAGRAM_TOKENS.lmsCycle;
    expect(lms.inactiveOpacity).toBe(DIAGRAM_TOKENS.opacity.inactive);
    expect(lms.forwardStroke).toBe(DIAGRAM_TOKENS.stroke.flow);
    expect(lms.feedbackStroke).toBe(DIAGRAM_TOKENS.stroke.feedback);
    expect(lms.titleSize).toBe(DIAGRAM_TOKENS.typography.title.desktop);
    expect(lms.titleWeight).toBe(DIAGRAM_TOKENS.typography.titleWeight);
  });
});

describe('diagramLayoutMath', () => {
  it('centers content with equal side margins', () => {
    expect(centerAxisStart(1100, 1068)).toBe(16);
    expect(centerAxisStart(640, 620)).toBe(10);
  });

  it('computes visible shaft and floor', () => {
    expect(visibleShaftLen(32, 6)).toBe(26);
    expect(visibleShaftMeetsFloor(20, 6)).toBe(true);
    expect(visibleShaftMeetsFloor(10, 6)).toBe(false);
  });

  it('computes equal-box row width', () => {
    expect(equalBoxRowWidth(5, 108, 20)).toBe(5 * 108 + 4 * 20);
  });
});

describe('cycleFeedbackGeometry (Type Etalon W1)', () => {
  it('builds centered horizontal rows with equal margins', () => {
    const boxes = horizontalRowBoxes({
      count: 5,
      boxW: 108,
      boxH: 72,
      gap: 20,
      viewBoxW: 640,
      rowY: 48,
    });
    expect(boxes).toHaveLength(5);
    expect(boxes[0].x).toBe(10);
    expect(horizontalRowMarginsEqual(boxes, 640)).toBe(true);
  });

  it('centers RlProcess-sized 4-box row in 920 viewBox', () => {
    const boxes = horizontalRowBoxes({
      count: 4,
      boxW: 180,
      boxH: 88,
      gap: 32,
      viewBoxW: 920,
      rowY: 62,
    });
    expect(boxes[0].x).toBe(52);
    expect(horizontalRowMarginsEqual(boxes, 920)).toBe(true);
  });

  it('builds unidirectional U feedback path', () => {
    const d = feedbackUPath({
      firstCx: 100,
      lastCx: 500,
      startY: 140,
      troughY: 200,
      tipY: 150,
      cornerR: 16,
    });
    expect(d).toContain('M 500 140');
    expect(d).toContain('L 100 150');
    expect(d).toMatch(/Q 500 200/);
  });
});
