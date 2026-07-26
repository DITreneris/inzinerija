/**
 * M7 sk. 71 – makro kelio žemėlapis (4 blokai).
 * Learner labels: plain (Analizė be „/ MASTER“).
 */

export type M7PathMapLocale = 'lt' | 'en';

export interface M7PathMapStep {
  title: string;
  tip: string;
}

export interface M7PathMapLabels {
  regionAria: string;
  youAreHere: string;
  steps: M7PathMapStep[];
}

const LT: M7PathMapLabels = {
  regionAria: 'Modulio kelio žemėlapis: keturi blokai',
  youAreHere: 'Tu esi čia',
  steps: [
    {
      title: 'Pamatas',
      tip: 'Principai ir kontekstas prieš promptus',
    },
    {
      title: 'Rinkimas',
      tip: 'Analizės eiga, tipai, šaltiniai',
    },
    {
      title: 'Paruošimas',
      tip: '5 žingsniai, valymas, metaduomenys',
    },
    {
      title: 'Analizė',
      tip: 'EDA, vizualizacija, pilnas analizės šablonas',
    },
  ],
};

const EN: M7PathMapLabels = {
  regionAria: 'Module path map: four blocks',
  youAreHere: 'You are here',
  steps: [
    {
      title: 'Foundation',
      tip: 'Principles and context before prompts',
    },
    {
      title: 'Collection',
      tip: 'Analysis path, types, sources',
    },
    {
      title: 'Preparation',
      tip: '5 steps, cleaning, metadata',
    },
    {
      title: 'Analysis',
      tip: 'EDA, visualization, full analysis template',
    },
  ],
};

export function getM7PathMapLabels(locale: M7PathMapLocale): M7PathMapLabels {
  return locale === 'en' ? EN : LT;
}
