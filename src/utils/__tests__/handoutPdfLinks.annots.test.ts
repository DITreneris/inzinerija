/**
 * Real jsPDF smoke: Link annotations + URI (no doc.save — ESM dual-copy safe).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  clearPdfUnicodeFontCache,
  setPdfUnicodeFontCache,
} from '../pdfNotoFont';
import {
  addEcosystemCta,
  addFooter,
  addTrainingUtm,
  createHandoutDoc,
} from '../handoutPdfKit';
import { drawClickableUrl } from '../pdfLink';
import { ECOSYSTEM_URLS } from '../../constants/ecosystemUrls';

function parsePdfLinks(data: ArrayBuffer) {
  const latin = Buffer.from(data).toString('latin1');
  const uriMatches = [...latin.matchAll(/\/URI\s*\(([^)]*)\)/g)].map(
    (m) => m[1]
  );
  const linkCount = [...latin.matchAll(/\/Subtype\s*\/Link/g)].length;
  const rects = [...latin.matchAll(/\/Rect\s*\[([^\]]+)\]/g)].map((m) =>
    m[1]
      .trim()
      .split(/\s+/)
      .map((n) => Number(n))
  );
  const widths = rects.map((r) => Math.abs(r[2] - r[0]));
  return { uriMatches, linkCount, widths };
}

describe('handout/certificate PDF link annotations', () => {
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

  it('ecosystem CTA + footer embed Link annots with handout UTM and hub decide', async () => {
    const ctx = await createHandoutDoc('compact');
    expect(ctx.useCustomFont).toBe(true);

    const decide = addTrainingUtm(ECOSYSTEM_URLS.hub, 'm9_handout_decide');
    const primary =
      'https://www.promptanatomy.blog/articles/ai-workflow-canvas-template/?utm_source=training&utm_medium=handout&utm_campaign=m9_handout';
    const map = addTrainingUtm(ECOSYSTEM_URLS.map, 'm9_handout_map');
    const hub = addTrainingUtm(ECOSYSTEM_URLS.hub, 'm9_handout_hub');

    ctx.doc.addPage();
    addEcosystemCta(ctx, {
      heading: 'Kitas žingsnis',
      intro: 'Intro',
      primaryHeading: 'Pagrindinis',
      primaryLabel: 'Primary CTA',
      primaryUrl: primary,
      secondaryHeading: 'Papildomi',
      secondaryLinks: [
        { label: 'Decide', url: decide },
        { label: 'Map', url: map },
      ],
    });
    addFooter(ctx, 'Footer', {
      websiteCta: 'Kursas: promptanatomy.app',
      websiteUrl: hub,
    });

    const { uriMatches, linkCount, widths } = parsePdfLinks(
      ctx.doc.output('arraybuffer')
    );
    expect(linkCount).toBeGreaterThanOrEqual(3);
    expect(uriMatches.some((u) => u.includes('utm_medium=handout'))).toBe(true);
    const decideUri = uriMatches.find((u) => u.includes('handout_decide'));
    expect(decideUri).toBeTruthy();
    expect(decideUri).toContain('promptanatomy.app');
    expect(decideUri).not.toContain('promptanatomy.pro');
    expect(Math.min(...widths)).toBeGreaterThan(20);
  });

  it('drawClickableUrl creates a Link annotation wider than 20pt', async () => {
    const ctx = await createHandoutDoc('regular');
    drawClickableUrl({
      doc: ctx.doc,
      label: 'Kursas ir daugiau: promptanatomy.app',
      url: 'https://www.promptanatomy.app/',
      x: 18,
      y: 280,
      maxWidth: 174,
      labelFontSize: 8,
      urlFontSize: 7,
      labelLineHeight: 3.5,
      urlLineHeight: 3,
      applyFont: () => {
        ctx.doc.setFont(ctx.useCustomFont ? 'NotoSans' : 'helvetica', 'normal');
      },
      showUrl: false,
      align: 'center',
    });
    const { uriMatches, linkCount, widths } = parsePdfLinks(
      ctx.doc.output('arraybuffer')
    );
    expect(linkCount).toBeGreaterThanOrEqual(1);
    expect(uriMatches.some((u) => u.includes('promptanatomy.app'))).toBe(true);
    expect(Math.min(...widths)).toBeGreaterThan(20);
  });

  it('drawClickableUrl warns when doc.link is missing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const ctx = await createHandoutDoc('regular');
    const docWithoutLink = ctx.doc as typeof ctx.doc & { link?: unknown };
    const originalLink = docWithoutLink.link;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (docWithoutLink as any).link;

    drawClickableUrl({
      doc: docWithoutLink,
      label: 'No hitbox',
      url: 'https://example.com/no-link',
      x: 18,
      y: 40,
      maxWidth: 160,
      labelFontSize: 10,
      urlFontSize: 8,
      labelLineHeight: 4,
      urlLineHeight: 3.5,
      applyFont: () => {
        ctx.doc.setFont(ctx.useCustomFont ? 'NotoSans' : 'helvetica', 'normal');
      },
    });

    expect(warnSpy).toHaveBeenCalled();
    const joined = warnSpy.mock.calls.map((c) => JSON.stringify(c)).join(' ');
    expect(joined).toMatch(/doc\.link missing/i);

    docWithoutLink.link = originalLink;
    warnSpy.mockRestore();
  });
});
