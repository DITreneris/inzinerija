import { describe, expect, it } from 'vitest';
import modules from '../modules.json';

type Slide = {
  id: number;
  title?: string;
  content?: {
    sections?: Array<{
      image?: string;
      heading?: string;
      blockVariant?: string;
    }>;
  };
};

describe('m4 prompt mode lab slide order', () => {
  const mod4 = modules.modules.find((m: { id: number }) => m.id === 4);
  const slides = (mod4?.slides ?? []) as Slide[];

  it('keeps slide 54 with m4_prompt_mode_simulator in Daryk section', () => {
    const slide = slides.find((s) => s.id === 54);
    expect(slide).toBeTruthy();
    expect(slide?.title).toMatch(/metodinis|agentinis/i);
    const daryk = slide?.content?.sections?.find(
      (section) => section.image === 'm4_prompt_mode_simulator'
    );
    expect(daryk).toBeTruthy();
    expect(daryk?.blockVariant).toBe('brand');
  });

  it('uses Trumpai + Patikra accent chrome around the lab', () => {
    const slide = slides.find((s) => s.id === 54);
    const sections = slide?.content?.sections ?? [];
    const trumpai = sections.find((s) => /Trumpai/i.test(s.heading ?? ''));
    const patikra = sections.find((s) => /Patikra/i.test(s.heading ?? ''));
    expect(trumpai?.blockVariant).toBe('accent');
    expect(patikra?.blockVariant).toBe('accent');
  });
});
