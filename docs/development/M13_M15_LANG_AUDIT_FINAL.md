# M13–M15 LT ║ EN kalbos auditas (final)

> **Statusas:** FINAL working SOT kalbos darbui · 2026-08-19 · **Wave F P0+P1 applied** (I0–I6)  
> **Apimtis:** Moduliai 13–15 · mokinio paviršiai (JSON + `m13*Content.ts` + i18n lab) · ne TRIM/TE/S4 geometrija  
> **Precedentas:** I0–I2 (`M13_M15_TERM_BANK.md`, `M13_M15_LANG_FIXLIST_{LT,EN}.md`) — šis failas **nesunaikina** jų, o **uždaro sprendimus** ir atidaro **Wave F** (liekanos)  
> **Gairės:** [`PAPRASTOS_KALBOS_GAIRES.md`](PAPRASTOS_KALBOS_GAIRES.md) · GOLDEN §6c · [`CONTENT_AGENT.md`](CONTENT_AGENT.md)

**Viena eilutė:** Wave H (2026-08-19) uždarė §5.3 P2: Soft Binding / TOFU dens, 130 CTA @375 verify, 158 emocijos + tagline. Wave G uždarė `Skyrius:` / genericBySlide. Wave F uždarė P0+P1. Automatai žali.

---

## 0. Kaip naudoti šį dokumentą

| Kas skaito     | Ką daro                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| **CONTENT**    | Rašo pagal §1–§3; TERM? → §7 savininkui; ne spėlioja                                                             |
| **DATA**       | Taiko LT → `modules.json` + TS; EN → `build-en-m13-m15.mjs` + `m13-en-plain-overrides.mjs` (**ne** overlay-only) |
| **QA**         | Wave F checklist §6; po apply — `audit:m1315` + `audit:en-spelling` + `audit:lt-address`                         |
| **Savininkas** | Uždaro §7 TERM? / stilistikos klausimus; tada CONTENT+DATA Wave F                                                |

**Won’t šioje bangoj:** M13 TRIM/TE/S4 · 12 stem rewrite · `generate:core-data` · hygiene→0 · Brand Kit · naujas Pattern.

**Susiję failai**

| Failas                                                     | Rolė po šio FINAL                                                     |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| [`M13_M15_TERM_BANK.md`](M13_M15_TERM_BANK.md)             | Operacinė termino lentyna (KEEP / PIRMAS / KEISTI) — atnaujinti po §7 |
| [`M13_M15_LANG_FIXLIST_LT.md`](M13_M15_LANG_FIXLIST_LT.md) | Istorija I1–I2 + **nauja Wave F LT** lentelė                          |
| [`M13_M15_LANG_FIXLIST_EN.md`](M13_M15_LANG_FIXLIST_EN.md) | Istorija + **Wave F EN**                                              |
| Šis failas                                                 | Principai, paralelės, liekanų prioritetai, atviri sprendimai          |

---

## 1. Principai (LT ≠ EN mechaninis veidrodis)

### 1.1 Skirtinga daryba — ką tai reiškia praktikoje

