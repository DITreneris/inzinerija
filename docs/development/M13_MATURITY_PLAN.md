# M13 learner / content brandos planas

> **Failas:** `docs/development/M13_MATURITY_PLAN.md`  
> **Data:** 2026-08-04  
> **Statusas:** **done** (B1–B3 + EN + QA + `M13P-TRIM` 2026-08-04) – freeze po exit

> **Apimtis:** tik **Modulis 13** (24 skaidrės live `modules.json`). M14/M15 – atskiri epic’ai po M13 exit (nebent LHF sync).  
> **Turinio SOT:** [`turinio_pletra_moduliai_13_14_15.md`](../turinio_pletra_moduliai_13_14_15.md) · eilė [`MODULIO_13_SKAIDRIU_EILES.md`](../MODULIO_13_SKAIDRIU_EILES.md)  
> **Live:** `src/data/modules.json` (id 13) · EN `modules-en-m13-m15.json` via `build:modules-en-m13-m15`  
> **Tickets:** `TODO.md` §1.2j `M13-PLAIN-*`  
> **Ne šis planas:** nauji TE Pattern / lab; Density CI; corporate15 cut (jau ✅); M16 plain (EN+B1–B4 ✅; optional C deferred — **ne** šio dokumento struktūros etalonas).

---

## 0. Etalonai – ką kopijuojame (ir ko ne)

M16 learner plain planas (**open**, rezultatas nežinomas) **nėra** šio dokumento struktūros etalonas.

