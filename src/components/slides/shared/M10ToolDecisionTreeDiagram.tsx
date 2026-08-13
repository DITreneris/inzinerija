/**
 * M10 – įrankių pasirinkimo medis (view). Keyboard via DiagramStepNav in Block.
 * Section H1 owns the title. Workato = landmark (not an equal grey card).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import {
  getM10ToolTreeLeaves,
  getM10ToolTreeLabels,
  type M10Locale,
} from './m10DiagramContent';

const W = 800;
const H = 340;
const LEAF_W = 128;
const LEAF_H = 48;
const ROOT_W = 220;
const ROOT_H = 48;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW_TIP = PROCESS_ARROW.tipLen;
/** Stronger than LMS opacity.inactive floor (0.88) – local to this tree. */
const TREE_DIM_OPACITY = 0.4;

export default function M10ToolDecisionTreeDiagram({
  locale = 'lt',
  selectedIndex = 0,
  onSelect,
  className = '',
}: {
  locale?: M10Locale;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const typography = DIAGRAM_TOKENS.typography;
  const L = getM10ToolTreeLabels(locale);
  const leaves = getM10ToolTreeLeaves(locale);
  const interactive = typeof onSelect === 'function';
  const rootCx = W / 2;
  const rootY = 20;
  const rowY = 250;
  const gap = 16;
  const totalW = leaves.length * LEAF_W + (leaves.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const leafFill =
    palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart
      ? palette.bgStart
      : '#ffffff';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-5xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10tree-arr-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.flow} />
        </marker>
      </defs>
      <rect
        x={rootCx - ROOT_W / 2}
        y={rootY}
        width={ROOT_W}
        height={ROOT_H}
        rx={DIAGRAM_TOKENS.radius.box}
        fill={palette.brand}
        stroke={palette.brandDark}
        strokeWidth={DIAGRAM_TOKENS.stroke.border + 0.2}
      />
      <text
        x={rootCx}
        y={rootY + 30}
        textAnchor="middle"
        fill="white"
        fontSize={typography.stepLabel.desktop}
        fontWeight={typography.titleWeight}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.root}
      </text>

      {leaves.map((leaf, i) => {
        const x = startX + i * (LEAF_W + gap);
        const cx = x + LEAF_W / 2;
        const leafTop = rowY;
        const midY = rootY + ROOT_H + (leafTop - (rootY + ROOT_H)) / 2;
        const isSel = selectedIndex === i;
        const isLandmark = leaf.id === 'ent';
        const dim =
          interactive && selectedIndex >= 0 && !isSel
            ? TREE_DIM_OPACITY
            : DIAGRAM_TOKENS.opacity.active;

        return (
          <g key={leaf.id} opacity={dim}>
            <path
              d={`M ${rootCx} ${rootY + ROOT_H} L ${rootCx} ${midY} L ${cx} ${midY} L ${cx} ${leafTop - ARROW_TIP}`}
              fill="none"
              stroke={palette.flow}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              markerEnd={`url(#m10tree-arr-${uid})`}
            />
            <text
              x={cx}
              y={midY - 8}
              textAnchor="middle"
              fill={palette.brandDark}
              fontSize={typography.stepSub.desktop}
              fontWeight={typography.edgeLabel.weight}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {leaf.condition}
            </text>
            <rect
              x={x}
              y={leafTop}
              width={LEAF_W}
              height={LEAF_H}
              rx="8"
              fill={isSel ? palette.brand : leafFill}
              stroke={
                isSel
                  ? palette.brandDark
                  : isLandmark
                    ? palette.flow
                    : palette.border
              }
              strokeWidth={isSel ? DIAGRAM_TOKENS.stroke.active : 1.25}
              strokeDasharray={isLandmark && !isSel ? '5 4' : undefined}
            />
            <text
              x={cx}
              y={leafTop + (isLandmark ? 20 : 28)}
              textAnchor="middle"
              fill={isSel ? 'white' : palette.brandDark}
              fontSize={typography.stepLabel.compact}
              fontWeight={typography.titleWeight}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {leaf.tool}
            </text>
            {isLandmark ? (
              <text
                x={cx}
                y={leafTop + 36}
                textAnchor="middle"
                fill={isSel ? 'rgba(255,255,255,0.9)' : palette.muted}
                fontSize={typography.stepSub.desktop}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {L.landmark}
              </text>
            ) : null}
            {interactive ? (
              <DiagramStepHitArea
                x={x}
                y={leafTop}
                width={LEAF_W}
                height={LEAF_H}
                radius={8}
                onActivate={() => onSelect?.(i)}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
