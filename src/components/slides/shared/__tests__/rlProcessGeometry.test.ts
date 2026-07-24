import { describe, expect, it } from 'vitest';
import { visibleShaftLen, visibleShaftMeetsFloor } from '../diagramLayoutMath';
import {
  horizontalRowBoxes,
  horizontalRowMarginsEqual,
} from '../cycleFeedbackGeometry';
import { RL_PROCESS_GEOMETRY } from '../RlProcessDiagram';
import { DIAGRAM_TOKENS } from '../diagramTokens';

describe('RlProcess LMS polish geometry', () => {
  it('keeps caption clear of edge labels (title Y + air before row)', () => {
    expect(RL_PROCESS_GEOMETRY.viewBoxH).toBe(236);
    expect(RL_PROCESS_GEOMETRY.rowY).toBeGreaterThanOrEqual(58);
    const edgeLabelY = RL_PROCESS_GEOMETRY.rowY - 6;
    const titleBottomApprox =
      RL_PROCESS_GEOMETRY.diagramTitleY +
      DIAGRAM_TOKENS.typography.title.desktop * 0.35;
    expect(edgeLabelY - titleBottomApprox).toBeGreaterThanOrEqual(18);
  });

  it('uses GAP 32 + tip≥10 so forward shaft is visible vs stroke.flow', () => {
    expect(RL_PROCESS_GEOMETRY.gap).toBe(32);
    expect(RL_PROCESS_GEOMETRY.arrowMarkerLen).toBeGreaterThanOrEqual(10);
    expect(RL_PROCESS_GEOMETRY.arrowMarkerLen).toBeGreaterThanOrEqual(
      DIAGRAM_TOKENS.stroke.flow * 2
    );
    expect(
      visibleShaftMeetsFloor(
        RL_PROCESS_GEOMETRY.gap,
        RL_PROCESS_GEOMETRY.arrowMarkerLen
      )
    ).toBe(true);
    expect(
      visibleShaftLen(
        RL_PROCESS_GEOMETRY.gap,
        RL_PROCESS_GEOMETRY.arrowMarkerLen
      )
    ).toBe(22);
  });

  it('centers 4-box row (180×32) with equal margins', () => {
    const boxes = horizontalRowBoxes({
      count: 4,
      boxW: RL_PROCESS_GEOMETRY.boxW,
      boxH: RL_PROCESS_GEOMETRY.boxH,
      gap: RL_PROCESS_GEOMETRY.gap,
      viewBoxW: RL_PROCESS_GEOMETRY.viewBoxW,
      rowY: RL_PROCESS_GEOMETRY.rowY,
    });
    expect(RL_PROCESS_GEOMETRY.boxW).toBe(180);
    expect(boxes[0].x).toBe(52);
    expect(horizontalRowMarginsEqual(boxes, RL_PROCESS_GEOMETRY.viewBoxW)).toBe(
      true
    );
  });

  it('keeps node title/desc baseline gap ≥28', () => {
    expect(RL_PROCESS_GEOMETRY.nodeTextGap).toBeGreaterThanOrEqual(28);
  });

  it('keeps feedback trough + label inside desktop viewBox', () => {
    const boxBottom = RL_PROCESS_GEOMETRY.rowY + RL_PROCESS_GEOMETRY.boxH;
    const troughY = boxBottom + RL_PROCESS_GEOMETRY.fbTroughOffset;
    const labelY = troughY + 14;
    expect(labelY).toBeLessThan(RL_PROCESS_GEOMETRY.viewBoxH);
  });
});
