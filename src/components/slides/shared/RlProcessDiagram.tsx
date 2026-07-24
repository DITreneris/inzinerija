/**
 * RL proceso diagrama – horizontali schema (Agentas → Aplinka → Veiksmas → Atlygis).
 * Interaktyvi: currentStep, onStepClick – paspaudus žingsnį, rodomas paaiškinimas apačioje.
 * LMS polish: flat brand/amber, GAP 32 + tip≥10, active=stroke (ne juodas fill), dashed U be circle.
 */
import { useId, useState, useEffect } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { DiagramStepHitArea } from './diagramKit';
import { feedbackUPath, horizontalRowBoxes } from './cycleFeedbackGeometry';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';

/** Geometry SOT – tests assert GAP / viewBox / row centering. */
export const RL_PROCESS_GEOMETRY = {
  boxW: 180,
  boxH: 88,
  gap: 32,
  viewBoxW: 920,
  /** Room for caption + edge labels above boxes (title≠„atlikimas“ collision). */
  viewBoxH: 236,
  viewBoxWMobile: 520,
  viewBoxHMobile: 340,
  /** Boxes low enough that edge labels (box.y−6) clear SVG title. */
  rowY: 62,
  diagramTitleY: 22,
  /** LMS process tip – processTipLen + refX=0. */
  arrowMarkerLen: DIAGRAM_TOKENS.arrow.processTipLen,
  fbTroughOffset: 36,
  mobileOffsetX: 40,
  mobileOffsetY: 48,
  /** Baseline gap title→desc inside node (air, not cramped 20). */
  nodeTextGap: 30,
} as const;

const VIEWBOX_DESKTOP = `0 0 ${RL_PROCESS_GEOMETRY.viewBoxW} ${RL_PROCESS_GEOMETRY.viewBoxH}`;
const VIEWBOX_MOBILE = `0 0 ${RL_PROCESS_GEOMETRY.viewBoxWMobile} ${RL_PROCESS_GEOMETRY.viewBoxHMobile}`;
const VB_WIDTH_DESKTOP = RL_PROCESS_GEOMETRY.viewBoxW;
const VB_HEIGHT_DESKTOP = RL_PROCESS_GEOMETRY.viewBoxH;
const VB_WIDTH_MOBILE = RL_PROCESS_GEOMETRY.viewBoxWMobile;
const VB_HEIGHT_MOBILE = RL_PROCESS_GEOMETRY.viewBoxHMobile;
const STEP_ACTIVE_OPACITY = DIAGRAM_TOKENS.opacity.active;
const STEP_INACTIVE_OPACITY = DIAGRAM_TOKENS.opacity.inactive;
const FORWARD_STROKE_WIDTH = DIAGRAM_TOKENS.stroke.flow;

const BOX_W = RL_PROCESS_GEOMETRY.boxW;
const BOX_H = RL_PROCESS_GEOMETRY.boxH;
const GAP = RL_PROCESS_GEOMETRY.gap;
const ARROW_GAP_FB = 12;
const ROW_Y = RL_PROCESS_GEOMETRY.rowY;
const ARROW_MARKER_LEN = RL_PROCESS_GEOMETRY.arrowMarkerLen;

const FB_TIP_H = 12;
const FB_TIP_W = 8;
const FB_CORNER_R = 16;
const FB_PATH_STROKE = DIAGRAM_TOKENS.stroke.feedback;
const FB_GAP_ABOVE_BLOCK = 2;

const ACCENT = DIAGRAM_TOKENS.colors.amber;
const ACCENT_DARK = DIAGRAM_TONE_COLORS.amber.stroke;
const FORWARD_STROKE = DIAGRAM_TOKENS.colors.slate;
const BOX_RX = DIAGRAM_TOKENS.radius.box;
const NODE_TITLE_SIZE = 15;
const NODE_DESC_SIZE = 12;

const DESKTOP_ROW_BOXES = horizontalRowBoxes({
  count: 4,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  viewBoxW: VB_WIDTH_DESKTOP,
  rowY: ROW_Y,
});

const STEP_META_LT = [
  { title: 'Agentas', desc: 'DI sistema' },
  { title: 'Aplinka', desc: 'situacija / užduotis' },
  { title: 'Veiksmas', desc: 'ką padaro' },
  { title: 'Atlygis', desc: 'gerai / blogai' },
] as const;

