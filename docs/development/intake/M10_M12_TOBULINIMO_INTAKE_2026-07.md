# M10–M12 tobulinimo intake (2026-07)

> **Fazė A – Intake.** Fiksuojame pastebėjimus / printscreen’us. **Netvarkome** JSON, copy, UI, kol neprasideda batch.  
> Live SOT: `docs/turinio_pletra_moduliai_10_11_12.md` + full `src/data/modules.json` (M10–12).  
> Kai sakysi „tvarkom batch“ → CURRICULUM / CONTENT (copy + branda) → DATA → QA.

---

## 0. Darbo ciklas

| Fazė          | Kas vyksta                                                       | Kas čia rašoma                              |
| ------------- | ---------------------------------------------------------------- | ------------------------------------------- |
| **A. Intake** | Tu kelia pastebėjimus, printscreen’us, „per sudėtinga / sumalta“ | §0.1 žurnalas + §R.\* – **be** JSON keitimų |
| **B. Batch**  | Kartu sutvarkome pagal prioritetą                                | Apdorota zona + handoff agentams            |
| **C. Sync**   | EN overlay, auditai, QA                                          | `build:modules-en-m10-m12`, `audit:m1012`   |

**Taisyklės intake metu:**

1. Fiksuojame viską – nefiltruoju „ar vėliau pravers“.
2. **Nekeiciu** `modules.json` / EN / React, kol neprasideda batch.
3. Jei prieštarauja ankstesnei – `[KONFLIKTAS]`, abi versijos.
4. Terminologija: **DI**; „promptas“; kreipinys **tu**.
5. Bendros temos batch’ui (iš starto): **per sudėtinga / per sunku / sumalta**; **copy patikra**; **promptų branda**.

### 0.1 Intake žurnalas

| #   | Data       | Modulis / skaidrė                                    | Tema                                                     | Kur       | Statusas   |
| --- | ---------- | ---------------------------------------------------- | -------------------------------------------------------- | --------- | ---------- |
| 1   | 2026-07-26 | M10 / `10.1` Kelias modulyje (UI: 2/30)              | Trumpai perkrautas; copy + branda                        | §R.M10-01 | done Wave1 |
| 2   | 2026-07-26 | M10 / `10.2` Agentų ciklas (UI: 3/30)                | Info kartojasi; branda per žema                          | §R.M10-02 | done Wave1 |
| 3   | 2026-07-26 | M10 / `10.25` 3A strategija (UI: 6/30)               | „Kur pritaikyti“ buva / per paprasta; verslo vertė       | §R.M10-03 | done Wave1 |
| 4   | 2026-07-26 | M10 / `10.3` Rolės ir sisteminis promptas (UI: 8/30) | Redagavimo klaidos; silpna skaidrė; branda               | §R.M10-04 | done Wave1 |
| 5   | 2026-07-26 | M10 / `10.45` DI agentų tipai ir rolės (UI: 9/30)    | Turinio + schemos branda; schema ≠ etalonas              | §R.M10-05 | done Wave1 |
| 6   | 2026-07-26 | M10 / `10.48` 5 darbo eigos šablonai (UI: 11/30)     | Labai supaprastinta; kuris turimas įrankis?              | §R.M10-06 | done Wave1 |
| 7   | 2026-07-26 | M10 / `10.482`+`10.481`+`10.49`                      | Recap be orkestravimo; 10.49 Trumpai+image; Blokai siena | §R.M10-07 | done Wave2 |
| 8   | 2026-07-26 | M10 / `10.4`+`10.5`+`10.6`                           | docs/§ spill; medis×2; 10.5 spec spill; Neverk           | §R.M10-08 | done Wave2 |
| 9   | 2026-07-26 | M10 / `10.15`+`10.35`+`10.36`                        | Kur pritaikyti trūksta; §21 docs ref                     | §R.M10-09 | done Wave2 |
| 10  | 2026-07-26 | M10 / `10.64`+`10.65`                                | paleidiklis; 10.65 sumalta + docs/§ + medis echo         | §R.M10-10 | done Wave2 |
| 11  | 2026-07-26 | M10 / `10.485`+`10.61`+`10.66`+`10.7`+`10.8`         | OK / skip (smoke); 10.8 taksonomija→gylis                | §R.M10-11 | done Wave2 |
| 12  | 2026-07-26 | M10 / `10.482` orkestravimo schema (UI: 13/30)       | Label clearance + roles Tyrėjas/Rašytojas/Tikrintojas    | §R.M10-12 | done       |

