/**
 * UJ-MUST-S1/S3: transfer fields + own-work on practice closers (LT SOT).
 * Run: node scripts/patch-uj-must-transfer.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sotPath = path.join(root, 'src/data/modules.json');

/** @type {Record<number, { abilityBefore: string; abilityAfter: string; firstAction24h: string; nextStepCTA?: string }>} */
const MODULE_TRANSFER = {
  2: {
    abilityBefore: 'Atsakymai apie promptus buvo nuspėjami arba atsitiktiniai.',
    abilityAfter:
      'Moki patikrinti 6 blokų ir workflow principus ir matai, kur kartoti.',
    firstAction24h:
      'Šiandien pataisyk vieną silpną vietą iš testo rezultatų ir paleisk 1 patobulintą promptą darbe.',
    nextStepCTA: 'Pereik prie Modulio 3 praktikos – pritaikyk 6 blokus tikroje užduotyje.',
  },
  4: {
    abilityBefore: 'Promptus rašei be aiškios atminties, šaltinių ir kokybės patikros.',
    abilityAfter:
      'Moki valdyti kontekstą, šaltinius ir patikrinti atsakymą prieš naudojimą.',
    firstAction24h:
      'Per 24–48 val. paimk vieną darbo dokumentą, duok jį DI kaip šaltinį ir paprašyk santraukos su citatomis.',
    nextStepCTA: 'Pereik prie Modulio 5 – pritaikyk promptus prezentacijai ir mini testui.',
  },
  5: {
    abilityBefore: 'Prezentacijos draftą darei be aiškaus brief ir kokybės vartų.',
    abilityAfter:
      'Moki eiti brief → struktūra → skaidrės ir patikrinti, ar verta eiti toliau.',
    firstAction24h:
      'Šiandien paimk vieną realų brief ir sugeneruok 5–7 skaidrių struktūrą su DI, tada pataisyk 1 silpną vietą.',
    nextStepCTA: 'Pereik prie Modulio 6 projekto – sukurk pilną darbo rezultatą.',
  },
  8: {
    abilityBefore: 'Duomenų analizės kelio žinios buvo fragmentiškos.',
    abilityAfter:
      'Moki patikrinti pipeline, MASTER promptą ir analitikos šablonus prieš projektą.',
    firstAction24h:
      'Per 24–48 val. paleisk vieną MASTER PROMPTĄ su tikrais (arba anonimizuotais) darbo duomenimis.',
    nextStepCTA: 'Pereik prie Modulio 9 – pasirink quest ir sukurk artefaktą.',
  },
  11: {
    abilityBefore: 'Agentų sąvokos buvo teorinės, be aiškios patikros.',
    abilityAfter:
      'Moki patikrinti agento gylį, įrankius ir žmogaus kontrolę prieš praktiką.',
    firstAction24h:
      'Šiandien paleisk vieną agentinę užklausą su įrankiais ir užrašyk, kur reikėjo žmogaus sprendimo.',
    nextStepCTA: 'Pereik prie Modulio 12 projekto – sukurk kelių agentų startą.',
  },
  14: {
    abilityBefore: 'Turinio (vaizdas/video/garsas) principai buvo nepatikrinti.',
    abilityAfter:
      'Moki patikrinti stilių, teises ir consistency prieš mini kampaniją.',
    firstAction24h:
      'Per 24–48 val. sugeneruok vieną vaizdą pagal savo brief ir pažymėk naudojimo teises.',
    nextStepCTA: 'Pereik prie Modulio 15 – quick start arba pilna mini kampanija.',
  },
};

