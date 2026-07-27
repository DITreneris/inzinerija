import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync, readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'tmp', 'smoke-pdf-1-6');
mkdirSync(OUT, { recursive: true });
const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3001/';

function inspectPdfFile(path) {
  const buf = readFileSync(path);
  const latin = buf.toString('latin1');
  return {
    size: buf.length,
    hasFontFile: /\/FontFile2|\/FontFile3|\/FontFile\b/.test(latin),
    hasFamily: /NotoSans|Roboto/.test(latin),
    hasLithuanianHint:
      /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/.test(latin) ||
      /0105|017E|0117|016B|010D|0119/i.test(latin),
  };
}

async function waitLoaded(page) {
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || '';
      return t.length > 80 && !/Kraunama\.\.\.|Loading\.\.\./i.test(t);
    },
    { timeout: 45000 }
  );
}

async function seed(page, moduleId, slideIndex) {
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(700);
  await page.evaluate(
    ({ moduleId, slideIndex }) => {
      localStorage.setItem('theme', 'light');
      localStorage.setItem('prompt-anatomy-locale', 'lt');
      localStorage.setItem('verified_access_tier', '12');
      localStorage.setItem(
        'prompt-anatomy-slide-pos',
        JSON.stringify({ [String(moduleId)]: slideIndex })
      );
      const now = new Date().toISOString();
      localStorage.setItem(
        'prompt-anatomy-progress',
        JSON.stringify({
          version: 2,
          completedModules: [1, 2, 3, 4, 5, 6],
          completedTasks: {},
          quizCompleted: true,
          quizScore: 80,
          moduleTestScores: { 2: 80, 5: 85 },
          moduleJourneyFocus: {},
          createdAt: now,
          updatedAt: now,
        })
      );
    },
    { moduleId, slideIndex }
  );
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await waitLoaded(page);
}

async function goModules(page) {
  const menu = page.getByRole('button', { name: /Atidaryti meniu/i });
  if (await menu.isVisible().catch(() => false)) await menu.click();
  await page.getByRole('button', { name: /Moduliai/i }).first().click({
    force: true,
  });
  await page.waitForTimeout(500);
  await waitLoaded(page);
}

async function openMod(page, moduleId) {
  await goModules(page);
  // Completed: "Peržiūrėti modulį N: …"; locked/new: "Pradėti modulį N: …"
  const card = page.getByRole('button', {
    name: new RegExp(
      `(Peržiūrėti|Pradėti|Open|Start).*modul[iįy]\\s*${moduleId}\\b|module\\s*${moduleId}\\b`,
      'i'
    ),
  });
  await card.first().scrollIntoViewIfNeeded();
  await card.first().click({ force: true });
  await page.waitForTimeout(700);
  const resume = page.getByRole('button', {
    name: /Tęsti nuo skaidrės|Continue from slide/i,
  });
  if (await resume.first().isVisible().catch(() => false)) {
    await resume.first().click();
    await page.waitForTimeout(800);
  }
  await waitLoaded(page);
}

async function clickReveal(page) {
  const reveal = page.getByRole('button', {
    name: /Pereiti prie veiksmo|Continue to action|Pamatyk|per 1 minut|Reveal action|Start here/i,
  });
  if (await reveal.first().isVisible().catch(() => false)) {
    await reveal.first().click();
    await page.waitForTimeout(500);
    return true;
  }
  return false;
}

async function downloadHandout(page, nameRe, outName) {
  await clickReveal(page);
  const btn = page.getByRole('button', { name: nameRe }).first();
  await btn.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(200);
  if (!(await btn.isVisible().catch(() => false))) {
    const alt = page
      .locator('button')
      .filter({ hasText: nameRe })
      .first();
    if (!(await alt.isVisible().catch(() => false))) {
      const texts = await page.locator('button').evaluateAll((els) =>
        els.map((e) => (e.textContent || '').trim()).filter((t) => /PDF|atmintin|handout/i.test(t))
      );
      return { ok: false, reason: 'button not found', pdfBtns: texts };
    }
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 25000 }),
      alt.click(),
    ]);
    const path = join(OUT, outName);
    await download.saveAs(path);
    return { ok: true, path, suggested: download.suggestedFilename(), ...inspectPdfFile(path) };
  }
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 25000 }),
    btn.click(),
  ]);
  const path = join(OUT, outName);
  await download.saveAs(path);
  return { ok: true, path, suggested: download.suggestedFilename(), ...inspectPdfFile(path) };
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  acceptDownloads: true,
});

const report = {};

// PDF-1
await seed(page, 5, 10);
await openMod(page, 5);
report.pdf1 = await downloadHandout(
  page,
  /Parsisiųsti Modulio 5 atmintinę/i,
  'm5-handout.pdf'
);
console.log('PDF-1', report.pdf1);

