import { describe, expect, it } from 'vitest';
import modulesData from '../../../../data/modules.json';
import modulesEnData from '../../../../data/modules-en-m13-m15.json';
import type { Module, TestQuestion } from '../../../../types/modules';

const modules = modulesData.modules as Module[];
const modulesEn = modulesEnData.modules as Module[];

function getM14Questions(source: Module[] = modules): TestQuestion[] {
  const m14 = source.find((module) => module.id === 14);
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

  it('keeps warm-up from previewing graded brand/format or audio-first stems', () => {
    const m14 = modules.find((module) => module.id === 14);
    const warmUp = m14?.slides.find((slide) => slide.id === 140.5);
    const warmQuestions =
      (
        warmUp?.content as {
          questions?: { question?: string; options?: string[] }[];
        }
      )?.questions ?? [];
    const warmBlob = warmQuestions
      .map((question) => `${question.question} ${question.options?.join(' ')}`)
      .join(' ');
    const q2 = getM14Questions().find((question) => question.id === 'm14-q2');
    const q10 = getM14Questions().find((question) => question.id === 'm14-q10');

    expect(warmQuestions[0]?.options?.[0]).toMatch(
      /atpažįstamumas|įsitraukimas|konversija/i
    );
    expect(warmQuestions[1]?.question).toMatch(/tą patį produktą|personažą/i);
    expect(warmBlob).not.toMatch(/1:1 feed|9:16 Stories/i);
    expect(warmBlob).not.toMatch(/audio-first/i);
    expect(q2?.question).toMatch(/brandą|formatą/i);
    expect(q10?.question).toMatch(/audio-first/i);
  });

  it('keeps remediation links pointed at live M13 slides', () => {
    const questionsById = new Map(
      getM14Questions().map((question) => [question.id, question])
    );

    expect(questionsById.get('m14-q1')?.relatedSlideId).toBe(13.2);
    expect(questionsById.get('m14-q2')?.relatedSlideId).toBe(13.3);
    expect(questionsById.get('m14-q3')?.relatedSlideId).toBe(13.4);
    expect(questionsById.get('m14-q4')?.relatedSlideId).toBe(13.6);
    expect(questionsById.get('m14-q5')?.relatedSlideId).toBe(13.101);
    expect(questionsById.get('m14-q6')?.relatedSlideId).toBe(13.11);
    expect(questionsById.get('m14-q7')?.relatedSlideId).toBe(13.1);
    expect(questionsById.get('m14-q8')?.relatedSlideId).toBe(13.12);
    expect(questionsById.get('m14-q9')?.relatedSlideId).toBe(13.12);
    expect(questionsById.get('m14-q10')?.relatedSlideId).toBe(13.6);
    expect(questionsById.get('m14-q11')?.relatedSlideId).toBe(13.7);
    expect(questionsById.get('m14-q12')?.relatedSlideId).toBe(13.101);
  });

  it('keeps learner chrome free of bare pipeline or workflow jargon', () => {
    const m14 = modules.find((module) => module.id === 14);
    const intro = m14?.slides.find((slide) => slide.id === 140);
    const graded = m14?.slides.find((slide) => slide.id === 141);
    const results = m14?.slides.find((slide) => slide.id === 142);
    const introContent = intro?.content as {
      firstActionCTA?: string;
    };
    const resultsContent = results?.content as {
      failedMessage?: string;
      reflectionPrompt?: string;
    };
    const chrome = [
      introContent.firstActionCTA,
      graded?.subtitle,
      resultsContent.failedMessage,
      resultsContent.reflectionPrompt,
    ].join(' ');

    expect(chrome).not.toMatch(/\bpipeline\b/i);
    expect(chrome).not.toMatch(/\bworkflow\b/i);
    expect(introContent.firstActionCTA).toMatch(
      /vaizdus, video, garsą ir teises/i
    );
  });

  it('keeps q1 q3 q4 distractors free of Tik-only stubs', () => {
    const questionsById = new Map(
      getM14Questions().map((question) => [question.id, question])
    );

    for (const id of ['m14-q1', 'm14-q3', 'm14-q4'] as const) {
      const options = questionsById.get(id)?.options ?? [];
      expect(options.some((option) => /^Tik /i.test(option))).toBe(false);
    }
    expect(questionsById.get('m14-q1')?.options?.[2]).toMatch(/seed/i);
    expect(questionsById.get('m14-q3')?.options?.[0]).toMatch(/Kling|Runway/i);
    expect(questionsById.get('m14-q4')?.options?.[0]).toMatch(/BPM/i);
  });

  it('keeps EN graded twins free of walk filler', () => {
    const enQuestions = getM14Questions(modulesEn);
    const blob = enQuestions
      .flatMap((question) => [
        question.question,
        ...(question.options ?? []),
        question.explanation,
        question.scenarioContext,
      ])
      .join(' ');

    expect(enQuestions).toHaveLength(12);
    expect(blob).not.toMatch(/Only one narrow detail/i);
    expect(blob).not.toMatch(/A clear, specific option based on goal/i);
    expect(
      enQuestions.find((question) => question.id === 'm14-q8')?.relatedSlideId
    ).toBe(13.12);

    const enM14 = modulesEn.find((module) => module.id === 14);
    const enWarm = enM14?.slides.find((slide) => slide.id === 140.5);
    expect(enWarm?.shortTitle).toBe('Warm-up');
    const enIntro140 = enM14?.slides.find((slide) => slide.id === 140)?.content;
    expect(
      enIntro140 && 'whyBenefit' in enIntro140
        ? enIntro140.whyBenefit
        : undefined
    ).toMatch(/ready for the Module 15 project/i);
  });

  it('keeps M14-ITEMS stems: chain, no CPI, license principle, C2PA provenance', () => {
    const questionsById = new Map(
      getM14Questions().map((question) => [question.id, question])
    );
    const enById = new Map(
      getM14Questions(modulesEn).map((question) => [question.id, question])
    );

    expect(questionsById.get('m14-q6')?.question).toMatch(/15 s|grandinė/i);
    expect(questionsById.get('m14-q6')?.options?.[1]).toMatch(/užduotis/i);
    expect(questionsById.get('m14-q9')?.options?.join(' ')).not.toMatch(
      /\bCPI\b/i
    );
    expect(questionsById.get('m14-q9')?.explanation).not.toMatch(/\bCPI\b/i);
    expect(questionsById.get('m14-q11')?.options?.join(' ')).not.toMatch(
      /ElevenMusic|Soundraw|Beatoven|Suno/i
    );
    expect(questionsById.get('m14-q11')?.question).toMatch(
      /licenc|patikrinti/i
    );
    expect(questionsById.get('m14-q12')?.question).toMatch(
      /C2PA|Content Credentials/i
    );
    expect(questionsById.get('m14-q12')?.options?.[1]).toMatch(
      /kilmei|istorijai/i
    );
    expect(questionsById.get('m14-q12')?.options?.[1]).not.toMatch(
      /watermark|disclosure/i
    );

    expect(enById.get('m14-q9')?.options?.join(' ')).not.toMatch(/\bCPI\b/i);
    expect(enById.get('m14-q11')?.options?.join(' ')).not.toMatch(
      /ElevenMusic|Soundraw|Beatoven|Suno/i
    );
    expect(enById.get('m14-q12')?.question).toMatch(
      /C2PA|Content Credentials/i
    );
    expect(enById.get('m14-q12')?.options?.[1]).toMatch(/origin|edit history/i);
  });
});
