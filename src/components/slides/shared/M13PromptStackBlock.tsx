import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M13PromptStackDiagram from './M13PromptStackDiagram';

const ENLARGE = { lt: 'Prompto sluoksniai', en: 'Prompt layers' } as const;

export default function M13PromptStackBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M13PromptStackDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
