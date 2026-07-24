/**
 * M10 10.45 – mini depth illustration (static SVG inside lab; no Shell).
 * Role strip: boxes + clear shafts only (no mid-gutter edge verbs – they collide).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import {
  getProcessArrowMarkerGeom,
  processArrowEndInset,
} from './processArrowMarker';
import {
  getDepthOptions,
  getDepthRolesUiLabels,
  type DepthOptionCopy,
} from './m10DepthRolesContent';
import type { M10Locale } from './m10DiagramContent';
import type { DepthId } from './m10DepthRolesModel';
import {
  getDepthPillRow,
  getDiagramHeight,
  getRoleStripBoxes,
  getRoleStripConnectors,
  getRouterBox,
  M10_DEPTH_PILL,
  M10_DEPTH_ROLE_BOX,
  M10_DEPTH_ROLES_VIEWBOX,
} from './m10DepthRolesLayout';

/** LMS process tip SOT – same as Waves A–E (tip≥10, refX=0). */
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const TIP_INSET = processArrowEndInset(PROCESS_ARROW.tipLen);

export default function M10DepthRolesMiniDiagram({
  locale = 'lt',
  depth = null,
  includeRouter = false,
  onDepthSelect,
  className = '',
}: {
  locale?: M10Locale;
  depth?: DepthId | null;
  includeRouter?: boolean;
  onDepthSelect?: (id: DepthId) => void;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const ui = getDepthRolesUiLabels(locale);
  const options = getDepthOptions(locale);
  const byId = Object.fromEntries(options.map((o) => [o.id, o])) as Record<
    DepthId,
    DepthOptionCopy
  >;
  const showRoles = depth === 'team';
  const height = getDiagramHeight(showRoles);
  const pills = getDepthPillRow();
  const roles = getRoleStripBoxes();
  const connectors = getRoleStripConnectors(TIP_INSET);
  const router = getRouterBox();
  const interactive = typeof onDepthSelect === 'function';
  const typography = DIAGRAM_TOKENS.typography;

  return (
    <svg
      viewBox={`0 0 ${M10_DEPTH_ROLES_VIEWBOX.width} ${height}`}
      className={`mx-auto block w-full max-w-3xl ${className}`}
      role="img"
      aria-label={ui.regionAria}
    >
      <defs>
        <linearGradient
          id={`m10-depth-bg-${uid}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`m10-depth-flow-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path
            d={PROCESS_ARROW.pathD}
            fill={palette.flow}
            stroke={palette.flow}
          />
        </marker>
      </defs>

      <rect
        width={M10_DEPTH_ROLES_VIEWBOX.width}
        height={height}
        fill={`url(#m10-depth-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={M10_DEPTH_ROLES_VIEWBOX.width}
        height={height}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={M10_DEPTH_ROLES_VIEWBOX.width / 2}
        y={28}
        textAnchor="middle"
        fontSize={typography.title.desktop}
        fontWeight={typography.titleWeight}
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {ui.diagramTitle}
      </text>

      {pills.map((pill) => {
        const opt = byId[pill.id];
        const active = depth === pill.id;
        const opacity = active
          ? DIAGRAM_TOKENS.opacity.active
          : Math.max(DIAGRAM_TOKENS.opacity.inactive, 0.88);
        return (
          <g key={pill.id}>
            <g opacity={opacity} aria-hidden>
              <rect
                x={pill.x}
                y={pill.y}
                width={pill.width}
                height={pill.height}
                rx={M10_DEPTH_PILL.radius}
                fill={active ? palette.brand : palette.bgEnd}
                stroke={active ? palette.brandDark : palette.border}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <text
                x={pill.x + pill.width / 2}
                y={pill.y + 22}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill={active ? palette.whiteText : palette.brandDark}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {opt.label}
              </text>
              <text
                x={pill.x + pill.width / 2}
                y={pill.y + 40}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={active ? palette.whiteText : palette.muted}
                fontFamily={DIAGRAM_TOKENS.font}
                opacity={active ? 0.9 : 0.85}
              >
                {opt.code}
              </text>
            </g>
            {interactive && (
              <DiagramStepHitArea
                x={pill.x}
                y={pill.y}
                width={pill.width}
                height={Math.max(44, pill.height)}
                radius={M10_DEPTH_PILL.radius}
                onActivate={() => onDepthSelect?.(pill.id)}
              />
            )}
          </g>
        );
      })}

      {showRoles && (
        <g aria-hidden>
          <text
            x={M10_DEPTH_ROLES_VIEWBOX.width / 2}
            y={168}
            textAnchor="middle"
            fontSize={typography.rolesHub.subtitle.desktop}
            fontWeight={700}
            fill={palette.brandDark}
            fontFamily={DIAGRAM_TOKENS.font}
          >
            {ui.rolesStripTitle}
          </text>

          {/* Connectors under boxes so tips never paint over labels. */}
          {includeRouter && (
            <line
              x1={router.x + router.width / 2}
              y1={router.y + router.height}
              x2={roles[0].x + roles[0].width / 2}
              y2={roles[0].y - TIP_INSET}
              stroke={palette.flow}
              strokeWidth={2}
              strokeDasharray="4 3"
              markerEnd={`url(#m10-depth-flow-${uid})`}
            />
          )}
          {connectors.map((c, i) => (
            <line
              key={`role-edge-${i}`}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke={palette.flow}
              strokeWidth={DIAGRAM_TOKENS.stroke.flow}
              markerEnd={`url(#m10-depth-flow-${uid})`}
            />
          ))}

          {includeRouter && (
            <>
              <rect
                x={router.x}
                y={router.y}
                width={router.width}
                height={router.height}
                rx={M10_DEPTH_ROLE_BOX.radius}
                fill={palette.bgEnd}
                stroke={palette.border}
                strokeWidth={1.5}
                strokeDasharray="5 3"
              />
              <text
                x={router.x + router.width / 2}
                y={router.y + 25}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={palette.muted}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {ui.roleRouter}
              </text>
            </>
          )}

          {roles.map((box) => {
            const label =
              box.id === 'coordinator'
                ? ui.roleCoordinator
                : box.id === 'specialist'
                  ? ui.roleSpecialist
                  : ui.roleEvaluator;
            return (
              <g key={box.id}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  rx={M10_DEPTH_ROLE_BOX.radius}
                  fill={palette.brand}
                  stroke={palette.brandDark}
                  strokeWidth={1.5}
                />
                <text
                  x={box.x + box.width / 2}
                  y={box.y + 25}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill={palette.whiteText}
                  fontFamily={DIAGRAM_TOKENS.font}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
