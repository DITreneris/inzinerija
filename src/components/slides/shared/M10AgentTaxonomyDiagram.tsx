/**
 * M10 – Agent taxonomy (dual-taxonomy P4–P6): ghost hard, staged edge pills, hand anchors.
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_ROLE_COLORS, DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { getM10AgentTaxonomyLabels, type M10Locale } from './m10DiagramContent';
import {
  estimatePillSize,
  getCircleEdgePoints,
  getEdgePillAnchor,
  getFeedbackReturnPath,
  getL2ToCoordinatorLink,
  getLadderBars,
  getRoleNode,
  getTaxonomyStepId,
  getTaxonomyStepIndex,
  isHubLive,
  isRoleStep,
  M10_TAXONOMY_EDGES,
  M10_TAXONOMY_HUB_GHOST_OPACITY,
  M10_TAXONOMY_LADDER,
  M10_TAXONOMY_LADDER_INACTIVE_OPACITY,
  M10_TAXONOMY_NODE_STROKE,
  M10_TAXONOMY_RIGHT,
  M10_TAXONOMY_ROLE_FILLS,
  M10_TAXONOMY_ROLES,
  M10_TAXONOMY_VIEWBOX,
  mixHexToward,
  roleHitBox,
  roleLabelLines,
  shouldShowEdgePill,
  type M10TaxonomyRoleNode,
  type M10TaxonomyStepId,
} from './m10TaxonomyLayout';

const LEVEL_FILLS = {
  brand: DIAGRAM_ROLE_COLORS.brand,
  slate: DIAGRAM_ROLE_COLORS.slate,
  teal: DIAGRAM_ROLE_COLORS.teal,
  violet: DIAGRAM_ROLE_COLORS.violet,
} as const;

function roleFillFor(role: M10TaxonomyRoleNode): string {
  if (role.roleFill === 'coordinator')
    return M10_TAXONOMY_ROLE_FILLS.coordinator;
  return M10_TAXONOMY_ROLE_FILLS.base;
}

function roleStrokeFor(
  role: M10TaxonomyRoleNode,
  brandDark: string,
  isActive: boolean
): { color: string; width: number } {
  const width = isActive
    ? M10_TAXONOMY_NODE_STROKE.active
    : M10_TAXONOMY_NODE_STROKE.inactive;
  if (role.id === 'evaluator') {
    return { color: M10_TAXONOMY_ROLE_FILLS.evaluatorRing, width };
  }
  return { color: brandDark, width };
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

function edgeLabelFor(
  key: (typeof M10_TAXONOMY_EDGES)[number]['labelKey'],
  labels: ReturnType<typeof getM10AgentTaxonomyLabels>
) {
  if (key === 'routes') return labels.edgeRoutes;
  if (key === 'delegates') return labels.edgeDelegates;
  if (key === 'delivers') return labels.edgeDelivers;
  return labels.edgeReturns;
}

function levelOpacity(stepId: M10TaxonomyStepId, current: M10TaxonomyStepId) {
  if (current === stepId) return DIAGRAM_TOKENS.opacity.active;
  if (isRoleStep(current) && stepId === 'L2') return 0.75;
  return M10_TAXONOMY_LADDER_INACTIVE_OPACITY;
}

function roleNodeOpacity(
  stepId: M10TaxonomyStepId,
  current: M10TaxonomyStepId,
  hubLive: boolean
) {
  if (!hubLive) return 1;
  if (current === 'L2') return DIAGRAM_TOKENS.opacity.active;
  if (current === stepId) return DIAGRAM_TOKENS.opacity.active;
  if (isRoleStep(current)) return 0.58;
  return 1;
}

function EdgePill({
  x,
  y,
  label,
  fill,
  stroke,
  textFill,
}: {
  x: number;
  y: number;
  label: string;
  fill: string;
  stroke: string;
  textFill: string;
}) {
  const { w, h } = estimatePillSize(label);
  return (
    <g aria-hidden>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={6}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
        fontWeight={DIAGRAM_TOKENS.typography.edgeLabel.weight}
        fill={textFill}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {label}
      </text>
    </g>
  );
}

export default function M10AgentTaxonomyDiagram({
  locale = 'lt',
  className = '',
  currentStep = 0,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM10AgentTaxonomyLabels(locale);
  const isInteractive = typeof onStepClick === 'function';
  const currentId = getTaxonomyStepId(currentStep);
  const hubLive = isHubLive(currentId);
  const typography = DIAGRAM_TOKENS.typography;
  const pillFill = palette.bgEnd;
  const pillStroke = palette.border;
  const pillText = palette.brandDark;
  const bgMix = palette.bgEnd.startsWith('#') ? palette.bgEnd : '#e2e8f0';

  const levels = [
    { id: 'L0' as const, label: L.l0, sub: L.l0Sub },
    { id: 'L1' as const, label: L.l1, sub: L.l1Sub },
    { id: 'L2' as const, label: L.l2, sub: L.l2Sub },
    { id: 'L3' as const, label: L.l3, sub: L.l3Sub },
  ];

  const bars = getLadderBars().map((bar, index) => ({
    ...bar,
    ...levels[index],
  }));

  const l2Link = getL2ToCoordinatorLink(DIAGRAM_TOKENS.arrow.markerLen);
  const feedback = getFeedbackReturnPath(
    getRoleNode('evaluator'),
    getRoleNode('coordinator'),
    DIAGRAM_TOKENS.arrow.markerLen
  );
  const rolesCaption = hubLive ? L.rolesTitle : L.rolesTitleGhost;

  return (
    <svg
      viewBox={`0 0 ${M10_TAXONOMY_VIEWBOX.width} ${M10_TAXONOMY_VIEWBOX.height}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${L.aria}${isInteractive ? ` ${L.hint}` : ''}`}
    >
      <defs>
        <linearGradient
          id={`m10-tax-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m10-tax-flow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY="3"
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={palette.flow} />
        </marker>
        <marker
          id={`m10-tax-l2-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={DIAGRAM_ROLE_COLORS.violet}
          />
        </marker>
        <marker
          id={`m10-tax-feedback-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={DIAGRAM_TOKENS.arrow.markerLen}
          refY="3"
          orient="auto"
        >
          <path
            d={DIAGRAM_TOKENS.arrow.markerPath}
            fill={M10_TAXONOMY_ROLE_FILLS.evaluatorRing}
          />
        </marker>
      </defs>

      <rect
        width={M10_TAXONOMY_VIEWBOX.width}
        height={M10_TAXONOMY_VIEWBOX.height}
        fill={`url(#m10-tax-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={M10_TAXONOMY_VIEWBOX.width}
        height={M10_TAXONOMY_VIEWBOX.height}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={M10_TAXONOMY_VIEWBOX.width / 2}
        y={36}
        textAnchor="middle"
        fontSize={typography.title.desktop}
        fontWeight={typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      <text
        x={M10_TAXONOMY_LADDER.x + M10_TAXONOMY_LADDER.width / 2}
        y={M10_TAXONOMY_LADDER.captionY}
        textAnchor="middle"
        fontSize={typography.rolesHub.subtitle.desktop}
        fontWeight={700}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.ladderTitle}
      </text>

      <text
        x={M10_TAXONOMY_RIGHT.x + M10_TAXONOMY_RIGHT.width / 2}
        y={M10_TAXONOMY_RIGHT.captionY}
        textAnchor="middle"
        fontSize={typography.rolesHub.subtitle.desktop}
        fontWeight={700}
        fill={hubLive ? palette.brandDark : palette.muted}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {rolesCaption}
      </text>

      {bars.map((b) => {
        const stepIndex = getTaxonomyStepIndex(b.id);
        const isActive = currentId === b.id;
        const opacity = levelOpacity(b.id, currentId);
        const rawFill = LEVEL_FILLS[b.tone];
        const fill = isActive ? rawFill : mixHexToward(rawFill, bgMix, 0.55);
        return (
          <g key={b.id}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={b.x}
                y={b.y}
                width={b.width}
                height={b.height}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={fill}
                stroke={palette.brandDark}
                strokeWidth={
                  isActive
                    ? M10_TAXONOMY_NODE_STROKE.active
                    : M10_TAXONOMY_NODE_STROKE.inactive
                }
              />
              <text
                x={b.x + 12}
                y={b.y + 18}
                fill={palette.whiteText}
                fontSize={typography.rolesHub.label.compact}
                fontWeight={700}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {b.label}
              </text>
              <text
                x={b.x + 12}
                y={b.y + b.height - 10}
                fill={palette.whiteText}
                fontSize={typography.rolesHub.sub.compact}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {b.sub}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={b.x}
                y={b.y}
                width={b.width}
                height={Math.max(44, b.height)}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(stepIndex)}
              />
            )}
          </g>
        );
      })}

      {/* Hub: when !hubLive – silhouettes only (no edges/pills/L2 bridge). */}
      <g
        opacity={hubLive ? 1 : M10_TAXONOMY_HUB_GHOST_OPACITY}
        style={{ transition: 'opacity 0.2s ease' }}
      >
        {hubLive && (
          <g aria-hidden>
            <line
              x1={l2Link.x1}
              y1={l2Link.y1}
              x2={l2Link.x2}
              y2={l2Link.y2}
              stroke={DIAGRAM_ROLE_COLORS.violet}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              markerEnd={`url(#m10-tax-l2-${uid})`}
            />
            <EdgePill
              x={l2Link.label.x}
              y={l2Link.label.y}
              label={L.edgeSelectedLevel}
              fill={pillFill}
              stroke={DIAGRAM_ROLE_COLORS.violet}
              textFill={pillText}
            />

            {M10_TAXONOMY_EDGES.map((edge) => {
              const showPill = shouldShowEdgePill(currentId, edge.id);
              if (edge.tone === 'feedback') {
                return (
                  <g key={edge.id}>
                    <path
                      d={feedback.d}
                      fill="none"
                      stroke={palette.flow}
                      strokeWidth={DIAGRAM_TOKENS.stroke.feedback}
                      strokeDasharray="6 4"
                      markerEnd={`url(#m10-tax-feedback-${uid})`}
                    />
                    {showPill && (
                      <EdgePill
                        x={feedback.label.x}
                        y={feedback.label.y}
                        label={edgeLabelFor(edge.labelKey, L)}
                        fill={pillFill}
                        stroke={M10_TAXONOMY_ROLE_FILLS.evaluatorRing}
                        textFill={pillText}
                      />
                    )}
                  </g>
                );
              }
              const from = getRoleNode(edge.from);
              const to = getRoleNode(edge.to);
              const points = getCircleEdgePoints(
                from,
                to,
                DIAGRAM_TOKENS.arrow.markerLen
              );
              const labelAt = getEdgePillAnchor(edge);
              return (
                <g key={edge.id}>
                  <line
                    {...points}
                    stroke={palette.flow}
                    strokeWidth={DIAGRAM_TOKENS.stroke.flow}
                    markerEnd={`url(#m10-tax-flow-${uid})`}
                  />
                  {showPill && (
                    <EdgePill
                      x={labelAt.x}
                      y={labelAt.y}
                      label={edgeLabelFor(edge.labelKey, L)}
                      fill={pillFill}
                      stroke={pillStroke}
                      textFill={pillText}
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}

        {M10_TAXONOMY_ROLES.map((role) => {
          const stepIndex = getTaxonomyStepIndex(role.id);
          const isActive =
            hubLive && (currentId === role.id || currentId === 'L2');
          const opacity = roleNodeOpacity(role.id, currentId, hubLive);
          const lines = roleLabelLines(
            role.id,
            roleLabelFor(role, L),
            locale === 'en' ? 'en' : 'lt'
          );
          const hit = roleHitBox(role);
          const stroke = roleStrokeFor(role, palette.brandDark, isActive);
          return (
            <g key={role.id}>
              <g
                opacity={opacity}
                style={{ transition: 'opacity 0.2s ease' }}
                aria-hidden
              >
                <circle
                  cx={role.x}
                  cy={role.y}
                  r={role.r}
                  fill={roleFillFor(role)}
                  stroke={stroke.color}
                  strokeWidth={stroke.width}
                />
                <text
                  x={role.x}
                  y={role.y - (lines.length - 1) * 6 + 4}
                  textAnchor="middle"
                  fill={palette.whiteText}
                  fontSize={typography.rolesHub.label.compact}
                  fontWeight={700}
                  fontFamily={DIAGRAM_TOKENS.font}
                >
                  {lines.map((line, index) => (
                    <tspan key={line} x={role.x} dy={index === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
              {isInteractive && (
                <DiagramStepHitArea
                  x={hit.x}
                  y={hit.y}
                  width={hit.width}
                  height={hit.height}
                  radius={hit.width / 2}
                  onActivate={() => onStepClick?.(stepIndex)}
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
