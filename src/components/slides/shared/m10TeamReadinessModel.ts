/**
 * M10 10.255 team readiness lab – deterministic model.
 * This is a self-reflection snapshot, not a validated maturity score.
 */

export type TeamReadinessDimensionId = 'use' | 'structure' | 'learning';

export type TeamReadinessLevelId = 'ad_hoc' | 'fragmented' | 'systematic';

export type TeamReadinessSelections = Partial<
  Record<TeamReadinessDimensionId, TeamReadinessLevelId>
>;

export const TEAM_READINESS_DIMENSION_IDS = [
  'use',
  'structure',
  'learning',
] as const satisfies readonly TeamReadinessDimensionId[];

export const TEAM_READINESS_LEVEL_IDS = [
  'ad_hoc',
  'fragmented',
  'systematic',
] as const satisfies readonly TeamReadinessLevelId[];

export const TEAM_READINESS_LEVEL_SCORE: Record<TeamReadinessLevelId, number> =
  {
    ad_hoc: 1,
    fragmented: 2,
    systematic: 3,
  };

export const TEAM_READINESS_DIMENSION_ORDER: Record<
  TeamReadinessDimensionId,
  number
> = {
  use: 1,
  structure: 2,
  learning: 3,
};

export function isTeamReadinessComplete(
  selections: TeamReadinessSelections
): selections is Record<TeamReadinessDimensionId, TeamReadinessLevelId> {
  return TEAM_READINESS_DIMENSION_IDS.every((id) => selections[id] != null);
}

export function getWeakestReadinessDimensions(
  selections: TeamReadinessSelections
): TeamReadinessDimensionId[] {
  if (!isTeamReadinessComplete(selections)) return [];
  const minScore = Math.min(
    ...TEAM_READINESS_DIMENSION_IDS.map(
      (id) => TEAM_READINESS_LEVEL_SCORE[selections[id]]
    )
  );
  return TEAM_READINESS_DIMENSION_IDS.filter(
    (id) => TEAM_READINESS_LEVEL_SCORE[selections[id]] === minScore
  ).sort(
    (a, b) =>
      TEAM_READINESS_DIMENSION_ORDER[a] - TEAM_READINESS_DIMENSION_ORDER[b]
  );
}

export function getPrimaryReadinessGap(
  selections: TeamReadinessSelections
): TeamReadinessDimensionId | 'shared_baseline' | null {
  const weakest = getWeakestReadinessDimensions(selections);
  if (weakest.length === 0) return null;
  if (weakest.length > 1) return 'shared_baseline';
  return weakest[0] ?? null;
}

export function updateTeamReadinessSelection(
  selections: TeamReadinessSelections,
  dimensionId: TeamReadinessDimensionId,
  levelId: TeamReadinessLevelId
): TeamReadinessSelections {
  return {
    ...selections,
    [dimensionId]: levelId,
  };
}
