import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Progress, RetrievalScheduleItem } from '../utils/progress';
import { getDueRetrieval } from '../utils/retrievalSchedule';
import CTAButton from './ui/CTAButton';
import Card from './ui/Card';

export interface RetrievalDueCardProps {
  progress: Progress;
  onStartRetrieval: (item: RetrievalScheduleItem) => void;
}

export function RetrievalDueCard({
  progress,
  onStartRetrieval,
}: RetrievalDueCardProps) {
  const { t } = useTranslation('modulesPage');
  const due = getDueRetrieval(progress).filter((i) => i.kind !== 'eval');
  const primaryDue = due[0] ?? null;

  if (!primaryDue) return null;

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
              {t('retrievalCardTitle')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('retrievalCardBody')}
            </p>
          </div>
          <CTAButton
            variant="primary"
            className="min-h-[44px]"
            onClick={() => onStartRetrieval(primaryDue)}
            aria-label={t('retrievalCardCtaAria')}
          >
            {t('retrievalCardCta')}
            {primaryDue.moduleId != null ? ` · M${primaryDue.moduleId}` : ''}
          </CTAButton>
        </div>
      </div>
    </Card>
  );
}
