# Architektūros 1-6 / 7-15 tvarkymo planas

> **Tikslas:** Viena vieta sutarti, kaip po architektūros pakeitimo turi veikti duomenų failai, agentai ir darbo tvarka.  
> **Statusas:** Darbinis planas įgyvendinimui. **Sprendimas A patvirtintas:** `modules.json` lieka full redagavimo SOT, o `*-m1-m6.json` failai lieka core build/runtime profiliui.  
> **Atnaujinta:** 2026-03-11

---

## 1. Kodėl šis failas reikalingas

Po architektūros pakeitimo reikia aiškiai atskirti:

- **kas jau realiai veikia kode**,  
- **kas dar liko senoje dokumentacijos / agentų logikoje**,  
- **kokia turi būti nauja standartinė tvarka**.

Šiuo metu repo jau turi **core 1-6** profilį (`modules-m1-m6.json`, `glossary-m1-m6.json`, `tools-m1-m6.json`) ir build lygiu moka jo laikytis per `VITE_MVP_MODE=1`.  
Tačiau daug dokumentacijos ir agentų instrukcijų vis dar aprašo seną modelį, kuriame pagrindinė duomenų tiesa yra tik `src/data/modules.json`.

Todėl šis failas skirtas:

- suvienodinti terminus,
- sutarti dėl naujo Source of Truth,
- susidėlioti agentų seką,
- apsibrėžti, ką reikia peržiūrėti prieš tęsiant plėtrą.

---

## 2. Dabartinė padėtis

### 2.1 Kas jau veikia

- `vite.config.ts` ir `vitest.config.ts` per aliasus moka persijungti į **core 1-6** profilį.
- `src/data/modulesLoader.ts` krauna bazinį modulio duomenų failą per `@modules-data`.
- `scripts/validate-schema.mjs` jau validuoja:
  - `modules.json`
  - `modules-m1-m6.json`
  - `modules-en-m4-m6.json`
  - `glossary-m1-m6.json`
  - `tools-m1-m6.json`
  - `tools-en-m1-m6.json`
- Deploy dokumentacija jau aprašo `VITE_MVP_MODE=1` kaip core build profilį.

### 2.2 Kur buvo senas modelis

Prieš šią iteraciją senas modelis daugiausia buvo likęs:

- dokumentacijoje, kuri `src/data/modules.json` vadino vienintele duomenų tiesa visiems režimams,
- agentų gairėse, kurios DATA_AGENT siųsdavo dirbti tik su `modules.json`, `glossary.json`, `tools.json` be konteksto,
- README ir indeksuose, kurie neatskirdavo full authoring SOT nuo core build/runtime profilio.

Šios iteracijos tikslas – šias vietas suvienodinti, nekeičiant techninės architektūros į B modelį.

### 2.3 Pagrindinė rizika

Jei šios tvarkos nesuvienodinsime, toliau bus:

- redaguojami ne tie failai,
- agentai siūlys seną pipeline,
- dokumentacija meluos apie realią architektūrą,
- būsimi 7-15 darbai taps painūs.

---

## 3. Tikslinis modelis

Šį modelį laikome nauju standartu.

### 3.1 LT duomenys

- `src/data/modules.json` → **pilnas katalogas / full build / 1-15 / pagrindinis redagavimo SOT**
- `src/data/modules-m1-m6.json` → **core / production / MVP 1-6 / išvestinis build-runtime failas**

**Priimtas sprendimas A:** `modules.json` lieka pagrindinis full SOT, o `modules-m1-m6.json` aprašo core 1-6 profilį, kuris naudojamas per aliasus ir build/runtime kelyje.

**Darbo taisyklė dabar:**

1. Jei keičiamas pilnas katalogas arba turinys, pirmiausia redaguojamas `src/data/modules.json`.
2. `src/data/modules-m1-m6.json` nelaikomas pagrindiniu authoring failu.
3. Core 1-6 failai turi likti suderinti su full SOT ir runtime aliasais.

