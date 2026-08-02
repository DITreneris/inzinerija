/**
 * M16 16.15 – Direction picker lab content SOT (LT/EN).
 * Pattern interactive-control-lab; Shell = Ne. Feature Doc: M16_DIRECTION_PICKER_LAB.md
 */

export type DirectionId = 'a' | 'b' | 'c';

export type DirectionLocale = 'lt' | 'en';

export type DirectionScores = {
  speed: number;
  clarity: number;
  risk: number;
  sum: number;
};

/** Static score mirror from 16.15 table (canonical dienos prioritetų pavyzdys). */
export const DIRECTION_SCORES: Record<DirectionId, DirectionScores> = {
  a: { speed: 5, clarity: 4, risk: 2, sum: 11 },
  b: { speed: 3, clarity: 4, risk: 3, sum: 10 },
  c: { speed: 2, clarity: 3, risk: 4, sum: 9 },
};

type DirectionOption = {
  id: DirectionId;
  label: string;
  description: string;
  who: string;
  what: string;
  result: string;
};

export function getDirectionPickerUiLabels(locale: DirectionLocale) {
  if (locale === 'en') {
    return {
      regionAria: 'Direction picker lab',
      hint: 'Pick the most testable direction – not the prettiest.',
      decisionRule:
        'Winner = fastest to validate in a day, with a clear user and one main action.',
      legend: 'Which direction wins?',
      scoreHeading: 'Score mirror (1–5)',
      speedLabel: 'Speed to test',
      clarityLabel: 'Clarity for user',
      riskLabel: 'Risk / complexity (1=low)',
      sumLabel: 'Sum',
      pickFirst: 'Choose A, B or C first – then copy why it wins.',
      artefactHeading: 'Why this is most testable',
      copyLabel: 'Copy why',
      copiedLabel: 'Copied',
      emptyPick: 'No direction yet',
      picked: (label: string) => `Picked: ${label}`,
    };
  }
  return {
    regionAria: 'Krypties pasirinkimo lab',
    hint: 'Rinkis patikrinamiausią kryptį – ne gražiausią.',
    decisionRule:
      'Nugalėtojas = greičiausiai patikrinamas per dieną, su aiškiu naudotoju ir viena pagrindine funkcija.',
    legend: 'Kuri kryptis laimi?',
    scoreHeading: 'Balų veidrodis (1–5)',
    speedLabel: 'Greitis patikrinti',
    clarityLabel: 'Aiškumas naudotojui',
    riskLabel: 'Rizika / sudėtingumas (1=maža)',
    sumLabel: 'Suma',
    pickFirst: 'Pirmiausia pasirink A, B arba C – tada nukopijuok kodėl laimi.',
    artefactHeading: 'Kodėl ši patikrinamiausia',
    copyLabel: 'Kopijuoti kodėl',
    copiedLabel: 'Nukopijuota',
    emptyPick: 'Kryptis dar nepasirinkta',
    picked: (label: string) => `Pasirinkta: ${label}`,
  };
}

export function getDirectionOptions(
  locale: DirectionLocale
): DirectionOption[] {
  if (locale === 'en') {
    return [
      {
        id: 'a',
        label: 'A',
        description: 'Busy professional → 3 daily priorities in 1 min',
        who: 'Busy professional',
        what: 'Shows 3 daily priorities',
        result: 'Knows where to start in 1 minute',
      },
      {
        id: 'b',
        label: 'B',
        description: 'Teammate → shared “now” list',
        who: 'Teammate',
        what: 'Shares one priority list',
        result: 'Everyone sees the same “now”',
      },
      {
        id: 'c',
        label: 'C',
        description: 'Manager → daily completion summary',
        who: 'Manager',
        what: 'Measures how many tasks finished',
        result: 'Short end-of-day summary',
      },
    ];
  }
  return [
    {
      id: 'a',
      label: 'A',
      description: 'Užsiėmęs profesionalas → 3 prioritetai per 1 min',
      who: 'Užsiėmęs profesionalas',
      what: 'Rodo 3 dienos prioritetus',
      result: 'Žino, nuo ko pradėti per 1 min',
    },
    {
      id: 'b',
      label: 'B',
      description: 'Komandos narys → bendras „dabar“ sąrašas',
      who: 'Komandos narys',
      what: 'Dalijasi vienu prioritetų sąrašu',
      result: 'Visi mato tą patį „dabar“',
    },
    {
      id: 'c',
      label: 'C',
      description: 'Vadovas → dienos santrauka',
      who: 'Vadovas',
      what: 'Matuoja, kiek užduočių baigta',
      result: 'Trumpa dienos santrauka',
    },
  ];
}

export function formatDirectionArtefact(
  locale: DirectionLocale,
  id: DirectionId
): string {
  const opt = getDirectionOptions(locale).find((o) => o.id === id);
  const scores = DIRECTION_SCORES[id];
  if (!opt) return '';
  if (locale === 'en') {
    return [
      `Winning direction: ${opt.label}`,
      `Who: ${opt.who}`,
      `What: ${opt.what}`,
      `Result: ${opt.result}`,
      `Scores: speed ${scores.speed}/5 · clarity ${scores.clarity}/5 · risk ${scores.risk}/5 · sum ${scores.sum}`,
      'Why most testable: can validate the main user action in one day without Auth/payments.',
      'Next: write 01_MVP_BRIEF.md for this direction only.',
    ].join('\n');
  }
  return [
    `Nugalėtoja kryptis: ${opt.label}`,
    `Kam: ${opt.who}`,
    `Ką daro: ${opt.what}`,
    `Rezultatas: ${opt.result}`,
    `Balai: greitis ${scores.speed}/5 · aiškumas ${scores.clarity}/5 · rizika ${scores.risk}/5 · suma ${scores.sum}`,
    'Kodėl patikrinamiausia: pagrindinę naudotojo funkciją galima patikrinti per dieną be Auth/mokėjimų.',
    'Toliau: rašyk 01_MVP_BRIEF.md tik šiai krypčiai.',
  ].join('\n');
}
