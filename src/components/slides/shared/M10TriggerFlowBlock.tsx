import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10TriggerFlowDiagram from './M10TriggerFlowDiagram';
import { getM10TriggerFlowStepExplanations } from './m10DiagramContent';

const ENLARGE = {
  lt: 'Darbo eigos grandinė (Trigger → Condition → Action)',
  en: 'Workflow chain (Trigger → Condition → Action)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Darbo eigos grandinė: 3 žingsniai',
    statusLabel: 'Pasirinktas žingsnis:',
    navAria: 'Darbo eigos grandinės žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Workflow chain: 3 steps',
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
          density="hero"
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