**Ateities galimybė, bet ne dabartinis standartas:** jei vėliau bus įvestas atskiras `src/data/modules-m7-m15.json`, tai bus atskira architektūrinė iteracija. Šiame etape `modules.json` netampa agregatu.

### 3.2 EN duomenys

Kol kas aiški ir veikianti schema yra:

- `modules-en.json` → M1-M3 EN
- `modules-en-m4-m6.json` → M4-M6 EN
- `modules-en-us-overrides.json` → US override

Jei 7-15 gaus EN palaikymą, ateityje reikės apsispręsti:

- ar bus `modules-en-m7-m15.json`,
- ar EN 7-15 bus laikomas atskirame full faile,
- ar 7-15 kurį laiką lieka LT-only.

---

## 4. Nauja darbo tvarka agentams

### 4.1 Bendra taisyklė

Prieš bet kokį darbą agentas turi atsakyti į 2 klausimus:

1. **Ar dirbame core 1-6 kelyje, ar full 1-15 kelyje?**
2. **Kur yra tikras redagavimo failas šiai užduočiai?**

Be šių 2 atsakymų negalima pradėti keisti JSON ar dokumentacijos.

### 4.2 CONTENT_AGENT

Turi tikrinti:

- ar užduotis liečia modulius 1-6,
- ar užduotis liečia 7-15,
- ar aprašomas pilnas katalogas, ar tik core profilis.

CONTENT_AGENT nebegali automatiškai rašyti „į `modules.json`“, jei užduotis aiškiai liečia tik core 1-6.

### 4.3 DATA_AGENT

Turi pirmiausia nustatyti:

- kuris failas yra redagavimo šaltinis,
- ar reikia sinchronizuoti kelis failus,
- ar validacija apima konkretų failą.

Minimalus naujas DATA_AGENT klausimų checklist:

- Ar keitimas skirtas `1-6`, `7-15`, ar `1-15`?
- Ar keitimas daromas redagavimo faile, ar agreguotame faile?
- Ar po pakeitimo schema vis dar validuojama?
- Ar README / docs nepaseno po pakeitimo?

### 4.4 CODING_AGENT

Turi tikrinti:

- ar runtime krauna tą failą, kurį laikome SOT,
- ar aliasai ir loaderiai atitinka sutartą modelį,
- ar MVP / core build neatsilieka nuo dokumentacijos.

### 4.5 QA_AGENT

Turi prižiūrėti:

- README,
- `docs/DOCUMENTATION_QUICK_REF.md`,
- `docs/development/AGENT_ORCHESTRATOR.md`,
- `docs/deployment/DEPLOYMENT.md`,
- `docs/deployment/INTEGRATION_OVERVIEW.md`,
- `docs/development/CODEBASE_WHAT_IS_DONE.md`,
- `TODO.md`.

Jei keičiasi architektūra, QA_AGENT turi atnaujinti aprašą tą pačią iteraciją, ne „vėliau“.

---

## 5. Nauja vykdymo seka

Jei užduotis liečia architektūrą, failų atskyrimą ar agentų tvarką:

1. **CODE_REVIEW_AGENT / diagnozė**
   Patvirtina, kaip veikia dabartinis loaderis, aliasai, validacija, testai, docs.

2. **QA_AGENT / SOT ir dokumentacijos sprendimas**
   Užrašo ir prižiūri galiojančią taisyklę:
   - `modules.json` = full redagavimo SOT
   - `modules-m1-m6.json` = core build/runtime failas
   - būsimas `modules-m7-m15.json` = tik ateities opcija, ne dabartinis standartas

3. **DATA_AGENT**
   Sulygina JSON struktūrą, validaciją, scripts, build aliasus.

4. **CODING_AGENT**
   Jei reikia, atnaujina loaderius, aliasus, testus, runtime pasirinkimo logiką.

5. **QA_AGENT**
   Atnaujina README, deployment ir agentų tvarkas.

---

## 6. Failai, kuriuos būtina peržiūrėti

### 6.1 Kodo lygis

