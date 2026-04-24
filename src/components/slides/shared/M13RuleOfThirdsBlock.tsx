import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M13RuleOfThirdsDiagram from './M13RuleOfThirdsDiagram';

const ENLARGE = {
  lt: 'Trečdalių tinklelis',
  en: 'Rule of thirds grid',
} as const;

export default function M13RuleOfThirdsBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M13RuleOfThirdsDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
