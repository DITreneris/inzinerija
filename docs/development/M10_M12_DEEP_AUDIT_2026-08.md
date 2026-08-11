# M10–M12 gilus auditas: skaidrė po skaidrės

> **Data:** 2026-08-11
> **Apimtis:** Modulis 10 (31 sk.) + Modulis 11 (5 sk.) + Modulis 12 (11 sk.) = **47 skaidrės**
> **Šaltiniai (live):** `src/data/modules.json`, `modules-en-m10-m12.json`, `tools.json`, `diagramRenderers` + `src/components/slides/shared/*`
> **SOT:** `docs/turinio_pletra_moduliai_10_11_12.md`, `docs/MODULIO_10_SKAIDRIU_EILES.md`, `GOLDEN_STANDARD.md`, `TEACHING_ELEMENTS_REGISTRY.md`, `DIAGRAMU_M7_M12_REGISTRY.md`
> **Pirmtakas:** `M10_SLIDE_RANKING_AUDIT.md` (2026-07-26) – tik M10, po W3a. Šis auditas **pakeičia** jį ir pirmą kartą padengia M11 + M12.
> **Rubrika:** ta pati užšaldyta 5 ašių rubrika (UI / UX / Journey / Maturity / TE, 1–5). Žr. pirmtako §1.
> **Statusas 2026-08-11:** ✅ Batch A–F remediacija pritaikyta; `npm run audit:release-preflight` green; `test:run` 160/966.

---

## 1. Vadovo santrauka

| Rodiklis                       | Reikšmė       |
| ------------------------------ | ------------- |
| Bendras vidurkis (47 sk.)      | **3.83**      |
| M10 (31 sk.)                   | **3.86**      |
| M11 (5 sk.)                    | **3.84**      |
| M12 (11 sk.)                   | **3.73**      |
| Rework flag (bet kuri ašis ≤2) | **1** – `124` |
| Skaidrės ≤3.4                  | **10**        |
| Mechaniniai vartai             | **visi žali** |

**Vieno sakinio diagnozė:** chrome ir mechanika nepriekaištingi (footeriai, accent biudžetas, EN parity, TE registry – 100 % švarūs), todėl silpniausias sluoksnis nebėra „sulaužyta struktūra“, o **turinio priklausomybių inversijos, pasenęs įrankių sluoksnis ir trūkstamas agentams specifinis saugumas**.

### Kas jau gerai (nekeisti)

- Visi 31 M10 footeriai turi teisingą 1-based numerį ir ≤50 simbolių. 0 neatitikimų visuose trijuose moduliuose.
- `audit:m1012`, `audit:accent-budget:m1012`, `audit:teaching-elements --strict` – OK.
- Etalonai, kurie laiko modulio kokybę: `10.26` žmogaus kontrolės simuliatorius, `10.66` QC vertintojas, `122` Augment praktika, `124.5` greitas startas.
- Path Test Shell M11 struktūriškai teisingas (110 → 110.5 → 111 → 112 → 113 bonus).

---

## 2. Mechaniniai vartai (patikrinta šio audito metu)

| Vartai                                               | Rezultatas                             |
| ---------------------------------------------------- | -------------------------------------- |
| `npm run audit:m1012` (EN coverage + EN/LT language) | OK, 0 pažeidimų                        |
| `npm run audit:accent-budget:m1012`                  | OK                                     |
| `npm run audit:teaching-elements --strict`           | OK (inventory ↔ overlay sutampa)       |
| Footer N = UI pozicija (§3.6)                        | 47/47 OK; ilgiausias 50 sim. (riba 55) |
| EN overlay padengimas M10–12                         | 47/47 skaidrės turi EN                 |
| `relatedSlideId` M11 testo klausimuose               | 9/9 yra                                |

Išvada: **JSON žalia**. Visos žemiau esančios problemos yra turinio / pedagogikos / sekos lygmens, jų neaptinka nė vienas esamas skriptas.

---

## 3. Scored registry

### 3.1 Modulis 10 (31 skaidrė)

