import { describe, expect, it } from 'vitest';
import {
  PROMPT_MODE_IDS,
  PROMPT_MODE_SCENARIOS,
  buildPromptModeRuleParts,
  getAxisStripItems,
  getErrorCaseOutcomeKind,
  getMismatchReasonKey,
  getTradeOffs,
  isModeMismatch,
  recommendMode,
  type PromptModeId,
  type PromptModeScenarioId,
} from '../m4PromptModeModel';
import {
  formatPromptModeArtefact,
  getErrorCaseOutcomeText,
  getMismatchReasonText,
} from '../m4PromptModeContent';

describe('m4PromptModeModel', () => {
  it('recommends modes from live data × structure', () => {
    expect(recommendMode('known_swot')).toBe('methodical');
    expect(recommendMode('live_top10')).toBe('agentive');
    expect(recommendMode('gather_then_analyze')).toBe('sequence');
  });

  it('covers the full scenario × mode recommendation matrix', () => {
    const expected: Record<PromptModeScenarioId, PromptModeId> = {
      known_swot: 'methodical',
      live_top10: 'agentive',
      gather_then_analyze: 'sequence',
    };

    for (const scenario of PROMPT_MODE_SCENARIOS) {
      expect(recommendMode(scenario.id)).toBe(expected[scenario.id]);
      for (const mode of PROMPT_MODE_IDS) {
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

  it('never recommends vague_ask', () => {
    for (const scenario of PROMPT_MODE_SCENARIOS) {
      expect(recommendMode(scenario.id)).not.toBe('vague_ask');
      expect(isModeMismatch(scenario.id, 'vague_ask')).toBe(true);
      expect(getMismatchReasonKey(scenario.id, 'vague_ask')).toBe(
        'under_controlled'
      );
    }
  });

  it('maps error outcomes deterministically by mode', () => {
    expect(getErrorCaseOutcomeKind('methodical')).toBe('structured_ok');
    expect(getErrorCaseOutcomeKind('agentive')).toBe('search_required');
    expect(getErrorCaseOutcomeKind('sequence')).toBe('pipeline_ok');
    expect(getErrorCaseOutcomeKind('vague_ask')).toBe(
      'unchecked_hallucination'
    );
  });

  it('returns qualitative trade-offs without percentages', () => {
    const trade = getTradeOffs('sequence');
    expect(trade.speed).toBe('low');
    expect(trade.hallucinationRisk).toBe('low');
    expect(trade.errorTiming).toBe('after_draft');
  });

  it('builds artefact parts for the prompt-mode rule', () => {
    const parts = buildPromptModeRuleParts('live_top10', 'agentive');
    expect(parts.isMismatch).toBe(false);
    expect(parts.conditionKey).toBe('need_live_list');
    expect(parts.recommended).toBe('agentive');
  });

  it('returns three axis-strip items without empty cells', () => {
    const items = getAxisStripItems();
    expect(items).toHaveLength(3);
    expect(items.every((i) => i.scenarioId != null)).toBe(true);
    expect(items.map((i) => i.scenarioId)).toEqual([
      'known_swot',
      'live_top10',
      'gather_then_analyze',
    ]);
  });
});

describe('m4PromptModeContent', () => {
  it('formats LT and EN artefacts with mode rule fields', () => {
    const parts = buildPromptModeRuleParts('gather_then_analyze', 'sequence');
    const lt = formatPromptModeArtefact('lt', parts);
    const en = formatPromptModeArtefact('en', parts);
    expect(lt).toContain('Režimas');
    expect(lt).toContain('Patikra');
    expect(en).toContain('Mode');
    expect(en).toContain('Check');
  });

  it('localizes mismatch and error outcomes', () => {
    expect(getMismatchReasonText('lt', 'known_swot', 'vague_ask')).toMatch(
      /silpnai|Persvarstyk|Rekomenduojama/i
    );
    expect(getMismatchReasonText('en', 'live_top10', 'methodical')).toMatch(
      /tooling|Recommended/i
    );

    const ok = getErrorCaseOutcomeText('lt', 'structured_ok');
    expect(ok.success).toBe(true);
    expect(ok.title).toMatch(/Struktūra/i);

    const bad = getErrorCaseOutcomeText('en', 'unchecked_hallucination');
    expect(bad.success).toBe(false);
    expect(bad.title).toMatch(/Fluent|unchecked/i);
  });
});
