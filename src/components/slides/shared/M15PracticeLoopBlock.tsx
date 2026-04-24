import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M15PracticeLoopDiagram from './M15PracticeLoopDiagram';

const ENLARGE = { lt: 'Projekto ciklas', en: 'Project loop' } as const;

export default function M15PracticeLoopBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M15PracticeLoopDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
