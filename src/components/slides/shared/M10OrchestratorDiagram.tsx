/**
 * M10 10.482 – Agentų orkestravimo simuliacija (view).
 * Geometry SOT: m10OrchestratorLayout.ts · W7 full-map + step-focus
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import {
  DIAGRAM_AMBER_INK_SOFT,
  DIAGRAM_ROLE_COLORS,
  DIAGRAM_TONE_COLORS,
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
} from './diagramTokens';
import {
  getM10OrchestratorLabels,
  type M10OrchestratorLocale,
} from './m10OrchestratorContent';
import {
  estimateOrchestratorPillSize,
  getAnchorPoint,
  getBoxMap,
  getDesktopFaninGeometry,
  getDesktopFanoutGeometry,
  getLineEndPoint,
  getM10OrchestratorCompactBoxes,
  getM10OrchestratorDesktopBoxes,
  getOrchestratorEdgeLabelAnchor,
  getOrchestratorRetryLabelAnchor,
  getValidateEvalOrthogonalPath,
  getRetryPathCompact,
  getRetryPathDesktop,
  getOrchestratorEdgeOpacity,
  isOrchestratorFaninFocus,
  isOrchestratorFanoutFocus,
  isOrchestratorNodeLive,
  M10_ORCHESTRATOR_ARROW_TIP,
  M10_ORCHESTRATOR_EDGES,
  M10_ORCHESTRATOR_FANIN_EDGE_ID,
  M10_ORCHESTRATOR_FANIN_ERROR_STROKE,
  M10_ORCHESTRATOR_FANOUT_EDGE_IDS,
  M10_ORCHESTRATOR_STEP_NODE_IDS,
  M10_ORCHESTRATOR_STROKE_DATA,
  M10_ORCHESTRATOR_VIEWBOX,
  ORCHESTRATOR_MAP_EDGE_OPACITY,
  ORCHESTRATOR_ORPHAN_OPACITY,
  shouldShowEdgeLabel,
  shouldShowRetryLabel,
  type M10OrchestratorBox,
  type M10OrchestratorEdge,
  type M10OrchestratorNodeId,
  type M10OrchestratorTone,
} from './m10OrchestratorLayout';
import {
  getOrchestratorRetryRouteXDesktop,
  ORCHESTRATOR_RETRY_ROUTE_X_COMPACT,
} from './orchestratorRetryPath';

const VIOLET = DIAGRAM_ROLE_COLORS.violet;
const TEAL = DIAGRAM_ROLE_COLORS.teal;
const AMBER_SOFT = DIAGRAM_ROLE_COLORS.amberSoft;
const ROSE = DIAGRAM_ROLE_COLORS.rose;
const SLATE = DIAGRAM_ROLE_COLORS.slate;
/** Softer memory fill (not orch-level weight). */
const BRAND_SOFT = DIAGRAM_TOKENS.colors.brandTop;
const ACTIVE_STROKE = getDiagramActiveStroke();
const AMBER_INK = DIAGRAM_AMBER_INK_SOFT;
const TIP = M10_ORCHESTRATOR_ARROW_TIP;
const TIP_H = TIP * 0.9;

const FANOUT_SET = new Set<string>(M10_ORCHESTRATOR_FANOUT_EDGE_IDS);

function toneFill(tone: M10OrchestratorTone): string {
  if (tone === 'violet') return VIOLET;
  if (tone === 'teal') return TEAL;
  if (tone === 'amber') return AMBER_SOFT;
  if (tone === 'rose') return ROSE;
  if (tone === 'brand') return BRAND_SOFT;
  return SLATE;
}

/** Light annotation (not a clickable pill/button). */
function EdgeAnnotation({
  x,
  y,
  label,
  fill,
  textFill,
  fillOpacity = 0.92,
}: {
  x: number;
  y: number;
  label: string;
  fill: string;
  textFill: string;
  fillOpacity?: number;
}) {
  const { w, h } = estimateOrchestratorPillSize(label);
  return (
    <g aria-hidden>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={4}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke="none"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fill={textFill}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {label}
      </text>
    </g>
  );
}

