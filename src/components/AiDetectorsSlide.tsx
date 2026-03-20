import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getAiDetectors,
  getDetectorFilters,
  getDetectorTypeLabels,
  getSixBlockPrompt,
  type DetectorType,
  type AiDetectorEntry,
} from '../data/aiDetectors';
import { useLocale } from '../contexts/LocaleContext';
import CopyButton from './slides/shared/CopyButton';

/** Statistikos blokas viršuje */
function StatsBar({
  tools,
  statLabels,
}: {
  tools: AiDetectorEntry[];
  statLabels: { tools: string; text: string; imageVideo: string };
}) {
  const textCount = tools.filter((t) => t.types.includes('text')).length;
  const imageCount = tools.filter(
    (t) => t.types.includes('image') || t.types.includes('video')
  ).length;

  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      {[
        { value: tools.length, label: statLabels.tools },
        { value: textCount, label: statLabels.text },
        { value: imageCount, label: statLabels.imageVideo },
      ].map((stat) => (
        <div
          key={stat.label}
          className="text-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-3 px-2 shadow-sm"
        >
          <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
            {stat.value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Tipo badge */
function TypeBadge({
  type,
  typeLabels,
}: {
  type: DetectorType;
  typeLabels: Record<DetectorType, { label: string; colorClass: string }>;
}) {
  const { label, colorClass } = typeLabels[type];
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
}

/** Viena įrankio kortelė */
function ToolCard({
  tool,
  typeLabels,
  visitSiteLabel,
}: {
  tool: AiDetectorEntry;
  typeLabels: Record<DetectorType, { label: string; colorClass: string }>;
  visitSiteLabel: string;
}) {
  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${
        tool.highlight
          ? 'border-brand-400 dark:border-brand-500 ring-1 ring-brand-200 dark:ring-brand-800'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Viršutinė spalvota linija */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-accent-500" />

      <div className="p-4">
        {/* Header: numeris + pavadinimas */}
        <div className="flex items-start gap-3 mb-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white text-sm font-bold flex items-center justify-center">
            {tool.number}
          </span>
          <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight pt-0.5">
            {tool.name}
            {tool.highlight && (
              <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-1.5 py-0.5 rounded">
                LT
              </span>
            )}
          </h4>
        </div>

        {/* Tipo badge'ai */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tool.types.map((type) => (
            <TypeBadge key={type} type={type} typeLabels={typeLabels} />
          ))}
        </div>

        {/* Aprašymas */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
          {tool.description}
        </p>

        {/* Nuoroda */}
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            {visitSiteLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

/** Pagrindinė skaidrė: DI turinio detektoriai */
export default function AiDetectorsSlide() {
  const { t } = useTranslation(['contentSlides', 'aiDetectors']);
  const { locale } = useLocale();
  const [activeFilter, setActiveFilter] = useState<DetectorType | 'all'>('all');
  const [search, setSearch] = useState('');

  const tools = getAiDetectors(locale);
  const typeLabels = getDetectorTypeLabels(locale);
  const filters = getDetectorFilters(locale);
  const sixBlockPrompt = getSixBlockPrompt(locale);
  const statLabels = {
    tools: t('aiDetectors:statTools'),
    text: t('aiDetectors:statText'),
    imageVideo: t('aiDetectors:statImageVideo'),
  };

  const filtered = useMemo(() => {
    let result: AiDetectorEntry[] = tools;

    if (activeFilter !== 'all') {
      result = result.filter((entry) => entry.types.includes(activeFilter));
    }

    const term = search.trim().toLowerCase();
    if (term) {
      result = result.filter(
        (entry) =>
          entry.name.toLowerCase().includes(term) ||
          entry.description.toLowerCase().includes(term)
      );
    }

    return result;
  }, [tools, activeFilter, search]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Antraštė */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {t('aiDetectors:title')}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('aiDetectors:intro')}
        </p>
      </div>

      {/* TL;DR – accent (Golden Standard §3.2) */}
      <div className="rounded-xl p-4 lg:p-5 bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          {t('contentSlides:tldrHeading')}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('aiDetectors:tldrBody')}
        </p>
      </div>

      {/* Daryk dabar + CTA – brand */}
      <div className="rounded-xl p-4 lg:p-5 bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          {t('contentSlides:doNowHeading')}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {t('aiDetectors:doNowBody1')}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {t('aiDetectors:doNowBody2')}
        </p>
      </div>

      {/* Kopijuojamas 6 blokų promptas */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
            {t('aiDetectors:promptBlockTitle')}
          </h4>
          <CopyButton
            text={sixBlockPrompt}
            size="sm"
            ariaLabel={t('aiDetectors:copyPromptAria')}
          />
        </div>
        <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
          {sixBlockPrompt}
        </pre>
      </div>

      {/* Kaip naudoti įrankį – brand */}
      <div className="rounded-xl p-4 lg:p-5 bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          {t('aiDetectors:howToTitle')}
        </h4>
        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
          <li>{t('aiDetectors:howToStep1')}</li>
          <li>{t('aiDetectors:howToStep2')}</li>
          <li>{t('aiDetectors:howToStep3')}</li>
          <li>{t('aiDetectors:howToStep4')}</li>
        </ol>
      </div>

      {/* Statistika */}
      <StatsBar tools={filtered} statLabels={statLabels} />

      {/* Paieška + filtrai */}
      <div className="space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('aiDetectors:searchPlaceholder')}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500 dark:border-brand-500'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-400 dark:hover:text-brand-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Kortelių grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              typeLabels={typeLabels}
              visitSiteLabel={t('aiDetectors:visitSite')}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">
          {t('aiDetectors:emptyState')}
        </div>
      )}

      {/* Etikos pastaba – terms (Golden Standard §2.2) */}
      <div className="rounded-xl p-3 bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {t('aiDetectors:ethicsNote')}
        </p>
      </div>
    </div>
  );
}
