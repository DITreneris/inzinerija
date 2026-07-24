import { describe, expect, it } from 'vitest';
import modulesData from '../modules.json';
import modulesEn from '../modules-en-m10-m12.json';
import type { Module, Slide } from '../../types/modules';

function getModuleSlides(
  modules: { modules: Module[] },
  moduleId: number
): Slide[] {
  return modules.modules.find((module) => module.id === moduleId)?.slides ?? [];
}

describe('M10 human-control slide order', () => {
  it('keeps 10.25 → 10.26 → 10.3 in LT SOT', () => {
    const slides = getModuleSlides(modulesData as { modules: Module[] }, 10);
    const ids = slides.map((slide) => slide.id);
    const i25 = ids.indexOf(10.25);
    const i26 = ids.indexOf(10.26);
    const i3 = ids.indexOf(10.3);

    expect(i25).toBeGreaterThanOrEqual(0);
    expect(i26).toBe(i25 + 1);
    expect(i3).toBe(i26 + 1);

    const slide26 = slides[i26];
    expect(slide26.type).toBe('content-block');
    expect(slide26.title).toMatch(/tvirtina žmogus/i);
    const sections =
      (slide26.content as { sections?: { image?: string }[] })?.sections ?? [];
    expect(
      sections.some(
        (section) => section.image === 'm10_human_control_simulator'
      )
    ).toBe(true);
  });

  it('keeps 10.25 → 10.26 → 10.3 in EN overlay', () => {
    const slides = getModuleSlides(modulesEn as { modules: Module[] }, 10);
    const ids = slides.map((slide) => slide.id);
    const i25 = ids.indexOf(10.25);
    const i26 = ids.indexOf(10.26);
    const i3 = ids.indexOf(10.3);

    expect(i26).toBe(i25 + 1);
    expect(i3).toBe(i26 + 1);
    expect(slides[i26].title).toMatch(/human approve/i);
  });
});