| UI  | id     | Tipas                   | UI  | UX  | J   | Mat | TE  | Avg     | Pagrindinė problema                                                                |
| --- | ------ | ----------------------- | --- | --- | --- | --- | --- | ------- | ---------------------------------------------------------------------------------- |
| 1   | 100    | action-intro            | 4   | 4   | 4   | 4   | 4   | **4.0** | Onboarding švarus                                                                  |
| 2   | 10.1   | content-block           | 3   | 3   | 4   | 4   | 4   | **3.6** | Trumpai = 11 temų rodyklių grandinė; syllabus dump                                 |
| 3   | 10.2   | content-block           | 3   | 4   | 4   | 4   | 4   | **3.8** | Pažada „atsidarys modale“ – modalo nėra (S1)                                       |
| 4   | 10.21  | path-step               | 4   | 4   | 4   | 4   | 4   | **4.0** | Path 1/3 OK                                                                        |
| 5   | 10.22  | warm-up-quiz            | 4   | 4   | 4   | 4   | 4   | **4.0** | Q2 dubliuojasi su 10.61 Q2 (S5)                                                    |
| 6   | 10.25  | content-block           | 3   | 3   | 4   | 4   | 4   | **3.6** | 8 sekcijos / 354 ž. – ankstyvas tankis                                             |
| 7   | 10.255 | content-block (lab)     | 4   | 4   | 3   | 4   | 4   | **3.8** | „Lab'as“ anglicizmas; profilis niekur toliau nenaudojamas                          |
| 8   | 10.26  | content-block (lab)     | 4   | 5   | 5   | 4   | 5   | **4.6** | Etalonas                                                                           |
| 9   | 10.3   | content-block           | 4   | 4   | 4   | 4   | 4   | **4.0** | Pilnas ciklas OK                                                                   |
| 10  | 10.45  | content-block (lab)     | 4   | 4   | 4   | 4   | 4   | **4.0** | Dvigubas gylio pasirinkiklis (SVG pills + ChoiceControl)                           |
| 11  | 10.451 | path-step               | 4   | 4   | 4   | 4   | 4   | **4.0** | Path 2/3 OK                                                                        |
| 12  | 10.48  | content-block           | 4   | 4   | 4   | 4   | 4   | **4.0** | TCB veikia; 5 beveik vienodi šablonai                                              |
| 13  | 10.485 | warm-up-quiz            | 4   | 4   | 4   | 4   | 4   | **4.0** | „workflow“ shortTitle (S4)                                                         |
| 14  | 10.482 | content-block           | 4   | 4   | 3   | 3   | 5   | **3.8** | Stipri schema, **jokio artefakto** – nėra ką išsinešti                             |
| 15  | 10.481 | section-break           | 4   | 4   | 4   | 4   | 4   | **4.0** | Recap OK                                                                           |
| 16  | 10.49  | content-block           | 4   | 4   | 4   | 4   | 4   | **4.0** | Mokymosi ciklas OK                                                                 |
| 17  | 10.4   | content-block           | 4   | 3   | 3   | 3   | 3   | **3.2** | **Pasenęs įrankių sluoksnis** (S2); dubliuoja 10.3 Patikrą                         |
| 18  | 10.5   | content-block           | 4   | 3   | 3   | 3   | 4   | **3.4** | Flagship 5 dalių šablonas **collapsed by default**, o 10.51 jo reikalauja (S3)     |
| 19  | 10.51  | path-step               | 4   | 4   | 4   | 5   | 4   | **4.2** | Auksinė patikra – stipru                                                           |
| 20  | 10.6   | content-block           | 4   | 4   | 4   | 4   | 4   | **4.0** | Saugikliai OK                                                                      |
| 21  | 10.61  | warm-up-quiz            | 4   | 4   | 3   | 4   | 4   | **3.8** | Q2 = 10.22 Q2 perfrazavimas (S5)                                                   |
| 22  | 10.15  | content-block           | 3   | 3   | 3   | 4   | 4   | **3.4** | Sąvokos ateina **po** to, kai jų jau prireikė 10.5/10.51 (S3)                      |
| 23  | 10.151 | section-break           | 4   | 4   | 4   | 4   | 4   | **4.0** | Section-break OK                                                                   |
| 24  | 10.35  | content-block           | 3   | 3   | 3   | 4   | 4   | **3.4** | 9 sekcijos, medis + TCB + 4 šablonai; Zapier nėra kataloge (G11)                   |
| 25  | 10.36  | content-block           | 3   | 3   | 3   | 4   | 4   | **3.4** | Tankiausia M10 skaidrė: 469 ž., 2 lentelės, TCB, preCopy, 3 copy                   |
| 26  | 10.37  | content-block · opt     | 4   | 4   | 4   | 4   | 4   | **4.0** | Slim optional OK                                                                   |
| 27  | 10.64  | content-block           | 4   | 4   | 4   | 5   | 4   | **4.2** | MUST artefaktas; UI niekaip nepažymi, kad tai bilietas į M12                       |
| 28  | 10.65  | content-block · **opt** | 3   | 3   | 3   | 4   | 4   | **3.4** | Vienintelis saugumo turinys – ir jis neprivalomas, nors M12/123 jo reikalauja (S3) |
| 29  | 10.66  | evaluator-prompt-block  | 4   | 4   | 5   | 5   | 4   | **4.4** | Etalonas                                                                           |
| 30  | 10.7   | glossary · opt          | 4   | 4   | 4   | 4   | 4   | **4.0** | 21 terminas – gerai                                                                |
| 31  | 10.8   | summary                 | 4   | 4   | 4   | 3   | 4   | **3.8** | Stat „Pritaikymo pavyzdžiai 12“ – skaidrėje jų 9 (G9)                              |

