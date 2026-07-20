/**
 * M10 10.482 – Agentų orkestravimo simuliacija (view).
 * Geometry SOT: m10OrchestratorLayout.ts
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import {
  DIAGRAM_ROLE_COLORS,
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
} from './diagramTokens';
import {
  getM10OrchestratorLabels,
  type M10OrchestratorLocale,
} from './m10OrchestratorContent';
import {
  getAnchorPoint,
  getBoxMap,
  getLineEndPoint,
  getM10OrchestratorCompactBoxes,
  getM10OrchestratorDesktopBoxes,
  getRetryPathCompact,
  getRetryPathDesktop,
  M10_ORCHESTRATOR_EDGES,
  M10_ORCHESTRATOR_STEP_NODE_IDS,
  M10_ORCHESTRATOR_VIEWBOX,
  type M10OrchestratorBox,
  type M10OrchestratorEdge,
  type M10OrchestratorNodeId,
  type M10OrchestratorTone,
} from './m10OrchestratorLayout';

const VIOLET = DIAGRAM_ROLE_COLORS.violet;
const TEAL = DIAGRAM_ROLE_COLORS.teal;
const AMBER = DIAGRAM_ROLE_COLORS.amber;
const ROSE = DIAGRAM_ROLE_COLORS.rose;
const SLATE = DIAGRAM_ROLE_COLORS.slate;
const BRAND = DIAGRAM_ROLE_COLORS.brand;
const ACTIVE_STROKE = getDiagramActiveStroke();

function toneFill(tone: M10OrchestratorTone): string {
  if (tone === 'violet') return VIOLET;
  if (tone === 'teal') return TEAL;
  if (tone === 'amber') return AMBER;
  if (tone === 'rose') return ROSE;
  if (tone === 'brand') return BRAND;
  return SLATE;
}

function NodeBox({
  box,
  active,
  dimmed,
  errorHighlight,
  stroke,
  onActivate,
}: {
  box: M10OrchestratorBox;
  active: boolean;
  dimmed: boolean;
  errorHighlight?: boolean;
  stroke: string;
  onActivate?: () => void;
}) {
  const fill = errorHighlight ? ROSE : toneFill(box.tone);
  const activeStroke = errorHighlight ? ROSE : ACTIVE_STROKE;

  return (
    <g opacity={dimmed ? 0.42 : 1}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={fill}
        stroke={active ? activeStroke : stroke}
        strokeWidth={active ? DIAGRAM_TOKENS.stroke.active : 1}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 22}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
        fontWeight="800"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[0]}
      </text>
      <text
        x={box.x + box.w / 2}
        y={box.y + 40}
        textAnchor="middle"
        fill="rgba(255,255,255,0.88)"
        fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
        fontWeight="500"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[1]}
      </text>
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
  color,
  dashed,
}: {
  edge: M10OrchestratorEdge;
  boxes: Record<M10OrchestratorNodeId, M10OrchestratorBox>;
  markerId: string;
  color: string;
  dashed?: boolean;
}) {
  const from = boxes[edge.from];
  const to = boxes[edge.to];
  if (!from || !to) return null;
  const start = getAnchorPoint(from, edge.fromAnchor ?? 'bottom');
  const endRaw = getAnchorPoint(to, edge.toAnchor ?? 'top');
  const end = getLineEndPoint(start, endRaw);
  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke={color}
      strokeWidth={DIAGRAM_TOKENS.stroke.flow}
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={`url(#${markerId})`}
    />
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
  const retryMarker = `m10-orch-retry-${uid}`;
  const roseMarker = `m10-orch-rose-${uid}`;

  const activeNodeIds =
    M10_ORCHESTRATOR_STEP_NODE_IDS[currentStep] ??
    M10_ORCHESTRATOR_STEP_NODE_IDS[0];
  const isErrorStep = currentStep === 4;
  const isRetryStep = currentStep === 4 || currentStep === 5;

  const stepForNode = (id: M10OrchestratorNodeId) =>
    M10_ORCHESTRATOR_STEP_NODE_IDS.findIndex((nodes) => nodes.includes(id));

  const nodeProps = (box: M10OrchestratorBox) => {
    const stepIndex = stepForNode(box.id);
    const active = activeNodeIds.includes(box.id);
    return {
      active,
      dimmed: Boolean(onStepClick) && !active,
      errorHighlight: isErrorStep && box.id === 'validate',
      stroke: palette.brandDark,
      onActivate:
        onStepClick && stepIndex >= 0
          ? () => onStepClick(stepIndex)
          : undefined,
    };
  };

  const flowColor = palette.flow;
  const mutedFlow = palette.border;

  const bgGradId = `m10-orch-bg-${uid}`;

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
        <marker
          id={flowMarker}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY={3}
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={flowColor} />
        </marker>
        <marker
          id={retryMarker}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY={3}
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={AMBER} />
        </marker>
        <marker
          id={roseMarker}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY={3}
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={ROSE} />
        </marker>
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
        y={isCompactDiagram ? 18 : 16}
        textAnchor="middle"
        fill={palette.brandDark}
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight="800"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      {!isCompactDiagram ? (
        <text
          x={265}
          y={208}
          textAnchor="middle"
          fill={palette.muted}
          fontSize={9}
          fontWeight="700"
          fontFamily={DIAGRAM_TOKENS.font}
          letterSpacing="0.06em"
        >
          {L.agentsBand.toUpperCase()}
        </text>
      ) : null}

      {/* Edges */}
      {M10_ORCHESTRATOR_EDGES.filter((e) => e.kind !== 'retry').map((edge) => {
        const emphasize =
          (edge.kind === 'tools' && (currentStep === 3 || currentStep === 5)) ||
          (edge.kind === 'state' && currentStep === 2) ||
          (edge.kind === 'flow' && currentStep >= 1);
        const color =
          edge.kind === 'state'
            ? emphasize
              ? palette.muted
              : mutedFlow
            : emphasize
              ? flowColor
              : mutedFlow;
        const marker =
          isErrorStep && edge.id === 'validate-eval' ? roseMarker : flowMarker;
        return (
          <FlowEdge
            key={edge.id}
            edge={edge}
            boxes={boxes}
            markerId={marker}
            color={isErrorStep && edge.id === 'validate-eval' ? ROSE : color}
            dashed={edge.kind === 'state' || edge.kind === 'tools'}
          />
        );
      })}

      {/* Retry path */}
      {boxes.evaluator && boxes.orchestrator ? (
        <path
          d={
            isCompactDiagram
              ? getRetryPathCompact(boxes.evaluator, boxes.orchestrator)
              : getRetryPathDesktop(boxes.evaluator, boxes.orchestrator)
          }
          fill="none"
          stroke={isRetryStep ? AMBER : mutedFlow}
          strokeWidth={isRetryStep ? 2.5 : 1.5}
          strokeDasharray="5 4"
          markerEnd={`url(#${retryMarker})`}
          opacity={isRetryStep ? 1 : 0.55}
        />
      ) : null}

      {isRetryStep && boxes.evaluator ? (
        <text
          x={isCompactDiagram ? 36 : 70}
          y={
            isCompactDiagram
              ? boxes.evaluator.y - 8
              : (boxes.evaluator.y + boxes.orchestrator.y) / 2 + 4
          }
          fill={AMBER}
          fontSize={9}
          fontWeight="700"
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.retryLabel}
        </text>
      ) : null}

      {boxesList.map((box) => (
        <NodeBox key={box.id} box={box} {...nodeProps(box)} />
      ))}

      {currentStep === 5 && boxes.output ? (
        <text
          x={boxes.output.x + boxes.output.w / 2}
          y={boxes.output.y + boxes.output.h + 16}
          textAnchor="middle"
          fill={palette.muted}
          fontSize={9}
          fontWeight="600"
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.hitlNote}
        </text>
      ) : null}
    </svg>
  );
}
