# M13–M15 learner walk intake (2026-08)

> **Epic:** late stack po Horizon C (corporate15 + M13 plain). Playbook = M11 item quality (2026-08-16), ne 47×7 content audit.  
> Live SOT: `docs/turinio_pletra_moduliai_13_14_15.md` + `src/data/modules.json` (M13–15).  
> EN: `modules-en-m13-m15.json` via `npm run build:modules-en-m13-m15` (**ne** `generate:core-data`).  
> M13 gyvas turinys: **FREEZE** TRIM/TE/S4. Kalbos FAIL po walk — **I2 atidaroma** (§2.8), ne plain/TRIM reopen.  
> **Statusas:** M14 `140→143` **walked**. **M14-ITEMS** ✅ 2026-08-18. M15 `150→158` **walked** (Walk RAW close). **M15-EMPTY / GRID / PROMPTS / I3 + I2-M14 + I2-M13 shipped** 2026-08-18. TRIM/TE neliesti.  
> **Craft (ne šis intake):** Banga 1–3 C-M1–M3 + C-S1–S4 ✅ [`M13_M15_CRAFT_MOSCOW_2026-08.md`](M13_M15_CRAFT_MOSCOW_2026-08.md). Could parked.  
> **Kiss shipped 2026-08-19:** Banga 0+1+2 chrome/`151` skip/`143` gloss/`142` refleksija/`13.101` pointer/`13.35` Ready collapse. Ne TE. Could C-C1 vis dar parked.  
> **Kalbos auditas:** term bank + fixlistos. W1–W3 + I2-M14 + I2-M13 ✅.

---

## 0. Freeze vs intake

| Sluoksnis                 | Būsena                                | Ką tai reiškia                                                              |
| ------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| **M13 gyvas turinys**     | FREEZE TRIM/TE · **I2 kalba ✅**      | First-screen + ciklas shipped. Neliečiam metaforų / TE.                     |
| **M14 lukštas**           | §3.4a1 OK                             | `140 → 140.5 → 141 → 142 → 143` neliečiama.                                 |
| **M14 stuburas + chrome** | Wave 1 + I2-M14 done                  | Chip’ai LT; 0 % → Modulio 13; `140`/`143` chrome. `Savitikra` KEEP.         |
| **M15**                   | **shipped** 2026-08-18                | Compact `practice-scenario` + `isM15` grid + §2.11 promptai + I3 atmintinė. |
| **Šis intake**            | **OPEN** Walk RAW                     | **M14-ITEMS** shipped; M13 walk gali tęstis; I2 chrome done.                |
| **LANG-M1315**            | W1–W3 + I2-M14 + I3 + **I2-M13 done** | TRIM/TE neliesti.                                                           |

**Kodėl pre-triage be walk:** M11 parodė, kad shell 4.0 ≠ item kokybė. Live JSON jau turi leak + EN filler – Wave 1 neblokuojamas.

---

## 1. Darbo ciklas

| Fazė          | Kas                   | Kur                                       |
| ------------- | --------------------- | ----------------------------------------- |
| **A. Intake** | Pastabos + pre-triage | §1.1 + §2 – pirma be JSON, tada batch     |
| **B. Batch**  | Must / Should / Won’t | §1.2 + apdorota zona                      |
| **C. Sync**   | EN overlay + auditai  | `build:modules-en-m13-m15`, `audit:m1315` |

**Taisyklės:**

1. Fiksuojame viską – nefiltruoju.
2. M13 JSON neliečiame be FAIL.
3. Terminologija: **DI**; „promptas”; kreipinys **tu**.
4. Fokusas: Path Test stuburas + chrome, ne naujas polish epikas.
5. Curriculum ID – tik navigacijos laukuose.

### 1.1 Intake žurnalas

