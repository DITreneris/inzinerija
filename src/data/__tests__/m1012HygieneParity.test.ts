import { describe, expect, it } from 'vitest';
import {
  isParityLtMissingExempt,
  isRepeatableChrome,
  isSameSlideFillerRepeat,
  numbersIn,
  stripNumberNoise,
} from '../../../scripts/lib/m1012-hygiene-parity.mjs';

describe('stripNumberNoise / numbersIn', () => {
  it('keeps real duration mismatch 25–30 vs 20–25', () => {
    expect(numbersIn('~25–30 min')).toEqual(['25', '30']);
    expect(numbersIn('~20–25 min')).toEqual(['20', '25']);
    expect(numbersIn('~25–30 min').join(',')).not.toBe(
      numbersIn('~20–25 min').join(',')
    );
  });

  it('does not treat 1-page as a KPI digit', () => {
    expect(numbersIn('1-page outline + 3 tests')).toEqual(['3']);
    expect(numbersIn('3 testai ir kada žmogus tvirtina')).toEqual(['3']);
    expect(numbersIn('1 puslapio ataskaita, 3–5 punktai')).toEqual(['3', '5']);
  });

  it('strips 3A, n8n, L0–L3, Module N / M4', () => {
    expect(
      stripNumberNoise('3 questions: error handling, 3A, search')
    ).not.toMatch(/3A/);
    expect(numbersIn('3 questions: error handling, 3A, search')).toEqual(['3']);
    expect(numbersIn('Zapier / Make / n8n')).toEqual([]);
    expect(numbersIn('gylio lygiai (L0–L3)')).toEqual([]);
    expect(numbersIn('Konteksto inžineriją iš M4–M6')).toEqual([]);
    expect(numbersIn('Context – Module 4.')).toEqual([]);
    expect(numbersIn('Modules 4–6')).toEqual([]);
    expect(numbersIn('baigusiems modulius 4–6 (Konteksto inžinerija)')).toEqual(
      []
    );
    expect(
      numbersIn(
        'You will apply context engineering from Modules 4–6 to agents.'
      )
    ).toEqual([]);
  });
});

describe('chrome / filler helpers', () => {
  it('matches nested pathLabel and choice label', () => {
    expect(isRepeatableChrome('pathLabel')).toBe(true);
    expect(isRepeatableChrome('content.pathLabel')).toBe(true);
    expect(isRepeatableChrome('content.choices[4].label')).toBe(true);
    expect(isRepeatableChrome('content.sections[2].body')).toBe(false);
  });

  it('exempts EN-only shortTitle from lt-missing', () => {
    expect(isParityLtMissingExempt('shortTitle')).toBe(true);
    expect(isParityLtMissingExempt('content.footer')).toBe(false);
    expect(
      isParityLtMissingExempt('practicalTask.instructions.steps[0].hint')
    ).toBe(false);
  });

  it('treats same-slide CTA repeats as noise', () => {
    const hits = [
      { slide: { slideId: '10.48' }, path: 'content.sections[2].body' },
      { slide: { slideId: '10.48' }, path: 'content.sections[3].body' },
      { slide: { slideId: '10.48' }, path: 'content.sections[4].body' },
    ];
    expect(isSameSlideFillerRepeat(hits)).toBe(true);
    expect(
      isSameSlideFillerRepeat([
        ...hits,
        { slide: { slideId: '10.36' }, path: 'content.sections[0].body' },
      ])
    ).toBe(false);
  });
});
