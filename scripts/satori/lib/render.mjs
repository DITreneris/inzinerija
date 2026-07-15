import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const FONTS_DIR = join(ROOT, 'data', 'satori', 'fonts');

function loadFont(name, weight, style) {
  const path = join(FONTS_DIR, name);
  if (!existsSync(path)) {
    throw new Error(`Missing font: ${path}. Run: npm run fonts:satori`);
  }
  return {
    name: 'Inter',
    data: readFileSync(path),
    weight,
    style,
  };
}

/** Stable reference for Satori font cache (vercel/satori#590). */
export const SATORI_FONTS = [
  loadFont('Inter-Regular.woff', 400, 'normal'),
  loadFont('Inter-Bold.woff', 700, 'normal'),
];

/**
 * @param {object} element
 * @param {{ width: number, height: number }} size
 * @returns {Promise<Buffer>}
 */
export async function renderPng(element, { width, height }) {
  const svg = await satori(element, {
    width,
    height,
    fonts: SATORI_FONTS,
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
  });
  return resvg.render().asPng();
}
