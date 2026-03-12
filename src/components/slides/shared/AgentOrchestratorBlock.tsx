/**
 * Agentų orkestratoriaus diagramos blokas – statinė schema + „Peržiūrėti visą dydį“ per EnlargeableDiagram.
 * Tas pats React turinys (AgentOrchestratorDiagram) skaidrėje ir modale (SCHEME_AGENT, AGENT_VERIFICATION_NE_MELUOTI).
 */
import { useTranslation } from 'react-i18next';
import EnlargeableDiagram from './EnlargeableDiagram';
import AgentOrchestratorDiagram from './AgentOrchestratorDiagram';

export default function AgentOrchestratorBlock() {
  const { t } = useTranslation('diagrams');
  return (
    <EnlargeableDiagram
      renderContent={() => <AgentOrchestratorDiagram />}
      enlargeLabel={t('agentOrchestratorEnlargeLabel')}
    />
  );
}
