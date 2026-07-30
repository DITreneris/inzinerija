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
      regionAria: 'Consistency drift lab',
      hint: 'Tick the references you have, then pick what drifted – or a fresh brief.',
      decisionRule:
        'Lock and fix when the product must match the set. Fresh generate only when the brief intentionally changes.',
      modeLegend: 'What drifted?',
      artefactHeading: 'Prompt rule',
      copyLabel: 'Copy rule',
      copiedLabel: 'Copied',
      emptyArtefact: 'Choose a mode first – then copy the rule.',
      refLegend: 'Reference sheet',
      refStatus: (n: number) => `You have ${n}/4`,
      refReady: 'Ready for lock (≥3 refs)',
      refNeedMore: 'Add refs until you have at least 3',
      symptomLabel: 'Symptom',
      fixLabel: 'Fix',
      modePillEmpty: 'No mode yet',
      missingPrefix: 'Missing refs:',
      beforeDriftLabel: 'Before (Drift)',
      beforeDriftHint: 'Muted, off-brand, proportions wander.',
      afterLockLabel: 'After (Ref lock)',
      afterLockHint: 'On-set colour, shape and labels hold.',
      compareStripAria: 'Drift versus reference lock',
    };
  }
  return {
    regionAria: 'Consistency drift lab',
    hint: 'Pažymėk turimus reference, tada pasirink kas plaukioja – arba naują briefą.',
    decisionRule:
      'Lock ir fix – kai produktas turi sutapti su setu. Fresh generate – tik kai briefas sąmoningai keičiasi.',
    modeLegend: 'Kas plaukioja?',
    artefactHeading: 'Prompto taisyklė',
    copyLabel: 'Kopijuoti taisyklę',
    copiedLabel: 'Nukopijuota',
    emptyArtefact: 'Pirmiausia pasirink režimą – tada kopijuok taisyklę.',
    refLegend: 'Reference sheet',
    refStatus: (n: number) => `Turi ${n}/4`,
    refReady: 'Paruošta lock (≥3 refs)',
    refNeedMore: 'Surink bent 3 reference',
    symptomLabel: 'Simptomas',
    fixLabel: 'Fix',
    modePillEmpty: 'Režimas dar nepasirinktas',
    missingPrefix: 'Trūksta:',
    beforeDriftLabel: 'Prieš (Drift)',
    beforeDriftHint: 'Blanku, nebrandu, proporcijos plaukioja.',
    afterLockLabel: 'Po (Ref lock)',
    afterLockHint: 'Seto spalvos, forma ir etiketės laikosi.',
    compareStripAria: 'Drift ir reference lock palyginimas',
  };
}

