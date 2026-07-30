/**
 * Tier-based chapter entry points: sequence lock bypass for major section starts.
 * Access ceiling still comes from getMaxAccessibleModuleId(); this only affects
 * learning-sequence locks (unlocksAfter / previous module), not paid tier.
 */

export const CHAPTER_ENTRIES = [
  { moduleId: 1, minTier: 3 },
  { moduleId: 4, minTier: 6 },
  { moduleId: 7, minTier: 9 },
  { moduleId: 10, minTier: 12 },
] as const;

/** localStorage: dismiss recovery card (strip stays). */
export const CHAPTER_RECOVERY_DISMISSED_KEY =
  'prompt-anatomy-chapter-recovery-dismissed';

/** Module IDs that may skip sequence prerequisites for this access ceiling. */
export function getChapterEntryModuleIds(maxAccessible: number): number[] {
  return CHAPTER_ENTRIES.filter((e) => maxAccessible >= e.minTier).map(
    (e) => e.moduleId
  );
}

export function isChapterEntryUnlocked(
  moduleId: number,
  maxAccessible: number
): boolean {
  return CHAPTER_ENTRIES.some(
    (e) => e.moduleId === moduleId && maxAccessible >= e.minTier
  );
}

/**
 * Show one-time recovery card when learning progress is empty but the learner
 * has at least the M1–6 bundle (tier ≥ 6).
 */
export function shouldShowChapterRecovery(
  completedModules: number[],
  maxAccessible: number
): boolean {
  return completedModules.length === 0 && maxAccessible >= 6;
}

export function isChapterRecoveryDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CHAPTER_RECOVERY_DISMISSED_KEY) === '1';
}

export function dismissChapterRecovery(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CHAPTER_RECOVERY_DISMISSED_KEY, '1');
}

type ModuleUnlockRef = { id: number; unlocksAfter?: number };

/**
 * Sequence-locked module IDs (not tier). Chapter entries skip unlocksAfter
 * when maxAccessible meets their minTier. Does not apply tier ceiling.
 */
export function getSequenceLockedModuleIds(
  modules: ModuleUnlockRef[],
  completedModules: number[],
  maxAccessible: number,
  disableSequenceLock = false
): Set<number> {
  const locked = new Set<number>();
  if (disableSequenceLock || modules.length === 0) return locked;
  modules.forEach((module, index) => {
    if (index === 0) return;
    if (isChapterEntryUnlocked(module.id, maxAccessible)) return;
    const previousModuleId = modules[index - 1]?.id;
    const requiredModuleId = module.unlocksAfter ?? previousModuleId;
    if (
      requiredModuleId != null &&
      !completedModules.includes(requiredModuleId)
    ) {
      locked.add(module.id);
    }
  });
  return locked;
}

/**
 * One recommended next module per track: first incomplete module that is
 * within tier and either has no sequence lock or is a chapter entry.
 */
export function getRecommendedChapterAwareModuleIds(
  trackModuleIds: number[][],
  modules: ModuleUnlockRef[],
  completedModules: number[],
  maxAccessible: number
): Set<number> {
  const recommended = new Set<number>();
  const indexById = new Map(modules.map((m, i) => [m.id, i]));
  for (const trackIds of trackModuleIds) {
    for (const id of trackIds) {
      const index = indexById.get(id);
      if (index == null) continue;
      const module = modules[index];
      if (module.id > maxAccessible) continue;
      if (completedModules.includes(module.id)) continue;
      if (index === 0 || isChapterEntryUnlocked(module.id, maxAccessible)) {
        recommended.add(module.id);
        break;
      }
      const requiredModuleId = module.unlocksAfter ?? modules[index - 1]?.id;
      if (
        requiredModuleId == null ||
        !completedModules.includes(requiredModuleId)
      ) {
        continue;
      }
      recommended.add(module.id);
      break;
    }
  }
  return recommended;
}

/** Badge when chapter entry is open without completing its normal prerequisite. */
export function shouldShowChapterStartBadge(
  moduleId: number,
  modules: ModuleUnlockRef[],
  completedModules: number[],
  maxAccessible: number
): boolean {
  if (!isChapterEntryUnlocked(moduleId, maxAccessible)) return false;
  if (completedModules.includes(moduleId)) return false;
  const index = modules.findIndex((m) => m.id === moduleId);
  if (index < 0) return false;
  if (index === 0) return completedModules.length === 0;
  const requiredModuleId =
    modules[index].unlocksAfter ?? modules[index - 1]?.id;
  if (requiredModuleId == null) return true;
  return !completedModules.includes(requiredModuleId);
}
