export type M10TaxonomyRoleId =
  | 'router'
  | 'coordinator'
  | 'specialist'
  | 'evaluator';

export interface M10TaxonomyRoleNode {
  id: M10TaxonomyRoleId;
  x: number;
  y: number;
  r: number;
  tone: 'slate' | 'violet' | 'teal' | 'amber';
}

export interface M10TaxonomyEdge {
  id: string;
  from: M10TaxonomyRoleId;
  to: M10TaxonomyRoleId;
  tone?: 'flow' | 'feedback';
  dashed?: boolean;
}

export const M10_TAXONOMY_VIEWBOX = {
  width: 560,
  height: 320,
} as const;

export const M10_TAXONOMY_LADDER = {
  x: 28,
  width: 210,
  baseY: 278,
  gap: 7,
} as const;

export const M10_TAXONOMY_LEVELS = [
  { id: 'L0', height: 38, tone: 'slate' },
  { id: 'L1', height: 54, tone: 'teal' },
  { id: 'L2', height: 70, tone: 'violet' },
  { id: 'L3', height: 86, tone: 'brand' },
] as const;

export const M10_TAXONOMY_ROLES: M10TaxonomyRoleNode[] = [
  { id: 'router', x: 410, y: 78, r: 42, tone: 'slate' },
  { id: 'coordinator', x: 410, y: 165, r: 42, tone: 'violet' },
  { id: 'specialist', x: 326, y: 248, r: 42, tone: 'teal' },
  { id: 'evaluator', x: 494, y: 248, r: 42, tone: 'amber' },
];

export const M10_TAXONOMY_EDGES: M10TaxonomyEdge[] = [
  { id: 'router-coordinator', from: 'router', to: 'coordinator' },
  { id: 'coordinator-specialist', from: 'coordinator', to: 'specialist' },
  { id: 'coordinator-evaluator', from: 'coordinator', to: 'evaluator' },
  {
    id: 'evaluator-coordinator',
    from: 'evaluator',
    to: 'coordinator',
    tone: 'feedback',
    dashed: true,
  },
];

export function getRoleNode(id: M10TaxonomyRoleId) {
  const node = M10_TAXONOMY_ROLES.find((role) => role.id === id);
  if (!node) throw new Error(`Unknown M10 taxonomy role node: ${id}`);
  return node;
}

export function getCircleEdgePoints(
  from: M10TaxonomyRoleNode,
  to: M10TaxonomyRoleNode,
  markerLen = 0
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy) || 1;
  const ux = dx / distance;
  const uy = dy / distance;

  return {
    x1: from.x + ux * from.r,
    y1: from.y + uy * from.r,
    x2: to.x - ux * (to.r + markerLen),
    y2: to.y - uy * (to.r + markerLen),
  };
}
