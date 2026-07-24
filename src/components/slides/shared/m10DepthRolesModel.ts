/**
 * M10 10.45 depth/roles lab – deterministic ids and artefact parts (no scenario).
 */

export type DepthId = 'chat' | 'agent' | 'team' | 'flow';

export type DepthCode = 'L0' | 'L1' | 'L2' | 'L3';

export const DEPTH_ORDER: readonly DepthId[] = [
  'chat',
  'agent',
  'team',
  'flow',
] as const;

export const DEPTH_TO_CODE: Record<DepthId, DepthCode> = {
  chat: 'L0',
  agent: 'L1',
  team: 'L2',
  flow: 'L3',
};

export interface DepthRolesArtefactParts {
  depth: DepthId;
  code: DepthCode;
  includeRouter: boolean;
}

export function isTeamDepth(depth: DepthId | null): boolean {
  return depth === 'team';
}

export function buildDepthRolesArtefactParts(
  depth: DepthId,
  includeRouter: boolean
): DepthRolesArtefactParts {
  return {
    depth,
    code: DEPTH_TO_CODE[depth],
    includeRouter: depth === 'team' ? includeRouter : false,
  };
}
