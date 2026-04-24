import type { Progress } from './progress';

/** Moduliai, įeinantys į Duomenų analizės kelią (tier 3 sertifikatas). */
export const CERTIFICATE_TIER3_PATH_MODULE_IDS = [7, 8, 9] as const;

const M8_TEST_PASS_PERCENT = 70;

/**
 * Tier 3 PDF: baigti moduliai 7, 8, 9 ir Modulio 8 testas ≥ 70 %.
 */
export function canRequestCertificateTier3(progress: Progress): boolean {
  const done = progress.completedModules;
  if (!CERTIFICATE_TIER3_PATH_MODULE_IDS.every((id) => done.includes(id))) {
    return false;
  }
  return (progress.moduleTestScores?.[8] ?? 0) >= M8_TEST_PASS_PERCENT;
}
