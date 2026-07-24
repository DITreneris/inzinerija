import { describe, expect, it } from 'vitest';
import { DIAGRAM_ROLE_COLORS, DIAGRAM_TOKENS } from '../diagramTokens';
import {
  columnGapOk,
  columnRatios,
  estimatePillSize,
  getContentFloorY,
  getEdgePillAnchor,
  getFeedbackReturnPath,
  getLadderBars,
  getLadderTopY,
  getL2ToCoordinatorLink,
  getRoleNode,
  isHubLive,
  M10_TAXONOMY_COL_GAP,
  M10_TAXONOMY_EDGES,
  M10_TAXONOMY_HEADER_H,
  M10_TAXONOMY_HUB_GHOST_OPACITY,
  M10_TAXONOMY_MIN_LEVEL_HEIGHT,
  M10_TAXONOMY_PILL_OFFSET,
  M10_TAXONOMY_ROLE_FILLS,
  M10_TAXONOMY_ROLE_R,
  M10_TAXONOMY_ROLES,
  M10_TAXONOMY_STEP_COUNT,
  M10_TAXONOMY_STEPS,
  M10_TAXONOMY_VIEWBOX,
  pillClearsRoleDiscs,
  roleLabelLines,
  shouldShowEdgePill,
} from '../m10TaxonomyLayout';