---

## RAW – pastebėjimai (neatidaryta į pataisas)

### R.M10-01 – Skaidrė `10.1` „Kelias modulyje“ (2/30)

**UI kontekstas (iš printscreen / copy paste):**

- Nav: Pakartotinė peržiūra · Kelias modulyje · „Trumpa apžvalga; detalė – tolesnėse skaidrėse“
- Progress: 2 / 30 · CTA: Tęsti: Agentų ciklas
- Blokai: Trumpai → Greita pergalė 60 sek. → Kopijuojamas promptas → Patikra

**JSON anchor:** `modules.json` slide `id: 10.1`, `shortTitle: "Kelias modulyje"`, `type: content-block`.

**Pastebėjimas (testeris):**

- **Per sudėtinga / per sunku / sumalta** – ypač „Trumpai“ body: ilgas eilės sąrašas (agentų ciklas, 3A, tipai/rolės, 5 workflow, sisteminis promptas, įrankiai, kada rinktis, klaidos, workflow sąvokos + platformos + PaaS + neprivaloma…).
- Reikia batch’e **patikrinti copy** (aiškumas, skenuojamumas, ar roadmap skaidrė turi būti „katalogas“ ar „žemėlapis“).
- Reikia **patikrinti brandą** greitosios pergalės copyable promptui (fit-for-purpose vs per ankstyvas/per sunkus startui).

**Darbinė hipotezė (ne sprendimas):**

- „Trumpai“ dabar = mini syllabus vienoje pastraipoje → kognityvinė perkrova prieš diagramą (`10.2`).
- Micro-win (60 sek. + copyable) gali likti, bet Trumpai greičiausiai reikia sutraukti / struktūruoti batch’e.
- Branda: copyable klausia skirtumo agentas vs Q&A + darbo pavyzdžio – tinkama micro-win, bet vertinti ar Patikra / framing ne per anksti krauna terminus.

**Siūlomas batch savininkas vėliau:** CONTENT (copy + branda) → gal CURRICULUM jei keičiasi skaidrės rolė → DATA (LT+EN).

**Statusas:** open · **Netaisyta.**

### R.M10-02 – Skaidrė `10.2` „Agentų ciklas“ (3/30)

**UI kontekstas:**

- Title: Agentų ciklas · subtitle: Agentas → Planavimas → Įrankiai → Aplinka → Rezultatas → Grįžtamasis ryšys
- Progress: 3 / 30
- Blokai: Trumpai → diagrama „Kaip veikia DI agentas“ → „Kaip veikia agentas“ → „Kada naudoti agentą (trumpai)“ → Daryk dabar → copyable → Patikra

**JSON anchor:** `modules.json` slide `id: 10.2`, `shortTitle: "Agentų ciklas"`, `image: agent_workflow_diagram`.

**Pastebėjimas (testeris):** info kartojasi; reikia peržiūrėti ir **didinti brandą**.

**Kas blogai (diagnozė – ne pataisa):**

1. **Tas pats ciklas × 4–5 sluoksniuose**
   - Subtitle jau išvardija 5 žingsnius.
   - „Trumpai“ = tie patys 5 žingsniai + skirtumas nuo Q&A.
   - Diagrama + step panelis = vėl tie patys 5 žingsniai su paaiškinimais.
   - „Kaip veikia agentas“ = **dar kartą** (1)…(5) + „Ciklas praktikoje“ + **vėl** skirtumas nuo paprasto pokalbio (beveik tas pats sakinys kaip Trumpai).
   - Copyable + Patikra = dar kartą „įvardyk 5 žingsnius + skirtumą nuo Q&A“.

2. **Persidengimas su gretimomis skaidrėmis**
   - `10.1` micro-win jau klausė: agentas vs Q&A.
   - `10.2` copyable / Patikra klausia **to paties** (+ 5 žingsniai).
   - Blokas „Kada naudoti agentą (trumpai)“ – teaser į vėlesnę skaidrę „Kada rinktis agentą…“ → ankstyvas spill + dubliuoja ateities pamoką.

