/**
 * M12 – business multi-agent schema: input, roles, evaluator and HITL output.
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import type { M10Locale } from './m10DiagramContent';
import { getM12MultiAgentSchemaLabels } from './m12MultiAgentSchemaContent';
import {
  DIAGRAM_ROLE_COLORS,
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
} from './diagramTokens';

const DESKTOP_W = 930;
const DESKTOP_H = 330;
const COMPACT_W = 420;
const COMPACT_H = 620;

/** LMS process tip – processTipLen + refX=0 (W7). */
const M12_ARROW_TIP = DIAGRAM_TOKENS.arrow.processTipLen;
const M12_ARROW_TIP_H = M12_ARROW_TIP * 0.9;

const MUTED = DIAGRAM_ROLE_COLORS.brandTop;
const SLATE = DIAGRAM_ROLE_COLORS.slate;
const TEAL = DIAGRAM_ROLE_COLORS.teal;
const VIOLET = DIAGRAM_ROLE_COLORS.violet;
const AMBER = DIAGRAM_ROLE_COLORS.amber;
const AMBER_BG = DIAGRAM_ROLE_COLORS.amberSoft;
const ACTIVE_STROKE = getDiagramActiveStroke();

interface Box {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  label: [string, string];
  textColor?: string;
}

const STEP_NODE_IDS = [
  ['input'],
  ['router'],
  ['coordinator'],
  ['specialistA', 'specialistB'],
  ['evaluator'],
  ['output'],
] satisfies string[][];

function NodeBox({
  box,
  active,
  dimmed,
  stroke,
  onActivate,
}: {
  box: Box;
  active: boolean;
  dimmed: boolean;
  stroke: string;
  onActivate?: () => void;
}) {
  const textColor = box.textColor ?? 'white';
  const subColor = box.textColor ? '#713f12' : 'rgba(255,255,255,0.88)';

  return (
    <g opacity={dimmed ? DIAGRAM_TOKENS.opacity.inactive : 1}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={box.fill}
        stroke={active ? ACTIVE_STROKE : stroke}
        strokeWidth={active ? DIAGRAM_TOKENS.stroke.active : 1}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 25}
        textAnchor="middle"
        fill={textColor}
        fontSize="12"
        fontWeight="700"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {box.label[0]}
      </text>
      <text
        x={box.x + box.w / 2}
        y={box.y + 43}
        textAnchor="middle"
        fill={subColor}
        fontSize="9"
        fontWeight={box.textColor ? '700' : '500'}
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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  markerId,
  color = SLATE,
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
  color = DIAGRAM_ROLE_COLORS.accentDark,
}: {
  d: string;
  markerId: string;
  color?: string;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
      strokeDasharray="5 4"
      markerEnd={`url(#${markerId})`}
    />
  );
}

function HandoffLabel({
  x,
  y,
  label,
  color = MUTED,
}: {
  x: number;
  y: number;
  label: string;
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={color}
      fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
      fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
      fontFamily={DIAGRAM_TOKENS.font}
    >
      {label}
    </text>
  );
}

