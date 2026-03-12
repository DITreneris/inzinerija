/**
 * RL proceso diagrama – horizontali schema (Agentas → Aplinka → Veiksmas → Atlygis).
 * Interaktyvi: currentStep, onStepClick – paspaudus žingsnį, rodomas paaiškinimas apačioje.
 * SCHEME_AGENT: forward = pilka arrow (užpildytas trikampis); feedback = ACCENT arrow į viršų (užpildytas trikampis).
 * Rodyklės = arrow (filled triangle), ne chevron (stroke „>“).
 */
import { useId, useState, useEffect } from 'react';

/* ═══ Viewbox – sutemptas (mažiau tuščios erdvės, schema vizualiai didesnė) ═══ */
const VIEWBOX_DESKTOP = '0 0 920 268';
const VIEWBOX_MOBILE = '0 0 520 420';
const VB_WIDTH_DESKTOP = 920;
const VB_HEIGHT_DESKTOP = 268;
const VB_WIDTH_MOBILE = 520;
const VB_HEIGHT_MOBILE = 420;
const STEP_ACTIVE_OPACITY = 1;
const STEP_INACTIVE_OPACITY = 0.5;

/* ═══ Geometrijos konstantos – viena tiesa (SCHEME_AGENT §3.1) ═══ */
const BOX_W = 200;
const BOX_H = 88;
const GAP = 20;             /** Sumažintas ~29% – vientisas ciklas, ne išsibarstę kortelės */
const ARROW_GAP_FB = 12;   /** Feedback: comfortable gap below box */
const START_X = 32;         /** Paskutinis box: 32+3×(200+20)+200=892<920 */
const ROW_Y = 54;           /** Sutemptas viewbox – mažiau oro viršuje/apačioje */
/** Rodyklės antgalis = kaip LLM (DIAGRAMU_GERIAUSIOS_PRAKTIKOS §6.1): 6px, refX=0 kad smailė liestų bloką. */
const ARROW_MARKER_LEN = 6;

/* ═══ Forward labels – individualūs pločiai (centered-on-edge, yWorks pattern) ═══ */
// (eksportuojame tik komponentus; label fonų/plotų konstantos pašalintos – buvo nenaudojamos)

/* ═══ Feedback rodyklė – didelė, aiški (ciklas = RL esmė, ne dekoras) ═══ */
const FB_TIP_H = 12;       /** Trikampio aukštis – proporcingas, smailė ne ant bloko */
const FB_TIP_W = 8;        /** Trikampio pusė pločio */
const FB_CORNER_R = 16;    /** Rounded corners feedback path */
const FB_PATH_STROKE = 3.5;/** Grįžtamoji – dashed, ne „priklijuota“ (SCHEME_AGENT §3.7.4) */
const FB_GAP_ABOVE_BLOCK = 2; /** Tarpas tarp bloko apačios ir feedback smailės – ne užlipa ant bloko */

