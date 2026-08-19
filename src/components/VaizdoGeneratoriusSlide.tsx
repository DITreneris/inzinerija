import { useState, useMemo, useCallback, useEffect } from 'react';
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
import Banner from './ui/Banner';
import { getTools } from '../data/toolsLoader';
import {
  countFilledTracked,
  getHintMissing,
  getQualityLevel,
  type VaizdoGenTrackedKey,
  VAIZDO_GEN_TRACKED_KEYS,
} from '../utils/vaizdoGenQuality';
import { getContentTrackSwatches } from '../utils/contentTrackSwatches';
import { typographyClasses } from '../design-tokens';

const PLATFORMS_LT = [
  'Instagram',
  'LinkedIn',
  'Facebook',
  'Web baneris',
  'Lauko reklama',
] as const;
const PLATFORMS_EN = [
  'Instagram',
  'LinkedIn',
  'Facebook',
  'Web banner',
  'Outdoor advertising (Print)',
] as const;

const TONES_LT = [
  'Prabangus',
  'Drąsus',
  'Minimalistinis',
  'Žaismingas',
  'Ekspertiškas',
] as const;
const TONES_EN = [
  'Premium (Luxurious)',
  'Bold (Daring)',
  'Minimalist',
  'Playful',
  'Expert',
] as const;

const STYLES_LT = [
  'Tikroviška nuotrauka',
  '3D renderis (Studio)',
  'Kinematografinis stilius',
  'Mados žurnalo stilius',
  'Minimalistinė iliustracija',
] as const;
const STYLES_EN = [
  'Realistic photo',
  '3D render (Studio)',
  'Cinematic style',
  'Fashion magazine style',
  'Minimalist illustration',
] as const;

const LIGHTINGS_LT = [
  'Kino apšvietimas',
  'Minkšta dienos šviesa',
  'Auksinė valanda',
  'Studijinis apšvietimas',
  'Neoninis apšvietimas',
] as const;
const LIGHTINGS_EN = [
  'Cinematic lighting',
  'Soft daylight',
  'Golden Hour',
  'Studio lighting',
  'Neon lighting',
] as const;

const CAMERAS_LT = [
  'Stambus planas',
  'Akių lygis',
  'Iš viršaus',
  'Platus kampas',
  'Iš apačios',
] as const;
const CAMERAS_EN = [
  'Close-up',
  'Eye level',
  'Top-down (Flatlay)',
  'Wide angle',
  'Low angle (Hero shot)',
] as const;

const TEXT_POSITIONS_LT = [
  'Centras',
  'Viršutinė dalis',
  'Apatinis trečdalis',
  'Dinaminis išdėstymas',
] as const;
const TEXT_POSITIONS_EN = [
  'Center',
  'Top area',
  'Lower third',
  'Dynamic layout',
] as const;

const TYPOGRAPHIES_LT = [
  'Modernus Sans-serif',
  'Prabangus Serif',
  'Minimalistinis',
  'Rankraštinis',
] as const;
const TYPOGRAPHIES_EN = [
  'Modern Sans-serif',
  'Elegant Serif',
  'Minimalist',
  'Handwritten',
] as const;

const ASPECT_RATIOS = ['1:1', '16:9', '9:16'] as const;

const CAMPAIGN_GOALS_LT = [
  'Atpažįstamumas',
  'Įsitraukimas',
  'Konversija',
] as const;
const CAMPAIGN_GOALS_EN = ['Awareness', 'Engagement', 'Conversion'] as const;

type PresetId = 'ecommerce' | 'events' | 'brand' | 'social';

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
  aspectRatio: string;
  campaignGoal: string;
}

function defaultRatioForPlatform(platform: string): string {
  if (
    platform.includes('LinkedIn') ||
    platform.includes('Web') ||
    platform.includes('Print') ||
    platform.includes('Outdoor')
  ) {
    return '16:9';
  }
  return '1:1';
}

function getInitialForm(isEn: boolean): FormData {
  const platform = isEn ? PLATFORMS_EN[0] : PLATFORMS_LT[0];
  return {
    goal: '',
    audience: '',
    platform,
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
    aspectRatio: defaultRatioForPlatform(platform),
    campaignGoal: '',
  };
}

