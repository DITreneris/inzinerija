import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10SpecIncidentDiagram from './M10SpecIncidentDiagram';

const ENLARGE = {
  lt: 'Workflow spec ir incident playbook',
  en: 'Workflow spec and incident playbook',
} as const;

export default function M10SpecIncidentBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M10SpecIncidentDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
