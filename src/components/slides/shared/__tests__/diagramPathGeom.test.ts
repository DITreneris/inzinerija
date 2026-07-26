import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { DIAGRAM_PROCESS_TIP_LEN, shortenToTip } from '../diagramPathGeom';

describe('diagramPathGeom', () => {
  it('exports process tip len from DIAGRAM_TOKENS', () => {
    expect(DIAGRAM_PROCESS_TIP_LEN).toBe(DIAGRAM_TOKENS.arrow.processTipLen);
  });

  it('shortenToTip insets end along the segment by tipLen', () => {
    const from = { x: 0, y: 0 };
    const to = { x: 100, y: 0 };
    const end = shortenToTip(from, to, 10);
    expect(end.x).toBeCloseTo(90);
    expect(end.y).toBeCloseTo(0);
  });
});
