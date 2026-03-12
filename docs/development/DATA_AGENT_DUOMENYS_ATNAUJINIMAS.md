# DATA_AGENT: Svarbūs duomenys ir atnaujinimo periodiškumas

> Kurie duomenų failai reikalauja DATA_AGENT dėmesio bėgant laikui, kodėl ir kaip dažnai juos tikrinti/atnaujinti.

**Architektūra A:** `modules.json`, `glossary.json` ir `tools.json` yra full redagavimo SOT. `*-m1-m6.json` failai naudojami core `1–6` build/runtime profiliui ir nėra pagrindinis authoring šaltinis.

---

## 1. Duomenų failų apžvalga

| Failas | Kas čia | Kodėl svarbu | Kas gali keistis laikui bėgant |
|--------|----------|----------------|----------------------------------|
| **modules.json** | Moduliai, skaidrės, quiz klausimai – visa mokymų struktūra ir turinys UI. | Pagrindinis full redagavimo SOT programai; bet koks turinio pakeitimas pirmiausia atsiduria čia. | Naujos skaidrės, pakeisti tekstai, nauji moduliai, quiz klausimai, action-intro tools, content-block lentelės, workflow chains – kiekvienas SOT arba produktinis pakeitimas. |
| **modules-m1-m6.json** | Core `1–6` build/runtime failas. | Naudojamas, kai `VITE_MVP_MODE=1`; turi likti suderintas su full SOT. | Tiesiogiai redaguoti tik išimtinais atvejais; įprastai atnaujinamas po `modules.json` peržiūros arba generavimo žingsnio. |
| **glossary.json** | Žodynėlio terminai: term, definition, moduleId. | Full redagavimo SOT terminams; neatitikimas su SOT – painiava mokymuose ir Žodynėlio skiltyje. | Nauji terminai SOT/modules.json; pataisyti apibrėžimai; terminai iš naujų modulių (moduleId). |
| **glossary-m1-m6.json** | Core `1–6` žodynėlio build/runtime failas. | Reikalingas core profiliui; turi likti suderintas su full žodynėliu. | Keičiamas po full glossary pakeitimų arba core profilio atnaujinimo. |
| **tools.json** | Įrankių skiltis: name, url, description, moduleId, category. | Full redagavimo SOT įrankiams; nuorodos ir aprašymai turi atitikti mokymus. | Nauji įrankiai SOT arba modules.json (action-intro, content-block, ai-workflow, presentationTools, workflow chain); pasenusios nuorodos; pakeisti aprašymai ar kategorijos. |
| **tools-m1-m6.json** | Core `1–6` įrankių build/runtime failas. | Reikalingas core profiliui; turi likti suderintas su full tools failu. | Keičiamas po full tools pakeitimų arba core profilio atnaujinimo. |
| **promptLibrary.json** | Promptų biblioteka: sekcijos, šablonai (prompt, goal, logika). | Naudojama promptų pavyzdžiams; nesinchronuota – prieštarauja mokymų tekstams. | Nauji promptų pavyzdžiai; pakeisti šablonai ar instrukcijos, kai keičiasi SOT arba modulių turinys. |
| **hallucinationRates.ts** | Haliucinacijų rodikliai (modelis, ratePercent); šaltinis – išorinis benchmark (Vectara). | Skaidrėse rodomi kaip „dabartiniai“ benchmarkai; pasenę duomenys – klaidinga įžvalga. | Leaderboard atnaujinimai: nauji modeliai, pakeisti rodikliai; šaltinio metodologijos pakeitimai. |

---

## 2. Atnaujinimo periodiškumas (rekomenduojama)

| Failas | Kada atnaujinti | Rekomenduojamas periodiškumas | Detalus gidas |
|--------|------------------|--------------------------------|----------------|
| **modules.json** | Kiekvieną kartą, kai keičiamas turinio SOT (`turinio_pletra.md`, `turinio_pletra_moduliai_4_5_6.md`) arba priimami produktiniai pakeitimai (naujos skaidrės, quiz, tekstai). | **Pagal reikalavimus** (event-driven). Papildomai: **prieš kiekvieną release** – greita SOT↔JSON sinchrono patikra. | CONTENT_AGENT pateikia turinį; DATA_AGENT įrašo į full JSON. Struktūra – `src/types/modules.ts`, schema – `scripts/schemas/modules.schema.json`. |
| **modules-m1-m6.json** | Po `modules.json` pakeitimų, kai reikia atnaujinti core `1–6` profilį. | **Pagal reikalavimus** – kai keitimas liečia `1–6` ir turi atsispindėti core build'e. | Patikrinti, kad failas atitinka full SOT ir turi tik `module.id <= 6`. |
| **glossary.json** | Po SOT arba modules.json pakeitimų, kurie prideda/keičia terminus. | **Pagal reikalavimus** (kai pridedami terminai arba koreguojami apibrėžimai). Papildomai: **kartą per release** – peržiūrėti, ar visi SOT ir modulių terminai yra žodynėlyje. | Sinchronas su turinio SOT ir su skaidrėmis tipo `glossary` moduliuose. Schema – `scripts/schemas/glossary.schema.json`. |
| **glossary-m1-m6.json** | Po `glossary.json` pakeitimų, kai reikia atnaujinti core `1–6` profilį. | **Pagal reikalavimus** – kai keitimas liečia `1–6` ir turi atsispindėti core build'e. | Patikrinti, kad visi terminai turi `moduleId <= 6`. |
| **tools.json** | Po SOT arba modules.json pakeitimų, kurie prideda/keičia įrankius (lentelės, action-intro tools, ai-workflow groups, presentationTools, workflow chains). | **Pagal reikalavimus** + **periodiškai** (pvz. **kartą per sprintą** arba **prieš release**) – ištraukti visus minimus įrankius ir atnaujinti sąrašą; patikrinti nuorodas. | Žr. **docs/development/DATA_AGENT_TOOLS.md** – šaltiniai ir žingsniai. Schema – `scripts/schemas/tools.schema.json`. |
| **tools-m1-m6.json** | Po `tools.json` pakeitimų, kai reikia atnaujinti core `1–6` profilį. | **Pagal reikalavimus** – kai keitimas liečia `1–6` ir turi atsispindėti core build'e. | Patikrinti, kad visi įrankiai turi `moduleId <= 6`. |
| **promptLibrary.json** | Kai SOT arba moduliuose atsiranda nauji promptų pavyzdžiai arba keičiami esami šablonai. | **Pagal reikalavimus** (retesnis nei modules.json). **Prieš release** – ar promptų biblioteka atitinka modulių copyable/prompt blokus. | Sinchronas su modules.json `content.copyable`, `content.sections` su promptais. Schema – `scripts/schemas/promptLibrary.schema.json`. |
| **hallucinationRates.ts** | Kai išorinis šaltinis (Vectara Hallucination Eval Leaderboard) atnaujinamas – nauji modeliai arba rodikliai. | **Periodiškai** (pvz. **1–2 kartus per metus** arba kai atnaujiname „benchmark“ skaidres). Patikrinti šaltinį: `HALLUCINATION_RATES_SOURCE.url`. | Atidaryti šaltinio URL; atnaujinti `HALLUCINATION_RATES` masyvą ir, jei reikia, `HALLUCINATION_RATES_SOURCE`; laikytis `HallucinationRateEntry` tipo. |

