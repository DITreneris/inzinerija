import { describe, it, expect, beforeEach } from 'vitest';
import {
  CHAPTER_ENTRIES,
  CHAPTER_RECOVERY_DISMISSED_KEY,
  dismissChapterRecovery,
  getChapterEntryModuleIds,
  getRecommendedChapterAwareModuleIds,
  getSequenceLockedModuleIds,
  isChapterEntryUnlocked,
  isChapterRecoveryDismissed,
  shouldShowChapterRecovery,
  shouldShowChapterStartBadge,
} from '../chapterStarts';

/** Minimal catalog matching production unlocksAfter (M7/M10 after M6). */
const CATALOG = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7, unlocksAfter: 6 },
  { id: 8, unlocksAfter: 7 },
  { id: 9, unlocksAfter: 8 },
  { id: 10, unlocksAfter: 6 },
  { id: 11, unlocksAfter: 10 },
  { id: 12, unlocksAfter: 11 },
];

const TRACKS = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];

describe('chapterStarts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getChapterEntryModuleIds', () => {
    it.each([
      [0, []],
      [3, [1]],
      [6, [1, 4]],
      [9, [1, 4, 7]],
      [12, [1, 4, 7, 10]],
      [15, [1, 4, 7, 10]],
    ] as const)('tier %i → %j', (tier, expected) => {
      expect(getChapterEntryModuleIds(tier)).toEqual([...expected]);
    });
  });

  describe('isChapterEntryUnlocked', () => {
    it('unlocks M4 at tier 6+', () => {
      expect(isChapterEntryUnlocked(4, 3)).toBe(false);
      expect(isChapterEntryUnlocked(4, 6)).toBe(true);
      expect(isChapterEntryUnlocked(4, 9)).toBe(true);
    });

    it('unlocks M7 at tier 9+ and M10 at tier 12+', () => {
      expect(isChapterEntryUnlocked(7, 6)).toBe(false);
      expect(isChapterEntryUnlocked(7, 9)).toBe(true);
      expect(isChapterEntryUnlocked(10, 9)).toBe(false);
      expect(isChapterEntryUnlocked(10, 12)).toBe(true);
    });

    it('does not treat mid-chapter modules as entries', () => {
      expect(isChapterEntryUnlocked(5, 12)).toBe(false);
      expect(isChapterEntryUnlocked(8, 12)).toBe(false);
      expect(isChapterEntryUnlocked(9, 12)).toBe(false);
      expect(isChapterEntryUnlocked(11, 12)).toBe(false);
    });

    it('CHAPTER_ENTRIES covers exactly 1/4/7/10', () => {
      expect(CHAPTER_ENTRIES.map((e) => e.moduleId)).toEqual([1, 4, 7, 10]);
    });
  });

  describe('shouldShowChapterRecovery', () => {
    it('true only when empty progress and tier ≥ 6', () => {
      expect(shouldShowChapterRecovery([], 6)).toBe(true);
      expect(shouldShowChapterRecovery([], 9)).toBe(true);
      expect(shouldShowChapterRecovery([], 3)).toBe(false);
      expect(shouldShowChapterRecovery([1], 9)).toBe(false);
      expect(shouldShowChapterRecovery([], 0)).toBe(false);
    });
  });

  describe('dismiss storage', () => {
    it('dismissChapterRecovery sets key and isChapterRecoveryDismissed reads it', () => {
      expect(isChapterRecoveryDismissed()).toBe(false);
      dismissChapterRecovery();
      expect(localStorage.getItem(CHAPTER_RECOVERY_DISMISSED_KEY)).toBe('1');
      expect(isChapterRecoveryDismissed()).toBe(true);
    });
  });

  describe('getSequenceLockedModuleIds', () => {
    it('tier 6 empty: M4 open; M2/M3/M5 locked; M7 locked by tier-unrelated sequence', () => {
      const locked = getSequenceLockedModuleIds(CATALOG, [], 6);
      expect(locked.has(4)).toBe(false);
      expect(locked.has(2)).toBe(true);
      expect(locked.has(3)).toBe(true);
      expect(locked.has(5)).toBe(true);
      expect(locked.has(7)).toBe(true);
    });

    it('tier 9 empty: M7 open; M8 locked; M5 locked', () => {
      const locked = getSequenceLockedModuleIds(CATALOG, [], 9);
      expect(locked.has(4)).toBe(false);
      expect(locked.has(7)).toBe(false);
      expect(locked.has(8)).toBe(true);
      expect(locked.has(5)).toBe(true);
      expect(locked.has(10)).toBe(true);
    });

    it('tier 12 empty: M7 and M10 open; M11 locked', () => {
      const locked = getSequenceLockedModuleIds(CATALOG, [], 12);
      expect(locked.has(7)).toBe(false);
      expect(locked.has(10)).toBe(false);
      expect(locked.has(11)).toBe(true);
      expect(locked.has(8)).toBe(true);
    });

    it('after completing M4, M5 unlocks; M1–3 not auto-completed', () => {
      const locked = getSequenceLockedModuleIds(CATALOG, [4], 9);
      expect(locked.has(5)).toBe(false);
      expect(locked.has(2)).toBe(true);
      expect(locked.has(3)).toBe(true);
    });

    it('disableSequenceLock returns empty set', () => {
      expect(getSequenceLockedModuleIds(CATALOG, [], 6, true).size).toBe(0);
    });
  });

  describe('getRecommendedChapterAwareModuleIds', () => {
    it('empty tier 9 recommends M1 and M7', () => {
      const rec = getRecommendedChapterAwareModuleIds(TRACKS, CATALOG, [], 9);
      expect([...rec].sort((a, b) => a - b)).toEqual([1, 7]);
    });

    it('empty tier 12 recommends M1, M7, M10', () => {
      const rec = getRecommendedChapterAwareModuleIds(TRACKS, CATALOG, [], 12);
      expect([...rec].sort((a, b) => a - b)).toEqual([1, 7, 10]);
    });
  });

  describe('shouldShowChapterStartBadge', () => {
    it('shows on M7 when empty tier 9; hides after M6 completed', () => {
      expect(shouldShowChapterStartBadge(7, CATALOG, [], 9)).toBe(true);
      expect(shouldShowChapterStartBadge(7, CATALOG, [6], 9)).toBe(false);
    });

    it('shows on M1 only when progress empty', () => {
      expect(shouldShowChapterStartBadge(1, CATALOG, [], 6)).toBe(true);
      expect(shouldShowChapterStartBadge(1, CATALOG, [1], 6)).toBe(false);
      expect(shouldShowChapterStartBadge(1, CATALOG, [2], 6)).toBe(false);
    });
  });
});
