/**
 * StatusPanel – Design System Waves A (result / outcome hero surfaces).
 * Gradient panels for pass/fail/outcome chrome — not teaching contrast pairs or lab embeds.
 * @see docs/development/DESIGN_SYSTEM.md
 */
import type { HTMLAttributes, ReactNode } from 'react';
import { typographyClasses } from '../../design-tokens';

export type StatusPanelTone = 'success' | 'warning' | 'outcome';
export type StatusPanelSize = 'hero' | 'compact';

const toneClasses: Record<StatusPanelTone, string> = {
  success:
    'bg-gradient-to-r from-emerald-50 to-brand-50 dark:from-emerald-900/20 dark:to-brand-900/20 border-emerald-200 dark:border-emerald-800',
  warning:
    'bg-gradient-to-r from-amber-50 to-brand-50 dark:from-amber-900/20 dark:to-brand-900/20 border-amber-200 dark:border-amber-800',
  outcome:
    'bg-gradient-to-r from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 border-accent-200 dark:border-accent-800',
};

const iconWellClasses: Record<StatusPanelTone, string> = {
  success: 'bg-emerald-100 dark:bg-emerald-900/30',
  warning: 'bg-amber-100 dark:bg-amber-900/30',
  outcome: 'bg-accent-100 dark:bg-accent-900/30',
};

const sizeClasses: Record<StatusPanelSize, string> = {
  hero: 'p-8 rounded-xl border-2 text-center',
  compact: 'p-5 rounded-xl border-2',
};

export interface StatusPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  tone?: StatusPanelTone;
  size?: StatusPanelSize;
  icon?: ReactNode;
  /** Visible heading inside the panel (not the HTML title attribute) */
  title?: ReactNode;
  /** When true, sets role="status" for result announcements */
  asStatus?: boolean;
  children?: ReactNode;
}

export default function StatusPanel({
  tone = 'success',
  size = 'hero',
  icon,
  title,
  asStatus = false,
  children,
  className = '',
  ...props
}: StatusPanelProps) {
  const iconSize =
    size === 'hero' ? 'w-20 h-20 mb-4' : 'w-12 h-12 mb-3 shrink-0';

  return (
    <div
      className={`${sizeClasses[size]} ${toneClasses[tone]} ${className}`.trim()}
      role={asStatus ? 'status' : undefined}
      {...props}
    >
      {icon ? (
        <div
          className={`inline-flex items-center justify-center rounded-full ${iconSize} ${iconWellClasses[tone]}`}
        >
          {icon}
        </div>
      ) : null}
      {title ? (
        <h3
          className={`${typographyClasses.h2} mb-2 text-gray-900 dark:text-white`}
        >
          {title}
        </h3>
      ) : null}
      {children}
    </div>
  );
}
