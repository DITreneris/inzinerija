import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Copy,
  Check,
  ExternalLink,
  Layout,
  Image as ImageIcon,
  Type,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';
import { getTools } from '../data/toolsLoader';

const PLATFORMS_LT = ['Instagram', 'LinkedIn', 'Facebook', 'Web baneris', 'Lauko reklama (Print)'] as const;
const PLATFORMS_EN = ['Instagram', 'LinkedIn', 'Facebook', 'Web banner', 'Outdoor advertising (Print)'] as const;

const TONES_LT = ['Premium (Prabangus)', 'Bold (Drąsus)', 'Minimalistinis', 'Žaismingas', 'Ekspertiškas'] as const;
const TONES_EN = ['Premium (Luxurious)', 'Bold (Daring)', 'Minimalist', 'Playful', 'Expert'] as const;

const STYLES_LT = ['Tikroviška nuotrauka', '3D renderis (Studio)', 'Kinematografinis stilius', 'Mados žurnalo stilius', 'Minimalistinė iliustracija'] as const;
const STYLES_EN = ['Realistic photo', '3D render (Studio)', 'Cinematic style', 'Fashion magazine style', 'Minimalist illustration'] as const;

const LIGHTINGS_LT = ['Cinematic (Kino apšvietimas)', 'Minkšta dienos šviesa', 'Auksinė valanda (Golden Hour)', 'Studijinis apšvietimas', 'Neoninis apšvietimas'] as const;
const LIGHTINGS_EN = ['Cinematic lighting', 'Soft daylight', 'Golden Hour', 'Studio lighting', 'Neon lighting'] as const;

const CAMERAS_LT = ['Close-up (Stambus planas)', 'Akių lygis (Eye level)', 'Iš viršaus (Flatlay)', 'Platus kampas (Wide angle)', 'Iš apačios (Hero shot)'] as const;
const CAMERAS_EN = ['Close-up', 'Eye level', 'Top-down (Flatlay)', 'Wide angle', 'Low angle (Hero shot)'] as const;

const TEXT_POSITIONS_LT = ['Centras', 'Viršutinė dalis', 'Apatinis trečdalis', 'Dinaminis išdėstymas'] as const;
const TEXT_POSITIONS_EN = ['Center', 'Top area', 'Lower third', 'Dynamic layout'] as const;

const TYPOGRAPHIES_LT = ['Modernus Sans-serif', 'Prabangus Serif', 'Minimalistinis', 'Rankraštinis'] as const;
const TYPOGRAPHIES_EN = ['Modern Sans-serif', 'Elegant Serif', 'Minimalist', 'Handwritten'] as const;

interface FormData {
  goal: string;
  audience: string;
  platform: string;
  tone: string;
  object: string;
  style: string;
  lighting: string;
  camera: string;
  color: string;
  headline: string;
  cta: string;
  textPosition: string;
  typography: string;
}

function getInitialForm(isEn: boolean): FormData {
  return {
    goal: '',
    audience: '',
    platform: isEn ? PLATFORMS_EN[0] : PLATFORMS_LT[0],
    tone: isEn ? TONES_EN[0] : TONES_LT[0],
    object: '',
    style: isEn ? STYLES_EN[0] : STYLES_LT[0],
    lighting: isEn ? LIGHTINGS_EN[0] : LIGHTINGS_LT[0],
    camera: isEn ? CAMERAS_EN[0] : CAMERAS_LT[0],
    color: '',
    headline: '',
    cta: '',
    textPosition: isEn ? TEXT_POSITIONS_EN[0] : TEXT_POSITIONS_LT[0],
    typography: isEn ? TYPOGRAPHIES_EN[0] : TYPOGRAPHIES_LT[0],
  };
}

