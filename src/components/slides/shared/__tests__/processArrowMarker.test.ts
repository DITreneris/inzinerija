import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import {
  getProcessArrowMarkerGeom,
  processArrowEndInset,
  processArrowTipH,
  processArrowTipLen,
} from '../processArrowMarker';

describe('processArrowMarker DS contract', () => {
  it('keeps processTipLen ≥10 and above legacy markerLen', () => {
    expect(DIAGRAM_TOKENS.arrow.processTipLen).toBeGreaterThanOrEqual(10);
    expect(DIAGRAM_TOKENS.arrow.processTipLen).toBeGreaterThan(
      DIAGRAM_TOKENS.arrow.markerLen
    );
    expect(processArrowTipLen()).toBe(DIAGRAM_TOKENS.arrow.processTipLen);
  });

  it('builds marker geom with refX=0 and tip past line end', () => {
    const g = getProcessArrowMarkerGeom();
    expect(g.refX).toBe(0);
    expect(g.tipH).toBe(processArrowTipH());
    expect(g.tipH).toBeCloseTo(g.tipLen * 0.9);
    expect(g.markerWidth).toBe(g.tipLen);
    expect(g.markerHeight).toBe(g.tipH);
    expect(g.refY).toBe(g.tipH / 2);
    expect(g.pathD).toContain(`L${g.tipLen}`);
    expect(g.markerUnits).toBe(DIAGRAM_TOKENS.arrow.markerUnits);
    expect(processArrowEndInset()).toBe(g.tipLen);
  });
});
