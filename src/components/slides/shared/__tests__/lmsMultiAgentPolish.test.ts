import {
  pillIntersectsStroke,
  pillRectFromCenter,
  rectsAabbIntersect,
} from '../diagramLayoutMath';
import { DIAGRAM_TOKENS } from '../diagramTokens';
import { getM10OrchestratorLabels } from '../m10OrchestratorContent';
import {
  estimateOrchestratorPillSize,
  getBoxMap,
  getDesktopFaninGeometry,
  getDesktopFanoutGeometry,
  getM10OrchestratorDesktopBoxes,
  getOrchestratorEdgeEmphasis,
  getOrchestratorEdgeLabelAnchor,
  getOrchestratorEdgeOpacity,
  getOrchestratorRetryLabelAnchor,
  getValidateEvalOrthogonalPath,
  getRoleBandTone,
  M10_ORCHESTRATOR_DESKTOP_X_OFFSET,
  isOrchestratorNodeLive,
  M10_ORCHESTRATOR_AGENTS_HEADER_H,
  M10_ORCHESTRATOR_ARROW_TIP,
  M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP,
  M10_ORCHESTRATOR_EDGES,
  M10_ORCHESTRATOR_FANIN_ERROR_STROKE,
  M10_ORCHESTRATOR_FOCUS_BY_STEP,
  M10_ORCHESTRATOR_ROLE_BAND,
  M10_ORCHESTRATOR_STEP_COUNT,
  M10_ORCHESTRATOR_STEP_NODE_IDS,
  M10_ORCHESTRATOR_STROKE_DATA,
  M10_ORCHESTRATOR_TITLE_Y_DESKTOP,
  M10_ORCHESTRATOR_VIEWBOX,
  ORCHESTRATOR_MAP_EDGE_OPACITY,
  ORCHESTRATOR_ORPHAN_OPACITY,
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
import { getM12MultiAgentSchemaLabels } from '../m12MultiAgentSchemaContent';
import {
  getM12BoxMap,
  getM12DesktopFanStrokes,
  getM12DesktopSpineStrokes,
  getM12DesktopVerbPills,
  getM12EdgeOpacity,
  getM12FaninGeometry,
  getM12FanoutGeometry,
  getM12FeedbackLabelPos,
  getM12FeedbackTroughYDesktop,
  getM12MultiAgentCompactBoxes,
  getM12MultiAgentDesktopBoxes,
  getM12NodeOpacity,
  getM12SpineVerbY,
  M12_LINEAR_GAP_MIN,
  M12_MAP_EDGE_OPACITY,
  M12_MIN_BOX_W,
  M12_MULTI_AGENT_BOX_H,
  M12_MULTI_AGENT_EDGES_DESKTOP,
  M12_MULTI_AGENT_MARKER_LEN,
  M12_MULTI_AGENT_STEP_COUNT,
  M12_MULTI_AGENT_STEP_NODE_IDS,
  M12_MULTI_AGENT_VIEWBOX,
  M12_ORPHAN_OPACITY,
  m12BoxAsRect,
  m12CompactBoxesFitViewBox,
  m12DesktopBoxesFitViewBox,
  m12FaninCollectBetweenForkAndEval,
  m12ForkInPipe,
  m12LinearSpineMinGap,
  m12PillsOverlap,
  m12SpineCenterYAligned,
  shouldShowM12EdgeLabel,
} from '../m12MultiAgentSchemaLayout';

describe('lmsMultiAgentPolish (Type Etalon W7 full-map + step-focus)', () => {
  it('keeps guided walkthrough at 6 shell steps', () => {
    expect(M10_ORCHESTRATOR_STEP_COUNT).toBe(6);
    expect(M10_ORCHESTRATOR_STEP_NODE_IDS).toHaveLength(6);
    expect(M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP).toHaveLength(6);
    expect(M10_ORCHESTRATOR_FOCUS_BY_STEP).toHaveLength(6);
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

  it('full-map: paints every edge every step; focus ≠ cull', () => {
    for (let step = 0; step < 6; step++) {
      for (const edge of M10_ORCHESTRATOR_EDGES) {
        expect(shouldPaintEdge(step, edge.id)).toBe(true);
      }
    }
    expect(shouldPaintFanout(0)).toBe(true);
    expect(shouldPaintFanin(0)).toBe(true);
    expect(getOrchestratorEdgeEmphasis(0, 'router-orch')).toBe('map');
    expect(getOrchestratorEdgeEmphasis(1, 'router-orch')).toBe('focus');
    expect(getOrchestratorEdgeEmphasis(3, 'eval-output')).toBe('map');
    expect(getOrchestratorEdgeEmphasis(4, 'eval-output')).toBe('map');
    expect(getOrchestratorEdgeEmphasis(5, 'eval-output')).toBe('focus');
    expect(getOrchestratorEdgeOpacity(0, 'eval-output')).toBe(
      ORCHESTRATOR_MAP_EDGE_OPACITY
    );
    expect(getOrchestratorEdgeOpacity(5, 'eval-output')).toBe(1);
    expect(shouldShowRetryLabel(4)).toBe(true);
    expect(getOrchestratorEdgeEmphasis(2, 'eval-retry')).toBe('map');
    expect(getOrchestratorEdgeEmphasis(4, 'eval-retry')).toBe('focus');
  });

  it('full-map: all 10 nodes present; focus live-map without hide', () => {
    const labels = getM10OrchestratorLabels('lt');
    expect(getM10OrchestratorDesktopBoxes(labels)).toHaveLength(10);
    expect(isOrchestratorNodeLive(0, 'input')).toBe(true);
    expect(isOrchestratorNodeLive(0, 'router')).toBe(true);
    expect(isOrchestratorNodeLive(0, 'tools')).toBe(false);
    expect(isOrchestratorNodeLive(0, 'output')).toBe(false);
    expect(isOrchestratorNodeLive(2, 'tools')).toBe(false);
    expect(isOrchestratorNodeLive(3, 'tools')).toBe(true);
    expect(isOrchestratorNodeLive(3, 'output')).toBe(false);
    expect(isOrchestratorNodeLive(5, 'output')).toBe(true);
    expect(ORCHESTRATOR_ORPHAN_OPACITY).toBeLessThan(
      DIAGRAM_TOKENS.opacity.inactive
    );
  });

  it('step 2 shows a single orch assign edge id (not ×3)', () => {
    const step2 = M10_ORCHESTRATOR_EDGE_LABEL_BY_STEP[2];
    const orchAssign = step2.filter((id) => id.startsWith('orch-'));
    expect(orchAssign).toEqual(['orch-summarize']);
  });

  it('builds desktop fan-out with band clear of research drop and off-shaft assign', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const assignVerb = labels.edgeVerbs['orch-summarize'];
    expect(assignVerb).toBe('paskiria agentus');
    const fan = getDesktopFanoutGeometry(boxes, undefined, assignVerb);
    expect(fan).not.toBeNull();
    const research = boxes.research;
    const { w: pillW, h: pillH } = estimateOrchestratorPillSize(assignVerb);
    expect(fan!.busY).toBeLessThanOrEqual(fan!.agentsLane.y + 4);
    expect(M10_ORCHESTRATOR_AGENTS_HEADER_H).toBeGreaterThanOrEqual(34);
    expect(fan!.agentsHeader.y).toBeGreaterThanOrEqual(fan!.agentsLane.y);
    expect(fan!.agentsHeader.y + fan!.agentsHeader.h).toBeLessThan(research.y);
    expect(fan!.agentsBand.y).toBeGreaterThan(fan!.agentsHeader.y);
    expect(fan!.agentsBand.y).toBeLessThan(
      fan!.agentsHeader.y + fan!.agentsHeader.h
    );
    const headerRect = fan!.agentsHeader;
    const busStroke = {
      x1: research.x + research.w / 2,
      y1: fan!.busY,
      x2: boxes.validate.x + boxes.validate.w / 2,
      y2: fan!.busY,
      strokeWidth: DIAGRAM_TOKENS.stroke.inactive,
    };
    expect(pillIntersectsStroke(headerRect, busStroke)).toBe(false);
    expect(fan!.agentsHeader.x).toBeGreaterThanOrEqual(fan!.agentsLane.x);
    // Off-shaft left of trunk (not on-stroke)
    expect(Math.abs(fan!.assignPill.x - fan!.trunkX)).toBeGreaterThanOrEqual(
      pillW / 2 + 8 - 0.01
    );
    expect(fan!.assignPill.x).toBeLessThan(fan!.trunkX);
    expect(fan!.assignPill.y).toBeGreaterThanOrEqual(
      boxes.orchestrator.y + boxes.orchestrator.h + 10
    );
    expect(fan!.busY - (fan!.assignPill.y + pillH / 2)).toBeGreaterThanOrEqual(
      6 - 0.01
    );
    // +20 agents cascade air
    expect(
      research.y - (boxes.orchestrator.y + boxes.orchestrator.h)
    ).toBeGreaterThanOrEqual(72);
  });

  it('builds desktop fan-in collect bus into evaluator (vertical under Tikrintojas)', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const fanin = getDesktopFaninGeometry(boxes);
    expect(fanin).not.toBeNull();
    expect(fanin!.dropPaths).toHaveLength(3);
    expect(fanin!.busY).toBeLessThan(boxes.evaluator.y);
    const validateCx = boxes.validate.x + boxes.validate.w / 2;
    const evalCx = boxes.evaluator.x + boxes.evaluator.w / 2;
    expect(Math.abs(validateCx - evalCx)).toBeLessThan(0.5);
    expect(Math.abs(fanin!.trunkX - validateCx)).toBeLessThan(0.5);
    // Handoff pill above bus, not on Vertintojas
    expect(fanin!.handoffPill.y + 9).toBeLessThanOrEqual(fanin!.busY - 6);
    expect(fanin!.handoffPill.y + 9).toBeLessThan(boxes.evaluator.y);
  });

  it('aligns router↔orch centers (vertical drop, no hypotenuse)', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const routerCx = boxes.router.x + boxes.router.w / 2;
    const orchCx = boxes.orchestrator.x + boxes.orchestrator.w / 2;
    expect(Math.abs(routerCx - orchCx)).toBeLessThan(0.5);
  });

  it('keeps parenka and skaito pills from overlapping on step 2', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const parenka = labels.edgeVerbs['router-orch'];
    const skaito = labels.edgeVerbs['state-orch'];
    const { w: pw, h: ph } = estimateOrchestratorPillSize(parenka);
    const { w: sw, h: sh } = estimateOrchestratorPillSize(skaito);
    const p = getOrchestratorEdgeLabelAnchor(
      boxes.router,
      boxes.orchestrator,
      'bottom',
      'top',
      undefined,
      parenka,
      'router-orch'
    );
    const s = getOrchestratorEdgeLabelAnchor(
      boxes.state,
      boxes.orchestrator,
      'left',
      'right',
      undefined,
      skaito,
      'state-orch'
    );
    // parenka LEFT of shaft; skaito in state pocket (right of orch)
    expect(p.x).toBeLessThan(p.midX);
    expect(s.x).toBeGreaterThan(boxes.orchestrator.x + boxes.orchestrator.w);
    const pRect = { x: p.x - pw / 2, y: p.y - ph / 2, w: pw, h: ph };
    const sRect = { x: s.x - sw / 2, y: s.y - sh / 2, w: sw, h: sh };
    const intersects =
      pRect.x < sRect.x + sRect.w &&
      pRect.x + pRect.w > sRect.x &&
      pRect.y < sRect.y + sRect.h &&
      pRect.y + pRect.h > sRect.y;
    expect(intersects).toBe(false);
  });

  it('aligns state↔orch and eval↔output; centered desktop; viewBox air', () => {
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
    expect(M10_ORCHESTRATOR_VIEWBOX.desktop.height).toBeGreaterThanOrEqual(490);
    expect(boxes.research.h).toBeGreaterThanOrEqual(58);
    expect(boxes.input.y).toBeGreaterThanOrEqual(62);
    expect(boxes.input.x).toBe(28 + M10_ORCHESTRATOR_DESKTOP_X_OFFSET);
    const maxRight = Math.max(...Object.values(boxes).map((b) => b.x + b.w));
    const minLeft = Math.min(...Object.values(boxes).map((b) => b.x));
    const padL = minLeft;
    const padR = M10_ORCHESTRATOR_VIEWBOX.desktop.width - maxRight;
    expect(Math.abs(padL - padR)).toBeLessThanOrEqual(8);
    // HITL note under output stays inside viewBox
    expect(boxes.output.y + boxes.output.h + 16).toBeLessThanOrEqual(
      M10_ORCHESTRATOR_VIEWBOX.desktop.height
    );
  });

  it('uses orthogonal validate→eval path (no hypotenuse)', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const d = getValidateEvalOrthogonalPath(boxes.validate, boxes.evaluator);
    expect(d.startsWith('M ')).toBe(true);
    // Aligned centers → single vertical segment (no mid bus jog)
    expect(d.includes(' L ')).toBe(true);
    const parts = d.split(' ');
    // Vertical-only when aligned: M cx y1 L cx y2 → 6 tokens
    expect(parts.length).toBeLessThanOrEqual(6);
  });

  it('keeps top-row nukreipia caption-air and gap fit (pill ≤ gap)', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const verb = labels.edgeVerbs['input-router'];
    expect(verb).toBe('nukreipia');
    const { h: pillH, w: pillW } = estimateOrchestratorPillSize(verb);
    const gap = boxes.router.x - (boxes.input.x + boxes.input.w);
    expect(gap).toBeGreaterThanOrEqual(pillW + 16 - 0.01);
    const anchor = getOrchestratorEdgeLabelAnchor(
      boxes.input,
      boxes.router,
      'right',
      'left',
      undefined,
      verb
    );
    const labelTop = anchor.y - pillH / 2;
    const titleBottomApprox =
      M10_ORCHESTRATOR_TITLE_Y_DESKTOP +
      DIAGRAM_TOKENS.typography.title.compact * 0.35;
    expect(labelTop - titleBottomApprox).toBeGreaterThanOrEqual(18);
  });

  it('uses local orphan opacity below LMS inactive (not global token change)', () => {
    expect(ORCHESTRATOR_ORPHAN_OPACITY).toBeGreaterThanOrEqual(0.5);
    expect(ORCHESTRATOR_ORPHAN_OPACITY).toBeLessThan(
      DIAGRAM_TOKENS.opacity.inactive
    );
    expect(DIAGRAM_TOKENS.opacity.inactive).toBeGreaterThanOrEqual(0.85);
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
      verb,
      'input-router'
    );
    // Top row: above shaft mid (title caption air)
    expect(horiz.midY - horiz.y).toBeGreaterThanOrEqual(pillH / 2 + 8 - 0.01);
    const approve = labels.edgeVerbs['eval-output'];
    const { h: approveH } = estimateOrchestratorPillSize(approve);
    const evalOut = getOrchestratorEdgeLabelAnchor(
      boxes.evaluator,
      boxes.output,
      'right',
      'left',
      undefined,
      approve,
      'eval-output'
    );
    // Bottom row: above both boxes
    expect(evalOut.y).toBe(
      Math.min(boxes.evaluator.y, boxes.output.y) - (approveH / 2 + 8)
    );
    const vert = getOrchestratorEdgeLabelAnchor(
      boxes.router,
      boxes.orchestrator,
      'bottom',
      'top',
      undefined,
      verb,
      'router-orch'
    );
    // Forced LEFT of shaft (not right-into-State)
    expect(vert.x).toBeLessThan(vert.midX);
    expect(vert.midX - vert.x).toBeGreaterThanOrEqual(pillW / 2 + 14 - 0.01);
    const calls = 'kviečia';
    const { w: callW, h: callH } = estimateOrchestratorPillSize(calls);
    const bumped = getOrchestratorEdgeLabelAnchor(
      boxes.research,
      boxes.tools,
      'bottom',
      'top',
      undefined,
      calls,
      'research-tools'
    );
    const researchCx = boxes.research.x + boxes.research.w / 2;
    const toolsCyTop = boxes.tools.y;
    const researchBottom = boxes.research.y + boxes.research.h;
    expect(
      pillIntersectsStroke(
        pillRectFromCenter(bumped.x, bumped.y, callW, callH),
        {
          x1: researchCx,
          y1: researchBottom,
          x2: researchCx,
          y2: toolsCyTop,
          strokeWidth: M10_ORCHESTRATOR_STROKE_DATA,
        }
      )
    ).toBe(false);
  });

  it('keeps eval-output / fan-in / retry pills clear of node boxes', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const allBoxes = Object.values(boxes);

    const pillRect = (cx: number, cy: number, label: string) => {
      const { w, h } = estimateOrchestratorPillSize(label);
      return {
        x: cx - w / 2,
        y: cy - h / 2,
        w,
        h,
      };
    };
    const intersects = (
      a: { x: number; y: number; w: number; h: number },
      b: { x: number; y: number; w: number; h: number }
    ) =>
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

    const approve = labels.edgeVerbs['eval-output'];
    const approvePt = getOrchestratorEdgeLabelAnchor(
      boxes.evaluator,
      boxes.output,
      'right',
      'left',
      undefined,
      approve,
      'eval-output'
    );
    const approvePill = pillRect(approvePt.x, approvePt.y, approve);
    for (const box of allBoxes) {
      expect(intersects(approvePill, box)).toBe(false);
    }

    const handoff = labels.edgeVerbs['validate-eval'];
    const fanin = getDesktopFaninGeometry(boxes)!;
    const handoffPill = pillRect(
      fanin.handoffPill.x,
      fanin.handoffPill.y,
      handoff
    );
    expect(fanin.handoffPill.y + handoffPill.h / 2).toBeLessThanOrEqual(
      fanin.busY - 6
    );
    for (const box of allBoxes) {
      expect(intersects(handoffPill, box)).toBe(false);
    }

    const routeX = getOrchestratorRetryRouteXDesktop(
      boxes.tools,
      boxes.evaluator
    );
    const retryPt = getOrchestratorRetryLabelAnchor(
      boxes.evaluator,
      boxes.orchestrator,
      routeX,
      labels.retryLabel
    );
    const retryPill = pillRect(retryPt.x, retryPt.y, labels.retryLabel);
    expect(retryPill.x + retryPill.w).toBeLessThanOrEqual(boxes.evaluator.x);
    for (const box of allBoxes) {
      expect(intersects(retryPill, box)).toBe(false);
    }
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
    const pt = getOrchestratorRetryLabelAnchor(
      boxes.evaluator,
      boxes.orchestrator,
      routeX,
      label
    );
    // Above horizontal U leg, in gutter left of evaluator
    expect(pt.x).toBeLessThan(boxes.evaluator.x);
    expect(pt.x).toBeGreaterThan(routeX);
    expect(pt.y).toBeLessThan(boxes.evaluator.y + boxes.evaluator.h / 2);
    expect(pt.y).toBeGreaterThan(boxes.summarize.y + boxes.summarize.h);
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

  it('shows retry label only on steps 4–5 (path always on, dim→focus)', () => {
    expect(shouldShowRetryLabel(0)).toBe(false);
    expect(shouldShowRetryLabel(3)).toBe(false);
    expect(shouldShowRetryLabel(4)).toBe(true);
    expect(shouldShowRetryLabel(5)).toBe(true);
    expect(shouldPaintEdge(0, 'eval-retry')).toBe(true);
  });

  it('uses orthogonal retry U (3+ L segments, not diagonal)', () => {
    const labels = getM10OrchestratorLabels('lt');
    const boxes = getBoxMap(getM10OrchestratorDesktopBoxes(labels));
    const routeX = getOrchestratorRetryRouteXDesktop(
      boxes.tools,
      boxes.evaluator
    );
    const d = getOrchestratorRetryPathDesktop(
      boxes.evaluator,
      boxes.orchestrator,
      routeX
    );
    const lCount = (d.match(/ L /g) ?? []).length;
    expect(lCount).toBeGreaterThanOrEqual(3);
    // Horizontal then vertical then horizontal — shared X on vertical shaft
    expect(d).toMatch(new RegExp(`L ${routeX} [\\d.]+ L ${routeX} [\\d.]+ L`));
    expect(
      retryTipOutsideHub(boxes.evaluator, boxes.orchestrator, routeX)
    ).toBe(true);
  });

  it('provides LT/EN Kartoti/Retry, roles Tyrėjas/Rašytojas/Tikrintojas', () => {
    const lt = getM10OrchestratorLabels('lt');
    const en = getM10OrchestratorLabels('en');
    expect(lt.retryLabel).toBe('Kartoti');
    expect(en.retryLabel).toBe('Retry');
    expect(lt.edgeVerbs['eval-retry']).toBe('Kartoti');
    expect(en.edgeVerbs['eval-retry']).toBe('Retry');
    expect(lt.edgeVerbs['state-orch']).toBe('skaito / įrašo');
    expect(lt.nodes.router[0]).toBe('Maršrutizatorius');
    expect(lt.nodes.research[0]).toBe('Tyrėjas');
    expect(lt.nodes.summarize[0]).toBe('Rašytojas');
    expect(lt.nodes.validate[0]).toBe('Tikrintojas');
    expect(en.nodes.research[0]).toBe('Researcher');
    expect(en.nodes.summarize[0]).toBe('Writer');
    expect(en.nodes.validate[0]).toBe('Checker');
    expect(lt.nodes.state[1]).toBe('atmintis / changelog');
    expect(en.nodes.state[1]).toBe('memory / changelog');
    expect(lt.agentsBand).not.toBe(lt.agentsBand.toUpperCase());
    expect(shouldShowEdgeLabel(2, 'orch-summarize')).toBe(true);
  });
});