| Matmuo                    | LT                                                                     | EN                                                                       | Darbo taisyklė                                                                                     |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Žodžių daryba**         | Linksniai, priešdėliai, sudurtiniai (`referencų užraktas`)             | Compound / noun stacks (`reference lock`)                                | Niekada neversk pažodžiui linksnio → angliško genitive; rinkis **idiomą**                          |
| **Sakinio daryba**        | Veiksmažodis dažnai gale / laisvesnė tvarka; trumpi „Trumpai“ sakiniai | SVO; benefit-first subtitle                                              | Subtitle = **nauda**, ne proceso dump (abi kalbos)                                                 |
| **Emocija**               | `Sveikiname!`, `Puiku!`, `Laimi ne…`                                   | `Well done!` / `Great!` — šaltesnis mokyklinis tonas lengvai atsiranda   | EN santraukos (158, 13.9) **laikyk** šilumą (`Congratulations` / `Nice work`), ne tik flat outcome |
| **Tarptautiniai žodžiai** | Chrome = LT; body = PIRMAS gloss                                       | Chrome = EN kanonas; gloss tik kai mokymo objektas dvikalbis (C2PA, I2V) | Žr. §2 lentynas                                                                                    |
| **Kreipinys**             | **tu** (niekada Jūs)                                                   | **you**                                                                  | Vartai: `audit:lt-address`                                                                         |
| **Technologija**          | **DI**                                                                 | **AI**                                                                   | `EU AI Act` — oficialus vardas abiem                                                               |
| **Rašyba**                | `pvz.,` · `vaizde` · be `pilnai`/`sekantis`                            | **American English** · `e.g.,` · `center`/`color`/`license`              | Vartai: `audit:en-spelling`                                                                        |
| **Antraštės**             | Be `Skyrius:` · be bare EN KEISTI                                      | Be `Section:` · be bare `pipeline` H1                                    | PAPRASTOS §2a                                                                                      |

### 1.2 Trys paviršiai (skirtingos taisyklės)

```text
① CHROME   = title, shortTitle, subtitle, CTA, chip, footer, nav, diagram label
② CYCLE    = Trumpai / Daryk / Patikra / Kodėl / Kur pritaikyti (GOLDEN content-block)
③ MODEL    = copyable promptas modeliui (ROLE/TASK/laukai) + tool API žodžiai
```

| Paviršius    | LT                                                        | EN                                              |
| ------------ | --------------------------------------------------------- | ----------------------------------------------- |
| **① Chrome** | Tik LT kanonas (KEISTI). Bare EN = FAIL                   | Tik EN kanonas. LT leak / be diakritikos = FAIL |
| **② Cycle**  | PIRMAS KARTAS taisyklė; tada LT                           | Idiomos; prasmė = LT, ne kalkė                  |
| **③ Model**  | EN komandos modeliui **gali** likti; antraštė aplink — LT | EN OK; ne DI                                    |

### 1.3 „Tarptautinis žodis“ vs „lietuviškas“ — sprendimo medis

```text
Ar tai produkto / standarto / formato VARDAS?
  taip → KEEP (ChatGPT, C2PA, I2V, 16:9, LUFS, SynthID)
Ar tai pats MOKYMO OBJEKTAS ir be EN mokinys nesuras įrankyje?
  taip → KEEP arba PIRMAS (I2V, A/E/C EN triadė locale EN)
Ar tai chrome (H1 / CTA / chip / Trumpai heading)?
  taip → KEISTI į LT; EN locale = EN kanonas (ne LT gloss H1)
Ar pirmas mokinio paminėjimas body?
  taip → PIRMAS: „lietuviškai (angl.)“; toliau tik LT
Ar copyable / tool API?
  taip → EN gali likti (MODEL)
kitaip → TERM? (§7) — nestumk į chrome be savininko
```

---

## 2. Termino lentynos (kanonas 2026-08-19)

> Pilna operacinė lentelė lieka [`M13_M15_TERM_BANK.md`](M13_M15_TERM_BANK.md). Čia — **užrakinti** sprendimai + Wave F kandidatai.

### 2.1 KEEP (abiejose kalbose / produktas)

