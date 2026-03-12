/**
 * F3-1: Metakognityvinis pasitikėjimo pasirinkimas prieš atsakant.
 * "Kaip esate tikri?" – Tikras / Spėju / Nežinau.
 */
import { ThumbsUp, HelpCircle, MinusCircle } from 'lucide-react';
import { getConfidenceLabels, type ConfidenceLevel } from './confidenceLabels';
import { useLocale } from '../../../../contexts/LocaleContext';

export type { ConfidenceLevel };

const ICONS = {
  sure: ThumbsUp,
  guess: HelpCircle,
  unsure: MinusCircle,
};

interface ConfidenceSelectorProps {
  value: ConfidenceLevel | undefined;
  onChange: (level: ConfidenceLevel) => void;
  disabled?: boolean;
  /** Compact variant for results view */
  compact?: boolean;
  ariaLabel?: string;
}

export function ConfidenceSelector({
  value,
  onChange,
  disabled = false,
  compact = false,
  ariaLabel,
}: ConfidenceSelectorProps) {
  const { locale } = useLocale();
  const labels = getConfidenceLabels(locale);
  const levels: ConfidenceLevel[] = ['sure', 'guess', 'unsure'];
  const resolvedAriaLabel = ariaLabel ?? (locale === 'en' ? 'How sure are you?' : 'Kaip esate tikri?');

  return (
    <div className="mb-4" role="group" aria-label={resolvedAriaLabel}>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {locale === 'en' ? 'How sure are you?' : 'Kaip esate tikri?'}
      </p>
      <div className={`flex flex-wrap gap-2 ${compact ? 'gap-1.5' : ''}`}>
        {levels.map((level) => {
          const Icon = ICONS[level];
          const isSelected = value === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => !disabled && onChange(level)}
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={labels[level]}
              className={`inline-flex items-center gap-1.5 rounded-lg border-2 transition-all min-h-[44px] ${
                compact ? 'px-2 py-1.5 text-sm' : 'px-3 py-2'
              } ${
                disabled && !isSelected
                  ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-default'
                  : isSelected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
                    : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-amber-300 dark:hover:border-amber-600'
              }`}
            >
              <Icon className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} aria-hidden />
              <span>{labels[level]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
