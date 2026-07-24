import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10WorkflowSpecDiagram from './M10WorkflowSpecDiagram';
import { getM10WorkflowSpecStepExplanations } from './m10DiagramContent';

const ENLARGE = {
  lt: 'Workflow specifikacija (8 blokai)',
  en: 'Workflow specification (8 blocks)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Workflow specifikacija: 8 blokai',
    statusLabel: 'Pasirinktas blokas:',
    navAria: 'Specifikacijos bloko pasirinkimas',
    stepAria: (i: number, title: string) => `Blokas ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Workflow specification: 8 blocks',
    statusLabel: 'Selected block:',
    navAria: 'Specification block selection',
    stepAria: (i: number, title: string) => `Block ${i + 1}: ${title}`,
  },
} as const;

export default function M10WorkflowSpecBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const steps = getM10WorkflowSpecStepExplanations(loc);
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
          <M10WorkflowSpecDiagram
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
