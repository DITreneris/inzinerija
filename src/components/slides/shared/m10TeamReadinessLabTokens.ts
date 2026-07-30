/**
 * M10 10.255 team readiness lab – brand-only status tokens.
 * No risk palette: this lab diagnoses habits, not consequence severity.
 */

import type { ChoiceOptionTone } from '../../ui/ChoiceControl';
import type { TeamReadinessLevelId } from './m10TeamReadinessModel';

export const LAB_SHELL_CLASS =
  'space-y-5 rounded-2xl border border-brand-200/80 bg-gradient-to-b from-brand-50/80 to-white p-4 shadow-sm dark:border-brand-800/60 dark:from-brand-950/40 dark:to-gray-900 sm:p-5';

export const LEVEL_CHIP_CLASSES: Record<TeamReadinessLevelId, string> = {
  ad_hoc: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
  fragmented:
    'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100',
  systematic:
    'bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100',
};

export const LEVEL_OPTION_TONE: Record<TeamReadinessLevelId, ChoiceOptionTone> =
  {
    ad_hoc: 'slate',
    fragmented: 'amber',
    systematic: 'brand',
  };
