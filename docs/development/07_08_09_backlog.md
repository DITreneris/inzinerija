# M7–M9 backlog (Duomenų analizės kelias)

> **Statusas:** `aktyvus priežiūros backlog` — Phase 2 + P2 polish + Lygis C + A–C + **M79-51…55 kasdienis darbas** atlikta (2026-07-16); lieka browser smoke + §4.6 #6–9.  
> **Tikslas:** Vienas darbo sąrašas prieš vieningą tvarkymą („vienu ypu“). Savininkas papildo pastabomis žemiau — **§9 Savininko pastabos**.  
> **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` · `docs/MODULIO_7_SKAIDRIU_EILES.md` · `src/data/modules.json`  
> **Susiję:** `docs/development/TEST_REPORT.md` (§2026-07-14…16), `M79_PATCH_REGISTRY.md`, `docs/archive/development/analysis/M7_STEP_COUNT_CURRICULUM_REVIEW_2026-07.md`

---

## 1. Kontekstas

| Laukas                  | Reikšmė                                               |
| ----------------------- | ----------------------------------------------------- |
| **Šaltinis**            | Nepriklausomas testuotojas — praėjo modulius 7, 8, 9  |
| **Data**                | 2026-07-14                                            |
| **Tipas**               | UX / curriculum / turinio balansas (ne techninis bug) |
| **Prioritetas bendras** | P2 (produkto kokybė Tier 3), ne P1 regresija          |

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

| Sritis              | Dabartinė būklė                                                                        | Gap                                                                     |
| ------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Išoriniai šaltiniai | Stiprus: 7.7, 77.5 scraping, 89 (šaltinių promptas), rinkos tendencijos, M9 surinkimas | —                                                                       |
| Vidiniai duomenys   | Išsklaidyta: 891 (valymas), 84 (DB), 78–79 (tipai), 725/726 (Excel kultūra)            | Nėra **pavadintos šakos** „Vidiniai duomenys“; asimetrija su išoriniais |

### 4.2 Du pasirinktiniai keliai (testuotojo idėja)

| Kelias                     | Dabartinė būklė                                                                                  | Gap                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **(i) Šaltinių katalogas** | Artimas: sk. **89** promptai 3a–3b (`Sudaryk 20 viešų šaltinių…`, lentelė kategorija/URL/dažnis) | Trūksta **privalomo pratimo** su tikrinamu output ir use-case („kai neturi vidinių duomenų“)   |
| **(ii) Failų analizė**     | Nėra platformos upload; M9 = CopyButton → DI chat                                                | Reikia **guided exercise**: „įkelk CSV į DI + šis promptas“ arba path-step / practice-scenario |

### 4.3 Kalbos stilius

| Aspektas                        | Dabartinė būklė                                                                        | Gap                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Formatas                        | GOLDEN_STANDARD §3.2: Kam tai → Ką daryti → Prompt → Patikra                           | Veikia „konspektų“ segmentui                                          |
| Narratyvas                      | `🔽 Nori suprasti detaliau?` collapsible                                               | Per mažai ir per vėlai — trūksta 1–2 sakinio „pasakotojo“ **viršuje** |
| **Beprasmių frazių kartojimas** | Žr. **§4.6** — „pipeline, MASTER PROMPTAS“, „stovi ant silpno pamato“, generic Patikra | Suvokia kaip paskaitų užrašus be prasmės; reikia CONTENT rewrite      |

### 4.6 Beprasmių / kartojamų frazių auditas (CONTENT_AGENT)

**Šaltinis:** savininko pastaba + testuotojo screenshot — **Modulis 7, skaidrė 3/38, id 72 „Strateginis pamatas“**, blokas „Kam tai?“.

#### Probleminė frazė (pavyzdys iš testuotojo / senesnės versijos)

> „**Strateginis pamatas** – kodėl duomenų analizė ir DI turi stovėti ant aiškių principų. Be to viskas vėlesnė (pipeline, MASTER PROMPTAS, ataskaitos) stovi ant silpno pamato. Čia – 4 tezės… duomenys = sprendimų sistema, ne „IT funkcija“.“

**Kodėl beprasmė:** vardija ateities sąvokas, kurių dalyvis dar nežino; metafora „silpnas pamatas“ be konkretaus veiksmo; neatsako „ką dabar darau su šia skaidre“.

#### Dabartinė būklė (2026-07-15 – išspręsta)

| Vieta                                 | Tekstas „Kam tai?“                                                          | Statusas                          |
| ------------------------------------- | --------------------------------------------------------------------------- | --------------------------------- |
| `modules.json` LT sk. **72**          | „4 principai, pagal kuriuos vertini bet kokią analizę… Čia dar ne promptai“ | ✅ išspręsta (M79-16, Phase 2)    |
| `modules-en-m7-m9.json` EN sk. **72** | „data-driven or opinion-based… Not prompts yet“                             | ✅ išspręsta (P2 EN sync)         |
| `scripts/m7-m9-en-string-map.json`    | Senas LT stringas                                                           | ⚠️ optional valymas (ne blokeris) |

#### Pasikartojančių frazių katalogas (M7 branduolis — auditas)

| #   | Pattern / frazė                                                    | Kur kartojasi               | Problema                               | Statusas (2026-07-16)                                                                |
| --- | ------------------------------------------------------------------ | --------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | `pipeline, MASTER PROMPTAS` (forward-reference)                    | sk. 72 (buvo), intro blokai | Insider žargonas                       | ✅ sk. 72 perrašyta                                                                  |
| 2   | `stovi ant silpno pamato` / `rests on weak ground`                 | EN sk. 72 (buvo)            | Tuščia metafora                        | ✅ pašalinta                                                                         |
| 3   | `Ar rezultatas atitinka tikslą?` + `Jei ne — grįžk prie 2️⃣…`       | M7 Patikra blokai           | Copy-paste boilerplate                 | ✅ 0× grep modules.json                                                              |
| 4   | `**Priminimas:** … jau skaidrėje „Strateginis pamatas“`            | sk. 97 (Deming)             | Meta-navigacija vietoj turinio         | ✅ M79-44: collapsible – inline 4 principai, be skaidrės pavadinimo (2026-07-16)     |
| 5   | `**Platesnis teorinis pamatas** … skaidrėje „Strateginis pamatas“` | sk. 97 collapsible          | Tas pats                               | ✅ M79-44: ta pati collapsible body (LT+EN)                                          |
| 6   | `Po etikos bloko – grįžtame prie EDA (tas pats kelias)`            | sk. 90                      | Navigacinis triukšmas „Kam tai?“ bloke | Perkelti į section-break; „Kam tai?“ = tik EDA prasmė                                |
| 7   | `**Seka:** Surink → išvalyk → …` (be kodėl)                        | sk. 891                     | Etiketė be use-case                    | Prieš seką: **kada** taikyti (pvz. prieš bet kokią analizę su nešvariais duomenimis) |
| 8   | `Ne M4 Master promptas apie kontekstą`                             | sk. 74                      | Gynybiškas paaiškinimas, ne nauda      | Pakeisti į „pilna 8 žingsnių analizė vienai temai“                                   |
| 9   | `vienas promptas` / `vienas veiksmas` (be skirtumo)                | daug skaidrių               | Praranda prasmę per kartojimą          | Variuoti: „vienas kopijuojamas šablonas“, „viena užklausa DI“                        |

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

| Aspektas              | Dabartinė būklė                                     | Kodėl vis tiek skundžiasi                               |
| --------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| Kelionės pasirinkimas | Sk. **70** `journeyChoices` + **70.5** profilio pie | Nepasako „kur esi modulyje“                             |
| Path-step             | 71.1–71.5 tarp teorijos                             | Gerai pedagogiškai, bet be makro-žemėlapio = fragmentai |
| pathBranch            | 23 šakos skaidrės, filtruojamos navigacijoje        | Skirtinga skaidrių seka / N skaičius                    |
| Žingsnių skaičiai     | 6 pipeline, 4 tipai, 5 paruošimas, 8 MASTER         | Žinoma painiava — žr. M7_STEP_COUNT_CURRICULUM_REVIEW   |
| Santrauka             | Sk. **75** susiveda                                 | Retrospektyviai OK, prospektyviai ne                    |

### 4.5 Skaidrė 23 ir „5 žingsnių algoritmas“

| Numeris                     | Ką reiškia kurse                                                            | Pastaba                                                                       |
| --------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **UI pozicija ~23 M7**      | **MASTER PROMPTAS** (id 74, 8 žingsnių) — žr. `MODULIO_7_SKAIDRIU_EILES.md` | Testuotojas galėjo painioti poziciją su id                                    |
| **„5 žingsnių algoritmas“** | id **89**, ~14 pozicija branduolyje                                         | Yra „Kam tai?“ — trūksta **2–3 situacinių use-case** (kada naudoti / kada ne) |

**Esamas „Kam tai?“ (id 89):** Šaltiniai → Struktūra → Surinkti → Valymas → Eksportas; „kai reikia sistemingai paruošti duomenis“.

**Trūksta:** „Naudok, kai…“ / „Nenaudok, kai…“ / palyginimas su 6 pipeline ir 8 MASTER.

### 4.7 Kryžminės skaidrių nuorodos ir dubliavimas (725 / 726) — „wtf“ feedback

**Šaltinis:** testuotojo screenshot + savininkas (2026-07-14). Skaidrė **#5/38** (filtruotas kelias) = id **726** „Problematika…“; blokas **„Kaip skaityti kartu su skaidre 725“**.

#### Diagnozė: kodėl „Kur ta skaidrė 725?“

| Faktas                                                       | Reikšmė vartotojui                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------ |
| UI rodo **5/38** (arba 6/59 pilname)                         | Vartotojas **niekada nemato** id `725`                             |
| id **725** = pozicija **5/59** „DI paradoksas“ (infographic) | Tai **ankstesnė** skaidrė prieš 726 — ne paslėpta, ne kitur        |
| id **726** = pozicija **6/59** „Problematika“ (text)         | Testuotojas **jau ant jos**, o tekstas siunčia „ieškoti“ 725       |
| Abi `optional: true`, `pathBranch: strategija`               | Matomos tik fokusams su `strategija` šaka (pvz. Vadovai)           |
| **Nėra UI nuorodos** body tekste                             | `ifWrongSee` deep-link veikia tik M8 testuose — ne `content-block` |

**Išvada:** heading „skaityti **kartu su** skaidre 725“ yra **autoriaus koordinatė** (JSON id), ne vartotojo kelionė. Tai **apsunkina** kelionę — testuotojas teisus: „wtf“.

#### Dubliavimas sk. #5 ↔ #6 (725 ↔ 726)

| Turinys                                    | id 725 (infographic)                                                    | id 726 (content-block)       |
| ------------------------------------------ | ----------------------------------------------------------------------- | ---------------------------- |
| Problemos (investicijos, pilotai, kultūra) | paradoxCards, funnel, valueSection                                      | „2️⃣ Trys problemos“          |
| Veiksmai verslui                           | actionSection **3 kortelės** + solutionSection **4 pipeline žingsniai** | „3️⃣ Keturi veiksmai verslui“ |
| Išvada                                     | conclusionSection                                                       | „4️⃣ Esminė išvada“           |

**SOT intent** (`turinio_pletra_moduliai_7_8_9.md` §2A): 725 = interaktyvi infografika; 726 = tekstinė santrauka **be skaičių kartojimo**. **Realybė:** veiksmai ir išvada **pakartoti** — sk. #6 atkartoja sk. #5 apačią.

**Rekomenduojamas fix (CURRICULUM → CONTENT):**

| Variantas            | Aprašymas                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **A (minimal)**      | 726 — palikti **tik** „Trys problemos“ + 1 sakinio tiltas; **išmesti** „Keturi veiksmai“ ir „Esminė išvada“ (lieka 725) |
| **B (agresyvus)**    | Sujungti į **vieną** skaidrę (infographic + trumpas text appendix)                                                      |
| **C (status quo +)** | 726 lieka, bet **be** nuorodos į 725; antraštė „Kam tai?“ vietoj „Kaip skaityti kartu…“                                 |

#### Taisyklė: nuoroda arba nieko

> **Produktinė taisyklė (savininkas):** Kai apeliuojame į kitą skaidrę — **arba** konkretus deep-link (kaip M8 `ifWrongSee`), **arba** nieko. Naked id (`725`, `67.3`, `13.35`) body tekste **draudžiama**.

| Mechanizmas                                   | Veikia?      | Kur                                   |
| --------------------------------------------- | ------------ | ------------------------------------- |
| `ifWrongSee` + `onRemediationLink`            | ✅ clickable | M8 testai (`McqQuestion.tsx`)         |
| „žr. skaidrėje 725“ body tekste               | ❌ dead text | M7 sk. 726, 67, 97, M4→M7 nukreipimai |
| Footer „Toliau – skaidrė N“                   | ✅ seka      | Visi moduliai (1-based pozicija)      |
| Pavadinimas „skaidrėje „Strateginis pamatas““ | ⚠️ be linko  | M7 sk. 97 — vartotojas ieško ranka    |

#### Apimtis M1–15 (heuristinis auditas `modules.json`)

| Modulis                   | Cross-ref / naked id body tekste | Pavyzdžiai                                                                            |
| ------------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| **M4**                    | ~15                              | „kitoje skaidrėje (67.3)“, „Haliucinacijos (67.8)“, „grįžk ten“, M7 nukreipimas 71.35 |
| **M7**                    | 6+                               | sk. 726→725, 97→„Strateginis pamatas“, 67→67.3, 73.5 explanation→73                   |
| **M10**                   | 1                                | „Kitoje skaidrėje pamatysi…“                                                          |
| **M13**                   | 1                                | neprivaloma skaidrė 13.35                                                             |
| **M14**                   | 2                                | skaidrė 152 video, „Verslas ir rizikos“                                               |
| M1–3, 5–6, 8–9, 11–12, 15 | 0–minimal                        | daugiausia footer „Toliau“ (OK)                                                       |

**Išvada:** problema **sisteminė**, bet **koncentruota** M4 (etikos blokas perkeltas į M7) ir M7 strategijos šakoje — ne visi 15 modulių vienodai blogi.

**Fix (atlikta 2026-07-15, sk. 67 UX):** pašalinta 11 blokų siena; interaktyvus `toolChoiceBar` + MCQ `preCopyCheckBlock`; pašalintas „Praktika: kur daryti“ (dubliavo nav); subtitle be jailbreak.

#### Pavyzdys: sk. 67 — „Kas tas (67.3)?“ (testuotojas, 2026-07-14)

| Vartotojo UI                       | JSON / footer                                                             |
| ---------------------------------- | ------------------------------------------------------------------------- |
| **27/45** „Promptų manipuliacijos“ | Body: „…kitoje skaidrėje (67.3)“                                          |
| **„Tęsti: Pataisyk promptą“** ✅   | Footer: „Toliau – skaidrė **32**“ (pilnas M7; vadyba keliu turėtų **28**) |
| Kita = **28/45** (id 67.3)         | **(67.3)** — vidinis id, UI nerodo                                        |

Navigacija **jau teisinga**; body **sugadina** aiškumą. **Fix:** išmesti `(67.3)`; „Paspausk Tęsti“ arba ištrinti bloką „Praktika: kur daryti“ (dubliuoja nav).

#### Rewrite kryptis sk. 726 (juodraštis)

**Išmesti:** heading „1️⃣ Kaip skaityti kartu su skaidre 725“.

**Vietoj to (variantas A):**

> **1️⃣ Kam tai?** — Trumpa problemų santrauka vadovui: kodėl DI investicijos nesiverčia į pelną. Jei peržiūrėjai ankstesnę infografiką — čia tas pats turinys žodžiais, be skaičių.

_(Be id 725; be „kartu su“.)_

#### Pavyzdys: sk. 71.35 — „kelio žingsniu 71.3“ (testuotojas, 2026-07-14)

| Vartotojo UI                                                          | JSON body                                                 |
| --------------------------------------------------------------------- | --------------------------------------------------------- |
| **29/45** „DI įrankiai informacijos paieškai“ (neprivaloma atmintinė) | „naudok su kelio žingsniu **71.3** (lygiagretūs tyrimai)“ |
| **Ankstesnė** = **28/45** id **71.3** „Lygiagrečių tyrimų parengimas“ | **71.3** — vidinis path-step id, UI nerodo                |
| **„Tęsti: DI agentų koncepcija“** ✅                                  | `toolsIntro` taip pat: „…su kelio žingsniu 71.3“          |

**Kodėl skauda:** skaidrė atrodo kaip **neišbaigti autoriaus užrašai** („nepamiršk 71.3“), ne kaip produktas. Vartotojas ką tik atėjo iš 71.3 — skaičius neduoda jokios vertės. Tas pats pattern kaip 67.8, 725, 67.3.

**Fix (CONTENT, M79-18):** pakeisti į **temos pavadinimą** arba išmesti nuorodą visai:

> Neprivaloma atmintinė: 6 DI įrankiai paieškai ir sintezei — naudok **lygiagrečių tyrimų** žingsnyje (2–4 šaltiniai). Tipinė eiga — 30–45 min.

Arba trumpiau (jau esi po to žingsnio):

> Neprivaloma atmintinė: 6 DI įrankiai paieškai ir sintezei. Tipinė eiga — 30–45 min.

**Taip pat:** M4 sk. ~61 nukreipimas į „skaidrė **71.35** po … (71.3)“ — tas pats rewrite + žmogiškas pavadinimas.

#### Pavyzdys: M7 sk. 74 MASTER — „Žr. skaidrę 94“ (testuotojas, 2026-07-14)

| Vartotojo UI                                    | Problema                                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| **41/45** MASTER 8 žingsnių schema, žingsnis 3  | „Žr. skaidrę **94**“ — id iš **Modulio 9**, vartotojas dar M7             |
| Nav „Tęsti: MASTER“ / toliau M8                 | Į 94 **negali nueiti** — modulio lock + kitas kontekstas                  |
| Schema: 8 vertikalūs SVG blokai + 8 apskritimai | Vizualiai „senovinė“ vs `HallucinationPipelineSlide` (ikonos, horizontal) |

**Fix microcopy:** M79-24 (dalinai atlikta) — `m9DataWorkflowContent.ts` context `m7_master` vs `m9`. **Fix schema:** M79-23 SCHEME_AGENT.

### 4.8 Footer „Toliau – skaidrė 31“ po section-break 66.9 — ar sumaišyta?

**Šaltinis:** testuotojo screenshot — section-break **„Skyrius: Patikrumas ir etika“** (id **66.9**), footer **„Toliau – skaidrė 31: Promptų manipuliacijos“**.

#### Ar tai po M7 modulio pabaigos?

**Ne.** Tai **vidurio** section-break M7, ne modulio santrauka (sk. **75**).

| Skaidrė              | id       | Vieta kurse                                               |
| -------------------- | -------- | --------------------------------------------------------- |
| Ši (screenshot)      | **66.9** | Po pipeline + duomenų paruošimo; **prieš** etikos bloką   |
| Kita (footer target) | **67**   | Promptų manipuliacijos — **pirmoji** etikos bloko skaidrė |
| Tikroji M7 pabaiga   | **75**   | Modulio 7 santrauka                                       |

**Turinio eilė teisinga:** 66.9 → 67 → … → 75. Skaidrės **nesumaišytos**.

#### Ar „31“ teisingas numeris?

**Taip — pilnam M7 `slides[]` masyvui (59 skaidrės):**

| Metrika                       | Reikšmė   |
| ----------------------------- | --------- |
| 66.9 pozicija (pilnas M7)     | **30/59** |
| Kita skaidrė 67 pozicija      | **31/59** |
| `audit-footer-numbers.mjs` M7 | **PASS**  |

Footer skaičiuojamas pagal **visą** `modules.json` eilę (žr. `footer-slide-numbers.mdc`), ne pagal vartotojo **matomą** kelią.

#### Kur tikroji klaida (UX)?

**Footer skaičius ≠ UI skaitiklis**, kai veikia `pathBranch` filtras (fokusas „Vadovai“ = `strategija` + `etika-plus`):

| Kelias                  | Matomų skaidrių | 66.9 pozicija | **67** (Promptų manip.) | Footer rodo |
| ----------------------- | --------------- | ------------- | ----------------------- | ----------- |
| Pilnas M7               | 59              | 30            | **31**                  | 31 ✅       |
| Vadovai (be fast track) | 45              | 26            | **27**                  | 31 ❌       |
| Vadovai + fast track    | 40              | 24            | **25**                  | 31 ❌       |
| Tik branduolys          | 35              | 22            | **23**                  | 31 ❌       |

Vartotojas mato **„24/40“** (ar panašiai), o footer sako **„skaidrė 31“** — atrodo kaip **šokas į kitą modulį** ar sumaišymas, nors Tęsti veda į teisingą **67**.

**Root cause:** statinis JSON footer + dinaminis navigacijos filtras (`useSlideNavigation` + `activeBranchIds`). Auditas tikrina tik pilną masyvą — **ne** filtruotą UX.

#### Papildoma painiava

- Badge **„M7“** section-break — gali skaitytis kaip „modulio pabaiga“, nors tai tik **skyriaus** žymė.
- Etikos blokas **perkeltas iš M4** — testuotojas gali manyti, kad „31“ = M4 kontekstas (M4 irgi turi footer „skaidrė 31“, bet **kitame modulyje**).

#### Fix kryptys

| ID    | Sprendimas                                                                       | Agentas        |
| ----- | -------------------------------------------------------------------------------- | -------------- |
| **A** | Footer **be skaičiaus**: „Toliau – Promptų manipuliacijos“ (M7 etikos blokas)    | CONTENT → DATA |
| **B** | UI **perskaičiuoja** footer pagal matomą indeksą (`ModuleView` / `SlideContent`) | CODING         |
| **C** | Section-break badge ne „M7“, o „Skyrius 3“ / „Patikrumas“                        | CONTENT + UI   |

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
10. **Lygis C debt (M79-32–40)** — branduolis ~85 % bendras; 6 kelių individualumas reikalauja `modules-journey-m7.json` overlay + fallback į **pardavimų** bazę. Warm-up **ne** 6×. M79-40 viz split — tas pats epic, release po Faze 1. Žr. `M7_LYGIS_C_JOURNEY_EPIC.md`.

---

## 6. Backlog punktai (vykdymui vienu ypu)

Statusai: `nauja` | `svarstoma` | `vykdoma` | `atlikta` | `atmesta`

### P1 — Orientacija ir „kada naudoti“

| ID          | Prioritetas | Statusas    | Aprašymas                                                                                                             | Agentas                         | Failai / vietos                                                                  |
| ----------- | ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| M79-01      | P1          | atlikta     | M7 makro-žemėlapis pradžioje: 4 blokai (Pamatas → Rinkimas → Paruošimas → Analizė/MASTER) + „dabar esi“ logika        | CURRICULUM → CONTENT → DATA     | sk. 71; `MODULIO_7_SKAIDRIU_EILES.md`; `modules.json` M7                         |
| M79-02      | P1          | atlikta     | Section-break recap kas ~8–10 skaidrių su „ką jau padarėme / kas toliau“                                              | CURRICULUM → CONTENT            | `modules.json` M7 section-break skaidrės (66.9 recap + badge)                    |
| M79-03      | P1          | atlikta     | Use-case blokai: **5 žingsnių algoritmas** (id 89) — 2–3 situacijos + „kada ne“                                       | CONTENT → DATA                  | `modules.json` sk. 89; SOT §7.16                                                 |
| M79-04      | P1          | atlikta     | Use-case blokai: **MASTER** (id 74) vs **6 pipeline** (id 73) vs **5 paruošimas** (891) — decision tree viename bloke | CONTENT → DATA                  | sk. 73, 74, 891; SOT §8.1b                                                       |
| M79-05      | P1          | atlikta     | UI: modulio progreso etiketė pagal makro-bloką (jei reikia kodo)                                                      | CODING                          | `ModuleView.tsx`, `m7MacroBlocks.ts`                                             |
| **M79-16**  | **P1**      | **atlikta** | **Beprasmių frazių auditas ir perrašymas M7–M9** — pradėta nuo sk. **72**, EN sync                                    | **CONTENT** → DATA              | `modules.json` M7–M9; `modules-en-m7-m9.json`                                    |
| **M79-17**  | **P1**      | **atlikta** | **725+726 dedup:** variantas A §4.7                                                                                   | **CURRICULUM** → CONTENT → DATA | sk. 725, 726                                                                     |
| **M79-18**  | **P1**      | **atlikta** | **Cross-slide reference policy:** naked id pašalinti M4+M7                                                            | CONTENT → CODING?               | `modules.json` M4, M7; EN overlays                                               |
| **M79-41b** | **P0**      | **atlikta** | **Nav copy be JSON id:** M9 sk. 90/99, M7 sk. 75 – temų pavadinimai vietoje `sk. 93.1`                                | CONTENT → DATA                  | `modules.json`, `modules-en-m7-m9.json`                                          |
| **M79-42**  | **P1**      | **atlikta** | **Modulių metadata plain language:** M7–M9 subtitle/description LT+EN (hub kortelė)                                   | CONTENT → DATA                  | `modules.json`, `modules-en-m7-m9.json`                                          |
| **M79-43**  | **P1**      | **atlikta** | **Antraštės / intro plain language W3:** sk. 70, 73, 73.5, 733, 84, 85, 66.9, 80, 80.5, 81 – LT+EN                    | CONTENT → DATA → QA             | `modules.json`, `modules-en-m7-m9.json`; `turinio_pletra_moduliai_7_8_9.md` §1.4 |
| **M79-19**  | **P2**      | **atlikta** | M4/M7 etikos blokas: pašalinti **(67.3)**, „grįžk ten“                                                                | CONTENT                         | sk. 67, 68, 67.8                                                                 |
| **M79-20**  | **P1**      | **atlikta** | **Footer desync:** variantas A be skaičiaus M7                                                                        | CONTENT                         | sk. 66.9–8713 footers M7                                                         |
| **M79-22**  | **P2**      | **atlikta** | **Haliucinacijų benchmark duomenys (sk. 200)**                                                                        | DATA                            | `hallucinationRates.ts`                                                          |
| **M79-23**  | **P2**      | **atlikta** | **M9/M7 8 žingsnių schema:** horizontal card layout                                                                   | SCHEME → CODING                 | `M9DataWorkflowDiagram.tsx`                                                      |
| **M79-25**  | **P1**      | **atlikta** | **Resume modal desync**                                                                                               | CODING                          | `ModuleView.tsx`                                                                 |
| **M79-26**  | **P2**      | **atlikta** | **M79 PDF atmintinė evergreen**                                                                                       | CONTENT → DATA                  | `m79HandoutContent.json`, `-en.json`                                             |
| M79-27      | P2          | atlikta     | 67.7 pavadinimo fix (ne „5 žingsnių“)                                                                                 | CONTENT                         | sk. 67.7 shortTitle                                                              |

### P0 — Lygis C: pilnai adaptuotas branduolys (epic M79-32–40)

> **Spec:** `docs/development/M7_LYGIS_C_JOURNEY_EPIC.md`  
> **Fallback:** trūkstamas variantas → `pardavimai` → `modules.json` bazė (bendrinis pardavimų tekstas).  
> **Warm-up:** **ne** 6× — pakanka Tier 1–2 `copyable`.  
> **M79-40:** tas pats epic; **atskiras release po Faze 1** (RC-2 po M79-34).

| ID         | Prioritetas | Statusas  | Release | Aprašymas                                                                                  | Agentas                 | Failai / DoD                                                      |
| ---------- | ----------- | --------- | ------- | ------------------------------------------------------------------------------------------ | ----------------------- | ----------------------------------------------------------------- |
| **M79-32** | **P0**      | `atlikta` | RC-1    | CURRICULUM: 6 signature + Tier 1–3 matrica; SOT nuoroda                                    | CURRICULUM              | `M7_JOURNEY_COPY_REGISTRY.md`; `turinio_pletra_moduliai_7_8_9.md` |
| **M79-33** | **P0**      | `atlikta` | RC-1    | Infra: `modules-journey-m7.json` + schema + `resolveJourneyCopy()` + fallback `pardavimai` | DATA → CODING           | `validate:journey-m7`; unit testai                                |
| **M79-34** | **P0**      | `atlikta` | RC-1    | CONTENT Faze 1: Tier 1 — sk. **731, 733, 74, 734, 75** (6× copy)                           | CONTENT → DATA          | 84 overlay vienetai; GOLDEN_STANDARD §3.2                         |
| **M79-40** | **P1**      | `atlikta` | RC-2    | Pardavimai ≠ Rinkodara: `viz` → `viz-sales` / `viz-mkt`                                    | CURRICULUM → DATA       | `M7_VIZ_BRANCH_SPLIT.md`; sk. 70, 861, 99.9, 100–104, 106         |
| **M79-35** | **P1**      | `atlikta` | RC-3/4  | CONTENT Faze 2: Tier 2 dalinis + likę **83–92** (1 copyable × 6)                           | CONTENT → DATA          | registry + `journey-*-tier2-remaining.json`                       |
| **M79-36** | **P1**      | `atlikta` | RC-4    | Path-step **71.1–71.5** (5×6 užduotys) + `applyJourneyOverlayToPathStep`                   | CONTENT → DATA → CODING | 30 LT + 30 EN; path-step sections                                 |
| **M79-37** | **P1**      | `atlikta` | RC-4    | EN overlay: Tier 1 + Tier 2 + path-step (AI, ne DI)                                        | DATA                    | `validate:journey-en-m7`; `audit:m7-journey-coverage:en`          |
| **M79-38** | **P1**      | `atlikta` | RC-4    | QA: `audit:m7-journey-coverage` + TEST_REPORT                                              | QA                      | 31 fields × 6 LT/EN                                               |
| **M79-39** | **P2**      | `atlikta` | RC-4    | USER_JOURNEY: 6 kelių smoke — „ar jaučiasi mano rolė?“                                     | USER_JOURNEY            | 6× micro-win užfiksuota TEST_REPORT                               |
| **M79-50** | **P1**      | `atlikta` | A–C     | Rankinis smoke protokolas S1–S7 (kodo ✅; browser ⬜ savininkas)                           | QA                      | `TEST_REPORT.md` §2026-07-16 M79-50                               |
| **M79-44** | **P2**      | `atlikta` | A–C     | Sk. 97 collapsible – inline 4 principai, be „Strateginis pamatas“ meta-nav                 | CONTENT → DATA          | `modules.json` + EN; `patch-m79-plain-w4-w5.mjs`                  |
| **M79-45** | **P2**      | `atlikta` | A–C     | Plain language W4 (66.9) + W5 body batch (10 taikinių) LT+EN                               | CONTENT → DATA          | `PAPRASTOS_KALBOS_GAIRES`; `audit:m79`                            |

### P2 — Vidiniai duomenys ir praktika

| ID         | Prioritetas | Statusas    | Aprašymas                                                                                    | Agentas              | Failai / vietos                                                                                                                                         |
| ---------- | ----------- | ----------- | -------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M79-06     | P2          | atlikta     | Optional šaka **„Vidiniai duomenys“**: Excel/CRM eksportas → valymas (891) → EDA (90)        | CURRICULUM → CONTENT | `pathBranch` vidiniai + journey choice sk. 70 — **peržiūrėta M79-31**                                                                                   |
| M79-31     | P2          | atlikta     | **6 kelių sujungimas:** pašalintas 7-as journey choice; 78.5 branduolyje; Kita+vidiniai copy | USER_JOURNEY → DATA  | SOT užbaigta 2026-07-20 (`modules.json`/`modules-en-m7-m9.json` sk. 70, 78, 78.5; `audit:m7-pathbranch` invariantai; migracija `moduleJourneyFocus.ts`) |
| M79-07     | P2          | atlikta     | M9 praktika **(i) Šaltinių katalogas**                                                       | CONTENT → DATA       | M9 sk. 93                                                                                                                                               |
| M79-08     | P2          | atlikta     | M9 praktika **(ii) Savo failas**                                                             | CONTENT → DATA       | M9 sk. 93                                                                                                                                               |
| M79-09     | P2          | atlikta     | Vidinių duomenų thread M7: 78, 84, 891 cross-link                                            | CONTENT              | `modules.json` M7                                                                                                                                       |
| **M79-51** | **P1**      | **atlikta** | M9 intro + 93.1/93.2 kasdienio darbo tiltas (6 use-case, fork i/ii, įrankiai, stulpeliai)    | CONTENT → DATA       | sk. 90, 93.1, 93.2; SOT §10                                                                                                                             |
| **M79-52** | **P1**      | **atlikta** | Sample CSV + `content.sampleFile` UI download                                                | DATA → CODING        | `public/m9_sample_internal.csv`; `TestPracticeSlides.tsx`                                                                                               |
| **M79-53** | **P1**      | **atlikta** | M8 warm-up +2 vignette (Excel/CRM; 93.1 vs 93.2)                                             | CONTENT → DATA       | sk. 80, 80.5, 81                                                                                                                                        |
| **M79-54** | **P2**      | **atlikta** | Hub 99 level1 description – kasdienė nauda                                                   | CONTENT → DATA       | sk. 99 LT+EN                                                                                                                                            |
| **M79-55** | **P2**      | **atlikta** | SOT / backlog / CHANGELOG / EN sync + vartai                                                 | QA                   | `turinio_pletra_moduliai_7_8_9.md`; TEST_REPORT                                                                                                         |

### P3 — Stilius ir polish

| ID     | Prioritetas | Statusas | Aprašymas                                                                    | Agentas      | Failai / vietos                                                    |
| ------ | ----------- | -------- | ---------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------ |
| M79-10 | P3          | atlikta  | Narratyvinis sluoksnis: 1–2 sakiniai virš bullet blokų (branduolio skaidrės) | CONTENT      | M7 sk. 90, 891, 89 collapsible                                     |
| M79-11 | P3          | atlikta  | M8/M9 intro: aiškiau susieti su M7 makro-blokais                             | CONTENT      | M8 test-intro, M9 practice-intro (90)                              |
| M79-12 | P3          | atlikta  | EN overlay sinchronas po LT pakeitimų                                        | DATA         | `modules-en-m7-m9.json`, `modules-en-m4-m6.json`; `audit:m79` PASS |
| M79-28 | P3          | atlikta  | M8 pilnas slide audit (heuristinis)                                          | USER_JOURNEY | TEST_REPORT §2026-07-14 M79 iter5                                  |
| M79-29 | P3          | atlikta  | M9 hub + scenarijai audit (heuristinis)                                      | USER_JOURNEY | TEST_REPORT §2026-07-14 M79 iter5                                  |
| M79-30 | P3          | atlikta  | M7 likusios skaidrės (heuristinis GOLDEN_STANDARD gate)                      | USER_JOURNEY | Patikra: 0 naked id grep                                           |

### QA / docs

| ID     | Prioritetas | Statusas | Aprašymas                                                | Agentas | Failai                                 |
| ------ | ----------- | -------- | -------------------------------------------------------- | ------- | -------------------------------------- |
| M79-13 | P2          | atlikta  | Šis backlog dokumentas                                   | QA      | `docs/development/07_08_09_backlog.md` |
| M79-14 | P2          | atlikta  | Įrašas `TEST_REPORT.md` su nuoroda čia                   | QA      | `TEST_REPORT.md`                       |
| M79-15 | P3          | atlikta  | Po implementacijos — `CHANGELOG.md`, `TODO.md` uždarymas | QA      | CHANGELOG, TODO                        |

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

2026-07-15 — Lygis C epic (M79-32–40): 6 adaptuoti branduolio promptų rinkiniai.
Fallback = bendrinis pardavimų tekstas (pardavimai → modules.json bazė).
Warm-up ne 6×. M79-40 viz split — tas pats epic, release RC-2 po Faze 1 (M79-34).
Spec: docs/development/M7_LYGIS_C_JOURNEY_EPIC.md
```

