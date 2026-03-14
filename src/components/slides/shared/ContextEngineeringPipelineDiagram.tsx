/**
 * ContextEngineeringPipelineDiagram – interaktyvi vertikali pipeline schema.
 * Vienas toggle, du režimai (Prompt engineering / Konteksto inžinerija).
 * Konteksto inžinerija: emerald mazgai rodomi pilnai; prompt režime – užtemdyti.
 * Pagal WorkflowComparisonInteractiveBlock modelį: toggle + opacity transition + consequence line.
 * SCHEME_AGENT: rodyklės kraštas į kraštą, refX=0, path nekerta blokų.
 * Be EnlargeableImage.
 */
import { useEffect, useId, useMemo, useState } from 'react';
import type { InteractivePipelineContent } from '../../../types/modules';
import { useLocale } from '../../../contexts/LocaleContext';
import {
  COLORS, VB_WIDTH, VB_HEIGHT_INTERACTIVE,
  BOX_W, BOX_H, BOX_R, BOX_X, CX,
  NODE_Y,
  ARROW_MARKER_LEN,
  getPipelineNodes,
  getModeLabels,
  getModeConsequence,
  getDiagramUiLabels,
  type PipelineActiveMode,
} from './contextEngineeringPipelineConfig';
import {
  getFirstAvailableStepId,
  getModeSummaryLabel,
  getStepById,
  isStepAvailableInMode,
  resolveInteractivePipelineContent,
} from './contextEngineeringPipelineInteraction';

interface Props {
  className?: string;
  interactiveContent?: InteractivePipelineContent;
}

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MODES: PipelineActiveMode[] = ['prompt', 'context'];

