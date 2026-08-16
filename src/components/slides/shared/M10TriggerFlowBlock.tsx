import { useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import { focusRingClasses } from '../../../design-tokens';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10TriggerFlowDiagram from './M10TriggerFlowDiagram';
import {
  getM10TriggerFlowLabels,
  getM10TriggerFlowStepExplanations,
  getM10TriggerTypeChipLabel,
  getM10TriggerTypeExplanations,
  M10_DEFAULT_TRIGGER_TYPE,
  M10_TRIGGER_TYPE_IDS,
  type M10Locale,
  type TriggerTypeId,
} from './m10DiagramContent';

const ENLARGE = {
  lt: 'Darbo eigos grandinė (Paleidiklis → Sąlyga → Veiksmas)',
  en: 'Workflow chain (Trigger → Condition → Action)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Darbo eigos grandinė: 3 žingsniai',
    statusLabel: 'Pasirinktas žingsnis:',
    navAria: 'Darbo eigos grandinės žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Workflow chain: 3 steps',
    statusLabel: 'Selected step:',
    navAria: 'Workflow chain step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
  },
} as const;

export default function M10TriggerFlowBlock() {
  const { locale } = useLocale();
  const loc: M10Locale = locale === 'en' ? 'en' : 'lt';
  const steps = getM10TriggerFlowStepExplanations(loc);
  const diagramLabels = LABELS[loc];
  const copy = getM10TriggerFlowLabels(loc);
  const typeBodies = getM10TriggerTypeExplanations(loc);
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(steps);
  const [selectedType, setSelectedType] = useState<TriggerTypeId>(
    M10_DEFAULT_TRIGGER_TYPE
  );
  const showTypeLayer = currentStep === 0;

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
          explanation={
            <div className="space-y-3">
              <p className="whitespace-pre-line">{renderBold(step.body)}</p>
              {showTypeLayer ? (
                <>
                  <p>
                    <span className="font-semibold text-brand-800 dark:text-brand-200">
                      {copy.selectedTypeLabel}{' '}
                    </span>
                    {getM10TriggerTypeChipLabel(loc, selectedType)}
                  </p>
                  <p>{typeBodies[selectedType]}</p>
                  <div
                    role="radiogroup"
                    aria-label={copy.typePickerAria}
                    className="flex flex-wrap gap-2"
                  >
                    {M10_TRIGGER_TYPE_IDS.map((type) => {
                      const selected = type === selectedType;
                      return (
                        <button
                          key={type}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${focusRingClasses.brandOnWhite} ${
                            selected
                              ? 'border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-400 dark:bg-amber-950/40 dark:text-amber-100'
                              : 'border-slate-200 bg-white text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200'
                          }`}
                          onClick={() => setSelectedType(type)}
                        >
                          {getM10TriggerTypeChipLabel(loc, type)}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
          }
        >
          <M10TriggerFlowDiagram
            locale={loc}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
