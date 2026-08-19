import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

export type M13Locale = M10Locale;

const STEPS_LT = [
  { label: 'Užduotis + ženklas', desc: 'Tikslas, auditorija' },
  { label: 'Kadrai', desc: 'Scenarijaus piešiniai' },
  { label: 'Referencų užraktas', desc: 'Tas pats produktas' },
  { label: 'Trumpi I2V', desc: '3–5 s' },
  { label: 'Garsas + montažas', desc: 'Pirmiausia garsas' },
  { label: 'Patikra + DI žyma', desc: 'Teisės, žyma' },
] as const;

const STEPS_EN = [
  { label: 'Brief + brand', desc: 'Goal, audience' },
  { label: 'Frames', desc: 'Storyboard stills' },
  { label: 'Reference lock', desc: 'Same product' },
  { label: 'Short I2V', desc: '3–5 s' },
  { label: 'Audio + edit', desc: 'Sound first' },
  { label: 'QA + AI label', desc: 'Rights, disclosure' },
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
        title: '1. Brief + brand',
        body: 'Lock the goal (awareness / engagement / conversion), audience, platform, colors and tone **before** you generate. Without that, AI looks “nice” but not like your campaign.',
      },
      {
        title: '2. Frames / storyboard',
        body: 'Cheap keyframes first: main frame + 0–2 extras. Lock composition **before** paying for video. Skipping this is the usual expensive mistake.',
      },
      {
        title: '3. Reference lock',
        body: '3–5 angles of the same product or character. Prompt rule: same product / same style. Without refs, the set drifts.',
      },
      {
        title: '4. Short I2V clips',
        body: 'From a locked frame, make 2–4 clips of **3–5 s** (image-to-video / I2V). Avoid one long text-to-video shot with no plan – costly and hard to fix.',
      },
      {
        title: '5. Audio + edit',
        body: 'Sound first: voice-over (or bed only) sets duration; then cut, color grade and mix. Montage follows sound, not the other way around.',
      },
      {
        title: '6. QA + AI label',
        body: 'Check brand, message, format, rights and disclosure (C2PA / visible AI label). For the business cycle (brief → A/B → optimize), see the slide “Workflow: from brief to publication”.',
      },
    ];
  }

  return [
    {
      title: '1. Užduotis + ženklas',
      body: 'Prieš generavimą užrašyk: tikslą (atpažįstamumas / įsitraukimas / konversija), kam skirta, kur rodysi, spalvas ir toną. Be to DI „gražu“, bet ne tavo kampanijai.',
    },
    {
      title: '2. Kadrai',
      body: 'Pirmiausia pigūs scenarijaus piešiniai: pagrindinis kadras + 0–2 papildomi. Užrakink kompoziciją **prieš** mokėdamas už video – kitaip brangiai kartosi.',
    },
    {
      title: '3. Referencų užraktas',
      body: '3–5 to paties produkto ar personažo kampai. Prompte: tas pats produktas / tas pats stilius. Be referencų rinkinys „plaukioja“.',
    },
    {
      title: '4. Trumpi I2V',
      body: 'Iš užrakinto kadro generuok 2–4 trumpus **3–5 s** klipus (video iš nuotraukos / I2V). Venk vieno ilgo „iš teksto į video“ bandymo be plano – brangu ir sunku taisyti.',
    },
    {
      title: '5. Garsas + montažas',
      body: 'Pirmiausia garsas: balsas (arba tik fonas) diktuoja trukmę; tada kirpimas, spalvos ir maišymas. Montažas seka garsą, ne atvirkščiai.',
    },
    {
      title: '6. Patikra + DI žyma',
      body: 'Patikrink ženklą, žinutę, formatą, teises ir DI žymą (C2PA / žmogui matoma žyma). Verslo ciklą (užduoties aprašas → A/B → tobulinimas) žr. skaidrę „Darbo eiga: nuo užduoties aprašo iki publikacijos“.',
    },
  ];
}

export function getM13MediaPipelineChrome(locale: M13Locale) {
  if (locale === 'en') {
    return {
      title: 'Generative media chain',
      hint: 'Tap a step – explanation below',
      aria: 'Six steps: brief, frames, reference lock, short I2V, audio and edit, QA and AI label',
      regionAria: 'Generative media chain – six steps',
      youAreHere: 'You are here:',
      navAria: 'Chain step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Module 13 – media chain',
    };
  }
  return {
    title: 'Generatyvinės medijos grandinė',
    hint: 'Paspausk žingsnį – paaiškinimas apačioje',
    aria: 'Šeši žingsniai: užduotis, kadrai, referencų užraktas, trumpi I2V, garsas ir montažas, patikra ir DI žyma',
    regionAria: 'Generatyvinės medijos grandinė – šeši žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Grandinės žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Modulis 13 – medijos grandinė',
  };
}
