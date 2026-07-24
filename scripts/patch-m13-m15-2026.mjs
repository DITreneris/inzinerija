/**
 * One-shot patch: M13–15 2026 curriculum refresh into modules.json
 * Run: node scripts/patch-m13-m15-2026.mjs
 *
 * STALE / APPLIED (2026-07): do not re-run. Live SOT already has diagram image keys
 * (`m13_media_pipeline`, `m13_consistency_lock`, `m13_postprod_steps`) hand-wired after
 * this patch; re-inserting slides from this script would drop those `image` fields.
 * Historical note: docs/development/M79_PATCH_REGISTRY.md §5a.
 */
import fs from 'fs';

const path = 'src/data/modules.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const m13 = data.modules.find((m) => m.id === 13);
const m14 = data.modules.find((m) => m.id === 14);
const m15 = data.modules.find((m) => m.id === 15);
if (!m13 || !m14 || !m15) throw new Error('M13/M14/M15 not found');

const slide = (id) => m13.slides.find((s) => s.id === id);
const insertAfter = (afterId, newSlide) => {
  if (m13.slides.some((s) => s.id === newSlide.id)) return;
  const i = m13.slides.findIndex((s) => s.id === afterId);
  if (i < 0) throw new Error(`insertAfter: ${afterId} not found`);
  m13.slides.splice(i + 1, 0, newSlide);
};

// --- Module meta ---
m13.subtitle = 'Vaizdai, video, garsas – pipeline ir promptai';
m13.description = 'Turinio inžinerija: pipeline, vaizdai, video, garsas su DI – consistency ir provenance.';

const s130 = slide(130);
s130.subtitle = 'Vaizdai, video, garsas';
s130.content.whyBenefit =
  'Po šio modulio mokėsi kurti vaizdus, trumpus vaizdo įrašus ir garsą su DI – nuo pipeline ir promptų iki consistency, įrankių ir kokybės patikros.';
s130.content.heroText = 'Vaizdai, video, garsas.';
s130.content.outcomes = [
  'Pipeline: brief → stills → refs → I2V → garsas → montažas → QA',
  'Praktika: consistency, audio-first, kopijuojami šablonai',
  'Verslas: KPI, rizikos, C2PA/disclosure, kelias nuo brief iki publikacijos',
];
s130.content.footer = 'Toliau – skaidrė 2: Turinio inžinerijos kelias';

slide(13.1).content.footer = 'Toliau – skaidrė 3: Generatyvinės medijos pipeline';

// --- 13.12 Pipeline ---
insertAfter(13.1, {
  id: 13.12,
  title: 'Generatyvinės medijos pipeline',
  shortTitle: 'Medijos pipeline',
  subtitle: 'Brief → stills → refs → I2V → garsas → edit → QA',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: '2026 praktikoje laimi ne „geriausias modelis“, o grandinė. Vienas promptas į video generatorių = brangūs retry. Pipeline: brief + brand → stills/storyboard → reference lock → trumpi 3–5 s I2V klipai → garsas (audio-first) → montažas → QA ir provenance.',
        blockVariant: 'accent',
      },
      {
        heading: '4 žingsniai (+ QA)',
        body: '(1) Brief + brand lock. (2) Stills / storyboard – užrakink kadrus prieš mokėdamas už video. (3) Reference lock + 3–5 s I2V. (4) Garsas + montažas. (5) QA: brand, žinutė, teisės, disclosure.',
        blockVariant: 'brand',
      },
      {
        heading: 'Daryk dabar',
        body: 'Užpildyk checklistą savo temai – tai planas, ne generatoriaus promptas.',
        blockVariant: 'brand',
      },
      {
        heading: 'Kopijuojamas šablonas',
        body: 'Pipeline checklist – nukopijuok ir užpildyk.',
        copyable:
          'Pipeline checklist:\nBrief: tikslas [Awareness/Engagement/Conversion], auditorija [kam], platforma [kur].\nBrand: spalvos [X], tonas [Y].\nStills: hero + [0–2] papildomi kadrai (užrakinti prieš video).\nRefs: [produktas/personažas – 3–5 kampai] / nėra.\nKlipai: [2–4] × 3–5 s (I2V), ne vienas ilgas one-shot.\nGarsas: [VO pirmiausia / tik bed] + teisės [licensed / demo].\nMontažas: cut + grade + mix.\nQA: brand | žinutė | formatas | teisės | disclosure (C2PA/žyma).',
      },
      {
        heading: 'Patikra',
        body: 'Ar prieš video turi bent vieną užrakintą still? Ar žinai, ar garsas bus VO-first ar tik bed?',
        blockVariant: 'accent',
      },
      {
        heading: 'Kur pritaikyti?',
        body: 'Reklamos klipai, social Reels, produktų demo, vidiniai explaineriai.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
    ],
    footer: 'Toliau – skaidrė 4: Vaizdo generavimas',
  },
});

