import { useId } from 'react';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { getM13PromptStackLabels } from './m13DiagramContent';
import type { M10Locale } from './m10DiagramContent';

const W = 320;
const H = 260;
const BOX_H = 58;
const GAP = 12;

export default function M13PromptStackDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM13PromptStackLabels(locale);
  const cx = W / 2;
  const bw = 260;
  const x0 = (W - bw) / 2;
  const tone = DIAGRAM_TONE_COLORS.brand;
  let y = 36;

  const rows = [
    { title: L.obj, sub: L.objSub },
    { title: L.ctx, sub: L.ctxSub },
    { title: L.est, sub: L.estSub },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-sm mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <linearGradient id={`pst-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone.top} />
          <stop offset="100%" stopColor={tone.bottom} />
        </linearGradient>
      </defs>
      <text
        x={cx}
        y={22}
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill={DIAGRAM_TOKENS.colors.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>
      {rows.map((r, i) => {
        const yy = y;
        y += BOX_H + GAP;
        return (
          <g key={i}>
            <rect
              x={x0}
              y={yy}
              width={bw}
              height={BOX_H}
              rx="10"
              fill={`url(#pst-${uid})`}
              stroke={tone.stroke}
              strokeWidth="1.2"
              opacity={1 - i * 0.06}
            />
            <text
              x={cx}
              y={yy + 24}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="700"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {r.title}
            </text>
            <text
              x={cx}
              y={yy + 44}
              textAnchor="middle"
              fill={DIAGRAM_TOKENS.colors.whiteText}
              fontSize="10"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {r.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
