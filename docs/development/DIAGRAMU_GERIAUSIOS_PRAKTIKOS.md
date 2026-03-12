# Diagramų geriausios praktikos – konsoliduotas gidas

> Layout SOT, anchor, rodyklės, interaktyvumas, palyginimas su react-diagrams ir KISS-Marry-Kill. Nuorodos: SCHEME_AGENT.md, AGENT_ORCHESTRATOR.md, DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md §6.

---

## 1. Mūsų architektūra – viena geometrijos tiesa

- **Layout failas = modelis:** Nodes (id, x, y, w, h), edges (from, to, fromAnchor, toAnchor). Visos koordinatės ir atstumai kyla iš konstantų; dėžučių `rect` ir rodyklių `line`/`path` naudoja tą patį masyvą.
- **Diagram komponentas = view:** Tik skaito iš layout ir piešia SVG; geometriją **nekeičia**. Pakeitus vieną konstantą (pvz. GAP), automatiškai pasikeičia tarpai ir rodyklės.
- **Failai:** `schema3Layout.ts`, `schema4Layout.ts`, `llmArchLayout.ts`, `llmAutoregressiveLayout.ts` – geometrijos SOT; diagramos su inline konstantomis (RlProcessDiagram, CustomGptProcessDiagram ir kt.) – SOT toje pačioje byloje.

---

## 2. Anchor ir rodyklės

- **Tik 4 anchor:** top | right | bottom | left. Rodyklės prasideda/baigiasi **krašte**, ne centre.
- **Kraštas į kraštą:** Linija prasideda prie ištekančio bloko išorės; baigiasi prieš įeinančio bloko kraštą: pabaiga = kraštas − ARROW_MARKER_LEN, kad antgalio smailė tik liestų. Antgalio refX turi atitikti path skaičiavimą.
- **Path nekerta blokų:** Grįžtamasis ryšys eina aplink blokus; rodyklės ir etiketės neuždengia teksto.
- **Proporcingumas:** Antgalis ne didesnis už tarpą (GAP) tarp blokų.

Žr. SCHEME_AGENT.md §3.2–3.4, §3.10 (layout SOT, getAnchorPoint, getLineEndPoint).

---

## 3. Interaktyvumas (jei reikia)

- **Paspaudžiamos zonos:** Transparentus `<rect>` virš vizualaus bloko; onClick → callback. Prieinamumas: aria-label, role="button", tabIndex={0}, onKeyDown (Enter / tarpas).
- **Interaktyvumo UX kelias (3.6):** „Tu esi čia“ badge, žingsnių mygtukai po diagrama, stabili paaiškinimo struktūra (step.title be perteklinio kartojimo). Referencinė implementacija: DiPrezentacijosWorkflowBlock + DiPrezentacijosWorkflowDiagram.

---

## 4. Palyginimas su react-diagrams

| Aspektas | react-diagrams | Mūsų projektas |
|----------|----------------|----------------|
| Model | DiagramModel, nodes, links (engine) | Layout .ts – nodes, edges, getAnchorPoint / getLineEndPoint |
| View | React widgets, factories | Diagram .tsx – skaito layout, piešia SVG |
| Tipai | TypeScript out of the box | TypeScript – Schema3Node, Schema3Edge, Anchor |
| SOT | Model serialization | Vienas layout failas arba diagramos konstantos |
| Mazgai | HTML first (inputs, dropdowns) | SVG first – paprasti blokai ir rodyklės |
| Pluggable | Savi Model/Factory/Widget | Nauji layout.ts + Diagram.tsx + Block pagal SCHEME_AGENT |

