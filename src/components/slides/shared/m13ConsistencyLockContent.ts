import type { StepExplanation } from './stepExplanations';
import type { M10Locale } from './m10DiagramContent';

const STEPS_LT = [
  { label: '3–5 nuotraukos', desc: 'Kampai' },
  { label: 'Užraktas', desc: 'Tas pats produktas' },
  { label: 'Nauja scena', desc: 'Keisk tik aplinką' },
  { label: 'Patikra', desc: 'Etiketė, spalva' },
] as const;

const STEPS_EN = [
  { label: '3–5 refs', desc: 'Angles' },
  { label: 'Lock', desc: 'Same product' },
  { label: 'Generate', desc: 'New scene' },
  { label: 'QA', desc: 'Label, color' },
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
        body: 'Prompt: same product, same proportions, same label placement, same color palette, same style.',
      },
      {
        title: '3. Generate new scene',
        body: 'Change environment or action only. Keep refs attached; avoid random new looks.',
      },
      {
        title: '4. QA',
        body: 'Did the product inflate, recolor or lose the label? Simplify scene, strengthen ref or inpaint.',
      },
    ];
  }
  return [
    {
      title: '1. Surink 3–5 nuotraukas',
      body: 'Priekis, ¾ arba šonas, detalė/etiketė, jei nori – stiliaus/šviesos pavyzdys. Tas pats produktas ar personažas.',
    },
    {
      title: '2. Užrakto taisyklė',
      body: 'Prompte: tas pats produktas, tos pačios proporcijos, ta pati etiketės vieta, ta pati spalvų paletė, tas pats stilius.',
    },
    {
      title: '3. Nauja scena',
      body: 'Keisk tik aplinką ar veiksmą. Pavyzdžių nuotraukas laikyk prisegtas; venk atsitiktinio naujo vaizdo.',
    },
    {
      title: '4. Patikra',
      body: 'Ar produktas „išsipūtė“, pakeitė spalvą ar prarado etiketę? Supaprastink sceną arba stiprink pavyzdžius.',
    },
  ];
}

export function getM13ConsistencyLockChrome(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Reference lock',
      metaphorCaption: 'Frozen refs stay locked beside the generate path',
      hint: 'Tap a step – explanation below',
      aria: 'Four steps with frozen reference pad: collect refs, lock rule, generate, QA',
      regionAria: 'Character and product consistency – four steps',
      youAreHere: 'You are here:',
      navAria: 'Consistency step selection',
      stepAria: (i: number, title: string) => `Step ${i + 1}: ${title}`,
      enlargeLabel: 'Reference lock',
    };
  }
  return {
    title: 'Pavyzdžių nuotraukų užraktas',
    metaphorCaption: 'Užrakintos pavyzdžių nuotraukos lieka greta generavimo kelio',
    hint: 'Paspausk žingsnį – paaiškinimas apačioje',
    aria: 'Keturi žingsniai: pavyzdžių nuotraukos, užraktas, nauja scena, patikra',
    regionAria: 'Tas pats produktas – keturi žingsniai',
    youAreHere: 'Tu esi čia:',
    navAria: 'Užrakto žingsnių pasirinkimas',
    stepAria: (i: number, title: string) => `Žingsnis ${i + 1}: ${title}`,
    enlargeLabel: 'Pavyzdžių nuotraukų užraktas',
  };
}
