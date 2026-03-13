/**
 * Interaktyvus RL proceso blokas – clickable diagrama + paaiškinimai apačioje.
 * Lokalizuota per useLocale() ir getRlStepExplanations / BLOCK_LABELS.
 */
import { useRef, useCallback } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import RlProcessDiagram from './RlProcessDiagram';
import { getRlStepExplanations } from './stepExplanations';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';

const RL_BLOCK_LABELS = {
  lt: {
    regionAria: 'RL proceso schema',
    heroTitle: 'Išmok, kaip DI pats tobulina savo elgesį.',
    heroBody: 'Suprasi RL per 4 žingsnius per ~3 minutes.',
    ctaLabel: 'Pradėti 1 žingsnį',
    ctaAria: 'Pradėti nuo 1 žingsnio – Agentas',
    youAreHere: 'Tu esi čia:',
    mentalModelAria: 'Mintinis modelis',
    mentalModelText: 'Padarau → gaunu rezultatą → koreguoju elgesį',
    navAria: 'Žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'RL proceso struktūra',
  },
  en: {
    regionAria: 'RL process diagram',
    heroTitle: 'Learn how the LLM improves its own behaviour.',
    heroBody: 'Understand RL in 4 steps in ~3 minutes.',
    ctaLabel: 'Start step 1',
    ctaAria: 'Start from step 1 – Agent',
    youAreHere: 'You are here:',
    mentalModelAria: 'Mental model',
    mentalModelText: 'I do → I get a result → I adjust behaviour',
    navAria: 'Step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'RL process structure',
  },
} as const;

export interface RlProcessBlockProps {
  moduleId?: number;
  slideId?: number;
  /** Kai false – nerenderinamas geltonas intro („Išmok, kaip DI…“, CTA). Naudojama skaidrėje 48, kai sekcijos heading jau yra intro (vienas įėjimo taškas). */
  showHero?: boolean;
}

export default function RlProcessBlock({ moduleId: _moduleId, slideId: _slideId, showHero = true }: RlProcessBlockProps = {}) {
  const { locale } = useLocale();
  const explanations = getRlStepExplanations(locale);
  const labels = RL_BLOCK_LABELS[locale];
  const { currentStep, setCurrentStep, step, totalSteps: TOTAL_STEPS } = useStepDiagram(explanations);
  const explanationRef = useRef<HTMLDivElement>(null);

  const handleStepClick = useCallback((index: number) => {
    setCurrentStep(index);
  }, [setCurrentStep]);

  const handleStartFirstStep = () => {
    setCurrentStep(0);
    explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="space-y-4" role="region" aria-label={labels.regionAria}>
      {showHero && (
        <div className="rounded-xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-900/20 px-4 py-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
            {labels.heroTitle}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
            {labels.heroBody}
          </p>
          <button
            type="button"
            onClick={handleStartFirstStep}
            className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 min-h-[44px] transition-colors"
            aria-label={labels.ctaAria}
          >
            {labels.ctaLabel}
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full bg-brand-100 dark:bg-brand-900/40 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 whitespace-nowrap"
          aria-live="polite"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden />
          {labels.youAreHere} {currentStep + 1}. {step.title}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{currentStep + 1} / {TOTAL_STEPS}</span>
      </div>

      <div className="my-4">
        <EnlargeableDiagram
          enlargeLabel={labels.enlargeLabel}
          renderContent={() => (
            <RlProcessDiagram
              currentStep={currentStep}
              onStepClick={handleStepClick}
              className="max-w-5xl"
            />
          )}
        />
      </div>

      <p className="text-center text-base font-medium text-brand-700 dark:text-brand-300" aria-label={labels.mentalModelAria}>
        {labels.mentalModelText}
      </p>

      <nav className="flex flex-wrap justify-center gap-1.5" aria-label={labels.navAria}>
        {explanations.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleStepClick(idx)}
            aria-current={currentStep === idx ? 'step' : undefined}
            aria-label={labels.stepAria(idx, s.title)}
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all min-h-[44px] min-w-[44px]
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              ${currentStep === idx
                ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30'}
            `}
          >
            {idx + 1}
          </button>
        ))}
      </nav>

      {/* Paaiškinimas – atsidaro paspaudus bloką */}
      <div
        ref={explanationRef}
        className="rounded-xl border-l-4 border-l-brand-500 bg-brand-50 dark:bg-brand-900/20 p-4 text-gray-700 dark:text-gray-300 leading-relaxed"
        role="status"
        aria-live="polite"
      >
        <p className="font-semibold text-brand-800 dark:text-brand-200 mb-2">{step.title}</p>
        <p>{renderBold(step.body)}</p>
      </div>
    </div>
  );
}
