import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

const STEPS_LT = [
  { label: '3–5 refs', desc: 'Kampai' },
  { label: 'Lock', desc: 'Same product' },
  { label: 'Generate', desc: 'Nauja scena' },
  { label: 'QA', desc: 'Etiketė, spalva' },
] as const;

const STEPS_EN = [
  { label: '3–5 refs', desc: 'Angles' },
  { label: 'Lock', desc: 'Same product' },
  { label: 'Generate', desc: 'New scene' },
  { label: 'QA', desc: 'Label, colour' },
] as const;

export function getM13ConsistencyLockSteps(locale: M10Locale) {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}

export function getM13ConsistencyLockExplanations(
  locale: M10Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: '1. Collect 3–5 refs',
        body: 'Front, ¾ or side, detail/label, optional style/light ref. Same product or character.',
      },
      {
        title: '2. Lock rule',
        body: 'Prompt: same product, same proportions, same label placement, same colour palette, same style.',
      },
      {
        title: '3. Generate new scene',
        body: 'Change environment or action only. Keep refs attached; avoid random new looks.',
      },
      {
        title: '4. QA',
        body: 'Did the product inflate, recolour or lose the label? Simplify scene, strengthen ref or inpaint.',
      },
    ];
  }
  return [
    {
      title: '1. Surink 3–5 refs',
      body: 'Priekis, ¾ arba šonas, detalė/etiketė, optional stiliaus/šviesos ref. Tas pats produktas ar personažas.',
    },
    {
      title: '2. Lock taisyklė',
      body: 'Prompte: same product, same proportions, same label placement, same color palette, same style.',
    },
    {
      title: '3. Generuok naują sceną',
      body: 'Keisk tik aplinką ar veiksmą. Refs laikyk prisegtus; venk atsitiktinio naujo look.',
    },
    {
      title: '4. QA',
      body: 'Ar produktas „išsipūtė“, pakeitė spalvą ar prarado etiketę? Supaprastink sceną, stiprink ref arba inpaint.',
    },
  ];
}

export function getM13ConsistencyLockChrome(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Reference lock',
      hint: 'Tap a step – explanation below',
      aria: 'Four steps: collect refs, lock rule, generate, QA',
      regionAria: 'Character and product consistency – four steps',
      youAreHere: 'You are here:',
      navAria: 'Consistency step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Reference lock',
    };
  }
  return {
    title: 'Reference lock',
    hint: 'Paspausk žingsnį – paaiškinimas apačioje',
    aria: 'Keturi žingsniai: refs, lock, generavimas, QA',
    regionAria: 'Character / product consistency – keturi žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Consistency žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Reference lock',
  };
}
