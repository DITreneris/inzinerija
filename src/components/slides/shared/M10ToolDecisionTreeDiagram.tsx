/**
 * M10 – įrankių pasirinkimo medis (interaktyvus).
 */
import { useId } from 'react';
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
          markerWidth="7"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 Z" fill="#7B8794" />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>
      <rect
        x={rootCx - ROOT_W / 2}
        y={rootY}
        width={ROOT_W}
        height={ROOT_H}
        rx="10"
        fill="#334e68"
        stroke="#102a43"
        strokeWidth="1.2"
      />
      <text
        x={rootCx}
        y={rootY + 28}
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
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
              stroke="#7B8794"
              strokeWidth="2"
              markerEnd={`url(#m10tree-arr-${uid})`}
            />
            <rect
              x={x}
              y={leafTop}
              width={LEAF_W}
              height={LEAF_H}
              rx="8"
              fill={isSel ? '#486581' : '#f0f4f8'}
              stroke={isSel ? '#102a43' : '#bcccdc'}
              strokeWidth={isSel ? 2 : 1}
            />
            <text
              x={cx}
              y={leafTop + 18}
              textAnchor="middle"
              fill={isSel ? 'white' : '#334e68'}
              fontSize="9"
              fontWeight="600"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {leaf.condition.length > 22
                ? `${leaf.condition.slice(0, 20)}…`
                : leaf.condition}
            </text>
            <text
              x={cx}
              y={leafTop + 40}
              textAnchor="middle"
              fill={isSel ? 'rgba(255,255,255,0.95)' : '#102a43'}
              fontSize="11"
              fontWeight="800"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {leaf.tool}
            </text>
            {interactive && (
              <rect
                x={x}
                y={leafTop}
                width={LEAF_W}
                height={LEAF_H}
                fill="transparent"
                cursor="pointer"
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                aria-label={`${leaf.condition} → ${leaf.tool}`}
                onClick={() => onSelect?.(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect?.(i);
                  }
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