/* ═══ Spalvos – procesas: Agentas (brand) → Aplinka (neutrali) → Veiksmas (šviesiai mėlyna) → Atlygis (accent) ═══ */
const BRAND = '#334e68';           /* Agentas – tamsiai mėlynas (brand) */
const _BRAND_LIGHT = '#486581';
const ENV_START = '#475569';       /* Aplinka – neutrali pilka (ne mėlyna) */
const ENV_END = '#64748b';
const ACTION_START = '#4a7aa0';    /* Veiksmas – aiškiai mėlyna */
const ACTION_END = '#6b9bc0';
const ACCENT = '#b8860b';          /* Atlygis – kontrastingas (auksas) */
const ACCENT_DARK = '#7a5807';
const ACCENT_LIGHT = '#d4a520';
const BORDER = '#bcccdc';
/** Forward rodyklės – tamsesnė, storesnė (flow jėga, ne silpnas „>“). */
const FORWARD_STROKE = '#475569';
const BG_LIGHT = '#f0f4f8';
const BG_LIGHT_END = '#f1f5f9';
const TEXT_DARK = '#102a43';
const TEXT_MUTED = '#64748b';  /** Rodyklių etiketėms – nesikonkuruoja su blokais */
/* ═══ Desktop: viena eilė ═══ */
const STEPS_ROW = [
  { x: START_X, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Agentas', desc: 'DI sistema' },
  { x: START_X + (BOX_W + GAP) * 1, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Aplinka', desc: 'situacija / užduotis' },
  { x: START_X + (BOX_W + GAP) * 2, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Veiksmas', desc: 'ką padaro' },
  { x: START_X + (BOX_W + GAP) * 3, y: ROW_Y, w: BOX_W, h: BOX_H, title: 'Atlygis', desc: 'gerai / blogai' },
];

/* ═══ Mobile: 2×2 grid ═══ */
const MOBILE_OFFSET_X = 40;
const MOBILE_OFFSET_Y = 60;
const STEPS_GRID = [
  { x: MOBILE_OFFSET_X, y: MOBILE_OFFSET_Y, w: BOX_W, h: BOX_H, title: 'Agentas', desc: 'DI sistema' },
  { x: MOBILE_OFFSET_X + BOX_W + GAP, y: MOBILE_OFFSET_Y, w: BOX_W, h: BOX_H, title: 'Aplinka', desc: 'situacija / užduotis' },
  { x: MOBILE_OFFSET_X, y: MOBILE_OFFSET_Y + BOX_H + GAP, w: BOX_W, h: BOX_H, title: 'Veiksmas', desc: 'ką padaro' },
  { x: MOBILE_OFFSET_X + BOX_W + GAP, y: MOBILE_OFFSET_Y + BOX_H + GAP, w: BOX_W, h: BOX_H, title: 'Atlygis', desc: 'gerai / blogai' },
];

/** Etiketės ant forward rodyklių */
const FORWARD_LABELS = ['sprendimas', 'atlikimas', 'rezultatas'] as const;
/** Etiketė ant grįžtamosios rodyklės */
const FEEDBACK_LABEL = 'elgesio korekcija';

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

function stepFillId(uid: string, index: number): string {
  if (index === 0) return `url(#rl-step-${uid})`;
  if (index === 1) return `url(#rl-env-${uid})`;
  if (index === 2) return `url(#rl-action-${uid})`;
  return `url(#rl-atlygis-${uid})`;
}

export default function RlProcessDiagram({
  currentStep = 0,
  onStepClick,
  className = '',
}: RlProcessDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const isInteractive = typeof onStepClick === 'function';
  const isCompact = useIsCompact();
  const STEPS = isCompact ? STEPS_GRID : STEPS_ROW;
  const viewBox = isCompact ? VIEWBOX_MOBILE : VIEWBOX_DESKTOP;
  const vbWidth = isCompact ? VB_WIDTH_MOBILE : VB_WIDTH_DESKTOP;
  const vbHeight = isCompact ? VB_HEIGHT_MOBILE : VB_HEIGHT_DESKTOP;

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

  /* ═══ Feedback geometry ═══ */
  const firstCx = first.x + first.w / 2;
  const lastCx = last.x + last.w / 2;
  const firstBottom = first.y + first.h;
  const lastBottom = last.y + last.h;
  const fbY = isCompact
    ? MOBILE_OFFSET_Y + 2 * (BOX_H + GAP) + 48
    : ROW_Y + BOX_H + 48;

  /**
   * Feedback path: dashed ACCENT (§3.7.4), path baigiasi ties smailės tašku – ne ant bloko.
   * Smailė firstBottom + FB_GAP_ABOVE_BLOCK, trikampio bazė žemiau.
   */
  const fbTipY = firstBottom + FB_GAP_ABOVE_BLOCK;
  const fbTriBaseY = fbTipY + FB_TIP_H;
  const R = FB_CORNER_R;
  const fbStartY = lastBottom + ARROW_GAP_FB;
  const feedbackPath = isCompact
    ? `M ${lastCx} ${fbStartY}
       L ${lastCx} ${fbY}
       L ${firstCx} ${fbY}
       L ${firstCx} ${fbTipY}`
    : `M ${lastCx} ${fbStartY}
       L ${lastCx} ${fbY - R}
       Q ${lastCx} ${fbY}, ${lastCx - R} ${fbY}
       L ${firstCx + R} ${fbY}
       Q ${firstCx} ${fbY}, ${firstCx} ${fbY - R}
       L ${firstCx} ${fbTipY}`;

  return (
    <svg
      viewBox={viewBox}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`RL proceso schema.${isInteractive ? ' Paspausk žingsnį, kad pamatytum paaiškinimą.' : ''}`}
    >
      <defs>
        <linearGradient id={`rl-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BG_LIGHT} />
          <stop offset="100%" stopColor={BG_LIGHT_END} />
        </linearGradient>
        {/* Forward rodyklė = kaip LLM: mažas trikampis, refX=0 – smailė liečia bloko kraštą (DIAGRAMU_GERIAUSIOS_PRAKTIKOS §6.1) */}
        <marker id={`rl-arrow-${uid}`} markerUnits="userSpaceOnUse" markerWidth="6" markerHeight="5" refX="0" refY="2.5" orient="auto">
          <path d="M0 0 L6 2.5 L0 5 Z" fill={FORWARD_STROKE} stroke={FORWARD_STROKE} strokeWidth="0.4" />
        </marker>
        {/* Feedback – arrow į viršų (užpildytas trikampis) */}
        {/* Agentas – sušvelnintas brand (vienodas svoris su kitais) */}
        <linearGradient id={`rl-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5a6d7d" />
          <stop offset="100%" stopColor={BRAND} />
        </linearGradient>
        {/* Aplinka – neutrali pilka */}
        <linearGradient id={`rl-env-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ENV_END} />
          <stop offset="100%" stopColor={ENV_START} />
        </linearGradient>
        {/* Veiksmas – šviesesnė mėlyna */}
        <linearGradient id={`rl-action-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ACTION_END} />
          <stop offset="100%" stopColor={ACTION_START} />
        </linearGradient>
        {/* Atlygis – sušvelnintas accent (vienodas svoris su kitais) */}
        <linearGradient id={`rl-atlygis-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ACCENT_LIGHT} />
          <stop offset="100%" stopColor="#a67a0a" />
        </linearGradient>
        <filter id={`rl-glow-active-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={BRAND} floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Background */}
      <rect width={vbWidth} height={vbHeight} fill={`url(#rl-bg-${uid})`} rx="12" />
      <rect width={vbWidth} height={vbHeight} fill="none" stroke={BORDER} strokeWidth="1" rx="12" />

      {/* Title – progresas „Tu esi čia“ RlProcessBlock */}
      {!isCompact && (
        <text x={vbWidth / 2} y="28" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="17" fontWeight="800" fill={TEXT_DARK}>
          RL proceso struktūra
        </text>
      )}
      {isCompact && (
        <text x={vbWidth / 2} y="32" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="800" fill={TEXT_DARK}>
          RL struktūra
        </text>
      )}

      {/* ═══ Steps (boxes + forward arrows + labels) ═══ */}
      {STEPS.map((step, i) => {
        const isActive = currentStep === i;
        const isHovered = hoveredStep === i;
        const _isAtlygis = i === 3;
        const opacity = isActive ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY;
        const [x, y, w, h] = [step.x, step.y, step.w, step.h];
        const rightEdge = x + w;
        const bottomEdge = y + h;
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const next = STEPS[i + 1];
        const fill = stepFillId(uid, i);
        const strokeColor = isActive ? TEXT_DARK : isHovered ? TEXT_DARK : (i === 0 ? BRAND : i === 1 ? ENV_START : i === 2 ? ACTION_START : ACCENT_DARK);
        const strokeW = isActive || isHovered ? 2.5 : 1.5;
        const boxFilter = isActive ? `url(#rl-glow-active-${uid})` : undefined;
        const scaleTransform = isActive ? `translate(${centerX},${centerY}) scale(1.03) translate(${-centerX},${-centerY})` : undefined;

        return (
          <g key={i}>
            {/* Box – spalvų logika, hover + aktyvus (scale 1.03 + glow) */}
            <g
              opacity={opacity}
              transform={scaleTransform}
              style={{ transition: 'opacity 0.2s ease, transform 0.2s ease' }}
              aria-hidden
            >
              <rect
                x={x} y={y} width={w} height={h} rx="10"
                fill={fill}
                stroke={strokeColor}
                strokeWidth={strokeW}
                filter={boxFilter}
                style={{ transition: 'stroke 0.15s ease, stroke-width 0.15s ease' }}
              />
              <text x={centerX} y={y + 32} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="14" fontWeight="700" fill="white">
                {step.title}
              </text>
              <text x={centerX} y={y + 52} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="rgba(255,255,255,0.95)">
                {step.desc}
              </text>
            </g>

            {/* Click target + hover (a11y: §3.5) */}
            {isInteractive && (
              <rect
                x={x} y={y} width={w} height={h} rx="10"
                fill="transparent" cursor="pointer"
                onClick={() => onStepClick?.(i)}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                aria-label={`Žingsnis ${i + 1}: ${step.title}. Paspausk paaiškinimui.`}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(i); } }}
              />
            )}

            {/* Forward arrow + centered-on-edge label (yWorks / GoJS pattern) */}
            {next && (() => {
              const n = next;
              const labelText = FORWARD_LABELS[i];

              /* ── Etiketės VIRŠ rodyklių, laisvoje erdvėje tarp title ir box'ų ── */
              const gapCenterX = rightEdge + GAP / 2;
              const lblY = step.y - 6;          /* teksto baseline: 6px virš box viršaus */
              const lblRectY = lblY - 13;        /* rect viršus */
              const lblRectH = 18;

              if (forwardEdges[i]?.axis === 'y') {
                const nCenterX = n.x + n.w / 2;
                const y1 = bottomEdge;
                const y2 = n.y - ARROW_MARKER_LEN;
                return (
                  <g key={`arrow-${i}`} aria-label={`Rodyklė: ${step.title} → ${n.title} (${labelText})`}>
                    <line x1={centerX} y1={y1} x2={nCenterX} y2={y2} stroke={FORWARD_STROKE} strokeWidth="2" strokeLinecap="round" markerEnd={`url(#rl-arrow-${uid})`} />
                    {labelText && (
                      <text x={(centerX + nCenterX) / 2 + 14} y={(y1 + y2) / 2 + 4} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="10" fontWeight="600" fill={TEXT_MUTED}>{labelText}</text>
                    )}
                  </g>
                );
              }

              /** Rodyklė kraštas į kraštą (DIAGRAMU_GERIAUSIOS_PRAKTIKOS §6.1): pradžia = bloko dešinė, pabaiga = kito kairė − ARROW_MARKER_LEN */
              const fromX = rightEdge;
              const arrowY = centerY;
              const toX = n.x - ARROW_MARKER_LEN;
              const connTop = lblRectY + lblRectH;   /* connector start: label rect apačia */
              return (
                <g key={`arrow-${i}`} aria-label={`Rodyklė: ${step.title} → ${n.title} (${labelText})`}>
                  {/* Horizontalus jungtis – storesnė linija, aiški kryptis */}
                  <line x1={fromX} y1={arrowY} x2={toX} y2={arrowY} stroke={FORWARD_STROKE} strokeWidth="2" strokeLinecap="round" markerEnd={`url(#rl-arrow-${uid})`} />
                  {/* Etiketė virš gap'o + vertikalus connector */}
                  {labelText && (
                    <>
                      <line x1={gapCenterX} y1={connTop} x2={gapCenterX} y2={arrowY} stroke={FORWARD_STROKE} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                      <text x={gapCenterX} y={lblY} textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="10" fontWeight="600" fill={TEXT_MUTED}>{labelText}</text>
                    </>
                  )}
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* ═══ Feedback loop: ciklas = RL esmė – solid, storesnė, ryški (ne dekoras) ═══ */}

      {/* Start indicator – ryškus pradžios taškas */}
      <circle cx={lastCx} cy={fbStartY} r={6} fill={ACCENT} stroke={ACCENT_DARK} strokeWidth="1.5">
        <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Dashed path – grįžtamasis ryšys, nekerta bloko (SCHEME_AGENT §3.7.4) */}
      <path
        d={feedbackPath}
        stroke={ACCENT_DARK}
        strokeWidth={FB_PATH_STROKE}
        strokeDasharray="8 4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title>Grįžtamasis ryšys: atlygis grįžta į agentą ir keičia elgesį</title>
      </path>

      {/* Feedback arrow – smailė ties fbTipY (po bloku), bazė žemiau */}
      <polygon
        points={`${firstCx - FB_TIP_W},${fbTriBaseY} ${firstCx},${fbTipY} ${firstCx + FB_TIP_W},${fbTriBaseY}`}
        fill={ACCENT_DARK}
      />

      {/* Feedback label – paryškinta kaip ciklo dalis */}
      <text
        x={(lastCx + firstCx) / 2}
        y={fbY + 16}
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill={ACCENT_DARK}
      >
        {FEEDBACK_LABEL}
      </text>
    </svg>
  );
}
