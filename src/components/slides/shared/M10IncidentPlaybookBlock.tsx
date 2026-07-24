import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10IncidentPlaybookDiagram from './M10IncidentPlaybookDiagram';
import { getM10IncidentPlaybookStepExplanations } from './m10DiagramContent';

const ENLARGE = {
  lt: 'Incident playbook (5 žingsniai)',
  en: 'Incident playbook (5 steps)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Incidentų planas: 5 žingsniai',
    statusLabel: 'Pasirinktas žingsnis:',
    navAria: 'Incidentų plano žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Incident playbook: 5 steps',
    statusLabel: 'Selected step:',
    navAria: 'Incident playbook step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
  },
} as const;

export default function M10IncidentPlaybookBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const steps = getM10IncidentPlaybookStepExplanations(loc);
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
          <M10IncidentPlaybookDiagram
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
