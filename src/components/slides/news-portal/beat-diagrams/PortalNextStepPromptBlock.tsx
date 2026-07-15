import { useLocale } from '../../../../contexts/LocaleContext';
import CopyButton from '../../shared/CopyButton';
import { getPortalKickerClasses, PORTAL_TEXT } from '../portalSurfaces';
import type { NextStepPromptLabels } from './portalBeatContent';

interface PortalNextStepPromptBlockProps {
  labels: NextStepPromptLabels;
}

export default function PortalNextStepPromptBlock({
  labels,
}: PortalNextStepPromptBlockProps) {
  const { locale } = useLocale();
  const isEn = locale === 'en';

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className={PORTAL_TEXT.bodySm}>{labels.bridgeLine1}</p>
        <p className={PORTAL_TEXT.bodySm}>{labels.bridgeLine2}</p>
      </div>

      <div
        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-slate-50/80 dark:bg-slate-800/40 p-4"
        data-action="copy"
      >
        <p className={`${getPortalKickerClasses('neutral')} mb-2`}>
          {labels.promptLabel}
        </p>
        <p className="font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-3">
          {labels.promptTemplate}
        </p>
        <div className="flex justify-end">
          <CopyButton
            text={labels.promptTemplate}
            variant="accent"
            size="md"
            ariaLabel={isEn ? 'Copy prompt' : 'Kopijuoti promptą'}
            copiedLabel={isEn ? 'Copied!' : 'Nukopijuota!'}
          />
        </div>
      </div>
    </div>
  );
}
