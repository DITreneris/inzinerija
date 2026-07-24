/**
 * Pilna Custom GPT proceso diagrama su paryškinimu: aktyvus žingsnis ryškus, kiti priteminti.
 * Mobile režime schema persidėlioja į siauresnę geometriją, kad nereikėtų horizontalaus scroll.
 *
 * LMS 1A (2026-07-24): flat fills, useDiagramPalette, no glow; arrows keep tip≥10 / refX=0.
 * Branch 7|8 topology unchanged (practice lab, not W2 spine).
 * Geometry SOT: customGptProcessLayout.ts
 */
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompactViewport } from '../../../utils/useCompactViewport';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DiagramStepHitArea } from './diagramKit';
import {
  DIAGRAM_ROLE_COLORS,
  DIAGRAM_TOKENS,
  DIAGRAM_TONE_COLORS,
} from './diagramTokens';
import {
  COMPACT_LAYOUT,
  CUSTOM_GPT_ARROW_TIP_LEN,
  CUSTOM_GPT_FB_GAP,
  CUSTOM_GPT_FB_TIP_H,
  CUSTOM_GPT_FB_TIP_W,
  DESKTOP_LAYOUT,
} from './customGptProcessLayout';

const STEP_ACTIVE_OPACITY = DIAGRAM_TOKENS.opacity.active;
const STEP_INACTIVE_OPACITY = DIAGRAM_TOKENS.opacity.inactive;

/** Dark inactive soft – between frame bgStart and brand. */
const INACTIVE_SOFT_DARK = '#334155';

const ACCENT_FB = DIAGRAM_TOKENS.colors.amber;
const ACCENT_FB_DARK = DIAGRAM_ROLE_COLORS.accentDark;
const FLOW_STROKE = DIAGRAM_TOKENS.stroke.flowStrong;
const FB_STROKE = DIAGRAM_TOKENS.stroke.feedback;

const STEP_TITLES_LT = [
  'Tikslas',
  'Rolė',
  'Prisijungimas',
  'Konfigūracija',
  'Papildomos funkcijos',
  'Testavimas',
  'Publikavimas',
  'Tobulinimas',
];

interface CustomGptProcessDiagramProps {
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  /** Step titles for locale-aware aria-labels (e.g. from ProcessStepper steps); falls back to LT when omitted */
  stepTitles?: string[];
}

