# M16 turinio brandos planas (learner maturity)

> **Failas:** `docs/development/M16_MATURITY_PLAN.md` (alias intent: `m16_maturity_plan`)  
> **Data:** 2026-08-04  
> **Statusas:** **done** (EN+B1–B4 + C 2026-08-04) – 22 sk.; 16.9 deleted into 16.85  
> **Apimtis:** tik **Modulis 16** (23 skaidrės). M17/M18 – atskiri epic’ai po M16 plain pass.  
> **SOT:** [`turinio_pletra_moduliai_16_17_18.md`](../turinio_pletra_moduliai_16_17_18.md) §2 · eilė [`MODULIO_16_SKAIDRIU_EILES.md`](../MODULIO_16_SKAIDRIU_EILES.md)  
> **Live:** `src/data/modules.json` (id 16) · EN `modules-en-m16-m18.json`  
> **Tickets:** [`TODO.md`](../../TODO.md) §1.2i `M16-PLAIN-*`  
> **Ne šis planas:** TE Must/Should (jau ✅), corporate18, Density CI, M18 PACKET rewrite.

---

## 0. Diagnostika (kodėl reikia)

| Sluoksnis                                | Būsena                       | Pastaba                                                      |
| ---------------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| Curriculum / eilė D1→D2                  | ✅ ~7/10                     | Logiška artefaktų grandinė                                   |
| TE (schemos, lab, embeds)                | ✅ ~7/10                     | `TE-M1618-*` done 2026-08-01                                 |
| Copyable klasės                          | ✅ ~6/10                     | `M16_M18_PROMPT_MATURITY` – Skeptikas / Brief                |
| **Intro 160 + 16.2**                     | ✅ baseline 2026-08-04       | „M16 action-intro clarity“ – žr. §0.1; **neperrašyti**       |
| LT plain language / kelionė (likusi M16) | ❌ ~2–3/10                   | Žargonas nuo 16.25+, silpnas „Daryk“, be užpildytų pavyzdžių |
| EN body                                  | ❌ ~1/10 (išskyrus 160/16.2) | 160+16.2 EN jau hand-tune; kitur titles EN / body LT         |
| Authoring DoD (F1–F8)                    | ✅                           | „Kelias gyvas“ ≠ „mokinys supranta“                          |

**Root cause (likusi skylė):** F4 stub + TE diena; soft dens ≠ skaitomumo epic; EN gate silpnas **po** intro. Intro polish **neatstoja** viso M16 plain.

**Canonical pavyzdys visam planui:** dienos prioritetų įrankis (SOT §1.5) – kiekvienoje kritinėje skaidrėje **bent 1 užpildytas** ir **1 tuščias šablonas**.

### 0.1 Intro polish baseline (2026-08-04) – NESIPJAUNA / NEREWRITE

> CHANGELOG: _M16 action-intro clarity + CTA dedupe_. SOT §1.3 vibe gloss. Coding: `ActionIntroSlide` – non-reveal CTA tik hero (GOLDEN §4.2).

| Sprendimas (užrakinta)                                                          | Live         | Šiame epic’e                                                    |
| ------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------- |
| Hero `Vibe coding` / `su disciplina`                                            | ✅           | **Palikti** – SOT framing; nekeisti į „Planavimas / prieš kodą“ |
| `heroSubText` = M1–6 + **vibe = greitas kūrimas su DI, bet brief prieš Cursor** | ✅           | **Palikti**; nekirpti gloss                                     |
| CTA = **2 min micro-win** (naudotojas + problema; vertė/1 fn – vėliau)          | ✅           | **Palikti**; negrąžinti pilno D1 į CTA                          |
| outcomes[0] be `1+1+1` → „Naudotojas, problema, vertė ir 1 funkcija“            | ✅           | **Palikti**; ne „1+1+1“ atgal                                   |
| 16.2 subtitle / triad = **1 funkcija** (ne „1 užduotis“)                        | ✅           | **Palikti**                                                     |
| EN 160 + 16.2 body                                                              | ✅ hand-tune | EN Sprint **neapima** šių sk. (nebent drift)                    |
| Be tools mug / reveal ant intro                                                 | ✅           | **Neliesti**                                                    |
| `ActionIntroSlide` CTA dedupe                                                   | ✅ coding    | **Neliesti** UI be regresijos                                   |

**Likutis ant 160 (lengvas P2, ne rewrite):** outcomes[1]–[2] plain (failas / Must) – optional B1; „rašyk užrašinėje“ CTA – optional.  
**Likutis ant 16.2:** tik **užpildytas pavyzdys + šablonas** Daryk (P1 praktika) – nekeičia polish triadės.

---

## 1. Brandos rubrika (4 ašys)

Kiekviena skaidrė vertinama ir taisoma pagal:

| Ašis                  | Klausimas mokiniui                     | Praeinamas signalas                                                  |
| --------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| **P – Pedagogika**    | Ko mokausi ir kodėl dabar?             | 1 aiški mintis; terminas su tiltu; be authoring meta                 |
| **N – Nauda**         | Ką gausiu po 2 min?                    | Trumpai = outcome, ne žargono sąrašas                                |
| **Pr – Praktiškumas** | Ką tiksliai daryti dabar?              | Daryk = šablonas / pavyzdys / check; žinoma _kur_ rašyti             |
| **V – Verslo nauda**  | Kaip tai taikoma produktui / komandai? | Situacija + pasekmė + ribos (laikas / rizika / pinigai netiesiogiai) |