/** Summary / practice-summary slide patches by moduleId → slideId */
const SLIDE_TRANSFER = {
  1: {
    19: {
      abilityBefore: 'Promptus rašei laisvai – rezultatai buvo nenuoseklūs.',
      abilityAfter:
        'Moki struktūruoti promptą 6 blokais ir pasirinkti Basic vs Workflow.',
      firstAction24h:
        'Šiandien parašyk vieną darbo promptą su Meta + Input + Output ir paleisk jį DI įrankyje.',
      nextStepCTA: 'Pereik prie Modulio 2 testo – patikrink 6 blokų ir workflow žinias.',
    },
  },
  3: {
    37: {
      abilityBefore: 'Žinojai teoriją, bet neturėjai savo praktinio promptų rinkinio.',
      abilityAfter:
        'Turi praktiką su 6 blokais ir gali pakartoti tą patį procesą darbe.',
      firstAction24h:
        'Per 24–48 val. pritaikyk vieną praktikos promptą tikrai darbo užduočiai ir išsaugok rezultatą.',
      nextStepCTA: 'Jei branduolio pasiruošimas aiškus – eik į Modulį 4 (pažangūs įrankiai).',
      ownWorkLabel: 'Tavo darbo kontekstas',
      ownWorkPlaceholder: 'Pvz. savaitės pardavimų ataskaita, klientų skundai, el. laiškas…',
      ownWorkTemplate:
        'META: Tu esi mano darbo asistentas.\nINPUT: Mano kontekstas: {{context}}\nOUTPUT: Duok 1 struktūruotą promptą (Meta/Input/Output) šiai užduočiai ir 3 kokybės kriterijus.',
    },
    38: {
      abilityBefore: 'DI naudojai be aiškios 6 blokų sistemos.',
      abilityAfter:
        'Baigei 1 dalį: struktūra, patikra ir praktika – gali eiti į pažangų kelią.',
      firstAction24h:
        'Šiandien pasirink vieną darbo užduotį ir pakartok 6 blokų promptą be mokymų skaidrių.',
      nextStepCTA: 'Atidaryk Branduolio pasitikrinimą arba Modulį 4.',
    },
  },
  6: {
    69: {
      abilityBefore: 'Neturėjai baigto projekto su promptų rinkiniu ir patikra.',
      abilityAfter:
        'Turi projekto artefaktą ir žinai, kaip kartoti tą patį procesą kitai temai.',
      firstAction24h:
        'Per 24–48 val. panaudok projekto rezultatą realiame darbe (el. laiškas, skaidrė ar ataskaita).',
      nextStepCTA: 'Pasirink kitą kelią (pvz. Duomenų analizė – Modulis 7) arba pakartok projektą.',
      ownWorkLabel: 'Tavo projekto tema',
      ownWorkPlaceholder: 'Pvz. Q3 ataskaita vadovybei, onboarding planas…',
      ownWorkTemplate:
        'META: Tu esi projekto kokybės asistentas.\nINPUT: Mano projekto tema: {{context}}\nOUTPUT: Duok 5 punktų checklist, ar rezultatas paruoštas naudoti darbe, ir 1 patobulinimą.',
    },
  },
  7: {
    75: {
      abilityBefore: 'Duomenis DI duodavai be aiškaus pipeline ir MASTER šablono.',
      abilityAfter:
        'Moki eiti nuo duomenų iki įžvalgų su MASTER promptu ir analitikos šablonais.',
      // keep existing firstAction24h if present – script merges
      abilityBeforeKeepFirst: false,
    },
  },
  9: {
    92: {
      abilityBefore: 'Neturėjai quest artefakto su aiškia baigtimi.',
      abilityAfter:
        'Moki pasirinkti scenarijų, sukurti rezultatą ir pažymėti, kas baigta.',
      firstAction24h:
        'Per 24–48 val. panaudok bent vieną quest artefaktą tikrame procese arba susitikime.',
      nextStepCTA: 'Grįžk į hub ir užbaik kitą scenarijų arba eik į Agentų kelią (Modulis 10).',
      ownWorkLabel: 'Tavo quest kontekstas',
      ownWorkPlaceholder: 'Pvz. klientų skambučių santrauka, kainodaros lentelė…',
      ownWorkTemplate:
        'META: Tu esi analitikos partneris.\nINPUT: Mano situacija: {{context}}\nOUTPUT: Pasiūlyk 1 konkretų kitą žingsnį ir 3 klausimus, kuriuos turėčiau užduoti DI.',
    },
  },
  10: {
    10.8: {
      abilityBefore: 'Agentus painiojai su paprastu pokalbiu be įrankių ir ribų.',
      abilityAfter:
        'Moki rinktis gylį, įrankius ir žmogaus kontrolę agentų darbo eigoje.',
    },
  },
  12: {
    128: {
      abilityBefore: 'Neturėjai kelių agentų starto su aiškiais artefaktais.',
      abilityAfter:
        'Turi greito starto arba pilną praktikų paketą ir žinai, ką tobulinti kitą kartą.',
      ownWorkLabel: 'Tavo proceso / procesas',
      ownWorkPlaceholder: 'Pvz. leadų kvalifikacija, turinio kalendorius…',
      ownWorkTemplate:
        'META: Tu esi agentų architektas.\nINPUT: Mano procesas: {{context}}\nOUTPUT: Pasiūlyk Koordinatoriaus + 2 specialistų roles (1 sakinys kiekvienai) ir 1 rizikos tašką žmogui.',
    },
  },
  13: {
    13.9: {
      abilityBefore: 'Vaizdų/video promptus rašei be stiliaus, proporcijų ir teisių.',
      abilityAfter:
        'Moki kurti vaizdo, video ir muzikos promptus su consistency ir teisių sąmoningumu.',
    },
  },
  15: {
    158: {
      abilityBefore: 'Neturėjai mini kampanijos ar hero vaizdo su išsaugotais promptais.',
      abilityAfter:
        'Turi greito starto ar mini kampanijos artefaktą ir gali jį pakartoti kitai temai.',
      ownWorkLabel: 'Tavo kampanijos / kanalo kontekstas',
      ownWorkPlaceholder: 'Pvz. LinkedIn anonsas, produkto landing hero…',
      ownWorkTemplate:
        'META: Tu esi turinio direktorius.\nINPUT: Mano kanalas ir tikslas: {{context}}\nOUTPUT: Duok 1 hero vaizdo promptą (stilius, proporcijos, tekstas kadre) ir 3 Patikros punktus.',
    },
  },
};

