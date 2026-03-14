/**
 * WorkflowComparisonInteractiveBlock – vertikalus flow layout (Kiss/Marry/Kill).
 * Vienas sakinys viršuje, toggle, schema, vienas CTA. Workflow režime: input + output preview.
 * A11y: aria-pressed, aria-live, min-h-[44px], keyboard nav.
 * Locale-aware: pass locale for EN/LT strings.
 */
import { useState } from 'react';
import WorkflowComparisonDiagram from './WorkflowComparisonDiagram';
import { useIsMobile } from '../../../utils/useIsMobile';
import MobileDiagramScroller from './MobileDiagramScroller';
import type {
  WorkflowMode,
  OutputType,
  Locale,
} from './workflowComparisonConfig';
import {
  getWorkflowModes,
  getOutputTypes,
  getInputPlaceholders,
  getCtaSentence,
  getBlockLabels,
} from './workflowComparisonConfig';

const MODE_KEYS: WorkflowMode[] = ['basic', 'workflow'];
const FIXED_OUTPUT_TYPE: OutputType = 'document';

interface Props {
  locale?: Locale;
}

export default function WorkflowComparisonInteractiveBlock({
  locale = 'lt',
}: Props) {
  const [mode, setMode] = useState<WorkflowMode>('basic');
  const [promptInput, setPromptInput] = useState('');
  const isMobile = useIsMobile();

  const workflowModes = getWorkflowModes(locale);
  const config = workflowModes[mode];
  const isWorkflow = mode === 'workflow';
  const outputTypes = getOutputTypes(locale);
  const otConfig = outputTypes[FIXED_OUTPUT_TYPE];
  const inputPlaceholders = getInputPlaceholders(locale);
  const ctaSentence = getCtaSentence(locale);
  const blockLabels = getBlockLabels(locale);

  return (
    <div
      className="space-y-8"
      role="region"
      aria-label={blockLabels.ariaRegion}
    >
      {/* ═══ ZONA 1: Toggle + Schema + CTA ═══ */}
      <div className="space-y-6">
        {/* „Tu esi čia“ orientacija + Mode toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border bg-brand-50/80 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300"
              aria-live="polite"
            >
              {blockLabels.nowLabel} {config.label}
            </span>
            <div className="flex gap-0.5 p-0.5 rounded-md bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600 shadow-sm">
              {MODE_KEYS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  aria-label={`${blockLabels.modeLabel} ${workflowModes[m].label}`}
                  className={`
                  font-mono text-[13px] font-medium uppercase px-5 py-2.5 rounded
                  transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                  min-h-[44px] min-w-[44px]
                  ${
                    mode === m
                      ? m === 'workflow'
                        ? 'bg-emerald-500 text-white font-semibold'
                        : 'bg-accent-500 text-brand-900 font-semibold'
                      : m === 'workflow'
                        ? 'border-2 border-emerald-400 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 shadow-sm shadow-emerald-200/50 dark:shadow-emerald-900/30'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                `}
                  style={{ letterSpacing: '0.1em' }}
                >
                  {workflowModes[m].label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-mono text-[13px] text-gray-600 dark:text-gray-400">
              <span
                className={`h-2 w-2 rounded-full shrink-0 transition-colors duration-300 ${
                  isWorkflow ? 'bg-emerald-500' : 'bg-gray-400 dark:bg-gray-500'
                }`}
                aria-hidden="true"
              />
              <span aria-live="polite">{config.desc}</span>
            </div>
            <p
              className="text-sm text-gray-700 dark:text-gray-300 font-medium"
              aria-live="polite"
            >
              {config.consequenceLine}
            </p>
          </div>
        </div>

        {/* Section 1 — Schema (Hero) su Workflow glow; mobile: horizontally scrollable */}
        <div
          className={`max-w-[800px] mx-auto pt-8 pb-6 rounded-xl px-4 py-6 transition-colors duration-300 border bg-white dark:bg-gray-900 ${
            isWorkflow
              ? 'border-emerald-200 dark:border-emerald-800 ring-2 ring-emerald-200/50 dark:ring-emerald-800/30 shadow-lg shadow-emerald-200/30 dark:shadow-emerald-900/20'
              : 'border-gray-200 dark:border-gray-700 shadow-lg shadow-gray-200/50 dark:shadow-none'
          }`}
        >
          {isMobile ? (
            <MobileDiagramScroller minWidth={620} compactMinWidth={500}>
              <WorkflowComparisonDiagram
                locale={locale}
                mode={mode}
                outputType={isWorkflow ? FIXED_OUTPUT_TYPE : undefined}
              />
            </MobileDiagramScroller>
          ) : (
            <WorkflowComparisonDiagram
              locale={locale}
              mode={mode}
              outputType={isWorkflow ? FIXED_OUTPUT_TYPE : undefined}
            />
          )}
        </div>

        {/* CTA — vienas accent blokas po schema */}
        <div className="max-w-[800px] mx-auto">
          <p className="text-sm font-semibold text-accent-700 dark:text-accent-300 border-l-4 border-accent-500 pl-3 py-2.5 bg-accent-50 dark:bg-accent-900/20 rounded-r shadow-md shadow-accent-200/30 dark:shadow-accent-900/20">
            {ctaSentence}
          </p>
        </div>
      </div>

      {/* ═══ ZONA 2: INPUT + OUTPUT (tik Workflow režime) ═══ */}
      {isWorkflow && (
        <div className="space-y-6 pt-2">
          <div className="max-w-[800px] mx-auto">
            <label className="block">
              <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider mb-2 block">
                {blockLabels.enterLabel}
              </span>
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={inputPlaceholders.prompt}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 shadow-md shadow-gray-200/30 dark:shadow-gray-900/30 min-h-[48px]"
              />
            </label>
          </div>

          {/* OUTPUT — baltas, shadow, badge „Struktūruotas rezultatas“ */}
          <div className="max-w-[800px] mx-auto">
            <div
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg shadow-gray-200/40 dark:shadow-gray-900/50 p-4"
              role="region"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  {blockLabels.structuredResult}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {blockLabels.structuredResultHint}
                </span>
              </div>
              <div className="space-y-1 font-mono text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 p-3">
                {otConfig.previewLines(promptInput, '').map((line, i) => (
                  <p key={i} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {config.noteText}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
