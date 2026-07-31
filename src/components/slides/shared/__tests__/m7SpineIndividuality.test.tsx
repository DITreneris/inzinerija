/**
 * M79-S5: DA pipeline (73) vs data-prep (89) must read as distinct metaphors
 * without relying on step text (S4-INDIV bar).
 */
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import M7DaPipelineDiagram, {
  M7_DA_PIPELINE_GEOMETRY,
} from '../M7DaPipelineDiagram';
import M7DataPrepWorkflowDiagram, {
  M7_DATA_PREP_GEOMETRY,
} from '../M7DataPrepWorkflowDiagram';

describe('M79-S5 M7 spine individuality (73 vs 89)', () => {
  it('exports distinct metaphor ids (no shared VerticalFlow facade DoD)', () => {
    expect(M7_DA_PIPELINE_GEOMETRY.metaphor).toBe('station-rail');
    expect(M7_DATA_PREP_GEOMETRY.metaphor).toBe('prep-funnel');
    expect(M7_DA_PIPELINE_GEOMETRY.metaphor).not.toBe(
      M7_DATA_PREP_GEOMETRY.metaphor
    );
    expect(M7_DA_PIPELINE_GEOMETRY.stepCount).not.toBe(
      M7_DATA_PREP_GEOMETRY.stepCount
    );
  });

  it('renders station rail vs narrowing funnel silhouette', () => {
    const da = renderWithProviders(
      <M7DaPipelineDiagram locale="lt" onStepClick={() => {}} />
    );
    const prep = renderWithProviders(
      <M7DataPrepWorkflowDiagram locale="lt" onStepClick={() => {}} />
    );

    const daSvg = da.container.querySelector('[data-metaphor="station-rail"]');
    const prepSvg = prep.container.querySelector(
      '[data-metaphor="prep-funnel"]'
    );
    expect(daSvg).toBeTruthy();
    expect(prepSvg).toBeTruthy();

    expect(da.container.querySelectorAll('[data-station]').length).toBe(6);
    expect(da.container.querySelector('[data-rail="station"]')).toBeTruthy();

    const funnelWs = Array.from(
      prep.container.querySelectorAll('[data-funnel-w]')
    ).map((el) => Number(el.getAttribute('data-funnel-w')));
    expect(funnelWs.length).toBe(5);
    expect(funnelWs[0]).toBeGreaterThan(funnelWs[funnelWs.length - 1]!);
    for (let i = 1; i < funnelWs.length; i++) {
      expect(funnelWs[i]!).toBeLessThan(funnelWs[i - 1]!);
    }
    expect(
      prep.container.querySelectorAll('[data-checklist-tick]').length
    ).toBe(5);

    da.unmount();
    prep.unmount();
  });
});
