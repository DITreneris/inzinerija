/**
 * Agentų orkestratoriaus diagrama (Router + agentai + pipeline + SOT).
 * Statinė schema iš public/agent_orchestrator_v2.svg – tas pats turinys skaidrėje ir modale (EnlargeableDiagram).
 * Alt tekstas lokalizuotas per diagrams.agentOrchestratorAlt.
 */
import { useTranslation } from 'react-i18next';

const ORCHESTRATOR_SVG = `${import.meta.env.BASE_URL || '/'}agent_orchestrator_v2.svg`;

export default function AgentOrchestratorDiagram({ className = '' }: { className?: string }) {
  const { t } = useTranslation('diagrams');
  return (
    <img
      src={ORCHESTRATOR_SVG}
      alt={t('agentOrchestratorAlt')}
      className={`w-full max-w-4xl mx-auto block ${className}`}
      width={1120}
      height={860}
      style={{ maxHeight: 'min(80vh, 860px)', objectFit: 'contain' }}
    />
  );
}
