/**
 * Prieigos lygių kainos (vienkartinis pirkimas).
 * Naudojama ModulesPage CTA ir accessTier validacijai.
 */
export const ACCESS_TIERS = [
  { maxModuleId: 3, priceEur: 39 },
  { maxModuleId: 6, priceEur: 99 },
  { maxModuleId: 9, priceEur: 149 },
  { maxModuleId: 12, priceEur: 199 },
] as const;

export type AccessTier = (typeof ACCESS_TIERS)[number];

/** Leidžiami max atrakinto modulio ID (0 = niekas neįsigyta). */
export const VALID_MAX_MODULE_IDS = [0, 3, 6, 9, 12] as const;

/**
 * Grąžina mažiausią tier, kuris atrakina nurodytą modulį.
 * Pvz. modulis 5 → tier su maxModuleId 6, priceEur 99.
 */
export function getTierForModule(moduleId: number): AccessTier | null {
  const tier = ACCESS_TIERS.find((t) => t.maxModuleId >= moduleId);
  return tier ?? null;
}
