/**
 * Schema 3: mazgų etiketės, diagramos antraštės ir bloko UI – LT/EN getteriai.
 * Naudojama Schema3InteractiveDiagram ir Schema3InteractiveBlock.
 */

export type Locale = 'lt' | 'en';

/** Mazgo etiketė: [pagrindinis tekstas, opcionalus antras eilutė] */
export type Schema3NodeLabels = Record<string, [string, string?]>;

const NODE_LABELS_LT: Schema3NodeLabels = {
  input: ['Įvestis', '(tekstas)'],
  model: ['DI', undefined],
  output: ['Išvestis', undefined],
  toolUse: ['Įrankių naudojimas', undefined],
  retrieval: ['Informacijos gavimas', undefined],
  storage: ['Duomenų bazė / saugykla', undefined],
};

const NODE_LABELS_EN: Schema3NodeLabels = {
  input: ['Input', '(text)'],
  model: ['LLM', undefined],
  output: ['Output', undefined],
  toolUse: ['Tool use', undefined],
  retrieval: ['Information retrieval', undefined],
  storage: ['Database / storage', undefined],
};

export function getSchema3NodeLabels(locale: Locale): Schema3NodeLabels {
  return locale === 'en' ? NODE_LABELS_EN : NODE_LABELS_LT;
}

/** Diagramos viršuje: pavadinimas ir interaktyvus hint */
export interface Schema3DiagramTitles {
  title: string;
  subtitle: string;
}

const DIAGRAM_TITLES_LT: Schema3DiagramTitles = {
  title: 'DI sistema su įrankiais ir atmintimi',
  subtitle: 'Paspausk mazgą – paaiškinimas apačioje',
};

const DIAGRAM_TITLES_EN: Schema3DiagramTitles = {
  title: 'LLM system with tools and memory',
  subtitle: 'Click a node – explanation below',
};

export function getSchema3DiagramTitles(locale: Locale): Schema3DiagramTitles {
  return locale === 'en' ? DIAGRAM_TITLES_EN : DIAGRAM_TITLES_LT;
}

/** Bloko UI: region, enlarge, „Tu esi čia“, hint, nav aria, mazgo aria prefiksas */
export interface Schema3BlockLabels {
  regionAria: string;
  enlargeLabel: string;
  youAreHere: string;
  clickHint: string;
  navAria: string;
  nodeAriaPrefix: string;
}

const BLOCK_LABELS_LT: Schema3BlockLabels = {
  regionAria: 'DI sistema su įrankiais ir atmintimi',
  enlargeLabel: 'DI sistema su įrankiais ir atmintimi',
  youAreHere: 'Tu esi čia:',
  clickHint: 'Paspausk mazgą diagramoje arba skaičių 1–6 – paaiškinimas rodomas apačioje.',
  navAria: 'Mazgų pasirinkimas',
  nodeAriaPrefix: 'Mazgas',
};

const BLOCK_LABELS_EN: Schema3BlockLabels = {
  regionAria: 'LLM system with tools and memory',
  enlargeLabel: 'LLM system with tools and memory',
  youAreHere: 'You are here:',
  clickHint: 'Click a node in the diagram or number 1–6 – explanation shown below.',
  navAria: 'Node selection',
  nodeAriaPrefix: 'Node',
};

export function getSchema3BlockLabels(locale: Locale): Schema3BlockLabels {
  return locale === 'en' ? BLOCK_LABELS_EN : BLOCK_LABELS_LT;
}
