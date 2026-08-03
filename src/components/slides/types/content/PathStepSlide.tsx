import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { CheckCircle, MapPin } from 'lucide-react';
import { useLocale } from '../../../../contexts/LocaleContext';
import { CopyButton } from '../../shared';
import { typographyClasses } from '../../../../design-tokens';
import type { PathStepContent } from '../../../../types/modules';

/** path-step (kelio žingsnis) – Duomenų analizės kelias; badge atrakina žodynėlio terminus */
export function PathStepSlide({
  content,
  isCompleted,
  onMarkComplete,
  onGoToSummary,
}: {
  content: PathStepContent;
  isCompleted: boolean;
  onMarkComplete: () => void;
  /** M15 quick path: jump to project summary when min scenarios done */
  onGoToSummary?: () => void;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const hasSections = (content.sections?.length ?? 0) > 0;
  const pathLabel =
    content.pathLabel ??
    (isEn ? 'Data analysis path' : 'Duomenų analizės kelias');
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin
            className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0"
            aria-hidden
          />
          <span className="text-sm font-semibold text-brand-800 dark:text-brand-200">
            {pathLabel}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/40 text-accent-800 dark:text-accent-200 text-sm font-medium">
          {content.stepTotal != null
            ? t('pathStepOfTotal', {
                n: content.stepNumber,
                total: content.stepTotal,
              })
            : `${isEn ? 'Step' : 'Žingsnis'} ${content.stepNumber}`}
        </span>
      </div>
      <h2 className={`${typographyClasses.h2} text-gray-900 dark:text-white`}>
        {content.title}
      </h2>
      {content.body && (
        <p className={typographyClasses.bodyMuted}>{content.body}</p>
      )}
      {hasSections && (
        <div className="space-y-4">
          {content.sections!.map((sec, i) => (
            <div
              key={i}
              className="rounded-lg border-l-4 border-brand-500 bg-slate-50 dark:bg-slate-800/40 pl-4 py-3 pr-3"
            >
              {sec.heading && (
                <h3
                  className={`${typographyClasses.h3} text-gray-900 dark:text-white mb-1`}
                >
                  {sec.heading}
                </h3>
              )}
              <p
                className={`${typographyClasses.body} text-gray-700 dark:text-gray-300`}
              >
                {sec.body}
              </p>
              {sec.copyable && (
                <div className="mt-3">
                  <CopyButton text={sec.copyable} size="sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {content.unlockedGlossaryTerms &&
        content.unlockedGlossaryTerms.length > 0 && (
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {isEn
              ? 'Completing this step unlocks in the glossary:'
              : 'Užbaigęs žingsnį atrakinsi žodynėlyje:'}{' '}
            {content.unlockedGlossaryTerms.join(', ')}.
          </p>
        )}
      <div className="flex flex-wrap items-center gap-3">
        {!isCompleted ? (
          <button
            type="button"
            onClick={onMarkComplete}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl font-medium bg-accent-600 hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            aria-label={t('markStepDoneAria')}
          >
            <CheckCircle className="w-5 h-5" aria-hidden />
            {isEn ? 'Mark as completed' : 'Pažymėjau kaip atliktą'}
          </button>
        ) : (
          <p className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <CheckCircle className="w-5 h-5" aria-hidden />
            {isEn
              ? 'This step is already completed'
              : 'Šis žingsnis jau atliktas'}
          </p>
        )}
        {onGoToSummary && (
          <button
            type="button"
            onClick={onGoToSummary}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl font-medium border-2 border-brand-500 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            aria-label={
              isEn ? 'Go to project summary' : 'Eiti į projekto santrauką'
            }
          >
            {isEn ? 'Go to summary' : 'Eiti į santrauką'}
          </button>
        )}
      </div>
      {content.footer && (
        <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
          {content.footer}
        </p>
      )}
    </div>
  );
}
