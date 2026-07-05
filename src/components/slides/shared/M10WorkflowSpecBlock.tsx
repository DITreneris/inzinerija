import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10WorkflowSpecDiagram from './M10WorkflowSpecDiagram';

const ENLARGE = {
  lt: 'Workflow specifikacija (8 blokai)',
  en: 'Workflow specification (8 blocks)',
} as const;

export default function M10WorkflowSpecBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M10WorkflowSpecDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