function buildPresets(isEn: boolean): Record<PresetId, Partial<FormData>> {
  if (isEn) {
    return {
      ecommerce: {
        goal: 'Launch a new product',
        audience: '25–40 e-commerce shoppers',
        platform: 'Instagram',
        tone: 'Premium (Luxurious)',
        object: 'Luxury leather handbag on a light stone surface',
        style: 'Realistic photo',
        lighting: 'Studio lighting',
        camera: 'Close-up',
        color: 'Warm golden tones',
        headline: 'The new collection is here',
        cta: 'Shop now',
        textPosition: 'Lower third',
        typography: 'Modern Sans-serif',
        aspectRatio: '1:1',
        campaignGoal: 'Conversion',
      },
      events: {
        goal: 'Increase event registrations',
        audience: 'Marketing specialists and business leaders',
        platform: 'LinkedIn',
        tone: 'Bold (Daring)',
        object: 'Conference stage with an LED wall and audience',
        style: 'Cinematic style',
        lighting: 'Neon lighting',
        camera: 'Wide angle',
        color: 'Electric blue and violet',
        headline: 'The biggest event of the year',
        cta: 'Register now',
        textPosition: 'Top area',
        typography: 'Modern Sans-serif',
        aspectRatio: '16:9',
        campaignGoal: 'Awareness',
      },
      brand: {
        goal: 'Increase brand awareness',
        audience: 'Creative urban audience',
        platform: 'Web banner',
        tone: 'Expert',
        object: 'Minimal product placed on a transparent glass podium',
        style: 'Fashion magazine style',
        lighting: 'Soft daylight',
        camera: 'Eye level',
        color: 'Deep indigo with amber accents',
        headline: 'Recognize premium quality',
        cta: 'Learn more',
        textPosition: 'Center',
        typography: 'Elegant Serif',
        aspectRatio: '16:9',
        campaignGoal: 'Awareness',
      },
      social: {
        goal: 'Increase social engagement',
        audience: 'Gen Z and young families',
        platform: 'Facebook',
        tone: 'Playful',
        object: 'A joyful couple with the product in an urban setting',
        style: 'Realistic photo',
        lighting: 'Golden Hour',
        camera: 'Top-down (Flatlay)',
        color: 'Bright coral with soft blue',
        headline: 'Feel the new energy',
        cta: 'Try it now',
        textPosition: 'Dynamic layout',
        typography: 'Modern Sans-serif',
        aspectRatio: '1:1',
        campaignGoal: 'Engagement',
      },
    };
  }
  return {
    ecommerce: {
      goal: 'Naujo produkto pristatymas',
      audience: '25–40 m. e-komercijos pirkėjai',
      platform: 'Instagram',
      tone: 'Prabangus',
      object: 'Prabangus odinis rankinis ant šviesaus akmens paviršiaus',
      style: 'Tikroviška nuotrauka',
      lighting: 'Studijinis apšvietimas',
      camera: 'Stambus planas',
      color: 'Šilti auksiniai tonai',
      headline: 'Nauja kolekcija jau čia',
      cta: 'Pirkti dabar',
      textPosition: 'Apatinis trečdalis',
      typography: 'Modernus Sans-serif',
      aspectRatio: '1:1',
        campaignGoal: 'Konversija',
    },
    events: {
      goal: 'Renginio registracijų auginimas',
      audience: 'Marketingo specialistai ir verslo atstovai',
      platform: 'LinkedIn',
      tone: 'Drąsus',
      object: 'Konferencijos scena su LED ekranu ir auditorija',
      style: 'Kinematografinis stilius',
      lighting: 'Neoninis apšvietimas',
      camera: 'Platus kampas',
      color: 'Elektrinė mėlyna ir violetinė',
      headline: 'Didžiausias metų renginys',
      cta: 'Registruotis',
      textPosition: 'Viršutinė dalis',
      typography: 'Modernus Sans-serif',
      aspectRatio: '16:9',
      campaignGoal: 'Atpažįstamumas',
    },
    brand: {
      goal: 'Prekės ženklo žinomumo didinimas',
      audience: 'Kūrybiška miesto auditorija',
      platform: 'Web baneris',
      tone: 'Ekspertiškas',
      object: 'Minimalistinis produktas ant skaidraus stiklo podiumo',
      style: 'Mados žurnalo stilius',
      lighting: 'Minkšta dienos šviesa',
      camera: 'Akių lygis',
      color: 'Gili indigo su gintaro akcentais',
      headline: 'Atpažink premium kokybę',
      cta: 'Sužinoti daugiau',
      textPosition: 'Centras',
      typography: 'Prabangus Serif',
      aspectRatio: '16:9',
      campaignGoal: 'Atpažįstamumas',
    },
    social: {
      goal: 'Aktyvumo didinimas socialiniuose tinkluose',
      audience: 'Gen Z ir jaunos šeimos',
      platform: 'Facebook',
      tone: 'Žaismingas',
      object: 'Džiaugsminga pora su produktu miesto aplinkoje',
      style: 'Tikroviška nuotrauka',
      lighting: 'Auksinė valanda',
      camera: 'Iš viršaus',
      color: 'Ryškus koralinis ir švelni mėlyna',
      headline: 'Pajusk naują energiją',
      cta: 'Išbandyk dabar',
      textPosition: 'Dinaminis išdėstymas',
      typography: 'Modernus Sans-serif',
      aspectRatio: '1:1',
      campaignGoal: 'Įsitraukimas',
    },
  };
}