export function getConsistencyRefOptions(locale: ConsistencyLabLocale) {
  if (locale === 'en') {
    return [
      { id: 'hero' as const, label: 'Hero / front' },
      { id: 'threeQuarter' as const, label: '¾ or side' },
      { id: 'detail' as const, label: 'Detail / label' },
      { id: 'styleLight' as const, label: 'Style / light' },
    ];
  }
  return [
    { id: 'hero' as const, label: 'Hero / priekis' },
    { id: 'threeQuarter' as const, label: '¾ arba šonas' },
    { id: 'detail' as const, label: 'Detalė / etiketė' },
    { id: 'styleLight' as const, label: 'Stilius / šviesa' },
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
        description: 'Shape or size drifted from the refs.',
        driftSignal: 'Product looks puffed, stretched or wrong proportions.',
        fixCue:
          'Simplify the scene; strengthen refs; inpaint only the deformed zone.',
        pill: 'Proportions',
      },
      {
        id: 'color',
        label: 'Colour shifted',
        description: 'Palette no longer matches the brand set.',
        driftSignal: 'Hue or saturation drifted from the reference palette.',
        fixCue:
          'Re-attach colour refs; add “same color palette”; avoid new lighting looks.',
        pill: 'Colour',
      },
      {
        id: 'label',
        label: 'Label / logo lost',
        description: 'Mark or logo placement broke.',
        driftSignal: 'Label or logo missing, warped or in the wrong place.',
        fixCue:
          'Use a detail/label ref; lock placement; inpaint only the mark zone.',
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
        description: 'New look on purpose – no reference lock.',
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
      description: 'Forma ar dydis „plaukioja“ nuo refs.',
      driftSignal: 'Produktas išsipūtė, ištįso arba pakeitė proporcijas.',
      fixCue: 'Supaprastink sceną; stiprink refs; inpaint tik deformuotą zoną.',
      pill: 'Proporcijos',
    },
    {
      id: 'color',
      label: 'Spalva pasikeitė',
      description: 'Paletė nebeatitinka kampanijos seto.',
      driftSignal: 'Atspalvis ar sodrumas nutolo nuo reference paletės.',
      fixCue:
        'Prisek spalvų refs; pridėk „same color palette“; venk naujo apšvietimo look.',
      pill: 'Spalva',
    },
    {
      id: 'label',
      label: 'Etiketė / logo',
      description: 'Ženklas ar logo vieta sugedo.',
      driftSignal: 'Etiketė ar logo dingo, išsikraipė arba ne toje vietoje.',
      fixCue:
        'Naudok detalės/etiketės ref; užrakink vietą; inpaint tik ženklo zoną.',
      pill: 'Etiketė',
    },
    {
      id: 'style',
      label: 'Look / stilius plaukioja',
      description: 'Setas nebeatrodo kaip viena serija.',
      driftSignal: 'Stilius, apdaila ar nuotaika nutolo nuo seto.',
      fixCue:
        'Pakartok same style + same product; keisk tik aplinką ar veiksmą.',
      pill: 'Stilius',
    },
    {
      id: 'fresh',
      label: 'Brief keičiasi',
      description: 'Sąmoningai nauja išvaizda – be reference lock.',
      driftSignal: 'Briefas ar look keičiasi sąmoningai.',
      fixCue: 'Naujas generate be ankstesnio produkto tapatybės prievartos.',
      pill: 'Fresh',
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
        'Reference lock: use the same 3–5 reference images.',
        'Rule: same product, same proportions, same label/logo placement, same color palette, same style.',
        'New scene: [ENVIRONMENT / ACTION]. Camera: [angle]. Format: [1:1 / 16:9 / 9:16].',
        'No text in image (unless product label).',
      ]
    : [
        'Reference lock: naudok tuos pačius 3–5 reference vaizdus.',
        'Taisyklė: same product, same proportions, same label/logo placement, same color palette, same style.',
        'Nauja scena: [APLINKA / VEIKSMAS]. Kamera: [kampas]. Formatas: [1:1 / 16:9 / 9:16].',
        'Be teksto vaizde (nebent etiketė ant produkto).',
      ];
}

function freshRuleLines(locale: ConsistencyLabLocale): string[] {
  return locale === 'en'
    ? [
        'Fresh generate (no reference lock).',
        'Brief change: [WHAT CHANGED]. New look: [STYLE / MOOD].',
        'Scene: [ENVIRONMENT / ACTION]. Camera: [angle]. Format: [1:1 / 16:9 / 9:16].',
        'Do not force same product identity from previous set.',
      ]
    : [
        'Naujas generate (be reference lock).',
        'Brief keitimas: [KAS PASIKEITĖ]. Nauja išvaizda: [STILIUS / NUOTAIKA].',
        'Scena: [APLINKA / VEIKSMAS]. Kamera: [kampas]. Formatas: [1:1 / 16:9 / 9:16].',
        'Neverčiame tos pačios produkto tapatybės iš ankstesnio seto.',
      ];
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
      lines.push(`Fix: ${modeDef.fixCue}`);
    }
    lines.push(...lockRuleLines(locale));
  }

  if (refCount < 3 && missing.length > 0) {
    lines.push(`${ui.missingPrefix} ${missing.join(', ')}.`);
  }

  return lines.join('\n');
}
