import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7DataStoryCycleDiagram from './M7DataStoryCycleDiagram';
import { getM7DataStoryCycleExplanations } from './m7DiagramContent';
import { InteractiveDiagramShell } from './diagramKit';

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
        <InteractiveDiagramShell
          density="hero"
          regionAria={labels.regionAria}
          statusLabel={labels.youAreHere}
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
          <M7DataStoryCycleDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={loc}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={labels.enlargeLabel}
    />
  );
}
