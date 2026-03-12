/**
 * Autoregresinio LLM diagrama – dvi eilutės (Žingsnis N, N+1), keturi blokai eilutėje.
 * 8 žingsnių: 0–3 = N (Įvestis, LLM, Išvestis, Pasirinkta), 4–7 = N+1 (tie patys).
 * Forward rodyklės į dešinę; feedback path: Pasirinkta N → Įvestis N+1.
 * Geometrija: llmAutoregressiveLayout.ts (viena tiesa).
 */
import { useId } from 'react';
import {
  VIEWBOX,
  VIEWBOX_W,
  VIEWBOX_H,
  SOURCE_LABEL_Y,
  FONT,
  SIZE_H1,
  SIZE_SCHEMA_LABEL,
  SIZE_BODY,
  SIZE_BODY_OUTPUT,
  SIZE_MICRO,
  ROW_N,
  ROW_N1,
  ARROWS_ROW_N,
  ARROWS_ROW_N1,
  FEEDBACK,
  getOutputTextPositions,
  getTwoLineTextPositions,
  getInputTextPositions,
  getCenterTextPosition,
} from './llmAutoregressiveLayout';

const STEP_ACTIVE_OPACITY = 1;
const STEP_INACTIVE_OPACITY = 0.55;

// Spalvos (ne geometrija – čia)
const TEXT_DARK = '#0f172a';
const TEXT_MUTED = '#475569';
const GRAY_FLOW = '#64748b';
const BORDER = '#4a5568';
const INPUT_BG = '#e2eef9';
const INPUT_BORDER = '#2b5a8e';
const LLM_BG = '#5a6575';
const LLM_BG_BOTTOM = '#4a5568';
const OUTPUT_BG = '#e0f2eb';
const OUTPUT_BORDER = '#0d7a5c';
const OUTPUT_LABEL = '#0a5c44';
const PASIRINKTA_BG = '#fdf0e0';
const PASIRINKTA_TEXT = '#a65a1a';
const ACTIVE_GLOW = '#0ea5e9';

function getRowAndPhase(step: number): { row: number; phase: number } {
  return { row: step < 4 ? 0 : 1, phase: step % 4 };
}

const DIAGRAM_LABELS = {
  lt: {
    stepLabels: {
      0: 'Žingsnis 1: Įvestis (N)',
      1: 'Žingsnis 2: LLM (N)',
      2: 'Žingsnis 3: Išvestis (N)',
      3: 'Žingsnis 4: Pasirinkta (N)',
      4: 'Žingsnis 5: Įvestis (N+1)',
      5: 'Žingsnis 6: LLM (N+1)',
      6: 'Žingsnis 7: Išvestis (N+1)',
      7: 'Žingsnis 8: Pasirinkta (N+1)',
    } as Record<number, string>,
    title: 'Autoregresinis LLM: Žingsnis N → Žingsnis N+1',
    subtitle: 'Pavyzdys: Rytas, LKL · Paspausk bloką arba mygtuką 1–8',
    rowN: 'Žingsnis N',
    rowN1: 'Žingsnis N+1',
    input: 'Įvestis',
    inputLine1: 'Rytas tapo',
    inputLine2: 'čempionais',
    output: 'Išvestis',
    tokenProbs: 'Tokenų tikimybės:',
    outputN: 'čemp. 25% · 2024 20%',
    outputNLine2: 'm. 18%',
    chosen: 'Pasirinkta',
    chosenN: 'čempionais',
    outputN1: '2024 22% · m. 20%',
    outputN1Line2: 'LKL 15%',
    feedback: 'Pridedama prie naujos įvesties',
    source: 'Šaltinis: RBC Borealis – A high-level overview of LLMs',
    ariaDiagram: 'Autoregresinio LLM schema: 8 žingsnių.',
    ariaClick: ' Paspausk bloką, kad pamatytum paaiškinimą.',
    ariaStep: '. Paspausk paaiškinimui.',
  },
  en: {
    stepLabels: {
      0: 'Step 1: Input (N)',
      1: 'Step 2: LLM (N)',
      2: 'Step 3: Output (N)',
      3: 'Step 4: Chosen (N)',
      4: 'Step 5: Input (N+1)',
      5: 'Step 6: LLM (N+1)',
      6: 'Step 7: Output (N+1)',
      7: 'Step 8: Chosen (N+1)',
    } as Record<number, string>,
    title: 'Autoregressive LLM: Step N → Step N+1',
    subtitle: 'Example: Rockets, NBA · Click block or buttons 1–8',
    rowN: 'Step N',
    rowN1: 'Step N+1',
    input: 'Input',
    inputLine1: 'Rockets became',
    inputLine2: 'champions',
    output: 'Output',
    tokenProbs: 'Token probabilities:',
    outputN: 'champ. 25% · 2024 20%',
    outputNLine2: 'e.g. 18%',
    chosen: 'Chosen',
    chosenN: 'champions',
    outputN1: '2024 22% · e.g. 20%',
    outputN1Line2: 'NBA 15%',
    feedback: 'Added to new input',
    source: 'Source: RBC Borealis – A high-level overview of LLMs',
    ariaDiagram: 'Autoregressive LLM diagram: 8 steps.',
    ariaClick: ' Click block for explanation.',
    ariaStep: '. Click for explanation.',
  },
} as const;

