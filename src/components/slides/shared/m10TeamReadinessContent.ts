/**
 * M10 team readiness lab – LT/EN labels and generated profile copy.
 */

import type { M10Locale } from './m10DiagramContent';
import {
  TEAM_READINESS_DIMENSION_IDS,
  TEAM_READINESS_LEVEL_IDS,
  getPrimaryReadinessGap,
  getWeakestReadinessDimensions,
  isTeamReadinessComplete,
  type TeamReadinessDimensionId,
  type TeamReadinessLevelId,
  type TeamReadinessSelections,
} from './m10TeamReadinessModel';

export interface TeamReadinessDimensionCopy {
  id: TeamReadinessDimensionId;
  legend: string;
  shortLabel: string;
  prompt: string;
}

export interface TeamReadinessLevelCopy {
  id: TeamReadinessLevelId;
  label: string;
  description: string;
  chip: string;
}

export function getTeamReadinessUiLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      regionAria:
        'Team readiness snapshot: choose current states for three dimensions',
      takeaway:
        'This is a quick team-practice snapshot. It does not certify maturity; it shows which habit to strengthen before agentic work.',
      chooseAll: 'Choose one state in each dimension to see the next action.',
      summaryHeading: 'Readiness snapshot',
      profileHeading: 'Team readiness profile',
      copyLabel: 'Copy readiness profile',
      copiedLabel: 'Copied',
      profileHint:
        'Use this profile before choosing a human-control rule on the next slide.',
      nextActionHeading: 'Next action',
      tieHeading: 'Shared baseline first',
      tieBody:
        'Several dimensions are equally weak. Start with one shared use case, one prompt template and one review ritual instead of calling this a maturity level.',
      notScore:
        'No score: the weakest selected dimension determines the next action.',
      incomplete: 'Not complete yet',
      complete: 'Profile ready',
      selected: 'Selected',
      gapLabel: 'Main gap',
      weakDimensions: 'Weakest dimensions',
      noAutonomyReminder:
        'Autonomy still depends on process risk, data sensitivity and human-control rules.',
    };
  }
  return {
    regionAria:
      'Komandos pasirengimo nuotrauka: pasirink dabartines būsenas trijose dimensijose',
    takeaway:
      'Tai greita komandos praktikos nuotrauka. Ji nesertifikuoja brandos – tik parodo, kurį įprotį stiprinti prieš agentinį darbą.',
    chooseAll:
      'Pasirink po vieną būseną kiekvienoje dimensijoje – pamatysi kitą veiksmą.',
    summaryHeading: 'Pasirengimo nuotrauka',
    profileHeading: 'Komandos pasirengimo profilis',
    copyLabel: 'Kopijuoti pasirengimo profilį',
    copiedLabel: 'Nukopijuota',
    profileHint:
      'Naudok šį profilį prieš pasirinkdamas žmogaus kontrolės taisyklę kitoje skaidrėje.',
    nextActionHeading: 'Kitas veiksmas',
    tieHeading: 'Pirma sutark bendrą bazę',
    tieBody:
      'Kelios dimensijos vienodai silpnos. Pradėk nuo vieno bendro naudojimo atvejo, vieno prompto šablono ir vieno peržiūros ritmo – nevadink to brandos lygiu.',
    notScore: 'Be balo: kitą veiksmą lemia silpniausia pasirinkta dimensija.',
    incomplete: 'Dar neužpildyta',
    complete: 'Profilis paruoštas',
    selected: 'Pasirinkta',
    gapLabel: 'Pagrindinis tarpas',
    weakDimensions: 'Silpniausios dimensijos',
    noAutonomyReminder:
      'Autonomija vis tiek priklauso nuo proceso rizikos, duomenų jautrumo ir žmogaus kontrolės taisyklių.',
  };
}

export function getTeamReadinessDimensions(
  locale: M10Locale
): TeamReadinessDimensionCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'use',
        legend: '1. Team use',
        shortLabel: 'Use',
        prompt: 'How consistently does the team use AI in real work?',
      },
      {
        id: 'structure',
        legend: '2. Prompt structure',
        shortLabel: 'Structure',
        prompt: 'How structured are instructions, roles and outputs?',
      },
      {
        id: 'learning',
        legend: '3. Learning rhythm',
        shortLabel: 'Learning',
        prompt: 'How does the team review results and improve its practice?',
      },
    ];
  }
  return [
    {
      id: 'use',
      legend: '1. Komandos naudojimas',
      shortLabel: 'Naudojimas',
      prompt: 'Kaip nuosekliai komanda naudoja DI realiame darbe?',
    },
    {
      id: 'structure',
      legend: '2. Promptų struktūra',
      shortLabel: 'Struktūra',
      prompt: 'Kiek struktūruotos instrukcijos, rolės ir išvestys?',
    },
    {
      id: 'learning',
      legend: '3. Mokymosi ritmas',
      shortLabel: 'Mokymasis',
      prompt: 'Kaip komanda peržiūri rezultatus ir gerina praktiką?',
    },
  ];
}

