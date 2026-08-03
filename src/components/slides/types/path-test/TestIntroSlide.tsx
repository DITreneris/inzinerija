import { useTranslation } from 'react-i18next';
import { getT } from '../../../../i18n';
import { Target, ClipboardCheck, Lightbulb, ListChecks } from 'lucide-react';
import type { Slide } from '../../../../types/modules';
import { TestKnowledgeScopeDiagram } from '../../shared';
import { typographyClasses } from '../../../../design-tokens';
import { useLocale } from '../../../../contexts/LocaleContext';
import Banner from '../../../ui/Banner';

function getWhyBenefit(slide: Slide | undefined): string | undefined {
  const c = slide?.content as { whyBenefit?: string } | undefined;
  return c?.whyBenefit;
}

function getM5TestIntroContent(slide: Slide): {
  introTitle?: string;
  introBody?: string;
  microWinPhrase?: string;
  thresholdsText?: string;
} {
  const c = slide?.content as Record<string, unknown> | undefined;
  if (!c) return {};
  return {
    introTitle: typeof c.introTitle === 'string' ? c.introTitle : undefined,
    introBody: typeof c.introBody === 'string' ? c.introBody : undefined,
    microWinPhrase:
      typeof c.microWinPhrase === 'string' ? c.microWinPhrase : undefined,
    thresholdsText:
      typeof c.thresholdsText === 'string' ? c.thresholdsText : undefined,
  };
}

/** Bendras test-intro turinys iš slide.content (M11 ir kiti moduliai) */
function getTestIntroContent(slide: Slide): {
  whyBenefit?: string;
  duration?: string;
  firstActionCTA?: string;
  microWinPhrase?: string;
  thresholds?: { pass: number; fail: number };
  thresholdExplanation?: string;
} {
  const c = slide?.content as Record<string, unknown> | undefined;
  if (!c) return {};
  const thresholds = c.thresholds as
    | { pass?: number; fail?: number }
    | undefined;
  return {
    whyBenefit: typeof c.whyBenefit === 'string' ? c.whyBenefit : undefined,
    duration: typeof c.duration === 'string' ? c.duration : undefined,
    firstActionCTA:
      typeof c.firstActionCTA === 'string' ? c.firstActionCTA : undefined,
    microWinPhrase:
      typeof c.microWinPhrase === 'string' ? c.microWinPhrase : undefined,
    thresholds:
      thresholds && typeof thresholds.pass === 'number'
        ? {
            pass: thresholds.pass,
            fail: typeof thresholds.fail === 'number' ? thresholds.fail : 0,
          }
        : undefined,
    thresholdExplanation:
      typeof c.thresholdExplanation === 'string'
        ? c.thresholdExplanation
        : undefined,
  };
}