Šaltinis: [react-diagrams](https://github.com/projectstorm/react-diagrams), [GitBook](https://projectstorm.gitbook.io/react-diagrams). Mes nenaudojame bibliotekos – principus (Model/View, vienas SOT, TypeScript) pritaikome be engine.

---

## 5. KISS–Marry–Kill (neprieštarauja dabartiniam kodui)

### KISS (Keep)

- Viena geometrijos tiesa layout failuose – nodes/edges, 4 anchor, getAnchorPoint / getLineEndPoint.
- SVG renderinimas React – deterministiška, rodyklės kraštas į kraštą; nekeisti į HTML-first diagramų biblioteką.
- Block + EnlargeableDiagram + tas pats React modale (SCHEME_AGENT §5.5).
- DATA_AGENT nesikeičia diagramų matmenų – riba tarp DATA ir SCHEME išlaikoma.

### Marry (Adopt / adapt)

- **Model vs View:** Dokumentuota – keisti geometriją tik layout faile; komponentas tik skaito ir piešia.
- **TypeScript:** Standartas visiems naujiems layout failams.
- **Pluggable:** Naujoms diagramoms – layout.ts + Diagram.tsx + (jei reikia) Block, aiški atsakomybių skirtynė.
- **Single source of truth:** Eksportas ar ataskaitos – iš to paties layout arba aiškiai „atsarginė kopija“.

### Kill (Reject)

- Įdiegti @projectstorm/react-diagrams – didelis perrašymas; dabartinis React + SVG + layout TS atitinka SCHEME_AGENT.
- HTML nodes kaip pirmos klasės – mūsų dizainas SVG, paprasti blokai.
- Bet koks pakeitimas, sulaužantis SCHEME_AGENT §3 (edge-to-edge, path nekerta blokų, 4 anchor).

---

## 6. Horizontalios rodyklės ir blokų užrašai (referencinė: Autoregresinė LLM)

Referencinė implementacija: **LlmAutoregressiveDiagram** + **llmAutoregressiveLayout.ts**. Šios geriausios praktikos taikomos ir kitoms horizontaliam srautui diagramoms.

### 6.1 Rodyklių analizė (horizontalus srautas)

#### Forward rodyklės (blokas → blokas į dešinę)

| Aspektas | Specifikacija | Įgyvendinimas (LLM diagrama) |
|----------|---------------|------------------------------|
| **Kryptis** | Vienintelė kryptis – į dešinę; rodyklė horizontalė, Y = eilutės centre (centre bloko aukščio). | `ARROWS_ROW_N` / `ARROWS_ROW_N1`: `[x1, centerY, x2]`; `centerY = boxY + BOX_H/2`. |
| **Pradžia** | Ištekančio bloko **dešinysis kraštas** (right edge). Linija prasideda ties kraštu, ne į vidų. | `x1 = inputRight` (pvz. `START_X + INPUT_W`); tas pats iš layout konstantų. |
| **Pabaiga** | Įeinančio bloko **kairysis kraštas minus antgalio ilgis**. Antgalio smailė **liečia** kraštą, trikampis **neįeina** į bloką. | `x2 = llmLeft - ARROW_MARKER_LEN` (layout); `ARROW_MARKER_LEN = 6`. |
| **Stilius** | Pilna linija (solid), vienas antgalis (single arrowhead), vienoda spalva srautui. | `stroke={BORDER}`, `strokeWidth="2"`, `markerEnd` – vienas marker. |
| **Proporcingumas** | Antgalio dydis (refX) atitinka `ARROW_MARKER_LEN` path skaičiavime; antgalis ne didesnis už GAP. | Layout: `ARROW_MARKER_LEN = 6`; SVG marker: `refX="5"`, `markerWidth="6"` – smailė ties 5px. GAP=24 > 6. |
| **Spalva** | Pakankamas kontrastas ant fono; ne per šviesi. | Pvz. `BORDER` (#4a5568) – tamsesnė pilka. |

**Praktika įgyvendinimui:** Visos forward rodyklių koordinatės (x1, x2, y) kyla iš **layout failo** iš tų pačių blokų rect (right = rect[0]+rect[2], left = kito rect[0]). Nenaudoti „magic numbers“ diagramos komponente.

#### Grįžtamojo ryšio (feedback) rodyklė

| Aspektas | Specifikacija | Įgyvendinimas |
|----------|---------------|---------------|
| **Vizualus atskyrimas** | Skirta nuo forward: **punktyrinė** linija, galima kitokią spalvą (pvz. pilka arba accent). | `strokeDasharray="5 3"`, `stroke={GRAY_FLOW}`. |
| **Maršrutas** | Path **nekerta** kitų blokų; eina aplink (žemyn → horizontaliai → į viršų). | `pathD` su Q (bezier) arba L segmentais; pabaiga ties tikslo bloko kraštu. |
| **Antgalis** | Aiškiai nukreiptas į tikslo bloką; gali būti rankinis `<polygon>`, kad nėra orientacijos dviprasmybės. | Polygon su smaile ties `inputN1Top`; `orient="auto"` nebūtina. |
| **Etiketė** | Trumpas tekstas paaiškina ryšį (pvz. „Pridedama prie naujos įvesties“). | `FEEDBACK.labelX`, `FEEDBACK.labelY` – centre tarp eilučių; SIZE_MICRO, TEXT_MUTED. |

### 6.2 Blokų užrašų analizė (užrašai blokuose)

| Aspektas | Geriausia praktika | LLM diagramos pavyzdys |
|----------|--------------------|-------------------------|
| **Hierarchija** | Pirmoji eilutė = **rolė/tipas** (Įvestis, LLM, Išvestis, Pasirinkta); antra/trečia = **turinys/pavyzdys**. | „Įvestis“ + „Rytas tapo“; „Išvestis“ + „Tokenų tikimybės:“ + procentai; „Pasirinkta“ + „čempionais“. |
| **Tipografija** | Rolė: storesnis šriftas (600/700), šiek tiek didesnis arba atskiros spalvos; turinys: 400, skaitomumas. | Rolė: `fontWeight="600"` arba `"500"`, SIZE_SCHEMA_LABEL/18; turinys: SIZE_BODY, fontWeight 400. |
| **Spalvos** | Rolė ir turinys gali būti tos pačios spalvos arba rolė tamsesnė/akcentinė; kontrastas su bloko fonu. | Įvestis: INPUT_BORDER ant INPUT_BG; Išvestis: OUTPUT_LABEL; Pasirinkta: PASIRINKTA_TEXT. |
| **Pozicionavimas** | Visos koordinatės iš **layout** (getTwoLineTextPositions, getOutputTextPositions, getInputTextPositions, getCenterTextPosition). Vertikaliai: padding + line height, kad tekstas netelpėtų už rect. | PAD_TOP, LINE_HEIGHT, PAD_TOP_OUTPUT, LINE_HEIGHT_OUTPUT; cx = rect[0] + rect[2]/2. |
| **Kelių eilučių turinys** | Naudoti `<tspan>` su `dy` arba atskirus `<text>` su skaičiuotomis Y. | Išvesties bloke: body + body2 su dy="20". |
| **Vienas centrinis žodis** | LLM-type blokas: viena eilutė centre (vertikaliai ir horizontaliai). | `getCenterTextPosition`: x = rx+rw/2, y = ry+rh/2+6. |

### 6.3 Geriausių praktikų checklist įgyvendinimui

Naudoti kuriant ar taisant horizontalias proceso diagramas:

- [ ] **Rodyklės:** Koordinatės (x1, y, x2) iš layout; x1 = dešinysis kraštas, x2 = kairysis kraštas − ARROW_MARKER_LEN; Y = eilutės centre.
- [ ] **Marker:** refX atitinka ARROW_MARKER_LEN; antgalis ne didesnis už GAP; vienas marker tipas forward srautui.
- [ ] **Feedback:** Punktyrinė linija; path nekerta blokų; aiški etiketė (pvz. „Pridedama prie naujos įvesties“).
- [ ] **Blokų užrašai:** Rolė (pvz. Įvestis, Išvestis) + turinys; pozicijos iš layout helper funkcijų; tekstas telpa į rect (padding/line-height).
- [ ] **Viena tiesa:** Keisti tik layout; diagramos komponentas tik skaito ir piešia (§1).

---

## 7. Nuorodos

- **SCHEME_AGENT.md** – pilnas SOT, §3 pamokos, §5 vizualinė patikra, §5.5 verifikacija.
- **DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md** §6 – schemų skaidrės, kas keičia ką (DATA vs SCHEME).
- **DIAGRAMU_SCHEMU_DATA_ANALIZES_ATASKAITA.md** – inventorizacija, ContentSlides mapping, KISS-Marry-Kill su failais.
- **AGENT_ORCHESTRATOR.md** – mišri užduotis (schema): SCHEME_AGENT → CODE_REVIEW_AGENT.
- **llmAutoregressiveLayout.ts**, **LlmAutoregressiveDiagram.tsx** – referencinė horizontalaus srauto ir blokų užrašų implementacija.
