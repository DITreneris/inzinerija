/**
 * I2-M13 LT – exact string replacements (no JSON.stringify).
 * Usage: node scripts/patch-i2-m13-lt.mjs
 */
import fs from 'node:fs';

const path = new URL('../src/data/modules.json', import.meta.url);
let text = fs.readFileSync(path, 'utf8');

const pairs = [
  // 13.12
  [
    '6 žingsniai – spausk etapą diagramoje. Verslo ciklą (brief → A/B) žr. skaidrę „Darbo eiga: nuo brief iki publikacijos“.',
    '6 žingsniai – spausk etapą diagramoje. Verslo ciklą (užduoties aprašas → A/B) žr. skaidrę „Darbo eiga: nuo užduoties aprašo iki publikacijos“.',
  ],
  [
    'Šeši diagramos žingsniai – techninis stuburas. Checklist žemiau – praktika savo temai (ne antras žingsnių sąrašas).',
    'Šeši diagramos žingsniai – techninis stuburas. Patikros sąrašas žemiau – praktika savo temai (ne antras žingsnių sąrašas).',
  ],
  [
    'Užpildyk checklistą savo temai – tai planas, ne generatoriaus promptas.',
    'Užpildyk patikros sąrašą savo temai – tai planas, ne generatoriaus promptas.',
  ],
  [
    '"body": "Grandinės checklist – nukopijuok ir užpildyk.",',
    '"body": "Grandinės patikros sąrašas – nukopijuok ir užpildyk.",',
  ],
  [
    '"copyable": "Grandinės checklist:\\nBrief: tikslas [atpažįstamumas / įsitraukimas / konversija], auditorija [kam], platforma [kur].\\nŽenklas: spalvos [X], tonas [Y].\\nKadrai: pagrindinis + [0–2] papildomi (užrakinti prieš video).\\nReferencai: [produktas/personažas – 3–5 kampai] / nėra.\\nKlipai: [2–4] × 3–5 s (I2V – video iš kadro), ne vienas ilgas klipas.\\nGarsas: [balsas pirmiausia / tik fonas] + teisės [licencijuota / demo].\\nMontažas: kirpimas + spalvos + mix.\\nPatikra: ženklas | žinutė | formatas | teisės | DI žyma (C2PA / disclosure)."',
    '"copyable": "Grandinės patikros sąrašas:\\nUžduotis: tikslas [atpažįstamumas / įsitraukimas / konversija], auditorija [kam], platforma [kur].\\nŽenklas: spalvos [X], tonas [Y].\\nKadrai: pagrindinis + [0–2] papildomi (užrakinti prieš video).\\nPavyzdžių nuotraukos: [produktas/personažas – 3–5 kampai] / nėra.\\nKlipai: [2–4] × 3–5 s (I2V – video iš kadro), ne vienas ilgas klipas.\\nGarsas: [balsas pirmiausia / tik fonas] + teisės [licencijuota / demo].\\nMontažas: kirpimas + spalvos + maišymas.\\nPatikra: ženklas | žinutė | formatas | teisės | DI žyma (C2PA)."',
  ],
  [
    'Reklamos klipai, social trumpi video, produktų demo, vidiniai paaiškinimai.',
    'Reklamos klipai, trumpi vaizdo įrašai socialiniame tinkle, produktų demo, vidiniai paaiškinimai.',
  ],

  // 13.4
  [
    '"subtitle": "3–5 s klipai, storyboard, image → video"',
    '"subtitle": "3–5 s klipai, scenarijaus piešiniai, vaizdas → video"',
  ],
  [
    'Geriau 2–4 trumpi klipai (3–5 s) nei vienas ilgas bandymas – kadrus (stills) užrakink prieš brangų video.',
    'Geriau 2–4 trumpi klipai (3–5 s) nei vienas ilgas bandymas – kadrus užrakink prieš brangų video.',
  ],
  ['"heading": "Image → video grandinė"', '"heading": "Vaizdas → video grandinė"'],
  [
    'Hero / keyframe → I2V (Runway, Kling, Veo, Seedance, Sora) → montažas. Audio-first hint: jei bus VO, pirmiausia užfiksuok VO trukmę – tada kirpk klipus pagal audio.',
    'Pagrindinis vaizdas / raktinis kadras (keyframe) → I2V (Runway, Kling, Veo, Seedance, Sora) → montažas. Pirma garsas: jei bus balsas, pirmiausia užfiksuok balso trukmę – tada kirpk klipus pagal garsą.',
  ],
  [
    'Pirma hero, tada animacija; ilgesniam – keli keyframe.',
    'Pirma pagrindinis vaizdas, tada animacija; ilgesniam – keli raktiniai kadrai.',
  ],
  [
    'Ar video pradžia panaši į hero? Ar produktas ar personažas neišsikraipė? Jei ne – supaprastink sceną arba stiprink reference (tas pats produktas, stilius ir spalvos).',
    'Ar video pradžia panaši į pagrindinį vaizdą? Ar produktas ar personažas neišsikraipė? Jei ne – supaprastink sceną arba stiprink pavyzdžių nuotrauką (tas pats produktas, stilius ir spalvos).',
  ],

  // 13.47
  [
    '"subtitle": "Video iš kadro (image-to-video): keyframe → 3–5 s → kamera → tas pats stilius"',
    '"subtitle": "Video iš kadro (I2V): raktinis kadras (keyframe) → 3–5 s → kamera → tas pats stilius"',
  ],
  [
    'Trumpai: Aprašyk keyframe / sceną, pasirink trukmę (3–5 s) ir kameros judesį. Sistema sudės image-to-video promptą – nukopijuok į Kling, Runway, Veo ar Sora.',
    'Trumpai: Aprašyk raktinį kadrą / sceną, pasirink trukmę (3–5 s) ir kameros judesį. Sistema sudės I2V (video iš kadro) promptą – nukopijuok į Kling, Runway, Veo ar Sora.',
  ],
  [
    'Ar prompte yra keyframe, trukmė ≤5 s ir same style/product? Ar pradžia gali atitikti tavo hero still?',
    'Ar prompte yra raktinis kadras, trukmė ≤5 s ir tas pats stilius / produktas? Ar pradžia gali atitikti tavo pagrindinį kadrą?',
  ],

  // 13.5
  [
    '"subtitle": "2026 matrix + kaina už tinkamą clipą"',
    '"subtitle": "2026 matrica + kaina už tinkamą klipą"',
  ],
  [
    'Seedance 2.0 – directed motion + daug refs. Kling 3.0 – balance kokybė/kaina, I2V. Veo 3.1 – aukščiausia kokybė + native audio. Sora 2 – OpenAI ekosistema, 1–2 image refs. Synthesia – avatarai / mokymai. InVideo / CapCut – social šablonai ir montažas.',
    'Seedance 2.0 – valdomas judesys + daug pavyzdžių nuotraukų. Kling 3.0 – balansas kokybė/kaina, I2V. Veo 3.1 – aukščiausia kokybė + įtaisytas garsas. Sora 2 – OpenAI ekosistema, 1–2 pavyzdžių nuotraukos. Synthesia – avatarai / mokymai. InVideo / CapCut – socialiniai šablonai ir montažas.',
  ],
  [
    'Pasirink vieną įrankį ir sugeneruok vieną 3–5 s I2V klipą. Užsirašyk, kiek retry prireikė (CPI pastaba).',
    'Pasirink vieną įrankį ir sugeneruok vieną 3–5 s I2V klipą. Užsirašyk, kiek bandymų iš naujo prireikė (CPI pastaba).',
  ],
  [
    '"copyable": "Vaizdo klipas iš keyframe: [1–2 sakiniai veiksmo].\\nFormatas: [16:9 / 9:16]. Trukmė: 3–5 sek. Stilius: [nurodyk].\\nCPI pastaba: kiek retry prireikė iki usable? [N]"',
    '"copyable": "Vaizdo klipas iš raktinio kadro: [1–2 sakiniai veiksmo].\\nFormatas: [16:9 / 9:16]. Trukmė: 3–5 sek. Stilius: [nurodyk].\\nCPI pastaba: kiek bandymų prireikė iki tinkamo? [N]"',
  ],
  [
    'Ar failas atsisiųstas? Ar komercinės teisės OK? Koks CPI (retry įskaičiuoti)?',
    'Ar failas atsisiųstas? Ar komercinės teisės tinka? Koks CPI (bandymus įskaičiuok)?',
  ],

  // 13.32
  [
    'Vienas promptas neužrakina tapatybės. Marketinge reikia 3–5 pavyzdžių nuotraukų (reference) – skirtingi kampai – ir taisyklės „tas pats produktas / stilius / spalvos“, kitaip serija „plaukioja“.',
    'Vienas promptas neužrakina tapatybės. Marketinge reikia 3–5 pavyzdžių nuotraukų – skirtingi kampai – ir taisyklės „tas pats produktas / stilius / spalvos“, kitaip serija „plaukioja“.',
  ],
  [
    'Keturi žingsniai – spausk etapą. Taisyklę nukopijuosi Consistency lab.',
    'Keturi žingsniai – spausk etapą. Taisyklę nukopijuosi nuoseklumo dirbtuvėje.',
  ],
  [
    '"imageAlt": "Reference lock: refs, taisyklė, generavimas, QA"',
    '"imageAlt": "Referencų užraktas: pavyzdžių nuotraukos, taisyklė, generavimas, patikra"',
  ],
  [
    '(1) Hero / priekinis vaizdas. (2) ¾ arba šonas. (3) Flatlay arba detalė (etiketė). (4) Optional – stiliaus / apšvietimo ref.',
    '(1) Pagrindinis / priekinis vaizdas. (2) ¾ arba šonas. (3) Iš viršaus arba detalė (etiketė). (4) Jei nori – stiliaus / apšvietimo pavyzdys.',
  ],
  [
    'Surink arba sugeneruok bent 3 pavyzdžių nuotraukas savo produktui ar personažui. Kitame Consistency lab pažymėk refs ir diagnozuok, kur „plaukioja“.',
    'Surink arba sugeneruok bent 3 pavyzdžių nuotraukas savo produktui ar personažui. Kitoje nuoseklumo dirbtuvėje pažymėk pavyzdžius ir diagnozuok, kur „plaukioja“.',
  ],
  [
    'Ar turi bent 3 skirtingų kampų refs? Jei setas „plaukioja“ – Consistency lab: Simptomas | Fix ir nukopijuok taisyklę. Venk realių žmonių veidų be sutikimo.',
    'Ar turi bent 3 skirtingų kampų pavyzdžių nuotraukas? Jei rinkinys „plaukioja“ – nuoseklumo dirbtuvė: Simptomas | Taisymas ir nukopijuok taisyklę. Venk realių žmonių veidų be sutikimo.',
  ],
  [
    '"footer": "Toliau – skaidrė 9: Consistency lab"',
    '"footer": "Toliau – skaidrė 9: Nuoseklumo dirbtuvė"',
  ],

  // 13.325
  [
    '"subtitle": "Pažymėk refs, pasirink kas plaukioja – nukopijuok fix + lock taisyklę"',
    '"subtitle": "Pažymėk pavyzdžius, pasirink kas plaukioja – nukopijuok taisymą ir užrakto taisyklę"',
  ],
  [
    'Po reference lock schemos – praktika: pažymėk turimus refs, atpažink drift (proporcijos, spalva, etiketė, stilius) arba naują briefą. Vienas pasirinkimas → viena kopijuojama taisyklė.',
    'Po referencų užrakto schemos – praktika: pažymėk turimus pavyzdžius, atpažink slinktį (proporcijos, spalva, etiketė, stilius) arba naują užduotį. Vienas pasirinkimas → viena kopijuojama taisyklė.',
  ],
  ['"heading": "Drift lab"', '"heading": "Slinkties pratimas"'],
  [
    'Pažymėk refs (≥3), pasirink kas plaukioja. Apačioje – Simptomas | Fix ir prompto taisyklė – nukopijuok ją į kitą generavimą.',
    'Pažymėk pavyzdžius (≥3), pasirink kas plaukioja. Apačioje – Simptomas | Taisymas ir prompto taisyklė – nukopijuok ją į kitą generavimą.',
  ],
  [
    '"imageAlt": "Consistency drift lab: refs, Simptomas ir Fix, kopijuojama taisyklė"',
    '"imageAlt": "Nuoseklumo slinkties pratimas: pavyzdžiai, Simptomas ir Taisymas, kopijuojama taisyklė"',
  ],
  [
    'Ar pažymėjai refs, pasirinkai režimą ir nukopijavai taisyklę? Jei trūksta refs – grįžk į „Produktas ir personažas – tas pats vaizdas“ ir surink 3–5 kampus.',
    'Ar pažymėjai pavyzdžius, pasirinkai režimą ir nukopijavai taisyklę? Jei trūksta pavyzdžių – grįžk į „Produktas ir personažas – tas pats vaizdas“ ir surink 3–5 kampus.',
  ],

  // 13.52
  [
    'DI video = žalia medžiaga (raw), ne galutinis deliverable. Profesionali praktika: sumontuok 3–5 s klipus, color grade, tekstas/overlay, audio mix, export pagal platformą (CapCut / Premiere).',
    'DI video = žalia medžiaga, ne galutinis failas. Profesionali praktika: sumontuok 3–5 s klipus, sulygink spalvas, pridėk tekstą, maišyk garsą, eksportuok pagal platformą (CapCut / Premiere).',
  ],
  ['"heading": "Minimalus checklist"', '"heading": "Minimalus patikros sąrašas"'],
  [
    '(1) Surink 2–4 klipus pagal scenarijų / VO. (2) Nukirpk silpnus kadrus; hook pirmose 1–2 s. (3) Spalvos vienodos. (4) VO arba bed + SFX. (5) Loudness orientyras ~−14 LUFS (muzika) / ~−16 (VO mix) – klausyk ausimis. (6) Export 9:16 arba 16:9.',
    '(1) Surink 2–4 klipus pagal scenarijų / balsą. (2) Nukirpk silpnus kadrus; kablukas pirmose 1–2 s. (3) Spalvos vienodos. (4) Balsas arba fonas + efektai. (5) Garsumo orientyras ~−14 LUFS (muzika) / ~−16 (balso maišymas) – klausyk ausimis. (6) Export 9:16 arba 16:9.',
  ],
  [
    '"copyable": "Montažo planas (15–30 s):\\n0–3 s: [hook klipas]\\n3–8 s: [produktas / nauda]\\n8–15 s: [įrodymas / detalė]\\nPabaiga: [CTA kadras + tekstas]\\nGarsas: [VO / bed] | teisės: [licensed]"',
    '"copyable": "Montažo planas (15–30 s):\\n0–3 s: [kabluko klipas]\\n3–8 s: [produktas / nauda]\\n8–15 s: [įrodymas / detalė]\\nPabaiga: [kvietimo veikti kadras + tekstas]\\nGarsas: [balsas / fonas] | teisės: [komercinė licencija]"',
  ],
  [
    'Ar be DI „magic“ klipas skaitomas kaip istorija? Ar garsas neslopina VO?',
    'Ar be DI „stebuklo“ klipas skaitomas kaip istorija? Ar fonas neslopina balso?',
  ],

  // 13.6
  [
    'Pirma garsas (audio-first): pirma balsas arba foninės muzikos trukmė, tada video kirpimai pagal ritmą. Muzikai aprašyk nuotaiką, stilių, tempą, instrumentus. Klientui / reklamai – licensed stack; Suno/Udio – demo, ne klientui.',
    'Pirma garsas: pirma balsas arba foninės muzikos trukmė, tada video kirpimai pagal ritmą. Muzikai aprašyk nuotaiką, stilių, tempą, instrumentus. Klientui / reklamai – licencijuotas rinkinys; Suno/Udio – demo, ne klientui.',
  ],
  [
    'Jei turi VO – pirmiausia sugeneruok ar įrašyk VO. Jei tik bed – nukopijuok muzikos promptą. Pažymėk license intent.',
    'Jei turi balsą – pirmiausia sugeneruok ar įrašyk balsą. Jei tik fonas – nukopijuok muzikos promptą. Pažymėk, ar licencija tinka komercijai.',
  ],
  ['"heading": "Kopijuojamas promptas – bed"', '"heading": "Kopijuojamas promptas – fonas"'],
  ['"heading": "Kopijuojamas promptas – VO"', '"heading": "Kopijuojamas promptas – balsas"'],
  ['"body": "Voiceover šablonas (ElevenLabs ar pan.)."', '"body": "Balso šablonas (ElevenLabs ar pan.)."'],
  [
    'Ar bed neslopina VO? Ar licencija leidžia reklamą?',
    'Ar fonas neslopina balso? Ar licencija leidžia reklamą?',
  ],

  // 13.7
  ['"subtitle": "SFX, commercial OK?, LUFS"', '"subtitle": "Efektai, ar galima komercijai, LUFS"'],
  ['"shortTitle": "Licencijos ir loudness"', '"shortTitle": "Licencijos ir garsumas"'],
  [
    'Atskirk SFX nuo muzikos. Komerciniam darbui – licensed įrankiai. Orientyras loudness: ~−14 LUFS (muzika) / ~−16 (VO mix) – galutinį sprendimą priimk klausydamas. Kampanijos Legal / C2PA – skaidrėje „Verslas ir rizikos“.',
    'Atskirk efektus nuo muzikos. Komerciniam darbui – licencijuoti įrankiai. Orientyras garsumui: ~−14 LUFS (muzika) / ~−16 (balso maišymas) – galutinį sprendimą priimk klausydamas. Kampanijos teisės / C2PA – skaidrėje „Verslas ir rizikos“.',
  ],
  ['"heading": "Teisių checklist (5 punktai)"', '"heading": "Teisių patikros sąrašas (5 punktai)"'],
  [
    '(1) Terms / License. (2) Ar planas leidžia komercinį? (3) YouTube / reklama / podcast? (4) Attribution? (5) Užrašyk: „Licencija leidžia / neleidžia – [įrankis, data].“',
    '(1) Naudojimo taisyklės / licencija. (2) Ar planas leidžia komercinį? (3) YouTube / reklama / podcast? (4) Autorius nurodyti? (5) Užrašyk: „Licencija leidžia / neleidžia – [įrankis, data].“',
  ],
  [
    'Prieš viešą naudojimą atidaryk ToS; užsirašyk „commercial OK?“ taip/ne.',
    'Prieš viešą naudojimą atidaryk naudojimo taisykles; užsirašyk „ar galima komercijai?“ taip/ne.',
  ],
  ['"body": "SFX šablonas."', '"body": "Efektų šablonas."'],
  [
    '"copyable": "Sukurk trumpą garsą: [pvz. „švelnus perėjimo whoosh, 1 sekunda“].\\nFormatas: WAV arba MP3. Be muzikos – tik SFX."',
    '"copyable": "Sukurk trumpą garsą: [pvz. „švelnus perėjimo whoosh, 1 sekunda“].\\nFormatas: WAV arba MP3. Be muzikos – tik efektas."',
  ],

  // 13.11
  [
    '"title": "Darbo eiga: nuo brief iki publikacijos"',
    '"title": "Darbo eiga: nuo užduoties aprašo iki publikacijos"',
  ],
  [
    '"subtitle": "Brief → prompt → variantai → iteracija → testavimas"',
    '"subtitle": "Užduotis → promptas → variantai → kartojimas → testavimas"',
  ],
  [
    '"shortTitle": "Darbo eiga: brief–publikacija"',
    '"shortTitle": "Darbo eiga: užduotis–publikacija"',
  ],
  [
    'Pilnas verslo ciklas: (1) Marketing brief (užduoties aprašas). (2) Prompt + brand + pavyzdžių nuotraukos. (3) 3–5 variantų / trumpi video iš kadro. (4) Iteracija. (5) Platforma. (6) Testas. (7) Optimizacija.',
    'Pilnas verslo ciklas: (1) Užduoties aprašas. (2) Promptas + ženklas + pavyzdžių nuotraukos. (3) 3–5 variantai / trumpi video iš kadro. (4) Kartojimas. (5) Platforma. (6) Testas. (7) Tobulinimas.',
  ],
  [
    '7 žingsniai nuo brief iki optimizacijos. Paspausk žingsnį – paaiškinimas apačioje.',
    '7 žingsniai nuo užduoties aprašo iki tobulinimo. Paspausk žingsnį – paaiškinimas apačioje.',
  ],
  [
    'Nukopijuok žemiau esantį šabloną ir užpildyk – brief į vaizdo promptą.',
    'Nukopijuok žemiau esantį šabloną ir užpildyk – nuo užduoties aprašo prie vaizdo prompto.',
  ],
  ['"heading": "Brief į promptą"', '"heading": "Užduoties aprašas į promptą"'],
  [
    'Žemiau – šablonas, kaip brief paversti į vaizdo promptą.',
    'Žemiau – šablonas, kaip užduoties aprašą paversti į vaizdo promptą.',
  ],
  [
    'Ar brief turi aiškų tikslą ir auditoriją? Ar promptas atitinka brand (spalvos, tonas)? Ar sugeneravai 3–5 variantus testui?',
    'Ar užduoties aprašas turi aiškų tikslą ir auditoriją? Ar promptas atitinka ženklą (spalvos, tonas)? Ar sugeneravai 3–5 variantus testui?',
  ],

  // 13.101
  [
    'Prieš publikaciją žinosi, ką tikrinsi: rezultatus (KPI), teises, DI žymą (C2PA / disclosure) ir bent vieną A/B hipotezę. Detalės – žemiau.',
    'Prieš publikaciją žinosi, ką tikrinsi: rezultatus (KPI), teises, DI žymą (C2PA) ir bent vieną A/B hipotezę. Detalės – žemiau.',
  ],
  ['Patikrink: (1) Tekstas vaize.', 'Patikrink: (1) Tekstas vaizde.'],
  [
    'Ar prieš publikaciją patikrinai teises, disclosure/C2PA ir bent vieną A/B hipotezę? Jei ne – grįžk į privalomą bloką ir checklist.',
    'Ar prieš publikaciją patikrinai teises, DI žymą (C2PA) ir bent vieną A/B hipotezę? Jei ne – grįžk į privalomą bloką ir patikros sąrašą.',
  ],
  [
    '"footer": "Toliau – skaidrė 24: Darbo eiga: brief–publikacija"',
    '"footer": "Toliau – skaidrė 24: Darbo eiga: užduotis–publikacija"',
  ],

  // 13.9
  [
    'Taisyklė „tas pats produktas / stilius“ + Consistency lab',
    'Taisyklė „tas pats produktas / stilius“ + nuoseklumo dirbtuvė',
  ],
  [
    'Darbo eiga nuo brief iki patikros',
    'Darbo eiga nuo užduoties aprašo iki patikros',
  ],

  // 13.56
  [
    '"footer": "Toliau – skaidrė 21: Audio-first ir muzika"',
    '"footer": "Toliau – skaidrė 21: Pirma garsas ir muzika"',
  ],
  [
    '"Vaizdas → video grandinė su keyframe."',
    '"Vaizdas → video grandinė su raktiniu kadru."',
  ],

  // 13.3 tools
  [
    'Natūrali kalba, greitas brief→vaizdas – patogu marketingo juodraščiui.',
    'Natūrali kalba, greitas užduoties aprašas → vaizdas – patogu marketingo juodraščiui.',
  ],
  ['"Greitas brief"', '"Greita užduotis"'],

  // 13.51
  [
    '"subtitle": "3 klausimai prieš post-prod ir garsą"',
    '"subtitle": "3 klausimai prieš montažą ir garsą"',
  ],
];

let missing = 0;
for (const [from, to] of pairs) {
  const n = text.split(from).length - 1;
  if (n !== 1) {
    console.error(`FAIL count=${n}: ${from.slice(0, 80)}`);
    missing += 1;
    continue;
  }
  text = text.replace(from, to);
}

if (missing) {
  console.error(`Aborted: ${missing} pairs did not match exactly once`);
  process.exit(1);
}

fs.writeFileSync(path, text);
console.log(`I2-M13 LT patched (${pairs.length} replacements)`);
