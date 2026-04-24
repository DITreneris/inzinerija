import { useState } from 'react';
import { useLocale } from '../../../contexts/LocaleContext';
import EnlargeableDiagram from './EnlargeableDiagram';
import M10ToolDecisionTreeDiagram from './M10ToolDecisionTreeDiagram';
import {
  getM10ToolTreeLeaves,
  getM10ToolTreeLabels,
} from './m10DiagramContent';

const ENLARGE = {
  lt: 'Įrankių pasirinkimo medis',
  en: 'Tool decision tree',
} as const;

export default function M10ToolDecisionTreeBlock() {
  const { locale } = useLocale();
  const loc = locale === 'en' ? 'en' : 'lt';
  const [selected, setSelected] = useState(0);
  const leaves = getM10ToolTreeLeaves(loc);
  const L = getM10ToolTreeLabels(loc);
  const leaf = leaves[selected];

  return (
    <EnlargeableDiagram
      mobileBehavior="reflow"
      renderContent={() => (
        <div className="space-y-3">
          <M10ToolDecisionTreeDiagram
            locale={loc}
            selectedIndex={selected}
            onSelect={setSelected}
          />
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            {L.pick}:{' '}
            <strong className="text-brand-700 dark:text-brand-300">
              {leaf.tool}
            </strong>
            {' — '}
            {leaf.condition}
          </p>
        </div>
      )}
      enlargeLabel={ENLARGE[loc]}
    />
  );
}
