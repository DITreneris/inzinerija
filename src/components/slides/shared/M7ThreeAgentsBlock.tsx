import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7ThreeAgentsDiagram from './M7ThreeAgentsDiagram';
import { getM7AgentExplanations } from './m7DiagramContent';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';

const LABELS = {
  lt: {
    regionAria: 'Trys DI agentų tipai duomenų analizei',
    youAreHere: 'Pasirinkta rolė:',
    navAria: 'Agento pasirinkimas',
    stepAria: (i: number, title: string) => `Agentas ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 7 – trys analizės agentai',
  },
  en: {
    regionAria: 'Three DI agent types for analytics',
    youAreHere: 'Selected role:',
    navAria: 'Select agent role',
    stepAria: (i: number, title: string) => `Agent ${i + 1}: ${title}`,
    enlargeLabel: 'Module 7 – three analysis agents',
  },
} as const;

export default function M7ThreeAgentsBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM7AgentExplanations(loc);
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

          <M7ThreeAgentsDiagram
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
