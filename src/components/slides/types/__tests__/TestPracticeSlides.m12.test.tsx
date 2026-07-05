import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import modulesData from '../../../../data/modules.json';
import { renderWithProviders } from '../../../../test/test-utils';
import type { Module, PathStepContent, Slide } from '../../../../types/modules';
import { PathStepSlide } from '../ContentSlides';
import {
  PracticeIntroSlide,
  type PracticeScenarioSlideInfo,
} from '../TestPracticeSlides';

const modules = modulesData.modules as Module[];

function getM12Slides(): Slide[] {
  return modules.find((module) => module.id === 12)?.slides ?? [];
}

function getM10Slides(): Slide[] {
  return modules.find((module) => module.id === 10)?.slides ?? [];
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
        /Pradėk nuo 124\.5 → sukurk rankinį multi-agent pipeline/
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
