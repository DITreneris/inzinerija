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
      | {
          minScenariosToComplete?: number;
          requiredSlideIds?: number[];
          recommendedPathId?: string;
        }
      | undefined;

    expect(content?.minScenariosToComplete).toBe(3);
    expect(content?.requiredSlideIds).toEqual([121, 122, 123]);
    expect(content?.recommendedPathId).toBe('guided');
  });

  it('counts only root scenario slides and keeps the M12 dedupe invariant', () => {
    const scenarioSlides = getM12Slides().filter(
      (slide) => slide.type === 'practice-scenario'
    );
    const rootScenarioSlides = getM12Slides().filter(
      (slide) => slide.scenario != null
    );

    expect(scenarioSlides.map((slide) => slide.id)).toEqual([
      124.5, 124, 121, 122, 123,
    ]);
    expect(rootScenarioSlides.map((slide) => slide.id)).toEqual(
      scenarioSlides.map((slide) => slide.id)
    );
    expect(
      scenarioSlides.every((slide) => {
        if (slide.practicalTask == null) return false;
        if (!Object.prototype.hasOwnProperty.call(slide, 'content'))
          return true;
        // Allow content.footer only (GOLDEN §3.6 next-slide chrome)
        const keys = Object.keys(slide.content ?? {});
        return keys.length === 1 && keys[0] === 'footer';
      })
    ).toBe(true);

    const optionalRecap = getM12Slides().find((slide) => slide.id === 125);
    expect(optionalRecap).toMatchObject({
      type: 'content-block',
      optional: true,
    });
    expect(optionalRecap?.scenario).toBeUndefined();
    expect(optionalRecap?.practicalTask).toBeUndefined();
  });

  it('renders the M12 path choice, required progress, and ROI template', () => {
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

    expect(
      screen.getByRole('radiogroup', { name: 'Pasirink M12 pradžios kelią' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: /Rekomenduojama: vedamas kelias/i })
    ).toHaveAttribute('aria-checked', 'true');
    expect(
      screen.getByText('0/3 privalomų praktikų atlikta')
    ).toBeInTheDocument();
    const pathChoice = screen.getByRole('region', {
      name: 'Privalomas Modulio 12 kelias',
    });
    expect(
      within(pathChoice).getByText('Pasirinktas kelias')
    ).toBeInTheDocument();
    expect(
      within(pathChoice).getAllByText('Rekomenduojama: vedamas kelias')
    ).toHaveLength(2);
    expect(
      screen.queryByText('🔥 6 Verslo Scenarijai')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Generuok ataskaitą')).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByText('Grąžos iš investicijų (ROI) miniskaičiuoklė')
    );
    expect(
      screen.getByRole('button', {
        name: /Kopijuoti grąžos iš investicijų/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole('button', {
        name: /Pradėti pasirinktą kelią: Rekomenduojama: vedamas kelias/,
      })
    );
    expect(onNavigateToSlideById).toHaveBeenCalledWith(120.25);

    fireEvent.click(
      screen.getByRole('radio', {
        name: /Greitas startas tik su promptais/i,
      })
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /Pradėti pasirinktą kelią: Greitas startas tik su promptais/,
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
    expect(content?.recommendedSlideIds).toEqual([150.5, 150.25]);
  });

  it('keeps the M15 quick start before the optional full path', () => {
    const ids = getM15Slides().map((slide) => slide.id);
    expect(ids.slice(0, 6)).toEqual([150, 150.5, 150.25, 150.26, 151, 152]);

    const quickStart = getM15Slides().find((slide) => slide.id === 150.5);
    expect(quickStart).toMatchObject({
      type: 'practice-scenario',
      recommended: true,
    });

    for (const id of [151, 152, 153]) {
      const slide = getM15Slides().find((s) => s.id === id);
      expect(slide).toMatchObject({
        type: 'practice-scenario',
        optional: true,
        recommended: false,
      });
    }
  });
});
