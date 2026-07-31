/**
 * M1315-S4 wave A: postprod timeline ≠ consistency lock-artifact.
 */
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import M13PostprodDiagram, {
  M13_POSTPROD_GEOMETRY,
} from '../M13PostprodDiagram';
import M13ConsistencyLockDiagram, {
  M13_CONSISTENCY_LOCK_GEOMETRY,
} from '../M13ConsistencyLockDiagram';

describe('M1315-S4 wave A individuality (13.52 vs 13.32)', () => {
  it('exports distinct metaphor ids', () => {
    expect(M13_POSTPROD_GEOMETRY.metaphor).toBe('timeline');
    expect(M13_CONSISTENCY_LOCK_GEOMETRY.metaphor).toBe('lock-artifact');
    expect(M13_POSTPROD_GEOMETRY.metaphor).not.toBe(
      M13_CONSISTENCY_LOCK_GEOMETRY.metaphor
    );
  });

  it('renders timeline rail vs lock artifact silhouettes', () => {
    const pp = renderWithProviders(
      <M13PostprodDiagram locale="lt" onStepClick={() => {}} />
    );
    const lock = renderWithProviders(
      <M13ConsistencyLockDiagram locale="lt" onStepClick={() => {}} />
    );

    expect(
      pp.container.querySelector('[data-metaphor="timeline"]')
    ).toBeTruthy();
    expect(
      pp.container.querySelector('[data-timeline-rail="true"]')
    ).toBeTruthy();
    expect(pp.container.querySelectorAll('[data-timeline-step]').length).toBe(
      4
    );

    expect(
      lock.container.querySelector('[data-metaphor="lock-artifact"]')
    ).toBeTruthy();
    expect(
      lock.container.querySelector('[data-lock-artifact="true"]')
    ).toBeTruthy();
    expect(lock.container.querySelectorAll('[data-ref-card]').length).toBe(3);

    pp.unmount();
    lock.unmount();
  });
});
