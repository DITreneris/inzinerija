import { ArrowRight, RotateCcw } from 'lucide-react';
import type { Module } from '../types/modules';
import type { RetrievalScheduleItem } from '../utils/progress';
import { Card, CTAButton } from './ui';
import { focusRingClasses, touchTargetClasses } from '../design-tokens';

interface ModulesNextStepStripProps {
  module: Module;
  moduleNumber: number;
  moduleProgress: number;
  completedCount: number;
  totalModules: number;
  overallProgressPercent: number;
  retrievalItem?: RetrievalScheduleItem | null;
  onModuleSelect: (moduleId: number) => void;
  onStartRetrieval?: (item: RetrievalScheduleItem) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

export default function ModulesNextStepStrip({
  module,
  moduleNumber,
  moduleProgress,
  completedCount,
  totalModules,
  overallProgressPercent,
  retrievalItem,
  onModuleSelect,
  onStartRetrieval,
  t,
}: ModulesNextStepStripProps) {
  const ctaLabel =
    moduleProgress > 0
      ? t('nextStepContinue', { n: moduleNumber })
      : t('nextStepStart', { n: moduleNumber });
  const retrievalModuleId = retrievalItem?.moduleId;

  return (
    <Card
      className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-gray-800 dark:bg-gray-900 lg:px-6 lg:py-4"
      role="region"
      aria-label={t('nextStepAria')}
    >
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-center lg:grid-cols-[minmax(0,1fr)_13rem]">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-300">
            {t('nextStepEyebrow')}
          </p>
          <h2 className="mt-1 text-lg font-bold leading-snug text-gray-900 dark:text-white sm:text-xl">
            {t('moduleN', { n: moduleNumber })} · {module.title}
          </h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {module.description || module.subtitle}
          </p>
          {retrievalItem && onStartRetrieval ? (
            <button
              type="button"
              onClick={() => onStartRetrieval(retrievalItem)}
              className={`mt-3 inline-flex items-center gap-2 rounded text-sm font-medium text-brand-800 hover:underline dark:text-brand-200 ${touchTargetClasses.minimumHeight} ${focusRingClasses.brandOnWhite}`}
            >
              <RotateCcw className="w-4 h-4" aria-hidden />
              {t('nextStepRecallCta', {
                n: retrievalModuleId ?? moduleNumber,
              })}
            </button>
          ) : null}
        </div>

        <div className="flex w-full flex-col items-stretch gap-2">
          <CTAButton
            variant="accent"
            onClick={() => onModuleSelect(module.id)}
            className="w-full justify-center rounded-xl"
            aria-label={t('nextStepCtaAria', {
              n: moduleNumber,
              title: module.title,
            })}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" aria-hidden />
          </CTAButton>
          <p
            className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs leading-none text-slate-600 shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            aria-label={t('nextStepProgressAria', {
              done: completedCount,
              total: totalModules,
              percent: overallProgressPercent,
            })}
          >
            <span>{t('nextStepProgressLabel')}</span>
            <span className="font-semibold">
              {t('nextStepProgressText', {
                done: completedCount,
                total: totalModules,
                percent: overallProgressPercent,
              })}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}
