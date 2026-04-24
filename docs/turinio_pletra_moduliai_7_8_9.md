# Turinio plėtra – Moduliai 7, 8, 9 (Duomenų analizės kelias)

> **Autorinė mokymo medžiaga © 2024–2026 Tomas Staniulis**  
> Šis dokumentas yra **turínio SOT** Duomenų analizės keliui (Moduliai 7–9). Papildo `turinio_pletra.md` ir modulius 1–6.  
> **Source of truth:** turinio semantika – šis failas; duomenų struktūra – `src/data/modules.json` po sinchronizacijos.  
> **Pagrindas:** [docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md](development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md). **Integruota:** 02_DA „Duomenų analizės pagrindai“ (I–XIII). **M8–M9 praktika:** 5 blokai, 16 scenarijų (įsk. DA_4 vizualizacija ir data storytelling) – §9.1, §10.1–10.3. **DA_4:** §7A (vizualizacija, psichologija, Geštaltas, 4+super promptai, alternatyvos).

---

## 1. Apimtis ir tikslai

### 1.1 Vieta kurse

| Moduliai 1–6                                                   | Moduliai 7–9                                                 |
| -------------------------------------------------------------- | ------------------------------------------------------------ |
| 6 blokų sistema, konteksto inžinerija, RAG, žinių patikrinimas | **Duomenų analizės kelias** – DI kaip analizės asistentas    |
| Žinių testas + vienas projektas (M4–M6)                        | Žinių testas (M8) + **finalinis integruotas projektas** (M9) |
| Learn → Test → Practice                                        | Ta pati seka, auditorija: analitikai                         |

**Prielaida:** Dalyvis baigė bent Modulius 1–3 (6 blokai, workflow); pageidautina Moduliai 4–6 (RAG, šaltiniai, žinių patikrinimas – žr. 4.2, 4.2b). Moduliai 7–9 nesidubliuoja su RAG „duomenys kaip šaltinis“ – fokusas: **DI kaip analitikas + automatizatorius + prognozuotojas**. Papildomas RAG/tyrimų įrankių turinys (pvz. M4 skaidrė id 61 – DI įrankiai informacijos paieškai) gali būti integruotas į Duomenų analizės kelio aprašymą arba „Papildomas skaitymas“.

### 1.2 Mokymosi tikslai (po modulių 7–9)

- **Strateginis pamatas:** Suprasti, kad duomenų analizė = rinkimas + tvarkymas + interpretavimas → sprendimai; duomenys > nuomonė; variacija egzistuoja; tobulinti sistemą, ne kaltinti žmones (governance ir procesinis mąstymas).
- **Verslo duomenų plotis:** Žinoti išplėstinius verslo duomenų domenus (ne tik finansai): klientų elgsena, tiekimo grandinė, pardavimų dinamika, CRM/marketingas, procesų efektyvumas, konkurencinė analizė.
- **DI vaidmuo analizėje:** Suprasti, kaip DI keičia analizę (automatizacija, kompleksiniai metodai, duomenimis grįsti sprendimai, prisitaikymas); mokėti aktyvuoti DI verslo analitiko rolėje.
- **Sisteminė promptų architektūra:** Mokėti struktūruotai naudoti promptus: rolės aktyvavimas, duomenų/DB struktūros kūrimas, ryšių analizė, vizualizacijų generavimas, prognozavimas – su CopyButton šablonais.
- **Pipeline ir operacinės sąvokos:** Žinoti duomenų analizės pipeline (rinkimas → paruošimas → EDA → modeliai → vizualizacija → publikavimas) ir ką kiekvienas etapas reiškia versle + atitinkami DI promptai (02_DA I–II).
- **Duomenų tipai ir rinkimo strategija:** Mokėti 5 duomenų tipus (kiekybiniai, kokybiniai, struktūruoti, nestruktūruoti, pusiau struktūruoti) ir 3 rinkimo būdus (pirminiai, antriniai, automatiniai) su DI šablonais (02_DA III–IV).
- **Data scraping (duomenų siurbimas):** Žinoti paprasčiausius būdus (rankinis, naršyklė, DI sugeneruotas Python skriptas, API); mokėti naudoti promptą skriptui generuoti ir paprastai paleisti (pip, python script.py); suvokti etiką ir teisę (vieši duomenys, robots.txt).
- **Tyrimų ir EDA promptai:** Naudoti tyrimų promptų sistemą (prekės ženklas, lojalumas, pardavimai), 5 žingsnių algoritmą (šaltiniai → struktūra → valymas → eksportas), EDA promptus (statistika, koreliacija, anomalijos, hipotezės), lentelių kūrimo metodiką (02_DA V–VIII).
- **Tikslinė paieška ir Master promptas:** Suprasti BI schemą (Surink → Analizuok → Ataskaita → Prognozė); mokėti naudoti patobulintą rinkos tendencijų promptą ir **MASTER PROMPTĄ** (8 žingsnių pilna analizė) – M9 projekto šablonas (02_DA IX–XIII).
- **Screenshot ir schema analizė:** Naudoti DI ekrano nuotraukų analizei (tekstas, kodas, grafikai, UI/UX) ir duomenų schemų paaiškinimui (entitetai, ryšiai, normalizavimas).
- **DI agentų koncepcija:** Žinoti 3 agentų tipus – Data Research, EDA, Insight – ir kada juos taikyti (02_DA XI).
- **Duomenimis grįsta kultūra:** Žinoti Deming principą („In God we trust, all others bring data“) ir kaip formuoti promptus vadovybei – perėjimas prie duomenimis grįstos kultūros, KPI, vadovų elgesio gairės.
- **Vizualizacija ir data storytelling (DA_4):** Suprasti, kad vizualizacija = istorijos dalis, ne tik grafikas; žinoti duomenų ciklą (surinkimas → paruošimas → vizualizacija → analizė → istorija); psichologiją (10/20/80); 8 Geštalto principus; naudoti verslo lygio promptus (vizualizacijos tipas, istorijos kūrimas, Power BI žingsniai, Python viz); Duomenys→Grafika→Naratyvas→Istorija modelį; kaip DI gali padėti (4 sritys) ir super promptą; alternatyvas (Julius AI, Echobase, DataLab, Power BI).
- **Projektas (M9):** Sukurti vieną pilną verslo analizės ar duomenų pagrįsto sprendimo projektą, naudojant 6 blokų sistemą, šio kelio promptų architektūrą ir MASTER PROMPTĄ (02_DA XIII).

### 1.3 Ryšys su 6 blokais ir Moduliu 4

- **META:** Rolė „vyresnysis verslo duomenų analitikas“ arba „analitikas, naudojantis DI“; sisteminis principas; sprendimai – duomenimis, ne intuicija.
- **INPUT:** Duomenų šaltiniai (nuoroda į 4.2, 4.2-open – kaip nurodyti šaltinius), duomenų struktūra/schema, ribos („tik šie stulpeliai“, oficialūs šaltiniai).
- **OUTPUT:** Ataskaitos formatas, grafikai, prognozės, „jei duomenų nėra – parašyk Nežinau“.
- **Quality:** Šaltinių tikrinimas, haliucinacijų mažinimas (Modulio 7, skaidrė Haliucinacijos), verifikacija – ryšys su M7 bloku „Patikrumas ir etika“.

**Aiškus nuorodas (pirmose M7 skaidrėse 7.1, 7.4):** „Šaltinių nurodymas – Modulyje 4 (4.2); atsakymų tikrinimas ir haliucinacijos – šiame modulyje (M7, skaidrės Haliucinacijos, Žinių patikrinimas). Čia fokusas – analizės užklausos ir išvados.“

**Apribojimas (ROADMAP):** SQL/Python – bendram supratimui; **po 1 skaidrę max** ilgiems kodo pavyzdžiams; prioritetas **promptams**, ne kodo mokymui.

### 1.4 whyBenefit – „Kas man iš to?“ (pirmos skaidrės M7, M8, M9)

Pagal golden standard (docs/development/GOLDEN_STANDARD.md §4.1) – vienas aiškus naudos sakinys pirmoje kiekvieno modulio skaidrėje:

| Modulis | Skaidrė / tipas        | whyBenefit (tekstas į JSON)                                                                                  |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| **7**   | action-intro (pirmoji) | Po šio modulio naudosi DI kaip verslo analitiką – nuo duomenų struktūros iki MASTER PROMPT ir vizualizacijų. |
| **8**   | test-intro             | Po šio testo žinosi, ar esi pasiruošęs finaliniam Duomenų analizės kelio projektui (Modulis 9).              |
| **9**   | practice-intro         | Po projekto turėsi vieną paruoštą verslo analizės artefaktą ir šablonus kasdieniam darbui su DI.             |

---

## 2. Strateginis pamatas (I) – Duomenys = sprendimų sistema

**Tikslas:** Governance ir procesinio mąstymo pamatas – kas iš tikrųjų svarbu versle ir AI mokymuose.

### 2.1 Pagrindinės tezės (skaidrė 7.1 arba 7.2)

- **Duomenų analizė** = rinkimas + tvarkymas + interpretavimas → **sprendimai**.
- **Tikslai analizės:**
  - suprasti **praeitį**
  - įvertinti **dabartį**
  - **prognozuoti** ateitį
- **Duomenys > nuomonė** – sprendimų pagrindas.
- **Variacija egzistuoja** – ne kiekvienas svyravimas = problema; reikia statistinio mąstymo.
- **Tobulinti sistemą, ne kaltinti žmones** – procesinis požiūris (Deming, nuolatinis tobulinimas).

_Šią dalį galima pateikti kaip vieną skaidrę „Strateginis pamatas“ su 5–6 punktais; optional – citata „In God we trust, all others bring data“ (Deming) kaip tiltis į VIII._

### 2A. DI paradoksas: aktualus kontekstas (MIT 2025) – problematikos apibrėžimas

**Paskirtis:** Integruoti aktualų kontekstą – milijardai investicijų į DI, bet beveik jokio pelno augimo organizacijose; formuoti supratimą, kodėl duomenų kultūra ir struktūra yra būtini.

**Faktai (tarptautinis MIT tyrimas 2025, 300+ DI projektų, 52 organizacijos, ~150 vadovų):**

- **95 %** DI diegiančių įmonių nepamatė teigiamo pokyčio P&L ataskaitose; tik **5 %** deklaruoja realią finansinę grąžą.
- Į generatyvinį DI investuota **>40 mlrd JAV dolerių** (apie 34 mlrd per praėjusius metus); skirtumas tarp investicijų ir grąžos – dramatiškas.
- **Paradoksas 2:** 97 % IT specialistų kasdien naudoja DI; 60–70 % darbuotojų – darbas greitesnis; bet tai beveik neatsispindi organizacijos pelningume. Produktyvumas asmeniniame lygmenyje ≠ struktūrinis organizacinis efektyvumas.
- **„Šešėlinis DI“:** ~90 % darbuotojų naudoja DI be oficialios licencijos; tik ~40 % įmonių finansuoja oficialias DI licencijas. Vadovai delsia (saugumas, sudėtingumas, kompetencijų stoka, „burbulas praeis“); DI jau vyksta – nevaldomai.

**Kodėl DI nesukuria vertės?** (1) Netinkama investicijų kryptis – 50–70 % į marketingą/pardavimus; didžiausia grąža – dokumentų apdorojimas, finansų automatizavimas, tiekėjų valdymas, sandėlių prognozės (reikia duomenų higienos, integracijos). (2) Pilotų spąstai – 60 % testuoja, 20 % pilotas, 5 % gamyba; konteksto ribojimai, lėti sprendimai, projektai lieka „demo“. (3) Biurokratinė, o ne duomenų kultūra – ypač aktualu Lietuvai: Excel kaip Word, ne struktūruoti duomenys; be švarių duomenų automatizacija neveiks.

**Ką daryti verslui:** (1) Įteisinti šešėlinį DI – taisyklės, licencijos, mokymai. (2) Keisti kultūrą: nuo dokumentų prie duomenų – standartizacija, duomenų higiena, raštingumas. (3) Automatizuoti „nuobodžiausius“ procesus – KPI: valandos, klaidos, vieneto savikaina. (4) Galvoti apie DI kaip infrastruktūrą – Duomenys → Integracija → Taisyklės → DI.

**Esminė išvada:** DI problema nėra technologinė; ji kultūrinė, organizacinė, struktūrinė, strateginė. Asmeniniame lygmenyje DI jau laimėjo; organizaciniame – dar tik pradžia.

**Implementacija M7:** Skaidrė **725** – infographic (variant `di-paradox`): pilna interaktyvi infografika – hero stats (95 %, >40 mlrd$, 5 %) su hover tooltip (paaiškinimas ir tendencija), 4 paradokso kortelės (FAKTAS 01–04), „Šešėlinis DI“ bar chart, pilotų piltuvas, kur vertė, 4 žingsnių sprendimas, 3 veiksmai, išvada. Užvedus ant skaičiaus – tooltip su paaiškinimu ir tendencija. Skaidrė **726** – content-block „Problematika: kodėl DI nesukuria vertės ir ką daryti“: pirmoje sekcijoje nuoroda skaityti kartu su 725 (vengti to paties ilgo skaičių kartojimo); toliau tekstinės sekcijos (problemos ir veiksmai), sutampančios su infografika. Žargonas ROI tekste vengiamas – naudoti „grąža iš investicijų / grąžos ciklas“ kontekste.

### 2.2 Duomenų analizės pipeline (02_DA I)

**Klasikinis „raw → insight → decision“ ciklas – pilna struktūra:**

