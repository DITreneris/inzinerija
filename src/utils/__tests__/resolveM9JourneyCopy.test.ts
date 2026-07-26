import { describe, expect, it } from 'vitest';
import {
  getM9RecommendedSlideIds,
  resolveM9JourneySlots,
} from '../resolveM9JourneyCopy';

describe('resolveM9JourneyCopy', () => {
  it('returns pardavimai slots by default', () => {
    const slots = resolveM9JourneySlots(null, 'lt');
    expect(slots.themePlaceholder).toContain('pardavimai');
    expect(slots.recommendedSlideIds).toContain(101);
  });

  it('returns IT slots for it-inzinerija', () => {
    const slots = resolveM9JourneySlots('it-inzinerija', 'en');
    expect(slots.sampleColumns).toContain('error_count');
    expect(slots.kpiHint.toLowerCase()).toMatch(/error|kpi/);
  });

  it('getM9RecommendedSlideIds uses journey overlay', () => {
    expect(getM9RecommendedSlideIds('vadyba')).toEqual([111, 110, 114]);
  });
});
