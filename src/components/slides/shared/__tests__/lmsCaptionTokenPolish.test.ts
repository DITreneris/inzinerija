import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';

/**
 * Wave 4 residual caption floor – SVG diagram titles use titleWeight.
 * @see docs/development/DIAGRAM_KIT_STANDARD.md §Non-spine / residual
 */
describe('lmsCaptionTokenPolish (Wave 4)', () => {
  it('keeps LMS SVG caption title weight floor', () => {
    expect(DIAGRAM_TOKENS.typography.titleWeight).toBe(700);
    expect(DIAGRAM_TOKENS.typography.title.desktop).toBe(17);
    expect(DIAGRAM_TOKENS.typography.title.compact).toBe(15);
  });
});
