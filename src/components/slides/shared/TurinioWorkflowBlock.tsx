/**
 * Turinio inžinerijos workflow blokas (13.11) – interaktyvi diagrama su paaiškinimais.
 * Lokalizuota per useLocale() ir getTurinioWorkflowStepExplanations / BLOCK_LABELS.
 */
import { useLocale } from '../../../contexts/LocaleContext';
import TurinioWorkflowDiagram from './TurinioWorkflowDiagram';
import { getTurinioWorkflowStepExplanations } from './stepExplanations';
import EnlargeableDiagram from './EnlargeableDiagram';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';

const TURINIO_BLOCK_LABELS = {
  lt: {
    regionAria: 'Turinio workflow nuo brief iki publikacijos',
    youAreHere: 'Tu esi čia:',
    navAria: 'Žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Turinio workflow',
  },
  en: {
    regionAria: 'Content workflow from brief to publication',
    youAreHere: 'You are here:',
    navAria: 'Step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'Content workflow',
  },
} as const;

export default function TurinioWorkflowBlock() {
  const { locale } = useLocale();
  const explanations = getTurinioWorkflowStepExplanations(locale);
  const labels = TURINIO_BLOCK_LABELS[locale];
  const { currentStep, setCurrentStep, step, totalSteps: TOTAL_STEPS } = useStepDiagram(explanations);

  return (
    <EnlargeableDiagram
      renderContent={() => (
        <div className="space-y-4" role="region" aria-label={labels.regionAria}>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
              aria-live="polite"
            >
              <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0" aria-hidden />
              {labels.youAreHere} {currentStep + 1}. {step.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{currentStep + 1} / {TOTAL_STEPS}</span>
          </div>

          <TurinioWorkflowDiagram currentStep={currentStep} onStepClick={setCurrentStep} />

          <nav className="flex flex-wrap justify-center gap-1.5" aria-label={labels.navAria}>
            {explanations.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                aria-current={currentStep === idx ? 'step' : undefined}
                aria-label={labels.stepAria(idx, s.title)}
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all
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

          <div
            className="rounded-xl border-l-4 border-l-brand-500 bg-brand-50 dark:bg-brand-900/20 p-4 text-gray-700 dark:text-gray-300 leading-relaxed"
            role="status"
            aria-live="polite"
          >
            <p className="font-semibold text-brand-800 dark:text-brand-200 mb-2">{step.title}</p>
            <p>{renderBold(step.body)}</p>
          </div>
        </div>
      )}
      enlargeLabel={labels.enlargeLabel}
    />
  );
}
