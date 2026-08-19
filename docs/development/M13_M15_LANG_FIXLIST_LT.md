# M13–M15 LT korektūros fixlist (prieš → po)

> **Apimtis:** M13–15 learner copy. **Statusas:** I1A P1 **pritaikyta** 2026-08-17 (L1-01…16). P2 **Wave G + Wave H applied** 2026-08-19 (L1-17 Skyrius; L1-22 @375 verify; Soft Binding / TOFU / 158). W3 chrome **pritaikyta**. **I2 first-screen + ciklas pritaikyta** 2026-08-18 (L2-01…19). **Wave F P0+P1 applied** 2026-08-19 (LF-01… + I5).  
> **Šaltinis:** `src/data/modules.json` (LT) + `m13MediaPipelineContent.ts` / `m13DiagramContent.ts`. Stulpelis „prieš“ – tekstas prieš apply.  
> **Taikymo tvarka:** DATA_AGENT → `modules.json` + `.ts` content; **ne** `generate:core-data`. Vartai: `audit:lt-address`, `audit:slide-titles`, `validate:schema`.  
> **Sunkumas:** P0 – keičia prasmę / first-screen FAIL; P1 – tikra kalbos klaida; P2 – poliravimas (skip).  
> **Term bankas:** [`M13_M15_TERM_BANK.md`](M13_M15_TERM_BANK.md). Precedentas: [`M10_M12_LANG_FIXLIST_LT.md`](M10_M12_LANG_FIXLIST_LT.md).

**I1A sunkumas:** P0: 0 · P1: 14 (✅) · P2: 6 (skip)

**Won’t:** TRIM/TE/S4 · M14 item rewrite · `151–154` rewrite · JSON raktai · copyable EN komandos modeliui.

---

## I1A — `130`, `13.1`, `13.12`, `13.15`, `13.2`, `13.3` + pipeline/AEC TS

