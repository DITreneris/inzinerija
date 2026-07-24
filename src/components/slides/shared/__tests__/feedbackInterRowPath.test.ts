import { describe, expect, it } from 'vitest';
import { feedbackInterRowPath } from '../cycleFeedbackGeometry';

describe('feedbackInterRowPath', () => {
  const d = feedbackInterRowPath({
    fromCx: 600,
    toCx: 140,
    startY: 190,
    troughY: 208,
    tipY: 226,
    cornerR: 16,
  });

  it('starts at fromCx/startY and ends at toCx/tipY (tip down)', () => {
    expect(d.trimStart().startsWith('M 600 190')).toBe(true);
    expect(d).toMatch(/L 140 226\s*$/);
  });

  it('uses two corner Qs and a horizontal trough (not a single diagonal Q)', () => {
    const qCount = (d.match(/Q /g) ?? []).length;
    expect(qCount).toBe(2);
    expect(d).toContain('L 156 208'); // toCx + R when going left: 140+16
    expect(d).toContain('L 600 192'); // fromCx, troughY - R
  });
});
