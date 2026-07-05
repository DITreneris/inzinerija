import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M12MultiAgentSchemaDiagram from './M12MultiAgentSchemaDiagram';
import { getM12MultiAgentStepExplanations } from './m12MultiAgentSchemaContent';

const ENLARGE = {
  lt: 'Verslo multi-agent schema',
  en: 'Business multi-agent schema',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Verslo multi-agent schema: 6 žingsniai',
    statusLabel: 'Pasirinktas žingsnis:',
    navAria: 'Multi-agent schemos žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Business multi-agent schema: 6 steps',
    statusLabel: 'Selected step:',
    navAria: 'Multi-agent schema step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
  },
} as const;

export default function M12MultiAgentSchemaBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const steps = getM12MultiAgentStepExplanations(loc);
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
          <M12MultiAgentSchemaDiagram
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
