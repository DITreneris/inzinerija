import { createLinearProcessBlock } from './linearProcessBlockFactory';
import M10IncidentPlaybookDiagram from './M10IncidentPlaybookDiagram';
import { getM10IncidentPlaybookStepExplanations } from './m10DiagramContent';

const ENLARGE = {
  lt: 'Incident playbook (5 žingsniai)',
  en: 'Incident playbook (5 steps)',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Incidentų planas: 5 žingsniai',
    statusLabel: 'Pasirinktas žingsnis:',
    navAria: 'Incidentų plano žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Incident playbook: 5 steps',
    statusLabel: 'Selected step:',
    navAria: 'Incident playbook step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
  },
} as const;

const M10IncidentPlaybookBlock = createLinearProcessBlock({
  displayName: 'M10IncidentPlaybookBlock',
  enlarge: ENLARGE,
  labels: LABELS,
  getSteps: getM10IncidentPlaybookStepExplanations,
  renderDiagram: ({ locale, currentStep, onStepClick }) => (
    <M10IncidentPlaybookDiagram
      locale={locale}
      currentStep={currentStep}
      onStepClick={onStepClick}
    />
  ),
});

export default M10IncidentPlaybookBlock;
