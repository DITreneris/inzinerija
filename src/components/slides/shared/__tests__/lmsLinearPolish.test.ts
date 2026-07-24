import { describe, expect, it } from 'vitest';
import {
  buildVerticalColumnOrigin,
  verticalColumnMarginsEqual,
  visibleShaftMeetsFloor,
} from '../diagramLayoutMath';
import { VERTICAL_FLOW_MIN_GAP } from '../verticalFlowGeometry';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { M7_DA_PIPELINE_GEOMETRY } from '../M7DaPipelineDiagram';
import { M7_DATA_PREP_GEOMETRY } from '../M7DataPrepWorkflowDiagram';

describe('lmsLinearPolish (Type Etalon W2)', () => {
  it('centers da_pipeline desktop and compact columns', () => {
    const desktop = buildVerticalColumnOrigin({
      viewBoxW: M7_DA_PIPELINE_GEOMETRY.desktop.viewBoxW,
      colW: M7_DA_PIPELINE_GEOMETRY.desktop.colW,
    });
    const compact = buildVerticalColumnOrigin({
      viewBoxW: M7_DA_PIPELINE_GEOMETRY.compact.viewBoxW,
      colW: M7_DA_PIPELINE_GEOMETRY.compact.colW,
    });
    expect(desktop.colsX).toBe(80);
    expect(desktop.cx).toBe(300);
    expect(compact.colsX).toBe(30);
    expect(compact.cx).toBe(170);
    expect(
      verticalColumnMarginsEqual(
        desktop.colsX,
        M7_DA_PIPELINE_GEOMETRY.desktop.colW,
        M7_DA_PIPELINE_GEOMETRY.desktop.viewBoxW
      )
    ).toBe(true);
    expect(
      verticalColumnMarginsEqual(
        compact.colsX,
        M7_DA_PIPELINE_GEOMETRY.compact.colW,
        M7_DA_PIPELINE_GEOMETRY.compact.viewBoxW
      )
    ).toBe(true);
  });

  it('centers DataPrep frames with W2 1A sizes', () => {
    const desktop = buildVerticalColumnOrigin({
      viewBoxW: M7_DATA_PREP_GEOMETRY.desktop.viewBoxW,
      colW: M7_DATA_PREP_GEOMETRY.desktop.colW,
    });
    const compact = buildVerticalColumnOrigin({
      viewBoxW: M7_DATA_PREP_GEOMETRY.compact.viewBoxW,
      colW: M7_DATA_PREP_GEOMETRY.compact.colW,
    });
    expect(desktop.colsX).toBe(80);
    expect(desktop.cx).toBe(300);
    expect(compact.colsX).toBe(30);
    expect(compact.cx).toBe(170);
    expect(
      verticalColumnMarginsEqual(
        desktop.colsX,
        M7_DATA_PREP_GEOMETRY.desktop.colW,
        M7_DATA_PREP_GEOMETRY.desktop.viewBoxW
      )
    ).toBe(true);
    expect(
      verticalColumnMarginsEqual(
        compact.colsX,
        M7_DATA_PREP_GEOMETRY.compact.colW,
        M7_DATA_PREP_GEOMETRY.compact.viewBoxW
      )
    ).toBe(true);
  });

  it('keeps DataPrep shaft floor with local tip 10 and fit', () => {
    expect(M7_DATA_PREP_GEOMETRY.startY).toBe(44);
    expect(M7_DATA_PREP_GEOMETRY.viewBoxH).toBe(448);
    expect(M7_DATA_PREP_GEOMETRY.boxH).toBeGreaterThanOrEqual(56);
    expect(M7_DATA_PREP_GEOMETRY.arrowTip).toBeGreaterThanOrEqual(10);
    expect(M7_DATA_PREP_GEOMETRY.stepCount).toBe(5);
    const lastBottom =
      M7_DATA_PREP_GEOMETRY.startY +
      M7_DATA_PREP_GEOMETRY.stepCount * M7_DATA_PREP_GEOMETRY.boxH +
      (M7_DATA_PREP_GEOMETRY.stepCount - 1) * M7_DATA_PREP_GEOMETRY.gap;
    expect(lastBottom).toBeLessThanOrEqual(M7_DATA_PREP_GEOMETRY.viewBoxH);
    expect(
      visibleShaftMeetsFloor(
        M7_DATA_PREP_GEOMETRY.gap,
        M7_DATA_PREP_GEOMETRY.arrowTip
      )
    ).toBe(true);
    expect(M7_DATA_PREP_GEOMETRY.stepLabel.desktop).toBeGreaterThanOrEqual(15);
    expect(M7_DATA_PREP_GEOMETRY.stepSub.desktop).toBeGreaterThanOrEqual(12);
  });

  it('keeps vertical shaft floor with local tip 10 and LMS caption tokens', () => {
    expect(M7_DA_PIPELINE_GEOMETRY.startY).toBe(44);
    expect(M7_DA_PIPELINE_GEOMETRY.viewBoxH).toBe(520);
    expect(M7_DA_PIPELINE_GEOMETRY.boxH).toBeGreaterThanOrEqual(56);
    expect(M7_DA_PIPELINE_GEOMETRY.arrowTip).toBeGreaterThanOrEqual(10);
    expect(
      visibleShaftMeetsFloor(
        M7_DA_PIPELINE_GEOMETRY.gap,
        M7_DA_PIPELINE_GEOMETRY.arrowTip
      )
    ).toBe(true);
    expect(
      visibleShaftMeetsFloor(
        VERTICAL_FLOW_MIN_GAP,
        DIAGRAM_TOKENS.arrow.markerLen
      )
    ).toBe(true);
    expect(DIAGRAM_TOKENS.stroke.flowStrong).toBeGreaterThanOrEqual(3.5);
    expect(DIAGRAM_TOKENS.typography.titleWeight).toBe(700);
    expect(DIAGRAM_TOKENS.typography.title.desktop).toBe(17);
    expect(M7_DA_PIPELINE_GEOMETRY.stepLabel.desktop).toBeGreaterThanOrEqual(
      15
    );
    expect(M7_DA_PIPELINE_GEOMETRY.stepSub.desktop).toBeGreaterThanOrEqual(12);
  });
});
