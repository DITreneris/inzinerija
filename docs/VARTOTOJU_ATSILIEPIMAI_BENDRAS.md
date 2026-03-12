# Vartotojų atsiliepimai – bendra analizė

> **Paskirtis:** Vienas šaltinis (bendri atsiliepimai) – gyvo testavimo ir vartotojų feedback analizė. Naudoti planuojant V2, B2B, formatų adaptaciją ir agentų darbus (CONTENT_AGENT, UI_UX_AGENT, QA_AGENT).
> **Versija:** 1 dalies santrauka ir mobile UI (2026-02-13); Modulio 2 užkrovimo atsiliepimas (2026-02-12); Donato atsiliepimas; V1 Testavimo feedback prieš 1.2 (2026-02-11). **2026-02-18:** WhatsApp kanalas, LinkedIn lead magnet, funnel – §11; **pirmoji testo savaite** – dalyvių ir auditorijos analizė – §12; pilnas dalyvių sąrašas – `dalyviu_sarasas.md` (neįkeliamas į GitHub). **2026-02-20:** 20260220 vartotojo testas (Moduliai 1–3, mobile, v1.0–1.2) – žr. šaltiniai ir skyrių žemiau.

---

## Atsakas į gyvo testavimo feedback (2026-02-13)

| Problema | Hipotezė | Sprendimas |
|----------|----------|------------|
| **Santraukos po 1 dalies sunku rasti; „reikia du kartus grįžti“** | Vartotojai ieško vienos „1 dalies“ apibendrinimo vietos; norint peržiūrėti M1 santrauką po M2/M3 reikia grįžti į M1 ir eiti į paskutinę skaidrę. | Pridėta **„1 dalies santrauka“** skaidrė po Modulio 3 (po „Praktikos Santrauka“): viena vieta, kur apibendrinami Moduliai 1+2+3. Po M3 completion ekrane – nuoroda **„Peržiūrėti 1 dalies santrauką“** (grįžti į tą skaidrę be „grįžti du kartus“). Žr. `docs/CONTENT_MODULIU_ATPAZINIMAS.md` §7, `modules.json` Modulio 3 skaidrė id 38. |
| **Senesni iPhone – vaizdas per didelis, žodžiai nukarpyti** | Safari text-size-adjust; konteineriai be word-break; etapų etiketės su truncate. | `index.css`: `-webkit-text-size-adjust: 100%` (html); body `overflow-wrap` / `word-break`. SlideGroupProgressBar: etiketės be `truncate`, su `break-words` ir `title` (tooltip). Žr. TEST_REPORT.md. |

---

## Šaltiniai

| Šaltinis | Data | Apimtis |
|----------|------|--------|
| **Modulio 2 – skaidrė neatsidaro (gyvas testas)** | 2026-02-12 | Vartotojas: 1 modulis išbandytas; Modulis 2 (Žinių patikrinimas) – matomas vazdas „Kraunama skaidrė“, bet skaidrė neatidaro, vis sukasi; bandyta perkrauti – tas pats. Apklausos nepildo dėl nepilno vaizdo. **Diagnostika:** įtrauktas debug instrumentavimas (ModuleView, useSlideNavigation); tikrinama hipotezė: išsaugota skaidrės pozicija (localStorage) viršija Modulio 2 skaidrių skaičių → currentSlideData undefined → begalinis „Kraunama skaidrė…“. Žr. TEST_REPORT.md po patvirtinimo. |
| **Gyvas testavimas** | 2025-05-02 | Demonstracija, stabilumas, bendri geri atsiliepimai; terminologijos pataisymai. Žr. `docs/GYVAS_TESTAVIMAS_2025-05-02.md`. |
| **Testų ataskaita (klaidos)** | 2026-02-07 – 2026-02-11 | Konkrečios klaidos, Moduliai 1–4 UX, Eglės ir Tomo patirtis, sprendimai. Žr. `docs/development/TEST_REPORT.md`. |
| **V1 Testavimo feedback analizė** | Prieš 1.2 (2026-02-11) | 4 testuotojai (54 m. teisininkė, 25 m. media planuotoja, 48 m. konsultantas, 56 m. vadovas); segmentai, horizontalios įžvalgos, strateginė išvada, V2 rekomendacijos. Žr. skyrius žemiau. |
| **Donato atsiliepimas (V1.2)** | 2026-02-12 (apytiksliai) | Kritinis UX/UI feedback: per daug spalvų, per daug info, neintuityvu, sunku suprasti svetainės logiką/struktūrą, prastas usability, nesinorėjo gilintis. Siūlymai: normali architektūra, simplifikacija, „vienos eilutės“ principas. Žr. skyrius žemiau. |
| **20260220 vartotojo testas (Moduliai 1–3)** | 2026-02-20 | Testuotojas Tomas Pranskūnas, Samsung S24, mobile. Turinys vertinamas; mobile – navigacija „šokinėja“, Apklausoje mygtukas „Pasitikrinti atsakymus“ neaktyvus po visų atsakymų. Rekomendacija: hibridinis Mobile+Desktop, aiškesnis progresas, fiksuota navigacija. **Apimtis:** tik M1–3 (M4–6 netestuoti). Žr. TEST_REPORT.md; detalės (20260220_Testas.txt) – lokaliai archyve. |

