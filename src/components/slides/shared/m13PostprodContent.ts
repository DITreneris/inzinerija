import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

const STEPS_LT = [
  { label: 'Kirpimas', desc: 'Klipai + kablukas' },
  { label: 'Spalvos', desc: 'Vienodas tonas' },
  { label: 'Garsas', desc: 'Balsas / fonas' },
  { label: 'Eksportas', desc: '9:16 / 16:9' },
] as const;

const STEPS_EN = [
  { label: 'Cut', desc: 'Clips + hook' },
  { label: 'Grade', desc: 'Color' },
  { label: 'Mix', desc: 'VO / bed' },
  { label: 'Export', desc: '9:16 / 16:9' },
] as const;

export function getM13PostprodSteps(locale: M10Locale) {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}

export function getM13PostprodExplanations(
  locale: M10Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Cut',
        body: 'Assemble 2–4 clips; drop weak frames; hook in the first 1–2 s.',
      },
      {
        title: '2. Grade',
        body: 'Match colors across clips so the set feels one campaign.',
      },
      {
        title: '3. Mix',
        body: 'VO or licensed bed + SFX. Aim ~−14 LUFS music / ~−16 VO mix – trust your ears.',
      },
      {
        title: '4. Export',
        body: 'Export for platform (9:16 or 16:9). AI output stays raw until this chain is done.',
      },
    ];
  }
  return [
    {
      title: '1. Kirpimas',
      body: 'Surink 2–4 klipus; nukirpk silpnus kadrus; kablukas pirmose 1–2 s.',
    },
    {
      title: '2. Spalvos',
      body: 'Sulygink spalvas tarp klipų, kad rinkinys atrodytų viena kampanija.',
    },
    {
      title: '3. Garsas',
      body: 'Balsas arba licencijuotas fonas + efektai. Orientyras ~−14 LUFS muzikai / ~−16 balso maišymui – klausyk ausimis.',
    },
    {
      title: '4. Eksportas',
      body: 'Eksportuok pagal platformą (9:16 arba 16:9). DI rezultatas lieka žalia medžiaga, kol ši grandinė baigta.',
    },
  ];
}

export function getM13PostprodChrome(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Post-production chain',
      metaphorCaption: 'Timeline – Cut → Export in time order',
      hint: 'Tap a step – explanation below',
      aria: 'Four steps on a timeline: cut, grade, mix, export',
      regionAria: 'Post-production – four steps',
      youAreHere: 'You are here:',
      navAria: 'Post-production step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Post-production',
    };
  }
  return {
    title: 'Montažo grandinė',
    metaphorCaption: 'Laiko juosta – Kirpimas → Eksportas eilės tvarka',
    hint: 'Paspausk žingsnį – paaiškinimas apačioje',
    aria: 'Keturi žingsniai laiko juostoje: kirpimas, spalvos, garsas, eksportas',
    regionAria: 'Montažas – keturi žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Montažo žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Montažo grandinė',
  };
}