**M10 Avg: 3.86**

### 3.2 Modulis 11 (5 skaidrės)

| UI  | id    | Tipas               | UI  | UX  | J   | Mat | TE  | Avg     | Pagrindinė problema                                                  |
| --- | ----- | ------------------- | --- | --- | --- | --- | --- | ------- | -------------------------------------------------------------------- |
| 1   | 110   | test-intro          | 4   | 4   | 4   | 4   | 4   | **4.0** | Slenkstis ir CTA aiškūs                                              |
| 2   | 110.5 | warm-up-quiz        | 4   | 4   | 3   | 4   | 3   | **3.6** | 3/3 diagnostiniai; **nėra forward bridge į M12** – §3.4a1 pažeidimas |
| 3   | 111   | test-section        | 4   | 4   | 3   | 3   | 4   | **3.6** | Padengimo skylės + dubliai (S6)                                      |
| 4   | 112   | test-results        | 4   | 4   | 4   | 4   | 4   | **4.0** | Remediation chips OK                                                 |
| 5   | 113   | content-block · opt | 4   | 4   | 4   | 4   | 4   | **4.0** | Bonus pilnas ciklas OK                                               |

**M11 Avg: 3.84**

### 3.3 Modulis 12 (11 skaidrių)

| UI  | id      | Tipas               | UI  | UX  | J     | Mat   | TE  | Avg     | Pagrindinė problema                                                        |
| --- | ------- | ------------------- | --- | --- | ----- | ----- | --- | ------- | -------------------------------------------------------------------------- |
| 1   | 120     | practice-intro      | 4   | 4   | 4     | 4     | 4   | **4.0** | ROI skaičiuoklė yra; `recommendedSlideIds` eilė ≠ UI eilė                  |
| 2   | 120.25  | content-block       | 3   | 4   | 4     | 3     | 3   | **3.4** | „chip“ ×6 mokinio tekste **ir copyable viduje**; vienintelė statinė schema |
| 3   | 120.5   | content-block       | 3   | 4   | 3     | 3     | 4   | **3.4** | Klaidingas enlarge pažadas; ~dubliuoja 10.482                              |
| 4   | 120.55  | path-step           | 4   | 4   | 4     | 4     | 4   | **4.0** | Kontrolinis taškas OK                                                      |
| 5   | 124.5   | practice-scenario   | 4   | 4   | 5     | 5     | 4   | **4.4** | Etalonas – be įrankių, su Įgūdžio paketu                                   |
| 6   | **124** | practice-scenario   | 4   | 3   | **2** | **2** | 3   | **2.8** | **REWORK** – 100 % dublikatas + blokuoja privalomą kelią (S7)              |
| 7   | 121     | practice-scenario   | 4   | 4   | 4     | 4     | 4   | **4.0** | Stipru; reikalauja Zapier/Make paskyros (S8)                               |
| 8   | 122     | practice-scenario   | 4   | 4   | 5     | 5     | 4   | **4.4** | Etalonas – kontrolės taisyklė + vertintojas + auditas                      |
| 9   | 123     | practice-scenario   | 4   | 4   | 3     | 4     | 4   | **3.8** | Priklauso nuo **neprivalomos** 10.65 (S3); reikia DI modulio platformoje   |
| 10  | 125     | content-block · opt | 4   | 3   | 3     | 2     | 3   | **3.0** | 3 generiniai mini promptai (11–16 ž.); mažiausia branda visame kelyje      |
| 11  | 128     | summary             | 4   | 4   | 4     | 3     | 4   | **3.8** | Stat „Scenarijai 3“ klaidina (jų 5); nėra artefakto vertinimo vartų        |

**M12 Avg: 3.73**

---

## 4. Rangas: blogiausia → geriausia

### 4.1 Bottom 12 (taisytina)

