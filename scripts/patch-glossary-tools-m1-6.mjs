import { readFileSync, writeFileSync } from 'fs';

const glossaryPath = 'src/data/glossary.json';
const toolsPath = 'src/data/tools.json';

// --- GLOSSARY: add missing terms for M1-6 ---
const glossary = JSON.parse(readFileSync(glossaryPath, 'utf8'));

const newTerms = [
  {
    term: "Artefaktas",
    definition: "Paruoštas galutinis rezultatas \u2013 ataskaita, Custom GPT, tinklalapis ar kitas ap\u010Diuopiamas produktas, sukurtas naudojant DI.",
    moduleId: 6
  },
  {
    term: "Autoregresinis modelis",
    definition: "Kalbos modelis, kuris generuoja tekst\u0105 \u017Eodis po \u017Eodžio \u2013 kiekvienas kitas \u017Eodis priklauso nuo ankstesni\u0173; taip veikia ChatGPT, Claude ir kiti LLM.",
    moduleId: 4
  },
  {
    term: "Brief",
    definition: "Trumpa u\u017Eduotis prieš pradedant darb\u0105: tema, auditorija, tikslas, apimtis ir tonas \u2013 pagrindas strukt\u016Bruotam promptui.",
    moduleId: 5
  },
  {
    term: "Chunk (fragmentas)",
    definition: "Logiškas teksto gabalas, \u012F kur\u012F suskaidomas dokumentas RAG sistemai \u2013 padeda DI rasti ir naudoti tik aktuali\u0105 informacij\u0105.",
    moduleId: 4
  },
  {
    term: "COMBO",
    definition: "Prompt\u0173 tipas, jungiantis kelis metodus viename prompte \u2013 rol\u0117 + \u017Eingsniai + palyginimas + formatas; galingiausias, bet sud\u0117tingiausias.",
    moduleId: 4
  },
  {
    term: "Custom GPT",
    definition: "ChatGPT projektas su taisykl\u0117mis, instrukcijomis ir failais \u2013 asmeninis ar komandos asistentas konkrečiai u\u017Eduočiai.",
    moduleId: 4
  },
  {
    term: "DI atmintis (Memory)",
    definition: "Ilgalaikis kontekstas, kur\u012F DI \u201Eprisimena\u201C tarp pokalbi\u0173 \u2013 vartotojo nuostatos, stilius, ankstesni sprendimai.",
    moduleId: 4
  },
  {
    term: "Gilusis mokymasis (Deep Learning)",
    definition: "Mašininio mokymosi dalis, naudojanti daugiasluoksnius neuroninius tinklus \u2013 pagrindas vaizd\u0173, kalbos ir teksto DI modeliams.",
    moduleId: 4
  },
  {
    term: "Konteksto degradacija",
    definition: "Reiškinys, kai DI \u201Epamiršta\u201C ankstesn\u0119 informacij\u0105 ilgame pokalbyje \u2013 d\u0117mesys ma\u017E\u0117ja, vidurio informacija praranda aktualum\u0105 (Lost in the Middle).",
    moduleId: 4
  },
  {
    term: "Konteksto in\u017Einerija",
    definition: "S\u0105moningas ir strukt\u016Bruotas informacijos pateikimas DI modeliui \u2013 kokie duomenys, kokia tvarka, kiek \u2013 kad atsakymas b\u016Bt\u0173 tikslus ir naudingas.",
    moduleId: 4
  },
  {
    term: "Konteksto kapsul\u0117",
    definition: "Suspaustas šaltini\u0173 rinkinys (santraukos, faktai, citatos), kuris telpa \u012F vien\u0105 prompt\u0105 ir suteikia DI reikiam\u0105 kontekst\u0105.",
    moduleId: 5
  },
  {
    term: "Mašininis mokymasis (ML)",
    definition: "Dirbtinio intelekto sritis, kurioje sistema mokosi iš duomen\u0173 be tiesioginio programavimo \u2013 atpa\u017E\u012Fsta d\u0117sningumus ir daro prognozes.",
    moduleId: 4
  },
  {
    term: "Multimodalumas",
    definition: "DI geb\u0117jimas dirbti su keliais formatais vienu metu \u2013 tekstas, vaizdai, garsas, vaizdo \u012Frašai; pvz. \u012Fkelti nuotrauk\u0105 ir gauti aprašym\u0105.",
    moduleId: 4
  },
  {
    term: "Neuroniniai tinklai",
    definition: "Skai\u010Diavimo modelis, \u012Fkv\u0117ptas smegen\u0173 neuron\u0173 \u2013 pagrindas giliam mokymuisi ir šiuolaikiniams DI modeliams.",
    moduleId: 4
  },
  {
    term: "Prompt\u0173 biblioteka",
    definition: "Asmenin\u0117 ar komandin\u0117 šablon\u0173 saugykla \u2013 sur\u016Bšiuoti promptai pagal u\u017Eduotis ir naudojimo atvejus, kad nereik\u0117t\u0173 rašyti iš naujo.",
    moduleId: 6
  },
  {
    term: "Prompt\u0173 versijavimas",
    definition: "Prompt\u0173 sekimas versijomis (v1, v2, v3) \u2013 kas veik\u0117, kas ne, k\u0105 pakeitei; padeda tobulinti ir nekartoti klaid\u0173.",
    moduleId: 6
  },
  {
    term: "SFT (Supervised Fine-Tuning)",
    definition: "Pri\u017Ei\u016Brimas mokymo etapas \u2013 \u017Emon\u0117s parengia pavyzdinius klausim\u0173-atsakym\u0173 porus, pagal kuriuos modelis mokosi atsakyti pageidaujamu stiliumi.",
    moduleId: 4
  }
];