---

## Atsakas į 20260220 testo feedback (Moduliai 1–3, mobile)

**Kontekstas:** Testuota tik 1.0–1.2 versija, **Moduliai 1–3**. Moduliai 4–6 testavimui nebuvo pateikti.

| Problema | Sprendimas |
|----------|------------|
| **Apklausa: mygtukas „Pasitikrinti atsakymus“ / „Baigti apklausą“ neaktyvus** | QuizPage: pasirinkimo mygtukai ir navigacijos mygtukai – `min-h-[44px]`, `touch-manipulation` (patikimesnis tap mobile). Kai mygtukas disabled – rodomas aiškus pranešimas: „Pasirinkite atsakymą žemiau, tada galėsite pereiti…“ (aria-live, id=quiz-next-hint). |
| **Navigacija „šokinėja“ (mobile)** | useSlideNavigation: swipe atskirtas nuo vertikalaus scroll – skaidrė keičiama tik jei horizontalus judesys (deltaX) didesnis už vertikalų (deltaY) ir ≥ 60px. ModuleView: mobile bottom nav mygtukai – touch-manipulation. Fiksuota navigacija ir spacer (h-20) jau buvo. |

**Tolesni žingsniai:** pakartoti mobile QA (Samsung arba panašus) su fokusu į Apklausą ir skaidrių perėjimus.

---

## Donato atsiliepimas (V1.2) – analizė

**Kontekstas:** Atsiliepimas po V1.2 (atnaujintas UI, UX, nauji testai, mobile friendly). Šaltinis: apklausos / bendras įspūdis.

### Kas pasakyta (sutrumpinta)

| Kategorija | Atsiliepimas |
|------------|--------------|
| **Pozityvus** | „Šaunuolis, gerai padirbėta!“ |
| **Vizualė** | Per daug spalvų; per daug informacijos. |
| **Suprantamumas** | Neintuityvu; sunku suprasti logiką ir struktūrą svetainės; „visiška mėsmalė“. |
| **Elgsena** | Nesinorėjo naudoti ir gilintis; usability prastas. |
| **Siūlymai** | Normalus apsą architektūra; daryti simplifikuotai; „vienos eilutės“ principas (spaudi → rezultatas). |

### Atitikmuo su esamu dokumentavimu

- **Dizaino gidas** (`docs/development/GOLDEN_STANDARD.md`) jau adresuoja: per daug spalvų, per daug vizualinių akcentų, per daug kortelių, silpna hierarchija – Must/Should/Nice prioritetais.
- Donato feedback **sutampa** su tais pačiais skausmais: vizualinis triukšmas ir neaiški struktūra.
- **Naujas akcentas:** „vienos eilutės“ principas – mažiau žingsnių, aiški viena pagrindinė veikla (pvz. vienas CTA, vienas kelias).

### Rekomenduojami veiksmai (susieti su Donato feedback)

