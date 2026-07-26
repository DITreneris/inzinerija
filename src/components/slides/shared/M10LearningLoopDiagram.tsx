/**
 * M10 – closed-loop agent learning system.
 * Dual-panel + update bus (gutter magistrale); staged edges per 4 makro steps.
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import {
  getM10LearningLoopLabels,
  type M10LearningLoopLocale,
} from './m10LearningLoopContent';
import {
  DIAGRAM_ROLE_COLORS,
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
} from './diagramTokens';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { learningLoopTipPoints } from './learningLoopUpdateBus';
import {
  getLearningLoopBoxMap,
  getLearningLoopCompactBusX,
  getLearningLoopDesktopBusX,
  getLearningLoopNodeVisualState,
  getLearningLoopUpdateBusForBoxes,
  getM10LearningLoopCompactBoxes,
  getM10LearningLoopDesktopBoxes,
  M10_LEARNING_LOOP_EDGES,
  M10_LEARNING_LOOP_ORPHAN_OPACITY,
  M10_LEARNING_LOOP_PANELS,
  M10_LEARNING_LOOP_STEP_NODE_IDS,
  M10_LEARNING_LOOP_VIEWBOX,
  resolveLearningLoopEdge,
  shouldPaintLearningLoopEdge,
  shouldShowLearningLoopCycleRing,
  shouldShowLearningLoopEdgeLabel,
  type LearningLoopNodeVisual,
  type M10LearningLoopBox,
  type M10LearningLoopEdgeKind,
} from './m10LearningLoopLayout';

const BRAND_LIGHT = DIAGRAM_ROLE_COLORS.brandTop;
const TEAL = DIAGRAM_ROLE_COLORS.teal;
const VIOLET = DIAGRAM_ROLE_COLORS.violet;
const AMBER = DIAGRAM_ROLE_COLORS.amber;
const SLATE = DIAGRAM_ROLE_COLORS.slate;
const FLOW = DIAGRAM_ROLE_COLORS.greyForward;
const ACTIVE_STROKE = getDiagramActiveStroke();
const MARKER = getProcessArrowMarkerGeom();
/** Local orphan dim – ≠ DIAGRAM_TOKENS.opacity.inactive (LMS floor 0.88). */
const ORPHAN_OPACITY = M10_LEARNING_LOOP_ORPHAN_OPACITY;
const CYCLE_RING_PAD = 10;
const CYCLE_RING_OPACITY = 0.35;

function edgeStroke(kind: M10LearningLoopEdgeKind) {
  if (kind === 'record' || kind === 'learn') return VIOLET;
  if (kind === 'update') return TEAL;
  return FLOW;
}

function toneFill(tone: M10LearningLoopBox['tone']) {
  if (tone === 'teal') return TEAL;
  if (tone === 'violet') return VIOLET;
  if (tone === 'amber') return AMBER;
  if (tone === 'slate') return SLATE;
  return BRAND_LIGHT;
}

function NodeBox({
  box,
  visualState,
  stroke,
  onActivate,
}: {
  box: M10LearningLoopBox;
  visualState: LearningLoopNodeVisual;
  stroke: string;
  onActivate?: () => void;
}) {
  const isActive = visualState === 'active';
  const opacity = visualState === 'orphan' ? ORPHAN_OPACITY : 1;
  return (
    <g opacity={opacity}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="12"
        fill={toneFill(box.tone)}
        stroke={isActive ? ACTIVE_STROKE : stroke}
        strokeWidth={isActive ? 3 : 1}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 22}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[0]}
      </text>
      <text
        x={box.x + box.w / 2}
        y={box.y + 40}
        textAnchor="middle"
        fill="rgba(255,255,255,0.88)"
        fontSize="9"
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
          radius={12}
          onActivate={onActivate}
        />
      ) : null}
    </g>
  );
}

function EdgePill({
  x,
  y,
  label,
  fill,
  bg,
}: {
  x: number;
  y: number;
  label: string;
  fill: string;
  bg: string;
}) {
  const w = Math.min(150, Math.max(64, label.length * 7.2 + 16));
  const h = 18;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={9}
        fill={bg}
        stroke={fill}
        strokeWidth={1}
        opacity={0.96}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fill={fill}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {label}
      </text>
    </g>
  );
}