**Bendras praeinamas balas skaidrei:** ≥3/4 ašių ✅ ir nėra P0 defekto (žemiau).

### 1.1 Soft CONTENT checklist (be Density CI)

1. `Trumpai` ≤ 2 sakiniai, first viewport – paprasta kalba (`PAPRASTOS_KALBOS_GAIRES.md`).
2. `Daryk dabar` = konkretus veiksmas + šablonas arba užpildytas pavyzdys.
3. `Patikra` ≠ Trumpai echo; 1 taip/ne klausimas.
4. Naujas terminas pirmą kartą: LT paaiškinimas arba skliaustai; glossary wire jei SOT §5.4.
5. Be curriculum/authoring meta body: `D1→D2`, `Alias M18`, „ne antras delivery kelias“, „v1 lentelė“.
6. LT: **DI**, tu-forma, „promptas“ be apostrofų. EN: **AI**, pilnas body (ne tik title).
7. Artefaktas: mokinys žino – rašo užrašinėje / Docs / Chat (vienas default: **užrašinė arba Docs**).

### 1.2 P0 defektai (blokuoja „praeinama“)

- EN body su LT spill.
- „Daryk“ be jokio pavyzdžio, kai skaidrė moko formulę / lentelę / brief.
- Terminų siena be tiltų (pvz. VSR, Soft DoD, smoke, MCP, PACKET) M16 learner body.
- Brief skaidrė be 11 laukų sąrašo (tik kableliai).

---

## 2. Žodyno politika M16 (prieš skaidres)

| Terminas (gali likti)              | Privalomas tiltas pirmą kartą                                | Kur          |
| ---------------------------------- | ------------------------------------------------------------ | ------------ |
| Brief / MVP brief                  | „Trumpas produkto užduoties aprašas prieš kodą“              | 160 / 16.9   |
| Cursor                             | „DI kodavimo redaktorius – rašysi kodą Modulio 18“           | 16.25        |
| Must / Should / Won’t              | Tik po LT: Būtina / Galima / Nekuriame **arba** skliaustuose | 16.7 → 16.18 |
| Vibe → Skeleton → Refinement (VSR) | „Idėjos jausmas → karkasas → smailinimas“                    | 16.101       |
| Triage                             | „Trys apimties stulpeliai“                                   | 16.7 / 16.85 |
| Naudotojo ciklas                   | „Kaip žmogus eina nuo poreikio iki rezultato“                | 16.16        |
| Soft DoD / smoke / PACKET / MCP    | **Ne M16 body** (→ M18 / Won’t pavyzdžiai minimaliai)        | —            |
| Auth / Stripe                      | „Prisijungimas / mokėjimai“                                  | 16.7, 16.18  |

---

## 3. Sprintų eilė (worst-first)

| Sprint | ID             | Apimtis                                                               | Owner                                        | Exit                                       |
| ------ | -------------- | --------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| **0**  | `M16-PLAIN-0`  | Rubrika freeze + EN audit scope (body)                                | ORCH / QA                                    | Šis failas + TODO §1.2i                    |
| **1**  | `M16-PLAIN-EN` | Visas M16 EN body (23 sk.)                                            | CONTENT → DATA                               | `audit-en-language` body gate; be LT spill |
| **2**  | `M16-PLAIN-B1` | **16.25 · 16.3** (+ optional 160 outcomes[1–2] / 16.2 Daryk pavyzdys) | CONTENT → DATA                               | Stack+proceso plain; **ne** intro rewrite  |
| **3**  | `M16-PLAIN-B2` | 16.4–16.8 · 16.85 · 16.9                                              | CONTENT → DATA (+ CODING jei path-step copy) | D1 artefaktas: užpildyta kortelė           |
| **4**  | `M16-PLAIN-B3` | 16.101 · 16.11–16.15                                                  | CONTENT → DATA (+ lab TS jei reikia)         | VSR + kryptis be žargono sienos            |
| **5**  | `M16-PLAIN-B4` | 16.16–16.21 · 16.205 · 16.22                                          | CONTENT → DATA                               | Brief 11 laukų + summary plain             |
| **6**  | `M16-PLAIN-C`  | Merge 16.85+16.9; 16.7↔16.18 role sharpen (**22** sk.) ✅             | CURRICULUM → CONTENT → DATA                  | Done 2026-08-04                            |

**Rekomenduojama seka:** 0 → 1 (EN lygiagrečiai su 2) → 2 → 3 → 4 → 5 → 6.

**Feature Doc:** nereikia (ne naujas Pattern).  
**`generate:core-data`:** N/A. EN: `build:modules-en-m16-m18` + durable overrides.

---

## 4. Epic DoD (M16 praeinamas)

M16 laikomas **praeinamu (~6.5–7/10 learner)**, kai:

