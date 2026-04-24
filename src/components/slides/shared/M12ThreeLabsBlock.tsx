import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M12ThreeLabsDiagram from './M12ThreeLabsDiagram';

const ENLARGE = { lt: 'Trys praktikos (3A)', en: 'Three labs (3A)' } as const;

export default function M12ThreeLabsBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M12ThreeLabsDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
