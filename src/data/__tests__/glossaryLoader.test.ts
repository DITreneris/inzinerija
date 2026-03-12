/**
 * glossaryLoader: getGlossary(locale) returns LT or EN terms.
 */
import { describe, it, expect } from 'vitest';
import { getGlossary } from '../glossaryLoader';

describe('glossaryLoader', () => {
  it('getGlossary("en") returns EN terms', () => {
    const terms = getGlossary('en');
    expect(Array.isArray(terms)).toBe(true);
    expect(terms.length).toBeGreaterThan(0);
    expect(terms.some((t) => t.term === '6-block system')).toBe(true);
    const first = terms[0];
    expect(first).toHaveProperty('term');
    expect(first).toHaveProperty('definition');
    expect(first).toHaveProperty('moduleId');
  });

  it('getGlossary("lt") returns LT terms', () => {
    const terms = getGlossary('lt');
    expect(Array.isArray(terms)).toBe(true);
    expect(terms.length).toBeGreaterThan(0);
    expect(terms.some((t) => t.term === 'A/B testavimas')).toBe(true);
    const first = terms[0];
    expect(first).toHaveProperty('term');
    expect(first).toHaveProperty('definition');
    expect(first).toHaveProperty('moduleId');
  });
});
