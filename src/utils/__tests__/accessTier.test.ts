/**
 * accessTier: getMaxAccessibleModuleId sessionStorage priority, hasAccessTokenInUrl, MVP cap.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getMaxAccessibleModuleId,
  hasAccessTokenInUrl,
  stripMagicLinkSearchParams,
  VERIFIED_ACCESS_TIER_KEY,
} from '../accessTier';

vi.mock('../mvpMode', () => ({ getIsMvpMode: vi.fn(() => false) }));

describe('accessTier', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  describe('getMaxAccessibleModuleId', () => {
    it('returns tier from sessionStorage when verified_access_tier is set', () => {
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '6');
      expect(getMaxAccessibleModuleId()).toBe(6);
    });

    it('returns 3 from sessionStorage when set', () => {
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '3');
      expect(getMaxAccessibleModuleId()).toBe(3);
    });

    it('ignores invalid sessionStorage value', () => {
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '99');
      expect(getMaxAccessibleModuleId()).toBe(0);
    });

    it('does not trust access_tier from URL without verified session', () => {
      window.history.replaceState({}, '', '/?access_tier=6');
      expect(getMaxAccessibleModuleId()).toBe(0);
    });

    it('caps at 6 when MVP and sessionStorage has 9', async () => {
      const { getIsMvpMode } = await import('../mvpMode');
      vi.mocked(getIsMvpMode).mockReturnValue(true);
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '9');
      expect(getMaxAccessibleModuleId()).toBe(6);
      vi.mocked(getIsMvpMode).mockReturnValue(false);
    });

    it('caps at 6 when MVP and sessionStorage has 12', async () => {
      const { getIsMvpMode } = await import('../mvpMode');
      vi.mocked(getIsMvpMode).mockReturnValue(true);
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '12');
      expect(getMaxAccessibleModuleId()).toBe(6);
      vi.mocked(getIsMvpMode).mockReturnValue(false);
    });
  });

  describe('hasAccessTokenInUrl', () => {
    it('returns false when URL has no token param', () => {
      window.history.replaceState({}, '', '/?access_tier=6');
      expect(hasAccessTokenInUrl()).toBe(false);
    });

    it('returns true when URL has token param', () => {
      window.history.replaceState({}, '', '/?access_tier=6&token=abc');
      expect(hasAccessTokenInUrl()).toBe(true);
    });
  });

  describe('stripMagicLinkSearchParams', () => {
    it('removes only magic-link params and preserves unrelated query params', () => {
      expect(
        stripMagicLinkSearchParams('?access_tier=6&token=abc&expires=123&foo=bar&max_module=6')
      ).toBe('?foo=bar');
    });

    it('returns empty string when only magic-link params are present', () => {
      expect(stripMagicLinkSearchParams('?access_tier=6&token=abc&expires=123')).toBe('');
    });
  });
});
