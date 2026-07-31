/**
 * M1315-S5-THIRDS: subject motif on right intersection + muted center.
 */
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import M13RuleOfThirdsDiagram, {
  M13_THIRDS_METAPHOR,
} from '../M13RuleOfThirdsDiagram';

describe('M1315-S5 rule of thirds subject motif', () => {
  it('marks subject-focus-right metaphor with muted center (no equal four foci)', () => {
    const { container } = renderWithProviders(
      <M13RuleOfThirdsDiagram locale="lt" />
    );

    const svg = container.querySelector(
      `[data-metaphor="${M13_THIRDS_METAPHOR}"]`
    );
    expect(svg).toBeTruthy();
    expect(
      container.querySelector('[data-subject-focus="right"]')
    ).toBeTruthy();
    expect(container.querySelector('[data-muted-center="true"]')).toBeTruthy();
    expect(container.querySelectorAll('[data-focal-secondary]').length).toBe(3);
    expect(container.textContent).toContain('dešinės sankirtos');
  });

  it('localizes EN caption for right-intersection placement', () => {
    const { container } = renderWithProviders(
      <M13RuleOfThirdsDiagram locale="en" />
    );
    expect(container.textContent).toContain('right intersection');
    expect(container.textContent).not.toContain('dešinės sankirtos');
  });
});
