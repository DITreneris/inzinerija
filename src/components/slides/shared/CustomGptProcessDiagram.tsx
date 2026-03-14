/**
 * Pilna Custom GPT proceso diagrama su paryškinimu: aktyvus žingsnis ryškus, kiti priteminti.
 * Mobile režime schema persidėlioja į siauresnę geometriją, kad nereikėtų horizontalaus scroll.
 */
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompactViewport } from '../../../utils/useCompactViewport';

const STEP_ACTIVE_OPACITY = 1;
const STEP_INACTIVE_OPACITY = 0.45;
const ARROW_MARKER_LEN = 6;
const ARROW_FB_MARKER_LEN = 14;

type StepBox = [number, number, number, number];

interface DiagramLayout {
  viewBox: string;
  width: number;
  height: number;
  centerX: number;
  stepBoxes: StepBox[];
  compact: boolean;
}

const DESKTOP_LAYOUT: DiagramLayout = {
  viewBox: '0 0 560 700',
  width: 560,
  height: 700,
  centerX: 280,
  stepBoxes: [
    [140, 78, 280, 56],
    [140, 162, 280, 56],
    [140, 246, 280, 56],
    [140, 330, 280, 56],
    [140, 414, 280, 56],
    [140, 498, 280, 56],
    [80, 612, 160, 52],
    [320, 612, 160, 52],
  ],
  compact: false,
};

