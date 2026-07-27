/**
 * Owner smoke helper: DIAG-1 + M1012-2 @375px light/dark screenshots.
 * Usage: node scripts/smoke-diag1-m1012.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'tmp', 'smoke-b-c');
const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3001/';

mkdirSync(OUT, { recursive: true });

/** @type {{ name: string, moduleId: number, slideIndex: number, expect: RegExp }[]} */
const SHOTS = [
  {
    name: 'diag1-01-m7-71-pathmap',
    moduleId: 7,
    slideIndex: 2,
    expect: /Tu esi čia|You are here|Pamatas|Foundation|Kelio žemėlapis|path map/i,
  },
  {
    name: 'diag1-02-m7-73-pipeline',
    moduleId: 7,
    slideIndex: 6,
    expect: /analizės eiga|analysis flow|pipeline|6 žingsni/i,
  },
  {
    name: 'diag1-03-m7-731-types',
    moduleId: 7,
    slideIndex: 9,
    expect: /analizės tip|analysis type|Aprašomoji|Descriptive/i,
  },
  {
    name: 'diag1-04-m7-74-master',
    moduleId: 7,
    slideIndex: 49,
    expect: /MASTER|8 žingsni|8-step|8 step/i,
  },
  {
    name: 'diag1-05-m9-93-workflow',
    moduleId: 9,
    slideIndex: 3,
    expect: /8 žingsni|8-step|workflow|cikl/i,
  },
  {
    name: 'diag1-06-m8-80-scope',
    moduleId: 8,
    slideIndex: 0,
    expect: /test|žini|scope|apim|warm-up|pradėk|start/i,
  },
  {
    name: 'm1012-c1-m10-100',
    moduleId: 10,
    slideIndex: 0,
    expect: /Agent|agent/i,
  },
  {
    name: 'm1012-c1-m10-10.1',
    moduleId: 10,
    slideIndex: 1,
    expect: /Agent|MUST|kelias|path/i,
  },
  {
    name: 'm1012-c2-m10-10.45',
    moduleId: 10,
    slideIndex: 8,
    expect: /tipai|roles|rol|gyl|depth|Pokalbis|Conversation/i,
  },
  {
    name: 'm1012-c3-m10-10.5',
    moduleId: 10,
    slideIndex: 16,
    expect: /agent|prompt/i,
  },
  {
    name: 'm1012-c3c6-m10-10.65',
    moduleId: 10,
    slideIndex: 26,
    expect: /Testav|Security|saugum|incident|playbook/i,
  },
  {
    name: 'm1012-c4-m11-110',
    moduleId: 11,
    slideIndex: 0,
    expect: /test|žini|Module 11|Modulis 11/i,
  },
  {
    name: 'm1012-c4-m11-112',
    moduleId: 11,
    slideIndex: 3,
    expect: /Rezultat|Result|score|balas|Pakartoti|Retry|test/i,
  },
  {
    name: 'm1012-c5b-m12-120.5',
    moduleId: 12,
    slideIndex: 2,
    expect: /kelių agent|multi-agent|schema|Koordinator|Coordinator/i,
  },
  {
    name: 'm1012-c5b-m12-120.55',
    moduleId: 12,
    slideIndex: 3,
    expect: /Kontrolin|Checkpoint|path-step|kelių agent/i,
  },
  {
    name: 'm1012-c5-m12-124.5',
    moduleId: 12,
    slideIndex: 4,
    expect: /Koordinator|Coordinator|scenarij|practice|specialist/i,
  },
  {
    name: 'm1012-c5-m12-128',
    moduleId: 12,
    slideIndex: 10,
    expect: /santrauk|summary|projekt/i,
  },
];

async function waitLoaded(page) {
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || '';
      return t.length > 80 && !/Kraunama\.\.\.|Loading\.\.\./i.test(t);
    },
    { timeout: 30000 }
  );
}

async function openModulesPage(page) {
  const menuOpen = page.getByRole('button', {
    name: /Atidaryti meniu|Open menu/i,
  });
  if (await menuOpen.isVisible().catch(() => false)) {
    await menuOpen.click();
    await page.waitForTimeout(200);
  }
  await page
    .getByRole('button', { name: /Moduliai|Modules/i })
    .first()
    .click({ force: true, timeout: 15000 });
  await page.waitForTimeout(400);
  await waitLoaded(page);
}

async function dismissResume(page) {
  // Exact LT/EN resume primary CTA
  const resume = page.getByRole('button', {
    name: /Tęsti nuo skaidrės|Continue from slide/i,
  });
  if (await resume.first().isVisible().catch(() => false)) {
    await resume.first().click();
    await page.waitForTimeout(400);
    await waitLoaded(page);
    return;
  }
  // Fallback shorter labels
  const alt = page.getByRole('button', { name: /^Tęsti|^Continue$/i });
  if (await alt.first().isVisible().catch(() => false)) {
    const box = await alt.first().boundingBox();
    // Only click if it looks like the resume card CTA (large)
    if (box && box.width > 200) {
      await alt.first().click();
      await page.waitForTimeout(400);
      await waitLoaded(page);
    }
  }
}

