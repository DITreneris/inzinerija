import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10IncidentPlaybookDiagram from './M10IncidentPlaybookDiagram';

const ENLARGE = {
  lt: 'Incident playbook (5 žingsniai)',
  en: 'Incident playbook (5 steps)',
} as const;

export default function M10IncidentPlaybookBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M10IncidentPlaybookDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
