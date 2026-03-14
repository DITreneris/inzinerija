import CopyButton from './CopyButton';
import { useLocale } from '../../../contexts/LocaleContext';

interface TemplateBlockProps {
  id?: string;
  label: string;
  template: string;
  /** A11y: aria-label mygtukui (pvz. „Nukopijuoti promptą“) */
  copyAriaLabel?: string;
  /** A11y: tekstas po nukopijavimo (pvz. „Nukopijuota!“) */
  copyCopiedLabel?: string;
}

export default function TemplateBlock({ id, label, template, copyAriaLabel, copyCopiedLabel }: TemplateBlockProps) {
  const { locale } = useLocale();
  return (
    <div className="bg-accent-50/50 dark:bg-accent-900/10 border border-gray-200 dark:border-gray-700 rounded-xl p-4 lg:p-5 relative" data-action="copy">
      {label && (
        <p id={id} className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
          {label}
        </p>
      )}
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line font-mono mb-3">
        {template}
      </p>
      <div className="flex justify-end">
        <CopyButton
          text={template}
          size="md"
          variant="accent"
          ariaLabel={copyAriaLabel ?? (locale === 'en' ? 'Copy' : 'Kopijuoti')}
          copiedLabel={copyCopiedLabel ?? (locale === 'en' ? 'Copied!' : 'Nukopijuota!')}
        />
      </div>
    </div>
  );
}