| #   | id                      | Avg | Diagnozė vienu sakiniu                                                                                                                                                   | Savininkas           |
| --- | ----------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| 1   | **124**                 | 2.8 | Prompto šablonas **byte-identiškas** 10.5 copyable; `recommended: false`, bet **ne** `optional`, todėl įsiterpia tarp greito starto ir 3 privalomų praktikų.             | CURRICULUM → DATA    |
| 2   | **125**                 | 3.0 | Neprivalomas M10 pakartojimas iš 3 generinių promptų („META: [ROLĖ]. INPUT: [DUOMENYS].“) – žemiausia branda visame kelyje.                                              | CONTENT              |
| 3   | **10.4**                | 3.2 | Platformų gebėjimai aprašyti 2024 m. kadru (Browse / Tools / Workspace); nė vieno žodžio apie jungtis, MCP ar agentinius režimus. Patikra dubliuoja 10.3.                | CONTENT              |
| 4   | **10.5**                | 3.4 | Vienintelis Flagship 5 dalių agentinis šablonas paslėptas `collapsedByDefault: true` bloke „Neprivaloma“, nors kitos skaidrės (10.51) minimalus artefaktas = būtent jis. | CONTENT → DATA       |
| 5   | **10.15**               | 3.4 | Trigger / Condition / Action / Webhook pristatomi UI 22 iš 31 – po to, kai 10.5 ir 10.51 jau prašė „workflow specifikacijos juodraščio“.                                 | CURRICULUM           |
| 6   | **10.35**               | 3.4 | 9 sekcijos: medis + TCB + 4 beveik identiški šablonai + „Daugiau“ – antras tankio pikas.                                                                                 | CONTENT / UI_UX      |
| 7   | **10.36**               | 3.4 | Tankiausia modulio skaidrė (469 ž., 2 lentelės, TCB, preCopy, 3 copyable) – ir ji MUST kelyje.                                                                           | CONTENT              |
| 8   | **10.65**               | 3.4 | Vienintelė saugumo / testavimo skaidrė pažymėta **optional**, nors M12/123 praktika tiesiogiai nurodo į jos incidentų planą.                                             | CURRICULUM           |
| 9   | **120.25**              | 3.4 | Implementacijos žargonas „chip“ ×6 mokinio tekste ir **copyable artefakto viduje**; `m12_three_labs` – vienintelė visiškai statinė schema kelyje.                        | CONTENT / SCHEME     |
| 10  | **120.5**               | 3.4 | Melagingas enlarge pažadas; turinys iš esmės pakartoja 10.482 orkestravimą modulis vėliau.                                                                               | CONTENT / SCHEME     |
| 11  | **10.1**                | 3.6 | Trumpai = 11 temų rodyklių grandinė viename accent bloke; ankstyviausias cognitive dump.                                                                                 | CONTENT              |
| 12  | **10.25 / 110.5 / 111** | 3.6 | 10.25 tankis; 110.5 be forward bridge; 111 padengimo skylės.                                                                                                             | CONTENT / CURRICULUM |

### 4.2 Top 6 (etalonai – naudoti kaip šabloną taisant)

| #   | id        | Avg | Kodėl veikia                                                                                                    |
| --- | --------- | --- | --------------------------------------------------------------------------------------------------------------- |
| 1   | **10.26** | 4.6 | Scenarijus × režimas matrica, neatitikimo grįžtamasis ryšys, klaidos simuliacija, copy artefaktas lab’o viduje. |
| 2   | **10.66** | 4.4 | Vienas promptas vertina kitą artefaktą – eval-as-habit su lentelės formatu.                                     |
| 2   | **124.5** | 4.4 | Kelių agentų praktika **be jokių įrankių** + Įgūdžio paketas pakartotiniam naudojimui.                          |
| 2   | **122**   | 4.4 | Vienintelė praktika, sujungianti promptą + kontrolės taisyklę + vertintoją + audito įrašą.                      |
| 5   | **10.51** | 4.2 | Auksinė patikra su kraštiniu atveju – reta ir vertinga.                                                         |
| 5   | **10.64** | 4.2 | Flagship 98 žodžių specifikacijos šablonas su B/C dalimis.                                                      |

---

## 5. Sisteminės problemos

### S1 · Melagingi „peržiūrėk pilname dydyje“ pažadai (5 vietos)

`EnlargeableDiagram` `showEnlargeControl` numatytoji reikšmė – `false`, ir **nė vienas** M10/M12 rendereris jos neperduoda kaip `true` (patikrinta grep’u per visą `src/`). Desktopo modalo nėra; mobile yra tik scroll/reflow.

Vis dėlto skaidrių tekstas jį pažada:

