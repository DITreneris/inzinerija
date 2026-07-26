import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import { getM7PathMapLabels } from '../m7PathMapContent';
import M7PathMapBlock from '../M7PathMapBlock';
import M7PathMapDiagram from '../M7PathMapDiagram';

describe('M7PathMapDiagram / Block (sk. 71)', () => {
  it('exposes 4 plain LT/EN labels without MASTER jargon', () => {
    const lt = getM7PathMapLabels('lt');
    const en = getM7PathMapLabels('en');
    expect(lt.steps).toHaveLength(4);
    expect(en.steps).toHaveLength(4);
    expect(lt.steps.map((s) => s.title)).toEqual([
      'Pamatas',
      'Rinkimas',
      'Paruošimas',
      'Analizė',
    ]);
    expect(en.steps.map((s) => s.title)).toEqual([
      'Foundation',
      'Collection',
      'Preparation',
      'Analysis',
    ]);
    expect(lt.steps[3].title).not.toMatch(/MASTER/i);
    expect(en.steps[3].title).not.toMatch(/MASTER/i);
  });

  it('marks Foundation as current step with you-are-here badge (LT)', () => {
    const { container, getByText } = renderWithProviders(
      <M7PathMapDiagram locale="lt" currentStep={0} />
    );
    expect(getByText('Tu esi čia')).toBeTruthy();
    expect(getByText('Pamatas')).toBeTruthy();
    expect(getByText('Rinkimas')).toBeTruthy();
    const panels = container.querySelectorAll('[data-step-panel]');
    expect(panels).toHaveLength(4);
    expect(panels[0].getAttribute('data-active')).toBe('true');
    expect(panels[1].getAttribute('data-active')).toBe('false');
    const current = container.querySelector('[aria-current="step"]');
    expect(current).toBeTruthy();
    expect(current?.textContent).toContain('Pamatas');
  });

  it('Block defaults to LT foundation highlight via locale', () => {
    const { getByText, queryByText } = renderWithProviders(<M7PathMapBlock />);
    expect(getByText('Tu esi čia')).toBeTruthy();
    expect(getByText('Pamatas')).toBeTruthy();
    expect(queryByText('Foundation')).toBeNull();
  });

  it('has no shell step nav (Shell = Ne) but Block cards are selectable', () => {
    const { container, getByText } = renderWithProviders(<M7PathMapBlock />);
    expect(container.querySelectorAll('nav button')).toHaveLength(0);
    expect(getByText('Tu esi čia')).toBeTruthy();
    const cards = container.querySelectorAll('button[aria-pressed]');
    expect(cards.length).toBe(4);
    fireEvent.click(cards[2]);
    expect(getByText('Peržiūra')).toBeTruthy();
    expect(
      container.querySelector('[data-active="true"]')?.textContent
    ).toContain('Paruošimas');
  });
});
