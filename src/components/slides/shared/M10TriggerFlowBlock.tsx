import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10TriggerFlowDiagram from './M10TriggerFlowDiagram';

const ENLARGE = {
  lt: 'Workflow grandinė (Trigger, Condition, Action, Webhook)',
  en: 'Workflow chain (Trigger, Condition, Action, Webhook)',
} as const;

export default function M10TriggerFlowBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M10TriggerFlowDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
