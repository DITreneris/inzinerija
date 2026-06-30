import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10AgentTaxonomyDiagram from './M10AgentTaxonomyDiagram';

const ENLARGE = {
  lt: 'DI agentų tipai ir rolės (L0–L3)',
  en: 'AI agent types and roles (L0–L3)',
} as const;

export default function M10AgentTaxonomyBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M10AgentTaxonomyDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
