import { createLinearProcessBlock } from './linearProcessBlockFactory';
import M10WorkflowSpecDiagram from './M10WorkflowSpecDiagram';
import { getM10WorkflowSpecStepExplanations } from './m10DiagramContent';

const ENLARGE = {
  lt: 'Workflow specifikacija (8 blokai)',
  en: 'Workflow specification (8 blocks)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Workflow specifikacija: 8 blokai',
    statusLabel: 'Pasirinktas blokas:',
    navAria: 'Specifikacijos bloko pasirinkimas',
    stepAria: (i: number, title: string) => `Blokas ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Workflow specification: 8 blocks',
    statusLabel: 'Selected block:',
    navAria: 'Specification block selection',
    stepAria: (i: number, title: string) => `Block ${i + 1}: ${title}`,
  },
} as const;

const M10WorkflowSpecBlock = createLinearProcessBlock({
  displayName: 'M10WorkflowSpecBlock',
  enlarge: ENLARGE,
  labels: LABELS,
  getSteps: getM10WorkflowSpecStepExplanations,
  renderDiagram: ({ locale, currentStep, onStepClick }) => (
    <M10WorkflowSpecDiagram
      locale={locale}
      currentStep={currentStep}
      onStepClick={onStepClick}
    />
  ),
});

export default M10WorkflowSpecBlock;
