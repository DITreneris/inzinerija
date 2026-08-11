import { createLinearProcessBlock } from './linearProcessBlockFactory';
import M10LearningLoopDiagram from './M10LearningLoopDiagram';
import { getM10LearningLoopStepExplanations } from './m10LearningLoopContent';

const ENLARGE = {
  lt: 'Uždaro mokymosi ciklas agentams',
  en: 'Closed learning loop for agents',
} as const;

const LABELS = {
  lt: {
    regionAria: 'Uždaro mokymosi ciklas agentams: 4 makro žingsniai',
    statusLabel: 'Pasirinkta dalis:',
    navAria: 'Mokymosi ciklo dalies pasirinkimas',
    stepAria: (i: number, title: string) => `Dalis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Closed learning loop for agents: 4 macro steps',
    statusLabel: 'Selected part:',
    navAria: 'Learning loop part selection',
    stepAria: (i: number, title: string) => `Part ${i + 1}: ${title}`,
  },
} as const;

const M10LearningLoopBlock = createLinearProcessBlock({
  displayName: 'M10LearningLoopBlock',
  enlarge: ENLARGE,
  labels: LABELS,
  getSteps: getM10LearningLoopStepExplanations,
  renderDiagram: ({ locale, currentStep, onStepClick }) => (
    <M10LearningLoopDiagram
      locale={locale}
      currentStep={currentStep}
      onStepClick={onStepClick}
    />
  ),
});

export default M10LearningLoopBlock;
