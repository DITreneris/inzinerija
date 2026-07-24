import { describe, expect, it } from 'vitest';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { getM10OrchestratorLabels } from '../m10OrchestratorContent';
import {
  estimateOrchestratorPillSize,
  getBoxMap,
  getDesktopFaninGeometry,
  getDesktopFanoutGeometry,
  getM10OrchestratorDesktopBoxes,
  getOrchestratorEdgeLabelAnchor,
  getOrchestratorRetryLabelAnchor,
  getRoleBandTone,
  isOrchestratorNodeLive,
  M10_ORCHESTRATOR_ARROW_TIP,
  M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP,
  M10_ORCHESTRATOR_FANIN_ERROR_STROKE,
  M10_ORCHESTRATOR_ROLE_BAND,
  M10_ORCHESTRATOR_STEP_COUNT,
  M10_ORCHESTRATOR_STEP_NODE_IDS,
  M10_ORCHESTRATOR_STROKE_DATA,
  M10_ORCHESTRATOR_VIEWBOX,
  shouldPaintEdge,
  shouldPaintFanin,
  shouldPaintFanout,
  shouldShowEdgeLabel,
  shouldShowRetryLabel,
} from '../m10OrchestratorLayout';
import {
  getOrchestratorRetryPathCompact,
  getOrchestratorRetryPathDesktop,
  getOrchestratorRetryRouteXDesktop,
  ORCHESTRATOR_ARROW_TIP_LEN,
  ORCHESTRATOR_RETRY_ROUTE_X_COMPACT,
  retryTipOutsideHub,
} from '../orchestratorRetryPath';

