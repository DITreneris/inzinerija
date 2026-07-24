/** M10 diagramų etiketės LT / EN – sinchronas su Moduliu 10 SOT */

import type { StepExplanation } from './stepExplanations';

export type M10Locale = 'lt' | 'en';

export function getM10TriggerFlowLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Workflow chain',
      trigger: 'Trigger',
      triggerSub: 'starts the flow',
      condition: 'Condition',
      conditionSub: 'branch / filter',
      action: 'Action',
      actionSub: 'system step',
      webhook: 'Webhook',
      webhookSub: 'real-time event',
      arrowToTrigger: 'can act as trigger',
      aria: 'Workflow: Trigger, Condition, Action; Webhook can start like a trigger',
    };
  }
  return {
    title: 'Workflow grandinė',
    trigger: 'Trigger',
    triggerSub: 'paleidžia srautą',
    condition: 'Condition',
    conditionSub: 'šaka / filtras',
    action: 'Action',
    actionSub: 'veiksmas sistemoje',
    webhook: 'Webhook',
    webhookSub: 'realaus laiko įvykis',
    arrowToTrigger: 'gali veikti kaip paleidiklis',
    aria: 'Workflow: Trigger, Condition, Action; Webhook gali veikti kaip paleidiklis',
  };
}

export function getM10ThreeALabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: '3A strategy (80 / 15 / 5)',
      auto: 'AUTOMATIZE',
      autoPct: '80 %',
      autoSub: 'Rules – fewer errors',
      aug: 'AUGMENT',
      augPct: '15 %',
      augSub: 'Human decides, model helps',
      auton: 'AUTONOMIZE',
      autonPct: '5 %',
      autonSub: 'Agents only with limits',
      hint: 'Tap a band – when to choose it',
      aria: '3A strategy: Automatize eighty percent, Augment fifteen, Autonomize five',
      regionAria: '3A strategy – three bands',
      youAreHere: 'You are here:',
      stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
      navAria: '3A strategy band selection',
      stepAria: (i: number, title: string) => `Band ${i + 1}: ${title}`,
      enlargeLabel: '3A strategy (80 / 15 / 5)',
    };
  }
  return {
    title: '3A strategija (80 / 15 / 5)',
    auto: 'AUTOMATIZE',
    autoPct: '80 %',
    autoSub: 'Taisyklės – mažiau klaidų',
    aug: 'AUGMENT',
    augPct: '15 %',
    augSub: 'Žmogus sprendžia, DI padeda',
    auton: 'AUTONOMIZE',
    autonPct: '5 %',
    autonSub: 'Agentai tik su ribomis',
    hint: 'Paspausk juostą – kada rinktis',
    aria: '3A strategija: Automatize 80 %, Augment 15 %, Autonomize 5 %',
    regionAria: '3A strategija – trys juostos',
    youAreHere: 'Tu esi čia:',
    stepOf: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    navAria: '3A strategijos juostos pasirinkimas',
    stepAria: (i: number, title: string) => `Juosta ${i + 1}: ${title}`,
    enlargeLabel: '3A strategija (80 / 15 / 5)',
  };
}

/** Shell walkthrough – SOT 10.25: Kiek / Kodėl / Pvz. */
export function getM10ThreeAExplanations(locale: M10Locale): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'AUTOMATIZE',
        body: '**80 %** – rule-based (no human at each step). Why: fewer errors, predictable. E.g. form → CRM → email.',
      },
      {
        title: 'AUGMENT',
        body: '**15 %** – human decides, model helps (summary, classification). Why: judgment / accountability. E.g. draft → human approve → send.',
      },
      {
        title: 'AUTONOMIZE',
        body: '**5 %** – agents with guardrails and escalation. Why: costly / risky – keep this band small. E.g. research agent → quality check → escalate if unsure.',
      },
    ];
  }
  return [
    {
      title: 'AUTOMATIZE',
      body: '**80 %** – taisyklėmis (be žmogaus kiekviename žingsnyje). Kodėl: mažiau klaidų, nuspėjama. Pvz.: forma → CRM → laiškas.',
    },
    {
      title: 'AUGMENT',
      body: '**15 %** – žmogus sprendžia, DI padeda (santrauka, klasifikacija). Kodėl: reikia sprendimo / atsakomybės. Pvz.: juodraštis → žmogaus patvirtinimas → siuntimas.',
    },
    {
      title: 'AUTONOMIZE',
      body: '**5 %** – agentai su ribomis ir eskalacija. Kodėl: brangu / rizikinga – tik siaura juosta. Pvz.: tyrimo agentas → kokybės kontrolė → eskalacija, jei neaišku.',
    },
  ];
}

