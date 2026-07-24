/**
 * M10 dual-taxonomy layout SOT (Type Etalon W5 + P3–P6 polish).
 * Left 38%: L0–L3 ladder. Right 62%: L2 team hierarchy (live only when L2/role).
 * P4: role fills ≠ ladder tones; ghost hard; edge KISS.
 * P6: air budget + staged edge pills + hand label anchors (clean space > midpoint).
 */

export type M10TaxonomyStepId =
  | 'L0'
  | 'L1'
  | 'L2'
  | 'L3'
  | 'router'
  | 'coordinator'
  | 'specialist'
  | 'evaluator';

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
  /** Visual role family – not L0–L3 ladder tones. */
  roleFill: 'base' | 'coordinator' | 'evaluator';
}

export interface M10TaxonomyEdge {
  id: string;
  from: M10TaxonomyRoleId;
  to: M10TaxonomyRoleId;
  tone?: 'flow' | 'feedback';
  dashed?: boolean;
  labelKey: 'routes' | 'delegates' | 'delivers' | 'returns';
  labelSide?: 1 | -1;
  /** Hand-tuned pill center (P6) – preferred over midpoint offset. */
  labelAnchor?: { x: number; y: number };
}

export const M10_TAXONOMY_STEPS: readonly M10TaxonomyStepId[] = [
  'L0',
  'L1',
  'L2',
  'L3',
  'router',
  'coordinator',
  'specialist',
  'evaluator',
] as const;

export const M10_TAXONOMY_STEP_COUNT = M10_TAXONOMY_STEPS.length;

/** Title-only band (no ladder/hub). */
export const M10_TAXONOMY_HEADER_H = 78;

/** Space for column captions below header. */
export const M10_TAXONOMY_CAPTION_BAND = 20;

export const M10_TAXONOMY_LADDER_INACTIVE_OPACITY = 0.48;
/** Ghost silhouettes only – must not compete with CTA caption. */
export const M10_TAXONOMY_HUB_GHOST_OPACITY = 0.2;
export const M10_TAXONOMY_PILL_OFFSET = 22;
/** Pill center must stay ≥ this outside role disc radius. */
export const M10_TAXONOMY_PILL_CLEARANCE = 8;

/**
 * Hub role fills (P4): shared slate family; Coord = violet L2 echo;
 * Evaluator = same base fill + amber stroke ring (not a loud yellow disc).
 */
export const M10_TAXONOMY_ROLE_FILLS = {
  base: '#475569',
  coordinator: '#7c3aed',
  evaluator: '#475569',
  evaluatorRing: '#b8860b',
} as const;

export const M10_TAXONOMY_NODE_STROKE = {
  inactive: 1.5,
  active: 2,
} as const;

export const M10_TAXONOMY_MIN_LEVEL_HEIGHT = 44;

export const M10_TAXONOMY_VIEWBOX = {
  width: 640,
  height: 500,
} as const;

export const M10_TAXONOMY_PAD = 20;
export const M10_TAXONOMY_COL_GAP = 40;
export const M10_TAXONOMY_LEFT_RATIO = 0.38;

const contentW =
  M10_TAXONOMY_VIEWBOX.width - 2 * M10_TAXONOMY_PAD - M10_TAXONOMY_COL_GAP;
export const M10_TAXONOMY_LEFT_W = Math.round(
  contentW * M10_TAXONOMY_LEFT_RATIO
);
export const M10_TAXONOMY_RIGHT_W = contentW - M10_TAXONOMY_LEFT_W;

export const M10_TAXONOMY_LADDER = {
  x: M10_TAXONOMY_PAD,
  width: M10_TAXONOMY_LEFT_W,
  baseY: 400,
  gap: 6,
  captionY: M10_TAXONOMY_HEADER_H + 14,
} as const;

export const M10_TAXONOMY_RIGHT = {
  x: M10_TAXONOMY_PAD + M10_TAXONOMY_LEFT_W + M10_TAXONOMY_COL_GAP,
  width: M10_TAXONOMY_RIGHT_W,
  captionY: M10_TAXONOMY_HEADER_H + 14,
  hubCx:
    M10_TAXONOMY_PAD +
    M10_TAXONOMY_LEFT_W +
    M10_TAXONOMY_COL_GAP +
    M10_TAXONOMY_RIGHT_W / 2,
} as const;

export const M10_TAXONOMY_ROLE_R = 48;

export const M10_TAXONOMY_LEVELS = [
  { id: 'L0' as const, height: 46, tone: 'slate' as const },
  { id: 'L1' as const, height: 46, tone: 'teal' as const },
  { id: 'L2' as const, height: 48, tone: 'violet' as const },
  { id: 'L3' as const, height: 46, tone: 'brand' as const },
];