3. **Branda per žema (fit-for-purpose)**
   - Copyable = „paaiškink savo žodžiais“ katalogą, kurį ką tik skaičiau diagramaje – **atpasakojimas**, ne taikymas darbe.
   - Nėra: savo proceso pavyzdžio, įrankio pasirinkimo, „kur čia grįžtamasis ryšys“, klaidos / kartojimo sprendimo.
   - Po diagramos interactive (jau moko žingsnius) užduotis neturėtų kartoti labelių – turėtų **naudoti** ciklą.

4. **Struktūros triukšmas**
   - Du panašūs heading’ai: „Kaip veikia DI agentas“ (diagrama) vs „Kaip veikia agentas“ (tekstas) – atrodo kaip dublikatas, ne kaip „schema vs giliau“.
   - API apibrėžimas įterptas į tą patį brand bloką – gerai, bet skęsta pakartotame cikle.
   - Skaidrė daro 3 darbus: išmokyk ciklą + kada rinktis agentą + micro-win Q&A – **sumalta**.

**Darbinė hipotezė batch’ui:**

- Viena vieta ciklo išvardijimui (diagrama / Trumpai) – tekstas tik **nauja** reikšmė (API, loop/kartojimas, skirtumas 1 sakiniu).
- „Kada naudoti“ – iškelti / palikti tik pointerį, be bullet’ų (turinys vėliau).
- Copyable brandinti: darbo scenarijus per 5 žingsnius **arba** „kur čia įrankis / grįžtamasis ryšys“, ne „išvardyk žingsnius“.
- Q&A skirtumas – nebekartoti jei `10.1` jau padarė micro-win (arba Patikra tik ciklo žingsniams).

**Siūlomas batch savininkas:** CONTENT (dedupe + branda) → CURRICULUM (ar „Kada naudoti“ lieka) → DATA (LT+EN).

**Statusas:** open · **Netaisyta.**

### R.M10-03 – Skaidrė `10.25` „3A strategija“ (6/30) – „Kur pritaikyti“

**UI kontekstas:**

- Title: 3A strategija · subtitle: Automatize 80 % / Augment 15 % / Autonomize 5 %
- Progress: 6 / 30 · CTA: Tęsti: tvirtina žmogus
- Blokai: Trumpai → Trys juostos → diagrama → Pavyzdys → Daryk/šablonas → Patikra → **Kur pritaikyti** (collapsible)

**JSON anchor:** `modules.json` slide `id: 10.25`, `image: m10_three_a_strategy`; „Kur pritaikyti“ = `collapsible: true`, `collapsedByDefault: true`.

**Pastebėjimas (testeris):**

- „Kur pritaikyti“ – **kaip peiliu nupjauta**, **per buka**, **per paprasta**, palieka vartotoją nesupratusį.
- Reikia **padidinti vertę verslui** (ne tik pakartoti 80/15/5).

**Dabartinis body (1 sakinys):**  
„Planuojant verslo automatizavimą – kurių procesų pakanka tik taisyklėms (80 %), kuriems reikia žmogaus patvirtinimo (15 %), kur galima leisti agentui veikti su ribomis (5 %).“

**Kas blogai (diagnozė – ne pataisa):**

1. **Nulis naujos reikšmės** – sakinys tik perpasakoja juostų %; tai jau yra Trumpai + diagrama + „Trys juostos“ + Pavyzdys + Patikra.
2. **„Kur pritaikyti“ žada kontekstą, duoda abstrakciją** – „planuojant automatizavimą“ be: kurios funkcijos (ops, CS, sales), kokie KPI (klaidos, SLA, kaina), ką daryti pirmą savaitę, ko vengti (viską Autonomize).
3. **Per buka / peiliu nupjauta** – nėra tiltelio į sprendimą („kaip pradėti portfelį“); baigiasi ten, kur turėtų prasidėti verslo pritaikymas.
4. **Collapsible + silpnas turinys** = dviguba bausmė: slepiama sekcija, o viduje nieko, ko nebuvo aukščiau → atidarius dar silpniau.
5. **Prasilenkia su Daryk** – šablonas jau prašo 3 procesų; „Kur pritaikyti“ turėtų **pakelti** (portfelis, rizikos, biudžetas), ne kartoti priskyrimą.

