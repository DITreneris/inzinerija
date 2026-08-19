export type ConsistencyModeId =
  | 'inflate'
  | 'color'
  | 'label'
  | 'style'
  | 'fresh';

export type ConsistencyRefId =
  | 'hero'
  | 'threeQuarter'
  | 'detail'
  | 'styleLight';

export type ConsistencyLabLocale = 'lt' | 'en';

export type ConsistencyRefState = Record<ConsistencyRefId, boolean>;

export const CONSISTENCY_REF_IDS: ConsistencyRefId[] = [
  'hero',
  'threeQuarter',
  'detail',
  'styleLight',
];

const LAB_ASSET_DIR = 'm13/consistency-lab';

export const CONSISTENCY_LAB_ASSETS = {
  hero: `${LAB_ASSET_DIR}/oak-mug-hero.png`,
  threeQuarter: `${LAB_ASSET_DIR}/oak-mug-side.png`,
  detail: `${LAB_ASSET_DIR}/oak-mug-detail.png`,
  styleLight: `${LAB_ASSET_DIR}/oak-mug-light.png`,
  beforeDrift: `${LAB_ASSET_DIR}/oak-mug-before-drift.png`,
  afterLock: `${LAB_ASSET_DIR}/oak-mug-after-lock.png`,
} as const;

