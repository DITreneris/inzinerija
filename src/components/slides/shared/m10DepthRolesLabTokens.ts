/**
 * M10 10.45 depth/roles lab – brand-only chrome (no risk palette / optionTone hues).
 * Job ≠ 10.26 consequence×reversibility. Ordinal scale = brand intensity L0→L3.
 */

import type { DepthId } from './m10DepthRolesModel';

export const LAB_SHELL_CLASS =
  'rounded-2xl border border-brand-200/80 bg-gradient-to-b from-brand-50/80 to-white p-4 sm:p-5 shadow-sm dark:border-brand-800/60 dark:from-brand-950/40 dark:to-gray-900';

export const ROUTER_TOGGLE_CLASS =
  'flex min-h-[44px] items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-800 transition-colors hover:border-brand-300 focus-within:ring-2 focus-within:ring-brand-500 dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-100 dark:hover:border-brand-600';

/** SVG fillOpacity of palette.brand — one hue, stronger with depth. */
export const DEPTH_FILL_OPACITY: Record<DepthId, number> = {
  chat: 0.12,
  agent: 0.32,
  team: 0.55,
  flow: 0.82,
};

/** ChoiceControl unselected wash — same brand family as the mini pills. */
export const DEPTH_UNSELECTED_WASH: Record<DepthId, string> = {
  chat: 'border-brand-100 bg-brand-50/40 dark:border-brand-900 dark:bg-brand-950/20',
  agent:
    'border-brand-200 bg-brand-50/80 dark:border-brand-800 dark:bg-brand-900/30',
  team: 'border-brand-300 bg-brand-100 dark:border-brand-700 dark:bg-brand-900/45',
  flow: 'border-brand-400 bg-brand-200/80 dark:border-brand-600 dark:bg-brand-800/55',
};
