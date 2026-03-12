/**
 * Pilna Custom GPT proceso diagrama su paryškinimu: aktyvus žingsnis ryškus, kiti priteminti.
 * Vartotojas visada mato, kurioje diagramos dalyje yra.
 */
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

const VIEWBOX = '0 0 560 700';
const STEP_ACTIVE_OPACITY = 1;
const STEP_INACTIVE_OPACITY = 0.45;

/** Fiksuotas tarpas tarp žingsnių 1–6: visos mėlynos rodyklės vienodo ilgio, proporcingos. */
const BOX_H = 56;
const GAP = 28;
const COLS_X = 140;
const COLS_W = 280;

/** Arrow marker length (refX): linija baigiasi prieš tikslo kraštą, kad antgalis liestų kraštą. Mažesnis = proporcingesnė rodyklė. */
const ARROW_MARKER_LEN = 6;
const ARROW_FB_MARKER_LEN = 14;

/** Žingsnių ribos [x, y, width, height]. 1–6: vienodas GAP, vienodos rodyklės. */
const STEP_BOXES: [number, number, number, number][] = [
  [COLS_X, 78, COLS_W, BOX_H],                                    // 1 Tikslas
  [COLS_X, 78 + (BOX_H + GAP) * 1, COLS_W, BOX_H],                 // 2 Rolė
  [COLS_X, 78 + (BOX_H + GAP) * 2, COLS_W, BOX_H],                 // 3 Prisijungimas
  [COLS_X, 78 + (BOX_H + GAP) * 3, COLS_W, BOX_H],                 // 4 Konfigūracija
  [COLS_X, 78 + (BOX_H + GAP) * 4, COLS_W, BOX_H],                 // 5 Papildomos funkcijos
  [COLS_X, 78 + (BOX_H + GAP) * 5, COLS_W, BOX_H],                 // 6 Testavimas
  [80, 612, 160, 52],                                              // 7 Publikavimas
  [320, 612, 160, 52],                                             // 8 Tobulinimas
];

const CX = 280; // center x for steps 1–6 and vertical spine
const HORIZ_Y = 588;   // y of horizontal branch
const BRANCH_LEFT_X = 160;   // center of step 7 (80 + 160/2)
const BRANCH_RIGHT_X = 400;  // center of step 8 (320 + 160/2)

const STEP_TITLES_LT = ['Tikslas', 'Rolė', 'Prisijungimas', 'Konfigūracija', 'Papildomos funkcijos', 'Testavimas', 'Publikavimas', 'Tobulinimas'];

interface CustomGptProcessDiagramProps {
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  /** Step titles for locale-aware aria-labels (e.g. from ProcessStepper steps); falls back to LT when omitted */
  stepTitles?: string[];
}

