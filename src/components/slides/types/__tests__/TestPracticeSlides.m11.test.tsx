import { describe, expect, it } from 'vitest';
import modulesData from '../../../../data/modules.json';
import type { Module, TestQuestion } from '../../../../types/modules';

const modules = modulesData.modules as Module[];

function getM11Questions(): TestQuestion[] {
  const m11 = modules.find((module) => module.id === 11);
  const testSection = m11?.slides.find((slide) => slide.id === 111);
  return testSection?.testQuestions ?? [];
}

function calculateScore(correctCount: number, total: number): number {
  return total > 0 ? Math.round((correctCount / total) * 100) : 0;
}

describe('TestPracticeSlides M11 data contract', () => {
  it('keeps the M11 test at 8 questions with a 70 percent pass threshold', () => {
    const m11 = modules.find((module) => module.id === 11);
    const intro = m11?.slides.find((slide) => slide.id === 110);
    const questions = getM11Questions();

    expect(questions.map((question) => question.id)).toEqual([
      'm11-q1',
      'm11-q2',
      'm11-q3',
      'm11-q4',
      'm11-q5',
      'm11-q6',
      'm11-q7',
      'm11-q8',
    ]);
    expect(
      (intro?.content as { thresholds?: { pass?: number } })?.thresholds
    ).toMatchObject({ pass: 70 });
    expect(calculateScore(6, questions.length)).toBeGreaterThanOrEqual(70);
    expect(calculateScore(5, questions.length)).toBeLessThan(70);
  });

  it('keeps taxonomy and multi-agent remediation links pointed at M10 source slides', () => {
    const questionsById = new Map(
      getM11Questions().map((question) => [question.id, question])
    );

    expect(questionsById.get('m11-q3')?.relatedSlideId).toBe(10.45);
    expect(questionsById.get('m11-q5')?.relatedSlideId).toBe(10.45);
    expect(questionsById.get('m11-q6')?.relatedSlideId).toBe(10.48);
    expect(questionsById.get('m11-q7')?.relatedSlideId).toBe(10.15);
    expect(questionsById.get('m11-q8')?.relatedSlideId).toBe(10.25);
  });
});