// PDF-6 promise
await seed(page, 5, 0);
await openMod(page, 5);
const revealed = await clickReveal(page);
await page.waitForTimeout(400);
const t45 = await page.evaluate(() => document.body.innerText);
report.promise = /Modulio 5 atmintinę \(PDF\)|atmintinę \(PDF\):/i.test(t45);
console.log(
  'PDF-6 promise',
  report.promise,
  'revealed',
  revealed,
  t45.slice(0, 280).replace(/\s+/g, ' ')
);

// PDF-2
await seed(page, 6, 8);
await openMod(page, 6);
report.pdf2 = await downloadHandout(
  page,
  /Parsisiųsti Modulio 6 atmintinę/i,
  'm6-handout.pdf'
);
console.log('PDF-2', report.pdf2);

// PDF-6 materials
await seed(page, 6, 0);
await goModules(page);
const matText = await page.evaluate(() => document.body.innerText);
report.materialsVisible = /Mano medžiaga/i.test(matText);
const m5mat = page.getByRole('button', {
  name: /Parsisiųsti Modulio 5 atmintinę|Download Module 5 handout/i,
});
const m6mat = page.getByRole('button', {
  name: /Parsisiųsti Modulio 6 atmintinę|Download Module 6 handout/i,
});
report.matCounts = {
  m5: await m5mat.count(),
  m6: await m6mat.count(),
};
if ((await m5mat.count()) > 0) {
  const [d] = await Promise.all([
    page.waitForEvent('download', { timeout: 25000 }),
    m5mat.first().click(),
  ]);
  const p = join(OUT, 'm5-materials.pdf');
  await d.saveAs(p);
  report.matM5 = { ok: true, ...inspectPdfFile(p) };
}
if ((await m6mat.count()) > 0) {
  const [d] = await Promise.all([
    page.waitForEvent('download', { timeout: 25000 }),
    m6mat.first().click(),
  ]);
  const p = join(OUT, 'm6-materials.pdf');
  await d.saveAs(p);
  report.matM6 = { ok: true, ...inspectPdfFile(p) };
}
console.log('PDF-6 materials', {
  visible: report.materialsVisible,
  counts: report.matCounts,
  m5: report.matM5,
  m6: report.matM6,
});

// PDF-3 / 4 / 5 quick
await seed(page, 4, 20);
await openMod(page, 4);
await clickReveal(page);
const t4 = await page.evaluate(() => document.body.innerText);
const tabs = await page
  .locator('[role="tab"], button')
  .filter({ hasText: /Bazinis|RAG|Agentinis|Basic|Agent/i })
  .count();
const copy4 = await page.getByRole('button', { name: /Kopijuoti|Copy/i }).count();
const enlarge = await page
  .getByRole('button', {
    name: /Išskleisti schemą|pilname dydyje|full size|Expand diagram|Enlarge/i,
  })
  .count();
report.pdf3 = {
  titleOk: /RAG/i.test(t4),
  tabs,
  copy: copy4 > 0,
  enlarge: enlarge > 0,
  lith: /[ąčęėįšųūž]/.test(t4),
};
console.log('PDF-3', report.pdf3);

await seed(page, 6, 8);
await openMod(page, 6);
await clickReveal(page);
const t6 = await page.evaluate(() => document.body.innerText);
const copy6 = await page.getByRole('button', { name: /Kopijuoti|Copy/i }).count();
report.pdf4 = {
  titleOk: /Duomenų tvarkym/i.test(t6),
  copy: copy6 > 0,
  notDeep: !/^.*Deep research/i.test(t6.split('\n')[0] || ''),
};
console.log('PDF-4', report.pdf4);

report.pdf5 = {};
for (const [key, mid, sid] of [
  ['m1', 1, 0],
  ['m4', 4, 20],
  ['m6', 6, 0],
]) {
  await seed(page, mid, sid);
  await openMod(page, mid);
  const overflow = await page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollWidth > el.clientWidth + 8;
  });
  report.pdf5[key] = { overflow };
}
console.log('PDF-5', report.pdf5);

writeFileSync(join(OUT, 'report-v2.json'), JSON.stringify(report, null, 2));

const fails = [];
if (!report.pdf1?.ok || !report.pdf1?.hasFontFile) fails.push('PDF-1');
if (!report.pdf2?.ok || !report.pdf2?.hasFontFile) fails.push('PDF-2');
if (!report.pdf3?.tabs || !report.pdf3?.copy) fails.push('PDF-3');
// enlarge is aria-only on some diagram shells — soft signal, not hard fail if tabs+copy ok
if (!report.pdf3?.titleOk || !report.pdf3?.lith) fails.push('PDF-3.content');
if (!report.pdf4?.titleOk || !report.pdf4?.copy) fails.push('PDF-4');
if (Object.values(report.pdf5).some((x) => x.overflow)) fails.push('PDF-5');
if (!report.promise) fails.push('PDF-6.promise');
if (!report.materialsVisible || !report.matM5?.ok || !report.matM6?.ok)
  fails.push('PDF-6.materials');
console.log('FAILS', fails);
await browser.close();
process.exitCode = fails.length ? 2 : 0;
