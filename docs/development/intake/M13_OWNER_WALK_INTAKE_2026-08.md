# M13 owner walk intake (2026-08)

> **Fazė A – Intake.** Walk T01–T18 ✅ žurnale. **Sisteminės ašys SYS-A…H** → [`TODO.md`](../../../TODO.md) **§1.3c**.  
> Playbook = [`M10_M12_TESTER_INTAKE_2026-08.md`](M10_M12_TESTER_INTAKE_2026-08.md).  
> Live SOT: `docs/turinio_pletra_moduliai_13_14_15.md` + `src/data/modules.json` (M13).  
> EN: `build:modules-en-m13-m15` (**ne** `generate:core-data`).  
> **Locked:** T17 0× Neprivaloma/Privaloma · T16 celebration · batch eilė SYS-A→H.  
> **Statusas:** Phase B **Must A–F + Should G/H done** 2026-08-19 (SYS-A…H). JSON/React = batch atliktas.

---

## 0. Freeze vs intake

| Sluoksnis                  | Būsena                                | Ką tai reiškia                                                        |
| -------------------------- | ------------------------------------- | --------------------------------------------------------------------- |
| **M13 TRIM / TE / S4**     | **FREEZE**                            | Neliečiam metaforų, naujų Pattern, Feature Doc, `generate:core-data`. |
| **Šis intake**             | Phase B **SYS-A…H done** → TODO §1.3c | T01–T18 Must + G/H Should shipped.                                    |
| **M14 / M15 learner walk** | **uždaryta**                          | Lieka tame intake. Complete-screen #16 parked.                        |
| **Craft Could C-C\***      | parked                                | Ne šis ciklas.                                                        |

**Kodėl abu vienu metu:** freeze saugo corporate15 pin ir TRIM. Intake saugo, kad savininko signalas nedingtų ir nebūtų „tyliai taisoma“ prieš triažą.

---

## 1. Darbo ciklas

| Fazė          | Kas vyksta                                           | Kas čia rašoma                              |
| ------------- | ---------------------------------------------------- | ------------------------------------------- |
| **A. Intake** | Skaidrės, printscreen’ai, klaidos / raiškos pastabos | §1.1 žurnalas + §R.\* – **be** JSON keitimų |
| **B. Batch**  | Tik po savininko triažo: Must / Should / Won’t       | Apdorota zona + handoff agentams            |
| **C. Sync**   | EN overlay + auditai                                 | `build:modules-en-m13-m15`, `audit:m1315`   |

**Taisyklės intake metu:**

1. Fiksuojame viską – nefiltruoju „ar vėliau pravers“.
2. **Nekeiciu** `modules.json` / EN overlay / React / SOT, kol neprasideda batch.
3. Jei prieštarauja freeze / GOLDEN / SOT → `[KONFLIKTAS]`, abi versijos.
4. Terminologija: **DI**; „promptas“; kreipinys **tu**.
5. Fokusas: savininko kelionė (schema, raiška, klaida), ne naujas polish epikas.
6. Kartojasi jau uždarytas Must (I2-M13 / kiss / craft) → vis tiek įrašau, pažymiu `[JAU TAISYTA?]` ir palieku triažui.

### 1.1 Intake žurnalas

| #   | Data       | Skaidrė                                       | Tema                                                                                                  | Kur        | Statusas                                     |
| --- | ---------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| 1   | 2026-08-19 | M13 / `13.1` Kampanijos tikslai               | Schema per maža (ne centrinė); A/E/C vadovas kaip atsitiktinė pastaba                                 | §R.M13-T01 | **open** · netaisyta                         |
| 2   | 2026-08-19 | M13 / `13.12` Medijos grandinė                | Per daug žargono; mokinio kalba = lietuvių                                                            | §R.M13-T02 | **open** · netaisyta                         |
| 3   | 2026-08-19 | M13 / `13.15` Vaizdo generavimas              | Šriftai / tipografija / raidžių dydis vs GOLDEN + praktikos                                           | §R.M13-T03 | **open** · netaisyta · **→ T16 celebration** |
| 4   | 2026-08-19 | M13 / `13.2` Vaizdo prompto pagrindai         | Schema per maža + vystyti; kopijuojamas promptas neišsamus                                            | §R.M13-T04 | **open** · netaisyta                         |
| 5   | 2026-08-19 | M13 / `13.3` Stilius ir proporcijos           | Įrankių katalogas tik 6 skaidrėje, nors minėti anksčiau – pedagogikos klaida; **atskiras sprendimas** | §R.M13-T05 | **done** · S2+S3                             |
| 6   | 2026-08-19 | M13 / `13.32` Tas pats vaizdas                | LT skaidrė pilna žargono; neaišku kas yra referenc; schema per maža                                   | §R.M13-T06 | **open** · netaisyta                         |
| 7   | 2026-08-19 | M13 / `13.325` Nuoseklumo dirbtuvė            | Trūksta interaktyvumo, promptų, pavyzdžių; idėja gera, bet dar ne lab                                 | §R.M13-T07 | **done** · W1–W5                             |
| 8   | 2026-08-19 | M13 / `13.33` Kompozicija ir kadras           | Schema per maža; **optional** — repo to nedaro; turi būti normali užduotis                            | §R.M13-T08 | **open** · netaisyta                         |
| 9   | 2026-08-19 | M13 / `13.35` Darbo eiga ir MASTER            | Pedagoginė raizgalynė; eiga be schemos; skelti į 2 skaidres?                                          | §R.M13-T09 | **open** · netaisyta                         |
| 10  | 2026-08-19 | M13 / `13.37` Vaizdo generatorius             | Puiki; vizualus/UX polish; Trumpai leak „neprivaloma skaidrė“                                         | §R.M13-T10 | **open** · netaisyta                         |
| 11  | 2026-08-19 | M13 / `13.36` Video generavimas               | Šriftai/dydžiai = T03; turinys: same product, I2V, CPI first-screen                                   | §R.M13-T11 | **open** · netaisyta · **→ T16 celebration** |
| 12  | 2026-08-19 | M13 / `13.4` Trumpas vaizdo scenarijus        | Copy = metodinė kūrėjui, ne mokinio UI; OK/FAIL                                                       | §R.M13-T12 | **open** · netaisyta                         |
| 13  | 2026-08-19 | M13 / `13.47` I2V generatorius                | Poliruoti ir vystyti tekstus + UX (13.37 etalonas)                                                    | §R.M13-T13 | **open** · netaisyta                         |
| 14  | 2026-08-19 | M13 / `13.5` Video įrankiai + CPI             | Atsitiktinės frazės; nebaigtas UI; authoring dump                                                     | §R.M13-T14 | **open** · netaisyta                         |
| 15  | 2026-08-19 | M13 / `13.52` Montažas                        | Didesnė schema? EN Cut/Grade/Mix; UX; LT                                                              | §R.M13-T15 | **open** · netaisyta                         |
| 16  | 2026-08-19 | M13 / `13.56` Garsas (+ siblings 13.15/13.36) | 3-ia skiriamoji skurdi; **locked: celebration hero**                                                  | §R.M13-T16 | **open** · netaisyta                         |
| 17  | 2026-08-19 | M13 / `13.8` Žodynėlis (+ visi M13 optional)  | **Must:** jokių „Neprivaloma“ mokiniui                                                                | §R.M13-T17 | **open** · netaisyta · **policy locked**     |
| 18  | 2026-08-19 | M13 / `13.101` Verslas ir rizikos             | Metodika; ne verslo kalba; nebaigtas UI; „privaloma“                                                  | §R.M13-T18 | **open** · netaisyta                         |

### 1.2 Sisteminės ašys (triažas 2026-08-19)

> Walk T01–T18 → **ne 18 atskirų epic’ų**. Žemiau = batch bangos. Locked = savininkas jau nusprendė.

| ID        | Sisteminė problema                                                                       | Ticket’ai                              | Prioritetas     | Locked?        |
| --------- | ---------------------------------------------------------------------------------------- | -------------------------------------- | --------------- | -------------- |
| **SYS-A** | **0× privaloma/neprivaloma** mokiniui (badge, Trumpai, H, Patikra)                       | T17 · T08 · T10 · T18                  | **Must**        | **Taip**       |
| **SYS-B** | **Skyrių skiriamosios skurdžios** — celebration hero + tipografijos dydžiai              | T16 · T03 · T11                        | **Must**        | **Taip (A)**   |
| **SYS-C** | **Schemos per mažos / EN chip’ai** first-screen (ne herojus, ne LT)                      | T01 · T02 · T04 · T06 · T15 · T08 size | **Must**        | Ne (dydis+LT)  |
| **SYS-D** | **Authoring / metodika ≠ mokinio UI** — collapsible sienos, JSON laukai, kūrėjo leksika  | T12 · T14 · T18 · T09                  | **Must**        | T09 P1 laukia  |
| **SYS-E** | **Prompt maturity** — 1 Daryk + 1 copyable; Stage slotai; ne Flagship dump / ne 3 sienos | T04 · T12 · T13 hint · T10/T13 polish  | **Must**        | Ne             |
| **SYS-F** | **Generatoriai** — 13.37/13.47 polish+vystymas (taktai, LT promptas, įrankių siena)      | T10 · T13                              | **Should→Must** | Ne             |
| **SYS-G** | **Lab jausmas** 13.325 — thumbs / Before-After / LT                                      | T07                                    | **Should**      | **Done** W1–W5 |
| **SYS-H** | **Įrankių pedagogika** — kada katalogas vs „atidaryk įrankį“                             | T05 · T13/T14 echo                     | **Should**      | **Done** S2+S3 |

**Won’t (visoms bangoms):** rainbow · enlarge ON interactive · naujas Pattern be Feature Doc · `generate:core-data` M13+ · TRIM/TE/S4 formų reopen · hygiene→0.

**Batch eilė (kai „tvarkom“):** SYS-A → SYS-B → SYS-C → SYS-D/E → SYS-F → SYS-G/H.

### 1.3 Triažas pagal ticket (detalė)

