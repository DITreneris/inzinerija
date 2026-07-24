/**
 * M4 prompt-mode simulator – pure deterministic model.
 * Method vs agent is not a maturity ladder to agents.
 */

export type PromptModeScenarioId =
  | 'known_swot'
  | 'live_top10'
  | 'gather_then_analyze';

export type PromptModeId = 'methodical' | 'agentive' | 'sequence' | 'vague_ask';

export type LiveDataNeed = 'none' | 'needed';
export type StructureNeed = 'lower' | 'higher';

export interface PromptModeScenarioMeta {
  id: PromptModeScenarioId;
  liveData: LiveDataNeed;
  structure: StructureNeed;
  /** Short condition key used in the generated artefact */
  conditionKey: string;
}

export const PROMPT_MODE_SCENARIOS: readonly PromptModeScenarioMeta[] = [
  {
    id: 'known_swot',
    liveData: 'none',
    structure: 'higher',
    conditionKey: 'have_facts_need_structure',
  },
  {
    id: 'live_top10',
    liveData: 'needed',
    structure: 'lower',
    conditionKey: 'need_live_list',
  },
  {
    id: 'gather_then_analyze',
    liveData: 'needed',
    structure: 'higher',
    conditionKey: 'gather_then_frame',
  },
] as const;

export const PROMPT_MODE_IDS: readonly PromptModeId[] = [
  'methodical',
  'agentive',
  'sequence',
  'vague_ask',
] as const;

export type TradeOffTone = 'low' | 'medium' | 'high';

export interface QualitativeTradeOffs {
  speed: TradeOffTone;
  hallucinationRisk: TradeOffTone;
  /** When a weak prompt error becomes visible */
  errorTiming: 'before_tools' | 'at_search' | 'after_draft' | 'never_checked';
}

export type ErrorCaseOutcomeKind =
  | 'structured_ok'
  | 'search_required'
  | 'pipeline_ok'
  | 'unchecked_hallucination';

export function getScenarioMeta(
  id: PromptModeScenarioId
): PromptModeScenarioMeta {
  const found = PROMPT_MODE_SCENARIOS.find((s) => s.id === id);
  if (!found) {
    throw new Error(`Unknown prompt-mode scenario: ${id}`);
  }
  return found;
}

/**
 * Recommended prompt mode from live-data need × structure need.
 * Agentic is not "more mature" than methodical.
 */
export function recommendMode(scenarioId: PromptModeScenarioId): PromptModeId {
  const s = getScenarioMeta(scenarioId);
  if (s.liveData === 'needed' && s.structure === 'higher') {
    return 'sequence';
  }
  if (s.liveData === 'needed') {
    return 'agentive';
  }
  return 'methodical';
}

export function isModeMismatch(
  scenarioId: PromptModeScenarioId,
  selected: PromptModeId
): boolean {
  return selected !== recommendMode(scenarioId);
}

/**
 * Qualitative mismatch reason key for content layer (not user-facing copy).
 */
export function getMismatchReasonKey(
  scenarioId: PromptModeScenarioId,
  selected: PromptModeId
): 'over_engineered' | 'under_controlled' | 'wrong_tooling' | null {
  if (!isModeMismatch(scenarioId, selected)) return null;
  if (selected === 'vague_ask') return 'under_controlled';

  switch (scenarioId) {
    case 'known_swot':
      if (selected === 'sequence') return 'over_engineered';
      if (selected === 'agentive') return 'wrong_tooling';
      return 'under_controlled';
    case 'live_top10':
      if (selected === 'methodical') return 'wrong_tooling';
      if (selected === 'sequence') return 'over_engineered';
      return 'under_controlled';
    case 'gather_then_analyze':
      if (selected === 'methodical') return 'wrong_tooling';
      if (selected === 'agentive') return 'under_controlled';
      return 'under_controlled';
  }
}

export function getTradeOffs(mode: PromptModeId): QualitativeTradeOffs {
  switch (mode) {
    case 'methodical':
      return {
        speed: 'medium',
        hallucinationRisk: 'low',
        errorTiming: 'before_tools',
      };
    case 'agentive':
      return {
        speed: 'high',
        hallucinationRisk: 'medium',
        errorTiming: 'at_search',
      };
    case 'sequence':
      return {
        speed: 'low',
        hallucinationRisk: 'low',
        errorTiming: 'after_draft',
      };
    case 'vague_ask':
      return {
        speed: 'high',
        hallucinationRisk: 'high',
        errorTiming: 'never_checked',
      };
  }
}

export function getErrorCaseOutcomeKind(
  mode: PromptModeId
): ErrorCaseOutcomeKind {
  switch (mode) {
    case 'methodical':
      return 'structured_ok';
    case 'agentive':
      return 'search_required';
    case 'sequence':
      return 'pipeline_ok';
    case 'vague_ask':
      return 'unchecked_hallucination';
  }
}

export interface GeneratedPromptModeRuleParts {
  modeId: PromptModeId;
  scenarioId: PromptModeScenarioId;
  conditionKey: string;
  recommended: PromptModeId;
  isMismatch: boolean;
}

export function buildPromptModeRuleParts(
  scenarioId: PromptModeScenarioId,
  selectedMode: PromptModeId
): GeneratedPromptModeRuleParts {
  const meta = getScenarioMeta(scenarioId);
  return {
    modeId: selectedMode,
    scenarioId,
    conditionKey: meta.conditionKey,
    recommended: recommendMode(scenarioId),
    isMismatch: isModeMismatch(scenarioId, selectedMode),
  };
}

/** Axis strip: live-data band × structure need (no empty cells). */
export interface AxisStripItem {
  scenarioId: PromptModeScenarioId;
  liveData: LiveDataNeed;
  structure: StructureNeed;
}

export function getAxisStripItems(): readonly AxisStripItem[] {
  return PROMPT_MODE_SCENARIOS.map((s) => ({
    scenarioId: s.id,
    liveData: s.liveData,
    structure: s.structure,
  }));
}