export type M10ToolLeaf = { id: string; condition: string; tool: string };

export function getM10ToolTreeLeaves(locale: M10Locale): M10ToolLeaf[] {
  if (locale === 'en') {
    return [
      { id: 'm365', condition: 'Office 365 daily', tool: 'Power Automate' },
      { id: 'quick', condition: 'Non-tech, quick start', tool: 'Zapier' },
      { id: 'logic', condition: 'Complex logic + cost', tool: 'Make.com' },
      { id: 'host', condition: 'Self-host / data on-prem', tool: 'n8n' },
      { id: 'ent', condition: 'Enterprise governance', tool: 'Workato' },
    ];
  }
  return [
    { id: 'm365', condition: 'Office 365 kasdien', tool: 'Power Automate' },
    { id: 'quick', condition: 'Netechninė komanda, greitai', tool: 'Zapier' },
    { id: 'logic', condition: 'Sudėtinga logika + kaina', tool: 'Make.com' },
    { id: 'host', condition: 'Savihost / duomenys pas mus', tool: 'n8n' },
    { id: 'ent', condition: 'Didelės įmonės valdymas', tool: 'Workato' },
  ];
}

export function getM10ToolTreeLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Tool choice (workflow)',
      root: 'Your context?',
      pick: 'Tap a branch',
      aria: 'Decision tree for automation tools',
    };
  }
  return {
    title: 'Įrankio pasirinkimas (workflow)',
    root: 'Tavo kontekstas?',
    pick: 'Paspausk šaką',
    aria: 'Sprendimų medis automatizavimo įrankiams',
  };
}

export function getM10AgentTaxonomyLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Agent depth and roles',
      subtitle: 'Depth levels and agent roles',
      ladderTitle: 'Depth levels',
      rolesTitle: 'L2 team example',
      rolesTitleGhost: 'Team – select L2',
      hint: 'Tap a level or role – explanation below',
      l0: 'L0 Chat',
      l0Sub: 'Question and answer',
      l1: 'L1 Agent',
      l1Sub: 'Steps and tools',
      l2: 'L2 Team',
      l2Sub: 'Roles and handoffs',
      l3: 'L3 Flow',
      l3Sub: 'Triggers and actions',
      router: 'Router',
      coordinator: 'Coordinator',
      specialist: 'Specialist',
      evaluator: 'Evaluator',
      edgeRoutes: 'routes',
      edgeDelegates: 'delegates',
      edgeDelivers: 'delivers',
      edgeReviews: 'reviews',
      edgeReturns: 'returns',
      edgeSelectedLevel: 'Selected level',
      aria: 'Agent depth and roles: L0 to L3 depth ladder and four multi-agent roles with handoffs',
    };
  }
  return {
    title: 'Agentų gylis ir rolės',
    subtitle: 'Gylio lygiai ir agentų rolės',
    ladderTitle: 'Gylio lygiai',
    rolesTitle: 'L2 komandos pavyzdys',
    rolesTitleGhost: 'Komanda – pasirink L2',
    hint: 'Paspausk lygį ar rolę – paaiškinimas apačioje',
    l0: 'L0 Pokalbis',
    l0Sub: 'Klausimas ir atsakymas',
    l1: 'L1 Agentas',
    l1Sub: 'Žingsniai ir įrankiai',
    l2: 'L2 Komanda',
    l2Sub: 'Rolės ir perdavimai',
    l3: 'L3 Srautas',
    l3Sub: 'Trigeriai ir veiksmai',
    router: 'Maršrutizatorius',
    coordinator: 'Koordinatorius',
    specialist: 'Specialistas',
    evaluator: 'Vertintojas',
    edgeRoutes: 'nukreipia',
    edgeDelegates: 'deleguoja',
    edgeDelivers: 'pateikia',
    edgeReviews: 'vertina',
    edgeReturns: 'grąžina',
    edgeSelectedLevel: 'Pasirinktas lygis',
    aria: 'Agentų gylis ir rolės: L0–L3 gylio kopėčios ir keturios kelių agentų rolės su perdavimais',
  };
}