1. [x] Walkthrough: naujas verslo mokinys per ~25–30 min turi **5 laukų kortelę** + **draft 01_MVP_BRIEF** (bent 8/11 laukų).
2. [x] Kiekviena MUST skaidrė praeina ≥3/4 rubrikos ašių.
3. [x] EN overlay: body be LT diacritics spill (griežtesnis audit nei dabartinis transfer-only).
4. [x] VSR / triage / brief / ciklas – pirmą kartą su LT tiltu.
5. [x] Nėra Soft DoD / smoke / PACKET / MCP kaip privaloma M16 mokymo kalba.
6. [x] `CODEBASE_WHAT_IS_DONE` atskiria: Authoring+TE ✅ · **Learner plain ✅** · **EN body ✅**.
7. [x] CHANGELOG + content `lessons.md` eilutė; `audit:m1618` (atnaujintas) žalias.

---

## 5. Skaidrė po skaidrės – ką taisyti

Legenda prioriteto: **P0** = blokuoja praeinamą · **P1** = stipriai kenkia · **P2** = polish.  
Dabartinė būsena: trumpas verdiktas 4 ašims (P/N/Pr/V) – ❌ silpna · △ dalinė · ✅ ok.

---

### 160 · Kodo inžinerijos kelias (`action-intro`)

|                 |                                                                           |
| --------------- | ------------------------------------------------------------------------- |
| **Dabar**       | P ✅ · N ✅ · Pr ✅ · V △ — **intro polish baseline** (2026-08-04); EN ✅ |
| **Prioritetas** | P2 optional · Sprint B1 tik jei lieka outcomes[1–2]                       |
| **Baseline**    | §0.1 – **neperrašyti** hero / CTA / outcomes[0] / heroSubText gloss       |

**Pedagogika / nauda / praktika:** jau sutvarkyta polish’e (vibe gloss + micro-win CTA + plain outcomes[0]).  
**Verslas (soft):** whyBenefit OK; optional vėliau – vienas sakinys apie sutaupytą chaotišką generate (ne hero).

| Laukas                | Statusas                                            | Šiame epic’e                                                          |
| --------------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| heroStat / heroText   | ✅ `Vibe coding` / `su disciplina`                  | **Freeze** – konfliktas, jei keisti į „Planavimas“                    |
| heroSubText           | ✅ vibe gloss + Cursor                              | **Freeze** (SOT §1.3)                                                 |
| firstActionCTA        | ✅ micro-win (naudotojas+problema; vertė/fn vėliau) | **Freeze**                                                            |
| outcomes[0]           | ✅ be `1+1+1`                                       | **Freeze**                                                            |
| outcomes[1]           | △ failo kelias                                      | Optional plain: „5 laukų kortelė → trumpas brief (`01_MVP_BRIEF.md`)“ |
| outcomes[2]           | △ Must / Won’t                                      | Optional plain: „Ko imamės / ko nedarome + kaip žinosi, kad veikia“   |
| audience / whyBenefit | ✅                                                  | Freeze                                                                |
| EN                    | ✅                                                  | Ne EN Sprint scope                                                    |
| ActionIntroSlide CTA  | ✅ coding                                           | Neliesti                                                              |

---

### 16.2 · Ką šiandien padarysi

|                 |                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Dabar**       | P ✅ · N ✅ · Pr △ · V △ — triadė polish’inta; trūksta užpildyto pavyzdžio; EN ✅           |
| **Prioritetas** | P1 praktika (Daryk) · Sprint B1 optional / su B2                                            |
| **Baseline**    | subtitle `1 funkcija`; Trumpai triadė – **nekeisti** atgal į „1 užduotis“ / `1+1+1` etiketę |

| Blokas  | Taisyti                                                                                                                                                   |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trumpai | **Freeze** esamą (jau „1 problema, 1 naudotojas, 1 pagrindinė funkcija… Rezultatas – ne prezentacija“)                                                    |
| Daryk   | **Pridėti** (nekeičiant pirmos eilutės): pavyzdys „Vadovas rytą nežino, nuo ko pradėti → 3 prioritetai.“ + šablonas `[Kas] negali [ką], kai [situacija].` |
| Patikra | **Freeze**                                                                                                                                                |
| EN      | **Freeze** (jau EN); po LT Daryk papildymo – sync EN viena eilute                                                                                         |

---

### 16.25 · Stack žemėlapis

|                 |                                                                              |
| --------------- | ---------------------------------------------------------------------------- |
| **Dabar**       | P △ · N ❌ · Pr △ · V △ — ankstyva įrankių politika; Soft DoD; mugės sąrašas |
| **Prioritetas** | P1 · Sprint 2                                                                |

| Blokas         | Taisyti                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trumpai        | „Šiandien tik planuoji. Kodą rašysi Modulio 18 su Cursor. Hostingo nelieči.“                                                                                        |
| Lentelė        | Sutrumpinti iki 3 eilučių: Brief (Chat DI) · Kodas vėliau (Cursor) · Įrodymas vėliau (GitHub). Stulpelį „Soft DoD“ → „Žinosi, kad reikės parodyti rezultatą (M18).“ |
| Anti-mugė body | 1 sakinys: „Ne Lovable/Replit kaip pagrindinis kelias šiame kurse.“                                                                                                 |
| Daryk          | „Užsirašyk: brief dabar; Cursor diegimas optional; generate – ne šiandien.“                                                                                         |
| Patikra        | „Ar brief’e jau rašai tech stack? (Turėtų būti ne.)“                                                                                                                |
| EN             | Lentelė + body                                                                                                                                                      |

---

