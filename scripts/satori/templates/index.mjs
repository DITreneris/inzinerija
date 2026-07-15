import { buildEditorialBeat } from './editorial-beat.mjs';

/** @type {Record<string, (props: object) => object>} */
export const TEMPLATES = {
  'editorial-beat': buildEditorialBeat,
};

export function getTemplate(name) {
  const fn = TEMPLATES[name];
  if (!fn) {
    throw new Error(`Unknown Satori template: ${name}`);
  }
  return fn;
}
