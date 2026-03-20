/**
 * WorkflowComparison SVG diagrama – Basic (Pokalbis) vs Workflow.
 * Du režimai viename SVG, crossfade per opacity transitions.
 * Animacijos: connector pulse (stroke-dashoffset), LLM engine glow (opacity pulse).
 * SCHEME_AGENT: rodyklės kraštas į kraštą, refX=0, path nekerta blokų.
 */
import { useId } from 'react';
import type {
  WorkflowMode,
  OutputType,
  Locale,
} from './workflowComparisonConfig';
import {
  COLORS,
  VB_WIDTH,
  VB_HEIGHT,
  BOX_W,
  BOX_H,
  BOX_R,
  COL_INPUT,
  COL_LLM,
  COL_OUTPUT,
  ARROW_MARKER_LEN,
  BASIC_ROW_Y,
  WF_PROMPT_Y,
  WF_PROMPT_H,
  WF_DATA_Y,
  WF_DATA_H,
  WF_LLM_Y,
  WF_LLM_H,
  WF_OUTPUT_Y,
  WF_OUTPUT_H,
  getWorkflowModes,
  getOutputTypes,
  getDiagramLabels,
} from './workflowComparisonConfig';

interface Props {
  locale?: Locale;
  mode: WorkflowMode;
  outputType?: OutputType;
  onLlmClick?: () => void;
  className?: string;
}

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

