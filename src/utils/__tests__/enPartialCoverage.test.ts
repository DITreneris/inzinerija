import { describe, it, expect } from 'vitest';
import {
  hasLithuanianDiacritics,
  isSlideLikelyUntranslatedForEn,
} from '../enPartialCoverage';

describe('enPartialCoverage', () => {
  it('detects Lithuanian diacritics', () => {
    expect(hasLithuanianDiacritics('Duomenų analizė')).toBe(true);
    expect(hasLithuanianDiacritics('Data analysis with AI')).toBe(false);
  });

  it('flags untranslated slide titles for EN locale', () => {
    expect(
      isSlideLikelyUntranslatedForEn('Duomenų analizės kelias', 'LT')
    ).toBe(true);
    expect(
      isSlideLikelyUntranslatedForEn('Data Analysis path', 'Pick your journey')
    ).toBe(false);
  });
});