export default function M10LearningLoopDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10LearningLoopLocale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM10LearningLoopLabels(locale);
  const palette = useDiagramPalette();
  const { isCompactDiagram } = useCompactViewport();
  const flowMarkerId = `m10ll-flow-${uid}`;
  const recordMarkerId = `m10ll-record-${uid}`;

  const stepForNode = (id: M10LearningLoopBox['id']) =>
    M10_LEARNING_LOOP_STEP_NODE_IDS.findIndex((nodes) => nodes.includes(id));
  const nodeProps = (box: M10LearningLoopBox) => {
    const stepIndex = stepForNode(box.id);
    const visualState = onStepClick
      ? getLearningLoopNodeVisualState(currentStep, box.id)
      : ('live' as LearningLoopNodeVisual);
    return {
      visualState,
      stroke: palette.brandDark,
      onActivate:
        onStepClick && stepIndex >= 0
          ? () => onStepClick(stepIndex)
          : undefined,
    };
  };

  const boxes = isCompactDiagram
    ? getM10LearningLoopCompactBoxes(L)
    : (() => {
        const { execution, loop } = getM10LearningLoopDesktopBoxes(L);
        return [...execution, ...loop];
      })();
  const map = getLearningLoopBoxMap(boxes);
  const busX = isCompactDiagram
    ? getLearningLoopCompactBusX()
    : getLearningLoopDesktopBusX();
  const panels = isCompactDiagram
    ? M10_LEARNING_LOOP_PANELS.compact
    : M10_LEARNING_LOOP_PANELS.desktop;
  const vb = isCompactDiagram
    ? M10_LEARNING_LOOP_VIEWBOX.compact
    : M10_LEARNING_LOOP_VIEWBOX.desktop;

  const busGeom = getLearningLoopUpdateBusForBoxes(map, busX);
  const paintBus = shouldPaintLearningLoopEdge(currentStep, 'update-rules');
  const pillBg = palette.bgStart;

  return (
    <svg
      viewBox={`0 0 ${vb.width} ${vb.height}`}
      className={`w-full ${isCompactDiagram ? 'max-w-md' : 'max-w-5xl'} mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={flowMarkerId}
          markerUnits={MARKER.markerUnits}
          markerWidth={MARKER.markerWidth}
          markerHeight={MARKER.markerHeight}
          refX={MARKER.refX}
          refY={MARKER.refY}
          orient="auto"
        >
          <path d={MARKER.pathD} fill={FLOW} />
        </marker>
        <marker
          id={recordMarkerId}
          markerUnits={MARKER.markerUnits}
          markerWidth={MARKER.markerWidth}
          markerHeight={MARKER.markerHeight}
          refX={MARKER.refX}
          refY={MARKER.refY}
          orient="auto"
        >
          <path d={MARKER.pathD} fill={VIOLET} />
        </marker>
      </defs>

      {!isCompactDiagram ? (
        <text
          x={vb.width / 2}
          y="28"
          textAnchor="middle"
          fontSize={DIAGRAM_TOKENS.typography.title.desktop}
          fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
          fill={palette.brandDark}
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.title}
        </text>
      ) : null}

      <rect
        x={panels.exec.x}
        y={panels.exec.y}
        width={panels.exec.w}
        height={panels.exec.h}
        rx="22"
        fill={palette.bgEnd}
        stroke={palette.border}
      />
      <rect
        x={panels.learn.x}
        y={panels.learn.y}
        width={panels.learn.w}
        height={panels.learn.h}
        rx="22"
        fill={palette.bgStart}
        stroke={palette.border}
      />
      <text
        x={panels.exec.x + panels.exec.w / 2}
        y={panels.exec.y + 26}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.executionTitle}
      </text>
      <text
        x={panels.learn.x + panels.learn.w / 2}
        y={panels.learn.y + 26}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.learningTitle}
      </text>

      {shouldShowLearningLoopCycleRing(currentStep) ? (
        <rect
          x={panels.learn.x + CYCLE_RING_PAD}
          y={panels.learn.y + CYCLE_RING_PAD + 18}
          width={panels.learn.w - CYCLE_RING_PAD * 2}
          height={panels.learn.h - CYCLE_RING_PAD * 2 - 12}
          rx="18"
          fill="none"
          stroke={VIOLET}
          strokeWidth={DIAGRAM_TOKENS.stroke.inactive}
          opacity={CYCLE_RING_OPACITY}
        />
      ) : null}

      {M10_LEARNING_LOOP_EDGES.map((edge) => {
        if (edge.id === 'update-rules' || edge.id === 'update-skills') {
          return null;
        }
        if (!shouldPaintLearningLoopEdge(currentStep, edge.id)) return null;

        const useMarker = edge.kind === 'flow' || edge.kind === 'record';
        const resolved = resolveLearningLoopEdge(edge, map, {
          busX,
          useMarkerTip: useMarker,
          compact: isCompactDiagram,
        });
        if (!resolved || resolved.mode === 'bus') return null;

        const color = edgeStroke(edge.kind);
        const dash = edge.dashed ? '8 4' : undefined;

        if (resolved.mode === 'path') {
          return (
            <path
              key={edge.id}
              d={resolved.d}
              fill="none"
              stroke={color}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              strokeLinejoin="round"
              markerEnd={`url(#${flowMarkerId})`}
            />
          );
        }

        if (useMarker) {
          return (
            <line
              key={edge.id}
              x1={resolved.x1}
              y1={resolved.y1}
              x2={resolved.x2}
              y2={resolved.y2}
              stroke={color}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              strokeDasharray={dash}
              markerEnd={`url(#${edge.kind === 'record' ? recordMarkerId : flowMarkerId})`}
            />
          );
        }

        return (
          <g key={edge.id}>
            <line
              x1={resolved.x1}
              y1={resolved.y1}
              x2={resolved.x2}
              y2={resolved.y2}
              stroke={color}
              strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
              strokeDasharray={dash}
            />
            {resolved.tipGeom && resolved.tip ? (
              <polygon
                points={learningLoopTipPoints(
                  resolved.tip,
                  resolved.tipGeom.tipX,
                  resolved.tipGeom.tipY
                )}
                fill={color}
              />
            ) : null}
          </g>
        );
      })}

      {paintBus ? (
        <g>
          <path
            d={busGeom.trunkPath}
            fill="none"
            stroke={TEAL}
            strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
            strokeLinejoin="round"
            strokeDasharray="8 4"
          />
          <line
            x1={busGeom.dropRules.start.x}
            y1={busGeom.dropRules.start.y}
            x2={busGeom.dropRules.end.x}
            y2={busGeom.dropRules.end.y}
            stroke={TEAL}
            strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
            strokeDasharray="8 4"
          />
          <line
            x1={busGeom.dropSkills.start.x}
            y1={busGeom.dropSkills.start.y}
            x2={busGeom.dropSkills.end.x}
            y2={busGeom.dropSkills.end.y}
            stroke={TEAL}
            strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
            strokeDasharray="8 4"
          />
          <polygon
            points={learningLoopTipPoints(
              busGeom.tipRules.dir,
              busGeom.tipRules.tipX,
              busGeom.tipRules.tipY
            )}
            fill={TEAL}
          />
          <polygon
            points={learningLoopTipPoints(
              busGeom.tipSkills.dir,
              busGeom.tipSkills.tipX,
              busGeom.tipSkills.tipY
            )}
            fill={TEAL}
          />
        </g>
      ) : null}

      {boxes.map((box) => (
        <NodeBox key={box.id} box={box} {...nodeProps(box)} />
      ))}

      {shouldShowLearningLoopEdgeLabel(currentStep, 'output-logs') ? (
        <EdgePill
          x={
            isCompactDiagram
              ? map.output.x + map.output.w / 2
              : (map.output.x + map.output.w + map.logs.x) / 2
          }
          y={
            isCompactDiagram
              ? (map.output.y + map.output.h + map.logs.y) / 2
              : map.output.y + map.output.h / 2 - 16
          }
          label={L.record}
          fill={VIOLET}
          bg={pillBg}
        />
      ) : null}

      {shouldShowLearningLoopEdgeLabel(currentStep, 'eval-lessons') ? (
        <EdgePill
          x={
            map.evaluation.x +
            map.evaluation.w / 2 +
            (isCompactDiagram ? 0 : 36)
          }
          y={(map.evaluation.y + map.evaluation.h + map.lessons.y) / 2}
          label={L.improveNextRun}
          fill={VIOLET}
          bg={pillBg}
        />
      ) : null}

      {shouldShowLearningLoopEdgeLabel(currentStep, 'update-bus') ? (
        <EdgePill
          x={busGeom.label.x}
          y={busGeom.label.y}
          label={L.updateSystem}
          fill={TEAL}
          bg={pillBg}
        />
      ) : null}
    </svg>
  );
}