export default function WorkflowComparisonDiagram({
  locale = 'lt',
  mode,
  outputType,
  onLlmClick,
  className = '',
}: Props) {
  const uid = useId().replace(/:/g, '');
  const isWorkflow = mode === 'workflow';
  const workflowModes = getWorkflowModes(locale);
  const config = workflowModes[mode];
  const outputTypes = getOutputTypes(locale);
  const labels = getDiagramLabels(locale);

  const basicCenterY = BASIC_ROW_Y + BOX_H / 2;
  const wfPromptCenterY = WF_PROMPT_Y + WF_PROMPT_H / 2;
  const wfDataCenterY = WF_DATA_Y + WF_DATA_H / 2;
  const wfLlmCenterY = WF_LLM_Y + WF_LLM_H / 2;
  const wfOutputCenterY = WF_OUTPUT_Y + WF_OUTPUT_H / 2;

  return (
    <svg
      viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
      className={`w-full max-w-3xl mx-auto block ${className}`}
      role="img"
      aria-label={`${locale === 'en' ? 'AI usage diagram' : 'DI naudojimo schema'}: ${config.diagramTitle}. ${config.desc}`}
    >
      <defs>
        <linearGradient id={`wf-bg-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.bgStart} />
          <stop offset="100%" stopColor={COLORS.bgEnd} />
        </linearGradient>

        <marker
          id={`wf-arr-${uid}`}
          markerUnits="userSpaceOnUse"
          markerWidth="6"
          markerHeight="5"
          refX="0"
          refY="2.5"
          orient="auto"
        >
          <path d="M0 0 L6 2.5 L0 5 Z" fill={COLORS.arrow} />
        </marker>
        <marker
          id={`wf-arr-em-${uid}`}
          markerUnits="userSpaceOnUse"
          markerWidth="6"
          markerHeight="5"
          refX="0"
          refY="2.5"
          orient="auto"
        >
          <path d="M0 0 L6 2.5 L0 5 Z" fill={COLORS.emerald} />
        </marker>

        <linearGradient
          id={`wf-g-brand-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={COLORS.brandStart} />
          <stop offset="100%" stopColor={COLORS.brand} />
        </linearGradient>
        <linearGradient
          id={`wf-g-brand-llm-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={COLORS.brand} />
          <stop offset="100%" stopColor={COLORS.brandDarker} />
        </linearGradient>
        <linearGradient
          id={`wf-g-neutral-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={COLORS.neutralLight} />
          <stop offset="100%" stopColor={COLORS.neutral} />
        </linearGradient>
        <linearGradient
          id={`wf-g-emerald-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={COLORS.emeraldLight} />
          <stop offset="100%" stopColor={COLORS.emerald} />
        </linearGradient>
        <linearGradient
          id={`wf-g-emerald-llm-${uid}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={COLORS.emerald} />
          <stop offset="100%" stopColor={COLORS.emeraldDarker} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect
        width={VB_WIDTH}
        height={VB_HEIGHT}
        fill={`url(#wf-bg-${uid})`}
        rx="12"
      />
      <rect
        width={VB_WIDTH}
        height={VB_HEIGHT}
        fill="none"
        stroke={COLORS.border}
        strokeWidth="1"
        rx="12"
      />

      {/* Title */}
      <text
        x={VB_WIDTH / 2}
        y={22}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="14"
        fontWeight="700"
        fill={COLORS.textDark}
      >
        {config.diagramTitle}
      </text>

      {/* ═══ Basic mode (Pokalbis) ═══ */}
      <g
        style={{
          opacity: isWorkflow ? 0 : 1,
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden={isWorkflow}
      >
        {/* Input */}
        <rect
          x={COL_INPUT}
          y={BASIC_ROW_Y}
          width={BOX_W}
          height={BOX_H}
          rx={BOX_R}
          fill={`url(#wf-g-neutral-${uid})`}
          stroke={COLORS.neutral}
          strokeWidth="1.5"
        />
        <text
          x={COL_INPUT + BOX_W / 2}
          y={BASIC_ROW_Y + 30}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="14"
          fontWeight="700"
          fill={COLORS.textWhite}
        >
          {labels.basic.inputMain}
        </text>
        <text
          x={COL_INPUT + BOX_W / 2}
          y={BASIC_ROW_Y + 48}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fill="rgba(255,255,255,0.85)"
        >
          {labels.basic.inputSub}
        </text>

        {/* LLM (kalbos modelis) – darker for center emphasis */}
        <rect
          x={COL_LLM}
          y={BASIC_ROW_Y}
          width={BOX_W}
          height={BOX_H}
          rx={BOX_R}
          fill={`url(#wf-g-brand-llm-${uid})`}
          stroke={COLORS.brandDarker}
          strokeWidth="1.5"
        />
        <text
          x={COL_LLM + BOX_W / 2}
          y={BASIC_ROW_Y + 30}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="14"
          fontWeight="700"
          fill={COLORS.textWhite}
        >
          LLM
        </text>
        <text
          x={COL_LLM + BOX_W / 2}
          y={BASIC_ROW_Y + 48}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fill="rgba(255,255,255,0.85)"
        >
          {labels.basic.llmSub}
        </text>

        {/* Output */}
        <rect
          x={COL_OUTPUT}
          y={BASIC_ROW_Y}
          width={BOX_W}
          height={BOX_H}
          rx={BOX_R}
          fill={`url(#wf-g-neutral-${uid})`}
          stroke={COLORS.neutral}
          strokeWidth="1.5"
        />
        <text
          x={COL_OUTPUT + BOX_W / 2}
          y={BASIC_ROW_Y + 30}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="14"
          fontWeight="700"
          fill={COLORS.textWhite}
        >
          {labels.basic.outputMain}
        </text>
        <text
          x={COL_OUTPUT + BOX_W / 2}
          y={BASIC_ROW_Y + 48}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fill="rgba(255,255,255,0.85)"
        >
          {labels.basic.outputSub}
        </text>

        {/* LLM click target (V3 info panel) */}
        {onLlmClick && (
          <rect
            x={COL_LLM}
            y={BASIC_ROW_Y}
            width={BOX_W}
            height={BOX_H}
            rx={BOX_R}
            fill="transparent"
            cursor="pointer"
            onClick={onLlmClick}
            role="button"
            tabIndex={0}
            aria-label={labels.workflow.llmClickAria}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLlmClick();
              }
            }}
          />
        )}

        {/* Arrow: Input → LLM */}
        <line
          x1={COL_INPUT + BOX_W}
          y1={basicCenterY}
          x2={COL_LLM - ARROW_MARKER_LEN}
          y2={basicCenterY}
          stroke={COLORS.arrow}
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#wf-arr-${uid})`}
        />

        {/* Arrow: LLM → Output */}
        <line
          x1={COL_LLM + BOX_W}
          y1={basicCenterY}
          x2={COL_OUTPUT - ARROW_MARKER_LEN}
          y2={basicCenterY}
          stroke={COLORS.arrow}
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#wf-arr-${uid})`}
        />
      </g>

      {/* ═══ Workflow mode ═══ */}
      <g
        style={{
          opacity: isWorkflow ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden={!isWorkflow}
      >
        {/* Prompt box */}
        <rect
          x={COL_INPUT}
          y={WF_PROMPT_Y}
          width={BOX_W}
          height={WF_PROMPT_H}
          rx={BOX_R}
          fill={`url(#wf-g-brand-${uid})`}
          stroke={COLORS.brand}
          strokeWidth="1.5"
        />
        <text
          x={COL_INPUT + BOX_W / 2}
          y={WF_PROMPT_Y + 24}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="13"
          fontWeight="700"
          fill={COLORS.textWhite}
        >
          {labels.workflow.promptMain}
        </text>
        <text
          x={COL_INPUT + BOX_W / 2}
          y={WF_PROMPT_Y + 42}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fill="rgba(255,255,255,0.85)"
        >
          {labels.workflow.promptSub}
        </text>

        {/* Data box */}
        <rect
          x={COL_INPUT}
          y={WF_DATA_Y}
          width={BOX_W}
          height={WF_DATA_H}
          rx={BOX_R}
          fill={`url(#wf-g-brand-${uid})`}
          stroke={COLORS.brand}
          strokeWidth="1.5"
        />
        <text
          x={COL_INPUT + BOX_W / 2}
          y={WF_DATA_Y + 24}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="13"
          fontWeight="700"
          fill={COLORS.textWhite}
        >
          {labels.workflow.dataMain}
        </text>
        <text
          x={COL_INPUT + BOX_W / 2}
          y={WF_DATA_Y + 42}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fill="rgba(255,255,255,0.85)"
        >
          {labels.workflow.dataSub}
        </text>

        {/* LLM glow halo (pulse animation) */}
        <rect
          x={COL_LLM - 5}
          y={WF_LLM_Y - 5}
          width={BOX_W + 10}
          height={WF_LLM_H + 10}
          rx={BOX_R + 3}
          fill={COLORS.emeraldGlow}
        >
          <animate
            attributeName="opacity"
            values="0.2;0.4;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>

        {/* LLM box (darker for center emphasis) */}
        <rect
          x={COL_LLM}
          y={WF_LLM_Y}
          width={BOX_W}
          height={WF_LLM_H}
          rx={BOX_R}
          fill={`url(#wf-g-emerald-llm-${uid})`}
          stroke={COLORS.emeraldDarker}
          strokeWidth="2"
        />
        <text
          x={COL_LLM + BOX_W / 2}
          y={wfLlmCenterY - 8}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="15"
          fontWeight="800"
          fill={COLORS.textWhite}
        >
          LLM
        </text>
        <text
          x={COL_LLM + BOX_W / 2}
          y={wfLlmCenterY + 14}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fontWeight="600"
          fill="rgba(255,255,255,0.9)"
        >
          {labels.workflow.llmSub}
        </text>

        {/* LLM click target (V3 info panel) */}
        {onLlmClick && (
          <rect
            x={COL_LLM}
            y={WF_LLM_Y}
            width={BOX_W}
            height={WF_LLM_H}
            rx={BOX_R}
            fill="transparent"
            cursor="pointer"
            onClick={onLlmClick}
            role="button"
            tabIndex={0}
            aria-label={labels.workflow.llmClickAria}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onLlmClick();
              }
            }}
          />
        )}

        {/* Output box – reflects selected output type */}
        <rect
          x={COL_OUTPUT}
          y={WF_OUTPUT_Y}
          width={BOX_W}
          height={WF_OUTPUT_H}
          rx={BOX_R}
          fill={`url(#wf-g-emerald-${uid})`}
          stroke={COLORS.emeraldLight}
          strokeWidth="1.5"
        />
        <text
          x={COL_OUTPUT + BOX_W / 2}
          y={wfOutputCenterY - 8}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="14"
          fontWeight="700"
          fill={COLORS.textWhite}
        >
          {outputType
            ? outputTypes[outputType].diagramLabel
            : labels.workflow.outputDefaultLabel}
        </text>
        <text
          x={COL_OUTPUT + BOX_W / 2}
          y={wfOutputCenterY + 12}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="11"
          fontWeight="600"
          fill="rgba(255,255,255,0.8)"
        >
          {outputType
            ? outputTypes[outputType].diagramSub
            : labels.workflow.outputDefaultSub}
        </text>

        {/* Arrow: Prompt → LLM (upper) – animated pulse */}
        <line
          x1={COL_INPUT + BOX_W}
          y1={wfPromptCenterY}
          x2={COL_LLM - ARROW_MARKER_LEN}
          y2={WF_LLM_Y + WF_LLM_H * 0.3}
          stroke={COLORS.emerald}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 4"
          markerEnd={`url(#wf-arr-em-${uid})`}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="24;0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </line>

        {/* Arrow: Data → LLM (lower) – animated pulse */}
        <line
          x1={COL_INPUT + BOX_W}
          y1={wfDataCenterY}
          x2={COL_LLM - ARROW_MARKER_LEN}
          y2={WF_LLM_Y + WF_LLM_H * 0.7}
          stroke={COLORS.emerald}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 4"
          markerEnd={`url(#wf-arr-em-${uid})`}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="24;0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </line>

        {/* Arrow: LLM → Output – animated pulse */}
        <line
          x1={COL_LLM + BOX_W}
          y1={wfLlmCenterY}
          x2={COL_OUTPUT - ARROW_MARKER_LEN}
          y2={wfOutputCenterY}
          stroke={COLORS.emerald}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="10 4"
          markerEnd={`url(#wf-arr-em-${uid})`}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="28;0"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Bottom note (above layer labels) */}
      <text
        x={VB_WIDTH / 2}
        y={VB_HEIGHT - 18}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="11"
        fontWeight="600"
        fill={isWorkflow ? COLORS.emerald : COLORS.textMuted}
        style={{ transition: 'fill 0.35s ease' }}
      >
        {isWorkflow
          ? labels.workflow.bottomNoteWorkflow
          : labels.workflow.bottomNoteBasic}
      </text>

      {/* LLM click hint */}
      {onLlmClick && (
        <text
          x={COL_LLM + BOX_W / 2}
          y={isWorkflow ? WF_LLM_Y + WF_LLM_H + 16 : BASIC_ROW_Y + BOX_H + 16}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="9"
          fontWeight="500"
          fill={COLORS.textMuted}
          opacity="0.7"
        >
          {labels.workflow.llmHint}
        </text>
      )}
    </svg>
  );
}
