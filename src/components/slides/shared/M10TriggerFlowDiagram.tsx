/**
 * M10 – Trigger → Condition → Action + Webhook → Trigger (SCHEME_AGENT: rodyklės kraštas į kraštą).
 */
import { useId } from 'react';
import { getM10TriggerFlowLabels, type M10Locale } from './m10DiagramContent';

const W = 640;
const H = 200;
const BOX_W = 118;
const BOX_H = 52;
const GAP = 22;
const Y_MAIN = 48;
const X0 = 36;
const _BRAND = '#334e68';
const GREY = '#7B8794';
const ACCENT = '#b8860b';
const ARROW = 8;

export default function M10TriggerFlowDiagram({
  locale = 'lt',
  className = '',
}: {
  locale?: M10Locale;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const L = getM10TriggerFlowLabels(locale);
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
          <path d={`M0 0 L${ARROW} 3.5 L0 7 Z`} fill={ACCENT} />
        </marker>
      </defs>
      <text
        x={W / 2}
        y={22}
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="#102a43"
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
            stroke="#102a43"
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

      <rect
        x={whX}
        y={whY}
        width={BOX_W}
        height={BOX_H}
        rx="10"
        fill="#fef3c7"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <text
        x={cx(whX)}
        y={whY + 22}
        textAnchor="middle"
        fill="#713f12"
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
        fill="#92400e"
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
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd={`url(#m10tf-dash-${uid})`}
      />
      <text
        x={cx(x1) + 68}
        y={whY + BOX_H / 2}
        fill="#7a5807"
        fontSize="9"
        fontWeight="600"
        fontFamily="'Plus Jakarta Sans',system-ui,sans-serif"
      >
        {L.arrowToTrigger}
      </text>
    </svg>
  );
}
