import type { Progress } from './progress';

/** Moduliai, įeinantys į bazinį 1 dalies sertifikatą. */
export const CERTIFICATE_TIER1_MODULE_IDS = [1, 2, 3] as const;

/** Moduliai, įeinantys į Duomenų analizės kelią (tier 3 sertifikatas). */
export const CERTIFICATE_TIER3_PATH_MODULE_IDS = [7, 8, 9] as const;

/** Moduliai, įeinantys į Agentų inžinerijos kelią (tier 4 sertifikatas). */
export const CERTIFICATE_TIER4_PATH_MODULE_IDS = [10, 11, 12] as const;

/** Moduliai, įeinantys į Turinio inžinerijos kelią (tier 5 sertifikatas). */
export const CERTIFICATE_TIER5_PATH_MODULE_IDS = [13, 14, 15] as const;

const FINAL_QUIZ_PASS_PERCENT = 70;
const M8_TEST_PASS_PERCENT = 70;
const M11_TEST_PASS_PERCENT = 70;
const M14_TEST_PASS_PERCENT = 70;

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

/**
 * Tier 4 PDF: baigti moduliai 10, 11, 12 ir Modulio 11 testas ≥ 70 %.
 */
export function canRequestCertificateTier4(progress: Progress): boolean {
  const done = progress.completedModules;
  if (!CERTIFICATE_TIER4_PATH_MODULE_IDS.every((id) => done.includes(id))) {
    return false;
  }
  return (progress.moduleTestScores?.[11] ?? 0) >= M11_TEST_PASS_PERCENT;
}

/**
 * Tier 5 PDF: baigti moduliai 13, 14, 15 ir Modulio 14 testas ≥ 70 %.
 */
export function canRequestCertificateTier5(progress: Progress): boolean {
  const done = progress.completedModules;
  if (!CERTIFICATE_TIER5_PATH_MODULE_IDS.every((id) => done.includes(id))) {
    return false;
  }
  return (progress.moduleTestScores?.[14] ?? 0) >= M14_TEST_PASS_PERCENT;
}
