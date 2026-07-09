import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  Award,
  BookOpen,
  BarChart3,
  Briefcase,
  Cpu,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import Card from './ui/Card';
import CTAButton from './ui/CTAButton';
import IconChip from './ui/IconChip';
import { track } from '../utils/analytics';
import {
  getHandoutForModuleComplete,
  getUnlockedCertificateTierForModule,
} from '../data/completionArtifactsLoader';
import { downloadHandout } from '../utils/downloadHandout';
import { useLocale } from '../contexts/LocaleContext';
import type { Module } from '../types/modules';
import type { Progress } from '../utils/progress';
import { getMaxAccessibleModuleId } from '../utils/accessTier';
import { EcosystemOutboundLink } from './EcosystemOutboundLink';
import { buildEcosystemUrl, blogArticleUrl } from '../constants/ecosystemUrls';
import {
  MODULE_ECOSYSTEM_COMPLETE,
  MODULE_ECOSYSTEM_INTRO_KEYS,
  type ModuleEcosystemLinkSpec,
} from '../constants/moduleEcosystemComplete';
import { HandoutDownloadButton } from './HandoutDownloadButton';

function resolveEcosystemHref(
  spec: ModuleEcosystemLinkSpec,
  locale: string,
  moduleId: number
): string {
  switch (spec.hrefKey) {
    case 'enter':
      return buildEcosystemUrl('enter', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'anatomizer':
      return buildEcosystemUrl('anatomizer', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'use':
      return buildEcosystemUrl(locale === 'en' ? 'useEn' : 'useLt', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'hire':
      return buildEcosystemUrl('hire', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'decide':
      return buildEcosystemUrl('decide', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'play':
      return buildEcosystemUrl('play', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'map':
      return buildEcosystemUrl('map', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'manage':
      return buildEcosystemUrl('manage', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    case 'deepenBlog':
      return blogArticleUrl(spec.blogSlug ?? '', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
    default:
      return buildEcosystemUrl('map', {
        moduleId,
        touchpoint: spec.touchpoint,
      });
  }
}

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
  /** Hidden treasure: parsisiųsti sertifikatą pagal completionArtifacts registry. */
  onRequestCertificate?: (tier: 1 | 2 | 3 | 4 | 5) => void;
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
  const [handoutError, setHandoutError] = useState(false);
  const moduleCompleteHandout = getHandoutForModuleComplete(module.id);
  const maxAccessibleModuleId = getMaxAccessibleModuleId();
  // CONV-1: po Modulio 3 – upsell į kainodarą, kai dar neatrakinti moduliai 4–6.
  const showM3Upsell = module.id === 3 && maxAccessibleModuleId < 6;
  // CONV-5: po Modulio 6 – upsell į Duomenų analizės kelią (M7–9), kai tier < 9.
  const showM6Upsell = module.id === 6 && maxAccessibleModuleId < 9;
  const showM6PathChoice = module.id === 6 && maxAccessibleModuleId >= 9;
  const pricingUrl = buildEcosystemUrl('hubPricing', {
    moduleId: module.id,
    touchpoint: module.id === 6 ? 'complete_tier9_upsell' : 'complete_pricing',
  });
  const courseUrl = buildEcosystemUrl('hub', {
    moduleId: module.id,
    touchpoint: 'certificate_course_link',
  });
  const activeCertificateTier = onRequestCertificate
    ? getUnlockedCertificateTierForModule(module.id, progress)
    : null;
  const ecosystemLinks = MODULE_ECOSYSTEM_COMPLETE[module.id];
  const ecosystemIntroKey = MODULE_ECOSYSTEM_INTRO_KEYS[module.id];
  const handleModuleHandoutDownload = useCallback(async () => {
    if (!moduleCompleteHandout) return;
    try {
      setHandoutError(false);
      const lastSlide = module.slides?.[module.slides.length - 1];
      await downloadHandout(module.id, locale, {
        surface: 'module_complete',
        slideId: lastSlide?.id ?? undefined,
        ctaLabel: t(moduleCompleteHandout.ctaI18nKey),
      });
    } catch {
      setHandoutError(true);
    }
  }, [module.id, module.slides, moduleCompleteHandout, locale, t]);

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Card className="p-8 lg:p-12 text-center">
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
              {t(`module:unlockCertBodyTier${activeCertificateTier}`)}
            </p>
            <CTAButton
              variant="primary"
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
              className="px-6 py-3 min-h-[48px] bg-accent-500 hover:bg-accent-600 dark:bg-accent-500 dark:hover:bg-accent-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
              aria-label={
                t('module:unlockCertCta') +
                ' ' +
                t(`module:certAriaPart${activeCertificateTier}`)
              }
            >
              <Download className="w-5 h-5" aria-hidden />
              {t('module:unlockCertCta')}
            </CTAButton>
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <CTAButton
            variant="primary"
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
            className="order-first"
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
          </CTAButton>
          <CTAButton
            variant="secondary"
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
          >
            <ArrowLeft className="w-5 h-5" />
            {t('module:backToModules')}
          </CTAButton>
          {moduleCompleteHandout && (
            <HandoutDownloadButton
              label={t(moduleCompleteHandout.ctaI18nKey)}
              onClick={handleModuleHandoutDownload}
            />
          )}
        </div>
        {handoutError && (
          <p
            className="mt-3 text-sm text-rose-700 dark:text-rose-300"
            role="alert"
          >
            {t('common:handoutPdfError')}
          </p>
        )}

        {/* „Kur pritaikyti?“ – use-case blokas (M1, M3, M6 Faze 3 – M6 kompaktiškai) */}
        {(module.id === 1 || module.id === 3 || module.id === 6) && (
          <section
            className={`mb-8 rounded-2xl border border-brand-200 dark:border-brand-700 bg-brand-50/80 dark:bg-brand-900/20 text-left ${module.id === 6 ? 'p-4 lg:p-5' : 'p-5 lg:p-6'}`}
            aria-labelledby="use-case-heading"
          >
            <div className="flex items-center gap-3 mb-2 lg:mb-3">
              <IconChip icon={Briefcase} role="info" size="md" />
              <h3
                id="use-case-heading"
                className={`font-bold text-brand-800 dark:text-brand-200 ${module.id === 6 ? 'text-base mb-0' : 'text-lg mb-0'}`}
              >
                {t('module:useCaseHeading')}
              </h3>
            </div>
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

        {showM6PathChoice && (
          <section
            className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 p-5 lg:p-6 text-left"
            aria-labelledby="path-choice-heading"
          >
            <h3
              id="path-choice-heading"
              className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2"
            >
              {t('module:pathChoiceTitle')}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
              {t('module:pathChoiceBody')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-4">
                <div className="flex items-start gap-3">
                  <IconChip icon={BarChart3} role="info" size="md" />
                  <div>
                    <h4 className="font-semibold text-sky-900 dark:text-sky-100">
                      {t('module:pathDataTitle')}
                    </h4>
                    <p className="mt-1 text-sm text-sky-800 dark:text-sky-200">
                      {t('module:pathDataBody')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const lastSlide = module.slides?.[module.slides.length - 1];
                    track('cta_click', {
                      module_id: module.id,
                      slide_id: lastSlide?.id ?? undefined,
                      cta_id: 'm6_path_data_start',
                      cta_label: t('module:pathDataCta'),
                      destination: 'internal',
                    });
                    onContinueToNext(module.id);
                  }}
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  aria-label={t('module:pathDataAria')}
                >
                  {t('module:pathDataCta')}
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </button>
              </article>

              {maxAccessibleModuleId >= 12 && (
                <article className="rounded-xl border border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50 dark:bg-fuchsia-900/20 p-4">
                  <div className="flex items-start gap-3">
                    <IconChip icon={Cpu} role="info" size="md" />
                    <div>
                      <h4 className="font-semibold text-fuchsia-900 dark:text-fuchsia-100">
                        {t('module:pathAgentsTitle')}
                      </h4>
                      <p className="mt-1 text-sm text-fuchsia-800 dark:text-fuchsia-200">
                        {t('module:pathAgentsBody')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const lastSlide =
                        module.slides?.[module.slides.length - 1];
                      track('cta_click', {
                        module_id: module.id,
                        slide_id: lastSlide?.id ?? undefined,
                        cta_id: 'm6_path_agents_modules',
                        cta_label: t('module:pathAgentsCta'),
                        destination: 'internal',
                      });
                      onBack();
                    }}
                    className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    aria-label={t('module:pathAgentsAria')}
                  >
                    {t('module:pathAgentsCta')}
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </button>
                </article>
              )}
            </div>
          </section>
        )}

        {ecosystemLinks && ecosystemIntroKey && (
          <section
            className="mb-8 p-4 lg:p-5 rounded-2xl border-l-4 border-slate-400 bg-slate-50/80 dark:bg-slate-800/40 text-left"
            aria-labelledby="ecosystem-heading"
          >
            <h3
              id="ecosystem-heading"
              className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1"
            >
              {t('module:ecosystemHeading')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              {t(`module:${ecosystemIntroKey}`)}
            </p>
            <div className="flex flex-col gap-2 items-start">
              {ecosystemLinks.map((spec) => (
                <EcosystemOutboundLink
                  key={spec.labelKey}
                  href={resolveEcosystemHref(spec, locale, module.id)}
                  label={t(`module:${spec.labelKey}`)}
                  ariaLabel={t(`module:${spec.ariaKey}`)}
                  moduleId={module.id}
                  ctaId={spec.ctaId}
                />
              ))}
            </div>
          </section>
        )}

        {/* CONV-1: M3 completion upsell – atrakinti M4–M6 (kainodara) */}
        {showM3Upsell && (
          <section
            className="mb-8 p-5 lg:p-6 rounded-2xl border-2 border-accent-300 dark:border-accent-600 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/25 dark:to-brand-900/20 text-center"
            aria-labelledby="m3-upsell-heading"
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 dark:bg-accent-500 text-white mb-3"
              aria-hidden
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <h3
              id="m3-upsell-heading"
              className="text-lg font-bold text-accent-800 dark:text-accent-200 mb-1"
            >
              {t('module:upsellM3Title')}
            </h3>
            <p className="text-sm text-accent-700 dark:text-accent-300 mb-4 max-w-md mx-auto">
              {t('module:upsellM3Body')}
            </p>
            <a
              href={pricingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track('pricing_click', {
                  module_id: module.id,
                  cta_id: 'm3_upsell_pricing',
                  cta_label: t('module:upsellM3Cta'),
                  destination: 'external',
                });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={t('module:upsellM3Aria')}
            >
              {t('module:upsellM3Cta')}
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </section>
        )}

        {/* CONV-5: M6 completion upsell – Duomenų analizės kelias M7–9 (tier 9) */}
        {showM6Upsell && (
          <section
            className="mb-8 p-5 lg:p-6 rounded-2xl border-2 border-accent-300 dark:border-accent-600 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/25 dark:to-brand-900/20 text-center"
            aria-labelledby="m6-upsell-heading"
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-500 dark:bg-accent-500 text-white mb-3"
              aria-hidden
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <h3
              id="m6-upsell-heading"
              className="text-lg font-bold text-accent-800 dark:text-accent-200 mb-1"
            >
              {t('module:upsellM6Title')}
            </h3>
            <p className="text-sm text-accent-700 dark:text-accent-300 mb-4 max-w-md mx-auto">
              {t('module:upsellM6Body')}
            </p>
            <a
              href={pricingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track('pricing_click', {
                  module_id: module.id,
                  cta_id: 'm6_upsell_tier9',
                  cta_label: t('module:upsellM6Cta'),
                  destination: 'external',
                });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={t('module:upsellM6Aria')}
            >
              {t('module:upsellM6Cta')}
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          </section>
        )}

        {activeCertificateTier != null && (
          <p className="mt-4 text-center">
            <a
              href={courseUrl}
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
            <CTAButton
              variant="secondary"
              onClick={onViewPart1Summary}
              className="px-4 py-2 text-sm font-medium"
              aria-label={t('module:viewPart1SummaryAria')}
            >
              <BookOpen className="w-4 h-4 shrink-0" aria-hidden />
              {t('module:viewPart1SummaryLabel')}
            </CTAButton>
          </div>
        )}
      </Card>
    </div>
  );
}