| Ticket     | Bangos | Must (šiame batch)                           | Should              | Won’t                    |
| ---------- | ------ | -------------------------------------------- | ------------------- | ------------------------ |
| T01 13.1   | C      | Schema herojus; A/E/C bullet’ai              | —                   | Feature Doc / enlarge ON |
| T02 13.12  | C      | LT schema labeliai (ne I2V/referencų first)  | —                   | C2PA drop                |
| T03→T16    | B      | Celebration + tokenai                        | —                   | Platform retheme         |
| T04 13.2   | C+E    | Schema dydis; Stage 3 sluoksnių šablonas     | —                   | Flagship                 |
| T05 13.3   | H      | S2+S3 done                                   | —                   | C-W4 tyliai              |
| T06 13.32  | C      | LT be Reference lock/refs                    | —                   | S4 formos keitimas       |
| T07 13.325 | G      | W1–W5 done                                   | —                   | User upload              |
| T08 13.33  | A+C    | O1 MUST + schema dydis (su T17)              | —                   | optional badge           |
| T09 13.35  | D      | P1 skaidymas + eigos schema (laukia confirm) | —                   | VerticalFlow facade      |
| T10 13.37  | A+F    | Trumpai be optional/meta                     | UX polish           | Rebuild Pattern          |
| T11→T16    | B      | Celebration + recap gloss                    | —                   | —                        |
| T12 13.4   | D+E    | 1 Daryk + 1 LT šablonas                      | —                   | 3 copyable sienos        |
| T13 13.47  | F+E    | LT promptas + 13.37 taktai                   | Įrankių sutraukimas | Naujas Pattern           |
| T14 13.5   | D+H    | Matrica UI; išmesti `duration_s`             | —                   | 2026 H1                  |
| T15 13.52  | C      | LT Cut→Kirpimas… + dydis                     | —                   | S4 keitimas              |
| T17        | A      | 0× Neprivaloma/Privaloma                     | —                   | Badge „gali nedaryti“    |
| T18 13.101 | D+A    | Verslo esmė + Daryk; 0× privaloma            | —                   | Art. 50 wall             |

---

## RAW – pastebėjimai (neatidaryta į pataisas)

### R.M13-T01 – Skaidrė `13.1` „Kampanijos tikslai – schema“ (A/E/C piltuvas)

**Savininko signalas (2026-08-19, LT UI, `localhost:3000`, 2 / 26):**

1. **Schema per maža.** Neatitinka gerosios praktikos: schema skaidrėje turi būti **centrinė**.
2. **Vadovas po schema** atrodo kaip atsitiktinė pastaba. Reikia **bullet points**, raiškiau.
3. Toliau savininkas teiks kitas skaidres – šis ticket’as neuždaro walk.

**UI kontekstas (screenshot, pasirinkta 1 juosta):**

- Nav: `2 / 26` · Tęsti: Medijos grandinė (`13.12`)
- Trumpai (geltonas callout): prieš generuojant vaizdą/video pasirink tikslą (Awareness / Engagement / Conversion); schema sieja tikslą su vizualu
- H: **Kampanijos tikslai – schema**
- Piltuvas (kairė-centras, vizualiai siauras palyginti su skaidrės pločiu): Atpažįstamumas (mėlyna) → Įsitraukimas (geltona, hover) → Konversija (žalia)
- Po piltuvu: „Paspausk juostą – kad rinktis“ + 1 / 2 / 3
- Po schema: antraštė **Atpažįstamumas** + pastraipa („Pritrauk dėmesį emocija ir kontrastu…“)
- Apačioje viena eilutė: „Pasirink tikslą – juosta parodo, ką pabrėžti: emocija viršuje, aiškumas apačioje.“

**Savininko target copy (batch’ui, ne kodas dabar):**

> **Kampanijos tikslai (kuo vadovautis)**
>
> - **Atpažįstamumas (Awareness)** – dėmesys, emocija; tinka: viršelis, baneris, social postas.
> - **Įsitraukimas (Engagement)** – kontekstas, sustojimas; tinka: karuselė (keli kadrai), video intro, iliustracija.
> - **Konversija (Conversion)** – veiksmas, produktas, kvietimas veikti (CTA); tinka: reklamos maketas, landingo pagrindinis vaizdas (hero), „pirk dabar“ blokas.
> - **Kada emocija, kada aiškumas:** Awareness dažnai = emocija; Conversion = aiškumas ir pasitikėjimas.

**JSON / code anchors (diagnozė, ne pataisa):**

- Slide `id: 13.1` · type `content-block` · image `m13_aec_funnel` · Pattern comparison/funnel · Shell = Taip (`M13AecFunnelBlock` + `density="hero"`)
- Funnel SVG: `M13AecFunnelDiagram.tsx` – `max-w-sm mx-auto` (**~384px**) – tai paaiškina „per maža / ne centrinė“
- Shell explanation: `m13DiagramContent.ts` `getM13AecExplanations` – pasirinktos juostos pastraipa (screenshot „Atpažįstamumas“)
- Schema sekcijos `body`: „Pasirink tikslą – juosta parodo…“ – screenshot apačios eilutė
- Pilnas A/E/C vadovas JSON’e jau yra: sekcija **Kampanijos tikslai (kuo vadovautis)** · `blockVariant: terms` · `collapsible: true` · `collapsedByDefault: true` · **viena pastraipa**, ne sąrašas
- Turinio SOT `turinio_pletra_moduliai_13_14_15.md` §2 – **jau bullet’ai** (Awareness / Engagement / Conversion + emocija vs aiškumas)
- GOLDEN **§4.4**: bullet points, kai daugiau nei 2 punktai
- GOLDEN **§3.2**: Optional = `terms` collapsible; DiagramKit **hero** density jau įjungta, bet vizualus herojus vis tiek mažas
- Analogas: M10 T06 / T09 – **vienas herojus per skaidrę** / hero dydis

**Trys kopijos to paties A/E/C (echo rizika batch’ui):**

| Sluoksnis                             | Forma                  | Matoma first-screen?       |
| ------------------------------------- | ---------------------- | -------------------------- |
| Shell explanation (pasirinkta juosta) | 1 pastraipa            | Taip                       |
| Schema `body`                         | 1 eilutė               | Taip (atrodo kaip pastaba) |
| „Kuo vadovautis“                      | 1 pastraipa, collapsed | Ne, kol neatskleidi        |
| SOT §2                                | bullet’ai              | Ne UI                      |

**Patikra pagal SOT / GOLDEN (diagnozė – ne pataisa):**

| #   | Kriterijus                                     | Vertinimas         | Kodėl                                                                                      |
| --- | ---------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| 1   | Schema = skaidrės herojus (Kit `density=hero`) | **FAIL vizualiai** | Shell hero chrome yra; piltuvas `max-w-sm` – ne dominuoja viewport’e                       |
| 2   | GOLDEN §4.4 bullet’ai kai >2 punktai           | **FAIL**           | Trys tikslai + emocija/aiškumas = viena pastraipa; SOT jau sąrašas                         |
| 3   | First-screen vadovas raiškus                   | **FAIL**           | Pilnas vadovas `collapsedByDefault`; matomas = Shell pastraipa + schema body kaip pastaba  |
| 4   | GOLDEN §3.2 Optional collapsible               | `[KONFLIKTAS]`     | Ciklas sako Optional = collapsible; savininkas nori vadovą matomą. Triažas: Must vs Should |
| 5   | TRIM / naujas Pattern                          | **Won’t**          | Enhancement: dydis + sąrašas. Feature Doc nereikia                                         |

**v01 OK (laikytis, neardyti):** 3 juostos A/E/C; klikas ant juostos; GOLDEN ciklas Trumpai → schema → Daryk → šablonas → Patikra; brand/amber/emerald piltuvo tonai; Shell = Taip.

**v01 FAIL ašys (locked kaip pastabos, ne kaip spec):**

1. Piltuvas per mažas / ne centrinis.
2. A/E/C vadovas turi būti skenuojamas sąrašas, ne numesta pastaba.

**Atviri klausimai batch’ui (ne blokuojantys intake):**

- **A.** Ar „kuo vadovautis“ iškelti iš collapsible (first-screen), ar palikti Optional ir tik perrašyti į bullet’us?
- **B.** Ar Shell explanation lieka (veidrodis pasirinktai juostai), ar kirpti, kad nesidubliuotų su sąrašu?
- **C.** Schema `body` eilutę palikti kaip hint po piltuvu, ar perkelti į sąrašo 4-ą punktą (emocija vs aiškumas)?

**Handoff (tik po Phase B):** SCHEME (piltuvo dydis / centravimas; `max-w-sm`) → CONTENT (sąrašas; collapsible sprendimas; be curriculum ID) → DATA (LT + durable EN `slide13_1Sections`) → CODING (jei Shell copy) → UI_UX/QA. **Ne** `generate:core-data`. **Ne** Feature Doc.

**Statusas:** open · **Netaisyta.** · laukia kitų skaidrių + triažo.

---

### R.M13-T02 – Skaidrė `13.12` „Medijos grandinė“ (6 žingsniai)

**Savininko signalas (2026-08-19, LT UI, 3 / 26):**

Šitoje skaidrėje **per daug žargono**. Mokinio kalba = **lietuvių**. Slide vardas savininkui: **Medijos grandinė** (nav `shortTitle`; ne diagramos „Generatyvinės medijos grandinė“).

Target copy šį kartą **neduota** — tik diagnozė. Fiksuojame inventorius triažui.

**UI kontekstas (live paste):**

- H1 / subtitle: Medijos grandinė · Nuo užduoties iki patikros – 6 žingsniai be brangių atsitiktinumų
- Nav: `3 / 26` · Tęsti: Vaizdo generavimas
- Schema antraštė SVG: **Generatyvinės medijos grandinė**
- 6 žingsniai: Užduotis + ženklas · Kadrai · **Referencų užraktas** · **Trumpi I2V** · Garsas + montažas · Patikra + DI žyma
- Po schema: pasirinkto žingsnio pastraipa + schema `body` (pointeris į kitą skaidrę)
- „Kodėl šie 6 žingsniai“: _techninis stuburas_
- Copyable: I2V, C2PA, platforma, demo
- GOLDEN ciklas Trumpai → schema → Kodėl → Daryk → šablonas → Patikra → Kur pritaikyti (collapsed)

**JSON / code anchors:**