describe('lmsMultiAgentPolish (Type Etalon W7 + v06.1)', () => {
  it('keeps guided walkthrough at 6 shell steps', () => {
    expect(M10_ORCHESTRATOR_STEP_COUNT).toBe(6);
    expect(M10_ORCHESTRATOR_STEP_NODE_IDS).toHaveLength(6);
    expect(M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP).toHaveLength(6);
  });

  it('uses LMS token floors for inactive and strokes', () => {
    expect(DIAGRAM_TOKENS.opacity.inactive).toBeGreaterThanOrEqual(0.85);
    expect(DIAGRAM_TOKENS.stroke.flow).toBeGreaterThanOrEqual(3.5);
    expect(DIAGRAM_TOKENS.stroke.feedback).toBeGreaterThanOrEqual(3.5);
    expect(M10_ORCHESTRATOR_STROKE_DATA).toBeLessThan(
      DIAGRAM_TOKENS.stroke.flow
    );
    expect(M10_ORCHESTRATOR_FANIN_ERROR_STROKE).toBeLessThan(
      DIAGRAM_TOKENS.stroke.flow
    );
    expect(M10_ORCHESTRATOR_FANIN_ERROR_STROKE).toBeGreaterThanOrEqual(2);
  });

  it('uses local arrow tip ≥10 (does not rely on global markerLen alone)', () => {
    expect(M10_ORCHESTRATOR_ARROW_TIP).toBeGreaterThanOrEqual(10);
    expect(ORCHESTRATOR_ARROW_TIP_LEN).toBe(M10_ORCHESTRATOR_ARROW_TIP);
    expect(DIAGRAM_TOKENS.arrow.markerLen).toBeLessThan(
      M10_ORCHESTRATOR_ARROW_TIP
    );
  });

  it('keeps role-band tones: hub violet, specialists teal, gates amber', () => {
    expect(getRoleBandTone('orchestrator')).toBe(
      M10_ORCHESTRATOR_ROLE_BAND.hub
    );
    expect(getRoleBandTone('research')).toBe(
      M10_ORCHESTRATOR_ROLE_BAND.specialist
    );
    expect(getRoleBandTone('validate')).toBe(M10_ORCHESTRATOR_ROLE_BAND.gate);
    const boxes = getM10OrchestratorDesktopBoxes(
      getM10OrchestratorLabels('lt')
    );
    for (const box of boxes) {
      expect(box.tone).toBe(getRoleBandTone(box.id));
    }
    // validate stays amber family (error = stroke overlay, not rose tone)
    expect(boxes.find((b) => b.id === 'validate')!.tone).toBe('amber');
  });

  it('culls early-step edges and step-4 eval-output (hide not dim)', () => {
    expect(shouldPaintEdge(0, 'input-router')).toBe(true);
    expect(shouldPaintEdge(0, 'router-orch')).toBe(false);
    expect(shouldPaintFanout(2)).toBe(true);
    expect(shouldPaintFanin(3)).toBe(true);
    expect(shouldPaintEdge(4, 'validate-eval')).toBe(true);
    expect(shouldPaintEdge(4, 'eval-output')).toBe(false);
    expect(shouldPaintEdge(5, 'eval-output')).toBe(true);
    expect(shouldShowRetryLabel(4)).toBe(true);
  });

  it('dims orphan nodes early (live-map); tools/eval/output not live on step 0–1', () => {
    expect(isOrchestratorNodeLive(0, 'input')).toBe(true);
    expect(isOrchestratorNodeLive(0, 'router')).toBe(true); // via input-router
    expect(isOrchestratorNodeLive(0, 'tools')).toBe(false);
    expect(isOrchestratorNodeLive(0, 'evaluator')).toBe(false);
    expect(isOrchestratorNodeLive(0, 'output')).toBe(false);
    expect(isOrchestratorNodeLive(1, 'orchestrator')).toBe(true);
    expect(isOrchestratorNodeLive(1, 'tools')).toBe(false);
    expect(isOrchestratorNodeLive(3, 'tools')).toBe(true);
  });

  it('step 2 shows a single orch assign edge id (not ×3)', () => {
    const step2 = M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP[2];
    const orchAssign = step2.filter((id) => id.startsWith('orch-'));
    expect(orchAssign).toEqual(['orch-summarize']);
  });

  it('builds desktop fan-out with start-aligned band clear of mid-drop', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const fan = getDesktopFanoutGeometry(boxes);
    expect(fan).not.toBeNull();
    const research = boxes.research;
    const summarize = boxes.summarize;
    expect(fan!.busY).toBeLessThanOrEqual(fan!.agentsLane.y);
    expect(fan!.agentsBand.y).toBeGreaterThan(fan!.busY + 5);
    expect(fan!.agentsBand.y).toBeLessThan(research.y);
    // Start-aligned — not lane center / summarize drop
    const midDropX = summarize.x + summarize.w / 2;
    const approxLabelW = labels.agentsBand.length * 6.6;
    expect(fan!.agentsBand.x).toBe(fan!.agentsLane.x + 12);
    expect(fan!.agentsBand.x + approxLabelW).toBeLessThan(midDropX - 4);
    expect(fan!.agentsBand.x + approxLabelW).toBeLessThan(fan!.trunkX - 4);
    expect(fan!.assignPill.y).toBeGreaterThanOrEqual(
      boxes.orchestrator.y + boxes.orchestrator.h + 10
    );
    expect(fan!.busY - fan!.assignPill.y).toBeGreaterThanOrEqual(8);
  });

  it('builds desktop fan-in collect bus into evaluator', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const fanin = getDesktopFaninGeometry(boxes);
    expect(fanin).not.toBeNull();
    expect(fanin!.dropPaths).toHaveLength(3);
    expect(fanin!.busY).toBeLessThan(boxes.evaluator.y);
  });

  it('aligns state↔orch and eval↔output; LT text-fit widths; viewBox air', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    expect(boxes.state.y + boxes.state.h / 2).toBe(
      boxes.orchestrator.y + boxes.orchestrator.h / 2
    );
    expect(boxes.evaluator.y).toBe(boxes.output.y);
    expect(boxes.evaluator.h).toBe(boxes.output.h);
    expect(boxes.router.w).toBeGreaterThanOrEqual(168);
    expect(boxes.evaluator.w).toBeGreaterThanOrEqual(196);
    expect(boxes.state.w).toBeGreaterThanOrEqual(156);
    expect(
      boxes.output.x - (boxes.evaluator.x + boxes.evaluator.w)
    ).toBeGreaterThanOrEqual(24);
    expect(M10_ORCHESTRATOR_VIEWBOX.desktop.height).toBeGreaterThanOrEqual(448);
    expect(boxes.research.h).toBeGreaterThanOrEqual(58);
  });

  it('places annotation anchors with pill-size clearance; kviečia +4', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const verb = 'parenka srautą';
    const { h: pillH, w: pillW } = estimateOrchestratorPillSize(verb);
    const horiz = getOrchestratorEdgeLabelAnchor(
      boxes.input,
      boxes.router,
      'right',
      'left',
      undefined,
      verb
    );
    expect(horiz.midY - horiz.y).toBeGreaterThanOrEqual(pillH / 2 + 8 - 0.01);
    const vert = getOrchestratorEdgeLabelAnchor(
      boxes.router,
      boxes.orchestrator,
      'bottom',
      'top',
      undefined,
      verb
    );
    expect(Math.abs(vert.x - vert.midX)).toBeGreaterThanOrEqual(
      pillW / 2 + 10 - 0.01
    );
    const calls = 'kviečia';
    const base = getOrchestratorEdgeLabelAnchor(
      boxes.research,
      boxes.tools,
      'bottom',
      'top',
      undefined,
      calls
    );
    const bumped = getOrchestratorEdgeLabelAnchor(
      boxes.research,
      boxes.tools,
      'bottom',
      'top',
      undefined,
      calls,
      'research-tools'
    );
    expect(bumped.x - base.x).toBe(4);
  });

  it('routes desktop retry between tools and evaluator (not far-left wrap)', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const routeX = getOrchestratorRetryRouteXDesktop(
      boxes.tools,
      boxes.evaluator
    );
    expect(routeX).toBeGreaterThan(boxes.tools.x + boxes.tools.w);
    expect(routeX).toBeLessThan(boxes.evaluator.x);
    expect(
      retryTipOutsideHub(boxes.evaluator, boxes.orchestrator, routeX)
    ).toBe(true);
    const label = labels.retryLabel;
    const { w } = estimateOrchestratorPillSize(label);
    const pt = getOrchestratorRetryLabelAnchor(
      boxes.evaluator,
      boxes.orchestrator,
      routeX,
      label
    );
    expect(pt.x - w / 2).toBeGreaterThanOrEqual(routeX + 10);
    expect(
      getOrchestratorRetryPathDesktop(
        boxes.evaluator,
        boxes.orchestrator,
        routeX
      ).startsWith('M ')
    ).toBe(true);
    expect(
      getOrchestratorRetryPathCompact(
        boxes.evaluator,
        boxes.orchestrator,
        ORCHESTRATOR_RETRY_ROUTE_X_COMPACT
      ).startsWith('M ')
    ).toBe(true);
  });

  it('shows retry label only on steps 4–5 (path mount gate)', () => {
    expect(shouldShowRetryLabel(0)).toBe(false);
    expect(shouldShowRetryLabel(3)).toBe(false);
    expect(shouldShowRetryLabel(4)).toBe(true);
    expect(shouldShowRetryLabel(5)).toBe(true);
  });

  it('provides LT/EN Kartoti/Retry, Maršrutizatorius, changelog state sub', () => {
    const lt = getM10OrchestratorLabels('lt');
    const en = getM10OrchestratorLabels('en');
    expect(lt.retryLabel).toBe('Kartoti');
    expect(en.retryLabel).toBe('Retry');
    expect(lt.edgeVerbs['eval-retry']).toBe('Kartoti');
    expect(en.edgeVerbs['eval-retry']).toBe('Retry');
    expect(lt.edgeVerbs['state-orch']).toBe('skaito / įrašo');
    expect(lt.nodes.router[0]).toBe('Maršrutizatorius');
    expect(lt.nodes.state[1]).toBe('atmintis / changelog');
    expect(en.nodes.state[1]).toBe('memory / changelog');
    expect(lt.agentsBand).not.toBe(lt.agentsBand.toUpperCase());
    expect(shouldShowEdgeLabel(2, 'orch-summarize')).toBe(true);
  });
});
