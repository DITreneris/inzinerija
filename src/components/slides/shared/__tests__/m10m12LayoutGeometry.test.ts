import { describe, expect, it } from 'vitest';
import {
  getM12EdgePoints,
  getM12FeedbackPathDesktop,
  getM12LineEnd,
  getM12MultiAgentCompactBoxes,
  getM12MultiAgentDesktopBoxes,
  M12_MULTI_AGENT_EDGES_DESKTOP,
  M12_MULTI_AGENT_MARKER_LEN,
  M12_MULTI_AGENT_TITLE_Y,
  getM12BoxMap,
  m12CompactBoxesFitViewBox,
  m12DesktopBoxesFitViewBox,
  m12SpineCenterYAligned,
} from '../m12MultiAgentSchemaLayout';
import {
  getLearningLoopBoxMap,
  getM10LearningLoopCompactBoxes,
  getM10LearningLoopDesktopBoxes,
  M10_LEARNING_LOOP_EDGES_DESKTOP,
  M10_LEARNING_LOOP_PANELS,
  M10_LEARNING_LOOP_STEP_NODE_IDS,
  resolveLearningLoopStraight,
} from '../m10LearningLoopLayout';
import { getM12MultiAgentSchemaLabels } from '../m12MultiAgentSchemaContent';
import { getM10LearningLoopLabels } from '../m10LearningLoopContent';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { pillIntersectsStroke, rectsAabbIntersect } from '../diagramLayoutMath';
import {
  AGENT_WORKFLOW_ARROW,
  AGENT_WORKFLOW_BOX,
  AGENT_WORKFLOW_FEEDBACK,
  AGENT_WORKFLOW_GAP,
  AGENT_WORKFLOW_OPACITY,
  AGENT_WORKFLOW_START,
  AGENT_WORKFLOW_STEP_COUNT,
  AGENT_WORKFLOW_TYPE,
  AGENT_WORKFLOW_VIEWBOX,
  agentWorkflowDesktopFitsViewBox,
  agentWorkflowDesktopMarginsEqual,
  agentWorkflowDesktopRowWidth,
  agentWorkflowDesktopStartX,
  agentWorkflowForwardShaftLen,
  buildAgentWorkflowDesktopBoxes,
} from '../agentWorkflowLayout';
import {
  getM10TriggerHierarchyShelf,
  getM10TriggerHierarchyStroke,
  getM10TriggerTypesLabelRect,
  M10_TRIGGER_FLOW_LAYOUT,
  M10_TRIGGER_FLOW_STEP_COUNT,
  M10_TRIGGER_TYPES_ORPHAN_OPACITY,
  m10TriggerShaftX,
  m10TriggerTypeChipsX,
  m10TriggerTypeRowWidth,
} from '../m10TriggerFlowLayout';
import {
  getM10TriggerFlowStepExplanations,
  getM10ToolTreeLeaves,
  getM10WorkflowSpecStepExplanations,
} from '../m10DiagramContent';
import {
  M10_TOOL_TREE_CRITERION_SIZE,
  M10_TOOL_TREE_LEAF_COUNT,
  M10_TOOL_TREE_ROOT,
  TREE_DIM_OPACITY,
  buildM10ToolTreeLeaves,
  getM10ToolTreeBusStroke,
  getM10ToolTreeBusY,
  getM10ToolTreeCriterionRect,
  getM10ToolTreeCriterionY,
  getM10ToolTreeDropStroke,
  getM10ToolTreeTrunkStroke,
  m10ToolTreeRootBottom,
  m10ToolTreeRootCx,
} from '../m10ToolDecisionTreeLayout';

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

  it('includes evaluator→coordinator feedback edge + derived U path', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const boxes = getM12BoxMap(getM12MultiAgentDesktopBoxes(labels));
    const feedback = M12_MULTI_AGENT_EDGES_DESKTOP.find(
      (e) => e.id === 'evaluator-coordinator'
    );
    expect(feedback).toBeDefined();
    expect(feedback!.kind).toBe('feedback');
    expect(feedback!.from).toBe('evaluator');
    expect(feedback!.to).toBe('coordinator');
    const d = getM12FeedbackPathDesktop(boxes);
    expect(d).toMatch(/^M /);
    expect(d.length).toBeGreaterThan(20);
  });

  it('fits desktop boxes in viewBox and aligns spine centerY', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const list = getM12MultiAgentDesktopBoxes(labels);
    const boxes = getM12BoxMap(list);
    expect(m12DesktopBoxesFitViewBox(list)).toBe(true);
    expect(m12SpineCenterYAligned(boxes)).toBe(true);
    expect(list[0].y - M12_MULTI_AGENT_TITLE_Y.desktop).toBeGreaterThanOrEqual(
      18
    );
  });

  it('fits compact two-row boxes in the compact viewBox', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const list = getM12MultiAgentCompactBoxes(labels);
    expect(m12CompactBoxesFitViewBox(list)).toBe(true);
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

  it('routes update via bus helper (no center C-curves)', () => {
    const labels = getM10LearningLoopLabels('lt');
    const { loop } = getM10LearningLoopDesktopBoxes(labels);
    const update = loop.find((b) => b.id === 'update')!;
    const curvedLegacy = M10_LEARNING_LOOP_EDGES_DESKTOP.filter(
      (e) =>
        'desktopPath' in e &&
        Boolean((e as { desktopPath?: string }).desktopPath)
    );
    expect(curvedLegacy).toHaveLength(0);
    expect(update.x).toBeGreaterThanOrEqual(
      M10_LEARNING_LOOP_PANELS.desktop.learn.x
    );
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

describe('agentWorkflowLayout (I3c micro polish)', () => {
  it('fits five desktop boxes inside viewBox with target sizes', () => {
    expect(agentWorkflowDesktopFitsViewBox()).toBe(true);
    const boxes = buildAgentWorkflowDesktopBoxes();
    expect(boxes).toHaveLength(AGENT_WORKFLOW_STEP_COUNT);
    expect(boxes[0].w).toBe(AGENT_WORKFLOW_BOX.desktop.w);
    expect(boxes[0].w).toBeGreaterThanOrEqual(188);
    expect(boxes[0].h).toBeGreaterThanOrEqual(88);
    const last = boxes[boxes.length - 1];
    expect(last.x + last.w).toBeLessThan(AGENT_WORKFLOW_VIEWBOX.desktop.width);
    expect(
      boxes[0].w / AGENT_WORKFLOW_VIEWBOX.desktop.width
    ).toBeGreaterThanOrEqual(0.17);
  });

  it('centers the desktop row with equal side margins (etalon)', () => {
    expect(agentWorkflowDesktopRowWidth()).toBe(
      AGENT_WORKFLOW_STEP_COUNT * AGENT_WORKFLOW_BOX.desktop.w +
        (AGENT_WORKFLOW_STEP_COUNT - 1) * AGENT_WORKFLOW_GAP.desktop
    );
    expect(agentWorkflowDesktopStartX()).toBe(16);
    expect(agentWorkflowDesktopMarginsEqual()).toBe(true);
    const boxes = buildAgentWorkflowDesktopBoxes();
    const left = boxes[0].x;
    const right =
      AGENT_WORKFLOW_VIEWBOX.desktop.width -
      (boxes[boxes.length - 1].x + boxes[boxes.length - 1].w);
    expect(left).toBe(16);
    expect(right).toBe(16);
  });

  it('keeps compressed hero height and feedback under the row', () => {
    expect(AGENT_WORKFLOW_VIEWBOX.desktop.height).toBe(248);
    expect(AGENT_WORKFLOW_VIEWBOX.compact.height).toBe(540);
    expect(AGENT_WORKFLOW_FEEDBACK.desktopY()).toBeLessThan(
      AGENT_WORKFLOW_VIEWBOX.desktop.height
    );
    expect(AGENT_WORKFLOW_FEEDBACK.labelOffsetY).toBe(14);
    const labelY =
      AGENT_WORKFLOW_FEEDBACK.desktopY() + AGENT_WORKFLOW_FEEDBACK.labelOffsetY;
    expect(labelY).toBeLessThan(AGENT_WORKFLOW_VIEWBOX.desktop.height);
  });

  it('keeps caption clear of edge labels (RL caption-air parity)', () => {
    expect(AGENT_WORKFLOW_START.desktop.y).toBeGreaterThanOrEqual(58);
    expect(AGENT_WORKFLOW_TYPE.diagramTitleY.desktop).toBe(22);
    const edgeLabelY = AGENT_WORKFLOW_START.desktop.y - 6;
    const titleBottomApprox =
      AGENT_WORKFLOW_TYPE.diagramTitleY.desktop +
      DIAGRAM_TOKENS.typography.title.desktop * 0.35;
    expect(edgeLabelY - titleBottomApprox).toBeGreaterThanOrEqual(18);
  });

  it('keeps visible forward shaft and thick feedback stroke', () => {
    expect(AGENT_WORKFLOW_GAP.desktop).toBeGreaterThanOrEqual(28);
    expect(agentWorkflowForwardShaftLen()).toBeGreaterThanOrEqual(20);
    expect(AGENT_WORKFLOW_FEEDBACK.pathStroke).toBeGreaterThanOrEqual(3);
    expect(AGENT_WORKFLOW_FEEDBACK.cornerR).toBe(16);
    expect(AGENT_WORKFLOW_ARROW.forwardStroke).toBeGreaterThanOrEqual(3.5);
    expect(AGENT_WORKFLOW_ARROW.gapFwd).toBe(0);
    /** Local tip ≥10; must not lock to legacy global markerLen (6). */
    expect(AGENT_WORKFLOW_ARROW.markerLen).toBeGreaterThanOrEqual(10);
    expect(AGENT_WORKFLOW_ARROW.markerLen).toBeGreaterThan(
      DIAGRAM_TOKENS.arrow.markerLen
    );
    expect(AGENT_WORKFLOW_OPACITY.inactive).toBeGreaterThanOrEqual(0.85);
  });

  it('uses caption-scale diagram title and lighter edge labels', () => {
    expect(AGENT_WORKFLOW_TYPE.diagramTitle.desktop).toBe(17);
    expect(AGENT_WORKFLOW_TYPE.diagramTitleWeight).toBe(700);
    expect(AGENT_WORKFLOW_TYPE.diagramTitleY.desktop).toBe(22);
    expect(AGENT_WORKFLOW_TYPE.edgeLabel).toBe(12);
    expect(AGENT_WORKFLOW_TYPE.edgeLabelWeight).toBe(500);
    expect(AGENT_WORKFLOW_TYPE.nodeTitleWeight).toBe(700);
    expect(AGENT_WORKFLOW_TYPE.nodeDescWeight).toBe(500);
  });
});

describe('m10TriggerFlowLayout', () => {
  it('keeps Shell step count at 3 (T/C/A; Webhook is a trigger type)', () => {
    expect(M10_TRIGGER_FLOW_STEP_COUNT).toBe(3);
    expect(getM10TriggerFlowStepExplanations('lt')).toHaveLength(3);
    expect(getM10TriggerFlowStepExplanations('en')).toHaveLength(3);
  });

  it('drops a belongs-to stroke (no process arrow) onto a raised type strip', () => {
    const L = M10_TRIGGER_FLOW_LAYOUT;
    const stroke = getM10TriggerHierarchyStroke();
    const shelf = getM10TriggerHierarchyShelf();
    const label = getM10TriggerTypesLabelRect();
    const chipsX = m10TriggerTypeChipsX();
    const chipsW = m10TriggerTypeRowWidth();
    const shaftX = m10TriggerShaftX();
    expect(L.boxH).toBeGreaterThanOrEqual(58);
    expect(L.height).toBeLessThan(250);
    expect(L.typeRowY).toBeLessThanOrEqual(150);
    expect(L.typeRowY + L.typeChipH).toBeLessThan(L.height);
    expect(L.yMain + L.boxH).toBeLessThan(L.typesLabelY);
    expect(L.typesLabelY).toBeLessThan(L.typeRowY);
    expect(stroke.y1).toBeLessThan(stroke.y2);
    expect(stroke.x1).toBe(shaftX);
    expect(stroke.x2).toBe(shaftX);
    expect(L.hierarchyStroke).toBeGreaterThan(DIAGRAM_TOKENS.stroke.inactive);
    expect(L.hierarchyStroke).toBeLessThan(DIAGRAM_TOKENS.stroke.flow);
    expect(stroke.strokeWidth).toBe(L.hierarchyStroke);
    expect(label.x + label.w).toBeLessThanOrEqual(shaftX - L.labelShaftGap);
    expect(label.x).toBeGreaterThanOrEqual(8);
    expect(shelf.y1).toBe(shelf.y2);
    expect(shelf.y1).toBeLessThan(L.typeRowY);
    expect(shelf.x1).toBe(chipsX);
    expect(shelf.x2).toBe(chipsX + chipsW);
    expect(stroke.y2).toBe(shelf.y1);
    expect(chipsX + chipsW / 2).toBeCloseTo(shaftX);
    expect(chipsX).toBeGreaterThanOrEqual(8);
    expect(chipsX + chipsW).toBeLessThanOrEqual(L.width - 8);
    const rowW = 3 * L.boxW + 2 * L.gap;
    expect(L.x0 + rowW).toBeLessThanOrEqual(L.width);
    expect(pillIntersectsStroke(label, stroke)).toBe(false);
    expect(pillIntersectsStroke(label, shelf)).toBe(false);
    expect(M10_TRIGGER_TYPES_ORPHAN_OPACITY).toBeLessThan(
      DIAGRAM_TOKENS.opacity.inactive
    );
    expect(M10_TRIGGER_TYPES_ORPHAN_OPACITY).toBeCloseTo(0.4);
  });
});

describe('m10ToolDecisionTreeLayout', () => {
  it('keeps criterion type at the edge-label floor and dim below LMS inactive', () => {
    expect(M10_TOOL_TREE_CRITERION_SIZE).toBeGreaterThanOrEqual(12);
    expect(M10_TOOL_TREE_CRITERION_SIZE).toBe(
      DIAGRAM_TOKENS.typography.edgeLabel.size
    );
    expect(TREE_DIM_OPACITY).toBeLessThan(DIAGRAM_TOKENS.opacity.inactive);
    expect(TREE_DIM_OPACITY).toBeGreaterThan(0.5);
  });

  it('raises the criterion row above the bus with air under the root', () => {
    const criterionY = getM10ToolTreeCriterionY();
    const busY = getM10ToolTreeBusY();
    expect(M10_TOOL_TREE_ROOT.y + M10_TOOL_TREE_ROOT.h).toBeLessThan(
      criterionY
    );
    expect(m10ToolTreeRootBottom()).toBeLessThan(criterionY);
    expect(criterionY + 8 + 12).toBeLessThanOrEqual(busY);
    expect(getM10ToolTreeTrunkStroke().y2).toBeLessThan(criterionY);
  });

  it('keeps every LT and EN criterion off the trunk, bus, and own drop', () => {
    for (const locale of ['lt', 'en'] as const) {
      const leaves = getM10ToolTreeLeaves(locale);
      expect(leaves).toHaveLength(M10_TOOL_TREE_LEAF_COUNT);
      const trunk = getM10ToolTreeTrunkStroke();
      const bus = getM10ToolTreeBusStroke(leaves.length);
      leaves.forEach((leaf, i) => {
        const rect = getM10ToolTreeCriterionRect(
          i,
          leaf.condition,
          leaves.length
        );
        const drop = getM10ToolTreeDropStroke(i, leaves.length);
        expect(pillIntersectsStroke(rect, trunk)).toBe(false);
        expect(pillIntersectsStroke(rect, bus)).toBe(false);
        expect(pillIntersectsStroke(rect, drop)).toBe(false);
      });
    }
  });

  it('keeps neighbouring criterion AABBs from overlapping', () => {
    const leaves = getM10ToolTreeLeaves('lt');
    const rects = leaves.map((leaf, i) =>
      getM10ToolTreeCriterionRect(i, leaf.condition, leaves.length)
    );
    for (let i = 0; i < rects.length - 1; i += 1) {
      expect(
        rectsAabbIntersect(rects[i], rects[i + 1]),
        `${leaves[i].id}∩${leaves[i + 1].id}`
      ).toBe(false);
    }
  });

  it('centers five equal leaves and ends drops short of the leaf by the process tip', () => {
    const boxes = buildM10ToolTreeLeaves();
    expect(boxes).toHaveLength(5);
    expect(boxes[2]?.cx).toBe(m10ToolTreeRootCx());
    const drop = getM10ToolTreeDropStroke(2);
    expect(drop.y2).toBe(
      (boxes[2]?.y ?? 0) - DIAGRAM_TOKENS.arrow.processTipLen
    );
    expect(drop.y2).toBeGreaterThan(drop.y1);
  });
});

describe('m10WorkflowSpecStepExplanations', () => {
  it('keeps all eight Shell bodies distinct in LT and EN', () => {
    for (const locale of ['lt', 'en'] as const) {
      const bodies = getM10WorkflowSpecStepExplanations(locale).map(
        (step) => step.body
      );

      expect(bodies).toHaveLength(8);
      expect(new Set(bodies).size).toBe(8);
    }
  });
});
