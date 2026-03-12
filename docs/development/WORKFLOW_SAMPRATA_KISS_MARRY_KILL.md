# Workflow Samprata – Kiss / Marry / Kill analizė ir UI/UX rekomendacijos

> **Principas:** Mažiau yra daugiau. Skaidrė turi vieną aiškų pranešimą ir vieną micro-win – kitaip vartotojas pasimeta, vieta tampa nuobodi.
> **Skaidrė:** Modulis 1, skaidrė id 15, tipas `workflow-summary`, interaktyvus `WorkflowComparisonInteractiveBlock`.
> **Kontekstas:** Ši schema yra **pirmoji schema visame mokymų modulyje** (opening scheme). Už ją dalyviai mokėjo – turi atitikti aukščiausią kokybę ir geriausias praktikas. Pilnas „opening scheme“ reikalavimų ir spragų sąrašas: `docs/development/WORKFLOW_SAMPRATA_UX_AUDITAS.md` §9.

---

## 1. Kodėl vartotojas pasimeta ir „nuobodu“

| Priežastis | Kas vyksta |
|------------|------------|
| **Per daug blokų iš eilės** | Intro + toggle + framing + diagrama + LLM info + explanation card + decision block (6 bullet) + Section 3 (inputs + 3 output types + preview) + micro task + 2 pavyzdžiai. Vienoje skaidrėje ~10+ skirtingų regionų. |
| **Dvigubas paaiškinimas** | Tas pats „Pokalbis vs Workflow“ pasakomas: intro tekste, framing sakinio, consequence eilutėje, explanation kortelėje, decision bloke (6 punktų), outputExample ir noteText. |
| **Sunkus pirmas įspūdis** | Ilgas intro (2 sakiniai + CTA) + iš karto didelė schema + daug tekstų – nėra vieno „aha“ momento, o yra „skaityk viską“. |
| **Pasirinkimo paralyžė** | Workflow režime: PROMPTAS, DUOMENYS, REZULTATO TIPAS (Dokumentas/Planas/Analizė) + preview – atrodo kaip užduotis, ne kaip greitas „pamatyk skirtumą“. |
| **Micro-win užgožtas** | Tikrasis CTA („Perjunk į Workflow ir įrašyk 3–5 žodžius“) paslėptas tarp intro, framing ir decision block – vartotojas nežino, kur pradėti. |

**Išvada:** Turinio ir UI per daug. Reikia **Kiss (palikti)** – vieną pranešimą ir vieną veiksmą; **Marry (priimti)** – aiškų skirtumą ir vieną micro-win; **Kill (pašalinti / sutraukti)** – visą, kas kartojasi ar atideda „aha“.

---

## 1.1 Kodėl vartotojas gali **nepaspausti** Workflow mygtuko (trūksta UI/UX įžvalgų)

Skaidrė siūlo **du kelius** (Pokalbis ir Workflow), bet antrasis kelias gali likti nepaspaustas – ne dėl turinio pertekliaus, o dėl **vizualinio nepatrauklumo**.

