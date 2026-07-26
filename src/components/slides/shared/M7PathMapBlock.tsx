/**
 * M7 sk. 71 – makro kelio žemėlapis.
 * Shell = Ne; be Enlargeable / StepNav (Plan B).
 */
import { useLocale } from '../../../contexts/LocaleContext';
import M7PathMapDiagram from './M7PathMapDiagram';

export default function M7PathMapBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  return <M7PathMapDiagram locale={loc} currentStep={0} />;
}
