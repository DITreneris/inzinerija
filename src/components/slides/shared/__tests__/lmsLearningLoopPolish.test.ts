import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import {
  getLearningLoopUpdateBusGeom,
  LEARNING_LOOP_UPDATE_TIP_LEN,
  LEARNING_LOOP_POLYGON_TIP_GAP,
} from '../learningLoopUpdateBus';
import { getM10LearningLoopLabels } from '../m10LearningLoopContent';
import {
  getLearningLoopBoxMap,
  getLearningLoopDesktopBusX,
  getLearningLoopDesktopGutter,
  getLearningLoopNodeVisualState,
  getM10LearningLoopCompactBoxes,
  getM10LearningLoopDesktopBoxes,
  isUpdateInsideLearnPanel,
  M10_LEARNING_LOOP_ARROW_TIP,
  M10_LEARNING_LOOP_EDGES,
  M10_LEARNING_LOOP_LEARN_CYCLE_EDGE_IDS,
  M10_LEARNING_LOOP_ORPHAN_OPACITY,
  M10_LEARNING_LOOP_PANELS,
  M10_LEARNING_LOOP_STEP_EDGE_IDS,
  resolveLearningLoopEdge,
  shouldPaintLearningLoopEdge,
  shouldShowLearningLoopCycleRing,
  shouldShowLearningLoopEdgeLabel,
} from '../m10LearningLoopLayout';