**Kaip padidinti verslo vertę (hipotezės batch’ui – ne copy draft):**

| Kryptis            | Ko trūksta dabar | Ką galėtų duoti „Kur pritaikyti“                                                                              |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Portfelis          | Tik % etiketės   | „Pirmiausia inventorizuok 10 procesų → 80 % taisyklės; agentus tik ten, kur ROI > rizika“                     |
| Rizika / kaina     | „brangu“ Trumpai | Konkrečiai: klaidos kaina, branduolio vs eksperimentas, eskalacija                                            |
| Funkcijos          | Nėra             | CS / ops / sales pavyzdžiai po 1 eilutę (be spill į visą M10)                                                 |
| Sprendimo taisyklė | Nėra             | „Jei reikia atsakomybės parašo → Augment; jei šablonas stabilus → Automatize; Autonomize tik su riba + audit“ |
| Kitas žingsnis     | CTA į 10.26      | Aiškus tiltelis: po 3A → „Kada tvirtina žmogus“ = Augment juostos detalė                                      |

**Pastaba:** pati skaidrė (diagrama + Daryk) atrodo brandesnė už uodegą; problema koncentruota **„Kur pritaikyti“ + galimas dubliavimas „Trys juostos“ vs diagrama**, ne būtinai visame 3A.

**Siūlomas batch savininkas:** CONTENT (vertės copy / ar collapsible verta) → DATA (LT+EN).

**Statusas:** open · **Netaisyta.**

### R.M10-04 – Skaidrė `10.3` „Rolės ir sisteminis promptas“ (8/30)

**UI kontekstas:**

- shortTitle / nav: Rolės ir sisteminis promptas · subtitle: Kaip nustatyti rolę ir ribas agentui
- Progress: 8 / 30 · CTA: Tęsti: DI agentų tipai
- Blokai tik: Trumpai → Daryk dabar → Kopijuojamas promptas → Patikra  
  (nėra Pavyzdžio, „Kur pritaikyti“, M4–M6 tiltelio)

**JSON anchor:** `modules.json` slide `id: 10.3`.  
**Title JSON:** „Rolės ir sisteminio prompto šablonas“ ≠ UI shortTitle „Rolės ir sisteminis promptas“.  
**SOT:** `turinio_pletra_moduliai_10_11_12.md` §4.1.

**Pastebėjimas (testeris):** yra **redagavimo klaidų**, **silpna skaidrė**.

**Kas blogai (diagnozė – ne pataisa):**

1. **Redagavimas / sync su SOT**
   - SOT Daryk turi konkretų pavyzdį: „Ieškok [X] ir pateik santrauką su šaltiniais“ → JSON truncintas iki „užduok vieną agentinę užklausą“ (be užduoties).
   - SOT Trumpai: „Čia – paprastas sisteminis promptas; kelių agentų rolės – 10.45“ → JSON prarasta (nėra tiltelio į taksonomiją).
   - SOT turi **Kur pritaikyti** + **Ryšys su konteksto inžinerija** (M4–M6) → JSON **nėra** – skaidrė „nupjauta“.
   - Title vs shortTitle nesutampa (šablonas vs be „šablono“).

2. **Struktūra per plona (silpna skaidrė)**
   - Subtitle žada „rolę ir ribas“ – body beveik nieko nepaaiškina apie **ką rašyti** sisteminiame (rolė / ribos / įrankiai / trūkumas) – tik vienas abstraktus Trumpai sakinys.
   - Nėra bloko „kas įeina į sisteminį promptą“ (checklist) prieš copyable.
   - Po 3A / žmogaus kontrolės – staiga generic copy → jump į 10.45; mokymosi tiltelis silpnas.

3. **Branda / copyable per buka**
   - Rolė = „asistentas, kuris atlieka užduotis žingsnis po žingsnio“ – generinis, ne verslo rolė, ne ribos, ne eskalacija (nors subtitle = ribos).
   - Nėra vietos `[TAVO ROLĖ]`, domenui, draudimams, žmogaus tvirtinimui (Augment tiltelis iš 10.26).
   - Fit-for-purpose: turėtų būti **šablonas su kintamaisiais**, ne gatavas „generic assistant“.