1. **Duomenų rinkimas**
2. **Duomenų paruošimas** (processing)
3. **Tiriamoji analizė** (EDA)
4. **Modeliai / algoritmai**
5. **Vizualizacija**
6. **Publikavimas / sprendimų priėmimas**

_Skaidrėje – 6 žingsnių schema arba workflow diagrama; ryšys su tolesnėmis operacinėmis lentelėmis ir promptais._

### 2.3 Pagrindinės sąvokos – operacinis paaiškinimas (02_DA II)

| Etapas           | Ką realiai reiškia versle | DI promptas (CopyButton)                                          |
| ---------------- | ------------------------- | ----------------------------------------------------------------- |
| Duomenų rinkimas | Iš kur paimsime info?     | „Išvardink 10 galimų duomenų šaltinių [X] temai.“                 |
| Paruošimas       | Sutvarkymas               | „Identifikuok trūkstamas reikšmes ir pasiūlyk užpildymo metodus.“ |
| EDA              | Ką galiu suprasti?        | „Identifikuok 5 svarbiausius dėsningumus.“                        |
| Vizualizacija    | Kaip parodyti vadovui?    | „Pasiūlyk 3 grafikus šiai analizei.“                              |
| Publikavimas     | Kaip tai parduoti?        | „Sugeneruok vadovų ataskaitą su rekomendacijomis.“                |

_Skaidrėje – lentelė su CopyButton kiekvienam promptui; laukas [X] – tema._

---

## 3. Verslo duomenų išplėtimas (II) – Ne tik finansai

**Tikslas:** Parodyti 6 duomenų domenus, kuriuos galima paversti DI analizės moduliais.

### 3.1 Tradicinis vs išplėstinis požiūris

| Tradicinis požiūris | Išplėstinis požiūris (6 domenai) |
| ------------------- | -------------------------------- |
| Sąnaudos            | **Klientų elgsena**              |
| Pajamos             | **Tiekimo grandinė**             |
| Pelnas              | **Pardavimų dinamika**           |
|                     | **CRM / marketing duomenys**     |
|                     | **Procesų efektyvumas**          |
|                     | **Konkurencinė analizė**         |

**Skaidrėje:** Dvi kortelės arba lentelė; paaiškinimas – „Šie 6 domenai – potencialūs DI analizės moduliai“; ryšys su tolesnėmis skaidrėmis (DB struktūra, KPI, vizualizacijos).

### 3.2 Duomenų tipai (02_DA III)

| Tipas                   | Aprašymas                   | DI promptas (CopyButton)                                                          |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------- |
| **Kiekybiniai**         | Skaičiai, kainos, kiekiai.  | „Išskirk visus kiekybinius rodiklius ir apskaičiuok jų vidurkius bei dispersiją.“ |
| **Kokybiniai**          | Nuomonės, emocijos.         | „Sugrupuok klientų atsiliepimus į 5 temines kategorijas.“                         |
| **Struktūruoti**        | Excel, SQL, ERP.            | „Normalizuok lentelę pagal 3NF principus.“                                        |
| **Nestruktūruoti**      | PDF, tekstai, social media. | „Išanalizuok šį tekstą ir ištrauk pagrindines temas bei sentimentą.“              |
| **Pusiau struktūruoti** | JSON, API.                  | „Sugeneruok JSON schemą pagal pateiktą pavyzdį.“                                  |

### 3.3 Duomenų rinkimo strategija (02_DA IV)

| Kategorija       | Pavyzdžiai                                      | DI promptas (CopyButton)                                                                                                                  |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Pirminiai**    | Apklausos, interviu, stebėjimas, eksperimentai. | „Sukurk apklausą apie [X] su 10 uždarų ir 5 atvirais klausimais.“                                                                         |
| **Antriniai**    | Statistikos duomenys, CRM, socialiniai tinklai. | „Išvardink viešus šaltinius Lietuvoje [X] temai.“                                                                                         |
| **Automatiniai** | Web scraping, API, log failai.                  | „Sukurk Python skriptą, kuris renka duomenis iš [X] API.“ _(Pastaba: ROADMAP – 1 skaidrė max kodo; galima tik kaip užduoties aprašymas.)_ |

### 3.4 Data scraping (duomenų siurbimas) – skirta skaidrė

**Tikslas:** Papildyti Duomenų analizės kelią SOT – atskira skaidrė apie **duomenų siurbimą** (data scraping): kas tai, paprasčiausi būdai, kaip DI gali padėti (generuoti skriptą), etika ir teisė.

**Skaidrė (pvz. 7.7a „Data scraping – paprasčiausi būdai“):**

- **Kas tai:** Duomenų siurbimas = automatinis duomenų rinkimas iš svetainės ar API (lentelės, sąrašai, kainos, tekstas). Pipeline pirmas žingsnis – „iš kur paimsime duomenis?“.
- **Paprasčiausi būdai (paprasta kalba):**
  1. **Rankiniu būdu** – nukopijuoti iš svetainės į Excel (mažas kiekis).
  2. **Naršyklės plėtiniai** – vienkartiniam eksportui (pvz. lentelė → CSV), be programavimo.
  3. **DI sugeneruotas Python skriptas** – DI parašo trumpą skriptą (bibliotekos: `requests`, `BeautifulSoup` arba `pandas` + lxml); dalyvis paleidžia vietoje. ROADMAP: ne mokyti Python – tik „kaip gauti skriptą iš DI ir kaip jį paleisti“ (Python įdiegimas, `pip install`, `python script.py`).
  4. **API** – jei svetainė teikia API, DI gali pasiūlyti skriptą pagal API dokumentaciją.
- **Etika ir teisė:** Tik vieši ar leisti duomenys; gerbti svetainės naudojimo taisykles ir robots.txt; asmens duomenų neieškoti be teisėto pagrindo.
- **CopyButton – promptas skriptui generuoti:** žr. §10.2 Scenarijus „Data scraping su paprastu Python skriptu“.

_Ryšys su pipeline (§2.2) ir 7.6–7 (Duomenų tipai ir rinkimo strategija). Skaidrių eilė: žr. MODULIO_7_SKAIDRIU_EILES.md – įterpti po 7.6–7._

---

## 4. Kaip DI keičia analizę (III) ir Ką DI gali verslo analitiko vaidmenyje (IV)

### 4.1 Esminis skirtumas: tradicinė vs DI analizė (skaidrė)

| Tradicinė              | DI                              |
| ---------------------- | ------------------------------- |
| Rankinis darbas        | **Automatizacija**              |
| Riboti modeliai        | **Kompleksiniai metodai**       |
| Žmogaus interpretacija | **Duomenų pagrįsti sprendimai** |
| Mažas lankstumas       | **Prisitaikantis**              |

**Naratyvas:** DI = analitikas + automatizatorius + prognozuotojas.

### 4.2 Ką DI (pvz. GPT) gali verslo analitiko vaidmenyje

- Paaiškinti metodus
- Atlikti statistinę analizę
- Generuoti vizualizacijas
- Prognozuoti
- Modeliuoti scenarijus

_Skaidrėje – sąrašas su trumpu paaiškinimu; ryšys su sistemine promptų architektūra (V)._

---

## 5. DI kaip verslo analitikas – sisteminė promptų architektūra (V)

**Tikslas:** Struktūruoti promptus pagal užduoties tipą; kiekvienam – kopijuojamas šablonas (CopyButton).

### 5.1 Rolės aktyvavimas (7.x skaidrė)

**Kopijuojamas promptas (CopyButton):**

```
Tavo rolė – vyresnysis verslo duomenų analitikas.
Mąstai sisteminiu principu.
Sprendimus grindži duomenimis, ne intuicija.
```

_Ryšys su META bloku (6 blokų sistema)._

### 5.2 Duomenų struktūros kūrimas (DB dizainas) (7.x skaidrė)

**Kontekstas:** E-commerce arba bendras verslo kontekstas – „padėk susikonstruoti idealią duomenų bazės struktūrą“.

**Patobulinta versija – kopijuojamas promptas (CopyButton):**

```
Turiu e-commerce verslą (niša: [X]).
Padėk sukurti idealią duomenų bazės struktūrą:

1. Klientų lentelės
2. Užsakymų lentelės
3. Produktų lentelės
4. Marketing duomenų
5. Grąžinimų
6. Klientų lojalumo

Pateik:
- Lentelių struktūrą
- Ryšius (ER modelis logika)
- KPI, kuriuos verta stebėti
```

_Skaidrėje – šablonas su lauku [X]; pastaba: jei reikia, viena skaidrė su labai trumpu SQL pavyzdžiu (ROADMAP – po 1 skaidrę max)._

### 5.3 Duomenų ryšių analizė (7.x skaidrė)

**Kopijuojamas promptas (CopyButton):**

```
Štai mano duomenų struktūra:
[įklijuoti]

1. Paaiškink pagrindinius ryšius
2. Kur gali atsirasti duomenų dubliavimas?
3. Kur galimi butelio kakliukai?
4. Kokius 5 KPI išvestum iš šios struktūros?
```

### 5.4 Vizualizacijų generavimas (7.x skaidrė)

**Kopijuojamas promptas (CopyButton):**

```
Remdamasis šiais pardavimų duomenimis:
[duomenys]

Sugeneruok:
1. Pajamų tendencijos grafiką
2. Klientų segmentų palyginimą
3. Produktų pelningumo analizę
4. 3 pagrindines įžvalgas
```

_Ryšys su OUTPUT ir Quality – „jei duomenų nepakanka – nurodyk, ko trūksta“._

### 5.4a Paprastos vizualizacijos – promptai pagal tipą (7.x skaidrė)

Viena skaidrė su **4 CopyButton** – po vieną paprastam vizualizacijos tipui:

| Tipas          | Kada naudoti                                 | Kopijuojamas promptas (CopyButton)                                                                               |
| -------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Stulpelinė** | Kategorijų palyginimas (regionai, produktai) | „Turiu duomenis: [kategorija, reikšmė]. Pasiūlyk stulpelinę diagramą; pridėk trumpą įžvalgą (top 3).“            |
| **Linijinė**   | Tendencijos per laiką                        | „Turiu laiko eilės duomenis: [datos, rodiklis]. Pasiūlyk linijinę diagramą; nurodyk tendenciją ir 1–2 įžvalgas.“ |
| **Skritulinė** | Proporcijos, dalys visumoje                  | „Turiu proporcijų duomenis: [kategorija, dalis %]. Pasiūlyk skritulinę diagramą; legendą ir vieną įžvalgą.“      |
| **Lentelė**    | Tikslūs skaičiai, ne grafikas                | „Apibendrink šiuos duomenis lentelėje: stulpeliai [X], max 10 eilučių; 1–2 sakiniai interpretacijos.“            |

_Skaidrėje – 4 sekcijos, kiekviena su CopyButton; integruota po „Vizualizacijų generavimas“ (5.4)._

### 5.5 Prognozavimo promptas (7.x skaidrė)

**Kopijuojamas promptas (CopyButton):**

```
Remiantis 24 mėn. pardavimų istorija:
[duomenys arba nuoroda]

1. Prognozuok kitų 6 mėn. pajamas
2. Nurodyk sezoniškumo įtaką
3. Pateik optimistinį ir pesimistinį scenarijų
4. Nurodyk pagrindines rizikas
```

### 5.6 Tyrimų promptų sistema (02_DA V)

**1️⃣ Prekės ženklo tyrimas – kopijuojamas promptas (CopyButton):**

```
Rolė: Tyrimų vadovas.
Užduotis: Sukurk pilną socialinių tinklų tyrimo planą prekės ženklui [X].
Įtrauk:
- tikslus
- KPI
- duomenų rinkimo metodus
- analizės metodus
- ataskaitos struktūrą
```

**2️⃣ Darbuotojų lojalumas – kopijuojamas promptas (CopyButton):**

```
Sukurk lojalumo tyrimo metodologiją:
- 10 uždarų klausimų
- 10 Likert skalės
- 5 NPS klausimus
- Duomenų analizės metodą
- Rizikų interpretaciją
```

**3️⃣ Pardavimų tyrimas – kopijuojamas promptas (CopyButton):**

```
Sukurk pardavimų tyrimo planą:
- Segmentavimas
- ABC analizė
- Sezoniškumas
- Koreliacijos
- Prognozės modelis
```

### 5.7 5 žingsnių algoritmas (02_DA VI) – šaltinių ir duomenų valdymas

_AI-driven šaltinių / duomenų valdymo sistema (operacinė)._

| Žingsnis                       | DI promptas (CopyButton)                                                        |
| ------------------------------ | ------------------------------------------------------------------------------- |
| **1. Identifikuoti šaltinius** | „Sudaryk 20 viešų duomenų šaltinių Lietuvoje sąrašą su nuorodomis.“             |
| **2. Sukurti struktūrą**       | „Sukurk lentelę su stulpeliais: kategorija, šaltinis, URL, atnaujinimo dažnis.“ |
| **3. Surinkti duomenis**       | „Priskirk šiuos rinkinius kategorijoms.“                                        |
| **4. Valymas**                 | „Pašalink dubliavimus.“                                                         |
| **5. Eksportas**               | „Paruošk CSV formatą.“                                                          |

### 5.8 EDA – ką tai reiškia praktiškai (02_DA VII)

**Tikslas:** „KĄ GALIU SUPRASTI IŠ DUOMENŲ?“

| Užduotis               | DI promptas (CopyButton)                                |
| ---------------------- | ------------------------------------------------------- |
| **Statistinė analizė** | „Pateik vidurkį, medianą, IQR ir standartinį nuokrypį.“ |
| **Koreliacija**        | „Apskaičiuok koreliacijų matricą ir paaiškink ryšius.“  |
| **Anomalijos**         | „Identifikuok outlierius pagal IQR metodą.“             |
| **Hipotezės**          | „Pasiūlyk 3 hipotezes, kurias verta testuoti.“          |

