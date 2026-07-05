export type M10LearningLoopLocale = 'lt' | 'en';

export interface M10LearningLoopLabels {
  aria: string;
  title: string;
  executionTitle: string;
  learningTitle: string;
  record: string;
  improveNextRun: string;
  updateRules: string;
  updateSkills: string;
  nodes: {
    task: [string, string];
    rules: [string, string];
    orchestrator: [string, string];
    agents: [string, string];
    skills: [string, string];
    output: [string, string];
    logs: [string, string];
    evaluation: [string, string];
    lessons: [string, string];
    update: [string, string];
  };
}

export interface M10LearningLoopStepExplanation {
  title: string;
  body: string;
}

const LABELS_LT: M10LearningLoopLabels = {
  aria: 'Uždaro mokymosi ciklas: užduotis, taisyklės, koordinatorius, agentai, įgūdžiai, rezultatas, veiksmų istorija, patikra, pamokos ir atnaujinimas',
  title: 'Uždaro mokymosi ciklas agentams',
  executionTitle: 'Vykdymo sistema',
  learningTitle: 'Mokymosi ciklas',
  record: 'fiksuoti',
  improveNextRun: 'gerina kitą bandymą',
  updateRules: 'atnaujina taisykles',
  updateSkills: 'atnaujina įgūdžius',
  nodes: {
    task: ['Užduotis', 'tikslas arba prašymas'],
    rules: ['Taisyklės', 'ribos, principai'],
    orchestrator: ['Koordinatorius', 'planuoja, skirsto'],
    agents: ['Agentai', 'tyrėjas, rašytojas, QA'],
    skills: ['Įgūdžiai', 'paieška, rašymas, testai'],
    output: ['Rezultatas', 'atsakymas, kodas, sprendimas'],
    logs: ['Veiksmų istorija', 'žingsniai, klaidos, pastabos'],
    evaluation: ['Patikra', 'kriterijai, spragos'],
    lessons: ['Pamokos', 'ką gerinti kitą kartą'],
    update: ['Atnaujinimas', 'taisyklės, įgūdžiai, testai'],
  },
};

const STEP_EXPLANATIONS_LT: M10LearningLoopStepExplanation[] = [
  {
    title: 'Vykdymas',
    body: 'Sistema gauna užduotį, taiko taisykles, per koordinatorių paskirsto agentams ir įgūdžiams, tada grąžina rezultatą.',
  },
  {
    title: 'Įrašymas',
    body: 'Veiksmų istorija fiksuoja žingsnius, klaidas ir pastabas. Be logų nėra iš ko mokytis kitam bandymui.',
  },
  {
    title: 'Vertinimas',
    body: 'Patikra lygina rezultatą su kriterijais, o pamokos įvardija, ką verta keisti kitą kartą.',
  },
  {
    title: 'Atnaujinimas',
    body: 'Sistema atnaujina taisykles arba įgūdžius, kad kitas bandymas būtų aiškesnis, saugesnis ir greitesnis.',
  },
];

const LABELS_EN: M10LearningLoopLabels = {
  aria: 'Closed learning loop for agents: task, rules, coordinator, agents, skills, output, logs, evaluation, lessons and update',
  title: 'Closed learning loop for agents',
  executionTitle: 'Execution system',
  learningTitle: 'Learning loop',
  record: 'record',
  improveNextRun: 'improves next run',
  updateRules: 'updates rules',
  updateSkills: 'updates skills',
  nodes: {
    task: ['Task', 'goal or request'],
    rules: ['Rules', 'limits, principles'],
    orchestrator: ['Coordinator', 'plans, routes'],
    agents: ['Agents', 'research, writing, QA'],
    skills: ['Skills', 'search, write, test'],
    output: ['Output', 'answer, code, decision'],
    logs: ['Logs', 'steps, errors, feedback'],
    evaluation: ['Evaluation', 'criteria, gaps'],
    lessons: ['Lessons', 'what improves next run'],
    update: ['Learning update', 'rules, skills, tests'],
  },
};

const STEP_EXPLANATIONS_EN: M10LearningLoopStepExplanation[] = [
  {
    title: 'Execution',
    body: 'The system receives a task, applies rules, routes work through the coordinator to agents and skills, then returns the output.',
  },
  {
    title: 'Recording',
    body: 'Logs capture steps, errors and notes. Without logs, the next run has nothing concrete to learn from.',
  },
  {
    title: 'Evaluation',
    body: 'Evaluation checks the output against criteria, and lessons name what should change next time.',
  },
  {
    title: 'Update',
    body: 'The system updates rules or skills so the next run is clearer, safer and faster.',
  },
];

export function getM10LearningLoopLabels(
  locale: M10LearningLoopLocale
): M10LearningLoopLabels {
  return locale === 'en' ? LABELS_EN : LABELS_LT;
}

export function getM10LearningLoopStepExplanations(
  locale: M10LearningLoopLocale
): M10LearningLoopStepExplanation[] {
  return locale === 'en' ? STEP_EXPLANATIONS_EN : STEP_EXPLANATIONS_LT;
}
