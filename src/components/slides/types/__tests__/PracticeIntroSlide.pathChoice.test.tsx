import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/test-utils';
import { PracticeIntroSlide } from '../TestPracticeSlides';
import type { Slide } from '../../../../types/modules';
import { isSlideHiddenForNav } from '../../../../utils/useSlideNavigation';

const m15IntroSlide: Slide = {
  id: 150,
  title: 'Turinio inžinerijos projektas',
  subtitle: 'Privaloma: hero vaizdas',
  type: 'practice-intro',
  content: {
    whyBenefit: 'Po projekto turėsi hero vaizdą.',
    duration: '~20 min / ~60–90 min',
    recommendedStart: 'Po pasirinkimo: greitas baigiasi 150.5.',
    howToUseModule: {
      heading: 'Pasirink kelią',
      short: {
        label: 'Greitas startas',
        description: '~20 min – vienas hero vaizdas.',
      },
      full: {
        label: 'Pilnas kelias',
        description: '~60–90 min – mini kampanija.',
      },
    },
  },
};

const m6IntroSlide: Slide = {
  id: 60,
  title: 'Vienas projektas',
  subtitle: 'Tyrimo ataskaita arba Custom GPT',
  type: 'practice-intro',
  content: {
    whyBenefit: 'Po projekto turėsi artefaktą.',
    duration: '~25–35 min',
    recommendedStart: 'Pradėk nuo Tyrimo ataskaitos.',
    firstActionCTA: 'Pradėk dabar: atidaryk scenarijų.',
  },
};

describe('PracticeIntroSlide pathChoice (M15)', () => {
  it('shows ChoiceControl and calls onPathModeChange', () => {
    const onPathModeChange = vi.fn();
    renderWithProviders(
      <PracticeIntroSlide
        slide={m15IntroSlide}
        moduleId={15}
        pathMode="full"
        onPathModeChange={onPathModeChange}
        visibleSlideCount={4}
      />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const shortBtn = screen.getByRole('radio', { name: /Greitas startas/i });
    const fullBtn = screen.getByRole('radio', { name: /Pilnas kelias/i });
    expect(fullBtn).toHaveAttribute('aria-checked', 'true');
    expect(shortBtn).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(shortBtn);
    expect(onPathModeChange).toHaveBeenCalledWith('short');
    expect(screen.getByText(/4/)).toBeInTheDocument();
  });

  it('skips optional M15 scenarios 151–154 when short path (fastTrack)', () => {
    const optionalIds = [151, 152, 153, 154];
    for (const id of optionalIds) {
      const s: Slide = {
        id,
        title: `S${id}`,
        subtitle: '',
        type: 'practice-scenario',
        optional: true,
      };
      expect(isSlideHiddenForNav(s, { skipOptional: true })).toBe(true);
      expect(isSlideHiddenForNav(s, { skipOptional: false })).toBe(false);
    }
  });
});

describe('PracticeIntroSlide project choice (M6)', () => {
  it('soft-preselect: select then confirm navigates; does not call onPathModeChange', () => {
    const onNavigateToSlide = vi.fn();
    const onPathModeChange = vi.fn();
    renderWithProviders(
      <PracticeIntroSlide
        slide={m6IntroSlide}
        moduleId={6}
        onPathModeChange={onPathModeChange}
        onNavigateToSlide={onNavigateToSlide}
        scenarioSlides={[
          { slideId: 61, slideIndex: 1, title: 'Tyrimo ataskaita' },
          { slideId: 67, slideIndex: 8, title: 'Custom GPT' },
        ]}
      />
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const continueBtn = screen.getByRole('button', {
      name: /Tęsti į pasirinktą projektą|Tęsti į projektą/i,
    });
    expect(continueBtn).toBeDisabled();

    fireEvent.click(screen.getByRole('radio', { name: /Tyrimo ataskaita/i }));
    expect(onNavigateToSlide).not.toHaveBeenCalled();
    expect(continueBtn).not.toBeDisabled();

    fireEvent.click(continueBtn);
    expect(onNavigateToSlide).toHaveBeenCalledWith(1);
    expect(onPathModeChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('radio', { name: /Custom GPT/i }));
    fireEvent.click(continueBtn);
    expect(onNavigateToSlide).toHaveBeenCalledWith(8);
    expect(onPathModeChange).not.toHaveBeenCalled();
  });
});

describe('PracticeIntroSlide M3 portfolio chip', () => {
  it('shows live N/6 from completedTasks', () => {
    const m3Intro: Slide = {
      id: 30,
      title: 'Praktika',
      subtitle: '',
      type: 'practice-intro',
      content: {
        whyBenefit: 'Praktika',
        minScenariosToComplete: 2,
        firstActionCTA: 'Sukurk',
      },
    };
    renderWithProviders(
      <PracticeIntroSlide
        slide={m3Intro}
        moduleId={3}
        progress={{ completedTasks: { 3: [31, 32] } }}
        scenarioSlides={[
          { slideId: 31, slideIndex: 1, title: 'A' },
          { slideId: 32, slideIndex: 2, title: 'B' },
          { slideId: 33, slideIndex: 3, title: 'C' },
          { slideId: 34, slideIndex: 4, title: 'D' },
          { slideId: 35, slideIndex: 5, title: 'E' },
          { slideId: 36, slideIndex: 6, title: 'F' },
        ]}
      />
    );
    expect(
      screen.getByLabelText(/Portfelis: 2 iš 6|Portfolio: 2 of 6/i)
    ).toBeInTheDocument();
    expect(screen.getByText('2/6')).toBeInTheDocument();
  });
});