const existingTermNames = new Set(glossary.terms.map(t => t.term));
let addedCount = 0;
for (const t of newTerms) {
  if (!existingTermNames.has(t.term)) {
    glossary.terms.push(t);
    addedCount++;
  } else {
    console.log(`SKIP (already exists): ${t.term}`);
  }
}

glossary.terms.sort((a, b) => a.term.localeCompare(b.term, 'lt'));
writeFileSync(glossaryPath, JSON.stringify(glossary, null, 2) + '\n', 'utf8');
console.log(`Glossary: added ${addedCount} terms, total ${glossary.terms.length}`);

// --- TOOLS: add missing tools for M1-6 ---
const tools = JSON.parse(readFileSync(toolsPath, 'utf8'));

const newTools = [
  {
    name: "Consensus",
    url: "https://consensus.app",
    description: "Mokslini\u0173 tyrim\u0173 paieška su DI \u2013 atsakymai remiantis recenzuotais straipsniais, sintez\u0117 ir citatos.",
    moduleId: 4,
    category: "RAG / tyrimai"
  },
  {
    name: "Connected Papers",
    url: "https://www.connectedpapers.com",
    description: "Mokslini\u0173 straipsni\u0173 ryši\u0173 vizualizacija \u2013 rodo susijusius darbus grafike, padeda greitai rasti aktualius šaltinius.",
    moduleId: 4,
    category: "RAG / tyrimai"
  },
  {
    name: "NotebookLM (Google)",
    url: "https://notebooklm.google.com",
    description: "Google \u012Frankis, kuris leid\u017Eia \u012Fkelti dokumentus ir \u201Ekalbėtis\u201C su jais \u2013 asmeninis RAG iš savo fail\u0173, podcast\u0173 generavimas.",
    moduleId: 4,
    category: "RAG / išoriniai šaltiniai"
  },
  {
    name: "Notion",
    url: "https://notion.so",
    description: "Universali darbo erdv\u0117 \u2013 užrašai, prompt\u0173 biblioteka, dokumentacija, projekt\u0173 valdymas vienoje vietoje.",
    moduleId: 6,
    category: "Produktyvumas"
  }
];

const existingToolNames = new Set(tools.tools.map(t => t.name));
let toolsAdded = 0;
for (const t of newTools) {
  if (!existingToolNames.has(t.name)) {
    tools.tools.push(t);
    toolsAdded++;
  } else {
    console.log(`SKIP tool (already exists): ${t.name}`);
  }
}

tools.tools.sort((a, b) => a.name.localeCompare(b.name, 'lt'));
writeFileSync(toolsPath, JSON.stringify(tools, null, 2) + '\n', 'utf8');
console.log(`Tools: added ${toolsAdded} tools, total ${tools.tools.length}`);

// --- Validate alphabetical order ---
const termsOk = glossary.terms.every((x, i, a) => !i || a[i-1].term.localeCompare(x.term, 'lt') <= 0);
const toolsOk = tools.tools.every((x, i, a) => !i || a[i-1].name.localeCompare(x.name, 'lt') <= 0);
console.log(`\nValidation: glossary ${termsOk ? 'OK' : 'FAIL'}, tools ${toolsOk ? 'OK' : 'FAIL'}`);

// Show NoteLM entry for review
const noteLm = tools.tools.find(t => t.name === 'NoteLM');
const notebookLm = tools.tools.find(t => t.name === 'NotebookLM (Google)');
console.log('\n--- NoteLM vs NotebookLM ---');
if (noteLm) console.log('NoteLM:', JSON.stringify(noteLm, null, 2));
if (notebookLm) console.log('NotebookLM:', JSON.stringify(notebookLm, null, 2));