| Problema | Kas dabar | Kodėl blogai |
|----------|-----------|---------------|
| **Mygtukas neįvaizdus** | Toggle – pilkas konteineris (`bg-gray-100`), maži mygtukai, `font-mono uppercase` – atrodo kaip techninis perjungiklis, ne kaip „pabandyk šį kelią“. | Vartotojas nematė kvietimo spausti Workflow; abu variantai vizualiai vienodi (tik spalva pasirinktam – emerald/accent). Nepasirinktas Workflow – pilkas, neryškus. |
| **Schema nepatraukli** | Diagrama ant šviesiai pilko fono (`bg-gray-50/80`), spalvos – brand (#334e68), emerald, neutral – ramios, bet **nespalingos**. Atrodo kaip „informacinė schema“, ne kaip „čia įdomu – pabandyk“. | Nėra vizualinio „šaukimo“ – kur žiūrėti, ką daryti toliau. Workflow režimo schema vizualiai neatsiriboja nuo Pokalbio. |
| **Nespalvinga** | Dominuoja pilka, brand mėlyna, vienas emerald – nėra šilto akcento, kuris trauktų į veiksmą („spausk čia“). | Antras kelias (Workflow) turi **atrodyti įdomiai** – spalva, šiek tiek „žalias / CTA“ signalas, kad „čia yra kitas režimas, pabandyk“. |

**Kodėl to nebuvo ankstesniame audite:** Auditas sutelkęs į turinio kiekį, terminologiją ir struktūrą; vizualinio **kvietimo** (affordance) ir **antra kelio patrauklumo** nebuvo aiškiai įtraukta. Reikia papildyti: mygtukas ir schema turi būti **įvaizdingi ir spalvingi**, kad vartotojas **norėtų** paspausti Workflow ir pamatyti skirtumą.

**Rekomendacijos (trumpai):**
- Toggle: Workflow mygtukas nepasirinktas – ne pilkas, o **šiek tiek ryškesnis** (pvz. outline emerald, „Pabandyk Workflow“), kad atrodytų kaip kvietimas.
- Schema: Workflow režime – **šiltesnės / ryškesnės** spalvos (emerald akcentas stipresnis), gal net nedidelis „žalias“ border arba glow aplink diagramą, kai pasirinkta Workflow.
- CTA vienas: Po schema **vienas** ryškus blokas (accent): „Perjunk į Workflow ir įrašyk kelis žodžius“ – ne tik tekstas, o vizualiai paryškintas kvietimas.

---

## 2. Kiss – Marry – Kill (turiniui ir UI)

### KISS (palikti – būtina, mažai)

| Elementas | Kodėl palikti |
|-----------|----------------|
| **Toggle Pokalbis / Workflow** | Vienintelis aiškus pasirinkimas – vartotojas mato, kad yra du režimai. |
| **Schema (diagrama)** | Vizualiai parodo skirtumą (įvestis → LLM → išvestis) – vienas „aha“ vaizdas. |
| **Vienas trumpas CTA** | „Perjunk į Workflow ir įrašyk kelis žodžius – pamatysi, kaip keičiasi rezultatas.“ Tai turi būti **vienintelis** akcentuotas veiksmas. |
| **Consequence line** (po toggle) | Viena eilutė: „Rezultatas bus laisvos formos“ vs „Rezultatas bus struktūruotas“ – pakanka, kad suprastų pasekmę. |

### MARRY (priimti – pagrindinė žinutė ir viena struktūra)

| Ką „vesti“ | Kaip |
|------------|------|
| **Vienas pranešimas** | „Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas.“ Tai **vienintelė** didelė mintis – framing sakinys arba intro, bet ne abu ilgai. |
| **Vienas micro-win** | Toggle + (optional) vienas laukas „Įrašyk 3–5 žodžius“ → matai pavyzdį. Be PROMPTAS + DUOMENYS + REZULTATO TIPAS – tik vienas laukas arba tik toggle + schema. |
| **Hierarchija** | 1) Toggle. 2) Schema. 3) Vienas CTA blokas (accent). Visa kita – antrinė arba sutraukta. |

### KILL (pašalinti arba perkelti / sutraukti)

