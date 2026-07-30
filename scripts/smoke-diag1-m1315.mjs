/**
 * Owner smoke helper: M1315-2 C1–C6 + M1315-DIAG @375px light/dark.
 * Requires DEV server with full catalog (DEV access tier 15).
 * Usage: node scripts/smoke-diag1-m1315.mjs
 * Env: SMOKE_BASE_URL (default http://localhost:3001/)
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'tmp', 'smoke-m1315');
const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000/';

mkdirSync(OUT, { recursive: true });

/** @type {{ name: string, moduleId: number, slideIndex: number, expect: RegExp, diag?: boolean }[]} */
const SHOTS = [
  {
    name: 'm1315-c1-m13-130',
    moduleId: 13,
    slideIndex: 0,
    expect: /Turinio inžinerij|Content engineering|kelias|path/i,
  },
  {
    name: 'm1315-c1-m13-13.1',
    moduleId: 13,
    slideIndex: 1,
    expect: /Awareness|Engagement|Conversion|kampanij|campaign|Trumpai|In short|kelias|path|vaizd|image|Turinio/i,
  },
  {
    name: 'm1315-c2-m13-13.12',
    moduleId: 13,
    slideIndex: 2,
    expect: /grandin|chain|Brief|stills|I2V|pipeline|medijos/i,
    diag: true,
  },
  {
    name: 'm1315-c2b-m13-13.2',
    moduleId: 13,
    slideIndex: 4,
    expect: /prompto pagrind|prompt basics|Objekt|Subject|Kontekst|Context|Estetik|Aesthetic/i,
    diag: true,
  },
  {
    name: 'm1315-c3-m13-13.32',
    moduleId: 13,
    slideIndex: 7,
    expect: /[Cc]onsistency|reference|lock|character|product|personaž|Reference|tas pats|same style/i,
    diag: true,
  },
  {
    name: 'm1315-c3a-m13-13.325',
    moduleId: 13,
    slideIndex: 8,
    expect: /Consistency drift lab|Kas plaukioja|What drifted|Ref lock|Simptomas|Symptom/i,
    diag: true,
  },
  {
    name: 'm1315-c3aa-m13-13.37',
    moduleId: 13,
    slideIndex: 12,
    expect: /Vaizdo generator|Image generator|Pasirengimas|Readiness|Sugeneruotas promptas|Generated prompt/i,
  },
  {
    name: 'm1315-c3ab-m13-13.47',
    moduleId: 13,
    slideIndex: 15,
    expect: /I2V|Keyframe|Pasirengimas|Readiness|Pasirink judes|Choose motion/i,
  },
  {
    name: 'm1315-c3b-m13-13.5',
    moduleId: 13,
    slideIndex: 16,
    expect: /CPI|video|Video|3–5|3-5|Trumpai|In short|įrank|tool|format/i,
  },
  {
    name: 'm1315-c3c-m13-13.11',
    moduleId: 13,
    slideIndex: 23,
    expect: /brief|publikacij|publication|variant|A\/B|optimiz/i,
    diag: true,
  },
  {
    name: 'm1315-c4-m14-140',
    moduleId: 14,
    slideIndex: 0,
    expect: /test|žini|Module 14|Modulis 14|warm-up|Savitikra/i,
  },
  {
    name: 'm1315-c4-m14-142',
    moduleId: 14,
    slideIndex: 3,
    expect: /Rezultat|Result|score|balas|Pakartoti|Retry|test|≥\s*70|70\s*%/i,
  },
  {
    name: 'm1315-c5-m15-150',
    moduleId: 15,
    slideIndex: 0,
    expect: /projekt|project|Greitas|Quick|Pilnas|Full|Privaloma|Required/i,
  },
  {
    name: 'm1315-c5-m15-150.5',
    moduleId: 15,
    slideIndex: 1,
    expect: /hero|Greitas startas|Quick start|prompt|vaizdas|image|brief/i,
  },
  {
    name: 'm1315-c5-m15-150.25',
    moduleId: 15,
    slideIndex: 2,
    expect: /cikl|loop|greit|quick|piln|full|Trumpai|In short|projekt|practice|Brief|hero/i,
    diag: true,
  },
  {
    name: 'm1315-c6-m13-13.101',
    moduleId: 13,
    slideIndex: 22,
    expect: /rizik|risk|C2PA|teis|rights|Patikra|Check|Trumpai|In short/i,
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
  const resume = page.getByRole('button', {
    name: /Tęsti nuo skaidrės|Continue from slide/i,
  });
  if (await resume.first().isVisible().catch(() => false)) {
    await resume.first().click();
    await page.waitForTimeout(400);
    await waitLoaded(page);
  }
}

async function openModuleAt(page, moduleId, slideIndex, locale, theme) {
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.evaluate(
    ({ moduleId, slideIndex, locale, theme }) => {
      localStorage.clear();
      localStorage.setItem('theme', theme);
      localStorage.setItem('prompt-anatomy-locale', locale);
      // Start at slide 0; navigate with ArrowRight below (avoids resume/pos races).
      localStorage.setItem(
        'prompt-anatomy-slide-pos',
        JSON.stringify({ [String(moduleId)]: 0 })
      );
      localStorage.setItem('verified_access_tier', '15');
    },
    { moduleId, slideIndex, locale, theme }
  );
  await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
  await waitLoaded(page);
  await openModulesPage(page);

  const card = page.locator(
    `[role="button"][aria-label*="modulį ${moduleId}" i], [role="button"][aria-label*="module ${moduleId}" i], [role="button"][aria-label*="Modulis ${moduleId}" i], [role="button"][aria-label*="Module ${moduleId}" i]`
  );

  if ((await card.count()) > 0) {
    await card.first().scrollIntoViewIfNeeded();
    await card.first().click({ force: true });
  } else {
    const loose = page.locator(`[role="button"][aria-label*="${moduleId}"]`);
    const count = await loose.count();
    let clicked = false;
    for (let i = 0; i < count; i++) {
      const label = (await loose.nth(i).getAttribute('aria-label')) || '';
      if (
        new RegExp(`(modul[įi]|module)\\s*${moduleId}\\b|\\b${moduleId}:`, 'i').test(
          label
        )
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

  // Ensure we land on the requested slide (resume / pos race).
  for (let step = 0; step < slideIndex; step++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(300);
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
    { locale: 'lt', theme: 'dark', shots: SHOTS.filter((s) => s.diag || /c6|c2/.test(s.name)) },
    {
      locale: 'en',
      theme: 'light',
      shots: SHOTS.filter((s) =>
        /c1-m13-130|c2|c3a|c4-m14-140|c5-m15-150|c6/.test(s.name)
      ),
    },
    {
      locale: 'en',
      theme: 'dark',
      shots: SHOTS.filter((s) => s.diag),
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
        await page.waitForTimeout(800);
        await waitLoaded(page);
        const text = await bodyTextSample(page);
        const path = join(OUT, `${key}.png`);
        await page.screenshot({ path, fullPage: true });

        const hasDocs = /docs\/[A-Za-z0-9_./-]+\.md/.test(text);
        const curriculumIdUi =
          /skaidr[ėe]\s+\d+\.\d+|slide\s+\d+\.\d+|\(\s*13\.\d+\s*\)|\b150\.5\b|\b151–154\b/i.test(
            text
          );
        const expectOk = shot.expect.test(text);
        const stillLoading = /Kraunama\.\.\.|Loading\.\.\./i.test(text);
        const onResume =
          /Sveiki sugrįžę|Welcome back|Tęsti nuo skaidrės|Continue from slide/i.test(
            text
          );
        const overflowX = await page.evaluate(
          () => document.documentElement.scrollWidth > 375 + 2
        );

        const ok =
          expectOk &&
          !hasDocs &&
          !curriculumIdUi &&
          !stillLoading &&
          !onResume &&
          !overflowX;
        report.push({
          key,
          ok,
          expectOk,
          hasDocs,
          curriculumIdUi,
          stillLoading,
          onResume,
          overflowX,
          path,
        });
        console.log(
          ok ? 'PASS' : 'FAIL',
          key,
          !expectOk ? 'expect' : '',
          hasDocs ? 'docs' : '',
          curriculumIdUi ? 'id-ui' : '',
          overflowX ? 'overflowX' : ''
        );
      } catch (e) {
        report.push({ key, ok: false, error: String(e?.message || e) });
        console.log('FAIL', key, e?.message || e);
      }
    }
  }

  await browser.close();
  const failed = report.filter((r) => !r.ok);
  console.log('\nSummary:', report.length - failed.length, '/', report.length, 'PASS');
  console.log('Screenshots:', OUT);
  if (failed.length) {
    process.exitCode = 1;
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
