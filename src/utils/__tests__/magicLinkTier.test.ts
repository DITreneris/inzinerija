import { describe, it, expect } from 'vitest';
import { isMagicLinkTier, MAGIC_LINK_TIERS } from '../../constants/pricing';

describe('magic link tier validation', () => {
  it('accepts tiers 3, 6, 9', () => {
    for (const tier of MAGIC_LINK_TIERS) {
      expect(isMagicLinkTier(tier)).toBe(true);
    }
  });

  it('rejects tier 0, 12, and invalid values', () => {
    expect(isMagicLinkTier(0)).toBe(false);
    expect(isMagicLinkTier(12)).toBe(false);
    expect(isMagicLinkTier(7)).toBe(false);
    expect(isMagicLinkTier(NaN)).toBe(false);
  });
});
