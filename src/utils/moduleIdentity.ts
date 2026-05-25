/**
 * Module identity helpers — Design System v0.2 (E5).
 * @see docs/development/DESIGN_SYSTEM_V0_2.md §8
 */
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Brain,
  Briefcase,
  ClipboardCheck,
  ClipboardList,
  Rocket,
} from 'lucide-react';
import type {
  Module,
  ModuleAccent,
  ModuleIdentityIcon,
  ModuleLevel,
} from '../types/modules';

export const IDENTITY_ICON_MAP: Record<ModuleIdentityIcon, LucideIcon> = {
  BookOpen,
  ClipboardList,
  Briefcase,
  Brain,
  ClipboardCheck,
  Rocket,
};

const LEVEL_ACCENT_FALLBACK: Record<ModuleLevel, ModuleAccent> = {
  learn: 'brand',
  test: 'slate',
  practice: 'emerald',
};

export function resolveModuleIdentityIcon(
  name?: ModuleIdentityIcon
): LucideIcon | undefined {
  if (!name) return undefined;
  return IDENTITY_ICON_MAP[name];
}

export function resolveModuleAccent(
  module?: Pick<Module, 'accent' | 'level'> | null
): ModuleAccent {
  if (module?.accent) return module.accent;
  const level = module?.level ?? 'learn';
  return LEVEL_ACCENT_FALLBACK[level];
}

/** ModulesPage card top stripe — full Tailwind class strings (JIT). */
export const accentTopBarClasses: Record<ModuleAccent, string> = {
  brand: 'bg-brand-500',
  slate: 'bg-slate-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  cyan: 'bg-cyan-500',
  accent: 'bg-accent-500',
};

/** Section-break sectionNumber badge only (E5.6). */
export const sectionBreakBadgeByAccent: Record<ModuleAccent, string> = {
  brand: 'bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300',
  slate: 'bg-slate-100 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300',
  emerald:
    'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  violet:
    'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300',
  accent:
    'bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300',
};
