import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { CheckCircle } from 'lucide-react';
import { useLocale } from '../../../../contexts/LocaleContext';
import type { ModuleIntroContent } from '../../../../types/modules';

export function ModuleIntroSlide({ content }: { content: ModuleIntroContent }) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  return (
    <div className="space-y-6">
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-brand-900 dark:text-brand-100">
          {isEn
            ? 'After this module you will be able to:'
            : 'Po šio modulio galėsi:'}
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {(content.learningOutcomes ?? []).map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle
                className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500 p-6 rounded-xl">
        <h3 className="font-bold text-lg mb-3 text-accent-900 dark:text-accent-100">
          {isEn ? 'Why context engineering?' : 'Kodėl konteksto inžinerija?'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.whyAdvanced}
        </p>
      </div>
      {content.connectionToModule1 && (
        <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 dark:border-slate-600 border border-slate-200 dark:border-slate-700 p-5 rounded-xl">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            {t('linkToModule1')}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {content.connectionToModule1}
          </p>
        </div>
      )}
    </div>
  );
}