slide(13.15).content.footer = 'Toliau – skaidrė 5: Vaizdo prompto pagrindai';
slide(13.15).content.subtitle =
  'Toliau: vaizdo promptai (objektas + kontekstas + stilius), proporcijos, brand, consistency. Įrankiai: FLUX, GPT-Image, Midjourney, Ideogram.';

// Tool cheat sheet on 13.3
const toolsSec = slide(13.3).content.sections.find((s) => s.heading === 'Kuris įrankis kam');
if (toolsSec) {
  toolsSec.body =
    'GPT-Image / ChatGPT – natūrali kalba, greitas brief→vaizdas. FLUX – fotorealizmas ir multi-reference consistency. Midjourney – aukštas meninis lygis, character ref. Leonardo.ai – fotorealizmas, produktų dizainas. Ideogram – tekstas vaizduose (logo, plakatai). Adobe Firefly – CC, teisiškai saugesni šaltiniai, C2PA. Google Imagen – objektų išlaikymas, SynthID – saugi reklama. Stable Diffusion – atviras, lankstus (advanced).';
}
slide(13.3).content.footer = 'Toliau – skaidrė 6: Savitikra: stilius';

// --- 13.32 Consistency ---
insertAfter(13.31, {
  id: 13.32,
  title: 'Character / product consistency',
  shortTitle: 'Consistency',
  subtitle: '3–5 reference + same-product lock',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: 'Promptas vienas neužrakina tapatybės. Marketinge reikia reference lock: 3–5 reference vaizdai (skirtingi kampai) ir taisyklė „same product / same character / same style / same color palette“. Be to kampanijos setas „plaukioja“.',
        blockVariant: 'accent',
      },
      {
        heading: 'Brand / product sheet (minimumas)',
        body: '(1) Hero / priekinis vaizdas. (2) ¾ arba šonas. (3) Flatlay arba detalė (etiketė). (4) Optional – stiliaus / apšvietimo ref.',
        blockVariant: 'brand',
      },
      {
        heading: 'Daryk dabar',
        body: 'Surink arba sugeneruok 3 reference savo produktui ar personažui. Nukopijuok taisyklę į kitą generavimą.',
        blockVariant: 'brand',
      },
      {
        heading: 'Kopijuojamas šablonas',
        body: 'Reference lock taisyklė.',
        copyable:
          'Reference lock: naudok tuos pačius 3–5 reference vaizdus.\nTaisyklė: same product, same proportions, same label/logo placement, same color palette, same style.\nNauja scena: [APLINKA / VEIKSMAS]. Kamera: [kampas]. Formatas: [1:1 / 16:9 / 9:16].\nBe teksto vaizde (nebent etiketė ant produkto).',
      },
      {
        heading: 'Patikra',
        body: 'Ar produktas „išsipūtė“, pakeitė spalvą ar prarado etiketę? Jei taip – supaprastink sceną, stiprink ref arba inpaint tik probleminę zoną. Venk realių žmonių veidų be sutikimo.',
        blockVariant: 'accent',
      },
    ],
    footer: 'Toliau – skaidrė 8: Kompozicija ir kadras',
  },
});