/** Hierarchical hub with air between Router and Coordinator. Spec/Eval ±120 (P6). */
export const M10_TAXONOMY_ROLES: M10TaxonomyRoleNode[] = [
  {
    id: 'router',
    x: M10_TAXONOMY_RIGHT.hubCx,
    y: 168,
    r: M10_TAXONOMY_ROLE_R,
    roleFill: 'base',
  },
  {
    id: 'coordinator',
    x: M10_TAXONOMY_RIGHT.hubCx,
    y: 268,
    r: M10_TAXONOMY_ROLE_R,
    roleFill: 'coordinator',
  },
  {
    id: 'specialist',
    x: M10_TAXONOMY_RIGHT.hubCx - 120,
    y: 358,
    r: M10_TAXONOMY_ROLE_R,
    roleFill: 'base',
  },
  {
    id: 'evaluator',
    x: M10_TAXONOMY_RIGHT.hubCx + 120,
    y: 358,
    r: M10_TAXONOMY_ROLE_R,
    roleFill: 'evaluator',
  },
];

const hubCx = M10_TAXONOMY_RIGHT.hubCx;

/** Edge KISS + P6 hand anchors (clean space outside discs). */
export const M10_TAXONOMY_EDGES: M10TaxonomyEdge[] = [
  {
    id: 'router-coordinator',
    from: 'router',
    to: 'coordinator',
    labelKey: 'routes',
    labelSide: 1,
    // Right of vertical shaft, clear of both discs
    labelAnchor: { x: hubCx + 56, y: 218 },
  },
  {
    id: 'coordinator-specialist',
    from: 'coordinator',
    to: 'specialist',
    labelKey: 'delegates',
    labelSide: 1,
    // Above/left of Spec←Coord shaft
    labelAnchor: { x: hubCx - 78, y: 300 },
  },
  {
    id: 'specialist-coordinator',
    from: 'specialist',
    to: 'coordinator',
    labelKey: 'delivers',
    labelSide: -1,
    // Left of Spec→Coord shaft, outside Spec disc
    labelAnchor: { x: hubCx - 160, y: 305 },
  },
  {
    id: 'evaluator-coordinator',
    from: 'evaluator',
    to: 'coordinator',
    tone: 'feedback',
    dashed: true,
    labelKey: 'returns',
    labelSide: -1,
  },
];

/** Intentional LT hyphenation inside circles. */
export const M10_TAXONOMY_ROLE_BREAKS_LT: Record<M10TaxonomyRoleId, string[]> =
  {
    router: ['Maršrut-', 'izatorius'],
    coordinator: ['Koordina-', 'torius'],
    specialist: ['Specialistas'],
    evaluator: ['Vertintojas'],
  };

export function getTaxonomyStepId(index: number): M10TaxonomyStepId {
  const id = M10_TAXONOMY_STEPS[index];
  if (!id) throw new Error(`Unknown M10 taxonomy step index: ${index}`);
  return id;
}

export function getTaxonomyStepIndex(id: M10TaxonomyStepId): number {
  const index = M10_TAXONOMY_STEPS.indexOf(id);
  if (index < 0) throw new Error(`Unknown M10 taxonomy step id: ${id}`);
  return index;
}

export function isLevelStep(id: M10TaxonomyStepId): boolean {
  return id === 'L0' || id === 'L1' || id === 'L2' || id === 'L3';
}

export function isRoleStep(id: M10TaxonomyStepId): id is M10TaxonomyRoleId {
  return (
    id === 'router' ||
    id === 'coordinator' ||
    id === 'specialist' ||
    id === 'evaluator'
  );
}

/** Hub is “live” only for L2 or a role step (state truth). */
export function isHubLive(currentId: M10TaxonomyStepId): boolean {
  return currentId === 'L2' || isRoleStep(currentId);
}

/**
 * P6: shafts always when hub live; pills only for the active role edge (+ L2 bridge separate).
 */
export function shouldShowEdgePill(
  currentId: M10TaxonomyStepId,
  edgeId: string
): boolean {
  if (currentId === 'L2') return false;
  if (currentId === 'router') return edgeId === 'router-coordinator';
  if (currentId === 'coordinator') return edgeId === 'coordinator-specialist';
  if (currentId === 'specialist') return edgeId === 'specialist-coordinator';
  if (currentId === 'evaluator') return edgeId === 'evaluator-coordinator';
  return false;
}

export function getRoleNode(id: M10TaxonomyRoleId) {
  const node = M10_TAXONOMY_ROLES.find((role) => role.id === id);
  if (!node) throw new Error(`Unknown M10 taxonomy role node: ${id}`);
  return node;
}

export function getLadderBars() {
  let stackY = M10_TAXONOMY_LADDER.baseY;
  return M10_TAXONOMY_LEVELS.map((lv) => {
    stackY -= lv.height + M10_TAXONOMY_LADDER.gap;
    return {
      ...lv,
      y: stackY,
      x: M10_TAXONOMY_LADDER.x,
      width: M10_TAXONOMY_LADDER.width,
    };
  });
}

export function getLadderTopY() {
  const bars = getLadderBars();
  return Math.min(...bars.map((b) => b.y));
}

