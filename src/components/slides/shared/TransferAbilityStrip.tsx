/** Before → After + firstAction24h strip (GOLDEN §3.4f). */

export interface TransferAbilityStripProps {
  abilityBefore?: string;
  abilityAfter?: string;
  firstAction24h?: string;
  isEn?: boolean;
  className?: string;
}

export function TransferAbilityStrip({
  abilityBefore,
  abilityAfter,
  firstAction24h,
  isEn = false,
  className = '',
}: TransferAbilityStripProps) {
  const hasAbility = Boolean(abilityBefore?.trim() && abilityAfter?.trim());
  const hasAction = Boolean(firstAction24h?.trim());
  if (!hasAbility && !hasAction) return null;

  return (
    <div
      className={`space-y-4 ${className}`}
      data-testid="transfer-ability-strip"
    >
      {hasAbility && (
        <div
          className="rounded-2xl border-2 border-brand-200 dark:border-brand-700 bg-brand-50/60 dark:bg-brand-900/20 p-5 lg:p-6"
          role="region"
          aria-label={isEn ? 'Before and after' : 'Prieš ir po'}
        >
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {isEn ? 'Before → After' : 'Prieš → Po'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                {isEn ? 'Before' : 'Prieš'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {abilityBefore}
              </p>
            </div>
            <div className="rounded-xl bg-white/80 dark:bg-gray-800/70 border border-emerald-200 dark:border-emerald-800 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-1">
                {isEn ? 'After' : 'Po'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {abilityAfter}
              </p>
            </div>
          </div>
        </div>
      )}
      {hasAction && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-accent-200 dark:border-accent-700 bg-accent-50/50 dark:bg-accent-900/20 p-5 lg:p-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {isEn ? 'First action in 24–48h' : 'Pirmas veiksmas per 24–48 val.'}
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {firstAction24h}
          </p>
        </div>
      )}
    </div>
  );
}
