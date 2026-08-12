/**
 * M16 16.15 – Direction picker lab (A/B/C ChoiceControl + score mirror + copyable).
 * Pattern interactive-control-lab; Shell = Ne; brand-only (10.45 / 13.325 style).
 */

import { useMemo } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import { useLabState } from '../../../utils/labInteractions';
import ChoiceControl from '../../ui/ChoiceControl';
import CopyButton from './CopyButton';
import {
  DIRECTION_SCORES,
  formatDirectionArtefact,
  getDirectionOptions,
  getDirectionPickerUiLabels,
  type DirectionId,
} from './m16DirectionPickerContent';
import { LAB_SHELL_CLASS } from './m10DepthRolesLabTokens';

const LAB_ID = 'm16_direction_picker';

export default function M16DirectionPickerLabBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const ui = getDirectionPickerUiLabels(loc);
  const directions = getDirectionOptions(loc);
  const [labState, setLabState] = useLabState(LAB_ID);
  const storedDirection = labState?.choices?.direction;
  const picked =
    directions.find((direction) => direction.id === storedDirection)?.id ??
    null;

  const setPicked = (direction: DirectionId) => {
    setLabState({
      choices: {
        ...(labState?.choices ?? {}),
        direction,
      },
    });
  };

  const artefact = useMemo(() => {
    if (picked == null) return '';
    return formatDirectionArtefact(loc, picked);
  }, [loc, picked]);

  const choiceOptions = directions.map((d) => ({
    id: d.id,
    label: d.label,
    description: d.description,
  }));

  const active = directions.find((d) => d.id === picked) ?? null;
  const scores = picked != null ? DIRECTION_SCORES[picked] : null;

  return (
    <div
      className={`${LAB_SHELL_CLASS} space-y-4`}
      role="region"
      aria-label={ui.regionAria}
      data-testid="m16-direction-picker-lab"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {ui.hint}
        </p>
        <p className="text-xs font-medium text-brand-800 dark:text-brand-200">
          {ui.decisionRule}
        </p>
      </div>

      <ChoiceControl
        legend={ui.legend}
        options={choiceOptions}
        value={picked}
        onChange={setPicked}
        columns={3}
        size="compact"
      />

      <div
        className="flex flex-wrap gap-2"
        data-testid="m16-direction-score-mirror"
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            picked != null
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {active ? ui.picked(active.label) : ui.emptyPick}
        </span>
        {scores != null ? (
          <>
            <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:ring-gray-600">
              {ui.speedLabel}: {scores.speed}
            </span>
            <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:ring-gray-600">
              {ui.clarityLabel}: {scores.clarity}
            </span>
            <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs text-gray-700 ring-1 ring-gray-200 dark:bg-gray-900/50 dark:text-gray-200 dark:ring-gray-600">
              {ui.riskLabel}: {scores.risk}
            </span>
            <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 ring-1 ring-brand-200 dark:bg-brand-950/40 dark:text-brand-100 dark:ring-brand-800">
              {ui.sumLabel}: {scores.sum}
            </span>
          </>
        ) : null}
      </div>

      <div className="space-y-2 rounded-xl border border-gray-200 bg-white/80 p-3 dark:border-gray-600 dark:bg-gray-900/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {ui.artefactHeading}
          </h4>
          {picked != null ? (
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
        {picked == null ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {ui.pickFirst}
          </p>
        ) : (
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-800 dark:bg-gray-950/50 dark:text-gray-200">
            {artefact}
          </pre>
        )}
      </div>
    </div>
  );
}
