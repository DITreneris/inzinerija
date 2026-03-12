 # Modulių 7–8–9 gili analizė – Verdiktas ir tobulinimo planas

> **Data:** 2026-02-14  
> **Autorius:** Senior Software Architect + Senior LX Designer + AI sistemų kūrėjas  
> **Šaltiniai:** `docs/turinio_pletra_moduliai_7_8_9.md`, `docs/MODULIO_7_SKAIDRIU_EILES.md`, `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`. Išsamūs analizės doc – lokaliai archyve: `docs/archive/MODULIO_7_SKAIDRIU_SUJUNGIMO_ANALIZE.md`, `docs/archive/moduliai_7_8_9/MODULIAI_7_8_9_VS_DUOMENU_INZINERIJA_ANALIZE.md`.

---

## 1️⃣ Executive Verdict

**Moduliai 7–8–9 yra semantiškai stiprūs**, bet **implementacinis ryšys su auditorija ir 80/20 logika silpnas**. Turinio SOT gerai struktūrizuotas – pipeline, MASTER PROMPTAS, 5 blokų framework, DA_4 vizualizacija. **Kas lūžta pirmiausia:** (1) **per didelė apimtis M7** – 35+ skaidrės (įskaitant DA_4) per ~1,5–3 val. laiko rėmą; (2) **M9 scenarijai neprioritetizuoti** – 16 scenarijų su vienodu svoriu, nors 80 % vertės suteiktų 3–4; (3) **trūksta „Kur pritaikyti?“** bloko – V1 atsiliepimai: „neturiu realaus pavyzdžio“; (4) **M8 testas nepagrįstas praktika** – daugiau teorijos nei „išbandyk vieną kartą“. Santraukai: **teorija stipri, praktinė vertė ir progresija – tobulintini**.

---

## 2️⃣ Vertės analizė

### 🎯 Tikslinės grupės atitikimas

| Aspektas | Vertinimas | Pagrindimas |
|----------|------------|-------------|
| **Analitikai / verslo specialistai** | **Vidutinė** | Pipeline, MASTER PROMPT, 6 domenai, 4 analizės tipai – tiesiai į temą. Bet: daug sąvokų (EDA, 3NF, ER modelis, Geštaltas) be aiškaus „kiek tau to reikia?“ ribojimo – rizika overwhelm. |
| **Non-tech vadovai** | **Silpna** | Deming, duomenų kultūra, promptas vadovybei – gerai. Bet: DB struktūra, lentelių metodika, 5 žingsnių algoritmas – per techniška be „tiesiog duok man rezultatą“ tiltelio. |
| **Jaunesnė auditorija (25–35 m.)** | **Silpna** | V1 atsiliepimai: „tingi skaityti“, „reikia video“, „norėsiu pasigilinti“. M7 ~35 skaidrių – per ilga forma be micro-video ar „30 s“ takeaway. |

### 📈 Praktinė vertė (80/20)

| Aspektas | Vertinimas | Pagrindimas |
|----------|------------|-------------|
| **CopyButton šablonai** | **Stipri** | Rolė, DB struktūra, vizualizacijos, prognozė, MASTER PROMPT – **iš karto naudojami**. Tai 80 % vertės šaltinis. |
| **Scenarijų prioritetizavimas** | **Silpna** | 16 scenarijų – vienodas svoris. Realiai: **Scenarijai 1 (sentimentai), 2 (4 tipai), 11 (workflow), 16 (super promptas)** – 80 % naudos. Kiti (CFO, HR, rizikos, social media) – niche, reikėtų „Ką toliau?“ |
| **M9 capstone** | **Vidutinė** | MASTER PROMPT + pasirinktas scenarijus – gerai. Bet: nėra aiškaus „pavyzdinio rezultato“ (sample output), kad dalyvis žinotų, į ką siekti. |

### 🧠 Kognityvinė apkrova