- Slide `id: 13.12` · image `m13_media_pipeline` · Shell = Taip (`M13MediaPipelineBlock`)
- Chrome: `m13MediaPipelineContent.ts` `getM13MediaPipelineChrome` — `title: 'Generatyvinės medijos grandinė'`
- Step labels: `STEPS_LT` — `Referencų užraktas` · `Trumpi I2V`
- Explanations: žingsnis 3 body dar sako „Be referencų…“; žingsnis 4 jau turi gloss „video iš nuotraukos / I2V“
- JSON `title`: `Generatyvinės medijos grandinė` vs `shortTitle`: `Medijos grandinė` (nav rodo trumpą)
- Schema `body` + imageAlt: `brief` / `referencai` / `I2V` / `A/B`
- Term bank: I2V + C2PA = **KEEP** (mokymo objektas); I2V pirmas kartas = „video iš kadro (I2V)“; `referencai` → **pavyzdžių nuotraukos**; `reference lock` kanonas vis dar „referencų užraktas“
- I2-M13 `[JAU TAISYTA?]`: Trumpai / copyable jau sako „pavyzdžių nuotraukos“; **schema labels ne** — first-screen vis dar hibridas

**Žargono inventorius (first-screen vs KEEP):**

| Vieta                   | Live                                   | Term bank / GOLDEN                            | Savininko ašis                          |
| ----------------------- | -------------------------------------- | --------------------------------------------- | --------------------------------------- |
| Diagramos H             | Generatyvinės medijos grandinė         | nav jau „Medijos grandinė“                    | **FAIL** — dubliuoja sunkesnį H         |
| Žingsnis 3 label        | Referencų užraktas                     | PIRMAS: pavyzdžių nuotraukos; lock = hibridas | **FAIL** first-screen                   |
| Žingsnis 4 label        | Trumpi I2V                             | KEEP, bet pirmas kartas su gloss              | **FAIL** label be „video iš kadro“      |
| „Kodėl šie 6…“          | techninis stuburas                     | authoring meta, ne mokinys                    | **FAIL**                                |
| Schema `body`           | A/B + ilgas kitos skaidrės pavadinimas | curriculum pointer                            | **FAIL** / dense                        |
| Copyable I2V            | I2V – video iš kadro                   | PIRMAS OK                                     | OK                                      |
| Copyable / Patikra C2PA | C2PA                                   | KEEP mokymo objektas                          | `[KONFLIKTAS]` jei savininkas nori 0 EN |
| imageAlt                | brief, referencai, I2V                 | KEISTI chrome                                 | FAIL (screen reader)                    |

**Patikra pagal SOT / GOLDEN (diagnozė – ne pataisa):**

| #   | Kriterijus                                        | Vertinimas  | Kodėl                                                            |
| --- | ------------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| 1   | GOLDEN §4.3 / §6c — EN su paaiškinimu pirmą kartą | **FAIL**    | Schema labels `I2V` / `Referencų` be gloss; nav jau paprastesnis |
| 2   | Term bank I2-M13 first-screen                     | **dalinis** | Copyable/Trumpai pataisyta; Shell H + 6 box’ai — ne              |
| 3   | C2PA / I2V kaip mokymo objektas                   | KEEP        | Nemesti iš modulio; raiška = gloss, ne ištrynimas                |
| 4   | TRIM / naujas Pattern                             | **Won’t**   | Chrome + labeliai. Feature Doc nereikia                          |

**v01 OK (laikytis):** 6 žingsnių grandinė; klikas; GOLDEN ciklas; copyable kaip planas (ne generatoriaus promptas); I2V gloss copyable viduje.

**v01 FAIL ašys:**

1. First-screen schema kalba ≠ nav „Medijos grandinė“ (lietuvių, be „generatyvinės“ / I2V / referencų).
2. Authoring nuosėdos: „techninis stuburas“, A/B pointeris.

**Atviri klausimai batch’ui:**

- **A.** Diagramos H = `Medijos grandinė` (sutampa su nav)?
- **B.** Žingsnis 3: `Pavyzdžių nuotraukos` vs palikti „užraktas“ su LT gloss?
- **C.** Žingsnis 4: `Trumpi klipai` + desc `video iš kadro (I2V)` — I2V antrinis, ne H?
- **D.** C2PA copyable: palikti (KEEP) ar tik „DI žyma“ first-screen?

**Handoff (tik po Phase B):** CONTENT (plain LT labels + kirpti stuburą/A/B) → DATA (LT JSON + `m13MediaPipelineContent.ts` + durable EN) → SCHEME tik jei labeliai netelpa → QA `audit:lt-address` / `audit:m1315`. **Ne** `generate:core-data`. **Ne** Feature Doc. **Ne** C2PA drop be savininko.

**Statusas:** open · **Netaisyta.** · laukia kitų skaidrių + triažo.

---

### R.M13-T03 – Skaidrė `13.15` „Vaizdo generavimas“ (section-break) — tipografija

**Savininko signalas (2026-08-19, LT UI, 4 / 26, screenshot):** peržiūrėti **šriftus, tipografiją, raidžių dydį** ir palyginti su geriausiomis praktikomis. **Netaisyta.**

**UI kontekstas:** skyriaus skiriamoji. Badge `1` · H „Vaizdo generavimas“ · du šviesūs blokai „Ką jau žinai?“ (3 punktai) ir „Kas toliau“ (4 punktai) · tamsus footer „Toliau – skaidrė 5…“. Daug tuščios vietos po CTA. Recap #1 vis dar `Generatyvinės medijos grandinė` / `brief` / `referencai` (T02 echo).

**JSON / code anchors:**

- Slide `id: 13.15` · `type: section-break` · `recap` 3 items · `nextSteps` ×4 · **nėra** `celebrationText`
- `SectionBreakSlide` (`ContentSlides.tsx`) recap šaka
- `ModuleView` slepia H1 **tik** kai yra `celebrationText` → čia H1 **rodomas**
- Šriftas SOT: Plus Jakarta Sans (`GOLDEN` §1 / `tailwind.config.js`) — ne Inter

**GOLDEN §1 kopėčios (px, Tailwind default):**

| Rolė     | Token                     | px                   |
| -------- | ------------------------- | -------------------- |
| H1       | `text-2xl md:text-3xl`    | 24 / 30              |
| H2       | `text-lg md:text-xl`      | 18 / 20              |
| H3       | `text-base font-semibold` | 16                   |
| Body     | `text-sm md:text-base`    | 14 / 16              |
| Small    | `text-xs`                 | 12 (floor; etiketės) |
| Subtitle | `text-lg`                 | 18, tik `lg:`        |

**Live vs token (13.15):**

| Paviršius               | Live klasė                    | px        | GOLDEN rolė      | Verdict                    |
| ----------------------- | ----------------------------- | --------- | ---------------- | -------------------------- |
| ModuleView antraštė     | `typographyClasses.h1`        | 24–30     | H1               | OK token                   |
| Vidinis `content.title` | `typographyClasses.h2`        | 18–20     | H2               | OK token; **dublis su H1** |
| „Ką jau žinai?“ heading | `font-bold text-sm`           | 14        | H3 16            | **FAIL**                   |
| Recap punktai           | `text-sm` (be `md:text-base`) | 14 visada | Body 14→16       | **FAIL** desktop           |
| Recap `lead`            | `text-xs italic`              | 12        | Small            | riba                       |
| „Kas toliau“ heading    | `font-bold text-sm`           | 14        | H3 16            | **FAIL**                   |
| „Kas toliau“ 4 punktai  | `text-xs`                     | **12**    | Body, ne etikėtė | **FAIL**                   |
| Footer CTA              | `text-xs font-semibold`       | **12**    | CTA skaitomas    | **FAIL** vs praktika       |
| Section badge `1`       | `text-sm font-semibold`       | 14        | Label OK         | OK                         |

**UI_UX §4.2 checklist (ši skaidrė):**

| Kriterijus            | Statusas | Pastaba                                                                                        |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| Tipografija           | **FAIL** | Recap / Kas toliau / footer = raw `text-sm`/`text-xs`, ne `typographyClasses`. Du pavadinimai. |
| Vizualinė hierarchija | **FAIL** | GOLDEN §3.4b: vienas hero; live = du vienodo svorio Banner’iai, be celebration.                |
| Vienas H1             | **FAIL** | H1 (ModuleView) + H2 (`content.title`) = tas pats „Vaizdo generavimas“.                        |
| Skenuojamumas         | ⚠️       | Antraštės OK; body 12px „Kas toliau“ silpnas; žargonas recap #1 (T02).                         |
| Touch / CTA           | ⚠️       | Footer `min-h-[44px]` OK; raidės 12px ant pirminio CTA.                                        |
| Šeima / svoris        | OK       | Plus Jakarta Sans; nėra `font-black` / `text-[9px]`.                                           |

**Palyginimas su geriausiomis praktikomis (ne keisti šriftą):**

| Praktika                                 | Norma                    | 13.15                                       |
| ---------------------------------------- | ------------------------ | ------------------------------------------- |
| Mokomojo body (Material / HIG / Nielsen) | ≥16px desktop            | Recap 14px; Kas toliau **12px**             |
| WCAG 1.4.4 Resize 200%                   | tekstas masteliuojamas   | `rem` klasės OK                             |
| Kontrastas                               | ≥4.5:1                   | OK                                          |
| Viena hierarchija                        | GOLDEN §1                | Du H tam pačiam title                       |
| CTA ≥ body                               | Material / GOLDEN §4.2   | CTA 12px **mažesnis** už recap 14px         |
| Skyriaus skiriamoji = hero pauzė         | GOLDEN §3.4b/c (M4 40.5) | Be `celebrationText` = plokščia             |
| Line-height                              | ~1.5                     | recap `leading-relaxed` OK; nextSteps tanku |

**v01 OK:** šriftų šeima; H1/H2 tokenai ten, kur naudojami; emerald recap juosta; footer 44px; dark: klasės.

**v01 FAIL ašys:**

1. **Dydžių kopėčios sulūžusios kūne:** punktai 12–14px, CTA 12px — atvirkščiai nei praktika.
2. **Dvigubas pavadinimas** (nėra `celebrationText` → H1 nesislepia).
3. **Nėra hero** (§3.4b) — du lygiaverčiai langeliai + tuščia apačia.

**Atviri klausimai batch’ui:**

