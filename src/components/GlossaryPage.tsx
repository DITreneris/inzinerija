import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookMarked, Filter, ArrowLeft, Lock } from 'lucide-react';
import { getGlossary } from '../data/glossaryLoader';
import { getModulesSync } from '../data/modulesLoader';
import { getIsMvpMode } from '../utils/mvpMode';
import { useLocale } from '../contexts/LocaleContext';
import type { Progress } from '../utils/progress';

export interface GlossaryTerm {
  term: string;
  definition: string;
  moduleId: number;
  /** Jei nurodyta – terminas atrakintas tik užbaigus atitinkamą path-step (kelio žingsnį) */
  unlockedBy?: { moduleId: number; slideId: number };
}

function getModuleLabels(t: (key: string, opts?: { n?: number }) => string, locale: 'lt' | 'en'): Record<number, string> {
  const modules = getModulesSync(locale);
  const labels: Record<number, string> = {};
  if (modules?.length) {
    for (const m of modules) {
      labels[m.id] = m.title ?? t('glossary:moduleN', { n: m.id });
    }
  }
  return labels;
}

function termToId(term: string): string {
  return `term-${term.replace(/\s+/g, '-')}`;
}

export interface GlossaryPageProps {
  /** Terminas, į kurį prascrollinti atidarius iš skaidrės (recap nuoroda) */
  highlightTerm?: string | null;
  onBackToModule?: () => void;
  /** Progresas – skirta rodyti užrakintus terminus (unlockedBy), kol path-step neužbaigtas */
  progress?: Progress;
}

function isTermUnlocked(term: GlossaryTerm, progress: Progress | undefined): boolean {
  if (!term.unlockedBy) return true;
  if (!progress?.completedTasks) return false;
  const completed = progress.completedTasks[term.unlockedBy.moduleId];
  return Boolean(completed?.includes(term.unlockedBy.slideId));
}

export default function GlossaryPage({ highlightTerm, onBackToModule, progress }: GlossaryPageProps) {
  const { t } = useTranslation('glossary');
  const { locale } = useLocale();
  const MODULE_LABELS = useMemo(() => getModuleLabels(t, locale), [t, locale]);
  const [filter, setFilter] = useState<number | 'all'>('all');
  const rawTerms = getGlossary(locale) as GlossaryTerm[];
  const isMvpMode = getIsMvpMode();
  const terms = useMemo(
    () => (isMvpMode ? rawTerms.filter(t => t.moduleId <= 6) : rawTerms),
    [rawTerms, isMvpMode]
  );

  const filtered = useMemo(() => {
    const list = filter === 'all' ? terms : terms.filter(t => t.moduleId === filter);
    return [...list].sort((a, b) => a.term.localeCompare(b.term, locale));
  }, [terms, filter, locale]);

  const moduleIds = useMemo(() => {
    const ids = new Set(terms.map(t => t.moduleId));
    return Array.from(ids).sort((a, b) => a - b);
  }, [terms]);

  useEffect(() => {
    if (!highlightTerm) return;
    const id = termToId(highlightTerm);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [highlightTerm]);

  const backButtonJsx = onBackToModule ? (
    <button
      type="button"
      onClick={onBackToModule}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800 transition-colors min-h-[44px]"
      aria-label={t('backToModuleAria')}
    >
      <ArrowLeft className="w-5 h-5" aria-hidden />
      <span>{t('backToModule')}</span>
    </button>
  ) : null;

  const headerInner = (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {backButtonJsx}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-brand-500 to-accent-500 p-3 rounded-xl">
            <BookMarked className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-0.5">
              {t('subtitle')}
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
          aria-label={t('filterByModule')}
        >
          <option value="all">{t('filterAllModules')}</option>
          {moduleIds.map((id) => (
            <option key={id} value={id}>
              {MODULE_LABELS[id] ?? t('moduleN', { n: id })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {onBackToModule ? (
        <div className="sticky top-0 z-10 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          {headerInner}
        </div>
      ) : (
        headerInner
      )}

      <div className="grid gap-4">
        {filtered.map((item, i) => {
          const locked = !isTermUnlocked(item, progress);
          return (
          <div key={`${item.term}-${item.moduleId}-${i}`}>
            <article
              id={termToId(item.term)}
              className={`p-6 rounded-xl border-2 transition-colors ${
                locked
                  ? 'bg-slate-100 dark:bg-gray-800/60 border-slate-200 dark:border-gray-700 opacity-80'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-800'
              }`}
              aria-busy={locked}
              aria-describedby={locked ? `lock-desc-${termToId(item.term)}` : undefined}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h2 className={`text-lg font-bold ${locked ? 'text-gray-500 dark:text-gray-400' : 'text-brand-700 dark:text-brand-300'}`}>
                  {item.term}
                </h2>
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 w-fit">
                  {MODULE_LABELS[item.moduleId] ?? (locale === 'en' ? `Module ${item.moduleId}` : `Modulis ${item.moduleId}`)}
                </span>
              </div>
              {locked && item.unlockedBy ? (
                <p id={`lock-desc-${termToId(item.term)}`} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <Lock className="w-4 h-4 shrink-0" aria-hidden />
                  {t('unlockByStep', { id: item.unlockedBy.moduleId })}
                </p>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.definition}
                </p>
              )}
            </article>
            {onBackToModule && highlightTerm && item.term === highlightTerm && (
              <div className="mt-4">
                {backButtonJsx}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          {t('noResultsFilter')}
        </p>
      )}
    </div>
  );
}