| #     | skaidrė  | kelias                                                           | prieš                                                                                                                                      | po                                                                                                                                          | taisyklė                                                                     | sunk. |
| ----- | -------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----- |
| L1-01 | 130      | `content.firstActionCTA`                                         | Per 1–2 min atidaryk vieną vaizdų generavimo įrankį (pvz. ChatGPT su DALL·E arba Ideogram) ir sugeneruok vieną vaizdą pagal savo aprašymą. | Per 1–2 min atidaryk vieną vaizdų generavimo įrankį (pvz., ChatGPT su DALL·E arba Ideogram) ir sugeneruok vieną vaizdą pagal savo aprašymą. | įterpinys „pvz.“ su kableliu                                                 | P1    |
| L1-02 | 13.1     | `subtitle`                                                       | Vaizdai, video, muzika – įrankiai ir promptai                                                                                              | Vaizdai, video, garsas – įrankiai ir promptai                                                                                               | logika: 13.6 moko garsą (balsas/fonas), ne tik muziką; 130 jau sako „garsas“ | P1    |
| L1-03 | 13.1     | `content.sections[3].body`                                       | tinka: reklamos maketas, landingo pagrindinis vaizdas (hero), „pirk dabar“ blokas                                                          | tinka: reklamos maketas, tinklalapio pagrindinis vaizdas (hero), „pirk dabar“ blokas                                                        | barbarizmas „landingas“; hero = PIRMAS KARTAS (bankas)                       | P1    |
| L1-04 | 13.1     | `content.sections[3].body`                                       | tinka: viršelis, baneris, social postas                                                                                                    | tinka: viršelis, baneris, įrašas socialiniame tinkle                                                                                        | kalkė „social postas“                                                        | P1    |
| L1-05 | 13.12    | `content.sections[1].imageAlt`                                   | Generatyvinės medijos grandinė: brief, kadrai, referencai, I2V, garsas, patikra                                                            | Generatyvinės medijos grandinė: užduoties aprašas, kadrai, pavyzdžių nuotraukos, I2V, garsas, patikra                                       | chrome/alt: brief ir referencai – KEISTI / PIRMAS; I2V KEEP                  | P1    |
| L1-06 | 13.15    | `content.nextSteps[2]`                                           | Tas pats produktas serijoje – 3–5 pavyzdžių nuotraukos (reference lock)                                                                    | Tas pats produktas serijoje – 3–5 pavyzdžių nuotraukos (referencų užraktas)                                                                 | KEISTI chrome; lock = bankas                                                 | P1    |
| L1-07 | 13.2     | `content.sections[0].body`                                       | proporcijas (pvz. 16:9, 1:1)                                                                                                               | proporcijas (pvz., 16:9, 1:1)                                                                                                               | kablelis po „pvz.“                                                           | P1    |
| L1-08 | 13.2     | `content.sections[4].copyable`                                   | Nenaudok tekstų vaize.                                                                                                                     | Nenaudok tekstų vaizde.                                                                                                                     | rašyba: „vaizdas“ vietininkas                                                | P1    |
| L1-09 | 13.2     | `content.sections[5].body`                                       | arba nurodyk „be teksto vaize“                                                                                                             | arba nurodyk „be teksto vaizde“                                                                                                             | ta pati rašyba                                                               | P1    |
| L1-10 | 13.3     | `content.sections[3].copyable`                                   | be tekstų vaize                                                                                                                            | be tekstų vaizde                                                                                                                            | ta pati rašyba                                                               | P1    |
| L1-11 | 13.3     | `content.tools[2].useCases[2]`                                   | Reference lock                                                                                                                             | Referencų užraktas                                                                                                                          | mokinio chip; KEISTI                                                         | P1    |
| L1-12 | 13.3     | `content.tools[3].useCases[1]`                                   | Character ref                                                                                                                              | Personažo pavyzdys                                                                                                                          | chrome chip; ne bare EN                                                      | P1    |
| L1-13 | 13.3     | `content.tools[3].useCases[2]`                                   | Brand mood                                                                                                                                 | Ženklo nuotaika                                                                                                                             | chrome chip                                                                  | P1    |
| L1-14 | 13.12 TS | `m13MediaPipelineContent.ts` `STEPS_LT[0].label`                 | Brief + ženklas                                                                                                                            | Užduotis + ženklas                                                                                                                          | 6 chip’ų pirmoji eilutė = chrome; brief = PIRMAS tik body                    | P1    |
| L1-15 | 13.1 TS  | `m13DiagramContent.ts` `getM13AecExplanations` LT Awareness body | Tipiniai formatai: viršelis, baneris, social postas.                                                                                       | Tipiniai formatai: viršelis, baneris, įrašas socialiniame tinkle.                                                                           | tas pats kaip L1-04; Shell moko                                              | P1    |
| L1-16 | 13.1 TS  | `m13DiagramContent.ts` Conversion body                           | reklamos maketas, landingo pagrindinis vaizdas (hero)                                                                                      | reklamos maketas, tinklalapio pagrindinis vaizdas (hero)                                                                                    | tas pats kaip L1-03                                                          | P1    |
| L1-17 | 13.15    | `subtitle`                                                       | Skyrius: promptai, stilius, proporcijos ir įrankiai                                                                                        | Promptai, stilius, proporcijos ir įrankiai                                                                                                  | PAPRASTOS §2a: be „Skyrius:“ antraštėje                                      | P2    |
| L1-18 | 13.3     | `content.sections[0].body`                                       | Proporcijos (kadro plotis×aukštis, aspect ratio): 1:1 kvadratas, 16:9 platus, 9:16 vertikalus (stories).                                   | Proporcijos (kadro plotis×aukštis, aspect ratio): 1:1 kvadratas, 16:9 platus, 9:16 vertikalus formatas (stories).                           | PIRMAS `aspect ratio` OK; `stories` – PIRMAS                                 | P2    |
| L1-19 | 13.3     | `content.tools[5].useCases[1]`                                   | C2PA / provenance                                                                                                                          | C2PA / kilmė                                                                                                                                | C2PA KEEP; provenance = PIRMAS                                               | P2    |
| L1-20 | 13.12 TS | `getM13MediaPipelineChrome` LT `aria`                            | Šeši žingsniai: brief, kadrai, …                                                                                                           | Šeši žingsniai: užduotis, kadrai, …                                                                                                         | sr-only, bet mokinys girdi; kaip L1-14                                       | P2    |
| L1-21 | 13.12 TS | `getM13MediaPipelineExplanations` LT [5].body                    | disclosure (C2PA / žmogui matoma DI žyma)                                                                                                  | DI žyma (disclosure / C2PA)                                                                                                                 | PIRMAS: LT pirma                                                             | P2    |
| L1-22 | 130      | `content.firstActionCTA` (ilgis)                                 | _(tas pats sakinys kaip L1-01, ~155 simb.)_                                                                                                | Palikti vieną sakinį; @375 wrap OK. **Wave H 2026-08-19 verify:** copy nekeistas.                                                           | UI_UX @375: wrap, ne kalbos klaida                                           | P2    |

