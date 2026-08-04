/**
 * CTAButton class recipes — shared by `<CTAButton>` and `<a>` upsells.
 */
import { focusRingClasses } from '../../design-tokens';

export type CTAButtonVariant = 'primary' | 'secondary' | 'accent' | 'hero';

const variantClasses: Record<CTAButtonVariant, string> = {
  primary: `bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-brand-600 hover:to-brand-700 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/25 active:scale-95 ${focusRingClasses.brand}`,
  secondary: `bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2`,
  accent: `bg-gradient-to-r from-accent-400 to-accent-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-accent-500 hover:to-accent-600 shadow-md shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/25 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2`,
  hero: `rounded-2xl py-6 text-xl min-h-[56px] font-semibold text-[#0d0d0d] bg-[linear-gradient(135deg,#f3cc30_0%,#d4a520_100%)] shadow-[0_4px_18px_rgba(243,204,48,0.25),0_0_0_1px_rgba(255,255,255,0.06)_inset] hover:bg-[linear-gradient(135deg,#e6bc4a_0%,#b8860b_100%)] hover:shadow-[0_6px_22px_rgba(243,204,48,0.35)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2`,
};

const layoutClass =
  'inline-flex items-center justify-center gap-2 min-h-[44px]' as const;

/** Class string for `<button>` or `<a>` upsells that must match CTAButton look. */
export function ctaButtonClassName(
  variant: CTAButtonVariant = 'primary',
  className = ''
): string {
  return `${variantClasses[variant]} ${layoutClass} ${className}`.trim();
}
