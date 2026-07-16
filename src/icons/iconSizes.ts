/**
 * Canonical icon box + SVG sizes – aligned with IconChip sm/md/lg.
 * @see src/components/ui/IconChip.tsx
 */

export type IconSize = 'sm' | 'md' | 'lg';

export const iconSizeClasses: Record<IconSize, { box: string; icon: string }> =
  {
    sm: { box: 'w-7 h-7', icon: 'w-3.5 h-3.5' },
    md: { box: 'w-9 h-9', icon: 'w-4 h-4' },
    lg: { box: 'w-11 h-11', icon: 'w-5 h-5' },
  };

/** Slide choice cards – slightly larger on sm+ breakpoints */
export const slideCardIconClasses = {
  box: 'w-10 h-10 sm:w-11 sm:h-11',
  icon: 'w-5 h-5 sm:w-6 sm:h-6',
} as const;