| Aspektas | Vertinimas | Pagrindimas |
|----------|------------|-------------|
| **Informacijos tankis M7** | **Per didelis** | 35 skaidrės, 6 domenai, 5 tipai, 3 rinkimo būdai, 8 Geštalto principai, 3 agentų tipai, 4 analizės tipai, 5 žingsnių algoritmas – per vieną „Learn“ modulį. MODULIAI_7_8_9_VS_DUOMENU_INZINERIJA jau siūlo lean branduolį (~12–18 skaidrių). |
| **Sąvokų skaičius** | **Per daug** | EDA, 3NF, ER modelis, metaduomenys (3 tipai), BI schema, sentimentų OUTPUT (5 punktų), Geštaltas (8 principų) – daugiau nei vienas mokymas gali įtvirtinti per 90 min. |

### 🔁 Įsitraukimas (engagement)

| Aspektas | Vertinimas | Pagrindimas |
|----------|------------|-------------|
| **Interaktyvumas** | **Vidutinė** | CopyButton – gerai. Bet: nėra „išbandyk dabar“ blokų M7 viduryje (tik BONUS M8 po testo). Praktika atidėta į M9. |
| **Progresijos jausmas** | **Vidutinė** | Learn → Test → Practice – logiška. Bet: M8 testas (8 klausimų) – daugiau „ar prisimeni?“ nei „ar gali pritaikyti?“ |
| **„Kur pritaikyti?“** | **Silpna** | V1: „trūksta aiškaus pritaikymo“. M7–M9 neturi vieno aiškaus bloko „Šią skaidrę gali panaudoti, kai…“ |

### 🏗 Struktūrinė logika

| Aspektas | Vertinimas | Pagrindimas |
|----------|------------|-------------|
| **Pipeline ir 6 blokų ryšys** | **Stipri** | Aiškus kelias: strateginis pamatas → operacinė lentelė → promptų architektūra → MASTER PROMPT. Ryšys su META/INPUT/OUTPUT – nuoseklus. |
| **DA_4 (vizualizacija) vietą** | **Diskutuotina** | SOT: DA_4 = M7 dalis. MODULIAI_7_8_9_VS_DUOMENU_INZINERIJA: perkelti į M16–18. **Verdiktas:** DA_4 per daug M7 – geriau atskiras „Duomenų vizualizacijos“ modulis po 7–9. |
| **Deming ir Lietuvos kontekstas** | **Stipri** | Būtina, griežta teorija – tinka governance ir kultūros formavimui. |

---

## 3️⃣ Agentų seka ir tobulinamai

| Eilė | Agentas | Funkcija | Išėjimas |
|------|---------|----------|----------|
| 1 | **CONTENT_AGENT** | Sutvarkyti SOT: MUST vs SHOULD (lean branduolys), prioritizuoti M9 scenarijus, pridėti „Kur pritaikyti?“ pavyzdžius prie 5–7 skaidrių. | Atnaujintas `turinio_pletra_moduliai_7_8_9.md` su prioritetais ir „use-case“ blokais. |
| 2 | **DATA_AGENT** | `modules.json`: (1) M7 – optional DA_4 skaidrės arba nuoroda į M16; (2) M9 – 4 prioritetinius scenarijus pažymėti `recommended: true`; (3) CopyButton pildymas (88, 89, 90, 93, 103) pagal MODULIO_7_GAP_ANALIZE. | Sinchronizuotas JSON, CopyButton struktūra. |
| 3 | **CODING_AGENT** | ModuleView: M9 – „Rekomenduojami scenarijai“ viršuje; M8 BONUS skaidrės (801, 802) logika; M7 – „Fast track“ optional (tik branduolys). | UI atnaujinimai. |
| 4 | **UI_UX_AGENT** | „Kur pritaikyti?“ bloko prototipas – viena skaidrė tipo `useCaseBlock` arba papildoma sekcija po santraukos. | Dizaino sprendimas. |
| 5 | **CODE_REVIEW_AGENT** | Patikrinti: ar M8 klausimai atitinka M7 branduolį; ar remediation nuorodos teisingos po sujungimų. | Diagnostikos ataskaita. |
| 6 | **QA_AGENT** | Changelog, RELEASE_QA_CHECKLIST, dokumentacijos sinchronas. | Release paruoštumas. |

