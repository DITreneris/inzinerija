import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10ThreeAStrategyDiagram from './M10ThreeAStrategyDiagram';

const ENLARGE = {
  lt: '3A strategija (80 / 15 / 5)',
  en: '3A strategy (80 / 15 / 5)',
} as const;

export default function M10ThreeAStrategyBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M10ThreeAStrategyDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
