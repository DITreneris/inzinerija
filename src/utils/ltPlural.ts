/**
 * Lietuvių skaitvardžių derinimo formos (CLDR: one / few / other).
 *
 * - one: baigiasi 1, bet ne 11 → 1, 21, 31…
 * - few: baigiasi 2–9, bet ne 12–19 → 2–9, 22–29…
 * - other: 0, 10–20, 30, 40… (ir neigiami pagal abs)
 */
export type LtCountForm = 'one' | 'few' | 'other';

export function ltCountForm(n: number): LtCountForm {
  const abs = Math.abs(Math.trunc(n));
  const last2 = abs % 100;
  const last1 = abs % 10;
  if (last1 === 1 && last2 !== 11) return 'one';
  if (last1 >= 2 && last1 <= 9 && (last2 < 10 || last2 >= 20)) return 'few';
  return 'other';
}

/** Vardininkas: 1 modulis, 2 moduliai, 10 modulių. */
export function ltModulisNominative(n: number): string {
  switch (ltCountForm(n)) {
    case 'one':
      return 'modulis';
    case 'few':
      return 'moduliai';
    default:
      return 'modulių';
  }
}

/** Kilmininkas po „iš“ / „iki“: 1 modulio, kitaip modulių. */
export function ltModulisGenitive(n: number): string {
  return ltCountForm(n) === 'one' ? 'modulio' : 'modulių';
}

/** Dalyvis su nominatyvu: baigtas / baigti / baigta. */
export function ltModulisCompletedParticiple(n: number): string {
  switch (ltCountForm(n)) {
    case 'one':
      return 'baigtas';
    case 'few':
      return 'baigti';
    default:
      return 'baigta';
  }
}

/** EN: 1 module, N modules. */
export function enModuleWord(n: number): string {
  return Math.abs(Math.trunc(n)) === 1 ? 'module' : 'modules';
}

/**
 * Lokalizuotas „modulis“ žodis.
 * @param caseForm nominative – vardininkas; genitive – po „iš“/„iki“.
 */
export function moduleWord(
  locale: string,
  n: number,
  caseForm: 'nominative' | 'genitive' = 'nominative'
): string {
  if (locale !== 'lt') return enModuleWord(n);
  return caseForm === 'genitive'
    ? ltModulisGenitive(n)
    : ltModulisNominative(n);
}

/** „baigtas/baigti/baigta“ (LT) arba „completed“ (EN). */
export function modulesCompletedWord(locale: string, n: number): string {
  if (locale !== 'lt') return 'completed';
  return ltModulisCompletedParticiple(n);
}
