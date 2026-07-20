/**
 * M10 – įrankių pasirinkimo medis (view). Keyboard via DiagramStepNav in Block.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import { DIAGRAM_TOKENS } from './diagramTokens';
import {
  getM10ToolTreeLeaves,
  getM10ToolTreeLabels,
  type M10Locale,
} from './m10DiagramContent';

const W = 680;
const H = 300;
const LEAF_W = 118;
const LEAF_H = 56;
const ROOT_W = 200;
const ROOT_H = 44;

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
  const L = getM10ToolTreeLabels(locale);
  const leaves = getM10ToolTreeLeaves(locale);
  const interactive = typeof onSelect === 'function';
  const rootCx = W / 2;
  const rootY = 36;
  const rowY = 200;
  const gap = 12;
  const totalW = leaves.length * LEAF_W + (leaves.length - 1) * gap;
  const startX = (W - totalW) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10tree-arr-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY="3"
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={palette.flow} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
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
        y={rootY + 28}
        textAnchor="middle"
        fill="white"
        fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop + 1}
        fontWeight="700"
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
        const dim = interactive && selectedIndex >= 0 && !isSel ? 0.42 : 1;

        return (
          <g key={leaf.id} opacity={dim}>
            <path
              d={`M ${rootCx} ${rootY + ROOT_H} L ${rootCx} ${midY} L ${cx} ${midY} L ${cx} ${leafTop}`}
              fill="none"
              stroke={palette.flow}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              markerEnd={`url(#m10tree-arr-${uid})`}
            />
            <rect
              x={x}
              y={leafTop}
              width={LEAF_W}
              height={LEAF_H}
              rx="8"
              fill={isSel ? palette.brandTop : palette.bgStart}
              stroke={isSel ? palette.brandDark : palette.border}
              strokeWidth={isSel ? 2 : 1}
            />
            <text
              x={cx}
              y={leafTop + 18}
              textAnchor="middle"
              fill={isSel ? 'white' : palette.brand}
              fontSize="9"
              fontWeight="600"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {leaf.condition.length > 22
                ? `${leaf.condition.slice(0, 20)}…`
                : leaf.condition}
            </text>
            <text
              x={cx}
              y={leafTop + 40}
              textAnchor="middle"
              fill={isSel ? 'rgba(255,255,255,0.95)' : palette.brandDark}
              fontSize="11"
              fontWeight="800"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {leaf.tool}
            </text>
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
