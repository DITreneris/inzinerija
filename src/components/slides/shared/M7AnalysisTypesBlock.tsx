import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M7AnalysisTypesDiagram from './M7AnalysisTypesDiagram';
import { getM7AnalysisTypeExplanations } from './m7DiagramContent';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

const LABELS = {
  lt: {
    regionAria: 'Keturi analizės tipai',
    youAreHere: 'Pasirinkta:',
    navAria: 'Analizės tipo pasirinkimas',
    stepAria: (i: number, title: string) => `Tipas ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 7 – keturi analizės tipai',
  },
  en: {
    regionAria: 'Four analysis types',
    youAreHere: 'Selected:',
    navAria: 'Select analysis type',
    stepAria: (i: number, title: string) => `Type ${i + 1}: ${title}`,
    enlargeLabel: 'Module 7 – four analysis types',
  },
} as const;

export default function M7AnalysisTypesBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM7AnalysisTypeExplanations(loc);
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
          <M7AnalysisTypesDiagram
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