---

## 11. Phase 2 DoD (2026-07-15) — honest priėmimas

- [x] Browser smoke M7–9 dokumentuotas (`TEST_REPORT.md` §2026-07-15)
- [x] M7 Patikra boilerplate **0** (`Jei ne — grįžk prie 2️⃣`)
- [x] M7 macro map **59** branduolio slide ids + **78.5** expansion (`m7MacroBlocks.ts`); nav etiketė `ModuleView` (pilnas M7 katalogas = 59 skaidrės su pathBranch filtru)
- [x] Vidiniai path: sk. **78.5** branduolyje (visi fokusai); 6 `journeyChoices` sk. 70 (M79-31 — SOT užbaigta 2026-07-20 po half-merge `e22a7b8`)
- [x] M9 **2× `practice-scenario`** (93.1, 93.2) su `taskFrame.doneWhen`
- [x] M8 warm-up **0** naked `Žr. M7 sk.` refs
- [x] Sprint D audit batch (`patch-m79-phase2-audit.mjs`) — M8/M9/M7 targeted fixes
- [x] `audit:m79` + `test:run` 478/478 green; `CHANGELOG.md` atnaujintas

**Skriptai:** `scripts/patch-m79-patikra-batch2.mjs`, `patch-m79-phase2.mjs`, `patch-m79-phase2-en.mjs`, `patch-m79-phase2-audit.mjs`, `patch-m79-ux-polish.mjs`, `patch-m79-ux-polish-en.mjs` — pilnas sąrašas: [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md)

