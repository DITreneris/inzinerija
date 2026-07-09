import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { getM12ThreeLabsLabels } from './m12ThreeLabsContent';
import type { M10Locale } from './m10DiagramContent';

const W = 640;
const H = 220;
const ARROW = DIAGRAM_TOKENS.arrow.markerLen;

export default function M12ThreeLabsDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM12ThreeLabsLabels(locale);
  const rowH = 52;
  const gap = 14;
  const x0 = 24;
  const w0 = W - 48;
  const humanFill = DIAGRAM_TONE_COLORS.amber.soft;
  const humanStroke = DIAGRAM_TONE_COLORS.amber.stroke;
  const humanText = DIAGRAM_TONE_COLORS.amber.stroke;
  let y = 40;

  const rows = [
    {
      title: L.l1,
      sub: L.l1Sub,
      hum: L.l1Human,
      fill: DIAGRAM_TONE_COLORS.brand.stroke,
    },
    {
      title: L.l2,
      sub: L.l2Sub,
      hum: L.l2Human,
      fill: DIAGRAM_TONE_COLORS.emerald.stroke,
    },
    {
      title: L.l3,
      sub: L.l3Sub,
      hum: L.l3Human,
      fill: DIAGRAM_TONE_COLORS.amber.stroke,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m12tl-conn-${uid}`}
          markerWidth={ARROW + 2}
          markerHeight={7}
          refX={ARROW}
          refY="3.5"
          orient="auto"
        >
          <path d={`M0 0 L${ARROW} 3.5 L0 7 Z`} fill={palette.brandDark} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={24}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>
      {rows.map((r, i) => {
        const yy = y;
        const mainRight = x0 + w0 * 0.72;
        const humanX = mainRight + 12;
        const humanW = w0 * 0.26;
        const midY = yy + rowH / 2;
        y += rowH + gap;
        return (
          <g key={i}>
            <rect
              x={x0}
              y={yy}
              width={w0 * 0.72}
              height={rowH}
              rx="10"
              fill={r.fill}
              stroke={palette.brandDark}
              strokeWidth="1.2"
            />
            <line
              x1={mainRight}
              y1={midY}
              x2={humanX - ARROW}
              y2={midY}
              stroke={palette.brandDark}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd={`url(#m12tl-conn-${uid})`}
            />
            <text
              x={x0 + 12}
              y={yy + 22}
              fill="white"
              fontSize="12"
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {r.title}
            </text>
            <text
              x={x0 + 12}
              y={yy + 40}
              fill="rgba(255,255,255,0.9)"
              fontSize="9"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {r.sub}
            </text>
            <rect
              x={humanX}
              y={yy}
              width={humanW}
              height={rowH}
              rx="10"
              fill={humanFill}
              stroke={humanStroke}
              strokeWidth="1.2"
            />
            <text
              x={humanX + humanW / 2}
              y={yy + rowH / 2 + 4}
              textAnchor="middle"
              fill={humanText}
              fontSize="9"
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {r.hum}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
