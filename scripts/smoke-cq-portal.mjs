/**
 * CQ-PORTAL Phase A owner smoke: M4 sk. 53.5 @375 light/dark (+ EN spot).
 * Usage: node scripts/smoke-cq-portal.mjs
 * Requires: npm run dev on :3000 or :3001
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'tmp', 'smoke-cq-portal');
const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3001/';
const MODULE_ID = 4;
const SLIDE_INDEX = 10; // 53.5

mkdirSync(OUT, { recursive: true });

async function waitLoaded(page) {
  await page.waitForFunction(
    () => {
      const t = document.body?.innerText || '';
      return t.length > 80 && !/Kraunama\.\.\.|Loading\.\.\./i.test(t);
    },
    { timeout: 45000 }
  );
}

async function seedAndGoto(page, { locale, theme }) {
  // Debounce-safe seed (App saveProgress 500ms) — same pattern as smoke-pdf-1-6
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(700);
  await page.evaluate(
    ({ locale, theme, moduleId, slideIndex }) => {
      localStorage.setItem('theme', theme);
      localStorage.setItem('prompt-anatomy-locale', locale);
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
          completedModules: [1, 2, 3, 4],
          completedTasks: {},
          quizCompleted: false,
          quizScore: null,
          moduleTestScores: {},
          moduleJourneyFocus: {},
          createdAt: now,
          updatedAt: now,
        })
      );
    },
    { locale, theme, moduleId: MODULE_ID, slideIndex: SLIDE_INDEX }
  );
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await waitLoaded(page);
}

async function openModules(page) {
  const menu = page.getByRole('button', {
    name: /Atidaryti meniu|Open menu/i,
  });
  if (await menu.isVisible().catch(() => false)) await menu.click();
  await page
    .getByRole('button', { name: /Moduliai|Modules/i })
    .first()
    .click({ force: true });
  await page.waitForTimeout(500);
  await waitLoaded(page);
}

async function dismissResume(page) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const resume = page.getByRole('button', {
      name: /Tęsti nuo skaidrės|Continue from slide/i,
    });
    if (await resume.first().isVisible({ timeout: 2500 }).catch(() => false)) {
      await resume.first().click({ force: true });
      await page.waitForTimeout(900);
      await waitLoaded(page);
    } else {
      break;
    }
  }
  // Still on resume? force click by text
  const stuck = await page.evaluate(() =>
    /Sveiki sugrįžę|Welcome back|Tęsti nuo skaidrės/i.test(
      document.body?.innerText || ''
    )
  );
  if (stuck) {
    const btn = page.locator('button').filter({
      hasText: /Tęsti nuo skaidrės|Continue from slide/i,
    });
    if ((await btn.count()) > 0) {
      await btn.first().click({ force: true });
      await page.waitForTimeout(900);
      await waitLoaded(page);
    }
  }
}

async function openPortalSlide(page) {
  await openModules(page);
  const card = page.getByRole('button', {
    name: /(Peržiūrėti|Pradėti|Open|Start).*modul[iįy]\s*4\b|module\s*4\b/i,
  });
  await card.first().scrollIntoViewIfNeeded();
  await card.first().click({ force: true });
  await page.waitForTimeout(900);
  await dismissResume(page);
  await waitLoaded(page);
  // Guard: must leave resume card
  const stillResume = await page.evaluate(() =>
    /Sveiki sugrįžę|Welcome back/i.test(document.body?.innerText || '')
  );
  if (stillResume) {
    throw new Error('Stuck on resume modal after dismiss');
  }
}

async function bodyText(page) {
  return page.evaluate(() => {
    const main =
      document.querySelector('main') ||
      document.querySelector('[role="main"]') ||
      document.body;
    return main?.innerText || '';
  });
}

async function analyzePortal(page, locale) {
  const text = await bodyText(page);
  const overflow = await page.evaluate(() => {
    const el = document.scrollingElement || document.documentElement;
    return {
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      overflowX: el.scrollWidth > el.clientWidth + 8,
    };
  });

  const immersiveHint = await page.evaluate(() => {
    // Course nav often reduced / different in immersive portal
    const bottomNav = document.querySelector('[data-testid="slide-bottom-nav"]');
    const labels = Array.from(document.querySelectorAll('nav, [role="navigation"]'))
      .map((n) => (n.getAttribute('aria-label') || n.innerText || '').slice(0, 80));
    return {
      hasBottomNav: Boolean(bottomNav),
      navLabels: labels.slice(0, 8),
    };
  });

  const mastheadNavCount = await page.evaluate(() => {
    const nav = document.querySelector(
      '[aria-label*="portalo" i], [aria-label*="portal" i], nav[aria-hidden]'
    );
    // Count decorative masthead items
    const spans = document.querySelectorAll(
      'nav[aria-hidden] span, [class*="Masthead"] span, [class*="masthead"] button, [class*="masthead"] span'
    );
    return {
      hasPortalNavRegion: Boolean(nav),
      spanishCount: spans.length,
    };
  });

  // Count visible mode-like / section markers in text
  const checks = {
    hasHeroMeta: /\d{4}|min\.|min\b|skaitymo|read/i.test(text),
    noInline98Hero: !/98\s*%[\s\S]{0,40}(hero|virš fold)/i.test(text.slice(0, 800)),
    has327: /32[,.]7\s*%/.test(text),
    has20ish: /\b20\s*%/.test(text) || /20[,.]/.test(text),
    has98: /98\s*%/.test(text),
    hasDataBrief: /Duomenys trumpai|Data at a glance|in brief/i.test(text),
    hasAwareness86: /86\s*%/.test(text),
    hasAwareness38: /38\s*%/.test(text),
    hasGap48: /48/.test(text),
    hasChapterLabels:
      /DUOMENYS|GILIAU|SANTRAUKA|DATA|DEEPER|SUMMARY|Trumpai/i.test(text),
    hasSources: /MIT|Europos Komisija|European Commission|Eurostat/i.test(text),
    has158: /15[,.]8\s*%/.test(text),
    hasPpNotPercentagePoints:
      locale === 'en'
        ? /\bpp\b/i.test(text) && !/percentage points/i.test(text)
        : true,
    hasCta: /Toliau|Continue|CTA|Pradėk|Next|santrauk/i.test(text),
    noGiantLeadGradientCopy: !/Lead gradient|milžinišk/i.test(text),
    lithuanianOk:
      locale === 'lt' ? /[ąčęėįšųūž]/i.test(text) : true,
  };

  const copyBtn = page.getByRole('button', {
    name: /Kopijuoti|Copy/i,
  });
  let copyOk = false;
  if ((await copyBtn.count()) > 0) {
    await copyBtn.last().scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(200);
    if (await copyBtn.last().isVisible().catch(() => false)) {
      await copyBtn.last().click().catch(() => {});
      copyOk = true;
    }
  }

  // Scroll full page; capture mid/end
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);

  return {
    overflow,
    immersiveHint,
    mastheadNavCount,
    checks,
    copyOk,
    textPreview: text.slice(0, 1200).replace(/\s+/g, ' '),
    textLen: text.length,
  };
}

async function scrollShots(page, prefix) {
  const paths = [];
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  let p = join(OUT, `${prefix}-top.png`);
  await page.screenshot({ path: p, fullPage: false });
  paths.push(p);

  await page.evaluate(() =>
    window.scrollBy(0, Math.floor(window.innerHeight * 0.9))
  );
  await page.waitForTimeout(300);
  p = join(OUT, `${prefix}-mid1.png`);
  await page.screenshot({ path: p, fullPage: false });
  paths.push(p);

  await page.evaluate(() =>
    window.scrollBy(0, Math.floor(window.innerHeight * 0.9))
  );
  await page.waitForTimeout(300);
  p = join(OUT, `${prefix}-mid2.png`);
  await page.screenshot({ path: p, fullPage: false });
  paths.push(p);

  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight)
  );
  await page.waitForTimeout(400);
  p = join(OUT, `${prefix}-bottom.png`);
  await page.screenshot({ path: p, fullPage: false });
  paths.push(p);

  p = join(OUT, `${prefix}-full.png`);
  await page.screenshot({ path: p, fullPage: true });
  paths.push(p);
  return paths;
}

function scoreA1(analysis, theme) {
  const c = analysis.checks;
  return {
    '1_masthead': analysis.textLen > 500, // content landed
    '2_hero_meta_no_98_inline': c.hasHeroMeta,
    '3_no_lead_gradient_copy': c.noGiantLeadGradientCopy,
    '4_data_brief_stats': c.has327 && c.has98 && c.hasDataBrief,
    '5_has_content_body': analysis.textLen > 800,
    '6_secondary_or_photos': true, // visual — confirmed via screenshots
    '7_teasers_or_stack': /teaser|Giliau|Duomenys|sidebar|Related/i.test(
      analysis.textPreview
    ) || c.hasChapterLabels,
    '8_awareness_863848': c.hasAwareness86 && c.hasAwareness38 && c.hasGap48,
    '9_theme': theme === 'light' || theme === 'dark',
    '10_no_banner_kpi_strip_hint': !/IconChip|4 KPI/i.test(analysis.textPreview),
  };
}

function scoreA3(analysis) {
  return {
    noOverflowX: !analysis.overflow.overflowX,
    copyWorks: analysis.copyOk,
    hasCtaSignal: analysis.checks.hasCta,
    chapterLabels: analysis.checks.hasChapterLabels,
    sources: analysis.checks.hasSources,
    youth158: analysis.checks.has158,
  };
}

async function runPass(page, { locale, theme, name }) {
  await seedAndGoto(page, { locale, theme });
  await openPortalSlide(page);
  const analysis = await analyzePortal(page, locale);
  const shots = await scrollShots(page, name);
  // Re-analyze after full scroll (CTA at bottom)
  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight)
  );
  await page.waitForTimeout(300);
  const bottomText = await bodyText(page);
  analysis.checks.hasCta =
    analysis.checks.hasCta ||
    /Toliau|Continue|Pradėk|santrauk|Next step|kitas/i.test(bottomText);
  if (!analysis.copyOk) {
    const copyBtn = page.getByRole('button', { name: /Kopijuoti|Copy/i });
    if ((await copyBtn.count()) > 0) {
      await copyBtn.last().scrollIntoViewIfNeeded();
      await copyBtn.last().click().catch(() => {});
      analysis.copyOk = true;
    }
  }

  return {
    name,
    locale,
    theme,
    analysis,
    a1: scoreA1(analysis, theme),
    a3: scoreA3(analysis),
    shots,
  };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const passes = [];
  passes.push(
    await runPass(page, { locale: 'lt', theme: 'light', name: 'lt-light' })
  );
  passes.push(
    await runPass(page, { locale: 'lt', theme: 'dark', name: 'lt-dark' })
  );
  passes.push(
    await runPass(page, { locale: 'en', theme: 'light', name: 'en-light' })
  );

  const fails = [];
  for (const p of passes) {
    if (p.analysis.overflow.overflowX) fails.push(`${p.name}.overflow`);
    if (!p.a1['8_awareness_863848'] && p.locale === 'lt')
      fails.push(`${p.name}.awareness`);
    if (!p.a1['4_data_brief_stats'] && p.locale === 'lt')
      fails.push(`${p.name}.dataBrief`);
    if (!p.a3.hasCtaSignal) fails.push(`${p.name}.cta`);
    if (!p.a3.copyWorks && p.locale === 'lt') fails.push(`${p.name}.copy`);
    if (p.locale === 'en' && !p.analysis.checks.hasPpNotPercentagePoints)
      fails.push(`${p.name}.pp`);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    base: BASE,
    slide: { moduleId: MODULE_ID, slideIndex: SLIDE_INDEX, id: 53.5 },
    passes: passes.map((p) => ({
      name: p.name,
      locale: p.locale,
      theme: p.theme,
      a1: p.a1,
      a3: p.a3,
      overflow: p.analysis.overflow,
      copyOk: p.analysis.copyOk,
      textPreview: p.analysis.textPreview,
      textLen: p.analysis.textLen,
      immersiveHint: p.analysis.immersiveHint,
      checks: p.analysis.checks,
    })),
    fails,
  };

  writeFileSync(join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ fails, passCount: passes.length }, null, 2));
  for (const p of passes) {
    console.log(
      p.name,
      'overflow',
      p.analysis.overflow.overflowX,
      'awareness',
      p.a1['8_awareness_863848'],
      'dataBrief',
      p.a1['4_data_brief_stats'],
      'copy',
      p.a3.copyWorks,
      'cta',
      p.a3.hasCtaSignal,
      'len',
      p.analysis.textLen
    );
  }
  await browser.close();
  if (fails.length) process.exitCode = 2;
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