function NodeBox({
  box,
  active,
  dimOpacity,
  errorState,
  softActive,
  successTone,
  stroke,
  onActivate,
}: {
  box: M10OrchestratorBox;
  active: boolean;
  /** 1 = full; step-4 !active uses LMS inactive floor. */
  dimOpacity: number;
  /** Rose stroke + badge; keep role-band fill (not solid rose block). */
  errorState?: boolean;
  softActive?: boolean;
  /** Step-5 approved output — local emerald, not global color OS. */
  successTone?: boolean;
  stroke: string;
  onActivate?: () => void;
}) {
  const fill = successTone
    ? DIAGRAM_TONE_COLORS.emerald.bottom
    : toneFill(box.tone);
  const useAmberInk = box.tone === 'amber' && !successTone;
  const titleFill = useAmberInk ? AMBER_INK : '#ffffff';
  const subFill = useAmberInk
    ? 'rgba(113,63,18,0.88)'
    : 'rgba(255,255,255,0.88)';

  let strokeColor = stroke;
  let strokeWidth = box.tone === 'brand' ? 1 : 1.5;
  if (errorState) {
    strokeColor = ROSE;
    strokeWidth = DIAGRAM_TOKENS.stroke.active;
  } else if (active) {
    if (softActive) {
      strokeColor = stroke;
      strokeWidth = DIAGRAM_TOKENS.stroke.active;
    } else {
      strokeColor = ACTIVE_STROKE;
      strokeWidth = DIAGRAM_TOKENS.stroke.active;
    }
  }

  const titleY = box.y + box.h * 0.38;
  const subY = box.y + box.h - 12;

  return (
    <g opacity={dimOpacity}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <text
        x={box.x + box.w / 2}
        y={titleY}
        textAnchor="middle"
        fill={titleFill}
        fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[0]}
      </text>
      <text
        x={box.x + box.w / 2}
        y={subY}
        textAnchor="middle"
        fill={subFill}
        fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
        fontWeight="500"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[1]}
      </text>
      {errorState ? (
        <g aria-hidden>
          <circle cx={box.x + box.w - 10} cy={box.y + 10} r={7} fill={ROSE} />
          <text
            x={box.x + box.w - 10}
            y={box.y + 13.5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
            fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
            fontFamily={DIAGRAM_TOKENS.font}
          >
            !
          </text>
        </g>
      ) : null}
      {onActivate ? (
        <DiagramStepHitArea
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          radius={DIAGRAM_TOKENS.radius.box}
          onActivate={onActivate}
        />
      ) : null}
    </g>
  );
}

function FlowEdge({
  edge,
  boxes,
  markerId,
  markerStartId,
  color,
  dashed,
  strokeWidth = DIAGRAM_TOKENS.stroke.flow,
  opacity = 1,
}: {
  edge: M10OrchestratorEdge;
  boxes: Record<M10OrchestratorNodeId, M10OrchestratorBox>;
  markerId?: string;
  markerStartId?: string;
  color: string;
  dashed?: boolean;
  strokeWidth?: number;
  opacity?: number;
}) {
  const from = boxes[edge.from];
  const to = boxes[edge.to];
  if (!from || !to) return null;
  const start = getAnchorPoint(from, edge.fromAnchor ?? 'bottom');
  const endRaw = getAnchorPoint(to, edge.toAnchor ?? 'top');
  const end = getLineEndPoint(start, endRaw, TIP);
  const startAdj = markerStartId ? getLineEndPoint(endRaw, start, TIP) : start;
  return (
    <line
      x1={startAdj.x}
      y1={startAdj.y}
      x2={end.x}
      y2={end.y}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashed ? '5 4' : undefined}
      opacity={opacity}
      markerStart={markerStartId ? `url(#${markerStartId})` : undefined}
      markerEnd={markerId ? `url(#${markerId})` : undefined}
    />
  );
}

function ArrowMarker({
  id,
  fill,
  orient = 'auto',
}: {
  id: string;
  fill: string;
  orient?: 'auto' | 'auto-start-reverse';
}) {
  return (
    <marker
      id={id}
      markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
      markerWidth={TIP}
      markerHeight={TIP_H}
      refX={0}
      refY={TIP_H / 2}
      orient={orient}
    >
      <path d={`M0 0 L${TIP} ${TIP_H / 2} L0 ${TIP_H} Z`} fill={fill} />
    </marker>
  );
}

