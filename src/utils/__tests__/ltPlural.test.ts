import { describe, expect, it } from 'vitest';
import {
  enModuleWord,
  ltCountForm,
  ltModulisCompletedParticiple,
  ltModulisGenitive,
  ltModulisNominative,
  moduleWord,
  modulesCompletedWord,
} from '../ltPlural';

describe('ltCountForm', () => {
  it('one: 1, 21, 31 (ne 11)', () => {
    expect(ltCountForm(1)).toBe('one');
    expect(ltCountForm(21)).toBe('one');
    expect(ltCountForm(31)).toBe('one');
    expect(ltCountForm(101)).toBe('one');
  });

  it('few: 2–9, 22–29 (ne 12–19)', () => {
    for (const n of [2, 3, 4, 5, 6, 7, 8, 9, 22, 29, 102]) {
      expect(ltCountForm(n)).toBe('few');
    }
  });

  it('other: 0, 10–20, 30…', () => {
    for (const n of [0, 10, 11, 12, 15, 19, 20, 30, 40, 100]) {
      expect(ltCountForm(n)).toBe('other');
    }
  });
});

describe('ltModulisNominative', () => {
  it('derina formą pagal skaičių', () => {
    expect(ltModulisNominative(1)).toBe('modulis');
    expect(ltModulisNominative(8)).toBe('moduliai');
    expect(ltModulisNominative(9)).toBe('moduliai');
    expect(ltModulisNominative(11)).toBe('modulių');
    expect(ltModulisNominative(20)).toBe('modulių');
    expect(ltModulisNominative(21)).toBe('modulis');
    expect(ltModulisNominative(22)).toBe('moduliai');
    expect(ltModulisNominative(30)).toBe('modulių');
  });
});

describe('ltModulisGenitive', () => {
  it('1 → modulio, kitaip modulių', () => {
    expect(ltModulisGenitive(1)).toBe('modulio');
    expect(ltModulisGenitive(21)).toBe('modulio');
    expect(ltModulisGenitive(2)).toBe('modulių');
    expect(ltModulisGenitive(9)).toBe('modulių');
    expect(ltModulisGenitive(10)).toBe('modulių');
  });
});

describe('ltModulisCompletedParticiple', () => {
  it('baigtas / baigti / baigta', () => {
    expect(ltModulisCompletedParticiple(1)).toBe('baigtas');
    expect(ltModulisCompletedParticiple(8)).toBe('baigti');
    expect(ltModulisCompletedParticiple(10)).toBe('baigta');
  });
});

describe('moduleWord / modulesCompletedWord', () => {
  it('LT nominative + genitive', () => {
    expect(moduleWord('lt', 1)).toBe('modulis');
    expect(moduleWord('lt', 6)).toBe('moduliai');
    expect(moduleWord('lt', 15)).toBe('modulių');
    expect(moduleWord('lt', 1, 'genitive')).toBe('modulio');
    expect(moduleWord('lt', 9, 'genitive')).toBe('modulių');
  });

  it('EN singular/plural', () => {
    expect(enModuleWord(1)).toBe('module');
    expect(enModuleWord(9)).toBe('modules');
    expect(moduleWord('en', 1)).toBe('module');
    expect(moduleWord('en', 1, 'genitive')).toBe('module');
  });

  it('completed participle by locale', () => {
    expect(modulesCompletedWord('lt', 1)).toBe('baigtas');
    expect(modulesCompletedWord('lt', 8)).toBe('baigti');
    expect(modulesCompletedWord('en', 8)).toBe('completed');
  });
});
