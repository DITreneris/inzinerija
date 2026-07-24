/**
 * M10 – human control decision lab (not a DiagramKit step walkthrough).
 * GOLDEN §3.1c interactive-control-lab; W1.1 – risk strip (no empty cell).
 */

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';
import ChoiceControl, { type ChoiceOptionTone } from '../../ui/ChoiceControl';
import CopyButton from './CopyButton';
import {
  formatControlRuleArtefact,
  getErrorCaseOutcomeText,
  getHumanControlModes,
  getHumanControlScenarios,
  getHumanControlUiLabels,
  getMismatchReasonText,
} from './m10HumanControlContent';
import {
  LAB_SHELL_CLASS,
  LAB_TONE_CLASSES,
  METER_SEGMENT_COUNT,
  TIMING_PHASE_ORDER,
  consequenceToStake,
  modeIdToTone,
  scenarioIdToTone,
  tradeToneToSegments,
  type LabOptionTone,
} from './m10HumanControlLabTokens';
import {
  buildControlRuleParts,
  getErrorCaseOutcomeKind,
  getRiskStripItems,
  getScenarioMeta,
  getTradeOffs,
  recommendMode,
  type HumanControlModeId,
  type HumanControlScenarioId,
  type QualitativeTradeOffs,
  type TradeOffTone,
} from './m10HumanControlModel';

