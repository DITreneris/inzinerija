/**
 * M10 human-control simulator – pure deterministic model.
 * Risk controls are not a maturity ladder to full autonomy.
 */

export type HumanControlScenarioId =
  | 'customer_reply'
  | 'refund'
  | 'sensitive_payment';

export type HumanControlModeId =
  | 'every_case'
  | 'exception_gate'
  | 'spot_check'
  | 'outcome_monitor';

export type ConsequenceLevel = 1 | 2 | 3 | 4;
export type Reversibility = 'easy' | 'hard';

export interface HumanControlScenarioMeta {
  id: HumanControlScenarioId;
  consequence: ConsequenceLevel;
  reversibility: Reversibility;
  /** Short condition used in the generated control-rule artefact */
  conditionKey: string;
}

export const HUMAN_CONTROL_SCENARIOS: readonly HumanControlScenarioMeta[] = [
  {
    id: 'customer_reply',
    consequence: 1,
    reversibility: 'easy',
    conditionKey: 'standard_faq',
  },
  {
    id: 'refund',
    consequence: 2,
    reversibility: 'hard',
    conditionKey: 'refund_limit',
  },
  {
    id: 'sensitive_payment',
    consequence: 4,
    reversibility: 'hard',
    conditionKey: 'pii_or_payment',
  },
] as const;

export const HUMAN_CONTROL_MODE_IDS: readonly HumanControlModeId[] = [
  'every_case',
  'exception_gate',
  'spot_check',
  'outcome_monitor',
] as const;

export type TradeOffTone = 'low' | 'medium' | 'high';

export interface QualitativeTradeOffs {
  speed: TradeOffTone;
  humanWorkload: TradeOffTone;
  /** When an AI/process error becomes visible */
  errorTiming:
    | 'before_execution'
    | 'at_exception'
    | 'after_execution'
    | 'aggregate_only';
}

export type ErrorCaseOutcomeKind =
  | 'stopped_before'
  | 'escalated_by_rule'
  | 'detected_after'
  | 'aggregate_only';

export function getScenarioMeta(
  id: HumanControlScenarioId
): HumanControlScenarioMeta {
  const found = HUMAN_CONTROL_SCENARIOS.find((s) => s.id === id);
  if (!found) {
    throw new Error(`Unknown human-control scenario: ${id}`);
  }
  return found;
}

/**
 * Recommended control mode from consequence + reversibility.
 * High stakes or hard-to-reverse actions require stronger human gates.
 */
export function recommendMode(
  scenarioId: HumanControlScenarioId
): HumanControlModeId {
  const s = getScenarioMeta(scenarioId);
  if (
    s.consequence >= 4 ||
    (s.consequence >= 3 && s.reversibility === 'hard')
  ) {
    return 'every_case';
  }
  if (s.consequence >= 2 || s.reversibility === 'hard') {
    return 'exception_gate';
  }
  if (s.consequence === 1 && s.reversibility === 'easy') {
    return 'spot_check';
  }
  return 'outcome_monitor';
}

export function isModeMismatch(
  scenarioId: HumanControlScenarioId,
  selected: HumanControlModeId
): boolean {
  return selected !== recommendMode(scenarioId);
}

/**
 * Qualitative mismatch reason key for content layer (not user-facing copy).
 */
export function getMismatchReasonKey(
  scenarioId: HumanControlScenarioId,
  selected: HumanControlModeId
):
  | 'over_engineered'
  | 'under_controlled'
  | 'spot_check_too_weak'
  | 'monitor_too_weak'
  | null {
  if (!isModeMismatch(scenarioId, selected)) return null;
  const recommended = recommendMode(scenarioId);
  const modeRank: Record<HumanControlModeId, number> = {
    every_case: 4,
    exception_gate: 3,
    spot_check: 2,
    outcome_monitor: 1,
  };
  if (modeRank[selected] > modeRank[recommended]) {
    return 'over_engineered';
  }
  if (selected === 'spot_check') return 'spot_check_too_weak';
  if (selected === 'outcome_monitor') return 'monitor_too_weak';
  return 'under_controlled';
}

export function getTradeOffs(mode: HumanControlModeId): QualitativeTradeOffs {
  switch (mode) {
    case 'every_case':
      return {
        speed: 'low',
        humanWorkload: 'high',
        errorTiming: 'before_execution',
      };
    case 'exception_gate':
      return {
        speed: 'medium',
        humanWorkload: 'medium',
        errorTiming: 'at_exception',
      };
    case 'spot_check':
      return {
        speed: 'high',
        humanWorkload: 'low',
        errorTiming: 'after_execution',
      };
    case 'outcome_monitor':
      return {
        speed: 'high',
        humanWorkload: 'low',
        errorTiming: 'aggregate_only',
      };
  }
}

export function getErrorCaseOutcomeKind(
  mode: HumanControlModeId
): ErrorCaseOutcomeKind {
  switch (mode) {
    case 'every_case':
      return 'stopped_before';
    case 'exception_gate':
      return 'escalated_by_rule';
    case 'spot_check':
      return 'detected_after';
    case 'outcome_monitor':
      return 'aggregate_only';
  }
}

export interface GeneratedControlRuleParts {
  modeId: HumanControlModeId;
  scenarioId: HumanControlScenarioId;
  conditionKey: string;
  recommended: HumanControlModeId;
  isMismatch: boolean;
}

export function buildControlRuleParts(
  scenarioId: HumanControlScenarioId,
  selectedMode: HumanControlModeId
): GeneratedControlRuleParts {
  const meta = getScenarioMeta(scenarioId);
  return {
    modeId: selectedMode,
    scenarioId,
    conditionKey: meta.conditionKey,
    recommended: recommendMode(scenarioId),
    isMismatch: isModeMismatch(scenarioId, selectedMode),
  };
}

/** Risk strip axes: consequence band × reversibility (no empty cells). */
export type MatrixConsequenceBand = 'lower' | 'higher';
export type MatrixReversibility = Reversibility;

export interface RiskStripItem {
  scenarioId: HumanControlScenarioId;
  consequenceBand: MatrixConsequenceBand;
  reversibility: MatrixReversibility;
}

export function getMatrixCell(
  scenarioId: HumanControlScenarioId
): RiskStripItem {
  const s = getScenarioMeta(scenarioId);
  return {
    scenarioId,
    consequenceBand: s.consequence >= 3 ? 'higher' : 'lower',
    reversibility: s.reversibility,
  };
}

/** Three scenario chips for the lab risk strip (W1.1 – no empty 2×2 cell). */
export function getRiskStripItems(): readonly RiskStripItem[] {
  return HUMAN_CONTROL_SCENARIOS.map((s) => getMatrixCell(s.id));
}
