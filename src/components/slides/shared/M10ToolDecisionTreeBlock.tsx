import { useLocale } from '../../../contexts/LocaleContext';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import EnlargeableDiagram from './EnlargeableDiagram';
import { InteractiveDiagramShell } from './diagramKit';
import M10ToolDecisionTreeDiagram from './M10ToolDecisionTreeDiagram';
import {
  getM10ToolTreeLeaves,
  getM10ToolTreeLabels,
} from './m10DiagramContent';

const ENLARGE = {
  lt: 'Įrankių pasirinkimo medis',
  en: 'Tool decision tree',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Įrankių pasirinkimo medis: 5 šakos',
    statusLabel: 'Pasirinkta šaka:',
    navAria: 'Įrankio šakos pasirinkimas',
    stepAria: (i: number, title: string) => `Šaka ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Tool decision tree: 5 branches',
    statusLabel: 'Selected branch:',
    navAria: 'Tool branch selection',
    stepAria: (i: number, title: string) => `Branch ${i + 1}: ${title}`,
  },
} as const;

export default function M10ToolDecisionTreeBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const leaves = getM10ToolTreeLeaves(loc);
  const treeLabels = getM10ToolTreeLabels(loc);
  const labels = LABELS[loc];
  const steps = leaves.map((leaf) => ({
    title: leaf.tool,
    body: `${treeLabels.pick}: ${leaf.condition}`,
  }));
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(steps);

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => (
        <InteractiveDiagramShell
          density="hero"
          regionAria={labels.regionAria}
          statusLabel={labels.statusLabel}
          currentStep={currentStep}
          totalSteps={totalSteps}
          currentTitle={step.title}
          navAria={labels.navAria}
          steps={steps}
          onStepSelect={setCurrentStep}
          stepAria={labels.stepAria}
          explanationTitle={step.title}
          explanation={<p>{step.body}</p>}
        >
          <M10ToolDecisionTreeDiagram
            locale={loc}
            selectedIndex={currentStep}
            onSelect={setCurrentStep}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
