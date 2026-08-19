import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import type { GlossaryContent } from '../../../../types/modules';

export function GlossarySlide({
  content,
}: {
  content: GlossaryContent;
  /** Kept for callers; M13 T17 – no learner “optional” badge. */
  optional?: boolean;
}) {
  useTranslation();
  const t = getT('contentSlides');
  return (
    <div className="space-y-4">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-5 rounded-r-xl">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-bold text-lg text-brand-900 dark:text-brand-100">
            {t('glossaryLabel')}
          </h4>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {t('glossarySlideIntro')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(content.terms ?? []).map((item, i) => (
          <article
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
            role="article"
            aria-label={item.term}
          >
            <dt className="font-bold text-sm text-brand-700 dark:text-brand-300 mb-1">
              {item.term}
            </dt>
            <dd className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.definition}
            </dd>
          </article>
        ))}
      </div>
    </div>
  );
}