export function getM10AgentTaxonomyExplanations(locale: M10Locale) {
  if (locale === 'en') {
    return [
      {
        title: 'L0 – Chat',
        body: 'One question–answer. Example: draft an email. **Automatize** rarely needs this; use when a single reply is enough.',
      },
      {
        title: 'L1 – Agent',
        body: 'One agent, several steps + tools (research + summary). Maps to **Augment (15 %)**: model helps, human confirms.',
      },
      {
        title: 'L2 – Team',
        body: 'Several roles and handoffs (RFP: researcher → writer → reviewer). **This is when the right-hand roles appear.** Maps to **Autonomize (5 %)** with an evaluator.',
      },
      {
        title: 'L3 – Flow',
        body: 'Trigger → actions (form → CRM → email). Usually **Automatize (80 %)** – a flow, not a multi-agent team.',
      },
      {
        title: 'Router',
        body: 'Routes by type (reception / triage). **Input:** request. **Output:** which role or branch. Not the same as coordinator.',
      },
      {
        title: 'Coordinator',
        body: 'Breaks down the task, delegates, merges results (team lead). **Input:** goal. **Output:** plan + assigned work.',
      },
      {
        title: 'Specialist',
        body: 'Does one narrow job: search, draft, calculation. **Input:** brief from coordinator. **Output:** artefact for review.',
      },
      {
        title: 'Evaluator',
        body: 'QC and rules; returns for revision (editor / compliance). **Input:** draft. **Output:** pass / fix / escalate.',
      },
    ];
  }
  return [
    {
      title: 'L0 – Pokalbis',
      body: 'Vienas klausimas–atsakymas. Pvz. el. laiško juodraštis. Kai užtenka vieno atsakymo – nekurk komandos.',
    },
    {
      title: 'L1 – Agentas',
      body: 'Vienas agentas, keli žingsniai + įrankiai (tyrimas + santrauka). **Augment (15 %)**: DI padeda, žmogus patvirtina.',
    },
    {
      title: 'L2 – Komanda',
      body: 'Kelios rolės ir perdavimai (RFP: tyrėjas → rašytojas → tikrintojas). **Čia atsiranda dešinės rolės.** **Autonomize (5 %)** su vertintoju.',
    },
    {
      title: 'L3 – Srautas',
      body: 'Trigger → veiksmai (forma → CRM → laiškas). Dažniausiai **Automatize (80 %)** – srautas, ne kelių agentų komanda.',
    },
    {
      title: 'Maršrutizatorius',
      body: 'Nukreipia pagal tipą (registratūra / triažas). **Įvestis:** užklausa. **Išvestis:** kuri rolė ar šaka. Tai ne koordinatorius.',
    },
    {
      title: 'Koordinatorius',
      body: 'Skaido užduotį, deleguoja, sujungia rezultatus (komandos vadovas). **Įvestis:** tikslas. **Išvestis:** planas + paskirstymas.',
    },
    {
      title: 'Specialistas',
      body: 'Vykdo vieną siaurą darbą: paieška, juodraštis, skaičiavimas. **Įvestis:** briefas. **Išvestis:** artefaktas vertinimui.',
    },
    {
      title: 'Vertintojas',
      body: 'QC ir taisyklės; grąžina pataisymui (redaktorius / compliance). **Įvestis:** juodraštis. **Išvestis:** tinka / taisyti / žmogui.',
    },
  ];
}