| #   | Data       | Skaidrė               | Tema                                                                               | Kur            | Statusas                                         |
| --- | ---------- | --------------------- | ---------------------------------------------------------------------------------- | -------------- | ------------------------------------------------ |
| 1   | 2026-08-17 | `140.5` / `141`       | `m14-warm-1` ≈ `m14-q2` (brand + 1:1/9:16)                                         | §2.1           | **apdorota** · Wave 1                            |
| 2   | 2026-08-17 | `140.5` / `141`       | `m14-warm-2` ≈ `m14-q10` (audio-first)                                             | §2.1           | **apdorota** · Wave 1                            |
| 3   | 2026-08-17 | `140` / `141` / `142` | Learner `pipeline` / `workflow` po M13 plain                                       | §2.2           | **apdorota** · Wave 1                            |
| 4   | 2026-08-17 | `141` q1/q3/q4        | Thin `Tik X` distractoriai                                                         | §2.3           | **apdorota** · Wave 1                            |
| 5   | 2026-08-17 | `141` q2/q6/q8        | `relatedSlideId` vs 2026 stuburas                                                  | §2.4           | **apdorota** · Wave 1                            |
| 6   | 2026-08-17 | EN `141`              | Walk filler (`Only one narrow detail`)                                             | §2.5           | **apdorota** · Wave 1 durable                    |
| 7   | 2026-08-17 | EN `140` / `140.5`    | whyBenefit ≠ LT; `shortTitle` = `Savitikra`                                        | §2.5           | **apdorota** · Wave 1                            |
| 8   | 2026-08-17 | `158`                 | LT stats label `Quick start`                                                       | §2.6           | **apdorota** · Wave 2 LHF                        |
| 9   | 2026-08-17 | `140→143`             | Owner walk RAW                                                                     | §R.M14         | **140 first-screen** · 2026-08-18                |
| 10  | 2026-08-17 | `150→158`             | Owner walk RAW                                                                     | §R.M15         | **150–158 walked** · 2026-08-18                  |
| 11  | 2026-08-17 | M13                   | Owner walk tik jei FAIL                                                            | §R.M13         | tuščia (be 130 paste)                            |
| 12  | 2026-08-18 | `140`                 | First-screen žargonas (subtitle / whyBenefit / CTA dump / temos chip’ai)           | §R.M14 · §2.7  | **apdorota** · I2-M14                            |
| 13  | 2026-08-18 | `140.5`               | Subtitle = Wave 1 ticket stuburas + `M15`; nebaigtas chrome jausmas                | §R.M14         | **apdorota** · I2-M14                            |
| 14  | 2026-08-18 | `142`                 | 0 % → M2 fallback „peržiūrėti Modulį 1“ / 6 blokai                                 | §R.M14         | **apdorota** · `rawScore > 0` nuimtas M8/M11/M14 |
| 15  | 2026-08-18 | `143`                 | Bonus cycle + copyable = EN/hibridas (`pipeline`, `brief`, `stills`, `disclosure`) | §R.M14 · §2.8  | **apdorota** · I2-M14 chrome; model KEEP         |
| 16  | 2026-08-18 | Complete              | Transfer `consistency`/`brief` + complete-screen tipo kopėčia (ne naujas DS)       | §R.M14         | **parked** · ne šios sesijos                     |
| 17  | 2026-08-18 | `150`                 | First-screen: `hero`/`brief` + **M3 verslo kortelės** ant M15 vardų                | §R.M15 · §2.9  | **apdorota** · `isM15`                           |
| 18  | 2026-08-18 | `150.5`               | Tuščia praktika — tik chrome + footer                                              | §R.M15 · §2.10 | **apdorota** · compact + `practicalTask`         |
| 19  | 2026-08-18 | `150.25`              | Schema + ciklas nebaigti; authoring / praktika nėra                                | §R.M15         | **apdorota** · „Pilnas kelias“ labeliai          |
| 20  | 2026-08-18 | `150.26`              | Privaloma / neprivaloma = 0 kelionėje                                              | §R.M15 · §2.11 | **apdorota** · žmogaus checkpoint                |
| 21  | 2026-08-18 | `151`                 | Tuščia + badge `Neprivaloma`; „nieko nėra“                                         | §R.M15 · §2.10 | **apdorota** · compact + be `badgeVariant`       |
| 22  | 2026-08-18 | `150.5–158`           | Owner: promptai į DI įrankius (vaizdas / garsas / montažas / sujungimas)           | §2.11          | **apdorota** · M15-PROMPTS                       |
| 23  | 2026-08-18 | I3 atmintinė          | Plokščia / neįdomi — įtraukti į tą pačią partiją                                   | §2.12          | **apdorota** · 4 promptai + LT p.2               |
| 24  | 2026-08-18 | `141`                 | Testerio item kokybė: Q9/Q11 FAIL, Q12 C2PA, Q6 stem, length-cue                   | §2.13          | **apdorota** · M14-ITEMS                         |
| 25  | 2026-08-18 | `151–158`             | Optional chrome + `158` žargonas + EN twins                                        | §R.M15         | **apdorota** · Walk RAW close                    |

