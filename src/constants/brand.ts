/**
 * Prompt Anatomy brand — code SOT (DS v0.3.1).
 * Wordmark, domain, training path and brand-mark colors in one place.
 * Spec: docs/development/BRAND_MARK_SPEC.md; Phase 2 extract contract:
 * docs/development/PACKAGES_BRAND_CONTRACT.md (frozen API — do not break shape).
 */

export type BrandLocale = 'lt' | 'en';

export const BRAND = {
  /** Wordmark per locale (user-facing). */
  nameLt: 'Promptų anatomija',
  nameEn: 'Prompt Anatomy',
  /** Canonical hub domain (no protocol). */
  domain: 'promptanatomy.app',
  /** Hub root (matches ecosystemUrls.hub). */
  hubUrl: 'https://www.promptanatomy.app/',
  /** Canonical training base path on the hub monorepo. */
  trainingPath: '/anatomy/',
  /** Legacy training path — 301 redirect only, do not link directly. */
  legacyTrainingPath: '/anatomija/',
  /**
   * Brand-mark colors (hub favicon SOT). Used by BrandMark.tsx.
   * gradient = rounded badge; bolt = lightning glyph.
   */
  colors: {
    badgeStart: '#050d14',
    badgeEnd: '#103b5a',
    bolt: '#fbd304',
  },
} as const;

/** Locale-aware wordmark. Fallback: LT. */
export function brandName(locale?: string): string {
  return locale === 'en' ? BRAND.nameEn : BRAND.nameLt;
}
