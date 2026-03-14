/**
 * Agentų ciklo diagrama (M10.2) – horizontali schema:
 * Agentas → Planavimas → Įrankiai → Aplinka → Rezultatas + grįžtamasis ryšys.
 * SCHEME_AGENT: viena geometrijos tiesa (§3.1), rodyklės kraštas į kraštą (§3.2), proporcingos (§3.3), feedback path nekerta blokų (§3.4).
 */
import { useId } from 'react';

const VIEWBOX = '0 0 860 330';
const VB_WIDTH = 860;
const VB_HEIGHT = 330;

/* Geometrijos konstantos – viena tiesa (SCHEME_AGENT §3.1) */
const BOX_W = 140;
const BOX_H = 72;
const GAP = 24;
const ARROW_GAP_FWD = 5;
const ARROW_GAP_FB = 12;
const START_X = 24;
const ROW_Y = 82;
const ARROW_MARKER_LEN = 10;

const FB_TIP_H = 12;
const FB_TIP_W = 8;
const FB_CORNER_R = 14;

const BRAND = '#334e68';
const BRAND_LIGHT = '#486581';
const ACCENT = '#b8860b';
const ACCENT_DARK = '#7a5807';
const GREY_FORWARD = '#7B8794';
const BORDER = '#bcccdc';
const BG_LIGHT = '#f0f4f8';
const TEXT_DARK = '#102a43';

const STEPS = [
  { x: START_X, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Agentas', desc: 'DI sistema' },
  { x: START_X + (BOX_W + GAP) * 1, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Planavimas', desc: 'žingsniai' },
  { x: START_X + (BOX_W + GAP) * 2, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Įrankiai', desc: 'paieška, API' },
  { x: START_X + (BOX_W + GAP) * 3, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Aplinka', desc: 'kontekstas' },
  { x: START_X + (BOX_W + GAP) * 4, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Rezultatas', desc: 'išvestis' },
];

const FORWARD_LABELS = ['užduotis', 'žingsniai', 'įrankiai', 'kontekstas'] as const;
const FEEDBACK_LABEL = 'grįžtamasis ryšys';

export default function AgentWorkflowDiagram({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const first = STEPS[0];
  const last = STEPS[4];
  const firstCx = first.x + first.w / 2;
  const lastCx = last.x + last.w / 2;
  const firstBottom = first.y + first.h;
  const lastBottom = last.y + last.h;
  const fbY = ROW_Y + BOX_H + 56;
  const fbTriBase = firstBottom + FB_TIP_H;
  const R = FB_CORNER_R;
  const fbStartY = lastBottom + ARROW_GAP_FB;
  const feedbackPath = `M ${lastCx} ${fbStartY}
     L ${lastCx} ${fbY - R}
     Q ${lastCx} ${fbY}, ${lastCx - R} ${fbY}
     L ${firstCx + R} ${fbY}
     Q ${firstCx} ${fbY}, ${firstCx} ${fbY - R}
     L ${firstCx} ${fbTriBase}`;

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label="Agentų ciklas: Agentas, Planavimas, Įrankiai, Aplinka, Rezultatas ir grįžtamasis ryšys"
    >
      <defs>
        <linearGradient id={`aw-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BG_LIGHT} />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker id={`aw-arrow-${uid}`} markerWidth={ARROW_MARKER_LEN + 2} markerHeight={8} refX={ARROW_MARKER_LEN} refY="4" orient="auto">
          <path d={`M0 0 L${ARROW_MARKER_LEN} 4 L0 8 Z`} fill={GREY_FORWARD} stroke={GREY_FORWARD} strokeWidth="0.5" />
        </marker>
        <linearGradient id={`aw-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BRAND_LIGHT} />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
      </defs>

      <rect width={VB_WIDTH} height={VB_HEIGHT} fill={`url(#aw-bg-${uid})`} rx="12" />
      <rect width={VB_WIDTH} height={VB_HEIGHT} fill="none" stroke={BORDER} strokeWidth="1" rx="12" />

      <text x={VB_WIDTH / 2} y="28" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="18" fontWeight="800" fill={TEXT_DARK}>
        Agentų ciklas
      </text>

      {STEPS.map((step, i) => {
        const rightEdge = step.x + step.w;
        const centerX = step.x + step.w / 2;
        const centerY = step.y + step.h / 2;
        const next = STEPS[i + 1];
        const gapCenterX = rightEdge + GAP / 2;
        const lblY = step.y - 6;

        return (
          <g key={i}>
            <rect
              x={step.x}
              y={step.y}
              width={step.w}
              height={step.h}
              rx="10"
              fill={`url(#aw-step-${uid})`}
              stroke={BRAND}
              strokeWidth="1.5"
            />
            <text x={centerX} y={step.y + 28} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="700" fill="white">
              {step.title}
            </text>
            <text x={centerX} y={step.y + 48} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="11" fontWeight="500" fill="rgba(255,255,255,0.95)">
              {step.desc}
            </text>

            {next && (() => {
              const toX = next.x - ARROW_MARKER_LEN;
              const fromX = rightEdge + ARROW_GAP_FWD;
              return (
                <g key={`arrow-${i}`} aria-label={`${step.title} → ${next.title}: ${FORWARD_LABELS[i]}`}>
                  <line x1={fromX} y1={centerY} x2={toX} y2={centerY} stroke={GREY_FORWARD} strokeWidth="3" markerEnd={`url(#aw-arrow-${uid})`} />
                  {FORWARD_LABELS[i] && (
                    <text x={gapCenterX} y={lblY} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="10" fontWeight="700" fill={TEXT_DARK}>
                      {FORWARD_LABELS[i]}
                    </text>
                  )}
                </g>
              );
            })()}
          </g>
        );
      })}

      <circle cx={lastCx} cy={fbStartY} r={5} fill={ACCENT} stroke={ACCENT_DARK} strokeWidth="0.8" />
      <path
        d={feedbackPath}
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeDasharray="8 4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title>Grįžtamasis ryšys: rezultatas grįžta į agentą</title>
      </path>
      <polygon
        points={`${firstCx - FB_TIP_W},${fbTriBase} ${firstCx},${firstBottom} ${firstCx + FB_TIP_W},${fbTriBase}`}
        fill={ACCENT}
        stroke={ACCENT_DARK}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <text
        x={(lastCx + firstCx) / 2}
        y={fbY + 16}
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill={ACCENT_DARK}
      >
        {FEEDBACK_LABEL}
      </text>
    </svg>
  );
}
