import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10ThreeAStrategyDiagram from './M10ThreeAStrategyDiagram';
import {
  getM10ThreeAExplanations,
  getM10ThreeALabels,
} from './m10DiagramContent';

export default function M10ThreeAStrategyBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const labels = getM10ThreeALabels(loc);
  const explanations = getM10ThreeAExplanations(loc);
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(explanations);

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      showEnlargeControl={false}
      renderContent={() => (
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
          <M10ThreeAStrategyDiagram
            locale={loc}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={labels.enlargeLabel}
    />
  );
}