function applySlidePatch(content, patch) {
  const next = { ...content };
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'abilityBeforeKeepFirst') continue;
    if (value == null) continue;
    // Do not overwrite existing firstAction24h / nextStepCTA if already set and patch omits them
    if (
      (key === 'firstAction24h' || key === 'nextStepCTA') &&
      next[key] &&
      patch[key] === undefined
    ) {
      continue;
    }
    if (patch[key] !== undefined) next[key] = value;
  }
  return next;
}

const data = JSON.parse(fs.readFileSync(sotPath, 'utf8'));
let slidePatches = 0;
let modulePatches = 0;

for (const mod of data.modules) {
  const slideMap = SLIDE_TRANSFER[mod.id];
  if (slideMap) {
    for (const slide of mod.slides) {
      const patch = slideMap[slide.id];
      if (!patch || !slide.content) continue;
      const { abilityBeforeKeepFirst: _k, ...fields } = patch;
      // Merge: always set ability*; set firstAction/next only if provided or missing
      const merged = { ...slide.content };
      if (fields.abilityBefore) merged.abilityBefore = fields.abilityBefore;
      if (fields.abilityAfter) merged.abilityAfter = fields.abilityAfter;
      if (fields.firstAction24h) merged.firstAction24h = fields.firstAction24h;
      else if (!merged.firstAction24h && MODULE_TRANSFER[mod.id]?.firstAction24h) {
        merged.firstAction24h = MODULE_TRANSFER[mod.id].firstAction24h;
      }
      if (fields.nextStepCTA) merged.nextStepCTA = fields.nextStepCTA;
      if (fields.ownWorkLabel) merged.ownWorkLabel = fields.ownWorkLabel;
      if (fields.ownWorkPlaceholder) {
        merged.ownWorkPlaceholder = fields.ownWorkPlaceholder;
      }
      if (fields.ownWorkTemplate) merged.ownWorkTemplate = fields.ownWorkTemplate;
      // Ensure existing summaries with firstAction get abilities even if firstAction omitted
      if (!merged.firstAction24h && fields.firstAction24h) {
        merged.firstAction24h = fields.firstAction24h;
      }
      slide.content = merged;
      slidePatches += 1;
    }
  }

  // Ensure M7/M10/M12/M13/M15 existing firstAction slides got ability fields
  if ([7, 10, 12, 13, 15].includes(mod.id)) {
    const defaults = {
      7: {
        abilityBefore:
          'Duomenis DI duodavai be aiškaus pipeline ir MASTER šablono.',
        abilityAfter:
          'Moki eiti nuo duomenų iki įžvalgų su MASTER promptu ir analitikos šablonais.',
      },
      10: {
        abilityBefore:
          'Agentus painiojai su paprastu pokalbiu be įrankių ir ribų.',
        abilityAfter:
          'Moki rinktis gylį, įrankius ir žmogaus kontrolę agentų darbo eigoje.',
      },
      12: {
        abilityBefore:
          'Neturėjai kelių agentų starto su aiškiais artefaktais.',
        abilityAfter:
          'Turi greito starto arba pilną praktikų paketą ir žinai, ką tobulinti kitą kartą.',
      },
      13: {
        abilityBefore:
          'Vaizdų/video promptus rašei be stiliaus, proporcijų ir teisių.',
        abilityAfter:
          'Moki kurti vaizdo, video ir muzikos promptus su consistency ir teisių sąmoningumu.',
      },
      15: {
        abilityBefore:
          'Neturėjai mini kampanijos ar hero vaizdo su išsaugotais promptais.',
        abilityAfter:
          'Turi greito starto ar mini kampanijos artefaktą ir gali jį pakartoti kitai temai.',
      },
    };
    const d = defaults[mod.id];
    const summary = [...mod.slides]
      .reverse()
      .find((s) => s.type === 'summary' || s.type === 'practice-summary');
    if (summary?.content && d) {
      if (!summary.content.abilityBefore) {
        summary.content.abilityBefore = d.abilityBefore;
        slidePatches += 1;
      }
      if (!summary.content.abilityAfter) {
        summary.content.abilityAfter = d.abilityAfter;
      }
    }
  }

  const mt = MODULE_TRANSFER[mod.id];
  if (mt) {
    mod.transfer = { ...mt };
    modulePatches += 1;
  }
}

fs.writeFileSync(sotPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(
  `UJ-MUST transfer patch: slidePatches≈${slidePatches}, module.transfer=${modulePatches}`
);
void applySlidePatch;