| Etalonas                                                                                                                           | Statusas                                 | Ką imame                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`M7_PROMPT_MATURITY.md`](M7_PROMPT_MATURITY.md) (**M7P**)                                                                         | ✅ done                                  | Kontraktas: Tikslas → Klasės → Inventorius → **Iteracijos I0…In** → Invariantai → **Nedaryti**                                    |
| [`M4_PROMPT_MATURITY.md`](M4_PROMPT_MATURITY.md) (**M4P**)                                                                         | ✅ done                                  | Fit-for-purpose juostos; inventorius `keep / trim / upgrade`; pass test „−30 %“                                                   |
| [`M1_M3_PROMPT_MATURITY.md`](M1_M3_PROMPT_MATURITY.md) (**M1P**)                                                                   | ✅ freeze                                | Freeze taisyklė po done; be antro „maturity rewrite“                                                                              |
| [`intake/M79_READABILITY_EXECUTION_PLAN.md`](intake/M79_READABILITY_EXECUTION_PLAN.md)                                             | ✅ done                                  | Soft density checklist (ne CI); worst-first sprintai; agentų kelias; aiškus Won’t                                                 |
| [`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md) §1 + [`M13_M15_SLIDE_RANKING_AUDIT.md`](M13_M15_SLIDE_RANKING_AUDIT.md) | ✅ + W1 done                             | 5 ašys UI/UX/Journey/Maturity/TE; **Top-N freeze → batch**; type-aware                                                            |
| [`M13_PROMPT_MATURITY.md`](M13_PROMPT_MATURITY.md) (**M13P**)                                                                      | ✅ aktyvus                               | Copyable Micro/Stage/Flagship/Lab – **lieka**; šis planas **neperrašo** M13P, o užpildo spragas                                   |
| [`intake/M13_M15_TOBULINIMO_INTAKE_2026-07.md`](intake/M13_M15_TOBULINIMO_INTAKE_2026-07.md)                                       | ✅ epic closed                           | I0→I5 chrome/cycle; šis epic = **kitas sluoksnis** (plain / intro / EN)                                                           |
| [`M16_MATURITY_PLAN.md`](M16_MATURITY_PLAN.md)                                                                                     | ✅ EN+B1–B4 exit 2026-08-04 (C deferred) | **Vis tiek ne struktūros etalonas** šiam failui – M16 planas buvo ilgas P/N/Pr/V esė formatas; M13 seka **M7P/M4P/M79** kontraktą |

**Šio epic’o pavadinimas:** learner **content / chrome / plain** brandumas (outcomes, titles, Trumpai, glossary, summary, EN stubs) — ne TE, ne naujos skaidrės, ne „ilgesni promptai“.

---

## 1. Diagnostika (kodėl reikia)

| Sluoksnis                     | Būsena     | Įrodymas                                                                   |
| ----------------------------- | ---------- | -------------------------------------------------------------------------- |
| Curriculum / eilė             | ✅ ~8/10   | MUST: 13.12 → 13.32 → 13.52 → audio → 13.101 → 13.11                       |
| TE (schemos, lab, gen)        | ✅ ~8/10   | S4-INDIV / S5-THIRDS / 13.325 / 13.37+13.47 meter – done                   |
| GOLDEN ciklas (dauguma MUST)  | ✅ ~7/10   | Po `M1315-W1` + dens soft                                                  |
| Copyable M13P klasės          | ✅ ~6.5/10 | Inventorių map yra; **trim audit backlog** (M13P)                          |
| Ranking 2026-07-28            | ⚠️         | Chrome/cycle gerai; **130 = 4.0 „Intro OK“** – **ne** plain maturity       |
| **LT plain / intro / titles** | ❌ ~3–4/10 | 130 keyword outcomes; EN H1 (`13.32`, `13.52`); 13.9 seni; glossary spraga |
| **EN body / outcomes**        | ❌ ~2/10   | `build-en-m13-m15.mjs`: visi `.outcomes[]` → **vienas** stub sakinys ×3    |

**Root cause (kaip M7 prieš M7P / M79):** TE + chrome epic’ai uždaryti; **learner first-screen ir EN spill** liko kaip „aukšto lygio compress“ + build stub. Tas pats klasės bug’as, kurį M10/M11 jau fiksavo DATA lessons (`AI agent step` placeholders).

**Canonical mokinio walkthrough (exit):** rinkodaros specialistas po ~25–30 min moka: (1) A/E/C pasirinkimą, (2) 6 žingsnių grandinės checklistą, (3) consistency refs ≥3, (4) 3–5 s I2V mintį, (5) teisių / DI žymos patikrą — **be** bare EN sienos intro.

---

## 2. Palyginimas su M7 (ką M7 jau įrodė)

M7 = branduolio kelias, kur **prompt branda (M7P) + skaitomumas (M79)** abu **uždaryti** su žinomu rezultatu. M13 turi TE/corporate, bet trūksta M7P-III lygio **chrome plain** + M7P-V lygio **EN gate**.

| Dimensija          | M7 (done)                   | M13 (dabar)                                       | M13 veiksmas šiame plane                        |
| ------------------ | --------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| Copyable klasės    | M7P F/S/R/L + journey slots | M13P Micro/Stage/Flagship/Lab                     | Trim audit = **M13P-TRIM** (po plain B1–B2)     |
| Intro outcomes     | Veiksmo kalba / nauda       | Keyword map (`Pipeline:…`)                        | **M13-PLAIN-B1** – kaip M1/M4 outcomes          |
| Plain titles       | M79 + `audit:slide-titles`  | EN H1 (`Character / product…`, `Post-production`) | Titles/shortTitle LT + gloss                    |
| Soft dens          | M79 checklist (ne CI)       | 13.3/13.4 dens ✅; kiti PARTIAL                   | Soft checklist §4 – be Density CI               |
| EN                 | Journey EN audit + core     | Outcomes stub generatorius                        | **Kill** `path.includes('.outcomes[')` generiką |
| Summary / glossary | Sinchronas su kelio stuburu | 13.9 seni; 13.8 be CPI/C2PA/I2V…                  | B2 exit sync                                    |
| Nedaryti           | Aiškus M7P §Nedaryti        | —                                                 | §9 žemiau                                       |
| Freeze po done     | M1P modelis                 | —                                                 | Po epic – keisti tik paste-run / kalbos FAIL    |

**Iš M7P darbo ritmo (kartoti):**

1. **I0** = kontraktas + inventorius (šis failas).
2. **Worst-first batch’ai** su DoD eilute (ne „visa M13 perrašyti“).
3. **Keep gylį** – collapsible / optional Flagship lieka; kerpamas žargonas be tiltų.
4. **EN + audit + CHANGELOG + lessons** = paskutinė iteracija (kaip M7P-5 / M4P-5).

---

## 3. Rubrika (užšaldyta) – 5 ašys + plain gate

Bazė = [`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md) §1. Šiame epic’e **Maturity** ašis praplečiama:

| Ašis         | 5 =                                     | 1 =                          | M13-PLAIN pastaba             |
| ------------ | --------------------------------------- | ---------------------------- | ----------------------------- |
| **UI**       | Chrome švarus; title LT; footer N       | EN H1; curriculum ID         | Titles = P0                   |
| **UX**       | Vienas darbas; Trumpai skenuojamas      | Keyword siena first viewport | Intro outcomes                |
| **Journey**  | Vertė + micro-win + transfer            | Friction dump                | Section-break nextSteps plain |
| **Maturity** | Fit copyable **ir** plain outcome kalba | List-echo / EN token dump    | = M13P + plain                |
| **TE**       | Teisingas Pattern (neliečiame jei ✅)   | Orphan / wrong kind          | **WON’T** keisti TE           |

**Type-aware (kaip M10):**  
`action-intro` / `section-break` / `glossary` / `summary` / `warm-up` – Maturity **ne** „nėra Flagship = 4 automatiškai“. Intro/summary **privalo** praeiti plain gate.

### 3.1 Plain gate (P0 – blokuoja „praeinama“)

Bet kuri skaidrė **FAIL**, jei:

1. Learner first-screen / outcomes = EN keyword sąrašas be veiksmažodžio (`Pipeline:`, `consistency, audio-first`).
2. Title / shortTitle – bare EN be LT atitikmens (`Character / product consistency`, `Post-production` kaip H1).
3. EN overlay outcomes / body = identiškas stub visiems punktams.
4. Summary / glossary **prieštarauja** 2026 MUST stuburui (nėra grandinės / C2PA / consistency, kai eilė juos moko).

### 3.2 Soft CONTENT checklist (iš M79 – be CI)

1. `Trumpai` ≤ 2 sakiniai; first viewport – paprasta kalba ([`PAPRASTOS_KALBOS_GAIRES.md`](PAPRASTOS_KALBOS_GAIRES.md)).
2. `Daryk` = konkretus veiksmas + šablonas / pratimas.
3. `Patikra` ≠ Trumpai echo.
4. Naujas EN terminas pirmą kartą: LT tiltas arba skliaustai.
5. Be curriculum/authoring meta body.
6. LT: **DI**, tu-forma; EN: **AI**, pilnas body (ne title-only).
7. Optional / legal / MASTER → collapsible; MUST veiksmas atviras.

---

## 4. Žodyno politika (M13)

| Terminas (gali likti body / diagramoje) | Privalomas tiltas pirmą kartą (intro / Trumpai / title) | Kur              |
| --------------------------------------- | ------------------------------------------------------- | ---------------- |
| Grandinė (ne bare `pipeline` H1)        | „Darbo eiga nuo užduoties iki patikros“                 | 130, 13.12       |
| Brief                                   | „Užduoties aprašas“                                     | 130, 13.12       |
| Kadrai / stills                         | „Kadrai (scenarijaus piešiniai)“                        | 13.12            |
| Referencai / refs                       | „Pavyzdžių nuotraukos (3–5 kampai)“                     | 13.32            |
| I2V                                     | „Video iš kadro (image-to-video)“                       | 13.12, 13.47     |
| Consistency                             | „Tas pats produktas / stilius serijoje“                 | 13.32 title      |
| Audio-first                             | „Pirma garsas (balsas ar fonas), tada kirpimai“         | 13.56, 13.6      |
| CPI                                     | „Kaina už tinkamą klipą (su retry)“                     | 13.5, glossary   |
| C2PA / disclosure                       | „DI žyma / Content Credentials“                         | 13.101, glossary |
| Post-production                         | „Montažas po generavimo“                                | 13.52 title      |
| KPI                                     | „Pagrindiniai rodikliai (KPI)“                          | 13.101           |
| VO / SFX / bed                          | „Balsas / efektai / foninė muzika“                      | 13.6–13.7        |