4. **Smulkios copy pastabos**
   - „Neišsivaizduok duomenų“ – keista formulė (įprastai „neišgalvok“ / „neprigalvok“); batch’e patikrinti ar tyčia.
   - Patikra = troubleshooting platformos (Browse/Tools) – OK, bet be sėkmės kriterijaus „ką turi matyti gerame atsakyme“ (žingsniai / šaltiniai / „Nežinau“).
   - Daryk: „jei toks yra“ – silpnas CTA; nėra fallback kai platforma neturi system field (įklijuok kaip pirmą žinutę).

**Darbinė hipotezė batch’ui:**

- Atkurti SOT trūkstamus sluoksnius (pavyzdinė užduotis, Kur pritaikyti / M4–M6 tiltelis, pointer į 10.45) – be perkrovos.
- Pridėti 3–4 eilučių „sisteminio anatomija“ (rolė, ribos, įrankiai, trūkumas) → tada brandesnis copyable su placeholderiais.
- Title/shortTitle suvienodinti.
- CONTENT brandos peržiūra vs M4/M7 system-prompt etalonai (jei yra).

**Siūlomas batch savininkas:** CONTENT (SOT sync + branda) → DATA (LT+EN) → gal CURRICULUM jei pridedami blokai.

**Statusas:** open · **Netaisyta.**

### R.M10-05 – Skaidrė `10.45` „DI agentų tipai ir rolės“ (9/30)

**UI kontekstas:**

- Title: DI agentų tipai ir rolės · subtitle: Gylio lygiai ir kelių agentų rolės verslui
- Progress: 9 / 30
- Blokai: Trumpai → lab „Gylis ir komandos rolės“ (`m10_agent_taxonomy`) → Daryk → Patikra → „Kada nenaudoti kelių agentų“ (collapsible)
- Lab: L0–L3 ChoiceControl + mini schema + copyable artefaktas lab viduje

**JSON / registry anchor:**

- Slide `id: 10.45`, `image: m10_agent_taxonomy`
- Pattern: `interactive-control-lab`, Shell = **Ne** (W5 dual-taxonomy Shell superseded)
- Render: `M10DepthRolesLabBlock` + `M10DepthRolesMiniDiagram`
- Registry pastaba: Hybrid **8/10** (`DIAGRAMU_M7_M12_REGISTRY`)

**Pastebėjimas (testeris):**

- Reikia padirbėti su **turinio ir schemos brandumu**.
- Schema **kol kas neatitinka etalono**, nors **neblogai**.

**Kas blogai / kur branda (diagnozė – ne pataisa):**

1. **Schema ≠ LMS etalonas (SCHEME)**
   - Mini SVG jau geresnis už seną 8-step Shell explore, bet testeris vis dar mato atotrūkį nuo process etalonų (pvz. `10.2` AgentWorkflow / DiagramKit LMS 1A: tip≥10, shaft floors, caption air, flat brand, verb edges).
   - Hybrid sąmoningai **ne** Shell spine – etalonas čia = **lab brother** (10.26 ChoiceControl + optional mini iliustracija), ne W7 orkestratorius; batch’e aiškiai matuoti vs teisingą etaloną, ne vs process Shell.
   - Istoriniai polish debt’ai (lessons): role-strip ghost verbs, process tip router, pill/gap – dalis jau taisyta 2026-07-24; likęs „ne etalonas“ jausmas = vizualinis brandos / densumo / hierarchijos auditas, ne Pattern rollback į Shell.
   - Role strip matomas tik ant Komanda – OK pedagogikai; batch’e patikrinti ar L0–L3 pill eilė skaitosi kaip sprendimo ašis (ne dekoratyvus ladder).

2. **Turinio branda (CONTENT)**
   - Lab UX kryptis gera (procesas → gylis → artefaktas).
   - Chrome kartojasi: Trumpai jau sako Pokalbis→…→Srautas; image body „Pasirink gylį…“; Daryk vėl „Pasirink gylį…“ + rolės – **šiek tiek sumalta** aplink lab.
   - Verslo vertė: L0–L3 aprašai lab’e trumpi (gerai), bet skaidrėje mažai **sprendimo taisyklės** (kada L1 vs L2 vs L3 vs 3A / žmogaus kontrolė) – rizikuojama, kad vartotojas spaudžia L3 „nes skamba galingai“.
   - „Kada nenaudoti kelių agentų“ – naudingas, bet collapsible; brandos klausimas ar anti-pattern turi būti ryškesnis (ne paslėptas).
   - Copyable lab viduje (GOLDEN §3.1c) – OK; brandinti artefaktą: ar „Vienas sakinys kodėl“ pakanka prieš path-step 10.451 (įvestis/išvestis)?

