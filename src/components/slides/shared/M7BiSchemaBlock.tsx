import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7BiSchemaDiagram from './M7BiSchemaDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import { getM7BiSchemaExplanations } from './m7DiagramContent';

const LABELS = {
  lt: {
    regionAria: 'BI schema – keturi žingsniai',
    youAreHere: 'Tu esi čia:',
    stepOf: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    clickHint:
      'Paspausk žingsnį diagramoje arba skaičių 1–4 – paaiškinimas rodomas apačioje.',
    navAria: 'BI žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 7 – BI schema',
  },
  en: {
    regionAria: 'BI flow – four steps',
    youAreHere: 'You are here:',
    stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
    clickHint:
      'Click a step in the diagram or number 1–4 – explanation shown below.',
    navAria: 'BI step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
    enlargeLabel: 'Module 7 – BI flow',
  },
} as const;

export default function M7BiSchemaBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM7BiSchemaExplanations(loc);
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
        showEnlargeControl={false}
        enlargeLabel={labels.enlargeLabel}
        renderContent={() => (
          <M7BiSchemaDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={loc}
          />
        )}
      />
    </InteractiveDiagramShell>
  );
}
