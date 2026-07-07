/**
 * Agentų ciklo diagramos blokas (M10.2) – interaktyvi diagrama + paaiškinimai apačioje.
 * „Tu esi čia" badge, žingsnių mygtukai, stabili paaiškinimo struktūra (SCHEME_AGENT §3.6).
 * Lokalizuota per useLocale() ir agentWorkflowContent getterius.
 */
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import AgentWorkflowDiagram from './AgentWorkflowDiagram';
import { getAgentWorkflowStepExplanations } from './agentWorkflowContent';
import { renderBold } from '../../../utils/renderBold';
import { useStepDiagram } from '../../../utils/useStepDiagram';
import { InteractiveDiagramShell } from './diagramKit';

const BLOCK_LABELS = {
  lt: {
    regionAria: 'Agentų ciklas: 5 žingsniai su paaiškinimais',
    statusLabel: 'Tu esi čia:',
    clickHint:
      'Paspausk žingsnį diagramoje arba skaičių 1–5 – paaiškinimas rodomas apačioje.',
    navAria: 'Žingsnio pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
  },
  en: {
    regionAria: 'Agent cycle: 5 steps with explanations',
    statusLabel: 'You are here:',
    clickHint:
      'Click a step in the diagram or number 1–5 – explanation shown below.',
    navAria: 'Step selection',
    stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
  },
} as const;

export default function AgentWorkflowBlock() {
  const { t } = useTranslation('diagrams');
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const explanations = getAgentWorkflowStepExplanations(loc);
  const labels = BLOCK_LABELS[loc];
  const { currentStep, setCurrentStep, step, totalSteps } =
    useStepDiagram(explanations);

  return (
    <EnlargeableDiagram
      renderContent={() => (
        <InteractiveDiagramShell
          regionAria={labels.regionAria}
          statusLabel={labels.statusLabel}
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
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {labels.clickHint}
          </p>
          <AgentWorkflowDiagram
            locale={loc}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </InteractiveDiagramShell>
      )}
      enlargeLabel={t('agentWorkflowEnlargeLabel')}
    />
  );
}
