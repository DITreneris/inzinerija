/**
 * M10 – closed-loop agent learning system.
 * Two panels: execution system + learning loop, with update arrows back to rules and skills.
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
import {
  getLearningLoopBoxMap,
  getM10LearningLoopCompactBoxes,
  getM10LearningLoopDesktopBoxes,
  M10_LEARNING_LOOP_EDGES_DESKTOP,
  M10_LEARNING_LOOP_STEP_NODE_IDS,
  M10_LEARNING_LOOP_VIEWBOX,
  resolveLearningLoopStraight,
  type M10LearningLoopBox,
  type M10LearningLoopEdge,
} from './m10LearningLoopLayout';

const BRAND = DIAGRAM_ROLE_COLORS.brand;
const BRAND_LIGHT = DIAGRAM_ROLE_COLORS.brandTop;
const TEAL = DIAGRAM_ROLE_COLORS.teal;
const VIOLET = DIAGRAM_ROLE_COLORS.violet;
const AMBER = DIAGRAM_ROLE_COLORS.amber;
const SLATE = DIAGRAM_ROLE_COLORS.slate;
const ACTIVE_STROKE = getDiagramActiveStroke();

function edgeColor(kind: M10LearningLoopEdge['kind']) {
  if (kind === 'record') return VIOLET;
  if (kind === 'eval') return AMBER;
  if (kind === 'lessons') return VIOLET;
  if (
    kind === 'to-update' ||
    kind === 'update-rules' ||
    kind === 'update-skills'
  ) {
    return TEAL;
  }
  return BRAND;
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
  active,
  dimmed,
  stroke,
  onActivate,
}: {
  box: M10LearningLoopBox;
  active: boolean;
  dimmed: boolean;
  stroke: string;
  onActivate?: () => void;
}) {
  return (
    <g opacity={dimmed ? DIAGRAM_TOKENS.opacity.inactive : 1}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="12"
        fill={toneFill(box.tone)}
        stroke={active ? ACTIVE_STROKE : stroke}
        strokeWidth={active ? 3 : 1}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 24}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {box.label[0]}
      </text>
      <text
        x={box.x + box.w / 2}
        y={box.y + 43}
        textAnchor="middle"
        fill="rgba(255,255,255,0.88)"
        fontSize="9"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  markerId,
  color = BRAND,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  markerId: string;
  color?: string;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={DIAGRAM_TOKENS.stroke.flow}
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={`url(#${markerId})`}
    />
  );
}

function CurvedArrow({
  d,
  markerId,
  color = TEAL,
  dashed = false,
}: {
  d: string;
  markerId: string;
  color?: string;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={`url(#${markerId})`}
    />
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
  const arrowId = `m10ll-arrow-${uid}`;
  const tealArrowId = `m10ll-teal-${uid}`;
  const activeNodeIds =
    M10_LEARNING_LOOP_STEP_NODE_IDS[currentStep] ??
    M10_LEARNING_LOOP_STEP_NODE_IDS[0];
  const stepForNode = (id: M10LearningLoopBox['id']) =>
    M10_LEARNING_LOOP_STEP_NODE_IDS.findIndex((nodes) => nodes.includes(id));
  const nodeProps = (box: M10LearningLoopBox) => {
    const stepIndex = stepForNode(box.id);
    return {
      active: activeNodeIds.includes(box.id),
      dimmed: Boolean(onStepClick) && !activeNodeIds.includes(box.id),
      stroke: palette.brandDark,
      onActivate:
        onStepClick && stepIndex >= 0
          ? () => onStepClick(stepIndex)
          : undefined,
    };
  };

  if (isCompactDiagram) {
    const boxes = getM10LearningLoopCompactBoxes(L);

    return (
      <svg
        viewBox={`0 0 ${M10_LEARNING_LOOP_VIEWBOX.compact.width} ${M10_LEARNING_LOOP_VIEWBOX.compact.height}`}
        className={`w-full max-w-md mx-auto block ${className}`}
        role="img"
        aria-label={L.aria}
      >
        <defs>
          <marker
            id={arrowId}
            markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill={BRAND} />
          </marker>
          <marker
            id={tealArrowId}
            markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill={TEAL} />
          </marker>
        </defs>
        <rect
          x="10"
          y="12"
          width="400"
          height="510"
          rx="18"
          fill={palette.bgEnd}
          stroke={palette.border}
        />
        <rect
          x="10"
          y="525"
          width="400"
          height="255"
          rx="18"
          fill={palette.bgStart}
          stroke={palette.border}
        />
        <text
          x="210"
          y="36"
          textAnchor="middle"
          fontSize={DIAGRAM_TOKENS.typography.title.compact}
          fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
          fill={palette.brandDark}
          fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
        >
          {L.executionTitle}
        </text>
        <text
          x="210"
          y="553"
          textAnchor="middle"
          fontSize={DIAGRAM_TOKENS.typography.title.compact}
          fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
          fill={palette.brandDark}
          fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
        >
          {L.learningTitle}
        </text>
        {boxes.map((box) => (
          <NodeBox key={box.id} box={box} {...nodeProps(box)} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <Arrow
            key={i}
            x1={210}
            y1={126 + i * 75}
            x2={210}
            y2={145 + i * 75}
            markerId={arrowId}
          />
        ))}
        <Arrow
          x1={210}
          y1={501}
          x2={210}
          y2={540}
          markerId={arrowId}
          color={VIOLET}
        />
        <Arrow
          x1={190}
          y1={568}
          x2={110}
          y2={625}
          markerId={arrowId}
          color={VIOLET}
        />
        <Arrow
          x1={230}
          y1={568}
          x2={310}
          y2={625}
          markerId={arrowId}
          color={VIOLET}
        />
        <Arrow
          x1={210}
          y1={681}
          x2={210}
          y2={710}
          markerId={tealArrowId}
          color={TEAL}
        />
        <CurvedArrow
          d="M 210 766 C 365 740, 365 210, 310 174"
          markerId={tealArrowId}
          color={TEAL}
        />
        <text
          x="346"
          y="405"
          textAnchor="middle"
          fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
          fill={TEAL}
          fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.improveNextRun}
        </text>
      </svg>
    );
  }

  const { execution, loop } = getM10LearningLoopDesktopBoxes(L);

  return (
    <svg
      viewBox={`0 0 ${M10_LEARNING_LOOP_VIEWBOX.desktop.width} ${M10_LEARNING_LOOP_VIEWBOX.desktop.height}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={arrowId}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill={BRAND} />
        </marker>
        <marker
          id={tealArrowId}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill={TEAL} />
        </marker>
      </defs>

      <text
        x={M10_LEARNING_LOOP_VIEWBOX.desktop.width / 2}
        y="28"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.desktop}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>

      <rect
        x="26"
        y="48"
        width="420"
        height="360"
        rx="22"
        fill={palette.bgEnd}
        stroke={palette.border}
      />
      <rect
        x="475"
        y="48"
        width="400"
        height="360"
        rx="22"
        fill={palette.bgStart}
        stroke={palette.border}
      />
      <text
        x="236"
        y="75"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.executionTitle}
      </text>
      <text
        x="675"
        y="75"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.learningTitle}
      </text>

      {[...execution, ...loop].map((box) => (
        <NodeBox key={box.id} box={box} {...nodeProps(box)} />
      ))}

      {(() => {
        const map = getLearningLoopBoxMap([...execution, ...loop]);
        return M10_LEARNING_LOOP_EDGES_DESKTOP.map((edge) => {
          const color = edgeColor(edge.kind);
          const marker = color === TEAL ? tealArrowId : arrowId;
          if (edge.desktopPath) {
            return (
              <CurvedArrow
                key={edge.id}
                d={edge.desktopPath}
                markerId={marker}
                color={color}
                dashed={edge.dashed}
              />
            );
          }
          const pts = resolveLearningLoopStraight(edge, map);
          if (!pts) return null;
          return (
            <Arrow
              key={edge.id}
              x1={pts.x1}
              y1={pts.y1}
              x2={pts.x2}
              y2={pts.y2}
              markerId={marker}
              color={color}
              dashed={edge.dashed}
            />
          );
        });
      })()}

      <text
        x="464"
        y="221"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fill={palette.muted}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.record}
      </text>

      <text
        x="408"
        y="170"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fill={TEAL}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.updateRules}
      </text>
      <text
        x="401"
        y="360"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fill={TEAL}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.updateSkills}
      </text>
      <text
        x="748"
        y="286"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fill={palette.muted}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.improveNextRun}
      </text>
    </svg>
  );
}