**Title taisyklė:** H1 = LT rezultatas; EN loanword – subtitle arba body su gloss (kaip M79 / plain gairės §2a).

---

## 5. Inventorius (24 sk.) – keep / kiss / rewrite

Legenda verdiktų (kaip M4P): **keep** · **kiss** (lengvas gloss) · **rewrite** · **kill-field** (pakeisti lauką, ne skaidrę).

| ID         | Tipas         | Verdiktas                | Prioritetas | Sprint | Pagrindinė spraga                                                      |
| ---------- | ------------- | ------------------------ | ----------- | ------ | ---------------------------------------------------------------------- |
| **130**    | action-intro  | **rewrite**              | **P0**      | B1     | Outcomes keyword dump; whyBenefit `pipeline`/`consistency`; EN stub ×3 |
| **13.1**   | content-block | **keep**                 | —           | —      | Etalonas A/E/C                                                         |
| **13.12**  | content-block | **keep** (+ kiss chrome) | P2          | B3     | Body OK; intro turi sekti šią kalbą                                    |
| **13.15**  | section-break | **kiss**                 | P1          | B1     | nextSteps EN (`Consistency — reference lock`)                          |
| **13.2**   | content-block | **keep**                 | —           | —      | Stage OK                                                               |
| **13.3**   | content-block | **kiss**                 | P2          | B3     | `aspect ratio` Trumpai                                                 |
| **13.31**  | warm-up       | **keep**                 | —           | —      |                                                                        |
| **13.32**  | content-block | **rewrite** title        | **P0**      | B1     | H1/subtitle EN; Trumpai EN-heavy                                       |
| **13.325** | lab           | **keep**                 | —           | —      | MARRY TE                                                               |
| **13.33**  | opt           | **kiss**                 | P2          | B3     | Optional; W1 Patikra ✅                                                |
| **13.34**  | recognition   | **keep**                 | —           | —      | Ciklas OK be Copy                                                      |
| **13.35**  | opt Flagship  | **kiss**                 | P2          | B3     | Subtitle `pipeline`; tankis collapsible                                |
| **13.37**  | vaizdo-gen    | **keep**                 | —           | —      | MARRY                                                                  |
| **13.36**  | section-break | **kiss**                 | P1          | B1     | nextSteps `CPI`/`I2V`/`one-shot`                                       |
| **13.4**   | content-block | **kiss**                 | P2          | B3     | dens soft ✅; gloss Trumpai                                            |
| **13.47**  | i2v-gen       | **kiss** title           | P1          | B1     | shortTitle `I2V` OK su gloss subtitle                                  |
| **13.5**   | content-block | **kiss**                 | P1          | B3     | Matrica EN-heavy; CPI gloss jau Trumpai                                |
| **13.51**  | warm-up       | **keep**                 | —           | —      |                                                                        |
| **13.52**  | content-block | **rewrite** title        | **P0**      | B1     | H1 `Post-production` → LT                                              |
| **13.56**  | section-break | **rewrite** chrome       | **P0**      | B1     | `audio-first` subtitle siena                                           |
| **13.6**   | content-block | **kiss**                 | P1          | B3     | Dual copyable OK; Trumpai gloss                                        |
| **13.7**   | content-block | **keep** / kiss          | P2          | B3     |                                                                        |
| **13.101** | content-block | **kiss**                 | P1          | B2     | Trumpai outcome; Legal tankis already collapsible                      |
| **13.11**  | content-block | **rewrite** order        | **P0**      | B1     | Trumpai **po** diagramos; heading `Workflow`                           |
| **13.8**   | glossary opt  | **rewrite** terms        | **P0**      | B2     | Trūksta CPI, C2PA, I2V, audio-first, reference lock…                   |
| **13.9**   | summary       | **rewrite**              | **P0**      | B2     | Senas „vaizdai/video/muzika“; be 2026 stuburo                          |

**M13P copyable trim** (atskiras backlog, ne B1): 13.2 / 13.3 / 13.4 / 13.35 / 13.6 – pass test −30 %; žr. §8 `M13P-TRIM`.

---

## 6. Kaip tobulinam – aiškios gairės (CONTENT)

### 6.1 Outcomes / whyBenefit (action-intro)