---

## 4️⃣ Hipotezės

1. **Sumažinus M7 iki ~18–20 skaidrių (lean branduolys) ir perkėlus DA_4 į atskirą modulį**, completion rate M7 padidės ≥15 %, nes kognityvinė apkrova mažesnė.
2. **Pridėjus „Kur pritaikyti?“ bloką prie 5–7 skaidrių** (pvz. pipeline, MASTER PROMPT, 4 analizės tipai), V1 signalas „neturiu realaus pavyzdžio“ sumažės – matomumas naudos padidės.
3. **M9 scenarijų prioritizavimas** (4 rekomenduojami: 1, 2, 11, 16) sumažins pasirinkimo paralyžių ir padidins capstone užbaigimo tikimybę.
4. **M8 BONUS skaidrės** (Screenshot + Vizualizacija praktika) po testo – stiprins retention, nes „išbandyk vieną kartą“ įtraukia labiau nei tik teorinis testas.
5. **M8 klausimų perdarymas į scenarijų tipą** („Duoti atsiliepimai – kuris promptas geriausias?“) – geriau tikrina pritaikymą nei MCQ apie Geštaltą.

---

## 5️⃣ Tobulinimo kryptys (konkrečios)

### Prioritetas 1 (MUST)

| Kryptis | Veiksmas | Failas / vieta |
|---------|----------|----------------|
| **Lean M7** | Iš M7 pašalinti arba pažymėti `optional` DA_4 skaidres (100–106); rodyti nuorodą „Vizualizacija – Moduliuose 16–18“. | `turinio_pletra_moduliai_7_8_9.md`, `modules.json` |
| **„Kur pritaikyti?“** | Pridėti po 3–5 M7 skaidrėmis (pipeline, MASTER PROMPT, 4 analizės tipai, Deming) 1–2 sakinių bloką: „Šią skaidrę panaudosi, kai…“. | SOT → `modules.json` `content` |
| **M9 prioritetai** | 4 scenarijai (1, 2, 11, 16) – `recommended: true` arba „Rekomenduojami pradedantiesiems“ sekcija. | `modules.json` M9 |

### Prioritetas 2 (SHOULD)

| Kryptis | Veiksmas | Failas / vieta |
|---------|----------|----------------|
| **CopyButton pildymas** | 88 (tyrimų sistema), 89 (5 žingsnių), 90 (EDA), 93 (rinkos tendencijos), 103 (vizualizacijos) – pagal SOT ir GAP_ANALIZE. | `modules.json` |
| **M8 BONUS** | 2 skaidrės (801 Screenshot, 802 Vizualizacija) – `bonusSlides` logika ModuleView, rodyti po 82. | `ModuleView.tsx`, `modules.json` |
| **M8 klausimai** | 2–3 scenarijaus tipo klausimai vietoj pure MCQ (pvz. sentimentų OUTPUT, 4 analizės tipų pasirinkimas). | `modules.json` M8 `questionPool` |

### Prioritetas 3 (WANT)

| Kryptis | Veiksmas |
|---------|----------|
| **M9 pavyzdinis rezultatas** | Vienas „Sample output“ skaidrė arba blokas – kaip atrodo MASTER PROMPT rezultatas (trumpas pavyzdys). |
| **Fast track M7** | Optional toggle „Tik branduolys“ – rodyti tik 70, 71, 72, 73, 76, 77, 78, 83, 84, 86, 87, 89, 92, 74, 75. |
| **ROADMAP M16–18** | Pridėti Duomenų inžinerijos kelią (16–17–18) – DA_4, screenshot, schema, scenarijai 3–16. |

---

## 6️⃣ 30 dienų veiksmų planas

### Savaitė 1 (d. 1–7): SOT ir prioritetai