export function TestIntroSlide({
  slide,
  moduleId,
  onGoToModule,
}: {
  slide: Slide;
  moduleId: number;
  onGoToModule?: (
    moduleId: number,
    slideIndex?: number,
    fromRemediationSourceModuleId?: number
  ) => void;
}) {
  useTranslation();
  const t = getT('testPractice');
  const { locale } = useLocale();
  const whyBenefit = getWhyBenefit(slide);
  const testIntro = getTestIntroContent(slide);
  const useContentDriven = Boolean(
    testIntro.whyBenefit && (testIntro.duration || testIntro.firstActionCTA)
  );

  if (moduleId === 5) {
    const m5Content = getM5TestIntroContent(slide);
    const title = m5Content.introTitle ?? t('m5IntroTitleDefault');
    const body = m5Content.introBody ?? t('m5IntroBodyDefault');
    const thresholds = m5Content.thresholdsText ?? t('m5ThresholdsTextDefault');
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
          {whyBenefit && (
            <p className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-3">
              {whyBenefit}
            </p>
          )}
          <h3
            className={`${typographyClasses.h2} mb-3 text-gray-900 dark:text-white`}
          >
            {title}
          </h3>
          <p
            className="text-gray-700 dark:text-gray-300 mb-4"
            dangerouslySetInnerHTML={{
              __html: body.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
          {m5Content.microWinPhrase && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-3 font-medium bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
              {m5Content.microWinPhrase}
            </p>
          )}
          <p
            className="text-sm text-brand-700 dark:text-brand-300"
            dangerouslySetInnerHTML={{
              __html: thresholds.replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
              ),
            }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Banner
            variant="info"
            className="p-5 rounded-xl border border-brand-200 dark:border-brand-800"
          >
            <h4
              className={`${typographyClasses.h2} mb-3 text-brand-900 dark:text-brand-100 flex items-center gap-2.5`}
            >
              <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
                <ListChecks
                  className="w-5 h-5 text-brand-600 dark:text-brand-400"
                  strokeWidth={1.5}
                />
              </span>
              {locale === 'en' ? 'Test structure' : 'Testo struktūra'}
            </h4>
            <ul
              className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 space-y-2`}
            >
              <li>
                {locale === 'en'
                  ? '• 4 questions (brief, structure, tool, quality check)'
                  : '• 4 klausimai (brief, struktūra, įrankis, kokybės patikra)'}
              </li>
              <li>
                {locale === 'en'
                  ? '• Each has an explanation'
                  : '• Kiekvienas turi paaiškinimą'}
              </li>
              <li>
                {locale === 'en' ? '• No time limit' : '• Nėra laiko limito'}
              </li>
            </ul>
          </Banner>
          <Banner
            variant="info"
            className="p-5 rounded-xl bg-accent-50 dark:bg-accent-900/20 border-accent-500 border border-accent-200 dark:border-accent-800"
          >
            <h4
              className={`${typographyClasses.h2} mb-3 text-accent-900 dark:text-accent-100 flex items-center gap-2.5`}
            >
              <span className="inline-flex p-2 rounded-lg bg-accent-500/10 dark:bg-accent-500/20">
                <Target
                  className="w-5 h-5 text-accent-600 dark:text-accent-400"
                  strokeWidth={1.5}
                />
              </span>
              {locale === 'en' ? 'Goal' : 'Tikslas'}
            </h4>
            <ul
              className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 space-y-2`}
            >
              <li>
                {locale === 'en'
                  ? '• Confirm the sprint was done correctly'
                  : '• Įsitikinti, kad sprintas padarytas teisingai'}
              </li>
              <li>
                {locale === 'en'
                  ? '• Quickly spot gaps'
                  : '• Greitai pastebėti spragas'}
              </li>
              <li>
                {locale === 'en'
                  ? '• ≥70% = recommended for practice'
                  : '• ≥70% = rekomenduojama į praktiką'}
              </li>
            </ul>
          </Banner>
        </div>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
          <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
            <span className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5">
              <Lightbulb
                className="w-4 h-4 text-brand-600 dark:text-brand-400"
                strokeWidth={1.5}
              />
            </span>
            <span>
              <strong>{locale === 'en' ? 'Tip:' : 'Patarimas:'}</strong>{' '}
              {t('tipUnknownAnswer')}
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (useContentDriven) {
    const title = (slide.title as string) || t('knowledgeCheckDefault');
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
          {testIntro.whyBenefit && (
            <p
              className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-3"
              role="status"
            >
              {testIntro.whyBenefit}
            </p>
          )}
          <h3
            className={`${typographyClasses.h2} mb-3 text-gray-900 dark:text-white flex items-center gap-2.5`}
          >
            <span
              className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20"
              aria-hidden="true"
            >
              <ClipboardCheck
                className="w-5 h-5 text-brand-600 dark:text-brand-400"
                strokeWidth={1.5}
              />
            </span>
            {title}
          </h3>
          {testIntro.duration && (
            <p
              className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 mb-2`}
            >
              <strong>{t('durationLabel')}</strong> {testIntro.duration}
            </p>
          )}
          {testIntro.firstActionCTA && (
            <Banner variant="info" className="rounded-lg mb-3">
              <p className="text-sm font-medium text-brand-900 dark:text-brand-100">
                {testIntro.firstActionCTA}
              </p>
            </Banner>
          )}
          {testIntro.microWinPhrase && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg mb-3">
              {testIntro.microWinPhrase}
            </p>
          )}
          {testIntro.thresholdExplanation && (
            <p className="text-sm text-brand-700 dark:text-brand-300">
              {testIntro.thresholdExplanation}
            </p>
          )}
          {testIntro.thresholds && !testIntro.thresholdExplanation && (
            <p className="text-sm text-brand-700 dark:text-brand-300">
              {t('thresholdPassHint', { pass: testIntro.thresholds.pass })}
            </p>
          )}
        </div>
        {[8, 11, 14].includes(moduleId) && (
          <TestKnowledgeScopeDiagram
            moduleId={moduleId as 8 | 11 | 14}
            locale={locale.startsWith('en') ? 'en' : 'lt'}
            onGoToModule={
              moduleId === 8 || moduleId === 11 || moduleId === 14
                ? onGoToModule
                : undefined
            }
            sourceModuleId={moduleId}
          />
        )}
        <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
          <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
            <span
              className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <Lightbulb
                className="w-4 h-4 text-brand-600 dark:text-brand-400"
                strokeWidth={1.5}
              />
            </span>
            <span>
              <strong>{t('tipLabel')}</strong> {t('tipUnknownAnswer')}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 p-6 rounded-xl border-2 border-brand-200 dark:border-brand-800">
        {whyBenefit && (
          <p className="text-sm font-medium text-brand-700 dark:text-brand-300 mb-3">
            {whyBenefit}
          </p>
        )}
        <h3
          className={`${typographyClasses.h2} mb-3 text-gray-900 dark:text-white flex items-center gap-2.5`}
        >
          <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
            <ClipboardCheck
              className="w-5 h-5 text-brand-600 dark:text-brand-400"
              strokeWidth={1.5}
            />
          </span>
          {locale === 'en' ? 'Knowledge Check' : 'Žinių Patikrinimas'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {locale === 'en'
            ? 'In this module you will check whether you understood the 6-block system. Each question has an explanation, so it is also a learning opportunity.'
            : 'Šiame modulyje patikrinsite, ar supratote 6 blokų sistemą. Kiekvienas klausimas turi paaiškinimą, todėl tai yra ir mokymosi galimybė.'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Banner
          variant="info"
          className="p-5 rounded-xl border border-brand-200 dark:border-brand-800"
        >
          <h4
            className={`${typographyClasses.h2} mb-3 text-brand-900 dark:text-brand-100 flex items-center gap-2.5`}
          >
            <span className="inline-flex p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
              <ListChecks
                className="w-5 h-5 text-brand-600 dark:text-brand-400"
                strokeWidth={1.5}
              />
            </span>
            {locale === 'en' ? 'Test structure' : 'Testo struktūra'}
          </h4>
          <ul
            className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 space-y-2`}
          >
            <li>
              {locale === 'en'
                ? '• 15 questions – 5 different formats'
                : '• 15 klausimų – 5 skirtingi formatai'}
            </li>
            <li>
              {locale === 'en'
                ? '• Multiple choice, matching, ordering'
                : '• Pasirinkimai, porų sujungimas, rikiavimas'}
            </li>
            <li>
              {locale === 'en'
                ? '• True/false and business scenarios'
                : '• Tiesa/netiesa ir verslo scenarijai'}
            </li>
            <li>
              {locale === 'en'
                ? '• Each has an explanation and a hint'
                : '• Kiekvienas turi paaiškinimą ir užuominą'}
            </li>
          </ul>
        </Banner>
        <Banner
          variant="info"
          className="p-5 rounded-xl bg-accent-50 dark:bg-accent-900/20 border-accent-500 border border-accent-200 dark:border-accent-800"
        >
          <h4
            className={`${typographyClasses.h2} mb-3 text-accent-900 dark:text-accent-100 flex items-center gap-2.5`}
          >
            <span className="inline-flex p-2 rounded-lg bg-accent-500/10 dark:bg-accent-500/20">
              <Target
                className="w-5 h-5 text-accent-600 dark:text-accent-400"
                strokeWidth={1.5}
              />
            </span>
            {locale === 'en' ? 'Goal' : 'Tikslas'}
          </h4>
          <ul
            className={`${typographyClasses.body} text-gray-700 dark:text-gray-300 space-y-2`}
          >
            <li>
              {locale === 'en'
                ? '• Reinforce knowledge in different ways'
                : '• Įtvirtinti žinias skirtingais būdais'}
            </li>
            <li>
              {locale === 'en'
                ? '• Identify gaps by block'
                : '• Identifikuoti spragas pagal blokus'}
            </li>
            <li>
              {locale === 'en'
                ? '• Prepare for practice'
                : '• Pasiruošti praktikai'}
            </li>
            <li>{locale === 'en' ? '• ≥70% = success' : '• ≥70% = sėkmė'}</li>
          </ul>
        </Banner>
      </div>
      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <p className="text-brand-800 dark:text-brand-200 text-sm flex items-start gap-2.5">
          <span className="inline-flex p-1.5 rounded-lg bg-brand-500/10 dark:bg-brand-500/20 shrink-0 mt-0.5">
            <Lightbulb
              className="w-4 h-4 text-brand-600 dark:text-brand-400"
              strokeWidth={1.5}
            />
          </span>
          <span>
            <strong>{locale === 'en' ? 'Tip:' : 'Patarimas:'}</strong>{' '}
            {t('tipUnknownAnswer')}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Resolve question type, defaulting to 'mcq' for backward compatibility */
