/** M10 diagramų etiketės LT / EN – sinchronas su Moduliu 10 SOT */

import type { StepExplanation } from './stepExplanations';

export type M10Locale = 'lt' | 'en';

export type TriggerTypeId = 'form' | 'schedule' | 'webhook';

export const M10_DEFAULT_TRIGGER_TYPE: TriggerTypeId = 'webhook';

export const M10_TRIGGER_TYPE_IDS: readonly TriggerTypeId[] = [
  'form',
  'schedule',
  'webhook',
] as const;

export function getM10TriggerFlowLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Workflow chain',
      trigger: 'Trigger',
      triggerSub: 'event starts it',
      condition: 'Condition',
      conditionSub: 'if needed',
      action: 'Action',
      actionSub: 'system step',
      typesLabel: 'Trigger type',
      typeForm: 'Form',
      typeFormSub: 'a person submits',
      typeSchedule: 'Schedule',
      typeScheduleSub: 'a schedule',
      typeWebhook: 'Notice',
      typeWebhookSub: 'another system',
      selectedTypeLabel: 'Selected type:',
      typePickerAria: 'Trigger type selection',
      aria: 'Workflow: Trigger, Condition, Action; an incoming web notification is a trigger type',
    };
  }
  return {
    title: 'Darbo eigos grandinė',
    trigger: 'Paleidiklis',
    triggerSub: 'įvykis pradeda',
    condition: 'Sąlyga',
    conditionSub: 'jei reikia',
    action: 'Veiksmas',
    actionSub: 'ką padaro sistema',
    typesLabel: 'Paleidiklio tipas',
    typeForm: 'Forma',
    typeFormSub: 'pateikia žmogus',
    typeSchedule: 'Laikas',
    typeScheduleSub: 'tvarkaraštis',
    typeWebhook: 'Pranešimas',
    typeWebhookSub: 'kita sistema',
    selectedTypeLabel: 'Pasirinktas tipas:',
    typePickerAria: 'Paleidiklio tipo pasirinkimas',
    aria: 'Darbo eiga: Paleidiklis, Sąlyga, Veiksmas; internetinis pranešimas yra paleidiklio tipas',
  };
}

export function getM10TriggerTypeChipLabel(
  locale: M10Locale,
  type: TriggerTypeId
): string {
  const L = getM10TriggerFlowLabels(locale);
  if (type === 'form') return L.typeForm;
  if (type === 'schedule') return L.typeSchedule;
  return L.typeWebhook;
}

export function getM10TriggerTypeExplanations(
  locale: M10Locale
): Record<TriggerTypeId, string> {
  if (locale === 'en') {
    return {
      form: 'The flow starts when a person submits a form.',
      schedule: 'The flow starts at a set time.',
      webhook:
        'The flow starts when another system sends an incoming web notification. Common mistake: treating that notice as a separate action.',
    };
  }
  return {
    form: 'Eiga prasideda, kai žmogus pateikia formą.',
    schedule: 'Eiga prasideda nustatytu laiku.',
    webhook:
      'Eiga prasideda gavus signalą iš kitos sistemos. Dažna klaida: laikyti internetinį pranešimą atskiru veiksmu.',
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
      hint: 'Choose a band – when it fits and when it does not',
      aria: '3A strategy: Automate eighty percent, Augment fifteen, Autonomize five',
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
    auto: 'Automatizuoti',
    autoPct: '80 %',
    autoSub: 'Taisyklės – mažiau klaidų',
    aug: 'Asistuoti',
    augPct: '15 %',
    augSub: 'Žmogus sprendžia, DI padeda',
    auton: 'Autonomizuoti',
    autonPct: '5 %',
    autonSub: 'Agentai tik su ribomis',
    hint: 'Pasirink juostą – kada tinka ir kada ne',
    aria: '3A strategija: Automatizuoti 80 %, Asistuoti 15 %, Autonomizuoti 5 %',
    regionAria: '3A strategija – trys juostos',
    youAreHere: 'Tu esi čia:',
    stepOf: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    navAria: '3A strategijos juostos pasirinkimas',
    stepAria: (i: number, title: string) => `Juosta ${i + 1}: ${title}`,
    enlargeLabel: '3A strategija (80 / 15 / 5)',
  };
}