**I1A palikta (ne klaida):** 130 `užduoties aprašo (brief)` — PIRMAS OK · 13.1 `atpažįstamumas (Awareness)` — PIRMAS OK · 13.12 Trumpai jau LT · I2V / A/E/C / C2PA KEEP · 13.2 `promptas` KEEP · footeriai „Toliau – skaidrė N“ = GOLDEN §3.6.

**I1A apply:** L1-01…16 ✅ · L1-17 Wave G ✅ · L1-22 Wave H verify ✅.

---

## W3 — LT chrome (title / subtitle / heading / chip; be I2 body)

| #     | skaidrė | kelias                              | prieš              | po                                                            | taisyklė                                      | sunk. |
| ----- | ------- | ----------------------------------- | ------------------ | ------------------------------------------------------------- | --------------------------------------------- | ----- |
| L3-01 | 13.32   | `sections[1].heading`               | _(schema heading)_ | Referencų užraktas – schema                                   | KEISTI chrome                                 | P1    |
| L3-02 | 13.32   | `sections[2].heading`               | _(brand sheet)_    | Prekės ženklo / produkto lapas (minimumas)                    | KEISTI chrome                                 | P1    |
| L3-03 | 13.325  | `title` / `shortTitle`              | _(lab EN/jargon)_  | Praktikos dirbtuvė: nuoseklumo slinktis / Nuoseklumo dirbtuvė | KEISTI; EN title lieka Lab: Consistency Drift | P1    |
| L3-04 | 13.35   | `sections` heading                  | _(workflow EN)_    | DI vaizdų darbo eiga (5 žingsniai)                            | KEISTI                                        | P1    |
| L3-05 | 13.6    | `title` / `subtitle` / `shortTitle` | audio-first chrome | Pirma garsas: balsas ir muzikos aprašymas                     | KEISTI; body `audio-first` PIRMAS OK          | P1    |
| L3-06 | 140     | `firstActionCTA`                    | …audio-first…      | …pirma garsas…                                                | CTA chrome                                    | P1    |
| L3-07 | 143     | `title` / `shortTitle`              | checklist          | Papildomai: medijos grandinės patikros sąrašas per 5 min      | KEISTI                                        | P1    |
| L3-08 | 151–154 | `subtitle`                          | `Optional: …`      | be `Optional:` (`optional: true` + badge lieka)               | chrome; `scenarioDescription` Optional = I2   | P1    |

**W3 apply:** L3-01…08 ✅. I2 body + I3 handout shipped 2026-08-18 (I2-M13 / M15-I3 / Walk RAW). I5 walk — parked (T01 I5).

---

## I2 — first-screen + ciklas (MUST kelias; P2 skip)

> Savininkas: I2-M13. P0 = first-screen / prasmė. P1 = KEISTI chrome be gloss. Copyable **modelis** KEEP. Craft Stage — atskira partija (C-M1–M3 ✅).

