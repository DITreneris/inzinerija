import { createLinearProcessBlock } from './linearProcessBlockFactory';
import M10TriggerFlowDiagram from './M10TriggerFlowDiagram';
import { getM10TriggerFlowStepExplanations } from './m10DiagramContent';

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

const M10TriggerFlowBlock = createLinearProcessBlock({
  displayName: 'M10TriggerFlowBlock',
  enlarge: ENLARGE,
  labels: LABELS,
  getSteps: getM10TriggerFlowStepExplanations,
  renderDiagram: ({ locale, currentStep, onStepClick }) => (
    <M10TriggerFlowDiagram
      locale={locale}
      currentStep={currentStep}
      onStepClick={onStepClick}
    />
  ),
});

export default M10TriggerFlowBlock;
