import type { ReactNode } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import {
  useStepDiagram,
  type StepExplanation,
} from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';

export type LinearProcessLocale = 'lt' | 'en';

interface LinearProcessLabels {
  regionAria: string;
  statusLabel: string;
  navAria: string;
  stepAria: (index: number, title: string) => string;
}

interface LinearProcessDiagramProps {
  locale: LinearProcessLocale;
  currentStep: number;
  onStepClick: (index: number) => void;
}

interface LinearProcessBlockConfig {
  enlarge: Record<LinearProcessLocale, string>;
  labels: Record<LinearProcessLocale, LinearProcessLabels>;
  getSteps: (locale: LinearProcessLocale) => StepExplanation[];
  renderDiagram: (props: LinearProcessDiagramProps) => ReactNode;
  displayName?: string;
}

export function createLinearProcessBlock({
  enlarge,
  labels,
  getSteps,
  renderDiagram,
  displayName,
}: LinearProcessBlockConfig) {
  function LinearProcessBlock() {
    const { locale } = useLocale();
    const loc: LinearProcessLocale = locale === 'en' ? 'en' : 'lt';
    const steps = getSteps(loc);
    const diagramLabels = labels[loc];
    const { currentStep, setCurrentStep, step, totalSteps } =
      useStepDiagram(steps);

    return (
      <EnlargeableDiagram
        mobileBehavior="reflow"
        renderContent={() => (
          <InteractiveDiagramShell
            density="hero"
            regionAria={diagramLabels.regionAria}
            statusLabel={diagramLabels.statusLabel}
            currentStep={currentStep}
            totalSteps={totalSteps}
            currentTitle={step.title}
            navAria={diagramLabels.navAria}
            steps={steps}
            onStepSelect={setCurrentStep}
            stepAria={diagramLabels.stepAria}
            explanationTitle={step.title}
            explanation={<p>{step.body}</p>}
          >
            {renderDiagram({
              locale: loc,
              currentStep,
              onStepClick: setCurrentStep,
            })}
          </InteractiveDiagramShell>
        )}
        enlargeLabel={enlarge[loc]}
      />
    );
  }

  LinearProcessBlock.displayName = displayName ?? 'LinearProcessBlock';

  return LinearProcessBlock;
}
