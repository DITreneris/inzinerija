import type { M10Locale } from './m10DiagramContent';

export function getM12ThreeLabsLabels(locale: M10Locale) {
  if (locale === 'en') {
    return {
      title: 'Three mandatory labs (3A)',
      l1: 'Lab 1 · Automatize',
      l1Sub: 'Form → CRM → Email → Slack',
      l1Human: 'Little human decision',
      l2: 'Lab 2 · Augment',
      l2Sub: 'Email → LLM → Approve → Send',
      l2Human: 'Human approves',
      l3: 'Lab 3 · Autonomize',
      l3Sub: 'Reviews → Sentiment → Escalation',
      l3Human: 'Escalation / QA',
      aria: 'Three labs: Automatize, Augment, Autonomize with human touchpoints',
    };
  }
  return {
    title: 'Trys privalomos praktikos (3A)',
    l1: '1 praktika · Automatize',
    l1Sub: 'Forma → CRM → Laiškas → Slack',
    l1Human: 'Mažai žmogaus sprendimų',
    l2: '2 praktika · Augment',
    l2Sub: 'Laiškas → DI → Patvirtinimas',
    l2Human: 'Žmogus patvirtina',
    l3: '3 praktika · Autonomize',
    l3Sub: 'Atsiliepimai → Sentimentas → Eskalacija',
    l3Human: 'Eskalacija / kokybė',
    aria: 'Trys praktikos: Automatize, Augment, Autonomize su žmogaus taškais',
  };
}
