/**
 * A-S1: 6 blokų struktūros tikrinimas – heuristika pagal heading'us (META:, INPUT:, …).
 * Vietoj tik keyword buvimo tekste – tikriname, ar yra atpažįstama sekcija (eilutės pradžia).
 */

export const SIX_BLOCKS = [
  'META',
  'INPUT',
  'OUTPUT',
  'REASONING',
  'QUALITY',
  'ADVANCED',
] as const;
export type BlockName = (typeof SIX_BLOCKS)[number];

/** Vieno sakinio pavyzdžiai trūkstamiems blokams (rodomi UI) */
export const BLOCK_EXAMPLES: Record<BlockName, string> = {
  META: 'META: Jūsų rolė, tikslas ir auditorija.',
  INPUT: 'INPUT: Duomenys, skaičiai, apribojimai.',
  OUTPUT: 'OUTPUT: Formatas, struktūra, kalba.',
  REASONING: 'REASONING: Žingsniai arba mąstymo būdas.',
  QUALITY: 'QUALITY: Tikrinimo kriterijai.',
  ADVANCED: 'ADVANCED: Temperature, max tokens (jei reikia).',
};

const BLOCK_EXAMPLES_EN: Record<BlockName, string> = {
  META: 'META: Your role, goal, and audience.',
  INPUT: 'INPUT: Data, numbers, constraints.',
  OUTPUT: 'OUTPUT: Format, structure, language.',
  REASONING: 'REASONING: Steps or reasoning style.',
  QUALITY: 'QUALITY: Quality-check criteria.',
  ADVANCED: 'ADVANCED: Temperature, max tokens (if needed).',
};

/** Pavyzdinė eilutė trūkstam blokui pagal kalbą */
export function getBlockExample(block: BlockName, locale: 'lt' | 'en'): string {
  return locale === 'en' ? BLOCK_EXAMPLES_EN[block] : BLOCK_EXAMPLES[block];
}

/**
 * Tikrina, ar tekste yra bloko antraštė (eilutės pradžioje "BLOCK:" arba "BLOCK ").
 * Grąžina: present – rasti blokai, missing – trūkstantys.
 */
export function detectBlocks(text: string | null | undefined): {
  present: BlockName[];
  missing: BlockName[];
} {
  if (!text || !text.trim()) {
    return { present: [], missing: [...SIX_BLOCKS] };
  }
  const normalized = `\n${text.toUpperCase().replace(/\r/g, '')}`;
  const present: BlockName[] = [];
  for (const block of SIX_BLOCKS) {
    // Sekcija: nauja eilutė + BLOCK: arba BLOCK (tarpas arba dvitaškis)
    const re = new RegExp(`\\n\\s*${block}\\s*[:\\s]`, 'i');
    if (re.test(normalized)) present.push(block);
  }
  const missing = SIX_BLOCKS.filter((b) => !present.includes(b));
  return { present, missing };
}

/** Ar blokas „užpildytas“ pagal struktūrą (sekcijos buvimas). */
export function isBlockFilled(
  block: BlockName,
  text: string | null | undefined
): boolean {
  const { present } = detectBlocks(text);
  return present.includes(block);
}