### 1.2 Triažas

| Ticket                  | Must (šiame cikle)                                                                                                     | Should (po walk)                                            | Won’t                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------- |
| **W1 leak**             | Nauji warm-1 (A/E/C) + warm-2 (tas pats vaizdas); warm-3 lieka M15 tiltas                                              | —                                                           | Perrašyti visus 12 stem’ų                       |
| **W1 chrome**           | `140` CTA / `141` subtitle / `142` failedMessage be bare `pipeline`/`workflow`                                         | `143` EN title „pipeline checklist“                         | Rainbow / enlarge                               |
| **W1 distract**         | q1/q3/q4 plausible-but-wrong                                                                                           | q5/q6 thin options jei walk skundžiasi                      | Absurdas / length cue                           |
| **W1 pointers**         | q8 → `13.12`; q6 explanation be „Workflow“; q2 lieka `13.3`                                                            | q8 → `13.47` jei walk nori builderio                        | M13 title rewrite                               |
| **W1 EN**               | Durable `140`/`140.5`/`141`/`142` (visas bankas, ne filler)                                                            | Rankinis RTL                                                | Hygiene linter → 0                              |
| **W2 158**              | LT `Quick start` → `Greitas startas`                                                                                   | —                                                           | —                                               |
| **M15 150 grid**        | Izoliuoti kaip M12: slėpti M3 `scenarioCards` + „🔥 6 Verslo…“                                                         | I2 chrome                                                   | Naujas Pattern                                  |
| **M15 tuščia praktika** | `150.5` + `151–154`: renderer skaito `slide.scenario` / `practicalTask`; dabar viskas `content` → `return null`        | Compact kelias be M3 tab’ų                                  | M3 context/data/constraints siena               |
| **M15 §2.11**           | Kiekviena praktika = problema + kopijuojamas promptas + DI įrankis + artefaktas. Nuimti privaloma/neprivaloma kaip ašį | `150.25` schema labeliai; `150.26` checkpoint žmogaus kalba | Feature Doc; 47×7; M13 TRIM                     |
| **W3/W4**               | —                                                                                                                      | —                                                           | M13 TRIM/TE/S4                                  |
| **W4 140 chrome**       | įeina į I2 M14 partiją                                                                                                 | —                                                           | `Savitikra` rename · C2PA drop · M8/M11 chip’ai |
| **I2 LT║EN**            | §2.8 — M13–15 first-screen + cycle + TS chip’ai                                                                        | —                                                           | 47×7 · 12 stem rewrite · hygiene→0              |
| **I3 atmintinė**        | Ta pati §2.11 partija: problema + promptas + įrankis (LT+EN)                                                           | 4-as montažo slotas jei telpa PDF                           | Naujas PDF maketo epikas                        |
| **0 % fallback**        | M14 (+ M8/M17 analogas) `rawScore > 0` nuimti                                                                          | M11 freeze — neliest nebent savininkas                      | —                                               |
| **M14-ITEMS**           | q9 be CPI · q11 licencijos principas · q12 C2PA ≠ disclosure · q6 stem                                                 | 1 grandinės Q; q5 be slide hint; length-cue                 | 12 rewrite (C-W5) · C2PA drop iš mokymo         |

---

## 2. Pre-triage (live JSON, 2026-08-17)

### 2.1 Warm-up leak

GOLDEN §3.4a1: 2 diagnostiniai + 1 forward bridge. Live:

- `m14-warm-1` = tas pats brand + `1:1`/`9:16` sprendimas kaip `m14-q2`.
- `m14-warm-2` = audio-first apibrėžtis, perfrazuota `m14-q10`.
- `m14-warm-3` = M15 MUST vs optional – **keep**.

**Must fix:** warm-1 → A/E/C (`13.1`); warm-2 → reference lock / tas pats vaizdas (`13.32`). Nė vienas neturi graded dublikato.

### 2.2 Chrome jargon

Po M13 plain H1 = grandinė / darbo eiga. Live vis dar:

- `140.firstActionCTA`: `pipeline` + `workflow`
- `141.subtitle`: `pipeline`
- `142.failedMessage`: `pipeline`
- EN `141` title map + `142.failedMessage`: `pipeline`

### 2.3 Thin distractors

`m14-q1` / `q3` / `q4` = `Tik spalvas` / `Tik trukmę` / `Tik tempo`. M11 taisyklė: tikėtinas klaidingas modelis, ne absurdas.

**Keep stems:** q7 (9:16 conversion), q9 (CPI/stills), q11 (licensed stack), q12 (C2PA).

### 2.4 relatedSlideId

| id  | Live    | Verdiktas                                                               |
| --- | ------- | ----------------------------------------------------------------------- |
| q2  | `13.3`  | **keep** – brand + proporcijos (ne 13.32 lock)                          |
| q6  | `13.11` | **keep** pointer; explanation „Workflow“ → „Darbo eiga“                 |
| q8  | `13.4`  | **→ 13.12** – I2V grandinė, ne scenarijaus laukai; ne 13.47 (builderis) |

Visi 12 turi gyvą M13 id.

### 2.5 EN twins

`build-en-m13-m15.mjs` walk’as `141` paverčia į filler: `Only one narrow detail` / `A clear, specific option…` / vienas explanation visiems. `140` EN `whyBenefit` ≠ LT readiness. `140.5` EN `shortTitle` = LT `Savitikra`.

**Must:** durable override visam `141` bankui + `140`/`140.5`/`142` chrome. Kitaip rebuild grąžina filler.

### 2.6 M15 LHF

`158.stats[0].label` = `Quick start` LT JSON. Completion claim (`greitą startą arba pilną`) OK – ne `128` bug. `150` jau turi `howToUseModule` Greitas/Pilnas. `taskFrame: "Užduotis"` / EN `Task` – ne tuščias M12 `taskFrame: "Task"` objektas.

### 2.7 W4 – `140` first-screen (2026-08-18)

**Kodėl auditas „nepagavo“:** W1–W3 skaitė `modules.json` + EN overlay. Temos juosta ir fail chips = hardcoded LT labeliai [`testKnowledgeScopeContent.ts`](../../src/components/slides/shared/testKnowledgeScopeContent.ts) + [`TestRemediationChips.tsx`](../../src/components/slides/shared/TestRemediationChips.tsx). Wave 1 nukirto `pipeline` iš CTA JSON, bet chip vis dar sako **Pipeline**.

**LT UI taisyklė (siūloma, Path Test lukštas):**

| Paviršius                     | Taisyklė                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| Temos chip / remediation chip | Term bank **KEISTI** — be bare EN (`pipeline`, `audio-first`, `brief`, `brandas`)     |
| KEEP chip’e                   | **C2PA** · **CPI** (mokymo objektas) · **Licencijos** (jau LT)                        |
| `Savitikra`                   | **KEEP** — §3.4a lukšto žodis (M8/M11/M14). Ne pervadinti tik M14.                    |
| Kelio vardas                  | **Kartą** first-screen (ne subtitle + whyBenefit)                                     |
| CTA                           | Vienas sakinys; temos eina chip’uose, ne sąraše                                       |
| M13                           | FREEZE. Chip rodo į 13.x — tai M14 chrome, ne I2 body. Be 130 paste — jokio M13 JSON. |

**Siūlomas Must copy (po „tvarkom“):**

| Laukas                    | Live                                                          | Po                                                                           |
| ------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `140.subtitle`            | Turinio inžinerijos žinios                                    | Vaizdai, video, garsas                                                       |
| `140.whyBenefit`          | …finaliniam Turinio inžinerijos projektui (Modulis 15).       | Po šio testo žinosi, ar esi pasiruošęs Modulio 15 projektui.                 |
| `140.firstActionCTA`      | 12 temų dump (grandinė, pirma garsas, C2PA…)                  | Atsakyk į 12 klausimų apie vaizdus, video, garsą ir teises.                  |
| Chip Pipeline             | Pipeline                                                      | Grandinė → 13.12                                                             |
| Chip Garsas / audio-first | Garsas / audio-first                                          | Pirma garsas → 13.6                                                          |
| Chip Brandas              | Brandas                                                       | Ženklas → 13.3                                                               |
| Chip Brief → publikacija  | Brief → publikacija                                           | Užduotis → publikacija → 13.11                                               |
| Chip C2PA / Licencijos    | kaip yra                                                      | KEEP                                                                         |
| Fail chips `LINKS_M14`    | Pipeline / CPI · Brandas ir formatas · audio-first · Brief →… | Grandinė / CPI · Ženklas ir formatas · Pirma garsas · Užduotis → publikacija |
| EN twins                  | Pipeline / Audio-first / Brief → publish                      | Media chain · Sound first · Task → publish (ne bare pipeline)                |