export function consistencyLabAssetSrc(relPath: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${relPath.replace(/^\//, '')}`;
}

export function emptyConsistencyRefs(): ConsistencyRefState {
  return {
    hero: false,
    threeQuarter: false,
    detail: false,
    styleLight: false,
  };
}

export function countSelectedRefs(refs: ConsistencyRefState): number {
  return CONSISTENCY_REF_IDS.filter((id) => refs[id]).length;
}

export function getConsistencyLabUiLabels(locale: ConsistencyLabLocale) {
  if (locale === 'en') {
    return {
      regionAria: 'Consistency workshop',
      seriesLabel: 'Series: Oak Mug',
      hint: 'Tick the sample photos you have for the Oak Mug series, then pick what drifted – or a new brief.',
      decisionRule:
        'Lock and fix when the product must match the set. Fresh generate only when the brief intentionally changes.',
      modeLegend: 'What drifted?',
      artefactHeading: 'Prompt rule',
      copyLabel: 'Copy rule',
      copiedLabel: 'Copied',
      emptyArtefact: 'Choose a mode first – then copy your rule.',
      sampleArtefactHint:
        'After you pick a mode – your rule (Copy). Example below is filled for Oak Mug.',
      refLegend: 'Series: Oak Mug – sample photos',
      refStatus: (n: number) => `You have ${n}/4`,
      refReady: 'Ready for lock (≥3 sample photos)',
      refNeedMore: 'Collect at least 3 sample photos',
      symptomLabel: 'Symptom',
      fixLabel: 'Fix',
      modePillEmpty: 'No mode yet',
      missingPrefix: 'Missing sample photos:',
      beforeDriftLabel: 'Before (drift)',
      beforeDriftHint: 'Muted, off-brand, proportions wander.',
      afterLockLabel: 'After (lock)',
      afterLockHint: 'On-set color, shape and labels hold.',
      compareStripAria: 'Drift versus lock',
      beforeImageAlt:
        'Oak Mug drifted: stretched body, muddy brown band, label off-center.',
      afterImageAlt:
        'Oak Mug locked: white ceramic, teal band, label in the same place.',
    };
  }
  return {
    regionAria: 'Nuoseklumo dirbtuvė',
    seriesLabel: 'Serija: Ąžuolo puodelis',
    hint: 'Pažymėk turimas pavyzdžių nuotraukas serijai „Ąžuolo puodelis“, tada pasirink kas plaukioja – arba naują užduoties aprašą.',
    decisionRule:
      'Užrakink ir taisyk, kai produktas turi sutapti su rinkiniu. Naują vaizdą generuok tik tada, kai užduoties aprašas sąmoningai keičiasi.',
    modeLegend: 'Kas plaukioja?',
    artefactHeading: 'Prompto taisyklė',
    copyLabel: 'Kopijuoti taisyklę',
    copiedLabel: 'Nukopijuota',
    emptyArtefact: 'Pirmiausia pasirink režimą – tada kopijuok savo taisyklę.',
    sampleArtefactHint:
      'Po režimo – tavo taisyklė (Copy). Žemiau – užpildytas pavyzdys serijai „Ąžuolo puodelis“.',
    refLegend: 'Serija: Ąžuolo puodelis – pavyzdžių nuotraukos',
    refStatus: (n: number) => `Turi ${n}/4`,
    refReady: 'Paruošta užraktui (≥3 pavyzdžių nuotraukos)',
    refNeedMore: 'Surink bent 3 pavyzdžių nuotraukas',
    symptomLabel: 'Simptomas',
    fixLabel: 'Taisymas',
    modePillEmpty: 'Režimas dar nepasirinktas',
    missingPrefix: 'Trūksta:',
    beforeDriftLabel: 'Prieš (slinktis)',
    beforeDriftHint: 'Blanku, ne iš serijos, proporcijos plaukioja.',
    afterLockLabel: 'Po (užraktas)',
    afterLockHint: 'Rinkinio spalvos, forma ir etiketės laikosi.',
    compareStripAria: 'Slinkties ir užrakto palyginimas',
    beforeImageAlt:
      'Ąžuolo puodelis su slinktimi: ištįsęs korpusas, drumstai ruda juosta, etiketė ne vietoje.',
    afterImageAlt:
      'Ąžuolo puodelis užrakintas: baltas keramikinis, žalsvai mėlyna juosta, etiketė toje pačioje vietoje.',
  };
}

export function getConsistencyRefOptions(locale: ConsistencyLabLocale) {
  if (locale === 'en') {
    return [
      {
        id: 'hero' as const,
        label: 'Front (hero)',
        alt: 'Oak Mug, front catalog shot: white ceramic, teal band, centered handle.',
        src: CONSISTENCY_LAB_ASSETS.hero,
      },
      {
        id: 'threeQuarter' as const,
        label: '¾ or side',
        alt: 'Oak Mug from a three-quarter angle: same teal band and white body.',
        src: CONSISTENCY_LAB_ASSETS.threeQuarter,
      },
      {
        id: 'detail' as const,
        label: 'Detail / label',
        alt: 'Close-up of the Oak Mug label on the teal band.',
        src: CONSISTENCY_LAB_ASSETS.detail,
      },
      {
        id: 'styleLight' as const,
        label: 'Style / light',
        alt: 'Oak Mug under catalog light from the left, clean white background.',
        src: CONSISTENCY_LAB_ASSETS.styleLight,
      },
    ];
  }
  return [
    {
      id: 'hero' as const,
      label: 'Priekis (hero)',
      alt: 'Ąžuolo puodelis iš priekio: balta keramika, žalsvai mėlyna juosta, rankena centre.',
      src: CONSISTENCY_LAB_ASSETS.hero,
    },
    {
      id: 'threeQuarter' as const,
      label: '¾ arba šonas',
      alt: 'Ąžuolo puodelis iš trijų ketvirčių: ta pati juosta ir baltas korpusas.',
      src: CONSISTENCY_LAB_ASSETS.threeQuarter,
    },
    {
      id: 'detail' as const,
      label: 'Detalė / etiketė',
      alt: 'Ąžuolo puodelio etiketės stambus planas ant juostos.',
      src: CONSISTENCY_LAB_ASSETS.detail,
    },
    {
      id: 'styleLight' as const,
      label: 'Stilius / šviesa',
      alt: 'Ąžuolo puodelis katalogo šviesoje iš kairės, švarus baltas fonas.',
      src: CONSISTENCY_LAB_ASSETS.styleLight,
    },
  ];
}

type ModeDef = {
  id: ConsistencyModeId;
  label: string;
  description: string;
  driftSignal: string;
  fixCue: string;
  pill: string;
};

export function getConsistencyModeOptions(
  locale: ConsistencyLabLocale
): ModeDef[] {
  if (locale === 'en') {
    return [
      {
        id: 'inflate',
        label: 'Inflated / proportions',
        description: 'Shape or size drifted from the sample photos.',
        driftSignal: 'Product looks puffed, stretched or wrong proportions.',
        fixCue:
          'Simplify the scene; strengthen the sample photos; edit only the deformed zone.',
        pill: 'Proportions',
      },
      {
        id: 'color',
        label: 'Color shifted',
        description: 'Palette no longer matches the brand set.',
        driftSignal: 'Hue or saturation drifted from the sample palette.',
        fixCue:
          'Re-attach color samples; add “same color palette”; avoid a new lighting look.',
        pill: 'Color',
      },
      {
        id: 'label',
        label: 'Label / logo lost',
        description: 'Mark or logo placement broke.',
        driftSignal: 'Label or logo missing, warped or in the wrong place.',
        fixCue:
          'Use a detail/label sample; lock placement; edit only the mark zone.',
        pill: 'Label',
      },
      {
        id: 'style',
        label: 'Look / style drift',
        description: 'Campaign set no longer feels like one series.',
        driftSignal: 'Style, finish or mood floated away from the set.',
        fixCue:
          'Re-state same style + same product; keep only environment/action new.',
        pill: 'Style',
      },
      {
        id: 'fresh',
        label: 'Brief changed',
        description: 'New look on purpose – no lock.',
        driftSignal: 'Brief or brand look intentionally changes.',
        fixCue: 'Fresh generate without forcing the previous product identity.',
        pill: 'Fresh',
      },
    ];
  }
  return [
    {
      id: 'inflate',
      label: 'Išsipūtė / proporcijos',
      description: 'Forma ar dydis „plaukioja“ nuo pavyzdžių nuotraukų.',
      driftSignal: 'Produktas išsipūtė, ištįso arba pakeitė proporcijas.',
      fixCue:
        'Supaprastink sceną; stiprink pavyzdžių nuotraukas; taisyti tik deformuotą zoną.',
      pill: 'Proporcijos',
    },
    {
      id: 'color',
      label: 'Spalva pasikeitė',
      description: 'Paletė nebeatitinka kampanijos rinkinio.',
      driftSignal: 'Atspalvis ar sodrumas nutolo nuo pavyzdžių paletės.',
      fixCue:
        'Prisek spalvų pavyzdžius; pridėk „ta pati spalvų paletė“; venk naujo apšvietimo vaizdo.',
      pill: 'Spalva',
    },
    {
      id: 'label',
      label: 'Etiketė / logo',
      description: 'Ženklas ar logo vieta sugedo.',
      driftSignal: 'Etiketė ar logo dingo, išsikraipė arba ne toje vietoje.',
      fixCue:
        'Naudok detalės / etiketės pavyzdį; užrakink vietą; taisyti tik ženklo zoną.',
      pill: 'Etiketė',
    },
    {
      id: 'style',
      label: 'Vaizdas / stilius plaukioja',
      description: 'Rinkinys nebeatrodo kaip viena serija.',
      driftSignal: 'Stilius, apdaila ar nuotaika nutolo nuo rinkinio.',
      fixCue:
        'Pakartok tą patį stilių ir tą patį produktą; keisk tik aplinką ar veiksmą.',
      pill: 'Stilius',
    },
    {
      id: 'fresh',
      label: 'Užduoties aprašas keičiasi',
      description: 'Sąmoningai nauja išvaizda – be užrakto.',
      driftSignal: 'Užduoties aprašas ar vaizdas keičiasi sąmoningai.',
      fixCue:
        'Naujas generavimas be ankstesnio produkto tapatybės prievartos.',
      pill: 'Naujas',
    },
  ];
}

function missingRefLabels(
  locale: ConsistencyLabLocale,
  refs: ConsistencyRefState
): string[] {
  const options = getConsistencyRefOptions(locale);
  return options.filter((o) => !refs[o.id]).map((o) => o.label);
}

function lockRuleLines(locale: ConsistencyLabLocale): string[] {
  return locale === 'en'
    ? [
        'Lock: use the same 3–5 sample photos.',
        'Rule: same product, same proportions, same label/logo placement, same color palette, same style.',
        'New scene: [ENVIRONMENT / ACTION]. Camera: [angle]. Format: [1:1 / 16:9 / 9:16].',
        'No text in image (unless product label).',
      ]
    : [
        'Užraktas: naudok tas pačias 3–5 pavyzdžių nuotraukas.',
        'Taisyklė: tas pats produktas, tos pačios proporcijos, ta pati etiketės vieta, ta pati spalvų paletė, tas pats stilius.',
        'Nauja scena: [APLINKA / VEIKSMAS]. Kamera: [kampas]. Formatas: [1:1 / 16:9 / 9:16].',
        'Be teksto vaizde (nebent etiketė ant produkto).',
      ];
}

function freshRuleLines(locale: ConsistencyLabLocale): string[] {
  return locale === 'en'
    ? [
        'Fresh generate (no lock).',
        'Brief change: [WHAT CHANGED]. New look: [STYLE / MOOD].',
        'Scene: [ENVIRONMENT / ACTION]. Camera: [angle]. Format: [1:1 / 16:9 / 9:16].',
        'Do not force same product identity from previous set.',
      ]
    : [
        'Naujas generavimas (be užrakto).',
        'Užduoties keitimas: [KAS PASIKEITĖ]. Nauja išvaizda: [STILIUS / NUOTAIKA].',
        'Scena: [APLINKA / VEIKSMAS]. Kamera: [kampas]. Formatas: [1:1 / 16:9 / 9:16].',
        'Neverčiame tos pačios produkto tapatybės iš ankstesnio rinkinio.',
      ];
}

export function getSampleConsistencyArtefact(
  locale: ConsistencyLabLocale
): string {
  return locale === 'en'
    ? [
        'Fix: simplify the scene; keep the Oak Mug white with a teal band.',
        'Lock: use the same 3–5 sample photos (front, ¾, label, light).',
        'Rule: same product, same proportions, same label placement, same teal band, same catalog style.',
        'New scene: oak table, morning light from the left. Camera: eye level. Format: 1:1.',
        'No text in image (unless the product label).',
      ].join('\n')
    : [
        'Taisymas: supaprastink sceną; palik Ąžuolo puodelį baltą su žalsvai mėlyna juosta.',
        'Užraktas: naudok tas pačias 3–5 pavyzdžių nuotraukas (priekis, ¾, etiketė, šviesa).',
        'Taisyklė: tas pats produktas, tos pačios proporcijos, ta pati etiketės vieta, ta pati juosta, tas pats katalogo stilius.',
        'Nauja scena: ąžuolo stalas, rytinė šviesa iš kairės. Kamera: lygiu akims. Formatas: 1:1.',
        'Be teksto vaizde (nebent etiketė ant produkto).',
      ].join('\n');
}

export function formatConsistencyArtefact(
  locale: ConsistencyLabLocale,
  mode: ConsistencyModeId,
  refs: ConsistencyRefState
): string {
  const ui = getConsistencyLabUiLabels(locale);
  const modes = getConsistencyModeOptions(locale);
  const modeDef = modes.find((m) => m.id === mode);
  const missing = missingRefLabels(locale, refs);
  const refCount = countSelectedRefs(refs);
  const lines: string[] = [];

  if (mode === 'fresh') {
    lines.push(...freshRuleLines(locale));
  } else {
    if (modeDef) {
      lines.push(
        locale === 'en'
          ? `Fix: ${modeDef.fixCue}`
          : `Taisymas: ${modeDef.fixCue}`
      );
    }
    lines.push(...lockRuleLines(locale));
  }

  if (refCount < 3 && missing.length > 0) {
    lines.push(`${ui.missingPrefix} ${missing.join(', ')}.`);
  }

  return lines.join('\n');
}