| Blogai (dabar 130)                      | Gerai (M1/M4 / M7P dvasia)                                                    |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| `Pipeline: brief → stills → …`          | „Suprasi 6 žingsnių medijos **grandinę** – nuo užduoties aprašo iki patikros“ |
| `Praktika: consistency, audio-first, …` | „Gebėsi išlaikyti tą patį produktą/stilių serijoje ir planuoti garsą pirmiau“ |
| `Verslas: KPI, C2PA/disclosure, …`      | „Žinosi, ką matuoti ir ką tikrinti prieš publikaciją (teisės, DI žyma)“       |

Taisyklės:

- 3 punktai; **tu / gebėsi / suprasi / žinosi**; be bare EN tokenų grandinės.
- Terminai su gloss **arba** nukelti į 13.12 (kur jau yra).
- whyBenefit = 1 sakinys naudos; be `pipeline` / `consistency` kaip sienos.

### 6.2 Titles / shortTitle / section-break

- H1 LT; jei reikia EN produkto termino – subtitle.
- nextSteps = mokinio rezultatas LT, ne SOT keyword.
- Kaip M79: `workflow` → **darbo eiga**; `pipeline` H1 → **grandinė**.

### 6.3 Content-block ciklas

- GOLDEN §3.2: **Trumpai → (schema) → Daryk → Copy → Patikra**.
- **13.11 fix:** perkelti Trumpai **prieš** `turinio_workflow` diagramą.
- Soft dens: teorija / įrankių sienos → `collapsible` (jau M1315-W1 precedentas).

### 6.4 Glossary + summary

- Glossary papildo terminus, kuriuos moko MUST (ne tik A/E/C + CTR).
- Summary 5 blokai / items = **2026 stuburas** (grandinė, consistency, I2V, garsas, C2PA) – ne 2024 „muzika + CopyButton“.
- `abilityAfter` – plain LT (be bare `consistency`).

### 6.5 EN (DATA + CONTENT)

- **Draudžiama** regeneruoti outcomes per vieną hardcoded string.
- Po LT: `build:modules-en-m13-m15` + **durable** EN map bent: 130 outcomes, 13.12, 13.32, 13.101, 13.9.
- Spot-check: EN ≠ LT diacritics spill; outcomes **skirtingi** sakiniai.

### 6.6 Copyable (M13P – po plain)

- Neilginti Flagship „dėl brandos“.
- Lab artefaktai lieka Lab (13.325).
- Pass test M4P/M13P.

---

## 7. Iteracijos (M7P / M4P stilius)

| ID               | Iteracija | Turinys                                                                                                           | Statusas                                           |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **M13-PLAIN-0**  | I0        | Šis kontraktas + inventorius + TODO §1.2j + meta wire                                                             | **done 2026-08-04** (šis failas)                   |
| **M13-PLAIN-B1** | I1        | First screen + titles: **130**, **13.32**, **13.52**, **13.56**, **13.11** order, section-break nextSteps (15/36) | **done 2026-08-04**                                |
| **M13-PLAIN-B2** | I2        | Exit sync: **13.9** summary + **13.8** glossary + **13.101** Trumpai kiss                                         | **done 2026-08-04**                                |
| **M13-PLAIN-EN** | I3        | Kill outcomes stub build’e; EN hand-tune B1/B2 skaidrėms; `audit:m1315`                                           | **done 2026-08-04** (`m13-en-plain-overrides.mjs`) |
| **M13-PLAIN-B3** | I4        | Soft gloss batch: 13.3 / 13.4 / 13.5 / 13.6 / 13.35 / 13.12 chrome                                                | **done 2026-08-04**                                |
| **M13P-TRIM**    | I5        | M13P copyable trim audit (ne plain P0)                                                                            | **done 2026-08-04**                                |
| **M13-PLAIN-QA** | I6        | Walkthrough DoD §10; CHANGELOG; content `lessons.md`; freeze note                                                 | **done 2026-08-04**                                |

**Rekomenduojama seka:** 0 → B1 → B2 → EN (lygiagrečiai su B2 pabaiga) → B3 → QA.  
**M13P-TRIM** – tik po B1, kad ne painioti plain su prompt ilgiu.

