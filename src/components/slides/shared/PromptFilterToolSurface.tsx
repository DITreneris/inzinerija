/**
 * Prompt-tool surface for toolChoiceBar.variant === 'prompt-tool' (M7/90 EDA).
 * Flow: sample data → mode ChoiceControl → EDA strip → whenHint + Format preview.
 * Linked copyable stays in ContentBlockSlide sections.
 */
import { useId, useState, type ReactElement } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getT } from '../../../i18n';
import ChoiceControl from '../../ui/ChoiceControl';
import CopyButton from './CopyButton';

export type PromptToolChoice = {
  label: string;
  rowIndex: number;
  whenHint?: string;
};

export type PromptFilterToolSurfaceProps = {
  question?: string;
  sequenceHint?: string;
  sampleData?: { label: string; body: string };
  choices: PromptToolChoice[];
  selectedRowIndex: number | null;
  onSelect: (rowIndex: number) => void;
  formatPreview?: string | null;
  whenHint?: string | null;
};

export default function PromptFilterToolSurface({
  question,
  sequenceHint,
  sampleData,
  choices,
  selectedRowIndex,
  onSelect,
  formatPreview,
  whenHint,
}: PromptFilterToolSurfaceProps): ReactElement {
  const t = getT('contentSlides');
  const sampleId = useId();
  const [sampleOpen, setSampleOpen] = useState(false);

  const choiceValue =
    selectedRowIndex == null ? null : String(selectedRowIndex);

  const options = choices.map((c) => ({
    id: String(c.rowIndex),
    label: c.label,
  }));

  return (
    <div
      className="mb-4 space-y-4"
      role="region"
      aria-label={t('promptToolSurfaceAria')}
      data-prompt-tool-surface
    >
      <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/60 dark:bg-brand-900/20 px-3 py-2.5 sm:px-4">
        <p className="text-sm text-gray-800 dark:text-gray-200">
          {t('promptToolDataCallout')}
        </p>
        {sampleData ? (
          <div className="mt-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md"
              aria-expanded={sampleOpen}
              aria-controls={sampleId}
              onClick={() => setSampleOpen((o) => !o)}
            >
              {sampleData.label}
              {sampleOpen ? (
                <ChevronUp className="w-4 h-4" aria-hidden />
              ) : (
                <ChevronDown className="w-4 h-4" aria-hidden />
              )}
            </button>
            {sampleOpen ? (
              <div
                id={sampleId}
                className="mt-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-gray-900/60 p-3"
              >
                <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                  {sampleData.body}
                </pre>
                <div className="mt-2 flex justify-end">
                  <CopyButton
                    text={sampleData.body}
                    size="sm"
                    ariaLabel={t('promptToolCopySampleAria')}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Visual EDA progress mirror – ChoiceControl is the only interactive selector. */}
      <ol
        className="flex flex-wrap items-center gap-1.5 sm:gap-2"
        aria-hidden="true"
        data-prompt-tool-eda-strip
      >
        {choices.map((choice, idx) => {
          const active = selectedRowIndex === choice.rowIndex;
          return (
            <li
              key={choice.rowIndex}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              {idx > 0 ? (
                <span className="text-slate-400 dark:text-slate-500 text-sm select-none">
                  →
                </span>
              ) : null}
              <span
                className={`inline-flex items-center min-h-[44px] px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium pointer-events-none select-none ${
                  active
                    ? 'bg-brand-500 text-white dark:bg-brand-600'
                    : 'bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                {choice.label}
              </span>
            </li>
          );
        })}
      </ol>

      <ChoiceControl
        legend={question ?? t('promptToolChooseLegend')}
        options={options}
        value={choiceValue}
        onChange={(id) => onSelect(Number(id))}
        columns={2}
        size="compact"
        statusHint={sequenceHint}
      />

      {selectedRowIndex != null && (whenHint || formatPreview) ? (
        <div
          className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-800/40 px-3 py-3 sm:px-4 space-y-2"
          data-prompt-tool-preview
        >
          {whenHint ? (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {whenHint}
            </p>
          ) : null}
          {formatPreview ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t('promptToolFormatLabel')}
              </p>
              <p className="mt-1 text-sm font-mono text-gray-900 dark:text-gray-100 leading-relaxed">
                {formatPreview}
              </p>
            </div>
          ) : null}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('toolChoiceLinkedCopyHint')}
          </p>
        </div>
      ) : null}
    </div>
  );
}
