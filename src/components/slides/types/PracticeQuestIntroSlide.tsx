/**
 * M9 practice-quest-intro – analysis kit desk (GOLDEN §3.4e).
 * Pattern interactive-control-lab; Shell = Ne.
 */
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle,
  Compass,
  Map as MapIcon,
} from 'lucide-react';
import ChoiceControl from '../../ui/ChoiceControl';
import { resolveLucideIcon } from '../../../icons/resolveIcon';
import { useLocale } from '../../../contexts/LocaleContext';
import { getT } from '../../../i18n';
import {
  findJourneyChoiceByStored,
  type M7JourneyChoiceId,
} from '../../../utils/moduleJourneyFocus';
import { loadM9KitChecklist } from '../../../utils/m9KitChecklist';
import { resolveQuestStepStatus } from '../../../utils/resolveM9QuestStepStatus';
import type { JourneyChoice, Slide } from '../../../types/modules';

export type QuestStep = {
  id: string;
  label: string;
  slideId: number;
};

type QuestIntroContent = {
  whyBenefit?: string;
  duration?: string;
  audience?: string;
  journeyHeading?: string;
  journeyChoices?: JourneyChoice[];
  confirmMessage?: string;
  softPreselectHint?: string;
  questSteps?: QuestStep[];
  outcomeChips?: string[];
  firstActionCTA?: string;
  firstActionSlideId?: number;
  footer?: string;
};

