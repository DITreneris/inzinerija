import { describe, expect, it } from 'vitest';
import modulesData from '../../../../data/modules.json';
import type { Module, TestQuestion } from '../../../../types/modules';

const modules = modulesData.modules as Module[];

function getM17Questions(): TestQuestion[] {
  const m17 = modules.find((module) => module.id === 17);
  const testSection = m17?.slides.find((slide) => slide.id === 171);
  return testSection?.testQuestions ?? [];
}

function calculateScore(correctCount: number, total: number): number {
  return total > 0 ? Math.round((correctCount / total) * 100) : 0;
}

describe('TestPracticeSlides M17 data contract', () => {
  it('keeps Path Test Shell: intro → warm-up → graded → results → bonus', () => {
    const m17 = modules.find((module) => module.id === 17);
    const slideIds = m17?.slides.map((slide) => slide.id);
    expect(slideIds).toEqual([170, 170.5, 171, 172, 173]);

    const warmUp = m17?.slides.find((slide) => slide.id === 170.5);
    const bonus = m17?.slides.find((slide) => slide.id === 173);
    const warmQuestions =
      (warmUp?.content as { questions?: { id: string }[] })?.questions ?? [];
    expect(warmUp?.type).toBe('warm-up-quiz');
    expect(warmQuestions.map((q) => q.id)).toEqual([
      'm17-warm-1',
      'm17-warm-2',
      'm17-warm-3',
    ]);
    expect(bonus?.type).toBe('content-block');
    expect(bonus?.optional).toBe(true);
    expect(bonus?.badgeVariant).toBe('bonus');
  });

  it('keeps the M17 test at 11 questions with a 70 percent pass threshold', () => {
    const m17 = modules.find((module) => module.id === 17);
    const intro = m17?.slides.find((slide) => slide.id === 170);
    const questions = getM17Questions();

    expect(questions.map((question) => question.id)).toEqual([
      'm17-q1',
      'm17-q2',
      'm17-q3',
      'm17-q4',
      'm17-q5',
      'm17-q6',
      'm17-q7',
      'm17-q8',
      'm17-q9',
      'm17-q10',
      'm17-q11',
    ]);
    expect(
      (intro?.content as { thresholds?: { pass?: number } })?.thresholds
    ).toMatchObject({ pass: 70 });
    // 8/11 ≈ 73%; 7/11 ≈ 64%
    expect(calculateScore(8, questions.length)).toBeGreaterThanOrEqual(70);
    expect(calculateScore(7, questions.length)).toBeLessThan(70);
  });

  it('keeps remediation relatedSlideId on graded questions', () => {
    const withRemediation = getM17Questions().filter(
      (q) => q.relatedSlideId != null
    );
    expect(withRemediation.length).toBe(getM17Questions().length);
  });

  it('includes one ordering item and keeps M18-forward items ≤2', () => {
    const questions = getM17Questions();
    const ordering = questions.filter((q) => q.type === 'ordering');
    expect(ordering).toHaveLength(1);
    expect(ordering[0]?.id).toBe('m17-q4');
    expect(ordering[0]?.correctOrder).toEqual([
      'Vibe',
      'Skeleton',
      'Refinement',
    ]);
    // Forward bridge ≤2: Cursor before generate (q8) + diff ritual (q11 → 18.201).
    const forwardIds = questions
      .filter((q) => /PACKET|Cursor prieš|diff/i.test(q.question))
      .map((q) => q.id);
    expect(forwardIds.length).toBeLessThanOrEqual(2);
    expect(forwardIds).toContain('m17-q8');
    expect(forwardIds).toContain('m17-q11');
  });
});
