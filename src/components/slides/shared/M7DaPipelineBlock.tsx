import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M7DaPipelineDiagram from './M7DaPipelineDiagram';
import { getM7DaPipelineExplanations } from './m7DiagramContent';

const LABELS = {
  lt: {
    regionAria: 'Duomenų analizės pipeline – šeši žingsniai',
    youAreHere: 'Tu esi čia:',
    stepOf: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    clickHint:
      'Paspausk žingsnį diagramoje arba skaičių 1–6 – paaiškinimas rodomas apačioje.',
    navAria: 'Pipeline žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 7 – duomenų analizės pipeline',
  },
  en: {
    regionAria: 'Data analysis pipeline – six steps',
    youAreHere: 'You are here:',
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    clickHint:
      'Click a step in the diagram or number 1–6 – explanation shown below.',
    navAria: 'Pipeline step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'Module 7 – data analysis pipeline',
  },
} as const;

export default function M7DaPipelineBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM7DaPipelineExplanations(loc);
  const labels = LABELS[loc];
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(explanations);

  return (
    <InteractiveDiagramShell
      density="hero"
      regionAria={labels.regionAria}
      statusLabel={labels.youAreHere}
      stepOfLabel={labels.stepOf(currentStep + 1, totalSteps)}
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
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {labels.clickHint}
      </p>
      <EnlargeableDiagram
        mobileBehavior="reflow"
        controlPlacement="top-right"
        enlargeLabel={labels.enlargeLabel}
        renderContent={() => (
          <M7DaPipelineDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={loc}
          />
        )}
      />
    </InteractiveDiagramShell>
  );
}
