import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7DataPrepWorkflowDiagram from './M7DataPrepWorkflowDiagram';
import { getM7DataPrepExplanations } from './m7DiagramContent';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

const LABELS = {
  lt: {
    regionAria: 'Penki žingsniai duomenų paruošimui',
    youAreHere: 'Tu esi čia:',
    stepOf: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    clickHint:
      'Paspausk žingsnį diagramoje arba skaičių 1–5 – paaiškinimas rodomas apačioje.',
    navAria: 'Žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 7 – 5 žingsnių duomenų paruošimas',
  },
  en: {
    regionAria: 'Five-step data preparation',
    youAreHere: 'You are here:',
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    clickHint:
      'Click a step in the diagram or number 1–5 – explanation shown below.',
    navAria: 'Step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'Module 7 – five-step data prep',
  },
} as const;

export default function M7DataPrepWorkflowBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM7DataPrepExplanations(loc);
  const labels = LABELS[loc];
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(explanations);

  return (
    <InteractiveDiagramShell
      density="hero"
      regionAria={labels.regionAria}
      statusLabel={labels.youAreHere}
      stepOfLabel={labels.stepOf(currentStep + 1, totalSteps)}
      currentStep={currentStep}
      totalSteps={totalSteps}
      currentTitle={step.title}
      navAria={labels.navAria}
      steps={explanations}
      onStepSelect={setCurrentStep}
      stepAria={labels.stepAria}
      explanationTitle={step.title}
      explanation={<p>{renderBold(step.body)}</p>}
    >
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {labels.clickHint}
      </p>
      <EnlargeableDiagram
        mobileBehavior="reflow"
        controlPlacement="top-right"
        enlargeLabel={labels.enlargeLabel}
        renderContent={() => (
          <M7DataPrepWorkflowDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={loc}
          />
        )}
      />
    </InteractiveDiagramShell>
  );
}