1. **UI/UX (prioritetas):** Vykdyti DESIGN_GUIDE Must punktus – riboti spalvas (2–3 per skaidrę), vienas dominuojantis akcentas, aiški H1→H2 hierarchija. UI_UX_AGENT + CODING_AGENT.
2. **Informacijos architektūra:** Peržiūrėti navigaciją ir informacijos struktūrą – ar vartotojas iš karto „mato“, kur eiti (vienas aiškus kelias). Galimas informacijos sumažinimas viršutiniuose lygiuose.
3. **„Vienos eilutės“ principas:** Kiekviename ekrane – viena pagrindinė veikla (pvz. vienas stiprus CTA); sumažinti paralelinių pasirinkimų skaičių ten, kur galima.
4. **Segmentas:** Donatas reprezentuoja vartotoją, kuriam svarbu greitas, paprastas patogumas – naudinga laikyti kartu su 25 m. segmentu („tingi skaityti“, noras greito rezultato).

---

# V1 Testavimo feedback analizė (prieš release 1.2)

## Testuotojų profilis

1. **Moteris, 54 m., teisininkė**
2. **Moteris, 25 m., media planuotoja**
3. **Vyras, 48 m., komunikacijos konsultantas**
4. **Vyras, 56 m., įmonės vadovas**

---

## 1. Pagrindiniai signalai pagal segmentus

### 54 m. teisininkė

**Raktažodžiai:** Struktūruota, aišku, informativu, „beveik ir pasimokiau tuo pačiu“, naudinga žaliems / pusžaliams.

**Išvada:** Aukštas aiškumo lygis, realus mokymosi efektas, tinka pradedančiai auditorijai, geras kognityvinis balansas (ne per sudėtinga).

---

### 25 m. media planuotoja

**Raktažodžiai:** Patiko, norėsiu pasigilinti, neturiu realaus pavyzdžio, jaunesnė auditorija tingi skaityti, siūlo video formatą.

**Išvada:** Vertė suvokiama; trūksta aiškaus pritaikymo (use-case); formatą reikia trumpinti / vizualizuoti; potencialas video-first versijai.

---

### 48 m. komunikacijos konsultantas

**Raktažodžiai:** Patinka skaityti, neturi pastabų.

**Išvada:** Tekstas įtraukiantis, tonas geras, emocinis palaikymas; nėra gilaus kritinio feedbacko; nepateikta aiški transformacijos indikacija.

---

### 56 m. įmonės vadovas

**Raktažodžiai:** Buvo žinoma, bet ir naujo, geri įspūdžiai, labai tvarkingai padaryta, dėstymas, praktika, testas.

**Išvada:** Struktūrinė validacija; vertina pilną mokymo ciklą; produktas suvokiamas kaip sisteminis; tinka B2B kontekstui.

---

## 2. Horizontalios įžvalgos

### Kas veikia

- Aiški struktūra
- Loginis dėstymas
- Praktikos integracija
- Testavimo elementas
- Profesionalus tonas
- Nėra atstūmimo reakcijų

### Kur silpniausia vieta

- Trūksta aiškaus „Kur pritaikyti?“ bloko
- Nėra instant-use-case jaunajai auditorijai
- Formatui trūksta trumpesnės versijos
- Nėra diferencijuoto lygio pozicionavimo

---

## 3. Segmentų žemėlapis

| Segmentas | Reakcijos tipas | Rizika | Galimybė |
|-----------|-----------------|--------|----------|
| 50+ profesionalai | Vertina struktūrą | Per daug teksto | B2B mokymai |
| 25–35 m. | Vertina greitį | Per ilga forma | Video versija |
| Patyrę konsultantai | Emocinis palaikymas | Nėra advanced lygio | Advanced modulis |
| Įmonių vadovai | Vertina sistemą | Reikia verslo use-case | Pardavimo argumentas |

---

## 4. Strateginė išvada

Produktas šiuo metu:

- Turi aiškų **Starter** lygio PMF
- Struktūriškai stiprus
- Suvokiamas kaip sisteminis
- Reikalauja formato adaptacijos jaunesnei auditorijai
- Turi potencialą B2B konvertuoti į „DI darbo metodiką“

---

## 5. Rekomenduojami veiksmai (V2)

1. Pridėti **„Kur tai pritaikyti?“** bloką po kiekvienu moduliu.
2. Sukurti **60–120 sek. micro video** versiją.
3. **Įvardinti lygį** (Starter).
4. Paruošti **Advanced** modulio planą.
5. Parengti **B2B pitch** versiją su struktūros akcentu.

---

## 6. Statusas (V1)