describe('lmsDualTaxonomyPolish (Type Etalon W5 + P3–P6)', () => {
  it('keeps decision-spine step count at 8', () => {
    expect(M10_TAXONOMY_STEP_COUNT).toBe(8);
    expect(M10_TAXONOMY_STEPS).toEqual([
      'L0',
      'L1',
      'L2',
      'L3',
      'router',
      'coordinator',
      'specialist',
      'evaluator',
    ]);
  });

  it('isHubLive only for L2 and role steps', () => {
    expect(isHubLive('L0')).toBe(false);
    expect(isHubLive('L1')).toBe(false);
    expect(isHubLive('L3')).toBe(false);
    expect(isHubLive('L2')).toBe(true);
    expect(isHubLive('router')).toBe(true);
    expect(isHubLive('evaluator')).toBe(true);
  });

  it('reserves header + caption band below which ladder starts', () => {
    expect(M10_TAXONOMY_HEADER_H).toBeGreaterThanOrEqual(78);
    expect(getLadderTopY()).toBeGreaterThanOrEqual(getContentFloorY());
  });

  it('uses two columns ~38/62 with gap ≥ 40 (P6)', () => {
    expect(columnGapOk()).toBe(true);
    expect(M10_TAXONOMY_COL_GAP).toBeGreaterThanOrEqual(40);
    const ratios = columnRatios();
    expect(ratios.gap).toBeGreaterThanOrEqual(40);
    expect(ratios.left).toBeGreaterThanOrEqual(0.36);
    expect(ratios.left).toBeLessThanOrEqual(0.4);
    expect(ratios.right).toBeGreaterThanOrEqual(0.6);
    expect(ratios.right).toBeLessThanOrEqual(0.64);
  });

  it('keeps all ladder bars tall enough for level subtitles', () => {
    expect(M10_TAXONOMY_MIN_LEVEL_HEIGHT).toBeGreaterThanOrEqual(44);
    const bars = getLadderBars();
    expect(bars).toHaveLength(4);
    for (const bar of bars) {
      expect(bar.height).toBeGreaterThanOrEqual(M10_TAXONOMY_MIN_LEVEL_HEIGHT);
    }
  });

  it('keeps equal role circles and vertical hierarchy', () => {
    expect(M10_TAXONOMY_ROLE_R).toBe(48);
    const router = M10_TAXONOMY_ROLES.find((r) => r.id === 'router')!;
    const coord = M10_TAXONOMY_ROLES.find((r) => r.id === 'coordinator')!;
    const spec = M10_TAXONOMY_ROLES.find((r) => r.id === 'specialist')!;
    for (const role of M10_TAXONOMY_ROLES) {
      expect(role.r).toBe(M10_TAXONOMY_ROLE_R);
    }
    expect(router.x).toBe(coord.x);
    expect(router.y).toBeLessThan(coord.y);
    expect(coord.y).toBeLessThan(spec.y);
    expect(Math.abs(spec.x - coord.x)).toBeGreaterThanOrEqual(120);
  });

  it('points L2 link at coordinator left edge', () => {
    const link = getL2ToCoordinatorLink(DIAGRAM_TOKENS.arrow.markerLen);
    const coord = M10_TAXONOMY_ROLES.find((r) => r.id === 'coordinator')!;
    expect(link.x2).toBeCloseTo(
      coord.x - coord.r - DIAGRAM_TOKENS.arrow.markerLen,
      0
    );
    expect(link.y2).toBeCloseTo(coord.y, 0);
  });

  it('keeps pill offset floor and KISS edge set (P4)', () => {
    expect(M10_TAXONOMY_PILL_OFFSET).toBeGreaterThanOrEqual(22);
    expect(M10_TAXONOMY_EDGES).toHaveLength(4);
    const ids = M10_TAXONOMY_EDGES.map((e) => e.id);
    expect(ids).toContain('router-coordinator');
    expect(ids).toContain('coordinator-specialist');
    expect(ids).toContain('specialist-coordinator');
    expect(ids).toContain('evaluator-coordinator');
    expect(ids).not.toContain('coordinator-evaluator');
    expect(M10_TAXONOMY_EDGES.some((e) => e.labelKey === 'delivers')).toBe(
      true
    );
    expect(M10_TAXONOMY_EDGES.map((e) => e.labelKey as string)).not.toContain(
      'reviews'
    );
    expect(
      M10_TAXONOMY_EDGES.filter((e) => e.tone === 'feedback')
    ).toHaveLength(1);
  });

  it('ghosts hub hard when not live (P4)', () => {
    expect(M10_TAXONOMY_HUB_GHOST_OPACITY).toBeLessThanOrEqual(0.22);
    expect(M10_TAXONOMY_HUB_GHOST_OPACITY).toBe(0.2);
  });

  it('uses role fills that are not L0–L3 ladder tones (P4)', () => {
    const router = M10_TAXONOMY_ROLES.find((r) => r.id === 'router')!;
    const spec = M10_TAXONOMY_ROLES.find((r) => r.id === 'specialist')!;
    const coord = M10_TAXONOMY_ROLES.find((r) => r.id === 'coordinator')!;
    const evalRole = M10_TAXONOMY_ROLES.find((r) => r.id === 'evaluator')!;
    expect(router.roleFill).toBe('base');
    expect(spec.roleFill).toBe('base');
    expect(coord.roleFill).toBe('coordinator');
    expect(evalRole.roleFill).toBe('evaluator');
    expect(M10_TAXONOMY_ROLE_FILLS.base).toBe(
      M10_TAXONOMY_ROLE_FILLS.evaluator
    );
    expect(M10_TAXONOMY_ROLE_FILLS.coordinator).toBe(
      DIAGRAM_ROLE_COLORS.violet
    );
    expect(M10_TAXONOMY_ROLE_FILLS.base).not.toBe(DIAGRAM_ROLE_COLORS.teal);
    expect(M10_TAXONOMY_ROLE_FILLS.base).not.toBe(DIAGRAM_ROLE_COLORS.slate);
    expect(M10_TAXONOMY_ROLE_FILLS.evaluator).not.toBe(
      DIAGRAM_ROLE_COLORS.amber
    );
  });

  it('stages edge pills by shell step (P6)', () => {
    expect(shouldShowEdgePill('L2', 'router-coordinator')).toBe(false);
    expect(shouldShowEdgePill('router', 'router-coordinator')).toBe(true);
    expect(shouldShowEdgePill('router', 'coordinator-specialist')).toBe(false);
    expect(shouldShowEdgePill('coordinator', 'coordinator-specialist')).toBe(
      true
    );
    expect(shouldShowEdgePill('specialist', 'specialist-coordinator')).toBe(
      true
    );
    expect(shouldShowEdgePill('evaluator', 'evaluator-coordinator')).toBe(true);
    expect(shouldShowEdgePill('evaluator', 'specialist-coordinator')).toBe(
      false
    );
  });

  it('keeps edge and feedback pills clear of role discs and inside viewBox (P6)', () => {
    for (const edge of M10_TAXONOMY_EDGES) {
      const pill = getEdgePillAnchor(edge);
      expect(pillClearsRoleDiscs(pill)).toBe(true);
      const { w, h } = estimatePillSize('placeholder');
      expect(pill.x - w / 2).toBeGreaterThanOrEqual(0);
      expect(pill.x + w / 2).toBeLessThanOrEqual(M10_TAXONOMY_VIEWBOX.width);
      expect(pill.y - h / 2).toBeGreaterThanOrEqual(0);
      expect(pill.y + h / 2).toBeLessThanOrEqual(M10_TAXONOMY_VIEWBOX.height);
    }
    const feedback = getFeedbackReturnPath(
      getRoleNode('evaluator'),
      getRoleNode('coordinator')
    );
    expect(pillClearsRoleDiscs(feedback.label)).toBe(true);
    const { h } = estimatePillSize('grąžina');
    expect(feedback.label.y + h / 2).toBeLessThanOrEqual(
      M10_TAXONOMY_VIEWBOX.height - 16
    );
  });

  it('keeps LMS flow stroke floors', () => {
    expect(DIAGRAM_TOKENS.stroke.flow).toBeGreaterThanOrEqual(3.5);
    expect(DIAGRAM_TOKENS.stroke.feedback).toBeGreaterThanOrEqual(3.5);
  });

  it('uses intentional LT hyphenation for long role names', () => {
    expect(roleLabelLines('router', 'Maršrutizatorius', 'lt')).toEqual([
      'Maršrut-',
      'izatorius',
    ]);
    expect(roleLabelLines('coordinator', 'Koordinatorius', 'lt')).toEqual([
      'Koordina-',
      'torius',
    ]);
    expect(roleLabelLines('router', 'Router', 'en')).toEqual(['Router']);
  });

  it('keeps dual-panel viewBox with P6 air height', () => {
    expect(M10_TAXONOMY_VIEWBOX.width).toBe(640);
    expect(M10_TAXONOMY_VIEWBOX.height).toBeGreaterThanOrEqual(500);
    expect(M10_TAXONOMY_VIEWBOX.height).toBeLessThanOrEqual(520);
  });
});