export default function M10OrchestratorDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10OrchestratorLocale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const L = getM10OrchestratorLabels(locale);
  const boxesList = isCompactDiagram
    ? getM10OrchestratorCompactBoxes(L)
    : getM10OrchestratorDesktopBoxes(L);
  const boxes = getBoxMap(boxesList);
  const vb = isCompactDiagram
    ? M10_ORCHESTRATOR_VIEWBOX.compact
    : M10_ORCHESTRATOR_VIEWBOX.desktop;

  const flowMarker = `m10-orch-flow-${uid}`;
  const dataMarker = `m10-orch-data-${uid}`;
  const dataMarkerStart = `m10-orch-data-start-${uid}`;
  const retryMarker = `m10-orch-retry-${uid}`;
  const roseMarker = `m10-orch-rose-${uid}`;

  const activeNodeIds =
    M10_ORCHESTRATOR_STEP_NODE_IDS[currentStep] ??
    M10_ORCHESTRATOR_STEP_NODE_IDS[0];
  const isErrorStep = currentStep === 4;
  const isRetryStep = shouldShowRetryLabel(currentStep);
  const showDesktopFanout = !isCompactDiagram;
  const showDesktopFanin = !isCompactDiagram;
  const fanoutOpacity = isOrchestratorFanoutFocus(currentStep)
    ? 1
    : ORCHESTRATOR_MAP_EDGE_OPACITY;
  const faninFocus = isOrchestratorFaninFocus(currentStep);
  const assignVerb =
    L.edgeVerbs['orch-summarize'] ?? L.edgeVerbs['orch-research'] ?? '';
  const fanout = showDesktopFanout
    ? getDesktopFanoutGeometry(boxes, undefined, assignVerb)
    : null;
  const fanin = showDesktopFanin ? getDesktopFaninGeometry(boxes) : null;
  const routeX =
    isCompactDiagram || !boxes.tools || !boxes.evaluator
      ? ORCHESTRATOR_RETRY_ROUTE_X_COMPACT
      : getOrchestratorRetryRouteXDesktop(boxes.tools, boxes.evaluator);

  const stepForNode = (id: M10OrchestratorNodeId) =>
    M10_ORCHESTRATOR_STEP_NODE_IDS.findIndex((nodes) => nodes.includes(id));

  const nodeProps = (box: M10OrchestratorBox) => {
    const stepIndex = stepForNode(box.id);
    const active = activeNodeIds.includes(box.id);
    let dimOpacity = 1;
    if (!active) {
      dimOpacity = isErrorStep
        ? DIAGRAM_TOKENS.opacity.inactive
        : ORCHESTRATOR_ORPHAN_OPACITY;
    }
    return {
      active,
      softActive: active && box.id === 'state' && !isErrorStep,
      dimOpacity,
      errorState: isErrorStep && box.id === 'validate',
      successTone:
        box.id === 'output' &&
        currentStep === 5 &&
        isOrchestratorNodeLive(currentStep, 'output'),
      stroke: palette.brandDark,
      onActivate:
        onStepClick && stepIndex >= 0
          ? () => onStepClick(stepIndex)
          : undefined,
    };
  };

  const flowColor = palette.flow;
  const bgGradId = `m10-orch-bg-${uid}`;
  const annFill = palette.bgEnd;
  const annText = palette.brandDark;
  const faninStroke = isErrorStep ? ROSE : flowColor;
  const faninWidth = isErrorStep
    ? M10_ORCHESTRATOR_FANIN_ERROR_STROKE
    : DIAGRAM_TOKENS.stroke.flow;
  const faninOpacity = isErrorStep
    ? 0.75
    : faninFocus
      ? 1
      : ORCHESTRATOR_MAP_EDGE_OPACITY;
  const retryPathOpacity = isRetryStep ? 1 : ORCHESTRATOR_MAP_EDGE_OPACITY;

  const retryLabelPoint =
    isRetryStep && boxes.evaluator && boxes.orchestrator
      ? getOrchestratorRetryLabelAnchor(
          boxes.evaluator,
          boxes.orchestrator,
          routeX,
          L.retryLabel
        )
      : null;

  const retryPathD =
    boxes.evaluator && boxes.orchestrator
      ? isCompactDiagram
        ? getRetryPathCompact(boxes.evaluator, boxes.orchestrator, routeX)
        : getRetryPathDesktop(boxes.evaluator, boxes.orchestrator, routeX)
      : null;

  return (
    <svg
      viewBox={`0 0 ${vb.width} ${vb.height}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient id={bgGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <ArrowMarker id={flowMarker} fill={flowColor} />
        <ArrowMarker id={dataMarker} fill={flowColor} />
        <ArrowMarker
          id={dataMarkerStart}
          fill={flowColor}
          orient="auto-start-reverse"
        />
        <ArrowMarker id={retryMarker} fill={DIAGRAM_ROLE_COLORS.amber} />
        <ArrowMarker id={roseMarker} fill={ROSE} />
      </defs>
      <rect
        x="0"
        y="0"
        width={vb.width}
        height={vb.height}
        rx="12"
        fill={`url(#${bgGradId})`}
      />

      <text
        x={vb.width / 2}
        y={isCompactDiagram ? 18 : 28}
        textAnchor="middle"
        fill={palette.brandDark}
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      {/* Soft agents lane with header (desktop) — always on */}
      {fanout ? (
        <rect
          x={fanout.agentsLane.x}
          y={fanout.agentsLane.y}
          width={fanout.agentsLane.w}
          height={fanout.agentsLane.h}
          rx={10}
          fill={palette.bgStart}
          opacity={0.65}
          stroke={palette.border}
          strokeWidth={1}
        />
      ) : null}

      {fanout ? (
        <text
          x={fanout.agentsBand.x}
          y={fanout.agentsBand.y}
          textAnchor="start"
          fill={palette.muted}
          fontSize={DIAGRAM_TOKENS.typography.subtitle.desktop}
          fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.agentsBand}
        </text>
      ) : null}

      {/* Non-fanout / non-fanin edges — always on, focus/map opacity */}
      {M10_ORCHESTRATOR_EDGES.filter((e) => {
        if (e.kind === 'retry') return false;
        if (FANOUT_SET.has(e.id)) return false;
        if (!isCompactDiagram && e.id === M10_ORCHESTRATOR_FANIN_EDGE_ID) {
          return false;
        }
        return true;
      }).map((edge) => {
        const isData = edge.kind === 'state' || edge.kind === 'tools';
        const isState = edge.kind === 'state';
        return (
          <FlowEdge
            key={edge.id}
            edge={edge}
            boxes={boxes}
            markerId={isData ? dataMarker : flowMarker}
            markerStartId={isState ? dataMarkerStart : undefined}
            color={flowColor}
            dashed={isData}
            strokeWidth={
              isData ? M10_ORCHESTRATOR_STROKE_DATA : DIAGRAM_TOKENS.stroke.flow
            }
            opacity={getOrchestratorEdgeOpacity(currentStep, edge.id)}
          />
        );
      })}

      {/* Compact fan-out: individual lines always on */}
      {isCompactDiagram
        ? M10_ORCHESTRATOR_EDGES.filter((e) => FANOUT_SET.has(e.id)).map(
            (edge) => (
              <FlowEdge
                key={edge.id}
                edge={edge}
                boxes={boxes}
                markerId={flowMarker}
                color={flowColor}
                opacity={getOrchestratorEdgeOpacity(currentStep, edge.id)}
              />
            )
          )
        : null}

      {/* Compact validate→eval: orthogonal elbow (never hypotenuse) */}
      {isCompactDiagram && boxes.validate && boxes.evaluator ? (
        <path
          d={getValidateEvalOrthogonalPath(boxes.validate, boxes.evaluator)}
          fill="none"
          stroke={isErrorStep ? ROSE : flowColor}
          strokeWidth={
            isErrorStep
              ? M10_ORCHESTRATOR_FANIN_ERROR_STROKE
              : DIAGRAM_TOKENS.stroke.flow
          }
          strokeLinecap="round"
          opacity={getOrchestratorEdgeOpacity(
            currentStep,
            M10_ORCHESTRATOR_FANIN_EDGE_ID
          )}
          markerEnd={`url(#${isErrorStep ? roseMarker : flowMarker})`}
        />
      ) : null}

      {/* Desktop orthogonal fan-out — always on */}
      {fanout ? (
        <g opacity={fanoutOpacity}>
          <path
            d={fanout.trunkPath}
            fill="none"
            stroke={flowColor}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            strokeLinecap="round"
          />
          <path
            d={fanout.busPath}
            fill="none"
            stroke={flowColor}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            strokeLinecap="round"
          />
          {fanout.dropPaths.map((drop) => (
            <path
              key={drop.id}
              d={drop.d}
              fill="none"
              stroke={flowColor}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              strokeLinecap="round"
              markerEnd={`url(#${flowMarker})`}
            />
          ))}
        </g>
      ) : null}

      {/* Desktop orthogonal fan-in (agents → evaluator) — always on */}
      {fanin ? (
        <g opacity={faninOpacity}>
          {fanin.dropPaths.map((drop) => (
            <path
              key={`fi-${drop.id}`}
              d={drop.d}
              fill="none"
              stroke={faninStroke}
              strokeWidth={faninWidth}
              strokeLinecap="round"
            />
          ))}
          <path
            d={fanin.busPath}
            fill="none"
            stroke={faninStroke}
            strokeWidth={faninWidth}
            strokeLinecap="round"
          />
          <path
            d={fanin.trunkPath}
            fill="none"
            stroke={faninStroke}
            strokeWidth={faninWidth}
            strokeLinecap="round"
            markerEnd={`url(#${isErrorStep ? roseMarker : flowMarker})`}
          />
        </g>
      ) : null}

      {/* Retry left-U — always on (orthogonal); label only steps 4–5 */}
      {retryPathD ? (
        <path
          d={retryPathD}
          fill="none"
          stroke={DIAGRAM_ROLE_COLORS.amber}
          strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
          strokeLinecap="round"
          strokeDasharray="5 4"
          opacity={retryPathOpacity}
          markerEnd={`url(#${retryMarker})`}
        />
      ) : null}

      {boxesList.map((box) => (
        <NodeBox key={box.id} box={box} {...nodeProps(box)} />
      ))}

      {/* Edge / retry labels after boxes — staged verbs only */}
      {M10_ORCHESTRATOR_EDGES.filter((e) => e.kind !== 'retry').map((edge) => {
        if (!shouldShowEdgeLabel(currentStep, edge.id)) return null;
        const verb = L.edgeVerbs[edge.id];
        if (!verb) return null;

        if (FANOUT_SET.has(edge.id) && !isCompactDiagram) {
          if (edge.id === 'orch-summarize' && fanout && currentStep === 2) {
            return (
              <EdgeAnnotation
                key={`lbl-${edge.id}`}
                x={fanout.assignPill.x}
                y={fanout.assignPill.y}
                label={verb}
                fill={annFill}
                textFill={annText}
                fillOpacity={0.85}
              />
            );
          }
          return null;
        }

        if (
          edge.id === M10_ORCHESTRATOR_FANIN_EDGE_ID &&
          !isCompactDiagram &&
          fanin
        ) {
          return (
            <EdgeAnnotation
              key={`lbl-${edge.id}`}
              x={fanin.handoffPill.x}
              y={fanin.handoffPill.y}
              label={verb}
              fill={annFill}
              textFill={annText}
            />
          );
        }

        const from = boxes[edge.from];
        const to = boxes[edge.to];
        if (!from || !to) return null;
        const pt = getOrchestratorEdgeLabelAnchor(
          from,
          to,
          edge.fromAnchor ?? 'bottom',
          edge.toAnchor ?? 'top',
          vb.width,
          verb,
          edge.id
        );
        return (
          <EdgeAnnotation
            key={`lbl-${edge.id}`}
            x={pt.x}
            y={pt.y}
            label={verb}
            fill={annFill}
            textFill={annText}
          />
        );
      })}

      {isRetryStep && retryLabelPoint ? (
        <EdgeAnnotation
          x={retryLabelPoint.x}
          y={retryLabelPoint.y}
          label={L.retryLabel}
          fill={annFill}
          textFill={DIAGRAM_ROLE_COLORS.amber}
        />
      ) : null}

      {boxes.output ? (
        <text
          x={boxes.output.x + boxes.output.w / 2}
          y={boxes.output.y + boxes.output.h + 16}
          textAnchor="middle"
          fill={palette.muted}
          fontSize={DIAGRAM_TOKENS.typography.subtitle.desktop}
          fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
          fontFamily={DIAGRAM_TOKENS.font}
          opacity={currentStep === 5 ? 1 : ORCHESTRATOR_MAP_EDGE_OPACITY}
        >
          {L.hitlNote}
        </text>
      ) : null}
    </svg>
  );
}