### 5.9 Lentelių kūrimo metodika (02_DA VIII)

**Efektyvi lentelės formulė:** Tikslas → Stulpeliai → Pavyzdžiai → Papildomi skaičiavimai → Iteracija → Validacija.

**Profesionalus promptas – kopijuojamas (CopyButton):**

```
Sukurk lentelę:
Tikslas: [X] analizė
Stulpeliai: [įrašyti]

Pridėk:
- 5 pavyzdines eilutes
- 2 papildomus apskaičiuotus rodiklius
- Trumpą interpretaciją
```

### 5.10 Tikslinės informacijos paieška (02_DA IX)

_Business intelligence schema:_ **Surink** → **Analizuok** → **Ataskaita** → **Prognozė**.

_Skaidrėje – 4 žingsnių schema; ryšys su pipeline (§2.2) ir Master promptu (§5.14)._

### 5.11 Patobulintas rinkos tendencijų promptas (02_DA X)

**Originalas (silpnas):** „Ieškok naujausių rinkos tendencijų…“

**Patobulinta versija – kopijuojamas (CopyButton):**

```
Rolė: Rinkos analitikas.
Užduotis: Identifikuok 5 naujausias rinkos tendencijas [X] sektoriuje.
Šaltiniai: [nurodyti arba „oficialūs vieši šaltiniai“]

Rezultatas:
- 5 tendencijos
- kiekvienos poveikis
- rizika
- prognozė 6 mėn.
```

### 5.12 DI agentų koncepcija (02_DA XI)

_Kaip šią medžiagą paversti DI agentais:_

| Agentas                 | Funkcijos                                                     |
| ----------------------- | ------------------------------------------------------------- |
| **Data Research Agent** | Šaltinių identifikavimas, duomenų struktūra, duomenų valymas. |
| **EDA Agent**           | Statistinė analizė, vizualizacijų generavimas.                |
| **Insight Agent**       | Rekomendacijos, prognozės.                                    |

_Skaidrėje – 3 kortelės; ryšys su 5 žingsnių algoritmu ir Master promptu._

### 5.13 Silpnosios vietos – ką pridėti mokymuose (02_DA XII)

Dokumente trūksta (jei kuriam pilną mokymų programą – rekomenduojama pridėti):

- Modelių (regresija, klasifikacija) – tik konceptualiai arba 1 skaidrė max (ROADMAP).
- Realūs duomenų pavyzdžiai (datasetai, nuorodos).
- Automatizavimo sluoksnis (aprašymas, ne būtinai kodas).
- Validacijos metodika (kaip tikrinti DI išvestį – ryšys su 4.6).

_Skaidrėje – optional „Ką toliau?“ arba collapsible; nesilaikyti tik šio sąrašo – prioritetas promptams._

### 5.14 MASTER PROMPTAS (02_DA XIII)

**Galutinis išgrynintas promptas – pilnai duomenų analizės struktūra. Kopijuojamas (CopyButton):**

```
Rolė: Senior duomenų analitikas.
Užduotis: Atlik pilną duomenų analizę [X] temoje.

Struktūra:
1. Duomenų šaltiniai
2. Duomenų struktūra
3. Valymas
4. EDA
5. Vizualizacijos pasiūlymai
6. Įžvalgos
7. Prognozės
8. Strateginės rekomendacijos
```

_Skaidrėje – akcentuotas blokas (pvz. blockVariant: accent); naudoti kaip Modulio 9 projekto šabloną._

---

## 6. Screenshot analizės galimybės (VI) ir Schema paaiškinimo metodas (VII)

### 6.1 Screenshot analizė (7.x skaidrė)

**Ką DI gali iš ekrano nuotraukos:**

- Konvertuoti tekstą
- Aiškinti kodą
- Interpretuoti grafikus
- Įvertinti UI/UX
- Transkribuoti rankraštį

**Sisteminis promptas – kopijuojamas (CopyButton):**

```
Analizuok šią ekrano nuotrauką.

1. Identifikuok pagrindinius elementus
2. Įvardink galimas problemas
3. Pasiūlyk optimizacijas
4. Pateik struktūruotą analizę:
   - Funkcija
   - Rizika
   - Galimas pagerinimas
   - Prioritetas (Low / Medium / High)
```

_Naudinga: UX auditai, agentų kontekstas, Promptų anatomijos ir GitHub projektų kontekstas._

### 6.2 Schema paaiškinimo metodas (7.x skaidrė)

**Metodas:** Schema (nuotrauka arba tekstas) → įkelti → „Paaiškink“.

**Patobulinta versija – kopijuojamas promptas (CopyButton):**

```
Paaiškink šią duomenų schemą:

1. Kokie pagrindiniai entitetai?
2. Kokie ryšiai (1-N, N-N)?
3. Kur galimos normalizavimo problemos?
4. Ar schema optimizuota e-commerce kontekstui?
5. Kaip ją patobulinti?
```

---

## 7. Deming principas ir duomenimis grįsta kultūra (VIII)

**Vieta:** Būtina M7 tema – ne optional. Lietuva daugelyje organizacijų atsilieka nuo duomenimis grįsto sprendimų priėmimo; reikia formuoti **pagrindus ir mąstymą**. Griežta teorijos skaidrė – tinkama.

### 7.1 Griežta teorija: Deming principas

- **Duomenimis grįsta kultūra** – sprendimai remiasi duomenimis, matavimais ir sistemine analize, o ne vien nuomone ar intuicija.
- **Citata:** „In God we trust, all others bring data.“ (W. Edwards Deming)
- **Esmė:** Tobulinti sistemą, ne kaltinti žmones; variacija egzistuoja – reikia statistinio mąstymo; nuolatinis tobulinimas (PDCA), procesinis požiūris.

### 7.2 Kodėl tai pagrindas?

Be duomenų kultūros: sprendimai ad hoc, prioritetai – nuomonėse, pokyčiai be matavimo. Su duomenimis: aiškūs KPI, atkuriami rezultatai, atsakomybė už sistemą. DI analitikoje – geri promptai reikalauja INPUT; vadovybė, kuri nepriima duomenų, nesuvaldys DI potencialo.

### 7.3 Kontekstas: Lietuva

Lietuva daugelyje organizacijų vis dar atsilieka: dominuoja intuicija, „taip visada darėme“, trūksta KPI ir matavimo įpročių. Todėl **reikia formuoti pagrindus ir mąstymą jau modulyje** – Deming ir duomenų kultūra yra būtinas pamatas, kad DI analizė būtų priimama ir naudojama.

### 7.4 Promptas vadovybei – kopijuojamas (CopyButton)

```
Mūsų įmonėje sprendimai dažnai grindžiami intuicija.

Sukurk:
1. 5 žingsnių planą perėjimui prie duomenimis grįstos kultūros
2. KPI sistemą (ką matuoti, kaip sekti)
3. Vadovų elgesio pokyčių gaires (pavyzdžiai: „prašyti duomenų prieš sprendimą“, „ne spėti – matuoti“)
```

_Skaidrėje – 5 sekcijos: Griežta teorija, Kodėl pagrindas, Kontekstas Lietuva, Citata, Promptas vadovybei (CopyButton)._

---

## 7A. Duomenų vizualizacija ir data storytelling (DA_4)

**Implementacija:** Skaidrės 100–106 (DA_4) modulyje 7 pažymėtos kaip **optional** – dalyvis gali praleisti (Fast track) arba peržiūrėti. Pilnas vizualizacijos ir data storytelling turinys planuojamas **Moduliuose 16–18** (Duomenų inžinerijos kelias). Nuoroda: „Vizualizacija – Moduliuose 16–18“.

**Pozicionavimas:** Tai nėra techninis kursas apie grafikus. Tai **data storytelling + DI asistavimo įvadas**, skirtas: parodyti, kodėl vizualizacija veikia (psichologija); parodyti, kaip DI gali padėti; pateikti alternatyvius DI įrankius; parodyti verslo kontekstą. **Esminė mintis:** vizualizacija nėra tik grafikas – tai **istorijos dalis**. Vizualizacija = sprendimų įrankis; DI = greičio katalizatorius.

### 7A.1 Duomenų ciklas (su vizualizacija ir istorija)

Remiantis DA_4 (2–4 psl.) – susisteminta struktūra:

1. **Duomenų surinkimas**
2. **Duomenų paruošimas**
3. **Duomenų vizualizacija**
4. **Duomenų analizė**
5. **Duomenų istorija**

_Ryšys su §2.2 pipeline; čia akcentas – vizualizacija ir istorija kaip ciklo dalys._

### 7A.2 Psichologija – kodėl vizualizacija veikia

Žmonės įsimena (orientacinis tyrimas):

- **10 %** to, ką girdi
- **20 %** to, ką perskaito
- **80 %** to, ką **mato ir patiria**

**➡ Argumentas už:** interaktyvias ataskaitas, dashboard'us, grafines istorijas.

### 7A.3 Geštalto principai (8) – reikšmė vizualizacijai

| Principas             | Reikšmė vizualizacijai   |
| --------------------- | ------------------------ |
| **Artumas**           | Grupavimas pagal atstumą |
| **Panašumas**         | Spalva / forma rodo ryšį |
| **Išskyrimas**        | Fokusas                  |
| **Sujungimas**        | Linijos kuria ryšį       |
| **Tęstinumas**        | Akis seka kryptį         |
| **Uždarymas**         | Užbaigti kontūrai        |
| **Figūra–fonas**      | Kas svarbiausia          |
| **Bendras judėjimas** | Kryptis = ryšys          |

### 7A.4 Sustiprinti promptai (verslo lygis)

**1. Vizualizacijos tipo parinkimas – kopijuojamas (CopyButton):**

```
ROLE: Tu esi senior duomenų vizualizacijos ekspertas ir UX dizaineris.
TASK: Parink optimalų vizualizacijos tipą.
CONTEXT: Turiu pardavimų duomenis pagal regionus ir mėnesius. Tikslas – parodyti augimo tendenciją ir regionų skirtumus.
AUDIENCE: Vadovybė (ne analitikai).
OUTPUT: 1) Pasiūlyk 3 variantus 2) Paaiškink kodėl kiekvienas tiktų 3) Įvardink rizikas (pvz. klaidinanti interpretacija)
TONE: Strateginis, aiškus.
```

**2. Istorijos kūrimas iš duomenų – kopijuojamas (CopyButton):**

```
ROLE: Data storyteller.
TASK: Sukurk naratyvą iš pateiktų duomenų.
CONTEXT: Pardavimai augo 20%, bet 2 regionuose mažėjo.
OUTPUT: 1) Pagrindinė įžvalga 2) Konfliktas / įtampa 3) Ką tai reiškia verslui 4) Rekomenduojamas veiksmas
```

**3. Power BI žingsnių generavimas – kopijuojamas (CopyButton):**

```
ROLE: Power BI specialistas.
TASK: Pateik tikslius veiksmus.
CONTEXT: CSV failas su stulpeliais: Date, Region, Sales, Category.
OUTPUT: 1) Duomenų įkėlimas 2) Data model patikra 3) Vizualizacijos kūrimas 4) DAX formulė YOY augimui 5) Dizaino rekomendacijos (Geštaltas)
```

**4. Python vizualizacijos kodas – kopijuojamas (CopyButton):**

```
Parašyk Python kodą, kuris: 1) Sugeneruoja pardavimų dataset 2) Nubraižo: stulpelinę diagramą regionams, linijinę tendenciją per laiką 3) Naudoja seaborn 4) Prideda anotacijas su pagrindinėmis įžvalgomis
```

_(ROADMAP: 1 skaidrė max ilgiems kodo pavyzdžiams – galima tik kaip užduoties aprašymas arba trumpas fragmentas.)_

### 7A.5 Duomenys → Istorija modelis (DA_4, 10 psl.)

**Modelis:** Duomenys → Grafika → Naratyvas → Menas → Istorija

| Etapas    | Reikšmė             |
| --------- | ------------------- |
| Skaičiai  | Patikimumas         |
| Grafika   | Aiškumas            |
| Naratyvas | Emocinis ryšys      |
| Istorija  | Sprendimų pagrindas |

### 7A.6 Netflix / BBC pavyzdžiai – dashboard ir hierarchija

**Geras dashboard'as:** KPI viršuje; tendencija; segmentavimas; filtrai.

**BBC pavyzdys:** Kontekstas; vizualinė hierarchija; aiški legenda.

_Skaidrėje – 2 kortelės arba schema; optional – nuotraukos/ nuorodos._

### 7A.7 Kaip DI gali padėti (4 sritys) + super promptas

**4 sritys (DA_4, 11 psl.):** Idėjų generavimas; kodų generavimas; vizualizacijos gairės; kontekstinė analizė.

**Praktinis kombinuotas super promptas – kopijuojamas (CopyButton):**

```
ROLE: Tu esi duomenų analitikas + vizualizacijos dizaineris + verslo strategas.
TASK: Iš pateiktų duomenų sukurk pilną analizės paketą.
CONTEXT: CSV failas su pardavimais pagal laiką, regioną, kategoriją.
OUTPUT:
1) Duomenų santrauka (3 pagrindinės įžvalgos)
2) Siūlomi grafikai
3) Power BI instrukcija
4) Python kodas
5) Istorijos tekstas vadovybei (max 200 žodžių)
6) Rekomenduojamas verslo veiksmas
```