3. **Kas jau gerai (fiksuoti, kad batch’e neardytume)**
   - Pattern lab + Shell=Ne (nebegrįžti į dual-taxonomy Shell).
   - Plain Pokalbis/Agentas/Komanda/Srautas (be jargon „taksonomija“ UI).
   - Copy lab viduje, ne atskira content-block siena.
   - Tiltelis į kontrolinį tašką 10.451.

**Darbinė hipotezė batch’ui:**

- **SCHEME:** UI_UX + SCHEME auditas mini diagram vs lab-etalon checklist (ne W5 resurrect); polish iki „etalono jausmo“ (tip/shaft/air/role strip).
- **CONTENT:** sutraukti chrome aplink lab; stiprinti gylio pasirinkimo taisyklę + anti-L2/L3; artefakto branda vs 10.451 padalijimas.
- **Ne:** keisti Pattern / vėl Shell 8-step.

**Siūlomas batch savininkas:** SCHEME (+ UI_UX) → CONTENT → DATA (jei copy) → CODING.

**Statusas:** open · **Netaisyta.**

### R.M10-06 – Skaidrė `10.48` „5 darbo eigos šablonai“ (11/30)

**UI kontekstas:**

- Title: 5 darbo eigos šablonai verslui · subtitle: Grandinė, maršrutizavimas, lygiagretus, koordinatorius, vertintojas
- Progress: 11 / 30 · CTA: Tęsti: workflow
- Blokai: Trumpai → **numeruotas tekstinis sąrašas „5 šablonai“** → Daryk → copyable (tik koordinatorius) → Patikra → „Kada nenaudoti…“
- **Nėra** `image` key / diagramos / lab / ChoiceControl – grynas content-block

**JSON / SOT:** `id: 10.48`; SOT §3b3 (tikslas = kada taikyti kiekvieną); po jos `10.485` warm-up, tada `10.482` orkestratorius. Registry: **nėra** 10.48 eilutės (tik 10.482 / 10.65 ir pan.).

**Pastebėjimas (testeris):**

- **Labai supaprastinta** skaidrė.
- Klausimas: **gal reikia kokį įrankį naudoti iš turimų?** Low hanging fruits?

**Kas blogai (diagnozė):**

1. Penki topologiniai šablonai = **sprendimo katalogas**, bet UI = wall of text – skaitosi kaip santrauka, ne kaip pasirinkimo įrankis.
2. Daryk sako „pasirink šabloną“, bet UI **nepadeda pasirinkti** (nėra picker).
3. Copyable **tik #4 koordinatorius** – kiti 4 šablonai be artefakto → asimetrija / branda skylė.
4. Po 10.45 (lab) staiga regresija į pasyvų sąrašą – kelionės jausmas krenta.
5. 10.485 quiz tikrina šablonų atpažinimą – 10.48 turėtų **paruošti** atpažinimą vizualiai / interaktyviai.

**Turimi įrankiai – LHF rangavimas (hipotezės batch’ui, ne sprendimas):**

