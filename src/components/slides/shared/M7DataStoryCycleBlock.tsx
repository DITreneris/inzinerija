import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7DataStoryCycleDiagram from './M7DataStoryCycleDiagram';
import { getM7DataStoryCycleExplanations } from './m7DiagramContent';

const LABELS = {
  lt: {
    regionAria: 'Duomenų istorijos ciklas',
    youAreHere: 'Tu esi čia:',
    navAria: 'Duomenų istorijos ciklo žingsniai',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 7 – duomenų istorijos ciklas',
  },
  en: {
    regionAria: 'Data story cycle',
    youAreHere: 'You are here:',
    navAria: 'Data story cycle steps',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'Module 7 – data story cycle',
  },
} as const;

export default function M7DataStoryCycleBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM7DataStoryCycleExplanations(loc);
  const labels = LABELS[loc];
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(explanations);

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => (
        <div className="space-y-4" role="region" aria-label={labels.regionAria}>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 px-3 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
              aria-live="polite"
            >
              <span
                className="h-2 w-2 rounded-full bg-brand-500 shrink-0"
                aria-hidden
              />
              {labels.youAreHere} {step.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>

          <M7DataStoryCycleDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={loc}
          />

          <nav
            className="flex flex-wrap justify-center gap-1.5"
            aria-label={labels.navAria}
          >
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
            <p className="font-semibold text-brand-800 dark:text-brand-200 mb-2">
              {step.title}
            </p>
            <p>{renderBold(step.body)}</p>
          </div>
        </div>
      )}
      enlargeLabel={labels.enlargeLabel}
    />
  );
}