### 7A.8 Alternatyvos ChatGPT (DA_4, 14–20 psl.)

| Įrankis                | Stiprybės                                                          |
| ---------------------- | ------------------------------------------------------------------ |
| **Julius AI**          | NLP analizė; paprasta naudoti; tinka ne techniniams.               |
| **Echobase**           | Agentų kūrimas; failų sinchronizacija; komandinis darbas.          |
| **DataLab (DataCamp)** | SQL + Python generavimas; real-time notebook; enterprise saugumas. |
| **Power BI**           | Šimtai vizualizacijų; integracijos; enterprise lygis.              |

### 7A.9 Strateginė išvada ir pro lygio papildymai

**Išvada:** Vizualizacija ≠ grafikas. Vizualizacija = sprendimų įrankis. DI = greičio katalizatorius.

**Jei daryti pro lygiu – pridėti:** blogų vizualizacijų pavyzdžių analizę; vizualinių klaidų auditą; interaktyvumo principus; spalvų psichologiją; KPI pasirinkimo metodiką.

---

## 8. Teorinė dalis (Modulis 7) – Skaidrių / temų planas

Modulis 7 – **„Duomenų analizė su DI“** (level: `learn`). Trukmė: orientacinis ~25–35 min (priklauso nuo skaidrių skaičiaus).

### 8.1 Skaidrių planas (7.1 – 7.N)

| #         | Skaidrė / tema                                          | Trumpas aprašymas                                                                                                                                                                                                          | Ryšys          |
| --------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **7.1**   | **Duomenų analizės kelias – ką čia rasite**             | Kelio apžvalga; ryšys su 6 blokais ir Moduliu 4 (RAG); fokusas – analizės užklausos ir išvados. Kodėl duomenų analizė su DI svarbu analitikams.                                                                            | META, 4.2      |
| **7.2**   | **Strateginis pamatas**                                 | Duomenys = sprendimų sistema; rinkimas + tvarkymas + interpretavimas → sprendimai; duomenys > nuomonė; variacija; tobulinti sistemą, ne kaltinti žmones.                                                                   | Governance     |
| **7.3**   | **Duomenų analizės pipeline**                           | 6 žingsniai: rinkimas → paruošimas → EDA → modeliai → vizualizacija → publikavimas; „raw → insight → decision“.                                                                                                            | —              |
| **7.4**   | **Pagrindinės sąvokos – operacinė lentelė**             | Etapas vs „ką reiškia versle“ vs DI promptas (rinkimas, paruošimas, EDA, vizualizacija, publikavimas); CopyButton.                                                                                                         | INPUT, OUTPUT  |
| **7.4a**  | **4 analizės tipai**                                    | Aprašomoji (Kas įvyko?) → Diagnostinė (Kodėl?) → Nuspėjamoji (Kas gali?) → Nurodomoji (Kaip veikti?). 4 CopyButton – po vieną promptą kiekvienam tipui. Ryšys su M8 blokais.                                               | OUTPUT, M8     |
| **7.4b**  | **Sentimentų analizė – verslo lygio OUTPUT**            | 5 punktų struktūra: sentimentų %, temos, intensyvumas, kritiniai skundai, 3 veiksmai. CopyButton su ROLE/TASK/CONTEXT/OUTPUT/TONE.                                                                                         | OUTPUT, M8     |
| **7.4c**  | **Verslo analizės šablonai**                            | Duomenų kūrimas, Konkurentai, CFO – 3 CopyButton (M9 Scenarijai 3–5).                                                                                                                                                      | OUTPUT         |
| **7.5**   | **Verslo duomenų išplėtimas**                           | 6 domenai: klientų elgsena, tiekimo grandinė, pardavimų dinamika, CRM/marketingas, procesų efektyvumas, konkurencinė analizė.                                                                                              | INPUT          |
| **7.6**   | **Duomenų tipai**                                       | Kiekybiniai, kokybiniai, struktūruoti, nestruktūruoti, pusiau struktūruoti; po 1 DI promptą kiekvienam (CopyButton).                                                                                                       | INPUT          |
| **7.7**   | **Duomenų rinkimo strategija**                          | Pirminiai / antriniai / automatiniai; CopyButton (apklausa, vieši šaltiniai, API skriptas aprašymas).                                                                                                                      | INPUT          |
| **7.7a**  | **Data scraping (duomenų siurbimas)**                   | Paprasčiausi būdai (rankinis, naršyklė, DI skriptas, API); etika/teisė; CopyButton – promptas skriptui generuoti; kaip paleisti. Žr. §3.4.                                                                                 | INPUT          |
| **7.8**   | **Kaip DI keičia analizę**                              | Lentelė: tradicinė vs DI; DI = analitikas + automatizatorius + prognozuotojas.                                                                                                                                             | —              |
| **7.9**   | **Ką DI gali verslo analitiko vaidmenyje**              | Sąrašas: metodai, statistika, vizualizacijos, prognozės, scenarijai; tiltelis į promptus.                                                                                                                                  | OUTPUT         |
| **7.10**  | **Rolės aktyvavimas**                                   | CopyButton: „Vyresnysis verslo duomenų analitikas“, sisteminis principas, sprendimai duomenimis.                                                                                                                           | META           |
| **7.11**  | **Duomenų struktūros kūrimas (DB)**                     | CopyButton: e-commerce DB (6 lentelių tipai), ER, KPI; optional lentelių metodika (5.9).                                                                                                                                   | INPUT          |
| **7.12**  | **Duomenų ryšių analizė**                               | CopyButton: ryšiai, dubliavimas, butelio kakliukai, 5 KPI.                                                                                                                                                                 | INPUT, Quality |
| **7.13**  | **Vizualizacijų generavimas**                           | CopyButton: tendencijos, segmentai, pelningumas, 3 įžvalgos.                                                                                                                                                               | OUTPUT         |
| **7.14**  | **Prognozavimas**                                       | CopyButton: 6 mėn. prognozė, sezoniškumas, scenarijai, rizikos.                                                                                                                                                            | OUTPUT         |
| **7.15**  | **Tyrimų promptų sistema**                              | CopyButton: prekės ženklo tyrimas, darbuotojų lojalumas, pardavimų tyrimas (3 šablonai).                                                                                                                                   | OUTPUT         |
| **7.16**  | **5 žingsnių algoritmas**                               | Šaltiniai → struktūra → surinkti → valymas → eksportas; 5 DI promptai (CopyButton).                                                                                                                                        | INPUT          |
| **7.16a** | **Duomenų valymas ir metaduomenys**                     | Valymo checklist: anonimizacija, formatų suvienodinimas, dublių šalinimas, trūkstamos reikšmės, data type validacija, laiko/regiono žymės. Metaduomenys 3 tipai: aprašomieji, struktūriniai, administraciniai. CopyButton. | INPUT, M8      |
| **7.16b** | **Promptų sekos (workflow)**                            | Surink → Išvalyk (checklist) → Metaduomenys → 4 analizės tipai → Veiksmų planas. Schema arba numeruotas sąrašas. Ryšys su M8-q8.                                                                                           | OUTPUT, M8     |
| **7.17**  | **EDA praktiškai**                                      | „Ką galiu suprasti?“; CopyButton: statistinė analizė, koreliacija, anomalijos, hipotezės.                                                                                                                                  | —              |
| **7.18**  | **Lentelių kūrimo metodika**                            | Tikslas → Stulpeliai → Pavyzdžiai → Skaičiavimai → Iteracija → Validacija; profesionalus promptas (CopyButton).                                                                                                            | INPUT, OUTPUT  |
| **7.19**  | **Tikslinė informacijos paieška**                       | Surink → Analizuok → Ataskaita → Prognozė (BI schema).                                                                                                                                                                     | —              |
| **7.20**  | **Rinkos tendencijų pavyzdys**                          | Patobulintas promptas: Rolė + Užduotis + Šaltiniai + Rezultatas (5 tendencijos, poveikis, rizika, prognozė); CopyButton.                                                                                                   | OUTPUT         |
| **7.21**  | **DI agentų koncepcija**                                | Data Research Agent, EDA Agent, Insight Agent – 3 kortelės.                                                                                                                                                                | —              |
| **7.22**  | **Screenshot analizė**                                  | Ką DI gali iš nuotraukos; CopyButton: sisteminis promptas (elementai, problemos, optimizacijos, prioritetas).                                                                                                              | —              |
| **7.23**  | **Schema paaiškinimo metodas**                          | CopyButton: entitetai, ryšiai, normalizavimas, optimizavimas.                                                                                                                                                              | INPUT          |
| **7.24**  | **Deming ir duomenimis grįsta kultūra**                 | Citata; CopyButton: promptas vadovybei (5 žingsniai, KPI, vadovų elgesio gairės).                                                                                                                                          | Governance     |
| **7.25**  | **Silpnosios vietos – ką pridėti**                      | Modeliai, realūs pavyzdžiai, automatizavimas, validacijos metodika (optional / collapsible).                                                                                                                               | —              |
| **7.26**  | **MASTER PROMPTAS**                                     | Galutinis 8 žingsnių promptas (šaltiniai → struktūra → valymas → EDA → vizualizacijos → įžvalgos → prognozės → rekomendacijos); CopyButton; M9 šablonas.                                                                   | META, OUTPUT   |
| **7.27**  | **Modulio 7 santrauka**                                 | Apžvalga; „Ką toliau?“ – Testas (Modulis 8), Projektas (Modulis 9).                                                                                                                                                        | —              |
| **7.28**  | **Vizualizacija ir data storytelling – pozicionavimas** | Ne techninis kursas; data storytelling + DI įvadas; vizualizacija = istorijos dalis, sprendimų įrankis; DI = katalizatorius.                                                                                               | OUTPUT         |
| **7.29**  | **Duomenų ciklas (su vizualizacija)**                   | Surinkimas → Paruošimas → Vizualizacija → Analizė → Istorija; ryšys su pipeline.                                                                                                                                           | —              |
| **7.30**  | **Psichologija – kodėl vizualizacija veikia**           | 10 % girdi / 20 % skaito / 80 % mato ir patiria; argumentas už dashboard'us, interaktyvias ataskaitas.                                                                                                                     | —              |
| **7.31**  | **Geštalto principai (8)**                              | Lentelė: Artumas, Panašumas, Išskyrimas, Sujungimas, Tęstinumas, Uždarymas, Figūra–fonas, Bendras judėjimas.                                                                                                               | OUTPUT         |
| **7.32**  | **Sustiprinti vizualizacijos promptai**                 | CopyButton: vizualizacijos tipo parinkimas, istorijos kūrimas, Power BI žingsniai, Python viz (4 promptai).                                                                                                                | OUTPUT         |
| **7.33**  | **Duomenys→Istorija modelis**                           | Duomenys → Grafika → Naratyvas → Menas → Istorija; skaičiai = patikimumas, grafika = aiškumas, naratyvas = emocinis ryšys.                                                                                                 | OUTPUT         |
| **7.34**  | **Dashboard pavyzdžiai (Netflix/BBC)**                  | KPI viršuje, tendencija, segmentavimas, filtrai; kontekstas, hierarchija, legenda.                                                                                                                                         | —              |
| **7.35**  | **DI pagalba + super promptas + alternatyvos**          | 4 sritys; kombinuotas super promptas (analizė + grafikai + Power BI + Python + istorija + veiksmas); Julius AI, Echobase, DataLab, Power BI.                                                                               | OUTPUT         |

_Skaidrių skaičius gali būti sumažintas sujungiant pvz. 7.3+7.4, 7.6+7.7, 7.28+7.29, 7.32 į vieną – pagal UI ir laiką. **Papildomi sujungimai (mažas turinys, teminis ryšys, pedagogika):** žr. [docs/MODULIO_7_SKAIDRIU_SUJUNGIMO_ANALIZE.md](MODULIO_7_SKAIDRIU_SUJUNGIMO_ANALIZE.md) – 78+79, 891+892, 95+96, 101+102, 104+105, 92+93. Šaltiniai: 02_DA, DA_4 (Duomenų vizualizacija ir istorija)._

**Blokas „Patikrumas ir etika“ (perkeltas iš Modulio 4):** Po skaidrės 891 (Duomenų paruošimas ir workflow) įterptas blokas: 66.9 (section-break), 67 (Promptų manipuliacijos), 67.3 (Praktika: pataisyk šališką promptą), 67.5 (Saugumas: prompt injection ir jailbreak), 67.7 (Haliucinacijų mažinimo grandinė – vizuali 5 žingsnių schema, tipas `hallucination-pipeline`), 67.8 (Haliucinacijos), 68 (Žinių patikrinimas), 200 (Haliucinacijų rodikliai), 201 (DI turinio detektoriai), 68.5 (Savitikra). Tematika atitinka duomenų/turinio patikimumą analizėje. Žr. [MODULIO_7_SKAIDRIU_EILES.md](MODULIO_7_SKAIDRIU_EILES.md).

### 8.2 Kelias pramaišytas su teorija (path-step skaidrės)

**Principas:** Duomenų analizės kelias (lygiagrečių tyrimų metodas, 8 žingsnių ciklas – žr. §10.0) pateikiamas **ne vientisu bloku**, o **pramaišant** kelio žingsnius su teorinėmis skaidrėmis. Kiekvienas kelio žingsnis – atskiras skaidrių tipas **path-step** (kelio žingsnis): atpažįstamas vizualiai, su badge ir žodynėlio terminų atrakinimu.

**Path-step skaidrės (kelio žingsniai):**