**Feature Doc:** nereikia.  
**`generate:core-data`:** N/A (M13 ne core).  
**EN:** `npm run build:modules-en-m13-m15`.

---

## 8. Sprint DoD (detaliau)

### M13-PLAIN-B1 (P0 first screen)

| Laukas / skaidrė                          | DoD                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------ |
| 130 `outcomes[0..2]`                      | 3 veiksmo sakiniai; LT; atitinka SOT §1.2 tematiškai; **ne** EN token grandinė |
| 130 `whyBenefit`                          | Be bare `pipeline` / `consistency`; plain + DI                                 |
| 130 EN                                    | 3 **skirtingi** EN outcomes (ne stub)                                          |
| 13.32 `title` / `shortTitle` / `subtitle` | LT (pvz. „Produktas ir personažas – tas pats vaizdas“); gloss body             |
| 13.52 `title` / `shortTitle`              | „Montažas po generavimo“ (ar lygiavertis LT)                                   |
| 13.56 subtitle / nextSteps                | Audio-first su LT tiltu                                                        |
| 13.11                                     | Trumpai **prieš** diagramą; heading be bare `Workflow`                         |
| 13.15 / 13.36 nextSteps                   | Plain LT                                                                       |
| Owner                                     | CONTENT → DATA → QA spot                                                       |

### M13-PLAIN-B2

| Laukas                                             | DoD                                                                     |
| -------------------------------------------------- | ----------------------------------------------------------------------- |
| 13.9 sections / introBody / abilityAfter / tagline | 2026 stuburas; be `CopyButton` meta                                     |
| 13.8                                               | + CPI, C2PA (ar DI žyma), I2V, audio-first, reference lock (plain defs) |
| 13.101 Trumpai                                     | 1 outcome sakinys („ką tikrinsiu prieš publikaciją“)                    |
| Owner                                              | CONTENT → DATA                                                          |

### M13-PLAIN-EN

| Darbo vienetas                 | DoD                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| `scripts/build-en-m13-m15.mjs` | Pašalinti / pakeisti `path.includes('.outcomes[')` → vienas stub; map arba hand-tune |
| Overlay                        | 130, 13.12, 13.32, 13.9, 13.101, 13.8 – EN parity                                    |
| Gate                           | `audit:m1315` + rankinis: outcomes unique                                            |

### M13-PLAIN-B3

Soft checklist §3.2 ant 13.3–13.6, 13.35, 13.5 matrica – gloss, ne rewrite stuburo.

---

## 9. Agentų kelias

```text
ORCH (I0 freeze – šis failas)
  → CONTENT (LT plain B1/B2/B3; EN copy draft)
  → DATA (modules.json + build:modules-en-m13-m15; fix build stub)
  → SCHEME (tik jei 13.11/13.32 chrome label sync – retai)
  → CODING (tik jei build script / i18n wire)
  → UI_UX spot (titles @375 optional)
  → QA (walkthrough §10 + audit:m1315 + CHANGELOG + lessons)
```

Nauja pamoka → `docs/development/lessons/content-agent.md` **viena** eilutė (pvz. „130 outcomes ≠ keyword map; EN outcomes stub build’e“).

---

## 10. Epic DoD (M13 praeinamas ~6.5–7/10 learner plain)

M13 laikomas **praeinamu**, kai:

1. [x] Walkthrough: naujas rinkodaros mokinys per ~25–30 min supranta grandinę + consistency + teisių/DI žymos check **be** EN token sienos intro.
2. [x] 130 outcomes = 3 veiksmo punktai; EN unique.
3. [x] Nėra bare EN H1 ant 13.32 / 13.52; 13.56 chrome plain.
4. [x] 13.11: Trumpai prieš diagramą.
5. [x] 13.9 + 13.8 sinchronas su 2026 MUST.
6. [x] Build nebegeneruoja identiškų outcomes stub’ų.
7. [x] Soft checklist §3.2 – MUST skaidrės be P0 plain defektų.
8. [x] `CHANGELOG` + content lesson; `CODEBASE_WHAT_IS_DONE` atskiria: M13 TE/corporate ✅ · **Learner plain ✅**.
9. [x] Freeze (kaip M1P): po done – keisti tik paste-run failure / kalbos klaidą.

