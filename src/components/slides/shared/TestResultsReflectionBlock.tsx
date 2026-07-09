import CopyButton from './CopyButton';
import { useLocale } from '../../../contexts/LocaleContext';
import { getT } from '../../../i18n';

interface TestResultsReflectionBlockProps {
  reflectionPrompt: string;
  reflectionTitle?: string;
}

export function TestResultsReflectionBlock({
  reflectionPrompt,
  reflectionTitle,
}: TestResultsReflectionBlockProps) {
  const { locale } = useLocale();
  const t = getT('contentSlides');
  const title =
    reflectionTitle ??
    (locale === 'en' ? 'Reflection prompt' : 'Refleksijos promptas');

  return (
    <div
      className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4"
      role="region"
      aria-label={t('copyReflectionPromptAria')}
    >
      <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-2 flex items-center gap-2">
        <span className="text-base" aria-hidden>
          💡
        </span>
        {title}
      </h4>
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-3">
        {reflectionPrompt}
      </p>
      <CopyButton
        text={reflectionPrompt}
        size="sm"
        ariaLabel={t('copyReflectionPromptAria')}
      />
    </div>
  );
}
