import type { Locale } from '../../../../i18n';

export type PortalBeatId =
  | 'awareness-gap'
  | 'lithuania-context'
  | 'next-step-prompt';

export interface AwarenessGapLabels {
  leftTitle: string;
  leftCaption: string;
  rightTitle: string;
  rightCaption: string;
  leftStat: string;
  rightStat: string;
  gapStat: string;
  gapUnit: string;
  gapLabel: string;
  source: string;
}

export interface LithuaniaLabels {
  leftTitle: string;
  leftCaption: string;
  rightTitle: string;
  rightCaption: string;
  leftStat: string;
  rightStat: string;
  gapStat: string;
  gapUnit: string;
  gapLabel: string;
  source: string;
}

export interface NextStepPromptLabels {
  bridgeLine1: string;
  bridgeLine2: string;
  promptLabel: string;
  promptTemplate: string;
}

interface PortalBeatLabels {
  awarenessGap: AwarenessGapLabels;
  lithuania: LithuaniaLabels;
  nextStepPrompt: NextStepPromptLabels;
  aria: Record<PortalBeatId, string>;
}

const LT_PROMPT_TEMPLATE = `Tu esi verslo analitikas.

Remdamasis duomenimis:
- 32,7% ES gyventojų naudojo generatyvius DI įrankius (Eurostat, 2025)
- 98% IT specialistų naudojo DI darbe (MIT, 2025)

Užduotis: parašyk 5 punktų santrauką komandai — ką tai reiškia organizacijai ir ką daryti šią savaitę.`;

const EN_PROMPT_TEMPLATE = `You are a business analyst.

Based on this data:
- 32.7% of EU residents used generative AI tools (Eurostat, 2025)
- 98% of IT specialists used AI at work (MIT, 2025)

Task: write a 5-bullet summary for the team — what this means for the organisation and one action to take this week.`;

const LT: PortalBeatLabels = {
  awarenessGap: {
    leftTitle: 'Naudoja DI funkcijas',
    leftCaption: 'Orų prognozės, spam filtrai, teksto korekcija',
    rightTitle: 'Atpažįsta DI',
    rightCaption: 'Sąmoningai laiko funkciją DI įrankiu',
    leftStat: '86%',
    rightStat: '38%',
    gapStat: '48',
    gapUnit: 'proc. punktų',
    gapLabel: 'illustracinė suvokimo spraga',
    source:
      'Illustracija pagal Eurostat ICT naudojimo ir MIT DI atpažinimo tendencijas (2025)',
  },
  lithuania: {
    leftTitle: 'Lietuvos gyventojai',
    leftCaption: 'Naudoja DI įrankius kasdien arba periodiškai',
    rightTitle: 'ES vidurkis',
    rightCaption: 'Europos Sąjungos gyventojų lygis',
    leftStat: '69%',
    rightStat: '32,7%',
    gapStat: '+36,3',
    gapUnit: 'proc. punktų',
    gapLabel: 'virš ES vidurkio',
    source: 'Šaltinis: Stat.gov.lt, 2025; Eurostat, 2025',
  },
  nextStepPrompt: {
    bridgeLine1:
      'Skaidrėje matėte skaičius — kitas žingsnis ne dar viena statistika.',
    bridgeLine2:
      'Tas pats 3 žingsnių modelis kaip sk. 43: įvestis → promptas → rezultatas. Promptas — tavo instrukcija DI.',
    promptLabel: 'Promptas komandos santraukai',
    promptTemplate: LT_PROMPT_TEMPLATE,
  },
  aria: {
    'awareness-gap':
      'Diagrama: 86 procentai naudoja DI paremtas funkcijas, 38 procentai atpažįsta DI – apytiksliai 48 proc. punktų illustracinė suvokimo spraga',
    'lithuania-context':
      'Diagrama: 69 procentai LT naudoja DI, ES vidurkis 32,7 procentai – 36,3 proc. punktų virš vidurkio',
    'next-step-prompt':
      'Tiltas į skaidrę 43 ir kopijuojamas promptas komandos santraukai',
  },
};

const EN: PortalBeatLabels = {
  awarenessGap: {
    leftTitle: 'Use AI features',
    leftCaption: 'Weather alerts, spam filters, text correction',
    rightTitle: 'Recognise AI',
    rightCaption: 'Consciously treat the feature as an AI tool',
    leftStat: '86%',
    rightStat: '38%',
    gapStat: '48',
    gapUnit: 'pp',
    gapLabel: 'illustrative awareness gap',
    source:
      'Illustration based on Eurostat ICT usage and MIT AI recognition trends (2025)',
  },
  lithuania: {
    leftTitle: 'Lithuania residents',
    leftCaption: 'Use AI tools daily or periodically',
    rightTitle: 'EU average',
    rightCaption: 'European Union population level',
    leftStat: '69%',
    rightStat: '32.7%',
    gapStat: '+36.3',
    gapUnit: 'pp',
    gapLabel: 'above EU average',
    source: 'Source: Stat.gov.lt, 2025; Eurostat, 2025',
  },
  nextStepPrompt: {
    bridgeLine1:
      'You saw the numbers on this slide — the next step is not another statistic.',
    bridgeLine2:
      'Same 3-step model as slide 43: input → prompt → result. The prompt is your instruction to the AI.',
    promptLabel: 'Prompt for a team summary',
    promptTemplate: EN_PROMPT_TEMPLATE,
  },
  aria: {
    'awareness-gap':
      'Diagram: 86 percent use AI-powered features, 38 percent recognise AI – approximately 48 pp illustrative awareness gap',
    'lithuania-context':
      'Diagram: 69 percent in Lithuania use AI, EU average 32.7 percent – 36.3 pp above average',
    'next-step-prompt':
      'Bridge to slide 43 and a copyable prompt for a team summary',
  },
};

export function getPortalBeatLabels(locale: Locale): PortalBeatLabels {
  return locale === 'en' ? EN : LT;
}