### 16.3 · Proceso schema

|                 |                                                                        |
| --------------- | ---------------------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr △ · V △ — „Delivery vartai“ PM žargonas; Daryk neaiškus |
| **Prioritetas** | P1 · Sprint 2 (+ optional SCHEME chrome title)                         |

| Blokas                                  | Taisyti                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Title / section heading                 | „Proceso schema“ OK; heading „Delivery vartai“ → **„Šeši žingsniai iki brief’o“**                  |
| Diagram chrome (`m16M18DiagramContent`) | Title LT: „Kelio žingsniai“ (ne „Delivery vartai“); desc „Must branduolys“ → „Pagrindinė funkcija“ |
| Trumpai                                 | „Einame: problema → žmogus → nauda → 1 funkcija → brief → patikra. Kodas – M18.“                   |
| Daryk                                   | „Diagramoje spausk žingsnį, kuriame esi dabar, ir garsiai pasakyk jo pavadinimą.“                  |
| Patikra                                 | OK                                                                                                 |
| EN                                      | Body + imageAlt                                                                                    |

---

### 16.4 · Problema prieš sprendimą

|                 |                                                 |
| --------------- | ----------------------------------------------- |
| **Dabar**       | P ✅ · N △ · Pr △ · V △ — lentelė per abstrakti |
| **Prioritetas** | P1 · Sprint 3                                   |

| Blokas         | Taisyti                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Lentelė Blogas | „Noriu app su DI“                                                                                   |
| Lentelė Geras  | **Pilnas sakinys:** „Vadovas rytą 20 min skirsto užduotis ir vis tiek pradeda ne nuo svarbiausio.“  |
| Antra eilutė   | Stack/funkcijos vs situacija/pasekmė – OK; pridėti verslo pasekmę („švaisto rytą / komanda laukia“) |
| Daryk          | „Perrašyk savo idėją: kas kenčia, kada, kokia verslo/asmeninė pasekmė.“                             |
| EN             | Visa lentelė (dabar LT + DI)                                                                        |

---

### 16.5 · Problemos formulė

|                 |                                                                   |
| --------------- | ----------------------------------------------------------------- |
| **Dabar**       | P ✅ · N △ · Pr ❌ · V △ — formulė gera; be pavyzdžio; „optional“ |
| **Prioritetas** | P1 · Sprint 3                                                     |

| Blokas                   | Taisyti                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Trumpai                  | Formulė + „Mokėjimas – nebūtina šiame MVP.“                                                                                        |
| Nauja sekcija arba Daryk | **Užpildyta:** „Vadovas susiduria su prioritetų chaosu kai rytas prasideda nuo el. pašto, todėl švaisto 20 min ir komanda laukia.“ |
| Daryk                    | Tuščias šablonas 4 slotams                                                                                                         |
| Patikra                  | 3 mini: dažnis? skausmas? ar galima patikrinti prototipu? (gal bullet)                                                             |

---

### 16.6 · Vertė nėra funkcija

|                 |                                                           |
| --------------- | --------------------------------------------------------- |
| **Dabar**       | P ✅ · N ✅ · Pr ✅ · V ✅ — geriausia D1; EN exercise LT |
| **Prioritetas** | P0 EN · Sprint 1                                          |

| Blokas                | Taisyti                                                        |
| --------------------- | -------------------------------------------------------------- |
| LT                    | Minimalus polish; Daryk pridėti 1 poros pavyzdį prieš exercise |
| `recognitionExercise` | EN: title/task/examples/choices/explanations/goal              |
| —                     | Neplėsti teorijos                                              |

---

### 16.7 · MVP apimtis

|                 |                                                                |
| --------------- | -------------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr △ · V △ — „Triage mapinasi į Must…“; `fn`; Auth |
| **Prioritetas** | P1 · Sprint 3                                                  |

| Blokas          | Taisyti                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trumpai         | „Trys stulpeliai: Būtina dabar / Galima vėliau / Nekuriame. Pirmam MVP – 1 pagrindinė funkcija (+ max 1–2 pagalbinės).“ Be Must pirmame sakinyje. |
| Lentelė         | Zona likti LT; „fn“ → „funkcija“; Auth → „Prisijungimas (Auth)“                                                                                   |
| Body po lentele | „Brief’e vėliau tai taps Must / Should / Won’t – tie patys stulpeliai angliškomis etiketėmis.“                                                    |
| Daryk           | **5 idėjų pavyzdys** jau įmestas į 3 stulpelius (dienos prioritetai) + „dabar savo 5“                                                             |
| Patikra         | OK                                                                                                                                                |

---

### 16.8 · Praktika: kūrimo kortelė (`path-step`)

|                 |                                                                    |
| --------------- | ------------------------------------------------------------------ |
| **Dabar**       | P ✅ · N △ · Pr △ · V △ — laukai OK; nėra užpildyto etalono; EN LT |
| **Prioritetas** | P0 praktika · Sprint 3                                             |

| Blokas       | Taisyti                                                                           |
| ------------ | --------------------------------------------------------------------------------- |
| body         | „Rašyk Docs ar užrašinėje. Pažymėk čia, kai visi 5 laukai užrašyti.“              |
| Prieš laukus | Collapsible arba sekcija **„Pavyzdys (dienos prioritetai)“** – 5 užpildyti laukai |
| Laukai 1–5   | Palikti; #5 „Kaip žinosime…“ – pridėti pvz. „Per 2 min žmogus mato Top 3.“        |
| Patikra      | OK                                                                                |
| path 1/1     | Palikti arba stepTotal kontekstą paaiškinti UI (neprivaloma)                      |
| EN           | Visas path-step content                                                           |

