/**
 * Workflow grandinės List Cards – „Pavyzdžiai iš praktikos“.
 * Dviejų lygių layout: įrankiai viršuje, rezultatas (outcome) apačioje – outcome vizualiai pagrindinis.
 * Vienoda expand sekcija visoms grandinėms: Įvestis / Rezultatas.
 */
import { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CopyButton from './CopyButton';
import { useLocale } from '../../../contexts/LocaleContext';
import type { WorkflowChainItem } from '../../../types/modules';

export interface WorkflowChainsBlockProps {
  chains: WorkflowChainItem[];
}

function formatCopyText(item: WorkflowChainItem): string {
  const chainStr = item.chain.join(' → ');
  const flowStr = item.flow.join(' → ');
  return `${chainStr} | ${flowStr}`;
}

export default function WorkflowChainsBlock({
  chains,
}: WorkflowChainsBlockProps) {
  const { t } = useTranslation('contentSlides');
  const { locale } = useLocale();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className="my-3 space-y-3"
      role="region"
      aria-label={t('workflowChainsRegionAria')}
    >
      {chains.map((item, index) => {
        const hasExpand = !!(item.expandInput || item.expandOutput);
        const isExpanded = expandedIndex === index;
        const copyText = formatCopyText(item);

        return (
          <div
            key={index}
            className="min-h-[4.5rem] rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-4 py-3 shadow-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/95"
            style={{ padding: '12px 16px' }}
          >
            {/* Lygis 1: įrankiai (grandinė) – chip'ai, vizualiai antraeiliai */}
            <div className="flex flex-wrap items-center gap-1 min-w-0 mb-1.5">
              {item.chain.map((tool, i) => (
                <span key={i} className="inline-flex items-center gap-0.5">
                  <span className="rounded-full bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                    {tool}
                  </span>
                  {i < item.chain.length - 1 && (
                    <ChevronRight
                      className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0"
                      aria-hidden
                    />
                  )}
                </span>
              ))}
            </div>

            {/* Lygis 2: rezultatas (eiga) – pagrindinis: didesnis, storesnis, tamsesnis */}
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <span className="flex flex-wrap items-baseline gap-1 text-lg font-bold text-gray-900 dark:text-white">
                {item.flow.map((step, i) => (
                  <span key={i} className="inline-flex items-baseline gap-0.5">
                    <span>{step}</span>
                    {i < item.flow.length - 1 && (
                      <span
                        className="text-gray-500 dark:text-gray-400 font-normal mx-0.5"
                        aria-hidden
                      >
                        →
                      </span>
                    )}
                  </span>
                ))}
              </span>
              {item.tag && (
                <span
                  className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded"
                  aria-label={t('workflowChainsCategoryAria', {
                    tag: item.tag,
                  })}
                >
                  {item.tag}
                </span>
              )}
              <CopyButton
                text={copyText}
                className="flex-shrink-0 hover:bg-brand-50 dark:hover:bg-brand-900/20"
                size="sm"
                title={locale === 'en' ? 'Copy chain' : 'Kopijuoti grandinę'}
                ariaLabel={
                  locale === 'en' ? 'Copy chain' : 'Kopijuoti grandinę'
                }
                copiedLabel={locale === 'en' ? 'Copied' : 'Nukopijuota'}
              />
            </div>

            {/* Expand: secondary action – mažas, dešinėje */}
            {hasExpand && (
              <>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleExpand(index)}
                    className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 rounded transition-colors"
                    aria-expanded={isExpanded}
                    aria-controls={`workflow-expand-${index}`}
                    id={`workflow-expand-btn-${index}`}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        {locale === 'en' ? 'Hide' : 'Slėpti'}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        {locale === 'en' ? 'Details' : 'Detalės'}
                      </>
                    )}
                  </button>
                </div>
                {isExpanded && (
                  <div
                    id={`workflow-expand-${index}`}
                    role="region"
                    aria-labelledby={`workflow-expand-btn-${index}`}
                    className="mt-2 p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/60 space-y-2 text-sm"
                  >
                    {item.expandInput && (
                      <p>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-0.5">
                          {locale === 'en' ? 'Input' : 'Įvestis'}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.expandInput}
                        </span>
                      </p>
                    )}
                    {item.expandOutput && (
                      <p>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-0.5">
                          {locale === 'en' ? 'Result' : 'Rezultatas'}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.expandOutput}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
