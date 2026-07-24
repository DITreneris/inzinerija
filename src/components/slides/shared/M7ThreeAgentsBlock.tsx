import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7ThreeAgentsDiagram from './M7ThreeAgentsDiagram';
import { getM7AgentExplanations } from './m7DiagramContent';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

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
          <M7ThreeAgentsDiagram
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
