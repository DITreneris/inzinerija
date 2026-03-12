# Mokymų sistemos audito ataskaita: Moduliai 1–6

**Rolė:** Senior UI/UX dizaineris, Learning Experience strategas, skaitmeninių mokymų produkto audito ekspertas  
**Apimtis:** Mokymų platforma (repo), moduliai 1–6 (LT ir EN), informacijos architektūra, pedagogika, praktinė vertė, LT/EN nuoseklumas  
**Data:** 2026-03-11  
**Šaltiniai:** `docs/DOCUMENTATION_QUICK_REF.md`, `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `docs/development/TEST_REPORT.md`, `docs/development/GOLDEN_STANDARD.md`, `docs/PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md`, `docs/development/CODEBASE_WHAT_IS_DONE.md`, `src/data/modules.json`, `ModuleView.tsx`, turinio SOT (turinio_pletra.md, turinio_pletra_moduliai_4_5_6.md)

---

## 1. Executive summary

Mokymų sistema (Moduliai 1–6) turi **aiškų turinio rėmą**, **nuoseklią modulių seką** (mokymasis → testas → praktika) ir **pilną LT/EN duomenų sluoksnį**. Didžiausias **sisteminis silpnumas** – trintis tarp „matau vertę“ ir „gavau rezultatą“: trūksta aiškaus **„Kur pritaikyti?“** bloko po modulių, **momentinių laimėjimų** (micro-wins) pirmose skaidrėse ir vienodos **navigacijos / progreso** patirties visuose moduliuose. **LT vs EN** – struktūra ir loaderis sutvarkyti; likę pavieniai semantiniai ir tono skirtumai. **Prioritetas:** pirmiausia sumažinti kognityvinę apkrovą ir trintį (vienas dominuojantis CTA, aiškesnis „ko mokausi / ką darysiu“), paskui – „Kur pritaikyti?“ ir refleksijos elementai.

---

## 2. Kas labiausiai laužo mokymosi patirtį

| Vieta | Problema | Poveikis |
|-------|----------|----------|
| **Pirmas ekranas (M1, M4)** | Vertė (whyBenefit) pateikiama, bet **pirmas veiksmas per 1–2 min** ne visur vienodai aiškus; M4 – reveal po CTA gali atrodyti kaip „dar vienas skaidrės blokas“. | Vartotojas vėluoja pajusti „dariau kažką“ → mažesnis įsitraukimas. |
| **Ilgi moduliai (M4 ~41 skaidrė)** | Skaidrių taškai (navigacija) – horizontalus scroll įgyvendintas (GOLDEN_STANDARD §8.5), bet **„kur esu temoje“** (phase labels) priklauso nuo slidePhaseConfig; vienodas vizualinis svoris visoms skaidrėms. | Didelė kognityvinė apkrova; sunku sustoti ir grįžti „į vietą“. |
| **Po modulio – nėra „Kur pritaikyti?“** | V1 atsiliepimai ir MUST M5: **nėra** bloko „Kur tai pritaikyti?“ po Modulio 1, 3 ar 6. | Konversija į „naudosiu darbe“ silpna; 25 m. segmentas ir vadovai nori aiškaus use-case. |
| **Praktika (M3, M6)** | M3 – 6 scenarijai; M6 – vienas projektas. **Scaffolding** (projekto etapai su sustojimais) dokumentuotas (PEDAGOGINE_ANALIZE §2.5), bet ne visur vienodai matomas UI („Galite sustoti ir išsaugoti“). | Didelis žingsnis be tarpinių laimėjimų → didesnė atsisakymo tikimybė. |
| **Testas (M2, M5)** | Quiz – paaiškinimai rodomi po atsakymo (įspręsta); rezultatų ekrane **scroll** – viršutinį neteisingą atsakymą nesunku pražiopsoti (TEST_REPORT). | Silpnesnė remediacijos nauda. |
| **Navigacija / CTA** | Donato feedback: per daug spalvų, neaiški struktūra, „vienos eilutės“ principas ne visur. GOLDEN_STANDARD riboja spalvas ir CTA, bet **viena dominuojanti veikla per skaidrę** dar ne visur nuosekliai. | Sumažėjęs aiškumas „ką daryti dabar“. |

---

## 3. Kas yra 3 svarbiausios sistemos problemos

1. **Trintis tarp „išmokau“ ir „pritaikysiu“**  
   Sistema aiškiai moko (6 blokai, RAG, testas, praktika), bet **nėra vienos aiškios vietos**, kur vartotojas pamatytų: „Štai kur savo darbe gali tai naudoti.“ Tai sisteminė spraga: turinys ir testas stiprūs, **perėjimas į naudą** – neįformintas (M5 „Kur pritaikyti?“ dar neįgyvendintas).

2. **Nenuosekli pirmos minutės patirtis**  
   M1 action-intro – 30 s CTA, palyginimas; M4 – reveal po CTA, daug blokų (whyBenefit, hero, outcomes, tools). **Pirmas konkretus veiksmas** („pasirink įrankį“, „nukopijuok vieną sakinį“) skirtingose moduliuose skiriasi; nėra vieno etalono „per 60 s jau kažką padarei“.

3. **Ilgo modulio (M4) kelionė be pakankamų atodūrių**  
   ~41 skaidrė, section-break ir phase labels yra, bet **savitikros** (formatinis grįžtamasis ryšys) po temų (RAG, Deep research, tokenai) – rekomenduotos, ne visur įgyvendintos (PEDAGOGINE_ANALIZE §2.3; TODO P3). Vartotojas ilgai „skaito“ be „ar supratau?“ patikros.

---

## 4. Kur didžiausias potencialas greitam pagerinimui

- **Modulių puslapis ir pirmos skaidrės:** vienas aiškus **„Po šio modulio galėsi:“** (5–6 punktų) M4 pradžioje jau SOT (turinio_pletra_moduliai_4_5_6 §1.3); užtikrinti, kad tai **matoma skaidrėse** (ne tik doc), ir atitinka M1/M3 pirmų skaidrių logiką.
- **„Kur pritaikyti?“** – vienas blokas po Modulio 1 arba 3 (VARTOTOJU_ATSILIEPIMAI §8, MUST M5): 1–2 savaitės darbas, didelis poveikis konversijai ir segmentų (25 m., vadovai) poreikiui.
- **Rezultatų ekrano (quiz) scroll ir paryškinimas** – užtikrinti, kad pirmas klausimas/atsakymas matomas arba klaidingi atsakymai vizualiai paryškinti (TEST_REPORT; TODO „Iš vartotojo testų“ #3).
- **Vienas dominuojantis CTA** – auditas skaidrėse pagal GOLDEN_STANDARD §4.2: vienas stiprus CTA per skaidrę; antriniai – slate/mažesnis mygtukas. Greitas laimėjimas – sumažinti pasirinkimų skaičių ten, kur jau per daug.

---

## 5. Sisteminės trintys (Top friction map)

### 5.1 Onboarding ir pirmas veiksmas

| Problema | Kur pasireiškia | Kodėl trukdo | Poveikis vartotojui | Poveikis verslui |
|----------|------------------|--------------|---------------------|-------------------|
| Ne visur aiškus „ką daryti per 1–2 min“ | M1, M4 pirmos skaidrės | firstActionCTA skiriasi; M4 daug blokų vienu metu | Vėluoja pajusti kontrolę ir progresą | Mažesnis completion pirmose skaidrėse |
| „Kur pritaikyti?“ nėra | Po M1, M3, M6 | Blokas neįgyvendintas (M5) | Neaišku, kur naudoti žinias | Silpnesnė konversija į naudą ir B2B |

### 5.2 Kognityvinė apkrova

| Problema | Kur pasireiškia | Kodėl trukdo | Poveikis vartotojui | Poveikis verslui |
|----------|------------------|--------------|---------------------|-------------------|
| Per daug informacijos / spalvų viename ekrane | Donato feedback; skaidrės su 3+ blokų tipais | Silpna hierarchija; daug semantinių akcentų | Sumažėjęs skenuojamumas, „nesinorėjo gilintis“ | Drop-off, neigiamas įspūdis |
| Ilgas modulis be tarpinių „ar supratau?“ | M4 (RAG, Deep research, tokenai) | Savitikros skaidrės – rekomenduotos, ne visur | Ilgai skaito be grįžtamojo ryšio | Mažesnis suvokimas ir pasitikėjimas |

### 5.3 Navigacija ir progresas

| Problema | Kur pasireiškia | Kodėl trukdo | Poveikis vartotojui | Poveikis verslui |
|----------|------------------|--------------|---------------------|-------------------|
| „Kur esu temoje?“ ilgame modulyje | M4, SlideGroupProgressBar | Phase labels priklauso nuo konfigo; ne visi moduliai vienodai | Sunku sustoti ir vėliau grįžti | Mažesnis užbaigimas ilguose moduliuose |
| Rezultatų ekrane scroll | Quiz rezultatai (M2, M5) | Pirmas neteisingas atsakymas gali būti virš fold | Praleidžia klaidas, silpnesnė remediacija | Mažesnis žinių sustiprinimas |

### 5.4 Praktinė vertė ir scaffolding

| Problema | Kur pasireiškia | Kodėl trukdo | Poveikis vartotojui | Poveikis verslui |
|----------|------------------|--------------|---------------------|-------------------|
| Projektas kaip vienas didelis žingsnis | M6 | Nėra aiškių etapų „sustok čia, išsaugok“ | Didelė abejonė prieš pradedant | Atsisakymas prieš projektą |
| Mažai „pataisyk promptą“ tipo užduočių | M4, M6 | Daugiausia copy-paste; PEDAGOGINE_ANALIZE §2.6 | Mažiau kritinio mąstymo | Silpnesnė aplikacija |

---

## 6. LT vs EN analizė

### Kas nuoseklu

- **Struktūra:** `modules.json` (LT) + `modules-en.json` (M1–M3) + `modules-en-m4-m6.json` (M4–M6); loaderis merge pagal locale. Skaidrių tipai ir content-block schema vienodi.
- **UI stringai:** 16 namespace (common, nav, module, quiz, glossary, certificate, contentSlides ir kt.); komponentai naudoja `useLocale()` ir `useTranslation()`.
- **Duomenys:** glossary, certificateContent, M5/M6 handout, introPiePdf, questionPool, aiDetectors – atskiri EN failai arba locale getteriai.
- **Validacija:** `validate-schema.mjs` tikrina ir EN M4–M6 failą (LT_EN_M4-6_PLAN_VERIFICATION).

### Kas išsikreipia tarp kalbų

- **Semantika ir tonas:** Pavieniai LT žodžiai ar ilgesni copyable blokai gali skirtis (LT_EN_M4-6_PLAN_VERIFICATION §3 – mikro auditas). Rekomenduojama spot-check: CTA, whyBenefit, firstActionCTA – ar EN ne per formalus arba ne per laisvas.
- **Modulio 1 blokų skaidrės:** Buvo EN→UI mišri kalba (antraštė EN, kūnas LT); pataisyta per contentSlides namespace (TEST_REPORT 2026-03-10). Likę panašūs atvejai – tik per rankinę peržiūrą.

### Kur atsiranda mokymosi kokybės skirtumai

- **Glossary terminai:** EN turi atitikmenis M4–M6; jei kur nors terminas pateikiamas tik vienoje kalboje ar skirtingai – vartotojas gali prarasti kontekstą.
- **Refleksijos ir „3 klausimai sau“:** Jei refleksijos skaidrės turinys skiriasi tarp LT/EN (pvz. ilgesnės pastraipos EN), krūvis gali būti skirtingas.

### Kur sistema atrodo „sulipdyta“, o ne vientisa

- **Triple failas moduliams:** LT = vienas `modules.json`; EN = base + merge iš dviejų failų (M1–M3, M4–M6). Logiškai teisinga, bet naujokui repo – sudėtingiau suprasti, kur keisti EN turinį.
- **Phase labels:** `slidePhaseConfig` + `PHASE_LABEL_TO_KEY` – reikia vertimų modulio namespace; jei pridedama nauja fazė, reikia atnaujinti ir EN.

---

## 7. Pedagoginė analizė

### Aiškumas

- **Stiprybė:** 6 blokų sistema, modulių seka (learn → test → practice), whyBenefit pirmose skaidrėse, outcomes sąrašai.
- **Spraga:** Mokymosi tikslai („Po šio modulio galėsi:“) yra SOT (turinio_pletra_moduliai_4_5_6 §1.3), bet **nepakankamai vienodai matomi visose pirmose skaidrėse**; M4 įvade – daug informacijos vienu metu (hero, palyginimas, outcomes, tools).

### Temų seka

- **Stiprybė:** Bloom atitiktis (žinoti → suprasti → taikyti); M4 skyriai (section-break) ir recap; M5 slenksčiai (≥70%); M6 projektas po testo.
- **Spraga:** „Minimalus kelias“ (4.1, 4.2, 4.3, 4.5, 4.6, 4.7) nėra aiškiai parodytas vartotojui (PEDAGOGINE_ANALIZE §2.8).

### Krūvio valdymas

- **Stiprybė:** duration nurodyta; collapsible „Nori suprasti detaliau?“; warm-up-quiz (M4) įvestas.
- **Spraga:** Ilgose M4 skaidrėse nėra pakankamai „kvėpavimo pauzių“; savitikros po temų – backlog (TODO P3).

### Praktinių užduočių vertė

- **Stiprybė:** Copyable promptai, PracticalTask su žingsniais, M3 scenarijai, M6 projektas.
- **Spraga:** „Pataisyk promptą“ tipo užduotis – rekomenduota, ne įgyvendinta (PEDAGOGINE_ANALIZE §2.6); projekto etapai (6 žingsniai su sustojimais) ne visur aiškiai atpažįstami UI.

### Ar moduliuose aišku: ko mokausi, kodėl tai svarbu, ką su tuo darysiu praktiškai

- **Ko mokausi:** Taip – outcomes ir section recap.
- **Kodėl svarbu:** Dalinai – whyBenefit ir „Kodėl pažangusis lygis?“ yra SOT; M4 pirmoje skaidrėje daug blokų gali silpninti vieną stiprią žinutę.
- **Ką darysiu praktiškai:** Silpniausia – trūksta „Kur pritaikyti?“ ir aiškių use-case po modulio (V1 atsiliepimai).

---

## 8. Praktiškumo ir naudos analizė

- **Ar sistema veda į realų rezultatą:** Taip – 6 blokai, testas, 6 scenarijai (M3), vienas projektas (M6), sertifikatai. Silpnybė – perėjimas iš „išlaikiau testą“ į „naudoju darbe“ nėra aiškiai palaikomas.
- **Kur turinys per daug teorinis:** M4 vidurys (RAG, Deep research, tokenai) – daug sąvokų; collapsible ir section-break padeda, bet trūksta trumpų „ką daryti dabar“ ir savitikrų.
- **Kur trūksta „immediate wins“:** Pirmos M1/M4 skaidrės – CTA per 30 s / 1 min yra, bet ne visur vienodai stiprus; M1 micro-win (TODO post-release) – „trumpas copy/paste arba vienas klausimas“.
- **Kur verta supaprastinti:** M4 pirmoji skaidrė – viena stipri žinutė + vienas CTA pirmame ekrane; M6 įvadas – 2–3 alternatyvūs projekto tipai (PEDAGOGINE_ANALIZE §2.2), kad vartotojas pasirinktų artimą rolės.

---

## 9. Low hanging fruits (prioritetinis sąrašas)

### Greiti laimėjimai (1–3 dienos)

| Pakeitimas | Kodėl svarbus | Sudėtingumas | Poveikis |
|------------|----------------|--------------|----------|
| Quiz rezultatų ekrane – scroll į view arba paryškinti klaidingus atsakymus | Remediacija efektyvesnė; TEST_REPORT | Žemas (CODING) | Vidutinis |
| M4 pirmoje skaidrėje – vienas dominuojantis CTA pirmame ekrane (whyBenefit + vienas mygtukas), reveal po to | Sumažina kognityvinę apkrovą; Donato feedback | Vidutinis (CONTENT + DATA) | Aukštas |
| Patikrinti vieną CTA per skaidrę (GOLDEN_STANDARD §4.2) – 3–5 skaidrių M1/M4 | Mažiau pasirinkimų, aiškesnė veikla | Žemas (auditas + pataisymai) | Vidutinis |

### Svarbūs pagerinimai (1–2 savaitės)

| Pakeitimas | Kodėl svarbus | Sudėtingumas | Poveikis |
|------------|----------------|--------------|----------|
| „Kur pritaikyti?“ blokas po Modulio 1 arba 3 (MUST M5) | Tiesioginė konversija į „naudosiu“; V1 #1 rekomendacija | Vidutinis (CONTENT + DATA + UI) | Aukštas |
| Modulio 4 pradžioje – „Po šio modulio galėsi:“ 5–6 punktų aiškiai skaidrėje (jau SOT) | Tikslų matomumas; PEDAGOGINE_ANALIZE §2.1 | Žemas (DATA + peržiūra) | Aukštas |
| M6 – projekto etapai (6 žingsniai) su „Galite sustoti čia“ / išsaugoti | Scaffolding; mažesnė atsisakymo rizika | Vidutinis (CONTENT + DATA + UI) | Aukštas |
| „Minimalus kelias“ M4 – vienas blokas „Kaip naudoti šį modulį“ (min vs pilnas) | Diferenciacija; PEDAGOGINE_ANALIZE §2.8 | Žemas | Vidutinis |

### Sisteminiai pakeitimai (v2 etapas)

| Pakeitimas | Kodėl svarbus | Sudėtingumas | Poveikis |
|------------|----------------|--------------|----------|
| Savitikros skaidrės po RAG, Deep research, tokenų (M4) | Formatinis grįžtamasis ryšys | Vidutinis (CONTENT + DATA + warm-up-quiz tipas) | Aukštas |
| „Pataisyk promptą“ – viena užduotis M4 arba M6 | Kritinis mąstymas, ne tik copy-paste | Vidutinis | Vidutinis |
| Įvardinti „Starter lygis“ (HomePage / ModulesPage) | Segmentų aiškumas; V1 S5 | Žemas | Vidutinis |
| B2B pitch (1 puslapis / PDF) | Vadovų ir C-level; V1 S6 | Vidutinis | Verslo |

---

## 10. Top 10 konkrečių rekomendacijų visai sistemai

1. **Vienas aiškus „pirmas veiksmas per 60 s“ etalonas** – visi moduliai (M1, M3, M4, M6) turi vienodą logiką: pirmame ekrane viena stipri žinutė + vienas CTA; po jo – reveal arba kitas žingsnis. Dokumentuoti GOLDEN_STANDARD ir tikrinti naujoms skaidrėms.
2. **„Kur pritaikyti?“ kaip privalomas blokas** – bent po M1 ir M3 (arba M6); viena skaidrė / blokas su 3–5 use-case pagal rolę (projektų vadovas, marketingas, HR, analitikas). SOT + modules.json + summary arba atskira skaidrė.
3. **Vienas dominuojantis CTA per skaidrę** – auditas pagal GOLDEN_STANDARD §4.2; antriniai veiksmai – slate, mažesnis mygtukas arba nuoroda. Sumažinti spalvų ir mygtukų skaičių ten, kur per daug.
4. **Rezultatų ekrano (quiz) pataisa** – pirmas klausimas/atsakymas matomas (scroll into view) arba klaidingi atsakymai vizualiai paryškinti; TEST_REPORT ir TODO.
5. **M4 pirmoji skaidrė – supaprastinimas** – hook fazė: tik whyBenefit + vienas CTA; hero, outcomes, tools – tik po reveal. Sumažinti pirmo ekrano blokų skaičių.
6. **Projekto etapai (M6) matomi UI** – 6 žingsniai (META → INPUT → … → ADVANCED) su galimybe sustoti; „Galite išsaugoti ir grįžti vėliau“ – aiškiai parašyta.
7. **Phase / „kur esu“ nuoseklumas** – SlideGroupProgressBar ir phase labels vienodai naudojami visuose ilguose moduliuose; nauji moduliai gauna phase konfigą.
8. **Minimalus kelias (M4, M6)** – vienas blokas modulio pradžioje: „Minimalus: skaidrės X, Y, Z; Pilnas: visos.“ Skirtas tiems, kurie skuba.
9. **LT/EN semantinis spot-check** – CTA, whyBenefit, firstActionCTA – palyginti LT ir EN; užtikrinti, kad tonas ir aiškumas vienodi (ne per formalus EN).
10. **Refleksijos skaidrė (M6) ir „3 klausimai sau“ (M4.7)** – turinys SOT ir moduliuose; jei dar trūksta – pridėti ir sinchronizuoti su JSON.

---

## 11. Kas turi būti daroma pirmiausia

1. **Pirmas žingsnis:** Quiz rezultatų ekrano pataisa (scroll / paryškinimas) – greitas, dokumentuotas skausmas (TEST_REPORT).  
2. **Antras žingsnis:** „Kur pritaikyti?“ blokas – pradėti nuo vieno modulio (M1 arba M3): SOT → modules.json → skaidrė arba summary tipo blokas. MUST M5.  
3. **Trečias žingsnis:** M4 pirmos skaidrės supaprastinimas (vienas CTA + reveal) ir „Po šio modulio galėsi:“ aiškiai matomas – jau SOT, reikia tik vizualinio ir duomenų patikrinimo.

### Ko dabar nedaryti

- **Nepradėti** didelio M4 skaidrių skaičiaus mažinimo (turinio kirpimas) – geriau pirmiausia savitikros ir „minimalus kelias“.
- **Nekeisti** EN failų struktūros (triple merge) – ji veikia; vietoje to – semantinis ir tono auditas.
- **Nedubluoti** turinio – „Kur pritaikyti?“ ir refleksija turi būti aiškiai atskirti (pirma – nauda/use-case, antra – metaloginis apmąstymas).

---

## 12. Top 5 rizikos / klaidos, jei sistema būtų tobulinama neteisingai

1. **Per daug pakeitimų vienu metu** – keičiant IA, turinį ir UI kartu, didelė regresijos ir „sulipdyto“ jausmo rizika. Veikti etapais: pirmiausia vienas dominuojantis CTA ir rezultatų ekranas, paskui „Kur pritaikyti?“.
2. **„Kur pritaikyti?“ kaip ilgas tekstas** – jei blokas bus per ilgas arba be skaidrų/struktūros, vartotojas praleis. Laikytis: 3–5 use-case, trumpi punktai, gal su nuorodomis į atitinkamas skaidres.
3. **LT/EN skirtumų ignoravimas** – keičiant tik LT turinį ir nepatikrinant EN, atsiranda semantinių neatitikimų. Kiekvienam turinio pakeitimui – atitikmens EN patikra (bent spot-check).
4. **Navigacijos supaprastinimas per daug** – jei phase labels arba skaidrių taškai būtų pašalinti siekiant „paprastumo“, ilguose moduliuose prarandamas „kur esu“. Laikytis GOLDEN_STANDARD §8.5 (viena eilutė, horizontalus scroll).
5. **Naujų skaidrių tipų be etalono** – jei pridedami savitikros arba „Kur pritaikyti?“ be GOLDEN_STANDARD ir content-block schemos, atsiranda nenuoseklumas. Nauji tipai – dokumentuoti ir naudoti tą pačią blockVariant / CTA logiką.

---

**CHANGES:**  
- Sukurtas naujas failas `docs/AUDITO_ATASKAITA_MODULIAI_1_6_UI_UX_LEARNING.md`.

**CHECKS:**  
- Ataskaita paremta `docs/DOCUMENTATION_QUICK_REF.md`, `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `docs/development/TEST_REPORT.md`, `docs/development/GOLDEN_STANDARD.md`, `docs/PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md`, `docs/development/CODEBASE_WHAT_IS_DONE.md`, `CONTENT_MODULIU_ATPAZINIMAS.md`, turinio SOT ir `ModuleView` / modules loader logika.

**RISKS:**  
- Kai kurios rekomendacijos reikalauja CONTENT + DATA + CODING (pvz. „Kur pritaikyti?“) – reikia agentų sekos pagal AGENT_ORCHESTRATOR.  
- Prioritetai gali būti koreguojami pagal release grafiką (P1 release užduotys TODO lieka pirmiausia).

**NEXT:**  
1. Product/QA – priimti prioritetus (rezultatų ekranas, M5 „Kur pritaikyti?“) ir įrašyti į TODO.  
2. CONTENT_AGENT + DATA_AGENT – „Kur pritaikyti?“ blokas (SOT + modules.json) vienam moduliui.  
3. CODING_AGENT – quiz rezultatų ekrano scroll/paryškinimas pagal TEST_REPORT.