---

## 11. WON’T / Invariantai

### Nedaryti (šiame epic’e)

- Naujų skaidrių / Feature Doc / naujų lab’ų.
- Formalus Density DoD / CI.
- TE geometrijos perrašymas (S4/S5 already done).
- M14 klausimų banko perrašymas (nebent related title sync).
- M15 practice rewrite.
- M13P Flagship ilginimas „dėl brandos“.
- `generate:core-data` M13 spill.
- Kopijuoti **M16_MATURITY_PLAN** struktūrą / ticket vardus kaip privalomą šabloną.
- Antras full ranking rescore prieš B1 (užtenka §5 inventoriaus).

### Invariantai

- Full SOT: `modules.json`; EN: overlay + build; **ne** core m1–m9.
- Terminologija: DI (LT); promptas be apostrofų; tu-forma.
- 13.101 id lieka (ne 13.10).
- Optional 13.33 / 13.35 / 13.8 – badge lieka.
- M13P klasės lieka galioti; plain epic jų **neanuliuoja**.

---

## 12. Rizikos

| Rizika                           | Mitigacija                                          |
| -------------------------------- | --------------------------------------------------- |
| Painiojama su M16 plain          | Atskiri ticket’ai §1.2j; M16 lieka §1.2i            |
| EN rebuild vėl stub’ina outcomes | B1 DoD + build script fix prieš masinį rebuild      |
| „Plain“ = išretinti gylį         | M79 principas: gylis collapsible; kerpamas žargonas |
| Ranking 4.0 maskuoja intro FAIL  | §3.1 plain gate; type-aware intro                   |
| Per platus B3                    | B3 tik gloss; P0 = B1+B2+EN                         |
| M13P-TRIM maišosi su plain       | TRIM po B1; atskiras ID                             |

---

## 13. Sinchronas (po I0 / po vykdymo)

| Failas                       | Kada                                          |
| ---------------------------- | --------------------------------------------- |
| `TODO.md` §1.2j              | I0 + ticket status                            |
| `DOCUMENTATION_QUICK_REF.md` | I0 pointer                                    |
| `M13_PROMPT_MATURITY.md`     | Pointer į šį planą (plain vs copyable)        |
| `CHANGELOG.md`               | I0 note + po kiekvieno batch                  |
| `ROADMAP.md`                 | Horizon C residual / open learning gap        |
| `CODEBASE_WHAT_IS_DONE.md`   | Po epic exit                                  |
| `PAPRASTOS_KALBOS_GAIRES.md` | Jei nauji M13 tiltai – 1–2 eilutės (optional) |

---

## 14. Kiss / Marry / Kill (santrauka vykdymui)

|                          | Kas                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **MARRY**                | 13.1 · 13.12 · 13.325 · 13.37 · 13.47 · post-W1 ciklai                                                          |
| **KISS**                 | 13.3–13.6 · 13.5 · 13.35 · 13.101 Trumpai · section nextSteps                                                   |
| **REWRITE / KILL-FIELD** | 130 outcomes+whyBenefit · EN outcomes stub · 13.32/13.52/13.56 chrome · 13.11 order · 13.8 terms · 13.9 summary |

---

## 15. Definition of ready (prieš CONTENT Agent)

1. Produktas patvirtina: **B1 → B2 → EN** = pirmas PR kelias (ne visas M13 rewrite).
2. Etalonai: M7P/M4P/M79 – ne M16.
3. Canonical walkthrough §1.
4. Šis failas = vykdymo SOT; pedagogikos struktūra lieka `turinio_pletra_moduliai_13_14_15.md`.

```text
CHANGES: M13 plain B1–B3+EN+QA done (modules.json + m13-en-plain-overrides + build)
CHECKS: audit:m1315 green · 130 EN outcomes unique · 13.11 Trumpai→schema
RISKS: full EN rebuild be overrides
NEXT: freeze – tik paste-run / kalbos FAIL (plain + M13P)
```