export default function CustomGptProcessDiagram({ currentStep, onStepClick, className = '', stepTitles }: CustomGptProcessDiagramProps) {
  const { t } = useTranslation('stepper');
  const uid = useId().replace(/:/g, '');
  const step = (i: number) => (currentStep === i ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY);
  const isInteractive = typeof onStepClick === 'function';
  const titles = stepTitles ?? STEP_TITLES_LT;
  const getStepAria = (i: number) => (i >= 0 && i < titles.length ? t('stepButtonAria', { id: i + 1, title: titles[i] }) : '');

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-2xl mx-auto block ${className}`}
      aria-hidden="true"
      role="img"
      aria-label={isInteractive ? t('diagramAria', { n: currentStep + 1 }) : t('diagramAriaStatic', { n: currentStep + 1 })}
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f4f8" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker id={`arrow-${uid}`} markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#334e68" stroke="#334e68" strokeWidth="0.5" />
        </marker>
        <marker id={`arrow-fb-${uid}`} markerWidth="16" markerHeight="11" refX="14" refY="5.5" orient="auto">
          <path d="M0 0 L16 5.5 L0 11 Z" fill="#b8860b" stroke="#7a5807" strokeWidth="0.6" />
        </marker>
        <linearGradient id={`step-grad-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#486581" />
          <stop offset="100%" stopColor="#334e68" />
        </linearGradient>
        <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#334e68" floodOpacity="0.4" />
        </filter>
      </defs>

      <rect width="560" height="700" fill={`url(#bg-${uid})`} rx="12" />
      <rect width="560" height="700" fill="none" stroke="#bcccdc" strokeWidth="1" rx="12" />

      <text x="280" y="37" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="24" fontWeight="800" fill="#102a43">
        Custom GPT kūrimo procesas
      </text>
      <text x="280" y="60" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="14" fontWeight="500" fill="#334e68">
        Tikslas → Rolė → … → Tobulinimas
      </text>

      {/* Žingsnis 1 */}
      <g opacity={step(0)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="140" y="78" width="280" height="56" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 0 ? 2.5 : 1.5} filter={currentStep === 0 ? `url(#glow-${uid})` : undefined} />
        <text x="280" y="108" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="700" fill="white">1 · TIKSLAS</text>
        <text x="280" y="132" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">Kam skirtas? (pardavimai, mokymai, kūryba)</text>
      </g>
      {isInteractive && (
        <rect x="140" y="78" width="280" height="56" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick?.(0)} aria-label={getStepAria(0)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(0); } }} />
      )}
      <line x1={CX} y1={STEP_BOXES[0][1] + STEP_BOXES[0][3]} x2={CX} y2={STEP_BOXES[1][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />

      {/* Žingsnis 2 */}
      <g opacity={step(1)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="140" y="162" width="280" height="56" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 1 ? 2.5 : 1.5} filter={currentStep === 1 ? `url(#glow-${uid})` : undefined} />
        <text x="280" y="192" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="700" fill="white">2 · ROLĖ</text>
        <text x="280" y="216" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">Tonas, stilius, kompetencija</text>
      </g>
      {isInteractive && (
        <rect x="140" y="162" width="280" height="56" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick?.(1)} aria-label={getStepAria(1)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(1); } }} />
      )}
      <line x1={CX} y1={STEP_BOXES[1][1] + STEP_BOXES[1][3]} x2={CX} y2={STEP_BOXES[2][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />

      {/* Žingsnis 3 */}
      <g opacity={step(2)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="140" y="246" width="280" height="56" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 2 ? 2.5 : 1.5} filter={currentStep === 2 ? `url(#glow-${uid})` : undefined} />
        <text x="280" y="276" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="700" fill="white">3 · PRISIJUNGIMAS</text>
        <text x="280" y="300" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">ChatGPT → Explore GPTs → Create a GPT</text>
      </g>
      {isInteractive && (
        <rect x="140" y="246" width="280" height="56" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick(2)} aria-label="Žingsnis 3: Prisijungimas" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick(2); } }} />
      )}
      <line x1={CX} y1={STEP_BOXES[2][1] + STEP_BOXES[2][3]} x2={CX} y2={STEP_BOXES[3][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />

      {/* Žingsnis 4 */}
      <g opacity={step(3)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="140" y="330" width="280" height="56" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 3 ? 2.5 : 1.5} filter={currentStep === 3 ? `url(#glow-${uid})` : undefined} />
        <text x="280" y="360" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="700" fill="white">4 · KONFIGŪRACIJA</text>
        <text x="280" y="384" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">Pavadinimas, aprašymas, instrukcijos, persona</text>
      </g>
      {isInteractive && (
        <rect x="140" y="330" width="280" height="56" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick?.(3)} aria-label={getStepAria(3)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(3); } }} />
      )}
      <line x1={CX} y1={STEP_BOXES[3][1] + STEP_BOXES[3][3]} x2={CX} y2={STEP_BOXES[4][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />

      {/* Žingsnis 5 */}
      <g opacity={step(4)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="140" y="414" width="280" height="56" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 4 ? 2.5 : 1.5} filter={currentStep === 4 ? `url(#glow-${uid})` : undefined} />
        <text x="280" y="444" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="700" fill="white">5 · PAPILDOMOS FUNKCIJOS</text>
        <text x="280" y="468" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">Dokumentai, API, įrankiai</text>
      </g>
      {isInteractive && (
        <rect x="140" y="414" width="280" height="56" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick?.(4)} aria-label={getStepAria(4)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(4); } }} />
      )}
      <line x1={CX} y1={STEP_BOXES[4][1] + STEP_BOXES[4][3]} x2={CX} y2={STEP_BOXES[5][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />

      {/* Žingsnis 6 */}
      <g opacity={step(5)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="140" y="498" width="280" height="56" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 5 ? 2.5 : 1.5} filter={currentStep === 5 ? `url(#glow-${uid})` : undefined} />
        <text x="280" y="528" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="15" fontWeight="700" fill="white">6 · TESTAVIMAS</text>
        <text x="280" y="552" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="13" fontWeight="500" fill="#334e68">Išbandykite ir pataisykite</text>
      </g>
      {isInteractive && (
        <rect x="140" y="498" width="280" height="56" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick?.(5)} aria-label={getStepAria(5)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(5); } }} />
      )}
      {/* 6 → horizontal spine (no marker); spine → branches; branches → 7 & 8 edge-to-edge */}
      <line x1={CX} y1={STEP_BOXES[5][1] + STEP_BOXES[5][3]} x2={CX} y2={HORIZ_Y} stroke="#334e68" strokeWidth="2" />
      <line x1={CX} y1={HORIZ_Y} x2={BRANCH_LEFT_X} y2={HORIZ_Y} stroke="#334e68" strokeWidth="2" />
      <line x1={CX} y1={HORIZ_Y} x2={BRANCH_RIGHT_X} y2={HORIZ_Y} stroke="#334e68" strokeWidth="2" />
      <line x1={BRANCH_LEFT_X} y1={HORIZ_Y} x2={BRANCH_LEFT_X} y2={STEP_BOXES[6][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />
      <line x1={BRANCH_RIGHT_X} y1={HORIZ_Y} x2={BRANCH_RIGHT_X} y2={STEP_BOXES[7][1] - ARROW_MARKER_LEN} stroke="#334e68" strokeWidth="2" markerEnd={`url(#arrow-${uid})`} />

      {/* Žingsnis 7 */}
      <g opacity={step(6)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="80" y="612" width="160" height="52" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 6 ? 2.5 : 1.5} filter={currentStep === 6 ? `url(#glow-${uid})` : undefined} />
        <text x="160" y="638" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="14" fontWeight="700" fill="white">7 · PUBLIKAVIMAS</text>
        <text x="160" y="658" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="rgba(255,255,255,0.95)">✓ Sėkmė</text>
      </g>
      {isInteractive && (
        <rect x="80" y="612" width="160" height="52" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick(6)} aria-label="Žingsnis 7: Publikavimas" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick(6); } }} />
      )}
      {/* Žingsnis 8 */}
      <g opacity={step(7)} style={{ transition: 'opacity 0.25s ease' }} aria-hidden>
        <rect x="320" y="612" width="160" height="52" rx="12" fill={`url(#step-grad-${uid})`} stroke="#334e68" strokeWidth={currentStep === 7 ? 2.5 : 1.5} filter={currentStep === 7 ? `url(#glow-${uid})` : undefined} />
        <text x="400" y="638" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="14" fontWeight="700" fill="white">8 · TOBULINIMAS</text>
        <text x="400" y="658" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="12" fontWeight="500" fill="rgba(255,255,255,0.95)">Grįžtamasis ryšys</text>
      </g>
      {isInteractive && (
        <rect x="320" y="612" width="160" height="52" rx="12" fill="transparent" cursor="pointer" onClick={() => onStepClick?.(7)} aria-label={getStepAria(7)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick?.(7); } }} />
      )}

      {/* Grįžtamasis ryšys 8 → 4: paskutinis segmentas 436→434 (kryptis į kairę), antgalis liečia 4 dešinį kraštą (420), trikampis neįeina į bloką */}
      <path
        d={`M ${STEP_BOXES[7][0] + STEP_BOXES[7][2]} ${STEP_BOXES[7][1] + STEP_BOXES[7][3] / 2} L 500 638 L 500 400 L 500 365 Q 500 358 432 358 L ${STEP_BOXES[3][0] + STEP_BOXES[3][2] + ARROW_FB_MARKER_LEN + 2} ${STEP_BOXES[3][1] + STEP_BOXES[3][3] / 2} L ${STEP_BOXES[3][0] + STEP_BOXES[3][2] + ARROW_FB_MARKER_LEN} ${STEP_BOXES[3][1] + STEP_BOXES[3][3] / 2}`}
        stroke="#b8860b"
        strokeWidth="3"
        fill="none"
        strokeDasharray="10 6"
        strokeLinejoin="round"
        strokeLinecap="round"
        markerEnd={`url(#arrow-fb-${uid})`}
      />
    </svg>
  );
}