async function openModuleAt(page, moduleId, slideIndex, locale, theme) {
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(
    ({ moduleId, slideIndex, locale, theme }) => {
      localStorage.clear();
      localStorage.setItem('theme', theme);
      localStorage.setItem('prompt-anatomy-locale', locale);
      localStorage.setItem(
        'prompt-anatomy-slide-pos',
        JSON.stringify({ [String(moduleId)]: slideIndex })
      );
      localStorage.setItem('verified_access_tier', '12');
    },
    { moduleId, slideIndex, locale, theme }
  );
  await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
  await waitLoaded(page);

  await openModulesPage(page);

  // EN: "Open module 7: …" / LT: "Atidaryti modulį 7: …" or "… modulį 7:"
  const card = page
    .locator('[role="button"][aria-label]')
    .filter({
      hasText: /.*/,
    })
    .and(
      page.locator(
        `[aria-label*="modulį ${moduleId}" i], [aria-label*="module ${moduleId}" i], [aria-label*="Modulis ${moduleId}" i], [aria-label*="Module ${moduleId}" i]`
      )
    );

  if ((await card.count()) > 0) {
    await card.first().scrollIntoViewIfNeeded();
    await card.first().click({ force: true });
  } else {
    // Fallback: any aria containing the number as module id near title
    const loose = page.locator(`[role="button"][aria-label*="${moduleId}"]`);
    // Prefer labels that also mention DI / Agent / Data
    const count = await loose.count();
    let clicked = false;
    for (let i = 0; i < count; i++) {
      const label = (await loose.nth(i).getAttribute('aria-label')) || '';
      if (
        new RegExp(
          `(modul[įi]|module)\\s*${moduleId}\\b|\\b${moduleId}:`,
          'i'
        ).test(label)
      ) {
        await loose.nth(i).scrollIntoViewIfNeeded();
        await loose.nth(i).click({ force: true });
        clicked = true;
        break;
      }
    }
    if (!clicked) {
      throw new Error(`Module card ${moduleId} not found (locale=${locale})`);
    }
  }

  await page.waitForTimeout(500);
  await dismissResume(page);
  await waitLoaded(page);
}

async function bodyTextSample(page) {
  return page.evaluate(() => {
    const main =
      document.querySelector('main') ||
      document.querySelector('[role="main"]') ||
      document.body;
    return (main?.innerText || '').slice(0, 5000);
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const report = [];

  const passes = [
    { locale: 'lt', theme: 'light', shots: SHOTS },
    { locale: 'lt', theme: 'dark', shots: SHOTS },
    {
      locale: 'en',
      theme: 'light',
      shots: SHOTS.filter((s) =>
        /m1012-c2|m1012-c3|m1012-c5b|m1012-c5-m12|m1012-c4|diag1-/.test(s.name)
      ),
    },
    {
      locale: 'en',
      theme: 'dark',
      shots: SHOTS.filter((s) => /m1012-c3c6|diag1-/.test(s.name)),
    },
  ];

  for (const pass of passes) {
    for (const shot of pass.shots) {
      const key = `${shot.name}__${pass.locale}__${pass.theme}`;
      try {
        await openModuleAt(
          page,
          shot.moduleId,
          shot.slideIndex,
          pass.locale,
          pass.theme
        );
        // Extra settle for lazy diagrams
        await page.waitForTimeout(800);
        await waitLoaded(page);
        const text = await bodyTextSample(page);
        const path = join(OUT, `${key}.png`);
        await page.screenshot({ path, fullPage: true });

        const hasDocs = /docs\/[A-Za-z0-9_./-]+\.md/.test(text);
        const bareHitl = /(^|[^A-Za-z])HITL([^A-Za-z]|$)/.test(text);
        const curriculumIdUi =
          /skaidr[ėe]\s+\d+\.\d+|slide\s+\d+\.\d+|\(\s*10\.\d+\s*\)/i.test(text);
        const expectOk = shot.expect.test(text);
        const stillLoading = /Kraunama\.\.\.|Loading\.\.\./i.test(text);
        const onResume = /Sveiki sugrįžę|Welcome back|Tęsti nuo skaidrės|Continue from slide/i.test(
          text
        );

        report.push({
          key,
          ok: true,
          expectOk,
          stillLoading,
          onResume,
          hasDocs,
          bareHitl,
          curriculumIdUi,
          textPreview: text.slice(0, 240).replace(/\s+/g, ' '),
          path,
        });
        const flags = [
          expectOk ? '' : 'EXPECT',
          stillLoading ? 'LOAD' : '',
          onResume ? 'RESUME' : '',
          hasDocs ? 'DOCS' : '',
          bareHitl ? 'HITL' : '',
          curriculumIdUi ? 'ID' : '',
        ]
          .filter(Boolean)
          .join(' ');
        console.log(expectOk && !stillLoading && !onResume ? 'OK' : 'WARN', key, flags);
      } catch (err) {
        report.push({ key, ok: false, error: String(err).slice(0, 500) });
        console.error('FAIL', key, String(err).slice(0, 220));
      }
    }
  }

  const summaryPath = join(OUT, 'report.json');
  writeFileSync(summaryPath, JSON.stringify(report, null, 2));
  console.log('Wrote', summaryPath, 'shots', report.length);
  await browser.close();

  const fails = report.filter(
    (r) =>
      !r.ok ||
      r.hasDocs ||
      r.bareHitl ||
      r.curriculumIdUi ||
      r.stillLoading ||
      r.onResume ||
      r.expectOk === false
  );
  console.log('ISSUE_COUNT', fails.length);
  if (fails.length) process.exitCode = 2;
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