const STEP_META_EN = [
  { title: 'Agent', desc: 'AI system' },
  { title: 'Environment', desc: 'situation / task' },
  { title: 'Action', desc: 'what it does' },
  { title: 'Reward', desc: 'good / bad' },
] as const;

const STEPS_ROW = DESKTOP_ROW_BOXES.map((box, i) => ({
  ...box,
  ...STEP_META_LT[i],
}));

const STEPS_ROW_EN = DESKTOP_ROW_BOXES.map((box, i) => ({
  ...box,
  ...STEP_META_EN[i],
}));

const MOBILE_OFFSET_X = RL_PROCESS_GEOMETRY.mobileOffsetX;
const MOBILE_OFFSET_Y = RL_PROCESS_GEOMETRY.mobileOffsetY;

function buildMobileGrid(meta: typeof STEP_META_LT | typeof STEP_META_EN) {
  return [
    {
      x: MOBILE_OFFSET_X,
      y: MOBILE_OFFSET_Y,
      w: BOX_W,
      h: BOX_H,
      ...meta[0],
    },
    {
      x: MOBILE_OFFSET_X + BOX_W + GAP,
      y: MOBILE_OFFSET_Y,
      w: BOX_W,
      h: BOX_H,
      ...meta[1],
    },
    {
      x: MOBILE_OFFSET_X,
      y: MOBILE_OFFSET_Y + BOX_H + GAP,
      w: BOX_W,
      h: BOX_H,
      ...meta[2],
    },
    {
      x: MOBILE_OFFSET_X + BOX_W + GAP,
      y: MOBILE_OFFSET_Y + BOX_H + GAP,
      w: BOX_W,
      h: BOX_H,
      ...meta[3],
    },
  ];
}

const STEPS_GRID = buildMobileGrid(STEP_META_LT);
const STEPS_GRID_EN = buildMobileGrid(STEP_META_EN);

const FORWARD_LABELS = ['sprendimas', 'atlikimas', 'rezultatas'] as const;
const FORWARD_LABELS_EN = ['decision', 'execution', 'outcome'] as const;
const FEEDBACK_LABEL = 'elgesio korekcija';
const FEEDBACK_LABEL_EN = 'behaviour adjustment';

