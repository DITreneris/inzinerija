/**
 * Generate real M5/M6 handout PDFs via handoutPdfKit (same font path as production).
 * Usage: npx tsx scripts/generate-m5-m6-handout-pdfs.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import {
  clearPdfUnicodeFontCache,
  setPdfUnicodeFontCache,
} from '../src/utils/pdfNotoFont';
import {
  createHandoutDoc,
  addHeader,
  addFooter,
  addSectionTitle,
  addWrappedText,
  addListSection,
  drawSectionLeftBorder,
  HANDOUT_CONTENT_X,
  HANDOUT_CONTENT_W_INNER,
  HANDOUT_BRAND_COLOR,
  HANDOUT_ACCENT_COLOR,
} from '../src/utils/handoutPdfKit';
import m5 from '../src/data/m5HandoutContent.json';
import m6 from '../src/data/m6HandoutContent.json';

const OUT = resolve('tmp/smoke-pdf-1-6');
mkdirSync(OUT, { recursive: true });

const fontBytes = readFileSync(resolve('public/fonts/Roboto-Regular.ttf'));
clearPdfUnicodeFontCache();
setPdfUnicodeFontCache(fontBytes.toString('base64'), 'Roboto-Regular.ttf');

function inspect(buf: Buffer) {
  const latin = buf.toString('latin1');
  return {
    size: buf.length,
    hasFontFile: /\/FontFile2|\/FontFile3|\/FontFile\b/.test(latin),
    hasFamily: /NotoSans|Roboto/.test(latin),
    hasLithuanianHint:
      /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/.test(latin) ||
      /0105|017E|0117|016B|010D|0119|0161/i.test(latin),
  };
}

async function genM5() {
  const ctx = await createHandoutDoc('regular');
  if (!ctx.useCustomFont) throw new Error('M5: font not registered');
  let y = addHeader(ctx, m5.title, m5.subtitle, 'lt');
  const yTools = y;
  y = addSectionTitle(ctx, '1. Pagrindiniai įrankiai', y);
  y =
    addWrappedText(
      ctx,
      m5.toolsIntro,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.paragraphGap;
  for (const bullet of m5.toolsBullets) {
    y =
      addWrappedText(
        ctx,
        `• ${bullet}`,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  }
  drawSectionLeftBorder(ctx.doc, yTools, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;
  y =
    addWrappedText(
      ctx,
      m5.masterPrompt,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  y = addListSection(ctx, '3. Seka (15 min sprintas)', m5.sequenceSteps, y);
  const yConcepts = y;
  y = addSectionTitle(ctx, '4. Sąvokos', y);
  for (const point of m5.qualityCheckPoints) {
    y =
      addWrappedText(
        ctx,
        `• ${point}`,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
  }
  y =
    addWrappedText(
      ctx,
      m5.thresholdsExplanation,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  drawSectionLeftBorder(ctx.doc, yConcepts, y, HANDOUT_ACCENT_COLOR);
  addFooter(ctx, m5.footerText, {
    websiteCta: 'www.promptanatomy.app',
    websiteUrl: 'https://www.promptanatomy.app/',
    linkPrefix: 'Daugiau: ',
  });
  const buf = Buffer.from(ctx.doc.output('arraybuffer'));
  writeFileSync(join(OUT, 'Promptu_anatomija_Modulio5_atmintine.pdf'), buf);
  return { name: 'Modulio5', useCustomFont: ctx.useCustomFont, buf };
}

async function genM6() {
  const ctx = await createHandoutDoc('regular');
  if (!ctx.useCustomFont) throw new Error('M6: font not registered');
  let y = addHeader(ctx, m6.title, m6.subtitle, 'lt');
  y = addListSection(
    ctx,
    '1. Projekto etapai (6 žingsniai)',
    m6.projectSteps,
    y
  );
  const yData = y;
  y = addSectionTitle(ctx, '2. Duomenų tvarkymas (5 punktai)', y);
  for (const point of m6.dataManagementPoints) {
    y =
      addWrappedText(
        ctx,
        point.title,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER
      ) + ctx.typography.paragraphGap;
    y =
      addWrappedText(
        ctx,
        point.practicalMeaning,
        HANDOUT_CONTENT_X,
        y,
        HANDOUT_CONTENT_W_INNER,
        ctx.typography.body - 1,
        ctx.typography.lineHeightBody - 0.3
      ) + ctx.typography.paragraphGap;
  }
  drawSectionLeftBorder(ctx.doc, yData, y, HANDOUT_BRAND_COLOR);
  y += ctx.typography.sectionGap;
  y = addSectionTitle(
    ctx,
    '3. Refleksija ir pirmas veiksmas',
    y,
    HANDOUT_ACCENT_COLOR
  );
  y =
    addWrappedText(
      ctx,
      m6.reflectionSummary,
      HANDOUT_CONTENT_X,
      y,
      HANDOUT_CONTENT_W_INNER
    ) + ctx.typography.sectionGap;
  addFooter(ctx, m6.footerText, {
    websiteCta: 'www.promptanatomy.app',
    websiteUrl: 'https://www.promptanatomy.app/',
    linkPrefix: 'Daugiau: ',
  });
  const buf = Buffer.from(ctx.doc.output('arraybuffer'));
  writeFileSync(join(OUT, 'Promptu_anatomija_Modulio6_atmintine.pdf'), buf);
  return { name: 'Modulio6', useCustomFont: ctx.useCustomFont, buf };
}

const a = await genM5();
const b = await genM6();
const report = [
  { name: a.name, useCustomFont: a.useCustomFont, ...inspect(a.buf) },
  { name: b.name, useCustomFont: b.useCustomFont, ...inspect(b.buf) },
];
writeFileSync(
  join(OUT, 'generate-report.json'),
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
const bad = report.filter(
  (r) => !r.useCustomFont || !r.hasFontFile || r.size < 5000
);
if (bad.length) {
  console.error('FAIL', bad);
  process.exit(2);
}
console.log('OK generate M5/M6 PDFs');
