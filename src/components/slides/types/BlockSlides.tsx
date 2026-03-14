import { useTranslation } from 'react-i18next';
import { getT } from '../../../i18n';
import { CheckCircle, FileText, Lightbulb, Target, Sparkles } from 'lucide-react';
import { CopyButton, TemplateBlock } from '../shared';
import { getColorClasses } from '../utils/colorStyles';
import type { QualityCriteria, FullExampleBlock, Slide } from '../../../types/modules';
import { VeiksmoIntroBlock } from './block/VeiksmoIntroBlock';
import { AdvancedBlockSlide, type AdvancedBlockSlideProps } from './block/AdvancedBlockSlide';
export { AdvancedBlockSlide };
export type { AdvancedBlockSlideProps };

/** Optional "Why it works" (or other) sections on block slides – collapsible details. */
function OptionalWhySections({ slide }: { slide?: Slide }) {
  useTranslation();
  const t = getT('contentSlides');
  const content = slide?.content as { sections?: Array<{ heading?: string; body: string; collapsible?: boolean; collapsedByDefault?: boolean; blockVariant?: string }> } | undefined;
  const sections = content?.sections;
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((sec, idx) => (
        <details
          key={idx}
          className="group bg-slate-50 dark:bg-slate-800/60 border-l-4 border-slate-400 dark:border-slate-500 rounded-r-xl overflow-hidden"
          open={sec.collapsedByDefault === false}
        >
          <summary className="cursor-pointer list-none flex items-center justify-between p-4 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-colors select-none min-h-[44px]">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{sec.heading || t('blockWhyHeading')}</h4>
            <span className="text-slate-400 dark:text-slate-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
          </summary>
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{sec.body}</p>
          </div>
        </details>
      ))}
    </>
  );
}

export function MetaBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const goodExample = t('blockMetaGoodExample');
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-6 rounded-xl">
        <h3 className="font-bold text-xl mb-3 text-rose-900 dark:text-rose-100">
          {t('blockMetaQuestion')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {t('blockMetaBody')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-xl border-2 border-rose-200 dark:border-rose-800 relative">
          <div className="flex justify-between items-start mb-3">
            <span className="badge bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">{t('blockMetaBadLabel')}</span>
            <CopyButton text={t('blockMetaBadExample')} size="sm" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">{t('blockMetaBadExample')}</p>
          <p className="text-xs text-rose-600 dark:text-rose-400">{t('blockMetaBadProblem')}</p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 relative">
          <div className="flex justify-between items-start mb-3">
            <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{t('blockMetaGoodLabel')}</span>
            <CopyButton text={goodExample} size="sm" />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            {goodExample}
          </p>
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
        <h4 className="font-bold mb-3 text-brand-900 dark:text-brand-100">{t('blockMetaComponentsTitle')}</h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li><strong className="text-brand-700 dark:text-brand-300">{t('blockMetaRole')}</strong></li>
          <li><strong className="text-brand-700 dark:text-brand-300">{t('blockMetaDomainContext')}</strong></li>
          <li><strong className="text-brand-700 dark:text-brand-300">{t('blockMetaAudience')}</strong></li>
          <li><strong className="text-brand-700 dark:text-brand-300">{t('blockMetaBusinessContext')}</strong></li>
        </ul>
      </div>

      <TemplateBlock label={t('blockMetaTemplateLabel')} template={t('blockMetaTemplate')} />
      {onRenderTask()}
    </div>
  );
}

