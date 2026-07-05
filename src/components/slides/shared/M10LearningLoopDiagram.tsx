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
  getM10LearningLoopCompactBoxes,
  getM10LearningLoopDesktopBoxes,
  M10_LEARNING_LOOP_STEP_NODE_IDS,
  M10_LEARNING_LOOP_VIEWBOX,
  type M10LearningLoopBox,
} from './m10LearningLoopLayout';

const BRAND = '#334e68';
const BRAND_LIGHT = '#486581';
const TEAL = '#0d9488';
const VIOLET = '#7c3aed';
const AMBER = '#b8860b';
const SLATE = '#64748b';
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
    <g opacity={dimmed ? 0.45 : 1}>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx="12"
        fill={toneFill(box.tone)}
        stroke={active ? '#f3cc30' : stroke}
        strokeWidth={active ? 3 : 1}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + 24}
        textAnchor="middle"
        fill="white"
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
      strokeWidth="2"
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
      strokeWidth="2.5"
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
          height="175"
          rx="18"
          fill={palette.bgStart}
          stroke={palette.border}
        />
        <text
          x="210"
          y="36"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={palette.brandDark}
          fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
        >
          {L.executionTitle}
        </text>
        <text
          x="210"
          y="553"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
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
        <CurvedArrow
          d="M 230 653 C 365 610, 365 210, 310 174"
          markerId={tealArrowId}
          color={TEAL}
        />
        <text
          x="346"
          y="405"
          textAnchor="middle"
          fontSize="10"
          fill={TEAL}
          fontWeight="700"
          fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
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
        fontSize="17"
        fontWeight="800"
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
        fontSize="13"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.executionTitle}
      </text>
      <text
        x="675"
        y="75"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.learningTitle}
      </text>

      {[...execution, ...loop].map((box) => (
        <NodeBox key={box.id} box={box} {...nodeProps(box)} />
      ))}

      <Arrow x1={195} y1={121} x2={235} y2={121} markerId={arrowId} />
      <Arrow x1={308} y1={150} x2={265} y2={180} markerId={arrowId} />
      <Arrow x1={214} y1={238} x2={155} y2={268} markerId={arrowId} />
      <Arrow x1={276} y1={238} x2={325} y2={268} markerId={arrowId} />
      <Arrow x1={138} y1={326} x2={207} y2={348} markerId={arrowId} />
      <Arrow x1={340} y1={326} x2={286} y2={348} markerId={arrowId} />
      <Arrow
        x1={330}
        y1={377}
        x2={570}
        y2={121}
        markerId={arrowId}
        color={VIOLET}
        dashed
      />
      <text
        x="464"
        y="221"
        textAnchor="middle"
        fontSize="10"
        fill={palette.muted}
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.record}
      </text>

      <CurvedArrow
        d="M 755 150 C 842 166, 842 202, 850 226"
        markerId={arrowId}
        color={AMBER}
      />
      <CurvedArrow
        d="M 770 256 C 760 292, 732 315, 725 329"
        markerId={arrowId}
        color={VIOLET}
      />
      <Arrow
        x1={565}
        y1={329}
        x2={630}
        y2={297}
        markerId={tealArrowId}
        color={TEAL}
      />
      <CurvedArrow
        d="M 455 297 C 395 250, 395 168, 380 121"
        markerId={tealArrowId}
        color={TEAL}
      />
      <CurvedArrow
        d="M 455 297 C 420 346, 390 354, 340 326"
        markerId={tealArrowId}
        color={TEAL}
        dashed
      />

      <text
        x="408"
        y="170"
        textAnchor="middle"
        fontSize="10"
        fill={TEAL}
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.updateRules}
      </text>
      <text
        x="401"
        y="360"
        textAnchor="middle"
        fontSize="10"
        fill={TEAL}
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.updateSkills}
      </text>
      <text
        x="748"
        y="286"
        textAnchor="middle"
        fontSize="10"
        fill={palette.muted}
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.improveNextRun}
      </text>
    </svg>
  );
}