| Terminas                                 | LT chrome                                      | EN kanonas                          | Pastaba                                      |
| ---------------------------------------- | ---------------------------------------------- | ----------------------------------- | -------------------------------------------- |
| Įrankių vardai                           | kaip yra                                       | same                                | ChatGPT, CapCut, Seedance, Kling, Veo, Sora… |
| **C2PA**, **CPI**, **LUFS**, **SynthID** | kaip yra                                       | same                                | Mokymo / matavimo objektai                   |
| **I2V**                                  | I2V; pirmas kartas gali „video iš kadro (I2V)“ | I2V / image-to-video                | Title gali būti `I2V …`                      |
| **A/E/C**                                | juostos LT; skliaustuose EN OK pirmą kartą     | Awareness / Engagement / Conversion | EN neatversti į LT locale                    |
| **MASTER**                               | MASTER                                         | MASTER                              | Kelio terminas                               |
| **promptas** / **DI**                    | promptas / DI                                  | prompt / **AI**                     | Projekto kanonas                             |
| **16:9 / 1:1 / 9:16**                    | kaip yra                                       | same                                |                                              |

### 2.2 PIRMAS KARTAS → tada tik LT (EN locale = dešinysis stulpelis)

| EN / hibridas     | LT toliau                      | Pirmas paminėjimas         | EN kanonas                                |
| ----------------- | ------------------------------ | -------------------------- | ----------------------------------------- |
| pipeline          | grandinė / darbo eiga          | grandinė (pipeline)        | **media chain** (ne bare `pipeline` H1)   |
| workflow          | darbo eiga                     | darbo eiga (workflow)      | workflow                                  |
| consistency       | nuoseklumas                    | nuoseklumas (consistency)  | consistency                               |
| reference lock    | referencų / pavyzdžių užraktas | … (reference lock)         | reference lock                            |
| referencai / refs | pavyzdžių nuotraukos           | … (referencai)             | reference photos / refs                   |
| audio-first       | pirma garsas                   | pirma garsas (audio-first) | **sound first** (ne chrome `Audio-first`) |
| brief             | užduoties aprašas              | užduoties aprašas (brief)  | brief                                     |
| hero              | pagrindinis vaizdas            | pagrindinis vaizdas (hero) | hero image                                |
| CTA               | kvietimas veikti               | … (CTA)                    | call to action (CTA)                      |
| disclosure        | DI žyma                        | DI žyma (disclosure)       | AI label / disclosure                     |
| storyboard        | scenarijaus piešiniai          | …                          | storyboard                                |
| aspect ratio      | proporcijos                    | …                          | aspect ratio                              |
| keyframe          | raktinis kadras                | … (keyframe)               | keyframe                                  |
| VO                | balsas                         | balsas (VO)                | voice-over (VO)                           |
| bed               | fonas                          | fonas (bed)                | bed                                       |
| checklist         | patikros sąrašas               | …                          | checklist                                 |
| provenance        | kilmė                          | …                          | provenance                                |
| KPI               | rodikliai                      | …                          | metrics / KPI                             |
| landing           | tinklalapio įėjimo puslapis    | …                          | landing page                              |
| social post       | įrašas socialiniame tinkle     | …                          | social post                               |
| mix               | maišymas                       | …                          | mix                                       |
| post-prod         | montažas po generavimo         | …                          | edit after generation                     |
| stories           | vertikalus formatas            | …                          | stories                                   |
| loudness          | garsumas                       | garsumas (loudness)        | loudness / LUFS context                   |
| watermark         | vandens ženklas                | … (watermark)              | watermark                                 |

### 2.3 KEISTI chrome (jei live vis dar EN / hibridas = Wave F)

| Live kvapas                                     | Keisti į (LT)                                 | EN                                         |
| ----------------------------------------------- | --------------------------------------------- | ------------------------------------------ |
| `Audio-first: VO…` H1                           | `Pirma garsas: balsas…`                       | `Sound first: voice…` (EN 13.6 jau geriau) |
| `…checklist…` title                             | `…patikros sąrašas…`                          | checklist OK                               |
| `Brief → stills → disclosure`                   | `Užduotis → kadrai → … → DI žyma`             | `Brief → frames → … → AI label`            |
| `Ready promptas`                                | `Paruoštas promptas` **arba** KEEP Ready (§7) | Ready prompt OK                            |
| `hero vaizdas` H1 po PIRMAS                     | `pagrindinis vaizdas`                         | hero image OK                              |
| `loudness` H1                                   | `garsumas`                                    | loudness OK                                |
| `Skyrius:` / `Section:`                         | nuimti                                        | nuimti                                     |
| `Character ref` / `Brand mood` chips            | `Personažo pavyzdys` / `Ženklo nuotaika`      | EN chips OK                                |
| Business cycle `Brief` / `Brand consistency` LT | `Užduotis` / `Ženklo nuoseklumas`             | Brief / Brand consistency OK               |

