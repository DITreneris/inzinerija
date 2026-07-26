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

  it('does not leave truncated interrogative after en-dash (M10 shortTitle)', () => {
    expect(computeNextSlideContextLabel('Kelias – ką čia rasi', 'lt')).toEqual({
      kind: 'label',
      label: 'Kelias čia rasi',
    });
    expect(computeNextSlideContextLabel('Kelias modulyje', 'lt')).toEqual({
      kind: 'label',
      label: 'Kelias modulyje',
    });
  });

  it('falls back when truncation leaves hanging LT genitive (M7 70.5)', () => {
    expect(
      computeNextSlideContextLabel('Koks tavo analitiko profilis?', 'lt')
    ).toEqual({ kind: 'fallback' });
  });

  it('uses shortTitle-friendly analyst profile label', () => {
    expect(computeNextSlideContextLabel('Analitiko profilis', 'lt')).toEqual({
      kind: 'label',
      label: 'Analitiko profilis',
    });
  });
});