export default function ContextEngineeringPipelineDiagram({ className = '', interactiveContent }: Props) {
  const { locale } = useLocale();
  const uid = useId().replace(/:/g, '');
  const pipelineNodes = useMemo(() => getPipelineNodes(locale), [locale]);
  const modeLabels = useMemo(() => getModeLabels(locale), [locale]);
  const modeConsequence = useMemo(() => getModeConsequence(locale), [locale]);
  const uiLabels = useMemo(() => getDiagramUiLabels(locale), [locale]);

  const [mode, setMode] = useState<PipelineActiveMode>('prompt');
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(pipelineNodes.length + 1);
  const content = useMemo(() => resolveInteractivePipelineContent(interactiveContent, locale), [interactiveContent, locale]);
  const [activeStepId, setActiveStepId] = useState<string>(() => getFirstAvailableStepId(content, 'prompt'));

  useEffect(() => {
    const currentStep = getStepById(content, activeStepId);
    if (!currentStep || !isStepAvailableInMode(currentStep, mode)) {
      setActiveStepId(getFirstAvailableStepId(content, mode));
    }
  }, [activeStepId, content, mode]);

  useEffect(() => {
    let current = -1;
    setFlowStep(-1);
    const timer = window.setInterval(() => {
      current += 1;
      setFlowStep(current);
      if (current >= pipelineNodes.length + 1) {
        window.clearInterval(timer);
      }
    }, 95);

    return () => window.clearInterval(timer);
  }, [mode, pipelineNodes.length]);

  const isContext = mode === 'context';
  const activeStep = getStepById(content, activeStepId);
  const hoveredStep = hoveredStepId ? getStepById(content, hoveredStepId) : undefined;
  const hoveredStepAvailable = hoveredStep ? isStepAvailableInMode(hoveredStep, mode) : false;
  const hoveredStepIndex = hoveredStep ? pipelineNodes.findIndex((node) => node.id === hoveredStep.id) : -1;
  const tooltipTopPercent = hoveredStepIndex >= 0 ? (NODE_Y[hoveredStepIndex] / VB_HEIGHT_INTERACTIVE) * 100 : 0;

  const handleStepClick = (stepId: string) => {
    const step = getStepById(content, stepId);
    if (!step || !isStepAvailableInMode(step, mode)) return;
    setActiveStepId(stepId);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ═══ Toggle + „Tu esi čia" ═══ */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-brand-50/80 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300"
          aria-live="polite"
        >
          {uiLabels.nowLabel} {getModeSummaryLabel(mode, locale)}
        </span>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {uiLabels.compareLabel}
          </span>
        <div
          role="group"
          aria-label={uiLabels.ariaGroup}
          className="flex gap-0.5 p-0.5 rounded-md bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 shadow-sm"
        >
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              aria-label={`${uiLabels.modeLabel} ${modeLabels[m]}`}
              className={`
                text-[11px] font-semibold uppercase tracking-wide px-4 py-2 rounded
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                min-h-[44px] min-w-[44px]
                ${mode === m
                  ? m === 'context'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-brand-600 text-white shadow-sm'
                  : m === 'context'
                    ? 'border-2 border-emerald-400 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }
              `}
            >
              {getModeSummaryLabel(m, locale)}
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* ═══ SVG Pipeline ═══ */}
      <div className="relative rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-black/[0.04] dark:border-gray-700 overflow-hidden">
      {hoveredStep && hoveredStepIndex >= 0 && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] px-3 py-2 rounded-lg border border-brand-200 dark:border-brand-700 bg-white/95 dark:bg-gray-900/95 text-xs lg:text-sm text-brand-900 dark:text-brand-100 shadow-md"
          style={{ top: `calc(${tooltipTopPercent}% - 44px)` }}
        >
          <span className="font-semibold">{hoveredStep.title}:</span>{' '}
          {hoveredStepAvailable ? hoveredStep.shortHint : content.labels.availableInContextModeOnly}
        </div>
      )}
      <svg
        viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT_INTERACTIVE}`}
        className="w-full max-w-md mx-auto block"
        role="img"
        aria-label={`DI pipeline schema – ${modeLabels[mode]}: ${isContext ? uiLabels.ariaStepsContext : uiLabels.ariaStepsPrompt}`}
      >
        <defs>
          <linearGradient id={`ce-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.bgStart} />
            <stop offset="100%" stopColor={COLORS.bgEnd} />
          </linearGradient>
          <linearGradient id={`ce-g-brand-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.brandStart} />
            <stop offset="100%" stopColor={COLORS.brand} />
          </linearGradient>
          <linearGradient id={`ce-g-llm-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.brand} />
            <stop offset="100%" stopColor={COLORS.brandDarker} />
          </linearGradient>
          <linearGradient id={`ce-g-emerald-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.emeraldLight} />
            <stop offset="100%" stopColor={COLORS.emerald} />
          </linearGradient>
          <marker id={`ce-arr-brand-${uid}`} markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <path d="M0 0 L8 3.5 L0 7 Z" fill={COLORS.arrow} />
          </marker>
          <marker id={`ce-arr-emerald-${uid}`} markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <path d="M0 0 L8 3.5 L0 7 Z" fill={COLORS.arrowContext} />
          </marker>
        </defs>

        {/* Background */}
        <rect width={VB_WIDTH} height={VB_HEIGHT_INTERACTIVE} fill={`url(#ce-bg-${uid})`} rx="12" />
        <rect width={VB_WIDTH} height={VB_HEIGHT_INTERACTIVE} fill="none" stroke={COLORS.border} strokeWidth="1" rx="12" />

        {isContext && (
          <g style={{ opacity: flowStep >= 2 ? 0.9 : 0.3, transition: 'opacity 0.25s ease' }}>
            <rect
              x={BOX_X - 8}
              y={NODE_Y[1] - 10}
              width={BOX_W + 16}
              height={(NODE_Y[2] + BOX_H) - NODE_Y[1] + 20}
              rx="12"
              fill="none"
              stroke="rgba(79,143,128,0.45)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <text
              x={BOX_X + 8}
              y={NODE_Y[1] - 16}
              textAnchor="start"
              fontFamily={FONT}
              fontSize="10"
              fontWeight="700"
              fill={COLORS.emeraldDarker}
            >
              {uiLabels.inputPromptContext}
            </text>
          </g>
        )}

        {/* ═══ Nodes ═══ */}
        {pipelineNodes.map((node, i) => {
          const y = NODE_Y[i];
          const isCtxNode = node.mode === 'context';
          const isLlm = node.id === 'llm';
          const nodeOpacity = isCtxNode && !isContext ? 0.2 : 1;
          const step = getStepById(content, node.id);
          const isAvailable = step ? isStepAvailableInMode(step, mode) : true;
          const isActive = activeStep?.id === node.id;
          const revealOpacity = flowStep >= i ? 1 : 0.35;

          const fill = isCtxNode
            ? `url(#ce-g-emerald-${uid})`
            : isLlm
              ? `url(#ce-g-llm-${uid})`
              : `url(#ce-g-brand-${uid})`;
          const stroke = isCtxNode ? COLORS.emeraldDarker : COLORS.brandDarker;
          const centerY = y + BOX_H / 2;
          const glowFilter = isLlm ? 'drop-shadow(0 6px 20px rgba(0,0,0,0.18))' : undefined;

          return (
            <g
              key={node.id}
              style={{ opacity: nodeOpacity * revealOpacity, transition: 'opacity 0.35s ease, filter 0.35s ease', filter: isCtxNode && isContext ? 'brightness(1.26)' : glowFilter }}
            >
              <rect
                x={BOX_X} y={y}
                width={BOX_W} height={BOX_H}
                rx={BOX_R}
                fill={fill}
                stroke={stroke}
                strokeWidth={isActive ? 3.2 : isLlm ? 2.4 : isCtxNode && isContext ? 2.8 : 1.7}
              />
              {isLlm && (
                <rect
                  x={BOX_X - 2}
                  y={y - 2}
                  width={BOX_W + 4}
                  height={BOX_H + 4}
                  rx={BOX_R + 1}
                  fill="none"
                  stroke="rgba(255,255,255,0.42)"
                  strokeWidth="1.25"
                />
              )}
              <text
                x={CX} y={centerY - 6}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={isLlm ? 15 : 13}
                fontWeight={isLlm ? '800' : '700'}
                fill={COLORS.textWhite}
              >
                {node.label}
              </text>
              <text
                x={CX} y={centerY + 12}
                textAnchor="middle"
                fontFamily={FONT} fontSize="10.5" fontWeight="600"
                fill="rgba(255,255,255,0.9)"
              >
                {node.sub}
              </text>

              {/* Context badge – tik emerald mazgams */}
              {isCtxNode && (node.badgeContext ?? node.badgeTools) && (
                <text
                  x={BOX_X + BOX_W - 6}
                  y={y + 12}
                  textAnchor="end"
                  fontFamily={FONT}
                  fontSize="8"
                  fontWeight="700"
                  fill={COLORS.emeraldGlow}
                >
                  {node.id === 'context' ? node.badgeContext : node.badgeTools}
                </text>
              )}

              {/* Click/hover hit area */}
              <rect
                x={BOX_X}
                y={y}
                width={BOX_W}
                height={BOX_H}
                rx={BOX_R}
                fill="transparent"
                role="button"
                tabIndex={isAvailable ? 0 : -1}
                aria-label={`${step?.title ?? node.label}. ${step?.shortHint ?? node.sub}`}
                aria-disabled={!isAvailable}
                onMouseEnter={() => setHoveredStepId(node.id)}
                onMouseLeave={() => setHoveredStepId((prev) => (prev === node.id ? null : prev))}
                onFocus={() => setHoveredStepId(node.id)}
                onBlur={() => setHoveredStepId((prev) => (prev === node.id ? null : prev))}
                onClick={() => handleStepClick(node.id)}
                onKeyDown={(event) => {
                  if (!isAvailable) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleStepClick(node.id);
                  }
                }}
                style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
              />

              {/* Arrow to next node */}
              {i < pipelineNodes.length - 1 && (() => {
                const nextNode = pipelineNodes[i + 1];
                const nextIsCtx = nextNode.mode === 'context';
                const arrowOpacity = (isCtxNode || nextIsCtx) && !isContext ? 0.12 : 0.92;
                const revealArrowOpacity = flowStep >= i + 1 ? 1 : 0.28;
                const arrowColor = (isCtxNode || nextIsCtx) ? COLORS.arrowContext : COLORS.arrow;
                const markerId = (isCtxNode || nextIsCtx) ? `ce-arr-emerald-${uid}` : `ce-arr-brand-${uid}`;
                const isLlmToTools = i === 3;
                const isToolsToOutput = i === 4;
                const hideForLoopMode = isContext && (isLlmToTools || isToolsToOutput);
                return (
                  <line
                    x1={CX} y1={y + BOX_H}
                    x2={CX} y2={NODE_Y[i + 1] - ARROW_MARKER_LEN}
                    stroke={arrowColor}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    markerEnd={`url(#${markerId})`}
                    style={{ opacity: hideForLoopMode ? 0 : arrowOpacity * revealArrowOpacity, transition: 'opacity 0.35s ease' }}
                  />
                );
              })()}
            </g>
          );
        })}

        {/* Prompt → LLM papildomas įėjimo signalas (context mode) */}
        <line
          x1={CX + BOX_W / 2 - 6}
          y1={NODE_Y[1] + BOX_H / 2}
          x2={CX + 84}
          y2={NODE_Y[3] + 8}
          stroke={COLORS.arrowContext}
          strokeWidth="2.1"
          strokeDasharray="4 4"
          strokeLinecap="round"
          markerEnd={`url(#ce-arr-emerald-${uid})`}
          style={{ opacity: isContext ? (flowStep >= 3 ? 0.88 : 0.3) : 0, transition: 'opacity 0.35s ease' }}
        />

        {/* LLM ↔ Tools interaction loop (context mode) */}
        <line
          x1={CX}
          y1={NODE_Y[3] + BOX_H}
          x2={CX}
          y2={NODE_Y[4] - ARROW_MARKER_LEN}
          stroke={COLORS.arrowContext}
          strokeWidth="2.8"
          strokeDasharray="6 4"
          strokeLinecap="round"
          markerStart={`url(#ce-arr-emerald-${uid})`}
          markerEnd={`url(#ce-arr-emerald-${uid})`}
          style={{ opacity: isContext ? (flowStep >= 4 ? 0.95 : 0.35) : 0, transition: 'opacity 0.35s ease' }}
        />
        <text
          x={CX + 12}
          y={NODE_Y[4] - 12}
          textAnchor="start"
          fontFamily={FONT}
          fontSize="10"
          fontWeight="700"
          fill={COLORS.emeraldDarker}
          style={{ opacity: isContext ? 0.9 : 0, transition: 'opacity 0.35s ease' }}
        >
          {uiLabels.llmToolsLabel}
        </text>

        {/* LLM → Output pagrindinis rezultato srautas (context mode) */}
        <line
          x1={CX}
          y1={NODE_Y[3] + BOX_H}
          x2={CX}
          y2={NODE_Y[5] - ARROW_MARKER_LEN}
          stroke={COLORS.arrow}
          strokeWidth="2.8"
          strokeLinecap="round"
          markerEnd={`url(#ce-arr-brand-${uid})`}
          style={{ opacity: isContext ? (flowStep >= 5 ? 0.92 : 0.35) : 0, transition: 'opacity 0.35s ease' }}
        />

        {/* ═══ Bypass rodyklės – srauto kryptis prompt mode ═══ */}
        {/* Prompt(1) → LLM(3): tiesioginis kelias kai konteksto mazgas ghost */}
        <line
          x1={CX} y1={NODE_Y[1] + BOX_H}
          x2={CX} y2={NODE_Y[3] - ARROW_MARKER_LEN}
          stroke={COLORS.arrow}
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          markerEnd={`url(#ce-arr-brand-${uid})`}
          style={{ opacity: !isContext ? (flowStep >= 3 ? 0.9 : 0.3) : 0, transition: 'opacity 0.35s ease' }}
        />
        {/* LLM(3) → Output(5): tiesioginis kelias kai įrankių mazgas ghost */}
        <line
          x1={CX} y1={NODE_Y[3] + BOX_H}
          x2={CX} y2={NODE_Y[5] - ARROW_MARKER_LEN}
          stroke={COLORS.arrow}
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          markerEnd={`url(#ce-arr-brand-${uid})`}
          style={{ opacity: !isContext ? (flowStep >= 5 ? 0.9 : 0.3) : 0, transition: 'opacity 0.35s ease' }}
        />
      </svg>
      </div>

      {/* ═══ Mini panelė po paspaudimo ═══ */}
      {activeStep && (
        <section
          className="p-4 lg:p-5 rounded-xl border border-brand-200 dark:border-brand-800 bg-white dark:bg-gray-900/40 space-y-3"
          aria-label={`${uiLabels.stepDetailAria}: ${activeStep.title}`}
        >
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide font-semibold text-brand-600 dark:text-brand-300">
              {content.modes[mode].panelTitle}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {content.modes[mode].panelDescription}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 lg:p-4 space-y-2">
            <h4 className="font-bold text-brand-900 dark:text-brand-100">{activeStep.title}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">{content.labels.hint}:</span> {activeStep.description}
            </p>
            {activeStep.examplePrompt && (
              <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/70 rounded p-2.5 border border-gray-200 dark:border-gray-700">
                <span className="font-semibold">{content.labels.examplePrompt}:</span> {activeStep.examplePrompt}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-3">
              <p className="text-xs uppercase tracking-wide font-bold text-amber-700 dark:text-amber-300 mb-1">
                {content.labels.withoutContext}
              </p>
              <p className="text-sm text-amber-900 dark:text-amber-100">
                {activeStep.withoutContext}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-3">
              <p className="text-xs uppercase tracking-wide font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                {content.labels.withContext}
              </p>
              <p className="text-sm text-emerald-900 dark:text-emerald-100">
                {activeStep.withContext}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ═══ Consequence line ═══ */}
      <div
        className={`p-4 rounded-xl border-l-4 flex items-start gap-3 transition-colors duration-300 ${
          isContext
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 border border-emerald-200 dark:border-emerald-800'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 border border-amber-200 dark:border-amber-800'
        }`}
        aria-live="polite"
      >
        <span className="text-base leading-none shrink-0 mt-0.5" aria-hidden="true">
          {isContext ? '✓' : '⚠️'}
        </span>
        <div className="space-y-0.5">
          <p className={`text-xs font-bold uppercase tracking-wide ${isContext ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
            {isContext ? uiLabels.keyRuleLabel : uiLabels.noteLabel}
          </p>
          <p className={`text-sm font-medium ${isContext ? 'text-emerald-900 dark:text-emerald-100' : 'text-amber-900 dark:text-amber-100'}`}>
            {modeConsequence[mode]}
          </p>
        </div>
      </div>
    </div>
  );
}