| Prioritetas      | Įrankis / Pattern                                                                                                               | Fit   | Effort                                  | Pastaba                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **LHF-1**        | **Brother of `10.45` `interactive-control-lab`** – ChoiceControl ×5 šablonai + mini topologijos iliustracija + Copy lab viduje  | ★★★★★ | Medium (naujas lab Block + Feature Doc) | Tas pats job: pasirink → pamatyk → nukopijuok. Brand-only, Shell=Ne. Geriausias pedagoginis match.                                  |
| **LHF-2**        | **`toolChoiceBar` embed** (chips / prompt-tool stilius) – pasirink šabloną → `whenHint` + linked `copyable`                     | ★★★★  | Low–medium                              | Be Shell; kind=embed; Feature Doc lab **nereikia** jei lieka embed. Mažiau „schema“, daugiau picker+copy. Greičiausias vertės lift. |
| **LHF-3**        | **CONTENT-only** – struktūruoti 5 korteles (Kada / Pvz / Ne tada) + 5 copyable variantai (arba vienas šablonas su `[ŠABLONAS]`) | ★★★   | Low                                     | Jokio naujo Pattern; vis tiek LHF jei nenorim CODING dabar.                                                                         |
| Vengti / netinka | **`WorkflowComparison` (M1/15)**                                                                                                | ★     | —                                       | Basic vs Workflow – **kitas job**; ne 5 multi-agent šablonai.                                                                       |
| Vengti dabar     | **`m10_agent_orchestrator` (10.482)**                                                                                           | ★★    | High                                    | Ateina **po** 10.48; full Shell W7 – per sunkus „katalogui“; spill.                                                                 |
| Ribotas          | **M9 `M9WorkflowStepCopyBlock`**                                                                                                | ★★    | —                                       | Step-sync copy prie vienos schemos; čia reikia **5 topologijų picker**, ne DA žingsnių.                                             |
| Ribotas          | **ProcessStepper / linear-process**                                                                                             | ★★    | —                                       | Tinka tik Grandinei; kitos 4 topologijos nelinear.                                                                                  |

**Rekomenduojama kryptis batch diskusijai:**

1. Pirmas LHF: **LHF-2 embed picker** (greita) **arba** LHF-1 lab brother 10.45 (jei norim vizualų brandos kaip depth/roles).
2. Turinyje bet kuriuo atveju: **šablono-specifinis** copy (ne tik koordinatorius) + „kada / kada ne“ vienoje eilutėje prie kiekvieno.
3. Nepradėti naujo Pattern be Feature Doc, jei einam į lab.

**Siūlomas batch savininkas:** CURRICULUM (ar lab vs embed) → CONTENT → SCHEME (jei mini topologijos) → CODING → DATA → QA.

**Statusas:** open · **Netaisyta.**

### R.M10-12 – Skaidrė `10.482` „Agentų orkestravimo simuliacija“ (13/30) – schema label × arrow

**UI kontekstas (printscreen 2026-07-26):**

- Title: Agentų orkestravimo simuliacija · progress 13/30 · žingsnis **3/6 Orkestratorius** (violetinė fokusinė).
- Image: `m10_agent_orchestrator` (Shell + StepNav).
- Matomi edge/group labeliai: **„parenka srautą“** (Maršrutizatorius → Orkestratorius), **„paskiria agentus“**, **„Vykdymo agentai“** (grupė virš Tyrimas / Sąrašas / Tikrinimas).

**Pastebėjimas (testeris):**

1. **„parenka srautą“** – tekstas **kertasi su vertikalia rodykle** tarp Maršrutizatoriaus ir Orkestratoriaus (shaft eina per labelį).
2. **„Vykdymo agentai“** – grupės labelis **kertasi / per arti** su vertikalia jungtimi į vykdymo agentų bloką (rodyklė į „Tyrimas“ zoną).
3. **„Kartoti“** (žingsnis 5) – retry pill užlipa ant **Sąrašas** bloko (midY ant agentų eilės).
4. **Samprata (pending):** Vykdymo agentai = rolės, ne etapai → Tyrėjas / Rašytojas / Tikrintojas (ne tik rename).

**Kas blogai (diagnozė):**

- LMS polish residual po Wave2 content: edge/group labels vs orthogonal shafts (ne naujas Pattern).
- Cap: micro geometry (offset / side-of-shaft / air), ne W7 redesign.
- Role rename = CONTENT + labels sync, ne tik geometrija.

**Siūlomas savininkas (kai sakysi tvarkyti):** SCHEME → CODING → QA (`lmsMultiAgentPolish`); roles → CONTENT.

**Statusas:** done · 2026-07-26 – patvirtina above boxes; perduoda off-trunk; parenka pad; band right of research drop; Kartoti lower-third; roles Tyrėjas/Rašytojas/Tikrintojas (EN Researcher/Writer/Checker).

---

## Batch backlog (pildoma intake metu; vykdymas vėliau)

