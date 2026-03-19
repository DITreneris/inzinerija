/**
 * accessTier: getMaxAccessibleModuleId localStorage priority, migration, hasAccessTokenInUrl.
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
    localStorage.clear();
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  describe('getMaxAccessibleModuleId', () => {
    it('returns tier from localStorage when verified_access_tier is set', () => {
      localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '6');
      expect(getMaxAccessibleModuleId()).toBe(6);
    });

    it('returns 3 from localStorage when set', () => {
      localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '3');
      expect(getMaxAccessibleModuleId()).toBe(3);
    });

    it('ignores invalid localStorage value', () => {
      localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '99');
      expect(getMaxAccessibleModuleId()).toBe(0);
    });

    it('returns 0 when no verified tier exists (default locked)', () => {
      expect(getMaxAccessibleModuleId()).toBe(0);
    });

    it('does not trust access_tier from URL without verified session', () => {
      window.history.replaceState({}, '', '/?access_tier=6');
      expect(getMaxAccessibleModuleId()).toBe(0);
    });

    it('migrates sessionStorage value to localStorage', () => {
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '6');
      expect(getMaxAccessibleModuleId()).toBe(6);
      expect(localStorage.getItem(VERIFIED_ACCESS_TIER_KEY)).toBe('6');
      expect(sessionStorage.getItem(VERIFIED_ACCESS_TIER_KEY)).toBeNull();
    });

    it('prefers localStorage over sessionStorage', () => {
      localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '3');
      sessionStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '6');
      expect(getMaxAccessibleModuleId()).toBe(3);
    });

    it('caps at 6 when MVP and localStorage has 9', async () => {
      const { getIsMvpMode } = await import('../mvpMode');
      vi.mocked(getIsMvpMode).mockReturnValue(true);
      localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '9');
      expect(getMaxAccessibleModuleId()).toBe(6);
      vi.mocked(getIsMvpMode).mockReturnValue(false);
    });

    it('caps at 6 when MVP and localStorage has 12', async () => {
      const { getIsMvpMode } = await import('../mvpMode');
      vi.mocked(getIsMvpMode).mockReturnValue(true);
      localStorage.setItem(VERIFIED_ACCESS_TIER_KEY, '12');
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
        stripMagicLinkSearchParams(
          '?access_tier=6&token=abc&expires=123&foo=bar&max_module=6'
        )
      ).toBe('?foo=bar');
    });

    it('returns empty string when only magic-link params are present', () => {
      expect(
        stripMagicLinkSearchParams('?access_tier=6&token=abc&expires=123')
      ).toBe('');
    });
  });
});