// --- Video 13.4 ---
const s134 = slide(13.4);
s134.subtitle = '3–5 s klipai, storyboard, image → video';
s134.content.sections = [
  {
    heading: 'Trumpai',
    body: 'Trumpas vaizdo įrašas: aiškus scenarijus, tonas, kamera. Geriau 2–4 trumpi klipai (3–5 s) nei vienas 20–30 s one-shot. Storyboard stills užrakink prieš brangų video generavimą (žr. 13.12).',
    blockVariant: 'accent',
  },
  {
    heading: 'Kadravimas ir kameros kampas',
    body: 'Kadravimas keičia emociją: lygus akims, iš viršaus, iš apačios, POV. Nurodyk prompte. Video modelis geriausiai atlieka judesį ir laiką – ne vizualinį turinį iš nulio.',
    blockVariant: 'brand',
  },
  {
    heading: 'Image → video grandinė',
    body: 'Hero / keyframe → I2V (Runway, Kling, Veo, Seedance, Sora) → montažas. Audio-first hint: jei bus VO, pirmiausia užfiksuok VO trukmę – tada kirpk klipus pagal audio.',
    blockVariant: 'brand',
  },
  {
    heading: 'Daryk dabar',
    body: 'Parašyk 2–3 sakinius scenarijui vienam 3–5 s kadrui. Nukopijuok šabloną.',
    blockVariant: 'brand',
  },
  {
    heading: 'Kopijuojamas promptas',
    body: 'Vieno trumpo klipo šablonas.',
    copyable:
      'Klipas 3–5 s (ne ilgesnis).\nScenarijus: [kas vyksta šiame kadre].\nKamera: [lėtai į priekį / šonu / stabiliai / crane up].\nTonas: [profesionalus / dinamiškas / ramus].\nStartas: image-to-video iš hero keyframe. Same style, same colors.',
  },
  {
    heading: 'Kopijuojama grandinė – vaizdas → video',
    body: 'Pirma hero, tada animacija; ilgesniam – keli keyframe.',
    copyable:
      '1) Sukurk hero vaizdą: [OBJEKTAS], aplinka [KONTEKSTAS], stilius [STILIUS], proporcijos 16:9 arba 9:16, be teksto vaizde.\n2) Animacija iš šio vaizdo: 3–5 sekundės. Kamera juda […], objektas [ką daro]. Same character/product, same style, same color palette.\n3) (Jei reikia ilgesnio) Pakartok 2) su antru keyframe – vėliau sumontuok.',
  },
  {
    heading: 'Patikra',
    body: 'Ar video pradžia panaši į hero? Ar produktas/personažas neišsikraipė? Jei ne – supaprastink sceną arba stiprink reference (13.32).',
    blockVariant: 'accent',
  },
  {
    heading: 'Ta pati išvaizda keliuose kadruose',
    body: 'Tas pats reference + „same product / same style“. Venk realių veidų/balsų be sutikimo (13.101).',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];
s134.content.footer = 'Toliau – skaidrė 13: Video įrankiai ir CPI';

// --- 13.5 CPI ---
const s135 = slide(13.5);
s135.title = 'Video įrankiai, formatas ir CPI';
s135.subtitle = '2026 matrix + kaina už tinkamą clipą';
s135.content.sections = [
  {
    heading: 'Kodėl verta ir ką nurodyti',
    body: 'DI leidžia greitai bandyti variantus. Nurodyk formatą (16:9 / 9:16) ir trukmę 3–5 s. Matuok CPI (cost per usable clip) = visos generavimo + retry kainos / tinkamų klipų – ne tik €/sekundę. Prieš publikuodamas – teisės.',
    blockVariant: 'accent',
  },
  {
    heading: '2026 video įrankių matrica',
    body: 'Seedance 2.0 – directed motion + daug refs. Kling 3.0 – balance kokybė/kaina, I2V. Veo 3.1 – aukščiausia kokybė + native audio. Sora 2 – OpenAI ekosistema, 1–2 image refs. Synthesia – avatarai / mokymai. InVideo / CapCut – social šablonai ir montažas.',
    blockVariant: 'brand',
  },
  {
    heading: 'Daryk dabar',
    body: 'Pasirink vieną įrankį ir sugeneruok vieną 3–5 s I2V klipą. Užsirašyk, kiek retry prireikė (CPI pastaba).',
    blockVariant: 'brand',
  },
  {
    heading: 'Kopijuojamas promptas',
    body: 'Trumpo klipo + CPI pastaba.',
    copyable:
      'Vaizdo klipas iš keyframe: [1–2 sakiniai veiksmo].\nFormatas: [16:9 / 9:16]. Trukmė: 3–5 sek. Stilius: [nurodyk].\nCPI pastaba: kiek retry prireikė iki usable? [N]',
  },
  {
    heading: 'Patikra',
    body: 'Ar failas atsisiųstas? Ar komercinės teisės OK? Koks CPI (retry įskaičiuoti)?',
    blockVariant: 'accent',
  },
  {
    heading: 'Visi video įrankiai (apžvalga)',
    body: 'Seedance, Kling 3, Veo 3.1, Sora 2, Runway, Pika, Luma Dream Machine, Synthesia, InVideo. Pilnas sąrašas – skiltyje „Įrankiai“ (modulis 13).',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
  {
    heading: 'Video prompt laukai',
    body: 'duration_s (3–5), scene, visual_style, camera_movement, lighting, composition, aspect_ratio, reference_ids, negative, audio, brand_guidelines, safety_flags, cpi_note.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];
s135.content.footer = 'Toliau – skaidrė 14: Savitikra: video';

slide(13.51).subtitle = '3 klausimai prieš post-prod ir garsą';
slide(13.51).content.questions[0].options[0] = 'Scenarijus, trukmė (3–5 s), formatas ir tonas';
slide(13.51).content.footer = 'Toliau – skaidrė 15: Post-production';

// --- 13.52 Post-prod ---
insertAfter(13.51, {
  id: 13.52,
  title: 'Post-production',
  shortTitle: 'Post-prod',
  subtitle: 'DI = žalia medžiaga; cut, grade, mix',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: 'DI video = žalia medžiaga (raw), ne galutinis deliverable. Profesionali praktika: sumontuok 3–5 s klipus, color grade, tekstas/overlay, audio mix, export pagal platformą (CapCut / Premiere).',
        blockVariant: 'accent',
      },
      {
        heading: 'Minimalus checklist',
        body: '(1) Surink 2–4 klipus pagal scenarijų / VO. (2) Nukirpk silpnus kadrus; hook pirmose 1–2 s. (3) Spalvos vienodos. (4) VO arba bed + SFX. (5) Loudness orientyras ~−14 LUFS (muzika) / ~−16 (VO mix) – klausyk ausimis. (6) Export 9:16 arba 16:9.',
        blockVariant: 'brand',
      },
      {
        heading: 'Daryk dabar',
        body: 'Parašyk 4 eilučių montažo planą savo mini klipui.',
        blockVariant: 'brand',
      },
      {
        heading: 'Kopijuojamas šablonas',
        body: 'Montažo planas 15–30 s.',
        copyable:
          'Montažo planas (15–30 s):\n0–3 s: [hook klipas]\n3–8 s: [produktas / nauda]\n8–15 s: [įrodymas / detalė]\nPabaiga: [CTA kadras + tekstas]\nGarsas: [VO / bed] | teisės: [licensed]',
      },
      {
        heading: 'Patikra',
        body: 'Ar be DI „magic“ klipas skaitomas kaip istorija? Ar garsas neslopina VO?',
        blockVariant: 'accent',
      },
    ],
    footer: 'Toliau – skaidrė 16: Garsas',
  },
});

// --- Audio section ---
const s1356 = slide(13.56);
s1356.title = 'Garsas';
s1356.subtitle = 'Skyrius: VO, SFX, muzika – audio-first';
s1356.content.title = 'Garsas';
s1356.content.subtitle =
  'Audio-first: pirma VO arba bed trukmė, tada video. Triada VO / SFX / music. Licencijos: ElevenMusic, Soundraw, Beatoven vs Suno demo.';
s1356.content.footer = 'Toliau – skaidrė 17: Audio-first ir muzika';

const s136 = slide(13.6);
s136.title = 'Audio-first: VO ir muzikos aprašymas';
s136.shortTitle = 'Audio-first ir muzika';
s136.subtitle = 'Pirma garsas, tada video kirpimai';
s136.content.sections = [
  {
    heading: 'Trumpai',
    body: 'Audio-first: pirma VO (arba bed trukmė), tada video kirpimai pagal pacing. Muzikai aprašyk nuotaiką, stilių, tempą, instrumentus. Klientui / reklamai – licensed stack (ElevenMusic, Soundraw, Beatoven); Suno/Udio – demo, ne-client.',
    blockVariant: 'accent',
  },
  {
    heading: 'Daryk dabar',
    body: 'Jei turi VO – pirmiausia sugeneruok ar įrašyk VO. Jei tik bed – nukopijuok muzikos promptą. Pažymėk license intent.',
    blockVariant: 'brand',
  },
  {
    heading: 'Kopijuojamas promptas – bed',
    body: 'Foninės muzikos šablonas.',
    copyable:
      'Sukurk foninės muzikos fragmentą, 30–60 sekundžių.\nNuotaika: [ramus / energingas]. Stilius: [akustinė / elektroninė / pianinas].\nTempo: [lėtas / vidutinis]. Be vokalo. Naudojimas: [reklama / prezentacija] – reikia komercinės licencijos.',
  },
  {
    heading: 'Kopijuojamas promptas – VO',
    body: 'Voiceover šablonas (ElevenLabs ar pan.).',
    copyable:
      'Voiceover, [LT/EN], tonas [profesionalus / draugiškas], tempo [ramus].\nTekstas: [įklijuok 2–4 sakinius scenarijaus].\nBe foninės muzikos faile – tik balsas. Vėliau sumaišysiu su bed.',
  },
  {
    heading: 'Patikra',
    body: 'Ar bed neslopina VO? Ar licencija leidžia reklamą?',
    blockVariant: 'accent',
  },
  {
    heading: 'Angliškas MASTER šablonas (universalus)',
    body: 'Daug muzikos įrankių geriau supranta angliškus laukus. Pridėk license intent.',
    blockVariant: 'brand',
    copyable:
      'Create a [genre] track,\nmood: [emotion],\ntempo: [bpm or speed],\ninstruments: [list],\nvocal: none,\nstructure: intro – bed – soft outro,\ntarget platform: [YouTube/TikTok/ads],\ngoal: background / branding,\nlicense intent: commercial,\nproduction quality: professional.',
  },
  {
    heading: 'TOP audio įrankiai',
    body: 'ElevenLabs – VO ir SFX. ElevenMusic – licensed music, client work. Soundraw / Beatoven – royalty-friendly beds. Suno / Udio – greiti demo, ne-client. Pilnas sąrašas – skiltyje „Įrankiai“.',
    blockVariant: 'terms',
    collapsible: true,
    collapsedByDefault: true,
  },
];
s136.content.footer = 'Toliau – skaidrė 18: Licencijos ir loudness';

const s137 = slide(13.7);
s137.title = 'Garsai, licencijos ir loudness';
s137.shortTitle = 'Licencijos ir loudness';
s137.subtitle = 'SFX, commercial OK?, LUFS';
s137.content.sections = [
  {
    heading: 'Trumpai',
    body: 'Atskirk SFX nuo muzikos. Komerciniam darbui – licensed įrankiai. Orientyras loudness: ~−14 LUFS (muzika) / ~−16 (VO mix) – galutinį sprendimą priimk klausydamas. Kampanijos Legal / C2PA – skaidrėje 13.101.',
    blockVariant: 'accent',
  },
  {
    heading: 'Teisių checklist (5 punktai)',
    body: '(1) Terms / License. (2) Ar planas leidžia komercinį? (3) YouTube / reklama / podcast? (4) Attribution? (5) Užrašyk: „Licencija leidžia / neleidžia – [įrankis, data].“',
    blockVariant: 'brand',
  },
  {
    heading: 'Daryk dabar',
    body: 'Prieš viešą naudojimą atidaryk ToS; užsirašyk „commercial OK?“ taip/ne.',
    blockVariant: 'brand',
  },
  {
    heading: 'Kopijuojamas promptas',
    body: 'SFX šablonas.',
    copyable:
      'Sukurk trumpą garsą: [pvz. „švelnus perėjimo whoosh, 1 sekunda“].\nFormatas: WAV arba MP3. Be muzikos – tik SFX.',
  },
  {
    heading: 'Patikra',
    body: 'Atsisiuntimas OK? Licencija OK reklamai / YouTube?',
    blockVariant: 'accent',
  },
  {
    heading: 'Įrankiai',
    body: 'ElevenLabs (VO/SFX), ElevenMusic, Soundraw, Beatoven, Suno, Udio, Boomy. Pilnas sąrašas – skiltyje „Įrankiai“.',
    blockVariant: 'terms',
  },
];
s137.content.footer = 'Toliau – skaidrė 19: Verslas ir rizikos';

// --- 13.101 Legal + C2PA ---
const s101 = slide(13.101);
const rights = s101.content.sections.find((s) => s.heading === 'Teisės ir rizikos (privaloma)');
if (rights) {
  rights.body =
    'Prieš publikavimą patikrink: (1) autorinės teisės ir komercinė licencija; (2) deepfake – veidas/balsas tik su sutikimu; (3) prekės ženklai; (4) GDPR; (5) provenance – C2PA Content Credentials, SynthID/watermark, žmogui matoma DI žyma (EU AI Act Art. 50). Social dažnai nuima metadata – Soft Binding / watermark padeda.';
}
const legalDeep = s101.content.sections.find((s) => s.heading === 'Teisės, rizikos ir verslas (plačiau)');
if (legalDeep) {
  legalDeep.body =
    'Gilinimasis: autorinės teisės, deepfake, prekės ženklai, GDPR. Provenance: C2PA manifestas (kas/koks modelis), neišnykstantis watermark (pvz. SynthID), žmogui matoma žyma. Checklist: ar įrankis žymi output? ar brief’e yra disclosure eilutė? „Šis vizualas / video sukurtas su DI; įrankis: [X].“\n\nNaudojimo atvejai: A/B, produktų vizualai, social. Procentų be šaltinio vengti.';
}
const qa = s101.content.sections.find((s) => s.heading === 'Prieš publikuojant (QA ir versijos)');
if (qa) {
  qa.body =
    'Patikrink: (1) Tekstas vaize. (2) Brand. (3) Formatas. (4) Žinutė. (5) Brand safety. (6) Teisės. (7) Disclosure / C2PA / watermark. (8) Reference lock.\n\nFailai: V1, V2, V3 + kas pasikeitė prompte.';
}
const pitfalls = s101.content.sections.find((s) => s.heading === 'Top 3 pitfalls (ko vengti)');
if (pitfalls) {
  pitfalls.body =
    '(1) Per abstraktūs promptai → konkrečiai + MASTER. (2) Tekstas vizuale be kontrolės → Ideogram/GPT-Image + tipografija. (3) Ilgas video one-shot → 3–5 s klipai + montažas; matuok CPI.';
}

// --- 13.11 ---
const s1311 = slide(13.11);
const trumpai = s1311.content.sections.find((s) => s.heading === 'Trumpai');
if (trumpai) {
  trumpai.body =
    'Pilnas verslo ciklas: (1) Marketing brief. (2) Prompt + brand + reference lock. (3) 3–5 variantų / trumpi I2V. (4) Iteracija (CPI video). (5) Adaptacija platformoms. (6) A/B. (7) Optimizacija + disclosure. Techninį medijos pipeline žr. MUST skaidrę „Generatyvinės medijos pipeline“ (13.12); optional MASTER – 13.35. Komandoje lygiagrečiai tik po bendro brief, brand ir (jei reikia) VO trukmės.';
}

// --- Glossary 13.8 ---
const s138 = slide(13.8);
if (s138?.content?.sections) {
  const gloss = s138.content.sections.find(
    (s) => s.heading?.includes('Žodynėlis') || s.heading?.includes('Terminai') || s.body?.includes('Aspect ratio'),
  );
  // append terms section if structured as list body
  const last = s138.content.sections[s138.content.sections.length - 1];
  if (last && !String(last.body || '').includes('CPI')) {
    s138.content.sections.push({
      heading: '2026 terminai (pipeline ir provenance)',
      body: 'Audio-first – pirma VO/bed, tada video. Reference lock – 3–5 refs + same product/style. CPI – kaina už tinkamą clipą (su retry). C2PA – Content Credentials (pasirašytas provenance). Soft Binding / SynthID – watermark, kai social nuima metadata.',
      blockVariant: 'terms',
      collapsible: true,
      collapsedByDefault: false,
    });
  } else if (!gloss && s138.content.terms) {
    /* keep */
  }
}

// --- Summary 13.9 light touch ---
const s139 = slide(13.9);
if (s139?.content?.sections) {
  for (const sec of s139.content.sections) {
    if (sec.heading === 'Video ir muzika' || sec.heading === 'Muzika') {
      sec.heading = 'Video ir garsas';
      if (Array.isArray(sec.items)) {
        sec.items = [
          'Storyboard → 3–5 s I2V; CPI',
          'Audio-first: VO / bed / SFX',
          'Post-prod + disclosure',
        ];
      }
    }
  }
}

// --- M14 ---
m14.subtitle = 'Testas: vaizdai, video, garsas';
m14.description = 'Patikrink pipeline, consistency, audio-first ir provenance prieš Modulį 15.';
const s140 = m14.slides.find((s) => s.id === 140);
s140.content.firstActionCTA =
  'Atsakyk į 12 klausimų – vaizdai, video, garsas, pipeline, audio-first, licencijos, C2PA, rizikos ir workflow.';
s140.content.duration = '~12–18 min';

const s141 = m14.slides.find((s) => s.id === 141);
s141.subtitle = 'Vaizdai, video, garsas, pipeline';
const qs = s141.testQuestions;
if (!qs.some((q) => q.id === 'm14-q9')) {
  qs.push(
    {
      id: 'm14-q9',
      type: 'mcq',
      question: 'Kodėl prieš brangų video generavimą verta turėti storyboard / stills?',
      options: [
        'Kad failas būtų didesnis',
        'Kad užrakintum kompoziciją ir sumažintum retry / CPI',
        'Kad nereikėtų brief',
        'Kad galėtum praleisti teises',
      ],
      correct: 1,
      explanation:
        'Stills / storyboard užrakina vizualą pigiai; video modelis tada dirba judesį. Tai mažina atsitiktinumą ir kainą už tinkamą clipą (CPI).',
      relatedSlideId: 13.12,
    },
    {
      id: 'm14-q10',
      type: 'mcq',
      question: 'Ką reiškia audio-first darbo eiga?',
      options: [
        'Pirma video, tada bet koks garsas',
        'Pirma užbaigi VO (arba bed trukmę), tada kirpi / generuoji video pagal audio pacing',
        'Tik SFX be muzikos',
        'Tik tylų export',
      ],
      correct: 1,
      explanation:
        'Audio-first: VO ar bed diktuoja montažo ritmą. Jei audio „plaukioja“, video atrodo atsijungęs.',
      relatedSlideId: 13.6,
    },
    {
      id: 'm14-q11',
      type: 'scenario',
      scenarioContext: 'Klientui reikia foninės muzikos reklamai YouTube su monetizacija.',
      question: 'Kurį pasirinkimą rinktis pirmiausia?',
      options: [
        'Suno free demo be licencijos patikros',
        'Licensed stack (ElevenMusic, Soundraw ar Beatoven) ir ToS patikra',
        'Bet kokį failą iš interneto',
        'Tylą, nes muzika neleidžiama',
      ],
      correct: 1,
      explanation:
        'Klientui / reklamai / monetizacijai – licensed įrankiai. Suno/Udio tinka demo, ne „tikriausiai niekas nepagaus“.',
      relatedSlideId: 13.7,
    },
    {
      id: 'm14-q12',
      type: 'mcq',
      question: 'Kas yra C2PA / disclosure praktika prieš publikuojant DI turinį?',
      options: [
        'Tik gražus failo pavadinimas',
        'Provenance žymėjimas: Content Credentials / watermark ir, kur reikia, žmogui matoma DI žyma',
        'Tik spalvų korekcija',
        'Tik ilgesnis promptas',
      ],
      correct: 1,
      explanation:
        'EU AI Act Art. 50 ir platformų politikos reikalauja atpažįstamo sintetinio turinio: C2PA, watermark (pvz. SynthID), žmogui matoma žyma.',
      relatedSlideId: 13.101,
    },
  );
}

const s142 = m14.slides.find((s) => s.id === 142);
s142.content.failedMessage =
  'Siūlome dar kartą peržiūrėti Modulio 13 skaidres – pipeline, vaizdai, video, garsas.';
s142.content.useCaseBlock.body =
  'Paruošk bent hero vaizdą (150.5); jei nori – mini kampaniją: video, garsas ir montažas (151–154). Įrankiai – skiltyje „Įrankiai“.';
s142.content.reflectionPrompt =
  'META: Tu esi mokymų refleksijos asistentas. Tikslas – įtvirtinti žinias po Turinio kelio testo.\nINPUT: Ką tik baigiau Modulio 14 – vaizdai, video, garsas, pipeline, audio-first, C2PA.\nOUTPUT: Užduok 3 klausimus: (1) Kurį artefaktą kursiu Modulyje 15? (2) Kas buvo naujausia? (3) Ką noriu išbandyti pirmiausia? Po mano atsakymų duok 1 konkretų patarimą.';
if (m14.businessExamples?.[1]) {
  m14.businessExamples[1].description = '12 klausimų prieš Modulio 15 projektą';
}

// --- M15 ---
m15.description = 'Sukurk hero vaizdą su promptu; jei nori – video, garsą ir montažą.';
const s150 = m15.slides.find((s) => s.id === 150);
s150.subtitle = 'Privaloma: hero vaizdas; optional: video, garsas, montažas';
s150.content.whyBenefit =
  'Po projekto turėsi hero vaizdą su naudotu promptu ir brief; jei nori – mini kampanijos paketą (video + garsas + montažas) ir šablonus tolesniam darbui.';
s150.content.firstActionCTA =
  'Pradėk nuo greito starto: sukurk vieną hero vaizdą su naudotu promptu. Jei nori pilno kelio – tęsk į video, garsą ir montažą.';
s150.content.recommendedStart =
  'Greitas startas – vienas hero vaizdas (150.5), tada gali eiti į santrauką. Pilnas kelias (optional) – 151 → 152 → 153 → 154.';
s150.content.primaryPathIntro =
  'Privalomas minimumas: greitas startas – hero vaizdas (150.5). Pilnas kelias (neprivalomas): keyframe (151) → video (152) → garsas (153) → montažas (154). Po 150.5 greitame kelyje gali pereiti į santrauką.';
s150.content.taskOneLiner =
  'Atlik 150.5, kad užbaigtum modulį; 151–154 – optional pilnas mini kampanijos kelias.';

const s15025 = m15.slides.find((s) => s.id === 150.25);
s15025.content.sections[0].body =
  'Greitas kelias: brief → vienas hero vaizdas → promptas → korekcija → santrauka. Pilnas kelias (optional): hero → 3–5 s I2V → VO/bed → montažas 15–30 s → QA + disclosure.';
s15025.content.sections[1].body =
  'Įvardyk kelią: greitą (tik 150.5) ar pilną (151–154). Užsirašyk pirmą artefaktą vienu sakiniu.';

const s15026 = m15.slides.find((s) => s.id === 150.26);
s15026.content.body =
  'Prieš tęsiant pasitikrink kelią. Jei 150.5 atlikta ir renkiesi greitą kelią – eik į santrauką. Jei nori mini kampanijos – tęsk į 151–154.';
s15026.content.sections[1].body =
  'Hero → **video** (3–5 s) → **garsas** (VO/bed) → **montažas** (154) → QA. Mini kampanijos paketas (skaidrės 151–154).';
s15026.content.sections[2].body =
  'Kurį kelią renkiesi – greitą (santrauka) ar pilną (151)? Koks tavo pirmas artefaktas?';

const s152 = m15.slides.find((s) => s.id === 152);
s152.subtitle = 'Optional: 3–5 s I2V iš keyframe';
s152.content.scenarioDescription =
  'Optional: naudok 151 (arba 150.5) kaip keyframe ir sugeneruok 3–5 s klipą (arba 2 klipus). Artefaktas: vaizdo įrašas / nuoroda + promptas + CPI pastaba.';
s152.content.template =
  'Animacija iš hero vaizdo: 3–5 sek. Scenarijus: [APRAŠYK]. Kamera juda [lėtai į priekį / šonu / stabiliai]. Tonas: [profesionalus / dinamiškas / ramus]. Formatas: [16:9 / 9:16]. Same style, same colors. CPI pastaba: retry [N].';

const s153 = m15.slides.find((s) => s.id === 153);
s153.title = 'Scenarijus: Garsas (VO arba bed)';
s153.subtitle = 'Optional: VO arba 30–60 sek. bed + teisės';
s153.content.scenarioTitle = 'Garsas';
s153.content.scenarioDescription =
  'Optional: sugeneruok VO arba 30–60 sek. foninę muziką. Artefaktas: failas / nuoroda + promptas + „commercial OK?“.';
s153.content.template =
  'Variantas A (bed): 30–60 sek., nuotaika […], be vokalo, license intent: commercial.\nVariantas B (VO): [2–4 sakiniai], tonas […], tik balsas.';

// Insert 154 before 158
if (!m15.slides.some((s) => s.id === 154)) {
  const i158 = m15.slides.findIndex((s) => s.id === 158);
  m15.slides.splice(i158, 0, {
    id: 154,
    title: 'Scenarijus: Montažas',
    subtitle: 'Optional: 15–30 s iš 2–4 klipų',
    type: 'practice-scenario',
    optional: true,
    badgeVariant: 'optional',
    content: {
      scenarioTitle: 'Montažas',
      scenarioDescription:
        'Optional: sudėk 15–30 s galutinį klipą iš 2–4 I2V kadrų + VO arba bed. Artefaktas: export / nuoroda + checklist (teisės, disclosure, CPI).',
      taskFrame: 'Užduotis',
      scenario: {
        narrativeLead:
          'Naudok CapCut ar pan. DI = raw. Hook pirmose 1–2 s. Pažymėk disclosure ir teises.',
      },
      template:
        'Montažo planas (15–30 s):\n0–3 s: [hook]\n3–8 s: [produktas / nauda]\n8–15 s: [detalė]\nPabaiga: [CTA]\nGarsas: [VO / bed] | teisės: [licensed]\nDisclosure: DI sukurta su [įrankis]. CPI pastaba: [N retry].',
      templateLabel: 'Montažo checklist',
      instructions: {
        title: 'Žingsniai',
        steps: [
          {
            step: 1,
            title: 'Sumontuok ir eksportuok',
            description: 'Artefaktas: failas / nuoroda + teisės + disclosure + CPI pastaba.',
          },
        ],
      },
    },
    recommended: false,
  });
}

const s158 = m15.slides.find((s) => s.id === 158);
if (s158?.content) {
  s158.content.introBody =
    'Sveikiname! Užbaigei greitą startą arba pilną mini kampanijos kelią. Turi artefaktą, promptą ir aiškesnį kelią: hero → video → garsas → montažas.';
  const mus = s158.content.sections?.find((s) => s.heading?.includes('Muzika'));
  if (mus) {
    mus.heading = 'Garsas, montažas ir checklist';
    mus.items = [
      'Audio-first: VO arba bed + teisės',
      'Optional montažas 15–30 s (154)',
      'Checklist: brief, promptas, refs?, disclosure?, CPI?',
    ];
  }
  const vid = s158.content.sections?.find((s) => s.heading?.includes('vaizdo'));
  if (vid?.items) {
    vid.items = [
      'Image → video iš hero keyframe',
      '3–5 s klipai, tas pats stilius',
      'Artefaktas: įrašas / nuoroda + promptas + CPI',
    ];
  }
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('Patched modules.json');
console.log(
  'M13 ids:',
  m13.slides.map((s) => s.id).join(', '),
);
console.log('M14 q:', s141.testQuestions.length);
console.log(
  'M15 ids:',
  m15.slides.map((s) => s.id).join(', '),
);
