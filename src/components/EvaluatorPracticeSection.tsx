import { Sparkles } from 'lucide-react';
import type { Module } from '../types/modules';
import type { Progress } from '../utils/progress';
import { EVAL_HABIT_SLIDES, getDueRetrieval } from '../utils/retrievalSchedule';
import { Card, CTAButton } from './ui';

interface EvaluatorPracticeSectionProps {
  modules: Module[];
  progress: Progress;
  maxAccessible: number;
  onOpenEvalHabit?: (moduleId: number, slideId: number) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

function resolveEvaluatorHabit(
  progress: Progress,
  maxAccessible: number
): (typeof EVAL_HABIT_SLIDES)[number] | null {
  const dueEval = getDueRetrieval(progress).find(
    (item) =>
      item.kind === 'eval' && item.moduleId != null && item.slideId != null
  );
  if (dueEval) {
    return (
      EVAL_HABIT_SLIDES.find(
        (habit) =>
          habit.moduleId === dueEval.moduleId &&
          habit.slideId === dueEval.slideId
      ) ?? null
    );
  }

  return (
    [...EVAL_HABIT_SLIDES]
      .reverse()
      .find(
        (habit) =>
          habit.moduleId <= maxAccessible &&
          progress.completedModules.includes(habit.moduleId)
      ) ?? null
  );
}

export default function EvaluatorPracticeSection({
  modules,
  progress,
  maxAccessible,
  onOpenEvalHabit,
  t,
}: EvaluatorPracticeSectionProps) {
  if (!onOpenEvalHabit) return null;

  const habit = resolveEvaluatorHabit(progress, maxAccessible);
  if (!habit) return null;

  const module = modules.find((candidate) => candidate.id === habit.moduleId);
  const moduleTitle = module?.title ?? t('moduleN', { n: habit.moduleId });

  return (
    <Card
      className="p-5 lg:p-6 border border-brand-100 dark:border-brand-800 bg-white/80 dark:bg-gray-900/60"
      role="region"
      aria-label={t('evaluatorSectionAria')}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
            <Sparkles className="w-5 h-5" aria-hidden />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
              {t('evaluatorSectionEyebrow')}
            </p>
            <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              {t('evaluatorSectionTitle', {
                n: habit.moduleId,
                title: moduleTitle,
              })}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t('evaluatorSectionBody')}
            </p>
          </div>
        </div>

        <CTAButton
          variant="secondary"
          onClick={() => onOpenEvalHabit(habit.moduleId, habit.slideId)}
          aria-label={t('evaluatorSectionCtaAria', {
            n: habit.moduleId,
            title: moduleTitle,
          })}
          className="shrink-0"
        >
          {t('evaluatorSectionCta', { n: habit.moduleId })}
        </CTAButton>
      </div>
    </Card>
  );
}
