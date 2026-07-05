import { describe, expect, it } from 'vitest';
import modulesData from '../../../../data/modules.json';
import type { Module, Slide } from '../../../../types/modules';

const modules = modulesData.modules as Module[];

function getM12Slides(): Slide[] {
  return modules.find((module) => module.id === 12)?.slides ?? [];
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
      121, 122, 123, 124, 124.5, 125, 126, 127,
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
  });
});