| Diena | Veiksmas | Rezultatas |
|-------|----------|------------|
| 1–2 | CONTENT_AGENT: SOT atnaujinimas – MUST (lieka 7–9) vs PERKELTI (16–18); „Kur pritaikyti?“ 5 skaidrėms. | `turinio_pletra_moduliai_7_8_9.md` v2 |
| 3 | DATA_AGENT: M9 scenarijų prioritetai – `recommended` arba sekcijos pavadinimas. | `modules.json` M9 |
| 4 | CONTENT_AGENT: M8 klausimų peržiūra – 2–3 scenarijaus tipo. | Klausimų sąrašas |
| 5–7 | DATA_AGENT: CopyButton pildymas 88, 89, 90, 93. | `modules.json` atnaujintas |

### Savaitė 2 (d. 8–14): Lean M7 ir DA_4

| Diena | Veiksmas | Rezultatas |
|-------|----------|------------|
| 8–9 | DATA_AGENT: M7 – DA_4 skaidrės (100–106) pažymėti `optional: true` arba nuoroda į M16. | M7 sumažintas branduolys |
| 10 | CODING_AGENT: M7 „Fast track“ arba filtravimas pagal `optional`. | ModuleView logika |
| 11–12 | CODING_AGENT + DATA: M8 BONUS skaidrės (801, 802) – turinys ir `bonusSlides`. | BONUS rodomos po M8 |
| 13–14 | UI_UX_AGENT: „Kur pritaikyti?“ bloko prototipas – 1 skaidrė. | Dizaino sprendimas |

### Savaitė 3 (d. 15–21): Integracija ir testavimas

| Diena | Veiksmas | Rezultatas |
|-------|----------|------------|
| 15–16 | CODING_AGENT: M9 „Rekomenduojami scenarijai“ viršuje; CopyButton 103. | M9 UI |
| 17 | CODE_REVIEW_AGENT: M8 remediation nuorodos, M7–M9 eilė. | Diagnostika |
| 18–19 | QA_AGENT: Release QA, lietuviškos raidės, changelog. | Release 1.x paruoštumas |
| 20–21 | Gyvas testavimas (1–2 asmenys) – M7 lean, M8 BONUS, M9 prioritetai. | Feedback |

### Savaitė 4 (d. 22–30): Dokumentacija ir ROADMAP

| Diena | Veiksmas | Rezultatas |
|-------|----------|------------|
| 22–23 | QA_AGENT: ROADMAP – M16–18 Duomenų inžinerija; CONTENT_MODULIU_ATPAZINIMAS. | Dokumentacija |
| 24–25 | CONTENT_AGENT: M9 „Sample output“ – vienas trumpas pavyzdys MASTER PROMPT rezultatui. | SOT + JSON |
| 26–28 | Buffer – klaidų taisymas, UX pataisymai pagal testavimą. | Stabilumas |
| 29–30 | Release, retrospektyva, sekantis ciklo prioritetas. | Done |

---

## CHANGES

- Sukurtas `docs/development/MODULIU_7_8_9_GILI_ANALIZE_VERDIKTAS.md` – pilna 7–8–9 analizė, vertės įvertinimas, agentų seka, hipotezės, tobulinimo kryptys, 30 d. planas.

## CHECKS

- Turinys sutapatintas su SOT, MODULIO_7_SKAIDRIU_EILES, MODULIAI_7_8_9_VS_DUOMENU_INZINERIJA, VARTOTOJU_ATSILIEPIMAI_BENDRAS.

## RISKS

- DA_4 perkėlimas į M16–18 – reikia ROADMAP ir navigacijos atnaujinimo; galimas vartotojų sutrikimas „kur vizualizacija?“.
- M7 sumažinimas – esami progreso duomenys (slide index) gali reikalauti migracijos.

## NEXT

1. Priimti sprendimą dėl DA_4 (lieka M7 optional vs pilnas perkėlimas į M16).
2. Pradėti Savaitę 1 – SOT ir M9 prioritetai.
3. Schedule gyvą testavimą po Savaitės 3.
