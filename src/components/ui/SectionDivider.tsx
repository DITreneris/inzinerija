/**
 * SectionDivider – Design System v0.2 (E4.3).
 * Horizontali skiriamoji linija su optional label centre.
 * @see docs/development/DESIGN_SYSTEM_V0_2.md §7
 */
import type { EyebrowAccent } from './Eyebrow';

const borderClasses: Record<EyebrowAccent, string> = {
  brand: 'border-brand-200 dark:border-brand-800',
  accent: 'border-accent-200 dark:border-accent-800',
  slate: 'border-slate-200 dark:border-slate-800',
  emerald: 'border-emerald-200 dark:border-emerald-800',
  violet: 'border-violet-200 dark:border-violet-800',
  cyan: 'border-cyan-200 dark:border-cyan-800',
};

const labelTextClasses: Record<EyebrowAccent, string> = {
  brand: 'text-brand-700 dark:text-brand-300',
  accent: 'text-accent-700 dark:text-accent-300',
  slate: 'text-slate-700 dark:text-slate-300',
  emerald: 'text-emerald-700 dark:text-emerald-300',
  violet: 'text-violet-700 dark:text-violet-300',
  cyan: 'text-cyan-700 dark:text-cyan-300',
};

interface SectionDividerProps {
  label?: string;
  accent?: EyebrowAccent;
  className?: string;
}

export default function SectionDivider({
  label,
  accent = 'brand',
  className = '',
}: SectionDividerProps) {
  const border = borderClasses[accent];
  const labelText = labelTextClasses[accent];

  if (!label) {
    return (
      <hr
        className={`border-t ${border} border-0 ${className}`.trim()}
        aria-hidden
      />
    );
  }

  return (
    <div
      role="separator"
      aria-label={label}
      className={`flex items-center gap-3 w-full ${className}`.trim()}
    >
      <span className={`flex-1 border-t ${border}`} aria-hidden />
      <span
        className={`shrink-0 bg-white dark:bg-gray-900 px-3 text-xs font-semibold uppercase tracking-wider ${labelText}`}
      >
        {label}
      </span>
      <span className={`flex-1 border-t ${border}`} aria-hidden />
    </div>
  );
}