describe('lmsLearningLoopPolish', () => {
  const labels = getM10LearningLoopLabels('lt');

  it('uses processTipLen (not legacy markerLen)', () => {
    expect(M10_LEARNING_LOOP_ARROW_TIP).toBe(
      DIAGRAM_TOKENS.arrow.processTipLen
    );
    expect(LEARNING_LOOP_UPDATE_TIP_LEN).toBe(
      DIAGRAM_TOKENS.arrow.processTipLen
    );
    expect(M10_LEARNING_LOOP_ARROW_TIP).toBeGreaterThan(
      DIAGRAM_TOKENS.arrow.markerLen
    );
  });

  it('keeps update fully inside the learn panel', () => {
    const { loop } = getM10LearningLoopDesktopBoxes(labels);
    const update = loop.find((b) => b.id === 'update');
    expect(update).toBeDefined();
    expect(isUpdateInsideLearnPanel(update!)).toBe(true);
    const learn = M10_LEARNING_LOOP_PANELS.desktop.learn;
    expect(update!.x).toBeGreaterThanOrEqual(learn.x);
  });

  it('provides a wide gutter for the update bus (≥40)', () => {
    expect(getLearningLoopDesktopGutter()).toBeGreaterThanOrEqual(40);
  });

  it('builds update bus with tips outside rules/skills', () => {
    const { execution, loop } = getM10LearningLoopDesktopBoxes(labels);
    const map = getLearningLoopBoxMap([...execution, ...loop]);
    const busX = getLearningLoopDesktopBusX();
    const bus = getLearningLoopUpdateBusGeom(
      map.update,
      map.rules,
      map.skills,
      busX
    );
    expect(bus.busX).toBe(busX);
    expect(bus.tipRules.tipX).toBeGreaterThan(map.rules.x + map.rules.w);
    expect(bus.tipRules.tipX - (map.rules.x + map.rules.w)).toBe(
      LEARNING_LOOP_POLYGON_TIP_GAP
    );
    expect(bus.tipSkills.tipX).toBeGreaterThan(map.skills.x + map.skills.w);
    expect(bus.tipRules.dir).toBe('left');
    expect(bus.trunkPath).toContain(`L ${busX}`);
  });

  it('has no amber edge kind (amber only on Patikra fill)', () => {
    const allowed = new Set(['flow', 'record', 'learn', 'update']);
    expect(M10_LEARNING_LOOP_EDGES.every((e) => allowed.has(e.kind))).toBe(
      true
    );
  });

  it('stages edges: step 0 hides bridge/learn/update', () => {
    expect(shouldPaintLearningLoopEdge(0, 'task-rules')).toBe(true);
    expect(shouldPaintLearningLoopEdge(0, 'output-logs')).toBe(false);
    expect(shouldPaintLearningLoopEdge(0, 'logs-eval')).toBe(false);
    expect(shouldPaintLearningLoopEdge(0, 'update-rules')).toBe(false);
    expect(shouldShowLearningLoopEdgeLabel(0, 'update-bus')).toBe(false);
  });

  it('stages edges: step 1 shows only record bridge', () => {
    expect(shouldPaintLearningLoopEdge(1, 'output-logs')).toBe(true);
    expect(shouldPaintLearningLoopEdge(1, 'logs-eval')).toBe(false);
    expect(shouldShowLearningLoopEdgeLabel(1, 'output-logs')).toBe(true);
  });

  it('stages edges: step 2 learn cycle without update bus', () => {
    expect(shouldPaintLearningLoopEdge(2, 'logs-eval')).toBe(true);
    expect(shouldPaintLearningLoopEdge(2, 'update-logs')).toBe(true);
    expect(shouldPaintLearningLoopEdge(2, 'update-rules')).toBe(false);
    expect(shouldShowLearningLoopEdgeLabel(2, 'eval-lessons')).toBe(true);
  });

  it('stages edges: step 3 update bus only', () => {
    expect(shouldPaintLearningLoopEdge(3, 'update-rules')).toBe(true);
    expect(shouldPaintLearningLoopEdge(3, 'update-skills')).toBe(true);
    expect(shouldPaintLearningLoopEdge(3, 'task-rules')).toBe(false);
    expect(shouldShowLearningLoopEdgeLabel(3, 'update-bus')).toBe(true);
  });

  it('keeps four macro edge partitions covering all edges', () => {
    const all = new Set(M10_LEARNING_LOOP_EDGES.map((e) => e.id));
    const painted = new Set(M10_LEARNING_LOOP_STEP_EDGE_IDS.flat());
    expect(painted.size).toBe(all.size);
    for (const id of all) {
      expect(painted.has(id)).toBe(true);
    }
  });

  it('compact layout keeps Agentai ∥ Įgūdžiai and update in learn zone', () => {
    const compact = getM10LearningLoopCompactBoxes(labels);
    const agents = compact.find((b) => b.id === 'agents')!;
    const skills = compact.find((b) => b.id === 'skills')!;
    const update = compact.find((b) => b.id === 'update')!;
    const learn = M10_LEARNING_LOOP_PANELS.compact.learn;
    expect(agents.y).toBe(skills.y);
    expect(agents.x).toBeLessThan(skills.x);
    expect(update.y).toBeGreaterThanOrEqual(learn.y);
    expect(update.y + update.h).toBeLessThanOrEqual(learn.y + learn.h);
  });

  it('learn cycle is 2×2 clock: logs/eval top, update/lessons bottom', () => {
    const { loop } = getM10LearningLoopDesktopBoxes(labels);
    const map = getLearningLoopBoxMap(loop);
    expect(map.logs.y).toBe(map.evaluation.y);
    expect(map.update.y).toBe(map.lessons.y);
    expect(map.logs.x).toBe(map.update.x);
    expect(map.evaluation.x).toBe(map.lessons.x);
    expect(map.logs.y).toBeLessThan(map.update.y);
  });

  it('node visual state: step 0 focuses orch+output; learn is orphan', () => {
    expect(getLearningLoopNodeVisualState(0, 'orchestrator')).toBe('active');
    expect(getLearningLoopNodeVisualState(0, 'output')).toBe('active');
    expect(getLearningLoopNodeVisualState(0, 'task')).toBe('live');
    expect(getLearningLoopNodeVisualState(0, 'agents')).toBe('live');
    expect(getLearningLoopNodeVisualState(0, 'logs')).toBe('orphan');
    expect(getLearningLoopNodeVisualState(0, 'update')).toBe('orphan');
  });

  it('node visual state: step 1 only logs active; other learn orphan', () => {
    expect(getLearningLoopNodeVisualState(1, 'logs')).toBe('active');
    expect(getLearningLoopNodeVisualState(1, 'output')).toBe('live');
    expect(getLearningLoopNodeVisualState(1, 'evaluation')).toBe('orphan');
    expect(getLearningLoopNodeVisualState(1, 'orchestrator')).toBe('orphan');
  });

  it('node visual state: step 2–3 matrix', () => {
    expect(getLearningLoopNodeVisualState(2, 'evaluation')).toBe('active');
    expect(getLearningLoopNodeVisualState(2, 'lessons')).toBe('active');
    expect(getLearningLoopNodeVisualState(2, 'logs')).toBe('live');
    expect(getLearningLoopNodeVisualState(2, 'task')).toBe('orphan');
    expect(getLearningLoopNodeVisualState(3, 'update')).toBe('active');
    expect(getLearningLoopNodeVisualState(3, 'rules')).toBe('live');
    expect(getLearningLoopNodeVisualState(3, 'skills')).toBe('live');
    expect(getLearningLoopNodeVisualState(3, 'output')).toBe('orphan');
  });

  it('orphan opacity is local 0.5 (not LMS inactive 0.88)', () => {
    expect(M10_LEARNING_LOOP_ORPHAN_OPACITY).toBe(0.5);
    expect(M10_LEARNING_LOOP_ORPHAN_OPACITY).toBeLessThan(
      DIAGRAM_TOKENS.opacity.inactive
    );
  });

  it('cycle ring only from step 2', () => {
    expect(shouldShowLearningLoopCycleRing(0)).toBe(false);
    expect(shouldShowLearningLoopCycleRing(1)).toBe(false);
    expect(shouldShowLearningLoopCycleRing(2)).toBe(true);
    expect(shouldShowLearningLoopCycleRing(3)).toBe(true);
  });

  it('step 2 paints all four learn-cycle edges with visible shafts', () => {
    const { execution, loop } = getM10LearningLoopDesktopBoxes(labels);
    const map = getLearningLoopBoxMap([...execution, ...loop]);
    const busX = getLearningLoopDesktopBusX();
    for (const id of M10_LEARNING_LOOP_LEARN_CYCLE_EDGE_IDS) {
      expect(shouldPaintLearningLoopEdge(2, id)).toBe(true);
      const edge = M10_LEARNING_LOOP_EDGES.find((e) => e.id === id)!;
      expect(edge.kind).toBe('learn');
      const resolved = resolveLearningLoopEdge(edge, map, {
        busX,
        useMarkerTip: false,
      });
      expect(resolved).not.toBeNull();
      if (!resolved || resolved.mode !== 'line') {
        throw new Error(`expected line edge for ${id}`);
      }
      const shaft = Math.hypot(
        resolved.x2 - resolved.x1,
        resolved.y2 - resolved.y1
      );
      expect(shaft).toBeGreaterThanOrEqual(20);
      expect(resolved.tipGeom).toBeDefined();
    }
  });
});
