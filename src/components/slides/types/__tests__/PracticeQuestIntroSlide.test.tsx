import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PracticeQuestIntroSlide } from '../PracticeQuestIntroSlide';
import type { Slide } from '../../../../types/modules';

vi.mock('../../../../i18n', () => ({
  getT: () => (key: string) => key,
}));

vi.mock('../../../../contexts/LocaleContext', () => ({
  useLocale: () => ({ locale: 'lt' }),
}));

vi.mock('../../../../utils/m9KitChecklist', () => ({
  loadM9KitChecklist: () => ({
    catalog: false,
    csv: false,
    summary: false,
  }),
}));

const slide = {
  id: 90,
  title: 'Quest',
  subtitle: 'Kit',
  type: 'practice-quest-intro',
  content: {
    whyBenefit: 'Win benefit',
    duration: '~45–60 min',
    journeyHeading: 'Pasirink savo sritį',
    journeyChoices: [
      {
        id: 'pardavimai',
        branchIds: [],
        label: 'Pardavimai',
        subtitle: 'KPI',
        icon: 'TrendingUp',
      },
      {
        id: 'rinkodara',
        branchIds: [],
        label: 'Rinkodara',
        subtitle: 'Kanalai',
        icon: 'Image',
      },
    ],
    confirmMessage: 'Sritis: {label}',
    questSteps: [
      { id: 'start', label: 'Startas', slideId: 90 },
      { id: 'catalog', label: 'Katalogas', slideId: 93.1 },
      { id: 'csv', label: 'CSV', slideId: 93.2 },
      { id: 'cycle', label: '8 žingsniai', slideId: 93 },
      { id: 'kit', label: 'Rinkinys', slideId: 92 },
    ],
    outcomeChips: ['Šaltinių lentelė'],
    firstActionCTA: 'Pradėti: šaltinių katalogas',
    firstActionSlideId: 93.1,
  },
} as unknown as Slide;

describe('PracticeQuestIntroSlide', () => {
  it('keeps Start disabled until domain is confirmed', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onFocus = vi.fn();
    render(
      <PracticeQuestIntroSlide
        slide={slide}
        onNavigateToSlideById={onNavigate}
        onJourneyFocusChoice={onFocus}
      />
    );

    const start = screen.getByRole('button', {
      name: 'm9StartPracticeAria',
    });
    expect(start).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: /Pardavimai/i }));
    await user.click(screen.getByRole('button', { name: 'm9QuestConfirmCta' }));
    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledWith(9, 'pardavimai');
      expect(start).not.toBeDisabled();
    });

    await user.click(start);
    expect(onNavigate).toHaveBeenCalledWith(93.1);
  });

  it('keeps ChoiceControl unselected until confirm (soft-preselect hint)', () => {
    render(
      <PracticeQuestIntroSlide
        slide={slide}
        progress={{ moduleJourneyFocus: { 7: 'pardavimai' } }}
      />
    );
    const radios = screen.getAllByRole('radio');
    expect(
      radios.every((r) => r.getAttribute('aria-checked') === 'false')
    ).toBe(true);
    expect(
      screen.getByRole('button', { name: 'm9QuestConfirmCta' })
    ).toBeInTheDocument();
  });

  it('allows changing domain after confirm and saves new focus', async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    render(
      <PracticeQuestIntroSlide
        slide={slide}
        progress={{ moduleJourneyFocus: { 9: 'pardavimai' } }}
        onJourneyFocusChoice={onFocus}
      />
    );

    const start = screen.getByRole('button', {
      name: 'm9StartPracticeAria',
    });
    expect(start).not.toBeDisabled();

    await user.click(screen.getByRole('radio', { name: /Rinkodara/i }));
    await waitFor(() => {
      expect(start).toBeDisabled();
      expect(
        screen.getByRole('button', { name: 'm9QuestConfirmCta' })
      ).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'm9QuestConfirmCta' }));
    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledWith(9, 'rinkodara');
      expect(start).not.toBeDisabled();
    });
  });

  it('shows done status on map when practices completed', () => {
    render(
      <PracticeQuestIntroSlide
        slide={slide}
        progress={{
          moduleJourneyFocus: { 9: 'pardavimai' },
          completedTasks: { 9: [93.1, 93.2] },
        }}
      />
    );
    const catalog = screen
      .getByText('Katalogas')
      .closest('[data-quest-status]');
    const csv = screen.getByText('CSV').closest('[data-quest-status]');
    expect(catalog?.getAttribute('data-quest-status')).toBe('done');
    expect(csv?.getAttribute('data-quest-status')).toBe('done');
  });

  it('renders Start before outcome chips (mobile fold)', () => {
    render(
      <PracticeQuestIntroSlide
        slide={slide}
        progress={{ moduleJourneyFocus: { 9: 'pardavimai' } }}
      />
    );
    const start = screen.getByRole('button', { name: 'm9StartPracticeAria' });
    const chip = screen.getByText('Šaltinių lentelė');
    expect(
      start.compareDocumentPosition(chip) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
