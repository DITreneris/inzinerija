# Mokymų kurso (Moduliai 1–15) analizė ir apibendrinimas

> **Paskirtis:** Vienas dokumentas – kas gerai, kas negerai, ko trūksta, ko per daug, SWOT, pasiūlymai ir rekomendacijos kiekvienai mokymų daliai, low-hanging fruits.  
> **Šaltiniai:** DOCUMENTATION_INDEX, CONTENT_MODULIU_ATPAZINIMAS, modules.json, turinio_pletra*.md, ANALIZE_MODULIAI_*_UI_UX_USABILITY, USER_JOURNEY ataskaitos, VARTOTOJU_ATSILIEPIMAI_BENDRAS, ROADMAP, MODULIU_7_8_9_GILI_ANALIZE_VERDIKTAS, CURRICULUM_AGENT, GOLDEN_STANDARD.  
> **Data:** 2026-02-15

---

## 1. Kurso struktūra (1–15) – santrauka

| Dalys | Moduliai | Turinys | Būklė |
|-------|----------|---------|--------|
| **Bazinė triada** | 1, 2, 3 | 6 blokų sistema → Žinių patikrinimas → Praktika (6 scenarijai) | Produkcijoje, stipri |
| **Pažangusis blokas** | 4, 5, 6 | Konteksto inžinerija → Prezentacijos sprintas + mini testas → Projektas | Produkcijoje; M4 trintis, M5/M6 pataisyta |
| **Kelias: Duomenų analizė** | 7, 8, 9 | Teorija (pipeline, MASTER PROMPT) → Testas → Finalinis projektas (16 scenarijų) | Duomenyse (modules.json) yra; dokumentuota kaip planuojama / tobulinama |
| **Kelias: Agentų inžinerija** | 10, 11, 12 | Teorija (ciklas, įrankiai) → Testas → Projektas (3 lab'ai + 4 scenarijai) | Produkcijoje |
| **Kelias: Turinio inžinerija** | 13, 14, 15 | Vaizdai, video, muzika → Testas → Projektas (3 scenarijai) | Produkcijoje |

**Įėjimo logika:** 1→2→3 privaloma; 4 atrakinamas po 3; 5 po 4; 6 po 5 (optional ≥70 % M5). Keliai 7–9, 10–12, 13–15 – hybrid (vienas kelias privalomas arba atrakinami po completion).

---

## 2. Kas gerai

- **Aiški pedagoginė struktūra:** Learn → Test → Practice visose dalyse; 6 blokų sistema – vienas etalonas; santraukos 5 blokų modelis (content-agent-summary-slide); refleksijos promptai.
- **SOT ir dokumentacija:** Vienas šaltinis tiesos moduliams (turinio_pletra.md, turinio_pletra_moduliai_4_5_6, 7_8_9, 10_11_12, 13_14_15); CONTENT_MODULIU_ATPAZINIMAS išvengia painiavos 4.1–4.7 vs Modulio 6.
- **CopyButton ir praktiškumas:** Daug skaidrių su kopijuojamais promptais – iš karto naudojama vertė (ypač M4 RAG, M10 agentai, M13 vaizdai).
- **Moduliai 10–12 ir 13–15:** Trumpesnė teorija, aiškus content-block (TL;DR → Daryk dabar → Copy → Patikra); 3 lab'ai + scenarijai; useCaseBlock santraukose.
- **Vartotojų atsiliepimai integruoti:** 1 dalies santrauka po M3; „Kur pritaikyti?“ įtraukta į planus (M5 MUST); Donato/V1 feedback – per daug spalvų, neintuityvu – adresuota GOLDEN_STANDARD ir UI_UX gairėse.
- **Testavimas ir QA:** Unit/integraciniai testai; RELEASE_QA_CHECKLIST; lietuviškų raidžių ir a11y tikrinimas.
- **Kelio diferenciacija:** Trys vartotojų keliai (DA, Agentai, Turinys) – skirtinga auditorija (analitikai, inžinieriai, rinkodara).

---

## 3. Kas negerai

- **Modulis 4 – didžiausia trintis:** Custom GPT skaidrė (id 46) – vienas ilgas vizualas, be step-by-step, be mini užduočių; RAG→Deep research – energijos kritimas (daug content-block iš eilės); UX balas 68/100.
- **M4–6 trūkumai:** Santraukoje trūksta „Pirmas veiksmas po modulio“ ir aiškaus „Kur pritaikyti?“; M5 skaidrė 47 – per daug turinio vienoje skaidrėje; M5 rezultatų slenksčių reikšmė neaiški.
- **Moduliai 7–9:** Per didelė M7 apimtis (35+ skaidrės); 16 scenarijų be prioritetizavimo; „Kur pritaikyti?“ neįtraukta; M8 testas daugiau „ar prisimeni?“ nei „ar gali pritaikyti?“; DOCUMENTATION_INDEX nurodo M7–9 kaip „ateities turinys“, bet modules.json juos turi – būklė neaiški.
- **Vizualinis triukšmas (Donatas, V1):** Per daug spalvų, per daug informacijos, neintuityvu, sunku suprasti struktūrą; „vienos eilutės“ principas ne visur įgyvendintas.
- **Modulis 13:** Trūksta Kampanijos tikslų (13.1); brand consistency (13.3); 13.11 be workflow diagramos; keli content-block be „Daryk dabar“ / „Patikra“.
- **Bendri trūkumai:** Žodynėliai (M10 10.7, M4) – optional arba collapsible, ne visur įdiegti; prompt injection / jailbreak atskyrimas nuo verslo manipuliacijos (M4) – nepadengta; diagnostinis quiz feedback („čia stipru / silpna“) – ne visur.

---

## 4. Ko trūksta

- **„Kur pritaikyti?“ blokas** po moduliu arba santraukoje – bent 1–2 moduliuose (V1 MUST); use-case aiškumas.
- **Sandbox pranešimas** – „treniruoklis, galite klysti“ (ROADMAP Must).
- **Modulio pabaigos „kūrinys“** – kiekvienas modulis baigiasi bent vienu artefaktu (promptas, eskizas), ne tik „peržiūrėjai“.
- **Diagnostinis vertinimas** – quiz ir praktikos atsiliepimas: „čia stipru“, „čia rizika“, „pabandyk kitaip“, ne tik teisinga/neteisinga.
- **M4:** Žodynėlis (8–10 terminų), CoVe (Chain-of-Verification) „Giluminiam“, chunk size 4.2b, prompt injection atskira skaidrė/collapsible; micro-win po RAG.
- **M7:** Lean branduolys (~18–20 skaidrių), DA_4 vizualizacijos galimybė atskirai; „Kur pritaikyti?“ prie 5–7 skaidrių; M9 – 4 prioritetinius scenarijus (1, 2, 11, 16) pažymėti kaip rekomenduojamus.
- **M10:** Skaidrė 10.7 (Žodynėlis, optional).
- **M13:** Kampanijos tikslai (Awareness / Engagement / Conversion) 13.1; brand consistency 13.3; 13.11 workflow diagrama (7 žingsnių); Daryk dabar / Patikra ten, kur trūksta.
- **Fazių juosta M13:** getM13Phase (analogiškai M4) – „kur esu“.

---

## 5. Ko per daug

- **Modulis 7:** Informacijos tankis – 35+ skaidrės, daug sąvokų (EDA, 3NF, ER, Geštaltas, 8 principai ir kt.) viename „Learn“ modulyje; kognityvinė apkrova per didelė vienai sesijai.
- **M9 scenarijai:** 16 vienodo svorio – 80 % vertės duotų 3–4 prioritetiniai; likusius galima „Papildomai“ arba „Ką toliau?“.
- **Vizualinė informacija (bendrai):** Per daug spalvų ir kortelių kai kuriose skaidrėse (GOLDEN_STANDARD Must – 2–3 spalvos per skaidrę, vienas dominuojantis akcentas).
- **M4 RAG blokas:** Daug content-block iš eilės be fazių atskyrimo – rekomenduojama grupuoti arba įterpti micro-win.

---

## 6. SWOT

| | Stiprybės | Silpnybės |
|---|-----------|-----------|
| **Viduje** | Aiški 6 blokų ir Learn→Test→Practice struktūra; stiprus SOT ir dokumentacija; CopyButton ir praktiniai šablonai; trys diferencijuoti keliai (DA, Agentai, Turinys); santraukos 5 blokai ir refleksija. | M4 Custom GPT ir RAG trintis; M7 per didelė apimtis; „Kur pritaikyti?“ ir sandbox dar ne visur; vizualinis triukšmas; M7–9 būklė (produkcija vs planuojama) neaiški. |
| **Išorėje** | **Galimybės:** B2B mokymai (56 m. vadovas, struktūra); video/micro formatas (25–35 m.); „Kur pritaikyti?“ ir role-first – diferenciacija; automatizavimo įrankiai (AUTOMATIZAVIMO_IRANKIAI_VERSLUI) – papildoma vertė. | **Gresmės:** Konkurencija nuo „greito rezultato“ formatų; overwhelm iš per daug turinio (M7); segmentas „tingi skaityti“ – drop-off. |

---

## 7. Pasiūlymai ir rekomendacijos pagal dalis

### 7.1 Moduliai 1–3 (bazinė triada)

| Pasiūlymas | Prioritetas | Veiksmas |
|------------|-------------|----------|
| „Kur pritaikyti?“ po 1 dalies | Aukštas | Pridėti 1–2 sakinius po 1 dalies santraukos (id 38): kur naudoti 6 blokus kasdien. |
| Sandbox pranešimas | Aukštas | Pirmo modulio / praktikos kontekste: „Tai treniruoklis – galite bandyti, klysti ir grįžti atgal.“ |
| Lygio žymėjimas | Vidutinis | Įvardinti „Starter“ (V1) – aiškumas segmentams. |
| Video 60–120 s | Vidutinis (V2) | Trumpa micro video versija jaunesnei auditorijai. |

### 7.2 Moduliai 4–6 (pažangusis blokas)

| Pasiūlymas | Prioritetas | Veiksmas |
|------------|-------------|----------|
| Custom GPT (46) step-by-step | Aukštas | 1 žingsnis = 1 ekranas; mini užduotys + checkmark; Stepper arba sections-as-steps. |
| M4 fazių juosta | Aukštas | Įvadas / RAG / Deep research / Tokenai / Manipuliacijos / Santrauka – aišku „kur esu“. |
| Santraukoje (70) „Pirmas veiksmas“ ir „Kur pritaikyti?“ | Aukštas | 1–2 sakiniai: ką daryti pirmiausia; kur pritaikyti RAG ir patikrinimą. |
| Micro-win po RAG | Vidutinis | Trumpa savitikra (1 klausimas arba „Supratau RAG“ checkbox) prieš Deep research. |
| Žodynėlis M4 | Vidutinis | 8–10 terminų – viena skaidrė arba collapsible (SOT §2.1a). |
| Prompt injection / jailbreak | Vidutinis | Atskira skaidrė arba collapsible „Saugumas“ (M4 MUST M4). |
| M5 skaidrė 47 | Vidutinis | Sumažinti blokų skaičių arba padalinti į dvi skaidres. |
| M5 rezultatų slenksčiai | Vidutinis | thresholdExplanation aiškiai; „Ką tai reiškia?“ (useCaseBlock). |

### 7.3 Moduliai 7–9 (Duomenų analizės kelias)

| Pasiūlymas | Prioritetas | Veiksmas |
|------------|-------------|----------|
| M7 lean branduolys | Aukštas | Sumažinti iki ~18–20 skaidrių; DA_4 vizualizaciją – optional arba atskiras modulis. |
| „Kur pritaikyti?“ prie 5–7 skaidrių | Aukštas | Pridėti use-case pavyzdžius (pipeline, MASTER PROMPT, 4 analizės tipai). |
| M9 scenarijų prioritizavimas | Aukštas | 4 rekomenduojami (1, 2, 11, 16) – `recommended: true`; kiti „Papildomai“. |
| M8 klausimai – scenarijų tipas | Vidutinis | „Duoti atsiliepimai – kuris promptas geriausias?“ – pritaikymo, ne tik prisiminimo. |
| M8 BONUS (801, 802) | Vidutinis | Įdiegti logiką po testo – Screenshot + Vizualizacija praktiškai. |
| M7 „Fast track“ optional | Žemas | UI: pasirinkimas „tik branduolys“ tiems, kurie nori trumpesnio kelio. |
| Būklės aiškumas | Vidutinis | Sutapatinti DOCUMENTATION_INDEX ir modules.json – ar M7–9 produkcijoje, ar ne; atnaujinti SOT. |

### 7.4 Moduliai 10–12 (Agentų inžinerija)

| Pasiūlymas | Prioritetas | Veiksmas |
|------------|-------------|----------|
| Skaidrė 10.7 Žodynėlis | Vidutinis | Optional žodynėlis (8–12 terminų); terms, collapsible. |
| Santraukoje „Pirmas veiksmas po modulio“ | Vidutinis | Patikrinti SOT §6 – firstAction24h arba atitinkamas blokas. |
| Fazių atskyrimas M10 | Žemas | Jei 5 content-block iš eilės kelia pasiklydimą – getM10Phase grupes peržiūrėti. |

### 7.5 Moduliai 13–15 (Turinio inžinerija)

| Pasiūlymas | Prioritetas | Veiksmas |
|------------|-------------|----------|
| Kampanijos tikslai 13.1 | Aukštas | Awareness / Engagement / Conversion – MUST (turinio_pletra_moduliai_13_14_15). |
| Brand consistency 13.3 | Aukštas | Spalvų sistema, tipografija, tonas, vizualinis identitetas – į content. |
| 13.11 workflow diagrama | Vidutinis | 7 žingsnių schema (SCHEME_AGENT); EnlargeableDiagram. |
| getM13Phase | Vidutinis | Fazių juosta M13 (analogiškai M4). |
| Daryk dabar / Patikra 13.4–13.7 | Vidutinis | Papildyti trūkstamus content-block elementus pagal GOLDEN_STANDARD. |
| 13.10 Verslas | Vidutinis | Sumažinti kognityvinę apkrovą arba padalinti; KPI, A/B, Legal, QA – aiški struktūra. |

---

## 8. Low-hanging fruits (greiti laimėjimai)

| # | Užduotis | Kur | Pastanga | Efektas |
|---|----------|-----|----------|---------|
| 1 | **Santraukoje (M4, 70) – „Pirmas veiksmas“** | 1–2 sakiniai: „Šiandien atidaryk DI ir užduok RAG klausimą su šaltiniais.“ | Turinys (CONTENT_AGENT) + JSON | Rezultatas apčiuopiamas |
| 2 | **„Kur pritaikyti?“ po 1 dalies** | Skaidrė 38 arba 1 dalies santrauka | Turinys + DATA | V1 signalas „neturiu pavyzdžio“ |
| 3 | **Sandbox pranešimas** | M1 pirmoji arba M3 praktikos įvadas | 1 blokas teksto (CONTENT) + viena vieta UI | Saugumo jausmas, klysti drąsiau |
| 4 | **M9 – 4 scenarijai recommended: true** | modules.json M9 slides | DATA_AGENT – 4 ids pažymėti | Sumažina pasirinkimo paralyžių |
| 5 | **M5 rezultatų thresholdExplanation** | Skaidrė 514 (useCaseBlock) | Tekstas „Ką reiškia ≥70 %?“ + blockVariant accent | Aiškumas slenksčiams |
| 6 | **M10 10.7 Žodynėlis** | Nauja skaidrė optional arba collapsible | Turinys (8–12 terminų) + JSON | Nuoseklumas su M4, M13 |
| 7 | **M4 žodynėlis** | Viena skaidrė arba collapsible prieš 4.7 | SOT §2.1a jau turi terminų sąrašą; DATA + CONTENT | Gaps uždarymas |
| 8 | **Kampanijos tikslai 13.1** | Turinys 13.1 (Kelio apžvalga) | CONTENT – 3 tikslai (Awareness, Engagement, Conversion) | Turinio SOT MUST |
| 9 | **Diagnostinis quiz tonas** | QuizResultsView / atsakymų tekstai | „Čia stipru“ / „Pabandyk kitaip“ vietoj tik „Teisinga/neteisinga“ (1–2 vietos) | Pedagogika ROADMAP |
| 10 | **Vienas dominuojantis CTA** | Skaidrės su per daug mygtukų | UI_UX – palikti 1 stiprų CTA pagal „vienos eilutės“ principą | Donato feedback |

---

## 9. Agentų seka tobulinimams (bendra)

1. **CURRICULUM_AGENT** – patvirtinti MUST/SHOULD kiekvienai daliai (lean M7, prioritetai M9, 13.1 kampanijos).
2. **CONTENT_AGENT** – „Pirmas veiksmas“, „Kur pritaikyti?“ teksti; žodynėliai; Kampanijos tikslai; sandbox tekstas; SOT atnaujinimai.
3. **DATA_AGENT** – modules.json sinchronas (recommended, optional, naujos skaidrės 10.7, M9 4 scenarijai).
4. **CODING_AGENT** – Custom GPT step-by-step (M4); ModuleView fazių juostos (M13); thresholdExplanation; sandbox vieta UI.
5. **UI_UX_AGENT** – GOLDEN_STANDARD atitiktis (2–3 spalvos, vienas CTA); „Kur pritaikyti?“ bloko prototipas.
6. **CODE_REVIEW_AGENT** – diagramų ir vizualų patikra (SCHEME_AGENT §5); quiz flow.
7. **QA_AGENT** – CHANGELOG, RELEASE_QA_CHECKLIST, DOCUMENTATION_INDEX ir būklės (M7–9) sinchronas.

---

## 10. Santrauka

- **Stipru:** Struktūra (6 blokai, Learn→Test→Practice), SOT, CopyButton, santraukos 5 blokai, trys keliai, integruoti atsiliepimai.
- **Silpnu:** M4 trintis (Custom GPT, RAG energija), M7 apimtis ir M9 prioritetai, „Kur pritaikyti?“ ir sandbox dar ne visur, vizualinis triukšmas, kai kurie content-block/santraukų spragos.
- **Prioritetai:** (1) Low-hanging 1–5; (2) M4 Custom GPT step-by-step ir santraukos „Pirmas veiksmas“ + „Kur pritaikyti?“; (3) M7 lean + M9 prioritetai + „Kur pritaikyti?“; (4) M13 Kampanijos tikslai ir brand consistency; (5) Sandbox ir diagnostinis feedback.
- **Rizikos:** M7–9 būklė (duomenys vs dokumentacija); overwhelm M7; segmentas 25–35 m. – drop-off be trumpesnio formato.

---

**CHANGES:**  
- Sukurtas `docs/KURSO_1_IKI_15_ANALIZE_APIBENDRINIMAS.md` – pilna analizė, SWOT, pasiūlymai pagal dalis, low-hanging fruits.

**CHECKS:**  
- Turinys patikrintas pagal DOCUMENTATION_INDEX, CONTENT_MODULIU_ATPAZINIMAS, ANALIZE_MODULIAI_*_UI_UX_USABILITY, MODULIU_7_8_9_GILI_ANALIZE_VERDIKTAS, ROADMAP, VARTOTOJU_ATSILIEPIMAI_BENDRAS.  
- Modulių numeracija ir skaidrių id atitinka CONTENT_MODULIU_ATPAZINIMAS (§1, §6).  
- Lietuviškos raidės – naudotos (apibendrinimas, rekomendacijos, santrauka).

**RISKS:**  
- M7–9 „planuojamas“ vs modules.json – galimas painiavos rizika; rekomenduojama vieną būklę fiksuoti.  
- Per daug vienu metu pradedant low-hanging – geriau 3–5 punktus per sprint.

**NEXT:**  
- Įgyvendinti 3–5 low-hanging fruits (pvz. 1, 2, 3, 4, 5).  
- CURRICULUM_AGENT – MUST/SHOULD sutvirtinimas M7 (lean), M9 (4 scenarijai), M13 (Kampanijos).  
- CONTENT_AGENT + DATA_AGENT – „Pirmas veiksmas“ M4 santraukoje, „Kur pritaikyti?“ 1 daliai, M9 recommended flags.