| Aspektas | Statusas |
|----------|----------|
| Turinio kokybė | ✔ Validuota |
| Struktūra | ✔ Validuota |
| Starter segmentas | ✔ Validuotas |
| Formatas jaunimui | ⚠ Tobulintinas |
| Advanced lygis | ⚠ Reikalingas |

---

---

## 7. Kiek V1.2 jau atitinka vartotojų atsiliepimus

### Kas jau padengta (1.2)

| V1 signalas / silpniausia vieta | Ką 1.2 padarė | Atitikmuo |
|---------------------------------|----------------|-----------|
| **Aiški struktūra, loginis dėstymas** | Struktūra palikta; 6 scenarijai M3, modulių aprašymai ≤120 simb., MVP (1–3 mod.) | ✔ Stiprinama |
| **Praktika + testas** | Remediation uždara kilpa („Grįžti į rezultatą“, „Pakartok 3 kl.“), diagnostinis quiz feedback, PracticalTask Redaguoti/Kopijuoti | ✔ Gerokai padengta |
| **Profesionalus tonas, nėra atstūmimo** | Action-intro hook („Problema – tavo promptas“), CTA „30 s“, Lucide ikonos, emerald M3 | ✔ Išlaikyta |
| **Jaunesnė auditorija / formatas** | 30 s CTA, trumpesnis hero; mobile UI (M2, M3 touch, overflow); **nėra** dar video ar „Kur pritaikyti?“ | ⚠ Dalinai (UX geresnė, turinio formato ne) |
| **B2B / vadovai vertina sistemą** | MVP leidžia siųsti „tik 3 modulius“; pilnas ciklas (moduliai → testas → rezultatai → remediation); **nėra** dar B2B pitch ar „Starter“ žymės | ⚠ Paruošta, bet be pozicionavimo |
| **Matavimas / outcome** | Vienas KPI + event tracking (`learningEvents.ts`), JSON Schema + CI, 5 min release QA gate | ✔ Techniškai padengta (analizės MUST) |

### Kas liko nepadengta (V1 atsiliepimai)

