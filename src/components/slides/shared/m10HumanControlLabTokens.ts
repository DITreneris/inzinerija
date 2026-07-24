/**
 * M10 10.26 interactive-control-lab – risk-semantic visual tokens (GOLDEN §3.1c).
 * Color alone is never the only cue – pair with chip text / icons in the Block.
 */

import type {
  ConsequenceLevel,
  HumanControlModeId,
  HumanControlScenarioId,
  QualitativeTradeOffs,
  TradeOffTone,
} from './m10HumanControlModel';
import { getScenarioMeta } from './m10HumanControlModel';

export type LabOptionTone = 'brand' | 'amber' | 'rose' | 'slate';

export type StakeLevel = 'low' | 'mid' | 'critical';

export function consequenceToStake(consequence: ConsequenceLevel): StakeLevel {
  if (consequence >= 4) return 'critical';
  if (consequence >= 2) return 'mid';
  return 'low';
}

export function stakeToTone(stake: StakeLevel): LabOptionTone {
  switch (stake) {
    case 'critical':
      return 'rose';
    case 'mid':
      return 'amber';
    case 'low':
      return 'brand';
  }
}

export function scenarioIdToTone(
  scenarioId: HumanControlScenarioId
): LabOptionTone {
  return stakeToTone(
    consequenceToStake(getScenarioMeta(scenarioId).consequence)
  );
}

/** Control strictness: stronger human gate → warmer / more urgent tone. */
export function modeIdToTone(modeId: HumanControlModeId): LabOptionTone {
  switch (modeId) {
    case 'every_case':
      return 'rose';
    case 'exception_gate':
      return 'amber';
    case 'spot_check':
      return 'brand';
    case 'outcome_monitor':
      return 'slate';
  }
}

export const LAB_TONE_CLASSES: Record<
  LabOptionTone,
  {
    selectedBorder: string;
    selectedBg: string;
    selectedRing: string;
    selectedCheck: string;
    stripe: string;
    chip: string;
    softBg: string;
  }
> = {
  brand: {
    selectedBorder: 'border-brand-500',
    selectedBg: 'bg-brand-50 dark:bg-brand-900/30',
    selectedRing: 'ring-1 ring-brand-200 dark:ring-brand-800',
    selectedCheck: 'bg-brand-500',
    stripe: 'border-l-brand-500',
    chip: 'bg-brand-100 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100',
    softBg: 'bg-brand-50/80 dark:bg-brand-900/20',
  },
  amber: {
    selectedBorder: 'border-amber-500',
    selectedBg: 'bg-amber-50 dark:bg-amber-900/30',
    selectedRing: 'ring-1 ring-amber-200 dark:ring-amber-800',
    selectedCheck: 'bg-amber-500',
    stripe: 'border-l-amber-500',
    chip: 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100',
    softBg: 'bg-amber-50/80 dark:bg-amber-900/20',
  },
  rose: {
    selectedBorder: 'border-rose-500',
    selectedBg: 'bg-rose-50 dark:bg-rose-900/30',
    selectedRing: 'ring-1 ring-rose-200 dark:ring-rose-800',
    selectedCheck: 'bg-rose-500',
    stripe: 'border-l-rose-500',
    chip: 'bg-rose-100 text-rose-900 dark:bg-rose-900/50 dark:text-rose-100',
    softBg: 'bg-rose-50/80 dark:bg-rose-900/20',
  },
  slate: {
    selectedBorder: 'border-slate-500',
    selectedBg: 'bg-slate-50 dark:bg-slate-800/60',
    selectedRing: 'ring-1 ring-slate-200 dark:ring-slate-700',
    selectedCheck: 'bg-slate-500',
    stripe: 'border-l-slate-500',
    chip: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    softBg: 'bg-slate-50/80 dark:bg-slate-900/40',
  },
};

export const TIMING_PHASE_ORDER: readonly QualitativeTradeOffs['errorTiming'][] =
  [
    'before_execution',
    'at_exception',
    'after_execution',
    'aggregate_only',
  ] as const;

export const METER_SEGMENT_COUNT = 3;

export function tradeToneToSegments(tone: TradeOffTone): number {
  switch (tone) {
    case 'low':
      return 1;
    case 'medium':
      return 2;
    case 'high':
      return 3;
  }
}

export const LAB_SHELL_CLASS =
  'space-y-5 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-slate-50 p-4 shadow-sm dark:border-brand-800/60 dark:from-brand-950/40 dark:via-gray-900/60 dark:to-slate-950/50 sm:p-5';
