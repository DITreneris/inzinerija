/**
 * Modulio 9 id 93 – interaktyvi 8 žingsnių schema + EnlargeableDiagram (tas pats React modale).
 */
import { useLocale } from '../../../contexts/LocaleContext';
import M9DataWorkflowDiagram from './M9DataWorkflowDiagram';
import { getM9DataWorkflowStepExplanations } from './m9DataWorkflowContent';
import EnlargeableDiagram from './EnlargeableDiagram';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { useM9SharedWorkflowStep } from '../../../utils/m9WorkflowSharedStep';
import { InteractiveDiagramShell } from './diagramKit';

const BLOCK_LABELS = {
  m9: {
    lt: {
      regionAria: 'Modulio 9 darbo eiga – aštuoni žingsniai',
      youAreHere: 'Pasirinkta:',
      navAria: 'Žingsnių pasirinkimas',
      stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
      enlargeLabel: 'Modulio 9 – 8 žingsnių duomenų ciklas',
      caption:
        'Paspausk žingsnį – paaiškinimas apačioje; promptą nukopijuosi žemiau.',
    },
    en: {
      regionAria: 'Module 9 work process – eight steps',
      youAreHere: 'Selected:',
      navAria: 'Step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Module 9 – 8-step data workflow',
      caption: 'Tap a step – explanation below; copy the prompt further down.',
    },
  },
  m7_master: {
    lt: {
      regionAria: 'MASTER PROMPTAS – aštuoni žingsniai (Modulis 7)',
      youAreHere: 'Pasirinkta:',
      navAria: 'Žingsnių pasirinkimas',
      stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
      enlargeLabel: 'Modulis 7 – MASTER: 8 žingsnių analizė',
      caption: 'Paspausk žingsnį – paaiškinimas apačioje.',
    },
    en: {
      regionAria: 'MASTER prompt – eight steps (Module 7)',
      youAreHere: 'Selected:',
      navAria: 'Step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Module 7 – MASTER: 8-step analysis',
      caption: 'Tap a step – explanation below.',
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
  const totalSteps = explanations.length;
  const local = useStepDiagram(explanations);
  const shared = useM9SharedWorkflowStep(totalSteps);
  const currentStep = context === 'm9' ? shared.currentStep : local.currentStep;
  const setCurrentStep =
    context === 'm9' ? shared.setCurrentStep : local.setCurrentStep;
  const step = explanations[currentStep] ?? explanations[0];

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
          explanation={
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {labels.caption}
              </p>
              <p>{renderBold(step.body)}</p>
            </div>
          }
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