**Won’t (W4 vienas):** 12 stem’ų rewrite · TRIM/TE · `Savitikra` rename · C2PA drop · M8/M11 chip’ai. I2 M13–15 — §2.8 (ne W4 vienas slide). **I2-M14 shipped** 2026-08-18.

### 2.8 I2 LT║EN — first-screen + ciklas (shipped)

Kalbos FAIL teka iš M13 į M14 lukštą ir M15 first-screen. I2 = chrome + ciklo labeliai, **ne** TRIM/TE/S4.

**I2-M14 shipped** 2026-08-18: `140` CTA / temos chip’ai LT; `142` 0 % nebe M2 fallback (`rawScore > 0` nuimtas M8/M11/M14); `143` chrome LT, model KEEP.

**I2-M13 shipped** 2026-08-18: first-screen + ciklas live MUST kelyje + i2vGen i18n. 130 paste vis dar naudingas, bet nebe blokas.

### 2.9 M15 `150` grid (shipped)

Ta pati M12 klasė: kelio pasirinkimas jau yra, apačioje M3 `scenarioCards` / „🔥 6 Verslo…“. **Must:** izoliuoti kaip M12 (`isM15`). **Won’t:** naujas Pattern.

### 2.10 Tuščia praktika (shipped)

`150.5` + `151–154` piešė tuščią: renderer skaito `slide.scenario`, o turinys buvo `content` → `return null`. Badge `Neprivaloma`. **Must:** compact `practice-scenario` + `practicalTask`; be M3 4 tab’ų; be `badgeVariant` kaip ašies.

### 2.11 M15 promptai į DI įrankį (shipped)

Owner kanonas: kuriame promptus į DI įrankius problemoms — vaizdas, garsas, montažas, sujungimas. Ne privaloma/neprivaloma ašis. Ne tuščias lukštas.

| Darbas                                | Skaidrė                                               | Kas                                 |
| ------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| Kuriu **vaizdą**                      | `150.5` (ir `151` jei lieka kaip tas pats / gilesnis) | Stage promptas → vaizdų įrankis     |
| Kuriu **garsą**                       | `153`                                                 | Stage promptas → garso įrankis      |
| **Montuoju**                          | `154`                                                 | Stage / checklist → montažo įrankis |
| **Jungiu** (vaizdas → video → visuma) | `152` + schema `150.25`                               | Stage I2V + „ką sujungti“           |

Ne nauja teorija. M13 jau turi brandą (`M13_PROMPT_MATURITY` Micro/Stage). M15 = **panaudoji** tuos promptus savo temai. Fit-for-purpose, ne Flagship siena.

**Chrome (po „tvarkom“):**

| Skaidrė          | Dabar                                               | Po                                                                                |
| ---------------- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| `150`            | Privaloma: hero… + M3 tinklelis                     | Vienas vaizdas **arba** mini kampanija (be „privaloma“) + be M3 kortelių          |
| `150.5`          | Tuščia                                              | Užduotis + kopijuojamas vaizdo promptas + kada baigta                             |
| `150.25`         | Brief / optional / I2V / VO/bed                     | Schema padeda darbui; labeliai LT be optional                                     |
| `150.26`         | Privalomas minimumas / M15 / optional               | Žmogaus klausimas: ar eini toliau su video, ar jau turi vaizdą?                   |
| `151–154`        | Tuščia + Neprivaloma                                | Kiekviena = viena problema + promptas; badge ne „Neprivaloma“ (arba visai nuimti) |
| `158`            | hero / quick start / optional                       | Ką turi: promptai + artefaktai                                                    |
| **I3 atmintinė** | Formatų sąrašas + 3 laukų dump’ai + teisių paskaita | Tie patys 4 promptai kaip skaidrėse — įklijuoji ir dirbi                          |

