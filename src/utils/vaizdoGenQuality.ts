/**
 * Quality / readiness meter for VaizdoGeneratoriusSlide (M13 13.37).
 * Tracked fields mirror vaizdas UX; levels used for pedagogic Patikra.
 */

export type VaizdoGenQualityLevel = 'weak' | 'medium' | 'good' | 'premium';

export const VAIZDO_GEN_TRACKED_KEYS = [
  'object',
  'goal',
  'audience',
  'color',
  'style',
  'lighting',
  'camera',
  'aspectRatio',
  'campaignGoal',
] as const;

export type VaizdoGenTrackedKey = (typeof VAIZDO_GEN_TRACKED_KEYS)[number];

export function isFilled(value: string | undefined | null): boolean {
  return String(value ?? '').trim().length > 0;
}

export function countFilledTracked(
  values: Partial<Record<VaizdoGenTrackedKey, string>>,
  keys: readonly VaizdoGenTrackedKey[] = VAIZDO_GEN_TRACKED_KEYS
): number {
  return keys.filter((key) => isFilled(values[key])).length;
}

export function getMissingTracked(
  values: Partial<Record<VaizdoGenTrackedKey, string>>,
  keys: readonly VaizdoGenTrackedKey[] = VAIZDO_GEN_TRACKED_KEYS
): VaizdoGenTrackedKey[] {
  return keys.filter((key) => !isFilled(values[key]));
}

/** Free-text first for pedagogic hints (plan I1). */
export const VAIZDO_GEN_HINT_PRIORITY: readonly VaizdoGenTrackedKey[] = [
  'object',
  'goal',
  'audience',
  'color',
  'campaignGoal',
  'aspectRatio',
  'style',
  'lighting',
  'camera',
];

export function getHintMissing(
  values: Partial<Record<VaizdoGenTrackedKey, string>>
): VaizdoGenTrackedKey[] {
  const missing = new Set(getMissingTracked(values));
  return VAIZDO_GEN_HINT_PRIORITY.filter((key) => missing.has(key));
}

export function getQualityLevel(
  filled: number,
  total: number = VAIZDO_GEN_TRACKED_KEYS.length
): VaizdoGenQualityLevel {
  if (filled <= 2) return 'weak';
  if (filled <= 4) return 'medium';
  if (filled <= total - 2) return 'good';
  if (filled >= total) return 'premium';
  return 'good';
}

export type I2vReadinessLevel = 'weak' | 'medium' | 'ready';

export function getI2vReadiness(
  keyframe: string,
  durationOk: boolean,
  motion: string,
  sameLock: boolean
): { filled: number; total: number; level: I2vReadinessLevel } {
  const hasKeyframe = isFilled(keyframe);
  const checks = [hasKeyframe, durationOk, isFilled(motion), sameLock];
  const filled = checks.filter(Boolean).length;
  const total = 4;
  let level: I2vReadinessLevel = 'weak';
  if (filled >= 4 && hasKeyframe && durationOk) level = 'ready';
  else if (hasKeyframe && filled >= 2) level = 'medium';
  return { filled, total, level };
}