| Skaidrė | Tekstas                                                    |
| ------- | ---------------------------------------------------------- |
| `10.2`  | „Peržiūrėk visą dydį – tas pats vaizdas atsidarys modale.“ |
| `10.15` | „**Peržiūrėti pilname dydyje** – tas pats vaizdas modale.“ |
| `10.65` | tas pats ×2 (workflow spec + incident playbook)            |
| `120.5` | „**Peržiūrėti pilname dydyje** – tas pats vaizdas modale.“ |

**Taisymas:** pašalinti sakinį iš 5 vietų (LT + EN). SCHEME §3.11 sako, kad interaktyvioms Shell schemoms enlarge nereikia – taisyti tekstą, ne komponentą.

### S2 · Įrankių sluoksnis pasenęs vieneriais–dvejais metais

`10.4` „Populiarios DI platformos – ką turi“: _„ChatGPT: paieška (Browse), vaizdai, skaičiuoklė. Claude: Tools (paieška, API). Gemini: paieška, Workspace.“_

Tai vienintelė vieta modulyje, kur mokinys sužino, **kaip** DI gauna įrankius. Trūksta: jungčių / MCP sluoksnio, agentinių režimų vartotojo produktuose, failų ir atminties. Modulis apie „agentus su įrankiais“ negali turėti silpniausios skaidrės būtent apie įrankius. Žr. taip pat G1.

### S3 · Priklausomybių inversijos (3 atvejai)

| #   | Reikalauja                                                  | Bet reikalaujamas dalykas yra…                                         |
| --- | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | `10.51` „minimalus artefaktas = 5 dalių promptas“           | `10.5` bloke `collapsedByDefault: true`, pavadintame **„Neprivaloma“** |
| 2   | `M12/123` „nuoroda į incidentų planą (5 žingsniai)“         | `10.65` – **`optional: true`**, praleidžiama trumpame kelyje           |
| 3   | `10.5` / `10.51` prašo „workflow specifikacijos juodraščio“ | Trigger/Condition/Action sąvokos pristatomos tik `10.15` (UI 22)       |

Trumpą kelią pasirinkęs mokinys (`howToUseModule.short` aiškiai sako, kad praleidžia testavimo/saugumo skaidrę) į M12 ateina be incidentų plano, kurio jo privaloma praktika reikalauja.

### S4 · Terminologijos maišymas mokinio tekste (31 pataikymas)

| Žargonas                                      | ×   | Pavyzdys                                                              |
| --------------------------------------------- | --- | --------------------------------------------------------------------- |
| `workflow` (EN) šalia „darbo eiga“ (LT)       | 20  | `10.485` shortTitle „Savitikra: workflow“; `10.8` „Workflow šablonai“ |
| `Lab'as` / `Lab’e` (anglicizmas + apostrofas) | 3   | `10.255` „Lab'as sugeneruos…“, `10.45` „Lab’e pasirink gylį“          |
| `chip` (UI implementacijos terminas)          | 6   | `120.25` „Žmogaus chip:“ – **copyable artefakto viduje**              |

Modulis pats moko termino „darbo eiga“, o savo skirtukus vadina „workflow“. Apostrofinės formos prieštarauja projekto stiliaus taisyklei.

### S5 · Tas pats klausimas užduodamas tris kartus

„Kada užtenka paprasto prompto, o kada reikia agento?“ tikrinamas:

1. `10.22` Q2 – „Kada pakanka paprasto prompto, o ne agento?“
2. `10.61` Q2 – „Kada paprastas promptas paprastai užtenka?“ (tie patys distraktoriai kitais žodžiais)
3. `M11/110.5` Q1 – „Kada verta rinktis agentą, o ne paprastą promptą?“

Trys iš dešimties formuojamųjų klausimų visame kelyje tikrina vieną sąvoką, o žemiau išvardytos sąvokos – nė vieno.

### S6 · M11 vertinamojo testo padengimas

9 klausimai, `relatedSlideId` pasiskirstymas:

| Padengta                                   | Kartų |
| ------------------------------------------ | ----- |
| `10.3` rolė / sisteminis promptas          | 2     |
| `10.45` gylis ir rolės                     | 2     |
| `10.6`, `10.48`, `10.15`, `10.26`, `10.49` | po 1  |

**Nepadengta vertinamajame teste:** `10.25` **3A strategija** (centrinis modulio modelis, minimas M12 intro, 120.25 ir santraukoje), `10.64` **minimalus eigos aprašymas** (vienintelis MUST artefaktas → M12), `10.35`/`10.36` įrankio ir paleidimo pasirinkimas, `10.482` orkestravimas, `10.2` ciklas.

