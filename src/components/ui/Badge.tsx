/**
 * Badge – Design System 0.3.2.
 * Canonical replacement for `.badge` / `.badge-*` CSS (index.css @deprecated).
 */
import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'brand' | 'accent' | 'success' | 'slate';

const baseClass =
  'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';

const variantClasses: Record<BadgeVariant, string> = {
  default: '',
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300',
  accent:
    'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
  success:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'default',
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`${baseClass} ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
