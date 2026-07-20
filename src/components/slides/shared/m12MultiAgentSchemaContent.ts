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
  handoff: string;
  hitl: string;
  feedback: string;
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
      input: pair('Input', 'task + data'),
      router: pair('Router', 'optional'),
      coordinator: pair('Coordinator', 'splits work'),
      specialistA: pair('Specialist A', 'research / draft'),
      specialistB: pair('Specialist B', 'calculation / check'),
      evaluator: pair('Evaluator', 'QC + returns'),
      output: pair('Output', 'HITL gate'),
      handoff: 'clear handoff',
      hitl: 'human approves',
      feedback: 'return to coordinator',
      aria: 'Business multi-agent flow: input, optional router, coordinator, two specialists, evaluator with return to coordinator, output with human approval',
    };
  }

  return {
    title: 'Verslo kelių agentų srautas',
    input: pair('Įvestis', 'užduotis + duomenys'),
    router: pair('Maršrutizatorius', 'pasirenkama'),
    coordinator: pair('Koordinatorius', 'padalina darbą'),
    specialistA: pair('Specialistas A', 'tyrimas / juodraštis'),
    specialistB: pair('Specialistas B', 'skaičiavimas / patikra'),
    evaluator: pair('Vertintojas', 'kokybė + grąžinimas'),
    output: pair('Išvestis', 'žmogaus patvirtinimas'),
    handoff: 'aiškus perdavimas',
    hitl: 'žmogus patvirtina',
    feedback: 'grąžinimas koordinatoriui',
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
        body: 'The optional router classifies the request and sends it to the right path.',
      },
      {
        title: 'Coordinator',
        body: 'The coordinator breaks the task into parts, assigns specialists and merges their outputs.',
      },
      {
        title: 'Specialists',
        body: 'Specialists do narrow work: research, draft, calculation or checks.',
      },
      {
        title: 'Evaluator',
        body: 'The evaluator checks quality, rules and gaps. If quality fails, work returns to the coordinator (dashed feedback) instead of going to output.',
      },
      {
        title: 'Output + HITL',
        body: 'The final output passes through a human approval gate before it reaches a customer or manager.',
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
      body: 'Specialistai vykdo siaurus darbus: tyrimą, juodraštį, skaičiavimą arba patikrą.',
    },
    {
      title: 'Vertintojas',
      body: 'Vertintojas patikrina kokybę, taisykles ir spragas. Jei kokybė netinka – darbas grįžta koordinatoriui (punktyrinė feedback rodyklė), o ne į išvestį.',
    },
    {
      title: 'Išvestis + žmogaus patvirtinimas',
      body: 'Galutinis rezultatas pereina žmogaus patvirtinimo vartą prieš siunčiant klientui ar vadovui.',
    },
  ];
}
