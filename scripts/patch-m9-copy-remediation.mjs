/**
 * M9 copy remediation (Batch A+B) – LT modules.json + EN modules-en-m7-m9.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function load(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function save(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function findMod(data, id = 9) {
  const mods = data.modules ?? data;
  return Array.isArray(mods) ? mods.find((m) => m.id === id) : null;
}

function slide(mod, id) {
  return mod.slides.find((s) => s.id === id);
}

function patchLt(mod) {
  mod.subtitle = 'Analitinis rinkinys su DI';
  mod.duration = '~45–90 min';

  const s90 = slide(mod, 90);
  s90.subtitle = 'Susirink analitinį rinkinį su DI – ~45–90 min';
  s90.content.duration =
    '~45 min minimumui · iki ~90 min pilnam 8 žingsnių ciklui';
  s90.content.audience =
    'Baigei teoriją ir testą – dabar vieną kartą praeik pilną analizę su DI.';
  const jc = s90.content.journeyChoices;
  jc.find((c) => c.id === 'pardavimai').subtitle =
    'Rodikliai, tendencijos, prognozės';
  jc.find((c) => c.id === 'it-inzinerija').subtitle =
    'Duomenų srautai ir logai';
  jc.find((c) => c.id === 'personalas').subtitle =
    'Išlaikymas ir komandos pulse';
  s90.content.firstActionCTA =
    'Pradėti: šaltinių katalogas → CSV → 8 promptai';

  const s931 = slide(mod, 93.1);
  delete s931.characterId;
  s931.content.scenarioDescription =
    'Pirmoji rinkinio dalis: vieši šaltiniai net jei vėliau naudosi savo failą. Paleisk DI chat (ChatGPT, Claude, Gemini); lentelę gali vėliau įklijuoti į Sheets.';
  s931.scenario.context =
    'Išorės startas – rinkos, sektoriaus ar konkurentų duomenys. Po to eik į CSV/Excel praktiką (sample arba savo failas).';
  s931.scenario.data =
    'Tavo tema pagal savo sritį: [įmonė / sektorius / produktas].';
  const steps931 = s931.practicalTask.instructions.steps;
  steps931[0].title = 'Pasirink sektorių pagal savo sritį';
  steps931[0].description =
    'Pardavimai → e-commerce / mažmena LT; Rinkodara → skaitmeninė reklama LT; IT → SaaS / duomenų platformos; Personalas → Lietuvos personalas / įdarbinimas; Vadyba → SMB valdymas LT; Kita → tavo sritis [X].';
  steps931[1].description =
    'ChatGPT, Claude ar Gemini – be failo. Paleisk ir gauk pradinę lentelę. Nebūtina: įklijuok į Google Sheets.';

  const s932 = slide(mod, 93.2);
  delete s932.characterId;
  s932.content.scenarioDescription =
    'Antroji rinkinio dalis: išvalyk failą DI chate. Platforma failų neįkelia už tave. Įrankiai: ChatGPT · Claude · Gemini (failas) · Excel / Google Sheets (eksportas → CSV). Jei neturi failo – atsisiųsk sample arba nukopijuok stulpelius.';
  s932.practicalTask.instructions.steps[2].description =
    'Įklijuok promptą žemiau ir paleisk su failu. Po valymo – 3 pagrindinius rodiklius (KPI) savo sričiai.';

  const s93 = slide(mod, 93);
  s93.content.sections = [
    {
      heading: '1️⃣ Trumpai',
      body: 'Katalogą ir CSV jau turi. Dabar – **8 žingsnių ciklas**: schema + kopijuojami promptai. **Minimumas šiandien: 2 žingsniai** su naudingu DI atsakymu; pilnas rinkinys – visi 8.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Daryk dabar',
      body: 'Atidaryk žingsnį schemoje, tada nukopijuok jo promptą žemiau ir įklijuok į DI.',
      blockVariant: 'brand',
    },
    {
      heading: '3️⃣ Interaktyvi 8 žingsnių schema',
      body: 'Pasirink žingsnį diagramoje – kopijuojamą promptą rasi **žemiau toje pačioje skaidrėje**.',
      image: 'm9_data_workflow',
      blockVariant: 'brand',
    },
    {
      heading: '4️⃣ Kopijuok promptą pagal žingsnį',
      body: 'Pasirink žingsnį juostoje – nukopijuok šabloną ir įklijuok į DI.',
      blockVariant: 'brand',
      image: 'm9_workflow_step_prompts',
    },
    {
      heading: '5️⃣ Patikra (1 min)',
      body: '• Ar nukopijavai promptą bent 2 žingsniams ir gavai naudingą DI atsakymą?\n• Jei gali – pabaik iki .html juodraščio arba aiškios specifikacijos.',
      blockVariant: 'accent',
    },
  ];

  const s92 = slide(mod, 92);
  s92.content.sections[0].heading = 'Pavyzdinis rezultatas (darbo eiga)';
  s92.content.sections[0].body =
    'Geras rezultatas: suvestinis dokumentas su šaltiniais, sutvarkyti dublikatai, aiškūs pagrindiniai rodikliai (KPI) ar grafikai, .html arba aiški specifikacija vadovybei. Jei naudojai MASTER PROMPTAS iš Modulio 7 – struktūra turėtų būti panaši: šaltiniai, struktūra, valymas, įžvalgos, rekomendacijos.';
  s92.content.sections[1].body =
    'Per 48 val. pakartok darbo eigą kitai temai arba atidaryk papildomą scenarijų. Grįžk į modulių sąrašą – kitas modulis arba sertifikatas.';
  s92.content.reflectionPrompt =
    'META: Tu esi mokymų refleksijos asistentas. Tikslas – įtvirtinti Duomenų analizės kelio projekto rezultatus.\nINPUT: Ką tik baigiau Modulio 9 projektą – verslo analizę su DI (8 žingsnių ciklas; papildomas scenarijus – jei dariau).\nOUTPUT: Užduok 3 klausimus: (1) Ką padariau šiame projekte ir kur tai pritaikysiu? (2) Ką tai reiškia man ar komandai? (3) Ką darysiu per artimiausias 24–48 val.? Po mano atsakymų duok 1 konkretų patarimą.';

  // Batch B hub
  const s99 = slide(mod, 99);
  s99.content.level1Choices[0].description =
    'Atsiliepimai ir valymas prieš analizę.';
  s99.content.level1Choices[1].description =
    'Kas / kodėl / kas bus / ką daryti + rizikos.';
  s99.content.level1Choices[2].description =
    'Finansai, konkurentai, personalo šablonai.';
  s99.content.level1Choices[3].description =
    'Grafikai ir istorija vadovybei.';
  s99.content.optionalPathNote =
    'Pirmiausia užbaik pagrindinį kelią (katalogas → CSV → 8 žingsniai → rinkinys).';
  const l2 = s99.content.level2Choices;
  const flat = l2.flat();
  const h110 = flat.find((x) => x.targetSlideId === 110);
  if (h110)
    h110.description = 'Stiprybės, silpnybės, galimybės, 30 d. planas.';
  const h112 = flat.find((x) => x.targetSlideId === 112);
  if (h112) h112.title = 'Mokymų naudingumas';

  const s102 = slide(mod, 102);
  s102.scenario.context =
    'Prieš bet kokią analizę – checklist. Ryšys su Modulio 7 duomenų paruošimo darbo eiga (valymas ir metaduomenys).';
  s102.scenario.constraints =
    'Tipų patikra, laiko žymės, regiono žymės.';

  const s103 = slide(mod, 103);
  s103.scenario.context =
    'Be metaduomenų DI analizė tampa paviršinė. Integruok į darbo eigą prieš 4 analizės tipus.';

  const s110 = slide(mod, 110);
  s110.scenario.context =
    'Strateginis verslo analitikas. Stiprybės, silpnybės, galimybės, grėsmės; 3 silpnos vietos, 3 galimybės, 30 dienų planas.';

  const s113 = slide(mod, 113);
  s113.content.scenarioTitle = 'Vizualizacijos tipo parinkimas';
  s113.scenario.context =
    'Rolė: vyresnysis vizualizacijos ekspertas ir UX. Išvestis: 3 variantai, paaiškinimai, rizikos. Tonas: strateginis.';
  s113.scenario.constraints =
    '3 variantai su pagrindimu; rizika ir auditorija (vadovybė).';

  const s114 = slide(mod, 114);
  s114.content.scenarioTitle = 'Istorijos kūrimas iš duomenų';
  s114.scenario.constraints =
    '4 punktai: įžvalga, konfliktas/įtampa, reikšmė verslui, veiksmas.';

  const s116 = slide(mod, 116);
  s116.content.scenarioTitle = 'Python vizualizacijos kodas';
  s116.scenario.constraints =
    'Stulpelinė ir linijinė; anotacijos su įžvalgomis; kodas arba specifikacija.';
}

function patchEn(mod) {
  mod.subtitle = 'Your AI analysis kit';
  mod.duration = '~45–90 min';

  const s90 = slide(mod, 90);
  s90.subtitle = 'Build your AI analysis kit – ~45–90 min';
  s90.content.duration =
    '~45 min for the minimum path · up to ~90 min for the full 8-step cycle';
  s90.content.audience =
    'You finished the theory and the test – now complete one full analysis pass with AI.';
  const jc = s90.content.journeyChoices;
  jc.find((c) => c.id === 'pardavimai').subtitle =
    'Metrics, trends, forecasts';
  jc.find((c) => c.id === 'it-inzinerija').subtitle =
    'Data flows and logs';
  jc.find((c) => c.id === 'personalas').subtitle =
    'Retention and team pulse';
  s90.content.firstActionCTA =
    'Start: source catalog → CSV → 8-step prompts';

  const s931 = slide(mod, 93.1);
  delete s931.characterId;
  s931.content.scenarioDescription =
    'First part of the kit: public sources even if you will use your own file later. Run AI chat (ChatGPT, Claude, Gemini); you can paste the table into Sheets later.';
  s931.scenario.context =
    'External start – market, sector or competitor data. Next: CSV/Excel practice (sample or your file).';
  s931.scenario.data =
    'Your topic for your domain: [company / sector / product].';
  const steps931 = s931.practicalTask.instructions.steps;
  steps931[0].title = 'Pick a sector for your domain';
  steps931[0].description =
    'Sales → e-commerce / retail; Marketing → digital ads; IT → SaaS / data platforms; People → hiring / people ops; Management → SMB leadership; Other → your domain [X].';
  steps931[1].description =
    'ChatGPT, Claude or Gemini – no file needed. Run and get an initial table. Optional: paste into Google Sheets.';

  const s932 = slide(mod, 93.2);
  delete s932.characterId;
  s932.content.scenarioDescription =
    'Second part of the kit: clean a file in AI chat. The platform does not upload files for you. Tools: ChatGPT · Claude · Gemini (file) · Excel / Google Sheets (export → CSV). If you have no file – download the sample or copy columns.';
  s932.practicalTask.instructions.steps[2].description =
    'Paste the prompt below and run with the file. After cleaning – 3 key metrics (KPIs) for your domain.';

  const s93 = slide(mod, 93);
  s93.content.sections = [
    {
      heading: '1️⃣ In short',
      body: 'You already have the catalog and CSV. Now – the **8-step cycle**: schema + copyable prompts. **Minimum today: 2 steps** with a useful AI reply; full kit = all 8.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Do now',
      body: 'Open a step on the schema, then copy its prompt below and paste into AI.',
      blockVariant: 'brand',
    },
    {
      heading: '3️⃣ Interactive 8-step schema',
      body: 'Pick a step in the diagram – you will find the copyable prompt **below on this same slide**.',
      image: 'm9_data_workflow',
      blockVariant: 'brand',
    },
    {
      heading: '4️⃣ Copy prompt by step',
      body: 'Pick a step in the bar – copy the template and paste into AI.',
      blockVariant: 'brand',
      image: 'm9_workflow_step_prompts',
    },
    {
      heading: '5️⃣ Check (1 min)',
      body: '• Did you copy prompts for at least 2 steps and get a useful AI answer?\n• If you can – finish an .html draft or a clear spec.',
      blockVariant: 'accent',
    },
  ];

  const s92 = slide(mod, 92);
  s92.content.sections[0].heading = 'Example result (work process)';
  s92.content.sections[0].body =
    'A good result: a consolidated document with sources, deduplicated entries, clear key metrics (KPIs) or charts, .html or a clear spec for leadership. If you used the MASTER PROMPT from Module 7, the structure should be similar: sources, structure, cleaning, insights, recommendations.';
  s92.content.sections[1].body =
    'Within 48 hours, repeat the work process for another topic or open an extra scenario. Return to the module list — next module or certificate.';
  s92.content.reflectionPrompt =
    'META: You are a training reflection assistant. Goal – consolidate Data Analysis path project results.\nINPUT: I just finished Module 9 project – business analysis with AI (8-step cycle; optional extra scenario if I did one).\nOUTPUT: Ask 3 questions: (1) What did I do in this project and where will I apply it? (2) What does this mean for me or the team? (3) What will I do in the next 24–48 hours? After my answers give 1 concrete tip.';

  const s99 = slide(mod, 99);
  if (s99?.content?.level1Choices) {
    s99.content.level1Choices[0].description =
      'Reviews and cleaning before analysis.';
    s99.content.level1Choices[1].description =
      'What / why / what next / what to do + risks.';
    s99.content.level1Choices[2].description =
      'Finance, competitors, people templates.';
    s99.content.level1Choices[3].description =
      'Charts and story for leadership.';
    s99.content.optionalPathNote =
      'Finish the main path first (catalog → CSV → 8 steps → kit).';
    const flat = s99.content.level2Choices.flat();
    const h110 = flat.find((x) => x.targetSlideId === 110);
    if (h110)
      h110.description =
        'Strengths, weaknesses, opportunities, 30-day plan.';
    const h112 = flat.find((x) => x.targetSlideId === 112);
    if (h112) h112.title = 'Training value';
  }

  const s102 = slide(mod, 102);
  if (s102?.scenario) {
    s102.scenario.context =
      'Before any analysis – a checklist. Linked to Module 7 data preparation work process (cleaning and metadata).';
    s102.scenario.constraints =
      'Type checks, timestamps, region tags.';
  }

  const s103 = slide(mod, 103);
  if (s103?.scenario) {
    s103.scenario.context =
      'Without metadata AI analysis stays shallow. Fold it into the work process before the 4 analysis types.';
  }

  const s110 = slide(mod, 110);
  if (s110?.scenario) {
    s110.scenario.context =
      'Strategic business analyst. Strengths, weaknesses, opportunities, threats; 3 weak spots, 3 opportunities, 30-day plan.';
  }

  const s113 = slide(mod, 113);
  if (s113) {
    s113.content.scenarioTitle = 'Choosing a visualization type';
    s113.scenario.context =
      'Role: senior visualization expert and UX. Output: 3 options, explanations, risks. Tone: strategic.';
    s113.scenario.constraints =
      '3 options with rationale; risk and audience (leadership).';
  }

  const s114 = slide(mod, 114);
  if (s114) {
    s114.content.scenarioTitle = 'Building a story from data';
    s114.scenario.constraints =
      '4 points: insight, conflict/tension, business meaning, action.';
  }

  const s116 = slide(mod, 116);
  if (s116) {
    s116.content.scenarioTitle = 'Python visualization code';
    s116.scenario.constraints =
      'Bar and line charts; annotations with insights; code or a clear spec.';
  }
}

const ltPath = path.join(root, 'src/data/modules.json');
const enPath = path.join(root, 'src/data/modules-en-m7-m9.json');

const lt = load(ltPath);
const en = load(enPath);
const modLt = findMod(lt);
const modEn = findMod(en);
if (!modLt || !modEn) throw new Error('Module 9 not found');

patchLt(modLt);
patchEn(modEn);
save(ltPath, lt);
save(enPath, en);
console.log('Patched M9 Batch A+B in modules.json and modules-en-m7-m9.json');
