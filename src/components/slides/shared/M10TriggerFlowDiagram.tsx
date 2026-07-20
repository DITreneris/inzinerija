/**
 * M10 – Trigger → Condition → Action + Webhook → Trigger (SCHEME_AGENT: rodyklės kraštas į kraštą).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TOKENS, DIAGRAM_TONE_COLORS } from './diagramTokens';
import { getM10TriggerFlowLabels, type M10Locale } from './m10DiagramContent';
import { M10_TRIGGER_FLOW_LAYOUT } from './m10TriggerFlowLayout';

const {
  width: W,
  height: H,
  boxW: BOX_W,
  boxH: BOX_H,
  gap: GAP,
  yMain: Y_MAIN,
  x0: X0,
  webhookNotch: WEBHOOK_NOTCH,
} = M10_TRIGGER_FLOW_LAYOUT;
const MARKER = DIAGRAM_TOKENS.arrow.markerLen;

export default function M10TriggerFlowDiagram({
  locale = 'lt',
  className = '',
  currentStep = -1,
}: {
  locale?: M10Locale;
  className?: string;
  currentStep?: number;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM10TriggerFlowLabels(locale);
  const webhookFill = DIAGRAM_TONE_COLORS.amber.soft;
  const webhookStroke = DIAGRAM_TONE_COLORS.amber.stroke;
  const webhookText = DIAGRAM_TONE_COLORS.amber.stroke;
  const webhookSubText = palette.muted;
  const flowGrey = palette.flow;
  const x1 = X0;
  const x2 = x1 + BOX_W + GAP;
  const x3 = x2 + BOX_W + GAP;
  const cx = (x: number) => x + BOX_W / 2;
  const yB = Y_MAIN + BOX_H;
  const whX = x1;
  const whY = Y_MAIN + BOX_H + 36;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={L.aria}
    >
      <defs>
        <marker
          id={`m10tf-fwd-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={MARKER}
          refY="3"
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={flowGrey} />
        </marker>
        <marker
          id={`m10tf-dash-${uid}`}
          markerWidth={DIAGRAM_TOKENS.arrow.markerWidth}
          markerHeight={DIAGRAM_TOKENS.arrow.markerHeight}
          refX={MARKER}
          refY="3"
          orient="auto"
        >
          <path d={DIAGRAM_TOKENS.arrow.markerPath} fill={webhookStroke} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize={DIAGRAM_TOKENS.typography.title.compact + 1}
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.title}
      </text>

      {[
        { x: x1, title: L.trigger, sub: L.triggerSub, step: 0 },
        { x: x2, title: L.condition, sub: L.conditionSub, step: 1 },
        { x: x3, title: L.action, sub: L.actionSub, step: 2 },
      ].map((b) => {
        const active = currentStep < 0 || currentStep === b.step;
        const dim = currentStep >= 0 && currentStep !== b.step;
        return (
          <g key={b.step} opacity={dim ? 0.4 : 1}>
            <rect
              x={b.x}
              y={Y_MAIN}
              width={BOX_W}
              height={BOX_H}
              rx={DIAGRAM_TOKENS.radius.box}
              fill={b.step === 0 ? palette.brandTop : palette.brand}
              stroke={
                active && currentStep === b.step ? '#f3cc30' : palette.brandDark
              }
              strokeWidth={
                active && currentStep === b.step
                  ? DIAGRAM_TOKENS.stroke.active
                  : DIAGRAM_TOKENS.stroke.border + 0.2
              }
            />
            <text
              x={cx(b.x)}
              y={Y_MAIN + 22}
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
              y={Y_MAIN + 38}
              textAnchor="middle"
              fill={DIAGRAM_TOKENS.colors.whiteText}
              fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop - 1}
              fontFamily={DIAGRAM_TOKENS.font}
            >
              {b.sub}
            </text>
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

      <path
        d={`M${whX + 10} ${whY} H${whX + BOX_W - WEBHOOK_NOTCH} L${whX + BOX_W} ${whY + BOX_H / 2} L${whX + BOX_W - WEBHOOK_NOTCH} ${whY + BOX_H} H${whX + 10} Q${whX} ${whY + BOX_H} ${whX} ${whY + BOX_H - 10} V${whY + 10} Q${whX} ${whY} ${whX + 10} ${whY} Z`}
        fill={webhookFill}
        stroke={currentStep === 3 ? '#f3cc30' : webhookStroke}
        strokeWidth={
          currentStep === 3
            ? DIAGRAM_TOKENS.stroke.active
            : DIAGRAM_TOKENS.stroke.inactive
        }
        opacity={currentStep >= 0 && currentStep !== 3 ? 0.4 : 1}
      />
      <text
        x={cx(whX)}
        y={whY + 22}
        textAnchor="middle"
        fill={webhookText}
        fontSize={DIAGRAM_TOKENS.typography.stepLabel.desktop}
        fontWeight="700"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.webhook}
      </text>
      <text
        x={cx(whX)}
        y={whY + 38}
        textAnchor="middle"
        fill={webhookSubText}
        fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop - 1}
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.webhookSub}
      </text>

      <line
        x1={cx(x1)}
        y1={whY}
        x2={cx(x1)}
        y2={yB - MARKER}
        stroke={webhookStroke}
        strokeWidth={DIAGRAM_TOKENS.stroke.flow}
        strokeDasharray="5 4"
        markerEnd={`url(#m10tf-dash-${uid})`}
      />
      <text
        x={cx(x1) + 68}
        y={whY + BOX_H / 2}
        fill={webhookText}
        fontSize={DIAGRAM_TOKENS.typography.stepSub.desktop - 1}
        fontWeight="600"
        fontFamily={DIAGRAM_TOKENS.font}
      >
        {L.arrowToTrigger}
      </text>
    </svg>
  );
}