| Elementas | Veiksmas | Pagrindimas |
|-----------|----------|-------------|
| **Ilgas intro** (2 sakiniai) | **Sutrumpinti** į 1 sakinį arba **išmesti** – CTA perkelti į vieną bloką po schema. | Intro dabar kartojasi su framing + consequence. |
| **Framing sakinys** (virš schemos) | **Sulieti** su intro arba palikti **tik** jį (be intro) – vienas bold sakinys. | Dvigubas paaiškinimas „Pokalbis vs Workflow“. |
| **Explanation card** (Section 2: badge + outputExample + noteText) | **Kill** arba **collapsible** „Nori daugiau?“ | outputExample ir noteText kartojasi su consequence line ir decision block. |
| **Decision block** (Kada rinktis Pokalbį? 3 + Kada Workflow? 3) | **Collapsible** „Kada ką rinktis?“ arba perkelti į kitą skaidrę. | 6 bullet – per daug vienoje skaidrėje; skaidrės tikslas – „skirtumas“, ne „sprendimo medis“. |
| **LLM Info panel** (Temperatūra, Atmintis, Žinių bazė, Struktūra) | **Kill** iš šios skaidrės arba **collapsible** „Techniška detalė“. | Modulio 1 pradžioje – per techniška; pakanka „struktūruotas vs laisvas“. |
| **Section 3 Workflow** (PROMPTAS, DUOMENYS, REZULTATO TIPAS, Preview) | **Radikaliai supaprastinti:** tik **vienas** laukas „Įrašyk kelis žodžius“ + **vienas** pavyzdys (pvz. Dokumentas), be 3 tabų. | Dabar atrodo kaip forma, ne kaip „pabandyk“. |
| **Micro task** (sugalvok vieną situaciją Pokalbį, vieną Workflow) | **Palikti**, bet **vienoje eilutėje** po CTA arba **Kill** – jei norime tik „pamatyk skirtumą“, refleksija gali būti kitame modulyje. | Priklauso nuo pedagoginio tikslų – jei skaidrė „supažindinimas“, geriau viena micro užduotis. |
| **2 TemplateBlock pavyzdžiai** (apačioje) | **Palikti 1** (vienas kopijuojamas pavyzdys) arba **Kill** – jei interaktyvus blokas jau rodo pavyzdį. | Dviejų pavyzdžių blokai vėl prideda ilgumo. |

---

## 3. UI/UX rekomendacijos (kaip padaryti „nice“)

### 3.1 Hierarchija – vienas CTA

- **Viršuje:** Tik vienas trumpas tekstas: arba intro (1 sakinys), arba framing sakinys. **Ne** abu ilgi.
- **Centre:** Toggle + schema. Schema – hero (didžiausia vizualinė vieta).
- **Po schema:** **Vienas** accent blokas: „Perjunk į Workflow ir įrašyk 3–5 žodžius – pamatysi, kaip keičiasi rezultatas.“ Mygtuko nereikia – pakanka teksto + toggle jau viršuje.
- **Visa kita:** Sutraukta (collapsible) arba pašalinta: „Kada rinktis?“ (collapsible), „Techniška detalė“ (LLM info – collapsible arba kill).

### 3.2 Workflow režimas – vienas laukas, vienas pavyzdys

- **Dabar:** PROMPTAS + DUOMENYS + REZULTATO TIPAS (3 tab) + Preview. Per daug.
- **Siūloma:** Vienas laukas „Įrašyk kelis žodžius (pvz. SWOT analizė)“ – vienas input. Rezultatas – vienas fiksuotas pavyzdys (pvz. „Dokumentas“ su 3–4 eilutėmis), be pasirinkimo tarp Dokumentas/Planas/Analizė. Tikslas – „pamatyk, kad rezultatas struktūruotas“, ne „užpildyk formą“.

### 3.3 Vizualinė rama

- **Sumažinti** skirtingų rėmelių (border, bg) skaičių. Dabar: intro box, schema wrapper, explanation card, decision block, Section 3, preview box, micro task, examples – per daug „langų“.
- **Sujungti:** Schema + po jos vienas CTA blokas (accent) – vienas vizualinis vienetas. Decision block – į collapsible su neutralia spalva (terms).

### 3.4 Skaidumo principas

- **Pirmas žvilgsnis (5–10 s):** Matau toggle, schema, vieną sakinį „Perjunk į Workflow ir įrašyk kelis žodžius“.
- **Antras žvilgsnis (jei nori):** Atidarau „Kada rinktis?“ (collapsible). LLM detalė – ne šioje skaidrėje arba labai giliai collapsible.

---

## 4. Konkretūs pakeitimų žingsniai