- **A.** M13 skyrių break’ams pridėti `celebrationText` (kaip M4 etalonas) ir slėpti ModuleView H1?
- **B.** Recap + Kas toliau → `typographyClasses.h3` + `body` (16px desktop); footer CTA ≥ `text-sm` / `text-base`?
- **C.** Kirpti recap #1 žargoną kartu su T02?

**Handoff (tik po Phase B):** UI_UX (šis auditas) → CODING (`SectionBreakSlide` tokenai + optional celebration) → CONTENT (recap žargonas, jei A/C) → DATA. **Ne** keisti Plus Jakarta Sans. **Ne** Feature Doc. **Ne** platform retheme.

**Statusas:** open · **Netaisyta.** · laukia kitų skaidrių + triažo.

---

### R.M13-T04 – Skaidrė `13.2` „Vaizdo prompto pagrindai“ (sluoksnių schema + copyable)

**Savininko signalas (2026-08-19, LT UI, 5 / 26, 2 screenshot’ai):**

1. **Schema per maža** — didinti (kaip T01: schema = skaidrės herojus).
2. **Vystyti** — ne tik zoom; sluoksniai per ploni (label + 1 sakinys).
3. **Promptas neišsamus** — kopijuojamas šablonas nepadengia to, ką moko schema.

**UI kontekstas:**

- Nav: `5 / 26` · Tęsti: Stilius ir proporcijos (`13.3`)
- Trumpai: subjektas, stilius, proporcijos, ko vengti
- H: **Formulė ir trys sluoksniai** · Tu esi čia: Objektas 1/3
- Schema: 3 juostos Objektas / Kontekstas / Estetika, `max-w-sm` (~384px), daug tuščio šono
- Po schema: 1 sakinys apie Objektą + formulės eilutė (echo)
- Žemiau: Minimalūs reikalavimai · Daryk dabar · Kopijuojamas promptas (2 eil., vienas `[APRAŠYMAS]`) · Patikra · Kodėl tai veikia

**Live copyable:**

```
Sukurk vaizdą: [APRAŠYMAS – pvz. „verslininkas prie stalo su nešiojamu kompiuteriu, šviesus biuras“].
Stilius: profesionalus, šviesus, minimalistinis. Proporcijos: 16:9. Nenaudok tekstų vaize.
```

**JSON / code anchors:**

- Slide `id: 13.2` · image `m13_prompt_stack` · Shell = Taip (`M13PromptStackBlock`)
- SVG: `M13PromptStackDiagram.tsx` — `viewBox 320×300` + **`max-w-sm`** (tas pats T01 spąstas)
- Explanations: `getM13PromptStackExplanations` — 1 sakinys / sluoksnis, be pvz. gero/blogo
- M13P: **13.2 = Stage, TRIM verdiktas keep (lean)** — `[KONFLIKTAS]` su „neišsamus / vystyti“, jei batch ilgintų iki Flagship (13.35)
- SOT §3.1 copyable = tas pats 2 eil. šablonas
- Typo: `vaize` (copyable + Patikra) vs kanonas `vaizde` (term bank / kiss)

**Diagnozė (ne pataisa):**

| Ašis     | Live                                                | Kodėl FAIL                                                                                  |
| -------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Dydis    | `max-w-sm` + 320px viewBox                          | Schema ne herojus (T01 analogas)                                                            |
| Vystymas | 3 box’ai + 1 sakinys; schema `body` kartoja formulę | Sluoksnis ≠ mokymas (nėra pvz., ko vengti, kaip rašyti)                                     |
| Promptas | 1 blob `[APRAŠYMAS]`                                | Schema moko Objektas+Kontekstas+Estetika; šablonas to **neatspindi**                        |
| Branda   | 2 eil. Stage lean                                   | Savininkas: neišsamus. M13P: ne Flagship. Kelias = Stage slotai (3–7 eil.), ne MASTER siena |

**Patikra pagal SOT / GOLDEN:**

| #   | Kriterijus                                                                      | Vertinimas     | Kodėl                                                           |
| --- | ------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------- |
| 1   | Schema = herojus                                                                | **FAIL**       | Tas pats `max-w-sm` kaip 13.1                                   |
| 2   | Schema veidrodis copyable (lesson: schema ≠ antras CTA, bet turi rišti veiksmą) | **FAIL**       | Sluoksniai nesutampa su `[APRAŠYMAS]`                           |
| 3   | M13P Stage 3–7 eil.                                                             | `[KONFLIKTAS]` | Keep/lean vs savininko „neišsamus“. Won’t = 13.35 Flagship dump |
| 4   | Naujas Pattern / enlarge modal                                                  | **Won’t**      | Enhancement; TE/S4 freeze                                       |

**v01 OK:** 3 sluoksnių modelis; klikas 1/2/3; GOLDEN ciklas; stilius+proporcijos laukai (TRIM sakė jų neliesti −30 %).

**v01 FAIL ašys:**

1. Piltuvas/stack per mažas (didinti).
2. Sluoksnių mokymą vystyti (pvz. + ką rašyti), ne palikti vieną sakinį.
3. Copyable = 3 sluoksnių šablonas, ne vienas aprašymo kibirėlis.

**Atviri klausimai batch’ui:**

- **A.** Dydis: `max-w-md` / `max-w-lg` visoms M13 `max-w-sm` Shell schemoms (13.1+13.2 kartu)?
- **B.** Vystymas = turtingesnis explanation (bullet + pvz.), ar vizualiai daugiau geometrijos (S4 freeze — atsargiai)?
- **C.** Copyable Stage pvz. `Objektas: … / Kontekstas: … / Estetika: … / Proporcijos: … / Be teksto vaizde` — vis dar 3–7 eil., ne Flagship?

**Handoff (tik po Phase B):** SCHEME (dydis; ne nauja metafora) → CONTENT (sluoksnių paaiškinimai + Stage šablonas; `vaizde`) → DATA (LT+EN `m13DiagramContent` + JSON) → CODING (`max-w-sm`) → QA. **Ne** `generate:core-data`. **Ne** Feature Doc. **Ne** kelti 13.2 į Flagship.

**Statusas:** open · **Netaisyta.** · laukia kitų skaidrių + triažo.

---

### R.M13-T05 – Skaidrė `13.3` „Stilius ir proporcijos“ — įrankių vieta (pedagogika)

**Savininko signalas (2026-08-19, LT UI, 6 / 26):**

Įrankiai (**6 kortelės**) atsiranda **tik šioje skaidrėje**, nors **jau minėti anksčiau**. Tai **pedagogikos klaida**. Reikia **atskiro sprendimo** — ne tylaus copy patch ir ne „perkeliu JSON ir baigta“.

**UI kontekstas (live paste):** Trumpai (stilius + aspect ratio / stories) → Prekės ženklo nuoseklumas → Daryk (15+ žodžių antraštė, vienas modelis) → 2 copyable → Patikra → **DI įrankiai – kur pradėti (6)** GPT-Image / Ideogram / FLUX / Midjourney / Leonardo.ai / Adobe Firefly. Nav Tęsti: `stilius` (`13.31` shortTitle). Skaidrė ilga: katalogas apačioje, lengva praleisti.

**Kur įrankiai jau minimi PRIEŠ 6-ą skaidrę (MUST kelias):**

| Skaidrė | Kas sakoma                                                                                  | Praktika?                     |
| ------- | ------------------------------------------------------------------------------------------- | ----------------------------- |
| `130`   | `firstActionCTA`: atidaryk įrankį, pvz. ChatGPT su DALL·E **arba Ideogram**, sugeneruok     | Taip — vardai + veiksmas      |
| `13.15` | Subtitle: įrankius rinksies **po stiliaus skaidrės**. nextSteps: „kada rinktis kurį įrankį“ | Pažadas — katalogo dar nėra   |
| `13.2`  | Daryk: **atidaryk vieną vaizdų generavimo įrankį** ir nukopijuok promptą                    | Taip — veiksmas be 6 kortelių |

SOT `turinio_pletra` §3.2: `content.tools` **ant 13.3, po Patikra** — sąmoninga eilė („prieš įrankių detales“ 13.12). Live šią eilę vykdo. Savininkas: eilė **FAIL** mokiniui.

**Pedagogikos FAIL (ne UI bug):** repertuaras (kurią platformą rinktis) ateina **po** „eik ir paleisk“. Mokinys 13.2 jau turi atidaryti įrankį; 6 kortelės paaiškina pasirinkimą tik kitame žingsnyje, skaidrės apačioje.

`[KONFLIKTAS su SOT]` — §3.2 ir `MODULIO_13_SKAIDRIU_EILES.md` eilutė 5 („collapsible įrankių pozicionavimas“ ant 13.3). Sprendimas keičia **curriculum**, ne tik heading.

**Sprendimų rinkinys (savininkui; neįgyvendinta):**

| ID     | Sprendimas             | Ką tai reiškia                                                                                      | Rizika                                                     |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **S1** | Katalogas **anksčiau** | `content.tools` → 13.2 first-screen arba 13.15 / atskira skaidrė prieš pirmą „atidaryk“             | 13.2 dar tankesnė; nauja skaidrė = C-W4 be savininko       |
| **S2** | Praktika **vėliau**    | 130 ir 13.2 Daryk **be** „atidaryk įrankį“ / be Ideogram vardo, kol nėra 6 kortelių                 | 130 praranda 1–2 min CTA; 13.2 copyable be paleidimo       |
| **S3** | **Tiltas**             | 13.2: „vieną įrankį – sąrašą pamatysi kitoje skaidrėje“; 13.3 katalogas **viršuje** (ne po Patikra) | Mažiausias eilės keitimas; vis tiek 6 skaidrė = katalogas  |
| **S4** | 13.3 **apversti**      | Pirmas viewport = 6 kortelės („kur pradėti“), tada stilius/užraktas                                 | Atitinka 13.15 pažadą „kada rinktis“; stilius nebe herojus |

**Won’t be savininko:** nauja skaidrė (C-W4) · 6 kortelių dump į 13.2 paliekant dublikatą 13.3 · Feature Doc · `generate:core-data`.

**Antrinė ašis (ne šio ticket’o branduolys):** 13.3 jau turi brand + 2 copyable + Patikra; 6 kortelės apačioje = tankis. T05 = **kada**, ne kortelių copy.