**Won’t:** Feature Doc; M3 tab’ai; M13 TRIM reopen; hygiene→0.

### 2.12 I3 atmintinė — plokščia (2026-08-18, owner)

Savininkas: _turinio kelio atmintinė irgi plokščia ir neįdomi — įtraukiam._ I3 nebe later.

Live `m1315HandoutContent.json` = kontrolinis lapas, ne įrankis:

| Slotas                | Live                                                                    | Kodėl plokščia                      |
| --------------------- | ----------------------------------------------------------------------- | ----------------------------------- |
| title / subtitle      | Turinio inžinerijos kelio atmintinė · mini kampanijos kontrolinis lapas | Kurso vardas, ne nauda              |
| `modalityChecklist`   | Kada vaizdas / video / muzika                                           | Paskaita, ne darbas                 |
| 3 šablonai            | `hero` + A/E/C laukų dump                                               | Nėra problemos; nėra „įklijuok čia“ |
| Montažas / sujungimas | **nėra**                                                                | 4-a problema iš §2.11 dingusi       |
| p. 2                  | Teisės + `Delivery checklist` (LT PDF antraštė **EN**) + refleksija     | Administracija                      |

**Must (kartu su §2.11, ne atskiras epikas):** tie patys promptai kaip `150.5` / `152` / `153` / `154`. Pirmas puslapis = problema → promptas → į kurį DI įrankį. Teisės = 1 eilutė prie prompto, ne atskira paskaita. Title be „inžinerijos kelio“. EN twin `m1315HandoutContent-en.json` tuo pačiu.

**Should:** 4-as montažo slotas (`montagePromptTemplate`) jei `compact` PDF telpa — schema + `m1315HandoutPdf.ts`. Kitaip montažas į video slotą kaip „sujungimas“.

**Won’t:** naujas PDF maketo epikas; Brand Kit; ecosystem CTA perrašymas (hub/map lieka).

### 2.13 M14-ITEMS — testerio item kokybė (2026-08-18)

Live = corporate15 / EN `141` (ne senasis `modules.json` `Tik X`). Verdiktas: turinys ~8/10, mechanika per lengva — dar nepublikuoti.

| #             | Testeris                                                 | Live                                                |
| ------------- | -------------------------------------------------------- | --------------------------------------------------- |
| q9            | **FAIL** `retry / CPI`                                   | Tas pats teisingas variantas                        |
| q11           | **FAIL** vendor quiz (ElevenMusic / Soundraw / Beatoven) | Tas pats                                            |
| q12           | C2PA ≠ watermark / disclosure                            | Stemas vis dar „C2PA / disclosure“                  |
| q6            | „iškart po brief“ neuniversalu                           | Stemas nepakeistas                                  |
| q5            | Be „žr. skaidrę Verslas ir rizikos“                      | Hint vis dar variante                               |
| q1–q4, q6, q7 | Length-cue                                               | Wave 1 nuėmė `Tik X`; ilgiausias vis tiek teisingas |
| Grandinė      | Tema sako grandinė; nėra visos sekos Q                   | Q6/Q8/Q9/Q10 = fragmentai                           |

**Must:** q9 be CPI (storyboard / stills → mažiau retry ir kainos); q11 = komercinė licencija + monetizacija (be vendor vardų); q12 = C2PA / Content Credentials = provenance; q6 stemas „gavai brief, ruošiesi generuoti“.  
**Should:** 1 multimodalės grandinės Q (brief → konceptas → hero → video → VO/muzika → montažas → QA); q5 be slide hint; plausible-but-incomplete distractoriai.  
**Won’t:** 12 stem rewrite (C-W5); C2PA drop iš mokymo; lukšto keitimas.

**Shipped 2026-08-18:** Q6 = grandinė; Q9 be CPI; Q11 licencijos principas; Q12 C2PA provenance; Q5 be slide hint; Wave 1 SOT sync. Ticket: [`TODO.md`](../../../TODO.md) **§1.3a M14-ITEMS** ✅.

---

## 3. RAW – savininko walk

### R.M14 – `140` → `143`

**2026-08-18 · `140` first-screen (savininkas, LT UI):**

