/**
 * M12 – business multi-agent schema: input, roles, evaluator and HITL output.
 */
import { useId } from 'react';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import type { M10Locale } from './m10DiagramContent';
import { getM12MultiAgentSchemaLabels } from './m12MultiAgentSchemaContent';

const DESKTOP_W = 930;
const DESKTOP_H = 330;
const COMPACT_W = 420;
const COMPACT_H = 620;

const MUTED = '#486581';
const SLATE = '#64748b';
const TEAL = '#0d9488';
const VIOLET = '#7c3aed';
const AMBER = '#b8860b';
const AMBER_BG = '#fef3c7';

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
    <g opacity={dimmed ? 0.45 : 1}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="14"
        fill={box.fill}
        stroke={active ? '#f3cc30' : stroke}
        strokeWidth={active ? 3 : 1}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 25}
        textAnchor="middle"
        fill={textColor}
        fontSize="12"
        fontWeight="800"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
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
          radius={14}
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
      strokeWidth="2"
      strokeDasharray={dashed ? '5 4' : undefined}
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
      fontSize="9"
      fontWeight="700"
      fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
    >
      {label}
    </text>
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
  const activeNodeIds = STEP_NODE_IDS[currentStep] ?? STEP_NODE_IDS[0];
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
          <marker
            id={arrowId}
            markerWidth="7"
            markerHeight="7"
            refX="7"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill={SLATE} />
          </marker>
          <marker
            id={dashedArrowId}
            markerWidth="7"
            markerHeight="7"
            refX="7"
            refY="3.5"
            orient="auto"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill={AMBER} />
          </marker>
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
          fontWeight="800"
          fill={palette.brandDark}
          fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
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
        <marker
          id={arrowId}
          markerWidth="7"
          markerHeight="7"
          refX="7"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill={SLATE} />
        </marker>
        <marker
          id={dashedArrowId}
          markerWidth="7"
          markerHeight="7"
          refX="7"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" fill={AMBER} />
        </marker>
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
        fontSize="16"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
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
      <HandoffLabel x={467} y={127} label={L.handoff} color={palette.muted} />
      <HandoffLabel x={770} y={148} label={L.hitl} color={palette.muted} />
    </svg>
  );
}
