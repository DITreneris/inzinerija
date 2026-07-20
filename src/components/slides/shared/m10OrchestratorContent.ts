/** M10 10.482 – Agentų orkestravimo simuliacija LT/EN labels + step explanations */

export type M10OrchestratorLocale = 'lt' | 'en';

export interface M10OrchestratorLabels {
  aria: string;
  title: string;
  agentsBand: string;
  retryLabel: string;
  hitlNote: string;
  nodes: {
    input: [string, string];
    router: [string, string];
    orchestrator: [string, string];
    state: [string, string];
    research: [string, string];
    summarize: [string, string];
    validate: [string, string];
    tools: [string, string];
    evaluator: [string, string];
    output: [string, string];
  };
}

export interface M10OrchestratorStepExplanation {
  title: string;
  body: string;
}

const LABELS_LT: M10OrchestratorLabels = {
  aria: 'Agentų orkestravimo srautas: įvestis, maršrutizatorius, orkestratorius, būsena, specialistai, įrankiai, tikrinimas, vertintojas, rezultatas',
  title: 'Agentų orkestravimo simuliacija',
  agentsBand: 'Vykdymo agentai',
  retryLabel: 'Kartoti (tikslinis)',
  hitlNote: 'Alternatyva: perduoti žmogui',
  nodes: {
    input: ['Įvestis', 'tikslas + ribos'],
    router: ['Router', 'kur eiti'],
    orchestrator: ['Orkestratorius', 'planas + bandymai'],
    state: ['Būsena', 'atmintis / žurnalai'],
    research: ['Tyrimas', 'paieška'],
    summarize: ['Sąrašas', 'sintezė'],
    validate: ['Tikrinimas', 'kokybės vartai'],
    tools: ['Įrankiai', 'paieška / API'],
    evaluator: ['Vertintojas', 'Patvirtinti / Kartoti'],
    output: ['Rezultatas', 'patvirtintas'],
  },
};

const STEPS_LT: M10OrchestratorStepExplanation[] = [
  {
    title: 'Įvestis',
    body: 'Sistema gauna užduotį su tikslu ir ribomis. Scenarijus: paruošti trumpą ES DI Akto kontrolinį sąrašą įdarbinimo DI sistemai – tik iš patikimų šaltinių.',
  },
  {
    title: 'Router',
    body: 'Maršrutizatorius nusprendžia KUR eiti: čia – kelių žingsnių tyrimas, ne vienas greitas atsakymas. Jis parenka srautą, bet dar neplanuoja žingsnių.',
  },
  {
    title: 'Orkestratorius',
    body: 'Orkestratorius nusprendžia KAIP: sudaro planą Tyrimas → Sąrašas → Tikrinimas, seka būseną ir bandymų limitus. Būsenos sluoksnis saugo kontekstą visiems žingsniams.',
  },
  {
    title: 'Specialistai ir įrankiai',
    body: 'Tyrimo agentas ieško šaltinių per įrankius; sąrašo agentas sutraukia faktus į kontrolinį sąrašą. Agentai yra siauri darbuotojai – įrankiai atskiria išorinį pasaulį.',
  },
  {
    title: 'Klaida ir KARTOTI',
    body: 'Tikrinimas randa trūkstamą šaltinį. Vertintojas priima sisteminį sprendimą KARTOTI ir grąžina orkestratoriui tikslų taisymo nurodymą – ne „paleisk viską iš naujo“.',
  },
  {
    title: 'Taisymas ir rezultatas',
    body: 'Orkestratorius paleidžia tik tyrimą iš naujo, citata atsiranda, tikrinimas praeina. Rezultatas pateikiamas naudotojui; rizikinguose atvejuose vertintojas gali perduoti žmogui.',
  },
];

const LABELS_EN: M10OrchestratorLabels = {
  aria: 'Agent orchestration flow: input, router, orchestrator, state, specialists, tools, validation, evaluator, output',
  title: 'Agent orchestration walkthrough',
  agentsBand: 'Execution agents',
  retryLabel: 'Retry (targeted)',
  hitlNote: 'Alternative: hand off to a human',
  nodes: {
    input: ['Input', 'goal + limits'],
    router: ['Router', 'where to go'],
    orchestrator: ['Orchestrator', 'plan + retries'],
    state: ['State', 'memory / logs'],
    research: ['Research', 'search'],
    summarize: ['Checklist', 'synthesis'],
    validate: ['Validation', 'quality gate'],
    tools: ['Tools', 'search / API'],
    evaluator: ['Evaluator', 'Approve / Retry'],
    output: ['Output', 'approved'],
  },
};

const STEPS_EN: M10OrchestratorStepExplanation[] = [
  {
    title: 'Input',
    body: 'The system receives a task with a goal and limits. Scenario: prepare a short EU AI Act checklist for hiring AI – only from reliable sources.',
  },
  {
    title: 'Router',
    body: 'The router decides WHERE work should go: here, a multi-step research flow – not a single quick answer. It picks the path, but does not yet plan the steps.',
  },
  {
    title: 'Orchestrator',
    body: 'The orchestrator decides HOW: it builds the plan Research → Checklist → Validation, tracks state and retry limits. The state layer keeps context for every step.',
  },
  {
    title: 'Specialists and tools',
    body: 'The research agent finds sources via tools; the checklist agent compresses facts into a short list. Agents are narrow workers – tools separate the outside world.',
  },
  {
    title: 'Error and RETRY',
    body: 'Validation finds a missing source. The evaluator makes a system decision RETRY and sends the orchestrator a targeted fix instruction – not “rerun everything”.',
  },
  {
    title: 'Fix and output',
    body: 'The orchestrator reruns only research, the citation appears, validation passes. The user gets the result; in high-risk cases the evaluator can hand off to a human.',
  },
];

export function getM10OrchestratorLabels(
  locale: M10OrchestratorLocale
): M10OrchestratorLabels {
  return locale === 'en' ? LABELS_EN : LABELS_LT;
}

export function getM10OrchestratorStepExplanations(
  locale: M10OrchestratorLocale
): M10OrchestratorStepExplanation[] {
  return locale === 'en' ? STEPS_EN : STEPS_LT;
}
