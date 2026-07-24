import { describe, expect, it } from 'vitest';
import { formatDepthRolesArtefact } from '../m10DepthRolesContent';
import {
  buildDepthRolesArtefactParts,
  DEPTH_TO_CODE,
  isTeamDepth,
} from '../m10DepthRolesModel';

describe('m10DepthRolesModel', () => {
  it('maps depth ids to L codes', () => {
    expect(DEPTH_TO_CODE.chat).toBe('L0');
    expect(DEPTH_TO_CODE.agent).toBe('L1');
    expect(DEPTH_TO_CODE.team).toBe('L2');
    expect(DEPTH_TO_CODE.flow).toBe('L3');
  });

  it('isTeamDepth only for team', () => {
    expect(isTeamDepth('team')).toBe(true);
    expect(isTeamDepth('chat')).toBe(false);
    expect(isTeamDepth(null)).toBe(false);
  });

  it('clears router when depth is not team', () => {
    const parts = buildDepthRolesArtefactParts('agent', true);
    expect(parts.includeRouter).toBe(false);
    expect(parts.code).toBe('L1');
  });

  it('formats non-team artefact without roles block', () => {
    const text = formatDepthRolesArtefact(
      'lt',
      buildDepthRolesArtefactParts('chat', false)
    );
    expect(text).toContain('Gylio lygis: Pokalbis (L0)');
    expect(text).not.toContain('Rolės:');
    expect(text).not.toContain('Koordinatorius');
  });

  it('formats team artefact with three roles and optional router', () => {
    const base = formatDepthRolesArtefact(
      'lt',
      buildDepthRolesArtefactParts('team', false)
    );
    expect(base).toContain('Gylio lygis: Komanda (L2)');
    expect(base).toContain('1) Koordinatorius');
    expect(base).toContain('2) Specialistas');
    expect(base).toContain('3) Vertintojas');
    expect(base).not.toContain('4) Maršrutizatorius');

    const withRouter = formatDepthRolesArtefact(
      'en',
      buildDepthRolesArtefactParts('team', true)
    );
    expect(withRouter).toContain('Depth level: Team (L2)');
    expect(withRouter).toContain('4) Router');
  });
});
