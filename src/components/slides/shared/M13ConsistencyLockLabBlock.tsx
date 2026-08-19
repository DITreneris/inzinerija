/**
 * M13 13.325 – Consistency Drift Lab (ref checklist + drift diagnosis).
 * Pattern interactive-control-lab; Shell = Ne; brand-only ChoiceControl (10.45 style).
 * Contrast panel etalon: M7/67 (Simptomas | Taisymas). SYS-G: thumbs + image Before/After.
 */

import { useMemo, useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import ChoiceControl from '../../ui/ChoiceControl';
import CopyButton from './CopyButton';
import {
  consistencyLabAssetSrc,
  CONSISTENCY_LAB_ASSETS,
  countSelectedRefs,
  emptyConsistencyRefs,
  formatConsistencyArtefact,
  getConsistencyLabUiLabels,
  getConsistencyModeOptions,
  getConsistencyRefOptions,
  getSampleConsistencyArtefact,
  type ConsistencyModeId,
  type ConsistencyRefId,
  type ConsistencyRefState,
} from './m13ConsistencyLabContent';

/** Content-track soft shell (GOLDEN §6b) */
const LAB_SHELL_CLASS =
  'rounded-xl border border-rose-200/80 bg-rose-50/40 p-4 dark:border-rose-800/50 dark:bg-rose-950/20';

const CHECK_ROW_CLASS =
  'flex cursor-pointer items-center gap-3 rounded-lg border bg-white/80 px-3 py-2 text-sm text-gray-800 dark:bg-gray-900/40 dark:text-gray-100';

export default function M13ConsistencyLockLabBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const ui = getConsistencyLabUiLabels(loc);
  const modes = getConsistencyModeOptions(loc);
  const refOptions = getConsistencyRefOptions(loc);
  const [refs, setRefs] = useState<ConsistencyRefState>(emptyConsistencyRefs);
  const [mode, setMode] = useState<ConsistencyModeId | null>(null);

  const refCount = countSelectedRefs(refs);
  const activeMode = modes.find((m) => m.id === mode) ?? null;
  const sampleArtefact = getSampleConsistencyArtefact(loc);

  const artefact = useMemo(() => {
    if (mode == null) return '';
    return formatConsistencyArtefact(loc, mode, refs);
  }, [loc, mode, refs]);

  const choiceOptions = modes.map((m) => ({
    id: m.id,
    label: m.label,
    description: m.description,
  }));

  const toggleRef = (id: ConsistencyRefId) => {
    setRefs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`${LAB_SHELL_CLASS} space-y-4`}
      role="region"
      aria-label={ui.regionAria}
    >
      <div
        className="flex flex-wrap gap-2"
        data-testid="m13-consistency-mirror"
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            refCount >= 3
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {ui.refStatus(refCount)}
        </span>
        <span
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            mode != null
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {activeMode?.pill ?? ui.modePillEmpty}
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {ui.hint}
        </p>
        <p className="text-xs font-medium text-brand-800 dark:text-brand-200">
          {ui.decisionRule}
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {ui.refLegend}
        </legend>
        <p className="text-xs font-medium text-brand-800 dark:text-brand-200">
          {refCount >= 3 ? ui.refReady : ui.refNeedMore}
        </p>
        <div
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          data-testid="m13-consistency-refs"
        >
          {refOptions.map((opt) => {
            const selected = refs[opt.id];
            return (
              <label
                key={opt.id}
                className={`${CHECK_ROW_CLASS} ${
                  selected
                    ? 'border-rose-400 ring-2 ring-rose-300/80 dark:border-rose-500 dark:ring-rose-700/60'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  checked={selected}
                  onChange={() => toggleRef(opt.id)}
                />
                <img
                  src={consistencyLabAssetSrc(opt.src)}
                  alt={opt.alt}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-md object-cover"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        data-testid="m13-consistency-before-after"
        role="group"
        aria-label={ui.compareStripAria}
      >
        <figure className="overflow-hidden rounded-xl border border-slate-300 bg-slate-200/80 dark:border-slate-600 dark:bg-slate-700/60">
          <img
            src={consistencyLabAssetSrc(CONSISTENCY_LAB_ASSETS.beforeDrift)}
            alt={ui.beforeImageAlt}
            className="h-40 w-full object-cover sm:h-48"
          />
          <figcaption className="px-3 py-3 sm:px-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              {ui.beforeDriftLabel}
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {ui.beforeDriftHint}
            </p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl border border-emerald-300 bg-emerald-50/80 dark:border-emerald-700/60 dark:bg-emerald-950/30">
          <img
            src={consistencyLabAssetSrc(CONSISTENCY_LAB_ASSETS.afterLock)}
            alt={ui.afterImageAlt}
            className="h-40 w-full object-cover sm:h-48"
          />
          <figcaption className="px-3 py-3 sm:px-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
              {ui.afterLockLabel}
            </p>
            <p className="text-sm leading-relaxed text-emerald-950 dark:text-emerald-100">
              {ui.afterLockHint}
            </p>
          </figcaption>
        </figure>
      </div>

      <ChoiceControl
        legend={ui.modeLegend}
        options={choiceOptions}
        value={mode}
        onChange={setMode}
        columns={2}
        size="compact"
      />

      {activeMode != null ? (
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          data-testid="m13-consistency-contrast"
        >
          <div className="rounded-xl border-2 border-rose-200 bg-rose-50/70 px-3 py-3 dark:border-rose-800/60 dark:bg-rose-950/20 sm:px-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300">
              {ui.symptomLabel}
            </p>
            <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
              {activeMode.driftSignal}
            </p>
          </div>
          <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/70 px-3 py-3 dark:border-emerald-800/50 dark:bg-emerald-950/20 sm:px-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              {ui.fixLabel}
            </p>
            <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
              {activeMode.fixCue}
            </p>
          </div>
        </div>
      ) : null}

      <div className="space-y-2 rounded-xl border border-gray-200 bg-white/80 p-3 dark:border-gray-600 dark:bg-gray-900/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {ui.artefactHeading}
          </h4>
          {mode != null ? (
            <CopyButton
              text={artefact}
              variant="accent"
              size="sm"
              title={ui.copyLabel}
              ariaLabel={ui.copyLabel}
              copiedLabel={ui.copiedLabel}
            />
          ) : null}
        </div>
        {mode == null ? (
          <div data-testid="m13-consistency-sample">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              {ui.sampleArtefactHint}
            </p>
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              {sampleArtefact}
            </pre>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-800 dark:text-gray-200">
            {artefact}
          </pre>
        )}
      </div>
    </div>
  );
}
