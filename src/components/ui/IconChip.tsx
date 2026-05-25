/**
 * IconChip – Design System v0.2 (E4.2).
 * Apvali piktograma callout'uose ir kortelėse.
 * @see docs/development/DESIGN_SYSTEM_V0_2.md §7
 */
import type { LucideIcon } from 'lucide-react';

export type IconChipRole = 'cta' | 'info' | 'warn' | 'success' | 'error';
export type IconChipSize = 'sm' | 'md' | 'lg';

const roleClasses: Record<IconChipRole, string> = {
  cta: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
  info: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300',
  warn: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  success:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  error: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

const sizeClasses: Record<IconChipSize, { box: string; icon: string }> = {
  sm: { box: 'w-7 h-7', icon: 'w-3.5 h-3.5' },
  md: { box: 'w-9 h-9', icon: 'w-4 h-4' },
  lg: { box: 'w-11 h-11', icon: 'w-5 h-5' },
};

interface IconChipProps {
  icon: LucideIcon;
  role?: IconChipRole;
  size?: IconChipSize;
  className?: string;
  /** Dekoratyvus chip šalia teksto – default true */
  decorative?: boolean;
}

export default function IconChip({
  icon: Icon,
  role = 'info',
  size = 'md',
  className = '',
  decorative = true,
}: IconChipProps) {
  const sizes = sizeClasses[size];
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full ${roleClasses[role]} ${sizes.box} ${className}`.trim()}
      aria-hidden={decorative ? true : undefined}
    >
      <Icon className={sizes.icon} strokeWidth={2} aria-hidden />
    </span>
  );
}
