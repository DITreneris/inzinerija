/**
 * M10 – 8 blokų spec + 5 incident žingsniai (viena diagrama).
 */
import { useId } from 'react';
import { getM10SpecIncidentLabels, type M10Locale } from './m10DiagramContent';

const W = 720;
const H = 268;
const SPEC_BOX_W = 76;
const SPEC_BOX_H = 36;
const SPEC_GAP = 8;
const SPEC_ROW1_Y = 52;
const INC_Y = 168;
const INC_W = 118;
const INC_H = 40;
const INC_GAP = 6;

export default function M10SpecIncidentDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM10SpecIncidentLabels(locale);
  const spec = L.specBlocks;
  const inc = L.incidentSteps;

  const row1X = (W - (4 * SPEC_BOX_W + 3 * SPEC_GAP)) / 2;
  const row2X = (W - (4 * SPEC_BOX_W + 3 * SPEC_GAP)) / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10si-fwd-${uid}`}
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
        fontSize="13"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.titleSpec}
      </text>

      {spec.slice(0, 4).map((label, i) => {
        const x = row1X + i * (SPEC_BOX_W + SPEC_GAP);
        return (
          <g key={`s1-${i}`}>
            <rect
              x={x}
              y={SPEC_ROW1_Y}
              width={SPEC_BOX_W}
              height={SPEC_BOX_H}
              rx="6"
              fill="#334e68"
              stroke="#102a43"
              strokeWidth="1"
            />
            <text
              x={x + SPEC_BOX_W / 2}
              y={SPEC_ROW1_Y + 23}
              textAnchor="middle"
              fill="white"
              fontSize="9"
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {label.length > 11 ? `${label.slice(0, 10)}…` : label}
            </text>
          </g>
        );
      })}

      {spec.slice(4, 8).map((label, i) => {
        const x = row2X + i * (SPEC_BOX_W + SPEC_GAP);
        const y = SPEC_ROW1_Y + SPEC_BOX_H + SPEC_GAP;
        return (
          <g key={`s2-${i}`}>
            <rect
              x={x}
              y={y}
              width={SPEC_BOX_W}
              height={SPEC_BOX_H}
              rx="6"
              fill="#486581"
              stroke="#102a43"
              strokeWidth="1"
            />
            <text
              x={x + SPEC_BOX_W / 2}
              y={y + 23}
              textAnchor="middle"
              fill="white"
              fontSize="9"
              fontWeight="700"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {label.length > 11 ? `${label.slice(0, 10)}…` : label}
            </text>
          </g>
        );
      })}

      <line
        x1={W / 2}
        y1={SPEC_ROW1_Y + SPEC_BOX_H * 2 + SPEC_GAP * 2}
        x2={W / 2}
        y2={INC_Y - 10}
        stroke="#bcccdc"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      <text
        x={W / 2}
        y={INC_Y - 18}
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill="#7a5807"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.titleIncident}
      </text>

      {(() => {
        const totalIncW = inc.length * INC_W + (inc.length - 1) * INC_GAP;
        const startX = (W - totalIncW) / 2;
        return inc.map((label, i) => {
          const x = startX + i * (INC_W + INC_GAP);
          const cx = x + INC_W / 2;
          const nextX = x + INC_W + INC_GAP;
          return (
            <g key={`inc-${i}`}>
              <rect
                x={x}
                y={INC_Y}
                width={INC_W}
                height={INC_H}
                rx="8"
                fill="#fef3c7"
                stroke="#b8860b"
                strokeWidth="1.2"
              />
              <text
                x={cx}
                y={INC_Y + 25}
                textAnchor="middle"
                fill="#713f12"
                fontSize="11"
                fontWeight="700"
                fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
              >
                {i + 1}. {label}
              </text>
              {i < inc.length - 1 && (
                <line
                  x1={x + INC_W + 2}
                  y1={INC_Y + INC_H / 2}
                  x2={nextX - 8}
                  y2={INC_Y + INC_H / 2}
                  stroke="#7B8794"
                  strokeWidth="2"
                  markerEnd={`url(#m10si-fwd-${uid})`}
                />
              )}
            </g>
          );
        });
      })()}
    </svg>
  );
}
