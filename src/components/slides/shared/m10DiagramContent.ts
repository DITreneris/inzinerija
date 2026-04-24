/** M10 diagramų etiketės LT / EN – sinchronas su Moduliu 10 SOT */

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
    arrowToTrigger: 'gali būti trigger',
    aria: 'Workflow: Trigger, Condition, Action; Webhook gali veikti kaip trigger',
  };
}

export function getM10ThreeALabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: '3A strategy (80 / 15 / 5)',
      auto: 'AUTOMATIZE',
      autoPct: '80 %',
      autoSub: 'Rule-based flows',
      aug: 'AUGMENT',
      augPct: '15 %',
      augSub: 'Human + LLM',
      auton: 'AUTONOMIZE',
      autonPct: '5 %',
      autonSub: 'Agents + guardrails',
      aria: '3A strategy: Automatize eighty percent, Augment fifteen, Autonomize five',
    };
  }
  return {
    title: '3A strategija (80 / 15 / 5)',
    auto: 'AUTOMATIZE',
    autoPct: '80 %',
    autoSub: 'Taisyklėmis paremti srautai',
    aug: 'AUGMENT',
    augPct: '15 %',
    augSub: 'Žmogus + DI',
    auton: 'AUTONOMIZE',
    autonPct: '5 %',
    autonSub: 'Agentai su ribomis',
    aria: '3A strategija: Automatize 80 %, Augment 15 %, Autonomize 5 %',
  };
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
    { id: 'quick', condition: 'Non-tech, greitai', tool: 'Zapier' },
    { id: 'logic', condition: 'Sudėtinga logika + kaina', tool: 'Make.com' },
    { id: 'host', condition: 'Savihost / duomenys pas mus', tool: 'n8n' },
    { id: 'ent', condition: 'Enterprise governance', tool: 'Workato' },
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

export function getM10SpecIncidentLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      titleSpec: 'One-page workflow spec (8 blocks)',
      titleIncident: 'Incident playbook (5 steps)',
      specBlocks: [
        'Trigger',
        'Input',
        'Condition',
        'Actions',
        'Output',
        'SLA',
        'Errors',
        'Audit',
      ],
      incidentSteps: ['Stop', 'Log', 'Scope', 'Notify', 'Fix'],
      aria: 'Workflow specification eight blocks and incident response five steps',
    };
  }
  return {
    titleSpec: 'Vieno puslapio spec (8 blokų)',
    titleIncident: 'Incident playbook (5 žingsniai)',
    specBlocks: [
      'Trigger',
      'Input',
      'Condition',
      'Actions',
      'Output',
      'SLA',
      'Klaidos',
      'Audit',
    ],
    incidentSteps: ['Stabdyti', 'Fiksuoti', 'Apimtis', 'Pranešti', 'Ištaisyti'],
    aria: 'Workflow specifikacija aštuoni blokai ir incidentų playbook penki žingsniai',
  };
}
