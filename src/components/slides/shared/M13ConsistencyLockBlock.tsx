import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M13ConsistencyLockDiagram from './M13ConsistencyLockDiagram';
import {
  getM13ConsistencyLockChrome,
  getM13ConsistencyLockExplanations,
} from './m13ConsistencyLockContent';

export default function M13ConsistencyLockBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getM13ConsistencyLockExplanations(loc);
  const labels = getM13ConsistencyLockChrome(loc);
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
          <M13ConsistencyLockDiagram
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
