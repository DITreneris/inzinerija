import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench, Filter, ArrowLeft } from 'lucide-react';
import { getTools } from '../data/toolsLoader';
import { getModulesSync } from '../data/modulesLoader';
import { useLocale } from '../contexts/LocaleContext';
import { getIsMvpMode } from '../utils/mvpMode';

function getModuleLabels(t: (key: string, opts?: { n?: number }) => string, locale: 'lt' | 'en'): Record<number, string> {
  const modules = getModulesSync(locale);
  const labels: Record<number, string> = {};
  if (modules?.length) {
    for (const m of modules) {
      labels[m.id] = m.title ?? t('toolsPage:moduleN', { n: m.id });
    }
  }
  for (let id = 1; id <= 15; id++) {
    if (!labels[id]) labels[id] = t('toolsPage:moduleN', { n: id });
  }
  return labels;
}

export interface ToolsPageProps {
  onBackToModule?: () => void;
  /** Atidarant iš modulio skaidrės – filtruoti pagal šį modulį (pvz. 13) */
  initialFilter?: number | null;
}

export default function ToolsPage({ onBackToModule, initialFilter }: ToolsPageProps) {
  const { t } = useTranslation(['toolsPage', 'common']);
  const { locale } = useLocale();
  const [filter, setFilter] = useState<number | 'all'>(initialFilter ?? 'all');
  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all');
  useEffect(() => {
    if (initialFilter != null) setFilter(initialFilter);
  }, [initialFilter]);
  const rawTools = getTools(locale);
  const isMvpMode = getIsMvpMode();
  const tools = useMemo(
    () => (isMvpMode ? rawTools.filter(tool => tool.moduleId <= 6) : rawTools),
    [rawTools, isMvpMode]
  );
  const MODULE_LABELS = useMemo(() => getModuleLabels(t, locale), [t, locale]);

  const categories = useMemo(() => {
    const set = new Set(tools.map(t => t.category).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [tools]);

  const filtered = useMemo(() => {
    let list = tools;
    if (filter !== 'all') list = list.filter(t => t.moduleId === filter);
    if (categoryFilter !== 'all') list = list.filter(t => t.category === categoryFilter);
    return [...list].sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [tools, filter, categoryFilter, locale]);

  const moduleIds = useMemo(() => {
    const ids = new Set(tools.map(t => t.moduleId));
    return Array.from(ids).sort((a, b) => a - b);
  }, [tools]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {onBackToModule && (
            <button
              type="button"
              onClick={onBackToModule}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800 transition-colors min-h-[44px]"
              aria-label={t('common:backToModule')}
            >
              <ArrowLeft className="w-5 h-5" aria-hidden />
              <span>{t('common:backToModule')}</span>
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-3 rounded-xl">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {t('toolsPage:title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                {t('toolsPage:subtitle')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 min-h-[44px]"
            aria-label={t('toolsPage:filterByModule')}
          >
            <option value="all">{t('toolsPage:allModules')}</option>
            {moduleIds.map((id) => (
              <option key={id} value={id}>
                {MODULE_LABELS[id] ?? t('toolsPage:moduleN', { n: id })}
              </option>
            ))}
          </select>
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 min-h-[44px]"
              aria-label={t('toolsPage:filterByCategory')}
            >
              <option value="all">{t('toolsPage:allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((item, i) => (
          <article
            key={`${item.name}-${item.moduleId}-${i}`}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-800 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <h2 className="text-lg font-bold text-brand-700 dark:text-brand-300">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 w-fit">
                  {MODULE_LABELS[item.moduleId] ?? t('toolsPage:moduleN', { n: item.moduleId })}
                </span>
                {item.category && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 w-fit">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
            {item.description && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          {t('toolsPage:noToolsFilter')}
        </p>
      )}
    </div>
  );
}
