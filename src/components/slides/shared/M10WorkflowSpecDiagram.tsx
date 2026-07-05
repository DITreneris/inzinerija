/**
 * M10 – one-page workflow specification as an 8-block snake flow.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { getM10WorkflowSpecLabels, type M10Locale } from './m10DiagramContent';

const W = 720;
const H = 182;
const BOX_W = 110;
const BOX_H = 46;
const GAP = 24;
const ROW_1_Y = 54;
const ROW_2_Y = 118;
const START_X = (W - (4 * BOX_W + 3 * GAP)) / 2;
const ARROW = 7;

function textLines(label: string) {
  if (label.length <= 10) return [label];
  if (label === 'Condition') return ['Condi-', 'tion'];
  return [label];
}

export default function M10WorkflowSpecDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM10WorkflowSpecLabels(locale);
  const boxes = L.blocks.map((label, index) => {
    const isFirstRow = index < 4;
    const col = isFirstRow ? index : 7 - index;
    return {
      label,
      index,
      x: START_X + col * (BOX_W + GAP),
      y: isFirstRow ? ROW_1_Y : ROW_2_Y,
      fill: isFirstRow ? '#334e68' : '#486581',
    };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10-ws-arrow-${uid}`}
          markerWidth={ARROW + 1}
          markerHeight="6"
          refX={ARROW}
          refY="3"
          orient="auto"
        >
          <path d={`M0 0 L${ARROW} 3 L0 6 Z`} fill={palette.flow} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={24}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      {boxes.slice(0, -1).map((box, index) => {
        const next = boxes[index + 1];
        const isVertical = box.x === next.x;
        return (
          <line
            key={`${box.label}-${next.label}`}
            x1={
              isVertical
                ? box.x + BOX_W / 2
                : box.x + (box.x < next.x ? BOX_W : 0)
            }
            y1={isVertical ? box.y + BOX_H : box.y + BOX_H / 2}
            x2={
              isVertical
                ? next.x + BOX_W / 2
                : next.x + (box.x < next.x ? 0 : BOX_W)
            }
            y2={isVertical ? next.y : next.y + BOX_H / 2}
            stroke={palette.flow}
            strokeWidth="2"
            markerEnd={`url(#m10-ws-arrow-${uid})`}
          />
        );
      })}

      {boxes.map((box) => {
        const lines = textLines(box.label);
        return (
          <g key={box.label}>
            <rect
              x={box.x}
              y={box.y}
              width={BOX_W}
              height={BOX_H}
              rx="9"
              fill={box.fill}
              stroke={palette.brandDark}
              strokeWidth="1"
            />
            <text
              x={box.x + 12}
              y={box.y + 19}
              fill="rgba(255,255,255,0.9)"
              fontSize="9"
              fontWeight="700"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {box.index + 1}
            </text>
            <text
              x={box.x + BOX_W / 2}
              y={box.y + (lines.length === 1 ? 29 : 22)}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="800"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {lines.map((line, lineIndex) => (
                <tspan
                  key={line}
                  x={box.x + BOX_W / 2}
                  dy={lineIndex === 0 ? 0 : 13}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
