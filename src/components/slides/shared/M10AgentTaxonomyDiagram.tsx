/**
 * M10 – Agent taxonomy: L0–L3 depth ladder + multi-agent roles.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_ROLE_COLORS, DIAGRAM_TOKENS } from './diagramTokens';
import { getM10AgentTaxonomyLabels, type M10Locale } from './m10DiagramContent';
import {
  getCircleEdgePoints,
  getRoleNode,
  M10_TAXONOMY_EDGES,
  M10_TAXONOMY_LADDER,
  M10_TAXONOMY_LEVELS,
  M10_TAXONOMY_ROLES,
  M10_TAXONOMY_VIEWBOX,
  type M10TaxonomyRoleNode,
} from './m10TaxonomyLayout';

const LEVEL_FILLS = {
  brand: DIAGRAM_ROLE_COLORS.brand,
  slate: DIAGRAM_ROLE_COLORS.slate,
  teal: DIAGRAM_ROLE_COLORS.teal,
  violet: DIAGRAM_ROLE_COLORS.violet,
} as const;

const ROLE_FILLS = {
  slate: DIAGRAM_ROLE_COLORS.slate,
  teal: DIAGRAM_ROLE_COLORS.teal,
  violet: DIAGRAM_ROLE_COLORS.violet,
  amber: DIAGRAM_ROLE_COLORS.amber,
} as const;

function roleLabelLines(label: string) {
  if (label.length <= 12) return [label];
  const midpoint = Math.ceil(label.length / 2);
  return [label.slice(0, midpoint), label.slice(midpoint)];
}

function roleLabelFor(
  role: M10TaxonomyRoleNode,
  labels: ReturnType<typeof getM10AgentTaxonomyLabels>
) {
  if (role.id === 'router') return labels.router;
  if (role.id === 'coordinator') return labels.coordinator;
  if (role.id === 'specialist') return labels.specialist;
  return labels.evaluator;
}

export default function M10AgentTaxonomyDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM10AgentTaxonomyLabels(locale);

  const levels = [
    { id: 'L0', label: L.l0, sub: L.l0Sub },
    { id: 'L1', label: L.l1, sub: L.l1Sub },
    { id: 'L2', label: L.l2, sub: L.l2Sub },
    { id: 'L3', label: L.l3, sub: L.l3Sub },
  ];

  let stackY = M10_TAXONOMY_LADDER.baseY;
  const bars = M10_TAXONOMY_LEVELS.map((lv, index) => {
    stackY -= lv.height + M10_TAXONOMY_LADDER.gap;
    return {
      ...lv,
      ...levels[index],
      y: stackY,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${M10_TAXONOMY_VIEWBOX.width} ${M10_TAXONOMY_VIEWBOX.height}`}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10-tax-flow-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY="3"
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={palette.flow} />
        </marker>
        <marker
          id={`m10-tax-feedback-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={DIAGRAM_ROLE_COLORS.amber}
          />
        </marker>
      </defs>
      <text
        x={M10_TAXONOMY_VIEWBOX.width / 2}
        y={24}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact}
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      <text
        x={M10_TAXONOMY_LADDER.x + M10_TAXONOMY_LADDER.width / 2}
        y={48}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.ladderTitle}
      </text>
      {bars.map((b) => (
        <g key={b.id}>
          <rect
            x={M10_TAXONOMY_LADDER.x}
            y={b.y}
            width={M10_TAXONOMY_LADDER.width}
            height={b.height}
            rx="6"
            fill={LEVEL_FILLS[b.tone]}
            stroke={palette.brandDark}
            strokeWidth="0.75"
          />
          <text
            x={M10_TAXONOMY_LADDER.x + 12}
            y={b.y + 16}
            fill="white"
            fontSize="10"
            fontWeight="700"
            fontFamily={DIAGRAM_TOKENS.font}
          >
            {b.label}
          </text>
          {b.height >= 44 && (
            <text
              x={M10_TAXONOMY_LADDER.x + 12}
              y={b.y + b.height - 8}
              fill="rgba(255,255,255,0.9)"
              fontSize="8.5"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {b.sub}
            </text>
          )}
        </g>
      ))}

      <text
        x={410}
        y={48}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.rolesTitle}
      </text>

      {M10_TAXONOMY_EDGES.map((edge) => {
        const from = getRoleNode(edge.from);
        const to = getRoleNode(edge.to);
        const points = getCircleEdgePoints(
          from,
          to,
          DIAGRAM_TOKENS.arrow.markerLen
        );
        const color =
          edge.tone === 'feedback' ? DIAGRAM_ROLE_COLORS.amber : palette.flow;
        return (
          <line
            key={edge.id}
            {...points}
            stroke={color}
            strokeWidth={edge.tone === 'feedback' ? 1.5 : 1.75}
            strokeDasharray={edge.dashed ? '4 3' : undefined}
            markerEnd={`url(#${
              edge.tone === 'feedback'
                ? `m10-tax-feedback-${uid}`
                : `m10-tax-flow-${uid}`
            })`}
          />
        );
      })}

      {M10_TAXONOMY_ROLES.map((role) => {
        const lines = roleLabelLines(roleLabelFor(role, L));
        return (
          <g key={role.id}>
            <circle
              cx={role.x}
              cy={role.y}
              r={role.r}
              fill={ROLE_FILLS[role.tone]}
              stroke={palette.brandDark}
              strokeWidth="0.75"
            />
            <text
              x={role.x}
              y={role.y - (lines.length - 1) * 6 + 4}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="700"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {lines.map((line, index) => (
                <tspan key={line} x={role.x} dy={index === 0 ? 0 : 12}>
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
