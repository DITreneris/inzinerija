import { ArrowRight } from 'lucide-react';
import { Card, CTAButton } from './ui';

interface ModulesReadyCheckStripProps {
  onGoToQuiz: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export default function ModulesReadyCheckStrip({
  onGoToQuiz,
  t,
}: ModulesReadyCheckStripProps) {
  return (
    <Card
      className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-gray-800 dark:bg-gray-900 lg:px-6 lg:py-4"
      role="region"
      aria-label={t('readyCheckBeforeM4Aria')}
    >
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-center lg:grid-cols-[minmax(0,1fr)_13rem]">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
            {t('readyCheckBeforeM4Eyebrow')}
          </p>
          <h2 className="mt-1 text-lg font-bold leading-snug text-gray-900 dark:text-white sm:text-xl">
            {t('readyCheckBeforeM4')}
          </h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {t('readyCheckBeforeM4Body')}
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2">
          <CTAButton
            variant="primary"
            onClick={onGoToQuiz}
            className="w-full justify-center rounded-xl"
            aria-label={t('readyCheckBeforeM4Aria')}
          >
            {t('readyCheckBeforeM4Cta')}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </CTAButton>
          <p className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs leading-none text-slate-600 shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {t('readyCheckBeforeM4Meta')}
          </p>
        </div>
      </div>
    </Card>
  );
}