| #     | skaidrė  | kelias                                 | prieš                                                 | po                                                            | taisyklė      | sunk. |
| ----- | -------- | -------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- | ------------- | ----- |
| L2-01 | 13.12    | schema / Kodėl / Daryk / wrapper       | `brief` · `Checklist` · `checklistą`                  | užduoties aprašas · patikros sąrašas                          | KEISTI ciklas | P1    |
| L2-02 | 13.12    | Kur pritaikyti                         | social trumpi video                                   | trumpi vaizdo įrašai socialiniame tinkle                      | kalkė         | P1    |
| L2-03 | 13.4     | subtitle / Trumpai / heading           | storyboard · stills · `Image → video`                 | scenarijaus piešiniai · kadrai · Vaizdas → video              | first-screen  | P0    |
| L2-04 | 13.4     | Image body / Patikra                   | Hero / keyframe / Audio-first / VO / hero / reference | pagrindinis vaizdas / raktinis kadras / pirma garsas / balsas | ciklas        | P0    |
| L2-05 | 13.47    | subtitle / tldr / patikra              | keyframe · image-to-video · hero still                | raktinis kadras (keyframe) · I2V · pagrindinis kadras         | first-screen  | P0    |
| L2-06 | i2vGen   | lt.json tldr / labels / check          | keyframe · image-to-video · hero still                | raktinis kadras · I2V · pagrindinis kadras                    | CODING i18n   | P0    |
| L2-07 | 13.5     | subtitle / Daryk / copyable            | matrix · clipą · keyframe · retry · usable            | matrica · klipą · raktinis kadras · bandymai                  | first-screen  | P0    |
| L2-08 | 13.32    | ciklas / footer / alt                  | reference · Consistency lab · Hero · refs             | pavyzdžių nuotraukos · nuoseklumo dirbtuvė · pagrindinis      | KEISTI        | P1    |
| L2-09 | 13.325   | subtitle / Trumpai / Drift lab         | refs / fix / lock · reference lock · briefą           | pavyzdžiai / taisymas / užraktas · užduotį                    | KEISTI        | P1    |
| L2-10 | 13.52    | Trumpai / heading / Patikra            | raw · deliverable · checklist · VO / bed              | žalia medžiaga · patikros sąrašas · balsas / fonas            | ciklas        | P1    |
| L2-11 | 13.6     | Trumpai / Daryk / headings / Patikra   | audio-first · VO · bed · license intent · Voiceover   | pirma garsas · balsas · fonas · licencija                     | ciklas        | P0    |
| L2-12 | 13.7     | subtitle / Trumpai / Daryk             | SFX · commercial OK · loudness · checklist            | efektai · ar galima komercijai · garsumas · patikros sąrašas  | first-screen  | P0    |
| L2-13 | 13.11    | title / subtitle / shortTitle / ciklas | nuo brief · Brief →                                   | nuo užduoties aprašo                                          | KEISTI chrome | P0    |
| L2-14 | 13.101   | Trumpai / Patikra / footer             | disclosure · checklist · brief–publikacija            | DI žyma · patikros sąrašas · užduotis–publikacija             | ciklas        | P1    |
| L2-15 | 13.9     | items                                  | Consistency lab · nuo brief                           | nuoseklumo dirbtuvė · nuo užduoties aprašo                    | santrauka     | P1    |
| L2-16 | 13.56    | footer / recap                         | Audio-first · keyframe                                | Pirma garsas · raktinis kadras                                | chrome        | P1    |
| L2-17 | 13.3     | tools chip                             | Greitas brief                                         | Greita užduotis                                               | chip          | P1    |
| L2-18 | 13.12 TS | aria / expl. 6                         | brief · mix · disclosure                              | užduotis · maišymas · DI žyma                                 | TS chrome     | P1    |
| L2-19 | 13.51    | subtitle                               | post-prod                                             | montažą                                                       | chrome        | P1    |

**I2 apply:** L2-01…19 ✅ 2026-08-18. P2 skip: `Skyrius:` 13.15/13.56 · 13.101 collapsible siena (išskyrus `vaize`) · vaizdoGen optional.

---

## Wave F — I1 LT P0 chrome (2026-08-19)

> prieš = LIVE prieš šį apply. FINAL F0-01…03 + F1-01/02.