| Žingsnis | Pavadinimas (orientacinis)                    | Vieta (po kokios teorijos)                                | unlockedGlossaryTerms (kandidatai) |
| -------- | --------------------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| 1        | Įrankių seka ir workflow                      | Po 7.4 (operacinė lentelė)                                | Duomenų analizės pipeline, EDA     |
| 2        | Sisteminis promptas ir gilaus tyrimo tema     | Po 7.7 / 7.16 (rinkimo strategija, 5 žingsnių algoritmas) | Deep research, MASTER PROMPTAS     |
| 3        | Lygiagrečių tyrimų parengimas (2–4 šaltiniai) | Po 7.19 (tikslinė paieška)                                | RAG, Šaltinių nurodymas            |
| 4        | 4× tyrimų sintetinimas ir RAG                 | Po 7.26 (MASTER PROMPTAS)                                 | Sintetinimas, Duomenų valymas      |
| 5        | Duomenų masyvas ir atvaizdavimas              | Prieš 7.27 (santrauka) arba M9 kontekste                  | Vizualizacija, Dashboard           |

**Turinio schema path-step:** `title`, `stepNumber`, `body` arba `sections`, `unlockedGlossaryTerms` (terminų pavadinimų masyvas – šie terminai žodynėlyje atrakinti po žingsnio užbaigimo). Sąveika: vartotojas paspaudžia „Pažymėjau kaip atliktą“ → įrašas į progresą (`completedTasks[moduleId]`) → žodynėlyje terminai iš `unlockedGlossaryTerms` laikomi atrakintais. Žodynėlio terminai su optional `unlockedBy: { moduleId, slideId }` rodomi kaip užrakinti, kol atitinkamas path-step neužbaigtas (GOLDEN_STANDARD §path-step; implementacija – CODING_AGENT, DATA_AGENT).

**Skaidrių eilė:** Žr. [docs/MODULIO_7_SKAIDRIU_EILES.md](MODULIO_7_SKAIDRIU_EILES.md) – path-step id (pvz. 71.1–71.5) įterpti tarp esamų M7 skaidrių; footeriai perskaičiuoti pagal footer-slide-numbers.mdc.

**Ryšys su integruota kelione (27 ES šalys):** Kelio žingsniai (71.1–71.5) atitinka tą pačią logiką kaip M9 8 žingsnių ciklas (§10.0.2). Šalies pasirinkimas (27 valstybės, bėgančioji juosta) gali būti M7 pradžioje (action-intro) arba M9 pradžioje – pagal UI sprendimą; pasirinkus šalį, visa promptų seka 8 užduotyse keičia tik šalies parametrą.

---

## 9. Modulis 8 – Žinių patikrinimas (testas) ir praktikos logika

- **Tikslas:** Įsitikinti, kad dalyvis įsisavino strateginį pamatą, pipeline, operacines sąvokas, duomenų tipus ir rinkimo strategiją, verslo duomenų domenus, DI vaidmenį, promptų tipus (rolė, DB, ryšiai, vizualizacijos, prognozė, tyrimų sistema, 5 žingsnių algoritmas, EDA, lentelės, screenshot, schema, Deming, MASTER PROMPTAS), **vizualizaciją ir data storytelling (DA_4)** – ciklas, psichologija, Geštaltas, verslo promptai, super promptas, alternatyvos.
- **Formatas:** Panašiai kaip Modulio 2 ar 5 – MCQ, true/false, **scenario klausimai**; remediation nuorodos į skaidres 7.x.
- **Slenksčiai:** Pvz. ≥70 % – rekomenduojama eiti į Modulį 9 (projektas); &lt;70 % – peržiūrėti 7.x skaidres.

### 9.1 Modulio 8 praktika – scenarijų pagrindas (5 blokai)

Teste naudojami **scenarijų tipo klausimai**, pagrįsti šiais 5 blokais (AI-driven data thinking framework):

| Blokas                                          | Turinys                                                                                                         | Pavyzdinis scenarijaus tipas                                                                                                     |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Sentimentų analizė**                          | Tonas, temos, emocijos intensyvumas, prioritetai, veiksmai.                                                     | „Duoti atsiliepimai – pasirink geriausią prompto struktūrą“ arba „Ką dar reikia papildyti sentimentų prompte?“                   |
| **4 analizės tipai**                            | Aprašomoji → Diagnostinė → Nuspėjamoji → Nurodomoji.                                                            | „Kokia analizė tinka klausimui ‚Kodėl Q3 pardavimai krito?‘“ / „Kuri analizė atsako į ‚Kaip veikti?‘“                            |
| **Verslo taikymas**                             | Finansai, HR, konkurentai, rizikos.                                                                             | „Kurį promptą naudotum CFO pagalbai?“ / „Konkurentų analizė – kas turi būti OUTPUT?“                                             |
| **Promptų sekos (workflow)**                    | Surink → Išvalyk → Metaduomenys → 4 analizės → Veiksmų planas.                                                  | „Kokia teisinga žingsnių seka?“ / „Ką daryti prieš diagnostinę analizę?“                                                         |
| **Duomenų valymas + metaduomenys + pateikimas** | Checklist, 3 metaduomenų tipai.                                                                                 | „Kas įeina į valymo checklist?“ / „Kam reikia struktūrinių metaduomenų?“                                                         |
| **Vizualizacija ir data storytelling (DA_4)**   | Ciklas (vizualizacija, istorija), psichologija (10/20/80), Geštaltas, 4 promptai, super promptas, alternatyvos. | „Kuris Geštalto principas atsakingas už grupavimą?“ / „Ką turi išvesti super promptas?“ / „Kada naudoti DataLab vietoj ChatGPT?“ |

_Detalus klausimų sąrašas – DATA_AGENT / CONTENT_AGENT (modules.json, questionPool)._

### 9.2 Modulio 8 BONUS skaidrės (po testo, su praktinėmis užduotimis)

Po M8 testo (test-results) gali būti rodomos **2 neprivalomos BONUS skaidrės** su praktinėmis užduotimis – pagal Modulio 2 precedentą (id 51, 52). Rekomenduojamos pagal gilų analizę:

| #     | Skaidrė                                         | SOT šaltinis        | Praktinė užduotis                                                                                                                                                                              |
| ----- | ----------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Screenshot analizė (praktika)**               | §6.1 (7.22)         | Įkelti ekrano nuotrauką (dashboard, lentelė, schema), nukopijuoti sisteminį promptą, gauti: elementai, problemos, optimizacijos, prioritetas.                                                  |
| **2** | **Vizualizacijos praktika (tipas ir pavyzdys)** | §7A.4, §5.4a (7.32) | Vizualizacijos tipo parinkimas (ROLE/TASK/CONTEXT/OUTPUT) arba paprasta vizualizacija pagal tipą (stulpelinė/linijinė/skritulinė/lentelė); copy-paste promptas, išbandymas su savo duomenimis. |

**Alternatyva 2-ai skaidrei:** Schema paaiškinimo metodas (§6.2, 7.23) – įkelti duomenų schemą, gauti entitetus, ryšius, optimizavimo pasiūlymus.

**Implementacija:** Žr. [docs/MODULIU_7_8_9_ANALIZE_BONUS_SKAIDRES.md](MODULIU_7_8_9_ANALIZE_BONUS_SKAIDRES.md) – id pasirinkimas (pvz. 801, 802), ModuleView bonusSlides logika M8, SOT CopyButton tekstai.

---

## 10. Modulis 9 – Praktika (finalinis integruotas projektas)

- **Tikslas:** Vienas pilnas projektas – **integruota kelionė: pasirinktos ES šalies (27 valstybės) LinkedIn + Eurostat analizė**. Dalyvis pradžioje pasirenka šalį (bėgančioje juostoje); visa 8 užduočių seka susikonfigūruoja pagal šalį. Naudojama 6 blokų sistema, šio kelio promptų užuominos, MASTER PROMPTAS (02_DA XIII). Žr. **§10.0.2** – integruota kelionė, mažai konfigūracijos, vesti per procesą.
- **Struktūra:** Learn (M7) → Test (M8) → **Practice** (M9); capstone = vienas projektas (8 žingsniai, viena šalis). **15 papildomų scenarijų** (101–103, 105–116) – už pagrindinio modulio ribų, nuoroda SOT §10.2.
- **Ryšys su 4.1b:** Struktūruotas procesas (tikslai, kontekstas, rolė, promptai, grįžtamasis ryšys) – taikomas 8 žingsnių kelionei ir, jei atgaunami, scenarijams.

**Paprasta kalba (Moduliai 7–9):** Vartotojui matomi tekstai (antraštės, aprašymai, CTA, kortelių pavadinimai) rašomi **paprastai** – paprastam žmogui aišku ir suprantama. Vengiama vadybinio/techninio žargono be paaiškinimo (ROI, HR, CFO, EBITDA, NPS, SWOT, influencer, Senior ir pan.). Jei terminas būtinas – vienas sakinys paaiškinimo. Žr. `docs/development/PAPRASTOS_KALBOS_GAIRES.md`.

### 10.0 Modulio 9 workflow (duomenų valdymo ciklas)

Vienas aiškus 8 žingsnių ciklas – nuo duomenų surinkimo iki dashboard atvaizdavimo. Ryšys su Moduliu 4 (4.2 šaltiniai, 4.3 Deep research) ir Moduliu 7 (MASTER PROMPT, 5 žingsnių algoritmas, 7.16a valymas, 7A vizualizacija).

| #   | Žingsnis                                  | Trumpas aprašymas                                                                                                                                                                                                         |
| --- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Duomenų surinkimas**                    | Surinkti info apie įmonę/sektorių (šaltiniai, KPI, kontekstas).                                                                                                                                                           |
| 2   | **Metodikos prompto paruošimas**          | Šablonas: ką analizuoti, kokius rodiklius, kokią struktūrą naudoti.                                                                                                                                                       |
| 3   | **Deep research prompto paruošimas**      | Vienas promptas, tinkamas paleisti 4 įrankiams (ChatGPT, Gemini, DeepSeek, Grok).                                                                                                                                         |
| 4   | **4× Deep research vienu metu**           | Paleisti tą patį (arba labai panašų) promptą ChatGPT, Gemini, DeepSeek, Grok – lyginamajai sintezei. _Pastaba: naudokite prieinamus iš 4 įrankių._                                                                        |
| 5   | **Duomenų išvalymas**                     | Checklist (anonimizacija, formatas, dublių šalinimas, trūkstamos reikšmės) – ryšys su M7 7.16a ir 4.2b.                                                                                                                   |
| 6   | **Duomenų integracija į vieną dokumentą** | Suvienodinti iš 4 šaltinių rezultatus į vieną struktūruotą dokumentą (lentelė / markdown).                                                                                                                                |
| 7   | **Atvaizdavimas (Claude / ChatGPT)**      | Promptas vizualizacijai: parametrai, spalvos, grafikų pavadinimai, dinamika – **sandbox** gairės.                                                                                                                         |
| 8   | **Dashboard / demonstracija**             | Rezultatas: .html snippet, kurį galima išsaugoti per Notepad ir atidaryti naršyklėje; informatyvus, ne per sudėtingas. Pavyzdys: `public/m9_dashboard_snippet.html` – galite atsidaryti ir redaguoti pagal savo duomenis. |

**Sandbox principas:** Parametrai, spalvos, grafikų pavadinimai ir jų dinamika nurodomi prompte; mažai rankinio kodo, daug aišių instrukcijų DI.

#### 10.0.1 Pagalbiniai promptai (CopyButton) – kiekvienam žingsniui

**Žingsnis 1 – Duomenų surinkimas:**

```
Išvardink 10–15 duomenų šaltinių [įmonės / sektoriaus] temai: oficialūs, vieši šaltiniai; nurodyk atnaujinimo dažnį ir formatą (CSV, API, ataskaitos). Pridėk trumpą aprašymą kiekvienam.
```

**Žingsnis 2 – Metodikos promptas:**

```
ROLE: Tu esi verslo analitikas, kuris paruošia analizės metodiką.
TASK: Paruošk analizės metodikos šabloną temai [X].
CONTEXT: Reikia aiškios struktūros – ką analizuoti, kokius rodiklius naudoti.
OUTPUT: Lentelės struktūra su stulpeliais – Šaltinis, Rodiklis, Laikotarpis, Pastaba. Pridėk 5–7 konkretų rodiklių ir 3 šaltinius su nuorodomis.
```

**Žingsnis 3–4 – Deep research promptas (bendras 4 įrankiams):**

```
ROLE: Tu esi vyresnysis verslo analitikas. Naudok tik patikimus, cituotus šaltinius.
TASK: Atlik gilųjį tyrimą (deep research) temoje: [JŪSŲ TEMA – įmonė, sektorius arba verslo klausimas].
Užduotis: Išanalizuok tendencijas, pagrindinius rodiklius, rizikas ir galimybes. Sub-klausimai: (1) Kas vyksta rinkoje? (2) Kokie pagrindiniai KPI? (3) Kokios 3 didžiausios rizikos?
OUTPUT: Santrauka (max 1 puslapis), faktų sąrašas su datomis, šaltinių nuorodos. Jei duomenų nėra – parašyk „Nežinau“, ne spėliok.
Tą patį promptą paleisk ChatGPT, Gemini, DeepSeek ir Grok (arba prieinamus iš šių) – rezultatus vėliau sujungsime į vieną dokumentą.
```

**Žingsnis 5 – Duomenų valymas:**

