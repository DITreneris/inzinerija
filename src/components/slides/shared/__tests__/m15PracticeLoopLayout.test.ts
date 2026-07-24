import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import {
  getM15PracticeLoopHorizontalConnector,
  getM15PracticeLoopStepBoxes,
  M15_PRACTICE_LOOP_LAYOUT,
} from '../m15PracticeLoopLayout';

describe('m15PracticeLoopLayout', () => {
  it('exposes five boxes for quick and full paths', () => {
    expect(getM15PracticeLoopStepBoxes('quick')).toHaveLength(5);
    expect(getM15PracticeLoopStepBoxes('full')).toHaveLength(5);
    expect(M15_PRACTICE_LOOP_LAYOUT.quickSteps).toHaveLength(5);
    expect(M15_PRACTICE_LOOP_LAYOUT.fullSteps).toHaveLength(5);
  });

  it('builds forward connectors with x1 < x2', () => {
    const boxes = getM15PracticeLoopStepBoxes('quick');
    for (let i = 0; i < boxes.length - 1; i++) {
      const conn = getM15PracticeLoopHorizontalConnector(
        boxes[i],
        boxes[i + 1],
        M15_PRACTICE_LOOP_LAYOUT.activeY +
          M15_PRACTICE_LOOP_LAYOUT.boxHeight / 2,
        DIAGRAM_TOKENS.arrow.processTipLen
      );
      expect(conn.x1).toBeLessThan(conn.x2);
      expect(conn.y1).toBe(conn.y2);
    }
  });
});
