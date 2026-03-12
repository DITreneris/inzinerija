/**
 * Interaktyvus struktūruoto proceso blokas – 3 žingsnių diagrama.
 * Lokalizuota per useLocale() ir getterius.
 */
import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import StrukturuotasProcesasDiagram from './StrukturuotasProcesasDiagram';
import {
  getStrukturuotasProcesasBlockLabels,
  getStrukturuotasProcesasStepExplanations,
} from './strukturuotasProcesasStepExplanations';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';

export default function StrukturuotasProcesasBlock() {
  const { locale } = useLocale();
  const explanations = getStrukturuotasProcesasStepExplanations(locale);
  const blockLabels = getStrukturuotasProcesasBlockLabels(locale);
  const { currentStep, setCurrentStep, step, totalSteps: TOTAL_STEPS } = useStepDiagram(explanations);

  return (
    <div className="space-y-4" role="region" aria-label={blockLabels.regionAria}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
          aria-live="polite"
        >
          <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0" aria-hidden />
          {blockLabels.youAreHere} {currentStep + 1}. {step.title}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {currentStep + 1} / {TOTAL_STEPS}
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {blockLabels.clickHint}
      </p>

      <EnlargeableDiagram
        enlargeLabel={blockLabels.enlargeLabel}
        renderContent={() => (
          <StrukturuotasProcesasDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        )}
      />

      <nav className="flex flex-wrap justify-center gap-1.5" aria-label={blockLabels.navAria}>
        {explanations.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentStep(idx)}
            aria-current={currentStep === idx ? 'step' : undefined}
            aria-label={blockLabels.stepAria(idx, s.title)}
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              ${
                currentStep === idx
                  ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30'
              }
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
  );
}
