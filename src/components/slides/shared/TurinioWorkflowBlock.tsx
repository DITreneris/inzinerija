/**
 * Turinio inžinerijos workflow blokas (13.11) – interaktyvi diagrama su paaiškinimais.
 * DiagramKit: InteractiveDiagramShell + DiagramStepNav.
 */
import { useLocale } from '../../../contexts/LocaleContext';
import TurinioWorkflowDiagram from './TurinioWorkflowDiagram';
import { getM13BusinessWorkflowExplanations } from './m13BusinessWorkflowContent';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';

const TURINIO_BLOCK_LABELS = {
  lt: {
    regionAria: 'Turinio workflow nuo brief iki publikacijos',
    youAreHere: 'Tu esi čia:',
    navAria: 'Žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Turinio workflow',
  },
  en: {
    regionAria: 'Content workflow from brief to publication',
    youAreHere: 'You are here:',
    navAria: 'Step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'Content workflow',
  },
} as const;

export default function TurinioWorkflowBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM13BusinessWorkflowExplanations(loc);
  const labels = TURINIO_BLOCK_LABELS[loc];
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
          <TurinioWorkflowDiagram
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