**Handoff (tik po savininko S1–S4):** CURRICULUM (eilė + SOT §3.2 sakinys) → CONTENT (130/13.2/13.15 CTA, be curriculum ID) → DATA (`content.tools` vieta; EN overlay) → QA. **Ne** CODING pirmas.

**Statusas:** **done** · S2+S3 (2026-08-19). Katalogas 13.3 prieš Patikra; 130/13.2 be „atidaryk įrankį“.

---

### R.M13-T06 – Skaidrė `13.32` „Tas pats vaizdas“ (consistency lock schema)

**Savininko signalas (2026-08-19, LT UI, 8 / 26):**

Skaidrė **pilna žargono LT**. Schema **per maža**. **Neaišku, kas yra referenc** (ir pan.).

**UI kontekstas:**

- Nav: `8 / 26` · Tęsti: Nuoseklumo dirbtuvė (`13.325`)
- Trumpai: jau sako **pavyzdžių nuotraukos** (OK)
- Schema H: **Reference lock – schema** · Tu esi čia: 4. QA 4/4
- SVG H: **Reference lock** · caption: _Užrakinti refs lieka greta generavimo kelio_
- 4 juostos: **3–5 refs** / **Lock** + Same product / **Generate** / **QA**
- Paaiškinimas: _inpaint_, _refs_, _etiketė_
- Collapsible: **Brand / product sheet (minimumas)** + `¾`
- Daryk / Patikra: vėl „pavyzdžių nuotraukos“ (OK) vs schema EN

**JSON / code anchors:**

- Slide `id: 13.32` · image `m13_consistency_lock` · Shell = Taip · S4 metafora **lock-artifact** (freeze)
- Labels: `m13ConsistencyLockContent.ts` — **LT locale vis tiek EN**: `title: 'Reference lock'`; STEPS_LT = `3–5 refs` · `Lock` · `Same product` · `Generate` · `QA`
- Explanations LT: `refs`, `optional`, `same product…`, `look`, `inpaint`, `QA`
- JSON heading: `Reference lock – schema`; collapsible heading: `Brand / product sheet (minimumas)`
- imageAlt jau LT: „Referencų užraktas…“ — vis tiek hibridas
- Dydis: `max-w-2xl` (ne `max-w-sm` kaip T01/T04); boxH **46**; compact viewBox **320**. Savininko „per maža“ = vis tiek ne herojus + trumpi EN chip’ai
- Term bank: `referencai` → **pavyzdžių nuotraukos**; `reference lock` kanonas vis dar „referencų užraktas“ — savininkas klausia **kas yra referenc** → first-screen kanonas per silpnas
- I2-M13 `[JAU TAISYTA?]`: Trumpai/Daryk pataisyta; **Shell + heading ne** (tas pats T02 raštas)

**Žargono inventorius (first-screen, LT UI):**

| Vieta                | Live                                   | Term bank / GOLDEN                                                    | Verdict                     |
| -------------------- | -------------------------------------- | --------------------------------------------------------------------- | --------------------------- |
| Schema H / SVG title | Reference lock                         | KEISTI chrome; PIRMAS = LT + gloss                                    | **FAIL**                    |
| Žingsniai            | refs, Lock, Same product, Generate, QA | pavyzdžių nuotraukos; užraktas; tas pats produktas; generuok; patikra | **FAIL** — EN kaip labeliai |
| Caption              | Užrakinti refs                         | pavyzdžių nuotraukos                                                  | **FAIL**                    |
| QA body              | inpaint                                | C-C5 parked hint; ne first-screen be gloss                            | **FAIL**                    |
| Collapsible H        | Brand / product sheet                  | prekės / produkto lapas                                               | **FAIL**                    |
| Trumpai / Daryk      | pavyzdžių nuotraukos                   | PIRMAS OK                                                             | OK — schemos nenuoseklumas  |

**Patikra pagal SOT / GOLDEN:**

| #   | Kriterijus                        | Vertinimas                  | Kodėl                                                                     |
| --- | --------------------------------- | --------------------------- | ------------------------------------------------------------------------- |
| 1   | GOLDEN §4.3 / §6c first-screen LT | **FAIL**                    | Schema = angliškas mini-LMS                                               |
| 2   | Term bank pavyzdžių nuotraukos    | **FAIL** schema; OK Trumpai | Mokinys klausia „kas referenc“, nes schema sako refs                      |
| 3   | Schema = herojus                  | **FAIL**                    | 46px juostos + EN chip’ai; ne T01 `max-w-sm`, bet vizualiai vis tiek maža |
| 4   | S4 lock-artifact                  | **Won’t keisti formos**     | Tik labeliai / dydis; ne nauja metafora                                   |

**v01 OK:** 4 žingsniai; klikas; lock-artifact šalia kelio; Trumpai jau plain; copyable perkeltas į 13.325 (SOT).

**v01 FAIL ašys:**

1. LT UI schema kalba = EN (Reference lock, refs, Lock, Generate, QA).
2. „Referenc“ nepaaiškinta first-screen (turėtų būti pavyzdžių nuotraukos; EN gloss antras).
3. Schema per maža / ne centrinė.

**Atviri klausimai batch’ui:**

- **A.** SVG/JSON H = `Pavyzdžių nuotraukų užraktas` ar `Tas pats vaizdas` (nav), su `(reference lock)` tik pirmą kartą Trumpai?
- **B.** Žingsniai: `3–5 nuotraukos` · `Taisyklė` · `Nauja scena` · `Patikra`?
- **C.** `inpaint` — Patikra su gloss, ar tik dirbtuvėje 13.325?

**Handoff (tik po Phase B):** CONTENT (LT labeliai + JSON heading; be curriculum ID) → DATA (`m13ConsistencyLockContent.ts` + 13.32 sections + EN overlay) → SCHEME/CODING (dydis / boxH; **ne** S4 formos keitimas) → QA `audit:lt-address`. **Ne** `generate:core-data`. **Ne** Feature Doc. 13.325 lab EN „Reference lock“ — tas pats batch, jei T06 Must.

**Statusas:** open · **Netaisyta.** · laukia kitų skaidrių + triažo.

---

### R.M13-T07 – Skaidrė `13.325` „Nuoseklumo dirbtuvė“ (Drift Lab jausmas)

**Savininko signalas (2026-08-19, LT UI, 9 / 26):**

Trūksta **interaktyvumo**, **promptų**, **pavyzdžių**. Idėja gera, bet tai **dar ne lab / ne dirbtuvės**. Klausimas intake’ui: **kaip padaryti patrauklesnes?** (ne kodas dabar).

**UI kontekstas (empty state):** Turi 0/4 · Režimas nepasirinktas · 4 checkbox eilutės be nuotraukų · Prieš/Po = tekstinės kortelės („Blanku, nebrandu…“) · 5 režimų Choice · Prompto taisyklė tuščia iki pick · žargonas: reference, brief, Drift, Ref lock, Look, Hero, Fix.

**Kas jau yra (Feature Doc vs jausmas):**

| Feature Doc (`M13_CONSISTENCY_LOCK_LAB.md`)          | Live mokiniui                                                     |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| Pattern `interactive-control-lab`, Shell=Ne, DoD [x] | Formos checklist + radio — ne „dirbtuvė“                          |
| Ref ×4 + Choice ×5 + Simptomas\|Fix + Copy           | Copy **paslėptas** kol nepasirinkta; nėra vaizdų                  |
| M13P Lab + Stage lock skeleton                       | Artefaktas EN-hibridas (`same product`, `Reference lock`, `Fix:`) |
| Etalonas M7/67 kontrastas                            | Čia kontrastas = dvi teksto dėžutės, ne Blogas\|Geras vaizdai     |

Techniškai lab **jau egzistuoja**. Savininkas: **jausmas** ≠ lab. `[JAU TAISYTA?]` ne — shipped lukštas, ne workshop.

**Trys spragos:**

1. **Interaktyvumas** — tick/radio keičia pill’us, ne sceną. Nėra ką „daryti su vaizdu“.
2. **Promptai** — vienas copy po pick; empty state sako „pirmiausia pasirink“. Nėra pavyzdinio užpildyto šablono first-screen.
3. **Pavyzdžiai** — 4 kampai = etiketės; Prieš/Po = abstraktus tekstas. Nėra produkto serijos.

**Kaip padaryti patrauklesnes (variantai batch’ui — tas pats Pattern):**

| ID     | Kas                                                                                 | Kodėl patraukliau                     | Rizika                               |
| ------ | ----------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------ |
| **W1** | 4 **fixture nuotraukos** (hero/šonas/detalė/šviesa) — checkbox ant thumbs           | Dirbtuvė turi objektą, ne tuščią lapą | Asset + a11y alt; ne user upload     |
| **W2** | Prieš/Po = **poros vaizdai** (drift vs užraktas), ne dvi pastraipos                 | M7/67 etalonas vizualiai              | 2–4 PNG; GOLDEN §6b rose OK          |
| **W3** | First-screen **pavyzdinis promptas** (užpildyta serija) + copy atsirakina po režimo | Trūksta promptų empty state           | Ne Flagship siena; vis dar Lab klasė |
| **W4** | Mini scenarijus: vienas įvardytas produktas („serija X“)                            | Checkbox’ai nustoja būti abstraktūs   | CONTENT, ne nauja skaidrė            |
| **W5** | Plain LT (T06 sibling): reference→pavyzdžių nuotraukos; Drift/Fix/brief gloss       | Skaitosi kaip dirbtuvė, ne EN kabina  | Sutampa su T06                       |

**Won’t:** naujas Pattern / `vaizdo-generatorius` klonas · Feature Doc nuo nulio · mokinio nuotraukų upload · rainbow.

**Handoff (tik po savininko W\*, po T06 kalbos):** CONTENT (scenarijus + LT + pavyzdinis Stage) → SCHEME (thumbs / Before-After rėmas, Shell vis dar Ne) → CODING (`M13ConsistencyLockLabBlock`) → DATA (jei JSON Trumpai) → UI_UX/QA. Feature Doc **patch** (enhancement), ne naujas elementId.

**Statusas:** **done** · W1–W5 (2026-08-19). Oak Mug thumbs + Before/After + sample Stage + plain LT.

---

### R.M13-T08 – Skaidrė `13.33` „Kompozicija ir kadras“ (schema + optional)

**Savininko signalas (2026-08-19, LT UI, 10 / 26):**