/** Shell walkthrough – 10.25: 3 beats (what+why · example · when not). */
export function getM10ThreeAExplanations(locale: M10Locale): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Automate',
        body: '**What + why:** rules with no human at every step – fewer errors, predictable.\n**Example:** form → CRM → email.\n**When not:** you need a sign-off, or tone / facts must be approved.',
      },
      {
        title: 'Augment',
        body: '**What + why:** a human decides, the model helps – judgment and ownership stay with you.\n**Example:** draft → human approval → send.\n**When not:** the template is stable and a mistake is cheap (automate instead).',
      },
      {
        title: 'Autonomize',
        body: '**What + why:** agents with limits and escalation – a narrow band, because it is costly and risky.\n**Example:** research agent → quality check → escalate if unsure.\n**When not:** there is no limit, no audit, and nobody to escalate to.',
      },
    ];
  }
  return [
    {
      title: 'Automatizuoti',
      body: '**Kas + kodėl:** taisyklės be žmogaus kiekviename žingsnyje – mažiau klaidų, nuspėjama.\n**Pvz.:** forma → CRM → laiškas.\n**Kada ne:** reikia atsakomybės parašo ar tono / faktų patvirtinimo.',
    },
    {
      title: 'Asistuoti',
      body: '**Kas + kodėl:** žmogus sprendžia, DI padeda – atsakomybė lieka tau.\n**Pvz.:** juodraštis → žmogaus patvirtinimas → siuntimas.\n**Kada ne:** šablonas stabilus ir klaida pigi (tada automatizuok).',
    },
    {
      title: 'Autonomizuoti',
      body: '**Kas + kodėl:** agentai su ribomis ir eskalacija – siaura juosta, nes brangu ir rizikinga.\n**Pvz.:** tyrimo agentas → kokybės kontrolė → eskalacija, jei neaišku.\n**Kada ne:** nėra ribos, audito ir kam eskaluoti.',
    },
  ];
}

export type M10ToolLeaf = { id: string; condition: string; tool: string };

export function getM10ToolTreeLeaves(locale: M10Locale): M10ToolLeaf[] {
  if (locale === 'en') {
    return [
      { id: 'm365', condition: 'Office 365 daily', tool: 'Power Automate' },
      { id: 'quick', condition: 'Quick start', tool: 'Zapier' },
      { id: 'logic', condition: 'Complex logic', tool: 'Make.com' },
      { id: 'host', condition: 'Data on-prem', tool: 'n8n' },
      { id: 'ent', condition: 'Enterprise', tool: 'Workato' },
    ];
  }
  return [
    { id: 'm365', condition: 'Office 365 kasdien', tool: 'Power Automate' },
    { id: 'quick', condition: 'Greitas startas', tool: 'Zapier' },
    { id: 'logic', condition: 'Sudėtinga logika', tool: 'Make.com' },
    { id: 'host', condition: 'Duomenys pas mus', tool: 'n8n' },
    { id: 'ent', condition: 'Įmonės valdymas', tool: 'Workato' },
  ];
}

export function getM10ToolTreeLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Tool choice (workflow)',
      root: 'Your context?',
      pick: 'Choose a situation',
      landmark: 'landmark',
      aria: 'Decision tree for automation tools. Workato is an enterprise landmark, not a quick-start pick.',
    };
  }
  return {
    title: 'Darbo eigos įrankio pasirinkimas',
    root: 'Tavo kontekstas?',
    pick: 'Pasirink situaciją',
    landmark: 'orientyras',
    aria: 'Sprendimų medis automatizavimo įrankiams. Workato – įmonės orientyras, ne greito starto pasirinkimas.',
  };
}

