import type { M10Locale } from './m10DiagramContent';
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
  rows: M12ThreeLabsRow[];
} {
  if (locale === 'en') {
    return {
      title: 'Three mandatory labs (3A)',
      aria: 'Three labs: Automatize, Augment, Autonomize — human gate highlighted on the chip flow',
      rows: [
        {
          label: '1 · Automatize',
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
    aria: 'Trys praktikos: Automatize, Augment, Autonomize — žmogaus vartai paryškinti chip eigoje',
    rows: [
      {
        label: '1 · Automatize',
        tone: 'brand',
        steps: ['Forma', 'CRM', 'Laiškas', 'Slack'],
        humanStepIndex: null,
        humanNote: 'Mažai žmogaus sprendimų',
      },
      {
        label: '2 · Augment',
        tone: 'emerald',
        steps: ['Laiškas', 'DI', 'Patvirtinimas', 'Siųsti'],
        humanStepIndex: 2,
        humanNote: 'Žmogus patvirtina',
      },
      {
        label: '3 · Autonomize',
        tone: 'amber',
        steps: ['Atsiliepimai', 'Sentimentas', 'Eskalacija'],
        humanStepIndex: 2,
        humanNote: 'Eskalacija / kokybė',
      },
    ],
  };
}