| Prioritetas | ID     | Trumpai                                                                         | Agentai                              |
| ----------- | ------ | ------------------------------------------------------------------------------- | ------------------------------------ |
| —           | M10-01 | `10.1` Trumpai sutraukti + copy/branda peržiūra                                 | CONTENT → DATA                       |
| —           | M10-02 | `10.2` dedupe ciklo copy + brandesnis copyable; „Kada naudoti“ spill            | CONTENT → CURRICULUM → DATA          |
| —           | M10-03 | `10.25` „Kur pritaikyti“ – verslo vertė, ne 80/15/5 pakartojimas                | CONTENT → DATA                       |
| —           | M10-04 | `10.3` SOT sync + anatomija + brandesnis system prompt šablonas                 | CONTENT → DATA                       |
| —           | M10-05 | `10.45` schemos LMS/lab etalono polish + turinio gylio taisyklė                 | SCHEME → CONTENT → DATA              |
| —           | M10-06 | `10.48` LHF: picker (lab 10.45 brother **ar** toolChoiceBar) + copy per šabloną | CURRICULUM → CONTENT → CODING → DATA |

---

## Kai batch startuos

1. Peržiūrėti visą §0.1 + §R.\*
2. Suvienodinti prioritetus (P0 = sumalta / branda, P1 = copy polish)
3. Vienas batch PR / sesija – ne pavieniai „tuoj pataisysiu“

---

## B – Wave 1 apdorota zona (I0 juodraščiai → I1–I6)

> Patvirtinta planu `m10_wave1_iterations` (2026-07-26). Žemiau – CONTENT stuburai prieš / su DATA.

### B.10.1 – Kelias modulyje

- Trumpai = MUST žemėlapis (ne syllabus dump) + 1 eilutė neprivaloma + pointer į Pagrindinės sąvokos.
- Micro-win lieka (agentas vs Q&A + darbo pvz.).

### B.10.2 – Agentų ciklas

- Trumpai = 1 sakinys + skirtumas; ciklas = diagrama.
- Tekstas „API ir kartojimas“ (ne 1–5 echo).
- „Kada naudoti“ → tik pointeris.
- Copyable = savo procesas per ciklą + kur įrankis.

### B.10.25 – 3A Kur pritaikyti

- Portfelio taisyklė + juostos taisyklė + tiltelis į „Kada tvirtina žmogus?“.
- `collapsedByDefault: false`.

### B.10.3 – Sisteminis promptas

- Title = shortTitle; anatomija 4 punktai; šablonas su `[ROLĖ]`/`[RIBOS]`; SOT pavyzdinė užduotis; Kur pritaikyti + M4–M6 tiltelis.

### B.10.45 – Gylis / rolės

- Chrome dedupe; gylio taisyklė Trumpai + lab; anti-multi atviras; mini SVG flat + caption air + max-w-5xl.

### B.10.48 – 5 šablonai

- `toolChoiceBar` + 5× whenHint + 5× linked copyable (embed).

---

## B2 – Wave 2 apdorota zona (A0 auditas → B1–B4) ✅ done Wave2

> Planas `m10_wave2_iterations`. Fix 2026-07-26: LT `modules.json` + EN dual-source + C0 gates.

### R.M10-07 / B1 – Orkestravimas ✅

- `10.481` recap/celebration + orkestravimas (KUR vs KAIP).
- `10.482` Patikra sutraukta; collapsible be jargon spill.
- `10.49` Trumpai be image; diagrama atskirai; „Blokai paprastai“ collapsible.

### R.M10-08 / B2 – Įrankiai / promptai ✅

- `10.4` be docs/§21; medis first + pointer į 10.35.
- `10.5` workflow spec → pointer į 10.64; „Neišgalvok“ / „Nerašyk“.
- `10.6` „Nerašyk“; Trumpai accent.

### R.M10-09 / B3 – Workflow / platformos ✅

- `10.15` + „Kur pritaikyti“.
- `10.35`/`10.36`/`10.37` – be §21 / docs path.

### R.M10-10 / B4 – Spec uodega ✅

- `10.64` „paleidiklis“ → Trigger.
- `10.65` Trumpai + optional; 10 scenarijų collapsible; be medis echo + docs/§.
- `10.8` intro/sections: „gylis“ ne „taksonomija“.

---

## Post-Wave2 schema polish (open)

| ID         | Skaidrė  | Trumpai                 | Statusas         |
| ---------- | -------- | ----------------------- | ---------------- |
| **M10-12** | `10.482` | Label clearance + roles | done · §R.M10-12 |