Vis dar daug žargono. Kalbos auditas, matyt, neapėmė šio paviršiaus. Tikėtina, kad tas pats kartojasi M13.

- CTA: _Atsakyk į 12 klausimų – vaizdai, video, garsas, medijos grandinė, pirma garsas, licencijos, C2PA, rizikos ir darbo eiga._
- Temos chip’ai: **Pipeline** · **Garsas / audio-first** · Licencijos · **C2PA** · **Brandas** · **Brief → publikacija**

**2026-08-18 · `140.5`:** subtitle = Wave 1 ticket stuburas + `M15`; nebaigtas chrome jausmas.

**2026-08-18 · `142`:** 0 % → M2 fallback „peržiūrėti Modulį 1“ / 6 blokai.

**2026-08-18 · `143`:** Bonus cycle + copyable = EN/hibridas (`pipeline`, `brief`, `stills`, `disclosure`). Chrome I2-M14; model KEEP.

**2026-08-18 · Complete:** Transfer `consistency`/`brief` + complete-screen tipo kopėčia — **parked**.

**2026-08-18 · testeris `141`:** §2.13 / **M14-ITEMS**.

### R.M15 – `150` → `158`

**2026-08-18 · `150` first-screen (savininkas):**

First-screen: `hero`/`brief` + **M3 verslo kortelės** ant M15 vardų.

**2026-08-18 · `150.5`:** tuščia praktika — tik chrome + footer.

**2026-08-18 · `150.25`:** schema + ciklas nebaigti; authoring / praktika nėra.

**2026-08-18 · `150.26`:**

Privaloma/neprivaloma aiškinimas = **nulis** kelionėje. Perdaryti draugiškiau. Live: `Žingsnis 1 iš 1` · optional scenarijus · **hero** · **brief** · `M15 užbaigti` · VO/bed · `consistency lock`.

**2026-08-18 · `151` Scenarijus: Vaizdas (savininkas):**

`nieko nėra, neprivalomas?` Live: badge `Neprivaloma` · `Raktinis kadras pilnam keliui` · 5/9 · tuščias kūnas + footer. Tas pats §2.10. Reikia sprendimo — §2.11.

**2026-08-18 · owner kanonas visam `150.5–158`:**

Sprendžiam paprastai: kuriame promptus į DI įrankius problemoms — vaizdas, garsas, montažas, sujungimas. Ne privaloma/neprivaloma ašis. Ne tuščias lukštas.

**2026-08-18 · I3 atmintinė (savininkas):**

Plokščia ir neįdomi — **įtraukti** į tą pačią partiją. §2.12.

**2026-08-18 · Walk RAW close (`151–158`):**

Chrome be `Optional:` / `Neprivaloma` ašies (`optional: true` lieka). `151` raktinis kadras; `152` 3–5 s klipas; `153` balsas arba fonas + C-M3 `doneWhen`; `154` sudėk 15–30 s + teisės/DI žyma; `158` 4 promptai + artefaktai + kitas žingsnis (LT `Greitas startas`). `150.25`/`150.26` = žmogaus šaka. EN twins durable. Complete-screen #16 parked.

**Likę:** complete-screen transfer (#16) parked. Walk RAW `151–158` **uždaryta**.

### R.M13 – kalbos FAIL (I2)

M14 walk įrodė, kad M13 terminai teka į testo lukštą. TRIM/TE vis dar freeze. I2 first-screen + ciklas **shipped** 2026-08-18. 130 paste vis dar naudingas, bet nebe blokas.

---

## 4. Handoff

**2026-08-18 shipped:** M15-EMPTY / GRID / PROMPTS / I3 + I2-M14 + **I2-M13** + **M14-ITEMS** + **Walk RAW `151–158`**. Compact `practice-scenario` + `isM15` + 4 promptai atmintinėje + M14 0 % / chip’ai + M13 first-screen/ciklas + `141` item kokybė + uodegos chrome. **Ne** Feature Doc.

**Next:** complete-screen transfer (#16) parked · Could C-C\* parked.  
**Craft:** Banga 1–3 C-M1–M3 + C-S1–S4 ✅ — [`TODO.md`](../../../TODO.md) **§1.3b**; spec [`M13_M15_CRAFT_MOSCOW_2026-08.md`](M13_M15_CRAFT_MOSCOW_2026-08.md).
