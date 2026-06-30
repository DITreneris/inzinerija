/**
 * Eyebrow – Design System v0.2 (E4.1).
 * Maža antraštė virš H1 / kortelės – modulio identitetas, sekcijos žyma.
 * @see docs/development/DESIGN_SYSTEM_V0_2.md §7
 */
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type EyebrowAccent =
  | 'brand'
  | 'accent'
  | 'slate'
  | 'emerald'
  | 'violet'
  | 'cyan'
  | 'sky'
  | 'fuchsia'
  | 'rose';

const accentClasses: Record<EyebrowAccent, string> = {
  brand: 'text-brand-700 dark:text-brand-300',
  accent: 'text-accent-700 dark:text-accent-300',
  slate: 'text-slate-700 dark:text-slate-300',
  emerald: 'text-emerald-700 dark:text-emerald-300',
  violet: 'text-violet-700 dark:text-violet-300',
  cyan: 'text-cyan-700 dark:text-cyan-300',
  sky: 'text-sky-700 dark:text-sky-300',
  fuchsia: 'text-fuchsia-700 dark:text-fuchsia-300',
  rose: 'text-rose-700 dark:text-rose-300',
};

interface EyebrowProps {
  children: ReactNode;
  accent?: EyebrowAccent;
  icon?: LucideIcon;
  className?: string;
}

export default function Eyebrow({
  children,
  accent = 'brand',
  icon: Icon,
  className = '',
}: EyebrowProps) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 mb-2 ${accentClasses[accent]} ${className}`.trim()}
    >
      {Icon ? (
        <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden />
      ) : null}
      {children}
    </p>
  );
}
