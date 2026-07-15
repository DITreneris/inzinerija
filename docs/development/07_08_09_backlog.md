# M7–M9 backlog (Duomenų analizės kelias)

> **Statusas:** `backlog` — fiksuota iš nepriklausomo testuotojo vertinimo (2026-07-14).  
> **Tikslas:** Vienas darbo sąrašas prieš vieningą tvarkymą („vienu ypu“). Savininkas papildo pastabomis žemiau — **§9 Savininko pastabos**.  
> **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` · `docs/MODULIO_7_SKAIDRIU_EILES.md` · `src/data/modules.json`  
> **Susiję:** `docs/development/TEST_REPORT.md` (įrašas 2026-07-14), `docs/archive/development/analysis/M7_STEP_COUNT_CURRICULUM_REVIEW_2026-07.md`

---

## 1. Kontekstas

| Laukas | Reikšmė |
|--------|--------|
| **Šaltinis** | Nepriklausomas testuotojas — praėjo modulius 7, 8, 9 |
| **Data** | 2026-07-14 |
| **Tipas** | UX / curriculum / turinio balansas (ne techninis bug) |
| **Prioritetas bendras** | P2 (produkto kokybė Tier 3), ne P1 regresija |

---

## 2. Žalias testuotojo feedback (verbatim)

### Bendri komentarai

- Bendrai naudingi, duoda gerą supratimą kaip konstruotis duomenų analizę, ypač iš **išorinių** duomenų.
- Gal kiek mažiau fokuso (iš konkretaus studento perspektyvos) kaip analizuoti, tvarkyti **vidinius** duomenis.
- **Mintis — du pasirinktiniai keliai:**
  - **(i)** Išvardink 10–15 duomenų šaltinių [įmonės / sektoriaus] temai: oficialūs, vieši šaltiniai; nurodyk atnaujinimo dažnį ir formatą (CSV, API, ataskaitos). Pridėk trumpą aprašymą kiekvienam.
  - **(ii)** Įkelk x duomenų failus su […] duomenimis tolimesnei analizei.
- **Kalbos stilius:** visas 7–9 modulių kursas pateiktas labiau kaip **paskaitų užrašai**, nei mokomoji/aiškinamoji medžiaga. Tokio stiliaus studentams kaip testuotojas — ok (pats tokio stiliaus konspektus darydavo), bet kitiems gal labiau patiktų ne „bullet point'ų“ stilius, o labiau **aprašomasis**.
- **Struktūra (iš studento perspektyvos):** visi blokai naudingi kaip atskiri, bet trūksta **struktūros nuoseklumo** — visos struktūros pristatymo pradžioje ir supratimo, kurioje dalyje esi kurso metu. Kai užbaigi visą kursą, visa sistema susiveda, bet eigoje — jausmas „kur / apie ką / dėl ko ši konkreti tema“.
- **Tikslo neaiškumas:** kai kuriose dalyse užtrunka suvokti „koks to tikslas?“ Pvz. **23 skaidrė** — kokiems atvejams / kokiems tikslams pasiekti skirtas tas **„5 žingsnių algoritmas“**?

---

## 3. Testuotojo segmentas (diagnozė)

```
Savarankiškas analitikas
├── Stiprybės: struktūra, promptai, išoriniai šaltiniai, konspektų stilius
├── Trūksta: vidinių duomenų, hands-on su failais, mid-journey žemėlapis
├── Stilius: bullet/konspektai OK
└── Rizika: „ne apie mano kasdienį darbą“ → gali neįsitraukti į M9 praktiką
```

**Išvada:** produktas veikia Tier 3 segmentui, bet ne visiems — reikia orientacijos sluoksnio ir artimesnio konteksto (vidiniai duomenys, praktika su failais).

---

## 4. Diagnozė vs dabartinė produkto būklė

### 4.1 Išoriniai vs vidiniai duomenys

| Sritis | Dabartinė būklė | Gap |
|--------|-----------------|-----|
| Išoriniai šaltiniai | Stiprus: 7.7, 77.5 scraping, 89 (šaltinių promptas), rinkos tendencijos, M9 surinkimas | — |
| Vidiniai duomenys | Išsklaidyta: 891 (valymas), 84 (DB), 78–79 (tipai), 725/726 (Excel kultūra) | Nėra **pavadintos šakos** „Vidiniai duomenys“; asimetrija su išoriniais |

### 4.2 Du pasirinktiniai keliai (testuotojo idėja)

| Kelias | Dabartinė būklė | Gap |
|--------|-----------------|-----|
| **(i) Šaltinių katalogas** | Artimas: sk. **89** promptai 3a–3b (`Sudaryk 20 viešų šaltinių…`, lentelė kategorija/URL/dažnis) | Trūksta **privalomo pratimo** su tikrinamu output ir use-case („kai neturi vidinių duomenų“) |
| **(ii) Failų analizė** | Nėra platformos upload; M9 = CopyButton → DI chat | Reikia **guided exercise**: „įkelk CSV į DI + šis promptas“ arba path-step / practice-scenario |

### 4.3 Kalbos stilius

| Aspektas | Dabartinė būklė | Gap |
|----------|-----------------|-----|
| Formatas | GOLDEN_STANDARD §3.2: Kam tai → Ką daryti → Prompt → Patikra | Veikia „konspektų“ segmentui |
| Narratyvas | `🔽 Nori suprasti detaliau?` collapsible | Per mažai ir per vėlai — trūksta 1–2 sakinio „pasakotojo“ **viršuje** |
| **Beprasmių frazių kartojimas** | Žr. **§4.6** — „pipeline, MASTER PROMPTAS“, „stovi ant silpno pamato“, generic Patikra | Suvokia kaip paskaitų užrašus be prasmės; reikia CONTENT rewrite |

### 4.6 Beprasmių / kartojamų frazių auditas (CONTENT_AGENT)

**Šaltinis:** savininko pastaba + testuotojo screenshot — **Modulis 7, skaidrė 3/38, id 72 „Strateginis pamatas“**, blokas „Kam tai?“.

#### Probleminė frazė (pavyzdys iš testuotojo / senesnės versijos)

> „**Strateginis pamatas** – kodėl duomenų analizė ir DI turi stovėti ant aiškių principų. Be to viskas vėlesnė (pipeline, MASTER PROMPTAS, ataskaitos) stovi ant silpno pamato. Čia – 4 tezės… duomenys = sprendimų sistema, ne „IT funkcija“.“

**Kodėl beprasmė:** vardija ateities sąvokas, kurių dalyvis dar nežino; metafora „silpnas pamatas“ be konkretaus veiksmo; neatsako „ką dabar darau su šia skaidre“.

#### Dabartinė būklė (2026-07-15 – išspręsta)

| Vieta | Tekstas „Kam tai?“ | Statusas |
|-------|-------------------|----------|
| `modules.json` LT sk. **72** | „4 principai, pagal kuriuos vertini bet kokią analizę… Čia dar ne promptai“ | ✅ išspręsta (M79-16, Phase 2) |
| `modules-en-m7-m9.json` EN sk. **72** | „data-driven or opinion-based… Not prompts yet“ | ✅ išspręsta (P2 EN sync) |
| `scripts/m7-m9-en-string-map.json` | Senas LT stringas | ⚠️ optional valymas (ne blokeris) |

#### Pasikartojančių frazių katalogas (M7 branduolis — auditas)

| # | Pattern / frazė | Kur kartojasi | Problema | Statusas (2026-07-15) |
|---|-----------------|---------------|----------|------------------------|
| 1 | `pipeline, MASTER PROMPTAS` (forward-reference) | sk. 72 (buvo), intro blokai | Insider žargonas | ✅ sk. 72 perrašyta |
| 2 | `stovi ant silpno pamato` / `rests on weak ground` | EN sk. 72 (buvo) | Tuščia metafora | ✅ pašalinta |
| 3 | `Ar rezultatas atitinka tikslą?` + `Jei ne — grįžk prie 2️⃣…` | M7 Patikra blokai | Copy-paste boilerplate | ✅ 0× grep modules.json |
| 4 | `**Priminimas:** … jau skaidrėje „Strateginis pamatas“` | sk. 97 (Deming) | Meta-navigacija vietoj turinio | Perkelti į footer arba išmesti; skaidrėje tik **šio** prompto tikslas |
| 5 | `**Platesnis teorinis pamatas** … skaidrėje „Strateginis pamatas“` | sk. 97 collapsible | Tas pats | Nuoroda → deep-link arba vienas sakinys be skaidrės pavadinimo |
| 6 | `Po etikos bloko – grįžtame prie EDA (tas pats kelias)` | sk. 90 | Navigacinis triukšmas „Kam tai?“ bloke | Perkelti į section-break; „Kam tai?“ = tik EDA prasmė |
| 7 | `**Seka:** Surink → išvalyk → …` (be kodėl) | sk. 891 | Etiketė be use-case | Prieš seką: **kada** taikyti (pvz. prieš bet kokią analizę su nešvariais duomenimis) |
| 8 | `Ne M4 Master promptas apie kontekstą` | sk. 74 | Gynybiškas paaiškinimas, ne nauda | Pakeisti į „pilna 8 žingsnių analizė vienai temai“ |
| 9 | `vienas promptas` / `vienas veiksmas` (be skirtumo) | daug skaidrių | Praranda prasmę per kartojimą | Variuoti: „vienas kopijuojamas šablonas“, „viena užklausa DI“ |

#### Rewrite principai (CONTENT_AGENT)

1. **„Kam tai?“** = vienas naudos sakinys **šiandien**, be ateities modulių vardijimo (išimtis: skaidrė 71 kelio apžvalga).
2. **Forward-reference** leidžiama tik santraukose, section-break ir skaidrėje 75 — ne intro blokuose.
3. **Patikra** — min. 1 skaidrei unikalus klausimas; bendrą „grįžk prie 2️⃣“ galima palikti kaip UI microcopy (vėliau), ne 18 kartų body.
4. **Konkretus veiksmas** vietoj metaforų: ne „silpnas pamatas“, o „sprendimas be 4 principų → dažniau remiasi nuomone“.
5. Po LT rewrite — **EN overlay sync** (`modules-en-m7-m9.json`, `m7-m9-en-string-map.json`).

#### Perrašymo juodraštis — sk. 72 „Strateginis pamatas“ (Kam tai?)

**Dabartinis LT:** „4 principai, ant kurių stovi pipeline ir MASTER PROMPTAS.“

**Siūlomas kryptis (ne final):**
> „**Strateginis pamatas** – 4 principai, pagal kuriuos vertini bet kokią analizę: ar sprendimas remiasi duomenimis, ar nuomone. Čia dar ne promptai – tik mąstymo taisyklės prieš bet kokią užklausą DI.“

_(Finalinį tekstą patvirtina CONTENT + savininkas §9.)_


### 4.4 Struktūra eigoje (wayfinding)

| Aspektas | Dabartinė būklė | Kodėl vis tiek skundžiasi |
|----------|-----------------|---------------------------|
| Kelionės pasirinkimas | Sk. **70** `journeyChoices` + **70.5** profilio pie | Nepasako „kur esi modulyje“ |
| Path-step | 71.1–71.5 tarp teorijos | Gerai pedagogiškai, bet be makro-žemėlapio = fragmentai |
| pathBranch | 23 šakos skaidrės, filtruojamos navigacijoje | Skirtinga skaidrių seka / N skaičius |
| Žingsnių skaičiai | 6 pipeline, 4 tipai, 5 paruošimas, 8 MASTER | Žinoma painiava — žr. M7_STEP_COUNT_CURRICULUM_REVIEW |
| Santrauka | Sk. **75** susiveda | Retrospektyviai OK, prospektyviai ne |

### 4.5 Skaidrė 23 ir „5 žingsnių algoritmas“

| Numeris | Ką reiškia kurse | Pastaba |
|---------|------------------|---------|
| **UI pozicija ~23 M7** | **MASTER PROMPTAS** (id 74, 8 žingsnių) — žr. `MODULIO_7_SKAIDRIU_EILES.md` | Testuotojas galėjo painioti poziciją su id |
| **„5 žingsnių algoritmas“** | id **89**, ~14 pozicija branduolyje | Yra „Kam tai?“ — trūksta **2–3 situacinių use-case** (kada naudoti / kada ne) |

**Esamas „Kam tai?“ (id 89):** Šaltiniai → Struktūra → Surinkti → Valymas → Eksportas; „kai reikia sistemingai paruošti duomenis“.

**Trūksta:** „Naudok, kai…“ / „Nenaudok, kai…“ / palyginimas su 6 pipeline ir 8 MASTER.

### 4.7 Kryžminės skaidrių nuorodos ir dubliavimas (725 / 726) — „wtf“ feedback

**Šaltinis:** testuotojo screenshot + savininkas (2026-07-14). Skaidrė **#5/38** (filtruotas kelias) = id **726** „Problematika…“; blokas **„Kaip skaityti kartu su skaidre 725“**.

#### Diagnozė: kodėl „Kur ta skaidrė 725?“

| Faktas | Reikšmė vartotojui |
|--------|-------------------|
| UI rodo **5/38** (arba 6/59 pilname) | Vartotojas **niekada nemato** id `725` |
| id **725** = pozicija **5/59** „DI paradoksas“ (infographic) | Tai **ankstesnė** skaidrė prieš 726 — ne paslėpta, ne kitur |
| id **726** = pozicija **6/59** „Problematika“ (text) | Testuotojas **jau ant jos**, o tekstas siunčia „ieškoti“ 725 |
| Abi `optional: true`, `pathBranch: strategija` | Matomos tik fokusams su `strategija` šaka (pvz. Vadovai) |
| **Nėra UI nuorodos** body tekste | `ifWrongSee` deep-link veikia tik M8 testuose — ne `content-block` |

**Išvada:** heading „skaityti **kartu su** skaidre 725“ yra **autoriaus koordinatė** (JSON id), ne vartotojo kelionė. Tai **apsunkina** kelionę — testuotojas teisus: „wtf“.

#### Dubliavimas sk. #5 ↔ #6 (725 ↔ 726)

| Turinys | id 725 (infographic) | id 726 (content-block) |
|---------|----------------------|------------------------|
| Problemos (investicijos, pilotai, kultūra) | paradoxCards, funnel, valueSection | „2️⃣ Trys problemos“ |
| Veiksmai verslui | actionSection **3 kortelės** + solutionSection **4 pipeline žingsniai** | „3️⃣ Keturi veiksmai verslui“ |
| Išvada | conclusionSection | „4️⃣ Esminė išvada“ |

**SOT intent** (`turinio_pletra_moduliai_7_8_9.md` §2A): 725 = interaktyvi infografika; 726 = tekstinė santrauka **be skaičių kartojimo**. **Realybė:** veiksmai ir išvada **pakartoti** — sk. #6 atkartoja sk. #5 apačią.

**Rekomenduojamas fix (CURRICULUM → CONTENT):**

| Variantas | Aprašymas |
|-----------|-----------|
| **A (minimal)** | 726 — palikti **tik** „Trys problemos“ + 1 sakinio tiltas; **išmesti** „Keturi veiksmai“ ir „Esminė išvada“ (lieka 725) |
| **B (agresyvus)** | Sujungti į **vieną** skaidrę (infographic + trumpas text appendix) |
| **C (status quo +)** | 726 lieka, bet **be** nuorodos į 725; antraštė „Kam tai?“ vietoj „Kaip skaityti kartu…“ |

#### Taisyklė: nuoroda arba nieko

> **Produktinė taisyklė (savininkas):** Kai apeliuojame į kitą skaidrę — **arba** konkretus deep-link (kaip M8 `ifWrongSee`), **arba** nieko. Naked id (`725`, `67.3`, `13.35`) body tekste **draudžiama**.

| Mechanizmas | Veikia? | Kur |
|-------------|---------|-----|
| `ifWrongSee` + `onRemediationLink` | ✅ clickable | M8 testai (`McqQuestion.tsx`) |
| „žr. skaidrėje 725“ body tekste | ❌ dead text | M7 sk. 726, 67, 97, M4→M7 nukreipimai |
| Footer „Toliau – skaidrė N“ | ✅ seka | Visi moduliai (1-based pozicija) |
| Pavadinimas „skaidrėje „Strateginis pamatas““ | ⚠️ be linko | M7 sk. 97 — vartotojas ieško ranka |

#### Apimtis M1–15 (heuristinis auditas `modules.json`)

| Modulis | Cross-ref / naked id body tekste | Pavyzdžiai |
|---------|----------------------------------|------------|
| **M4** | ~15 | „kitoje skaidrėje (67.3)“, „Haliucinacijos (67.8)“, „grįžk ten“, M7 nukreipimas 71.35 |
| **M7** | 6+ | sk. 726→725, 97→„Strateginis pamatas“, 67→67.3, 73.5 explanation→73 |
| **M10** | 1 | „Kitoje skaidrėje pamatysi…“ |
| **M13** | 1 | neprivaloma skaidrė 13.35 |
| **M14** | 2 | skaidrė 152 video, „Verslas ir rizikos“ |
| M1–3, 5–6, 8–9, 11–12, 15 | 0–minimal | daugiausia footer „Toliau“ (OK) |

**Išvada:** problema **sisteminė**, bet **koncentruota** M4 (etikos blokas perkeltas į M7) ir M7 strategijos šakoje — ne visi 15 modulių vienodai blogi.

#### Pavyzdys: sk. 67 — „Kas tas (67.3)?“ (testuotojas, 2026-07-14)

| Vartotojo UI | JSON / footer |
|--------------|---------------|
| **27/45** „Promptų manipuliacijos“ | Body: „…kitoje skaidrėje (67.3)“ |
| **„Tęsti: Pataisyk promptą“** ✅ | Footer: „Toliau – skaidrė **32**“ (pilnas M7; vadyba keliu turėtų **28**) |
| Kita = **28/45** (id 67.3) | **(67.3)** — vidinis id, UI nerodo |

Navigacija **jau teisinga**; body **sugadina** aiškumą. **Fix:** išmesti `(67.3)`; „Paspausk Tęsti“ arba ištrinti bloką „Praktika: kur daryti“ (dubliuoja nav).

#### Rewrite kryptis sk. 726 (juodraštis)

**Išmesti:** heading „1️⃣ Kaip skaityti kartu su skaidre 725“.

**Vietoj to (variantas A):**
> **1️⃣ Kam tai?** — Trumpa problemų santrauka vadovui: kodėl DI investicijos nesiverčia į pelną. Jei peržiūrėjai ankstesnę infografiką — čia tas pats turinys žodžiais, be skaičių.

_(Be id 725; be „kartu su“.)_

#### Pavyzdys: sk. 71.35 — „kelio žingsniu 71.3“ (testuotojas, 2026-07-14)

| Vartotojo UI | JSON body |
|--------------|-----------|
| **29/45** „DI įrankiai informacijos paieškai“ (neprivaloma atmintinė) | „naudok su kelio žingsniu **71.3** (lygiagretūs tyrimai)“ |
| **Ankstesnė** = **28/45** id **71.3** „Lygiagrečių tyrimų parengimas“ | **71.3** — vidinis path-step id, UI nerodo |
| **„Tęsti: DI agentų koncepcija“** ✅ | `toolsIntro` taip pat: „…su kelio žingsniu 71.3“ |

**Kodėl skauda:** skaidrė atrodo kaip **neišbaigti autoriaus užrašai** („nepamiršk 71.3“), ne kaip produktas. Vartotojas ką tik atėjo iš 71.3 — skaičius neduoda jokios vertės. Tas pats pattern kaip 67.8, 725, 67.3.

**Fix (CONTENT, M79-18):** pakeisti į **temos pavadinimą** arba išmesti nuorodą visai:

> Neprivaloma atmintinė: 6 DI įrankiai paieškai ir sintezei — naudok **lygiagrečių tyrimų** žingsnyje (2–4 šaltiniai). Tipinė eiga — 30–45 min.

Arba trumpiau (jau esi po to žingsnio):

> Neprivaloma atmintinė: 6 DI įrankiai paieškai ir sintezei. Tipinė eiga — 30–45 min.

**Taip pat:** M4 sk. ~61 nukreipimas į „skaidrė **71.35** po … (71.3)“ — tas pats rewrite + žmogiškas pavadinimas.

#### Pavyzdys: M7 sk. 74 MASTER — „Žr. skaidrę 94“ (testuotojas, 2026-07-14)

| Vartotojo UI | Problema |
|--------------|----------|
| **41/45** MASTER 8 žingsnių schema, žingsnis 3 | „Žr. skaidrę **94**“ — id iš **Modulio 9**, vartotojas dar M7 |
| Nav „Tęsti: MASTER“ / toliau M8 | Į 94 **negali nueiti** — modulio lock + kitas kontekstas |
| Schema: 8 vertikalūs SVG blokai + 8 apskritimai | Vizualiai „senovinė“ vs `HallucinationPipelineSlide` (ikonos, horizontal) |

**Fix microcopy:** M79-24 (dalinai atlikta) — `m9DataWorkflowContent.ts` context `m7_master` vs `m9`. **Fix schema:** M79-23 SCHEME_AGENT.

### 4.8 Footer „Toliau – skaidrė 31“ po section-break 66.9 — ar sumaišyta?

**Šaltinis:** testuotojo screenshot — section-break **„Skyrius: Patikrumas ir etika“** (id **66.9**), footer **„Toliau – skaidrė 31: Promptų manipuliacijos“**.

#### Ar tai po M7 modulio pabaigos?

**Ne.** Tai **vidurio** section-break M7, ne modulio santrauka (sk. **75**).

| Skaidrė | id | Vieta kurse |
|---------|-----|-------------|
| Ši (screenshot) | **66.9** | Po pipeline + duomenų paruošimo; **prieš** etikos bloką |
| Kita (footer target) | **67** | Promptų manipuliacijos — **pirmoji** etikos bloko skaidrė |
| Tikroji M7 pabaiga | **75** | Modulio 7 santrauka |

**Turinio eilė teisinga:** 66.9 → 67 → … → 75. Skaidrės **nesumaišytos**.

#### Ar „31“ teisingas numeris?

**Taip — pilnam M7 `slides[]` masyvui (59 skaidrės):**

| Metrika | Reikšmė |
|---------|---------|
| 66.9 pozicija (pilnas M7) | **30/59** |
| Kita skaidrė 67 pozicija | **31/59** |
| `audit-footer-numbers.mjs` M7 | **PASS** |

Footer skaičiuojamas pagal **visą** `modules.json` eilę (žr. `footer-slide-numbers.mdc`), ne pagal vartotojo **matomą** kelią.

#### Kur tikroji klaida (UX)?

**Footer skaičius ≠ UI skaitiklis**, kai veikia `pathBranch` filtras (fokusas „Vadovai“ = `strategija` + `etika-plus`):

| Kelias | Matomų skaidrių | 66.9 pozicija | **67** (Promptų manip.) | Footer rodo |
|--------|-----------------|---------------|-------------------------|-------------|
| Pilnas M7 | 59 | 30 | **31** | 31 ✅ |
| Vadovai (be fast track) | 45 | 26 | **27** | 31 ❌ |
| Vadovai + fast track | 40 | 24 | **25** | 31 ❌ |
| Tik branduolys | 35 | 22 | **23** | 31 ❌ |

Vartotojas mato **„24/40“** (ar panašiai), o footer sako **„skaidrė 31“** — atrodo kaip **šokas į kitą modulį** ar sumaišymas, nors Tęsti veda į teisingą **67**.

**Root cause:** statinis JSON footer + dinaminis navigacijos filtras (`useSlideNavigation` + `activeBranchIds`). Auditas tikrina tik pilną masyvą — **ne** filtruotą UX.

#### Papildoma painiava

- Badge **„M7“** section-break — gali skaitytis kaip „modulio pabaiga“, nors tai tik **skyriaus** žymė.
- Etikos blokas **perkeltas iš M4** — testuotojas gali manyti, kad „31“ = M4 kontekstas (M4 irgi turi footer „skaidrė 31“, bet **kitame modulyje**).

#### Fix kryptys

| ID | Sprendimas | Agentas |
|----|------------|---------|
| **A** | Footer **be skaičiaus**: „Toliau – Promptų manipuliacijos“ (M7 etikos blokas) | CONTENT → DATA |
| **B** | UI **perskaičiuoja** footer pagal matomą indeksą (`ModuleView` / `SlideContent`) | CODING |
| **C** | Section-break badge ne „M7“, o „Skyrius 3“ / „Patikrumas“ | CONTENT + UI |

**Rekomenduojama:** **A** (greita, be regresijos) + **B** (ilgalaikis M7–15 su šakomis).

---

## 5. Strateginės išvados (komandai)

1. **Vertė patvirtinta** — ypač išorinių duomenų + DI promptų architektūra; ne MVP regresija.
2. **Didžiausias friction** — mid-journey orientacija, ne turinio kiekis.
3. **Balansas** — optional šaka „Vidiniai duomenys“, ne viso M7 perrašymas.
4. **M9 evoliucija** — testuotojo keliai (i) ir (ii) kaip practice plėtra, ne naujas modulis.
5. **Stilius** — hibridas (konspektas + 1 narracinis sakinys), ne vien bulletų naikinimas.
6. **Curriculum debt** — decision tree prie 5 „keičiančių“ artefaktų (6 / 4 / 5 / 8 / 5-step).
7. **Cross-slide references** — naked id arba „skaityk kartu su“ be linko = friction; taisyklė §4.7.
8. **725+726** — dedup arba viena skaidrė; ne dubliuoti veiksmų.
9. **Footer numeriai M7** — statiniai (pilnas 59) vs filtruotas UI skaitiklis; §4.8.

---

## 6. Backlog punktai (vykdymui vienu ypu)

Statusai: `nauja` | `svarstoma` | `vykdoma` | `atlikta` | `atmesta`

### P1 — Orientacija ir „kada naudoti“

| ID | Prioritetas | Statusas | Aprašymas | Agentas | Failai / vietos |
|----|-------------|----------|-----------|---------|-----------------|
| M79-01 | P1 | atlikta | M7 makro-žemėlapis pradžioje: 4 blokai (Pamatas → Rinkimas → Paruošimas → Analizė/MASTER) + „dabar esi“ logika | CURRICULUM → CONTENT → DATA | sk. 71; `MODULIO_7_SKAIDRIU_EILES.md`; `modules.json` M7 |
| M79-02 | P1 | atlikta | Section-break recap kas ~8–10 skaidrių su „ką jau padarėme / kas toliau“ | CURRICULUM → CONTENT | `modules.json` M7 section-break skaidrės (66.9 recap + badge) |
| M79-03 | P1 | atlikta | Use-case blokai: **5 žingsnių algoritmas** (id 89) — 2–3 situacijos + „kada ne“ | CONTENT → DATA | `modules.json` sk. 89; SOT §7.16 |
| M79-04 | P1 | atlikta | Use-case blokai: **MASTER** (id 74) vs **6 pipeline** (id 73) vs **5 paruošimas** (891) — decision tree viename bloke | CONTENT → DATA | sk. 73, 74, 891; SOT §8.1b |
| M79-05 | P1 | atlikta | UI: modulio progreso etiketė pagal makro-bloką (jei reikia kodo) | CODING | `ModuleView.tsx`, `m7MacroBlocks.ts` |
| **M79-16** | **P1** | **atlikta** | **Beprasmių frazių auditas ir perrašymas M7–M9** — pradėta nuo sk. **72**, EN sync | **CONTENT** → DATA | `modules.json` M7–M9; `modules-en-m7-m9.json` |
| **M79-17** | **P1** | **atlikta** | **725+726 dedup:** variantas A §4.7 | **CURRICULUM** → CONTENT → DATA | sk. 725, 726 |
| **M79-18** | **P1** | **atlikta** | **Cross-slide reference policy:** naked id pašalinti M4+M7 | CONTENT → CODING? | `modules.json` M4, M7; EN overlays |
| **M79-19** | **P2** | **atlikta** | M4/M7 etikos blokas: pašalinti **(67.3)**, „grįžk ten“ | CONTENT | sk. 67, 68, 67.8 |
| **M79-20** | **P1** | **atlikta** | **Footer desync:** variantas A be skaičiaus M7 | CONTENT | sk. 66.9–8713 footers M7 |
| **M79-22** | **P2** | **atlikta** | **Haliucinacijų benchmark duomenys (sk. 200)** | DATA | `hallucinationRates.ts` |
| **M79-23** | **P2** | **atlikta** | **M9/M7 8 žingsnių schema:** horizontal card layout | SCHEME → CODING | `M9DataWorkflowDiagram.tsx` |
| **M79-25** | **P1** | **atlikta** | **Resume modal desync** | CODING | `ModuleView.tsx` |
| **M79-26** | **P2** | **atlikta** | **M79 PDF atmintinė evergreen** | CONTENT → DATA | `m79HandoutContent.json`, `-en.json` |
| M79-27 | P2 | atlikta | 67.7 pavadinimo fix (ne „5 žingsnių“) | CONTENT | sk. 67.7 shortTitle |

### P2 — Vidiniai duomenys ir praktika

| ID | Prioritetas | Statusas | Aprašymas | Agentas | Failai / vietos |
|----|-------------|----------|-----------|---------|-----------------|
| M79-06 | P2 | atlikta | Optional šaka **„Vidiniai duomenys“**: Excel/CRM eksportas → valymas (891) → EDA (90) | CURRICULUM → CONTENT | `pathBranch` vidiniai + journey choice sk. 70 |
| M79-07 | P2 | atlikta | M9 praktika **(i) Šaltinių katalogas** | CONTENT → DATA | M9 sk. 93 |
| M79-08 | P2 | atlikta | M9 praktika **(ii) Savo failas** | CONTENT → DATA | M9 sk. 93 |
| M79-09 | P2 | atlikta | Vidinių duomenų thread M7: 78, 84, 891 cross-link | CONTENT | `modules.json` M7 |

### P3 — Stilius ir polish

| ID | Prioritetas | Statusas | Aprašymas | Agentas | Failai / vietos |
|----|-------------|----------|-----------|---------|-----------------|
| M79-10 | P3 | atlikta | Narratyvinis sluoksnis: 1–2 sakiniai virš bullet blokų (branduolio skaidrės) | CONTENT | M7 sk. 90, 891, 89 collapsible |
| M79-11 | P3 | atlikta | M8/M9 intro: aiškiau susieti su M7 makro-blokais | CONTENT | M8 test-intro, M9 practice-intro (90) |
| M79-12 | P3 | atlikta | EN overlay sinchronas po LT pakeitimų | DATA | `modules-en-m7-m9.json`, `modules-en-m4-m6.json`; `audit:m79` PASS |
| M79-28 | P3 | atlikta | M8 pilnas slide audit (heuristinis) | USER_JOURNEY | TEST_REPORT §2026-07-14 M79 iter5 |
| M79-29 | P3 | atlikta | M9 hub + scenarijai audit (heuristinis) | USER_JOURNEY | TEST_REPORT §2026-07-14 M79 iter5 |
| M79-30 | P3 | atlikta | M7 likusios skaidrės (heuristinis GOLDEN_STANDARD gate) | USER_JOURNEY | Patikra: 0 naked id grep |

### QA / docs

| ID | Prioritetas | Statusas | Aprašymas | Agentas | Failai |
|----|-------------|----------|-----------|---------|--------|
| M79-13 | P2 | atlikta | Šis backlog dokumentas | QA | `docs/development/07_08_09_backlog.md` |
| M79-14 | P2 | atlikta | Įrašas `TEST_REPORT.md` su nuoroda čia | QA | `TEST_REPORT.md` |
| M79-15 | P3 | atlikta | Po implementacijos — `CHANGELOG.md`, `TODO.md` uždarymas | QA | CHANGELOG, TODO |

---

## 7. Vieno ypo vykdymo pipeline (rekomenduojama seka)

```
1. Savininko pastabos (§9) + prioritetų patvirtinimas
2. CURRICULUM — makro-blokai, decision tree struktūra, optional šakos
3. CONTENT — tekstai (use-case, narratyvas, M9 praktikos) + **M79-16 microcopy audit** (§4.6)
4. DATA — modules.json (+ EN overlay jei reikia)
5. CODING — tik jei M79-05 (UI etiketės) arba naujas slide tipas
6. validate:schema + audit:m79 + generate:core-data (jei M1–9 core)
7. CODE_REVIEW — SOT→JSON→UI grandinė
8. QA — TEST_REPORT, CHANGELOG, TODO
```

**Mixed task:** taip (turinys + JSON + gal UI) → orchestrator pipeline.

---

## 8. Priėmimo kriterijai (DoD vienu ypu)

- [x] Testuotojo 5 temos adresuotos arba sąmoningai atmestos su rationale §9
- [x] Naujas dalyvis M7 pradžioje mato **kelio žemėlapį** (4 blokai)
- [x] Sk. 89 ir 74 turi **situacinius use-case** (ne tik „Kam tai?“ apibrėžimą)
- [x] Decision tree: kada 6 / 4 / 5 / 8 žingsnių modeliai
- [x] M9 turi bent vieną aiškų pratimą šaltinių katalogui (i) ir/ar failų guided (ii)
- [x] **M79-16:** „Kam tai?“ blokuose nėra tuščių forward-ref; EN sk. 72 sutapatintas su LT
- [x] **M79-17:** sk. 726 be „skaidrė 725“ ir be dubliuotų 4 veiksmų
- [x] **M79-20:** M7 section-break footer be klaidinančių skaičių
- [x] LT M7–9 matoma kopija — `npm run audit:m79` PASS
- [x] TEST_REPORT įrašas atnaujintas

---

## 9. Savininko pastabos

_Čia papildyk savo komentarais, prioritetais, atmestais punktais._

```
2026-07-14 — Strateginis pamatas (sk. 72): „beprasmių frazių“ problema —
kartojasi forward-reference (pipeline, MASTER PROMPTAS, silpnas pamatas).
Užduotis CONTENT_AGENT → M79-16, auditas §4.6.

