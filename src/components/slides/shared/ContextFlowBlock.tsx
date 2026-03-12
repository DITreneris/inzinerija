/**
 * Konteksto veikimo schemos blokas – skaidrėje su „Peržiūrėti visą dydį“.
 * Naudojama skaidrėje id 44 (Konteksto inžinerija: kaip valdyti DI).
 */
import { useTranslation } from 'react-i18next';
import EnlargeableDiagram from './EnlargeableDiagram';
import ContextFlowDiagram from './ContextFlowDiagram';

export default function ContextFlowBlock() {
  const { t } = useTranslation('diagrams');
  return (
    <EnlargeableDiagram
      renderContent={() => <ContextFlowDiagram />}
      enlargeLabel={t('contextFlowEnlargeLabel')}
      className="my-4"
    />
  );
}
