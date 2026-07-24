import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { ActionIntroJourneySlide } from '../ContentSlides';
import type { ActionIntroJourneyContent } from '../../../../types/modules';

const content: ActionIntroJourneyContent = {
  whyBenefit: 'Pasirink sritį.',
  heroStat: 'Duomenys.',
  heroText: 'Tavo kelias.',
  journeyHeading: 'Pasirink savo kelionę',
  confirmMessage: 'Pasirinkai: {label}',
  ctaContinue: 'Pradėti',
  journeyChoices: [
    {
      id: 'pardavimai',
      label: 'Pardavimai',
      subtitle: 'CRM ir pipeline',
      icon: 'TrendingUp',
      branchIds: [],
    },
    {
      id: 'rinkodara',
      label: 'Rinkodara',
      subtitle: 'Kampanijos',
      icon: 'Megaphone',
      branchIds: [],
    },
  ],
};

describe('ActionIntroJourneySlide ChoiceControl', () => {
  it('selects a focus via radio and shows confirm CTA', () => {
    const onSave = vi.fn();
    renderWithProviders(
      <ActionIntroJourneySlide
        content={content}
        onJourneyFocusSave={onSave}
        onJourneyComplete={vi.fn()}
      />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const sales = screen.getByRole('radio', { name: /Pardavimai/i });
    expect(sales).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(sales);
    expect(sales).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText(/Pasirinkai: Pardavimai/i)).toBeInTheDocument();
  });
});
