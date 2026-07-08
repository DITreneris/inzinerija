import { describe, expect, it } from 'vitest';
import {
  computeNextSlideContextLabel,
  looksLithuanianForEn,
} from '../navLabel';

describe('navLabel', () => {
  it('builds short locale-aware label fragments', () => {
    expect(
      computeNextSlideContextLabel('Savitikra: META / INPUT / OUTPUT', 'lt')
    ).toEqual({ kind: 'label', label: 'META / INPUT' });
    expect(
      computeNextSlideContextLabel('Self-check: Data preparation', 'en')
    ).toEqual({ kind: 'label', label: 'Data preparation' });
  });

  it('falls back when EN label still looks Lithuanian', () => {
    expect(looksLithuanianForEn('Duomenų analizė')).toBe(true);
    expect(looksLithuanianForEn('Savitikra')).toBe(true);
    expect(computeNextSlideContextLabel('Duomenų analizė', 'en')).toEqual({
      kind: 'fallback',
    });
  });

  it('falls back for long context labels', () => {
    expect(
      computeNextSlideContextLabel(
        'ExtraordinaryLongAnalyticsWorkflowTitle',
        'en'
      )
    ).toEqual({ kind: 'fallback' });
  });
});