function SectionHeader({
  step,
  icon: Icon,
  title,
}: {
  step: number;
  icon: typeof Layout;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-4.5 h-4.5 text-brand-600 dark:text-brand-400" />
      </div>
      <h3
        className={`${typographyClasses.h3} text-slate-900 dark:text-slate-100`}
      >
        {step}. {title}
      </h3>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block ${typographyClasses.labelUpper} text-slate-400 dark:text-slate-500 mb-1.5`}
    >
      {children}
    </label>
  );
}

function TextInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <input
      id={id}
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 outline-none transition-all text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
      aria-label={label}
    />
  );
}

function SelectInput({
  id,
  name,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none appearance-none cursor-pointer text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 transition-all"
      aria-label={label}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

const QUALITY_BADGE: Record<string, string> = {
  weak: 'bg-slate-600 text-slate-100',
  medium: 'bg-amber-600/90 text-white',
  good: 'bg-brand-600 text-white',
  premium: 'bg-accent-500 text-slate-900',
};

export type VaizdoGeneratoriusContent = {
  tldr?: string;
  patikra?: string;
  footer?: string;
};

export default function VaizdoGeneratoriusSlide({
  content,
}: {
  content?: VaizdoGeneratoriusContent;
} = {}) {
  const { t } = useTranslation('vaizdoGen');
  const { locale } = useLocale();
  const isEn = locale === 'en';
  const [formData, setFormData] = useState<FormData>(() =>
    getInitialForm(isEn)
  );
  const [copied, setCopied] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activePresetId, setActivePresetId] = useState<PresetId | null>(null);

  useEffect(() => {
    setFormData(getInitialForm(isEn));
    setActivePresetId(null);
  }, [isEn]);

  const tldrText = content?.tldr?.trim() || t('tldr');
  const patikraText = content?.patikra?.trim() || t('checkText');

  const PLATFORMS = isEn ? PLATFORMS_EN : PLATFORMS_LT;
  const TONES = isEn ? TONES_EN : TONES_LT;
  const STYLES = isEn ? STYLES_EN : STYLES_LT;
  const LIGHTINGS = isEn ? LIGHTINGS_EN : LIGHTINGS_LT;
  const CAMERAS = isEn ? CAMERAS_EN : CAMERAS_LT;
  const TEXT_POSITIONS = isEn ? TEXT_POSITIONS_EN : TEXT_POSITIONS_LT;
  const TYPOGRAPHIES = isEn ? TYPOGRAPHIES_EN : TYPOGRAPHIES_LT;
  const CAMPAIGN_GOALS = isEn ? CAMPAIGN_GOALS_EN : CAMPAIGN_GOALS_LT;
  const presets = useMemo(() => buildPresets(isEn), [isEn]);

  const imageTools = useMemo(() => {
    const tools = getTools(locale);
    return tools.filter(
      (tool) =>
        tool.category === 'Vaizdų generavimas' ||
        tool.category === 'Image generation'
    );
  }, [locale]);

  const trackedValues = useMemo(() => {
    const v: Partial<Record<VaizdoGenTrackedKey, string>> = {};
    for (const key of VAIZDO_GEN_TRACKED_KEYS) {
      v[key] = formData[key];
    }
    return v;
  }, [formData]);

  const filledCount = countFilledTracked(trackedValues);
  const totalTracked = VAIZDO_GEN_TRACKED_KEYS.length;
  const qualityLevel = getQualityLevel(filledCount, totalTracked);
  const hintMissing = getHintMissing(trackedValues);

  const fieldLabel = useCallback(
    (key: VaizdoGenTrackedKey): string => {
      const map: Record<VaizdoGenTrackedKey, string> = {
        object: t('labelObject'),
        goal: t('labelGoal'),
        audience: t('labelAudience'),
        color: t('labelColor'),
        style: t('labelStyle'),
        lighting: t('labelLighting'),
        camera: t('labelCamera'),
        aspectRatio: t('labelAspectRatio'),
        campaignGoal: t('labelCampaignGoal'),
      };
      return map[key];
    },
    [t]
  );

  const qualityHint = useMemo(() => {
    if (qualityLevel === 'premium') return t('qualityReadyHint');
    if (hintMissing.length === 0) return t('qualityReadyHint');
    const labels = hintMissing.slice(0, 3).map(fieldLabel);
    const joined =
      labels.length === 1
        ? labels[0]
        : labels.length === 2
          ? `${labels[0]}${isEn ? ' and ' : ' ir '}${labels[1]}`
          : `${labels.slice(0, -1).join(', ')}${isEn ? ', and ' : ' ir '}${labels[labels.length - 1]}`;
    if (filledCount <= 4) {
      return `${t('qualityMissingPrefix')} ${joined}.`;
    }
    return `${t('qualityImprovePrefix')} ${joined}.`;
  }, [qualityLevel, hintMissing, fieldLabel, filledCount, t, isEn]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      if (['style', 'lighting', 'camera', 'color'].includes(name)) {
        setActivePresetId(null);
      }
      setFormData((prev) => {
        const next = { ...prev, [name]: value };
        if (name === 'platform') {
          next.aspectRatio = defaultRatioForPlatform(value);
        }
        return next;
      });
    },
    []
  );

  const applyPreset = useCallback(
    (id: PresetId) => {
      const patch = presets[id];
      setFormData((prev) => ({ ...prev, ...patch }));
      setActivePresetId(id);
      setActiveStep(1);
    },
    [presets]
  );

  const paletteSwatches = useMemo(
    () =>
      getContentTrackSwatches({
        presetId: activePresetId,
        colorText: formData.color,
      }),
    [activePresetId, formData.color]
  );

  const generatedPrompt = useMemo(() => {
    const {
      goal,
      audience,
      platform,
      tone,
      object,
      style,
      lighting,
      camera,
      color,
      headline,
      cta,
      textPosition,
      typography,
      aspectRatio,
      campaignGoal,
    } = formData;
    const parts: string[] = [];

    const coreVisual = `${object || (isEn ? '[Subject]' : '[Objektas]')}`;
    parts.push(`${style}, ${coreVisual}.`);

    if (isEn) {
      const technical = `${camera}, ${lighting}${color ? `, ${color} color palette` : ''}, professional composition. Aspect ratio: ${aspectRatio}.`;
      parts.push(technical);

      if (goal || audience || platform || campaignGoal) {
        parts.push(
          `Created for marketing purpose: ${campaignGoal || goal || 'advertisement'}${goal && campaignGoal ? ` (${goal})` : ''}, targeting ${audience || 'target audience'} on ${platform}. Mood: ${tone}.`
        );
      }

      if (headline || cta) {
        const textParts = [];
        if (headline) textParts.push(`headline \u201C${headline}\u201D`);
        if (cta) textParts.push(`call-to-action \u201C${cta}\u201D`);
        parts.push(
          `Advertising mock-up with ${textParts.join(' and ')}. Font style: ${typography}. Text position: ${textPosition}. Clean negative space around text for readability.`
        );
      }
    } else {
      const technical = `${camera}, ${lighting}${color ? `, ${color} spalvų gama` : ''}, profesionali kompozicija. Proporcijos: ${aspectRatio}.`;
      parts.push(technical);

      if (goal || audience || platform || campaignGoal) {
        parts.push(
          `Sukurta rinkodaros tikslui: ${campaignGoal || goal || 'reklama'}${goal && campaignGoal ? ` (${goal})` : ''}, skirta ${audience || 'tikslinė auditorija'} platformai ${platform}. Nuotaika: ${tone}.`
        );
      }

      if (headline || cta) {
        const textParts = [];
        if (headline) textParts.push(`antrašte \u201E${headline}\u201C`);
        if (cta) textParts.push(`kvietimu veikti \u201E${cta}\u201C`);
        parts.push(
          `Reklaminis maketas su ${textParts.join(' ir ')}. Šrifto stilius: ${typography}. Teksto pozicija: ${textPosition}. Švari erdvė aplink tekstą skaitomumui užtikrinti.`
        );
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

  const presetIds: PresetId[] = ['ecommerce', 'events', 'brand', 'social'];
  const expertTips = [
    {
      title: t('expertTipSpecificTitle'),
      body: t('expertTipSpecificBody'),
    },
    {
      title: t('expertTipLightingTitle'),
      body: t('expertTipLightingBody'),
    },
    {
      title: t('expertTipTextSpaceTitle'),
      body: t('expertTipTextSpaceBody'),
    },
    {
      title: t('expertTipRatiosTitle'),
      body: t('expertTipRatiosBody'),
    },
  ];

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

      <div>
        <p
          className={`${typographyClasses.labelUpper} text-slate-500 dark:text-slate-400 mb-2`}
        >
          {t('presetsTitle')}
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={t('presetsTitle')}
        >
          {presetIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => applyPreset(id)}
              className="px-3 py-2 min-h-[44px] rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:border-brand-500 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
            >
              {t(`preset_${id}`)}
            </button>
          ))}
        </div>
      </div>

      <div
        className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-full border border-slate-200 dark:border-slate-700 w-fit"
        role="group"
        aria-label={isEn ? 'Prompt builder steps' : 'Promptų kūrimo žingsniai'}
      >
        {[t('stepContext'), t('stepVisual'), t('stepText')].map(
          (stepLabel, idx) => (
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
              aria-pressed={activeStep === idx + 1}
            >
              {idx + 1}. {stepLabel}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <section
            className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
            onFocus={() => setActiveStep(1)}
          >
            <SectionHeader
              step={1}
              icon={Layout}
              title={t('sectionCampaign')}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="vaizdo-campaignGoal">
                  {t('labelCampaignGoal')}
                </FieldLabel>
                <select
                  id="vaizdo-campaignGoal"
                  name="campaignGoal"
                  value={formData.campaignGoal}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none appearance-none cursor-pointer text-sm font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 transition-all"
                  aria-label={t('labelCampaignGoal')}
                >
                  <option value="">{t('campaignGoalPlaceholder')}</option>
                  {CAMPAIGN_GOALS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-goal">{t('labelGoal')}</FieldLabel>
                <TextInput
                  id="vaizdo-goal"
                  name="goal"
                  label={t('labelGoal')}
                  placeholder={t('placeholderGoal')}
                  value={formData.goal}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-platform">
                  {t('labelPlatform')}
                </FieldLabel>
                <SelectInput
                  id="vaizdo-platform"
                  name="platform"
                  label={t('labelPlatform')}
                  value={formData.platform}
                  options={PLATFORMS}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-audience">
                  {t('labelAudience')}
                </FieldLabel>
                <TextInput
                  id="vaizdo-audience"
                  name="audience"
                  label={t('labelAudience')}
                  placeholder={t('placeholderAudience')}
                  value={formData.audience}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-tone">{t('labelTone')}</FieldLabel>
                <SelectInput
                  id="vaizdo-tone"
                  name="tone"
                  label={t('labelTone')}
                  value={formData.tone}
                  options={TONES}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section
            className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
            onFocus={() => setActiveStep(2)}
          >
            <SectionHeader
              step={2}
              icon={ImageIcon}
              title={t('sectionVisual')}
            />
            <div className="space-y-4">
              <div>
                <FieldLabel htmlFor="vaizdo-object">
                  {t('labelObject')}
                </FieldLabel>
                <textarea
                  id="vaizdo-object"
                  name="object"
                  rows={2}
                  value={formData.object}
                  placeholder={t('placeholderObject')}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl outline-none resize-none text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:focus:border-brand-400 transition-all"
                  aria-label={t('labelObject')}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="vaizdo-style">
                    {t('labelStyle')}
                  </FieldLabel>
                  <SelectInput
                    id="vaizdo-style"
                    name="style"
                    label={t('labelStyle')}
                    value={formData.style}
                    options={STYLES}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="vaizdo-lighting">
                    {t('labelLighting')}
                  </FieldLabel>
                  <SelectInput
                    id="vaizdo-lighting"
                    name="lighting"
                    label={t('labelLighting')}
                    value={formData.lighting}
                    options={LIGHTINGS}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="vaizdo-camera">
                    {t('labelCamera')}
                  </FieldLabel>
                  <SelectInput
                    id="vaizdo-camera"
                    name="camera"
                    label={t('labelCamera')}
                    value={formData.camera}
                    options={CAMERAS}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="vaizdo-aspectRatio">
                    {t('labelAspectRatio')}
                  </FieldLabel>
                  <SelectInput
                    id="vaizdo-aspectRatio"
                    name="aspectRatio"
                    label={t('labelAspectRatio')}
                    value={formData.aspectRatio}
                    options={ASPECT_RATIOS}
                    onChange={handleChange}
                  />
                </div>
                <div className="lg:col-span-2">
                  <FieldLabel htmlFor="vaizdo-color">
                    {t('labelColor')}
                  </FieldLabel>
                  <TextInput
                    id="vaizdo-color"
                    name="color"
                    label={t('labelColor')}
                    placeholder={t('placeholderColor')}
                    value={formData.color}
                    onChange={handleChange}
                  />
                  {paletteSwatches.length > 0 ? (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="sr-only">
                        {isEn ? 'Palette hint' : 'Paletės hint'}
                      </span>
                      <div
                        className="flex gap-1.5"
                        aria-hidden
                        data-testid="vaizdo-palette-swatches"
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
                </div>
              </div>
            </div>
          </section>

          <section
            className="bg-white dark:bg-slate-800/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
            onFocus={() => setActiveStep(3)}
          >
            <SectionHeader step={3} icon={Type} title={t('sectionText')} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="vaizdo-headline">
                  {t('labelHeadline')}
                </FieldLabel>
                <TextInput
                  id="vaizdo-headline"
                  name="headline"
                  label={t('labelHeadline')}
                  placeholder={t('placeholderHeadline')}
                  value={formData.headline}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-cta">{t('labelCta')}</FieldLabel>
                <TextInput
                  id="vaizdo-cta"
                  name="cta"
                  label={t('labelCta')}
                  placeholder={t('placeholderCta')}
                  value={formData.cta}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-textPosition">
                  {t('labelTextPosition')}
                </FieldLabel>
                <SelectInput
                  id="vaizdo-textPosition"
                  name="textPosition"
                  label={t('labelTextPosition')}
                  value={formData.textPosition}
                  options={TEXT_POSITIONS}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FieldLabel htmlFor="vaizdo-typography">
                  {t('labelTypography')}
                </FieldLabel>
                <SelectInput
                  id="vaizdo-typography"
                  name="typography"
                  label={t('labelTypography')}
                  value={formData.typography}
                  options={TYPOGRAPHIES}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-5">
            <div
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4"
              aria-label={t('qualityMeterAria')}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`${typographyClasses.labelUpper} text-slate-500 dark:text-slate-400`}
                >
                  {t('qualityMeterLabel')}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${QUALITY_BADGE[qualityLevel]}`}
                >
                  {filledCount}/{totalTracked} — {t(`quality_${qualityLevel}`)}
                </span>
              </div>
              <p
                className={`${typographyClasses.body} text-slate-600 dark:text-slate-300`}
                aria-live="polite"
                aria-atomic="true"
              >
                {qualityHint}
              </p>
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-5 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-5 opacity-5">
                <Sparkles className="w-10 h-10" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                  <span
                    className={`${typographyClasses.labelUpper} tracking-[0.15em] text-accent-400`}
                  >
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
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div
                className={`min-h-[140px] ${typographyClasses.code} text-slate-200 selection:bg-brand-500 whitespace-pre-wrap break-words`}
                aria-live="polite"
                aria-atomic="true"
              >
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
                {showTips ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>
              {showTips && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 space-y-2.5 border-l-4 border-l-slate-400">
                  {expertTips.map((tip) => (
                    <p key={tip.title}>
                      <strong>{tip.title}:</strong> {tip.body}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-4">
        <button
          type="button"
          onClick={() => setShowTools((open) => !open)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 text-sm font-bold text-brand-700 dark:text-brand-300 hover:border-brand-500"
          aria-expanded={showTools}
        >
          {t('chooseGeneratorTitle')}
          {showTools ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {showTools ? (
          <>
            <p
              className={`${typographyClasses.body} text-slate-500 dark:text-slate-400 mt-3 mb-4`}
            >
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
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                    {tool.description}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : null}
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