function SectionHeader({ step, icon: Icon, title }: { step: number; icon: typeof Layout; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-4.5 h-4.5 text-brand-600 dark:text-brand-400" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
        {step}. {title}
      </h3>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}

function TextInput({ name, placeholder, value, onChange }: {
  name: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
      aria-label={name}
    />
  );
}

function SelectInput({ name, value, options, onChange }: {
  name: string; value: string; options: readonly string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none appearance-none cursor-pointer text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 transition-all"
      aria-label={name}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default function VaizdoGeneratoriusSlide() {
  const { t } = useTranslation('vaizdoGen');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [formData, setFormData] = useState<FormData>(() => getInitialForm(isEn));
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const PLATFORMS = isEn ? PLATFORMS_EN : PLATFORMS_LT;
  const TONES = isEn ? TONES_EN : TONES_LT;
  const STYLES = isEn ? STYLES_EN : STYLES_LT;
  const LIGHTINGS = isEn ? LIGHTINGS_EN : LIGHTINGS_LT;
  const CAMERAS = isEn ? CAMERAS_EN : CAMERAS_LT;
  const TEXT_POSITIONS = isEn ? TEXT_POSITIONS_EN : TEXT_POSITIONS_LT;
  const TYPOGRAPHIES = isEn ? TYPOGRAPHIES_EN : TYPOGRAPHIES_LT;

  const imageTools = useMemo(() => {
    const tools = getTools(locale as 'lt' | 'en');
    return tools.filter(
      (tool) => tool.moduleId === 13 && tool.category === (isEn ? 'Image generation' : 'Vaizdų generavimas'),
    );
  }, [locale, isEn]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const generatedPrompt = useMemo(() => {
    const { goal, audience, platform, tone, object, style, lighting, camera, color, headline, cta, textPosition, typography } = formData;
    const parts: string[] = [];

    const coreVisual = `${object || (isEn ? '[Subject]' : '[Objektas]')}`;
    parts.push(`${style}, ${coreVisual}.`);

    if (isEn) {
      const technical = `${camera}, ${lighting}${color ? `, ${color} color palette` : ''}, ultra-detailed, highest quality, professional composition.`;
      parts.push(technical);

      if (goal || audience || platform) {
        parts.push(`Created for marketing purpose: ${goal || 'advertisement'}, targeting ${audience || 'target audience'} on ${platform}. Mood: ${tone}.`);
      }

      if (headline || cta) {
        const textParts = [];
        if (headline) textParts.push(`headline \u201C${headline}\u201D`);
        if (cta) textParts.push(`call-to-action \u201C${cta}\u201D`);
        parts.push(`Advertising mock-up with ${textParts.join(' and ')}. Font style: ${typography}. Text position: ${textPosition}. Clean negative space around text for readability.`);
      }
    } else {
      const technical = `${camera}, ${lighting}${color ? `, ${color} spalvų gama` : ''}, itin detalu, aukščiausia kokybė, profesionali kompozicija.`;
      parts.push(technical);

      if (goal || audience || platform) {
        parts.push(`Sukurta rinkodaros tikslui: ${goal || 'reklama'}, skirta ${audience || 'tikslinė auditorija'} platformai ${platform}. Nuotaika: ${tone}.`);
      }

      if (headline || cta) {
        const textParts = [];
        if (headline) textParts.push(`antrašte \u201E${headline}\u201C`);
        if (cta) textParts.push(`kvietimu veikti \u201E${cta}\u201C`);
        parts.push(`Reklaminis maketas su ${textParts.join(' ir ')}. Šrifto stilius: ${typography}. Teksto pozicija: ${textPosition}. Švari erdvė aplink tekstą skaitomumui užtikrinti.`);
      }
    }

    return parts.join(' ');
  }, [formData, isEn]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = generatedPrompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generatedPrompt]);

  const handleOpenTool = useCallback((url: string) => {
    handleCopy();
    window.open(url, '_blank', 'noopener');
  }, [handleCopy]);

  return (
    <div className="space-y-8">
      {/* TL;DR – accent */}
      <div className="rounded-xl p-4 bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {t('tldr')}
        </p>
      </div>

      {/* Žingsnių indikatorius */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-full border border-slate-200 dark:border-slate-700 w-fit">
        {[t('stepContext'), t('stepVisual'), t('stepText')].map((stepLabel, idx) => (
          <button
            key={`step-${idx}`}
            type="button"
            onClick={() => setActiveStep(idx + 1)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeStep === idx + 1
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            aria-label={`${idx + 1}. ${stepLabel}`}
          >
            {idx + 1}. {stepLabel}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formos pusė */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Kampanijos kontekstas */}
          <section
            className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
            onFocus={() => setActiveStep(1)}
          >
            <SectionHeader step={1} icon={Layout} title={t('sectionCampaign')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>{t('labelGoal')}</FieldLabel>
                <TextInput name="goal" placeholder={t('placeholderGoal')} value={formData.goal} onChange={handleChange} />
              </div>
              <div>
                <FieldLabel>{t('labelPlatform')}</FieldLabel>
                <SelectInput name="platform" value={formData.platform} options={PLATFORMS} onChange={handleChange} />
              </div>
              <div>
                <FieldLabel>{t('labelAudience')}</FieldLabel>
                <TextInput name="audience" placeholder={t('placeholderAudience')} value={formData.audience} onChange={handleChange} />
              </div>
              <div>
                <FieldLabel>{t('labelTone')}</FieldLabel>
                <SelectInput name="tone" value={formData.tone} options={TONES} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* 2. Vizualo esmė */}
          <section
            className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
            onFocus={() => setActiveStep(2)}
          >
            <SectionHeader step={2} icon={ImageIcon} title={t('sectionVisual')} />
            <div className="space-y-4">
              <div>
                <FieldLabel>{t('labelObject')}</FieldLabel>
                <textarea
                  name="object"
                  rows={2}
                  value={formData.object}
                  placeholder={t('placeholderObject')}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none resize-none text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 transition-all"
                  aria-label={t('labelObject')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>{t('labelStyle')}</FieldLabel>
                  <SelectInput name="style" value={formData.style} options={STYLES} onChange={handleChange} />
                </div>
                <div>
                  <FieldLabel>{t('labelLighting')}</FieldLabel>
                  <SelectInput name="lighting" value={formData.lighting} options={LIGHTINGS} onChange={handleChange} />
                </div>
                <div>
                  <FieldLabel>{t('labelCamera')}</FieldLabel>
                  <SelectInput name="camera" value={formData.camera} options={CAMERAS} onChange={handleChange} />
                </div>
                <div>
                  <FieldLabel>{t('labelColor')}</FieldLabel>
                  <TextInput name="color" placeholder={t('placeholderColor')} value={formData.color} onChange={handleChange} />
                </div>
              </div>
            </div>
          </section>

          {/* 3. Tekstų integracija */}
          <section
            className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
            onFocus={() => setActiveStep(3)}
          >
            <SectionHeader step={3} icon={Type} title={t('sectionText')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel>{t('labelHeadline')}</FieldLabel>
                <TextInput name="headline" placeholder={t('placeholderHeadline')} value={formData.headline} onChange={handleChange} />
              </div>
              <div>
                <FieldLabel>{t('labelCta')}</FieldLabel>
                <TextInput name="cta" placeholder={t('placeholderCta')} value={formData.cta} onChange={handleChange} />
              </div>
              <div>
                <FieldLabel>{t('labelTextPosition')}</FieldLabel>
                <SelectInput name="textPosition" value={formData.textPosition} options={TEXT_POSITIONS} onChange={handleChange} />
              </div>
              <div>
                <FieldLabel>{t('labelTypography')}</FieldLabel>
                <SelectInput name="typography" value={formData.typography} options={TYPOGRAPHIES} onChange={handleChange} />
              </div>
            </div>
          </section>
        </div>

        {/* Išvesties pusė – sticky */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-5">
            {/* Sugeneruotas promptas */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-5 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-5 opacity-5">
                <Sparkles className="w-10 h-10" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent-400">
                    {t('generatedPromptLabel')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2.5 min-h-[44px] min-w-[44px] bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center"
                  aria-label={copied ? t('copiedAria') : t('copyPromptAria')}
                  title={t('copyTitle')}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="min-h-[140px] text-sm leading-relaxed font-mono text-slate-200 selection:bg-brand-500 whitespace-pre-wrap break-words">
                {generatedPrompt}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full bg-accent-500 hover:bg-accent-600 text-slate-900 font-bold py-3 min-h-[44px] rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
                  aria-label={t('copyPromptAria')}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t('copiedButton')}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t('copyButton')}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Eksperto patarimai – collapsible terms */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 p-4 flex items-center justify-between text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all min-h-[44px]"
                aria-expanded={showTips}
                aria-label={t('expertTipsAria')}
              >
                <span className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                  <Lightbulb className="w-4 h-4" />
                  {t('expertTipsTitle')}
                </span>
                {showTips ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {showTips && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 space-y-2.5 border-l-4 border-l-slate-400">
                  {isEn ? (
                    <>
                      <p><strong>Be specific:</strong> Instead of &quot;nice car&quot; write &quot;matte black SUV on a forest road&quot;.</p>
                      <p><strong>Lighting:</strong> It defines 80% of the mood. Always select a lighting type.</p>
                      <p><strong>Text space:</strong> If you plan to add text later, include &quot;clean negative space&quot; in the prompt.</p>
                      <p><strong>Aspect ratios:</strong> Instagram – 1:1 or 4:5; LinkedIn – 1.91:1; Stories – 9:16.</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Būkite konkretūs:</strong> Vietoj &quot;gražus automobilis&quot; rašykite &quot;matinis juodas visureigis miško kelyje&quot;.</p>
                      <p><strong>Apšvietimas:</strong> Tai 80 % vaizdo nuotaikos. Visada parinkite apšvietimo tipą.</p>
                      <p><strong>Teksto erdvė:</strong> Jei planuojate dėti tekstą vėliau, prompte nurodykite &quot;clean negative space&quot;.</p>
                      <p><strong>Proporcijos:</strong> Instagram – 1:1 arba 4:5; LinkedIn – 1.91:1; Stories – 9:16.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Įrankių tinklelis */}
      <section className="mt-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
          {t('chooseGeneratorTitle')}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {t('chooseGeneratorDesc')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {imageTools.map((tool) => (
            <button
              key={tool.name}
              type="button"
              onClick={() => tool.url && handleOpenTool(tool.url)}
              className="group bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 hover:shadow-md transition-all text-left flex flex-col min-h-[44px]"
              aria-label={t('openToolCopyAria', { name: tool.name })}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {tool.name}
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                {tool.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Patikra – accent */}
      <div className="rounded-xl p-4 bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong>{t('checkTitle')}</strong> {t('checkText')}
        </p>
      </div>
    </div>
  );
}
