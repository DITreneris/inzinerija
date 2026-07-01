/**
 * Interaktyvus struktūruoto proceso blokas – 3 žingsnių diagrama.
 * Lokalizuota per useLocale() ir getterius.
 */
import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import StrukturuotasProcesasDiagram from './StrukturuotasProcesasDiagram';
import {
  getStrukturuotasProcesasBlockLabels,
  getStrukturuotasProcesasStepExplanations,
} from './strukturuotasProcesasStepExplanations';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

export default function StrukturuotasProcesasBlock() {
  const { locale } = useLocale();
  const explanations = getStrukturuotasProcesasStepExplanations(locale);
  const blockLabels = getStrukturuotasProcesasBlockLabels(locale);
  const {
    currentStep,
    setCurrentStep,
    step,
    totalSteps: TOTAL_STEPS,
  } = useStepDiagram(explanations);

  return (
    <InteractiveDiagramShell
      regionAria={blockLabels.regionAria}
      statusLabel={blockLabels.youAreHere}
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      currentTitle={`${currentStep + 1}. ${step.title}`}
      navAria={blockLabels.navAria}
      steps={explanations}
      onStepSelect={setCurrentStep}
      stepAria={blockLabels.stepAria}
      explanationTitle={step.title}
      explanation={<p>{renderBold(step.body)}</p>}
    >
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {blockLabels.clickHint}
      </p>

      <EnlargeableDiagram
        enlargeLabel={blockLabels.enlargeLabel}
        renderContent={() => (
          <StrukturuotasProcesasDiagram
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            locale={locale}
          />
        )}
      />
    </InteractiveDiagramShell>
  );
}