---

## 12. P2 UX polish DoD (2026-07-15) — Top 5 + iteracijos 1–6

- [x] **Top 5:** M9 sk. 93/94, M7 sk. 76, 89/73, M9 99/90 — `M9WorkflowStepCopyBlock`, `linkedRowIndex` + `toolChoiceBar`
- [x] **M7 sk. 76 friction (2026-07-15):** „domenas“ → „sritis“, `comparisonStyle` iš pagrindinio flow, collapsible žemėlapis, `toolChoiceBar` scroll į promptą + hint (`ContentSlides.tsx`)
- [x] **Iter 1:** M7 etika (67, 67.5, 67.8, 67.3, 68) — collapsible, dedup, Patikra
- [x] **Iter 2:** Copyable filtrai sk. 734, 731, 733, 77; bar be `table` (`ContentSlides`)
- [x] **Iter 3:** M9 sk. 93 bookends, sk. 94 Patikra, scenarijai 101/102/111/116/117, hub 99
- [x] **Iter 4:** Optional šakos 77.5, 90, 861, 88, M7 sk. 101 (EN veidrodis)
- [x] **Iter 5:** sk. 200 dashboard intro; sk. 74 MASTER schema copy
- [x] **Iter 6:** `validate:schema` · `audit:m79` · `generate:core-data` · `test:run` **482/482**
- [x] **M79-50 smoke protokolas S1–S7** — kodo/JSON ✅ (`TEST_REPORT.md` §2026-07-16); browser ⬜ savininkas prieš release
- [ ] Rankinis 375px browser smoke (S1–S7 browser stulpelis) — `TEST_REPORT.md` ⬜