Testas, kuris nustato pasirengimą M12, netikrina nė vieno iš dviejų dalykų, kurių M12 realiai reikalauja (3A juostos pasirinkimo ir 1 psl. specifikacijos).

Papildomai: `110.5` warm-up pagal GOLDEN §3.4a1 turi būti **2 diagnostiniai + 1 tiltas į projektą**; live – 3 diagnostiniai, tilto nėra.

### S7 · `124` blokuoja privalomą M12 kelią

- `practicalTask.template` (176 sim.) **byte-identiškas** `10.5` copyable tekstui – patikrinta programiškai.
- `recommended: false`, bet `optional` **nenustatytas** → skaidrė lieka pagrindiniame sraute.
- Pozicija UI 6: tarp rekomenduojamo starto (`124.5`) ir trijų privalomų praktikų (`121`–`123`).

Rezultatas: mokinys, einantis nuosekliai, po greito starto atsimuša į pakartotinį M10 promptą prieš pasiekdamas tai, kas įskaitoma į modulio užbaigimą (`minScenariosToComplete: 3`).

### S8 · Privalomas M12 kelias reikalauja išorinių paskyrų, o alternatyvos nėra

`minScenariosToComplete: 3` = `121` + `122` + `123`. Jų `constraints`:

- `121`: „Naudok Zapier arba Make (užtenka nemokamo lygio)“
- `122`: „Naudok Make arba Zapier **su DI moduliu**“
- `123`: „Naudok Make, n8n arba Zapier su DI moduliu“

`124.5` yra puikus „be įrankių“ kelias – bet jis `recommended`, ne įskaitomas. Korporatyviniam mokiniui, kuriam IT neleidžia registruoti SaaS paskyros, modulis techniškai neužbaigiamas. Sprendimas nėra „nuleisti kartelę“ – reikia arba leisti `124.5` + 1 praktiką kaip alternatyvų užbaigimą, arba kiekvienai praktikai pridėti „popierinį“ variantą (specifikacija + bandymo atvejai be gyvo srauto).

### S9 · Rendererių skola

Detalus rendererių auditas (14 komponentų):

| Problema                              | Vieta                                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 4 identiški ~60 eilučių Block fasadai | `M10TriggerFlowBlock` / `M10WorkflowSpecBlock` / `M10IncidentPlaybookBlock` / `M10LearningLoopBlock`, visi L28–63 |
| Statinė schema be sąveikos            | `M12ThreeLabsDiagram.tsx` – 0 paspaudžiamų elementų, `role="img"`; hardcoded `#ffffff` L36                        |
| Dvigubas scenarijaus pasirinkiklis    | `M10HumanControlSimulatorBlock.tsx` L147–158 (RiskStrip) vs L161–169 (ChoiceControl)                              |
| Dvigubas gylio pasirinkiklis          | `M10DepthRolesMiniDiagram.tsx` L162–171 vs `M10DepthRolesLabBlock.tsx` L77–84                                     |
| SVG hit’ai nepasiekiami klaviatūra    | `diagramKit.tsx` L140–160 (`DiagramStepHitArea` – tik pelė, `aria-hidden`); klaviatūra veikia per Shell nav       |

Silpniausia schema: `m12_three_labs` (statinis plakatas). Stipriausios: `m10_agent_orchestrator`, `m10_human_control_simulator`.

---

## 6. Kas nepadengta (gaps)

### 6.1 Turinio spragos – rinkos / praktikos lygmuo

| #      | Spraga                                         | Įrodymas                                                              | Kodėl svarbu                                                                                                                                 |
| ------ | ---------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **G1** | **MCP / jungčių sluoksnis**                    | `MCP` M10–12: **0**; M17: 2, M18: 1                                   | Produktas jau moko MCP kodo take’e; verslo agentų modulis apie „DI su įrankiais“ jo nemini nė karto                                          |
| **G2** | **Prompt injection per įrankius**              | `injekcij`/`prompt injection` M10–12: **0**; M7: 10                   | Didžiausia agentams **specifinė** rizika. 10.65 dengia asmens duomenis ir prieigą, bet ne netiesioginę injekciją iš įrankio grąžinto turinio |
| **G3** | **Paleidimo kaina ir modelio pasirinkimas**    | `token`/`sąnaud` M10–11: 0; „kaina“ M12 – tik ROI įrankio prenumerata | Nėra „pigus modelis klasifikacijai, stiprus rašymui“ – tiesioginė daugiaagentės sistemos kainos svirtis                                      |
| **G4** | **Atmintis ir būsena tarp žingsnių**           | `atmintis`/`memory` M10–12: **0**; M4: 23                             | 10.49 „veiksmų istorija“ – vienintelis prisilietimas; nėra konteksto lango / būsenos perdavimo tarp rolių                                    |
| **G5** | **Struktūrizuotas perdavimas (JSON / schema)** | `120.5` sako tik „Formatas: [FORMATAS]“                               | Kelių agentų perdavimas be schemos yra pagrindinė gamybinio lūžio priežastis                                                                 |
| **G6** | **Evals / regresijos rinkinys**                | „auksinė patikra“ – 1 kartas (`10.51`); `10.65` – 3 ad hoc testai     | Nėra pakartojamo vertinimo rinkinio sąvokos, nors 10.49 mokymosi ciklas jos logiškai reikalauja                                              |
| **G7** | **Stebėsena ir gedimų signalizacija**          | `10.65` audito žurnalas; incidentų planas                             | Nėra „kas pastebi, kad srautas nutrūko 3 val. nakties“ – savininkas, alertas, SLA                                                            |
| **G8** | **Atitiktis (DI aktas / reglamentavimas)**     | `AI Act` M10–12: **0**; M4, M7, M13, M14: po 1                        | Būtent šis modulis automatizuoja sprendimus dėl asmens duomenų; corporate12 auditorija to klausia                                            |

