/**
 * Agentų ciklo diagramos (M10.2) etiketės LT/EN.
 * Geometrija lieka AgentWorkflowDiagram.tsx; čia tik tekstas (SCHEME_AGENT: CONTENT vs geometry).
 * EN locale naudoja „AI", ne „DI" (PAPRASTOS_KALBOS_GAIRES §4).
 */
export type AgentWorkflowLocale = 'lt' | 'en';

export interface AgentWorkflowStep {
  title: string;
  desc: string;
}

export interface AgentWorkflowLabels {
  /** 5 blokai: Agentas → Planavimas → Įrankiai → Aplinka → Rezultatas. */
  steps: AgentWorkflowStep[];
  /** 4 forward rodyklių etiketės (tarp blokų). */
  forwardLabels: string[];
  /** Feedback kilpos etiketė. */
  feedbackLabel: string;
  /** Diagramos antraštė (SVG <text>). */
  diagramTitle: string;
  /** Visos diagramos aria-label. */
  ariaLabel: string;
  /** Feedback path <title> (tooltip). */
  feedbackTitle: string;
  /** Žingsnio (clickable rect) aria-label. */
  stepAria: (index: number, title: string) => string;
}

const LABELS_LT: AgentWorkflowLabels = {
  steps: [
    { title: 'Agentas', desc: 'DI sistema' },
    { title: 'Planavimas', desc: 'žingsniai' },
    { title: 'Įrankiai', desc: 'paieška, API' },
    { title: 'Aplinka', desc: 'kontekstas' },
    { title: 'Rezultatas', desc: 'išvestis' },
  ],
  forwardLabels: ['užduotis', 'žingsniai', 'įrankiai', 'kontekstas'],
  feedbackLabel: 'grįžtamasis ryšys',
  diagramTitle: 'Agentų ciklas',
  ariaLabel:
    'Agentų ciklas: Agentas, Planavimas, Įrankiai, Aplinka, Rezultatas ir grįžtamasis ryšys',
  feedbackTitle: 'Grįžtamasis ryšys: rezultatas grįžta į agentą',
  stepAria: (i, title) => `Žingsnis ${i + 1}: ${title}`,
};

const LABELS_EN: AgentWorkflowLabels = {
  steps: [
    { title: 'Agent', desc: 'AI system' },
    { title: 'Planning', desc: 'steps' },
    { title: 'Tools', desc: 'search, API' },
    { title: 'Environment', desc: 'context' },
    { title: 'Result', desc: 'output' },
  ],
  forwardLabels: ['task', 'steps', 'tools', 'context'],
  feedbackLabel: 'feedback loop',
  diagramTitle: 'Agent cycle',
  ariaLabel:
    'Agent cycle: Agent, Planning, Tools, Environment, Result and feedback loop',
  feedbackTitle: 'Feedback: result returns to the agent',
  stepAria: (i, title) => `Step ${i + 1}: ${title}`,
};

export function getAgentWorkflowLabels(
  locale: AgentWorkflowLocale
): AgentWorkflowLabels {
  return locale === 'en' ? LABELS_EN : LABELS_LT;
}

export interface AgentWorkflowStepExplanation {
  title: string;
  body: string;
}

const STEP_EXPLANATIONS_LT: AgentWorkflowStepExplanation[] = [
  {
    title: 'Agentas',
    body: '**DI sistema**, kuri savarankiškai planuoja ir vykdo užduotį. Stebi tikslą, parenka veiksmus ir mokosi iš rezultatų.',
  },
  {
    title: 'Planavimas',
    body: '**Užduotis skaidoma į žingsnius** – ką daryti pirma, ką po to. Agentas sudaro veiksmų planą prieš veikdamas.',
  },
  {
    title: 'Įrankiai',
    body: '**Agentas naudoja įrankius** – paiešką, API, kodo vykdymą, duomenų bazes. Taip jis gauna informaciją, kurios pats „neturi".',
  },
  {
    title: 'Aplinka',
    body: '**Kontekstas ir aplinkos atsakas** – įrankių rezultatai, dokumentai, vartotojo įvestis grįžta į agentą ir formuoja kitą žingsnį.',
  },
  {
    title: 'Rezultatas',
    body: '**Galutinė išvestis** – atsakymas, dokumentas ar veiksmas. Rezultatas įvertinamas ir **grįžtamuoju ryšiu** grįžta į agentą tobulinimui.',
  },
];

const STEP_EXPLANATIONS_EN: AgentWorkflowStepExplanation[] = [
  {
    title: 'Agent',
    body: '**AI system** that plans and executes a task autonomously. It tracks the goal, chooses actions and learns from results.',
  },
  {
    title: 'Planning',
    body: '**The task is broken into steps** – what to do first, what next. The agent builds an action plan before acting.',
  },
  {
    title: 'Tools',
    body: '**The agent uses tools** – search, APIs, code execution, databases. This is how it gets information it does not have on its own.',
  },
  {
    title: 'Environment',
    body: '**Context and environment response** – tool results, documents and user input return to the agent and shape the next step.',
  },
  {
    title: 'Result',
    body: '**Final output** – an answer, document or action. The result is evaluated and returns to the agent as **feedback** for improvement.',
  },
];

export function getAgentWorkflowStepExplanations(
  locale: AgentWorkflowLocale
): AgentWorkflowStepExplanation[] {
  return locale === 'en' ? STEP_EXPLANATIONS_EN : STEP_EXPLANATIONS_LT;
}
