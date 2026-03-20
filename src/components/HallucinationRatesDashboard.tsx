import { useState, useMemo } from 'react';
import {
  HALLUCINATION_RATES,
  HALLUCINATION_RATES_SOURCE,
  type HallucinationRateEntry,
} from '../data/hallucinationRates';
import { useLocale } from '../contexts/LocaleContext';

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
  const { locale } = useLocale();
  const [sort, setSort] = useState<SortKey>('rate-asc');
  const [hoverId, setHoverId] = useState<string | null>(null);

  const sorted = useMemo(() => sortData(HALLUCINATION_RATES, sort), [sort]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {locale === 'en'
            ? 'Hallucination rates by model'
            : 'Haliucinacijų rodikliai pagal modelį'}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {locale === 'en' ? 'Sort:' : 'Rikiuoti:'}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="rate-asc">
              {locale === 'en' ? 'Rate (descending)' : 'Rodiklis (mažėjančiai)'}
            </option>
            <option value="rate-desc">
              {locale === 'en' ? 'Rate (ascending)' : 'Rodiklis (didėjančiai)'}
            </option>
            <option value="name">
              {locale === 'en' ? 'By model name' : 'Pagal modelio pavadinimą'}
            </option>
          </select>
        </div>
      </div>

      <div
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
        style={{ minHeight: sorted.length * (BAR_HEIGHT + BAR_GAP) + 60 }}
      >
        <div className="space-y-2 mb-2">
          <div className="flex text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <span className="w-40 flex-shrink-0">
              {locale === 'en' ? 'Model' : 'Modelis'}
            </span>
            <span className="flex-1 text-right pr-2">
              {locale === 'en'
                ? 'Hallucination rate (%)'
                : 'Haliucinacijų rodiklis (%)'}
            </span>
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
                </span>
                <div className="flex-1 flex items-center min-w-0">
                  <div
                    className="h-5 rounded-md bg-brand-500 dark:bg-brand-600 transition-all duration-200 flex items-center justify-end pr-1"
                    style={{
                      width: `${Math.max(widthPercent, 8)}%`,
                      minWidth: 32,
                      outline: isHighlight ? '2px solid #dc2626' : undefined,
                      outlineOffset: 2,
                      boxShadow: isHover
                        ? '0 2px 8px rgba(0,0,0,0.15)'
                        : undefined,
                    }}
                    title={`${entry.ratePercent}%`}
                  >
                    {widthPercent > 15 && (
                      <span className="text-[10px] font-bold text-white drop-shadow-sm">
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
            {locale === 'en'
              ? 'hallucination rate (benchmark).'
              : 'haliucinacijų rodiklis (benchmarke).'}
          </div>
        )}

        <p className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 text-[11px] text-gray-500 dark:text-gray-400">
          {locale === 'en' ? 'Source:' : 'Šaltinis:'}{' '}
          <a
            href={HALLUCINATION_RATES_SOURCE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            {HALLUCINATION_RATES_SOURCE.name} by {HALLUCINATION_RATES_SOURCE.by}
          </a>
          .{' '}
          {locale === 'en'
            ? 'Rates may vary depending on evaluation date and methodology.'
            : 'Rodikliai gali skirtis priklausomai nuo vertinimo datos ir metodologijos.'}
        </p>
      </div>
    </div>
  );
}
