/**
 * M10 – Trigger → Condition → Action; internetinis pranešimas = Trigger tipas
 * (ne 4-asis Shell žingsnis). Section H1 owns the title (no SVG caption).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import {
  DIAGRAM_TOKENS,
  getDiagramActiveStroke,
  getDiagramToneColors,
} from './diagramTokens';
import { getM10TriggerFlowLabels, type M10Locale } from './m10DiagramContent';
import {
  M10_TRIGGER_FLOW_LAYOUT,
  m10TriggerShaftX,
} from './m10TriggerFlowLayout';
import { DiagramStepHitArea } from './diagramKit';
import { getProcessArrowMarkerGeom } from './processArrowMarker';

const {
  width: W,
  height: H,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  yMain: Y_MAIN,
  x0: X0,
  typeChipW: CHIP_W,
  typeChipH: CHIP_H,
  typeChipGap: CHIP_GAP,
  typeRowY: TYPE_ROW_Y,
  typesLabelY: TYPES_LABEL_Y,
  typesLabelGap: TYPES_LABEL_GAP,
  typesChipOffsetX: CHIP_OFF_X,
} = M10_TRIGGER_FLOW_LAYOUT;
const PROCESS_ARROW = getProcessArrowMarkerGeom();
const MARKER = PROCESS_ARROW.tipLen;

export default function M10TriggerFlowDiagram({
  locale = 'lt',
  className = '',
  currentStep = -1,
  onStepClick,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
  onStepClick?: (index: number) => void;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const tones = getDiagramToneColors(isDarkPalette);
  const L = getM10TriggerFlowLabels(locale);
  const webhookFill = tones.amber.soft;
  const webhookStroke = tones.amber.stroke;
  const webhookText = tones.amber.stroke;
  const chipFill = tones.brand.soft;
  const flowGrey = palette.flow;
  const interactive = typeof onStepClick === 'function';
  const x1 = X0;
  const x2 = x1 + BOX_W + GAP;
  const x3 = x2 + BOX_W + GAP;
  const cx = (x: number) => x + BOX_W / 2;
  const yB = Y_MAIN + BOX_H;
  const shaftX = m10TriggerShaftX();
  const chipsX = shaftX + CHIP_OFF_X;

  const typeChips = [
    { key: 'form', label: L.typeForm, sub: L.typeFormSub, emphasize: false },
    {
      key: 'sched',
      label: L.typeSchedule,
      sub: L.typeScheduleSub,
      emphasize: false,
    },
    {
      key: 'webhook',
      label: L.typeWebhook,
      sub: L.typeWebhookSub,
      emphasize: true,
    },
  ] as const;
  const typesDim = currentStep >= 0 && currentStep !== 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-5xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10tf-fwd-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={flowGrey} />
        </marker>
        <marker
          id={`m10tf-up-${uid}`}
          markerUnits={PROCESS_ARROW.markerUnits}
          markerWidth={PROCESS_ARROW.markerWidth}
          markerHeight={PROCESS_ARROW.markerHeight}
          refX={PROCESS_ARROW.refX}
          refY={PROCESS_ARROW.refY}
          orient="auto"
        >
          <path d={PROCESS_ARROW.pathD} fill={webhookStroke} />
        </marker>
      </defs>

      {[
        { x: x1, title: L.trigger, sub: L.triggerSub, step: 0, dashed: false },
        {
          x: x2,
          title: L.condition,
          sub: L.conditionSub,
          step: 1,
          dashed: true,
        },
        { x: x3, title: L.action, sub: L.actionSub, step: 2, dashed: false },
      ].map((b) => {
        const active = currentStep < 0 || currentStep === b.step;
        const dim = currentStep >= 0 && currentStep !== b.step;
        return (
          <g
            key={b.step}
            opacity={
              dim
                ? DIAGRAM_TOKENS.opacity.inactive
                : DIAGRAM_TOKENS.opacity.active
            }
          >
            <rect
              x={b.x}
              y={Y_MAIN}
              width={BOX_W}
              height={BOX_H}
              rx={DIAGRAM_TOKENS.radius.box}
              fill={b.step === 0 ? palette.brandTop : palette.brand}
              stroke={
                active && currentStep === b.step
                  ? getDiagramActiveStroke()
                  : palette.brandDark
              }
              strokeWidth={
                active && currentStep === b.step
                  ? DIAGRAM_TOKENS.stroke.active
                  : DIAGRAM_TOKENS.stroke.border + 0.2
              }
              strokeDasharray={b.dashed ? '5 4' : undefined}
            />
            <text
              x={cx(b.x)}
              y={Y_MAIN + 24}
              textAnchor="middle"
              fill="white"
              fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
              fontWeight="700"
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {b.title}
            </text>
            <text
              x={cx(b.x)}
              y={Y_MAIN + 42}
              textAnchor="middle"
              fill={DIAGRAM_TOKENS.colors.whiteText}
              fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {b.sub}
            </text>
            {interactive ? (
              <DiagramStepHitArea
                x={b.x}
                y={Y_MAIN}
                width={BOX_W}
                height={BOX_H}
                onActivate={() => onStepClick(b.step)}
              />
            ) : null}
          </g>
        );
      })}

      <line
        x1={x1 + BOX_W + 3}
        y1={Y_MAIN + BOX_H / 2}
        x2={x2 - MARKER}
        y2={Y_MAIN + BOX_H / 2}
        stroke={flowGrey}
        strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
        markerEnd={`url(#m10tf-fwd-${uid})`}
      />
      <line
        x1={x2 + BOX_W + 3}
        y1={Y_MAIN + BOX_H / 2}
        x2={x3 - MARKER}
        y2={Y_MAIN + BOX_H / 2}
        stroke={flowGrey}
        strokeWidth={DIAGRAM_TOKENS.stroke.flowStrong}
        markerEnd={`url(#m10tf-fwd-${uid})`}
      />

      <g
        opacity={
          typesDim
            ? DIAGRAM_TOKENS.opacity.inactive
            : DIAGRAM_TOKENS.opacity.active
        }
      >
        <line
          x1={shaftX}
          y1={TYPE_ROW_Y}
          x2={shaftX}
          y2={yB + MARKER}
          stroke={webhookStroke}
          strokeWidth={DIAGRAM_TOKENS.stroke.flow}
          strokeDasharray="5 4"
          markerEnd={`url(#m10tf-up-${uid})`}
        />
        <text
          x={shaftX - TYPES_LABEL_GAP}
          y={TYPES_LABEL_Y}
          textAnchor="end"
          fill={palette.muted}
          fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
          fontWeight="600"
          fontFamily={DIAGRAM_TOKENS.font}
        >
          {L.typesLabel}
        </text>
        {typeChips.map((chip, i) => {
          const chipX = chipsX + i * (CHIP_W + CHIP_GAP);
          return (
            <g key={chip.key}>
              <rect
                x={chipX}
                y={TYPE_ROW_Y}
                width={CHIP_W}
                height={CHIP_H}
                rx={6}
                fill={chip.emphasize ? webhookFill : chipFill}
                stroke={chip.emphasize ? webhookStroke : palette.brandDark}
                strokeWidth={
                  chip.emphasize
                    ? DIAGRAM_TOKENS.stroke.inactive
                    : DIAGRAM_TOKENS.stroke.border
                }
              />
              <text
                x={chipX + CHIP_W / 2}
                y={TYPE_ROW_Y + 16}
                textAnchor="middle"
                fill={chip.emphasize ? webhookText : palette.brandDark}
                fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
                fontWeight={chip.emphasize ? '700' : '600'}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {chip.label}
              </text>
              <text
                x={chipX + CHIP_W / 2}
                y={TYPE_ROW_Y + 32}
                textAnchor="middle"
                fill={chip.emphasize ? webhookText : palette.muted}
                fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop}
                fontFamily={DIAGRAM_TOKENS.font}
              >
                {chip.sub}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
