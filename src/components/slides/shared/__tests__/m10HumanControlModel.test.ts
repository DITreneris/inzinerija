import { describe, expect, it } from 'vitest';
import {
  HUMAN_CONTROL_MODE_IDS,
  HUMAN_CONTROL_SCENARIOS,
  buildControlRuleParts,
  getErrorCaseOutcomeKind,
  getMismatchReasonKey,
  getRiskStripItems,
  getTradeOffs,
  isModeMismatch,
  recommendMode,
  type HumanControlModeId,
  type HumanControlScenarioId,
} from '../m10HumanControlModel';
import {
  formatControlRuleArtefact,
  getErrorCaseOutcomeText,
  getMismatchReasonText,
} from '../m10HumanControlContent';

describe('m10HumanControlModel', () => {
  it('recommends modes from consequence and reversibility', () => {
    expect(recommendMode('customer_reply')).toBe('spot_check');
    expect(recommendMode('refund')).toBe('exception_gate');
    expect(recommendMode('sensitive_payment')).toBe('every_case');
  });

  it('covers the full scenario × mode recommendation matrix', () => {
    const expected: Record<HumanControlScenarioId, HumanControlModeId> = {
      customer_reply: 'spot_check',
      refund: 'exception_gate',
      sensitive_payment: 'every_case',
    };

    for (const scenario of HUMAN_CONTROL_SCENARIOS) {
      expect(recommendMode(scenario.id)).toBe(expected[scenario.id]);
      for (const mode of HUMAN_CONTROL_MODE_IDS) {
        const mismatch = isModeMismatch(scenario.id, mode);
        expect(mismatch).toBe(mode !== expected[scenario.id]);
        if (mismatch) {
          expect(getMismatchReasonKey(scenario.id, mode)).not.toBeNull();
        } else {
          expect(getMismatchReasonKey(scenario.id, mode)).toBeNull();
        }
      }
    }
  });

  it('maps error outcomes deterministically by mode', () => {
    expect(getErrorCaseOutcomeKind('every_case')).toBe('stopped_before');
    expect(getErrorCaseOutcomeKind('exception_gate')).toBe('escalated_by_rule');
    expect(getErrorCaseOutcomeKind('spot_check')).toBe('detected_after');
    expect(getErrorCaseOutcomeKind('outcome_monitor')).toBe('aggregate_only');
  });

  it('returns qualitative trade-offs without percentages', () => {
    const trade = getTradeOffs('exception_gate');
    expect(trade.speed).toBe('medium');
    expect(trade.humanWorkload).toBe('medium');
    expect(trade.errorTiming).toBe('at_exception');
  });

  it('builds control-rule parts for the 10.64 artefact', () => {
    const parts = buildControlRuleParts('refund', 'exception_gate');
    expect(parts.isMismatch).toBe(false);
    expect(parts.conditionKey).toBe('refund_limit');
    expect(parts.recommended).toBe('exception_gate');
  });

  it('returns three risk-strip items without empty cells', () => {
    const items = getRiskStripItems();
    expect(items).toHaveLength(3);
    expect(items.every((i) => i.scenarioId != null)).toBe(true);
    expect(items.map((i) => i.scenarioId)).toEqual([
      'customer_reply',
      'refund',
      'sensitive_payment',
    ]);
  });
});

describe('m10HumanControlContent', () => {
  it('formats LT and EN artefacts with the control contract fields', () => {
    const parts = buildControlRuleParts('sensitive_payment', 'every_case');
    const lt = formatControlRuleArtefact('lt', parts);
    const en = formatControlRuleArtefact('en', parts);
    expect(lt).toContain('Kontrolės režimas');
    expect(lt).toContain('Audito įrašas');
    expect(en).toContain('Control mode');
    expect(en).toContain('Audit record');
  });

  it('localizes mismatch and error outcomes', () => {
    expect(
      getMismatchReasonText('lt', 'sensitive_payment', 'outcome_monitor')
    ).toMatch(/stebėsena|silpna/i);
    expect(
      getMismatchReasonText('en', 'sensitive_payment', 'outcome_monitor')
    ).toMatch(/monitoring|weak/i);

    const stopped = getErrorCaseOutcomeText('lt', 'stopped_before');
    expect(stopped.success).toBe(true);
    expect(stopped.title).toMatch(/prieš vykdymą/i);

    const escaped = getErrorCaseOutcomeText('en', 'aggregate_only');
    expect(escaped.success).toBe(false);
    expect(escaped.title).toMatch(/aggregate/i);
  });
});
