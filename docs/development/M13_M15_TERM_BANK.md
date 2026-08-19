# M13–M15 term bankas (I0)

> **SOT terminams** LT chrome + EN kanonas. Keičia tik I0 savininkas arba peržiūros metu.  
> **Statusas:** I0 užpildytas 2026-08-17. I1A P0+P1 + W2 filler + W3 chrome **pritaikyta** 2026-08-17. I2 first-screen + ciklas **pritaikyta** 2026-08-18. I3 handout ✅. P2 / I5 walk — atidėta.  
> **Taisyklės:** [`PAPRASTOS_KALBOS_GAIRES.md`](PAPRASTOS_KALBOS_GAIRES.md) · GOLDEN §6c.  
> **Fixlistos:** [`M13_M15_LANG_FIXLIST_LT.md`](M13_M15_LANG_FIXLIST_LT.md) · [`M13_M15_LANG_FIXLIST_EN.md`](M13_M15_LANG_FIXLIST_EN.md).  
> Jei termino nėra čia — fixlistoje žymėk `TERM?`, ne spėliok.

**Lentynos**

- **KEEP** — produkto vardas arba pats mokymo objektas (antraštėje gali likti).
- **PIRMAS KARTAS** — pirmame mokinio paminėjime LT + (EN); toliau tik LT. EN locale — tik EN kanonas.
- **KEISTI** — antraštėse, CTA, Trumpai, navigacijoje, chip’uose, `shortTitle` — tik LT (be bare EN).

Kopijuojamuose promptuose EN komandos modeliui (ROLE / TASK / laukų vardai) **gali likti**. JSON raktai ir `image` keys — ne mokinio tekstas.

---

## KEEP

| Terminas                                                                                   | LT chrome                                                     | EN kanonas                          | Kodėl                             |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------- | --------------------------------- |
| ChatGPT, DALL·E, Ideogram, GPT-Image, FLUX, Midjourney, Leonardo.ai, Adobe Firefly, CapCut | kaip yra                                                      | same                                | produkto vardas                   |
| Seedance, Kling, Veo, Sora                                                                 | kaip yra                                                      | same                                | įrankių matrica (13.5)            |
| **C2PA**                                                                                   | C2PA                                                          | C2PA                                | mokymo objektas                   |
| **CPI**                                                                                    | CPI                                                           | CPI                                 | mokymo objektas                   |
| **I2V**                                                                                    | I2V; pirmas kartas gali būti „video iš kadro (I2V)“           | I2V / image-to-video                | mokymo objektas                   |
| **A/E/C**                                                                                  | A/E/C; juostos LT: atpažįstamumas / įsitraukimas / konversija | Awareness / Engagement / Conversion | triadė; EN neatversti į LT        |
| **LUFS**                                                                                   | LUFS                                                          | LUFS                                | matavimo vienetas                 |
| **SynthID**                                                                                | SynthID                                                       | SynthID                             | produkto / standarto vardas       |
| **MASTER**                                                                                 | MASTER (13.35 šablonas)                                       | MASTER                              | kelio terminas, kaip M7           |
| **#1000Books**                                                                             | #1000Books                                                    | #1000Books                          | tikrinis                          |
| **promptas**                                                                               | promptas                                                      | prompt                              | projekto kanonas (ne barbarizmas) |
| **DI**                                                                                     | DI                                                            | **AI**                              | GOLDEN §6c / PAPRASTOS §4         |
| **16:9 / 1:1 / 9:16**                                                                      | kaip yra                                                      | same                                | formatas                          |

---

## PIRMAS KARTAS

Pirmas mokinio sakinys: LT + skliaustai. Toliau — kairysis stulpelis.

| EN / hibridas     | LT kanonas (toliau)         | Pirmas paminėjimas                    | EN kanonas                                           |
| ----------------- | --------------------------- | ------------------------------------- | ---------------------------------------------------- |
| pipeline          | grandinė / darbo eiga       | grandinė (pipeline)                   | **media chain** / work chain (ne bare `pipeline` H1) |
| workflow          | darbo eiga                  | darbo eiga (workflow)                 | workflow                                             |
| consistency       | nuoseklumas                 | nuoseklumas (consistency)             | consistency                                          |
| reference lock    | referencų užraktas          | referencų užraktas (reference lock)   | reference lock                                       |
| referencai / refs | pavyzdžių nuotraukos        | pavyzdžių nuotraukos (referencai)     | reference photos / refs                              |
| audio-first       | pirma garsas                | pirma garsas (audio-first)            | **sound first** (ne chrome `Audio-first`)            |
| brief             | užduoties aprašas           | užduoties aprašas (brief)             | brief                                                |
| hero              | pagrindinis vaizdas         | pagrindinis vaizdas (hero)            | hero image                                           |
| CTA               | kvietimas veikti            | kvietimas veikti (CTA)                | call to action (CTA)                                 |
| disclosure        | DI žyma                     | DI žyma (disclosure)                  | AI label / disclosure                                |
| storyboard        | scenarijaus piešiniai       | scenarijaus piešiniai (storyboard)    | storyboard                                           |
| aspect ratio      | proporcijos                 | proporcijos (aspect ratio)            | aspect ratio / ratio                                 |
| keyframe          | raktinis kadras             | raktinis kadras (keyframe)            | keyframe                                             |
| VO                | balsas                      | balsas (VO)                           | voice-over (VO)                                      |
| bed               | fonas                       | fonas (bed)                           | bed                                                  |
| checklist         | patikros sąrašas            | patikros sąrašas (checklist)          | checklist                                            |
| provenance        | kilmė                       | kilmė (provenance)                    | provenance                                           |
| KPI               | rodikliai                   | rodikliai (KPI)                       | metrics / KPI                                        |
| landing           | tinklalapio įėjimo puslapis | tinklalapio įėjimo puslapis (landing) | landing page                                         |
| social post       | įrašas socialiniame tinkle  | įrašas socialiniame tinkle            | social post                                          |
| mix               | maišymas                    | maišymas (mix)                        | mix                                                  |
| post-prod         | montažas po generavimo      | montažas po generavimo                | edit after generation                                |
| stories           | vertikalus formatas         | vertikalus formatas (stories)         | stories                                              |

