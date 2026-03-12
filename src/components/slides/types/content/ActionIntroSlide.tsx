import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { CheckCircle, ArrowRight, Zap, ExternalLink, Wrench, ChevronDown, ChevronRight, Download } from 'lucide-react';
import { CopyButton } from '../../shared';
import type { ActionIntroContent } from '../../../../types/modules';

export interface ActionIntroSlideProps {
  content: ActionIntroContent;
}

const TOOLS_PREVIEW_COUNT = 3;
const OUTCOMES_PREVIEW_COUNT = 4;

/** Lazy-loaded skaidrė: vertimai per getT(module), kad namespace būtų imamas iš globalaus i18n. */
export function ActionIntroSlide({ content }: ActionIntroSlideProps) {
  useTranslation(); // re-render kai keičiasi kalba
  const t = getT('testPractice');
  const [revealed, setRevealed] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);
  const [showMetaCollapsible, setShowMetaCollapsible] = useState(false);
  const [showAllOutcomes, setShowAllOutcomes] = useState(false);

  const hasReveal = Boolean(content.unstructuredPrompt && content.structuredPrompt);
  const ctaLabel = content.ctaText || (hasReveal ? t('actionIntroCtaReveal') : t('actionIntroCtaDefault'));
  const toolsPreview = content.tools?.slice(0, TOOLS_PREVIEW_COUNT) ?? [];
  const toolsRest = (content.tools?.length ?? 0) > TOOLS_PREVIEW_COUNT
    ? content.tools!.slice(TOOLS_PREVIEW_COUNT)
    : [];
  const hasMoreTools = toolsRest.length > 0;
  const outcomesList = content.outcomes ?? [];
  const outcomesPreview = showAllOutcomes ? outcomesList : outcomesList.slice(0, OUTCOMES_PREVIEW_COUNT);
  const hasMoreOutcomes = outcomesList.length > OUTCOMES_PREVIEW_COUNT;
  const showHookOnly = hasReveal && !revealed;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-6 sm:p-8 md:p-10 text-white">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <div className="absolute top-3 right-5 text-[90px] sm:text-[110px] font-black leading-none select-none">?</div>
          <div className="absolute bottom-3 left-5 text-[90px] sm:text-[110px] font-black leading-none select-none">!</div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 max-w-lg mx-auto">
          {content.whyBenefit && (
            <p className={`font-medium leading-snug max-w-md ${showHookOnly ? 'text-base sm:text-lg text-brand-100 dark:text-brand-200' : 'text-sm sm:text-base text-brand-200 dark:text-brand-300'}`}>
              {content.whyBenefit}
            </p>
          )}
          {!showHookOnly && (
            <>
              <div className="flex flex-col gap-1">
                <p className="text-base md:text-lg text-gray-300 dark:text-gray-400 font-medium tracking-tight">
                  {content.heroStat}
                </p>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-transparent">
                    {content.heroText}
                  </span>
                </h2>
              </div>

              {content.heroSubText && (() => {
                const parts = content.heroSubText.split(/\.\s+/).filter(Boolean);
                const isTwoLineSmugis = parts.length === 2 && content.heroSubText.includes('Problema');
                if (isTwoLineSmugis) {
                  return (
                    <div className="flex flex-col gap-2 sm:gap-3 max-w-sm leading-[1.5]">
                      <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 opacity-60">
                        {parts[0]}.
                      </p>
                      <p className="text-sm sm:text-base font-bold text-accent-400 dark:text-accent-300">
                        {parts[1]}.
                      </p>
                    </div>
                  );
                }
                return (
                  <p className="text-sm sm:text-base text-gray-400 italic font-medium leading-relaxed max-w-sm">
                    {content.heroSubText}
                  </p>
                );
              })()}

              {!hasReveal && content.firstActionCTA && (
                <div className="mt-2 sm:mt-3 w-full max-w-md rounded-xl bg-accent-500/20 dark:bg-accent-900/30 border border-accent-400/50 dark:border-accent-600/50 p-4 text-left" role="region" aria-label={t('firstStepAria')}>
                  <p className="text-xs font-semibold text-accent-200 dark:text-accent-300 uppercase tracking-wider mb-1.5">{t('firstStepLabel')}</p>
                  <p className="text-sm sm:text-base text-white font-medium leading-snug">{content.firstActionCTA}</p>
                </div>
              )}
            </>
          )}
          {hasReveal && !revealed && (
            <button
              onClick={() => setRevealed(true)}
              aria-label={ctaLabel}
              className="group mt-2 sm:mt-3 flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-accent-500/40 transition-all duration-300 hover:scale-[1.06] active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-gray-900 min-h-[52px] animate-pulse-slow hover:animate-none"
            >
              <Zap className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>{ctaLabel}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {hasReveal && revealed && (
        <div className="animate-slide-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-5 sm:p-6 flex flex-col">
              <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" aria-hidden="true" />
                Tuščias promptas
              </p>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center border border-rose-100 dark:border-rose-900/30">
                <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg italic leading-relaxed font-sans">
                  &ldquo;{content.unstructuredPrompt}&rdquo;
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-rose-600 dark:text-rose-400 font-medium leading-snug">
                  Neaiškus tikslas. Nėra konteksto. DI spėlioja.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 sm:p-6 flex flex-col ring-2 ring-emerald-200/60 dark:ring-emerald-800/40 shadow-md">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
                6 blokų promptas
              </p>
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/30">
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono leading-relaxed max-h-56 overflow-y-auto pr-1">
                  {content.structuredPrompt}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium leading-snug truncate">
                    Aiškus kontekstas, struktūra, rezultatas.
                  </p>
                </div>
                {content.structuredPrompt && <CopyButton text={content.structuredPrompt} size="sm" />}
              </div>
            </div>
          </div>
        </div>
      )}

      {(hasReveal ? revealed : true) && content.outcomes?.length > 0 && (
        <>
          {revealed && content.firstActionCTA && (
            <div className="rounded-xl bg-accent-500/20 dark:bg-accent-900/30 border border-accent-400/50 dark:border-accent-600/50 p-4 animate-fade-in" role="region" aria-label={t('firstStepAria')}>
              <p className="text-xs font-semibold text-accent-700 dark:text-accent-300 uppercase tracking-wider mb-1.5">{t('firstStepLabel')}</p>
              <p className="text-sm sm:text-base text-gray-800 dark:text-white font-medium leading-snug">{content.firstActionCTA}</p>
            </div>
          )}
          {revealed && content.handoutPromise && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4 animate-fade-in" role="region" aria-label={t('pdfHandoutAria')}>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug flex items-center gap-2">
                <Download className="w-4 h-4 flex-shrink-0 text-slate-500" aria-hidden="true" />
                {content.handoutPromise}
              </p>
            </div>
          )}
          {content.sandboxMessage && (
            <div className="bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4 rounded-xl animate-fade-in mb-4" role="region" aria-label={t('sandboxMessageAria')}>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{content.sandboxMessage}</p>
            </div>
          )}
          <div className={`grid grid-cols-1 ${content.audience || content.duration || content.firstActionCTA ? 'sm:grid-cols-2' : ''} gap-6 ${hasReveal ? 'animate-fade-in' : ''}`}>
            <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-5 rounded-xl" role="region" aria-label={content.outcomesHeading || t('outcomesRegionAria')}>
              {content.outcomesHeading && (
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{content.outcomesHeading}</h3>
              )}
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2" role="list">
                {outcomesPreview.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {hasMoreOutcomes && (
                <button
                  type="button"
                  onClick={() => setShowAllOutcomes(!showAllOutcomes)}
                  className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 min-h-[44px] py-1"
                  aria-expanded={showAllOutcomes}
                  aria-label={showAllOutcomes ? t('hideResults') : t('showAllResults', { count: outcomesList.length })}
                >
                  {showAllOutcomes ? <ChevronDown className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
                  <span>{showAllOutcomes ? t('hideResults') : t('showAllResults', { count: outcomesList.length })}</span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {!hasReveal && content.firstActionCTA && (
                <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-5 rounded-xl flex flex-col">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t('firstStepLabel')}</h4>
                  <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">{content.firstActionCTA}</p>
                </div>
              )}
              {(content.duration || content.audience || content.aboutText) ? (
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowMetaCollapsible(!showMetaCollapsible)}
                    className="w-full flex items-center justify-between gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 text-left min-h-[44px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-expanded={showMetaCollapsible}
                    aria-label={showMetaCollapsible ? t('hideMetaAria') : t('showMetaAria')}
                  >
                    <span className="font-bold text-gray-900 dark:text-white text-sm">{t('forAudienceDuration')}</span>
                    <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-500 transition-transform duration-200 ${showMetaCollapsible ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {showMetaCollapsible && (
                    <div className="p-4 pt-0 space-y-3 border-t border-gray-200 dark:border-gray-700" role="region" aria-label={t('forAudienceDuration')}>
                      {content.duration && (
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t('durationLabel')}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{content.duration}</p>
                        </div>
                      )}
                      {content.audience && (
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t('forAudienceLabel')}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{content.audience}</p>
                        </div>
                      )}
                      {content.aboutText && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{content.aboutText}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {content.howToUseModule && (content.howToUseModule.items?.length || content.howToUseModule.body) && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 p-4 animate-fade-in" role="region" aria-label={content.howToUseModule.heading || 'Kaip naudoti modulį'}>
              {content.howToUseModule.heading && (
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{content.howToUseModule.heading}</h3>
              )}
              {content.howToUseModule.body && (
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{content.howToUseModule.body}</p>
              )}
              {content.howToUseModule.items && content.howToUseModule.items.length > 0 && (
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside mt-2">
                  {content.howToUseModule.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {content.tools && content.tools.length > 0 && (
            <div className="animate-fade-in border-2 border-brand-200 dark:border-brand-800 rounded-2xl bg-gradient-to-b from-brand-50/80 to-white dark:from-brand-950/50 dark:to-gray-900 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-500" aria-hidden="true" />
                {t('toolsHeading')}
              </h3>
              {content.toolsIntro && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {content.toolsIntro}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(showAllTools ? content.tools : toolsPreview).map((tool, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      {tool.url ? (
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={t('openToolNewTab', { name: tool.name })}
                          className="text-base font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-200 underline underline-offset-2 inline-flex items-center gap-1 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded"
                        >
                          {tool.name}
                          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-base font-semibold text-gray-900 dark:text-white">{tool.name}</span>
                      )}
                    </div>
                    {tool.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug mb-3">
                        {tool.description}
                      </p>
                    )}
                    {tool.useCases && tool.useCases.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                          {t('popularUseCases')}
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {tool.useCases.map((uc, i) => (
                            <li key={i}>
                              <span className="inline-block text-xs px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
                                {uc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {hasMoreTools && (
                <button
                  onClick={() => setShowAllTools(!showAllTools)}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 transition-colors min-h-[44px] py-2"
                  aria-expanded={showAllTools}
                  aria-label={showAllTools ? t('hideExtraTools') : t('showAllToolsCount', { count: content.tools!.length })}
                >
                  <Wrench className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>{showAllTools ? t('hideExtraTools') : t('showAllToolsCount', { count: content.tools!.length })}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${showAllTools ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-5">
                {t('toolsPrincipleNote')}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
