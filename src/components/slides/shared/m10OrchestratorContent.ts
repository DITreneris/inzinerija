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
  /** Verb edge labels (Option B – not noun-echo of nodes). */
  edgeVerbs: Record<string, string>;
}

export interface M10OrchestratorStepExplanation {
  title: string;
  body: string;
}

const EDGE_VERBS_LT: Record<string, string> = {
  'input-router': 'nukreipia',
  'router-orch': 'parenka srautą',
  'state-orch': 'skaito / įrašo',
  'orch-research': 'paskiria agentus',
  'orch-summarize': 'paskiria agentus',
  'orch-validate': 'paskiria agentus',
  'research-tools': 'kviečia',
  'validate-eval': 'perduoda',
  'eval-output': 'patvirtina',
  'eval-retry': 'Kartoti',
};

const EDGE_VERBS_EN: Record<string, string> = {
  'input-router': 'routes',
  'router-orch': 'selects flow',
  'state-orch': 'read / write',
  'orch-research': 'assigns agents',
  'orch-summarize': 'assigns agents',
  'orch-validate': 'assigns agents',
  'research-tools': 'calls',
  'validate-eval': 'hands off',
  'eval-output': 'approves',
  'eval-retry': 'Retry',
};

const LABELS_LT: M10OrchestratorLabels = {
  aria: 'Agentų orkestravimo srautas: įvestis, maršrutizatorius, orkestratorius, būsena, specialistai (Tyrėjas, Rašytojas, Tikrintojas), įrankiai, vertintojas, rezultatas',
  title: 'Agentų orkestravimo simuliacija',
  agentsBand: 'Vykdymo agentai',
  retryLabel: 'Kartoti',
  hitlNote: 'Alternatyva: perduoti žmogui',
  nodes: {
    input: ['Įvestis', 'tikslas + ribos'],
    router: ['Maršrutizatorius', 'kur eiti'],
    orchestrator: ['Orkestratorius', 'planas + bandymai'],
    state: ['Būsena', 'atmintis / changelog'],
    research: ['Tyrėjas', 'paieška'],
    summarize: ['Rašytojas', 'sintezė'],
    validate: ['Tikrintojas', 'kokybės vartai'],
    tools: ['Įrankiai', 'paieška / API'],
    evaluator: ['Vertintojas', 'Patvirtinti / Kartoti'],
    output: ['Rezultatas', 'patvirtintas'],
  },
  edgeVerbs: EDGE_VERBS_LT,
};

const STEPS_LT: M10OrchestratorStepExplanation[] = [
  {
    title: 'Įvestis',
    body: 'Sistema gauna RFP užduotį: paruošti trumpą santrauką (5 punktai); kiekvienam punktui – privaloma citata iš patikimo šaltinio. Ribos – jokių „iš galvos“ teiginių be šaltinio.',
  },
  {
    title: 'Maršrutizatorius',
    body: 'Maršrutizatorius nusprendžia KUR eiti: tai ne greitas vienas atsakymas, o kelių žingsnių tyrimo srautas. Jis parenka srautą, bet dar nesudaro plano ir nedeleguoja agentų.',
  },
  {
    title: 'Orkestratorius',
    body: 'Orkestratorius nusprendžia KAIP: sudaro planą Tyrėjas → Rašytojas → Tikrintojas, seka bandymų limitus. Būsena (atmintis / changelog) saugo kontekstą ir kas jau bandyta.',
  },
  {
    title: 'Specialistai ir įrankiai',
    body: 'Tyrėjas per įrankius ieško šaltinių RFP punktams; Rašytojas sutraukia faktus į santraukos punktus. Agentai – siauri darbuotojai; įrankiai (paieška / API) – išorinis sluoksnis, kurį jie kviečia.',
  },
  {
    title: 'Klaida ir KARTOTI',
    body: 'Tikrintojas (vykdymo agentas) randa punktą be citatos. Vertintojas (galutinis vartas) sprendžia KARTOTI ir grąžina orkestratoriui tikslų taisymo nurodymą – ne „paleisk viską iš naujo“.',
  },
  {
    title: 'Taisymas ir rezultatas',
    body: 'Orkestratorius paleidžia tik Tyrėją iš naujo; citata atsiranda, Tikrintojas praeina. Rezultatas – Patvirtinti. Jei rizika didelė (pvz. teisinė atsakomybė), Vertintojas gali perduoti žmogui.',
  },
];

const LABELS_EN: M10OrchestratorLabels = {
  aria: 'Agent orchestration flow: input, router, orchestrator, state, specialists (Researcher, Writer, Checker), tools, evaluator, output',
  title: 'Agent orchestration walkthrough',
  agentsBand: 'Execution agents',
  retryLabel: 'Retry',
  hitlNote: 'Alternative: hand off to a human',
  nodes: {
    input: ['Input', 'goal + limits'],
    router: ['Router', 'where to go'],
    orchestrator: ['Orchestrator', 'plan + retries'],
    state: ['State', 'memory / changelog'],
    research: ['Researcher', 'search'],
    summarize: ['Writer', 'synthesis'],
    validate: ['Checker', 'quality gate'],
    tools: ['Tools', 'search / API'],
    evaluator: ['Evaluator', 'Approve / Retry'],
    output: ['Output', 'approved'],
  },
  edgeVerbs: EDGE_VERBS_EN,
};

const STEPS_EN: M10OrchestratorStepExplanation[] = [
  {
    title: 'Input',
    body: 'The system receives an RFP task: prepare a short summary (5 bullets); each bullet needs a citation from a reliable source. Limits – no claims “from memory” without a source.',
  },
  {
    title: 'Router',
    body: 'The router decides WHERE work should go: this is not a single quick answer, but a multi-step research flow. It picks the path, but does not yet build the plan or assign agents.',
  },
  {
    title: 'Orchestrator',
    body: 'The orchestrator decides HOW: it builds the plan Researcher → Writer → Checker and tracks retry limits. State (memory / changelog) keeps context and what was already tried.',
  },
  {
    title: 'Specialists and tools',
    body: 'The Researcher finds sources for RFP bullets via tools; the Writer compresses facts into summary points. Agents are narrow workers; tools (search / API) are the external layer they call.',
  },
  {
    title: 'Error and RETRY',
    body: 'The Checker (execution agent) finds a bullet without a citation. The Evaluator (final gate) decides RETRY and sends the orchestrator a targeted fix – not “rerun everything”.',
  },
  {
    title: 'Fix and output',
    body: 'The orchestrator reruns only the Researcher; the citation appears, the Checker passes. Output is Approve. If risk is high (e.g. legal liability), the evaluator can hand off to a human.',
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