---

## 3. Stilistika, skyryba, rašyba, kultūra

### 3.1 LT rubrika

| Rubrika         | Taisyklė                                                         | Tipinis FAIL                                       |
| --------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| **Skyryba**     | `pvz.,` · kablelis prieš šalutinį `kad`/`kodėl`/`kai` kai reikia | `pvz. 16:9`                                        |
| **Rašyba**      | `vaizde` · `tinklalapis` · ne `landingas`                        | `vaize`, `landingo`                                |
| **Kalkės**      | Ne `social postas`, `eventas`, `quick start` chrome              | hibridiniai daiktavardžiai                         |
| **Tu**          | Liepiamoji: `Paspausk`, `Pasirink`, `rinkis`                     | `galite`, `Paspauskite`                            |
| **Barbarizmai** | `visiškai` ne `pilnai`; `kitas` ne `sekantis`                    | GOLDEN §6c                                         |
| **Registras**   | Verslo paprastumas; be agentūros EN dump tools body              | ElevenLabs eilutės anglų rinkodaros tonu LT chrome |
| **Antraštė**    | Rezultatas / tema · ≤~55 simb. · `shortTitle` nav                | `Skyrius:`, proceso dump                           |

### 3.2 EN rubrika

| Rubrika        | Taisyklė                                                         | Tipinis FAIL                                                                             |
| -------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **AmE**        | `artifact`, `behavior`, `optimize`, `color`, `center`, `license` | `recolour`, `centre` **EN** stringuose                                                   |
| **Skyryba**    | `e.g.,` · `i.e.,`                                                | `e.g.` be kablelio                                                                       |
| **Leak**       | Jokio LT / be diakritikos pass-through                           | `Darbo eiga`, `I2V klipo…`, `Ka ismokai`, `sablonai`                                     |
| **Stub**       | Kiekviena sekcija — unikali prasmė = LT twin                     | `genericBySlide` vienas sakinys × N                                                      |
| **Idioma**     | Prasmė = LT; sakinys = natūralus EN                              | `What you already know?` (kalkė) → `What you already know` / `What do you already know?` |
| **Emocija**    | Ne šaltesnis už LT twin santraukose                              | 158 be `Sveikiname` analogo                                                              |
| **Durability** | Fix `build-en-*.mjs` + overrides + TS                            | Overlay-only wipe ant rebuild                                                            |

### 3.3 Paralelės — kur EN **neturi** sekti LT žodžio po žodžio

| LT kanonas                | Blogas EN veidrodis      | Geras EN                                          |
| ------------------------- | ------------------------ | ------------------------------------------------- |
| pirma garsas              | Audio-first (H1)         | Sound first                                       |
| užduoties aprašas         | task description dump H1 | brief (KEEP EN)                                   |
| patikros sąrašas          | —                        | checklist                                         |
| DI žyma                   | DI label                 | AI label / disclosure                             |
| grandinė                  | pipeline H1              | media chain                                       |
| pagrindinis vaizdas       | —                        | hero image                                        |
| scenarijaus piešiniai     | —                        | storyboard                                        |
| Užduotis + ženklas (chip) | Task + mark (awkward)    | Brief + brand                                     |
| Ką jau žinai?             | What you already know?   | What you already know / What do you already know? |

### 3.4 Gate false-positive (žinoti)

