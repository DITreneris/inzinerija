/**
 * Interaktyvus DI prezentacijos workflow – DiagramKit Shell + EnlargeableDiagram.
 * LMS 1A: chrome etalonas = InteractiveDiagramShell (ne rankinis badge/nav).
 */
import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import DiPrezentacijosWorkflowDiagram from './DiPrezentacijosWorkflowDiagram';
import { getDiPrezentacijosBlockLabels } from './diPrezentacijosWorkflowConfig';
import { getDiPrezentacijosStepExplanations } from './stepExplanations';

export default function DiPrezentacijosWorkflowBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getDiPrezentacijosStepExplanations(loc);
  const labels = getDiPrezentacijosBlockLabels(loc);
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
          <DiPrezentacijosWorkflowDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={loc}
          />
        )}
      />
    </InteractiveDiagramShell>
  );
}
