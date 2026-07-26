/**
 * M12 – business multi-agent schema (W7 layout brother of m10_agent_orchestrator).
 * Geometry SOT: m12MultiAgentSchemaLayout.ts
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import type { M10Locale } from './m10DiagramContent';
import { getM12MultiAgentSchemaLabels } from './m12MultiAgentSchemaContent';
import {
  getM12CompactFanGeometry,
  getM12EdgeOpacity,
  getM12EdgePoints,
  getM12FaninGeometry,
  getM12FanoutGeometry,
  getM12FeedbackLabelPos,
  getM12FeedbackPathCompact,
  getM12FeedbackPathDesktop,
  getM12BoxMap,
  getM12MultiAgentCompactBoxes,
  getM12MultiAgentDesktopBoxes,
  getM12NodeOpacity,
  isM12NodeFocused,
  M12_EDGE_PILL_OPACITY,
  M12_MULTI_AGENT_EDGES_COMPACT,
  M12_MULTI_AGENT_EDGES_DESKTOP,
  M12_MULTI_AGENT_MARKER_LEN,
  M12_MULTI_AGENT_STEP_NODE_IDS,
  M12_MULTI_AGENT_TITLE_Y,
  M12_MULTI_AGENT_VIEWBOX,
  shouldShowM12EdgeLabel,
  type M12MultiAgentBox,
  type M12MultiAgentTone,
} from './m12MultiAgentSchemaLayout';
import {
  DIAGRAM_AMBER_INK_SOFT,
  DIAGRAM_ROLE_COLORS,
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
} from './diagramTokens';
import { getProcessArrowMarkerGeom } from './processArrowMarker';

const MARKER = getProcessArrowMarkerGeom(M12_MULTI_AGENT_MARKER_LEN);
const ACTIVE_STROKE = getDiagramActiveStroke();

const TONE_FILL: Record<M12MultiAgentTone, string> = {
  slate: DIAGRAM_ROLE_COLORS.slate,
  violet: DIAGRAM_ROLE_COLORS.violet,
  teal: DIAGRAM_ROLE_COLORS.teal,
  amber: DIAGRAM_ROLE_COLORS.amber,
  amberSoft: DIAGRAM_ROLE_COLORS.amberSoft,
};

function FlowMarker({ id, fill }: { id: string; fill: string }) {
  return (
    <marker
      id={id}
      markerUnits={MARKER.markerUnits}
      markerWidth={MARKER.markerWidth}
      markerHeight={MARKER.markerHeight}
      refX={MARKER.refX}
      refY={MARKER.refY}
      orient="auto"
    >
      <path d={MARKER.pathD} fill={fill} />
    </marker>
  );
}

function EdgePill({
  x,
  y,
  label,
  color,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
      fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
      fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
      fontFamily={DIAGRAM_TOKENS.font}
      opacity={M12_EDGE_PILL_OPACITY}
    >
      {label}
    </text>
  );
}

function NodeBox({
  box,
  focused,
  opacity,
  stroke,
  onActivate,
}: {
  box: M12MultiAgentBox;
  focused: boolean;
  opacity: number;
  stroke: string;
  onActivate?: () => void;
}) {
  const softInk = box.tone === 'amberSoft';
  const textColor = softInk ? DIAGRAM_AMBER_INK_SOFT : 'white';
  const subColor = softInk ? DIAGRAM_AMBER_INK_SOFT : 'rgba(255,255,255,0.9)';
  const titleSize = DIAGRAM_TOKENS.typography.stepLabel.desktop;
  const subSize = DIAGRAM_TOKENS.typography.stepSub.desktop;

  return (
    <g opacity={opacity}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={TONE_FILL[box.tone]}
        stroke={focused ? ACTIVE_STROKE : stroke}
        strokeWidth={
          focused ? DIAGRAM_TOKENS.stroke.active : DIAGRAM_TOKENS.stroke.border
        }
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 24}
        textAnchor="middle"
        fill={textColor}
        fontSize={titleSize}
        fontWeight="700"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[0]}
      </text>
      <text
        x={box.x + box.w / 2}
        y={box.y + 42}
        textAnchor="middle"
        fill={subColor}
        fontSize={subSize}
        fontWeight={softInk ? '700' : '500'}
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

export default function M12MultiAgentSchemaDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const L = getM12MultiAgentSchemaLabels(locale);
  const arrowId = `m12-ma-arrow-${uid}`;
  const dashedArrowId = `m12-ma-dashed-${uid}`;
  const feedbackArrowId = `m12-ma-feedback-${uid}`;
  const interactive = Boolean(onStepClick);
  const step = currentStep;

  const stepForNode = (id: string) =>
    M12_MULTI_AGENT_STEP_NODE_IDS.findIndex((nodes) =>
      nodes.includes(id as (typeof nodes)[number])
    );

  const compact = isCompactDiagram;
  const boxList = compact
    ? getM12MultiAgentCompactBoxes(L)
    : getM12MultiAgentDesktopBoxes(L);
  const boxes = getM12BoxMap(boxList);
  const vb = compact
    ? M12_MULTI_AGENT_VIEWBOX.compact
    : M12_MULTI_AGENT_VIEWBOX.desktop;
  const titleY = compact
    ? M12_MULTI_AGENT_TITLE_Y.compact
    : M12_MULTI_AGENT_TITLE_Y.desktop;
  const spineEdges = (
    compact ? M12_MULTI_AGENT_EDGES_COMPACT : M12_MULTI_AGENT_EDGES_DESKTOP
  ).filter(
    (e) =>
      e.id === 'input-router' ||
      e.id === 'router-coordinator' ||
      e.id === 'evaluator-output'
  );
  const feedbackD = compact
    ? getM12FeedbackPathCompact(boxes)
    : getM12FeedbackPathDesktop(boxes);
  const feedbackLabel = getM12FeedbackLabelPos(boxes, compact);
  const pillYOffset = compact ? 10 : 12;
  const frame = compact
    ? { x: 10, y: 14, w: vb.width - 20, h: vb.height - 28, rx: 20 }
    : { x: 14, y: 44, w: vb.width - 28, h: vb.height - 58, rx: 22 };
  const compactFan = compact ? getM12CompactFanGeometry(boxes) : null;
  const fanout = compact ? null : getM12FanoutGeometry(boxes);
  const fanin = compact ? null : getM12FaninGeometry(boxes);

  return (
    <svg
      viewBox={`0 0 ${vb.width} ${vb.height}`}
      className={`w-full ${compact ? 'max-w-md' : 'max-w-5xl'} mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <FlowMarker id={arrowId} fill={DIAGRAM_ROLE_COLORS.slate} />
        <FlowMarker id={dashedArrowId} fill={DIAGRAM_ROLE_COLORS.amber} />
        <FlowMarker
          id={feedbackArrowId}
          fill={DIAGRAM_ROLE_COLORS.accentDark}
        />
      </defs>
      <rect
        x={frame.x}
        y={frame.y}
        width={frame.w}
        height={frame.h}
        rx={frame.rx}
        fill={palette.bgEnd}
        stroke={palette.border}
      />
      <text
        x={vb.width / 2}
        y={titleY}
        textAnchor="middle"
        fontSize={
          compact
            ? DIAGRAM_TOKENS.typography.title.compact
            : DIAGRAM_TOKENS.typography.title.desktop
        }
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      {spineEdges.map((edge) => {
        const pts = getM12EdgePoints(edge, boxes);
        return (
          <line
            key={edge.id}
            x1={pts.x1}
            y1={pts.y1}
            x2={pts.x2}
            y2={pts.y2}
            stroke={
              edge.kind === 'hitl'
                ? DIAGRAM_ROLE_COLORS.amber
                : DIAGRAM_ROLE_COLORS.slate
            }
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            strokeDasharray={edge.kind === 'hitl' ? '5 4' : undefined}
            markerEnd={`url(#${edge.kind === 'hitl' ? dashedArrowId : arrowId})`}
            opacity={getM12EdgeOpacity(edge.id, step)}
          />
        );
      })}

      {compactFan ? (
        <g>
          <path
            d={compactFan.downLeft}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
            opacity={getM12EdgeOpacity('coordinator-specialistA', step)}
          />
          <path
            d={compactFan.downRight}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
            opacity={getM12EdgeOpacity('coordinator-specialistB', step)}
          />
          <path
            d={compactFan.upLeft}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
            opacity={getM12EdgeOpacity('specialistA-evaluator', step)}
          />
          <path
            d={compactFan.upRight}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
            opacity={getM12EdgeOpacity('specialistB-evaluator', step)}
          />
          {shouldShowM12EdgeLabel('coord-assign', step) ? (
            <EdgePill
              x={compactFan.assignPill.x}
              y={compactFan.assignPill.y}
              label={L.edgeVerbs.assigns}
              color={palette.muted}
            />
          ) : null}
          {shouldShowM12EdgeLabel('spec-handoff', step) ? (
            <EdgePill
              x={compactFan.handoffPill.x}
              y={compactFan.handoffPill.y}
              label={L.edgeVerbs.handsOff}
              color={palette.muted}
            />
          ) : null}
        </g>
      ) : null}

      {fanout ? (
        <g opacity={getM12EdgeOpacity('coordinator-specialistA', step)}>
          <path
            d={fanout.trunkPath}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
          />
          <path
            d={fanout.busPath}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
          />
          <path
            d={fanout.dropA}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d={fanout.dropB}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
          />
          {shouldShowM12EdgeLabel('coord-assign', step) ? (
            <EdgePill
              x={fanout.assignPill.x}
              y={fanout.assignPill.y}
              label={L.edgeVerbs.assigns}
              color={palette.muted}
            />
          ) : null}
        </g>
      ) : null}
      {fanin ? (
        <g opacity={getM12EdgeOpacity('specialistA-evaluator', step)}>
          <path
            d={fanin.riseA}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
          />
          <path
            d={fanin.riseB}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
          />
          <path
            d={fanin.busPath}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
          />
          <path
            d={fanin.trunkPath}
            fill="none"
            stroke={DIAGRAM_ROLE_COLORS.slate}
            strokeWidth={DIAGRAM_TOKENS.stroke.flow}
            markerEnd={`url(#${arrowId})`}
          />
          {shouldShowM12EdgeLabel('spec-handoff', step) ? (
            <EdgePill
              x={fanin.handoffPill.x}
              y={fanin.handoffPill.y}
              label={L.edgeVerbs.handsOff}
              color={palette.muted}
            />
          ) : null}
        </g>
      ) : null}

      <g opacity={getM12EdgeOpacity('evaluator-coordinator', step)}>
        <path
          d={feedbackD}
          fill="none"
          stroke={DIAGRAM_ROLE_COLORS.accentDark}
          strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
          strokeDasharray="5 4"
          markerEnd={`url(#${feedbackArrowId})`}
        />
        {shouldShowM12EdgeLabel('evaluator-coordinator', step) ? (
          <EdgePill
            x={feedbackLabel.x}
            y={feedbackLabel.y}
            label={L.edgeVerbs.returns}
            color={DIAGRAM_ROLE_COLORS.violet}
          />
        ) : null}
      </g>

      {shouldShowM12EdgeLabel('input-router', step) ? (
        <EdgePill
          x={(boxes.input.x + boxes.input.w + boxes.router.x) / 2}
          y={boxes.input.y - pillYOffset}
          label={L.edgeVerbs.routes}
          color={palette.muted}
        />
      ) : null}
      {shouldShowM12EdgeLabel('router-coordinator', step) ? (
        <EdgePill
          x={(boxes.router.x + boxes.router.w + boxes.coordinator.x) / 2}
          y={boxes.router.y - pillYOffset}
          label={L.edgeVerbs.selects}
          color={palette.muted}
        />
      ) : null}
      {shouldShowM12EdgeLabel('evaluator-output', step) ? (
        <EdgePill
          x={(boxes.evaluator.x + boxes.evaluator.w + boxes.output.x) / 2}
          y={boxes.evaluator.y - pillYOffset}
          label={L.edgeVerbs.approves}
          color={palette.muted}
        />
      ) : null}

      {boxList.map((box) => {
        const idx = stepForNode(box.id);
        return (
          <NodeBox
            key={box.id}
            box={box}
            focused={isM12NodeFocused(box.id, step)}
            opacity={getM12NodeOpacity(box.id, step, interactive)}
            stroke={palette.brandDark}
            onActivate={
              onStepClick && idx >= 0 ? () => onStepClick(idx) : undefined
            }
          />
        );
      })}
    </svg>
  );
}
