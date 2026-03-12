import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLocale } from '../../../contexts/LocaleContext';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md';
  /** Pasirenkama: accent/brand CTA (TemplateBlock „Kopijuoti“) – min-h 44px, ryškesnis mygtukas */
  variant?: 'default' | 'accent';
  /** Pasirenkama: tooltip ir a11y (pvz. „Kopijuoti grandinę“) */
  title?: string;
  ariaLabel?: string;
  /** Pasirenkama: po paspaudimo 1–2 s rodomas tekstas (pvz. „Nukopijuota“) – aiškesnis feedback */
  copiedLabel?: string;
}

export default function CopyButton({ text, className = '', size = 'md', variant = 'default', title: titleProp, ariaLabel, copiedLabel }: CopyButtonProps) {
  const { locale } = useLocale();
  const defaultCopy = locale === 'en' ? 'Copy' : 'Kopijuoti';
  const title = titleProp ?? defaultCopy;
  const ariaLabelFinal = ariaLabel ?? defaultCopy;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), copiedLabel ? 1500 : 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const padding = size === 'sm' ? 'px-2 py-1.5' : 'px-4 py-2.5';
  const showCopiedText = copied && copiedLabel;
  const isAccent = variant === 'accent';
  const buttonClasses = isAccent
    ? 'min-h-[44px] rounded-xl bg-accent-500 hover:bg-accent-600 dark:bg-accent-500 dark:hover:bg-accent-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-colors'
    : 'min-h-[44px] min-w-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${padding} flex items-center justify-center gap-1.5 ${buttonClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 touch-manipulation ${className}`}
      aria-label={showCopiedText ? copiedLabel : ariaLabelFinal}
      title={title}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className={`${iconSize} ${isAccent ? 'text-white' : 'text-emerald-600'} flex-shrink-0 animate-fade-in`} />
          {copiedLabel && (
            <span className={`text-xs font-medium whitespace-nowrap ${isAccent ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {copiedLabel}
            </span>
          )}
        </>
      ) : (
        <Copy className={`${iconSize} ${isAccent ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
      )}
    </button>
  );
}
