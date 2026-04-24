import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  Award,
  BookOpen,
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import { track } from '../utils/analytics';
import {
  downloadM6HandoutPdf,
  type M6HandoutContent,
} from '../utils/m6HandoutPdf';
import { getM6HandoutContent } from '../data/handoutContentLoader';
import { useLocale } from '../contexts/LocaleContext';
import type { Module } from '../types/modules';
import type { Progress } from '../utils/progress';
import { canRequestCertificateTier3 } from '../utils/certificateEligibility';

export interface ModuleCompleteScreenProps {
  module: Module;
  moduleIndex: number;
  totalModules: number;
  modules: Module[];
  progress: Progress;
  onBack: () => void;
  onContinueToNext: (moduleId: number) => void;
  isLastModule: boolean;
  /** Po Modulio 3: grįžti į „1 dalies santraukos“ skaidrę (be „grįžti du kartus“). */
  onViewPart1Summary?: () => void;
  /** Hidden treasure: parsisiųsti sertifikatą. Tier 1 po 3 mod., tier 2 po 6 mod. + apklausa ≥70%, tier 3 po 7–9 + M8 testas ≥70%. */
  onRequestCertificate?: (tier: 1 | 2 | 3) => void;
}

export function ModuleCompleteScreen({
  module,
  moduleIndex,
  totalModules,
  modules,
  progress,
  onBack,
  onContinueToNext,
  isLastModule,
  onViewPart1Summary,
  onRequestCertificate,
}: ModuleCompleteScreenProps) {
  const { t } = useTranslation(['module', 'common']);
  const { locale } = useLocale();
  const canRequestTier1 =
    progress.completedModules.includes(1) &&
    progress.completedModules.includes(2) &&
    progress.completedModules.includes(3);
  const canRequestTier2 =
    progress.completedModules.length >= 6 &&
    progress.quizCompleted &&
    (progress.quizScore ?? 0) >= 70;
  const showCertTier1 =
    module.id === 3 && canRequestTier1 && onRequestCertificate;
  const showCertTier2 =
    module.id === 6 && canRequestTier2 && onRequestCertificate;
  const showCertTier3 =
    module.id === 9 &&
    canRequestCertificateTier3(progress) &&
    onRequestCertificate;
  const activeCertificateTier: 1 | 2 | 3 | null = showCertTier1
    ? 1
    : showCertTier2
      ? 2
      : showCertTier3
        ? 3
        : null;
  const handleM6HandoutDownload = useCallback(async () => {
    const content = getM6HandoutContent(locale) as M6HandoutContent;
    await downloadM6HandoutPdf(content, undefined, locale);
    const lastSlide = module.slides?.[module.slides.length - 1];
    track('cta_click', {
      module_id: module.id,
      slide_id: lastSlide?.id ?? undefined,
      cta_id: 'm6_handout_pdf',
      cta_label: t('module:handoutCtaLabel'),
      destination: 'download',
    });
  }, [module.id, module.slides, locale, t]);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="card p-8 lg:p-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-50 to-brand-50 dark:from-emerald-900/30 dark:to-brand-900/20 border-2 border-emerald-200 dark:border-emerald-700">
            <CheckCircle className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('completeTitle')} 🎉
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          {module.title}
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <div className="badge-brand">
            {t('moduleNOfTotal', { n: moduleIndex + 1, total: totalModules })}
          </div>
          <div className="badge-success">
            <CheckCircle className="w-4 h-4 mr-1" />
            {t('completeBadge')}
          </div>
        </div>

        <div className="mb-8">
          <CircularProgress
            progress={
              totalModules > 0
                ? (progress.completedModules.length / totalModules) * 100
                : 0
            }
            size={140}
            strokeWidth={12}
            label={t('module:progressLabel')}
          />
        </div>

        {/* Hidden treasure: atrakinto sertifikato „discovery“ blokas (Unlock Features pattern) */}
        {activeCertificateTier != null && (
          <div
            className="mb-8 p-5 lg:p-6 rounded-2xl border-2 border-accent-300 dark:border-accent-600 bg-accent-50 dark:bg-accent-900/25 text-center"
            role="region"
            aria-label={t('module:unlockCertTitle')}
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-400 dark:bg-accent-500 text-white mb-3"
              aria-hidden
            >
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-accent-800 dark:text-accent-200 mb-1">
              {t('module:unlockCertTitle')}
            </h3>
            <p className="text-sm text-accent-700 dark:text-accent-300 mb-4">
              {activeCertificateTier === 1
                ? t('module:unlockCertBodyTier1')
                : activeCertificateTier === 2
                  ? t('module:unlockCertBodyTier2')
                  : t('module:unlockCertBodyTier3')}
            </p>
            <button
              type="button"
              onClick={() => {
                const lastSlide = module.slides?.[module.slides.length - 1];
                track('cta_click', {
                  module_id: module.id,
                  slide_id: lastSlide?.id ?? undefined,
                  cta_id: `request_certificate_tier${activeCertificateTier}`,
                  cta_label: t('module:unlockCertCta'),
                  destination: 'internal',
                });
                onRequestCertificate!(activeCertificateTier);
              }}
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-accent-500 hover:bg-accent-600 dark:bg-accent-500 dark:hover:bg-accent-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
              aria-label={
                t('module:unlockCertCta') +
                ' ' +
                (activeCertificateTier === 1
                  ? t('module:certAriaPart1')
                  : activeCertificateTier === 2
                    ? t('module:certAriaPart2')
                    : t('module:certAriaPart3'))
              }
            >
              <Download className="w-5 h-5" aria-hidden />
              {t('module:unlockCertCta')}
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <button
            onClick={() => {
              const lastSlide = module.slides?.[module.slides.length - 1];
              track('cta_click', {
                module_id: module.id,
                slide_id: lastSlide?.id ?? undefined,
                cta_id: 'next_module',
                cta_label: isLastModule
                  ? t('module:startQuiz')
                  : t('module:continueToNextModule'),
                destination: 'internal',
              });
              onContinueToNext(module.id);
            }}
            className="btn-primary flex items-center justify-center gap-2 order-first"
          >
            {isLastModule ? (
              <>
                {t('module:startQuiz')}
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                {t('module:continueToNextModule')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <button
            onClick={() => {
              const lastSlide = module.slides?.[module.slides.length - 1];
              track('cta_click', {
                module_id: module.id,
                slide_id: lastSlide?.id ?? undefined,
                cta_id: 'back_to_modules',
                cta_label: t('module:backToModules'),
                destination: 'internal',
              });
              onBack();
            }}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('module:backToModules')}
          </button>
          {module.id === 6 && (
            <button
              type="button"
              onClick={handleM6HandoutDownload}
              className="btn-secondary flex items-center justify-center gap-2"
              aria-label={t('module:handoutCtaLabel')}
            >
              <Download className="w-5 h-5" aria-hidden />
              {t('module:handoutCtaLabel')}
            </button>
          )}
        </div>

        {/* „Kur pritaikyti?“ – use-case blokas (M1, M3, M6 Faze 3 – M6 kompaktiškai) */}
        {(module.id === 1 || module.id === 3 || module.id === 6) && (
          <section
            className={`mb-8 rounded-2xl border border-brand-200 dark:border-brand-700 bg-brand-50/80 dark:bg-brand-900/20 text-left ${module.id === 6 ? 'p-4 lg:p-5' : 'p-5 lg:p-6'}`}
            aria-labelledby="use-case-heading"
          >
            <h3
              id="use-case-heading"
              className={`font-bold text-brand-800 dark:text-brand-200 ${module.id === 6 ? 'text-base mb-2' : 'text-lg mb-3'}`}
            >
              {t('module:useCaseHeading')}
            </h3>
            <ul
              className={`space-y-1.5 text-brand-700 dark:text-brand-300 list-disc list-inside ${module.id === 6 ? 'text-xs lg:text-sm' : 'text-sm'}`}
              aria-label={t('module:useCaseHeading')}
            >
              {module.id === 1 && (
                <>
                  <li>{t('module:useCaseM1_1')}</li>
                  <li>{t('module:useCaseM1_2')}</li>
                  <li>{t('module:useCaseM1_3')}</li>
                  <li>{t('module:useCaseM1_4')}</li>
                </>
              )}
              {module.id === 3 && (
                <>
                  <li>{t('module:useCaseM3_1')}</li>
                  <li>{t('module:useCaseM3_2')}</li>
                  <li>{t('module:useCaseM3_3')}</li>
                  <li>{t('module:useCaseM3_4')}</li>
                </>
              )}
              {module.id === 6 && (
                <>
                  <li>{t('module:useCaseM6_1')}</li>
                  <li>{t('module:useCaseM6_2')}</li>
                  <li>{t('module:useCaseM6_3')}</li>
                  <li>{t('module:useCaseM6_4')}</li>
                </>
              )}
            </ul>
          </section>
        )}

        {activeCertificateTier != null && (
          <p className="mt-4 text-center">
            <a
              href="https://www.promptanatomy.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-600 dark:text-brand-400 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-1 py-0.5"
              aria-label={t('module:courseLinkAria')}
            >
              {t('module:courseLinkText')}
            </a>
          </p>
        )}

        {!isLastModule && modules[moduleIndex + 1] && (
          <div className="mt-8 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-200 dark:border-brand-800">
            <p className="text-sm text-brand-700 dark:text-brand-300 font-medium">
              {t('module:nextLabel')} {modules[moduleIndex + 1].title}
            </p>
            <p className="text-xs text-brand-600 dark:text-brand-400 mt-1">
              {modules[moduleIndex + 1].subtitle}
            </p>
          </div>
        )}

        {module.id === 3 && onViewPart1Summary && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onViewPart1Summary}
              className="btn-secondary inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium"
              aria-label={t('module:viewPart1SummaryAria')}
            >
              <BookOpen className="w-4 h-4 shrink-0" aria-hidden />
              {t('module:viewPart1SummaryLabel')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
