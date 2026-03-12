/**
 * Agentų ciklo diagramos blokas (M10.2) – statinė diagrama + „Peržiūrėti visą dydį“ per EnlargeableDiagram.
 * Tas pats React turinys skaidrėje ir modale (SCHEME_AGENT, AGENT_VERIFICATION_NE_MELUOTI).
 */
import { useTranslation } from 'react-i18next';
import EnlargeableDiagram from './EnlargeableDiagram';
import AgentWorkflowDiagram from './AgentWorkflowDiagram';

export default function AgentWorkflowBlock() {
  const { t } = useTranslation('diagrams');
  return (
    <EnlargeableDiagram
      renderContent={() => <AgentWorkflowDiagram />}
      enlargeLabel={t('agentWorkflowEnlargeLabel')}
    />
  );
}