### 6.2 SOT pažadėta, bet gyvai nėra

| #       | Spraga                                                                                                                      | SOT                   | Gyvai                                                                                                                                                                                                                                                                        |
| ------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **G9**  | 10.8 „12 pritaikymo pavyzdžių“ tinklelis (4 sritys × 3)                                                                     | `turinio_pletra` §6   | Stat rodo **12**, skaidrėje – **9** punktai per 3 sekcijas; tinklelio nėra                                                                                                                                                                                                   |
| **G10** | §11 SHOULD: master promptas + 3 variantai (Zapier / Make / n8n); observability nuoroda; duomenų modeliavimas ne techniniams | `turinio_pletra` §11  | Nė vieno iš trijų nėra                                                                                                                                                                                                                                                       |
| **G11** | Įrankių katalogas Agentų take’ui                                                                                            | `DATA_AGENT_TOOLS.md` | **Zapier priskirtas `moduleId: 4`**, nors M10 (10.35, 10.36) ir M12 (121–123) jį naudoja kaip pirmą pasirinkimą. M10 kataloge yra Make/n8n/Power Automate/Workato/UiPath – be Zapier. Taip pat nėra M12 praktikoms reikalingų Google Forms / Typeform / Slack / Teams / Jira |

### 6.3 Ko **nereikia** pridėti

Kad auditas neišvirstų į scope creep – šie dalykai sąmoningai už ribų: kodo rašymas agentams (M16–18 sritis), konkrečių platformų žingsnis-po-žingsnio tutorialai (senėja greičiau nei modulis atnaujinamas), naujos skaidrės tik dėl skaidrių skaičiaus.

---

## 7. Taisymo planas

Prioritetas = poveikis mokiniui ÷ pastangos. Kiekvienas batchas savarankiškas.

### Batch A — „Melas ir dublikatai“ (P0, mažos pastangos, tik DATA/CONTENT)

| #   | Veiksmas                                                                                              | Skaidrės                            |
| --- | ----------------------------------------------------------------------------------------------------- | ----------------------------------- |
| A1  | Pašalinti „peržiūrėti pilname dydyje / modale“ sakinius (LT + EN)                                     | `10.2`, `10.15`, `10.65`×2, `120.5` |
| A2  | `124` → `optional: true` **arba** perkelti po `123`; pakeisti šabloną (dabar 100 % `10.5` dublikatas) | `124`                               |
| A3  | `10.5` – 5 dalių šabloną iškelti iš „Neprivaloma“ collapsed bloko į matomą „Kopijuojamas promptas“    | `10.5`                              |
| A4  | Ištaisyti stat’us: `10.8` „12 pavyzdžių“, `128` „Scenarijai 3“                                        | `10.8`, `128`                       |
| A5  | `10.61` Q2 pakeisti klausimu apie 3A arba minimalią specifikaciją                                     | `10.61`                             |

**Vartai:** `audit:m1012`, `audit:accent-budget:m1012`, `validate:schema`.

### Batch B — Kalba ir žargonas (P1, CONTENT + DATA)

| #   | Veiksmas                                                                                                   |
| --- | ---------------------------------------------------------------------------------------------------------- |
| B1  | „workflow“ → „darbo eiga“ mokinio tekste (20 vietų); palikti EN tik ten, kur tai platformos UI pavadinimas |
| B2  | „Lab'as“ / „Lab’e“ → „šioje užduotyje“ / „žemiau“ (3 vietos)                                               |
| B3  | „chip“ → „žingsnis“ / „taškas“ (6 vietos, įskaitant `120.25` copyable)                                     |