export function InputBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const inputItems = [t('blockInputItem1'), t('blockInputItem2'), t('blockInputItem3'), t('blockInputItem4')];
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-xl">
        <h3 className="font-bold text-xl mb-3 text-orange-900 dark:text-orange-100">
          {t('blockInputQuestion')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {t('blockInputBody')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-700">
          <h4 className="font-bold mb-3 text-gray-900 dark:text-white">{t('blockInputWhatToInclude')}</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
            {inputItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-200 dark:border-rose-800">
            <p className="text-xs text-rose-700 dark:text-rose-400 font-bold mb-2 uppercase tracking-wider">{t('blockInputBadLabel')}</p>
            <p className="text-sm italic text-gray-600 dark:text-gray-400">{t('blockInputBadExample')}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-2 uppercase tracking-wider">{t('blockInputGoodLabel')}</p>
            <p className="text-sm italic text-gray-700 dark:text-gray-300">
              {t('blockInputGoodExample')}
            </p>
          </div>
        </div>
      </div>

      <TemplateBlock label={t('blockInputTemplateLabel')} template={t('blockInputTemplate')} />
      {onRenderTask()}
    </div>
  );
}

export function OutputBlockSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const structureItems = [t('blockOutputStructure1'), t('blockOutputStructure2'), t('blockOutputStructure3'), t('blockOutputStructure4')];
  const reqItems = [t('blockOutputReq1'), t('blockOutputReq2'), t('blockOutputReq3'), t('blockOutputReq4')];
  const formatItems = [t('blockOutputFormat1'), t('blockOutputFormat2'), t('blockOutputFormat3'), t('blockOutputFormat4'), t('blockOutputFormat5')];
  const reqListItems = [t('blockOutputReqItem1'), t('blockOutputReqItem2'), t('blockOutputReqItem3'), t('blockOutputReqItem4'), t('blockOutputReqItem5')];
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-xl">
        <h3 className="font-bold text-xl mb-3 text-orange-900 dark:text-orange-100">
          {t('blockOutputQuestion')}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {t('blockOutputBody')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-white">{t('blockOutputExampleTitle')}</h4>
        <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl text-sm mb-3">
          <p className="text-brand-700 dark:text-brand-300 mb-2 font-semibold">{t('blockOutputFormatLabel')}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-3">{t('blockOutputStructureLabel')}</p>
          <ol className="space-y-1 text-gray-700 dark:text-gray-300 list-decimal list-inside ml-2">
            {structureItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-sm">
          <p className="text-emerald-700 dark:text-emerald-300 mb-2 font-semibold">{t('blockOutputRequirementsTitle')}</p>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            {reqItems.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl">
          <h4 className="font-bold mb-3 text-brand-900 dark:text-brand-100">{t('blockOutputFormatTypesTitle')}</h4>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            {formatItems.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl">
          <h4 className="font-bold mb-3 text-emerald-900 dark:text-emerald-100">{t('blockOutputRequirementsListTitle')}</h4>
          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
            {reqListItems.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <TemplateBlock label={t('blockOutputTemplateLabel')} template={t('blockOutputTemplate')} />
      {onRenderTask()}
    </div>
  );
}

export function ReasoningModelsSlide({ slide, onRenderTask }: { slide?: Slide; onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const intro = slide?.content && 'veiksmoIntro' in slide.content ? slide.content.veiksmoIntro : null;
  const cotExample = t('blockReasoningModelsCotExample');
  const totExample = t('blockReasoningModelsTotExample');
  const cotTemplate = t('blockReasoningModelsCotTemplate');
  const totTemplate = t('blockReasoningModelsTotTemplate');

  return (
    <div className="space-y-6">
      {intro && <VeiksmoIntroBlock content={intro} />}

      <div className="bg-gradient-to-r from-gray-900 to-brand-900 p-5 rounded-xl text-white">
        <p className="text-sm text-brand-200 mb-1">{t('blockReasoningModelsHero1')}</p>
        <h3 className="font-bold text-lg">{t('blockReasoningModelsHero2')}</h3>
        <p className="text-sm text-gray-300 mt-2">
          {t('blockReasoningModelsHero3')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <img
          src={`${import.meta.env.BASE_URL || '/'}mastymo_modeliai.png`}
          alt={t('blockReasoningModelsImgAlt')}
          className="w-full h-auto object-contain rounded-lg max-h-72"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          {t('blockReasoningModelsImgCaption')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl border-2 border-brand-200 dark:border-brand-800" role="article" aria-label={t('blockReasoningModelsCotTitle')}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">🔗</span>
            <div>
              <p className="font-bold text-brand-900 dark:text-brand-100">{t('blockReasoningModelsCotTitle')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('blockReasoningModelsCotSub')}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{t('blockReasoningModelsCotDesc')}</p>
          <span className="inline-block px-2 py-0.5 rounded-full bg-brand-200 dark:bg-brand-800 text-brand-800 dark:text-brand-200 text-xs font-medium">{t('blockReasoningModelsCotBadge')}</span>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800" role="article" aria-label={t('blockReasoningModelsTotTitle')}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">🌳</span>
            <div>
              <p className="font-bold text-emerald-900 dark:text-emerald-100">{t('blockReasoningModelsTotTitle')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('blockReasoningModelsTotSub')}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{t('blockReasoningModelsTotDesc')}</p>
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-medium">{t('blockReasoningModelsTotBadge')}</span>
        </div>
      </div>

      <details className="group bg-gradient-to-br from-brand-50 to-cyan-50 dark:from-brand-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-brand-200 dark:border-brand-800 overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-brand-50/80 dark:hover:bg-brand-900/30 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">🔗</span>
            <h4 className="font-bold text-lg text-brand-900 dark:text-brand-100">{t('blockReasoningModelsCotDetailsHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">{t('blockReasoningModelsWhenUse')}</p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• {t('blockReasoningModelsCotUse1')}</li>
                <li>• {t('blockReasoningModelsCotUse2')}</li>
                <li>• {t('blockReasoningModelsCotUse3')}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">{t('blockReasoningModelsFits')}</p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• {t('blockReasoningModelsCotFits1')}</li>
                <li>• {t('blockReasoningModelsCotFits2')}</li>
                <li>• {t('blockReasoningModelsCotFits3')}</li>
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg relative">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider">{t('blockReasoningModelsExampleLabel')}</span>
              <CopyButton text={cotExample} size="sm" />
            </div>
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">{cotExample}</pre>
          </div>
        </div>
      </details>

      <details className="group bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/30 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/30 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">🌳</span>
            <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-100">{t('blockReasoningModelsTotDetailsHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">{t('blockReasoningModelsWhenUse')}</p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• {t('blockReasoningModelsTotUse1')}</li>
                <li>• {t('blockReasoningModelsTotUse2')}</li>
                <li>• {t('blockReasoningModelsTotUse3')}</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">{t('blockReasoningModelsFits')}</p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>• {t('blockReasoningModelsTotFits1')}</li>
                <li>• {t('blockReasoningModelsTotFits2')}</li>
                <li>• {t('blockReasoningModelsTotFits3')}</li>
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg relative">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">{t('blockReasoningModelsExampleLabel')}</span>
              <CopyButton text={totExample} size="sm" />
            </div>
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded-lg overflow-x-auto">{totExample}</pre>
          </div>
        </div>
      </details>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TemplateBlock label={t('blockReasoningModelsCotTemplateLabel')} template={cotTemplate} />
        <TemplateBlock label={t('blockReasoningModelsTotTemplateLabel')} template={totTemplate} />
      </div>

      <OptionalWhySections slide={slide} />

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border-l-4 border-amber-500 flex flex-wrap items-center gap-3">
        <span className="text-lg" aria-hidden="true">⚠️</span>
        <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
          {t('blockReasoningModelsWarning')}
        </p>
      </div>

      {onRenderTask()}
    </div>
  );
}

export function ReasoningBlockSlide({ slide, onRenderTask }: { slide?: Slide; onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const intro = slide?.content && 'veiksmoIntro' in slide.content ? slide.content.veiksmoIntro : null;
  const steps = [
    { num: 1, step: t('blockReasoningStep1'), desc: t('blockReasoningStep1Desc') },
    { num: 2, step: t('blockReasoningStep2'), desc: t('blockReasoningStep2Desc') },
    { num: 3, step: t('blockReasoningStep3'), desc: t('blockReasoningStep3Desc') },
    { num: 4, step: t('blockReasoningStep4'), desc: t('blockReasoningStep4Desc') },
    { num: 5, step: t('blockReasoningStep5'), desc: t('blockReasoningStep5Desc') },
    { num: 6, step: t('blockReasoningStep6'), desc: t('blockReasoningStep6Desc') },
  ];
  const liteSteps = [t('blockReasoningLiteStep1'), t('blockReasoningLiteStep2'), t('blockReasoningLiteStep3')];
  const example1 = t('blockReasoningExample1');
  const example2 = t('blockReasoningExample2');
  const fullTemplate = t('blockReasoningFullTemplate');

  return (
    <div className="space-y-6">
      {intro && <VeiksmoIntroBlock content={intro} />}

      <div className="bg-gradient-to-r from-gray-900 to-amber-900 p-5 rounded-xl text-white">
        <p className="text-sm text-amber-300 mb-1">{t('blockReasoningHero1')}</p>
        <h3 className="font-bold text-lg">{t('blockReasoningHero2')}</h3>
        <p className="text-sm text-gray-300 mt-2">{t('blockReasoningHero3')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800" role="article" aria-label={t('blockReasoningUseWhen')}>
          <h4 className="font-bold mb-2 text-emerald-900 dark:text-emerald-100 flex items-center gap-2 text-sm">
            <span>✅</span> {t('blockReasoningUseWhen')}
          </h4>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• {t('blockReasoningUse1')}</li>
            <li>• {t('blockReasoningUse2')}</li>
            <li>• {t('blockReasoningUse3')}</li>
          </ul>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border-2 border-rose-200 dark:border-rose-800" role="article" aria-label={t('blockReasoningDontUse')}>
          <h4 className="font-bold mb-2 text-rose-900 dark:text-rose-100 flex items-center gap-2 text-sm">
            <span>❌</span> {t('blockReasoningDontUse')}
          </h4>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• {t('blockReasoningDont1')}</li>
            <li>• {t('blockReasoningDont2')}</li>
            <li>• {t('blockReasoningDont3')}</li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl border-2 border-brand-200 dark:border-brand-800" role="article" aria-label={t('blockReasoningLiteTitle')}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h4 className="font-bold text-base text-brand-900 dark:text-brand-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400" strokeWidth={1.5} />
            {t('blockReasoningLiteTitle')}
          </h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-200 dark:bg-brand-800 text-brand-800 dark:text-brand-200 font-medium">{t('blockReasoningLiteBadge')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {liteSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg">
              <span className="text-brand-600 dark:text-brand-400 font-bold text-sm">{idx + 1}.</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <details className="group bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/30 rounded-xl overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-brand-50/80 dark:hover:bg-brand-900/30 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">🧠</span>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('blockReasoningFullHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-2">
          {steps.map((item) => (
            <div key={item.num} className="flex gap-3 items-start bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center font-bold text-sm text-brand-700 dark:text-brand-300 flex-shrink-0">
                {item.num}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.step}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </details>

      <details className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">📋</span>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('blockReasoningExamplesHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-4">
          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border-l-4 border-violet-500">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">{t('blockReasoningExample1Label')}</span>
              <CopyButton text={example1} size="sm" />
            </div>
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-white dark:bg-gray-800 p-3 rounded-lg overflow-x-auto">{example1}</pre>
          </div>
          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border-l-4 border-violet-500">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">{t('blockReasoningExample2Label')}</span>
              <CopyButton text={example2} size="sm" />
            </div>
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-white dark:bg-gray-800 p-3 rounded-lg overflow-x-auto">{example2}</pre>
          </div>
        </div>
      </details>

      <TemplateBlock label={t('blockReasoningTemplateLabel')} template={fullTemplate} />

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border-l-4 border-amber-500">
        <div className="flex items-start gap-2">
          <span className="text-lg shrink-0" aria-hidden="true">⚠️</span>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{t('blockReasoningWarning1')}</p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 font-semibold">{t('blockReasoningWarning2')}</p>
          </div>
        </div>
      </div>

      <OptionalWhySections slide={slide} />
      {onRenderTask()}
    </div>
  );
}

export function QualityBlockSlide({ slide, onRenderTask }: { slide?: Slide; onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const intro = slide?.content && 'veiksmoIntro' in slide.content ? slide.content.veiksmoIntro : null;
  const criteria: QualityCriteria[] = [
    { text: t('blockQualityC1'), color: 'brand' },
    { text: t('blockQualityC2'), color: 'emerald' },
    { text: t('blockQualityC3'), color: 'amber' },
    { text: t('blockQualityC4'), color: 'violet' },
    { text: t('blockQualityC5'), color: 'rose' },
  ];
  const reasoningCriteria = [t('blockQualityRq1'), t('blockQualityRq2'), t('blockQualityRq3'), t('blockQualityRq4'), t('blockQualityRq5')];
  const redFlags = [t('blockQualityRed1'), t('blockQualityRed2'), t('blockQualityRed3'), t('blockQualityRed4'), t('blockQualityRed5')];

  return (
    <div className="space-y-6">
      {intro && <VeiksmoIntroBlock content={intro} />}

      <div className="bg-gradient-to-r from-gray-900 to-emerald-900 p-5 rounded-xl text-white">
        <p className="text-sm text-emerald-300 mb-1">{t('blockQualityHero1')}</p>
        <h3 className="font-bold text-lg">{t('blockQualityHero2')}</h3>
        <p className="text-sm text-gray-300 mt-2">{t('blockQualityHero3')}</p>
      </div>

      <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-300 dark:border-rose-700 p-5 rounded-xl">
        <h4 className="font-bold text-base mb-3 text-rose-900 dark:text-rose-100">{t('blockQualityNotEqual')}</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{t('blockQualityNotEqualBody')}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 p-3 rounded-lg" role="article" aria-label={t('blockQualityBadLabel')}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">❌</span>
              <span className="font-bold text-sm text-red-900 dark:text-red-100">{t('blockQualityBadLabel')}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('blockQualityBadDesc')}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 p-3 rounded-lg" role="article" aria-label={t('blockQualityGoodLabel')}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">✅</span>
              <span className="font-bold text-sm text-emerald-900 dark:text-emerald-100">{t('blockQualityGoodLabel')}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('blockQualityGoodDesc')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold mb-3 text-gray-900 dark:text-white text-base">{t('blockQualityCriteriaTitle')}</h4>
        <div className="space-y-1.5 text-sm">
          {criteria.map((item, idx) => {
            const colors = getColorClasses(item.color);
            return (
              <div key={idx} className={`flex items-center gap-2 p-2.5 ${colors.bg} ${colors.bgDark} rounded-lg`}>
                <CheckCircle className={`w-4 h-4 ${colors.text} ${colors.textDark} flex-shrink-0`} />
                <span className="text-gray-700 dark:text-gray-300 text-sm">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <details className="group bg-violet-50 dark:bg-violet-900/20 rounded-xl border-2 border-violet-300 dark:border-violet-700 overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-violet-100/50 dark:hover:bg-violet-900/30 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">🧠</span>
            <h4 className="font-bold text-lg text-violet-900 dark:text-violet-100">{t('blockQualityReasoningHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-1.5 text-sm">
          {reasoningCriteria.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-violet-600 dark:text-violet-400 font-bold mt-0.5 shrink-0">•</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </details>

      <details className="group bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-300 dark:border-amber-700 overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">🚩</span>
            <h4 className="font-bold text-lg text-amber-900 dark:text-amber-100">{t('blockQualityRedFlagsHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-1.5 text-sm">
          {redFlags.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 bg-white dark:bg-gray-800 rounded-lg">
              <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5 shrink-0">⚠</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </details>

      <details className="group bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors select-none min-h-[44px]">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">📋</span>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('blockQualityQcTemplatesHeading')}</h4>
          </div>
          <span className="text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform text-sm shrink-0">▼</span>
        </summary>
        <div className="px-5 pb-5 space-y-4">
          <div>
            <h5 className="font-bold mb-2 text-sm text-gray-900 dark:text-white">{t('blockQualityInlineTitle')}</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{t('blockQualityInlineIntro')}</p>
            <TemplateBlock label={t('blockQualityTemplateLabel')} template={t('blockQualityInlineTemplate')} />
            <div className="mt-2 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">{t('blockQualityBusinessExample')}</p>
              <p className="text-xs text-gray-700 dark:text-gray-300 italic">{t('blockQualityInlineExample')}</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-2 text-sm text-gray-900 dark:text-white">{t('blockQualityPostHocTitle')}</h5>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{t('blockQualityPostHocIntro')}</p>
            <TemplateBlock label={t('blockQualityTemplateLabel')} template={t('blockQualityPostHocTemplate')} />
            <div className="mt-2 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-1">{t('blockQualityBusinessExample')}</p>
              <p className="text-xs text-gray-700 dark:text-gray-300 italic">{t('blockQualityPostHocExample')}</p>
            </div>
          </div>
        </div>
      </details>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-2 border-blue-300 dark:border-blue-700" role="article" aria-label={t('blockQualityMicroTitle')}>
        <h4 className="font-bold mb-3 text-blue-900 dark:text-blue-100 text-base flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
          {t('blockQualityMicroTitle')}
        </h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{t('blockQualityMicroIntro')}</p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span> {t('blockQualityMicro1')}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span> {t('blockQualityMicro2')}
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span> {t('blockQualityMicro3')}
          </span>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4 rounded-xl">
        <p className="text-sm text-gray-700 dark:text-gray-300">{t('blockQualitySafetyBelt')}</p>
      </div>

      <OptionalWhySections slide={slide} />
      {onRenderTask()}
    </div>
  );
}

export interface AdvancedParameters2SlideProps {
  slide?: Slide;
  onRenderTask: () => JSX.Element | null;
}

export function AdvancedParameters2Slide({ slide, onRenderTask }: AdvancedParameters2SlideProps) {
  useTranslation();
  const t = getT('contentSlides');
  const intro = slide?.content && 'veiksmoIntro' in slide.content ? slide.content.veiksmoIntro : null;
  const maxExampleText = `ADVANCED:\nMax tokens: 150\n\n${t('blockAdvanced2TaskLabel')}\n${t('blockAdvanced2MaxExampleTask')}`;
  const topPExampleText = `ADVANCED:\nTop-p: 0.4\n\n${t('blockAdvanced2TaskLabel')}\n${t('blockAdvanced2TopPExampleTask')}`;
  const freqExampleText = `ADVANCED:\nFrequency penalty: 0.8\n\n${t('blockAdvanced2TaskLabel')}\n${t('blockAdvanced2FreqExampleTask')}`;
  return (
    <div className="space-y-6">
      {intro && <VeiksmoIntroBlock content={intro} />}
      <div className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-6 rounded-xl">
        <h3 className="font-bold text-xl mb-3 text-brand-900 dark:text-brand-100">{t('blockAdvanced2Title')}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3">{t('blockAdvanced2Goal')}</p>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200 font-semibold">⚠️ {t('blockAdvanced2Warning')}</p>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">{t('blockAdvanced2Warning2')}</p>
        </div>
      </div>

      <details open className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-200 dark:border-blue-800 group">
        <summary className="p-6 cursor-pointer list-none flex items-center justify-between select-none hover:bg-blue-50/50 dark:hover:bg-blue-900/10 rounded-xl transition-colors">
          <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100">{t('blockAdvanced2MaxTokensTitle')}</h4>
          <span className="text-gray-400 dark:text-gray-500 ml-2 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="px-6 pb-6 space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t('blockAdvanced2Controls')}</strong> {t('blockAdvanced2MaxTokensControls')}
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/20">
                <th className="px-4 py-3.5 text-left border-b border-blue-200 dark:border-blue-800 align-top">{t('blockAdvanced2TableValue')}</th>
                <th className="px-4 py-3.5 text-left border-b border-blue-200 dark:border-blue-800 align-top">{t('blockAdvanced2TableWhen')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3.5 font-mono align-top leading-relaxed">50–100</td>
                <td className="px-4 py-3.5 align-top leading-relaxed">{t('blockAdvanced2Max50')}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="px-4 py-3.5 font-mono align-top leading-relaxed">150–300</td>
                <td className="px-4 py-3.5 align-top leading-relaxed">{t('blockAdvanced2Max150')}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3.5 font-mono align-top leading-relaxed">400–800</td>
                <td className="px-4 py-3.5 align-top leading-relaxed">{t('blockAdvanced2Max400')}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <td className="px-4 py-3.5 font-mono align-top leading-relaxed">1000+</td>
                <td className="px-4 py-3.5 align-top leading-relaxed">{t('blockAdvanced2Max1000')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">{t('blockAdvanced2BusinessExample')}</p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group">
            <CopyButton text={maxExampleText} className="absolute top-2 right-2" size="sm" />
            <div className="pr-8">
              <div className="mb-2">ADVANCED:</div>
              <div className="mb-3">Max tokens: 150</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('blockAdvanced2TaskLabel')}</div>
              <div>{t('blockAdvanced2MaxExampleTask')}</div>
            </div>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500">
          <p className="text-sm text-red-800 dark:text-red-200"><span className="font-semibold">❌ </span>{t('blockAdvanced2MaxError')}</p>
        </div>
        </div>
      </details>

      <details className="bg-white dark:bg-gray-800 rounded-xl border-2 border-violet-200 dark:border-violet-800 group">
        <summary className="p-6 cursor-pointer list-none flex items-center justify-between select-none hover:bg-violet-50/50 dark:hover:bg-violet-900/10 rounded-xl transition-colors">
          <h4 className="font-bold text-lg text-violet-900 dark:text-violet-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" strokeWidth={1.5} />
            {t('blockAdvanced2TopPTitle')}
          </h4>
          <span className="text-gray-400 dark:text-gray-500 ml-2 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="px-6 pb-6 space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t('blockAdvanced2Controls')}</strong> {t('blockAdvanced2TopPControls')}
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">{t('blockAdvanced2TopP1')}</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">{t('blockAdvanced2TopP2')}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">{t('blockAdvanced2TopP3')}</p>
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">{t('blockAdvanced2BusinessExample')}</p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group">
            <CopyButton text={topPExampleText} className="absolute top-2 right-2" size="sm" />
            <div className="pr-8">
              <div className="mb-2">ADVANCED:</div>
              <div className="mb-3">Top-p: 0.4</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('blockAdvanced2TaskLabel')}</div>
              <div>{t('blockAdvanced2TopPExampleTask')}</div>
            </div>
          </div>
        </div>
        <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg border-l-4 border-violet-500">
          <p className="text-sm text-violet-800 dark:text-violet-200"><span className="font-semibold">🧠 </span>{t('blockAdvanced2TopPRule')}</p>
        </div>
        </div>
      </details>

      <details className="bg-white dark:bg-gray-800 rounded-xl border-2 border-amber-200 dark:border-amber-800 group">
        <summary className="p-6 cursor-pointer list-none flex items-center justify-between select-none hover:bg-amber-50/50 dark:hover:bg-amber-900/10 rounded-xl transition-colors">
          <h4 className="font-bold text-lg text-amber-900 dark:text-amber-100">{t('blockAdvanced2FreqTitle')}</h4>
          <span className="text-gray-400 dark:text-gray-500 ml-2 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="px-6 pb-6 space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t('blockAdvanced2Controls')}</strong> {t('blockAdvanced2FreqControls')}
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t('blockAdvanced2Freq1')}</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-l-4 border-amber-500">
            <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">{t('blockAdvanced2Freq2')}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">{t('blockAdvanced2Freq3')}</p>
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">{t('blockAdvanced2BusinessExample')}</p>
          <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm font-mono text-gray-800 dark:text-gray-200 relative group">
            <CopyButton text={freqExampleText} className="absolute top-2 right-2" size="sm" />
            <div className="pr-8">
              <div className="mb-2">ADVANCED:</div>
              <div className="mb-3">Frequency penalty: 0.8</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('blockAdvanced2TaskLabel')}</div>
              <div>{t('blockAdvanced2FreqExampleTask')}</div>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border-l-4 border-amber-500">
          <p className="text-sm text-amber-800 dark:text-amber-200 font-semibold mb-2">📌 {t('blockAdvanced2FreqUseful')}</p>
          <ul className="text-sm text-amber-700 dark:text-amber-300 ml-4 list-disc space-y-1">
            <li>{t('blockAdvanced2FreqUseful1')}</li>
            <li>{t('blockAdvanced2FreqUseful2')}</li>
            <li>{t('blockAdvanced2FreqUseful3')}</li>
          </ul>
        </div>
        </div>
      </details>

      <details className="bg-white dark:bg-gray-800 rounded-xl border-2 border-rose-200 dark:border-rose-800 group">
        <summary className="p-6 cursor-pointer list-none flex items-center justify-between select-none hover:bg-rose-50/50 dark:hover:bg-rose-900/10 rounded-xl transition-colors">
          <h4 className="font-bold text-lg text-rose-900 dark:text-rose-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" strokeWidth={1.5} />
            {t('blockAdvanced2PresenceTitle')}
          </h4>
          <span className="text-gray-400 dark:text-gray-500 ml-2 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="px-6 pb-6 space-y-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t('blockAdvanced2Controls')}</strong> {t('blockAdvanced2PresenceControls')}
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">{t('blockAdvanced2Presence1')}</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100 mb-1">{t('blockAdvanced2Presence2')}</p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
            <p className="font-semibold text-orange-900 dark:text-orange-100 mb-1">{t('blockAdvanced2Presence3')}</p>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500 mb-3">
          <p className="text-sm text-red-800 dark:text-red-200 font-semibold mb-2">🚫 {t('blockAdvanced2DontUse')}</p>
          <ul className="text-sm text-red-700 dark:text-red-300 ml-4 list-disc space-y-1">
            <li>{t('blockAdvanced2Dont1')}</li>
            <li>{t('blockAdvanced2Dont2')}</li>
            <li>{t('blockAdvanced2Dont3')}</li>
          </ul>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500 mb-3">
          <p className="text-sm text-emerald-800 dark:text-emerald-200 font-semibold mb-2">✅ {t('blockAdvanced2Fits')}</p>
          <ul className="text-sm text-emerald-700 dark:text-emerald-300 ml-4 list-disc space-y-1">
            <li>{t('blockAdvanced2Fits1')}</li>
            <li>{t('blockAdvanced2Fits2')}</li>
            <li>{t('blockAdvanced2Fits3')}</li>
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-blue-800 dark:text-blue-200">{t('blockAdvanced2PresenceRule')}</p>
        </div>
        </div>
      </details>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-emerald-900 dark:text-emerald-100">{t('blockAdvanced2SafeDefault')}</h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg relative group">
          <CopyButton
            text={`ADVANCED:\nMax tokens: 300\nTop-p: 0.7\nFrequency penalty: 0.5\nPresence penalty: 0.3`}
            className="absolute top-2 right-2"
            size="sm"
          />
          <div className="pr-8">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">ADVANCED:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Max tokens: 300</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Top-p: 0.7</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Frequency penalty: 0.5</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Presence penalty: 0.3</p>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-2">📌 {t('blockAdvanced2SafeNote')}</p>
        </div>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-6 rounded-xl">
        <h4 className="font-bold text-lg mb-3 text-violet-900 dark:text-violet-100">{t('blockAdvanced2OneRule')}</h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
            {t('blockAdvanced2OneRuleText')}
          </p>
        </div>
      </div>

      <TemplateBlock label={t('blockAdvanced2TemplateLabel')} template={t('blockAdvanced2Template')} />
      {onRenderTask()}
    </div>
  );
}

export function FullExampleSlide({ onRenderTask }: { onRenderTask: () => JSX.Element | null }) {
  useTranslation();
  const t = getT('contentSlides');
  const blocks: FullExampleBlock[] = [
    { num: 1, name: 'META', color: 'rose', content: t('blockFullExampleMeta') },
    { num: 2, name: 'INPUT', color: 'orange', content: t('blockFullExampleInput') },
    { num: 3, name: 'OUTPUT', color: 'amber', content: t('blockFullExampleOutput') },
    { num: 4, name: 'REASONING', color: 'emerald', content: t('blockFullExampleReasoning') },
    { num: 5, name: 'QUALITY', color: 'brand', content: t('blockFullExampleQuality') },
    { num: 6, name: 'ADVANCED', color: 'violet', content: t('blockFullExampleAdvanced') },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-brand-900 to-emerald-900 dark:from-emerald-950 dark:via-brand-950 dark:to-emerald-950 p-5 sm:p-7 text-white">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
          <div className="absolute top-2 right-4 select-none" aria-hidden="true">
          <Target className="w-20 h-20 text-current" strokeWidth={1} />
        </div>
        </div>
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-xs sm:text-sm text-emerald-300/80 font-semibold uppercase tracking-wider mb-1">{t('blockFullExampleHero1')}</p>
          <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight">{t('blockFullExampleHero2')}</h3>
          <p className="text-xs sm:text-sm text-brand-300/80 mt-2 font-medium">{t('blockFullExampleHero3')}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        {blocks.map((block) => {
          const colors = getColorClasses(block.color);
          return (
            <div key={block.num} className={`${colors.bg} ${colors.bgDark} p-4 rounded-xl border-l-4 ${colors.border}`}>
              <p className={`text-xs font-bold ${colors.text} ${colors.textDark} mb-1 uppercase tracking-wider`}>
                {block.num}. {block.name}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300">{block.content}</p>
            </div>
          );
        })}
      </div>

      <TemplateBlock label={t('blockFullExampleTemplateLabel')} template={t('blockFullExampleTemplate')} />

      {onRenderTask()}
    </div>
  );
}