2026-07-14 — Sk. 725/726: „Kaip skaityti kartu su skaidre 725“ — wtf;
725 = ankstesnė skaidrė (5/59), ne deep-link. #6 dubliuoja #5 veiksmus.
Taisyklė: nuoroda su linku ARBA nieko → M79-17, M79-18, §4.7.

2026-07-14 — Sk. 66.9 footer „Toliau – skaidrė 31“: eilė teisinga (67),
bet footer = pilnas M7 (31/59), UI vadyba keliu = ~25–27/40 → M79-20, §4.8.

2026-07-14 — M7–9 PDF atmintinė (Suvestinė): labai šaunu kaip reference,
bet „Ką daryti per 48 val.“ ir „Refleksija ir 48 val. veiksmas“ netinka
išsaugotam dokumentui — tai deployment CTA akimirkai, ne cheat sheet.
Testuotojas: išsisaugai ateičiai, kad turėtum po ranka → 48h dalys perteklinės.
→ M79-26: handout evergreen; 48h lieka tik skaidrėse (firstAction24h), ne PDF.
```


---

## 11. Phase 2 DoD (2026-07-15) — honest priėmimas

- [x] Browser smoke M7–9 dokumentuotas (`TEST_REPORT.md` §2026-07-15)
- [x] M7 Patikra boilerplate **0** (`Jei ne — grįžk prie 2️⃣`)
- [x] M7 macro map **59** branduolio slide ids + **78.5** expansion (`m7MacroBlocks.ts`); nav etiketė `ModuleView` (pilnas M7 katalogas = 59 skaidrės su pathBranch filtru)
- [x] Vidiniai path: journey choice sk. 70 + **papildoma** sk. **78.5** (`pathBranch: vidiniai`); branduolis 78/84/891 lieka visiems
- [x] M9 **2× `practice-scenario`** (93.1, 93.2) su `taskFrame.doneWhen`
- [x] M8 warm-up **0** naked `Žr. M7 sk.` refs
- [x] Sprint D audit batch (`patch-m79-phase2-audit.mjs`) — M8/M9/M7 targeted fixes
- [x] `audit:m79` + `test:run` 478/478 green; `CHANGELOG.md` atnaujintas

**Skriptai:** `scripts/patch-m79-patikra-batch2.mjs`, `patch-m79-phase2.mjs`, `patch-m79-phase2-en.mjs`, `patch-m79-phase2-audit.mjs`, `patch-m79-ux-polish.mjs`, `patch-m79-ux-polish-en.mjs` — pilnas sąrašas: [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md)

---

## 12. P2 UX polish DoD (2026-07-15) — Top 5 + iteracijos 1–6

- [x] **Top 5:** M9 sk. 93/94, M7 sk. 76, 89/73, M9 99/90 — `M9WorkflowStepCopyBlock`, `linkedRowIndex` + `toolChoiceBar`
- [x] **Iter 1:** M7 etika (67, 67.5, 67.8, 67.3, 68) — collapsible, dedup, Patikra
- [x] **Iter 2:** Copyable filtrai sk. 734, 731, 733, 77; bar be `table` (`ContentSlides`)
- [x] **Iter 3:** M9 sk. 93 bookends, sk. 94 Patikra, scenarijai 101/102/111/116/117, hub 99
- [x] **Iter 4:** Optional šakos 77.5, 90, 861, 88, M7 sk. 101 (EN veidrodis)
- [x] **Iter 5:** sk. 200 dashboard intro; sk. 74 MASTER schema copy
- [x] **Iter 6:** `validate:schema` · `audit:m79` · `generate:core-data` · `test:run` **482/482**
- [ ] Rankinis 375px browser smoke — `TEST_REPORT.md` ⬜

**Operacinis SOT:** [`TEST_REPORT.md`](TEST_REPORT.md) §2026-07-15 P2 · [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md) · `patch-m79-p2-polish*.mjs`

---

## 10. Nuorodos

| Dokumentas | Paskirtis |
|------------|-----------|
| `docs/turinio_pletra_moduliai_7_8_9.md` | Turinio SOT M7–9 |
| `docs/MODULIO_7_SKAIDRIU_EILES.md` | Skaidrių eilė, branduolys + pathBranch |
| `src/data/modules.json` | Duomenų SOT |
| `docs/development/GOLDEN_STANDARD.md` §3.2, §3.8 | Skaidrių seka, path-step |
| `docs/development/USER_JOURNEY_AGENT.md` | UX diagnostikos metodika |
| `docs/development/PAPRASTOS_KALBOS_GAIRES.md` | Plain language, DI terminologija |
| `docs/development/CONTENT_AGENT.md` | Microcopy rewrite workflow |
| `docs/development/M79_PATCH_REGISTRY.md` | M7–M9 patch skriptai (operacinis SOT) |
| `docs/development/DOCS_MAINTENANCE.md` | Dokumentacijos priežiūra |