| Signalo           | Failas                                                   | Kodėl                                                                                  |
| ----------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `centre → center` | `m13ConsistencyLabContent.ts` LT `alt`: _rankena centre_ | **Lietuvių** vietininkas (_centras → centre_), ne BrE. Allowlist arba skip LT-only alt |

---

## 4. Audito būklė (2026-08-19 live)

### 4.1 Automatai

| Vartai                             | Rezultatas                        | Išvada                                        |
| ---------------------------------- | --------------------------------- | --------------------------------------------- |
| `npm run audit:en-language-m13-15` | **OK** (0; 1 allowlist `AI` path) | Regex hibridai uždaryti — **ne** stub/quality |
| `npm run audit:lt-address`         | **OK**                            | tu-forma OK                                   |
| `npm run audit:en-spelling`        | 1 hit `centre` LT alt             | greičiausiai false-positive (§3.4)            |

### 4.2 Meta-radimas (kritinis)

`M13_M15_LANG_FIXLIST_*.md` žymi I1A / W3 / I2 kaip **pritaikyta**, bet live vis dar:

| Fixlist eilutė                        | Live 2026-08-19                                                   |
| ------------------------------------- | ----------------------------------------------------------------- |
| L1-02 13.1 subtitle `garsas`          | **`muzika`**                                                      |
| L1-03/04 `social postas` / `landingo` | **vis dar** 13.1 body (+ glossary twin)                           |
| L3-05 / L2-11 13.6 title              | **`Audio-first: VO ir muzikos aprašymas`**                        |
| L3-07 143 title                       | **`…checklist…`**                                                 |
| L1-12/13 Character / Brand chips      | **vis dar EN**                                                    |
| EN I1A/E2 filler gone                 | **taip** klasikoms; **ne** — `genericBySlide` stubai 13.33 ir kt. |

**Darbo taisyklė:** prieš Wave F apply — **per-verify live**; fixlist „✅“ be re-grep nenaudoti kaip SOT.

### 4.3 Kas jau gerai (nekartoti)

- 130 subtitle LT/EN: `garsas` / `audio`
- 13.12 / 13.4 / 13.325 / 13.52 ciklas — daugiausia banko kalba
- Media pipeline TS LT chip `Užduotis + ženklas`; EN `Sound first`
- Klasikiniai EN filleriai (`Use this step…`, `Pasirink kelia`, `Ka jau zinai`) — **išvalyti**
- DI/AI pagal locale — OK
- tu-forma M13–15 — OK

---

## 5. Liekamų FAIL žemėlapis (Wave F backlog)

### 5.1 P0 — prasmė / first-screen / stub

| #     | Kalba | Skaidrė                          | Problema (live)                             | Taikyti kur              |
| ----- | ----- | -------------------------------- | ------------------------------------------- | ------------------------ |
| F0-01 | LT    | **13.6**                         | title `Audio-first: VO…`                    | ✅ Wave F                |
| F0-02 | LT    | **143**                          | title/shortTitle `checklist`; subtitle dump | ✅ Wave F                |
| F0-03 | LT    | **13.1**                         | subtitle `muzika`; body kalkės              | ✅ Wave F                |
| F0-04 | LT    | **13.11 TS**                     | Brief / Brand consistency                   | ✅ Wave F                |
| F0-05 | EN    | **13.33**                        | stub ×9                                     | ✅ Wave F (9 unique)     |
| F0-06 | EN    | **13.8**                         | glossary mashup                             | ✅ Wave F (23 unique)    |
| F0-07 | EN    | **13.47**                        | LT title leak                               | ✅ `I2V clip builder`    |
| F0-08 | EN    | **13.35 / 13.351**               | shortTitle leak                             | ✅ Wave F                |
| F0-09 | EN    | **13.9**                         | `Ka ismokai`                                | ✅ `What you learned`    |
| F0-10 | EN    | **158**                          | `ownWorkTemplate` LT                        | ✅ Wave F                |
| F0-11 | EN    | **13.34 / 13.5 / 13.7 / 13.101** | stubs                                       | ✅ Wave F (+ 13.6/35/11) |

