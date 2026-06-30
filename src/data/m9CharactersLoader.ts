/**
 * M9 character bios by locale (LT SOT + EN overlay).
 */
import type { M9Character } from '../types/modules';
import m9Lt from './m9Characters.json';
import m9En from './m9Characters-en.json';

export type M9CharactersLocale = 'lt' | 'en';

export function getM9Characters(
  locale: M9CharactersLocale = 'lt'
): M9Character[] {
  const data = locale === 'en' ? m9En : m9Lt;
  return (data as { characters: M9Character[] }).characters;
}