export function getM10SpecIncidentLabels(locale: M10Locale) {
  const spec = getM10WorkflowSpecLabels(locale);
  const incident = getM10IncidentPlaybookLabels(locale);

  return {
    titleSpec: spec.title,
    titleIncident: incident.title,
    specBlocks: spec.blocks,
    incidentSteps: incident.steps,
    aria:
      locale === 'en'
        ? 'Workflow specification eight blocks and incident response five steps'
        : 'Workflow specifikacija aštuoni blokai ir incidentų planas penki žingsniai',
  };
}

export function getM10WorkflowSpecLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'One-page workflow spec (8 blocks)',
      blocks: [
        'Trigger',
        'Input',
        'Condition',
        'Actions',
        'Output',
        'SLA',
        'Errors',
        'Audit',
      ],
      aria: 'One-page workflow specification: Trigger, Input, Condition, Actions, Output, SLA, Errors and Audit',
    };
  }
  return {
    title: 'Vieno puslapio specifikacija (8 blokai)',
    blocks: [
      'Trigger',
      'Įvestis',
      'Condition',
      'Veiksmai',
      'Išvestis',
      'SLA',
      'Klaidos',
      'Auditas',
    ],
    aria: 'Vieno puslapio workflow specifikacija: Trigger, Įvestis, Condition, Veiksmai, Išvestis, SLA, Klaidos ir Auditas',
  };
}

export function getM10IncidentPlaybookLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Incident playbook (5 steps)',
      steps: ['Stop', 'Log', 'Scope', 'Notify', 'Fix'],
      aria: 'Incident playbook: Stop, Log, Scope, Notify and Fix',
    };
  }
  return {
    title: 'Incidentų planas (5 žingsniai)',
    steps: ['Stabdyti', 'Fiksuoti', 'Apimtis', 'Pranešti', 'Ištaisyti'],
    aria: 'Incidentų planas: Stabdyti, Fiksuoti, Apimtis, Pranešti ir Ištaisyti',
  };
}

/** Shell step explanations – titles from labels; short bodies for walkthrough. */
export function getM10TriggerFlowStepExplanations(locale: M10Locale) {
  const L = getM10TriggerFlowLabels(locale);
  return [
    { title: L.trigger, body: L.triggerSub },
    { title: L.condition, body: L.conditionSub },
    { title: L.action, body: L.actionSub },
    { title: L.webhook, body: `${L.webhookSub}. ${L.arrowToTrigger}.` },
  ];
}

export function getM10WorkflowSpecStepExplanations(locale: M10Locale) {
  const L = getM10WorkflowSpecLabels(locale);
  const hint =
    locale === 'en'
      ? 'One block of the one-page workflow spec.'
      : 'Vienas vieno puslapio specifikacijos blokas.';
  return L.blocks.map((title) => ({ title, body: hint }));
}

export function getM10IncidentPlaybookStepExplanations(locale: M10Locale) {
  const L = getM10IncidentPlaybookLabels(locale);
  const bodies =
    locale === 'en'
      ? [
          'Halt the agent or automation immediately.',
          'Capture what happened and when.',
          'Estimate blast radius and affected users.',
          'Alert the owner / on-call.',
          'Apply the fix and verify recovery.',
        ]
      : [
          'Iš karto sustabdyk agentą ar automatizaciją.',
          'Užfiksuok, kas ir kada nutiko.',
          'Įvertink poveikio apimtį.',
          'Pranešk savininkui / budinčiajam.',
          'Ištaisyk ir patikrink atkūrimą.',
        ];
  return L.steps.map((title, i) => ({ title, body: bodies[i] ?? title }));
}