---

### 16.85 · Kortelė paruošta (`section-break`)

|                 |                                                       |
| --------------- | ----------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr ❌ · V △ — `D1→D2`; nextSteps žargonas |
| **Prioritetas** | P1 · Sprint 3                                         |

| Blokas        | Taisyti                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| sectionNumber | `D1→D2` → **„1 dalis“** arba **„Kortelė → brief“**                                                                    |
| subtitle      | Be failų lietaus: „Toliau išgryninsi idėją ir surašysi brief’ą. Dar ne kodas.“                                        |
| nextSteps     | 4 plain: (1) Trys brief brandinimo žingsniai (2) Sakinys + kritika + 3 kryptys (3) Eiga ir ekranai (4) 11 laukų brief |
| recap         | OK; triage glossary wire palikti                                                                                      |
| EN            | Title/subtitle/recap/nextSteps                                                                                        |

---

### 16.9 · Perėjimas į brief

|                 |                                                    |
| --------------- | -------------------------------------------------- |
| **Dabar**       | P △ · N ❌ · Pr △ · V ❌ — tuščia; dubliuoja 16.85 |
| **Prioritetas** | P1 · Sprint 3; Sprint 6 – merge                    |

| Blokas   | Taisyti (jei lieka)                                                                   |
| -------- | ------------------------------------------------------------------------------------- |
| Trumpai  | „Turėdamas 5 laukus – eik prie sakinio, kritikos ir ribų. Brief = vienas dokumentas.“ |
| Daryk    | Mini checklist 5 ✓ (bullet)                                                           |
| Sprint 6 | **Sujungti į 16.85** – ši skaidrė optional delete                                     |

---

### 16.101 · Vibe → Skeleton → Refinement

|                 |                                                        |
| --------------- | ------------------------------------------------------ |
| **Dabar**       | P ❌ · N ❌ · Pr △ · V ❌ — blogiausia žargono skaidrė |
| **Prioritetas** | **P0** · Sprint 4                                      |

| Blokas         | Taisyti                                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title          | Galima palikti EN fazių vardus **jei** subtitle = „Trys brief brandinimo žingsniai“                                                                                                   |
| Trumpai        | „Pirma užfiksuok kryptį (Vibe), tada karkasą – ciklą ir ribas (Skeleton), tada smailink brief’ą (Refinement). Tai ne antras produkto kelias – tik brief brandinimas.“ (be „delivery“) |
| Diagram labels | Palikti Vibe/Skeleton/Refinement + desc jau OK; chrome title „VSR brandos kopėčios“ → **„Brief brandinimo žingsniai“**                                                                |
| Explanations   | Already decent – sutikrinti su nauju Trumpai                                                                                                                                          |
| Daryk          | „Pasakyk: mano idėja dabar Vibe / Skeleton / Refinement – ir kodėl vienu sakiniu.“                                                                                                    |
| Patikra        | „Ar jau turi ciklą prieš gludinant tekstą?“                                                                                                                                           |
| Glossary       | Pirmas VSR paminėjimas – wire / skliaustai                                                                                                                                            |
| EN             | Body + explanations sync                                                                                                                                                              |

---

### 16.11 · Produkto sakinys

|                 |                                        |
| --------------- | -------------------------------------- |
| **Dabar**       | P ✅ · N △ · Pr ❌ · V △ — tik formulė |
| **Prioritetas** | P1 · Sprint 4                          |

| Blokas      | Taisyti                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| Trumpai     | Formulė OK                                                                    |
| Prieš Daryk | Blogas: „Kuriu DI app prioritetams.“ Geras: užpildytas iš kortelės (1 eilutė) |
| Daryk       | „Užpildyk formulę iš savo 5 laukų.“                                           |
| Patikra     | OK                                                                            |

---

### 16.12 · Trys atramos ir kritika

|                 |                                                                            |
| --------------- | -------------------------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr △ · V △ — atramos nematomos; „spill/meta“; nėra Prieš/Po UI |
| **Prioritetas** | P1 · Sprint 4                                                              |

| Blokas              | Taisyti                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- |
| Trumpai             | „Trys atramos: problema, naudotojas, vertė. Tada kritika – sakinys turi siaurėti.“ |
| Nauja sekcija       | 3 atramos lentele arba bullet iš kortelės                                          |
| Prieš / Po          | Du laukai pavyzdžiui (Prieš platus → Po siauresnis)                                |
| Daryk               | OK + „įrašyk Po greta“                                                             |
| preCopy explanation | Be „meta“ → „ne prideda funkcijų ir stack“                                         |
| copyable            | Palikti klasę; EN promptas                                                         |
| EN                  | Visas                                                                              |

---

### 16.14 · Trys kryptys

|                 |                                                       |
| --------------- | ----------------------------------------------------- |
| **Dabar**       | P ✅ · N △ · Pr △ · V △ — neaišku ar pavyzdys ar tavo |
| **Prioritetas** | P1 · Sprint 4                                         |