function FlowMarker({ id, fill }: { id: string; fill: string }) {
  return (
    <marker
      id={id}
      markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
      markerWidth={M12_ARROW_TIP}
      markerHeight={M12_ARROW_TIP_H}
      refX={0}
      refY={M12_ARROW_TIP_H / 2}
      orient="auto"
    >
      <path
        d={`M0 0 L${M12_ARROW_TIP} ${M12_ARROW_TIP_H / 2} L0 ${M12_ARROW_TIP_H} Z`}
        fill={fill}
      />
    </marker>
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
  const activeNodeIds = STEP_NODE_IDS[currentStep] ?? STEP_NODE_IDS[0];
  const feedbackActive = currentStep === 4; /* evaluator step */
  const stepForNode = (id: string) =>
    STEP_NODE_IDS.findIndex((nodes) => nodes.includes(id));
  const nodeProps = (box: Box) => {
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
    const boxes: Record<string, Box> = {
      input: {
        id: 'input',
        x: 110,
        y: 62,
        w: 200,
        h: 58,
        fill: SLATE,
        label: L.input,
      },
      router: {
        id: 'router',
        x: 110,
        y: 145,
        w: 200,
        h: 58,
        fill: SLATE,
        label: L.router,
      },
      coordinator: {
        id: 'coordinator',
        x: 110,
        y: 228,
        w: 200,
        h: 58,
        fill: VIOLET,
        label: L.coordinator,
      },
      specialistA: {
        id: 'specialistA',
        x: 22,
        y: 333,
        w: 176,
        h: 58,
        fill: TEAL,
        label: L.specialistA,
      },
      specialistB: {
        id: 'specialistB',
        x: 222,
        y: 333,
        w: 176,
        h: 58,
        fill: TEAL,
        label: L.specialistB,
      },
      evaluator: {
        id: 'evaluator',
        x: 110,
        y: 438,
        w: 200,
        h: 58,
        fill: AMBER,
        label: L.evaluator,
      },
      output: {
        id: 'output',
        x: 110,
        y: 528,
        w: 200,
        h: 58,
        fill: AMBER_BG,
        label: L.output,
        textColor: '#713f12',
      },
    };

    return (
      <svg
        viewBox={`0 0 ${COMPACT_W} ${COMPACT_H}`}
        className={`w-full max-w-md mx-auto block ${className}`}
        role="img"
        aria-label={L.aria}
      >
        <defs>
          <FlowMarker id={arrowId} fill={SLATE} />
          <FlowMarker id={dashedArrowId} fill={AMBER} />
          <FlowMarker
            id={feedbackArrowId}
            fill={DIAGRAM_ROLE_COLORS.accentDark}
          />
        </defs>
        <rect
          x="10"
          y="14"
          width="400"
          height="590"
          rx="20"
          fill={palette.bgEnd}
          stroke={palette.border}
        />
        <text
          x={COMPACT_W / 2}
          y="40"
          textAnchor="middle"
          fontSize="15"
          fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
          fill={palette.brandDark}
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.title}
        </text>
        {Object.values(boxes).map((box) => (
          <NodeBox key={box.id} box={box} {...nodeProps(box)} />
        ))}
        <Arrow x1={210} y1={120} x2={210} y2={145} markerId={arrowId} />
        <Arrow x1={210} y1={203} x2={210} y2={228} markerId={arrowId} />
        <Arrow x1={160} y1={286} x2={110} y2={333} markerId={arrowId} />
        <Arrow x1={260} y1={286} x2={310} y2={333} markerId={arrowId} />
        <Arrow x1={110} y1={391} x2={160} y2={438} markerId={arrowId} />
        <Arrow x1={310} y1={391} x2={260} y2={438} markerId={arrowId} />
        <Arrow
          x1={210}
          y1={496}
          x2={210}
          y2={528}
          markerId={dashedArrowId}
          color={AMBER}
          dashed
        />
        <g
          opacity={
            feedbackActive
              ? DIAGRAM_TOKENS.opacity.active
              : DIAGRAM_TOKENS.opacity.inactive
          }
        >
          <CurvedArrow
            d="M 110 467 C 20 467, 20 257, 110 257"
            markerId={feedbackArrowId}
          />
          <HandoffLabel x={48} y={360} label={L.feedback} color={VIOLET} />
        </g>
        <HandoffLabel x={210} y={317} label={L.handoff} color={palette.muted} />
        <HandoffLabel x={210} y={520} label={L.hitl} color={palette.muted} />
      </svg>
    );
  }

  const boxes: Record<string, Box> = {
    input: {
      id: 'input',
      x: 30,
      y: 132,
      w: 112,
      h: 58,
      fill: SLATE,
      label: L.input,
    },
    router: {
      id: 'router',
      x: 172,
      y: 132,
      w: 124,
      h: 58,
      fill: SLATE,
      label: L.router,
    },
    coordinator: {
      id: 'coordinator',
      x: 326,
      y: 132,
      w: 124,
      h: 58,
      fill: VIOLET,
      label: L.coordinator,
    },
    specialistA: {
      id: 'specialistA',
      x: 484,
      y: 72,
      w: 124,
      h: 58,
      fill: TEAL,
      label: L.specialistA,
    },
    specialistB: {
      id: 'specialistB',
      x: 484,
      y: 192,
      w: 124,
      h: 58,
      fill: TEAL,
      label: L.specialistB,
    },
    evaluator: {
      id: 'evaluator',
      x: 642,
      y: 132,
      w: 118,
      h: 58,
      fill: AMBER,
      label: L.evaluator,
    },
    output: {
      id: 'output',
      x: 780,
      y: 132,
      w: 120,
      h: 58,
      fill: AMBER_BG,
      label: L.output,
      textColor: '#713f12',
    },
  };

  return (
    <svg
      viewBox={`0 0 ${DESKTOP_W} ${DESKTOP_H}`}
      className={`w-full max-w-5xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <FlowMarker id={arrowId} fill={SLATE} />
        <FlowMarker id={dashedArrowId} fill={AMBER} />
        <FlowMarker
          id={feedbackArrowId}
          fill={DIAGRAM_ROLE_COLORS.accentDark}
        />
      </defs>
      <rect
        x="14"
        y="40"
        width="902"
        height="238"
        rx="22"
        fill={palette.bgEnd}
        stroke={palette.border}
      />
      <text
        x={DESKTOP_W / 2}
        y="30"
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.desktop}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      {Object.values(boxes).map((box) => (
        <NodeBox key={box.id} box={box} {...nodeProps(box)} />
      ))}
      <Arrow x1={142} y1={161} x2={172} y2={161} markerId={arrowId} />
      <Arrow x1={296} y1={161} x2={326} y2={161} markerId={arrowId} />
      <Arrow x1={450} y1={151} x2={484} y2={101} markerId={arrowId} />
      <Arrow x1={450} y1={171} x2={484} y2={221} markerId={arrowId} />
      <Arrow x1={608} y1={101} x2={642} y2={151} markerId={arrowId} />
      <Arrow x1={608} y1={221} x2={642} y2={171} markerId={arrowId} />
      <Arrow
        x1={760}
        y1={161}
        x2={780}
        y2={161}
        markerId={dashedArrowId}
        color={AMBER}
        dashed
      />
      <g
        opacity={
          feedbackActive
            ? DIAGRAM_TOKENS.opacity.active
            : DIAGRAM_TOKENS.opacity.inactive
        }
      >
        <CurvedArrow
          d="M 701 190 C 640 255, 450 255, 388 190"
          markerId={feedbackArrowId}
        />
        <HandoffLabel x={545} y={268} label={L.feedback} color={VIOLET} />
      </g>
      <HandoffLabel x={467} y={127} label={L.handoff} color={palette.muted} />
      <HandoffLabel x={770} y={148} label={L.hitl} color={palette.muted} />
    </svg>
  );
}