```
Štai 4 DI (ChatGPT, Gemini, DeepSeek, Grok) tyrimo išvestys. Užduotis:
1. Išvalyk: pašalink dublius ir pasikartojančius faktus.
2. Suvienodink datas (formatas YYYY-MM-DD) ir skaičius (dešimtainis su kableliu arba tašku – nurodyk).
3. Pažymėk trūkstamas reikšmes ir siūlyk, kur galima papildyti.
4. Pridėk metaduomenis: šaltinis (kuris DI), data, tema.
Checklist prieš analizę: anonimizacija (jei reikia), formatų suvienodinimas, dublių šalinimas, trūkstamų reikšmių identifikavimas – žr. Modulio 7 skaidrę 7.16a.
```

**Žingsnis 6 – Duomenų integracija:**

```
Sujunk šiuos 4 tyrimo fragmentus (iš ChatGPT, Gemini, DeepSeek, Grok) į vieną dokumentą.
Reikalavimai: viena markdown struktūra su skyriais (1. Santrauka, 2. Faktai ir rodikliai, 3. Rizikos, 4. Šaltiniai). Kiekvienas faktas su žyme [šaltinis: ChatGPT/Gemini/DeepSeek/Grok]. Pašalink visus dublius – palik tik unikalius punktus. Pridėk bendrą išvadų skyrių (max 5 sakiniai).
```

**Žingsnis 7 – Atvaizdavimas (sandbox – parametrai, spalvos, grafikų pavadinimai):**

```
ROLE: Tu esi duomenų vizualizacijos ekspertas. Mažai kodo – daug aišių instrukcijų.
TASK: Paruošk vizualizacijos specifikaciją iš šių integruotų duomenų.
CONTEXT: Turiu vieną suvestinį dokumentą (surinktas + išvalyti + sujungti iš 4 DI tyrimų). Tikslas – dashboard vadovybei.
OUTPUT – nurodyk parametrus:
1. Spalvos: pagrindinė (hex), antrinė (hex), akcentas (įspėjimams/pozityviam) (hex).
2. Grafikų pavadinimai: X ašis, Y ašis, diagramos pavadinimas, legenda – konkrečiai pagal mano duomenis.
3. Dinamika: kokius 2 grafikus rekomenduotum? (pvz. laiko eilė, palyginimas pagal kategoriją.) Tipas: stulpelinė / linijinė / skritulinė.
4. KPI blokai: kokius 3–4 skaičius parodyti viršuje (pvz. bendra suma, pokytis %, top rodiklis)?
Pateik konkretų tekstą, kurį galiu nukopijuoti į Claude arba ChatGPT ir gauti .html dashboard kodą.
```

**Žingsnis 8 – .html dashboard snippet (instrukcija DI):**

```
Sugeneruok vieną pilną .html failą su įterptu CSS ir, jei reikia, minimaliu JavaScript (pvz. Chart.js per CDN), kuris atvaizduoja dashboard temai: [X].
Reikalavimai: antraštė, 2–3 KPI blokai (skaičiai ar placeholder), 1–2 grafikai (stulpelinė arba linijinė). Kodas turi būti pilnas – kad galėčiau nukopijuoti į Notepad, išsaugoti kaip .html ir atidaryti naršyklėje be papildomų failų. Naudok spalvas ir pavadinimus, kuriuos nurodžiau [arba: pagrindinė #2563eb, antrinė #64748b, akcentas #10b981]. Komentaras faile: „Modulio 9 pavyzdys – galite pakeisti duomenis ir spalvas.“
```

_Vizualinė workflow schema: žr. `public/m9_workflow.svg`._

#### 10.0.2 Integruota kelionė: 27 ES šalys, LinkedIn + Eurostat (pagrindinė M9 kelionė)

**Patvirtinta koncepcija:** Dalyvis **pradžioje pasirenka šalį** (bėgančioje juostoje / šalies pasirinkimo UI) – **27 Europos Sąjungos valstybės**. Pagal pasirinkimą **susikonfigūruoja visa 8 užduočių seka**; keičiasi tik šalis, promptų užuominos lieka trumpos ir bendros. **Kuo mažiau konfigūracijos:** mes duodame trumpas promptų užuominas; visus tyrimus renka, sintetizuoja ir integruoja mokymų dalyviai. Mums svarbiau vesti per procesą – aiškus kelias, ką ir kaip daryti.

**LinkedIn:** Tik **vieši duomenys** (profesinė ekosistema, tendencijos, darbo rinka – ne asmeniniai profiliai). Išmokysim dalyvius **sugeneruoti promptą patys**: pagal 6 blokų šabloną (Modulis 1) – „Sugeneruok gilaus tyrimo promptą apie [tema] pagal 6 blokų šabloną.“ Tuos promptus jie copy-paste į savo modelius. **Etika** – vieta ir laikas paminėti (vieši šaltiniai, gerbti ToS, ne rinkti asmens duomenų). LinkedIn įtraukia per interesą ir norą sukurti kažką, ko dar nebuvo – vieša, visiems suprantama ir prieinama tema.

**Eurostat:** Užtenka nurodyme promptuose (pvz. „Pridėk Eurostat rodiklius šaliai: BVP, užimtumas, eksportas“) – DI pats suranda/aprašo. Mažiau yra geriau; svarbiau vesti per procesą. Jei iki 7 modulio neišmoko kopijuoti promptų, tokiems nebepadėsime – kelias skirtas tiems, kurie eina kartu.

**M9 pagrindas (default):** Vienas integruotas projektas – **skaidrė 104 (Pilnas workflow)**. Tema pagal nutylėjimą: **„[Pasirinktos šalies] LinkedIn + Eurostat analizė“** – 8 žingsniai nuo surinkimo iki dashboard. Šalies pasirinkimas iš 27 ES valstybių – pirmame M9 (arba M7) žingsnyje, bėgančioje juostoje.

**15 scenarijų (101–103, 105–116):** Iškeliami **už pagrindinio modulio ribų** – gal vėliau, kaip papildomos opcijos. SOT palieka tik **nuorodą**, kad tokie scenarijai buvo kurti (§10.2 scenarijai 1–16 ir 10.2.1 4×4 medis – archyvas / referencas). Pagrindinė M9 kelionė = viena integruota 8 žingsnių kelionė su pasirinkta ES šalimi.

### 10.1 Struktūrinė logika: 5 blokai (framework)

Modulio 9 praktika remiasi **5 dideliais blokais** – mini „AI-driven data thinking“ framework:

1. **Sentimentų analizė** – tonas, temos, intensyvumas, prioritetai, veiksmai.
2. **Duomenų analizės tipai** – Descriptive → Diagnostic → Predictive → Prescriptive.
3. **Verslo taikymas** – finansai, darbuotojų mokymų įvertinimas, konkurentai, rizikos.
4. **Promptų sekos** – workflow logika (surink → išvalyk → metaduomenys → 4 analizės → veiksmų planas).
5. **Duomenų valymas + metaduomenys + pateikimas** – checklist, 3 metaduomenų tipai.

_Framework apima: tekstinę analizę, skaitinę analizę, prognozavimą, rizikas, strategiją, duomenų architektūrą._

### 10.2 Modulio 9 scenarijai ir promptai (referencas – už pagrindinio modulio ribų)

**Pagrindinė M9 kelionė** – žr. §10.0.2: 27 ES šalys, pasirinkimas pradžioje, 8 užduotys (LinkedIn + Eurostat). Žemiau – **scenarijų aprašymai ir promptai** išsaugoti SOT kaip **referencas / archyvas**; šie 16 scenarijų (1–16 → id 101–116) **neįeina į pagrindinę modulio ribą** – gal vėliau atgaunami kaip papildomos opcijos. Kiekvienas scenarijus gali būti atskira užduotis arba dalis integruoto projekto kitame kontekste.

---

#### Scenarijus 1: Sentimentų analizė – kaip daryti teisingai

**Kontekstas:** Paprastas promptas („Pateik sentimentų analizę: teigiamas, neutralus, neigiamas“) duoda tik paviršių. Verslo vertė – temų klasifikacija, emocijos intensyvumas, problemų prioritetai, pasikartojimo dažnis, veiksmų rekomendacijos.

**Verslo pavyzdys:** 200 atsiliepimų → 62 % teigiami, 21 % neutralūs, 17 % neigiami; 11 % mini lėtą pristatymą, 9 % kainą, 6 % prastą support → sprendimų lygis.

**Patobulintas promptas – kopijuojamas (CopyButton):**

```
ROLE: Tu esi rinkos analitikas.
TASK: Atlik sentimentų analizę.
CONTEXT: Įkeliu klientų atsiliepimus apie mūsų produktą.

OUTPUT:
1. Bendra sentimentų struktūra (% teigiamų / neutralių / neigiamų)
2. Dažniausios temos (su pasikartojimo skaičiumi)
3. Emocijos intensyvumas (žemas / vidutinis / aukštas)
4. Kritiniai skundai (top 5 pagal riziką reputacijai)
5. 3 prioritetiniai veiksmai

TONE: Analitinis, konkretus, be bendrybių.
```

---

#### Scenarijus 2: 4 analizės tipai – tikroji galia

**Kontekstas:** Aprašomoji (Kas įvyko?) → Diagnostinė (Kodėl?) → Nuspėjamoji (Kas gali įvykti?) → Nurodomoji (Kaip veikti?). Kiekvienam tipui – atskiras promptas.

**1. Aprašomoji – CopyButton:**

```
Apibendrink šiuos pardavimo duomenis:
- Top 5 produktai pagal pajamas
- Regionai su didžiausiu augimu
- Sezoniškumo tendencijos
- Pajamų koncentracija (% nuo top 20% klientų)
```

**2. Diagnostinė – CopyButton:**

```
Remiantis pardavimų kritimu Q3:
- Identifikuok galimas priežastis
- Patikrink ar tai susiję su kainų pokyčiu
- Ar įtaką turėjo sezoniškumas?
- Ar sumažėjo marketingo aktyvumas?
```

**3. Nuspėjamoji – CopyButton:**

```
Remiantis 3 metų duomenimis:
- Prognozuok Q4 pardavimus
- Įvertink atsargų poreikį
- Nurodyk riziką (% tikimybė)
```

**4. Nurodomoji – CopyButton:**

```
Remiantis prognoze:
- Kiek didinti atsargas?
- Ar kelti kainą?
- Ar intensyvinti reklamą?
- Kuriuos produktus fokusuoti?
```

---

#### Scenarijus 3: Duomenų kūrimas – struktūruotas pavyzdys

**Kontekstas:** Treniruoja analitinį mąstymą – stulpeliai, formulės, regionai, sezoniškumas.

**Promptas – kopijuojamas (CopyButton):**

```
ROLE: Duomenų analitikas.
Sukurk 20 eilučių pardavimo duomenų.

Stulpeliai:
- ID (formatas AB0001)
- Vardas, Pavardė
- Užsakymo data
- Produktas, Kiekis, Vieneto kaina
- Savikaina (formulė = Kaina*0.76)
- Viso suma (Kiekis*Kaina)
- Pelnas (Viso suma – Savikaina*Kiekis)

Pridėk: 3 skirtingus regionus, sezoniškumo skirtumus, realistines kainas.
Eksportuok XLS struktūra su formulėmis.
```

---

#### Scenarijus 4: Konkurentų analizė – strategija

**Promptas – kopijuojamas (CopyButton):**

```
ROLE: Strateginis verslo analitikas.
TASK: Atlik konkurentų analizę.

Išanalizuok:
1. Socialinių tinklų aktyvumą
2. SEO strategiją
3. Produktų kainodarą
4. Dažniausius klientų skundus
5. Finansinius rodiklius

OUTPUT:
- SWOT lentelė
- 3 konkurentų silpnos vietos
- 3 mūsų galimybės
- Greito įėjimo strategija (30 dienų planas)
```

---

#### Scenarijus 5: Finansų analizė (CFO asistentas)

**Promptas – kopijuojamas (CopyButton):**

```
ROLE: CFO asistentas.
Įvertink: EBITDA, maržą, pinigų srautą, skolos lygį.
Identifikuok:
- 3 finansines rizikas
- 3 optimizavimo galimybes
- Kainų didinimo potencialą (%)
```

---

#### Scenarijus 5a: Data scraping su paprastu Python skriptu

**Kontekstas:** Duomenų analizės kelio **duomenų rinkimo** žingsnis – kaip automatiškai surinkti duomenis iš svetainės (lentelės, sąrašai, kainos) naudojant DI sugeneruotą Python skriptą. Paprastai: bibliotekos (trumpai), promptas skriptui gauti, kaip paleisti.

**Kas reikia (paprasta kalba):**

- **Bibliotekos (trumpai):** `requests` – atsidaryti puslapį; `BeautifulSoup` arba `pandas` (su lxml) – ištraukti lenteles/tekstą. DI gali parašyti skriptą už jus.
- **Promptas (CopyButton)** – nukopijuok į DI, gausi paruoštą skriptą; tada: įdiegti Python (jei dar nėra), atidaryti terminalą, `pip install requests beautifulsoup4`, įrašyti skriptą į failą (pvz. `scrape.py`), paleisti `python scrape.py`. Rezultatas – CSV arba Excel, kurį vėliau galima analizuoti arba vizualizuoti.

**Promptas – kopijuojamas (CopyButton):**

```
ROLE: Tu esi Python programuotojas, kuris rašo paprastus duomenų siurbimo (scraping) skriptus.
TASK: Parašyk Python skriptą, kuris:
1. Atidaro šį puslapį: [ĮLIKUOKITE_SVETAINĖS_NUORODĄ]
2. Ištraukia [KĄ_IŠTRAUKTI – pvz. lentelę su kainomis, sąrašą produktų, pavadinimus ir kainas]
3. Išsaugo rezultatą į CSV failą (su lietuviškomis raidėmis UTF-8)

Reikalavimai:
- Naudok requests ir BeautifulSoup (arba pandas.read_html jei lentelė).
- Skriptas turi būti trumpas, su komentarais lietuviškai.
- Pabaigoje atspausdink: kiek įrašų surinkta ir failo pavadinimą.
Pateik pilną skriptą – kad galėčiau nukopijuoti į failą ir paleisti: pip install requests beautifulsoup4, python scrape.py
```

