import { describe, expect, it } from 'vitest';
import modulesData from '../../../../data/modules.json';
import type { Module, TestQuestion } from '../../../../types/modules';

const modules = modulesData.modules as Module[];

function getM14Questions(): TestQuestion[] {
  const m14 = modules.find((module) => module.id === 14);
  const testSection = m14?.slides.find((slide) => slide.id === 141);
  return testSection?.testQuestions ?? [];
}

function calculateScore(correctCount: number, total: number): number {
  return total > 0 ? Math.round((correctCount / total) * 100) : 0;
}

describe('TestPracticeSlides M14 data contract', () => {
  it('keeps the M14 test at 8 questions with a 70 percent pass threshold', () => {
    const m14 = modules.find((module) => module.id === 14);
    const intro = m14?.slides.find((slide) => slide.id === 140);
    const questions = getM14Questions();

    expect(questions.map((question) => question.id)).toEqual([
      'm14-q1',
      'm14-q2',
      'm14-q3',
      'm14-q4',
      'm14-q5',
      'm14-q6',
      'm14-q7',
      'm14-q8',
    ]);
    expect(
      (intro?.content as { thresholds?: { pass?: number } })?.thresholds
    ).toMatchObject({ pass: 70 });
    expect(calculateScore(6, questions.length)).toBeGreaterThanOrEqual(70);
    expect(calculateScore(5, questions.length)).toBeLessThan(70);
  });

  it('keeps at least 30 percent of M14 questions as rendered scenarios', () => {
    const scenarioQuestions = getM14Questions().filter(
      (question) => question.type === 'scenario' && question.scenarioContext
    );

    expect(scenarioQuestions.map((question) => question.id)).toEqual([
      'm14-q5',
      'm14-q7',
      'm14-q8',
    ]);
    expect(
      scenarioQuestions.length / getM14Questions().length
    ).toBeGreaterThanOrEqual(0.3);
  });
});
