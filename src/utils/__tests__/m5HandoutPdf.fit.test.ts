/**
 * Real jsPDF fit guard: M5 body must end above the footer band.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  clearPdfUnicodeFontCache,
  setPdfUnicodeFontCache,
} from '../pdfNotoFont';
import { HANDOUT_CONTENT_BOTTOM } from '../handoutPdfKit';
import { buildM5HandoutPdf } from '../m5HandoutPdf';
import m5Lt from '../../data/m5HandoutContent.json';
import m5En from '../../data/m5HandoutContent-en.json';

describe('m5HandoutPdf page fit', () => {
  beforeAll(() => {
    clearPdfUnicodeFontCache();
    const fontPath = resolve(process.cwd(), 'public/fonts/Roboto-Regular.ttf');
    const fontBytes = readFileSync(fontPath);
    setPdfUnicodeFontCache(fontBytes.toString('base64'), 'Roboto-Regular.ttf');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        arrayBuffer: async () =>
          fontBytes.buffer.slice(
            fontBytes.byteOffset,
            fontBytes.byteOffset + fontBytes.byteLength
          ),
      })
    );
  });

  it('LT content ends above footer band', async () => {
    const { contentEndY } = await buildM5HandoutPdf(m5Lt, 'lt');
    expect(contentEndY).toBeLessThanOrEqual(HANDOUT_CONTENT_BOTTOM);
  });

  it('EN content ends above footer band', async () => {
    const { contentEndY } = await buildM5HandoutPdf(m5En, 'en');
    expect(contentEndY).toBeLessThanOrEqual(HANDOUT_CONTENT_BOTTOM);
  });
});
