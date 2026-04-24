import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M13AecFunnelDiagram from './M13AecFunnelDiagram';

const ENLARGE = { lt: 'A/E/C piltuvas', en: 'A/E/C funnel' } as const;

export default function M13AecFunnelBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => <M13AecFunnelDiagram locale={loc} />}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