1. **Schema per maža.**
2. **Optional???** — „taip mes nedarome mūsų repo; tai turi būti užduotis, normali, ar ne?“

**UI kontekstas:** Trumpai (tinklelis = gairė; detalės išskleidžiamos) · Atidaryti visus / Suskleisti visus · Trečdalių tinklelis (statinis SVG) · collapsible teorija + ELS/CU žargonas · Daryk + Stage šablonas · **Naratyvinis vaizdas (optional)** · **Kamera prompte (optional)** · Patikra. Nav Tęsti: Atpažink stilių (`13.34`).

**JSON / code anchors:**

- Slide `id: 13.33` · `optional: true` · `badgeVariant: optional`
- Image `m13_rule_of_thirds` · Shell = **Ne** (static) · `M13RuleOfThirdsDiagram.tsx` `viewBox 360×260` + **`max-w-md`** (~448px)
- SOT §3.3: **neprivaloma**; eilė 5c optional; 130 Trumpas kelias: „Be papildomų skaidrių (**kompozicija**, MASTER, žodynėlis)“
- `skipOptional` / Fast track **paslepia** 13.33
- I1B: antraštėse nuimti `(optional)`; **badge per `optional: true` paliktas** — `M13_MATURITY_PLAN`: „Optional 13.33 / 13.35 / 13.8 – badge lieka“
- M15 lesson 2026-08-18: privaloma/neprivaloma **ne mokinio ašis** (gate vs copy). Čia savininkas eina toliau: **pati skaidrė** turi būti MUST užduotis

`[KONFLIKTAS su SOT / short path]` — demote optional = CURRICULUM, ne collapsible copy.

**Dvi ašys:**

| Ašis     | Live                                                                     | Savininkas                                       |
| -------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| Schema   | `max-w-md`, 360×260, ne klikinama                                        | Per maža; turi būti herojus (T01 šeima)          |
| Optional | `optional: true` → Trumpas kelias praleidžia; nested „(optional)“ blokai | Repo **nedaro** optional; normali Daryk užduotis |

**Sprendimai optional (savininkui):**

| ID     | Sprendimas                   | Poveikis                                                                                                       |
| ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **O1** | **13.33 = MUST**             | Nuimti `optional` / badge; Trumpas kelias **įtraukia** kompoziciją; SOT §3.3 + eilė 5c + 130 short description |
| **O2** | Tik chrome                   | Badge ir „(optional)“ heading’ai nuimti; `optional: true` lieka skip’ui                                        | Prieštarauja „nedarome optional“         |
| **O3** | Visas optional rinkinys MUST | + `13.35` MASTER + `13.8` žodynėlis                                                                            | Didesnis kelias; ne šio paste branduolys |

**Rekomendacija intake’ui:** **O1** šiai skaidrei (kompozicija = užduotis). O3 — atskiras savininko „taip“, ne tyliai.

**Schema batch (po O1):** SCHEME/CODING didinti (`max-w-lg` / hero plotis); vis dar static Shell=Ne; S5-THIRDS motif KEEP. **Ne** enlarge ON be priežasties.

**Antrinė:** ELS / MLS / CU / ECU + eye level first-screen — T02 šeima; collapsible OK kaip gylis, jei skaidrė MUST.

**Won’t:** palikti short-path skip jei O1 · naujas Pattern · Feature Doc.

**Handoff (tik po O1/O2/O3):** CURRICULUM (SOT + eilė + 130 short) → DATA (`optional` flag + EN) → SCHEME/CODING (tinklelis dydis) → CONTENT (heading be optional; žargono gloss) → QA. **Ne** `generate:core-data` (M13).

**Statusas:** open · **Netaisyta.** · **laukia O1 (rekomenduojama) vs O2/O3.**

---

### R.M13-T09 – Skaidrė `13.35` „Darbo eiga ir MASTER šablonai“ (raizgalynė / skaidymas)

**Savininko signalas (2026-08-19, LT UI, 12 / 26):**

Pedagogiškai **raizgalynė**. Jei sakome **darbo eiga** — turi būti **darbo eigos schema**, kad pademonstruotų (ar šiame modulyje schemų dar nebuvo?). Info tiek, kad **drąsiai skiltų į 2 skaidres**: 2 pagrindinės užduotys + kelios papildomos praktikai. Ar klysta?

**Atsakymas intake’e (diagnozė, ne kodas):** **Ne, nesiklysti** dėl raizgalynės ir skaidymo. **Klysti tik dėl „modulyje dar nebuvo schemų“** — MUST kelyje jau buvo: `13.1` piltuvas · `13.12` grandinė · `13.2` sluoksniai · `13.32` užraktas · `13.33` tinklelis. **Šitoje** skaidrėje 5 žingsnių eiga = **sutraukta pastraipa, be `image`**. 13.11 (verslo ciklas) — **vėliau** modulyje, kita metafora. Nemaišyti.

**Live krūvis (viena skaidrė):**

| Blokas                              | Forma                                 | Užduotis?              |
| ----------------------------------- | ------------------------------------- | ---------------------- |
| Trumpai                             | „Papildoma biblioteka“ + optional     | Meta                   |
| DI vaizdų workflow (5 žingsniai)    | Collapsible **siena**, be schemos     | Ne                     |
| #1000Books                          | Collapsible seka                      | Trečia istorija        |
| MASTER šablonas                     | Copyable (Flagship)                   | Pagrindinė #1          |
| Ready ×3 (logo / social / plakatas) | Collapsible copyable                  | Pagrindinė #2 rinkinys |
| Visi 8 verslo scenarijai            | Viena pastraipa-siena                 | Biblioteka             |
| Patikra                             | MASTER 3 kategorijos + Ready+užraktas | Dvi patikros vienoje   |

GOLDEN §3.2: vienas dominuojantis copy veiksmas / skaidrė. Čia 4+ Copy. `optional: true` — T08 brolis.

**Siūlomas skaidymas (savininko hipotezė — užrakinti kaip P1):**

| Skaidrė               | Hero                               | Pagrindinė užduotis                                                          | Papildoma praktika                                    |
| --------------------- | ---------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| **A. Darbo eiga**     | 5 žingsnių **schema** (ne tekstas) | Daryk: pažymėk kur esi / užpildyk 1 žingsnį savo temai                       | #1000Books kaip vienas worked example (ne antra eiga) |
| **B. MASTER + Ready** | MASTER šablonas (užpildyk)         | Daryk: vienas Ready (logo **ar** social **ar** plakatas) su stiliaus užraktu | 8 scenarijai collapsible / 2–3, ne siena              |

**CURRICULUM variantai:**

| ID     | Sprendimas                                                               | Pastaba                                                                                                               |
| ------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **P1** | Skelti į 2 skaidres (savininkas siūlo)                                   | Nauja eilės eilutė; naujas `id` (pvz. 13.351). Overlay jei naujas `image`. **Ne** thin VerticalFlow facade (S4-INDIV) |
| **P2** | Viena skaidrė: first-screen = tik schema + 1 Daryk; biblioteka sutraukta | Silpniau; vis dar 2 patikros                                                                                          |
| **P3** | Eigos tekstą išmesti, rodyti į 13.12 / 13.11; čia tik MASTER             | Praranda 5 žingsnių vaizdų eigos pamoką čia                                                                           |

**Won’t:** palikti 5 žingsnius kaip pastraipą ir vadinti darbo eiga · 8 scenarijų siena first-screen · nauja schema = 13.12 kopija.

**Handoff (tik po P1):** CURRICULUM (eilė + SOT §3.4/§3.6) → SCHEME (nauja eigos schema, individuali forma) → CONTENT (2× Daryk/Patikra; tu; be workflow barbarizmo heading’e) → DATA (LT+EN, **ne** core) → CODING → QA `audit:teaching-elements --strict` jei naujas image. T08 O1/O3 — ar 13.35 vis dar optional, spręsti kartu.

**Statusas:** open · **Netaisyta.** · **P1 rekomenduojama** (savininkas teisus). · laukia P1 patvirtinimo.

---

### R.M13-T10 – Skaidrė `13.37` „Vaizdo generatorius“ (puiki + leak + polish)

**Savininko signalas (2026-08-19, LT UI, 13 / 26):**

Skaidrė **puiki** — poliruoti vizualiai ir UX. **Trumpai nesuprantamas / draudžiamas mokiniui:**

> Tai patogu po neprivalomos skaidrės „Darbo eiga ir MASTER šablonai“, kur laukus pildai ranka.

„To negali matyti mokiniai. Pas mus nėra neprivalomų skaidrių. Mes jau tarėmės.“ (= T08)

**FAIL (Must, ne polish):**

| Vieta                      | Live                                               | Kodėl                                                           |
| -------------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| `content.tldr` 13.37       | „po neprivalomos skaidrės „Darbo eiga ir MASTER…““ | Authoring meta + kitos skaidrės pavadinimas + **optional** ašis |
| `lt.json` `vaizdoGen.tldr` | tas pats + „Workflow ir MASTER“                    | Fallback dubliuoja leak                                         |
| EN overlay `tldr`          | `optional “Workflow and MASTER templates”`         | Tas pats                                                        |
| Formos H                   | „Tekstų integracija **(neprivaloma)**“             | `vaizdoGen.sectionText` — ta pati ašis                          |

AGENTS / GOLDEN: curriculum ID ir kitos skaidrės pavadinimai — **ne** mokinio Trumpai. T08: optional **nėra** learner copy.

**Target Trumpai (batch, ne kodas):** pvz. „Užpildyk laukus – sistema sudės vaizdo promptą. Nukopijuok į vaizdų generavimo įrankį.“ Be 13.35, be „neprivaloma“, be „patogu po“.

**v01 OK (laikytis — todėl „puiki“):** 3 taktai Kontekstas / Vizualas / Tekstas · šablonai E-commerce/… · A/E/C · meter 4/9 · Copy · Patikra su proporcijomis. Pattern `special` KEEP. Feature Doc nereikia.

**Polish (Should, savininko „vizualiai ir UX“):**

- Hierarchija: generatorius herojus; **10 įrankių** apačioje = T05 echo (6 kortelės jau 13.3) — sutraukti / 1 CTA „pasirink įrankį“
- EN chip’ai first-screen: Close-up, Cinematic, Headline, CTA, Sans-serif — LT pirmas, EN gloss
- Sugeneruotas promptas: „itin detalu, aukščiausia kokybė“ — tuščia kokybė (13.33 SOT jau draudžia)
- `Trumpai:` inline vs GOLDEN accent Trumpai blokas — UI_UX