describe('m12 multi-agent brother (W7 layout polish)', () => {
  it('keeps 6 shell steps and LMS tip floors', () => {
    expect(M12_MULTI_AGENT_STEP_COUNT).toBe(6);
    expect(M12_MULTI_AGENT_STEP_NODE_IDS).toHaveLength(6);
    expect(M12_MULTI_AGENT_MARKER_LEN).toBeGreaterThanOrEqual(10);
    expect(M12_ORPHAN_OPACITY).toBeGreaterThanOrEqual(0.5);
    expect(M12_ORPHAN_OPACITY).toBeLessThan(DIAGRAM_TOKENS.opacity.inactive);
  });

  it('keeps desktop fork-in-pipe floors inside max-w-5xl', () => {
    expect(M12_MULTI_AGENT_VIEWBOX.desktop.width).toBeLessThanOrEqual(1024);
    expect(M12_MULTI_AGENT_VIEWBOX.desktop.height).toBe(400);
    expect(M12_MULTI_AGENT_BOX_H).toBeGreaterThanOrEqual(68);
    expect(M12_MIN_BOX_W).toBeGreaterThanOrEqual(124);
    const labels = getM12MultiAgentSchemaLabels('lt');
    const list = getM12MultiAgentDesktopBoxes(labels);
    const boxes = getM12BoxMap(list);
    expect(m12DesktopBoxesFitViewBox(list)).toBe(true);
    expect(m12SpineCenterYAligned(boxes)).toBe(true);
    expect(m12ForkInPipe(boxes)).toBe(true);
    expect(m12LinearSpineMinGap(boxes, M12_LINEAR_GAP_MIN)).toBe(true);
    list.forEach((box) => {
      expect(box.w).toBeGreaterThanOrEqual(M12_MIN_BOX_W);
      expect(box.h).toBeGreaterThanOrEqual(68);
    });
  });

  it('keeps A/B in one fork column and fan-in collect between A and Eval', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const boxes = getM12BoxMap(getM12MultiAgentDesktopBoxes(labels));
    const fanin = getM12FaninGeometry(
      boxes,
      undefined,
      labels.edgeVerbs.handsOff
    );
    expect(fanin).not.toBeNull();
    expect(m12ForkInPipe(boxes)).toBe(true);
    expect(m12FaninCollectBetweenForkAndEval(fanin!, boxes)).toBe(true);
    expect(fanin!.collectX).toBeGreaterThan(
      boxes.specialistA.x + boxes.specialistA.w
    );
    expect(fanin!.collectX).toBeLessThan(boxes.evaluator.x);
    const specA = M12_MULTI_AGENT_EDGES_DESKTOP.find(
      (e) => e.id === 'specialistA-evaluator'
    );
    const specB = M12_MULTI_AGENT_EDGES_DESKTOP.find(
      (e) => e.id === 'specialistB-evaluator'
    );
    expect(specA?.fromAnchor).toBe('right');
    expect(specA?.toAnchor).toBe('left');
    expect(specB?.fromAnchor).toBe('right');
    expect(specB?.toAnchor).toBe('left');
  });

  it('aligns spine cy and builds orthogonal fan-out / fan-in', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const boxes = getM12BoxMap(getM12MultiAgentDesktopBoxes(labels));
    expect(m12SpineCenterYAligned(boxes)).toBe(true);
    const fanout = getM12FanoutGeometry(
      boxes,
      undefined,
      labels.edgeVerbs.assigns
    );
    const fanin = getM12FaninGeometry(
      boxes,
      undefined,
      labels.edgeVerbs.handsOff
    );
    expect(fanout).not.toBeNull();
    expect(fanin).not.toBeNull();
    expect(fanout!.trunkPath).toMatch(/^M /);
    expect(fanout!.dropA).toMatch(/^M /);
    expect(fanin!.trunkPath).toMatch(/^M /);
    expect(
      Math.abs(fanout!.assignPill.x - fanout!.busX)
    ).toBeGreaterThanOrEqual(20);
    expect(fanout!.assignPill.x).toBeLessThan(fanout!.busX);
    expect(fanin!.handoffPill.x).toBeGreaterThan(fanin!.collectX);
  });

  it('stages one verb per pocket and keeps LT/EN verbs (not noun-echo)', () => {
    const lt = getM12MultiAgentSchemaLabels('lt');
    const en = getM12MultiAgentSchemaLabels('en');
    expect(lt.edgeVerbs.assigns).toBe('paskiria');
    expect(en.edgeVerbs.assigns).toBe('assigns');
    expect(lt.edgeVerbs.returns).toBe('grąžina');
    expect(en.edgeVerbs.handsOff).toBe('hands off');
    expect(shouldShowM12EdgeLabel('coord-assign', 0)).toBe(false);
    expect(shouldShowM12EdgeLabel('coord-assign', 2)).toBe(true);
    expect(shouldShowM12EdgeLabel('spec-handoff', 2)).toBe(false);
    expect(shouldShowM12EdgeLabel('evaluator-coordinator', 2)).toBe(false);
    expect(shouldShowM12EdgeLabel('coord-assign', 3)).toBe(false);
    expect(shouldShowM12EdgeLabel('spec-handoff', 3)).toBe(true);
    expect(shouldShowM12EdgeLabel('evaluator-coordinator', 4)).toBe(true);
  });

  it('keeps desktop verb pills off strokes, boxes, and each other', () => {
    for (const locale of ['lt', 'en'] as const) {
      const labels = getM12MultiAgentSchemaLabels(locale);
      const list = getM12MultiAgentDesktopBoxes(labels);
      const boxes = getM12BoxMap(list);
      const pills = getM12DesktopVerbPills(boxes, labels);
      expect(pills).toHaveLength(6);
      const bandY = getM12SpineVerbY(boxes, false);
      const spinePills = pills.filter((p) =>
        ['routes', 'selects', 'approves'].includes(p.key)
      );
      spinePills.forEach((p) => {
        expect(p.rect.y + p.rect.h).toBeLessThanOrEqual(boxes.input.y - 8);
        expect(p.rect.y + p.rect.h / 2).toBeCloseTo(bandY, 5);
      });
      const strokes = [
        ...getM12DesktopSpineStrokes(boxes),
        ...getM12DesktopFanStrokes(boxes, labels),
      ];
      const flowW = DIAGRAM_TOKENS.stroke.flow;
      pills.forEach((pill) => {
        strokes.forEach((stroke) => {
          expect(
            pillIntersectsStroke(pill.rect, { ...stroke, strokeWidth: flowW }),
            `${locale} ${pill.key}∩${stroke.id}`
          ).toBe(false);
        });
        list.forEach((box) => {
          expect(
            rectsAabbIntersect(pill.rect, m12BoxAsRect(box)),
            `${locale} ${pill.key}∩${box.id}`
          ).toBe(false);
        });
      });
      for (let i = 0; i < pills.length; i++) {
        for (let j = i + 1; j < pills.length; j++) {
          expect(
            m12PillsOverlap(pills[i].rect, pills[j].rect),
            `${locale} ${pills[i].key}∩${pills[j].key}`
          ).toBe(false);
        }
      }
    }
  });

  it('routes feedback under specialist B with a label below the trough', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const boxes = getM12BoxMap(getM12MultiAgentDesktopBoxes(labels));
    const fb = getM12FeedbackLabelPos(boxes, false);
    const troughY = getM12FeedbackTroughYDesktop(boxes);
    expect(troughY).toBeGreaterThanOrEqual(
      boxes.specialistB.y + boxes.specialistB.h + 8
    );
    expect(fb.y).toBeGreaterThan(troughY);
  });

  it('fits compact boxes in the compact viewBox', () => {
    const labels = getM12MultiAgentSchemaLabels('lt');
    const list = getM12MultiAgentCompactBoxes(labels);
    expect(m12CompactBoxesFitViewBox(list)).toBe(true);
    expect(M12_MULTI_AGENT_VIEWBOX.compact.width).toBe(420);
  });

  it('full-map: orphan dim + live edge emphasis helpers', () => {
    expect(getM12NodeOpacity('output', 0, true)).toBe(M12_ORPHAN_OPACITY);
    expect(getM12NodeOpacity('input', 0, true)).toBe(1);
    expect(getM12EdgeOpacity('input-router', 0)).toBe(
      DIAGRAM_TOKENS.opacity.active
    );
    expect(getM12EdgeOpacity('evaluator-output', 0)).toBe(M12_MAP_EDGE_OPACITY);
  });
});
