/**
 * clampSlideIndex – resume pozicijos ribojimas kai skaidrių skaičius pasikeitė.
 */
import { describe, it, expect } from 'vitest';
import { clampSlideIndex } from '../useSlideNavigation';

describe('clampSlideIndex', () => {
  it('returns 0 for empty slide list', () => {
    expect(clampSlideIndex(5, 0)).toBe(0);
    expect(clampSlideIndex(-1, 0)).toBe(0);
  });

  it('clamps negative index to 0', () => {
    expect(clampSlideIndex(-3, 10)).toBe(0);
  });

  it('clamps over-max index to last slide', () => {
    expect(clampSlideIndex(9, 5)).toBe(4);
    expect(clampSlideIndex(100, 5)).toBe(4);
  });

  it('keeps valid index unchanged', () => {
    expect(clampSlideIndex(0, 5)).toBe(0);
    expect(clampSlideIndex(2, 5)).toBe(2);
    expect(clampSlideIndex(4, 5)).toBe(4);
  });
});
