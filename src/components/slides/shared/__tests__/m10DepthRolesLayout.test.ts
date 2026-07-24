import { describe, expect, it } from 'vitest';
import { processArrowEndInset } from '../processArrowMarker';
import {
  getDepthPillRow,
  getDiagramHeight,
  getRoleStripBoxes,
  getRoleStripConnectors,
  getRouterBox,
  pillsFitViewBox,
  roleStripGapOk,
  roleStripOnlyForTeam,
  M10_DEPTH_ROLE_BOX,
  M10_DEPTH_ROLES_VIEWBOX,
} from '../m10DepthRolesLayout';

describe('m10DepthRolesLayout', () => {
  it('fits four depth pills in the viewBox', () => {
    expect(getDepthPillRow()).toHaveLength(4);
    expect(pillsFitViewBox()).toBe(true);
  });

  it('shows taller viewBox only when roles strip is needed', () => {
    expect(getDiagramHeight(false)).toBe(M10_DEPTH_ROLES_VIEWBOX.heightLadder);
    expect(getDiagramHeight(true)).toBe(
      M10_DEPTH_ROLES_VIEWBOX.heightWithRoles
    );
    expect(roleStripOnlyForTeam('team')).toBe(true);
    expect(roleStripOnlyForTeam('chat')).toBe(false);
    expect(roleStripOnlyForTeam(null)).toBe(false);
  });

  it('keeps role strip gap clear for shafts (no mid-gutter verbs)', () => {
    const roles = getRoleStripBoxes();
    expect(roles).toHaveLength(3);
    expect(roleStripGapOk()).toBe(true);
    expect(M10_DEPTH_ROLE_BOX.gap).toBeGreaterThanOrEqual(32);
    for (const box of roles) {
      expect(box.width).toBeGreaterThan(box.height);
      expect('r' in box).toBe(false);
    }
    const tipInset = processArrowEndInset();
    expect(tipInset).toBeGreaterThanOrEqual(10);
    const connectors = getRoleStripConnectors(tipInset);
    expect(connectors).toHaveLength(2);
    for (const c of connectors) {
      expect(c.x2 - c.x1).toBeGreaterThan(16);
      // line ends tipLen before next box (refX=0 tip past endpoint)
      expect(c.x2).toBeLessThan(c.x1 + M10_DEPTH_ROLE_BOX.gap);
    }
    const router = getRouterBox();
    expect(router.y).toBeLessThan(roles[0].y);
  });
});