- `src/data/modulesLoader.ts`
- `vite.config.ts`
- `vitest.config.ts`
- `scripts/validate-schema.mjs`
- `tsconfig.json`

### 6.2 Dokumentacijos lygis

- `README.md`
- `docs/DOCUMENTATION_QUICK_REF.md`
- `docs/development/AGENT_ORCHESTRATOR.md`
- `docs/development/CODEBASE_WHAT_IS_DONE.md`
- `docs/deployment/DEPLOYMENT.md`
- `docs/deployment/INTEGRATION_OVERVIEW.md`
- `TODO.md`

### 6.3 Agentų / taisyklių lygis

- `.cursor/rules/agent-orchestrator.mdc`
- DATA_AGENT susiję doc failai
- bet kurie planai, kurie mini `modules.json` kaip vienintelį JSON šaltinį

---

## 7. Priimtas sprendimas

Prieš tęsiant darbus buvo pasirinktas **Sprendimas A**:

### Sprendimas A

`modules.json` lieka **pilno katalogo redagavimo SOT**, o `modules-m1-m6.json` lieka **core build/runtime failas**.

Todėl:

- dokumentacijoje reikia tai aiškiai pasakyti,
- agentams reikia uždrausti painioti core failą su pilnu SOT,
- 7-15 toliau lieka full faile, kol nebus atskiros naujos architektūrinės iteracijos.

### Sprendimas B

Šioje iteracijoje **nepasirinktas**. Jei prie jo kada nors pereisime:

- reikės atnaujinti loaderius,
- reikės įtraukti naują schema validation žingsnį,
- reikės perrašyti README, agentų taisykles ir generavimo grandinę.

---

## 8. Siūloma minimali tvarkymo iteracija

Kad nebūtų per didelio diff vienu kartu, siūloma tokia seka:

### Iteracija 1 – susitarimas

- Patvirtintas modelis **A**.
- Šį failą laikyti darbine atrama dokumentacijos ir agentų taisyklių suvienodinimui.

### Iteracija 2 – dokumentacija

- Atnaujinti:
  - `README.md`
  - `docs/DOCUMENTATION_QUICK_REF.md`
  - `docs/development/AGENT_ORCHESTRATOR.md`
  - `docs/development/CODEBASE_WHAT_IS_DONE.md`
  - `docs/deployment/DEPLOYMENT.md`

### Iteracija 3 – technika

- Šioje iteracijoje techninės architektūros nekeisti, jei dokumentacija jau gali tiksliai aprašyti esamą realybę.
- `modulesLoader.ts`, `validate-schema.mjs`, testai ir aliasai lieka dabartinio `A` modelio atrama.

### Iteracija 4 – agentai ir disciplina

- Atnaujinti agentų docs / rules, kad:
  - nebevadintų `modules.json` vienintele tiesa,
  - prieš JSON keitimus nustatytų, ar dirbama su `1-6`, `7-15`, ar `1-15`.

---

## 9. Done kriterijai

Architektūros peržiūra laikoma sutvarkyta tik kai:

- README ir docs aiškiai aprašo naują modelį,
- agentų instrukcijose nebėra klaidinančio „viskas per `modules.json`“,
- build ir testai tikrina tikrąją dabartinę struktūrą,
- DATA_AGENT ir QA_AGENT turi aiškų checklist,
- žmogus iš šalies gali per 2 minutes suprasti:
  - kur redaguoti 1-6,
  - kur redaguoti 7-15,
  - kas yra full build,
  - kas yra core build.

---

## 10. Rekomendacija dabar

**Pirmas žingsnis:** neliesti loaderių ir generatorių, nes šiai iteracijai pakanka užfiksuoti modelį A dokumentacijoje ir agentų taisyklėse.  
**Praktinis sekantis darbas:** pirmiausia sutvarkyti dokumentaciją ir agentų aprašus, kad visi toliau dirbtų su tuo pačiu supratimu.

Kol tai nepadaryta, rizikinga toliau plėsti 7-15 arba dalinti authoring failus į naują architektūrą.
