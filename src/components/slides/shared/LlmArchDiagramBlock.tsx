/**
 * LLM agentinės sistemos diagramos blokas – mode tabs, diagrama, EnlargeableDiagram.
 * Režimai: Bazinis | RAG | Tool Use. Lokalizuota per useLocale() ir getterius.
 */
import { useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import LlmArchDiagramDiagram from './LlmArchDiagramDiagram';
import type { LlmArchMode } from './llmArchLayout';
import { getLlmArchBlockLabels, getLlmArchModes } from './llmArchLayout';

const MODES: LlmArchMode[] = ['basic', 'rag', 'tool'];

export default function LlmArchDiagramBlock() {
  const { locale } = useLocale();
  const [mode, setMode] = useState<LlmArchMode>('basic');
  const modes = getLlmArchModes(locale);
  const config = modes[mode];
  const blockLabels = getLlmArchBlockLabels(locale);

  return (
    <div
      className="space-y-3 max-w-[1280px] min-w-0"
      role="region"
      aria-label={blockLabels.regionAria}
    >
      {/* Mode tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-0.5 p-0.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              aria-label={`${locale === 'en' ? 'Mode' : 'Režimas'}: ${modes[m].label}`}
              className={`
                font-mono text-[13px] font-medium uppercase px-5 py-2.5 rounded
                transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
                min-h-[44px] min-w-[44px]
                ${mode === m
                  ? 'bg-accent-500 text-brand-900 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
              `}
              style={{ letterSpacing: '0.1em' }}
            >
              {modes[m].tabLabel}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[13px] text-gray-600 dark:text-gray-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" aria-hidden />
          <span aria-live="polite">{config.label}</span>
          <span className="text-gray-400 dark:text-gray-500">·</span>
          <span>{config.desc}</span>
        </div>
      </div>

      <EnlargeableDiagram
        enlargeLabel={blockLabels.enlargeLabel}
        renderContent={() => <LlmArchDiagramDiagram mode={mode} locale={locale} />}
      />
    </div>
  );
}
