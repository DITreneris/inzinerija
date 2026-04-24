import { getM12ThreeLabsLabels } from './m12ThreeLabsContent';
import type { M10Locale } from './m10DiagramContent';

const W = 640;
const H = 220;

export default function M12ThreeLabsDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const L = getM12ThreeLabsLabels(locale);
  const rowH = 52;
  const gap = 14;
  const x0 = 24;
  const w0 = W - 48;
  let y = 40;

  const rows = [
    { title: L.l1, sub: L.l1Sub, hum: L.l1Human, fill: '#334e68' },
    { title: L.l2, sub: L.l2Sub, hum: L.l2Human, fill: '#0d9488' },
    { title: L.l3, sub: L.l3Sub, hum: L.l3Human, fill: '#b8860b' },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <text
        x={W / 2}
        y={24}
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>
      {rows.map((r, i) => {
        const yy = y;
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
              stroke="#102a43"
              strokeWidth="1.2"
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
              x={x0 + w0 * 0.72 + 8}
              y={yy}
              width={w0 * 0.26}
              height={rowH}
              rx="10"
              fill="#fef3c7"
              stroke="#b8860b"
              strokeWidth="1"
            />
            <text
              x={x0 + w0 * 0.72 + 8 + (w0 * 0.26) / 2}
              y={yy + rowH / 2 + 4}
              textAnchor="middle"
              fill="#713f12"
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
