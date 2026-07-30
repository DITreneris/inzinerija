import { describe, expect, it } from 'vitest';
import {
  countFilledTracked,
  getHintMissing,
  getI2vReadiness,
  getQualityLevel,
  isFilled,
  VAIZDO_GEN_TRACKED_KEYS,
} from '../vaizdoGenQuality';

describe('vaizdoGenQuality', () => {
  it('isFilled trims whitespace', () => {
    expect(isFilled('  x  ')).toBe(true);
    expect(isFilled('   ')).toBe(false);
    expect(isFilled(undefined)).toBe(false);
  });

  it('counts tracked fields and levels', () => {
    const empty = Object.fromEntries(
      VAIZDO_GEN_TRACKED_KEYS.map((k) => [k, ''])
    );
    expect(countFilledTracked(empty)).toBe(0);
    expect(getQualityLevel(0)).toBe('weak');
    expect(getQualityLevel(2)).toBe('weak');
    expect(getQualityLevel(3)).toBe('medium');
    expect(getQualityLevel(5)).toBe('good');
    expect(getQualityLevel(7)).toBe('good');
    expect(getQualityLevel(9)).toBe('premium');
  });

  it('hint priority lists free-text first', () => {
    const values = {
      object: '',
      goal: '',
      audience: 'aud',
      color: '',
      style: 's',
      lighting: 'l',
      camera: 'c',
      aspectRatio: '1:1',
      campaignGoal: '',
    };
    expect(getHintMissing(values)[0]).toBe('object');
    expect(getHintMissing(values)).toContain('campaignGoal');
    expect(getHintMissing(values)).not.toContain('style');
  });

  it('I2V readiness requires learner-owned signals for ready', () => {
    expect(getI2vReadiness('', true, 'pan', true).level).toBe('weak');
    expect(getI2vReadiness('hero', true, 'pan', true).level).toBe('ready');
    expect(getI2vReadiness('hero', true, '', false).level).toBe('medium');
    expect(getI2vReadiness('hero', false, '', false).level).toBe('weak');
    expect(getI2vReadiness('', true, 'pan', true).level).not.toBe('ready');
  });
});
