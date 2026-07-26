/**
 * Manipulation-contrast surface for toolChoiceBar.variant === 'manipulation-contrast' (M7/67).
 * Flow: ChoiceControl (4 types) → Blogas|Geras contrast + pushSignal → linked Copy below.
 */
import type { ReactElement } from 'react';
import { getT } from '../../../i18n';
import ChoiceControl from '../../ui/ChoiceControl';

export type ManipulationContrastChoice = {
  label: string;
  rowIndex: number;
  /** One-line “what this push does” (Ką stumia?) */
  pushSignal?: string;
  /** Biased prompt shown in the contrast panel */
  badExample?: string;
  whenHint?: string;
};

export type ManipulationContrastToolSurfaceProps = {
  question?: string;
  sequenceHint?: string;
  choices: ManipulationContrastChoice[];
  selectedRowIndex: number | null;
  onSelect: (rowIndex: number) => void;
  /** Neutral prompt from the active linked section (right column) */
  goodExample?: string | null;
};

export default function ManipulationContrastToolSurface({
  question,
  sequenceHint,
  choices,
  selectedRowIndex,
  onSelect,
  goodExample,
}: ManipulationContrastToolSurfaceProps): ReactElement {
  const t = getT('contentSlides');

  const choiceValue =
    selectedRowIndex == null ? null : String(selectedRowIndex);

  const options = choices.map((c) => ({
    id: String(c.rowIndex),
    label: c.label,
  }));

  const activeChoice =
    selectedRowIndex == null
      ? undefined
      : choices.find((c) => c.rowIndex === selectedRowIndex);

  const badExample = activeChoice?.badExample?.trim() || '';
  const good = (goodExample ?? '').trim();
  const pushSignal =
    activeChoice?.pushSignal?.trim() || activeChoice?.whenHint?.trim() || '';
  const showContrast = selectedRowIndex != null && (badExample || good);

  return (
    <div
      className="mb-4 space-y-4"
      role="region"
      aria-label={t('manipulationContrastSurfaceAria')}
      data-manipulation-contrast-surface
    >
      <ChoiceControl
        legend={question ?? t('manipulationContrastChooseLegend')}
        options={options}
        value={choiceValue}
        onChange={(id) => onSelect(Number(id))}
        columns={2}
        size="compact"
        statusHint={sequenceHint}
      />

      {selectedRowIndex == null ? (
        <p
          className="text-sm text-gray-600 dark:text-gray-400"
          data-manipulation-contrast-empty
        >
          {t('manipulationContrastEmptyHint')}
        </p>
      ) : null}

      {showContrast ? (
        <div className="space-y-3" data-manipulation-contrast-panel>
          {pushSignal ? (
            <p className="text-sm text-gray-800 dark:text-gray-200">
              <span className="font-semibold text-brand-700 dark:text-brand-300">
                {t('manipulationContrastPushLabel')}
              </span>{' '}
              {pushSignal}
            </p>
          ) : null}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800/60 bg-rose-50/70 dark:bg-rose-950/20 px-3 py-3 sm:px-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-1.5">
                {t('manipulationContrastBadLabel')}
              </p>
              <p className="text-sm font-mono text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
                {badExample || '—'}
              </p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/70 dark:bg-emerald-950/20 px-3 py-3 sm:px-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-1.5">
                {t('manipulationContrastGoodLabel')}
              </p>
              <p className="text-sm font-mono text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap">
                {good || '—'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