**Won’t:** perrašyti generatorių · naujas Pattern · palikti 13.35 nuorodą Trumpai.

**Handoff:** CONTENT (tldr + sectionText + i18n; tu) → DATA (`modules.json` tldr + `lt.json`/`en.json` vaizdoGen + EN overlay) → UI_UX/CODING polish → QA `audit:lt-address`. **Ne** `generate:core-data`. **Ne** Feature Doc.

**Statusas:** open · **Netaisyta.** · Trumpai Must rišasi su T08.

---

### R.M13-T11 – Skaidrė `13.36` „Video generavimas“ (section-break 14 / 26)

**Savininko signalas:** šriftai, dydžiai, turinys, tipografija, geriausios praktikos. **Netaisyta.**

**Tipografija = T03** (`SectionBreakSlide` recap, be `celebrationText`). Tas pats FAIL: H1+H2 dublis „Video generavimas“; recap `text-sm` (14px); „Kas toliau“ ir footer CTA **`text-xs` (12px)**; du lygūs Banner’iai, ne hero. Šriftas Plus Jakarta Sans — **OK, nekeisti**.

**Turinys (šios skaidrės unikalumas):**

| Eilutė           | Live                                          | Problema                                                                              |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| Recap #3         | `same product / same style`                   | EN be gloss first-screen (T02/T06)                                                    |
| nextSteps I2V    | `Video iš kadro (I2V)`                        | KEEP objektas; čia OK jei pirmas kartas su LT                                         |
| nextSteps        | `CPI`                                         | KEEP, bet be paaiškinimo („kaina už tinkamą klipą“ jau yra — CPI skliaustuose OK-ish) |
| content.subtitle | įrankius rinksies **video įrankių skaidrėje** | T05 analogas: pažadas vėliau                                                          |

Recap #1–2 plain OK. Lead „Vaizdų skyrius – pamatas video“ OK.

**Praktikos (sutampa su T03):** body ≥16px desktop; CTA ≥ body; vienas H1; skiriamoji = celebration hero (GOLDEN §3.4b). Batch: tas pats `SectionBreakSlide` tokenų fix + 13.36 recap #3 LT.

