/**
 * M1315-S4-INDIV: four M13 process metaphors distinguishable without step text.
 */
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import M13MediaPipelineDiagram, {
  M13_MEDIA_PIPELINE_GEOMETRY,
} from '../M13MediaPipelineDiagram';
import M13ConsistencyLockDiagram, {
  M13_CONSISTENCY_LOCK_GEOMETRY,
} from '../M13ConsistencyLockDiagram';
import M13PostprodDiagram, {
  M13_POSTPROD_GEOMETRY,
} from '../M13PostprodDiagram';
import TurinioWorkflowDiagram, {
  TURINIO_WORKFLOW_GEOMETRY,
} from '../TurinioWorkflowDiagram';

describe('M1315-S4 M13 spine individuality (13.12/32/52/11)', () => {
  it('exports four distinct metaphor ids', () => {
    const metaphors = [
      M13_MEDIA_PIPELINE_GEOMETRY.metaphor,
      M13_CONSISTENCY_LOCK_GEOMETRY.metaphor,
      M13_POSTPROD_GEOMETRY.metaphor,
      TURINIO_WORKFLOW_GEOMETRY.metaphor,
    ];
    expect(metaphors).toEqual(['linear', 'lock-artifact', 'timeline', 'cycle']);
    expect(new Set(metaphors).size).toBe(4);
  });

  it('renders distinct silhouettes (linear / lock / timeline / cycle)', () => {
    const linear = renderWithProviders(
      <M13MediaPipelineDiagram locale="lt" onStepClick={() => {}} />
    );
    const lock = renderWithProviders(
      <M13ConsistencyLockDiagram locale="lt" onStepClick={() => {}} />
    );
    const timeline = renderWithProviders(
      <M13PostprodDiagram locale="lt" onStepClick={() => {}} />
    );
    const cycle = renderWithProviders(
      <TurinioWorkflowDiagram locale="lt" onStepClick={() => {}} />
    );

    expect(
      linear.container.querySelector('[data-metaphor="linear"]')
    ).toBeTruthy();
    expect(
      linear.container.querySelector('[data-linear-spine="true"]')
    ).toBeTruthy();

    expect(
      lock.container.querySelector('[data-metaphor="lock-artifact"]')
    ).toBeTruthy();
    expect(
      lock.container.querySelector('[data-lock-artifact="true"]')
    ).toBeTruthy();

    expect(
      timeline.container.querySelector('[data-metaphor="timeline"]')
    ).toBeTruthy();
    expect(
      timeline.container.querySelector('[data-timeline-rail="true"]')
    ).toBeTruthy();

    expect(
      cycle.container.querySelector('[data-metaphor="cycle"]')
    ).toBeTruthy();
    expect(
      cycle.container.querySelector('[data-cycle-return="true"]')
    ).toBeTruthy();
    expect(cycle.container.querySelectorAll('[data-cycle-step]').length).toBe(
      7
    );

    linear.unmount();
    lock.unmount();
    timeline.unmount();
    cycle.unmount();
  });
});
