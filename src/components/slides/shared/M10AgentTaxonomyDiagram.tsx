/**
 * M10 – Agent taxonomy: L0–L3 depth ladder + multi-agent roles.
 */
import { useId } from 'react';
import { getM10AgentTaxonomyLabels, type M10Locale } from './m10DiagramContent';

const W = 520;
const H = 300;

export default function M10AgentTaxonomyDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM10AgentTaxonomyLabels(locale);

  const ladderX = 24;
  const ladderW = 200;
  const rolesX = 280;
  const baseY = 260;

  const levels = [
    { id: 'L0', h: 36, fill: '#94a3b8', label: L.l0, sub: L.l0Sub },
    { id: 'L1', h: 52, fill: '#0d9488', label: L.l1, sub: L.l1Sub },
    { id: 'L2', h: 68, fill: '#7c3aed', label: L.l2, sub: L.l2Sub },
    { id: 'L3', h: 84, fill: '#334e68', label: L.l3, sub: L.l3Sub },
  ];

  let stackY = baseY;
  const bars = levels.map((lv) => {
    stackY -= lv.h + 6;
    return { ...lv, y: stackY };
  });

  const cx = rolesX + 110;
  const cy = 150;
  const roleR = 36;

  const roles = [
    { key: 'router', label: L.router, x: cx, y: 72, fill: '#64748b' },
    { key: 'coord', label: L.coordinator, x: cx, y: cy, fill: '#7c3aed' },
    {
      key: 'spec',
      label: L.specialist,
      x: cx - 72,
      y: cy + 72,
      fill: '#0d9488',
    },
    {
      key: 'eval',
      label: L.evaluator,
      x: cx + 72,
      y: cy + 72,
      fill: '#b8860b',
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-lg mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="#102a43"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>

      <text
        x={ladderX + ladderW / 2}
        y={44}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#486581"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.ladderTitle}
      </text>
      {bars.map((b) => (
        <g key={b.id}>
          <rect
            x={ladderX}
            y={b.y}
            width={ladderW}
            height={b.h}
            rx="6"
            fill={b.fill}
            stroke="#102a43"
            strokeWidth="0.75"
          />
          <text
            x={ladderX + 10}
            y={b.y + 16}
            fill="white"
            fontSize="10"
            fontWeight="700"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
          >
            {b.label}
          </text>
          {b.h >= 44 && (
            <text
              x={ladderX + 10}
              y={b.y + b.h - 8}
              fill="rgba(255,255,255,0.9)"
              fontSize="8.5"
              fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
            >
              {b.sub}
            </text>
          )}
        </g>
      ))}

      <text
        x={rolesX + 110}
        y={44}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#486581"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.rolesTitle}
      </text>

      <line
        x1={roles[0].x}
        y1={roles[0].y + roleR}
        x2={roles[1].x}
        y2={roles[1].y - roleR}
        stroke="#64748b"
        strokeWidth="1.5"
        markerEnd={`url(#m10-tax-arrow-${uid})`}
      />
      <line
        x1={roles[1].x}
        y1={roles[1].y + roleR}
        x2={roles[2].x}
        y2={roles[2].y - roleR}
        stroke="#64748b"
        strokeWidth="1.5"
      />
      <line
        x1={roles[1].x}
        y1={roles[1].y + roleR}
        x2={roles[3].x}
        y2={roles[3].y - roleR}
        stroke="#64748b"
        strokeWidth="1.5"
      />
      <line
        x1={roles[3].x}
        y1={roles[3].y - roleR}
        x2={roles[1].x + roleR * 0.6}
        y2={roles[1].y}
        stroke="#b8860b"
        strokeWidth="1.25"
        strokeDasharray="4 3"
      />

      <defs>
        <marker
          id={`m10-tax-arrow-${uid}`}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      {roles.map((r) => (
        <g key={r.key}>
          <circle
            cx={r.x}
            cy={r.y}
            r={roleR}
            fill={r.fill}
            stroke="#102a43"
            strokeWidth="0.75"
          />
          <text
            x={r.x}
            y={r.y + 4}
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="700"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
          >
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
