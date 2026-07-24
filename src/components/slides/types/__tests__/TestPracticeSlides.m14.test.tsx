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
  it('keeps Path Test Shell: intro → warm-up → 12 Q → results → bonus', () => {
    const m14 = modules.find((module) => module.id === 14);
    const slideIds = m14?.slides.map((slide) => slide.id);
    expect(slideIds).toEqual([140, 140.5, 141, 142, 143]);

    const warmUp = m14?.slides.find((slide) => slide.id === 140.5);
    const bonus = m14?.slides.find((slide) => slide.id === 143);
    const warmQuestions =
      (warmUp?.content as { questions?: { id: string }[] })?.questions ?? [];
    expect(warmUp?.type).toBe('warm-up-quiz');
    expect(warmQuestions.map((q) => q.id)).toEqual([
      'm14-warm-1',
      'm14-warm-2',
      'm14-warm-3',
    ]);
    expect(bonus?.type).toBe('content-block');
    expect(bonus?.optional).toBe(true);
    expect(bonus?.badgeVariant).toBe('bonus');
  });

  it('keeps the M14 test at 12 questions with a 70 percent pass threshold', () => {
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
      'm14-q9',
      'm14-q10',
      'm14-q11',
      'm14-q12',
    ]);
    expect(
      (intro?.content as { thresholds?: { pass?: number } })?.thresholds
    ).toMatchObject({ pass: 70 });
    // 9/12 = 75% ≥ 70; 8/12 ≈ 67% < 70
    expect(calculateScore(9, questions.length)).toBeGreaterThanOrEqual(70);
    expect(calculateScore(8, questions.length)).toBeLessThan(70);
  });

  it('keeps at least 30 percent of M14 questions as rendered scenarios', () => {
    const scenarioQuestions = getM14Questions().filter(
      (question) => question.type === 'scenario' && question.scenarioContext
    );

    expect(scenarioQuestions.map((question) => question.id)).toEqual([
      'm14-q2',
      'm14-q5',
      'm14-q7',
      'm14-q8',
      'm14-q11',
    ]);
    expect(
      scenarioQuestions.length / getM14Questions().length
    ).toBeGreaterThanOrEqual(0.3);
  });
});
