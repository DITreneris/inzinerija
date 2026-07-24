import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10LearningLoopDiagram from './M10LearningLoopDiagram';
import { getM10LearningLoopStepExplanations } from './m10LearningLoopContent';

const ENLARGE = {
  lt: 'Uždaro mokymosi ciklas agentams',
  en: 'Closed learning loop for agents',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Uždaro mokymosi ciklas agentams: 4 makro žingsniai',
    statusLabel: 'Pasirinkta dalis:',
    navAria: 'Mokymosi ciklo dalies pasirinkimas',
    stepAria: (i: number, title: string) => `Dalis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Closed learning loop for agents: 4 macro steps',
    statusLabel: 'Selected part:',
    navAria: 'Learning loop part selection',
    stepAria: (i: number, title: string) => `Part ${i + 1}: ${title}`,
  },
} as const;

export default function M10LearningLoopBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const steps = getM10LearningLoopStepExplanations(loc);
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
          <M10LearningLoopDiagram
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