| Blokas        | Taisyti                                                        |
| ------------- | -------------------------------------------------------------- |
| Trumpai       | „Trys siauros kryptys tai pačiai problemai – ne 30 funkcijų.“  |
| Lentelės body | „**Pavyzdys** (dienos prioritetai). Žemiau – savo A/B/C.“      |
| Daryk         | „Perrašyk 3 eilutes savo idėjai (kam / ką daro / rezultatas).“ |
| Patikra       | OK                                                             |
| Verslas       | Rezultato stulpelyje – matuojama nauda (laikas / aiškumas)     |

---

### 16.15 · Rinkis patikrinamiausią (lab)

|                 |                                                                        |
| --------------- | ---------------------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr △ · V △ — lab geras; body/skaičiai be tiltų; nėra Daryk |
| **Prioritetas** | P1 · Sprint 4                                                          |

| Blokas                               | Taisyti                                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Trumpai                              | „Rinkis tą kryptį, kurią gali patikrinti greičiausiai – ne gražiausią. Balai – orientyras, ne egzaminas.“ |
| Lab body                             | Be „balų veidrodis“ → „po pasirinkimo matai balus ir gali nukopijuoti kodėl“                              |
| Collapsible                          | Paaiškinti 3 kriterijus žmonių kalba prieš skaičius                                                       |
| **Daryk** (trūksta)                  | „Pasirink A/B/C lab’e. Užrašyk nugalėtoją greta kortelės.“                                                |
| Patikra                              | OK                                                                                                        |
| Lab TS (`m16DirectionPickerContent`) | Sutikrinti hint su nauju Trumpai; EN jau atskiras                                                         |
| EN JSON                              | Body LT → EN                                                                                              |

---

### 16.16 · Naudotojo ciklas

|                 |                                                             |
| --------------- | ----------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr △ · V △ — „schema visam keliui“; UX be tiltų |
| **Prioritetas** | P1 · Sprint 5                                               |

| Blokas      | Taisyti                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------- |
| Trumpai     | „Aprašyk, kaip žmogus pereina nuo poreikio iki rezultato – 5 žingsniai. Tai ne funkcijų sąrašas.“ |
| Diagram     | Labels OK; chrome jei reikia plain                                                                |
| Po diagrama | **Užpildytas ciklas** dienos prioritetams (5 eilutės)                                             |
| Daryk       | Tuščias 5 žingsnių šablonas nugalėtojai krypčiai                                                  |
| Patikra     | OK („<2 min“) – verslo: greita patikra = mažesnė rizika                                           |

---

### 16.17 · Ekranai iš srauto

|                 |                                                    |
| --------------- | -------------------------------------------------- |
| **Dabar**       | P ✅ · N ✅ · Pr △ · V △ — santykinai gerai; EN LT |
| **Prioritetas** | P1 EN + P2 LT · Sprint 5                           |

| Blokas  | Taisyti                                                                 |
| ------- | ----------------------------------------------------------------------- |
| Trumpai | „Kiekvienas ekranas = ciklo žingsnis. Max 3–5 – kitaip MVP per platus.“ |
| Lentelė | OK kaip pavyzdys; pažymėti „Pavyzdys“                                   |
| Daryk   | OK                                                                      |
| EN      | Body + lentelė                                                          |

---

### 16.18 · Ribos ir Now–Next–Later

|                 |                                                             |
| --------------- | ----------------------------------------------------------- |
| **Dabar**       | P ❌ · N △ · Pr △ · V △ — tankis; MCP/smoke; dubliuoja 16.7 |
| **Prioritetas** | **P0** žargonas · Sprint 5                                  |

| Blokas           | Taisyti                                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trumpai          | „Tie patys trys stulpeliai brief kalba: Must (≤4) = Būtina · Should = Galima · Won’t = Nekuriame. ‚Dabar‘ = vienas trumpas ciklas – be ketvirčio plano.“ |
| Lentelė          | Won’t pavyzdžiai: „Prisijungimas, mokėjimai (Stripe)“ – **MCP išimti** arba „kitos sudėtingos integracijos“                                              |
| „po pirmo smoke“ | → „po pirmos greitos patikros (M18)“                                                                                                                     |
| Daryk            | Užpildyti Must/Should/Won’t + Dabar→Toliau→Vėliau savo idėjai (su 1 pavyzdžiu)                                                                           |
| Patikra          | Be MCP: „Ar prisijungimas/mokėjimai Won’t, jei jie neša pirmą ciklą?“                                                                                    |
| Sprint 6         | Aiškiai: 16.7 = LT zonos; 16.18 = brief etiketės + laikas                                                                                                |

---

### 16.201 · Rizikos

|                 |                                                    |
| --------------- | -------------------------------------------------- |
| **Dabar**       | P ✅ · N △ · Pr △ · V ✅ — Seed/smoke EN skoliniai |
| **Prioritetas** | P1 · Sprint 5                                      |

| Blokas  | Taisyti                                                                        |
| ------- | ------------------------------------------------------------------------------ |
| Lentelė | „Seed…“ → „Įdėk 3 pavyzdines užduotis prieš pirmą bandymą“; be „smoke“         |
| Daryk   | OK + 1 eilutės šablonas „Rizika → Mažinu taip:“                                |
| Verslas | Palikti „per plati apimtis / nėra duomenų / negrįžta“ – tai tikros MVP rizikos |