| # | Veiksmas | Failas / vieta |
|---|----------|-----------------|
| 1 | Sutrumpinti intro iki 1 sakinio arba palikti tik framing sakinį viršuje | `modules.json` content.intro; `WorkflowComparisonInteractiveBlock.tsx` – ar rodyti intro, jei jis jau yra `WorkflowSummarySlide` |
| 2 | Pašalinti arba collapsible: Explanation card (Section 2) | `WorkflowComparisonInteractiveBlock.tsx` |
| 3 | Decision block (6 bullet) – daryti collapsible „Kada rinktis Pokalbį, kada Workflow?“ | `WorkflowComparisonInteractiveBlock.tsx` |
| 4 | LLM Info – collapsible „Techniška detalė“ arba pašalinti iš šios skaidrės | `WorkflowComparisonInteractiveBlock.tsx` |
| 5 | Section 3 Workflow: vienas input „Įrašyk kelis žodžius“, vienas fiksuotas output tipas (Dokumentas), be 3 tab | `workflowComparisonConfig.ts`, `WorkflowComparisonInteractiveBlock.tsx` |
| 6 | CTA vienas vietoje: po schema vienas accent blokas su vienu sakinium | `WorkflowComparisonInteractiveBlock.tsx` – peržiūrėti eilę: framing → schema → CTA (micro task arba naujas trumpas blokas) |
| 7 | Praktiniai pavyzdžiai (2 TemplateBlock) – palikti 1 arba pašalinti, jei interaktyvus rodo pavyzdį | `ContentSlides.tsx` WorkflowSummarySlide; `modules.json` content.examples |

---

## 5. Santrauka

- **Kiss:** Toggle, schema, viena consequence line, vienas CTA.
- **Marry:** Viena žinutė (Pokalbis = laisvas, Workflow = struktūruotas) ir vienas micro-win (perjunk + įrašyk kelis žodžius).
- **Kill / Collapsible:** Ilgas intro, dvigubas framing, explanation card, decision block (6 bullet), LLM info, Section 3 (2 input + 3 output types), antras pavyzdys.

Vartotojas nepasimeta, nes mato **vieną** mintį ir **vieną** veiksmą; skaidrė vėl tampa įdomi, nes nėra „sienos“ teksto ir blokų.

---

*SOT: `turinio_pletra.md` (Skaidrė 3: Workflow Samprata), `docs/development/WORKFLOW_SAMPRATA_UX_AUDITAS.md`. Runtime: `modules.json` id 15, `workflowComparisonConfig.ts`, `WorkflowComparisonInteractiveBlock.tsx`.*

---

## 6. Pirmoji schema modulyje (opening scheme) – ko dar reikia

Kad ši skaidrė būtų **pagal geriausias praktikas** kaip pirmoji schema (už kurią sumokėta):

- **„Peržiūrėti pilname dydyje“ – nereikia:** schema yra **interaktyvi** (toggle, įvestys, dinamiška diagrama), ne statinis .png – išdidinimas nereikalingas (SCHEME_AGENT §3.11: kai default vaizdas pakankamai skaitomas, galima be EnlargeableDiagram).
- **Vizualinis patrauklumas** – §1.1: mygtukas ir schema spalvingi, kviečiantys (ne pilki, ne „techninis“).
- **„Tu esi čia“** – orientacijos badge („Dabar matote: Pokalbis“ / „Workflow“) pagal SCHEME_AGENT §3.6.
- **A11y, mobilumas, WCAG, PDF** – žr. pilną sąrašą: `WORKFLOW_SAMPRATA_UX_AUDITAS.md` §9 (spragos 1–10).

---

## 7. Įgyvendinimo statusas (2026-02-28)

| # | Veiksmas | Statusas |
|---|----------|----------|
| 1 | Intro sutrumpintas iki framing sakinio | ✅ `modules.json` |
| 2 | Explanation card – collapsible „Nori daugiau?“ | ✅ `WorkflowComparisonInteractiveBlock.tsx` |
| 3 | Decision block – collapsible „Kada rinktis?“ | ✅ |
| 4 | LLM Info – collapsible „Techniška detalė“ | ✅ |
| 5 | Section 3: vienas input, fiksuotas Dokumentas | ✅ |
| 6 | CTA vienas po schema (CTA_SENTENCE) | ✅ |
| 7 | Pavyzdžiai – 1 (Workflow) | ✅ `modules.json` |
| 8 | Toggle: Workflow outline emerald | ✅ |
| 9 | Schema: Workflow režime emerald ring/glow | ✅ |
| 10 | „Tu esi čia“ badge | ✅ |
