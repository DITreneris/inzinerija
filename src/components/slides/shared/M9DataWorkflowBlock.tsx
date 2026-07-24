/**
 * Modulio 9 id 93 – interaktyvi 8 žingsnių schema + EnlargeableDiagram (tas pats React modale).
 */
import { useLocale } from '../../../contexts/LocaleContext';
import M9DataWorkflowDiagram from './M9DataWorkflowDiagram';
import { getM9DataWorkflowStepExplanations } from './m9DataWorkflowContent';
import EnlargeableDiagram from './EnlargeableDiagram';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

const BLOCK_LABELS = {
  m9: {
    lt: {
      regionAria: 'Modulio 9 workflow – aštuoni žingsniai',
      youAreHere: 'Tu esi čia:',
      navAria: 'Žingsnių pasirinkimas',
      stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
      enlargeLabel: 'Modulio 9 – 8 žingsnių duomenų ciklas',
    },
    en: {
      regionAria: 'Module 9 workflow – eight steps',
      youAreHere: 'You are here:',
      navAria: 'Step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Module 9 – 8-step data workflow',
    },
  },
  m7_master: {
    lt: {
      regionAria: 'MASTER PROMPTAS – aštuoni žingsniai (Modulis 7)',
      youAreHere: 'Tu esi čia:',
      navAria: 'Žingsnių pasirinkimas',
      stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
      enlargeLabel: 'Modulis 7 – MASTER: 8 žingsnių analizė',
    },
    en: {
      regionAria: 'MASTER prompt – eight steps (Module 7)',
      youAreHere: 'You are here:',
      navAria: 'Step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Module 7 – MASTER: 8-step analysis',
    },
  },
} as const;

export default function M9DataWorkflowBlock({
  context = 'm9',
}: {
  /** m7_master – ta pati 8 žingsnių schema Modulio 7 skaidrei „MASTER PROMPTAS“ */
  context?: 'm9' | 'm7_master';
}) {
  const { locale } = useLocale();
  const explanations = getM9DataWorkflowStepExplanations(locale, context);
  const loc = locale === 'en' ? 'en' : 'lt';
  const labels = BLOCK_LABELS[context][loc];
  const {
    currentStep,
    setCurrentStep,
    step,
    totalSteps: TOTAL_STEPS,
  } = useStepDiagram(explanations);

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => (
        <InteractiveDiagramShell
          density="hero"
          regionAria={labels.regionAria}
          statusLabel={labels.youAreHere}
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          currentTitle={`${currentStep + 1}. ${step.title}`}
          navAria={labels.navAria}
          steps={explanations}
          onStepSelect={setCurrentStep}
          stepAria={labels.stepAria}
          explanationTitle={step.title}
          explanation={<p>{renderBold(step.body)}</p>}
        >
          <M9DataWorkflowDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={locale}
            diagramContext={context === 'm7_master' ? 'm7_master' : 'm9'}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={labels.enlargeLabel}
    />
  );
}