**Kaip naudoti ir paleisti (skaidrėje ar M9 instrukcijoje – trumpai):**

1. Nukopijuok promptą į DI; įrašyk savo svetainės nuorodą ir ką nori surinkti.
2. DI pateiks skriptą – nukopijuok į tekstinį redaktorius, išsaugok kaip `scrape.py`.
3. Atidaryk komandų eilutę (terminalą) – per „Paleisti“ (Windows) įvesk `cmd` arba naudok VS Code / Cursor terminalą.
4. Įvesk: `pip install requests beautifulsoup4` (vieną kartą). Tada: `python scrape.py`.
5. Rezultatas – CSV failas toje pačioje aplanke; atidaryk Excel arba peržiūrėk su DI.

**Paprastas atvaizdavimo pratimas (optional):** Po siurbimo – atidaryk gautą CSV; nukopijuok kelias eilutes į DI ir parašyk: „Šie duomenys surinkti iš [X]. Sukurk vieną grafiką (stulpelinė arba linijinė), kuris geriausiai parodo [Y]. Pateik konkrečią vizualizacijos instrukciją arba HTML/Chart.js pavyzdį.“ Taip sujungiama: **surinkimas → paprasta vizualizacija** vienoje praktikoje.

---

#### Scenarijus 6: HR analitika – mokymų efektyvumas

**Kontekstas:** ROI, segmentacija, kurios temos veikė, ką nutraukti / plėsti / testuoti.

**Promptas – kopijuojamas (CopyButton):**

```
1. Įvertink mokymų ROI: ROI = (produktyvumo augimas – mokymų kaštai) / mokymų kaštai
2. Segmentuok darbuotojus: Aukštas poveikis / Vidutinis / Nulinis
3. Identifikuok: kurios temos veikė, kurios ne
4. Pasiūlyk: ką nutraukti, ką plėsti, ką testuoti
```

---

#### Scenarijus 7: Rizikų prognozavimas

**Promptas – kopijuojamas (CopyButton):**

```
Sudaryk rizikų matricą.
Stulpeliai: Rizika | Tikimybė (%) | Poveikis (finansinis) | Laikotarpis | Prevencijos veiksmas | Alternatyvus planas
Papildomai: Sudaryk 3 scenarijus (optimistinis / realus / pesimistinis)
```

---

#### Scenarijus 8: Social media monitoring

**Promptas – kopijuojamas (CopyButton):**

```
1. Išskirk top 10 temų
2. Įvertink sentimentą (%)
3. Identifikuok influencerius
4. Nustatyk reputacijos riziką
5. Paruošk 2 savaičių atsako strategiją
```

---

#### Scenarijus 9: Duomenų valymas – checklist prieš analizę

**Checklist (naudoti prieš bet kokią analizę):**

- Anonimizacija
- Formatų suvienodinimas
- Dublių šalinimas
- Trūkstamų reikšmių identifikavimas
- Data type validacija
- Laiko žymės
- Regiono žymės

_Skaidrėje arba M9 instrukcijoje – checklist su varnelėmis; ryšys su 4.2b (duomenų paruošimas RAG)._

---

#### Scenarijus 10: Metaduomenys – kodėl tai svarbu

**3 tipai:**

| Tipas                | Kam reikia       |
| -------------------- | ---------------- |
| **Aprašomieji**      | Kontekstas       |
| **Struktūriniai**    | Schema           |
| **Administraciniai** | Teisės, saugumas |

_Be metaduomenų DI analizė tampa paviršinė. Integruoti į workflow prieš 4 analizės tipus._

---

#### Scenarijus 11: Pilnas workflow – verslo ciklas

**Žingsnių seka:**

1. Surink duomenis
2. Išvalyk (checklist)
3. Pridėk metaduomenis
4. Aprašomoji analizė
5. Diagnostinė analizė
6. Nuspėjamoji analizė
7. Nurodomoji analizė
8. Veiksmų planas

_M9 galutinis projektas gali būti: atlikti visą ciklą vienai temai (pvz. pardavimai, atsiliepimai) naudojant šiuos scenarijus ir MASTER PROMPTĄ._

---

#### Scenarijus 12: Vizualizacijos tipo parinkimas (DA_4)

**Kontekstas:** Pasiūlyk vizualizaciją – per paprasta. Verslo lygis: 3 variantai, kodėl tinka, rizikos (klaidinanti interpretacija), auditorija (vadovybė).

**Promptas:** Žr. §7A.4 (1) – ROLE: senior vizualizacijos ekspertas + UX; OUTPUT: 3 variantai, paaiškinimai, rizikos; TONE: strateginis.

---

#### Scenarijus 13: Istorijos kūrimas iš duomenų (DA_4)

**Kontekstas:** Data storyteller – naratyvas iš skaičių: įžvalga, konfliktas/įtampa, ką reiškia verslui, rekomenduojamas veiksmas.

**Promptas:** Žr. §7A.4 (2) – CONTEXT: pvz. pardavimai +20 %, bet 2 regionuose mažėjo; OUTPUT: 4 punktai.

---

#### Scenarijus 14: Power BI žingsnių generavimas (DA_4)

**Kontekstas:** CSV → duomenų įkėlimas, data model, vizualizacijos, DAX (YOY), dizaino rekomendacijos (Geštaltas).

**Promptas:** Žr. §7A.4 (3) – stulpeliai: Date, Region, Sales, Category.

---

#### Scenarijus 15: Python vizualizacijos kodas (DA_4)

**Kontekstas:** Dataset generavimas, stulpelinė + linijinė diagrama, seaborn, anotacijos su įžvalgomis. ROADMAP: 1 skaidrė max kodo – galima kaip užduoties aprašymas arba trumpas fragmentas.

**Promptas:** Žr. §7A.4 (4).

---

#### Scenarijus 16: Kombinuotas super promptas (DA_4)

**Kontekstas:** Pilnas analizės paketas – analitikas + vizualizacijos dizaineris + verslo strategas. OUTPUT: santrauka (3 įžvalgos), siūlomi grafikai, Power BI instrukcija, Python kodas, istorijos tekstas vadovybei (max 200 žodžių), rekomenduojamas veiksmas.

**Promptas:** Žr. §7A.7 – CopyButton.

---

### 10.2.1 Modulio 9 – 4×4 scenarijų medis (referencas – už pagrindinio modulio ribų)

_Ši struktūra (4×4, 16 scenarijų, id 101–116) dokumentuota SOT; pagrindinė M9 kelionė – §10.0.2 (27 šalys, 8 žingsniai). Jei vėliau atgaunama:_ vartotojas pirmiausia pasirenka vieną iš 4 krypčių (1 lygis), paskui vieną iš 4 scenarijų (2 lygis) → 16 pabaigų. Kiekviena = viena `practice-scenario` skaidrė su SOT scenarijumi.

| 1 lygis (4 kortelės)                   | 2 lygis (po 4 scenarijus)                                                                   | SOT scenarijai → skaidrės id |
| -------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------- |
| **A. Sentimentai ir duomenų valdymas** | Sentimentų analizė, Duomenų valymas, Metaduomenys, Pilnas workflow                          | 1, 9, 10, 11 → id 101–104    |
| **B. 4 analizės tipai ir rizikos**     | 4 analizės tipai, Rizikų prognozavimas, Social media monitoring, Kombinuotas super promptas | 2, 7, 8, 16 → id 105–108     |
| **C. Verslo taikymas**                 | Duomenų kūrimas, Konkurentų analizė, CFO (finansai), HR analitika                           | 3, 4, 5, 6 → id 109–112      |
| **D. Vizualizacija ir istorija**       | Vizualizacijos tipas, Istorijos kūrimas, Power BI žingsniai, Python vizualizacijos          | 12, 13, 14, 15 → id 113–116  |

- **Hub skaidrė** (tipas `practice-scenario-hub`): rodo 4 korteles 1 lygyje; pasirinkus – 4 korteles 2 lygyje; pasirinkus 2 lygį – navigacija į atitinkamą skaidrę pagal `targetSlideId`.
- **Progresas:** `completedTasks[9]` = užbaigtų scenarijų skaidrių id (101–116 ir 117). Galima rodyti „X iš 17 scenarijų užbaigta“ (arba 16, jei 117 neskaičiuojamas atskirai – JSON turi būti nuoseklus).

**4 rekomenduojami papildomi scenarijai:** Skaidrės 101, 102, 111, 116, 117 (JSON `recommendedSlideIds`). Po pagrindinio workflow – hub arba greitos kortelės suskleidžiamoje „Papildomai“ dalyje. JSON: `recommended: true` ten, kur produktas paryškina starterius.

---

### 10.3 Modulio 9 praktikos įgyvendinimas

**Produkto pasirinkimas (supaprastintas variantas B):** pagrindinis vartotojo kelias – **8 žingsnių workflow** skaidrėse **93–94** (schema + CopyButton promptai pagal §10.0). Tai laikoma **pakankamu** modulio užbaigimui. **Hub (id 99), 4 veikėjai ir iki 17 scenarijų (101–116 + 117)** – **papildoma biblioteka** po workflow; įvade UI suskleidžiama į „Papildomai“, kad nekurtų konkurencijos su pagrindiniu keliu.

- **Integruota ES šalių kelionė (§10.0.2):** palikta SOT kaip **alternatyvus / būsimas** produkto variantas; dabartinė implementacija jo nenaudoja kaip default.
- **Skaidrių eilė:** 90 (intro) → 93 → 94 → 99 (hub) → 101–116, 117 → 92 (santrauka). Po 94 skaidrės UI gali pasiūlyti **tiesioginį perėjimą į santrauką** (`onGoToSummary`), kad nereikėtų linijiniu būdu eiti per hub ir visus scenarijus.
- **Ryšys su M8:** Modulio 8 klausimai tikrina 5 blokus ir workflow logiką (surinkimas, deep research, valymas, integracija, vizualizacija).
- **Practice-intro (id 90):** `primaryPathIntro` – aiškiai: „Tęsti“ → 93–94; `firstActionCTA` – ne scenarijai pirmiausia. Veikėjai ir `storyBlock` – kontekstas **papildomiems** scenarijams (suskleidžiama sekcija).
- **Practice-summary (id 92):** sveikinimas už **workflow**; statistikos ir CTA atspindi 8 žingsnius kaip branduolį, scenarijai – „iki 17“, neprivaloma.
- **§10.2 / 10.2.1** scenarijų lentelės ir taskFrame lieka referencu; skaidrė **117** – Data scraping, įskaičiuota į papildomų scenarijų skaičių.

#### 10.3.1 Tekstai į JSON (practice-intro, 8 žingsnių kelionė, summary)

**Practice-intro (id 90) – dominuojantis kelias (workflow 93–94):**

- `primaryPathIntro`: trumpas blokas – 8 žingsniai kitose dviejose skaidrėse, „Tęsti“, pakanka moduliui užbaigti.
- `meaningParagraph`, `taskOneLiner`, `firstActionCTA`, `learningOutcomes`: workflow pirmiausia; scenarijai / hub – antraeilis.
- `storyBlock`, `characterMeaning`, `recommendedStart`: kontekstas **papildomai** (įvade – po suskleidžiamu „Papildomai“).
- `useCaseBlock`: gali likti verslo pavyzdžiai; nekonkuruoja su firstActionCTA.

_Scenarijų laukai (characterMeaning, 4 veikėjai, taskFrame 101–116 + 117) – žr. §10.2.1 ir lentelę žemiau._

**Užduoties rėmas (taskFrame) – 101–116:**

