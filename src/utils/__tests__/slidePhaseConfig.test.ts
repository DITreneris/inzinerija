import { describe, it, expect } from 'vitest';
import { getPhaseLabel, buildSlideGroups } from '../slidePhaseConfig';

describe('slidePhaseConfig', () => {
  describe('getPhaseLabel – Module 4', () => {
    it('returns Įvadas for slideId < 42', () => {
      expect(getPhaseLabel(4, 38)).toBe('Įvadas');
      expect(getPhaseLabel(4, 41)).toBe('Įvadas');
    });

    it('returns RAG for slideId 42–63', () => {
      expect(getPhaseLabel(4, 42)).toBe('RAG');
      expect(getPhaseLabel(4, 55)).toBe('RAG');
      expect(getPhaseLabel(4, 63)).toBe('RAG');
    });

    it('returns Deep research for slideId 64–65.8', () => {
      expect(getPhaseLabel(4, 64)).toBe('Deep research');
      expect(getPhaseLabel(4, 65.8)).toBe('Deep research');
    });

    it('returns Tokenai for slideId 66–66.6', () => {
      expect(getPhaseLabel(4, 66)).toBe('Tokenai');
      expect(getPhaseLabel(4, 66.6)).toBe('Tokenai');
    });

    it('returns Manipuliacijos for slideId 67–69', () => {
      expect(getPhaseLabel(4, 67)).toBe('Manipuliacijos');
      expect(getPhaseLabel(4, 69)).toBe('Manipuliacijos');
    });

    it('returns Santrauka for slideId 70', () => {
      expect(getPhaseLabel(4, 70)).toBe('Santrauka');
    });

    it('returns Teorija when slideId is null', () => {
      expect(getPhaseLabel(4)).toBe('Teorija');
    });
  });

  describe('getPhaseLabel – Module 6', () => {
    it('returns Įvadas for slideId 60', () => {
      expect(getPhaseLabel(6, 60)).toBe('Įvadas');
    });

    it('returns Custom GPT for slideId 66, 67', () => {
      expect(getPhaseLabel(6, 66)).toBe('Custom GPT');
      expect(getPhaseLabel(6, 67)).toBe('Custom GPT');
    });

    it('returns Duomenų tvarkymas for slideId 64', () => {
      expect(getPhaseLabel(6, 64)).toBe('Duomenų tvarkymas');
    });

    it('returns Praktika when slideId is null', () => {
      expect(getPhaseLabel(6)).toBe('Praktika');
    });
  });

  describe('getPhaseLabel – generic (by type)', () => {
    it('returns Teorija for content-block', () => {
      expect(getPhaseLabel(0, undefined, 'content-block')).toBe('Teorija');
    });

    it('returns Testas for test-section', () => {
      expect(getPhaseLabel(0, undefined, 'test-section')).toBe('Testas');
    });

    it('returns Praktika for practice-scenario', () => {
      expect(getPhaseLabel(0, undefined, 'practice-scenario')).toBe('Praktika');
    });

    it('returns Kita for unknown type', () => {
      expect(getPhaseLabel(0, undefined, 'unknown-type')).toBe('Kita');
    });
  });

  describe('buildSlideGroups', () => {
    it('returns 3 groups for Module 5 with >= 8 slides', () => {
      const slides = Array.from({ length: 10 }, (_, i) => ({ type: 'content-block', id: 500 + i }));
      const groups = buildSlideGroups(slides, 5);
      expect(groups).toHaveLength(3);
      expect(groups[0].label).toBe('Sprintas');
      expect(groups[1].label).toBe('Pagalba');
      expect(groups[2].label).toBe('Testas');
      expect(groups[2].endIdx).toBe(9);
    });

    it('falls back to type-based grouping for Module 5 with < 8 slides', () => {
      const slides = [
        { type: 'content-block', id: 500 },
        { type: 'content-block', id: 501 },
        { type: 'test-section', id: 502 },
      ];
      const groups = buildSlideGroups(slides, 5);
      expect(groups.length).toBeGreaterThanOrEqual(1);
    });

    it('returns single Testas group for Module 11', () => {
      const slides = [{ type: 'test-section', id: 1101 }, { type: 'test-section', id: 1102 }];
      const groups = buildSlideGroups(slides, 11);
      expect(groups).toHaveLength(1);
      expect(groups[0].label).toBe('Testas');
    });

    it('groups Module 4 slides by phase from slide id (needs > 6 slides)', () => {
      const slides = [
        { type: 'content-block', id: 38 },
        { type: 'content-block', id: 39 },
        { type: 'content-block', id: 40 },
        { type: 'content-block', id: 42 },
        { type: 'content-block', id: 50 },
        { type: 'content-block', id: 55 },
        { type: 'content-block', id: 64 },
        { type: 'content-block', id: 70 },
      ];
      const groups = buildSlideGroups(slides, 4);
      expect(groups[0].label).toBe('Įvadas');
      expect(groups[1].label).toBe('RAG');
      expect(groups[groups.length - 1].label).toBe('Santrauka');
    });

    it('returns single empty-label group when <= 6 slides and generic module', () => {
      const slides = [
        { type: 'content-block', id: 1 },
        { type: 'content-block', id: 2 },
      ];
      const groups = buildSlideGroups(slides, 99);
      expect(groups).toHaveLength(1);
      expect(groups[0].label).toBe('');
    });
  });
});
