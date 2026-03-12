/**
 * useSlideNavigation: saveSlidePosition / getSavedSlidePosition (localStorage round-trip, invalid JSON → 0).
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { saveSlidePosition, getSavedSlidePosition } from '../useSlideNavigation';

const SLIDE_POS_KEY = 'prompt-anatomy-slide-pos';

describe('slide position persistence', () => {
  beforeEach(() => {
    localStorage.removeItem(SLIDE_POS_KEY);
  });

  it('getSavedSlidePosition returns 0 when localStorage is empty', () => {
    expect(getSavedSlidePosition(1)).toBe(0);
    expect(getSavedSlidePosition(2)).toBe(0);
  });

  it('saveSlidePosition stores value and getSavedSlidePosition returns it', () => {
    saveSlidePosition(1, 5);
    expect(getSavedSlidePosition(1)).toBe(5);
  });

  it('round-trip: save then get for multiple modules', () => {
    saveSlidePosition(1, 2);
    saveSlidePosition(2, 0);
    saveSlidePosition(3, 10);
    expect(getSavedSlidePosition(1)).toBe(2);
    expect(getSavedSlidePosition(2)).toBe(0);
    expect(getSavedSlidePosition(3)).toBe(10);
  });

  it('saveSlidePosition overwrites same module', () => {
    saveSlidePosition(1, 3);
    saveSlidePosition(1, 7);
    expect(getSavedSlidePosition(1)).toBe(7);
  });

  it('getSavedSlidePosition returns 0 for invalid JSON in localStorage', () => {
    localStorage.setItem(SLIDE_POS_KEY, 'invalid json{');
    expect(getSavedSlidePosition(1)).toBe(0);
  });

  it('getSavedSlidePosition returns 0 when stored map has no entry for moduleId', () => {
    saveSlidePosition(1, 2);
    expect(getSavedSlidePosition(2)).toBe(0);
  });
});
