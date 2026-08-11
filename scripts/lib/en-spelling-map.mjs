/**
 * American English is the spelling standard for every EN surface (GOLDEN §6c).
 * Explicit BrE → AmE pairs only: a generic `-ise` rule would corrupt words that
 * keep `-ise` in AmE (advertise, exercise, supervise, enterprise, …).
 *
 * Deliberately NOT in this map:
 * - `dialogue`  – AmE keeps `dialogue` for conversation; `dialog` is UI-only.
 * - `towards`   – standard in AmE alongside `toward`.
 * - `analyses`  – ambiguous (noun plural of `analysis` vs BrE verb form).
 * - `grey`      – handled only in copy; stays in design-token identifiers.
 */
export const BRE_TO_AME = {
  // -ise / -isation
  organise: 'organize',
  organised: 'organized',
  organises: 'organizes',
  organising: 'organizing',
  organisation: 'organization',
  organisations: 'organizations',
  organisational: 'organizational',
  recognise: 'recognize',
  recognised: 'recognized',
  recognises: 'recognizes',
  recognising: 'recognizing',
  recognisable: 'recognizable',
  prioritise: 'prioritize',
  prioritised: 'prioritized',
  prioritises: 'prioritizes',
  prioritising: 'prioritizing',
  prioritisation: 'prioritization',
  optimise: 'optimize',
  optimised: 'optimized',
  optimises: 'optimizes',
  optimising: 'optimizing',
  optimisation: 'optimization',
  optimisations: 'optimizations',
  summarise: 'summarize',
  summarised: 'summarized',
  summarises: 'summarizes',
  summarising: 'summarizing',
  analyse: 'analyze',
  analysed: 'analyzed',
  analysing: 'analyzing',
  customise: 'customize',
  customised: 'customized',
  customises: 'customizes',
  customising: 'customizing',
  customisation: 'customization',
  personalise: 'personalize',
  personalised: 'personalized',
  personalising: 'personalizing',
  personalisation: 'personalization',
  standardise: 'standardize',
  standardised: 'standardized',
  standardisation: 'standardization',
  visualise: 'visualize',
  visualised: 'visualized',
  visualises: 'visualizes',
  visualising: 'visualizing',
  visualisation: 'visualization',
  visualisations: 'visualizations',
  minimise: 'minimize',
  minimised: 'minimized',
  minimising: 'minimizing',
  maximise: 'maximize',
  maximised: 'maximized',
  maximising: 'maximizing',
  utilise: 'utilize',
  utilised: 'utilized',
  utilising: 'utilizing',
  specialise: 'specialize',
  specialised: 'specialized',
  specialising: 'specializing',
  specialisation: 'specialization',
  automatise: 'automatize',
  categorise: 'categorize',
  categorised: 'categorized',
  categorisation: 'categorization',
  normalise: 'normalize',
  normalised: 'normalized',
  normalisation: 'normalization',
  emphasise: 'emphasize',
  emphasised: 'emphasized',
  emphasising: 'emphasizing',
  realise: 'realize',
  realised: 'realized',
  realising: 'realizing',
  synthesise: 'synthesize',
  synthesised: 'synthesized',
  apologise: 'apologize',

  // -our
  behaviour: 'behavior',
  behaviours: 'behaviors',
  behavioural: 'behavioral',
  colour: 'color',
  colours: 'colors',
  coloured: 'colored',
  colourful: 'colorful',
  colouring: 'coloring',
  favour: 'favor',
  favours: 'favors',
  favoured: 'favored',
  favourite: 'favorite',
  favourites: 'favorites',
  favourable: 'favorable',
  labour: 'labor',
  honour: 'honor',
  honoured: 'honored',
  rumour: 'rumor',
  rumours: 'rumors',
  humour: 'humor',
  neighbour: 'neighbor',
  neighbours: 'neighbors',
  flavour: 'flavor',
  flavours: 'flavors',
  endeavour: 'endeavor',

  // -re
  centre: 'center',
  centres: 'centers',
  centred: 'centered',
  metre: 'meter',
  metres: 'meters',
  litre: 'liter',
  litres: 'liters',
  theatre: 'theater',
  fibre: 'fiber',
  calibre: 'caliber',

  // -ce / -se
  licence: 'license',
  licences: 'licenses',
  defence: 'defense',
  defences: 'defenses',
  offence: 'offense',
  offences: 'offenses',
  pretence: 'pretense',
  practise: 'practice',
  practised: 'practiced',
  practises: 'practices',
  practising: 'practicing',

  // -logue / -gramme
  catalogue: 'catalog',
  catalogues: 'catalogs',
  catalogued: 'cataloged',
  programme: 'program',
  programmes: 'programs',

  // -efact
  artefact: 'artifact',
  artefacts: 'artifacts',

  // doubled consonants
  labelled: 'labeled',
  labelling: 'labeling',
  modelling: 'modeling',
  modelled: 'modeled',
  cancelled: 'canceled',
  cancelling: 'canceling',
  travelled: 'traveled',
  travelling: 'traveling',
  fuelled: 'fueled',
  signalled: 'signaled',
  totalled: 'totaled',

  // -ement / -ment
  judgement: 'judgment',
  judgements: 'judgments',
  acknowledgement: 'acknowledgment',
  acknowledgements: 'acknowledgments',

  // -l / -ll
  fulfil: 'fulfill',
  fulfilment: 'fulfillment',
  enrolment: 'enrollment',
  instalment: 'installment',
  instalments: 'installments',
  skilful: 'skillful',

  // misc / BrE-marked style
  whilst: 'while',
  amongst: 'among',
  learnt: 'learned',
  spelt: 'spelled',
  grey: 'gray',
  greyed: 'grayed',
  tyre: 'tire',
  tyres: 'tires',
  storey: 'story',
  storeys: 'stories',
  cheque: 'check',
  cheques: 'checks',
  sceptical: 'skeptical',
  scepticism: 'skepticism',
  moustache: 'mustache',
  aeroplane: 'airplane',
  aluminium: 'aluminum',
  draught: 'draft',
  kerb: 'curb',
  plough: 'plow',
  speciality: 'specialty',
  specialities: 'specialties',
  manoeuvre: 'maneuver',
  ageing: 'aging',
};

/** Match any BrE key as a whole word, longest-first so plurals win. */
export const BRE_PATTERN = new RegExp(
  `\\b(${Object.keys(BRE_TO_AME)
    .sort((a, b) => b.length - a.length)
    .join('|')})\\b`,
  'gi'
);

/** Preserve the original casing pattern (lower / Title / UPPER). */
export function matchCase(source, replacement) {
  if (source === source.toUpperCase() && source !== source.toLowerCase()) {
    return replacement.toUpperCase();
  }
  if (source[0] === source[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

/** Rewrite every BrE word in `text` to its AmE form, keeping case. */
export function toAmericanEnglish(text) {
  return text.replace(BRE_PATTERN, (hit) =>
    matchCase(hit, BRE_TO_AME[hit.toLowerCase()])
  );
}

/** All BrE hits in `text` as { hit, index } (no rewrite). */
export function findBritishSpellings(text) {
  const out = [];
  for (const m of text.matchAll(BRE_PATTERN)) {
    out.push({
      hit: m[0],
      ame: matchCase(m[0], BRE_TO_AME[m[0].toLowerCase()]),
      index: m.index,
    });
  }
  return out;
}
