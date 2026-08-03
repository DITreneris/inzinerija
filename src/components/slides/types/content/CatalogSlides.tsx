import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { Lightbulb, ChevronRight, Target } from 'lucide-react';
import { useLocale } from '../../../../contexts/LocaleContext';
import {
  CopyButton,
  TemplateBlock,
  WorkflowComparisonInteractiveBlock,
} from '../../shared';
import type {
  PromptTypesContent,
  PromptTechniquesContent,
  WorkflowSummaryContent,
  PromptTemplateContent,
  TransitionContent,
} from '../../../../types/modules';

export function PromptTypesSlide({
  content,
}: {
  content?: PromptTypesContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const typeStyles: Record<
    string,
    { bg: string; border: string; text: string; badge: string; num: string }
  > = {
    brand: {
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-300 dark:border-brand-700',
      text: 'text-brand-700 dark:text-brand-300',
      badge:
        'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300',
      num: 'bg-brand-500',
    },
    accent: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-300 dark:border-cyan-700',
      text: 'text-cyan-700 dark:text-cyan-300',
      badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      num: 'bg-cyan-500',
    },
    violet: {
      bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
      border: 'border-fuchsia-300 dark:border-fuchsia-700',
      text: 'text-fuchsia-700 dark:text-fuchsia-300',
      badge:
        'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300',
      num: 'bg-fuchsia-500',
    },
  };

  return (
    <div className="space-y-6">
      {/* ── Hook intro: provokuojantis, ne generiškas ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-2 right-4 select-none"
            aria-hidden="true"
          >
            <Target
              className="w-20 h-20 text-current opacity-100"
              strokeWidth={1}
            />
          </div>
        </div>
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
            {t('promptTypesHeroTitle')}
          </p>
          <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
            {t('promptTypesHeroSubtitle')}
          </p>
        </div>
      </div>

      {/* ── Kortelės su numeracija ir progresija ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {content?.types.map((type, idx) => {
          const s = typeStyles[type.color] || typeStyles.brand;
          return (
            <article
              key={idx}
              className={`p-5 rounded-2xl border-2 ${s.bg} ${s.border} shadow-md transition-all hover:shadow-lg`}
              role="article"
              aria-label={type.name}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className={`w-7 h-7 rounded-full ${s.num} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}
                >
                  {idx + 1}
                </span>
                <h4 className={`font-bold text-lg ${s.text}`}>{type.name}</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {type.description}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {t('example')}:
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                        &ldquo;{type.example}&rdquo;
                      </p>
                      <CopyButton text={type.example} size="sm" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {t('resultLabel')}:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.result}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Praktinis patarimas: accent CTA stilius ── */}
      <div className="bg-accent-50 dark:bg-accent-900/20 p-5 rounded-xl border-l-4 border-accent-500">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex-shrink-0">
            <Lightbulb
              className="w-5 h-5 text-accent-600 dark:text-accent-400"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="font-bold text-accent-800 dark:text-accent-200 mb-1">
              {t('practicalTipTitle')}:
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {content?.practicalTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PromptTechniquesSlide({
  content,
}: {
  content?: PromptTechniquesContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  return (
    <div className="space-y-6">
      {/* ── Intro: vizualus žingsnių kelias, ne sąrašas ── */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-5 rounded-r-xl">
        <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
          {t('promptTechniquesLogicTitle')}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5 text-sm">
          {content?.logicSteps.map((step, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-700 text-gray-700 dark:text-gray-300 font-medium">
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                {step}
              </span>
              {idx < (content?.logicSteps.length ?? 0) - 1 && (
                <ChevronRight
                  className="w-4 h-4 text-brand-400 dark:text-brand-600 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── Technikos: geros (5) + antipattern (1) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {content?.techniques.map((technique, idx) => {
          const lowerTitle = technique.title.toLowerCase();
          const isAntiPattern =
            lowerTitle.includes('manipuliacija') ||
            lowerTitle.includes('vengti') ||
            lowerTitle.includes('manipulation') ||
            lowerTitle.includes('avoid');
          return (
            <article
              key={idx}
              className={
                isAntiPattern
                  ? 'bg-rose-50 dark:bg-rose-900/10 border-2 border-rose-300 dark:border-rose-800 rounded-2xl p-5'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5'
              }
              role="article"
              aria-label={technique.title}
            >
              <div className="flex items-center gap-2 mb-2">
                {isAntiPattern && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-200 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 flex-shrink-0">
                    {t('promptTechniquesAvoidLabel')}
                  </span>
                )}
                <h4
                  className={`font-bold ${isAntiPattern ? 'text-rose-800 dark:text-rose-200' : 'text-gray-900 dark:text-white'}`}
                >
                  {technique.title}
                </h4>
              </div>
              <p
                className={`text-sm mb-3 ${isAntiPattern ? 'text-rose-700 dark:text-rose-300' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {technique.description}
              </p>
              <div
                className={`rounded-xl p-3 ${
                  isAntiPattern
                    ? 'bg-rose-100/60 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800'
                    : 'bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {isAntiPattern ? t('badExample') : t('example')}
                  </p>
                  {!isAntiPattern && (
                    <CopyButton text={technique.example} size="sm" />
                  )}
                </div>
                <p
                  className={`text-sm whitespace-pre-line font-mono ${isAntiPattern ? 'text-rose-600 dark:text-rose-400 line-through decoration-rose-400/50' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {technique.example}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function WorkflowSummarySlide({
  content,
}: {
  content?: WorkflowSummaryContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { locale } = useLocale();
  const baseUrl = import.meta.env.BASE_URL || '/';
  const diagramImages = [`${baseUrl}LLM_1.png`, `${baseUrl}LLM_2.png`];
  const useInteractive = content?.interactive?.enabled ?? false;

  return (
    <div className="space-y-6">
      {/* ── Intro: vienas sakinys (be gradient, be emoji) ── */}
      {content?.intro && (
        <p className="text-center text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 max-w-2xl mx-auto tracking-tight leading-snug">
          {content.intro}
        </p>
      )}

      {/* ── Diagramos: interaktyvus arba statinis režimas ── */}
      {useInteractive ? (
        <WorkflowComparisonInteractiveBlock locale={locale} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {content?.diagrams.map((diagram, idx) => {
            const isWorkflow = diagram.variant === 'workflow' || idx === 1;
            const cardClasses = isWorkflow
              ? 'bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 ring-2 ring-emerald-200/60 dark:ring-emerald-800/40 shadow-md'
              : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5';
            const noteClasses = isWorkflow
              ? 'inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800';
            const noteIcon = isWorkflow ? '✓' : '⚠';

            return (
              <article
                key={idx}
                className={cardClasses}
                role="article"
                aria-label={diagram.title}
              >
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                    {diagram.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {diagram.subtitle}
                  </p>
                </div>

                {diagramImages[idx] && (
                  <div
                    className={`mb-3 rounded-xl p-2 border ${isWorkflow ? 'bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}
                  >
                    <img
                      src={diagramImages[idx]}
                      alt={diagram.title}
                      className={`w-full h-auto object-contain ${isWorkflow ? 'border border-emerald-200/60 dark:border-emerald-800/40' : 'border border-gray-200 dark:border-gray-700'} rounded-lg`}
                    />
                  </div>
                )}

                {diagram.note && (
                  <div>
                    <span className={noteClasses}>
                      <span aria-hidden="true">{noteIcon}</span>
                      {diagram.note}
                    </span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* ── Palygink promptus: Pokalbis vs Workflow ── */}
      {content?.examples && content.examples.length > 0 && (
        <div className="max-w-[800px] mx-auto mt-8">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
            {t('comparePrompts')}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {content.examples.map((example, idx) => {
              const isWf = example.title.toLowerCase().includes('workflow');
              return (
                <div
                  key={idx}
                  className={`relative rounded-xl border-2 p-5 transition-colors ${
                    isWf
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700'
                      : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        isWf
                          ? 'bg-emerald-500 text-white'
                          : 'bg-accent-500 text-brand-900'
                      }`}
                    >
                      {example.title}
                    </span>
                    <CopyButton text={example.prompt} size="sm" />
                  </div>
                  <p
                    className={`text-[15px] leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 ${
                      isWf ? 'font-mono' : ''
                    }`}
                  >
                    {example.prompt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function PromptTemplateSlide({
  content,
}: {
  content?: PromptTemplateContent;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const blockColors = [
    {
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-300 dark:border-brand-700',
      num: 'bg-brand-500',
    },
    {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-300 dark:border-amber-700',
      num: 'bg-amber-500',
    },
    {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-300 dark:border-emerald-700',
      num: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Intro: provokuojantis, ne generiškas ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 dark:from-gray-950 dark:via-brand-950 dark:to-gray-950 p-5 sm:p-7 text-white">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-2 right-4 text-[80px] font-extrabold leading-none select-none">
            📋
          </div>
        </div>
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-base sm:text-lg font-bold leading-snug tracking-tight">
            {t('promptTemplateIntro')}
          </p>
          <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">
            {t('promptTemplateSub')}
          </p>
        </div>
      </div>

      {/* ── 3 blokai su spalvomis ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {(content?.blocks ?? []).map((block, idx) => {
          const c = blockColors[idx] || blockColors[0];
          return (
            <article
              key={idx}
              className={`${c.bg} border-2 ${c.border} rounded-2xl p-5`}
              role="article"
              aria-label={block.title}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-8 h-8 rounded-full ${c.num} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}
                >
                  {idx + 1}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {block.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {block.description}
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {t('example')}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {block.example}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Šablonai: ryškesni su accent akcentu ── */}
      {content?.template && (
        <div className="border-l-4 border-accent-500 rounded-r-xl bg-accent-50 dark:bg-accent-900/20 p-1">
          <TemplateBlock
            label={t('copyTemplateLabel')}
            template={content.template}
          />
        </div>
      )}
      {content?.example && (
        <div className="border-l-4 border-emerald-500 rounded-r-xl bg-emerald-50 dark:bg-emerald-900/10 p-1">
          <TemplateBlock
            label={t('fullExampleLabel')}
            template={content.example}
          />
        </div>
      )}
    </div>
  );
}

export function TransitionSlide({ content }: { content?: TransitionContent }) {
  // Pirmoji kortelė = "kas padaryta" (emerald), antroji = "kas toliau" (brand)
  const cardStyles = [
    {
      bg: 'bg-emerald-50 dark:bg-emerald-900/10',
      border: 'border-emerald-300 dark:border-emerald-700',
      num: 'bg-emerald-500',
      icon: '✓',
    },
    {
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      border: 'border-brand-300 dark:border-brand-700',
      num: 'bg-brand-500',
      icon: '→',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Intro: aiškus perėjimo signalas ── */}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-6 rounded-r-xl">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {content?.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{content?.note}</p>
      </div>

      {/* ── Kortelės: padaryta vs toliau ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(content?.mapping ?? []).map((item, idx) => {
          const s = cardStyles[idx] || cardStyles[1];
          return (
            <article
              key={idx}
              className={`${s.bg} border-2 ${s.border} rounded-2xl p-5`}
              role="article"
              aria-label={item.from}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-8 h-8 rounded-full ${s.num} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}
                >
                  {s.icon}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {item.from}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.to}
              </p>
            </article>
          );
        })}
      </div>

      {/* ── Takeaway: neutral blokas (M-DS2 – vienas gradientas per skaidrę) ── */}
      <div className="bg-brand-100 dark:bg-brand-900/20 p-5 rounded-xl text-brand-900 dark:text-brand-100 text-center shadow-md border border-brand-200 dark:border-brand-800">
        <p className="text-sm sm:text-base font-bold">{content?.takeaway}</p>
      </div>
    </div>
  );
}
