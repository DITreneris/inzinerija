import { fireEvent, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../../test/test-utils';
import M10TriggerFlowBlock from '../M10TriggerFlowBlock';

const storageKey = 'prompt-anatomy-locale';

function setLocale(locale: 'lt' | 'en') {
  localStorage.setItem(storageKey, locale);
}

describe('M10TriggerFlowBlock process-config-hierarchy', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('keeps Shell at 3 beats and teaches the default webhook type on step 0', () => {
    setLocale('lt');
    const { container } = renderWithProviders(<M10TriggerFlowBlock />);
    const view = within(container);

    expect(container.querySelectorAll('nav button')).toHaveLength(3);
    expect(
      container.querySelectorAll('svg [role="button"], svg [tabindex="0"]')
    ).toHaveLength(0);
    expect(view.getByRole('radiogroup')).toBeTruthy();
    expect(view.getAllByRole('radio')).toHaveLength(3);
    expect(container.textContent).toContain('Pasirinktas tipas:');
    expect(container.textContent).toContain('Pranešimas');
    expect(container.textContent).toContain(
      'Eiga prasideda gavus signalą iš kitos sistemos'
    );
  });

  it('hides the type appendix on later Shell steps', () => {
    setLocale('lt');
    const { container } = renderWithProviders(<M10TriggerFlowBlock />);
    fireEvent.click(
      within(container).getByRole('button', { name: /Žingsnis 2:/i })
    );

    expect(container.textContent).toContain('ar eiga turi tęstis');
    expect(container.textContent).not.toContain('Pasirinktas tipas:');
    expect(within(container).queryByRole('radiogroup')).toBeNull();
  });

  it('updates the type appendix from the HTML radios without changing Shell step', () => {
    setLocale('en');
    const { container } = renderWithProviders(<M10TriggerFlowBlock />);
    fireEvent.click(within(container).getByRole('radio', { name: 'Form' }));

    expect(container.textContent).toContain('Selected type:');
    expect(container.textContent).toContain(
      'The flow starts when a person submits a form.'
    );
    expect(container.textContent).toMatch(/1\s*\/\s*3/);
    expect(
      within(container).getByRole('radio', { name: 'Form' })
    ).toHaveAttribute('aria-checked', 'true');
  });
});