export function getTeamReadinessLevels(
  locale: M10Locale
): TeamReadinessLevelCopy[] {
  if (locale === 'en') {
    return [
      {
        id: 'ad_hoc',
        label: 'Ad hoc',
        chip: 'Ad hoc',
        description: 'Different people improvise; there is no shared example.',
      },
      {
        id: 'fragmented',
        label: 'Fragmented',
        chip: 'Fragmented',
        description:
          'Some good habits exist, but they are not shared or reviewed.',
      },
      {
        id: 'systematic',
        label: 'Systematic',
        chip: 'Systematic',
        description:
          'The team uses shared templates, ownership and review rhythm.',
      },
    ];
  }
  return [
    {
      id: 'ad_hoc',
      label: 'Atsitiktinai',
      chip: 'Atsitiktinai',
      description: 'Kiekvienas improvizuoja; nėra bendro pavyzdžio.',
    },
    {
      id: 'fragmented',
      label: 'Fragmentuotai',
      chip: 'Fragmentuotai',
      description: 'Yra gerų įpročių, bet jie nepasidalinti arba neperžiūrimi.',
    },
    {
      id: 'systematic',
      label: 'Sistemiškai',
      chip: 'Sistemiškai',
      description:
        'Komanda turi bendrus šablonus, savininką ir peržiūros ritmą.',
    },
  ];
}

export function getTeamReadinessNextAction(
  locale: M10Locale,
  gap: TeamReadinessDimensionId | 'shared_baseline'
): string {
  if (locale === 'en') {
    switch (gap) {
      case 'use':
        return 'Agree on one shared use case and one example of “good enough” output before adding more tools.';
      case 'structure':
        return 'Create one prompt template with role, context, task, output format and limits. Reuse it for the selected process.';
      case 'learning':
        return 'Run one role-based practice session, compare outputs and record one rule to change next time.';
      case 'shared_baseline':
        return 'Pick one shared process, one prompt template and one 20-minute review ritual. Do that before increasing autonomy.';
    }
  }
  switch (gap) {
    case 'use':
      return 'Sutark vieną bendrą naudojimo atvejį ir vieną „pakankamai gero“ rezultato pavyzdį prieš pridedant daugiau įrankių.';
    case 'structure':
      return 'Sukurk vieną prompto šabloną: rolė, kontekstas, užduotis, išvesties formatas ir ribos. Naudok jį pasirinktam procesui.';
    case 'learning':
      return 'Paleisk vieną rolių praktiką, palygink rezultatus ir užrašyk vieną taisyklę, ką keisti kitą kartą.';
    case 'shared_baseline':
      return 'Pasirink vieną bendrą procesą, vieną prompto šabloną ir 20 min. peržiūros ritmą. Tai padaryk prieš didindamas autonomiją.';
  }
}

function dimensionLabel(
  locale: M10Locale,
  dimensionId: TeamReadinessDimensionId
): string {
  return (
    getTeamReadinessDimensions(locale).find((d) => d.id === dimensionId)
      ?.shortLabel ?? dimensionId
  );
}

function levelLabel(locale: M10Locale, levelId: TeamReadinessLevelId): string {
  return (
    getTeamReadinessLevels(locale).find((level) => level.id === levelId)
      ?.label ?? levelId
  );
}

export function formatTeamReadinessProfile(
  locale: M10Locale,
  selections: TeamReadinessSelections
): string {
  const ui = getTeamReadinessUiLabels(locale);
  if (!isTeamReadinessComplete(selections)) {
    return locale === 'en'
      ? 'Team readiness profile: choose all three dimensions first.'
      : 'Komandos pasirengimo profilis: pirmiausia pasirink visas tris dimensijas.';
  }

  const gap = getPrimaryReadinessGap(selections) ?? 'shared_baseline';
  const weakest = getWeakestReadinessDimensions(selections)
    .map((id) => dimensionLabel(locale, id))
    .join(', ');
  const action = getTeamReadinessNextAction(locale, gap);
  const rows = TEAM_READINESS_DIMENSION_IDS.map(
    (id) =>
      `${dimensionLabel(locale, id)}: ${levelLabel(locale, selections[id])}`
  );

  if (locale === 'en') {
    return [
      'Team readiness profile for agentic work:',
      ...rows.map((row) => `- ${row}`),
      `Weakest dimension(s): ${weakest}.`,
      `Next action: ${action}`,
      `Reminder: ${ui.noAutonomyReminder}`,
    ].join('\n');
  }
  return [
    'Komandos pasirengimo profilis agentiniam darbui:',
    ...rows.map((row) => `- ${row}`),
    `Silpniausia dimensija (-os): ${weakest}.`,
    `Kitas veiksmas: ${action}`,
    `Primink sau: ${ui.noAutonomyReminder}`,
  ].join('\n');
}

export function getSelectedStateLabel(
  locale: M10Locale,
  levelId: TeamReadinessLevelId | undefined
): string {
  if (!levelId) {
    return getTeamReadinessUiLabels(locale).incomplete;
  }
  return levelLabel(locale, levelId);
}

export function getAllReadinessLevelIds() {
  return TEAM_READINESS_LEVEL_IDS;
}
