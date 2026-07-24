/**
 * M10 10.45 mini depth/roles illustration layout (static SVG inside lab).
 * No Shell / no 8-step spine. Role strip only when depth === team.
 */

import type { DepthId } from './m10DepthRolesModel';
import { DEPTH_ORDER } from './m10DepthRolesModel';

export const M10_DEPTH_ROLES_VIEWBOX = {
  width: 640,
  heightLadder: 200,
  heightWithRoles: 310,
} as const;

export const M10_DEPTH_PILL = {
  width: 138,
  height: 56,
  gap: 12,
  radius: 12,
  startY: 52,
} as const;

export const M10_DEPTH_ROLE_BOX = {
  width: 112,
  height: 40,
  /** Gap must fit arrow shaft only – no edge-label text in the gutter (mini). */
  gap: 36,
  radius: 10,
  y: 210,
} as const;

/** Minimum clear space between role boxes for stroke + tip (no mid-gutter verbs). */
export const M10_DEPTH_ROLE_GAP_MIN = 32;

export function getDiagramHeight(showRoles: boolean): number {
  return showRoles
    ? M10_DEPTH_ROLES_VIEWBOX.heightWithRoles
    : M10_DEPTH_ROLES_VIEWBOX.heightLadder;
}

export function getDepthPillRow() {
  const n = DEPTH_ORDER.length;
  const totalW = n * M10_DEPTH_PILL.width + (n - 1) * M10_DEPTH_PILL.gap;
  const startX = (M10_DEPTH_ROLES_VIEWBOX.width - totalW) / 2;
  return DEPTH_ORDER.map((id, index) => ({
    id,
    x: startX + index * (M10_DEPTH_PILL.width + M10_DEPTH_PILL.gap),
    y: M10_DEPTH_PILL.startY,
    width: M10_DEPTH_PILL.width,
    height: M10_DEPTH_PILL.height,
  }));
}

export type RoleStripId = 'coordinator' | 'specialist' | 'evaluator';

export const ROLE_STRIP_ORDER: readonly RoleStripId[] = [
  'coordinator',
  'specialist',
  'evaluator',
] as const;

export function getRoleStripBoxes() {
  const n = ROLE_STRIP_ORDER.length;
  const totalW =
    n * M10_DEPTH_ROLE_BOX.width + (n - 1) * M10_DEPTH_ROLE_BOX.gap;
  const startX = (M10_DEPTH_ROLES_VIEWBOX.width - totalW) / 2;
  return ROLE_STRIP_ORDER.map((id, index) => ({
    id,
    x: startX + index * (M10_DEPTH_ROLE_BOX.width + M10_DEPTH_ROLE_BOX.gap),
    y: M10_DEPTH_ROLE_BOX.y,
    width: M10_DEPTH_ROLE_BOX.width,
    height: M10_DEPTH_ROLE_BOX.height,
  }));
}

/** Optional router sits above coordinator (team only). */
export function getRouterBox() {
  const coord = getRoleStripBoxes()[0];
  return {
    id: 'router' as const,
    x: coord.x,
    y: M10_DEPTH_ROLE_BOX.y - 56,
    width: M10_DEPTH_ROLE_BOX.width,
    height: M10_DEPTH_ROLE_BOX.height,
  };
}

export function pillsFitViewBox() {
  const pills = getDepthPillRow();
  const first = pills[0];
  const last = pills[pills.length - 1];
  return (
    first.x >= 8 && last.x + last.width <= M10_DEPTH_ROLES_VIEWBOX.width - 8
  );
}

export function roleStripOnlyForTeam(depth: DepthId | null): boolean {
  return depth === 'team';
}

export function roleStripGapOk() {
  return M10_DEPTH_ROLE_BOX.gap >= M10_DEPTH_ROLE_GAP_MIN;
}

/** Horizontal connectors between consecutive role boxes (shaft clear of discs). */
export function getRoleStripConnectors(markerLen = 0) {
  const boxes = getRoleStripBoxes();
  const connectors: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }> = [];
  for (let i = 0; i < boxes.length - 1; i += 1) {
    const from = boxes[i];
    const to = boxes[i + 1];
    const y = from.y + from.height / 2;
    connectors.push({
      x1: from.x + from.width,
      y1: y,
      x2: to.x - markerLen,
      y2: y,
    });
  }
  return connectors;
}