---

## 3. Trigeriai (kada tikrai paleisti DATA_AGENT)

- **Turinio SOT pakeitimas** (turinio_pletra.md, turinio_pletra_moduliai_4_5_6.md) → sinchronuoti **modules.json**; jei pridedami terminai/įrankiai/promptai → **glossary.json**, **tools.json**, **promptLibrary.json** pagal poreikį.
- **Keitimas turi patekti į core `1–6` build** → po full SOT sinchrono patikrinti arba atnaujinti **modules-m1-m6.json**, **glossary-m1-m6.json**, **tools-m1-m6.json**.
- **Naujos skaidrės arba modulio struktūros pakeitimas** → pirmiausia **modules.json**; jei skaidrėse minimi nauji terminai ar įrankiai → **glossary.json**, **tools.json**.
- **Prieš release** → greita peržiūra: visi 5 failai atitinka SOT ir schemas; `npm run validate:schema` praeina.
- **Išorinis šaltinis (Vectara leaderboard)** atnaujintas → **hallucinationRates.ts**.

---

## 4. Validacija po atnaujinimų

Po bet kokių `src/data` pakeitimų paleisti:

```bash
npm run validate:schema
```

Jei pridedami nauji laukai ar tipai – pirmiausia atnaujinti `src/types/modules.ts` ir atitinkamas schemas `scripts/schemas/`, tik tada JSON/TS failus.

---

## 5. Žodynėlis ir įrankiai – abecėlinė tvarka

**glossary.json** (terminai) ir **tools.json** (įrankiai) turi būti pateikiami **abecėline tvarka** (locale `lt`): `terms` pagal `term`, `tools` pagal `name`. UI (GlossaryPage, ToolsPage) taip pat rūšiuoja prieš rodant. Pilnos gairės: **.cursor/rules/data-agent-glossary-tools-order.mdc**.

---

## 6. Schemų skaidrės ir duomenys (geriausios praktikos)

Kai skaidrėje naudojamas **blokas su diagrama** (pvz. `blockLlmAutoregressive`, Schema3, RlProcess), **duomenų tiesa** – `modules.json` (kuris modulio skaidrėje rodomas kuris blokas, `section.image` arba atitinkamas block tipas). **Geometrijos ir vizualinės tiesos** – SCHEME_AGENT ir layout failai (pvz. `llmAutoregressiveLayout.ts`, `schema3Layout.ts`), ne JSON.

**DATA_AGENT atsakomybė schemoms:**

- Nesikeičia diagramų koordinatės, viewBox, blokų pločiai/auščiai – tai SCHEME_AGENT (žr. `docs/development/SCHEME_AGENT.md`).
- Jei keičiasi **tekstas diagramoje** (žingsnių pavadinimai, pavyzdžio etiketės) ir jie saugomi JSON – DATA_AGENT sinchronizuoja su turinio SOT; jei tekstas hardcodintas layout/diagram komponente – CONTENT_AGENT / CODING_AGENT.

**Schemų skaidrėse – kas keičia ką:** Turinys (tekstai, žingsnių pavadinimai), saugomas JSON arba skaidrės body – sinchronizuoja **DATA_AGENT** su turinio SOT. Geometrija (koordinatės, viewBox, blokų matmenys, rodyklės) – **SCHEME_AGENT**; layout failai nepriklauso nuo modules.json. Pilnas atsakomybių skirtynas: `docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md`, `docs/development/SCHEME_AGENT.md` §2.1.

**Schemų geriausios praktikos (tikrinimui):** Centravimas viewBox (START_X taip, kad turinys būtų horizontaliai centre), teksto telpimas į blokus (tspan laužymas, PAD_TOP/LINE_HEIGHT), lygmenų tarpai (didesnis tarpas tarp eilučių), vertikalus grid bloke (32/24/16px). Pilnas sąrašas: `docs/development/SCHEME_AGENT.md` §3, `docs/development/LLM_DIAGRAMOS_VIZUALUS_VERTINIMAS.md`.
