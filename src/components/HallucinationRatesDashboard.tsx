import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HALLUCINATION_RATES,
  HALLUCINATION_RATES_SOURCE,
  getHallucinationResearchPrompt,
  type HallucinationRateEntry,
} from '../data/hallucinationRates';
import { useLocale } from '../contexts/LocaleContext';
import CopyButton from './slides/shared/CopyButton';

const MAX_RATE = 6;
const BAR_HEIGHT = 28;
const BAR_GAP = 10;

type SortKey = 'rate-asc' | 'rate-desc' | 'name';

function sortData(
  data: HallucinationRateEntry[],
  sort: SortKey
): HallucinationRateEntry[] {
  const copy = [...data];
  if (sort === 'name') {
    copy.sort((a, b) => a.model.localeCompare(b.model));
    return copy;
  }
  if (sort === 'rate-asc') {
    copy.sort((a, b) => a.ratePercent - b.ratePercent);
    return copy;
  }
  copy.sort((a, b) => b.ratePercent - a.ratePercent);
  return copy;
}

export default function HallucinationRatesDashboard() {
  const { t } = useTranslation('hallucinationRates');
  const { locale } = useLocale();
  const [sort, setSort] = useState<SortKey>('rate-asc');
  const [hoverId, setHoverId] = useState<string | null>(null);

  const sorted = useMemo(() => sortData(HALLUCINATION_RATES, sort), [sort]);
  const researchPrompt = getHallucinationResearchPrompt(locale);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {t('intro')}
      </p>
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-brand-50/80 via-white to-accent-50/40 p-4 shadow-sm dark:border-gray-700 dark:from-brand-950/40 dark:via-gray-900 dark:to-accent-950/20 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t('chartTitle')}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {t('sortLabel')}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="rate-asc">{t('sortRateAsc')}</option>
              <option value="rate-desc">{t('sortRateDesc')}</option>
              <option value="name">{t('sortName')}</option>
            </select>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          style={{ minHeight: sorted.length * (BAR_HEIGHT + BAR_GAP) + 60 }}
        >
          <div className="space-y-2 mb-2">
            <div className="flex text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              <span className="w-40 flex-shrink-0">{t('modelColumn')}</span>
              <span className="flex-1 text-right pr-2">{t('rateColumn')}</span>
            </div>
            {sorted.map((entry) => {
              const widthPercent = (entry.ratePercent / MAX_RATE) * 100;
              const isHover = hoverId === entry.id;
              const isHighlight = entry.highlight;

              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-3"
                  style={{ height: BAR_HEIGHT }}
                  onMouseEnter={() => setHoverId(entry.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <span
                    className="w-40 flex-shrink-0 text-sm font-medium text-gray-800 dark:text-gray-200 truncate"
                    title={entry.model}
                  >
                    {entry.model}
                    {entry.lowAnswerRate && (
                      <span
                        className="ml-0.5 text-amber-600 dark:text-amber-400"
                        title={t('lowAnswerRateTitle')}
                      >
                        *
                      </span>
                    )}
                  </span>
                  <div className="flex-1 flex items-center min-w-0">
                    <div
                      className={`h-5 rounded-md bg-brand-500 dark:bg-brand-600 transition-all duration-200 flex items-center justify-end pr-1${
                        isHighlight
                          ? ' outline outline-2 outline-red-600 outline-offset-2'
                          : ''
                      }`}
                      style={{
                        width: `${Math.max(widthPercent, 8)}%`,
                        minWidth: 32,
                        boxShadow: isHover
                          ? '0 2px 8px rgba(0,0,0,0.15)'
                          : undefined,
                      }}
                      title={`${entry.ratePercent}%`}
                    >
                      {widthPercent > 15 && (
                        <span className="text-xs font-bold text-white drop-shadow-sm">
                          {entry.ratePercent}%
                        </span>
                      )}
                    </div>
                    {widthPercent <= 15 && (
                      <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-200 tabular-nums">
                        {entry.ratePercent}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {hoverId && (
            <div className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700/80 text-xs text-gray-700 dark:text-gray-300">
              {sorted.find((e) => e.id === hoverId)?.model}:{' '}
              <strong>
                {sorted.find((e) => e.id === hoverId)?.ratePercent}%
              </strong>{' '}
              {t('hoverRateSuffix')}
            </div>
          )}

          <p className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
            {t('sourceLabel')}{' '}
            <a
              href={HALLUCINATION_RATES_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline"
            >
              {HALLUCINATION_RATES_SOURCE.name} by{' '}
              {HALLUCINATION_RATES_SOURCE.by}
            </a>
            {HALLUCINATION_RATES_SOURCE.asOfDate
              ? ` (${t('asOfLabel')} ${HALLUCINATION_RATES_SOURCE.asOfDate})`
              : ''}
            . {t('ratesMayVary')}
            {HALLUCINATION_RATES.some((e) => e.lowAnswerRate) && (
              <> {t('lowAnswerRateNote')}</>
            )}
          </p>
        </div>
      </div>

      <div className="rounded-xl p-4 lg:p-5 bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          {t('conclusionHeading')}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {t('conclusionBody')}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
            {t('promptBlockTitle')}
          </h4>
          <CopyButton
            text={researchPrompt}
            size="sm"
            ariaLabel={t('copyPromptAria')}
          />
        </div>
        <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
          {researchPrompt}
        </pre>
      </div>
    </div>
  );
}
