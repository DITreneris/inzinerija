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
      conditionSub: 'if needed',
      action: 'Action',
      actionSub: 'system step',
      typesLabel: 'Trigger types',
      typeForm: 'Form',
      typeSchedule: 'Schedule',
      typeWebhook: 'Webhook',
      typesHint: 'Webhook = a trigger type',
      aria: 'Workflow: Trigger, Condition, Action; Webhook is a trigger type',
    };
  }
  return {
    title: 'Darbo eigos grandinė',
    trigger: 'Trigger',
    triggerSub: 'paleidžia srautą',
    condition: 'Condition',
    conditionSub: 'jei reikia',
    action: 'Action',
    actionSub: 'veiksmas sistemoje',
    typesLabel: 'Trigger tipai',
    typeForm: 'Forma',
    typeSchedule: 'Laikas',
    typeWebhook: 'Webhook',
    typesHint: 'Webhook = Trigger tipas',
    aria: 'Darbo eiga: Trigger, Condition, Action; Webhook yra Trigger tipas',
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
  if (locale === 'en') {
    return [
      {
        title: L.trigger,
        body: `${L.triggerSub}. Types: ${L.typeForm}, ${L.typeSchedule}, ${L.typeWebhook}.`,
      },
      {
        title: L.condition,
        body: 'Optional branch / filter – skip until Trigger + Action already work.',
      },
      {
        title: L.action,
        body: L.actionSub,
      },
    ];
  }
  return [
    {
      title: L.trigger,
      body: `${L.triggerSub}. Tipai: ${L.typeForm}, ${L.typeSchedule}, ${L.typeWebhook}.`,
    },
    {
      title: L.condition,
      body: 'Neprivaloma šaka / filtras – kol Trigger + Action neveikia, dar neįtrauk.',
    },
    {
      title: L.action,
      body: L.actionSub,
    },
  ];
}

export function getM10WorkflowSpecStepExplanations(locale: M10Locale) {
  const L = getM10WorkflowSpecLabels(locale);
  const bodies =
    locale === 'en'
      ? [
          'Name what starts the workflow: form, schedule, manual button, webhook, or another clear signal.',
          'List the required fields and validation rules so the agent knows what counts as a usable input.',
          'Describe the branch or filter: when to continue, skip, ask a human, or stop the run.',
          'Write the steps and tools the agent may use. Keep the order explicit, not hidden in prose.',
          'Define the expected result: format, destination, owner, and what must be included before handoff.',
          'Set waiting time, retry count, rate limits, and the point where the workflow must stop.',
          'Plan failures up front: retry, notify, escalate, or return a clear "failed" state.',
          'Log run_id, time, step, decision, and result so the team can audit what happened later.',
        ]
      : [
          'Įvardyk, kas paleidžia eigą: forma, tvarkaraštis, rankinis mygtukas, webhook ar kitas aiškus signalas.',
          'Surašyk privalomus laukus ir validavimo taisykles, kad agentas žinotų, kas yra tinkama įvestis.',
          'Aprašyk šaką arba filtrą: kada tęsti, praleisti, klausti žmogaus arba stabdyti vykdymą.',
          'Surašyk žingsnius ir įrankius, kuriuos agentas gali naudoti. Tvarką laikyk aiškią, ne paslėptą prozoje.',
          'Apibrėžk laukiamą rezultatą: formatą, vietą, savininką ir ką būtina įtraukti prieš perdavimą.',
          'Nustatyk laukimo laiką, kartojimų skaičių, limitus ir ribą, kada eiga turi sustoti.',
          'Klaidas suplanuok iš anksto: kartoti, įspėti, eskaluoti arba grąžinti aiškią būseną „nepavyko“.',
          'Fiksuok run_id, laiką, žingsnį, sprendimą ir rezultatą, kad komanda vėliau galėtų audituoti eigą.',
        ];
  return L.blocks.map((title, index) => ({ title, body: bodies[index] }));
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
