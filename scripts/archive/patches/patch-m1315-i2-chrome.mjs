#!/usr/bin/env node
/**
 * M1315-1: scrub curriculum IDs from learner-facing M13–15 copy (LT + EN).
 * relatedSlideId / nav fields untouched.
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

function findSlide(data, modId, slideId) {
  const mod = data.modules.find((m) => m.id === modId);
  return mod?.slides.find((s) => String(s.id) === String(slideId));
}

let n = 0;
function setPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const idx = /^\d+$/.test(p) ? Number(p) : p;
    cur = cur[idx];
  }
  const last = parts[parts.length - 1];
  const lidx = /^\d+$/.test(last) ? Number(last) : last;
  if (cur[lidx] !== value) {
    cur[lidx] = value;
    n++;
  }
}

// --- LT ---
{
  const s = findSlide(lt, 13, '13.31');
  setPath(
    s,
    'content.questions.0.explanation',
    'Kvadratiniam socialinio įrašo vaizdui svarbiausia nurodyti proporcijas 1:1. Jei klydai – grįžk į „Stilius ir proporcijos“ ir perrašyk promptą su aiškiu formatu.'
  );
}
{
  const s = findSlide(lt, 13, '13.37');
  setPath(
    s,
    'content.tldr',
    'Trumpai: Užpildyk laukus žemiau – sistema sudės vaizdo promptą. Tai patogu po neprivalomos skaidrės „Darbo eiga ir MASTER šablonai“, kur laukus pildai ranka. Nukopijuok rezultatą į bet kurį vaizdų generavimo įrankį.'
  );
}
{
  const s = findSlide(lt, 13, '13.4');
  setPath(
    s,
    'content.sections.0.body',
    'Trumpas vaizdo įrašas: aiškus scenarijus, tonas, kamera. Geriau 2–4 trumpi klipai (3–5 s) nei vienas 20–30 s one-shot. Storyboard stills užrakink prieš brangų video generavimą (žr. „Generatyvinės medijos grandinė“).'
  );
  setPath(
    s,
    'content.sections.6.body',
    'Ar video pradžia panaši į hero? Ar produktas/personažas neišsikraipė? Jei ne – supaprastink sceną arba stiprink reference („Character / product consistency“).'
  );
  setPath(
    s,
    'content.sections.7.body',
    'Tas pats reference + „same product / same style“. Venk realių veidų/balsų be sutikimo (žr. „Verslas ir rizikos“).'
  );
}
{
  const s = findSlide(lt, 13, '13.51');
  setPath(
    s,
    'content.questions.0.explanation',
    'Trumpam video reikia aiškios scenos, trukmės, formato ir tono. Jei klydai – grįžk į „Trumpas vaizdo scenarijus“ ir sutrumpink scenarijų iki vienos aiškios scenos.'
  );
}
{
  const s = findSlide(lt, 13, '13.7');
  setPath(
    s,
    'content.sections.0.body',
    'Atskirk SFX nuo muzikos. Komerciniam darbui – licensed įrankiai. Orientyras loudness: ~−14 LUFS (muzika) / ~−16 (VO mix) – galutinį sprendimą priimk klausydamas. Kampanijos Legal / C2PA – skaidrėje „Verslas ir rizikos“.'
  );
}
{
  const s = findSlide(lt, 13, '13.11');
  setPath(
    s,
    'content.sections.1.body',
    'Pilnas verslo ciklas: (1) Marketing brief. (2) Prompt + brand + reference lock. (3) 3–5 variantų / trumpi I2V. (4) Iteracija (CPI video). (5) Adaptacija platformoms. (6) A/B. (7) Optimizacija + disclosure. Techninę medijos grandinę žr. MUST skaidrę „Generatyvinės medijos grandinė“; optional MASTER – „Darbo eiga ir MASTER šablonai“. Komandoje lygiagrečiai tik po bendro brief, brand ir (jei reikia) VO trukmės.'
  );
}
{
  const s = findSlide(lt, 15, '150.25');
  setPath(
    s,
    'content.sections.1.body',
    'Įvardyk kelią: greitą (tik hero vaizdas) ar pilną (video → garsas → montažas). Užsirašyk pirmą artefaktą vienu sakiniu.'
  );
  setPath(
    s,
    'content.sections.2.body',
    'Ar aiškus pirmas artefaktas (hero vaizdas + promptas + brief)? Ar žinai kitą žingsnį – santrauka (greitas) ar „Scenarijus: Vaizdas“ (pilnas)?'
  );
}
{
  const s = findSlide(lt, 15, '150.26');
  setPath(
    s,
    'content.body',
    'Prieš tęsiant pasitikrink kelią. Jei hero vaizdas atliktas ir renkiesi greitą kelią – eik į santrauką. Jei nori mini kampanijos – tęsk į optional scenarijus (vaizdas → video → garsas → montažas).'
  );
  setPath(
    s,
    'content.sections.0.body',
    'Vienas **hero vaizdas** su naudotu promptu ir 2 eilučių brief („Greitas startas: hero vaizdas“). To pakanka M15 užbaigti – tada **eik į santrauką**.'
  );
  setPath(
    s,
    'content.sections.1.body',
    'Hero → **video** (3–5 s) → **garsas** (VO/bed) → **montažas** → QA. Mini kampanijos paketas (optional scenarijus).'
  );
  setPath(
    s,
    'content.sections.2.body',
    'Kurį kelią renkiesi – greitą (santrauka) ar pilną (scenarijus: vaizdas)? Koks tavo pirmas artefaktas?'
  );
}
{
  const s = findSlide(lt, 15, '151');
  setPath(
    s,
    'content.scenarioDescription',
    'Optional. Jei jau turi hero vaizdą iš greito starto – gali skip ir eiti į santrauką, arba naudoti jį kaip keyframe. Kitaip sukurk hero vaizdą savo temai. Artefaktas: vaizdas + promptas.'
  );
  setPath(
    s,
    'content.scenario.narrativeLead',
    'Jei greitas startas jau atliktas – gali skip arba naudoti tą patį hero kaip keyframe kitam žingsniui (trumpas vaizdo įrašas). Šis vaizdas bus pradžios kadras video generavimui.'
  );
  setPath(
    s,
    'content.instructions.steps.0.description',
    'Jei greitas kelias baigtas – eik į santrauką. Kitaip: vaizdas + promptas → trumpas vaizdo įrašas.'
  );
}
{
  const s = findSlide(lt, 15, '152');
  setPath(
    s,
    'content.scenarioDescription',
    'Optional: naudok hero vaizdą (iš greito starto arba ankstesnio scenarijaus) kaip keyframe ir sugeneruok 3–5 s klipą (arba 2 klipus). Artefaktas: vaizdo įrašas / nuoroda + promptas + CPI pastaba.'
  );
}
{
  const s = findSlide(lt, 15, '158');
  const items = s.content.sections[2].items;
  if (items[1] && String(items[1]).includes('154')) {
    items[1] = 'Optional montažas 15–30 s';
    n++;
  }
}

// Ensure shortTitles where missing (chrome)
{
  const s = findSlide(lt, 13, '13.11');
  if (!s.shortTitle) {
    s.shortTitle = 'Darbo eiga: brief–publikacija';
    n++;
  }
}
{
  const s = findSlide(lt, 13, '13.37');
  if (!s.shortTitle) {
    s.shortTitle = 'Vaizdo generatorius';
    n++;
  }
}

// --- EN ---
{
  const s = findSlide(en, 13, '13.31');
  if (s?.content?.questions?.[0]?.explanation?.includes('13.3')) {
    setPath(
      s,
      'content.questions.0.explanation',
      'For a square social post, the key is stating 1:1 aspect ratio. If you missed it – go back to “Style and proportions” and rewrite the prompt with a clear format.'
    );
  }
}
{
  const s = findSlide(en, 13, '13.37');
  setPath(
    s,
    'content.tldr',
    'In short: Fill in the fields below – the system builds the image prompt. Handy after the optional “Workflow and MASTER templates” slide, where you fill fields by hand. Copy and paste into any image generation tool.'
  );
}
{
  const s = findSlide(en, 13, '13.4');
  setPath(
    s,
    'content.sections.0.body',
    'Short video: clear script, tone, camera. Better 2–4 short clips (3–5 s) than one 20–30 s one-shot. Lock storyboard stills before expensive video generation (see “Generative media chain”).'
  );
  setPath(
    s,
    'content.sections.6.body',
    'Does the video start look like the hero? Did product/character drift? If not – simplify the scene or strengthen reference (“Character / product consistency”).'
  );
  setPath(
    s,
    'content.sections.7.body',
    'Same reference + “same product / same style”. Avoid real faces/voices without consent (see “Business and risks”).'
  );
}
{
  const s = findSlide(en, 13, '13.51');
  if (s?.content?.questions?.[0]?.explanation?.includes('13.4')) {
    setPath(
      s,
      'content.questions.0.explanation',
      'A short video needs a clear scene, duration, format and tone. If you missed it – go back to “Short video script” and trim the script to one clear scene.'
    );
  }
}
{
  const s = findSlide(en, 13, '13.7');
  setPath(
    s,
    'content.sections.0.body',
    'Separate SFX from music. For commercial work – licensed tools. Loudness guide: ~−14 LUFS (music) / ~−16 (VO mix) – final call by ear. Campaign legal / C2PA – see “Business and risks”.'
  );
}
{
  const s = findSlide(en, 13, '13.11');
  setPath(
    s,
    'content.sections.1.body',
    'Full business cycle: (1) Marketing brief. (2) Prompt + brand + reference lock. (3) 3–5 variants / short I2V. (4) Iteration (CPI video). (5) Platform adaptation. (6) A/B. (7) Optimisation + disclosure. For the technical media chain see MUST slide “Generative media chain”; optional MASTER – “Workflow and MASTER templates”. Parallel team work only after shared brief, brand and (if needed) VO duration.'
  );
  if (!s.shortTitle) {
    s.shortTitle = 'Workflow: brief to publish';
    n++;
  }
}
{
  const s = findSlide(en, 13, '13.37');
  if (!s.shortTitle) {
    s.shortTitle = 'Image generator';
    n++;
  }
}
{
  const s = findSlide(en, 15, '150.25');
  setPath(
    s,
    'content.sections.1.body',
    'Name your path: quick (hero image only) or full (video → audio → edit). Write your first artefact in one sentence.'
  );
  setPath(
    s,
    'content.sections.2.body',
    'Is the first artefact clear (hero image + prompt + brief)? Do you know the next step – summary (quick) or “Scenario: Image” (full)?'
  );
}
{
  const s = findSlide(en, 15, '150.26');
  setPath(
    s,
    'content.body',
    'Before continuing, confirm your path. If the hero image is done and you choose the quick path – go to the summary. If you want a mini campaign – continue with the optional scenarios (image → video → audio → edit).'
  );
  setPath(
    s,
    'content.sections.0.body',
    'One **hero image** with the prompt you used and a 2-line brief (“Quick start: hero image”). That is enough to complete M15 – then **go to the summary**.'
  );
  setPath(
    s,
    'content.sections.1.body',
    'Hero → **video** (3–5 s) → **audio** (VO/bed) → **edit** → QA. Mini campaign pack (optional scenarios).'
  );
  setPath(
    s,
    'content.sections.2.body',
    'Which path are you choosing – quick (summary) or full (scenario: image)? What is your first artefact?'
  );
}
{
  const s = findSlide(en, 15, '151');
  setPath(
    s,
    'content.scenarioDescription',
    'Optional. If you already have the quick-start hero image – you can skip to the summary, or reuse it as a keyframe. Otherwise create a hero image for your topic. Artefact: image + prompt.'
  );
  setPath(
    s,
    'content.scenario.narrativeLead',
    'If quick start is done – skip or reuse that hero as the keyframe for the short video step. This image will be the start frame for video generation.'
  );
  if (s?.content?.instructions?.steps?.[0]) {
    setPath(
      s,
      'content.instructions.steps.0.description',
      'If the quick path is done – go to the summary. Otherwise: image + prompt → short video.'
    );
  }
}
{
  const s = findSlide(en, 15, '152');
  setPath(
    s,
    'content.scenarioDescription',
    'Optional: use the hero image (from quick start or the previous scenario) as a keyframe and generate a 3–5 s clip (or 2 clips). Artefact: video / link + prompt + CPI note.'
  );
}
{
  const s = findSlide(en, 15, '158');
  const items = s?.content?.sections?.[2]?.items;
  if (items?.[1] && String(items[1]).includes('154')) {
    items[1] = 'Optional edit 15–30 s';
    n++;
  }
}
{
  const s = findSlide(en, 14, '142');
  // passedMessage may mention prepare 150.5
  const pm = s?.content?.useCaseBlock?.body || s?.content?.passedMessage;
  if (typeof s?.content?.useCaseBlock?.body === 'string' && s.content.useCaseBlock.body.includes('150.5')) {
    setPath(
      s,
      'content.useCaseBlock.body',
      'Prepare at least a hero image (quick start); if you want – a mini campaign: video, audio and edit. Tools – Tools section.'
    );
  } else if (typeof pm === 'string' && pm.includes('150.5')) {
    // scan nested
  }
}

// Fix EN 142 useCaseBlock if present elsewhere
{
  const s = findSlide(en, 14, '142');
  const walk = (o, path = []) => {
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'string' && /150\.5|151–154|151-154/.test(v)) {
        o[k] = v
          .replace(/150\.5/g, 'quick-start hero')
          .replace(/151–154|151-154/g, 'optional mini-campaign steps');
        n++;
      } else if (typeof v === 'object') walk(v, [...path, k]);
    }
  };
  if (s?.content) walk(s.content);
}

writeFileSync(ltPath, JSON.stringify(lt, null, 2) + '\n', 'utf8');
writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('Chrome scrub patches applied:', n);
