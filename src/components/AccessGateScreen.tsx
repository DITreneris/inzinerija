import { Lock, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { track, trackSpinoffClick } from '../utils/analytics';
import { buildEcosystemUrl } from '../constants/ecosystemUrls';

const PRICING_URL = buildEcosystemUrl('hubPricing', {
  moduleId: 0,
  touchpoint: 'access_gate_pricing',
});
const ENTER_URL = buildEcosystemUrl('enter', {
  moduleId: 0,
  touchpoint: 'access_gate',
});

export default function AccessGateScreen() {
  const { t } = useTranslation('modulesPage');

  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="card max-w-md w-full p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-100 to-accent-100 dark:from-brand-900/30 dark:to-accent-900/30 mb-6">
          <Lock
            className="w-8 h-8 text-brand-600 dark:text-brand-400"
            strokeWidth={1.5}
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t('gateTitle')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {t('gateMessage')}
        </p>
        <a
          href={PRICING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            track('pricing_click', {
              module_id: 0,
              cta_id: 'access_gate_pricing',
              cta_label: t('gateCta'),
              destination: 'external',
            });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          {t('gateCta')}
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <a
            href={ENTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackSpinoffClick({
                module_id: 0,
                url: ENTER_URL,
                cta_id: 'spinoff_enter',
                cta_label: t('gateFreeLesson'),
              })
            }
            className="text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            aria-label={t('gateFreeLessonAria')}
          >
            {t('gateFreeLesson')}
          </a>
        </p>
      </div>
    </div>
  );
}
