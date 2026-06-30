import { Zap } from 'lucide-react';

/**
 * Brand mark (Prompt Anatomy) — single source for the logo glyph.
 * Spec: docs/development/BRAND_MARK_SPEC.md. Glyph = Lucide Zap on a brand-900
 * badge with gold bolt (matches hub favicon BRAND.colors).
 * Variant sizes equal the previous inline marks — no layout shift.
 */
export type BrandMarkVariant = 'nav' | 'hero' | 'footer' | 'icon-only';

const BADGE_CLASSES: Record<BrandMarkVariant, string> = {
  nav: 'rounded-xl bg-brand-900/95 dark:bg-brand-950/90 p-2.5 shadow-sm shadow-brand-900/10 ring-1 ring-brand-700/15 dark:ring-white/10',
  hero: 'rounded-3xl bg-brand-900/95 dark:bg-brand-950/90 p-6 shadow-md shadow-brand-900/8 dark:shadow-black/20 ring-1 ring-brand-700/15 dark:ring-white/10 hover:shadow-lg hover:shadow-brand-900/12 dark:hover:shadow-black/30 hover:scale-[1.02] transition-transform duration-300 animate-bounce-in',
  footer: 'rounded-lg bg-brand-900/95 dark:bg-brand-950/90 p-1.5',
  'icon-only': 'rounded-lg bg-brand-900/95 dark:bg-brand-950/90 p-1.5',
};

const GLYPH_CLASSES: Record<BrandMarkVariant, string> = {
  nav: 'w-5 h-5',
  hero: 'w-16 h-16',
  footer: 'w-3.5 h-3.5',
  'icon-only': 'w-5 h-5',
};

export interface BrandMarkProps {
  /** Visual context. Default `icon-only`. */
  variant?: BrandMarkVariant;
  /** Extra classes for the badge wrapper. */
  className?: string;
  /**
   * Accessible name when the mark stands alone (no adjacent wordmark).
   * When omitted, the mark is decorative (`aria-hidden`) and the label
   * must come from sibling text or the parent button's aria-label.
   */
  'aria-label'?: string;
}

export default function BrandMark({
  variant = 'icon-only',
  className,
  'aria-label': ariaLabel,
}: BrandMarkProps) {
  const decorative = ariaLabel == null;
  const wrapperClass = `${BADGE_CLASSES[variant]} ${className ?? ''}`.trim();
  return (
    <div
      className={wrapperClass}
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': ariaLabel })}
    >
      <Zap
        className={`${GLYPH_CLASSES[variant]} text-gold`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}