export interface LlmAutoregressiveDiagramProps {
  locale?: 'lt' | 'en';
  currentStep?: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export default function LlmAutoregressiveDiagram({
  locale = 'lt',
  currentStep = 0,
  onStepClick,
  className = '',
}: LlmAutoregressiveDiagramProps) {
  const uid = useId().replace(/:/g, '');
  const isInteractive = typeof onStepClick === 'function';
  const { row: activeRow, phase: activePhase } = getRowAndPhase(currentStep);
  const L = DIAGRAM_LABELS[locale];

  const isBlockActive = (rowIndex: number, blockIndex: number) =>
    activeRow === rowIndex && activePhase === blockIndex;

  return (
    <svg
      viewBox={VIEWBOX}
      className={`w-full max-w-7xl mx-auto block ${className}`}
      role="img"
      aria-label={`${L.ariaDiagram}${isInteractive ? L.ariaClick : ''}`}
    >
      <defs>
        <linearGradient id={`llm-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker id={`llm-arrow-fwd-${uid}`} markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0 0 L6 2.5 L0 5 Z" fill={BORDER} stroke={BORDER} strokeWidth="0.4" />
        </marker>
        <linearGradient id={`llm-step-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={LLM_BG} />
          <stop offset="100%" stopColor={LLM_BG_BOTTOM} />
        </linearGradient>
        <filter id={`llm-shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#334e68" floodOpacity="0.25" />
        </filter>
        <filter id={`active-glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feFlood floodColor={ACTIVE_GLOW} floodOpacity="0.4" result="glow" />
          <feComposite in="glow" in2="blur" operator="in" result="soft" />
          <feMerge><feMergeNode in="soft" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width={VIEWBOX_W} height={VIEWBOX_H} fill={`url(#llm-bg-${uid})`} rx="12" />
      <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="none" stroke="#cbd5e1" strokeWidth="1" rx="12" />

      <text x={VIEWBOX_W / 2} y="36" textAnchor="middle" fontFamily={FONT} fontSize={SIZE_H1} fontWeight="600" fill={TEXT_DARK}>
        {L.title}
      </text>
      <text x={VIEWBOX_W / 2} y="58" textAnchor="middle" fontFamily={FONT} fontSize={SIZE_MICRO} fontWeight="400" fill={TEXT_MUTED}>
        {L.subtitle}
      </text>

      {/* Row N */}
      <text x="24" y={ROW_N.labelY} fontFamily={FONT} fontSize={SIZE_SCHEMA_LABEL} fontWeight="500" fill={BORDER}>
        {L.rowN}
      </text>
      {ARROWS_ROW_N.map(([x1, y, x2], i) => (
        <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={BORDER} strokeWidth="2" markerEnd={`url(#llm-arrow-fwd-${uid})`} />
      ))}
      {(() => {
        const inputPos = getTwoLineTextPositions(ROW_N.input);
        const outputPos = getOutputTextPositions(ROW_N.output);
        const pasirinktaPos = getTwoLineTextPositions(ROW_N.pasirinkta);
        const llmPos = getCenterTextPosition(ROW_N.llm);
        return (
          <>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(0, 0) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N.input[0]} y={ROW_N.input[1]} width={ROW_N.input[2]} height={ROW_N.input[3]} rx="12" fill={INPUT_BG} stroke={isBlockActive(0, 0) ? ACTIVE_GLOW : INPUT_BORDER} strokeWidth={isBlockActive(0, 0) ? 2 : 1.5} filter={isBlockActive(0, 0) ? `url(#active-glow-${uid})` : undefined} />
              <text x={inputPos.line1.x} y={inputPos.line1.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_SCHEMA_LABEL} fontWeight="600" fill={INPUT_BORDER}>{L.input}</text>
              <text x={inputPos.line2.x} y={inputPos.line2.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY} fontWeight="400" fill={TEXT_DARK} style={{ letterSpacing: '0.01em' }}>{L.inputLine1}</text>
            </g>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(0, 1) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N.llm[0]} y={ROW_N.llm[1]} width={ROW_N.llm[2]} height={ROW_N.llm[3]} rx="12" fill={`url(#llm-step-${uid})`} stroke={isBlockActive(0, 1) ? ACTIVE_GLOW : BORDER} strokeWidth={isBlockActive(0, 1) ? 2 : 1.5} filter={`url(#llm-shadow-${uid})`} />
              <text x={llmPos.x} y={llmPos.y} textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="500" fill="white">LLM</text>
            </g>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(0, 2) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N.output[0]} y={ROW_N.output[1]} width={ROW_N.output[2]} height={ROW_N.output[3]} rx="12" fill={OUTPUT_BG} stroke={isBlockActive(0, 2) ? ACTIVE_GLOW : OUTPUT_BORDER} strokeWidth={1.5} filter={isBlockActive(0, 2) ? `url(#active-glow-${uid})` : undefined} />
              <text x={outputPos.title.x} y={outputPos.title.y} textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="500" fill={OUTPUT_LABEL}>{L.output}</text>
              <text x={outputPos.label.x} y={outputPos.label.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_SCHEMA_LABEL} fontWeight="500" fill={TEXT_MUTED} style={{ letterSpacing: '0.01em' }}>{L.tokenProbs}</text>
              <text x={outputPos.body.x} y={outputPos.body.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY_OUTPUT} fontWeight="400" fill={TEXT_DARK} style={{ letterSpacing: '0.01em' }}>
                <tspan x={outputPos.body.x} dy="0">{L.outputN}</tspan>
                <tspan x={outputPos.body2.x} dy={20}>{L.outputNLine2}</tspan>
              </text>
            </g>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(0, 3) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N.pasirinkta[0]} y={ROW_N.pasirinkta[1]} width={ROW_N.pasirinkta[2]} height={ROW_N.pasirinkta[3]} rx="12" fill={PASIRINKTA_BG} stroke={isBlockActive(0, 3) ? ACTIVE_GLOW : PASIRINKTA_TEXT} strokeWidth={isBlockActive(0, 3) ? 2 : 1.5} filter={isBlockActive(0, 3) ? `url(#active-glow-${uid})` : undefined} />
              <text x={pasirinktaPos.line1.x} y={pasirinktaPos.line1.y} textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="500" fill={PASIRINKTA_TEXT}>{L.chosen}</text>
              <text x={pasirinktaPos.line2.x} y={pasirinktaPos.line2.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY} fontWeight="600" fill={PASIRINKTA_TEXT}>{L.chosenN}</text>
            </g>
          </>
        );
      })()}

