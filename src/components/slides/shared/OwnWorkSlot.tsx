import { useMemo, useState } from 'react';
import { injectOwnWorkContext } from '../../../utils/moduleTransfer';
import CopyButton from './CopyButton';

export interface OwnWorkSlotProps {
  label?: string;
  placeholder?: string;
  template: string;
  isEn?: boolean;
}

export function OwnWorkSlot({
  label,
  placeholder,
  template,
  isEn = false,
}: OwnWorkSlotProps) {
  const [context, setContext] = useState('');
  const filled = useMemo(
    () => injectOwnWorkContext(template, context),
    [template, context]
  );
  const canInject = context.trim().length > 0;

  return (
    <div
      className="rounded-2xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20 p-5 lg:p-6 space-y-3"
      data-testid="own-work-slot"
      role="region"
      aria-label={
        label ?? (isEn ? 'Your work context' : 'Tavo darbo kontekstas')
      }
    >
      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
        {label ?? (isEn ? 'Your work context' : 'Tavo darbo kontekstas')}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {isEn
          ? 'Describe your real task – we fill it into the prompt below.'
          : 'Aprašyk tikrą užduotį – įterpsime ją į promptą apačioje.'}
      </p>
      <label className="block">
        <span className="sr-only">
          {label ?? (isEn ? 'Context' : 'Kontekstas')}
        </span>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={
            placeholder ??
            (isEn ? 'e.g. weekly report…' : 'Pvz. savaitės ataskaita…')
          }
          rows={3}
          className="w-full rounded-xl border border-violet-200 dark:border-violet-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 min-h-[88px]"
        />
      </label>
      <div className="relative bg-white/80 dark:bg-gray-800/70 rounded-xl p-4 border border-violet-200/60 dark:border-violet-700/50">
        <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
          {filled}
        </pre>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <CopyButton
          text={filled}
          variant="accent"
          title={isEn ? 'Copy prompt' : 'Kopijuoti promptą'}
          ariaLabel={isEn ? 'Copy prompt' : 'Kopijuoti promptą'}
          copiedLabel={isEn ? 'Copied' : 'Nukopijuota'}
        />
        {!canInject && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isEn
              ? 'Add context to personalize the prompt.'
              : 'Įrašyk kontekstą, kad promptas taptų asmeninis.'}
          </span>
        )}
      </div>
    </div>
  );
}
