/**
 * M7 sk. 71 – makro kelio žemėlapis.
 * Shell = Ne; lengvas kortelių pasirinkimas tipui (be StepNav / meta-nav).
 */
import { useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import M7PathMapDiagram, { M7_PATH_MAP_HOME_STEP } from './M7PathMapDiagram';

export default function M7PathMapBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const [selectedStep, setSelectedStep] = useState(M7_PATH_MAP_HOME_STEP);
  return (
    <M7PathMapDiagram
      locale={loc}
      currentStep={selectedStep}
      onStepSelect={setSelectedStep}
    />
  );
}