---

### 16.205 · Savitikra prieš brief (`warm-up-quiz`)

|                 |                                                                            |
| --------------- | -------------------------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr ❌ · V △ — testuoja žargoną (Must, UX, ERD), ne pasiruošimą |
| **Prioritetas** | P1 · Sprint 5                                                              |

| Klausimas | Target intent                                                                                      |
| --------- | -------------------------------------------------------------------------------------------------- |
| 1         | „Ar ‚Būtina dabar‘ telpa į ≤4 punktus?“ (galima Must skliaustuose)                                 |
| 2         | Vertė vs funkcija – **palikti** (jau geras)                                                        |
| 3         | „Ar turi 5 žingsnių eigą (ne funkcijų sąrašą)?“ – be ERD/deploy distractors arba plain distractors |
| EN        | Visas quiz                                                                                         |
| related   | Remediation į skaidrių **pavadinimus**, ne ID                                                      |

---

### 16.21 · Praktika: MVP brief

|                 |                                                                       |
| --------------- | --------------------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr ❌ · V △ — 11 laukų kableliais; Alias M18; kur failas? |
| **Prioritetas** | **P0** · Sprint 5                                                     |

| Blokas               | Taisyti                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Trumpai              | „Brief – vienas dokumentas prieš kodą. Žemiau 11 laukų. Stack ir ERD – ne čia.“                                   |
| **Nauja sekcija**    | Numeruotas sąrašas 1–11 (iš eilės / SOT §2.3)                                                                     |
| Daryk                | „Sukurk Docs failą `01_MVP_BRIEF.md` (arba užrašinės puslapį). Užpildyk 11. Jei užstrigai – Brief pagalbininkas.“ |
| Be „Alias M18“       | Vietoj: „Tą patį dokumentą naudosime Modulio 18 projekte.“                                                        |
| copyable             | Palikti Brief klasę; EN = tikrai English instrukcija + English field names                                        |
| briefCheck / preCopy | OK – sėkmės kriterijus                                                                                            |
| Optional             | Collapsible Markdown šablonas 11 tuščių antraščių                                                                 |

---

### 16.22 · Modulio 16 santrauka

|                 |                                                          |
| --------------- | -------------------------------------------------------- |
| **Dabar**       | P △ · N △ · Pr △ · V △ — vibe tagline; stats „Kodo inž.“ |
| **Prioritetas** | P1 · Sprint 5                                            |

| Blokas                     | Taisyti                                                             |
| -------------------------- | ------------------------------------------------------------------- |
| introBody                  | Plain: nuo miglotos idėjos iki siauro brief’o su ribomis ir patikra |
| stats                      | „5 laukai“ · „11 brief laukų“ · „Prieš kodą“ (ne „Kodo inž.“)       |
| section items              | Be pliko „Must ≤4“ – „Ribos: ką darome / nedarome“                  |
| tagline                    | „Disciplina prasideda brief’u – ne generavimu.“ (be Vibe coding)    |
| ability\* / firstAction24h | OK kryptis – sutikrinti plain                                       |
| EN                         | Visas summary + transfer                                            |

---

### Module chrome (katalogas)

| Laukas           | Taisyti                                                                              |
| ---------------- | ------------------------------------------------------------------------------------ |
| description      | Jau gana plain – OK                                                                  |
| businessExamples | „MVP brief“ → LT kataloge plain jei taisyklė reikalauja („Siaura užduotis“); EN sync |
| transfer         | Sync su 16.22                                                                        |

---

## 6. EN track (Sprint 1 detalė)

| Darbo vienetas                                       | Apimtis                                                                                |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Išimtis**                                          | **160 + 16.2** – jau EN hand-tune (intro polish); nepergeneruoti be diff review        |
| Titles / shortTitle / subtitle                       | Jau dažnai EN – sutikrinti semantikos paritetą                                         |
| sections[].body / heading                            | **Nuo 16.25** – pagrindinis spill                                                      |
| tables                                               | Headers + cells                                                                        |
| recognitionExercise / warm-up / preCopy / briefCheck | Pilnas EN                                                                              |
| path-step / section-break / summary                  | Pilnas EN                                                                              |
| copyables                                            | EN promptai (Brief: „in English“ + EN field list)                                      |
| Diagram / lab TS                                     | Jau turi EN šakas – sutikrinti po copy change                                          |
| Build                                                | `build:modules-en-m16-m18` + durable overrides; **išsaugoti** 160/16.2 hand-tune bloką |
| Audit                                                | Išplėsti body diacritics gate; ne failinti 160/16.2 false positive                     |

---

## 7. Agentų kelias

```text
ORCH (plan freeze)
  → CONTENT (LT plain + EN body, skaidrė batch)
  → DATA (modules.json + build:modules-en-m16-m18)
  → SCHEME (tik jei chrome title 16.3 / 16.101)
  → CODING (lab hint sync; optional path-step example UI)
  → UI_UX spot (§4.2)
  → QA (walkthrough + audit:m1618 atnaujintas + CHANGELOG)
```

Nauja pamoka → `docs/development/lessons/content-agent.md` viena eilutė.

---

## 8. WON’T (šiame epic’e)