### 5.2 P1 — chrome / PIRMAS / AmE

| #     | Kalba | Kur                  | Kas                                                                |
| ----- | ----- | -------------------- | ------------------------------------------------------------------ |
| F1-01 | LT    | 13.7 title           | `loudness` → `garsumas` (shortTitle jau OK)                        |
| F1-02 | LT    | 13.3 tools           | Character ref / Brand mood / multi-reference consistency           |
| F1-03 | LT    | 13.351               | `Ready promptas` (§7) · Social post / cover image body             |
| F1-04 | LT    | 150 / 150.5          | bare `hero` / `Brief` chrome                                       |
| F1-05 | LT    | M14 transfer + TQ    | consistency / brief / keyframe / disclosure / `brandą` / `eventas` |
| F1-06 | LT    | 13.52 list           | `Export` → `Eksportuok` / `Eksportas`                              |
| F1-07 | LT    | pvz. sweep           | `pvz.,` learner bodies                                             |
| F1-08 | EN    | 13.51 subtitle       | „music section“ ≠ LT montažas+garsas                               |
| F1-09 | EN    | 140 subtitle         | modality dump ≠ LT „žinios“                                        |
| F1-10 | EN    | `e.g.,` + `recolour` | AmE pass (`m13ConsistencyLockContent.ts`)                          |
| F1-11 | EN    | M14 Q lead           | `Audio-first` → **Sound first** (bank)                             |
| F1-12 | EN    | Recap                | `What you already know?` → natūralus EN                            |
| F1-13 | EN    | 13.6 / 13.35 / 13.11 | likę stub body po In short                                         |

### 5.3 P2 — poliravimas ✅ Wave G + Wave H (2026-08-19)

- ~~`Skyrius:` / `Section:` 13.15 / 13.36 / 13.56~~ ✅ Wave G
- ~~Soft Binding / TOFU dens (§7)~~ ✅ Wave H — 13.101 PIRMAS `(Soft Binding)`; 13.11 chrome `piltuvėlis`, body be TOFU/MOFU/BOFU
- ~~130 CTA ilgis @375~~ ✅ Wave H verify — copy nekeistas; CTA wrap `max-w-md` + `leading-snug`; path picker `grid-cols-1` iki `sm`
- ~~Emocijos suvienodinimas 158~~ ✅ Wave H — EN `Congratulations! You finished…`; LT+EN tagline `garsas` / `audio`; EN `ownWorkLabel` leak uždarytas

---

## 6. Wave F darbo eiga (kaip tęsti)

```text
1. Savininkas uždaro §7 (TERM?) — bent Ready, Soft Binding, TOFU, Driftas
2. CONTENT: dvi fixlistos Wave F lentelės (prieš → po, pažodinis live)
3. DATA LT: modules.json + m13*Content.ts + glossary.json (Conversion/Awareness)
4. DATA EN: build-en-m13-m15.mjs (genericBySlide ↓ packs) + m13-en-plain-overrides.mjs
5. Rebuild: npm run build:modules-en-m13-m15
6. QA: audit:m1315 · audit:lt-address · audit:en-spelling · spot-check §5 P0
7. Atnaujinti TERM_BANK jei §7 pakeitė lentyną; CHANGELOG Unreleased
```

**Stop taisyklė:** vienas chat = viena kalba **arba** viena partija (P0 chrome / P0 EN stubs / P1 sweep) — ne viskas iš karto.

**Agent prompt (kopijuoti)**

