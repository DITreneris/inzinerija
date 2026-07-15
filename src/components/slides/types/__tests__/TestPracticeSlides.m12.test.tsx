import { act, fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import modulesData from '../../../../data/modules.json';
import { renderWithProviders } from '../../../../test/test-utils';
import type { Module, PathStepContent, Slide } from '../../../../types/modules';
import { PathStepSlide } from '../ContentSlides';
import {
  PracticeIntroSlide,
  PracticeScenarioSlide,
  type PracticeScenarioSlideInfo,
} from '../TestPracticeSlides';

const modules = modulesData.modules as Module[];

function getM12Slides(): Slide[] {
  return modules.find((module) => module.id === 12)?.slides ?? [];
}

function getM15Slides(): Slide[] {
  return modules.find((module) => module.id === 15)?.slides ?? [];
}

function getM10Slides(): Slide[] {
  return modules.find((module) => module.id === 10)?.slides ?? [];
}

function getM9Slides(): Slide[] {
  return modules.find((module) => module.id === 9)?.slides ?? [];
}

function getM12ScenarioSlides(): PracticeScenarioSlideInfo[] {
  return getM12Slides()
    .map((slide, slideIndex) => ({ slide, slideIndex }))
    .filter(({ slide }) => slide.type === 'practice-scenario')
    .map(({ slide, slideIndex }) => ({
      slideIndex,
      slideId: slide.id,
      title: slide.title,
    }));
}

describe('TestPracticeSlides M12 practice contract', () => {
  it('keeps the M12 intro completion gate aligned with the three required practices', () => {
    const intro = getM12Slides().find((slide) => slide.id === 120);
    const content = intro?.content as
      | { minScenariosToComplete?: number; recommendedSlideIds?: number[] }
      | undefined;

    expect(content?.minScenariosToComplete).toBe(3);
    expect(content?.recommendedSlideIds).toEqual(
      expect.arrayContaining([121, 122, 123])
    );
  });

  it('counts only root scenario slides and keeps the M12 dedupe invariant', () => {
    const scenarioSlides = getM12Slides().filter(
      (slide) => slide.type === 'practice-scenario'
    );
    const rootScenarioSlides = getM12Slides().filter(
      (slide) => slide.scenario != null
    );

    expect(scenarioSlides.map((slide) => slide.id)).toEqual([
      121, 122, 123, 124, 124.5,
    ]);
    expect(rootScenarioSlides.map((slide) => slide.id)).toEqual(
      scenarioSlides.map((slide) => slide.id)
    );
    expect(
      scenarioSlides.every(
        (slide) =>
          slide.practicalTask != null &&
          !Object.prototype.hasOwnProperty.call(slide, 'content')
      )
    ).toBe(true);

    const optionalRecap = getM12Slides().find((slide) => slide.id === 125);
    expect(optionalRecap).toMatchObject({
      type: 'content-block',
      optional: true,
    });
    expect(optionalRecap?.scenario).toBeUndefined();
    expect(optionalRecap?.practicalTask).toBeUndefined();
  });

  it('renders the high-ROI M12 intro path, ROI template, and start-here jump', () => {
    const intro = getM12Slides().find((slide) => slide.id === 120);
    const onNavigateToSlideById = vi.fn();

    renderWithProviders(
      <PracticeIntroSlide
        slide={intro}
        moduleId={12}
        scenarioSlides={getM12ScenarioSlides()}
        onNavigateToSlide={() => {}}
        onNavigateToSlideById={onNavigateToSlideById}
      />
    );

    expect(screen.getByText('Rekomenduojamas startas')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Privalomas kelias – 3 pagrindinės praktikos \(121–123\)/
      )
    ).toBeInTheDocument();
    const requiredPath = screen.getByRole('region', {
      name: 'Privalomas Modulio 12 kelias',
    });
    expect(
      within(requiredPath).getByText('Privalomas kelias')
    ).toBeInTheDocument();
    expect(
      within(requiredPath).getByText(
        /Modulis laikomas baigtu, kai atliksi 3 pagrindines 3A praktikas/
      )
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByText('Grąžos iš investicijų (ROI) mini skaičiuoklė')
    );
    expect(
      screen.getByRole('button', {
        name: 'Kopijuoti grąžos iš investicijų šabloną',
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Pradėk nuo Koordinatorius ir du specialistai skaidrės',
      })
    );

    expect(onNavigateToSlideById).toHaveBeenCalledWith(124.5);
  });

  it('renders copyable prompts inside path-step checkpoints', async () => {
    const checkpoint = getM10Slides().find((slide) => slide.id === 10.21);
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    renderWithProviders(
      <PathStepSlide
        content={checkpoint?.content as PathStepContent}
        isCompleted={false}
        onMarkComplete={() => {}}
      />
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Kopijuoti' }));
    });

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('Užduotis: [APRAŠYK]. Naudok paiešką arba įrankį')
    );
  });
});

describe('TestPracticeSlides M9 scenario defaults', () => {
  it('uses i18n default reflection when JSON omits reflectionPromptAfter', () => {
    const scenario = getM9Slides().find((slide) => slide.id === 101);
    expect(scenario?.type).toBe('practice-scenario');
    expect(
      (scenario?.content as { reflectionPromptAfter?: string } | undefined)
        ?.reflectionPromptAfter
    ).toBeUndefined();

    renderWithProviders(
      <PracticeScenarioSlide
        slide={scenario!}
        moduleId={9}
        onRenderTask={() => null}
      />
    );

    expect(
      screen.getByText(/META: Tu esi mokymų refleksijos asistentas/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Nukopijuoti refleksijos promptą' })
    ).toBeInTheDocument();
  });

  it('does not render narrativeLead for M9 even when present on scenario', () => {
    const scenario = getM9Slides().find((slide) => slide.id === 101);
    const withLead = {
      ...scenario!,
      scenario: {
        ...scenario!.scenario!,
        narrativeLead: 'Test flavor lead that should stay hidden for M9.',
      },
    };

    renderWithProviders(
      <PracticeScenarioSlide
        slide={withLead}
        moduleId={9}
        onRenderTask={() => null}
      />
    );

    expect(
      screen.queryByText('Test flavor lead that should stay hidden for M9.')
    ).not.toBeInTheDocument();
  });
});

describe('TestPracticeSlides M15 practice contract', () => {
  it('keeps the M15 intro completion gate aligned with the quick start', () => {
    const intro = getM15Slides().find((slide) => slide.id === 150);
    const content = intro?.content as
      | { minScenariosToComplete?: number; recommendedSlideIds?: number[] }
      | undefined;

    expect(content?.minScenariosToComplete).toBe(1);
    expect(content?.recommendedSlideIds).toEqual(
      expect.arrayContaining([150.5, 150.25, 151, 152, 153])
    );
  });

  it('keeps the M15 quick start before the optional full path', () => {
    const ids = getM15Slides().map((slide) => slide.id);
    expect(ids.slice(0, 6)).toEqual([150, 150.5, 150.25, 150.26, 151, 152]);

    const quickStart = getM15Slides().find((slide) => slide.id === 150.5);
    expect(quickStart).toMatchObject({
      type: 'practice-scenario',
      recommended: true,
    });
  });
});
