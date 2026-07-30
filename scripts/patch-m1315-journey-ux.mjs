/**
 * M1315-J1/J2/J4/J5 – journey UX JSON patches (LT modules.json + EN overlay).
 * - 13.1 Patikra (+ Daryk)
 * - 13.3 / 13.4 density (collapse)
 * - Insert 13.325 consistency lab + renumber M13 footers
 * - 150.26 48h transfer section
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ltPath = path.join(root, 'src/data/modules.json');
const enPath = path.join(root, 'src/data/modules-en-m13-m15.json');

function shortTitleOf(slide) {
  return (
    slide.shortTitle ||
    slide.title ||
    String(slide.id)
  ).replace(/\s+/g, ' ').trim();
}

function footerFor(nextIndex1, nextSlide, locale) {
  const st = shortTitleOf(nextSlide);
  const clipped = st.length > 40 ? `${st.slice(0, 37)}…` : st;
  if (locale === 'en') return `Next – slide ${nextIndex1}: ${clipped}`;
  return `Toliau – skaidrė ${nextIndex1}: ${clipped}`;
}

function renumberFooters(slides, locale) {
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    if (!s.content || typeof s.content !== 'object') continue;
    if (i === slides.length - 1) {
      if (s.content.footer) delete s.content.footer;
      continue;
    }
    s.content.footer = footerFor(i + 2, slides[i + 1], locale);
  }
}

function patch13_1(slide, locale) {
  const secs = slide.content.sections;
  const hasPatikra = secs.some((x) =>
    /^(Patikra|Check)$/i.test(x.heading || '')
  );
  if (hasPatikra) return;

  const daryk =
    locale === 'en'
      ? {
          heading: 'Do this now',
          body: 'Pick one campaign goal (Awareness, Engagement or Conversion) for your next visual. Write one sentence: what should the viewer feel or do?',
          blockVariant: 'brand',
        }
      : {
          heading: 'Daryk dabar',
          body: 'Pasirink vieną kampanijos tikslą (Awareness, Engagement arba Conversion) kitam vizualui. Parašyk vieną sakinį: ką žiūrovas turi pajusti arba padaryti?',
          blockVariant: 'brand',
        };

  const patikra =
    locale === 'en'
      ? {
          heading: 'Check',
          body: 'Can you name which A/E/C stage your next asset serves? If not – reopen the funnel and pick one stage before you write the prompt.',
          blockVariant: 'accent',
        }
      : {
          heading: 'Patikra',
          body: 'Ar gali įvardyti, kurį A/E/C etapą aptarnaus kitas tavo vizualas? Jei ne – grįžk prie piltuvo ir pasirink vieną etapą prieš rašydamas promptą.',
          blockVariant: 'accent',
        };

  // Insert Daryk before "Kur pritaikyti?" / "Where to use", Patikra after it (GOLDEN: Patikra late)
  const applyIdx = secs.findIndex((x) =>
    /Kur pritaikyti|Where to use/i.test(x.heading || '')
  );
  if (applyIdx >= 0) {
    secs.splice(applyIdx, 0, daryk);
    secs.splice(applyIdx + 2, 0, patikra);
  } else {
    secs.push(daryk, patikra);
  }
}

function patch13_3(slide) {
  for (const sec of slide.content.sections) {
    if (/Kuris įrankis|Which tool/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
    }
    if (/^Įrankiai$|^Tools$/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
    }
  }
}

function patch13_4(slide) {
  for (const sec of slide.content.sections) {
    if (/Kadravimas|Framing/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
    }
    if (/Image\s*→\s*video|Image → video/i.test(sec.heading || '')) {
      sec.collapsible = true;
      sec.collapsedByDefault = true;
    }
  }
}

function labSlide(locale) {
  if (locale === 'en') {
    return {
      id: 13.325,
      title: 'Lab: lock or regenerate?',
      shortTitle: 'Consistency lab',
      subtitle: 'Choose reference lock vs fresh generate – copy the rule',
      type: 'content-block',
      content: {
        sections: [
          {
            heading: 'In short',
            body: 'After reference lock theory – decide: keep the same product/character with refs, or regenerate without a lock when the brief changes. One choice → one copyable rule.',
            blockVariant: 'accent',
          },
          {
            heading: 'Decision lab',
            body: 'Pick a mode. The prompt rule below updates – copy it into your next generate.',
            blockVariant: 'brand',
            image: 'm13_consistency_lab',
            imageAlt: 'Consistency decision lab: lock vs regenerate',
          },
          {
            heading: 'Check',
            body: 'Did you choose a mode and copy the rule? If the product still “drifts” – go back to Character / product consistency and rebuild 3–5 refs.',
            blockVariant: 'accent',
          },
        ],
      },
    };
  }
  return {
    id: 13.325,
    title: 'Lab: užrakinti ar generuoti iš naujo?',
    shortTitle: 'Consistency lab',
    subtitle: 'Pasirink reference lock vs naują generavimą – nukopijuok taisyklę',
    type: 'content-block',
    content: {
      sections: [
        {
          heading: 'Trumpai',
          body: 'Po reference lock teorijos – nuspręsk: laikyti tą patį produktą/personažą su refs, ar generuoti iš naujo be lock, kai briefas keičiasi. Vienas pasirinkimas → viena kopijuojama taisyklė.',
          blockVariant: 'accent',
        },
        {
          heading: 'Sprendimo lab',
          body: 'Pasirink režimą. Žemiau atsinaujina prompto taisyklė – nukopijuok ją į kitą generavimą.',
          blockVariant: 'brand',
          image: 'm13_consistency_lab',
          imageAlt: 'Consistency sprendimo lab: lock vs regenerate',
        },
        {
          heading: 'Patikra',
          body: 'Ar pasirinkai režimą ir nukopijavai taisyklę? Jei produktas vis dar „plaukioja“ – grįžk į Character / product consistency ir surink 3–5 refs.',
          blockVariant: 'accent',
        },
      ],
    },
  };
}

function ensureLab(slides, locale) {
  if (slides.some((s) => s.id === 13.325)) return;
  const idx = slides.findIndex((s) => s.id === 13.32);
  if (idx < 0) throw new Error('13.32 not found');
  slides.splice(idx + 1, 0, labSlide(locale));
}

function patch150_26(slide, locale) {
  const secs = slide.content.sections || [];
  const has48 = secs.some((x) =>
    /48\s*h|48 val|per 48/i.test(`${x.heading || ''} ${x.body || ''}`)
  );
  if (has48) return;
  secs.push(
    locale === 'en'
      ? {
          heading: 'First action in 48 hours',
          body: 'Publish or send one hero (or one 3–5 s clip) with the prompt you used. Note what drifted – that is your next consistency lock task.',
          blockVariant: 'brand',
        }
      : {
          heading: 'Pirmas veiksmas per 48 val.',
          body: 'Publikuok arba išsiųsk vieną hero (arba vieną 3–5 s klipą) su naudotu promptu. Užsirašyk, kas „išsikraipė“ – tai kitas consistency lock darbas.',
          blockVariant: 'brand',
        }
  );
}

function patchModuleBundle(data, locale) {
  const modules = data.modules || data;
  const m13 = modules.find((x) => x.id === 13);
  if (!m13) throw new Error('M13 missing');
  const s11 = m13.slides.find((s) => s.id === 13.1);
  const s33 = m13.slides.find((s) => s.id === 13.3);
  const s44 = m13.slides.find((s) => s.id === 13.4);
  if (!s11 || !s33 || !s44) throw new Error('target slides missing');
  patch13_1(s11, locale);
  patch13_3(s33);
  patch13_4(s44);
  ensureLab(m13.slides, locale);
  renumberFooters(m13.slides, locale);

  const m15 = modules.find((x) => x.id === 15);
  if (m15) {
    const ps = m15.slides.find((s) => s.id === 150.26);
    if (ps) patch150_26(ps, locale);
  }
}

const lt = JSON.parse(fs.readFileSync(ltPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
patchModuleBundle(lt, 'lt');
patchModuleBundle(en, 'en');
fs.writeFileSync(ltPath, `${JSON.stringify(lt, null, 2)}\n`, 'utf8');
fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`, 'utf8');
console.log('OK: patched LT + EN (13.1, 13.3, 13.4, 13.325, 150.26, M13 footers)');
