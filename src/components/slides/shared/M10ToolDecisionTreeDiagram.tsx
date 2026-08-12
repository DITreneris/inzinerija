/**
 * M10 – įrankių pasirinkimo medis (view). Keyboard via DiagramStepNav in Block.
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

const W = 680;
const H = 300;
const LEAF_W = 118;
const LEAF_H = 68;
const ROOT_W = 200;
const ROOT_H = 44;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW_TIP = PROCESS_ARROW.tipLen;

function splitLeafLabel(label: string): string[] {
  if (label.length <= 19) return [label];
  const words = label.split(' ');
  const target = label.length / 2;
  let bestIndex = 1;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let i = 1; i < words.length; i += 1) {
    const distance = Math.abs(words.slice(0, i).join(' ').length - target);
    if (distance < bestDistance) {
      bestIndex = i;
      bestDistance = distance;
    }
  }
  return [
    words.slice(0, bestIndex).join(' '),
    words.slice(bestIndex).join(' '),
  ];
}

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
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize={typography.title.compact}
        fontWeight={typography.titleWeight}
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
        const dim =
          interactive && selectedIndex >= 0 && !isSel
            ? DIAGRAM_TOKENS.opacity.inactive
            : DIAGRAM_TOKENS.opacity.active;
        const conditionLines = splitLeafLabel(leaf.condition);

        return (
          <g key={leaf.id} opacity={dim}>
            <path
              d={`M ${rootCx} ${rootY + ROOT_H} L ${rootCx} ${midY} L ${cx} ${midY} L ${cx} ${leafTop - ARROW_TIP}`}
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
              y={leafTop + (conditionLines.length === 1 ? 20 : 14)}
              textAnchor="middle"
              fill={isSel ? 'white' : palette.brand}
              fontSize={typography.stepSub.desktop}
              fontWeight={typography.edgeLabel.weight}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {conditionLines.map((line, lineIndex) => (
                <tspan key={line} x={cx} dy={lineIndex === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
            <text
              x={cx}
              y={leafTop + 55}
              textAnchor="middle"
              fill={isSel ? 'rgba(255,255,255,0.95)' : palette.brandDark}
              fontSize={typography.stepLabel.compact}
              fontWeight={typography.titleWeight}
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