### Batch C — Sekos ir priklausomybės (P1, CURRICULUM → DATA)

| #   | Veiksmas                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | Nuspręsti dėl `10.15`: arba perkelti prieš `10.5`, arba `10.5`/`10.51` nebeminėti „workflow specifikacijos“ iki `10.15`               |
| C2  | `10.65` incidentų planą (5 žingsniai) padaryti pasiekiamą iš MUST kelio – arba perkelti 5 žingsnius į `10.64`, arba nuimti `optional` |
| C3  | M12 užbaigimo taisyklė: leisti `124.5` + 1 praktiką kaip alternatyvą, arba kiekvienai praktikai pridėti „be platformos“ variantą      |

### Batch D — Vertinimo padengimas (P1, CURRICULUM + CONTENT)

| #   | Veiksmas                                                                                                                                                       |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | `111`: pakeisti vieną iš dviejų `10.3` klausimų ir vieną iš dviejų `10.45` klausimų → 3A juostos pasirinkimo scenarijus + minimalios specifikacijos scenarijus |
| D2  | `110.5` Q3 pakeisti į forward bridge į M12 („ką pirmiausia paruoši projektui?“) – §3.4a1 reikalavimas                                                          |

### Batch E — Turinio spragos (P2, didžiausias darbas)

| #   | Veiksmas                                                                                 | Kur                                    |
| --- | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| E1  | Atnaujinti `10.4`: jungtys / MCP / agentiniai režimai vietoj 2024 m. Browse/Tools sąrašo | `10.4`                                 |
| E2  | Pridėti įrankių injekcijos riziką prie saugumo turinio (G2)                              | `10.65` arba nauja MUST sekcija `10.6` |
| E3  | Kaina + modelio pasirinkimas žingsniui (G3)                                              | `10.35` „Daugiau“ arba `10.64`         |
| E4  | Struktūrizuotas perdavimo formatas (G5)                                                  | `120.5` perdavimo taisyklės šablone    |
| E5  | Atitiktis / DI aktas – 2–3 eilutės su nuoroda (G8)                                       | `10.65` arba `10.7` žodynėlis          |

### Batch F — Įrankių katalogas ir schemos (P2, DATA + SCHEME)

| #   | Veiksmas                                                                                                                                                  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1  | Zapier: peržiūrėti `moduleId` priskyrimą (dabar 4, naudojamas M10/M12); apsvarstyti M12 praktikoms reikalingus įrankius; po keitimo `npm run audit:tools` |
| F2  | `m12_three_labs` – arba padaryti Shell su 3 žingsniais, arba pripažinti statinę schemą ir perkelti aiškinimą į skaidrės tekstą                            |
| F3  | Panaikinti dvigubus pasirinkiklius `10.26` ir `10.45` lab’uose                                                                                            |
| F4  | Iškelti bendrą `linear-process` Block fabriką (4 fasadai)                                                                                                 |

---

## 8. Nuorodos

- Pirmtakas (superseded M10 daliai): [`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md)
- Eilė: [`docs/MODULIO_10_SKAIDRIU_EILES.md`](../MODULIO_10_SKAIDRIU_EILES.md)
- Turinio SOT: [`docs/turinio_pletra_moduliai_10_11_12.md`](../turinio_pletra_moduliai_10_11_12.md)
- TE: [`TEACHING_ELEMENTS_REGISTRY.md`](TEACHING_ELEMENTS_REGISTRY.md), [`DIAGRAMU_M7_M12_REGISTRY.md`](DIAGRAMU_M7_M12_REGISTRY.md)
- Lab specas: [`M10_TEAM_READINESS_LAB.md`](M10_TEAM_READINESS_LAB.md)
- Etalonas: [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) §3.2 / §3.4a1 / §3.6 / §3.8.1

```text
CHANGES: naujas M10–M12 gilus auditas – 47 skaidrės įvertintos, worst→best rangas, 9 sisteminės problemos, 11 spragų, 6 taisymo batchai
CHECKS: audit:m1012 OK; audit:accent-budget:m1012 OK; audit:teaching-elements --strict OK; footeriai 47/47 OK; EN parity 47/47
RISKS: UI balai struktūriniai (JSON + rendererių kodas), ne @375px vizualus smoke – M1012-2 tebėra atviras
NEXT: patvirtinti Batch A (P0, tik tekstas + 1 flag) prieš pradedant Batch C sekos sprendimus
```
