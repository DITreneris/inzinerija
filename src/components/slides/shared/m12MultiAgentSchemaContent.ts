import type { M10Locale } from './m10DiagramContent';

type DiagramLabelPair = [string, string];

export interface M12MultiAgentSchemaLabels {
  title: string;
  input: DiagramLabelPair;
  router: DiagramLabelPair;
  coordinator: DiagramLabelPair;
  specialistA: DiagramLabelPair;
  specialistB: DiagramLabelPair;
  evaluator: DiagramLabelPair;
  output: DiagramLabelPair;
  /** Staged process edge verbs (W7 Option B). */
  edgeVerbs: {
    routes: string;
    selects: string;
    assigns: string;
    handsOff: string;
    approves: string;
    returns: string;
  };
  aria: string;
}

export interface M12MultiAgentStepExplanation {
  title: string;
  body: string;
}

const pair = (title: string, subtitle: string): DiagramLabelPair => [
  title,
  subtitle,
];

export function getM12MultiAgentSchemaLabels(
  locale: M10Locale
): M12MultiAgentSchemaLabels {
  if (locale === 'en') {
    return {
      title: 'Business multi-agent flow',
      input: pair('Input', ''),
      router: pair('Router', ''),
      coordinator: pair('Coordinator', ''),
      specialistA: pair('Specialist A', ''),
      specialistB: pair('Specialist B', ''),
      evaluator: pair('Evaluator', ''),
      output: pair('Output', ''),
      edgeVerbs: {
        routes: 'routes',
        selects: 'selects',
        assigns: 'assigns',
        handsOff: 'hands off',
        approves: 'approves',
        returns: 'returns',
      },
      aria: 'Business multi-agent flow: input, optional router, coordinator, two specialists, evaluator with return to coordinator, output with human approval',
    };
  }

  return {
    title: 'Verslo kelių agentų srautas',
    input: pair('Įvestis', ''),
    router: pair('Maršrutizatorius', ''),
    coordinator: pair('Koordinatorius', ''),
    specialistA: pair('Specialistas A', ''),
    specialistB: pair('Specialistas B', ''),
    evaluator: pair('Vertintojas', ''),
    output: pair('Išvestis', ''),
    edgeVerbs: {
      routes: 'nukreipia',
      selects: 'parenka',
      assigns: 'paskiria',
      handsOff: 'perduoda',
      approves: 'tvirtina',
      returns: 'grąžina',
    },
    aria: 'Verslo kelių agentų srautas: įvestis, pasirenkamas maršrutizatorius, koordinatorius, du specialistai, vertintojas su grąžinimu koordinatoriui ir išvestis su žmogaus patvirtinimu',
  };
}

export function getM12MultiAgentStepExplanations(
  locale: M10Locale
): M12MultiAgentStepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Input',
        body: 'Define the task, data and limits before work is split between roles.',
      },
      {
        title: 'Router',
        body: 'The optional router classifies the request and routes it to the right path.',
      },
      {
        title: 'Coordinator',
        body: 'The coordinator breaks the task into parts, assigns specialists and merges their outputs.',
      },
      {
        title: 'Specialists',
        body: 'Specialists do narrow work: research, draft, calculation or checks – then hand off in a clear format.',
      },
      {
        title: 'Evaluator',
        body: 'The evaluator checks quality, rules and gaps. If quality fails, work returns to the coordinator (dashed feedback) instead of going to output.',
      },
      {
        title: 'Output + human approval',
        body: 'The final output passes through human control before it reaches a customer or manager.',
      },
    ];
  }

  return [
    {
      title: 'Įvestis',
      body: 'Apibrėžk užduotį, duomenis ir apribojimus prieš skaidant darbą rolėms.',
    },
    {
      title: 'Maršrutizatorius',
      body: 'Pasirenkamas maršrutizatorius klasifikuoja užklausą ir nukreipia ją į tinkamą kelią.',
    },
    {
      title: 'Koordinatorius',
      body: 'Koordinatorius suskaido užduotį, paskiria specialistus ir sujungia jų rezultatus.',
    },
    {
      title: 'Specialistai',
      body: 'Specialistai vykdo siaurus darbus: tyrimą, juodraštį, skaičiavimą arba patikrą – tada perduoda aiškiu formatu.',
    },
    {
      title: 'Vertintojas',
      body: 'Vertintojas patikrina kokybę, taisykles ir spragas. Jei kokybė netinka – darbas grįžta koordinatoriui (punktyrinė feedback rodyklė), o ne į išvestį.',
    },
    {
      title: 'Išvestis + žmogaus patvirtinimas',
      body: 'Galutinis rezultatas pereina žmogaus kontrolę prieš siunčiant klientui ar vadovui.',
    },
  ];
}