export default function CustomGptProcessDiagram({
  currentStep,
  onStepClick,
  className = '',
  stepTitles,
}: CustomGptProcessDiagramProps) {
  const { t } = useTranslation('stepper');
  const { isCompactDiagram } = useCompactViewport();
  const palette = useDiagramPalette();
  const uid = useId().replace(/:/g, '');
  const layout = isCompactDiagram ? COMPACT_LAYOUT : DESKTOP_LAYOUT;
  const isDarkPalette = palette.bgStart === DIAGRAM_TOKENS.palette.dark.bgStart;
  const inactiveSoft = isDarkPalette
    ? INACTIVE_SOFT_DARK
    : DIAGRAM_TONE_COLORS.brand.soft;
  const flowStroke = palette.flow;
  const step = (i: number) =>
    currentStep === i ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY;
  const isInteractive = typeof onStepClick === 'function';
  const titles = stepTitles ?? STEP_TITLES_LT;
  const details = [
    t('diagramStep1Detail'),
    t('diagramStep2Detail'),
    t('diagramStep3Detail'),
    t('diagramStep4Detail'),
    t('diagramStep5Detail'),
    t('diagramStep6Detail'),
    t('diagramStep7Detail'),
    t('diagramStep8Detail'),
  ];
  const centerX = layout.centerX;
  const rightMarginX = layout.width - 18;
  const tipLen = CUSTOM_GPT_ARROW_TIP_LEN;
  const tipH = tipLen * 0.9;
  const boxes = layout.stepBoxes;
  const configBox = boxes[3];
  const improveBox = boxes[7];
  const configRight = configBox[0] + configBox[2];
  const configCy = configBox[1] + configBox[3] / 2;
  const improveRight = improveBox[0] + improveBox[2];
  const improveCy = improveBox[1] + improveBox[3] / 2;
  /** Tip apex just outside Konfigūracija; base further right (path ends at base). */
  const fbTipX = configRight + CUSTOM_GPT_FB_GAP;
  const fbTipBaseX = fbTipX + CUSTOM_GPT_FB_TIP_H;
  const typography = DIAGRAM_TOKENS.typography;

  const forwardLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    key: string
  ) => (
    <line
      key={key}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={flowStroke}
      strokeWidth={FLOW_STROKE}
      markerEnd={`url(#arrow-${uid})`}
    />
  );

  return (
    <svg
      viewBox={layout.viewBox}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={
        isInteractive
          ? t('diagramAria', { n: currentStep + 1 })
          : t('diagramAriaStatic', { n: currentStep + 1 })
      }
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.bgStart} />
          <stop offset="100%" stopColor={palette.bgEnd} />
        </linearGradient>
        {/* Forward: tip past line end (refX=0). 6px+refX≈tip+stroke 3.5 = buried V. */}
        <marker
          id={`arrow-${uid}`}
          markerUnits={DIAGRAM_TOKENS.arrow.markerUnits}
          markerWidth={tipLen}
          markerHeight={tipH}
          refX={0}
          refY={tipH / 2}
          orient="auto"
        >
          <path
            d={`M0 0 L${tipLen} ${tipH / 2} L0 ${tipH} Z`}
            fill={flowStroke}
            stroke={flowStroke}
            strokeWidth="0.5"
          />
        </marker>
      </defs>

      <rect
        width={layout.width}
        height={layout.height}
        fill={`url(#bg-${uid})`}
        rx={DIAGRAM_TOKENS.radius.frame}
      />

      <text
        x={centerX}
        y={layout.compact ? 30 : 32}
        textAnchor="middle"
        fontFamily={DIAGRAM_TOKENS.font}
        fontSize={
          layout.compact ? typography.title.compact : typography.title.desktop
        }
        fontWeight={typography.titleWeight}
        fill={palette.brandDark}
      >
        {t('diagramTitle')}
      </text>

      {/* Boxes first – forward tips draw after so they are not under next rect. */}
      {boxes.map((box, index) => {
        const cx = box[0] + box[2] / 2;
        const isActive = currentStep === index;
        const titleY = box[1] + (layout.compact ? 21 : 30);
        const detailY =
          box[1] + (layout.compact ? 38 : box[2] <= 180 ? 46 : 52);
        const titleFontSize = layout.compact ? 13 : box[2] <= 180 ? 14 : 15;
        const detailFontSize = layout.compact ? 11 : box[2] <= 180 ? 12 : 13;
        const fill = isActive ? palette.brand : inactiveSoft;
        const labelFill = isActive ? palette.whiteText : palette.brandDark;
        const detailFill = isActive ? palette.whiteText : palette.muted;
        return (
          <g key={index}>
            <g
              opacity={step(index)}
              style={{ transition: 'opacity 0.25s ease' }}
              aria-hidden
            >
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx={DIAGRAM_TOKENS.radius.box}
                fill={fill}
                stroke={isActive ? palette.brandDark : palette.brand}
                strokeWidth={
                  isActive
                    ? DIAGRAM_TOKENS.stroke.active
                    : DIAGRAM_TOKENS.stroke.inactive
                }
              />
              <text
                x={cx}
                y={titleY}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={titleFontSize}
                fontWeight="700"
                fill={labelFill}
              >
                {`${index + 1} · ${titles[index]}`}
              </text>
              <text
                x={cx}
                y={detailY}
                textAnchor="middle"
                fontFamily={DIAGRAM_TOKENS.font}
                fontSize={detailFontSize}
                fontWeight="500"
                fill={detailFill}
              >
                {details[index]}
              </text>
            </g>
            {isInteractive && (
              <DiagramStepHitArea
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                radius={DIAGRAM_TOKENS.radius.box}
                onActivate={() => onStepClick?.(index)}
              />
            )}
          </g>
        );
      })}

      {/* Forward spine 1→6 (and compact 6→7→8) – tip reserved below line end. */}
      {[0, 1, 2, 3, 4].map((index) =>
        forwardLine(
          centerX,
          boxes[index][1] + boxes[index][3],
          centerX,
          boxes[index + 1][1] - tipLen,
          `fwd-${index}`
        )
      )}

      {layout.compact ? (
        <>
          {forwardLine(
            centerX,
            boxes[5][1] + boxes[5][3],
            centerX,
            boxes[6][1] - tipLen,
            'fwd-5-6'
          )}
          {forwardLine(
            centerX,
            boxes[6][1] + boxes[6][3],
            centerX,
            boxes[7][1] - tipLen,
            'fwd-6-7'
          )}
          <path
            d={`M ${improveRight} ${improveCy} L ${rightMarginX} ${improveCy} L ${rightMarginX} ${configCy} L ${fbTipBaseX} ${configCy}`}
            stroke={ACCENT_FB}
            strokeWidth={FB_STROKE}
            fill="none"
            strokeDasharray="10 6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polygon
            points={`${fbTipX},${configCy} ${fbTipBaseX},${configCy - CUSTOM_GPT_FB_TIP_W} ${fbTipBaseX},${configCy + CUSTOM_GPT_FB_TIP_W}`}
            fill={ACCENT_FB_DARK}
          />
        </>
      ) : (
        <>
          {/* Branch: 6 → trough → 7 | 8 */}
          <line
            x1={centerX}
            y1={boxes[5][1] + boxes[5][3]}
            x2={centerX}
            y2={layout.branchY}
            stroke={flowStroke}
            strokeWidth={FLOW_STROKE}
          />
          <line
            x1={centerX}
            y1={layout.branchY}
            x2={160}
            y2={layout.branchY}
            stroke={flowStroke}
            strokeWidth={FLOW_STROKE}
          />
          <line
            x1={centerX}
            y1={layout.branchY}
            x2={400}
            y2={layout.branchY}
            stroke={flowStroke}
            strokeWidth={FLOW_STROKE}
          />
          {forwardLine(
            160,
            layout.branchY!,
            160,
            boxes[6][1] - tipLen,
            'branch-7'
          )}
          {forwardLine(
            400,
            layout.branchY!,
            400,
            boxes[7][1] - tipLen,
            'branch-8'
          )}
          <path
            d={`M ${improveRight} ${improveCy} L ${layout.feedbackRailX} ${improveCy} L ${layout.feedbackRailX} ${configCy} L ${fbTipBaseX} ${configCy}`}
            stroke={ACCENT_FB}
            strokeWidth={FB_STROKE}
            fill="none"
            strokeDasharray="10 6"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polygon
            points={`${fbTipX},${configCy} ${fbTipBaseX},${configCy - CUSTOM_GPT_FB_TIP_W} ${fbTipBaseX},${configCy + CUSTOM_GPT_FB_TIP_W}`}
            fill={ACCENT_FB_DARK}
          />
        </>
      )}
    </svg>
  );
}
