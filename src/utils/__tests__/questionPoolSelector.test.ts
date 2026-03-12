/**
 * questionPoolSelector: selectQuestions (up to 15, structure), selectQuestionsByCategory,
 * assignToSlides group structure.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  selectQuestions,
  selectQuestionsByCategory,
  assignToSlides,
  type SlideQuestionGroup,
} from '../questionPoolSelector';
import type { TestQuestion } from '../../types/modules';
import { QUESTION_POOL_EN } from '../../data/questionPool.en';
import { QUESTION_POOL } from '../../data/questionPool';

/** Minimal fixture with known categories and types for deterministic-ish tests */
function makeQuestion(
  id: string,
  category: string,
  type: TestQuestion['type'] = 'mcq'
): TestQuestion {
  return {
    id,
    type,
    question: `Q ${id}`,
    options: type === 'mcq' ? ['A', 'B'] : undefined,
    correct: 0,
    explanation: 'Because',
    category,
  };
}

const fixturePool: TestQuestion[] = [
  makeQuestion('m1', 'meta'),
  makeQuestion('m2', 'meta'),
  makeQuestion('m3', 'meta'),
  makeQuestion('i1', 'input'),
  makeQuestion('i2', 'input'),
  makeQuestion('o1', 'output'),
  makeQuestion('r1', 'reasoning'),
  makeQuestion('q1', 'quality'),
  makeQuestion('a1', 'advanced'),
  makeQuestion('b1', 'bendra'),
  makeQuestion('b2', 'bendra'),
  makeQuestion('w1', 'workflow'),
  makeQuestion('t1', 'technikos'),
  makeQuestion('match1', 'meta', 'matching'),
  makeQuestion('ord1', 'input', 'ordering'),
  makeQuestion('sc1', 'bendra', 'scenario'),
  makeQuestion('tf1', 'meta', 'true-false'),
  makeQuestion('mcq-extra', 'meta'),
  makeQuestion('mcq-extra2', 'input'),
];

describe('questionPoolSelector', () => {
  beforeEach(() => {
    // Deterministic shuffle: always swap with self (no move) so order preserved for testing
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('selectQuestions', () => {
    it('returns at most 15 questions', () => {
      const result = selectQuestions(fixturePool);
      expect(result.length).toBeLessThanOrEqual(15);
    });

    it('returns no duplicate ids', () => {
      const result = selectQuestions(fixturePool);
      const ids = result.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('returns only questions from the given pool', () => {
      const poolIds = new Set(fixturePool.map((q) => q.id));
      const result = selectQuestions(fixturePool);
      result.forEach((q) => {
        expect(poolIds.has(q.id)).toBe(true);
      });
    });

    it('works with empty pool (returns empty array)', () => {
      const result = selectQuestions([]);
      expect(result).toEqual([]);
    });

    it('when pool has fewer than 15, returns all that can be selected', () => {
      const smallPool = fixturePool.slice(0, 5);
      const result = selectQuestions(smallPool);
      expect(result.length).toBeLessThanOrEqual(5);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('selectQuestions with locale', () => {
    it('selectQuestions("en") returns valid questions from EN pool', () => {
      const result = selectQuestions('en');
      expect(result.length).toBeLessThanOrEqual(15);
      const ids = result.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
      const enIds = new Set(QUESTION_POOL_EN.map((q) => q.id));
      result.forEach((q) => {
        expect(enIds.has(q.id)).toBe(true);
      });
    });

    it('selectQuestions("lt") returns valid questions from LT pool', () => {
      const result = selectQuestions('lt');
      expect(result.length).toBeLessThanOrEqual(15);
      const ids = result.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
      const ltIds = new Set(QUESTION_POOL.map((q) => q.id));
      result.forEach((q) => {
        expect(ltIds.has(q.id)).toBe(true);
      });
    });
  });

  describe('selectQuestionsByCategory', () => {
    it('returns only questions from the given category', () => {
      const result = selectQuestionsByCategory('meta', 5, fixturePool);
      expect(result.length).toBeLessThanOrEqual(5);
      result.forEach((q) => {
        expect(q.category).toBe('meta');
      });
    });

    it('returns at most n questions', () => {
      const result = selectQuestionsByCategory('meta', 2, fixturePool);
      expect(result.length).toBeLessThanOrEqual(2);
    });

    it('returns empty array for category with no questions', () => {
      const result = selectQuestionsByCategory('nonexistent', 5, fixturePool);
      expect(result).toEqual([]);
    });
  });

  describe('assignToSlides', () => {
    it('returns array of SlideQuestionGroup with slideTitle, slideSubtitle, questions', () => {
      const questions = selectQuestions(fixturePool);
      const groups = assignToSlides(questions);
      expect(Array.isArray(groups)).toBe(true);
      groups.forEach((g: SlideQuestionGroup) => {
        expect(g).toHaveProperty('slideTitle');
        expect(g).toHaveProperty('slideSubtitle');
        expect(g).toHaveProperty('questions');
        expect(Array.isArray(g.questions)).toBe(true);
      });
    });

    it('groups MCQ and true-false first (Zinios ir supratimai / Bloku sistema / Technikos)', () => {
      const mcqOnly: TestQuestion[] = [
        makeQuestion('1', 'meta'),
        makeQuestion('2', 'input'),
        makeQuestion('3', 'bendra'),
        makeQuestion('4', 'meta'),
      ];
      const groups = assignToSlides(mcqOnly);
      expect(groups.length).toBeGreaterThanOrEqual(1);
      const first = groups[0];
      expect(first.questions.every((q) => (q.type || 'mcq') === 'mcq' || q.type === 'true-false')).toBe(true);
    });

    it('includes matching slide when questions have type matching', () => {
      const withMatching: TestQuestion[] = [
        makeQuestion('m1', 'meta', 'matching'),
        makeQuestion('m2', 'input'),
      ];
      const groups = assignToSlides(withMatching);
      const matchingGroup = groups.find((g) => g.slideTitle.includes('Sujunk') || g.questions.some((q) => q.type === 'matching'));
      expect(matchingGroup).toBeDefined();
    });

    it('returns empty array when given empty questions', () => {
      const groups = assignToSlides([]);
      expect(groups).toEqual([]);
    });
  });
});
