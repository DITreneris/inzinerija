import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

export type M13Locale = M10Locale;

const STEPS_LT = [
  { label: 'Brief + brand', desc: 'Tikslas, auditorija' },
  { label: 'Stills', desc: 'Storyboard' },
  { label: 'Reference lock', desc: 'Same product' },
  { label: 'I2V klipai', desc: '3–5 s' },
  { label: 'Garsas + edit', desc: 'Audio-first' },
  { label: 'QA + provenance', desc: 'Disclosure' },
] as const;

const STEPS_EN = [
  { label: 'Brief + brand', desc: 'Goal, audience' },
  { label: 'Stills', desc: 'Storyboard' },
  { label: 'Reference lock', desc: 'Same product' },
  { label: 'I2V clips', desc: '3–5 s' },
  { label: 'Audio + edit', desc: 'Audio-first' },
  { label: 'QA + provenance', desc: 'Disclosure' },
] as const;

export function getM13MediaPipelineSteps(locale: M13Locale) {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}

export function getM13MediaPipelineExplanations(
  locale: M13Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Brief + brand lock',
        body: 'Lock goal (Awareness / Engagement / Conversion), audience, platform, colors and tone **before** generating.',
      },
      {
        title: '2. Stills / storyboard',
        body: 'Cheap keyframes first: hero + 0–2 extras. Lock composition **before** paying for video.',
      },
      {
        title: '3. Reference lock',
        body: '3–5 angles of the same product or character. Prompt: same product / same style.',
      },
      {
        title: '4. Short I2V clips',
        body: '2–4 clips of **3–5 s** from keyframes. Avoid one long text-to-video one-shot.',
      },
      {
        title: '5. Audio + montage',
        body: 'Audio-first: VO (or bed) sets duration; then cut, grade and mix.',
      },
      {
        title: '6. QA + provenance',
        body: 'Check brand, message, format, rights and disclosure (C2PA / visible AI label). For the business cycle (brief → A/B → optimise), see the slide “Workflow: from brief to publication” (13.11).',
      },
    ];
  }

  return [
    {
      title: '1. Brief + brand lock',
      body: 'Užrakink tikslą (Awareness / Engagement / Conversion), auditoriją, platformą, spalvas ir toną **prieš** generavimą.',
    },
    {
      title: '2. Stills / storyboard',
      body: 'Pirmiausia pigūs keyframe: hero + 0–2 papildomi. Užrakink kompoziciją **prieš** mokėdamas už video.',
    },
    {
      title: '3. Reference lock',
      body: '3–5 to paties produkto ar personažo kampai. Prompte: same product / same style.',
    },
    {
      title: '4. Trumpi I2V klipai',
      body: '2–4 klipai po **3–5 s** iš keyframe. Venk vieno ilgo text-to-video one-shot.',
    },
    {
      title: '5. Garsas + montažas',
      body: 'Audio-first: VO (arba bed) diktuoja trukmę; tada cut, grade ir mix.',
    },
    {
      title: '6. QA + provenance',
      body: 'Patikrink brand, žinutę, formatą, teises ir disclosure (C2PA / žmogui matoma DI žyma). Verslo ciklą (brief → A/B → optimizacija) žr. skaidrę „Darbo eiga: nuo brief iki publikacijos“ (13.11).',
    },
  ];
}

export function getM13MediaPipelineChrome(locale: M13Locale) {
  if (locale === 'en') {
    return {
      title: 'Generative media pipeline',
      hint: 'Tap a step – explanation below',
      aria: 'Six steps: brief, stills, reference lock, short I2V, audio and edit, QA and provenance',
      regionAria: 'Generative media pipeline – six steps',
      youAreHere: 'You are here:',
      navAria: 'Pipeline step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Module 13 – media pipeline',
    };
  }
  return {
    title: 'Generatyvinės medijos pipeline',
    hint: 'Paspausk žingsnį – paaiškinimas apačioje',
    aria: 'Šeši žingsniai: brief, stills, reference lock, trumpi I2V, garsas ir montažas, QA ir provenance',
    regionAria: 'Generatyvinės medijos pipeline – šeši žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Pipeline žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 13 – medijos pipeline',
  };
}