export function PracticeQuestIntroSlide({
  slide,
  progress,
  onJourneyFocusChoice,
  onNavigateToSlideById,
}: {
  slide?: Slide;
  progress?: {
    moduleJourneyFocus?: Record<number, string>;
    completedTasks?: Record<number, number[]>;
  };
  onJourneyFocusChoice?: (moduleId: number, choiceId: string) => void;
  onNavigateToSlideById?: (slideId: number) => void;
}) {
  const t = getT('testPractice');
  const { locale } = useLocale();
  const isEn = locale.startsWith('en');
  const content = (slide?.content ?? {}) as QuestIntroContent;
  const choices = useMemo(
    () => content.journeyChoices ?? [],
    [content.journeyChoices]
  );
  const m7Focus = progress?.moduleJourneyFocus?.[7];
  const m9Focus = progress?.moduleJourneyFocus?.[9];
  const softChoice = useMemo(
    () => findJourneyChoiceByStored(choices, m7Focus),
    [choices, m7Focus]
  );
  const savedM9 = useMemo(
    () => findJourneyChoiceByStored(choices, m9Focus),
    [choices, m9Focus]
  );

  const [selectedId, setSelectedId] = useState<string | null>(
    savedM9?.id ?? softChoice?.id ?? null
  );
  const [confirmed, setConfirmed] = useState(Boolean(savedM9));
  const [kit, setKit] = useState(() => loadM9KitChecklist());

  useEffect(() => {
    setKit(loadM9KitChecklist());
  }, []);

  useEffect(() => {
    if (savedM9) {
      setSelectedId(savedM9.id);
      setConfirmed(true);
      return;
    }
    if (softChoice && !selectedId) {
      setSelectedId(softChoice.id);
    }
  }, [savedM9, softChoice, selectedId]);

  const selected = choices.find((c) => c.id === selectedId) ?? null;
  const questSteps = content.questSteps ?? [];
  const chips = content.outcomeChips ?? [];
  const startSlideId = content.firstActionSlideId ?? 93.1;
  const currentSlideId = typeof slide?.id === 'number' ? slide.id : 90;
  const completedTaskIds = progress?.completedTasks?.[9] ?? [];

  const softHint =
    !confirmed && softChoice && content.softPreselectHint
      ? content.softPreselectHint.replace('{label}', softChoice.label)
      : null;

  const statusHint = confirmed
    ? isEn
      ? `Confirmed: ${selected?.label ?? ''}. Start when ready.`
      : `Patvirtinta: ${selected?.label ?? ''}. Gali pradėti.`
    : selected
      ? isEn
        ? 'Confirm your domain to unlock Start.'
        : 'Patvirtink sritį, kad atrakintum startą.'
      : softHint;

  const handleConfirm = () => {
    if (!selected) return;
    onJourneyFocusChoice?.(9, selected.id as M7JourneyChoiceId);
    setConfirmed(true);
  };

  const handleStart = () => {
    if (!confirmed || !onNavigateToSlideById) return;
    onNavigateToSlideById(startSlideId);
  };

  /** GOLDEN §3.4e: ChoiceControl value null until confirmed (soft hint ≠ selected). */
  const choiceValue = confirmed ? selectedId : null;

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {content.whyBenefit && (
        <p className="text-base font-medium text-center text-gray-800 dark:text-gray-200 leading-relaxed">
          {content.whyBenefit}
        </p>
      )}

      {content.duration && (
        <p className="text-sm font-semibold text-center text-accent-700 dark:text-accent-300">
          {t('durationLabel')} {content.duration}
        </p>
      )}

      {softHint && (
        <p
          className="text-sm text-center text-brand-700 dark:text-brand-300"
          role="status"
        >
          {softHint}
        </p>
      )}

      <ChoiceControl
        className="animate-fade-in"
        legend={content.journeyHeading ?? t('m9QuestDomainLegend')}
        columns={3}
        size="compact"
        value={choiceValue}
        onChange={(id) => {
          setSelectedId(id);
          if (confirmed && id !== selectedId) setConfirmed(false);
        }}
        options={choices.map((choice) => ({
          id: choice.id,
          label: choice.label,
          description: choice.subtitle,
          icon: resolveLucideIcon(choice.icon, 'journey') ?? Compass,
        }))}
        statusHint={statusHint ?? undefined}
      />

      {selected && !confirmed && (
        <div className="rounded-xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50/90 dark:bg-emerald-950/30 p-4">
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
            {(content.confirmMessage ?? t('m9QuestConfirmMessage')).replace(
              '{label}',
              selected.label
            )}
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <CheckCircle className="h-4 w-4" aria-hidden />
            {t('m9QuestConfirmCta')}
          </button>
        </div>
      )}

      {questSteps.length > 0 && (
        <div
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 p-4"
          role="navigation"
          aria-label={t('m9QuestMapAria')}
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <MapIcon className="h-4 w-4 text-brand-600" aria-hidden />
            {t('m9QuestMapHeading')}
          </h4>
          <ol className="flex flex-wrap gap-2">
            {questSteps.map((step, i) => {
              const status = resolveQuestStepStatus(
                step,
                questSteps,
                currentSlideId,
                completedTaskIds,
                kit
              );
              const statusClass =
                status === 'current'
                  ? 'border-brand-500 bg-brand-50 text-brand-900 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-100'
                  : status === 'done'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-100'
                    : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300';
              const statusLabel =
                status === 'current'
                  ? isEn
                    ? 'Current'
                    : 'Dabar'
                  : status === 'done'
                    ? isEn
                      ? 'Done'
                      : 'Atlikta'
                    : isEn
                      ? 'Upcoming'
                      : 'Laukia';
              return (
                <li key={step.id}>
                  <span
                    className={`inline-flex min-h-[44px] items-center rounded-xl border px-3 py-2 text-sm font-medium ${statusClass}`}
                    aria-current={status === 'current' ? 'step' : undefined}
                    data-quest-status={status}
                  >
                    {status === 'done' ? (
                      <Check
                        className="mr-1.5 h-4 w-4 text-emerald-600 dark:text-emerald-400"
                        aria-hidden
                      />
                    ) : (
                      <span className="mr-1.5 font-bold text-brand-600 dark:text-brand-400">
                        {i + 1}.
                      </span>
                    )}
                    <span>
                      {step.label}
                      <span className="sr-only"> ({statusLabel})</span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {chips.length > 0 && (
        <ul
          className="flex flex-wrap justify-center gap-2"
          aria-label={t('m9QuestOutcomesAria')}
        >
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 dark:border-brand-700 dark:bg-brand-950/40 dark:text-brand-200"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          disabled={!confirmed}
          onClick={handleStart}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent-500 dark:hover:bg-accent-600"
          aria-label={t('m9StartPracticeAria')}
        >
          {content.firstActionCTA ?? t('m9StartPracticeCta')}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        {!confirmed && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('m9QuestStartLockedHint')}
          </p>
        )}
      </div>

      {content.audience && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {content.audience}
        </p>
      )}
    </div>
  );
}

export default PracticeQuestIntroSlide;