```text
LOCALE = LT | EN
Partija = Wave F · <P0-chrome | P0-stubs | P1-sweep>
SOT = docs/development/M13_M15_LANG_AUDIT_FINAL.md §1–§3 + M13_M15_TERM_BANK.md
Išvestis = M13_M15_LANG_FIXLIST_<LT|EN>.md · Wave F lentelė
prieš = pažodinis LIVE (ne senoji fixlist „po“)
EN durable = build-en-m13-m15.mjs + m13-en-plain-overrides.mjs
Won’t: TRIM/TE/S4 · generate:core-data · 12 stem rewrite
```

---

## 7. Sprendimai (užrakinta 2026-08-19)

> Savininkas patvirtino auditoriaus rekomendacijas. Wave F taiko šiuos variantus.

| ID      | Klausimas                                      | Sprendimas                                                 |
| ------- | ---------------------------------------------- | ---------------------------------------------------------- |
| **Q1**  | **Ready** (13.351)                             | LT chrome `Paruoštas`; EN KEEP `Ready`                     |
| **Q2**  | **Soft Binding** (13.101)                      | PIRMAS: `minkštasis susiejimas (Soft Binding)`; toliau LT  |
| **Q3**  | **TOFU / MOFU / BOFU** (13.11)                 | Chrome tik LT piltuvėlio žodžiai; body max vienas gloss    |
| **Q4**  | **Driftas / invariantai / tilt / orbit** (M15) | Copyable MODEL KEEP; Trumpai/Patikra PIRMAS LT             |
| **Q5**  | **loudness** H1                                | KEISTI → `garsumas`                                        |
| **Q6**  | **I2V** title                                  | EN = `I2V clip builder`; LT `I2V klipo generatorius` OK    |
| **Q7**  | Glossary Conversion / Awareness                | Sutapatinti su 13.1 po fix (vienas SOT)                    |
| **Q8**  | M14 **Savitikra**                              | **KEEP** — Path Test lukštas                               |
| **Q9**  | `centre` spelling gate ant LT alt              | Allowlist (`m13ConsistencyLabContent.ts`) — LT vietininkas |
| **Q10** | EN recap `What you already know?`              | `What you already know` (be kalkės `?`)                    |

---

## 8. Patikra pagal SOT (OUTPUT GATE)

Po bet kurio Wave F patch:

- [ ] Chrome be bare KEISTI EN (LT) / be LT leak (EN)
- [ ] PIRMAS gloss ten, kur naujas terminas pirmą kartą body
- [ ] Prasmė LT║EN sutampa (subtitle benefit, ne dump)
- [ ] EN stub unikalių body skaičius = sekcijų skaičius
- [ ] `build:modules-en-m13-m15` paleistas; overlay ne „rankinis amžinas“
- [ ] tu / DI║AI / AmE / `pvz.,` / `e.g.,`
- [ ] TRIM/TE/S4 neliesta

---

## 9. Santrauka savininkui

1. **Kanonas** (§1–§3) — pakankamai užrakintas dirbti; TERM_BANK lieka operacine lentele.
2. **Automatai žali ≠ kalba baigta** — Wave F P0 lentelė §5 yra tikras backlog.
3. **Fixlist drift** — dalis „pritaikyta“ eilučių **ne live**; Wave F prasideda nuo live grep.
4. **Didžiausias EN skausmas** — `genericBySlide` (13.33, 13.8, …), ne senieji I1A filleriai.
5. **Didžiausias LT skausmas** — 13.6 / 143 chrome + 13.1 kalkės + business-workflow TS.
6. **§7 užrakinta** 2026-08-19 — Wave F taiko Q1–Q10.

```text
CHANGES: docs/development/M13_M15_LANG_AUDIT_FINAL.md (naujas FINAL SOT)
CHECKS: live spot-check 13.1/13.6/143/13.33/13.47/13.8 + audit:en-language-m13-15 OK + spelling centre FP
RISKS: Wave F be §7 = spėlionės Ready/TOFU; overlay-only EN = wipe
NEXT: savininkas §7 → CONTENT Wave F fixlistos → DATA LT tada EN durable packs
```
