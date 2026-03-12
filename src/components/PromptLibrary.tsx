import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import { getPromptLibrary } from '../data/promptLibraryLoader';
import { useLocale } from '../contexts/LocaleContext';
import type { PromptLibrarySection } from '../data/promptLibraryLoader';

/** Paryškina [PLACEHOLDER] tekste */
function PromptText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <span
            key={i}
            className="bg-accent-100 dark:bg-accent-900/40 text-accent-800 dark:text-accent-200 px-1 rounded font-medium"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function PromptLibrary() {
  const { t } = useTranslation(['promptLibrary', 'common']);
  const { locale } = useLocale();
  const library = useMemo(() => getPromptLibrary(locale), [locale]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="card p-8 md:p-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-brand-100 dark:bg-brand-900/30 p-2.5 rounded-xl">
          <BookOpen className="w-6 h-6 text-brand-600 dark:text-brand-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('promptLibrary:title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
            {t('promptLibrary:subtitle')}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {t('promptLibrary:howToHint')}
      </p>

      <div className="space-y-10">
        {library.map((section: PromptLibrarySection) => (
          <section key={section.id} className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white pb-2 border-b-2 border-brand-200 dark:border-brand-800">
              <Sparkles className="w-5 h-5 text-brand-500" />
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => handleCopy(item.id, item.prompt)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex-shrink-0 ${
                        copiedId === item.id
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                          : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600'
                      }`}
                      aria-label={t('promptLibrary:copyAria', { title: item.title })}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">{t('common:copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">{t('common:copy')}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {(item.goal || item.logika) && (
                    <div className="mb-3 space-y-1.5">
                      {item.goal && (
                        <p className="text-xs">
                          <span className="font-semibold text-brand-700 dark:text-brand-300">{t('promptLibrary:goalLabel')}:</span>{' '}
                          <span className="text-gray-600 dark:text-gray-400">{item.goal}</span>
                        </p>
                      )}
                      {item.logika && (
                        <p className="text-xs">
                          <span className="font-semibold text-violet-700 dark:text-violet-300">{t('promptLibrary:logikaLabel')}:</span>{' '}
                          <span className="text-gray-600 dark:text-gray-400">{item.logika}</span>
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    {t('promptLibrary:promptLabel')}
                  </p>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 font-mono leading-relaxed">
                    <PromptText text={item.prompt} />
                  </div>

                  {copiedId === item.id && (
                    <div className="absolute bottom-3 right-3 badge-success animate-fade-in">
                      <Check className="w-3 h-3 mr-1" />
                      {t('common:copiedExclaim')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