export default function M10HumanControlSimulatorBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const ui = getHumanControlUiLabels(loc);
  const scenarios = getHumanControlScenarios(loc);
  const modes = getHumanControlModes(loc);

  const [scenarioId, setScenarioId] =
    useState<HumanControlScenarioId>('refund');
  const [selectedMode, setSelectedMode] = useState<HumanControlModeId | null>(
    null
  );
  const [showErrorCase, setShowErrorCase] = useState(false);

  useEffect(() => {
    setSelectedMode(null);
    setShowErrorCase(false);
  }, [scenarioId]);

  const recommended = recommendMode(scenarioId);
  const recommendedCopy = modes.find((m) => m.id === recommended);

  const feedbackReady = selectedMode != null;
  const mismatchText =
    selectedMode != null
      ? getMismatchReasonText(loc, scenarioId, selectedMode)
      : null;
  const isMismatch = mismatchText != null;

  const tradeOffs = useMemo(
    () => (selectedMode != null ? getTradeOffs(selectedMode) : null),
    [selectedMode]
  );

  const artefact = useMemo(() => {
    if (selectedMode == null) return '';
    return formatControlRuleArtefact(
      loc,
      buildControlRuleParts(scenarioId, selectedMode)
    );
  }, [loc, scenarioId, selectedMode]);

  const errorOutcome =
    selectedMode != null
      ? getErrorCaseOutcomeText(loc, getErrorCaseOutcomeKind(selectedMode))
      : null;

  const scenarioOptions = scenarios.map((s) => ({
    id: s.id,
    label: s.label,
    description: `${s.description} (${s.stakeLabel})`,
  }));

  const modeOptions = modes.map((m) => ({
    id: m.id,
    label: m.label,
    description: m.description,
  }));

  const scenarioTone = useMemo(() => {
    const map: Partial<Record<HumanControlScenarioId, ChoiceOptionTone>> = {};
    for (const s of scenarios) {
      map[s.id] = scenarioIdToTone(s.id);
    }
    return map;
  }, [scenarios]);

  const modeTone = useMemo(() => {
    const map: Partial<Record<HumanControlModeId, ChoiceOptionTone>> = {};
    for (const m of modes) {
      map[m.id] = modeIdToTone(m.id);
    }
    return map;
  }, [modes]);

  const statusHint =
    selectedMode == null
      ? loc === 'en'
        ? 'Pick a control mode to see the recommendation and your brief rule.'
        : 'Pasirink kontrolės režimą – pamatysi rekomendaciją ir taisyklę aprašymui.'
      : isMismatch
        ? (mismatchText ?? undefined)
        : loc === 'en'
          ? `Best fit for this scenario: ${recommendedCopy?.label ?? recommended}.`
          : `Tinkamiausia šiam scenarijui: ${recommendedCopy?.label ?? recommended}.`;

  return (
    <div className={LAB_SHELL_CLASS} role="region" aria-label={ui.regionAria}>
      <div className="flex items-start gap-3">
        <span className="inline-flex shrink-0 rounded-xl bg-brand-100 p-2 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
          <ShieldAlert className="h-5 w-5" aria-hidden />
        </span>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {ui.takeaway}
        </p>
      </div>

      <RiskStrip
        heading={ui.matrixHeading}
        axisCaption={`${ui.matrixConsequence} × ${ui.matrixReversibility}`}
        easyLabel={ui.matrixEasy}
        hardLabel={ui.matrixHard}
        lowerLabel={ui.matrixLower}
        higherLabel={ui.matrixHigher}
        stakeChip={ui.stakeChip}
        scenarios={scenarios}
        activeScenarioId={scenarioId}
        onSelectScenario={setScenarioId}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChoiceControl
          legend={ui.scenarioLegend}
          options={scenarioOptions}
          value={scenarioId}
          onChange={setScenarioId}
          columns={1}
          size="compact"
          optionTone={scenarioTone}
        />

        <ChoiceControl
          legend={ui.modeLegend}
          options={modeOptions}
          value={selectedMode}
          onChange={setSelectedMode}
          columns={2}
          size="compact"
          statusHint={statusHint}
          optionTone={modeTone}
        />
      </div>

      {feedbackReady && selectedMode != null && (
        <div className="space-y-4" aria-live="polite">
          <div
            className={`rounded-xl border-l-4 p-4 ${
              isMismatch
                ? 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20'
                : 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
            }`}
            role="status"
          >
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {ui.recommendHeading}: {recommendedCopy?.label ?? recommended}
              </h3>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  isMismatch
                    ? 'animate-pulse bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100'
                    : 'bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100'
                }`}
              >
                {isMismatch ? (
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                )}
                {isMismatch ? ui.mismatch : ui.bestFit}
              </span>
            </div>
            <p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              {ui.matrixRecommended}
            </p>
            {isMismatch && mismatchText ? (
              <p className="text-sm text-amber-900 dark:text-amber-100">
                {mismatchText}
              </p>
            ) : (
              <p className="text-sm text-emerald-900 dark:text-emerald-100">
                {recommendedCopy?.description}
              </p>
            )}
            {isMismatch ? (
              <button
                type="button"
                onClick={() => setSelectedMode(recommended)}
                className="mt-3 min-h-[44px] rounded-xl border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-brand-700 dark:bg-gray-900 dark:text-brand-200 dark:hover:bg-brand-900/30"
              >
                {ui.useRecommended}
              </button>
            ) : null}
          </div>

          {tradeOffs ? (
            <>
              <ModeTimingStrip
                heading={ui.timingHeading}
                phaseLabels={ui.timingPhase}
                activePhase={tradeOffs.errorTiming}
                emphasize={isMismatch}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TradeMeter
                  label={ui.speed}
                  valueLabel={ui.tone[tradeOffs.speed]}
                  tone={tradeOffs.speed}
                />
                <TradeMeter
                  label={ui.workload}
                  valueLabel={ui.tone[tradeOffs.humanWorkload]}
                  tone={tradeOffs.humanWorkload}
                />
              </div>
            </>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowErrorCase(true)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              {ui.testError}
            </button>
          </div>

          {showErrorCase && errorOutcome ? (
            <div
              className={`rounded-xl border-2 p-4 transition-opacity duration-300 ${
                errorOutcome.success
                  ? 'border-emerald-400 bg-emerald-50/80 dark:border-emerald-700 dark:bg-emerald-900/20'
                  : 'border-rose-400 bg-rose-50/80 dark:border-rose-700 dark:bg-rose-900/20'
              }`}
              role="status"
            >
              <div className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                {errorOutcome.success ? (
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  />
                ) : (
                  <XCircle
                    className="h-4 w-4 text-rose-600 dark:text-rose-400"
                    aria-hidden
                  />
                )}
                {errorOutcome.title}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {errorOutcome.body}
              </p>
            </div>
          ) : null}

          <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-800 dark:bg-brand-900/20">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {ui.artefactHeading}
              </h3>
              <span data-action="copy">
                <CopyButton
                  text={artefact}
                  variant="accent"
                  ariaLabel={ui.copyLabel}
                  title={ui.copyLabel}
                  copiedLabel={ui.copiedLabel}
                />
              </span>
            </div>
            <p className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              {ui.artefactHint}
            </p>
            <pre className="whitespace-pre-wrap rounded-lg border border-gray-200 bg-white p-3 font-mono text-xs leading-relaxed text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200">
              {artefact}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function RiskStrip({
  heading,
  axisCaption,
  easyLabel,
  hardLabel,
  lowerLabel,
  higherLabel,
  stakeChip,
  scenarios,
  activeScenarioId,
  onSelectScenario,
}: {
  heading: string;
  axisCaption: string;
  easyLabel: string;
  hardLabel: string;
  lowerLabel: string;
  higherLabel: string;
  stakeChip: { low: string; mid: string; critical: string };
  scenarios: { id: HumanControlScenarioId; label: string }[];
  activeScenarioId: HumanControlScenarioId;
  onSelectScenario: (id: HumanControlScenarioId) => void;
}) {
  const items = getRiskStripItems();
  const labelById = Object.fromEntries(
    scenarios.map((s) => [s.id, s.label])
  ) as Record<HumanControlScenarioId, string>;

  return (
    <div className="rounded-xl border border-brand-200/70 bg-white/70 p-3 dark:border-brand-800/50 dark:bg-gray-900/40 sm:p-4">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
        {heading}
      </h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {axisCaption}
      </p>
      <div
        className="mt-3 flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label={heading}
      >
        {items.map((item) => {
          const id = item.scenarioId;
          const tone = scenarioIdToTone(id) as LabOptionTone;
          const toneCls = LAB_TONE_CLASSES[tone];
          const stake = consequenceToStake(getScenarioMeta(id).consequence);
          const active = id === activeScenarioId;
          const bandHint =
            item.consequenceBand === 'higher' ? higherLabel : lowerLabel;
          const revHint = item.reversibility === 'hard' ? hardLabel : easyLabel;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectScenario(id)}
              className={`min-w-[9.5rem] flex-1 rounded-xl border-2 px-3 py-2.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                active
                  ? `${toneCls.selectedBorder} ${toneCls.selectedBg} ${toneCls.selectedRing} shadow-sm`
                  : `border-transparent ${toneCls.softBg} hover:border-brand-300 dark:hover:border-brand-700`
              }`}
            >
              <span
                className={`mb-1.5 inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-bold ${toneCls.chip}`}
              >
                {stakeChip[stake]}
              </span>
              <span className="block text-xs font-bold text-gray-900 dark:text-white">
                {labelById[id]}
              </span>
              <span className="mt-1 block text-[10px] leading-snug text-slate-500 dark:text-slate-400">
                {bandHint} · {revHint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ModeTimingStrip({
  heading,
  phaseLabels,
  activePhase,
  emphasize,
}: {
  heading: string;
  phaseLabels: Record<QualitativeTradeOffs['errorTiming'], string>;
  activePhase: QualitativeTradeOffs['errorTiming'];
  emphasize: boolean;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">
        {heading}
      </h3>
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="list"
        aria-label={heading}
      >
        {TIMING_PHASE_ORDER.map((phase) => {
          const active = phase === activePhase;
          return (
            <div
              key={phase}
              role="listitem"
              className={`min-w-[7.5rem] flex-1 rounded-xl border-2 px-3 py-2 text-center text-xs font-semibold transition-all duration-200 ${
                active
                  ? `border-brand-500 bg-brand-50 text-brand-900 dark:bg-brand-900/40 dark:text-brand-100 ${
                      emphasize ? 'animate-pulse' : ''
                    }`
                  : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400'
              }`}
            >
              {phaseLabels[phase]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TradeMeter({
  label,
  valueLabel,
  tone,
}: {
  label: string;
  valueLabel: string;
  tone: TradeOffTone;
}) {
  const filled = tradeToneToSegments(tone);
  return (
    <div className="rounded-xl border border-gray-200 bg-slate-50 p-3 dark:border-gray-700 dark:bg-slate-900/50">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
        {valueLabel}
      </p>
      <div className="mt-2 flex gap-1" aria-hidden>
        {Array.from({ length: METER_SEGMENT_COUNT }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < filled
                ? 'bg-brand-500 dark:bg-brand-400'
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
