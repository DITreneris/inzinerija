import { describe, expect, it } from 'vitest';
import {
  getM12EdgePoints,
  getM12LineEnd,
  getM12MultiAgentDesktopBoxes,
  M12_MULTI_AGENT_EDGES_DESKTOP,
  M12_MULTI_AGENT_MARKER_LEN,
  getM12BoxMap,
} from '../m12MultiAgentSchemaLayout';
import {
  getLearningLoopBoxMap,
  getM10LearningLoopCompactBoxes,
  getM10LearningLoopDesktopBoxes,
  M10_LEARNING_LOOP_EDGES_DESKTOP,
  M10_LEARNING_LOOP_STEP_NODE_IDS,
  resolveLearningLoopStraight,
} from '../m10LearningLoopLayout';
import { getM12MultiAgentSchemaLabels } from '../m12MultiAgentSchemaContent';
import { getM10LearningLoopLabels } from '../m10LearningLoopContent';
import { getCircleEdgePoints, M10_TAXONOMY_ROLES } from '../m10TaxonomyLayout';
import { DIAGRAM_TOKENS } from '../diagramTokens';

describe('m12MultiAgentSchemaLayout', () => {
  it('derives edge endpoints short of target by markerLen', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const boxes = getM12BoxMap(getM12MultiAgentDesktopBoxes(labels));
    const edge = M12_MULTI_AGENT_EDGES_DESKTOP[0];
    const pts = getM12EdgePoints(edge, boxes);
    const endRaw = {
      x: boxes.router.x,
      y: boxes.router.y + boxes.router.h / 2,
    };
    const expected = getM12LineEnd(
      { x: pts.x1, y: pts.y1 },
      endRaw,
      M12_MULTI_AGENT_MARKER_LEN
    );
    expect(pts.x2).toBeCloseTo(expected.x, 5);
    expect(pts.y2).toBeCloseTo(expected.y, 5);
    expect(pts.x2).toBeLessThan(boxes.router.x + 0.01);
  });

  it('keeps six macro steps covering all nodes', () => {
    const ids = M12_MULTI_AGENT_EDGES_DESKTOP.map((e) => e.from);
    expect(ids).toContain('input');
    expect(M12_MULTI_AGENT_EDGES_DESKTOP.some((e) => e.kind === 'hitl')).toBe(
      true
    );
  });

  it('includes evaluator→coordinator feedback edge with path (M10-DIA-03)', () => {
    const feedback = M12_MULTI_AGENT_EDGES_DESKTOP.find(
      (e) => e.id === 'evaluator-coordinator'
    );
    expect(feedback).toBeDefined();
    expect(feedback!.kind).toBe('feedback');
    expect(feedback!.from).toBe('evaluator');
    expect(feedback!.to).toBe('coordinator');
    expect(feedback!.path).toBeTruthy();
  });
});

describe('m10LearningLoopLayout edges', () => {
  it('resolves straight edges from box anchors without magic coords', () => {
    const labels = getM10LearningLoopLabels('lt');
    const { execution, loop } = getM10LearningLoopDesktopBoxes(labels);
    const map = getLearningLoopBoxMap([...execution, ...loop]);
    const edge = M10_LEARNING_LOOP_EDGES_DESKTOP.find(
      (e) => e.id === 'task-rules'
    );
    expect(edge).toBeDefined();
    const pts = resolveLearningLoopStraight(edge!, map);
    expect(pts).not.toBeNull();
    expect(pts!.x1).toBe(map.task.x + map.task.w);
    expect(pts!.x2).toBeLessThan(map.rules.x);
  });

  it('stores curved update paths in layout SOT', () => {
    const curved = M10_LEARNING_LOOP_EDGES_DESKTOP.filter((e) => e.desktopPath);
    expect(curved.length).toBeGreaterThanOrEqual(3);
  });

  it('keeps four macro steps as the intentional contract (M10-DIA-02)', () => {
    expect(M10_LEARNING_LOOP_STEP_NODE_IDS).toHaveLength(4);
    expect(M10_LEARNING_LOOP_STEP_NODE_IDS[3]).toContain('update');
  });

  it('includes update node in compact layout', () => {
    const labels = getM10LearningLoopLabels('lt');
    const compact = getM10LearningLoopCompactBoxes(labels);
    expect(compact.some((b) => b.id === 'update')).toBe(true);
  });
});

describe('m10TaxonomyLayout marker inset', () => {
  it('shortens to-point by markerLen past circumference', () => {
    const from = M10_TAXONOMY_ROLES[0];
    const to = M10_TAXONOMY_ROLES[1];
    const without = getCircleEdgePoints(from, to, 0);
    const withMarker = getCircleEdgePoints(
      from,
      to,
      DIAGRAM_TOKENS.arrow.markerLen
    );
    const distWithout = Math.hypot(to.x - without.x2, to.y - without.y2);
    const distWith = Math.hypot(to.x - withMarker.x2, to.y - withMarker.y2);
    expect(distWith).toBeGreaterThan(distWithout);
    expect(distWith - distWithout).toBeCloseTo(
      DIAGRAM_TOKENS.arrow.markerLen,
      5
    );
  });
});
