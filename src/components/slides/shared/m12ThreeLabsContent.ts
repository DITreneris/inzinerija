import type { M10Locale } from './m10DiagramContent';
import type { StepExplanation } from './stepExplanations';
import type { DiagramTone } from './diagramTokens';

export type M12ThreeLabsRow = {
  label: string;
  tone: DiagramTone;
  steps: string[];
  /** Index of the human-gate chip; null = rules path (no gate chip). */
  humanStepIndex: number | null;
  humanNote: string;
};

export function getM12ThreeLabsLabels(locale: M10Locale): {
  title: string;
  aria: string;
  hint: string;
  regionAria: string;
  youAreHere: string;
  stepOf: (n: number, total: number) => string;
  navAria: string;
  stepAria: (index: number, title: string) => string;
  enlargeLabel: string;
  rows: M12ThreeLabsRow[];
} {
  if (locale === 'en') {
    return {
      title: 'Three mandatory labs (3A)',
      aria: 'Three labs: Automate, Augment, Autonomize — human control highlighted on the chip flow',
      hint: 'Tap a lab row – where human control sits',
      regionAria: 'Three mandatory labs – comparison rows',
      youAreHere: 'You are here:',
      stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
      navAria: 'Three labs selection',
      stepAria: (index: number, title: string) => `Lab ${index + 1}: ${title}`,
      enlargeLabel: 'Three labs (3A)',
      rows: [
        {
          label: '1 · Automate',
          tone: 'brand',
          steps: ['Form', 'CRM', 'Email', 'Slack'],
          humanStepIndex: null,
          humanNote: 'Little human decision',
        },
        {
          label: '2 · Augment',
          tone: 'emerald',
          steps: ['Email', 'LLM', 'Approve', 'Send'],
          humanStepIndex: 2,
          humanNote: 'Human approves',
        },
        {
          label: '3 · Autonomize',
          tone: 'amber',
          steps: ['Reviews', 'Sentiment', 'Escalation'],
          humanStepIndex: 2,
          humanNote: 'Escalation / QA',
        },
      ],
    };
  }
  return {
    title: 'Trys privalomos praktikos (3A)',
    aria: 'Trys praktikos: Automatizuoti, Asistuoti, Autonomizuoti — žmogaus kontrolė paryškinta chip eigoje',
    hint: 'Paspausk praktikos eilutę – kur yra žmogaus kontrolė',
    regionAria: 'Trys privalomos praktikos – palyginimo eilutės',
    youAreHere: 'Tu esi čia:',
    stepOf: (n: number, total: number) => `Žingsnis ${n} iš ${total}`,
    navAria: 'Trijų praktikų pasirinkimas',
    stepAria: (index: number, title: string) =>
      `Praktika ${index + 1}: ${title}`,
    enlargeLabel: 'Trys praktikos (3A)',
    rows: [
      {
        label: '1 · Automatizuoti',
        tone: 'brand',
        steps: ['Forma', 'CRM', 'Laiškas', 'Slack'],
        humanStepIndex: null,
        humanNote: 'Mažai žmogaus sprendimų',
      },
      {
        label: '2 · Asistuoti',
        tone: 'emerald',
        steps: ['Laiškas', 'DI', 'Patvirtinimas', 'Siųsti'],
        humanStepIndex: 2,
        humanNote: 'Žmogus patvirtina',
      },
      {
        label: '3 · Autonomizuoti',
        tone: 'amber',
        steps: ['Atsiliepimai', 'Sentimentas', 'Eskalacija'],
        humanStepIndex: 2,
        humanNote: 'Eskalacija / kokybė',
      },
    ],
  };
}

export function getM12ThreeLabsExplanations(
  locale: M10Locale
): StepExplanation[] {
  if (locale === 'en') {
    return [
      {
        title: 'Automate',
        body: '**Rules path** – form → CRM → email → Slack. Best when the decision is already clear and human control can stay outside the flow.',
      },
      {
        title: 'Augment',
        body: '**Human approves** – email → LLM → approve → send. Use it when DI helps prepare the answer, but a person keeps accountability.',
      },
      {
        title: 'Autonomize',
        body: '**Escalation / QA** – reviews → sentiment → escalation. Let the agent act only with limits and a clear handoff when risk appears.',
      },
    ];
  }

  return [
    {
      title: 'Automatizuoti',
      body: '**Taisyklių kelias** – forma → CRM → laiškas → Slack. Tinka, kai sprendimas jau aiškus, o žmogaus kontrolė gali likti už srauto.',
    },
    {
      title: 'Asistuoti',
      body: '**Žmogus patvirtina** – laiškas → DI → patvirtinimas → siųsti. Rinkis, kai DI paruošia atsakymą, bet žmogus išlaiko atsakomybę.',
    },
    {
      title: 'Autonomizuoti',
      body: '**Eskalacija / kokybė** – atsiliepimai → sentimentas → eskalacija. Agentui leisk veikti tik su ribomis ir aiškiu perdavimu atsiradus rizikai.',
    },
  ];
}