      {/* Row N+1 */}
      <text x="24" y={ROW_N1.labelY} fontFamily={FONT} fontSize={SIZE_SCHEMA_LABEL} fontWeight="500" fill={BORDER}>
        {L.rowN1}
      </text>
      {ARROWS_ROW_N1.map(([x1, y, x2], i) => (
        <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={BORDER} strokeWidth="2" markerEnd={`url(#llm-arrow-fwd-${uid})`} />
      ))}
      {(() => {
        const inputPosN1 = getInputTextPositions(ROW_N1.input);
        const outputPos = getOutputTextPositions(ROW_N1.output);
        const pasirinktaPos = getTwoLineTextPositions(ROW_N1.pasirinkta);
        const llmPos = getCenterTextPosition(ROW_N1.llm);
        return (
          <>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(1, 0) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N1.input[0]} y={ROW_N1.input[1]} width={ROW_N1.input[2]} height={ROW_N1.input[3]} rx="12" fill={INPUT_BG} stroke={isBlockActive(1, 0) ? ACTIVE_GLOW : INPUT_BORDER} strokeWidth={isBlockActive(1, 0) ? 2 : 1.5} filter={isBlockActive(1, 0) ? `url(#active-glow-${uid})` : undefined} />
              <text x={inputPosN1.label.x} y={inputPosN1.label.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_SCHEMA_LABEL} fontWeight="600" fill={INPUT_BORDER}>{L.input}</text>
              <text x={inputPosN1.content1.x} y={inputPosN1.content1.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY} fontWeight="400" fill={TEXT_DARK} style={{ letterSpacing: '0.01em' }}>{L.inputLine1}</text>
              <text x={inputPosN1.content2.x} y={inputPosN1.content2.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY} fontWeight="400" fill={TEXT_DARK} style={{ letterSpacing: '0.01em' }}>{L.inputLine2}</text>
            </g>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(1, 1) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N1.llm[0]} y={ROW_N1.llm[1]} width={ROW_N1.llm[2]} height={ROW_N1.llm[3]} rx="12" fill={`url(#llm-step-${uid})`} stroke={isBlockActive(1, 1) ? ACTIVE_GLOW : BORDER} strokeWidth={isBlockActive(1, 1) ? 2 : 1.5} filter={`url(#llm-shadow-${uid})`} />
              <text x={llmPos.x} y={llmPos.y} textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="500" fill="white">LLM</text>
            </g>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(1, 2) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N1.output[0]} y={ROW_N1.output[1]} width={ROW_N1.output[2]} height={ROW_N1.output[3]} rx="12" fill={OUTPUT_BG} stroke={isBlockActive(1, 2) ? ACTIVE_GLOW : OUTPUT_BORDER} strokeWidth={1.5} filter={isBlockActive(1, 2) ? `url(#active-glow-${uid})` : undefined} />
              <text x={outputPos.title.x} y={outputPos.title.y} textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="500" fill={OUTPUT_LABEL}>{L.output}</text>
              <text x={outputPos.label.x} y={outputPos.label.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_SCHEMA_LABEL} fontWeight="500" fill={TEXT_MUTED} style={{ letterSpacing: '0.01em' }}>{L.tokenProbs}</text>
              <text x={outputPos.body.x} y={outputPos.body.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY_OUTPUT} fontWeight="400" fill={TEXT_DARK} style={{ letterSpacing: '0.01em' }}>
                <tspan x={outputPos.body.x} dy="0">{L.outputN1}</tspan>
                <tspan x={outputPos.body2.x} dy={20}>{L.outputN1Line2}</tspan>
              </text>
            </g>
            <g style={{ transition: 'opacity 0.2s ease' }} opacity={isBlockActive(1, 3) ? STEP_ACTIVE_OPACITY : STEP_INACTIVE_OPACITY}>
              <rect x={ROW_N1.pasirinkta[0]} y={ROW_N1.pasirinkta[1]} width={ROW_N1.pasirinkta[2]} height={ROW_N1.pasirinkta[3]} rx="12" fill={PASIRINKTA_BG} stroke={isBlockActive(1, 3) ? ACTIVE_GLOW : PASIRINKTA_TEXT} strokeWidth={isBlockActive(1, 3) ? 2 : 1.5} filter={isBlockActive(1, 3) ? `url(#active-glow-${uid})` : undefined} />
              <text x={pasirinktaPos.line1.x} y={pasirinktaPos.line1.y} textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="500" fill={PASIRINKTA_TEXT}>{L.chosen}</text>
              <text x={pasirinktaPos.line2.x} y={pasirinktaPos.line2.y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_BODY} fontWeight="600" fill={PASIRINKTA_TEXT}>2024</text>
            </g>
          </>
        );
      })()}

      {/* Feedback path: Pasirinkta N → Įvestis N+1 */}
      <circle cx={FEEDBACK.startCircle.cx} cy={FEEDBACK.startCircle.cy} r="2.5" fill={GRAY_FLOW} stroke="#64748b" strokeWidth="0.4" />
      <path
        d={FEEDBACK.pathD}
        fill="none"
        stroke={GRAY_FLOW}
        strokeWidth="1.2"
        strokeDasharray="5 3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points={`${FEEDBACK.arrowTip.x},${FEEDBACK.arrowBaseY} ${FEEDBACK.arrowTip.x - FEEDBACK.arrowHalfW},${FEEDBACK.arrowTip.y} ${FEEDBACK.arrowTip.x + FEEDBACK.arrowHalfW},${FEEDBACK.arrowTip.y}`}
        fill={GRAY_FLOW}
        stroke="#64748b"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <text x={FEEDBACK.labelX} y={FEEDBACK.labelY} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_MICRO} fontWeight="500" fill={TEXT_MUTED}>
        {L.feedback}
      </text>

      <text x={VIEWBOX_W / 2} y={SOURCE_LABEL_Y} textAnchor="middle" fontFamily={FONT} fontSize={SIZE_MICRO} fontStyle="italic" fill={TEXT_MUTED}>
        {L.source}
      </text>

      {/* 8 hit areas – one per block */}
      {isInteractive && (
        <>
          {[0, 1, 2, 3].map((blockIndex) => {
            const stepIndex = blockIndex;
            const row = ROW_N;
            const rect = blockIndex === 0 ? row.input : blockIndex === 1 ? row.llm : blockIndex === 2 ? row.output : row.pasirinkta;
            return (
              <rect
                key={stepIndex}
                x={rect[0]}
                y={rect[1]}
                width={rect[2]}
                height={rect[3]}
                fill="transparent"
                cursor="pointer"
                onClick={() => onStepClick(stepIndex)}
                aria-label={`${L.stepLabels[stepIndex]}${L.ariaStep}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick(stepIndex); } }}
              />
            );
          })}
          {[0, 1, 2, 3].map((blockIndex) => {
            const stepIndex = 4 + blockIndex;
            const row = ROW_N1;
            const rect = blockIndex === 0 ? row.input : blockIndex === 1 ? row.llm : blockIndex === 2 ? row.output : row.pasirinkta;
            return (
              <rect
                key={stepIndex}
                x={rect[0]}
                y={rect[1]}
                width={rect[2]}
                height={rect[3]}
                fill="transparent"
                cursor="pointer"
                onClick={() => onStepClick(stepIndex)}
                aria-label={`${L.stepLabels[stepIndex]}${L.ariaStep}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStepClick(stepIndex); } }}
              />
            );
          })}
        </>
      )}
    </svg>
  );
}