**Handoff:** CODING su T03 (tokenai visiems recap break’ams) → CONTENT (13.36 recap #3 be bare `same product`) → DATA. **Ne** keisti šriftą.

**Statusas:** open · **Netaisyta.** · T03 sibling.

---

### R.M13-T12 – Skaidrė `13.4` „Trumpas vaizdo scenarijus“ — copy OK/FAIL

**Savininko signalas (2026-08-19, 15 / 26):** tai metodinė medžiaga mokymų kūrėjui, **ne** UI/UX mokiniui. Įvertinti copy: kas **OK / FAIL**.

**Verdiktas:** savininkas teisus. SOT/craft (C-M1 ciklas) **išverstas į skaidrę kaip paketas**, ne kaip viena užduotis.

**OK (laikyti idėją, perrašyti balsą):**

| Kas                                                 | Kodėl OK                                     |
| --------------------------------------------------- | -------------------------------------------- |
| Trumpai: 2–4 klipai po 3–5 s, ne vienas ilgas       | Viena taisyklė, mokinys gali veikti          |
| Daryk: 2–3 sakiniai **vienam** kadrui               | Aiškus veiksmas                              |
| Sutikimas: ne realūs veidai/balsai                  | Turi likti                                   |
| Ciklo mintis: vienas kintamasis + paskutinis kadras | C-M1 pedagogika — **ne** žodis „invariantai“ |

**FAIL (kūrėjo / SOT balsas):**

| Kas                 | Live                                                                     | Mokinio UI                                                                |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Copyable skaičius   | **3** šablonai                                                           | GOLDEN §3.2: vienas copy veiksmas; Daryk sako „nukopijuok šabloną“ (vns.) |
| Patikra             | „Ar **invariantai** parašyti?“                                           | Authoring. → „Ar parašei, kas **nekinta**?“                               |
| Šablonas 1          | `crane up`, `image-to-video`, `hero keyframe`, `Same style, same colors` | EN komandos kūrėjui, ne LT užduotis                                       |
| Šablonas 2          | `Hero kadaras` (klaida), `I2V`, `same product / same style`              | Typo + EN                                                                 |
| Šablonas 3          | `Be orbitos, be tilt`                                                    | Operatoriaus cheatsheet                                                   |
| Collapsible         | POV, keyframe, I2V + 5 vendoriai                                         | Įrankių katalogas (T05) + žargonas                                        |
| „Ta pati išvaizda…“ | `reference` + `same product / same style`                                | T06 echo                                                                  |
| Schema              | Grandinė tik tekstu                                                      | T09 analogas: sakome grandinė, nerodome                                   |

**Batch kryptis (ne kodas):** first-screen = Trumpai + Daryk + **vienas** klipo šablonas LT (scenarijus / kamera / tonas; startas = „video iš kadro“). Ciklas ir grandinė → kita skaidrė (`13.47`) arba vienas collapsible „jei kartosi“. Patikra be „invariantų“.

**Won’t:** išmesti 3–5 s taisyklę · C-M1 pedagogiką; tik balsą.

**Handoff:** CONTENT (tu, 1 copyable) → DATA (LT+EN) → QA. Craft C-M1 lieka **idėja**, ne kūrėjo leksika.

**Statusas:** open · **Netaisyta.**

---

### R.M13-T13 – Skaidrė `13.47` „I2V generatorius“ — poliruoti ir vystyti

**Savininko signalas (2026-08-19, 16 / 26):** poliruoti **ir vystyti** — tekstai ir vartotojo patirtis. (T12: ciklo praktika priklauso čia, ne 13.4 metodikos sienai.)

**v01 OK:** Pattern `special` = 13.37 veidrodis · trukmė 3/4/5 · meter · Copy + atidaryti įrankį · 3 s default. Feature Doc KEEP (enhancement, ne naujas tipas).

**FAIL — tekstai:**

| Vieta         | Live                                  | Mokinio UI                                                     |
| ------------- | ------------------------------------- | -------------------------------------------------------------- |
| Subtitle      | `I2V` + `keyframe` grandinė           | LT: video iš kadro; raktinis kadras (pirmą kartą)              |
| Trumpai       | I2V + 4 vendor’iai                    | Kaip T10: ką daryti čia; įrankiai apačioje                     |
| Promptas      | `Image-to-video klipas` + `keyframe`  | LT sakiniai; I2V ne H                                          |
| Judesiai      | dolly / pan / Crane up / orbitavimas  | LT pirmas (`lėtai į priekį`), EN antras                        |
| Kling kortelė | `balance kokybė`                      | `balansas`                                                     |
| Patikra JSON  | Veo native garsas ant to paties failo | C-S1 → 13.5; čia: kadras, 3 s, viena kamera, paskutinė sekundė |

**FAIL — UX vs 13.37 (vystyti):**

| 13.37 (T10: puiki)                | 13.47 live                                            |
| --------------------------------- | ----------------------------------------------------- |
| 3 taktai + šablonai (E-commerce…) | Vienas plokščias „parametrų“ blokas, 0 presetų        |
| A/E/C ir laukai su pavyzdžiais    | Scena + 2 checkbox EN idėjos                          |
| Nav „Tęsti: …“                    | **Tęsti** be tikslo (13.5 shortTitle?)                |
| Įrankiai daug, bet po prompto     | 6 kortelės su `image-to-video` / `native audio` siena |

**Batch kryptis:**

1. **Tekstai:** Trumpai = „Aprašyk kadrą, trukmę ir vieną kameros judesį – sistema sudės promptą video iš kadro. Nukopijuok į generatorių.“ Promptas LT. Patikra be Veo.
2. **UX:** 13.37 taktai (1 kadras 2 trukmė+judesys 3 tas pats produktas/stilius) + 2–3 judesio presetai. Meter lieka.
3. **Įrankiai:** 3–4 (Kling, Runway, Veo, Sora) arba collapsible; T05 nebekartoti katalogo.
4. T12 ciklas („vienas kintamasis, paskutinis kadras“) — hint po Copy, ne 13.4 siena.

**Won’t:** naujas Pattern · user upload kadro · palikti EN `Image-to-video` first-screen.

**Handoff:** CONTENT (`i2vGen` + JSON tldr/patikra + judesiai) → UI_UX/CODING (`I2vGeneratoriusSlide` taktai/presetai) → DATA EN overlay → QA. **Ne** Feature Doc nuo nulio. **Ne** `generate:core-data`.

**Statusas:** open · **Netaisyta.** · T10 sibling + T12 praktikos namai.

---

### R.M13-T14 – Skaidrė `13.5` „Video įrankiai, formatas ir CPI“ — authoring, ne UI

**Savininko signalas (2026-08-19, 17 / 26):** atsitiktinės frazės, **neišbaigtas**, nepadarytas UI/UX — **authoring**.

**Verdiktas:** sutinku. SOT norėjo **lentelės**; live = pastraipa + JSON laukų sąrašas mokiniui. T12/T09 šeima.

**OK (idėja):**

| Kas                                       | Kodėl          |
| ----------------------------------------- | -------------- |
| CPI = ne tik €/s, o bandymai iki tinkamo  | Verslo pamoka  |
| Daryk: vienas 3–5 s klipas + kiek bandymų | Viena užduotis |
| Formatas 16:9 / 9:16                      | Reikia         |

**FAIL — authoring leak:**

| Vieta                 | Live                                                       | Kodėl FAIL                                 |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------ |
| Subtitle / H          | `2026 matrica`                                             | Metų stampas kūrėjui                       |
| Trumpai               | CPI formulė vienoje eilutėje                               | Cheatsheet, ne pamoka                      |
| „Matrica“             | Viena pastraipa 6 įrankių                                  | SOT = lentelė / Choice; **UI nepadarytas** |
| „Video prompt laukai“ | `duration_s`, `reference_ids`, `safety_flags`, `cpi_note`… | **JSON schema mokiniui** — hard FAIL       |
| Garsas collapsible    | `generate`, `native garsas`                                | C-S1 kūrėjo pastaba                        |
| „Visi video…“         | Vendor dump + „modulis 13“                                 | Katalogas; T05                             |
| Nav                   | `Tęsti: video`                                             | Sutrumpinta be prasmės                     |
| Copyable              | „CPI pastaba“ be žodžio paaiškinimo                        | Po Trumpai formulės — dubliuoja chaosą     |

**Batch kryptis (UI, ne SOT dump):**

1. Trumpai: formatas + „kiek kartų paleidai, kol gavai tinkamą klipą“ (CPI gloss vieną kartą).
2. **Matrica = kortelės / Choice** (3–4: Kling, Seedance, Veo, Sora) — ne pastraipa.
3. Daryk + vienas šablonas + laukas „bandymų skaičius“.
4. **Ištrinti** sekciją „Video prompt laukai“ iš mokinio JSON (lieka SOT / handout authoring).
5. Garsas Veo vs atskirai — 2 eilutės Patikroje arba vienas collapsible be `native`/`generate`.

**Won’t:** palikti snake_case laukus · 2026 H1 · trečias įrankių dump po 13.47.

**Handoff:** CONTENT + UI_UX (matrica kaip UI) → CODING (Choice/kortelės jei reikia) → DATA → QA. Rišasi T05/T13.

**Statusas:** open · **Netaisyta.**

---

### R.M13-T15 – Skaidrė `13.52` „Montažas“ — schema / terminai / UX / LT

**Savininko signalas (2026-08-19, 19 / 26):** didesnė schema? terminologija? UX? LT kalba?

**OK:** 4 žingsniai + klikas; S4 **timeline** metafora; Trumpai „žalia medžiaga“; Daryk 4 eilučių planas; imageAlt LT (kirpimas / spalvos / garsas / eksportas).

**FAIL:**

| Ašis             | Live                                                     | Batch                                                 |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| **Schema dydis** | `max-w-2xl` (kaip 13.32)                                 | Didinti (T01 šeima: herojus); S4 forma KEEP           |
| **LT labeliai**  | STEPS_LT = **Cut / Grade / Mix / Export** + hook, VO/bed | Kirpimas · Spalvos · Garsas · Eksportas; balsas/fonas |
| **Chrome**       | `Post-production grandinė`                               | Montažo grandinė / laiko juosta                       |
| **Schema body**  | `Cut → Grade → Mix → Export`                             | LT juostos                                            |
| **Paaiškinimai** | title `1. Cut`; body su hook, VO, licensed, raw, LUFS    | LT + LUFS KEEP su gloss („garsumo orientyras“)        |
| **UX**           | Klikas OK; EN chip’ai = pirmas signalas                  | Mirror imageAlt; selected step aiškus                 |

Term bank: VO→balsas, bed→fonas (PIRMAS); LUFS KEEP.

**Won’t:** keisti timeline metaforą · rainbow · enlarge ON.

**Handoff:** CONTENT (`m13PostprodContent.ts` + JSON body) → SCHEME/CODING (dydis) → DATA EN → QA. T02/T06 brolis.

**Statusas:** open · **Netaisyta.**

---

### R.M13-T16 – Skyrių skiriamosios `13.15` / `13.36` / `13.56` — sibling palyginimas + locked variantas

**Savininko signalas (2026-08-19, 20 / 26, 3-ia skiriamoji „Garsas“):** visiškai maža, skurdi, negraži; šriftai/dydžiai; **lyginti su siblingais** ir rasti geriausią variantą.

**Savininko sprendimas (užrakintas):** **A – celebration hero** kaip M4 40.5 (tamsus brand hero + recap + Kas toliau; vienas H1). Ne tik tokenų bump.

**Siblingai (visi `section-break` + `recap`, be `celebrationText`):**

| ID      | Skyrius | Badge | Turinio pastaba                           |
| ------- | ------- | ----- | ----------------------------------------- |
| `13.15` | Vaizdai | 1     | T03 tipografija; T02 echo recap           |
| `13.36` | Video   | 2     | T11; `same product` recap                 |
| `13.56` | Garsas  | 3     | Recap LT OK-ish; vizualiai ta pati skurda |

**Kodėl skurdu:** tas pats `SectionBreakSlide` kelias be celebration → ModuleView H1 + vidinis H2 dublis + du lygūs Banner’iai + CTA `text-xs` + daug tuščios vietos (T03 lentelė). M4 siblings turi `celebrationText` → hero + H1 slepiamas.

**Geriausias variantas (locked A):**

1. Visoms trims: `celebrationText` (pvz. „Vaizdų skyrius – startas“ / „Video – kitas sluoksnis“ / „Garsas diktuoja trukmę“) – CONTENT.
2. Tokenai: h3 + body 16px + CTA ≥ body (T03 CODING).
3. Recap gloss: 13.36 #3 be bare `same product` (T11).
4. Etalonas: GOLDEN §3.4b/c + M4 40.5.

**Won’t:** trijų skirtingų layout’ų · tik 13.56 taisyti · rainbow.

**Handoff:** CONTENT (`celebrationText` ×3 + recap polish) → DATA → CODING (jei reikia hero tweaks; tokenai T03) → UI_UX/QA. **Ne** Feature Doc.

**Statusas:** open · **Netaisyta.** · **variantas A locked.** · supersedes T03 klausimą A.

---

### R.M13-T17 – „Neprivaloma“ mokiniui — **policy locked Must FAIL**

**Savininko signalas (2026-08-19, 25 / 26, `13.8` Žodynėlis):** kodėl visur **Neprivaloma**? Mokymų medžiagoje to **neturi būti**. Viskas mokiniui ir taip pasirenkama — baksnoti „gali nedaryti“ = **nepedagogiška**. Badge dukart: ModuleView + skaidrės chrome.

**Verdiktas:** savininkas teisus. Sutampa su T08/T10 ir M15 pamoka (privaloma/neprivaloma ≠ mokinio ašis). Live vis dar rodo badge per `badgeVariant: 'optional'` → `common:optional` = „Neprivaloma“.

**M13 first-screen „Neprivaloma“ šaltiniai:**

| Kur                     | Mechanizmas                                              |
| ----------------------- | -------------------------------------------------------- |
| `13.8` Žodynėlis        | `optional: true` + `badgeVariant: optional` (screenshot) |
| `13.33` Kompozicija     | tas pats                                                 |
| `13.35` MASTER          | tas pats                                                 |
| `13.37` Trumpai         | „po **neprivalomos** skaidrės…“ (T10)                    |
| `vaizdoGen.sectionText` | „Tekstų integracija **(neprivaloma)**“                   |

**Locked Must (batch):**

1. **0×** žodis „Neprivaloma“ / „Optional“ / „**privaloma**“ mokinio UI M13 (badge, Trumpai, formų H, body, Patikra).
2. Žodynėlis = normali skaidrė (terminai greitam prisiminimui) — be amber badge.
3. Trumpas kelias (`skipOptional`) gali likti **techninis** (paslepia skaidres) — **be** žodžio mokiniui.
4. T08: kompozicija = normali užduotis (O1) lieka atskiras curriculum; T17 = bent chrome išvalymas visur.

**Won’t:** sakyti mokiniui „gali praleisti“ / „neprivaloma“ · palikti badge „dėl short path“.

**Handoff:** CONTENT (0 neprivaloma) → DATA (`badgeVariant` nuimti M13; tldr T10) → CODING jei reikia · QA `audit:lt-address` / greita grep. Precedentas: M15 walk be `badgeVariant: optional`.

**Statusas:** open · **Netaisyta.** · **policy locked.**

---

### R.M13-T18 – Skaidrė `13.101` „Verslas ir rizikos“ — metodika, ne verslo UI

**Savininko signalas (2026-08-19, 23 / 26):** panašu į metodiką; **nėra verslo kalba** išaiškinta; norisi **daugiau esmės**; atrodo kaip **neišbaigtas UI/UX authoring**.

**Verdiktas:** sutinku. SOT §5a išverstas į collapsible sieną. Nėra **Daryk dabar**. Heading **„(privaloma)“** = T17 brolis (nepedagogiška).

**OK (esmė, ne dump):**

| Idėja                                     | Kodėl          |
| ----------------------------------------- | -------------- |
| Prieš publikaciją: teisės + DI žyma + A/B | Verslo vartai  |
| A/B hipotezės šablonas                    | Viena užduotis |
| 3 kriterijų vertinimas                    | Eval-as-habit  |
| Sutikimas veidams/balsui                  | KEEP           |

**FAIL:**

| Kas            | Live                                                                   | Mokinio verslas                                           |
| -------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| H              | `Teisės ir rizikos (**privaloma**)`                                    | T17: 0× privaloma/neprivaloma                             |
| Patikra        | „grįžk į **privalomą** bloką“                                          | Tas pats                                                  |
| Teisės body    | GDPR, EU AI Act Art. 50, Soft Binding, provenance, Content Credentials | Teisininko cheatsheet; reikia „ką padarai prieš skelbimą“ |
| KPI            | CTR, CVR, CPM be verslo sakinio                                        | „kiek žmonių spaudžia / perka / sustoja“                  |
| Struktūra      | 6+ collapsible + 2 copy                                                | Be Daryk; Atidaryti visus = biblioteka                    |
| Top 3 pitfalls | EN heading + MASTER / one-shot / CPI                                   | Kūrėjo santrauka                                          |
| QA list        | Reference lock, Brand safety, Disclosure                               | EN stack                                                  |

**Batch kryptis (esmė):**

1. Trumpai: prieš skelbimą patikrink **teises, DI žymą, vieną A/B idėją**.
2. **Daryk:** užpildyk A/B hipotezę **arba** paleisk vertinimo šabloną (vienas first-screen CTA).
3. Teisės = 4–5 bullet’ai paprastai (licencija, sutikimas, prekės ženklas, DI žyma) — Art. 50 / Soft Binding collapsible arba žodynėlis.
4. KPI = vienas sakinys verslu + nuoroda į žodynėlį.
5. 0× „privaloma“ (T17).

**Won’t:** EU AI Act eilutė first-screen · Top 3 pitfalls EN · palikti „privaloma“ H.

**Handoff:** CONTENT (verslo balsas + Daryk) → DATA → QA. Rišasi T17.

**Statusas:** open · **Netaisyta.**
