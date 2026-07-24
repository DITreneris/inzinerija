import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, getDiagramToneColors } from './diagramTokens';
import { getProcessArrowMarkerGeom } from './processArrowMarker';
import { getM12ThreeLabsLabels } from './m12ThreeLabsContent';
import type { M10Locale } from './m10DiagramContent';
import { M12_THREE_LABS_LAYOUT } from './m12ThreeLabsLayout';

const W = M12_THREE_LABS_LAYOUT.width;
const H = M12_THREE_LABS_LAYOUT.height;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const ARROW = PROCESS_ARROW.tipLen;

export default function M12ThreeLabsDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const tones = getDiagramToneColors(isDarkPalette);
  const L = getM12ThreeLabsLabels(locale);
  const rowH = M12_THREE_LABS_LAYOUT.rowH;
  const gap = M12_THREE_LABS_LAYOUT.gap;
  const x0 = 24;
  const w0 = W - 48;
  const humanFill = tones.amber.soft;
  const humanStroke = tones.amber.stroke;
  const humanText = tones.amber.stroke;
  let y = 40;

  const rows = [
    {
      title: L.l1,
      sub: L.l1Sub,
      hum: L.l1Human,
      fill: tones.brand.stroke,
    },
    {
      title: L.l2,
      sub: L.l2Sub,
      hum: L.l2Human,
      fill: tones.emerald.stroke,
    },
    {
      title: L.l3,
      sub: L.l3Sub,
      hum: L.l3Human,
      fill: tones.amber.stroke,
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
        <linearGradient id={`m12tl-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m12tl-conn-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={palette.brandDark} />
        </marker>
      </defs>
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        rx="12"
        fill={`url(#m12tl-bg-${uid})`}
      />
      <text
        x={W / 2}
        y={24}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
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
