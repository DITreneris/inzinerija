import { RefreshCw, Sparkles } from 'lucide-react';
import type { Progress, RetrievalScheduleItem } from '../utils/progress';
import {
  EVAL_HABIT_SLIDES,
  getDueRetrieval,
  getPrimaryEvalHabit,
} from '../utils/retrievalSchedule';
import CTAButton from './ui/CTAButton';
import Card from './ui/Card';

export interface RetrievalDueCardProps {
  progress: Progress;
  isEn?: boolean;
  onStartRetrieval: (item: RetrievalScheduleItem) => void;
  onOpenEval?: (moduleId: number, slideId: number) => void;
}

export function RetrievalDueCard({
  progress,
  isEn = false,
  onStartRetrieval,
  onOpenEval,
}: RetrievalDueCardProps) {
  const due = getDueRetrieval(progress).filter((i) => i.kind !== 'eval');
  const primaryDue = due[0] ?? null;
  const evalHabit = getPrimaryEvalHabit(progress);
  const showEval =
    onOpenEval &&
    evalHabit &&
    (progress.completedModules.includes(evalHabit.moduleId) ||
      getDueRetrieval(progress).some((i) => i.kind === 'eval'));

  if (!primaryDue && !showEval) return null;

  return (
    <Card
      className="p-5 border-2 border-brand-200 dark:border-brand-700 bg-brand-50/40 dark:bg-brand-950/20"
      data-testid="retrieval-due-card"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
          <RefreshCw className="w-5 h-5" aria-hidden />
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {isEn ? 'Spaced recall' : 'Pakartotinė atmintis'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isEn
                ? 'Short formative check – strengthens what you learned.'
                : 'Trumpa formuojanti patikra – įtvirtina tai, ką išmokai.'}
            </p>
          </div>
          {primaryDue && (
            <CTAButton
              variant="primary"
              className="min-h-[44px]"
              onClick={() => onStartRetrieval(primaryDue)}
              aria-label={isEn ? 'Review now' : 'Pakartoti dabar'}
            >
              {isEn ? 'Review now' : 'Pakartoti dabar'}
              {primaryDue.moduleId != null ? ` · M${primaryDue.moduleId}` : ''}
            </CTAButton>
          )}
          {showEval && evalHabit && (
            <button
              type="button"
              onClick={() => onOpenEval!(evalHabit.moduleId, evalHabit.slideId)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 dark:text-accent-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" aria-hidden />
              {isEn ? 'Run the evaluator' : 'Paleisk vertintoją'}
              {` · M${evalHabit.moduleId}`}
            </button>
          )}
          {!showEval && EVAL_HABIT_SLIDES.length === 0 ? null : null}
        </div>
      </div>
    </Card>
  );
}
