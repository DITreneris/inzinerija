# SCHEME_AGENT – schemų ir diagramų agentas

> Pavaldus **CONTENT_AGENT**. Tvarko proceso diagramas, schemas (SVG, flowchart, proceso vizualizacijas) pagal projekto geriausias praktikas.

---

## 1. Rolė ir pavaldumas

- **Rolė:** Schemų ir diagramų (proceso, flowchart, SVG) struktūros, geometrijos ir vizualinės hierarchijos prižiūrėtojas.
- **Pavaldus:** CONTENT_AGENT – turinio (tekstai, žingsnių pavadinimai, CTA) semantiką nustato CONTENT_AGENT; SCHEME_AGENT užtikrina, kad schema atitinka tą turinį ir projekto vizualines taisykles.
- **Nedirba:** Mokymų tekstų redagavimo (tai CONTENT_AGENT), bendro UI komponentų kodo (tai CODING_AGENT) – tik schema/diagramos geometrija, rodyklės, proporcijos, SOT schemai.

---

## 2. Source of Truth schemoms

| Sritis                                                        | SOT / failai                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Proceso diagramos (Custom GPT ir pan.)**                    | `src/components/slides/shared/CustomGptProcessDiagram.tsx`, `ProcessStepper.tsx`                                                                                                                                                                                                                                                                                                                                                                   |
| **RL proceso diagrama (Agentas→Aplinka→Veiksmas→Atlygis)**    | `RlProcessDiagram.tsx`, `RlProcessBlock.tsx` – 2 rodyklių tipai (forward grey, feedback ACCENT dashed), etiketės virš rodyklių                                                                                                                                                                                                                                                                                                                     |
| **DI prezentacijos workflow (interaktyvus)**                  | `DiPrezentacijosWorkflowDiagram.tsx`, `DiPrezentacijosWorkflowBlock.tsx` – 3.6 interaktyvumo UX kelias                                                                                                                                                                                                                                                                                                                                             |
| **Suvienyta schema (DI sistema su įrankiais ir atmintimi)**   | `Schema3InteractiveBlock.tsx` + `Schema3InteractiveDiagram.tsx` – interaktyvi suvienyta schema (pagrindinis srautas + atminties sluoksnis, punktyrinė „pasirinktinis įrašymas“); `schema3Layout.ts` – geometrijos SOT; `Schema3Diagram.tsx` – statinė kopija. „Peržiūrėti pilname dydyje“ – `EnlargeableDiagram` atidaro **tą patį React** modale. Multimodalinė įvestis/išvestis – tik tekste (optional collapsible skaidrėje), ne ant diagramos. |
| **Schema 4 (archyvas / atskiras komponentas)**                | `Schema4Diagram.tsx`, `schema4Layout.ts` – nebenaudojami skaidrėse; suvienyta į vieną skaidrę (id 56) su schema3.                                                                                                                                                                                                                                                                                                                                  |
| **Agentinė vizualizacija (4.1c, LlmArch)**                    | `LlmArchDiagramBlock.tsx` + `LlmArchDiagramDiagram.tsx` – režimai Bazinis/RAG/Tool Use; `llmArchLayout.ts` – geometrijos ir turinio SOT. „Peržiūrėti pilname dydyje" – `EnlargeableDiagram` atidaro tą patį React modale. Ryšys su Schema3: abstrakti schema vs vizualūs režimai.                                                                                                                                                                  |
| **Agentų orkestratorius (M12)**                               | `AgentOrchestratorDiagram.tsx`, `AgentOrchestratorBlock.tsx` – statinė schema iš `public/agent_orchestrator_v2.svg`. „Peržiūrėti pilname dydyje“ – `EnlargeableDiagram` atidaro tą patį React (img) modale. Skaidrė: Modulio 12 (id 120.5).                                                                                                                                                                                                        |
| **Modulis 7 – analizės tipai, paruošimas, 3 agentai, MASTER** | `m7DiagramContent.ts`; `M7AnalysisTypesDiagram/Block`, `M7DataPrepWorkflowDiagram/Block`, `M7ThreeAgentsBlock`; bendras 8 žingsnių vaizdas – `M9DataWorkflowBlock` (`context="m7_master"`) + `M9DataWorkflowDiagram` (`diagramContext="m7_master"`). `modules.json` image raktai: `m7_analysis_types`, `m7_data_prep_workflow`, `m7_three_agents_flow`, `m7_master_workflow`.                                                                      |
| **Modulis 9 – 8 žingsnių duomenų ciklas**                     | `M9DataWorkflowDiagram.tsx`, `M9DataWorkflowBlock.tsx`, `m9DataWorkflowContent.ts`. Skaidrė id 93 – `m9_data_workflow`.                                                                                                                                                                                                                                                                                                                            |
| **Modulis 10 – trigger, 3A, medis, spec/incident**            | `M10TriggerFlowBlock`, `M10ThreeAStrategyBlock`, `M10ToolDecisionTreeBlock`, `M10SpecIncidentBlock`, `m10DiagramContent.ts`.                                                                                                                                                                                                                                                                                                                       |
| **Modulis 12 – trys praktikos (3 lab)**                       | `M12ThreeLabsDiagram.tsx`, `M12ThreeLabsBlock.tsx`, `m12ThreeLabsContent.ts`. Skaidrė id 120.25 – `m12_three_labs`.                                                                                                                                                                                                                                                                                                                                |
| **Modulis 13 – funnel, prompt sluoksniai, trečdaliai**        | `M13AecFunnelBlock`, `M13PromptStackBlock`, `M13RuleOfThirdsBlock`, `m13DiagramContent.ts`. Workflow brief→publikacija – `TurinioWorkflowBlock` (skaidrė 13.11, `turinio_workflow`).                                                                                                                                                                                                                                                               |
| **Modulis 15 – praktikos ciklas**                             | `M15PracticeLoopDiagram.tsx`, `M15PracticeLoopBlock.tsx`, `m15PracticeLoopContent.ts`. Skaidrė id 150.25 – `m15_practice_loop`.                                                                                                                                                                                                                                                                                                                    |
| **Testai M8 / M11 / M14 – apimtis ir remediacija**            | `TestKnowledgeScopeDiagram.tsx`, `TestRemediationChips.tsx` – įterpta per `TestPracticeSlides.tsx` (test-intro / test-results).                                                                                                                                                                                                                                                                                                                    |
| **Statinis SVG (atsarginė kopija)**                           | `public/schema3_llm_rag.svg` – nuoroda leidžiama kaip atsarginė; **geometrijos tiesa – React** (`Schema3InteractiveDiagram`). Pilname dydyje pagrindinis būdas – modalas su React per `EnlargeableDiagram`.                                                                                                                                                                                                                                        |
| **Projekto vizualinė paletė**                                 | `tailwind.config.js` (brand, accent, slate); diagramose – brand (#334e68 ir pan.), accent grįžtamajam ryšiui.                                                                                                                                                                                                                                                                                                                                      |

Konfliktas: jei turinys (žingsnių pavadinimai, skaičius) keičiasi – pirmiausia CONTENT_AGENT / turinio SOT, tada SCHEME_AGENT atnaujina schemos struktūrą ir geometriją.

### 2.1 Mūsų požiūris vs react-diagrams

Projektas **nenaudojame** bibliotekos [@projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams); principus pritaikome savo stack'e:

- **Model vs View atitikmuo:** Layout failas (pvz. `schema3Layout.ts`) = „modelis“ (nodes, edges, anchor); Diagram komponentas (pvz. `Schema3InteractiveDiagram.tsx`) = „view“ – tik skaito iš layout ir piešia SVG. Geometriją keisti **tik** layout faile; komponentas nerašo koordinačių.
- **Vienas SOT:** Visos koordinatės ir rodyklės kyla iš vieno šaltinio (layout arba diagramos konstantos). Eksportas į SVG/PNG ar ataskaitos turi kilti iš to paties layout arba būti aiškiai pažymėtas kaip atsarginė kopija (žr. §2 statinis SVG).
- **TypeScript:** Layout tipai (Schema3Node, Schema3Edge, Anchor) – standartas visiems naujiems layout failams.
- **Kodėl ne biblioteka:** Mūsų reikmėms SVG + React pakanka; rodyklės kraštas į kraštą, 4 anchor, deterministiškas renderinimas valdomi tiesiogiai. Mažesnis priklausomybių skaičius ir pilna atitiktis SCHEME_AGENT §3.

Išsamios diagramų praktikos ir KISS-Marry-Kill santrauka: **docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md**. Horizontalios rodyklės ir blokų užrašai (analizė + checklist įgyvendinimui): **DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md §6**.

---

## 3. Svarbiausios pamokos iš diagramos (geriausios praktikos)

Šias taisykles laikytis kurdami ar taisant proceso/flowchart diagramas.

### 3.1 Viena geometrijos tiesa

- **Visos koordinatės ir atstumai kyla iš konstantų.** Pvz. `STEP_BOXES`, `GAP`, `BOX_H`, `COLS_X`, `COLS_W`, `CX`, `HORIZ_Y`. Dėžučių `rect` ir rodyklių `line`/`path` naudoja tą patį masyvą/konstantas – nėra dubliuojamų „magic numbers".
- Pasekmė: pakeitus vieną konstantą (pvz. GAP), automatiškai pasikeičia ir tarpai, ir rodyklių ilgiai.

### 3.2 Rodyklės – kraštas į kraštą, be persidengimo

- **Linija prasideda** prie ištekančio bloko išorės krašto (pvz. `boxBottom`).
- **Linija baigiasi** prieš įeinančio bloko kraštą: `nextTop - ARROW_MARKER_LEN`, kad **antgalio smailė** (refX) liestų kraštą – neįsibraukiant į bloką.
- **Antgalio dydis** (refX) turi atitikti `ARROW_MARKER_LEN` naudojamą path skaičiavime; kitaip trikampis persidengs su bloku.
- **DRAUDŽIAMA:** trikampiai **neperšoka** blokų ribų; rodyklės **neįlenda** į bloko vidų; rodyklės **neišlenda** už blokų taip, kad antgalis būtų „ore"; rodyklės **neuždengia** teksto (path ir etiketės – laisvoje erdvėje ar virš/po blokais, ne ant teksto).

### 3.3 Proporcingos rodyklės

- **Antgalis ne didesnis už tarpą tarp blokų.** Jei tarpas = GAP (pvz. 28), refX turi būti žymiai mažesnis (pvz. 6), kad vizualiai vyrautų linija, o ne trikampis (neproporcingumas = per dideli antgaliai).
- **Vienodos vertikalios rodyklės:** vienodas GAP tarp blokų → vienodo ilgio linijos ir vienoda vizualinė hierarchija.

### 3.4 Grįžtamojo ryšio (feedback) path

- **Nekirsti kitų blokų.** Path maršrutas eina aplink (pvz. apačion į kairę), o ne per bloko koordinates.
- **Pabaiga:** path **baigiasi ties tikslo bloko kraštu** – taip linija ir marker vizualiai sujungti, nėra „floating" trikampio. Pvz. vertikaliam segmentui į viršų: paskutinis path taškas = `firstBottom` (bloko apačia), paskutinis segmentas nukreiptas **į bloką** (mažesnė y = į viršų). `orient="auto"` nukreips antgalį teisinga kryptimi.
- **RL diagrama:** Atlygis → Agentas path eina: Atlygio centras apačioje → žemyn → horizontaliai į kairę → į viršų iki Agento apačios. Punktyrinė linija (strokeDasharray) + ACCENT spalva – semantika „mokymasis laikui bėgant".

### 3.5 Interaktyvumas (jei reikia)

- **Paspaudžiamos zonos:** virš vizualaus bloko – transparentus `<rect>` su tais pačiais x, y, width, height; `onClick` → callback (pvz. `onStepClick(index)`).
- **Prieinamumas:** kiekvienam tokiam rect – `aria-label` (pvz. „Žingsnis 1: Tikslas"), `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter / tarpas).
- **Rekomenduojama:** schemos, kuriose dalyvis gali pasirinkti žingsnį arba matyti paaiškinimą – padaryti **interaktyvias** (3.6 „Tu esi čia“, žingsnių mygtukai), ne tik statines – sumažina „per mažai interaktyvumo“ problemą.

### 3.6 Interaktyvumo UX kelias (workflow su paaiškinimais apačioje)

Kai schema yra **clickable** ir rodo paaiškinimą po paspaudimu – vartotojui „sunku sekti", jei turinys tiesiog keičiasi. **Įsiminti kitam kartui:**

| Elementas                         | Kodėl                                                                               | Implementacija                                          |
| --------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **„Tu esi čia" badge**            | Nuolatinė orientacija – vartotojas žino, kur yra (Nielsen: recognition over recall) | Badge virš diagramos: „Tu esi čia: 1. Tikslas" + „1/5"  |
| **Žingsnių mygtukai (1–N)**       | Perjungti be scroll atgal į diagramą – sumažina disorientaciją                      | Numeruoti mygtukai po diagrama, prieš paaiškinimo bloką |
| **Stabili paaiškinimo struktūra** | Pavadinimas be perteklinio kartojimo – numeris jau „Tu esi čia"                     | Paaiškinime tik `step.title`, ne „1. Tikslas"           |

**Referencinė implementacija:** `DiPrezentacijosWorkflowBlock.tsx` (wrapper) + `DiPrezentacijosWorkflowDiagram.tsx` (currentStep, onStepClick).

### 3.7 Horizontalus proceso layout (pamokos iš RL diagramos)

Kai blokai išdėstyti **horizontaliai vienoje eilėje** (pvz. Agentas → Aplinka → Veiksmas → Atlygis):

#### 3.7.1 Viewbox ir erdvė

- **Viewbox aukštis ≥ 330px** (desktop), kad tilptų blokai + feedback kilpa + etiketės + kvėpavimo tarpas.
- **ROW_Y** (blokų eilutės y): centruoti viewbox'e, palikti ~30px virš blokų etiketėms ir ~80px po blokais feedback kilpai.
- **START_X**: apskaičiuoti, kad paskutinis blokas tilptų viewbox'e: `START_X + (BOX_W + GAP) × (N-1) + BOX_W < viewbox_width`.

#### 3.7.2 Forward rodyklės (tarp blokų)

| Parametras        | Reikšmė                  | Kodėl                                                                 |
| ----------------- | ------------------------ | --------------------------------------------------------------------- |
| **ARROW_GAP_FWD** | 3–5px                    | Su GAP=28, didesnis gap (pvz. 12) palieka tik 4px rodyklės – nematoma |
| **Spalva**        | #7B8794 (tamsesnė pilka) | #9AA3AF per blyški ant šviesaus fono – nepakankamas kontrastas        |
| **Storis**        | 3px                      | 2px per plonas horizontalioje schemoje – silpna vizualinė hierarchija |
| **Marker**        | 12px refX                | Proporcinga: 12px marker su 3px linija 18px tarpe                     |

#### 3.7.3 Etiketės ant forward rodyklių

**Pozicija: VIRŠ rodyklės**, laisvoje erdvėje tarp title ir blokų viršaus. **NE ant rodyklės** (centered-on-edge negalimas, kai GAP < etiketės plotis).

| Taisyklė                 | Specifikacija                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Y pozicija**           | `box.y - 6` (teksto baseline, 6px virš bloko viršaus)                                                              |
| **X pozicija**           | `rightEdge + GAP / 2` (gap centras, ne rodyklės centras)                                                           |
| **Teksto spalva**        | TEXT_DARK (#102a43), ne rodyklės spalva – stiprus kontrastas                                                       |
| **Font**                 | 11px, weight 700 (bold) – mažas fizinis dydis, todėl reikia bold                                                   |
| **Bg rect**              | Nereikalingas ant šviesaus fono; jei fone yra elementų – naudoti `rgba(255,255,255,0.88)` pill (rx=10)             |
| **Connector**            | Vertikali punktyrinė linija (1px, 50% opacity, dasharray 2 2) nuo etiketės apačios iki rodyklės – vizualinis ryšys |
| **Individualūs pločiai** | `LABEL_WIDTHS` per label (pvz. 72, 58, 64) – ne fiksuotas plotis visiems                                           |

**Kodėl NE centered-on-edge:** Su BOX_W=200 ir GAP=28, etiketė (60–72px) platesnė už gap'ą. Centravimas ant rodyklės = etiketė persidengia su abiejų blokų kraštais (tamsus tekstas ant tamsaus box = neskaitoma). Industrijos standartas (yWorks „Centered") veikia kai gap > etiketės plotis.

#### 3.7.4 Feedback kilpa (grįžtamasis ryšys)

| Taisyklė            | Specifikacija                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Stilius**         | Punktyrinė (strokeDasharray 8 4) + ACCENT spalva – semantika „mokymasis laikui bėgant"                                             |
| **Path**            | Iš paskutinio bloko centro apačioje → žemyn → horizontaliai → į viršų iki pirmo bloko apačios                                      |
| **Rounded corners** | Q (quadratic bezier) su R=16px kampuose – sklandus vizualinis kelias                                                               |
| **Arrowhead**       | **Rankinis polygon** (ne SVG marker) – 3 taškai: smailė ties bloko apačia, bazė FB_TIP_H žemiau. Jokios orientacijos dviprasmybės. |
| **Start indicator** | Apskritimas (r=5, ACCENT) prie kilpos pradžios – aiškiai matoma, kur feedback prasideda                                            |
| **Etiketė**         | Po horizontaliu segmentu, fbY + 16, ACCENT_DARK spalva                                                                             |

**Kodėl rankinis polygon, ne SVG marker:** `orient="auto"` su path, kurio paskutinis segmentas eina į viršų, teoriškai turėtų nukreipti marker į viršų. Praktikoje: marker vizualiai atrodė atskirtas nuo linijos, kryptis neaiški dėl mažo dydžio. Rankinis polygon = 0 dviprasmybių, visada rodo ten, kur nupiešei.

### 3.8 Dvi rodyklių semantikos (RL ir pan.)

Kai diagramoje yra **forward flow** ir **feedback loop**, vizualiai atskirti:

- **Forward:** #7B8794 (tamsesnė pilka), solid, 3px, etiketės virš rodyklių su connector.
- **Feedback:** ACCENT spalva (ta pati kaip paryškintas blokas), punktyrinė (strokeDasharray), rankinis polygon arrowhead, etiketė po kilpa. Punktyras = „mokymasis laikui bėgant".

### 3.9 Spalvos ir šriftai

- Viena pagrindinė spalva srautui (brand), accent – grįžtamajam ryšiui ar paryškinimui.
- Šriftas: projekto (Plus Jakarta Sans); tekstas diagramoje lietuvių kalba, terminologija – kaip CONTENT_AGENT (DI, ne AI kur tinka).

### 3.10 Kodėl React diagrama nesutampa su ataskaita ir SVG (ir kaip išvengti)

**Priežastys:**

| #   | Priežastis                                                                                                                                                     | Pasekmė                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | **Skirtingos koordinačių sistemos** – SVG viewBox vs CSS/DOM px; skaičiavimai „pagal dizaino px“ vienur ir „pagal realų DOM“ kitu – poslinkiai garantuoti.     | Rodyklės / blokai vizualiai „beveik“, bet tiksliai nesueina. |
| 2   | **Skirtingi anchor taškai** – vienur rodyklė į bloko **centrą**, kitu į **viršutinį kairį** (arba kraštą). Tada linijos baigiasi skirtingose vietose.          | Persidengimas arba per trumpa/ilga rodyklė.                  |
| 3   | **Tekstas ir šriftai** – skirtingi fontai, line-height, letter-spacing; labeliai keičia dėžutės aukštį/plotį, o rodyklės taškai lieka seni.                    | 2–6 px per elementą dauginasi per visą schemą.               |
| 4   | **Stroke/marker matematika** – SVG `marker-end` turi savo „užėjimą“ (refX, markerUnits); kitaip skaičiuojant linijos galą gaunamas persidengimas arba tarpas.  | Antgalis „plūsta“ į bloką arba atsiranda tarpas.             |
| 5   | **Responsive / zoom / devicePixelRatio** – SVG skaluojasi sklandžiai, DOM apvalinama kitaip.                                                                   | „Iš akies“ OK, matuojant – nesutampa.                        |
| 6   | **Rankinis redagavimas vs generavimas** – ataskaita tekstu, SVG ranka (Figma/Illustrator), React – iš kodo. Jei bet kuris taisomas atskirai, sinchronas miręs. | React, SVG ir ataskaita skiriasi.                            |

**Geriausias variantas (vienas layout SOT):**

- **Vienas šaltinis tiesos** – pvz. `layout.json` arba `schema4Layout.ts`: **nodes** (id, x, y, w, h), **edges** (from, to, fromAnchor, toAnchor).
- **React** renderina tik pagal tą patį layout (koordinatės ir rodyklės iš tų pačių skaičių).
- **SVG eksportas** (jei reikia) generuojamas iš to paties layout arba rankinį SVG laikyti sinchronizuotą su layout (geometrijos tiesa – layout, ne atskiri failai).
- **Ataskaitoje** – embed'intas vaizdas iš to paties SOT (sugeneruotas SVG arba PNG).

**Anchor taškai – tik 4 standartiniai:**

- Naudoti tik **top | right | bottom | left** (su offset, jei reikia). Rodyklės prasideda/baigiasi **krašte**, ne centre.
- **Venk** „center“ įėjimų/išėjimų, kol nesusitvarkęs SOT – centre lengva susipainioti su skirtingais koordinačių skaičiavimais.
- Linijos: pradžia = `nodeA[fromAnchor]` (pvz. `bottom` → x = node.x + node.w/2, y = node.y + node.h); pabaiga = `nodeB[toAnchor] - ARROW_MARKER_LEN` kad antgalis liestų kraštą.

**Debug metodas (kur lūžta):**

- React: uždėti **debug overlay** – rodyti kiekvieno mazgo bounding box ir anchor taškus (maži apskritimai).
- SVG: įjungti tą patį – rodyti anchor taškus.
- Palyginti: ar anchor'ai tie patys? Jei ne – problema 2/3/4.

**Projekte:** Schema 4 naudoja layout SOT (`schema4Layout.ts`) su nodes/edges ir anchor funkcija; rodyklės skaičiuojamos tik iš kraštų (top/right/bottom/left). Žr. `src/components/slides/shared/schema4Layout.ts`.

### 3.11 Schemų UI/UX geriausios praktikos (flowchart blokai)

Iš LLM ir kitų diagramų patirties – kad vartotojo kelionė būtų pateisinama ir schema ne „darželio lygio“:

| Praktika                                   | Specifikacija                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Centravimas viewBox**                    | Turinys horizontaliai centre: `START_X = (VIEWBOX_W - turinio_plotis) / 2`. Kairėje ir dešinėje vienodos maržos – schema ne „pavažiavusi“ į vieną pusę.                                                                                                                                                                                                                                                    |
| **Tekstas telpa į blokus**                 | Ilgas tekstas – laužyti į kelias eilutes (`<tspan>` dy); Išvesties bloke naudoti PAD_TOP_OUTPUT / LINE_HEIGHT_OUTPUT, kad 4 eilutės tilptų į BOX_H; ne viena ilga eilutė, kuri „lenda“ už rect.                                                                                                                                                                                                            |
| **Lygmenų kvėpavimas**                     | Tarpas tarp dviejų eilučių (pvz. Žingsnis N ir N+1) ne per mažas: ~40 viewBox vienetų arba daugiau, ne 24 – vizualiai „susispaudę“ lygmenys = prastas UX.                                                                                                                                                                                                                                                  |
| **Vertikalus grid bloke**                  | Wrapper sekcijoms: 32px tarp sekcijų, 24px antraštė–turinys, 12–16px maži blokai (žr. UI_UX_AGENT §3.7). Diagramos wrapper: pt-8 pb-4 arba panašiai – ne per daug erdvės apačioje.                                                                                                                                                                                                                         |
| **„Peržiūrėti visą dydį“**                 | Naudoti tik ten, kur skaidrėje tikrai reikia pilno dydžio; kai default vaizdas pakankamai skaitomas – galima rodyti diagramą tiesiogiai be EnlargeableDiagram. **Interaktyvios schemos** (toggle, įvestys, dinamiška vizualizacija – pvz. WorkflowComparison) **nereikalauja** Enlarge: tai ne statinis .png/vaizdas, o interaktyvus blokas – išdidinimas nėra būtinas. Žr. AGENT_VERIFICATION_NE_MELUOTI. |
| **Šaltinis**                               | Oro virš „Šaltinis“ teksto (VIEWBOX_H pakankamas, SOURCE_LABEL_Y – ne priklijuotas prie diagramos apačios).                                                                                                                                                                                                                                                                                                |
| **Flex + padding: rodyklė siekia turinio** | Kai blokai turi horizontalų padding (pvz. `pl-4`) nuo Connector krašto – rodyklė vizualiai „nesiekia“ pilko bloko. Sprendimas: antram ir tolesniems blokams `-ml-4` (pirmam `first:ml-0`), kad turinio kairys kraštas sutaptų su Connector dešiniu. Žr. StrukturuotasProcesasDiagram.                                                                                                                      |
| **Aktyvus blokas: ring ant turinio**       | Paryškinimui naudoti `ring-inset` ant **turinio** elemento (vidinis div), ne ant wrapper su padding – kitaip ring „išlenda“ už matomo bloko. Žr. StrukturuotasProcesasDiagram (ring ant inner div).                                                                                                                                                                                                        |

**Nuorodos:** `docs/development/LLM_DIAGRAMOS_VIZUALUS_VERTINIMAS.md`, `docs/development/UI_UX_AGENT.md` §3.7, `llmAutoregressiveLayout.ts` (layout SOT pavyzdys).

---

## 4. Kada naudoti SCHEME_AGENT

| Situacija                                                     | Agentas                                                                                                                             |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Pridėti / pakeisti žingsnius proceso diagramoje (turinyje)    | CONTENT_AGENT → SCHEME_AGENT (geometrija, STEP_BOXES, rodyklės)                                                                     |
| Rodyklės persikerta su blokais, neproporcingos                | SCHEME_AGENT                                                                                                                        |
| Nauja schema (flowchart, proceso schema) į skaidrę            | CONTENT_AGENT (ką rodyk, kokius žingsnius) → SCHEME_AGENT (struktūra, konstanta, rodyklės) → CODING_AGENT (komponentas, jei reikia) |
| **Interaktyvus workflow** (clickable + paaiškinimai apačioje) | SCHEME_AGENT: taikyti **3.6 Interaktyvumo UX kelias** – „Tu esi čia", žingsnių mygtukai, stabili struktūra                          |
| **Horizontalus procesas** (blokai vienoje eilėje)             | SCHEME_AGENT: taikyti **3.7 Horizontalus layout** – viewbox erdvė, forward gap, etiketės virš, feedback polygon                     |
| Tik teksto pakeitimas diagramoje (žingsnio pavadinimas)       | CONTENT_AGENT (arba DATA_AGENT jei tekstas JSON)                                                                                    |

---

## 5. Vizualinė patikra ir iteracijos

**Kas tikrina schemų vizualinę kokybę:** **CODE_REVIEW_AGENT** (ne CONTENT_AGENT). CONTENT_AGENT nustato turinį (ką rodyk); geometriją ir rodykles daro SCHEME_AGENT; **vizualinį įvertinimą** (ar trikampiai neperšoka blokų, ar rodyklės neuždengia teksto) atlieka CODE_REVIEW_AGENT pagal šį checklist.

**Checklist (CODE_REVIEW_AGENT taiko po SCHEME_AGENT):**

| Kriterijus                     | Klausimas                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Rodyklės kraštas į kraštą      | Ar linija prasideda/baigiasi prie bloko krašto? Ar antgalio smailė tik **liečia** kraštą, o trikampis **neįeina** į bloką ir **neperšoka** ribų? |
| Proporcingumas                 | Ar refX atitinka ARROW_MARKER_LEN path'e? Ar antgalis ne didesnis už tarpą (GAP) tarp blokų?                                                     |
| Path nekerta blokų             | Ar grįžtamasis ryšys eina aplink blokus? Ar rodyklės ir etiketės **neuždengia** teksto?                                                          |
| Interaktyvumas (jei clickable) | Ar yra aria-label, role, tabIndex, onKeyDown? Ar taikomas 3.6 („Tu esi čia“, žingsnių mygtukai)?                                                 |

**Iteracijos:** rekomenduojama **2 iteracijos** schemoms: (1) SCHEME_AGENT atlieka pakeitimus → (2) CODE_REVIEW_AGENT atlieka schemų vizualinę patikrą (checklist). Jei randamos klaidos – SCHEME_AGENT pataisymas (konkretus failas, konstanta, eilutė) → vėl CODE_REVIEW. Orkestratorius: `docs/development/AGENT_ORCHESTRATOR.md` (skyrius 4 – proceso diagramą / schemą; skyrius 7 – CODE_REVIEW_AGENT).

---

## 5.5 Privaloma verifikacija – nemeluoti

**Problema:** Agentas gali raportuoti „Schema X įgyvendinta kaip React, statinis SVG tik fallback“, bet vartotojas, paspaudęs „Peržiūrėti pilname dydyje“, mato tik statinį SVG ir mano, kad darbas neapdarytas. Žr. `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md`.

**Privaloma po schemos / React diagramos pakeitimų:**

| Patikra                         | Klausimas                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Skaidrėje**                   | Ar tikrai renderinamas React komponentas (ne `<img src="...svg">`)? Failas: `ContentSlides.tsx` – `section.image.includes('schema3')` → `<Schema3InteractiveBlock />` (viduje `EnlargeableDiagram` + `Schema3InteractiveDiagram`).                                                                                                                         |
| **„Peržiūrėti pilname dydyje“** | Ar vartotojas gauna **tą patį** turinį (React)? Jei nuoroda veda į statinį SVG – ar ataskaitoje aiškiai parašyta: „Pilname dydyje nuoroda atidaro statinį SVG (atsarginė kopija); geometrijos tiesa skaidrėje ir pilname dydyje – React (modalas).“ **Draudžiama** raportuoti „SVG tik fallback“, jei vienintelis pilno dydžio vaizdas vartotojui yra SVG. |

**Suvienyta schema (4.1c):** „Peržiūrėti pilname dydyje“ (iš `Schema3InteractiveBlock` per `EnlargeableDiagram`) atidaro **tą patį React** komponentą (`Schema3InteractiveDiagram`) modale. Nuoroda į statinį SVG leidžiama kaip „Atidaryti SVG failą (atsarginė kopija)“ tik jei ji aiškiai pažymėta.

---

## 6. Išvestis ir kokybės vartai

- **Išvestis:** Atnaujintos schemos konstantos ir/ar SVG/React diagramos kodas (`CustomGptProcessDiagram.tsx`, `ProcessStepper.tsx`, ar atitinkami failai); užtikrinta edge-to-edge rodyklių, proporcingi antgaliai, path nekerta blokų.
- **Privaloma** atsakymo pabaigoje: CHANGES, CHECKS, RISKS, NEXT (kaip ir kiti agentai orkestratoriuje).

---

## 7. Nuorodos

- Diagramų geriausios praktikos ir KISS-Marry-Kill: `docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md`
- Orkestratorius ir router: `docs/development/AGENT_ORCHESTRATOR.md`, `.cursor/rules/agent-orchestrator.mdc`
- Turinio SOT: `turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/CONTENT_MODULIU_ATPAZINIMAS.md`
- Referencinė diagrama (pamokos iš čia): `src/components/slides/shared/CustomGptProcessDiagram.tsx`
- RL horizontali diagrama (3.7 pamokos): `src/components/slides/shared/RlProcessDiagram.tsx`
- Interaktyvumo UX kelias (3.6): `DiPrezentacijosWorkflowBlock.tsx`, `DiPrezentacijosWorkflowDiagram.tsx`
- Suvienyta schema (Modulio 4, 4.1c): `Schema3InteractiveBlock.tsx`, `Schema3InteractiveDiagram.tsx`, `schema3Layout.ts` – geometrijos tiesa; `EnlargeableDiagram` – „Peržiūrėti pilname dydyje“ atidaro tą patį React modale; `ContentSlides.tsx` – `section.image.includes('schema3')` → Schema3InteractiveBlock.
- **Layout SOT (Schema 4):** `schema4Layout.ts` – nodes (id, x, y, w, h), edges (from, to, fromAnchor, toAnchor), `getAnchorPoint`, `getLineEndPoint`; rodyklės tik anchor'ai top/right/bottom/left. Žr. §3.10.
- Verifikacija (nemeluoti): `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md`; SCHEME_AGENT §5.5.