- **„Kur tai pritaikyti?“** – blokas po kiekvienu moduliu (V2 rekomendacija #1) – **nėra**.
- **60–120 sek. micro video** – (V2 #2) – **nėra**.
- **Įvardinti lygį (Starter)** – (V2 #3) – **nėra** (nėra UI žymės „Starter lygis“).
- **Advanced modulio planas** – (V2 #4) – **nėra** dokumentuoto plano.
- **B2B pitch versija** – (V2 #5) – **nėra**.
- **Instant use-case jaunajai auditorijai** – susiję su „Kur pritaikyti?“ ir video – **nėra**.
- **Diferencijuotas lygis** – tik vienas lygis (Starter) – **nėra** advanced.

---

## 8. Ką tobulinti toliau (prioritetai)

- **Turinys / pritaikymas:** „Kur pritaikyti?“ blokas po moduliu – tiesiogiai atsako į 25 m. ir vadovų „neturiu realaus pavyzdžio“ / „reikia verslo use-case“. Pirmas turinio prioritetas po 1.2.
- **Formatas jaunimui:** Trumpesnė versija arba video – didelė pastanga; pradėti nuo vieno „30 s“ ar „1 min“ takeaway skaidrės arba nuorodos į video (jei bus).
- **Pozicionavimas:** Įvardinti „Starter“ (HomePage arba Modulių puslapyje) – mažas pakeitimas, didelė aiškumo nauda.
- **B2B:** Pitch vienas puslapis arba PDF – naudinga įmonių vadovams; galima po to, kai „Kur pritaikyti?“ jau yra.

---

## 9. Must–Should–Want (vystant sistemą)

Sujungta su prioritetais MUST/SHOULD (žr. `TODO.md`, `docs/development/PLAN_AGENTAI_DARBAI.md`) ir V1 atsiliepimais.

### MUST (kritinis – jei nedarai, skausmas artimiausiai)

| # | Punktas | Šaltinis | 1.2 būklė |
|---|---------|----------|-----------|
| M1 | Turinio kontraktas (JSON Schema + CI) | Analizės verdiktas | ✔ Įgyvendinta |
| M2 | Vienas KPI + event tracking | Analizės verdiktas | ✔ Įgyvendinta |
| M3 | Remediation uždara kilpa | Analizės verdiktas | ✔ Įgyvendinta |
| M4 | Content QA gate prieš release | Analizės verdiktas | ✔ Įgyvendinta (5 min) |
| **M5** | **„Kur pritaikyti?“ po moduliu (bent 1–2 mod.)** | **V1 atsiliepimai** | ✔ Įgyvendinta (2026-03-11) |

*M5 – pirmas naujas MUST iš vartotojų: be „kur pritaikyti?“ sunku konvertuoti į „naudosiu“. Įgyvendinimas: ModuleCompleteScreen po Modulio 1 – blokas „Kur pritaikyti?“ su 4 use-case (projektų vadovas, marketingas, HR, analitikas). SOT: turinio_pletra.md; i18n module.useCaseHeading, useCaseM1_1–4. Galima vėliau išplėsti į Modulį 3.*

### SHOULD (stipriai pakels kokybę)

| # | Punktas | Šaltinis |
|---|---------|----------|
| S1 | 6 blokų checklist: structure check (ne tik keyword) | Analizės verdiktas |
| S2 | A11y automatika (axe-core smoke) | Analizės verdiktas |
| S3 | Design system įtvirtinimas (Card, Banner, CTA) | Analizės verdiktas |
| S4 | Optional → „Fast track“ toggle | Analizės verdiktas |
| **S5** | **Įvardinti lygį (Starter)** | **V1 atsiliepimai** |
| **S6** | **B2B pitch (1 puslapis / PDF)** | **V1 atsiliepimai** |

### WANT (nice-to-have)

| # | Punktas |
|---|---------|
| W1 | 60–120 sek. micro video (1–2 moduliams arba „kas yra 6 blokai“) |
| W2 | Advanced modulio planas (dokumentas, ne dar įgyvendinimas) |
| W3 | Spaced retry, remediation mini-proof (Analizės verdiktas) |

---

## 10. Rekomenduojama seka po 1.2

1. **CONTENT_AGENT + DATA:** Pridėti „Kur tai pritaikyti?“ bloką – pradėti nuo Modulio 1 ir 3 (SOT → `modules.json` → skaidrė/summary tipas). **MUST (M5).**
2. **CONTENT_AGENT + UI:** Įvardinti „Starter lygis“ – HomePage arba ModulesPage (vienas sakinys arba badge). **SHOULD (S5).**
3. **QA_AGENT / CONTENT:** Paruošti B2B pitch (1 puslapis: struktūra, praktika, testas, „DI darbo metodika“). **SHOULD (S6).**
4. **SHOULD techniniai:** 6 blokų structure check (S1), Fast track (S4), a11y smoke (S2) – pagal TODO.md ir PLAN_AGENTAI_DARBAI.md seką.
5. **WANT:** Advanced modulio planas (doc); video – kai bus resursų.

---

## Nuorodos į agentus ir release

- **Klaidos ir sprendimai:** `docs/development/TEST_REPORT.md` (QA_AGENT priima įrašus, TODO.md veiksmai).
- **Agentų router ir SOT:** `.cursor/rules/agent-orchestrator.mdc`, `docs/development/AGENT_ORCHESTRATOR.md`.
- **Release QA:** `docs/development/RELEASE_QA_CHECKLIST.md`.
- **Analizės verdiktas (MUST/SHOULD):** `TODO.md`, `docs/development/PLAN_AGENTAI_DARBAI.md`, `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md`.
- **Roadmap (user feedback):** `ROADMAP.md` – skyrius „User feedback“.
- **Roadmap versija 2.0:** `ROADMAP.md` – skyrius „Plėtros planas – versija 2.0 (Must–Should–Want)“: M5, S1–S6, W1–W3.

*Paskutinis atnaujinimas: 2026-02-18 (V1 analizė; 1.2 atitikmuo; §11 funnel; §12 pirmoji testo savaite).*

---

## 11. Marketingo funnel ir monetizacija (2026-02-18)

**Kontekstas:** LinkedIn vyksta lead magnet (nemokami 3 moduliai), susidomėję vartotojai per funnel patenka į WhatsApp kanalą. Reikia nuosekliai monetizuoti ir pasiūlyti 4 modulį mokamai.

### Kanalai ir funnel

| Etapas | Kanalas | Turinys / veiksmas |
|--------|--------|---------------------|
| **Įtraukimas** | LinkedIn | Lead magnet: „Nemokami 3 moduliai“ – pritraukia susidomėjusius. |
| **Kvalifikacija** | Funnel | Vartotojas užsiregistruoja / gauna prieigą prie 1–3 modulių. |
| **Bendruomenė** | WhatsApp | Nuoroda į grupę: [WhatsApp – prisijunk prie kanalo](https://chat.whatsapp.com/It49fzTl1n90huRCoWWkwu?mode=gi_t). Čia renkami lead’ai, palaikomas įsitraukimas, toliau siunčiamas turinys ir pasiūlymai. |

### Monetizacija – kaip pasiūlyti 4 modulį mokamai

- **Laikas:** Pasiūlyti po to, kai vartotojas užbaigė arba aktyviai naudoja 1–3 modulius (matoma pagal progresą arba apklausą / WhatsApp reakcijas).
- **Vertė:** Modulis 4 – konteksto inžinerija, RAG, Deep research, haliucinacijos, žinių patikrinimas – natūralus „kitų žingsnis“ po 6 blokų pagrindų (M1–M3). Pozicionuoti kaip „gilinimas“ ir „saugus darbas su šaltiniais“.
- **Kur pasiūlyti:** WhatsApp kanale (trumpas pranešimas + nuoroda), po M3 completion ekrane (CTA „Toliau – Modulis 4“ su nuoroda į mokamą variantą), el. paštu (jei renkami adresai).
- **Integracija su atsiliepimais:** V1 atsiliepimai rodo, kad struktūra ir „kas toliau“ aiškumas vertinami; „Kur pritaikyti?“ (M5) padės ir monetizacijos žinutei – pabrėžti, kur Modulis 4 naudingas (verslo analizė, šaltinių patikimumas).

### Nuorodos

- **Rinkodaros planas (pilnas):** `docs/marketing_plan.md` – kanalai (LinkedIn, WhatsApp), funnel, monetizacija M4, žinutės, MUST–SHOULD–WANT, metrikos.
- **Roadmap (User feedback):** `ROADMAP.md` – skyrius „User feedback“; stebėti atsiliepimus ir analytics, iteruoti pagal duomenis.
- **Galutinis dalyvių sąrašas (132 asmenys):** §12.1a; pilnas sąrašas vienoje vietoje – **`dalyviu_sarasas.md`** (root, neįkeliamas į GitHub). Dokumentacijoje – tik nuoroda, kopijų repo nėra.

---

## 12. Pirmoji testo savaite (2026-02-18) – dalyviai ir auditorijos įžvalgos

**Šaltiniai:** Duomenų analizė iš dviejų cohort: 2026-02-18 (43 asmenys) ir 2026-02-13 (89 asmenys). Galutinis sujungtas sąrašas – **`dalyviu_sarasas.md`** (root); dokumente §12.1a – tik nuoroda (sąrašas neįkeliamas į GitHub).

**Kas čia:** Testuotojai, vartotojai ir potencialūs klientai, susidomėję kursu (LinkedIn lead magnet / funnel kontekste). Iš viso **132 asmenys** – profesionali, B2B orientuota auditorija. Lead follow-up ir outreach naudoja integruotą strategiją (segmentai A/B/C, ne masinė komunikacija, 3 pitch'ai pagal rolę) – žr. `dalyviu_sarasas.md` ir `docs/marketing_plan.md` poskyrį „Segmentuota B2B ir lead follow-up strategija“.

### 12.1 Dalyvių santrauka (pagal sritis)

| Sritis | Apytikslis dalis | Pavyzdžiai pareigų / įmonių |
|--------|------------------|-----------------------------|
| **IT / Data / Projektų valdymas** | ~40 % | IT Business Analyst, IT/Product/Project Manager, DevOps, Head of Data, Developer/Data Analyst, Senior Business Data Analyst (Telia), Senior Project Manager (Telia Lietuva) |
| **Marketingas ir komunikacijos** | ~25 % | Marketing Manager, Marketing (innovation/exploring), Komunikacijos trenerė, Event & BTL Manager, Marketing Manager Baltics (Coffee Address) |
| **HR / Lyderystė / Vadovavimas** | ~20 % | Lead People & Culture, Head of HR/CHRO, Mentor, Executive Coach, Dean/Lecturer, COO (Northcliffe Lighting), Executive Leader/Board (IIA Lithuania) |
| **Kitos sritys** | ~15 % | Tax/Finance, Commercial Real Estate, Customer Experience (BC Žalgiris), Energy Solutions (VDCenergy), Change Request Manager, Sales Project Manager |

**Įmonių pavyzdžiai (nurodyti dalyvių):** Telia, Telia Lietuva, KTU, Vilnius University, IIA Lithuania, VLE, Medžio karma, Coffee Address, BC Žalgiris, Northcliffe Lighting, VDCenergy solutions, #zvaigzdynaivirsezero.

### 12.1a Galutinis dalyvių sąrašas (132 asmenys, dubliatų nėra)

**Pilnas sąrašas – vienoje vietoje analizei (neįkeliamas į GitHub):** `dalyviu_sarasas.md` (projekto šaknyje).

- Sujungti šaltiniai: **2026-02-18** (43 asmenys) ir **2026-02-13** (89 asmenys). Patikrinta – dubliatų tarp cohort nėra.
- Dokumentacijoje ir repo **nėra kopijų** vardų/pavardžių – visur naudojama tik nuoroda į šį failą. Failas įtrauktas į `.gitignore`.

### 12.2 Pagrindinės įžvalgos

1. **Auditorija stipriai profesionali ir B2B orientuota** – atitinka tikslinę auditoriją iš `docs/marketing_plan.md` (§2) ir V1 segmentų žemėlapį (§3).
2. **Aukštas vadovų lygis** – daug Head/Lead/Manager, C-level (COO, Executive Leader), universiteto dėstytojai (KTU, VU). Tai sprendimų priėmėjai ir influenceriai – tinka B2B pitch (S6) ir komandos apmokymui.
3. **Stiprus Telia „klasteris“** – keli dalyviai iš Telia ekosistemos; galima naudoti tinklo efektą (rekomendacijos, vidinis sklaida).
4. **Marketing + IT sankirta** – daug žmonių tarp skaitmeninių produktų, marketingo ir duomenų; aukštas susidomėjimas skaitmeninėmis kompetencijomis – gerai suderinama su „6 blokų sistema“ ir Modulio 4 (šaltinių patikimumas, analizė).

### 12.3 Integracija su esamu planu

| Dokumentas / skyrius | Ryšys su pirmaja testo savaite |
|---------------------|--------------------------------|
| **marketing_plan.md §2 (auditorija)** | Patvirtinimas: profesionalai 35–55 m., B2B sprendžiantys, marketingas/HR/PM – tiesiogiai atitinka dalyvių profilį. |
| **§11 (funnel, WhatsApp)** | Šie dalyviai – potencialūs lead’ai iš LinkedIn/funnel; kvalifikacija pagal rolę (vadovai, COO, Head of…) – prioritetas M4 pasiūlymui. |
| **V1 §3 segmentų žemėlapis** | 50+ profesionalai, įmonių vadovai – sutampa; „B2B mokymai“ ir „pardavimo argumentas“ – aktualu. |
| **M5 „Kur pritaikyti?“** | Vadovams ir „Marketing + IT“ auditorijai – konkretūs use-case (verslo analizė, šaltinių patikimumas, komandos apmokymas) padidins konversiją. |

### 12.4 Rekomenduojami žingsniai (remiantis šiais duomenimis)

- **B2B pitch (S6):** Pabrėžti vadovų ir C-level auditoriją – „dėstymas, praktika, testas“, komandos apmokymas, Telia pavyzdys (jei leidžia).
- **Žinutės WhatsApp / M4 pasiūlymui:** Tiksinti pagal sritį (IT/Data – Modulis 4 šaltiniai ir RAG; Marketing – turinio ir analizės use-case; HR – apmokymo sistema).
- **„Kur pritaikyti?“ (M5):** Įtraukti pavyzdžius pagal šias roles: projektų vadovas, marketingo vadovas, HR vadovas, duomenų analitikas – tiesioginė atitiktis su dalyvių profiliais.

*Paskutinis atnaujinimas: 2026-02-18 (pirmoji testo savaite integruota; §12 pridėtas).*
