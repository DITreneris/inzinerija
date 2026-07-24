/**
 * M7 sk. 67.7 – haliucinacijų mažinimo grandinė (HTML icon-chain + autoplay).
 * V3: label + caption + body hook į 67.8 šabloną; copyable lieka 67.8.
 */

export type HallucinationPipelineLocale = 'lt' | 'en';

export const HALLUCINATION_PIPELINE_STEP_KEYS = [
  'ground',
  'verify',
  'structure',
  'detect',
  'review',
] as const;

export type HallucinationPipelineStepKey =
  (typeof HALLUCINATION_PIPELINE_STEP_KEYS)[number];

export interface HallucinationPipelineStep {
  key: HallucinationPipelineStepKey;
  label: string;
  caption: string;
  body: string;
}

export interface HallucinationPipelineUiLabels {
  regionAria: string;
  youAreHere: string;
  navAria: string;
  stepAria: (index: number, title: string) => string;
  stepOfLabel: string;
  clickHint: string;
  bridgeLine: string;
  playShort: string;
  pauseShort: string;
  playLabel: string;
  pauseLabel: string;
  reducedMotionHint: string;
  statusLine: (step: number, total: number, title: string) => string;
  enlargeLabel: string;
}

type StepCopy = { label: string; caption: string; body: string };

const STEPS: Record<
  HallucinationPipelineLocale,
  Record<HallucinationPipelineStepKey, StepCopy>
> = {
  lt: {
    ground: {
      label: 'Šaltiniai',
      caption: 'Tikri duomenys',
      body: 'Šablone: naudok tik pateiktą informaciją – be išgalvotų šaltinių.',
    },
    verify: {
      label: 'Patikra',
      caption: 'Kryžminis tikrinimas',
      body: 'Prieš galutinį atsakymą – silpnos vietos ir nepagrįsti teiginiai.',
    },
    structure: {
      label: 'Struktūra',
      caption: 'Aiškus formatas',
      body: 'Aiškiai atskirk FAKTAI vs SPĖJIMAI.',
    },
    detect: {
      label: 'Rizika',
      caption: 'Spragos ir įtarimai',
      body: 'Jei nesi tikras – „nesu tikras“, ne spėjimas.',
    },
    review: {
      label: 'Peržiūra',
      caption: 'Žmogaus žingsnis',
      body: 'Po DI – žmogaus patikra; šabloną į Meta/Quality prieš siuntimą.',
    },
  },
  en: {
    ground: {
      label: 'Sources',
      caption: 'Ground truth',
      body: 'In the template: use only the information provided – no invented sources.',
    },
    verify: {
      label: 'Verify',
      caption: 'Cross-check',
      body: 'Before the final answer – weak spots and unsupported claims.',
    },
    structure: {
      label: 'Structure',
      caption: 'Clear format',
      body: 'Clearly separate FACTS vs GUESSES.',
    },
    detect: {
      label: 'Risk',
      caption: 'Risk scan',
      body: 'If unsure – say “I am not sure”, do not guess.',
    },
    review: {
      label: 'Review',
      caption: 'Human sign-off',
      body: 'After AI – human review; put the template in Meta/Quality before sending.',
    },
  },
};

const UI: Record<
  HallucinationPipelineLocale,
  Omit<HallucinationPipelineUiLabels, 'stepAria' | 'statusLine'>
> = {
  lt: {
    regionAria: 'Haliucinacijų mažinimo procesas – 5 etapai',
    youAreHere: 'Tu esi čia',
    navAria: 'Proceso etapai',
    stepOfLabel: 'Žingsnis',
    clickHint: 'Spustelėk etapą – pristabdyti',
    bridgeLine:
      'Kitame žingsnyje nukopijuosi anti-haliucinacinį šabloną – jis dengia visus 5 etapus.',
    playShort: 'Paleisti',
    pauseShort: 'Pauzė',
    playLabel: 'Paleisti ciklą',
    pauseLabel: 'Pristabdyti ciklą',
    reducedMotionHint: 'Animacija išjungta – rinkis etapą žemiau.',
    enlargeLabel: 'Peržiūrėti pilname dydyje',
  },
  en: {
    regionAria: 'Hallucination reduction process – 5 stages',
    youAreHere: 'You are here',
    navAria: 'Process stages',
    stepOfLabel: 'Step',
    clickHint: 'Click a stage to pause',
    bridgeLine:
      'Next you will copy the anti-hallucination template – it covers all 5 stages.',
    playShort: 'Play',
    pauseShort: 'Pause',
    playLabel: 'Play cycle',
    pauseLabel: 'Pause cycle',
    reducedMotionHint: 'Animation off – pick a stage below.',
    enlargeLabel: 'View full size',
  },
};

function normalizeLocale(
  locale: string | undefined
): HallucinationPipelineLocale {
  return locale === 'en' ? 'en' : 'lt';
}

export function getHallucinationPipelineSteps(
  locale: string | undefined
): HallucinationPipelineStep[] {
  const lang = normalizeLocale(locale);
  return HALLUCINATION_PIPELINE_STEP_KEYS.map((key) => ({
    key,
    label: STEPS[lang][key].label,
    caption: STEPS[lang][key].caption,
    body: STEPS[lang][key].body,
  }));
}

export function getHallucinationPipelineUi(
  locale: string | undefined
): HallucinationPipelineUiLabels {
  const lang = normalizeLocale(locale);
  const base = UI[lang];
  return {
    ...base,
    stepAria: (index, title) =>
      lang === 'en'
        ? `Stage ${index + 1}: ${title}`
        : `Etapas ${index + 1}: ${title}`,
    statusLine: (step, total, title) =>
      lang === 'en'
        ? `Step ${step}/${total} · ${title}`
        : `Žingsnis ${step}/${total} · ${title}`,
  };
}

/** Shell explanations: title = label, body = template hook (V3). */
export function getHallucinationPipelineStepExplanations(
  locale: string | undefined
): { title: string; body: string }[] {
  return getHallucinationPipelineSteps(locale).map((s) => ({
    title: s.label,
    body: s.body,
  }));
}