| #     | skaidrė | kelias                 | prieš                                                    | po                                                                  | taisyklė      | sunk. |
| ----- | ------- | ---------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- | ------------- | ----- |
| LF-01 | 13.6    | `title`                | Audio-first: VO ir muzikos aprašymas                     | Pirma garsas: balsas ir muzikos aprašymas                           | KEISTI chrome | P0    |
| LF-02 | 143     | `title` / `shortTitle` | …checklist… / Grandinės checklist                        | …patikros sąrašas… / Grandinės patikros sąrašas                     | KEISTI        | P0    |
| LF-03 | 143     | `subtitle`             | Brief → stills → video/garsas → disclosure               | Užduotis → kadrai → video/garsas → DI žyma                          | KEISTI        | P0    |
| LF-04 | 143     | Trumpai                | mini pipeline: brief, stills… audio-first… disclosure    | mini grandinę: užduoties aprašas, kadrai… pirma garsas… DI žyma     | KEISTI ciklas | P0    |
| LF-05 | 13.1    | `subtitle`             | …muzika…                                                 | …garsas…                                                            | logika vs 130 | P0    |
| LF-06 | 13.1    | `sections` kampanijos  | social postas · landingo                                 | įrašas socialiniame tinkle · tinklalapio pagrindinis vaizdas (hero) | kalkė         | P0    |
| LF-07 | 13.7    | `title`                | …loudness                                                | …garsumas                                                           | Q5            | P1    |
| LF-08 | 13.3    | tools chips + desc     | Character ref · Brand mood · multi-reference consistency | Personažo pavyzdys · Ženklo nuotaika · kelių pavyzdžių nuoseklumas  | KEISTI        | P1    |
| LF-09 | 13.15   | recap item             | Grandinės checklist                                      | Grandinės patikros sąrašas                                          | chrome        | P1    |

**I1 apply:** LF-01…09 ✅ 2026-08-19.

## Wave F — I2 LT TS + glossary + Ready (2026-08-19)

| #     | skaidrė         | kelias                      | prieš                                | po                                                                  | taisyklė      | sunk. |
| ----- | --------------- | --------------------------- | ------------------------------------ | ------------------------------------------------------------------- | ------------- | ----- |
| LF-10 | 13.11 TS        | LABELS_LT / explanations    | Brief · Brand consistency · workflow | Užduotis · Ženklo nuoseklumas · darbo eiga                          | KEISTI chrome | P0    |
| LF-11 | glossary + 13.8 | Awareness / Conversion defs | social postas · landingo hero        | įrašas socialiniame tinkle · tinklalapio pagrindinis vaizdas (hero) | Q7            | P0    |
| LF-12 | 13.351          | subtitle / heading / cycle  | Ready promptas                       | Paruoštas promptas                                                  | Q1            | P1    |

**I2 apply:** LF-10…12 ✅ 2026-08-19.

## Wave F — I5 LT P1 (2026-08-19)

150 / 150.5 chrome `hero`/`Brief` → pagrindinis vaizdas / užduoties aprašas. 13.52 `Export` → `Eksportuok`. Soft Binding PIRMAS. 143 `eventas`/`checklist`/`disclosure`. M14 Q `pirma garsas`. 153 `Slinktis (driftas)`. `pvz.,` 13.2/13.3/13.31.

**I5 apply:** ✅ 2026-08-19.

## Wave H — §5.3 P2 (2026-08-19)

| #     | skaidrė | kelias            | prieš                                                    | po                                                                                 | taisyklė     | sunk. |
| ----- | ------- | ----------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------ | ----- |
| LH-01 | 13.101  | Soft Binding body | `minkštasis susiejimas (Soft Binding / vandens ženklas)` | `minkštasis susiejimas (Soft Binding)`                                             | Q2 PIRMAS    | P2    |
| LH-02 | 13.11   | heading + body    | `funnel` / TOFU MOFU BOFU / Awareness                    | `piltuvėlis`; `atpažįstamumas, svarstymas ar veiksmas (viršus / vidurys / apačia)` | Q3 chrome LT | P2    |
| LH-03 | 130     | `firstActionCTA`  | —                                                        | **verify only** — wrap OK @375                                                     | L1-22        | P2    |
| LH-04 | 158     | `tagline`         | `… + muzika = …`                                         | `… + garsas = …`                                                                   | bankas       | P2    |

**Wave H apply:** ✅ 2026-08-19.
