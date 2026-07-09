import type { Progress } from './progress';

/** Moduliai, įeinantys į bazinį 1 dalies sertifikatą. */
export const CERTIFICATE_TIER1_MODULE_IDS = [1, 2, 3] as const;

/** Moduliai, įeinantys į Duomenų analizės kelią (tier 3 sertifikatas). */
export const CERTIFICATE_TIER3_PATH_MODULE_IDS = [7, 8, 9] as const;

const FINAL_QUIZ_PASS_PERCENT = 70;
const M8_TEST_PASS_PERCENT = 70;

/**
 * Tier 1 PDF: baigti moduliai 1, 2, 3.
 */
export function canRequestCertificateTier1(progress: Progress): boolean {
  const done = progress.completedModules;
  return CERTIFICATE_TIER1_MODULE_IDS.every((id) => done.includes(id));
}

/**
 * Tier 2 PDF: baigti bent 6 moduliai ir baigiamoji apklausa ≥ 70 %.
 */
export function canRequestCertificateTier2(progress: Progress): boolean {
  return (
    progress.completedModules.length >= 6 &&
    progress.quizCompleted &&
    (progress.quizScore ?? 0) >= FINAL_QUIZ_PASS_PERCENT
  );
}

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
