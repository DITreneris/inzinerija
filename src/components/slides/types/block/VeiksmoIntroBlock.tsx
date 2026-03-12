import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import type { AdvancedVeiksmoIntroContent } from '../../../../types/modules';
import { renderBodyWithBold } from '../shared';

export function VeiksmoIntroBlock({
  content,
}: {
  content: NonNullable<AdvancedVeiksmoIntroContent['veiksmoIntro']>;
}) {
  useTranslation();
  const t = getT('contentSlides');
  const { trumpai, darykDabar, patikra } = content;
  if (!trumpai && !darykDabar && !patikra) return null;
  const steps = [
    trumpai ? { label: t('veiksmoStep1Label'), time: t('veiksmoTime30s'), text: trumpai } : null,
    darykDabar ? { label: t('veiksmoStep2Label'), time: t('veiksmoTime2_7min'), text: darykDabar } : null,
    patikra ? { label: t('veiksmoStep3Label'), time: t('veiksmoTime1min'), text: patikra } : null,
  ].filter(Boolean) as { label: string; time: string; text: string }[];

  return (
    <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl border-l-4 border-accent-500 border border-accent-200 dark:border-accent-800 p-4 sm:p-5 mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {steps.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 border border-accent-200 dark:border-accent-700 text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="font-bold text-accent-700 dark:text-accent-300">{s.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({s.time})</span>
            </span>
            {i < steps.length - 1 && <span className="text-accent-400 dark:text-accent-600 text-sm" aria-hidden="true">→</span>}
          </span>
        ))}
      </div>
      <details className="group">
        <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-semibold text-accent-700 dark:text-accent-300 hover:text-accent-800 dark:hover:text-accent-200 transition-colors select-none min-h-[44px]">
          <span>{t('veiksmoViewSteps')}</span>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="mt-3 space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-accent-100 dark:border-accent-900/30">
              <p className="text-xs font-bold text-accent-700 dark:text-accent-300 mb-1">{s.label} ({s.time})</p>
              <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{renderBodyWithBold(s.text)}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
