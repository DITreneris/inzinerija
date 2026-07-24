import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10AgentTaxonomyDiagram from './M10AgentTaxonomyDiagram';
import { getM10AgentTaxonomyExplanations } from './m10DiagramContent';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

const LABELS = {
  lt: {
    regionAria: 'DI agentų gylis ir rolės: gylio lygiai ir komandos rolės',
    youAreHere: 'Pasirinkta:',
    navAria: 'Gylio lygio ar rolės pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'DI agentų tipai ir rolės (L0–L3)',
  },
  en: {
    regionAria: 'AI agent depth and roles: depth levels and team roles',
    youAreHere: 'Selected:',
    navAria: 'Select depth level or role',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'AI agent types and roles (L0–L3)',
  },
} as const;

export default function M10AgentTaxonomyBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM10AgentTaxonomyExplanations(loc);
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
          <M10AgentTaxonomyDiagram
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