- **Intro rewrite:** keisti 160 hero „Vibe coding“, nuimti vibe gloss, grąžinti `1+1+1`, plėsti CTA į visą D1, tools mug / reveal ant intro, `ActionIntroSlide` CTA dedupe rollback.
- Formalus Density DoD / CI.
- Naujas lab / Feature Doc.
- M17 banko perrašymas (tik related title sync jei reikia).
- M18 PACKET / Soft DoD plain epic (atskirai).
- corporate18 / magic-link 18.
- MCP/Spec Kit kaip mokymo branduolys.
- Thin VerticalFlow perrašymas (TE jau ✅).

---

## 9. Rizikos

| Rizika                                                       | Mitigacija                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------ |
| Plain epic **atšaukia** intro polish (vibe hero / micro-CTA) | §0.1 freeze + §8 WON’T; B1 neapima 160 rewrite                     |
| „Done“ vėl = schema green                                    | Epic DoD §4 – walkthrough privalomas                               |
| EN rebuild numuša 160/16.2 hand-tune                         | Durable overrides; diff review prieš commit                        |
| Sutraukimas (Sprint 6) laužo footer numerius                 | `audit-footer-numbers` po merge                                    |
| Per daug plain = prarandamas gylis                           | Gylis lieka lentelėse/pavyzdžiuose; kerpamas tik žargonas be tiltų |
| M16 plain uždelsia M18                                       | M18 plain – atskiras ticket po M16 exit                            |

---

## 10. Sinchronas (po vykdymo)

| Failas                       | Kada                                               |
| ---------------------------- | -------------------------------------------------- |
| `TODO.md` §1.2i              | Ticket status                                      |
| `ROADMAP.md` Horizon D       | Open gap „learner plain“                           |
| `CHANGELOG.md`               | Po kiekvieno sprinto batch                         |
| `CODEBASE_WHAT_IS_DONE.md`   | Po epic exit – atskirti Authoring vs Learner plain |
| `M16_M18_CONTENT_DRAFT.md`   | Optional: pažymėti superseded by this plan         |
| `16_17_18_backlog.md`        | Pointer į plain epic                               |
| `PAPRASTOS_KALBOS_GAIRES.md` | Jei nauji M16 termino tiltai – 1–2 eilutės         |

---

## 11. Greita inventorizacija (23 sk.)

| Eilė | ID     | Prioritetas           | Sprint     | P0 defektas         |
| ---- | ------ | --------------------- | ---------- | ------------------- |
| 0    | 160    | **Freeze** (+P2 opt.) | — / B1 opt | — (intro polish ✅) |
| 1    | 16.2   | P1 Daryk only         | B1/B2      | — (EN+triad ✅)     |
| 2    | 16.25  | P1                    | B1         | Soft DoD / mugė     |
| 3    | 16.3   | P1                    | B1         | „Delivery“          |
| 4    | 16.4   | P1+EN                 | 1+3        | EN lentelė          |
| 5    | 16.5   | P1                    | 3          | Be pavyzdžio        |
| 6    | 16.6   | EN                    | 1          | EN exercise         |
| 7    | 16.7   | P1                    | 3          | Must map be tiltų   |
| 8    | 16.8   | **P0**                | 3          | Be etalono kortelės |
| 9    | 16.85  | P1                    | 3          | D1→D2               |
| 10   | 16.9   | P1 / merge            | 3/6        | Echo                |
| 11   | 16.101 | **P0**                | 4          | VSR siena           |
| 12   | 16.11  | P1                    | 4          | Be Prieš/Po         |
| 13   | 16.12  | P1                    | 4          | Atramos nematomos   |
| 14   | 16.14  | P1                    | 4          | Pavyzdys vs tavo    |
| 15   | 16.15  | P1                    | 4          | Nėra Daryk          |
| 16   | 16.16  | P1                    | 5          | Be užpildyto ciklo  |
| 17   | 16.17  | EN                    | 1+5        | EN                  |
| 18   | 16.18  | **P0**                | 5          | MCP/smoke/tankis    |
| 19   | 16.201 | P1                    | 5          | Seed/smoke          |
| 20   | 16.205 | P1                    | 5          | Žargono quiz        |
| 21   | 16.21  | **P0**                | 5          | 11 laukų siena      |
| 22   | 16.22  | P1                    | 5          | Vibe tagline        |

---

## 12. Pirmo batch’o „definition of ready“

Prieš pradedant CONTENT Agent režime:

1. Produktas patvirtina: Sprint 1 EN + Sprint 2–3 D1 = pirmas PR kelias.
2. Canonical pavyzdys užrakintas (dienos prioritetai).
3. Rašymo default: Docs / `01_MVP_BRIEF.md`.
4. Šis planas = SOT vykdymui; SOT pedagogika lieka `turinio_pletra_moduliai_16_17_18.md` (struktūra); plain copy keičia JSON.

```text
CHANGES: M16_MATURITY_PLAN.md exit EN+B1–B4 + C merge (2026-08-04); M17/M18 plain ✅
CHECKS: audit:m1618 green · footer M16 LT/EN · jargon scan Soft DoD/PACKET/MCP/smoke clear
RISKS: EN rebuild be durable overrides; intro freeze regression
NEXT: optional M13P-TRIM · Wave D3 corporate18 (Deferred)
```
