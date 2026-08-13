/**
 * M10 10.255 – team readiness snapshot for agentic work.
 * Pattern interactive-control-lab; Shell = Ne; no maturity score.
 */

import { useMemo, useState } from 'react';
import { ClipboardCheck, Target, UsersRound } from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';
import ChoiceControl from '../../ui/ChoiceControl';
import CopyButton from './CopyButton';
import {
  formatTeamReadinessProfile,
  getLevelInsight,
  getSelectedStateLabel,
  getTeamReadinessDimensions,
  getTeamReadinessLevels,
  getTeamReadinessNextAction,
  getTeamReadinessUiLabels,
} from './m10TeamReadinessContent';
import {
  LAB_SHELL_CLASS,
  LEVEL_CHIP_CLASSES,
  LEVEL_OPTION_TONE,
} from './m10TeamReadinessLabTokens';
import {
  TEAM_READINESS_DIMENSION_IDS,
  getPrimaryReadinessGap,
  getWeakestReadinessDimensions,
  isTeamReadinessComplete,
  updateTeamReadinessSelection,
  type TeamReadinessDimensionId,
  type TeamReadinessSelections,
} from './m10TeamReadinessModel';

const DIMENSION_ICONS: Record<TeamReadinessDimensionId, typeof UsersRound> = {
  use: UsersRound,
  structure: Target,
  learning: ClipboardCheck,
};

export default function M10TeamReadinessLabBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const ui = getTeamReadinessUiLabels(loc);
  const dimensions = getTeamReadinessDimensions(loc);
  const levels = getTeamReadinessLevels(loc);

  const [selections, setSelections] = useState<TeamReadinessSelections>({});

  const isComplete = isTeamReadinessComplete(selections);
  const primaryGap = getPrimaryReadinessGap(selections);
  const weakestDimensions = getWeakestReadinessDimensions(selections);

  const artefact = useMemo(
    () => formatTeamReadinessProfile(loc, selections),
    [loc, selections]
  );

  const filledCount = TEAM_READINESS_DIMENSION_IDS.filter(
    (id) => selections[id] != null
  ).length;

  const levelOptions = levels.map((level) => ({
    id: level.id,
    label: level.label,
    description: level.description,
  }));

  return (
    <div className={LAB_SHELL_CLASS} role="region" aria-label={ui.regionAria}>
      <div className="flex items-start gap-3">
        <span className="inline-flex shrink-0 rounded-xl bg-brand-100 p-2 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
          <UsersRound className="h-5 w-5" aria-hidden />
        </span>
        <div className="space-y-1">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {ui.takeaway}
          </p>
          <p className="text-xs font-semibold text-brand-800 dark:text-brand-200">
            {ui.notScore}
          </p>
        </div>
      </div>

      <ReadinessSummary
        locale={loc}
        ui={ui}
        selections={selections}
        weakestDimensions={weakestDimensions}
        isComplete={isComplete}
        filledCount={filledCount}
      />

      <div className="space-y-8">
        {dimensions.map((dimension, index) => {
          const Icon = DIMENSION_ICONS[dimension.id];
          const insight = getLevelInsight(loc, selections[dimension.id]);
          return (
            <div key={dimension.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white dark:bg-brand-500">
                  {index + 1}
                </span>
                <span className="mt-0.5 inline-flex rounded-lg bg-brand-100 p-2.5 text-brand-800 dark:bg-brand-900/50 dark:text-brand-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {dimension.shortLabel}
                  </p>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {dimension.prompt}
                  </h3>
                </div>
              </div>
              <ChoiceControl
                legend={dimension.prompt}
                options={levelOptions}
                value={selections[dimension.id] ?? null}
                onChange={(levelId) =>
                  setSelections((current) =>
                    updateTeamReadinessSelection(current, dimension.id, levelId)
                  )
                }
                columns={3}
                size="compact"
                legendMode="sr-only"
                optionTone={LEVEL_OPTION_TONE}
                toneVisibleWhenUnselected
              />
              {insight ? (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {insight}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        className={`rounded-2xl border-2 p-5 dark:border-brand-700 ${
          isComplete
            ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/30'
            : 'border-brand-200 bg-brand-50/70 dark:bg-brand-900/20'
        }`}
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            {ui.profileHeading}
          </h3>
          {isComplete ? (
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
        <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
          {isComplete ? ui.profileHint : ui.chooseAll}
        </p>
        {isComplete && primaryGap ? (
          <div className="mb-3 rounded-lg border border-white/80 bg-white/80 p-3 dark:border-gray-700 dark:bg-gray-950/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-200">
              {primaryGap === 'shared_baseline'
                ? ui.tieHeading
                : ui.nextActionHeading}
            </p>
            <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
              {primaryGap === 'shared_baseline'
                ? ui.tieBody
                : getTeamReadinessNextAction(loc, primaryGap)}
            </p>
          </div>
        ) : null}
        <pre className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-white p-3 font-mono text-xs leading-relaxed text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200">
          {artefact}
        </pre>
      </div>
    </div>
  );
}

function ReadinessSummary({
  locale,
  ui,
  selections,
  weakestDimensions,
  isComplete,
  filledCount,
}: {
  locale: 'lt' | 'en';
  ui: ReturnType<typeof getTeamReadinessUiLabels>;
  selections: TeamReadinessSelections;
  weakestDimensions: TeamReadinessDimensionId[];
  isComplete: boolean;
  filledCount: number;
}) {
  const dimensions = getTeamReadinessDimensions(locale);
  return (
    <div
      className="rounded-xl border border-brand-200/70 bg-white/70 p-3 dark:border-brand-800/50 dark:bg-gray-900/40"
      aria-live="polite"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          {ui.summaryHeading}
        </h3>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            isComplete
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100'
          }`}
        >
          {filledCount}/3 · {isComplete ? ui.complete : ui.incomplete}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {TEAM_READINESS_DIMENSION_IDS.map((id) => {
          const dimension = dimensions.find((item) => item.id === id);
          const level = selections[id];
          const weak = weakestDimensions.includes(id);
          return (
            <div
              key={id}
              className={`rounded-lg border px-3 py-2 ${
                weak
                  ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20'
                  : 'border-gray-200 bg-slate-50 dark:border-gray-700 dark:bg-slate-900/40'
              }`}
            >
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {dimension?.shortLabel ?? id}
              </p>
              <span
                className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-bold ${
                  level
                    ? LEVEL_CHIP_CLASSES[level]
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {getSelectedStateLabel(locale, level)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
