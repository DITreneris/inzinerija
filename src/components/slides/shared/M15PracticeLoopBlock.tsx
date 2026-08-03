import { useEffect, useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M15PracticeLoopDiagram from './M15PracticeLoopDiagram';
import {
  getM15PracticeLoopExplanations,
  getM15PracticeLoopLabels,
  type M15PracticePath,
} from './m15PracticeLoopContent';

export default function M15PracticeLoopBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const labels = getM15PracticeLoopLabels(loc);
  const [path, setPath] = useState<M15PracticePath>('quick');
  const explanations = getM15PracticeLoopExplanations(loc, path);
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(explanations);

  useEffect(() => {
    setCurrentStep(0);
  }, [path, setCurrentStep]);

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => (
        <div className="space-y-3">
          <div
            className="flex flex-wrap justify-center gap-2"
            role="group"
            aria-label={labels.modeAria}
          >
            {(
              [
                ['quick', labels.quick],
                ['full', labels.full],
              ] as const
            ).map(([value, label]) => {
              const active = path === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPath(value)}
                  aria-pressed={active}
                  className={`rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                    active
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-brand-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <InteractiveDiagramShell
            density="hero"
            regionAria={
              path === 'quick' ? labels.regionAriaQuick : labels.regionAriaFull
            }
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
            <M15PracticeLoopDiagram
              locale={loc}
              path={path}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </InteractiveDiagramShell>
        </div>
      )}
      enlargeLabel={labels.enlargeLabel}
    />
  );
}
