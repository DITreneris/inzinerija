/**
 * Design tokens – spacing ir radius vienoje vietoje (N-DS2).
 * Šaltinis: docs/development/GOLDEN_STANDARD.md (anksčiau DESIGN_GUIDE_MODULIAI_1_2_3, archyve).
 * Naudojimas: importuoti klasės konstantas arba px vertes; Tailwind naudoja tą pačią 4px bazę.
 */

/** 4 px bazė: 4, 8, 12, 16, 24, 32, 48 px (atitinka Tailwind 1, 2, 3, 4, 6, 8, 12) */
export const spacing = {
  /** 4px – Tailwind p-1, gap-1, space-y-1 */
  1: 4,
  /** 8px – Tailwind p-2, gap-2 */
  2: 8,
  /** 12px – Tailwind p-3, gap-3, space-y-3 (tarp kortelės elementų) */
  3: 12,
  /** 16px – Tailwind p-4, gap-4 */
  4: 16,
  /** 24px – Tailwind p-6, gap-6 (tarp blokų skaidrėje) */
  6: 24,
  /** 32px – Tailwind p-8, gap-8 (tarp sekcijų Summary) */
  8: 32,
  /** 48px – Tailwind p-12 */
  12: 48,
} as const;

/** Tailwind spacing klasės pagal kontekstą (Design Guide 4.3) */
export const spacingClasses = {
  /** Tarp blokų skaidrėje */
  blockGap: 'space-y-6' as const,
  /** Alternatyva: gap-6 */
  blockGapAlt: 'gap-6' as const,
  /** Tarp kortelės elementų */
  cardInner: 'space-y-3' as const,
  cardInnerAlt: 'gap-3' as const,
  /** Vidinis kortelės padding */
  cardPadding: 'p-4' as const,
  cardPaddingMd: 'p-5' as const,
  cardPaddingLg: 'p-6' as const,
  /** Skaidrės wrapper */
  slideWrapper: 'p-6 lg:p-10' as const,
  /** Tarp sekcijų (Summary) */
  sectionGap: 'space-y-8' as const,
} as const;

/** Border-radius vertės (px) – atitinka Tailwind */
export const radius = {
  /** 8px – rounded-lg */
  lg: 8,
  /** 12px – rounded-xl (mažesnis blokas, mygtukas, input) */
  xl: 12,
  /** 16px – rounded-2xl (kortelė, didesnis blokas) */
  '2xl': 16,
  /** 24px – rounded-3xl (retai) */
  '3xl': 24,
  /** Pilnas apskritimas – badge, chip */
  full: 9999,
} as const;

/** Tailwind radius klasės pagal elementą (Design Guide 4.4) */
export const radiusClasses = {
  /** Kortelė, didesnis blokas */
  card: 'rounded-2xl' as const,
  /** Mažesnis blokas, mygtukas, input, code block */
  block: 'rounded-xl' as const,
  /** Badge, small chip */
  badge: 'rounded-full' as const,
  badgeAlt: 'rounded-lg' as const,
} as const;
