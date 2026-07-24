/**
 * Module identity helpers — Design System v0.2 (E5).
 * @see docs/development/DESIGN_SYSTEM_V0_2.md §8
 */
import type { LucideIcon } from 'lucide-react';
import { LUCIDE_REGISTRY } from '../icons/registry';
import type {
  Module,
  ModuleAccent,
  ModuleIcon,
  ModuleIdentityIcon,
  ModuleLevel,
} from '../types/modules';
import { MODULE_ICONS } from '../icons/types';

/** Lucide map for module.icon and module.identityIcon (DS v0.3.1 — unified). */
export const MODULE_IDENTITY_ICON_MAP: Record<ModuleIdentityIcon, LucideIcon> =
  Object.fromEntries(
    MODULE_ICONS.map((name) => [name, LUCIDE_REGISTRY[name]])
  ) as Record<ModuleIdentityIcon, LucideIcon>;

/** @deprecated Use MODULE_IDENTITY_ICON_MAP */
export const IDENTITY_ICON_MAP = MODULE_IDENTITY_ICON_MAP;

/** @deprecated Use MODULE_IDENTITY_ICON_MAP */
export const MODULE_ICON_MAP = MODULE_IDENTITY_ICON_MAP;

export function resolveModuleIcon(name?: ModuleIcon): LucideIcon | undefined {
  if (!name) return undefined;
  return MODULE_IDENTITY_ICON_MAP[name];
}

const LEVEL_ACCENT_FALLBACK: Record<ModuleLevel, ModuleAccent> = {
  learn: 'brand',
  test: 'slate',
  practice: 'emerald',
};

export function resolveModuleIdentityIcon(
  name?: ModuleIdentityIcon
): LucideIcon | undefined {
  if (!name) return undefined;
  return MODULE_IDENTITY_ICON_MAP[name];
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
  sky: 'bg-sky-500',
  fuchsia: 'bg-fuchsia-500',
  rose: 'bg-rose-500',
};

/** ModulesPage track section header shell (border + tint). */
export const trackSectionClasses: Record<
  'brand' | 'sky' | 'fuchsia' | 'rose',
  string
> = {
  brand:
    'rounded-2xl border border-brand-200 dark:border-brand-800 bg-brand-50/70 dark:bg-brand-900/20 px-5 py-4',
  sky: 'rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-900/20 px-5 py-4',
  fuchsia:
    'rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50/70 dark:bg-fuchsia-900/20 px-5 py-4',
  rose: 'rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-900/20 px-5 py-4',
};

/** Coming-soon eyebrow / badge / note surfaces by track accent. */
export const comingSoonAccentClasses: Record<
  'fuchsia' | 'rose',
  {
    eyebrow: string;
    badge: string;
    note: string;
  }
> = {
  fuchsia: {
    eyebrow: 'text-fuchsia-700 dark:text-fuchsia-300',
    badge:
      'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-300',
    note: 'border-fuchsia-300 dark:border-fuchsia-700 bg-fuchsia-50/70 dark:bg-fuchsia-900/20 text-fuchsia-800 dark:text-fuchsia-200',
  },
  rose: {
    eyebrow: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
    note: 'border-rose-300 dark:border-rose-700 bg-rose-50/70 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200',
  },
};

/** ModulesPage card icon well — track/module accent (not level). */
export const accentIconWellClasses: Record<ModuleAccent, string> = {
  brand: 'bg-gradient-to-br from-brand-700 to-brand-800',
  slate: 'bg-gradient-to-br from-slate-600 to-slate-700',
  emerald: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
  violet: 'bg-gradient-to-br from-violet-600 to-violet-700',
  cyan: 'bg-gradient-to-br from-cyan-600 to-cyan-700',
  accent: 'bg-gradient-to-br from-accent-500 to-accent-600',
  sky: 'bg-gradient-to-br from-sky-600 to-sky-700',
  fuchsia: 'bg-gradient-to-br from-fuchsia-600 to-fuchsia-700',
  rose: 'bg-gradient-to-br from-rose-600 to-rose-700',
};

/** ModulesPage businessExamples chip surface — track/module accent. */
export const accentChipClasses: Record<ModuleAccent, string> = {
  brand: 'bg-brand-50 dark:bg-brand-900/20 text-brand-800 dark:text-brand-200',
  slate: 'bg-slate-50 dark:bg-slate-900/20 text-slate-800 dark:text-slate-200',
  emerald:
    'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200',
  violet:
    'bg-violet-50 dark:bg-violet-900/20 text-violet-800 dark:text-violet-200',
  cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-200',
  accent:
    'bg-accent-50 dark:bg-accent-900/20 text-accent-800 dark:text-accent-200',
  sky: 'bg-sky-50 dark:bg-sky-900/20 text-sky-800 dark:text-sky-200',
  fuchsia:
    'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-800 dark:text-fuchsia-200',
  rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200',
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
  sky: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300',
  fuchsia:
    'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-300',
  rose: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
};