interface RlProcessDiagramProps {
  currentStep?: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setCompact(mq.matches);
    const fn = () => setCompact(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return compact;
}

function stepBoxFill(index: number, brand: string): string {
  if (index === 3) return ACCENT;
  return brand;
}

function stepBoxStroke(
  index: number,
  isActive: boolean,
  brand: string,
  brandDark: string
): string {
  if (isActive) return brandDark;
  return index === 3 ? ACCENT_DARK : brand;
}

export default function RlProcessDiagram({
  currentStep = 0,
  onStepClick,
  className = '',
}: RlProcessDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const { locale } = useLocale();
  const palette = useDiagramPalette();
  const isInteractive = typeof onStepClick === 'function';
  const isCompact = useIsCompact();
  const isEn = locale === 'en';
  const STEPS = isCompact
    ? isEn
      ? STEPS_GRID_EN
      : STEPS_GRID
    : isEn
      ? STEPS_ROW_EN
      : STEPS_ROW;
  const forwardLabels = isEn ? FORWARD_LABELS_EN : FORWARD_LABELS;
  const feedbackLabel = isEn ? FEEDBACK_LABEL_EN : FEEDBACK_LABEL;
  const diagramTitle = isEn
    ? isCompact
      ? 'RL structure'
      : 'RL process structure'
    : isCompact
      ? 'RL struktūra'
      : 'RL proceso struktūra';
  const svgAriaLabel = isEn
    ? `RL process diagram.${isInteractive ? ' Click a step for explanation.' : ''}`
    : `RL proceso schema.${isInteractive ? ' Paspausk žingsnį, kad pamatytum paaiškinimą.' : ''}`;
  const feedbackPathTitle = isEn
    ? 'Feedback: reward returns to agent and shapes behaviour'
    : 'Grįžtamasis ryšys: atlygis grįžta į agentą ir keičia elgesį';
  const viewBox = isCompact ? VIEWBOX_MOBILE : VIEWBOX_DESKTOP;
  const vbWidth = isCompact ? VB_WIDTH_MOBILE : VB_WIDTH_DESKTOP;
  const vbHeight = isCompact ? VB_HEIGHT_MOBILE : VB_HEIGHT_DESKTOP;
  const titleSize = isCompact
    ? DIAGRAM_TOKENS.typography.title.compact
    : DIAGRAM_TOKENS.typography.title.desktop;
  const titleY = isCompact ? 28 : RL_PROCESS_GEOMETRY.diagramTitleY;

  const forwardEdges = isCompact
    ? [
        { from: 0, to: 1, axis: 'x' as const },
        { from: 1, to: 2, axis: 'y' as const },
        { from: 2, to: 3, axis: 'x' as const },
      ]
    : [
        { from: 0, to: 1, axis: 'x' as const },
        { from: 1, to: 2, axis: 'x' as const },
        { from: 2, to: 3, axis: 'x' as const },
      ];

  const last = STEPS[3];
  const first = STEPS[0];

  const firstCx = first.x + first.w / 2;
  const lastCx = last.x + last.w / 2;
  const firstBottom = first.y + first.h;
  const lastBottom = last.y + last.h;
  const fbY = isCompact
    ? MOBILE_OFFSET_Y + 2 * (BOX_H + GAP) + RL_PROCESS_GEOMETRY.fbTroughOffset
    : ROW_Y + BOX_H + RL_PROCESS_GEOMETRY.fbTroughOffset;

  const fbTipY = firstBottom + FB_GAP_ABOVE_BLOCK;
  const fbTriBaseY = fbTipY + FB_TIP_H;
  const R = FB_CORNER_R;
  const fbStartY = lastBottom + ARROW_GAP_FB;
  const feedbackPath = feedbackUPath({
    firstCx,
    lastCx,
    startY: fbStartY,
    troughY: fbY,
    tipY: fbTipY,
    cornerR: R,
  });

  return (
    <svg
      viewBox={viewBox}
      className={`w-full max-w-5xl mx-auto block ${className}`}
      role="img"
      aria-label={svgAriaLabel}
    >
      <defs>
        <linearGradient id={`rl-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        <marker
          id={`rl-arrow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={ARROW_MARKER_LEN}
          markerHeight={ARROW_MARKER_LEN * 0.9}
          refX={0}
          refY={(ARROW_MARKER_LEN * 0.9) / 2}
          orient="auto"
        >
          <path
            d={`M0 0 L${ARROW_MARKER_LEN} ${(ARROW_MARKER_LEN * 0.9) / 2} L0 ${ARROW_MARKER_LEN * 0.9} Z`}
            fill={FORWARD_STROKE}
            stroke={FORWARD_STROKE}
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={vbWidth}
        height={vbHeight}
        fill={`url(#rl-bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />
      <rect
        width={vbWidth}
        height={vbHeight}
        fill="none"
        stroke={palette.border}
        strokeWidth={DIAGRAM_TOKENS.stroke.border}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={vbWidth / 2}
        y={titleY}
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={titleSize}
        fontWeight={DIAGRAM_TOKENS.typography.titleWeight}
        fill={palette.brandDark}
      >
        {diagramTitle}
      </text>

      {STEPS.map((step, i) => {
        const isActive = currentStep === i;
        const opacity = isActive ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY;
        const [x, y, w, h] = [step.x, step.y, step.w, step.h];
        const rightEdge = x + w;
        const bottomEdge = y + h;
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const next = STEPS[i + 1];
        const fill = stepBoxFill(i, palette.brand);
        const strokeColor = stepBoxStroke(
          i,
          isActive,
          palette.brand,
          palette.brandDark
        );
        const strokeW = isActive
          ? DIAGRAM_TOKENS.stroke.active
          : DIAGRAM_TOKENS.stroke.inactive;
        /** Centered title/desc pair with ≥30px baseline gap (not cramped 20). */
        const titleBaseline =
          y + Math.round(h / 2 - RL_PROCESS_GEOMETRY.nodeTextGap / 2 + 4);
        const descBaseline = titleBaseline + RL_PROCESS_GEOMETRY.nodeTextGap;

        return (
          <g key={i}>
            <g
              opacity={opacity}
              style={{ transition: 'opacity 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={BOX_RX}
                fill={fill}
                stroke={strokeColor}
                strokeWidth={strokeW}
                style={{
                  transition: 'stroke 0.15s ease, stroke-width 0.15s ease',
                }}
              />
              <text
                x={centerX}
                y={titleBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={NODE_TITLE_SIZE}
                fontWeight="700"
                fill={DIAGRAM_TOKENS.colors.whiteText}
              >
                {step.title}
              </text>
              <text
                x={centerX}
                y={descBaseline}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={NODE_DESC_SIZE}
                fontWeight="500"
                fill={DIAGRAM_TOKENS.colors.whiteText}
              >
                {step.desc}
              </text>
            </g>

            {isInteractive && (
              <DiagramStepHitArea
                x={x}
                y={y}
                width={w}
                height={h}
                radius={BOX_RX}
                onActivate={() => onStepClick?.(i)}
              />
            )}

            {next &&
              (() => {
                const n = next;
                const labelText = forwardLabels[i];
                const gapCenterX = rightEdge + GAP / 2;
                const lblY = step.y - 6;
                const lblRectY = lblY - 13;
                const lblRectH = 18;

                if (forwardEdges[i]?.axis === 'y') {
                  const nCenterX = n.x + n.w / 2;
                  const y1 = bottomEdge;
                  const y2 = n.y - ARROW_MARKER_LEN;
                  return (
                    <g
                      key={`arrow-${i}`}
                      aria-label={
                        isEn
                          ? `Arrow: ${step.title} → ${n.title} (${labelText})`
                          : `Rodyklė: ${step.title} → ${n.title} (${labelText})`
                      }
                    >
                      <line
                        x1={centerX}
                        y1={y1}
                        x2={nCenterX}
                        y2={y2}
                        stroke={FORWARD_STROKE}
                        strokeWidth={FORWARD_STROKE_WIDTH}
                        strokeLinecap="round"
                        markerEnd={`url(#rl-arrow-${uid})`}
                      />
                      {labelText && (
                        <text
                          x={(centerX + nCenterX) / 2 + 14}
                          y={(y1 + y2) / 2 + 4}
                          textAnchor="middle"
                          fontFamily={DIAGRAM_TOKENS.font}
                          fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
                          fontWeight={
                            DIAGRAM_TOKENS.typography.edgeLabel.weight
                          }
                          fill={palette.brandDark}
                        >
                          {labelText}
                        </text>
                      )}
                    </g>
                  );
                }

                const fromX = rightEdge;
                const arrowY = centerY;
                const toX = n.x - ARROW_MARKER_LEN;
                const connTop = lblRectY + lblRectH;
                return (
                  <g
                    key={`arrow-${i}`}
                    aria-label={
                      isEn
                        ? `Arrow: ${step.title} → ${n.title} (${labelText})`
                        : `Rodyklė: ${step.title} → ${n.title} (${labelText})`
                    }
                  >
                    <line
                      x1={fromX}
                      y1={arrowY}
                      x2={toX}
                      y2={arrowY}
                      stroke={FORWARD_STROKE}
                      strokeWidth={FORWARD_STROKE_WIDTH}
                      strokeLinecap="round"
                      markerEnd={`url(#rl-arrow-${uid})`}
                    />
                    {labelText && (
                      <>
                        <line
                          x1={gapCenterX}
                          y1={connTop}
                          x2={gapCenterX}
                          y2={arrowY}
                          stroke={FORWARD_STROKE}
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          opacity="0.5"
                        />
                        <text
                          x={gapCenterX}
                          y={lblY}
                          textAnchor="middle"
                          fontFamily={DIAGRAM_TOKENS.font}
                          fontSize={DIAGRAM_TOKENS.typography.edgeLabel.size}
                          fontWeight={
                            DIAGRAM_TOKENS.typography.edgeLabel.weight
                          }
                          fill={palette.brandDark}
                        >
                          {labelText}
                        </text>
                      </>
                    )}
                  </g>
                );
              })()}
          </g>
        );
      })}

      <path
        d={feedbackPath}
        stroke={ACCENT_DARK}
        strokeWidth={FB_PATH_STROKE}
        strokeDasharray="8 4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title>{feedbackPathTitle}</title>
      </path>

      <polygon
        points={`${firstCx - FB_TIP_W},${fbTriBaseY} ${firstCx},${fbTipY} ${firstCx + FB_TIP_W},${fbTriBaseY}`}
        fill={ACCENT_DARK}
      />

      <text
        x={(lastCx + firstCx) / 2}
        y={fbY + 14}
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize="14"
        fontWeight="700"
        fill={ACCENT_DARK}
      >
        {feedbackLabel}
      </text>
    </svg>
  );
}
