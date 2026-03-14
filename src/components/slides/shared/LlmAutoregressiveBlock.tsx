/**
 * Interaktyvus autoregresinio LLM blokas – state-driven diagrama + „Tu esi čia“ + paaiškinimai.
 * Šioje skaidrėje „Peržiūrėti visą dydį“ nenaudojamas – diagrama rodoma tiesiogiai.
 */
import LlmAutoregressiveDiagram from './LlmAutoregressiveDiagram';
import { LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS, LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS_EN } from './stepExplanations';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { useLocale } from '../../../contexts/LocaleContext';
import { useIsMobile } from '../../../utils/useIsMobile';

const BLOCK_LABELS = {
  lt: {
    regionAria: 'Autoregresinis LLM: 8 žingsnių (Žingsnis N ir N+1)',
    youAreHere: 'Tu esi čia:',
    progressAria: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    navAria: 'Žingsnių pasirinkimas (1–8)',
    prevStep: 'Ankstesnis žingsnis',
    nextStep: 'Kitas žingsnis',
    back: 'Atgal',
    next: 'Pirmyn',
    stepDone: (n: number, title: string) => `Žingsnis ${n} atliktas: ${title}`,
    stepLabel: (n: number, title: string) => `Žingsnis ${n}: ${title}`,
  },
  en: {
    regionAria: 'Autoregressive LLM: 8 steps (Step N and N+1)',
    youAreHere: 'You are here:',
    progressAria: (n: number, total: number) => `Step ${n} of ${total}`,
    navAria: 'Step selection (1–8)',
    prevStep: 'Previous step',
    nextStep: 'Next step',
    back: 'Back',
    next: 'Next',
    stepDone: (n: number, title: string) => `Step ${n} completed: ${title}`,
    stepLabel: (n: number, title: string) => `Step ${n}: ${title}`,
  },
} as const;

export default function LlmAutoregressiveBlock() {
  const { locale } = useLocale();
  const isMobile = useIsMobile();
  const explanations = locale === 'en' ? LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS_EN : LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS;
  const { currentStep, setCurrentStep, step, totalSteps: TOTAL_STEPS } = useStepDiagram(explanations);
  const t = BLOCK_LABELS[locale];

  const progressPct = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <div role="region" aria-label={t.regionAria}>
      {/* Pažadas: ką suprasi (1 eilutė) – 24px iki „Tu esi čia“ */}
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-6">
        {locale === 'lt' ? (
          <>Ką suprasi: kaip LLM žodį po žodžio &quot;spėja&quot; kitą žodį – kaip <strong className="font-semibold text-gray-800 dark:text-gray-200">lošimų automatas</strong> pagal tikimybes.</>
        ) : (
          <>What you&apos;ll see: how the LLM predicts the next word – like a <strong className="font-semibold text-gray-800 dark:text-gray-200">slot machine</strong> by probabilities.</>
        )}
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
          aria-live="polite"
        >
          <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0" aria-hidden />
          {t.youAreHere} {step.title}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tabular-nums">
          {currentStep + 1} / {TOTAL_STEPS}
        </span>
      </div>

      {/* Progress bar – 32px iki diagramos */}
      <div className="w-full max-w-7xl mx-auto mb-8" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-label={t.progressAria(currentStep + 1, TOTAL_STEPS)}>
        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Schema – 32px viršuje, 16px apačioje; be „Peržiūrėti visą dydį“ */}
      <div className="w-full max-w-7xl mx-auto pt-8 pb-4 min-h-[320px] flex flex-col mb-8" style={{ maxWidth: '90vw' }}>
        {isMobile ? (
          <div className="overflow-x-auto -mx-2 px-2 pb-2">
            <div style={{ minWidth: 600 }}>
              <LlmAutoregressiveDiagram
                locale={locale}
                currentStep={currentStep}
                onStepClick={(stepIndex) => setCurrentStep(stepIndex)}
              />
            </div>
          </div>
        ) : (
          <LlmAutoregressiveDiagram
            locale={locale}
            currentStep={currentStep}
            onStepClick={(stepIndex) => setCurrentStep(stepIndex)}
          />
        )}
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-2 mb-6" aria-label={t.navAria}>
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          aria-label={t.prevStep}
          className="min-h-[44px] px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 touch-manipulation"
        >
          {t.back}
        </button>
        {explanations.map((s, idx) => {
          const isPast = idx < currentStep;
          const isActive = idx === currentStep;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentStep(idx)}
              aria-current={isActive ? 'step' : undefined}
              aria-label={isPast ? t.stepDone(idx + 1, s.title) : t.stepLabel(idx + 1, s.title)}
              className={`
                flex min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-xl border-2 text-base font-semibold transition-all touch-manipulation
                focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                ${isActive
                  ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                  : isPast
                    ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:border-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-900/20'}
              `}
            >
              {isPast ? <span aria-hidden>✓</span> : idx + 1}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === TOTAL_STEPS - 1}
          aria-label={t.nextStep}
          className="min-h-[44px] px-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 touch-manipulation"
        >
          {t.next}
        </button>
      </nav>

      <div
        className="rounded-xl border-l-4 border-l-brand-500 bg-brand-50 dark:bg-brand-900/20 p-5 text-gray-700 dark:text-gray-300 leading-relaxed"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-brand-800 dark:text-brand-200 mb-2">{step.title}</p>
        <p className="text-base leading-relaxed">{renderBold(step.body)}</p>
      </div>
    </div>
  );
}
