import { describe, expect, it } from 'vitest';
import {
  getContentTrackSwatches,
  isVaizdoPresetId,
} from '../contentTrackSwatches';

describe('contentTrackSwatches', () => {
  it('returns preset swatches for ecommerce / social', () => {
    const eco = getContentTrackSwatches({ presetId: 'ecommerce' });
    expect(eco.length).toBeGreaterThanOrEqual(3);
    expect(eco.every((h) => h.startsWith('#'))).toBe(true);
    const social = getContentTrackSwatches({ presetId: 'social' });
    expect(social).not.toEqual(eco);
  });

  it('returns warm free-text chips when color set without preset', () => {
    const chips = getContentTrackSwatches({ colorText: 'coral and blue' });
    expect(chips).toHaveLength(3);
  });

  it('returns empty when no preset and empty color', () => {
    expect(getContentTrackSwatches({})).toEqual([]);
    expect(getContentTrackSwatches({ colorText: '  ' })).toEqual([]);
  });

  it('prefers preset over free-text', () => {
    const fromPreset = getContentTrackSwatches({
      presetId: 'brand',
      colorText: 'ignored',
    });
    expect(fromPreset.length).toBeGreaterThanOrEqual(3);
    expect(isVaizdoPresetId('brand')).toBe(true);
    expect(isVaizdoPresetId('nope')).toBe(false);
  });
});