**Operacinis SOT:** [`TEST_REPORT.md`](TEST_REPORT.md) §2026-07-15 P2 · §2026-07-16 M79-50 · [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md) · `patch-m79-p2-polish*.mjs` · `patch-m79-plain-w4-w5.mjs`

---

## 13. A–C residual DoD (2026-07-16) — M79-44 / M79-45 / M79-50

- [x] **M79-44:** Sk. 97 collapsible LT+EN – inline 4 principai, be „Strateginis pamatas“ meta-nav (§4.6 #4–5 ✅)
- [x] **M79-45 W4:** Sk. 66.9 `subtitle` / `content.subtitle` / `celebrationText` / `recap` – plain („analizės eiga“, „pilnas analizės šablonas“)
- [x] **M79-45 W5:** Body batch 10 taikinių (70, 71, 73, 74, 78, 78.5, 84, 89, 92 + 66.9) LT+EN; skriptas `patch-m79-plain-w4-w5.mjs`
- [x] **M79-50:** TEST_REPORT S1–S7 lentelė; kodo/JSON ✅
- [x] Vartai: `validate:schema` · `audit:m79` · `generate:core-data` · `lint` · `test:run` **74/512**
- [ ] Browser S1–S7 @375px — savininkas (`TEST_REPORT` browser stulpelis)

**Ne scope (likę):** §4.6 #6–9; M79-46 (89/90 stretch); quiz/`copyable` žargonas; sk. 73/74 **title**.

---

## 14. Kasdienis darbas DoD (2026-07-16) — M79-51…55

- [x] Sk. 90: 6 use-case + (i)/(ii) fork be naked id
- [x] 93.2: įrankiai + sample CSV + 6 stulpelių CONTEXT + `sampleFile` UI
- [x] 93.1: 6 sektoriaus pavyzdžiai instructions
- [x] Hub 99: 0× `Neprivaloma · .` (level1)
- [x] M8: +1 warm-up, ≥2 vignette su Excel/CRM
- [x] LT+EN; patch registry; SOT §10; TEST_REPORT E1–E6
- [ ] Browser E1–E6 @375px — savininkas

**Skriptai:** `patch-m79-everyday-closeness.mjs` · `patch-m79-everyday-closeness-en.mjs` · asset `public/m9_sample_internal.csv`

---

## 10. Nuorodos

| Dokumentas                                       | Paskirtis                              |
| ------------------------------------------------ | -------------------------------------- |
| `docs/turinio_pletra_moduliai_7_8_9.md`          | Turinio SOT M7–9                       |
| `docs/MODULIO_7_SKAIDRIU_EILES.md`               | Skaidrių eilė, branduolys + pathBranch |
| `src/data/modules.json`                          | Duomenų SOT                            |
| `docs/development/GOLDEN_STANDARD.md` §3.2, §3.8 | Skaidrių seka, path-step               |
| `docs/development/USER_JOURNEY_AGENT.md`         | UX diagnostikos metodika               |
| `docs/development/PAPRASTOS_KALBOS_GAIRES.md`    | Plain language, DI terminologija       |
| `docs/development/CONTENT_AGENT.md`              | Microcopy rewrite workflow             |
| `docs/development/M79_PATCH_REGISTRY.md`         | M7–M9 patch skriptai (operacinis SOT)  |
| `docs/development/DOCS_MAINTENANCE.md`           | Dokumentacijos priežiūra               |