const COMPACT_LAYOUT: DiagramLayout = {
  viewBox: '0 0 360 780',
  width: 360,
  height: 780,
  centerX: 180,
  stepBoxes: [
    [30, 70, 300, 52],
    [30, 144, 300, 52],
    [30, 218, 300, 52],
    [30, 292, 300, 52],
    [30, 366, 300, 52],
    [30, 440, 300, 52],
    [30, 552, 300, 52],
    [30, 626, 300, 52],
  ],
  compact: true,
};

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
  const uid = useId().replace(/:/g, '');
  const layout = isCompactDiagram ? COMPACT_LAYOUT : DESKTOP_LAYOUT;
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
  const getStepAria = (i: number) =>
    i >= 0 && i < titles.length
      ? t('stepButtonAria', { id: i + 1, title: titles[i] })
      : '';
  const centerX = layout.centerX;
  const rightMarginX = layout.width - 18;

  return (
    <svg
      viewBox={layout.viewBox}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      aria-hidden="true"
      role="img"
      aria-label={
        isInteractive
          ? t('diagramAria', { n: currentStep + 1 })
          : t('diagramAriaStatic', { n: currentStep + 1 })
      }
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker
          id={`arrow-${uid}`}
          markerWidth="8"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path
            d="M0 0 L6 3 L0 6 Z"
            fill="#334e68"
            stroke="#334e68"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id={`arrow-fb-${uid}`}
          markerWidth="16"
          markerHeight="11"
          refX="14"
          refY="5.5"
          orient="auto"
        >
          <path
            d="M0 0 L16 5.5 L0 11 Z"
            fill="#b8860b"
            stroke="#7a5807"
            strokeWidth="0.6"
          />
        </marker>
        <linearGradient
          id={`step-grad-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
        <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="3"
            floodColor="#334e68"
            floodOpacity="0.4"
          />
        </filter>
      </defs>

      <rect
        width={layout.width}
        height={layout.height}
        fill={`url(#bg-${uid})`}
        rx="12"
      />
      <rect
        width={layout.width}
        height={layout.height}
        fill="none"
        stroke="#bcccdc"
        strokeWidth="1"
        rx="12"
      />

      <text
        x={centerX}
        y={layout.compact ? 34 : 37}
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize={layout.compact ? 19 : 24}
        fontWeight="800"
        fill="#102a43"
      >
        {t('diagramTitle')}
      </text>
      <text
        x={centerX}
        y={layout.compact ? 54 : 60}
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize={layout.compact ? 11 : 14}
        fontWeight="500"
        fill="#334e68"
      >
        {t('diagramSubtitle')}
      </text>

      {layout.stepBoxes.map((box, index) => {
        const cx = box[0] + box[2] / 2;
        const titleY = box[1] + (layout.compact ? 21 : 30);
        const detailY =
          box[1] + (layout.compact ? 38 : box[2] <= 180 ? 46 : 52);
        const titleFontSize = layout.compact ? 13 : box[2] <= 180 ? 14 : 15;
        const detailFontSize = layout.compact ? 11 : box[2] <= 180 ? 12 : 13;
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
                rx="12"
                fill={`url(#step-grad-${uid})`}
                stroke="#334e68"
                strokeWidth={currentStep === index ? 2.5 : 1.5}
                filter={currentStep === index ? `url(#glow-${uid})` : undefined}
              />
              <text
                x={cx}
                y={titleY}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={titleFontSize}
                fontWeight="700"
                fill="white"
              >
                {`${index + 1} · ${titles[index].toUpperCase()}`}
              </text>
              <text
                x={cx}
                y={detailY}
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                fontSize={detailFontSize}
                fontWeight="500"
                fill={
                  layout.compact
                    ? 'rgba(255,255,255,0.92)'
                    : index >= 6
                      ? 'rgba(255,255,255,0.95)'
                      : '#334e68'
                }
              >
                {details[index]}
              </text>
            </g>
            {isInteractive && (
              <rect
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                rx="12"
                fill="transparent"
                cursor="pointer"
                onClick={() => onStepClick?.(index)}
                aria-label={getStepAria(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onStepClick?.(index);
                  }
                }}
              />
            )}
            {index < 5 && (
              <line
                x1={centerX}
                y1={box[1] + box[3]}
                x2={centerX}
                y2={layout.stepBoxes[index + 1][1] - ARROW_MARKER_LEN}
                stroke="#334e68"
                strokeWidth="2"
                markerEnd={`url(#arrow-${uid})`}
              />
            )}
          </g>
        );
      })}

      {layout.compact ? (
        <>
          <line
            x1={centerX}
            y1={layout.stepBoxes[5][1] + layout.stepBoxes[5][3]}
            x2={centerX}
            y2={layout.stepBoxes[6][1] - ARROW_MARKER_LEN}
            stroke="#334e68"
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />
          <line
            x1={centerX}
            y1={layout.stepBoxes[6][1] + layout.stepBoxes[6][3]}
            x2={centerX}
            y2={layout.stepBoxes[7][1] - ARROW_MARKER_LEN}
            stroke="#334e68"
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />
          <path
            d={`M ${layout.stepBoxes[7][0] + layout.stepBoxes[7][2]} ${layout.stepBoxes[7][1] + layout.stepBoxes[7][3] / 2} L ${rightMarginX} ${layout.stepBoxes[7][1] + layout.stepBoxes[7][3] / 2} L ${rightMarginX} ${layout.stepBoxes[3][1] + layout.stepBoxes[3][3] / 2} L ${layout.stepBoxes[3][0] + layout.stepBoxes[3][2] + ARROW_FB_MARKER_LEN} ${layout.stepBoxes[3][1] + layout.stepBoxes[3][3] / 2}`}
            stroke="#b8860b"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 6"
            strokeLinejoin="round"
            strokeLinecap="round"
            markerEnd={`url(#arrow-fb-${uid})`}
          />
        </>
      ) : (
        <>
          <line
            x1={centerX}
            y1={layout.stepBoxes[5][1] + layout.stepBoxes[5][3]}
            x2={centerX}
            y2={588}
            stroke="#334e68"
            strokeWidth="2"
          />
          <line
            x1={centerX}
            y1={588}
            x2={160}
            y2={588}
            stroke="#334e68"
            strokeWidth="2"
          />
          <line
            x1={centerX}
            y1={588}
            x2={400}
            y2={588}
            stroke="#334e68"
            strokeWidth="2"
          />
          <line
            x1={160}
            y1={588}
            x2={160}
            y2={layout.stepBoxes[6][1] - ARROW_MARKER_LEN}
            stroke="#334e68"
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />
          <line
            x1={400}
            y1={588}
            x2={400}
            y2={layout.stepBoxes[7][1] - ARROW_MARKER_LEN}
            stroke="#334e68"
            strokeWidth="2"
            markerEnd={`url(#arrow-${uid})`}
          />
          <path
            d={`M ${layout.stepBoxes[7][0] + layout.stepBoxes[7][2]} ${layout.stepBoxes[7][1] + layout.stepBoxes[7][3] / 2} L 500 638 L 500 400 L 500 365 Q 500 358 432 358 L ${layout.stepBoxes[3][0] + layout.stepBoxes[3][2] + ARROW_FB_MARKER_LEN + 2} ${layout.stepBoxes[3][1] + layout.stepBoxes[3][3] / 2} L ${layout.stepBoxes[3][0] + layout.stepBoxes[3][2] + ARROW_FB_MARKER_LEN} ${layout.stepBoxes[3][1] + layout.stepBoxes[3][3] / 2}`}
            stroke="#b8860b"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10 6"
            strokeLinejoin="round"
            strokeLinecap="round"
            markerEnd={`url(#arrow-fb-${uid})`}
          />
        </>
      )}
    </svg>
  );
}
