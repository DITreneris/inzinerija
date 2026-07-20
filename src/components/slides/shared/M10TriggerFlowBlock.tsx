import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10TriggerFlowDiagram from './M10TriggerFlowDiagram';
import { getM10TriggerFlowStepExplanations } from './m10DiagramContent';

const ENLARGE = {
  lt: 'Workflow grandinė (Trigger, Condition, Action, Webhook)',
  en: 'Workflow chain (Trigger, Condition, Action, Webhook)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Workflow grandinė: 4 žingsniai',
    statusLabel: 'Pasirinktas žingsnis:',
    navAria: 'Workflow grandinės žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Workflow chain: 4 steps',
    statusLabel: 'Selected step:',
    navAria: 'Workflow chain step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
  },
} as const;

export default function M10TriggerFlowBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const steps = getM10TriggerFlowStepExplanations(loc);
  const labels = LABELS[loc];
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(steps);

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => (
        <InteractiveDiagramShell
          regionAria={labels.regionAria}
          statusLabel={labels.statusLabel}
          currentStep={currentStep}
          totalSteps={totalSteps}
          currentTitle={step.title}
          navAria={labels.navAria}
          steps={steps}
          onStepSelect={setCurrentStep}
          stepAria={labels.stepAria}
          explanationTitle={step.title}
          explanation={<p>{step.body}</p>}
        >
          <M10TriggerFlowDiagram
            locale={loc}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
