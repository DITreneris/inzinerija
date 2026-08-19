import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check, ExternalLink, Sparkles, Film } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';
import Banner from './ui/Banner';
import { getTools } from '../data/toolsLoader';
import { getI2vReadiness } from '../utils/vaizdoGenQuality';
import { getContentTrackSwatches } from '../utils/contentTrackSwatches';
import { typographyClasses } from '../design-tokens';

const DURATIONS = ['3', '4', '5'] as const;

const MOTIONS_LT = ['Lėtai į priekį', 'Šonu', 'Stabiliai'] as const;
const MOTIONS_EN = ['Slow push-in', 'Pan sideways', 'Locked / static'] as const;

const READY_BADGE: Record<string, string> = {
  weak: 'bg-slate-600 text-slate-100',
  medium: 'bg-amber-600/90 text-white',
  ready: 'bg-accent-500 text-slate-900',
};

export type I2vGeneratoriusContent = {
  tldr?: string;
  patikra?: string;
  footer?: string;
};

export default function I2vGeneratoriusSlide({
  content,
}: {
  content?: I2vGeneratoriusContent;
} = {}) {
  const { t } = useTranslation('i2vGen');
  const { locale } = useLocale();
  const isEn = locale === 'en';

  const [keyframe, setKeyframe] = useState('');
  const [duration, setDuration] = useState<string>('3');
  const [motion, setMotion] = useState('');
  const [sameStyle, setSameStyle] = useState(false);
  const [sameProduct, setSameProduct] = useState(false);
  const [copied, setCopied] = useState(false);

  const MOTIONS = isEn ? MOTIONS_EN : MOTIONS_LT;

  const tldrText = content?.tldr?.trim() || t('tldr');
  const patikraText = content?.patikra?.trim() || t('checkText');

  const videoTools = useMemo(() => {
    const tools = getTools(locale);
    const preferred = ['Kling', 'Runway', 'Veo', 'Sora', 'Seedance', 'Luma'];
    const video = tools.filter(
      (tool) =>
        tool.category === 'Video generavimas' ||
        tool.category === 'Video generation'
    );
    return video
      .filter((tool) =>
        preferred.some((p) => tool.name.toLowerCase().includes(p.toLowerCase()))
      )
      .slice(0, 4);
  }, [locale]);

  const readiness = getI2vReadiness(
    keyframe,
    DURATIONS.includes(duration as (typeof DURATIONS)[number]),
    motion,
    sameStyle || sameProduct
  );

  const paletteSwatches = useMemo(
    () =>
      getContentTrackSwatches({
        presetId: sameStyle ? 'brand' : null,
        colorText: keyframe,
      }),
    [sameStyle, keyframe]
  );

  const generatedPrompt = useMemo(() => {
    const scene =
      keyframe.trim() ||
      (isEn ? '[Frame / scene]' : '[Raktinis kadras / scena]');
    const locks: string[] = [];
    if (sameProduct) locks.push(isEn ? 'same product' : 'tas pats produktas');
    if (sameStyle) {
      locks.push(
        isEn
          ? 'same style, same color palette'
          : 'tas pats stilius, ta pati spalvų paletė'
      );
    }
    const lockLine = locks.length
      ? locks.join(', ') + '.'
      : isEn
        ? 'Keep visual continuity with the frame.'
        : 'Išlaikyk vizualinį tęstinumą su raktiniu kadru.';

    if (isEn) {
      return [
        `Image-to-video clip: ${duration} seconds (not longer).`,
        `Start from this frame: ${scene}.`,
        `Camera motion: ${motion || '[motion]'}.`,
        lockLine,
        'Natural motion, no morphing faces or labels. Single continuous shot.',
      ].join(' ');
    }
    return [
      `Video iš kadro: ${duration} s (ne ilgiau).`,
      `Raktinis kadras: ${scene}.`,
      `Kamera: ${motion || '[judesys]'}.`,
      lockLine,
      'Natūralus judesys, be veidų ar etikečių deformacijų. Vienas vientisas kadras.',
    ].join(' ');
  }, [keyframe, duration, motion, sameStyle, sameProduct, isEn]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = generatedPrompt;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedPrompt]);

  const handleOpenTool = useCallback(
    (url: string) => {
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      void handleCopy();
    },
    [handleCopy]
  );

  const readyHint =
    readiness.level === 'ready'
      ? t('readyHint')
      : readiness.filled <= 1
        ? t('missingKeyframe')
        : t('improveHint');

  return (
    <div className="space-y-8">
      <Banner
        variant="info"
        className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20 border-accent-500"
        ariaLabel={isEn ? 'In short' : 'Trumpai'}
      >
        <p
          className={`${typographyClasses.body} font-semibold text-slate-800 dark:text-slate-200`}
        >
          {tldrText}
        </p>
      </Banner>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                <Film className="w-4.5 h-4.5 text-brand-600 dark:text-brand-400" />
              </div>
              <h3
                className={`${typographyClasses.h3} text-slate-900 dark:text-slate-100`}
              >
                {t('sectionTitle')}
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <p
                  className={`${typographyClasses.labelUpper} text-brand-600 dark:text-brand-400 mb-2`}
                >
                  {t('beat1')}
                </p>
                <label
                  className={`block ${typographyClasses.labelUpper} text-slate-400 dark:text-slate-500 mb-1.5`}
                >
                  {t('labelKeyframe')}
                </label>
                <textarea
                  rows={3}
                  value={keyframe}
                  onChange={(e) => setKeyframe(e.target.value)}
                  placeholder={t('placeholderKeyframe')}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none resize-none text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  aria-label={t('labelKeyframe')}
                />
              </div>

              <div>
                <p
                  className={`${typographyClasses.labelUpper} text-brand-600 dark:text-brand-400 mb-2`}
                >
                  {t('beat2')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block ${typographyClasses.labelUpper} text-slate-400 dark:text-slate-500 mb-1.5`}
                    >
                      {t('labelDuration')}
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100"
                      aria-label={t('labelDuration')}
                    >
                      {DURATIONS.map((d) => (
                        <option key={d} value={d}>
                          {d} s
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className={`block ${typographyClasses.labelUpper} text-slate-400 dark:text-slate-500 mb-1.5`}
                    >
                      {t('labelMotion')}
                    </label>
                    <select
                      value={motion}
                      onChange={(e) => setMotion(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100"
                      aria-label={t('labelMotion')}
                    >
                      <option value="">{t('motionPlaceholder')}</option>
                      {MOTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p
                  className={`${typographyClasses.labelUpper} text-brand-600 dark:text-brand-400 mb-2`}
                >
                  {t('beat3')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameProduct}
                      onChange={(e) => setSameProduct(e.target.checked)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    {t('labelSameProduct')}
                  </label>
                  <label className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameStyle}
                      onChange={(e) => setSameStyle(e.target.checked)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    {t('labelSameStyle')}
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-5">
            {paletteSwatches.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 px-1">
                <span className="sr-only">
                  {isEn ? 'Palette hint' : 'Paletės hint'}
                </span>
                <div
                  className="flex gap-1.5"
                  aria-hidden
                  data-testid="i2v-palette-swatches"
                >
                  {paletteSwatches.map((hex) => (
                    <span
                      key={hex}
                      className="h-6 w-6 rounded-full border border-slate-300 shadow-sm dark:border-slate-600"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4"
              aria-label={t('readyMeterAria')}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`${typographyClasses.labelUpper} text-slate-500 dark:text-slate-400`}
                >
                  {t('readyMeterLabel')}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${READY_BADGE[readiness.level]}`}
                >
                  {readiness.filled}/{readiness.total} —{' '}
                  {t(`ready_${readiness.level}`)}
                </span>
              </div>
              <p
                className={`${typographyClasses.body} text-slate-600 dark:text-slate-300`}
                aria-live="polite"
              >
                {readyHint}
              </p>
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-5 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-5 opacity-5">
                <Sparkles className="w-10 h-10" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`${typographyClasses.labelUpper} tracking-[0.15em] text-accent-400`}
                >
                  {t('generatedPromptLabel')}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2.5 min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 rounded-xl"
                  aria-label={copied ? t('copiedAria') : t('copyPromptAria')}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div
                className={`min-h-[120px] ${typographyClasses.code} text-slate-200 whitespace-pre-wrap break-words`}
              >
                {generatedPrompt}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="mt-5 w-full bg-accent-500 hover:bg-accent-600 text-slate-900 font-bold py-3 min-h-[44px] rounded-xl flex items-center justify-center gap-2"
              >
                {copied ? t('copiedButton') : t('copyButton')}
              </button>
              <p className={`${typographyClasses.body} mt-3 text-slate-300`}>
                {t('cycleHint')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h3
          className={`${typographyClasses.h2} text-slate-900 dark:text-slate-100 mb-2`}
        >
          {t('chooseToolTitle')}
        </h3>
        <p
          className={`${typographyClasses.body} text-slate-500 dark:text-slate-400 mb-4`}
        >
          {t('chooseToolDesc')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {videoTools.map((tool) => (
            <button
              key={tool.name}
              type="button"
              onClick={() => tool.url && handleOpenTool(tool.url)}
              className="group bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 text-left min-h-[44px]"
              aria-label={t('openToolCopyAria', { name: tool.name })}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {tool.name}
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100" />
              </div>
              <span className="text-xs text-slate-500 line-clamp-2">
                {tool.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      <Banner
        variant="info"
        className="p-4 rounded-xl"
        ariaLabel={t('checkTitle')}
      >
        <p
          className={`${typographyClasses.body} text-slate-700 dark:text-slate-300`}
        >
          <strong>{t('checkTitle')}</strong> {patikraText}
        </p>
      </Banner>
    </div>
  );
}
