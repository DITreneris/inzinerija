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

/** Upgrade tier 6 → 9 (marketing copy; abu produktai siunčia access_tier=9). */
export const UPGRADE_FROM_TIER_6_EUR = 49;

/** Tiers accepted by magic link / verify-access (Phase 2: 3, 6, 9). */
export const MAGIC_LINK_TIERS = [3, 6, 9] as const;

export type MagicLinkTier = (typeof MAGIC_LINK_TIERS)[number];

export function isMagicLinkTier(tier: number): tier is MagicLinkTier {
  return (MAGIC_LINK_TIERS as readonly number[]).includes(tier);
}

/**
 * Grąžina mažiausią tier, kuris atrakina nurodytą modulį.
 * Pvz. modulis 5 → tier su maxModuleId 6, priceEur 99.
 */
export function getTierForModule(moduleId: number): AccessTier | null {
  const tier = ACCESS_TIERS.find((t) => t.maxModuleId >= moduleId);
  return tier ?? null;
}