| id  | task (Užduotis)                                                                                 | doneWhen (Užbaigta, kai)                                                                                                          |
| --- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 101 | Paruošk sentimentų analizės santrauką klientų atsiliepimams.                                    | Turi 1 puslapio santrauką su sentimentų struktūra, temomis ir 3–5 įžvalgomis arba nukopijavai promptą ir gavai atsakymą iš DI.    |
| 102 | Paruošk duomenų valymo checklistą prieš analizę.                                                | Turi checklist (anonimizacija, formatai, dublių šalinimas, trūkstamos reikšmės) arba nukopijavai promptą ir gavai atsakymą iš DI. |
| 103 | Pridėk metaduomenis prie duomenų rinkinių (aprašomieji, struktūriniai, administraciniai).       | Turi metaduomenų aprašymą arba nukopijavai promptą ir gavai atsakymą iš DI.                                                       |
| 104 | Atlik pilną 8 žingsnių workflow vienai temai (nuo surinkimo iki dashboard).                     | Turi suvestinį dokumentą arba dashboard specifikaciją arba nukopijavai promptus ir gavai atsakymus iš DI.                         |
| 105 | Taikyk 4 analizės tipus (aprašomoji, diagnostinė, nuspėjamoji, nurodomoji) pardavimų duomenims. | Turi atsakymus pagal 4 tipus arba nukopijavai promptus ir gavai atsakymus iš DI.                                                  |
| 106 | Sudaryk rizikų matricą ir 3 scenarijus (optimistinis, realus, pesimistinis).                    | Turi rizikų matricą ir scenarijus arba nukopijavai promptą ir gavai atsakymą iš DI.                                               |
| 107 | Stebėk socialinius kanalus – temos, sentimentas, reputacijos rizika, atsako strategija.         | Turi santrauką su temomis, sentimentu ir 2 savaičių strategija arba nukopijavai promptą ir gavai atsakymą iš DI.                  |
| 108 | Naudok kombinuotą super promptą (analitikas + vizualizacija + verslo strategas).                | Turi santrauką, siūlomus grafikus ir rekomenduojamą veiksmą arba nukopijavai promptą ir gavai atsakymą iš DI.                     |
| 109 | Sukurk struktūruotus pardavimų duomenų pavyzdžius (stulpeliai, formulės, regionai).             | Turi 20 eilučių pavyzdį su stulpeliais ir formulėmis arba nukopijavai promptą ir gavai atsakymą iš DI.                            |
| 110 | Atlik konkurentų analizę – SWOT, silpnos vietos, 30 d. planas.                                  | Turi SWOT lentelę ir 30 dienų strategiją arba nukopijavai promptą ir gavai atsakymą iš DI.                                        |
| 111 | Paruošk CFO lygio finansų analizę (EBITDA, marža, rizikos, optimizacijos).                      | Turi finansinę santrauką su 3 rizikomis ir 3 galimybėmis arba nukopijavai promptą ir gavai atsakymą iš DI.                        |
| 112 | Įvertink mokymų ROI ir segmentuok darbuotojus pagal poveikį.                                    | Turi ROI įvertinimą ir rekomendacijas (ką nutraukti/plėsti/testuoti) arba nukopijavai promptą ir gavai atsakymą iš DI.            |
| 113 | Parink optimalų vizualizacijos tipą vadovybei (3 variantai, paaiškinimai, rizikos).             | Turi 3 vizualizacijos variantus su paaiškinimais arba nukopijavai promptą ir gavai atsakymą iš DI.                                |
| 114 | Sukurk duomenų istoriją – įžvalga, įtampa, ką reiškia verslui, veiksmas.                        | Turi 4 punktų naratyvą (įžvalga, konfliktas/įtampa, reikšmė, veiksmas) arba nukopijavai promptą ir gavai atsakymą iš DI.          |
| 115 | Sugeneruok Power BI žingsnius (CSV, data model, DAX, Geštaltas).                                | Turi žingsnių sąrašą arba instrukciją arba nukopijavai promptą ir gavai atsakymą iš DI.                                           |
| 116 | Paruošk Python vizualizacijų kodą (seaborn, anotacijos, įžvalgos).                              | Turi kodą arba specifikaciją arba nukopijavai promptą ir gavai atsakymą iš DI.                                                    |

**Refleksija po scenarijaus (reflectionPromptAfter)** – tas pats visiems 101–116: „Esi mokymų refleksijos asistentas. Ką tik atlikau vieną iš Modulio 9 scenarijų (verslo analizė su DI). Užduok man vieną klausimą: Ką šis scenarijus tau davė ir ką pritaikysi kitą kartą? Po mano atsakymo duok vieną konkretų patarimą.“

**Practice-summary (id 92)** – introBody ir stats atspindi **užbaigtą 8 žingsnių workflow**; papildomi scenarijai – neprivaloma praktika (iki 17). reflectionPrompt (What–So What–Now What); tagline ir nextStepCTA – pakartoti workflow arba atidaryti papildomą scenarijų.

---

### 10.4 Modulio 9 role-quest: 4 veikėjai ir bendras siužetas

Mini role-quest principas: visi 16 scenarijų susieti bendra istorija ir 4 veikėjais, kurie bendradarbiauja; kiekvienoje skaidrėje rodoma to scenarijaus „atlikėjo“ asmens kortelė (vardas, amžius, profesija, patirtis, hobis + PNG).

**Bendras siužetas:** Verslo analizės komanda „Duomenų kelias“ – keturi specialistai kartu dirba Q1 projekte: klientų atsiliepimų analizė, duomenų kokybė, verslo įžvalgos ir vizualizacijos. Kiekvienas atsakingas už savo sritį; scenarijai – kasdienės verslo situacijos, kurias jie sprendžia su DI.

**4 veikėjai (asmens kortelė: vardas, amžius, profesija, patirtis, hobis, PNG):**

| id  | Vardas   | Amžius | Profesija                        | Patirtis                                 | Hobis                   | PNG            |
| --- | -------- | ------ | -------------------------------- | ---------------------------------------- | ----------------------- | -------------- |
| 1   | Jūratė   | 28     | Verslo analitikė                 | 4 m. klientų ir rinkos analizėje         | Skaitmeninė fotografija | veikejas-1.png |
| 2   | Martynas | 34     | Duomenų analitikas               | 7 m. EDA ir rizikų vertinime             | Bėgimas, maratonai      | veikejas-2.png |
| 3   | Giedrė   | 31     | Verslo konsultantė (CFO/HR)      | 5 m. finansų ir HR analizėje             | Knygos, kelionės        | veikejas-3.png |
| 4   | Lukas    | 26     | Vizualizacijų ir BI specialistas | 3 m. Power BI, Python, data storytelling | Muzika, gitara          | veikejas-4.png |

**Priskyrimas skaidrės id → characterId (kas atlieka užduotį):**

| Skaidrės id | characterId | Veikėjas                                 |
| ----------- | ----------- | ---------------------------------------- |
| 101–104     | 1           | Jūratė (Sentimentai ir duomenų valdymas) |
| 105–108     | 2           | Martynas (4 analizės tipai ir rizikos)   |
| 109–112     | 3           | Giedrė (Verslo taikymas)                 |
| 113–116     | 4           | Lukas (Vizualizacija ir istorija)        |

- PNG laikomi `public/characters/veikejas-1.png` … `veikejas-4.png` (vartotojas įkels atskirai).
- Duomenys: `src/data/m9Characters.json` (4 įrašai); skaidrėse 101–116 laukas `characterId` (1–4). UI: asmens kortelė virš scenarijaus aprašymo, fallback be nuotraukos jei PNG nėra.

**Bendro siužeto blokas įvade (S2):** Practice-intro (id 90) turi lauką `content.storyBlock` (trumpas) ir **veikėjų prasmę vienu sakiniu**: „Veikėjai padeda pasirinkti **tematiką**: Jūratė – klientai ir duomenų valdymas; Martynas – analizės tipai ir rizikos; Giedrė – finansai ir HR; Lukas – vizualizacija ir BI. Pasirink pagal savo darbą arba tiesiog scenarijų iš sąrašo.“ StoryBlock pavyzdys: „Komanda „Duomenų kelias“ – 4 specialistai, 16 verslo užduočių (4×4). Žemiau – 4 greiti scenarijai arba paspausk veikėją – atsidarys jo 4 užduotys.“

**Veikėjų kortelės įvade paspaudžiamos:** Įvade veikėjų kortelės (CharacterCard) yra **paspaudžiamos** – paspaudus vieną veikėją, vartotojas nukreipiamas į hub skaidrę (id 99) su **iš anksto pasirinktu** 1 lygiu (`initialLevel1` = atitinkamas veikėjo indeksas), t. y. iškart matomas 2/2 ekranas „Pasirinkite vieną iš šio veikėjo 4 scenarijų“. UI: `onNavigateToHubWithCharacter(characterIndex)` → navigacija į 99 su `returnToHubWithLevel1` (arba ekvivalentu).

**Naratyvinis sakinys per scenarijų (S1):** Kiekvienoje skaidrėje 101–116 – optional laukas `scenario.narrativeLead`: vienas įvedantis sakinys „Šią savaitę [Veikėjas] atlieka…“. Lentelė (tekstas į JSON):

| id  | narrativeLead (pavyzdys)                                                            |
| --- | ----------------------------------------------------------------------------------- |
| 101 | Šią savaitę Jūratė atlieka sentimentų analizę klientų atsiliepimams.                |
| 102 | Šią savaitę Jūratė ruošia duomenų valymo checklistą prieš analizę.                  |
| 103 | Šią savaitę Jūratė prideda metaduomenis prie duomenų rinkinių.                      |
| 104 | Šią savaitę Jūratė koordinuoja pilną 8 žingsnių workflow vienai temai.              |
| 105 | Šią savaitę Martynas taiko 4 analizės tipus pardavimų duomenims.                    |
| 106 | Šią savaitę Martynas sudaro rizikų matricą ir 3 scenarijus.                         |
| 107 | Šią savaitę Martynas stebi socialinius kanalus ir reputaciją.                       |
| 108 | Šią savaitę Martynas naudoja kombinuotą super promptą (analitikas + vizualizacija). |
| 109 | Šią savaitę Giedrė kuria struktūruotus duomenų pavyzdžius verslui.                  |
| 110 | Šią savaitę Giedrė atlieka konkurentų analizę – SWOT ir 30 d. planas.               |
| 111 | Šią savaitę Giedrė paruošia CFO lygio finansų analizę (EBITDA, marža, rizikos).     |
| 112 | Šią savaitę Giedrė vertina HR mokymų efektyvumą ir ROI.                             |
| 113 | Šią savaitę Lukas parenka optimalų vizualizacijos tipą vadovybei.                   |
| 114 | Šią savaitę Lukas kuria duomenų istoriją – įžvalga, įtampa, veiksmas.               |
| 115 | Šią savaitę Lukas generuoja Power BI žingsnius (CSV, DAX, Geštaltas).               |
| 116 | Šią savaitę Lukas rašo Python vizualizacijų kodą (seaborn, anotacijos).             |

**Refleksija po scenarijaus (S3):** Skaidrėse 101–116 – optional laukas `content.reflectionPromptAfter` (tas pats visiems). Kopijuojamas promptas: „Esi mokymų refleksijos asistentas. Ką tik atlikau vieną iš Modulio 9 scenarijų (verslo analizė su DI). Užduok man vieną klausimą: Ką šis scenarijus tau davė ir ką pritaikysi kitą kartą? Po mano atsakymo duok vieną konkretų patarimą.“

**W1 – Šakotas scenarijus (bent vienas):** Skaidrė 105 „4 analizės tipai“ turi optional `scenario.branching`: `question` (pvz. „Kurią analizę pirmiausia atliktum šioje situacijoje?“) ir `choices[]` su `label` ir `consequence`. UI: pirmiausia rodomi pasirinkimai; pasirinkus – pasekmės tekstas, paskui įprastas scenarijaus aprašymas ir užduotis.

**W2 – „Pažymėjau kaip atliktą“ + feedback:** Optional `practicalTask.allowMarkWithoutAnswer` (true) ir `practicalTask.feedbackPrompt` (kopijuojamas tekstas). Skaidrėse 101 ir 105 – leidžiama pažymėti užduotį atlikta be įvedimo; po atlikimo rodomas feedback promptas „Ką gavai iš DI?“ su CopyButton.

---

## 11. Žodynėlis (Modulis 7) – optional skaidrė arba collapsible

| Terminas                            | Apibrėžimas (vienas sakinys)                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Duomenų analizė**                 | Rinkimas, tvarkymas ir interpretavimas duomenų siekiant priimti sprendimus – suprasti praeitį, įvertinti dabartį, prognozuoti ateitį.                              |
| **Duomenimis grįsti sprendimai**    | Sprendimai, pagrįsti duomenų analize ir įžvalgomis, o ne vien intuicija ar nuomone.                                                                                |
| **ER modelis**                      | Entity-Relationship modelis – lentelių ir jų ryšių (1-N, N-N) logikos aprašas.                                                                                     |
| **KPI**                             | Key Performance Indicator – pagrindinis veiklos rodiklis, kurį verta stebėti.                                                                                      |
| **Screenshot analizė**              | DI galimybė analizuoti ekrano nuotraukas – tekstas, kodas, grafikai, UI/UX.                                                                                        |
| **Deming principas**                | „In God we trust, all others bring data“ – prioritetas duomenims ir nuolatiniam tobulinimui.                                                                       |
| **Pipeline (duomenų analizės)**     | Rinkimas → paruošimas → EDA → modeliai → vizualizacija → publikavimas; „raw → insight → decision“ ciklas.                                                          |
| **EDA (Exploratory Data Analysis)** | Tiriamoji duomenų analizė – „ką galiu suprasti iš duomenų?“; aprašomoji statistika, koreliacijos, anomalijos, hipotezės.                                           |
| **3NF**                             | Trečioji normalios formos – duomenų bazės normalizavimo principas (sumažinti dubliavimą ir priklausomybes).                                                        |
| **MASTER PROMPTAS**                 | Galutinis 8 žingsnių promptas pilnai duomenų analizei: šaltiniai, struktūra, valymas, EDA, vizualizacijos, įžvalgos, prognozės, rekomendacijos.                    |
| **Sentimentų analizė**              | Tekstinės nuotaikos įvertinimas (teigiamas / neutralus / neigiamas) + temos, intensyvumas, prioritetai, veiksmų rekomendacijos.                                    |
| **4 analizės tipai**                | Aprašomoji (Kas įvyko?) → Diagnostinė (Kodėl?) → Nuspėjamoji (Kas gali įvykti?) → Nurodomoji (Kaip veikti?).                                                       |
| **Metaduomenys**                    | Aprašomieji (kontekstas), struktūriniai (schema), administraciniai (teisės, saugumas) – pagerina DI analizės kokybę.                                               |
| **Data storytelling**               | Duomenų pasakojimas – skaičiai → grafika → naratyvas → istorija; vizualizacija kaip sprendimų įrankis, ne tik grafikas.                                            |
| **Geštalto principai**              | Vizualinio suvokimo taisyklės: artumas, panašumas, išskyrimas, sujungimas, tęstinumas, uždarymas, figūra–fonas, bendras judėjimas – taikomi vizualizacijų dizaine. |