export function getContentFloorY() {
  return M10_TAXONOMY_HEADER_H + M10_TAXONOMY_CAPTION_BAND;
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

/**
 * Symmetric U below Spec/Eval baseline: Eval → down → across → up to Coord bottom.
 * Pill under U stays inside viewBox (P6 air).
 */
export function getFeedbackReturnPath(
  from: M10TaxonomyRoleNode,
  to: M10TaxonomyRoleNode,
  _markerLen = 0
) {
  const startX = from.x;
  const startY = from.y + from.r;
  const endX = to.x;
  const endY = to.y + to.r;
  const midY = Math.max(from.y, getRoleNode('specialist').y) + from.r + 36;
  const pillH = 18;
  const maxLabelY = M10_TAXONOMY_VIEWBOX.height - M10_TAXONOMY_PAD - pillH / 2;
  const labelY = Math.min(midY + 16, maxLabelY);
  const d = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
  const label = {
    x: (startX + endX) / 2,
    y: labelY,
  };
  return {
    d,
    label,
    start: { x: startX, y: startY },
    end: { x: endX, y: endY },
  };
}

export function getEdgeLabelAnchor(
  from: M10TaxonomyRoleNode,
  to: M10TaxonomyRoleNode,
  side: 1 | -1 = 1,
  offset = M10_TAXONOMY_PILL_OFFSET
) {
  const points = getCircleEdgePoints(from, to);
  const mx = (points.x1 + points.x2) / 2;
  const my = (points.y1 + points.y2) / 2;
  const dx = points.x2 - points.x1;
  const dy = points.y2 - points.y1;
  const distance = Math.hypot(dx, dy) || 1;
  const nx = (-dy / distance) * side * offset;
  const ny = (dx / distance) * side * offset;
  return { x: mx + nx, y: my + ny };
}

/** Prefer hand anchor when set (P6). */
export function getEdgePillAnchor(edge: M10TaxonomyEdge) {
  if (edge.labelAnchor) return edge.labelAnchor;
  if (edge.tone === 'feedback') {
    return getFeedbackReturnPath(getRoleNode(edge.from), getRoleNode(edge.to))
      .label;
  }
  return getEdgeLabelAnchor(
    getRoleNode(edge.from),
    getRoleNode(edge.to),
    edge.labelSide ?? 1,
    M10_TAXONOMY_PILL_OFFSET
  );
}

export function pillClearsRoleDiscs(
  pill: { x: number; y: number },
  clearance = M10_TAXONOMY_PILL_CLEARANCE
) {
  return M10_TAXONOMY_ROLES.every((role) => {
    const d = Math.hypot(pill.x - role.x, pill.y - role.y);
    return d >= role.r + clearance;
  });
}

export function getL2ToCoordinatorLink(markerLen = 0) {
  const bars = getLadderBars();
  const l2 = bars.find((b) => b.id === 'L2');
  const coord = getRoleNode('coordinator');
  if (!l2) throw new Error('L2 ladder bar missing');
  const x1 = l2.x + l2.width;
  const y1 = l2.y + l2.height / 2;
  const x2 = coord.x - coord.r - markerLen;
  const y2 = coord.y;
  const label = {
    x: (x1 + x2) / 2,
    y: Math.min(y1, y2) - 28,
  };
  return { x1, y1, x2, y2, label, l2, coord };
}

export function estimatePillSize(label: string) {
  const w = Math.max(52, Math.min(132, label.length * 6.6 + 16));
  const h = 18;
  return { w, h };
}

export function roleLabelLines(
  roleId: M10TaxonomyRoleId,
  label: string,
  locale: 'lt' | 'en'
): string[] {
  if (locale === 'lt') {
    return M10_TAXONOMY_ROLE_BREAKS_LT[roleId];
  }
  if (label.length <= 12) return [label];
  const space = label.indexOf(' ');
  if (space > 0) return [label.slice(0, space), label.slice(space + 1)];
  return [label];
}

export function roleHitBox(role: M10TaxonomyRoleNode) {
  const size = Math.max(44, role.r * 2);
  return {
    x: role.x - size / 2,
    y: role.y - size / 2,
    width: size,
    height: size,
  };
}

export function columnGapOk() {
  return M10_TAXONOMY_COL_GAP >= 40;
}

export function columnRatios() {
  const usable =
    M10_TAXONOMY_VIEWBOX.width - 2 * M10_TAXONOMY_PAD - M10_TAXONOMY_COL_GAP;
  return {
    left: M10_TAXONOMY_LEFT_W / usable,
    right: M10_TAXONOMY_RIGHT_W / usable,
    gap: M10_TAXONOMY_COL_GAP,
  };
}

/** Mix #rrggbb toward background (inactive ladder fills). */
export function mixHexToward(hex: string, toward: string, t: number): string {
  const parse = (h: string) => {
    const s = h.replace('#', '');
    return [
      parseInt(s.slice(0, 2), 16),
      parseInt(s.slice(2, 4), 16),
      parseInt(s.slice(4, 6), 16),
    ] as const;
  };
  try {
    const [r1, g1, b1] = parse(hex);
    const [r2, g2, b2] = parse(toward.startsWith('#') ? toward : '#e2e8f0');
    const m = (a: number, b: number) => Math.round(a + (b - a) * t);
    const to = (n: number) => n.toString(16).padStart(2, '0');
    return `#${to(m(r1, r2))}${to(m(g1, g2))}${to(m(b1, b2))}`;
  } catch {
    return hex;
  }
}
