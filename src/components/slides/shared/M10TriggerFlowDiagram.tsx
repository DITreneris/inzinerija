/**
 * M10 – Trigger → Condition → Action + Webhook → Trigger (SCHEME_AGENT: rodyklės kraštas į kraštą).
 */
import { useId } from 'react';
import { useDiagramPalette } from '../../../utils/useDiagramPalette';
import { DIAGRAM_TONE_COLORS } from './diagramTokens';
import { getM10TriggerFlowLabels, type M10Locale } from './m10DiagramContent';

const W = 640;
const H = 200;
const BOX_W = 118;
const BOX_H = 52;
const GAP = 22;
const Y_MAIN = 48;
const X0 = 36;
const GREY = '#7B8794';
const ARROW = 8;
const WEBHOOK_NOTCH = 14;

export default function M10TriggerFlowDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const palette = useDiagramPalette();
  const L = getM10TriggerFlowLabels(locale);
  const webhookFill = DIAGRAM_TONE_COLORS.amber.soft;
  const webhookStroke = DIAGRAM_TONE_COLORS.amber.stroke;
  const webhookText = DIAGRAM_TONE_COLORS.amber.stroke;
  const webhookSubText = palette.muted;
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
          markerWidth={ARROW + 2}
          markerHeight={7}
          refX={ARROW}
          refY="3.5"
          orient="auto"
        >
          <path d={`M0 0 L${ARROW} 3.5 L0 7 Z`} fill={GREY} />
        </marker>
        <marker
          id={`m10tf-dash-${uid}`}
          markerWidth={ARROW + 2}
          markerHeight={7}
          refX={ARROW}
          refY="3.5"
          orient="auto"
        >
          <path d={`M0 0 L${ARROW} 3.5 L0 7 Z`} fill={webhookStroke} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill={palette.brandDark}
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.title}
      </text>

      {[
        { x: x1, title: L.trigger, sub: L.triggerSub },
        { x: x2, title: L.condition, sub: L.conditionSub },
        { x: x3, title: L.action, sub: L.actionSub },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={Y_MAIN}
            width={BOX_W}
            height={BOX_H}
            rx="10"
            fill={i === 0 ? '#486581' : '#334e68'}
            stroke={palette.brandDark}
            strokeWidth="1.2"
          />
          <text
            x={cx(b.x)}
            y={Y_MAIN + 22}
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="700"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
          >
            {b.title}
          </text>
          <text
            x={cx(b.x)}
            y={Y_MAIN + 38}
            textAnchor="middle"
            fill="rgba(255,255,255,0.9)"
            fontSize="9"
            fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
          >
            {b.sub}
          </text>
        </g>
      ))}

      <line
        x1={x1 + BOX_W + 3}
        y1={Y_MAIN + BOX_H / 2}
        x2={x2 - ARROW}
        y2={Y_MAIN + BOX_H / 2}
        stroke={GREY}
        strokeWidth="2.5"
        markerEnd={`url(#m10tf-fwd-${uid})`}
      />
      <line
        x1={x2 + BOX_W + 3}
        y1={Y_MAIN + BOX_H / 2}
        x2={x3 - ARROW}
        y2={Y_MAIN + BOX_H / 2}
        stroke={GREY}
        strokeWidth="2.5"
        markerEnd={`url(#m10tf-fwd-${uid})`}
      />

      <path
        d={`M${whX + 10} ${whY} H${whX + BOX_W - WEBHOOK_NOTCH} L${whX + BOX_W} ${whY + BOX_H / 2} L${whX + BOX_W - WEBHOOK_NOTCH} ${whY + BOX_H} H${whX + 10} Q${whX} ${whY + BOX_H} ${whX} ${whY + BOX_H - 10} V${whY + 10} Q${whX} ${whY} ${whX + 10} ${whY} Z`}
        fill={webhookFill}
        stroke={webhookStroke}
        strokeWidth="1.5"
      />
      <text
        x={cx(whX)}
        y={whY + 22}
        textAnchor="middle"
        fill={webhookText}
        fontSize="12"
        fontWeight="700"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.webhook}
      </text>
      <text
        x={cx(whX)}
        y={whY + 38}
        textAnchor="middle"
        fill={webhookSubText}
        fontSize="9"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.webhookSub}
      </text>

      <line
        x1={cx(x1)}
        y1={whY}
        x2={cx(x1)}
        y2={yB - 2}
        stroke={webhookStroke}
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#m10tf-dash-${uid})`}
      />
      <text
        x={cx(x1) + 68}
        y={whY + BOX_H / 2}
        fill={webhookText}
        fontSize="9"
        fontWeight="600"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.arrowToTrigger}
      </text>
    </svg>
  );
}