/** Shell 3 beats from existing whenHint (when · example · when not). Workato = landmark. */
export function getM10ToolTreeExplanations(
  locale: M10Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Power Automate',
        body: '**When:** Teams / Outlook / SharePoint every day.\n**Example:** Outlook PDF → SharePoint → Teams.\n**When not:** your core systems are not Microsoft.',
      },
      {
        title: 'Zapier',
        body: '**When:** a non-technical team needs a quick start.\n**Example:** Calendly → calendar → reminder email.\n**When not:** complex logic or data on your own servers.',
      },
      {
        title: 'Make.com',
        body: '**When:** conditions, loops, and better unit cost.\n**Example:** Shopify order → stock → supplier alert.\n**When not:** a simple 2–3 step flow is enough.',
      },
      {
        title: 'n8n',
        body: '**When:** a technical team, data on your side.\n**Example:** incoming web notification → database → Slack alert.\n**When not:** no IT, or you need a quick SaaS start.',
      },
      {
        title: 'Workato',
        body: '**Landmark:** enterprise governance – not a fourth quick-start pick.\n**Example:** many systems, audit, SSO.\n**Commit** with one of the four tools below.',
      },
    ];
  }
  return [
    {
      title: 'Power Automate',
      body: '**Kada:** kasdien Teams / Outlook / SharePoint.\n**Pvz.:** Outlook PDF → SharePoint → Teams.\n**Netinka:** pagrindinės sistemos – ne Microsoft.',
    },
    {
      title: 'Zapier',
      body: '**Kada:** netechninė komanda, greitas startas.\n**Pvz.:** Calendly → kalendorius → priminimo laiškas.\n**Netinka:** sudėtinga logika ar duomenys savo serveriuose.',
    },
    {
      title: 'Make.com',
      body: '**Kada:** sąlygos, ciklai, geresnė kaina.\n**Pvz.:** Shopify užsakymas → atsargos → tiekėjo įspėjimas.\n**Netinka:** užtenka paprasto 2–3 žingsnių srauto.',
    },
    {
      title: 'n8n',
      body: '**Kada:** techninė komanda, duomenys savo pusėje.\n**Pvz.:** internetinis pranešimas → duomenų bazė → Slack įspėjimas.\n**Netinka:** nėra IT arba reikia greito SaaS.',
    },
    {
      title: 'Workato',
      body: '**Orientyras:** didelės įmonės valdymas – ne ketvirtas greito starto variantas.\n**Pvz.:** daug sistemų, auditas, SSO.\n**Įsipareigok** iš keturių įrankių žemiau.',
    },
  ];
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
      'Paleidiklis',
      'Įvestis',
      'Sąlyga',
      'Veiksmai',
      'Išvestis',
      'Paslaugos lygis',
      'Klaidos',
      'Auditas',
    ],
    aria: 'Vieno puslapio darbo eigos specifikacija: Paleidiklis, Įvestis, Sąlyga, Veiksmai, Išvestis, paslaugos lygis, Klaidos ir Auditas',
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

/** Shell 3 beats (what · example · common mistake) – not a box-sub echo. */
export function getM10TriggerFlowStepExplanations(locale: M10Locale) {
  const L = getM10TriggerFlowLabels(locale);
  if (locale === 'en') {
    return [
      {
        title: L.trigger,
        body: '**What:** the event that starts the flow.\n**Example:** a form, a set time, or an incoming web notification.\n**Common mistake:** mixing it up with the action.',
      },
      {
        title: L.condition,
        body: '**What:** whether the flow should continue (optional on the first flow).\n**Example:** if a new client; if the amount is over a limit.\n**Common mistake:** adding a condition before Trigger + Action already work.',
      },
      {
        title: L.action,
        body: '**What:** what the **system** does.\n**Example:** an email, a CRM record, a task.\n**Common mistake:** calling the trigger itself an action.',
      },
    ];
  }
  return [
    {
      title: L.trigger,
      body: '**Kas:** įvykis, kuris pradeda eigą.\n**Pvz.:** forma, nustatytas laikas ar internetinis pranešimas.\n**Dažna klaida:** painioti su veiksmu.',
    },
    {
      title: L.condition,
      body: '**Kas:** ar eiga turi tęstis (nebūtina pirmai eigai).\n**Pvz.:** jei naujas klientas; jei suma virš ribos.\n**Dažna klaida:** dėti sąlygą, kol Paleidiklis ir Veiksmas dar neveikia.',
    },
    {
      title: L.action,
      body: '**Kas:** ką **sistema** padaro.\n**Pvz.:** laiškas, CRM įrašas, užduotis.\n**Dažna klaida:** vadinti veiksmu patį paleidiklį.',
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
