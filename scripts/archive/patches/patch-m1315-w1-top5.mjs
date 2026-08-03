#!/usr/bin/env node
/**
 * M1315-W1: Top-5 density/cycle batch (13.35, 13.34, 13.101, 13.33, 13.5) LT+EN.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const ltPath = join(root, 'src', 'data', 'modules.json');
const enPath = join(root, 'src', 'data', 'modules-en-m13-m15.json');

const lt = JSON.parse(readFileSync(ltPath, 'utf8'));
const en = JSON.parse(readFileSync(enPath, 'utf8'));

function slide(data, id) {
  return data.modules.find((m) => m.id === 13).slides.find((s) => String(s.id) === String(id));
}

function ensurePatikra(sections, body, { en = false } = {}) {
  const idx = sections.findIndex((s) => /^(Patikra|Check)$/i.test(s.heading || ''));
  const block = {
    heading: en ? 'Check' : 'Patikra',
    body,
    blockVariant: 'accent',
  };
  if (idx >= 0) {
    sections[idx] = { ...sections[idx], ...block };
  } else {
    sections.push(block);
  }
}

// --- 13.35 LT: Trumpai + collapse #1000Books ---
{
  const s = slide(lt, '13.35');
  const secs = s.content.sections;
  // Rename how-to → Trumpai (accent)
  secs[0] = {
    heading: 'Trumpai',
    body: 'Optional biblioteka: jei užtenka vieno sprendimo – rinkis MASTER šabloną arba vieną ready promptą. Workflow ir 8 scenarijai – gilinimuisi (išskleisk).',
    blockVariant: 'accent',
  };
  // Collapse #1000Books
  const books = secs.find((x) => x.heading?.includes('1000Books'));
  if (books) {
    books.collapsible = true;
    books.collapsedByDefault = true;
    books.blockVariant = 'terms';
  }
  // Collapse ready prompts cluster? keep visible for micro-win – OK
  ensurePatikra(secs, secs.find((x) => x.heading === 'Patikra')?.body);
}

// --- 13.35 EN ---
{
  const s = slide(en, '13.35');
  if (!s.content) s.content = {};
  if (!Array.isArray(s.content.sections)) s.content.sections = [];
  const ltSecs = slide(lt, '13.35').content.sections;
  // Rebuild EN sections aligned to LT headings with real copy where stubs were broken
  s.content.sections = [
    {
      heading: 'In short',
      body: 'Optional library: if you need one decision – pick the MASTER template or one ready prompt. Workflow and 8 scenarios are for going deeper (expand).',
      blockVariant: 'accent',
    },
    {
      heading: 'AI image workflow (5 steps)',
      body: ltSecs[1]?.body
        ? '(1) Concept – goal, context, style, mood, audience. (2) Prompt – subjects, style, composition, lighting, palette. (3) Optimise – priority order and negatives. (4) Generate 3–5 variants. (5) Select + iterate. Expand for the full checklist.'
        : '',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: '#1000Books – book illustrations',
      body: 'Sequence: book title + summary → artist role: 5 concepts → pick best → prompt-engineer role: text-to-image prompt → paste into Ideogram/Leonardo. Add: empty space for title, consistent palette, no random text.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'MASTER prompt template',
      body: 'Universal template – fill the fields; copy the whole block with one click.',
      copyable:
        s.content.sections.find((x) => /MASTER/i.test(x.heading || ''))?.copyable ||
        ltSecs.find((x) => x.heading?.includes('MASTER'))?.copyable,
    },
    {
      heading: 'Ready prompt: Logo',
      body: 'For a logo – copy and fill the brackets.',
      copyable: ltSecs.find((x) => x.heading?.includes('Logotipas'))?.copyable,
    },
    {
      heading: 'Ready prompt: Social post',
      body: 'For a social post – template with a text field.',
      copyable: ltSecs.find((x) => x.heading?.includes('Social'))?.copyable,
    },
    {
      heading: 'Ready prompt: Poster',
      body: 'For an event poster – add date, place and style.',
      copyable: ltSecs.find((x) => x.heading?.includes('Plakatas'))?.copyable,
    },
    {
      heading: 'All 8 business scenarios',
      body: 'Product mock, campaign directions, LinkedIn cover, presentation hero, packaging concept, storefront, FAQ card, newsletter header – expand and reuse as ready prompts.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Check',
      body: 'Are you using at least 3 MASTER fields (subject, style, composition, lighting, colours)? Did you pick a ready prompt that matches the scenario?',
      blockVariant: 'accent',
    },
  ];
  // EN copyables set in patch-m1315-w1-en-copyables.mjs (no LT diacritics)
}

// --- 13.34 LT: Patikra ---
{
  const s = slide(lt, '13.34');
  s.content.sections[1].body =
    'Atlik 5 situacijų pratimą žemiau (2–3 min). Kiekvienai situacijai pasirink, kurį prompto lauką taisyti.';
  ensurePatikra(
    s.content.sections,
    'Ar po 5 situacijų greitai atskiri stilių, proporcijas, kompoziciją ir prekės ženklo pastovumą? Jei ne – pakartok 1–2 klaidingas.'
  );
}

// --- 13.34 EN ---
{
  const s = slide(en, '13.34');
  s.content.sections = [
    {
      heading: 'In short',
      body: 'This slide helps you quickly spot which prompt field to fix: style, aspect ratio, composition or brand consistency.',
      blockVariant: 'accent',
    },
    {
      heading: 'Do this now',
      body: 'Complete the 5-situation exercise below (2–3 min). For each situation, pick which prompt field to fix.',
      blockVariant: 'brand',
    },
    {
      heading: 'Check',
      body: 'After the 5 situations, can you quickly tell style vs ratio vs composition vs brand consistency? If not – retry 1–2 you missed.',
      blockVariant: 'accent',
    },
  ];
  // keep recognitionExercise from merge (LT has it; ensure EN has overlay if present)
  if (!s.content.recognitionExercise && slide(lt, '13.34').content.recognitionExercise) {
    // leave LT-only exercise structure; EN runtime merges – add EN exercise labels
    const ex = structuredClone(slide(lt, '13.34').content.recognitionExercise);
    ex.title = 'Spot style and proportions';
    ex.task = 'Read 5 situations and pick the best answer for each.';
    ex.examples = [
      'You need a square LinkedIn post with a product photo.',
      'The same product should look like a premium catalogue shot.',
      'The hero image needs space for a headline on the left.',
      'All campaign images must use the same colours and tone.',
      'Stories format needs a vertical frame.',
    ];
    ex.choices = [
      'Aspect ratio: 1:1',
      'Style',
      'Composition',
      'Brand consistency',
      'Aspect ratio: 9:16',
    ];
    ex.explanations = [
      'A square social format fits 1:1.',
      'A premium catalogue look is driven by style: light, texture, realism and tone.',
      'Headline space is a composition choice – where you leave room in the frame.',
      'Repeating colours and tone across images protects brand consistency.',
      'Stories/Reels-style mobile formats usually use vertical 9:16.',
    ];
    ex.goal = 'Before you open a generator, you will know which prompt field to fix.';
    s.content.recognitionExercise = ex;
  }
}

// --- 13.101 LT: Patikra + collapse Top 3 ---
{
  const s = slide(lt, '13.101');
  const secs = s.content.sections;
  const top = secs.find((x) => /pitfalls|vengti/i.test(x.heading || ''));
  if (top) {
    top.collapsible = true;
    top.collapsedByDefault = true;
    top.blockVariant = 'terms';
  }
  ensurePatikra(
    secs,
    'Ar prieš publikaciją patikrinai teises, disclosure/C2PA ir bent vieną A/B hipotezę? Jei ne – grįžk į privalomą bloką ir checklist.'
  );
}

// --- 13.101 EN ---
{
  const s = slide(en, '13.101');
  const secs = s.content.sections;
  const top = secs.find((x) => /pitfalls/i.test(x.heading || ''));
  if (top) {
    top.collapsible = true;
    top.collapsedByDefault = true;
    top.blockVariant = 'terms';
  }
  // Fix stub evaluation rubric if needed
  const rub = secs.find((x) => /Evaluation rubric|Vertinimo/i.test(x.heading || ''));
  if (rub && /measure results, test variants/.test(rub.body || '')) {
    rub.body =
      'Before publishing, score the result on 3 criteria: brand fit, message clarity, platform fit. Simple generator + evaluator loop.';
  }
  ensurePatikra(
    secs,
    'Before publishing, did you check rights, disclosure/C2PA and at least one A/B hypothesis? If not – reopen the required block and checklist.',
    { en: true }
  );
}

// --- 13.33 LT: collapse theory; add Patikra ---
{
  const s = slide(lt, '13.33');
  const secs = s.content.sections;
  for (const h of ['Trečdalių taisyklė ir planai', 'Kameros kampas ir kadro tipai']) {
    const sec = secs.find((x) => x.heading === h);
    if (sec) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
      sec.blockVariant = 'terms';
    }
  }
  // Trim Trumpai
  secs[0].body =
    'Kompozicija ir kadras: kur dėti objektą, kokį planą ir kameros kampą nurodyti prompte. Tinklelis – gairė; detalės – išskleidžiamos.';
  ensurePatikra(
    secs,
    'Ar prompte yra bent kompozicija (trečdaliai / erdvė tekstui) ir vienas kameros kampas? Jei ne – nukopijuok šabloną dar kartą.'
  );
}

// --- 13.33 EN ---
{
  const s = slide(en, '13.33');
  const ltSecs = slide(lt, '13.33').content.sections;
  s.content.sections = [
    {
      heading: 'In short',
      body: 'Composition and framing: where to place the subject, which plane and camera angle to name in the prompt. The grid is a guide; details are expandable.',
      blockVariant: 'accent',
    },
    {
      heading: 'Rule-of-thirds grid',
      body: 'Imagine a 3×3 grid – put focus near the intersections, not the centre.',
      blockVariant: 'brand',
      image: ltSecs.find((x) => x.image)?.image || s.content.sections?.find((x) => x.image)?.image,
      imageAlt: 'Rule of thirds grid',
    },
    {
      heading: 'Rule of thirds and planes',
      body: 'Main subject on intersection points. Foreground = sharper subject; background = depth. Prompt tip: “rule of thirds, subject on left third, soft background”.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Camera angle and shot types',
      body: 'Eye level – neutral; high angle – weaker; low angle – power; bird’s-eye – structure. Shot types: wide / medium / close-up – name one in the prompt.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
    },
    {
      heading: 'Do this now',
      body: 'Copy the template below and fill composition + framing.',
      blockVariant: 'brand',
    },
    {
      heading: 'Copyable template: composition and framing',
      body: 'Template with composition and camera angle.',
      copyable: ltSecs.find((x) => x.copyable)?.copyable,
    },
    {
      heading: 'Narrative image (optional)',
      body: 'An image can tell a story – “what happened here?”. Expand for a narrative template.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
      copyable: ltSecs.find((x) => /Naratyvinis|Narrative/i.test(x.heading || ''))?.copyable,
    },
    {
      heading: 'Camera language in the prompt (optional)',
      body: 'For a more cinematic result, add 1–2 camera details: 85mm, f/1.8, soft studio light, cinematic colour grade.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: true,
      copyable: ltSecs.find((x) => /Kamera prompte|Camera language/i.test(x.heading || ''))?.copyable,
    },
    {
      heading: 'Check',
      body: 'Does the prompt include at least composition (thirds / text space) and one camera angle? If not – copy the template again.',
      blockVariant: 'accent',
    },
  ];
  // preserve image from LT on grid section
  const ltGrid = ltSecs.find((x) => x.heading?.includes('tinklelis') || x.image);
  if (ltGrid?.image) {
    s.content.sections[1].image = ltGrid.image;
    s.content.sections[1].imageAlt = ltGrid.imageAlt || s.content.sections[1].imageAlt;
  }
  // EN copyables set in patch-m1315-w1-en-copyables.mjs
}

// --- 13.5 LT: Trumpai heading ---
{
  const s = slide(lt, '13.5');
  s.content.sections[0] = {
    heading: 'Trumpai',
    body: 'Video: formatas (16:9 / 9:16), trukmė 3–5 s, matuok CPI (kaina už tinkamą klipą) = generavimo + retry / tinkami klipai – ne tik €/s. Matrica – greitam pasirinkimui.',
    blockVariant: 'accent',
  };
  // Collapse matrix? keep brand visible as primary – OK; collapse "Visi video" already
}

// --- 13.5 EN ---
{
  const s = slide(en, '13.5');
  s.content.sections[0] = {
    heading: 'In short',
    body: 'Video: format (16:9 / 9:16), duration 3–5 s, track CPI (cost per usable clip) = generation + retries / usable clips – not just €/second. Use the matrix for a fast pick.',
    blockVariant: 'accent',
  };
  // scrub "module 13" in tools overview if present
  const all = s.content.sections.find((x) => /All video tools/i.test(x.heading || ''));
  if (all) {
    all.body =
      'Seedance, Kling 3, Veo 3.1, Sora 2, Runway, Pika, Luma Dream Machine, Synthesia, InVideo. Full list – Tools section.';
  }
}

writeFileSync(ltPath, JSON.stringify(lt, null, 2) + '\n', 'utf8');
writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('M1315-W1 Top-5 patched');