---

## KEISTI (chrome — antraštė / CTA / Trumpai / chip / `shortTitle`)

Live šaltinis: `modules.json` M13–15 + `m13*Content.ts` labeliai. I1A taiso tik partijos A eilutes; likusios — rezervas I1B–E.

| Live (LT chrome)                             | Skaidrė               | Keisti į                                                      | Pastaba                    |
| -------------------------------------------- | --------------------- | ------------------------------------------------------------- | -------------------------- |
| `Reference lock – schema`                    | 13.32                 | Referencų užraktas – schema                                   | I1B                        |
| `Brand / product sheet (minimumas)`          | 13.32                 | Prekės ženklo / produkto lapas (minimumas)                    | I1B                        |
| `Lab: Consistency Drift` / `Consistency lab` | 13.325                | Praktikos dirbtuvė: nuoseklumo slinktis / Nuoseklumo dirbtuvė | I1B; ne `lab` H1           |
| subtitle su `refs` / `fix` / `lock`          | 13.325                | LT veiksmažodžiai                                             | I1B                        |
| `DI vaizdų workflow (5 žingsniai)`           | 13.35                 | DI vaizdų darbo eiga (5 žingsniai)                            | I1B                        |
| `Ready promptas:`                            | 13.35                 | Paruoštas promptas:                                           | I1B                        |
| `storyboard` subtitle                        | 13.4                  | scenarijaus piešiniai                                         | I1C                        |
| `image → video` subtitle                     | 13.4                  | vaizdas → video                                               | I1C OK jei LT žodžiai      |
| `keyframe` subtitle                          | 13.47                 | raktinis kadras (keyframe)                                    | I1C                        |
| `2026 matrix` / `clipą`                      | 13.5                  | 2026 matrica / tinkamą klipą                                  | I1C                        |
| `post-prod` subtitle                         | 13.51                 | montažas                                                      | I1C                        |
| `Audio-first: VO…` title / shortTitle        | 13.6                  | Pirma garsas: balsas ir muzikos aprašymas                     | I1C                        |
| `SFX, commercial OK?, LUFS`                  | 13.7                  | efektai, ar galima komercijai, LUFS                           | I1C; LUFS KEEP             |
| `nuo brief iki` title                        | 13.11                 | nuo užduoties aprašo iki                                      | I1C; brief PIRMAS tik body |
| `audio-first` CTA                            | 140                   | pirma garsas                                                  | I1D                        |
| `checklist` title                            | 143                   | patikros sąrašas                                              | I1D                        |
| `Optional:` subtitle                         | 151–154               | nuimti; `optional: true` + badge                              | I1E; PAPRASTOS §2a         |
| `(optional)` heading                         | 13.33                 | nuimti; `optional: true`                                      | I1B                        |
| `Brief + ženklas` chip                       | 13.12 TS              | Užduotis + ženklas                                            | **I1A**                    |
| `Skyrius:` section-break subtitle            | 13.15 / 13.36 / 13.56 | be `Skyrius:`                                                 | P2; I1A fiksuota 13.15     |

**EN chrome kanonas** (kad EN agentas neverstų atgal į LT): `media chain` · `workflow` · `consistency` · `reference lock` · `sound first` · `Quick start` (EN OK) · `hero image` · `Lab:` EN locale OK.

---

## I1A peržiūros imtis (stop — ~10 / kalba)

Žmogus patvirtina prieš I1B. Pilnos eilutės — fixlistose.

**LT (žiūrėk `L1-01`…):** `pvz.,` · 13.1 `muzika` vs `garsas` · `landingo` · `vaize` → `vaizde` · `Brief + ženklas` chip · `reference lock` 13.15 nextSteps · `social postas` · `aspect ratio` Trumpai (PIRMAS OK) · `stories` · 130 CTA ilgis @375.

**EN (žiūrėk `E1-01`…):** 130 `music` vs LT `garsas` · `howToUseModule` LT leak · 13.12 walk filler + LT heading’ai · 13.12 `shortTitle` be diakritikos · 13.15 recap stub · 13.2 body stub × visos sekcijos · 13.12 subtitle ≠ LT prasmė · `e.g.,` · 13.15 recap `Ka jau zinai?`.

**Stop taisyklė:** I1B ir JSON taikymas — tik po šios imties.

---

## Agent prompt (I1 B–E — kopijuoti į du chat’us)

```text
LOCALE = LT | EN   (tik viena)
Partija = <A–E ID iš plano>
SOT = docs/development/M13_M15_TERM_BANK.md
Išvestis = M13_M15_LANG_FIXLIST_<LT|EN>.md
Rubrika LT: skyryba · rašyba · logika · stilius (tu) · kultūra
Rubrika EN: e.g., · AmE · prasmė=LT bet idiomas · You · be LT leak / walk filler
Skaityti tik savo paviršius. Nerašyti JSON / TS / build.
prieš = pažodinis live. TERM? jei nėra banke.
```

**Won’t:** M13 TRIM/TE/S4 · M14 stem rewrite · `151–154` scenarijų rewrite · `generate:core-data` · hygiene→0 · vizualo §6b.
