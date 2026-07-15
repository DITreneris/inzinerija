/**
 * M7 macro-block labels for wayfinding (M79-05).
 * Maps slide ids to one of four curriculum blocks.
 */
export type M7MacroBlockId =
  | 'foundation'
  | 'collection'
  | 'preparation'
  | 'analysis';

export interface M7MacroBlock {
  id: M7MacroBlockId;
  labelLt: string;
  labelEn: string;
}

const BLOCKS: Record<M7MacroBlockId, M7MacroBlock> = {
  foundation: {
    id: 'foundation',
    labelLt: 'Pamatas',
    labelEn: 'Foundation',
  },
  collection: {
    id: 'collection',
    labelLt: 'Rinkimas',
    labelEn: 'Collection',
  },
  preparation: {
    id: 'preparation',
    labelLt: 'Paruošimas',
    labelEn: 'Preparation',
  },
  analysis: {
    id: 'analysis',
    labelLt: 'Analizė / MASTER',
    labelEn: 'Analysis / MASTER',
  },
};

/** Slide ids per block (M7 full catalog). */
const SLIDE_TO_BLOCK: Record<number, M7MacroBlockId> = {
  70: 'foundation',
  70.5: 'foundation',
  71: 'foundation',
  72: 'foundation',
  725: 'foundation',
  726: 'foundation',
  71.1: 'foundation',
  71.2: 'foundation',
  71.3: 'foundation',
  71.35: 'foundation',
  71.4: 'foundation',
  71.5: 'foundation',
  97: 'foundation',
  73: 'collection',
  73.5: 'collection',
  731: 'collection',
  731.5: 'collection',
  732: 'collection',
  733: 'collection',
  734: 'collection',
  76: 'collection',
  74: 'analysis',
  74.5: 'analysis',
  77: 'collection',
  77.5: 'collection',
  78: 'collection',
  78.5: 'collection',
  83: 'collection',
  85: 'collection',
  86: 'collection',
  861: 'collection',
  87: 'collection',
  88: 'collection',
  84: 'collection',
  89: 'preparation',
  891: 'preparation',
  891.5: 'preparation',
  66.9: 'preparation',
  67: 'preparation',
  67.3: 'preparation',
  67.5: 'preparation',
  67.7: 'preparation',
  67.8: 'preparation',
  68: 'preparation',
  200: 'preparation',
  201: 'preparation',
  68.5: 'preparation',
  90: 'analysis',
  91: 'analysis',
  92: 'analysis',
  94: 'analysis',
  95: 'analysis',
  98: 'analysis',
  99.9: 'analysis',
  100: 'analysis',
  101: 'analysis',
  103: 'analysis',
  104: 'analysis',
  106: 'analysis',
  75: 'analysis',
};

export function getM7MacroBlock(
  slideId: number | undefined
): M7MacroBlock | null {
  if (slideId == null) return null;
  const blockId = SLIDE_TO_BLOCK[slideId];
  return blockId ? BLOCKS[blockId] : null;
}

export function getM7MacroBlockLabel(
  slideId: number | undefined,
  locale: 'lt' | 'en'
): string | null {
  const block = getM7MacroBlock(slideId);
  if (!block) return null;
  return locale === 'en' ? block.labelEn : block.labelLt;
}
