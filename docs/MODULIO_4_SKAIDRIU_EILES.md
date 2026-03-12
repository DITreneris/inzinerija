# Modulio 4 skaidrių eilė (oficiali)

> **Paskirtis:** Viena vieta – rekomenduojama Modulio 4 skaidrių/temų seka su trumpu pateisinimu kiekvienam žingsniui. SOT: `docs/turinio_pletra_moduliai_4_5_6.md`. Atpažinimas: 4.1–4.7 = tik Modulio 4 (`docs/CONTENT_MODULIU_ATPAZINIMAS.md`).  
> **Paskutinė atnaujinta:** 2026-02-12 (Modulio 4 pirmoji skaidrė – action-intro id 38; 4.0 perkelta į eilę 2).

---

## Pilna seka ir motyvacija

| Eilė | ID | Skaidrė / tema | Kodėl čia? |
|------|-----|----------------|------------|
| 0 | 38 | Modulio 4 įvadas / itraukimas (action-intro) | Pirmoji skaidrė – itraukimas į mokymus, hook, CTA; panaši į Modulio 1 pirmąją. |
| 1 | 4.0 | Dirbtinis intelektas ir visata: kaip viskas susiję | Kontekstas (AI→DI hierarchija) ir atsakomybė; primena Modulio 1 „kas yra DI“. |
| 2 | 4.1a (id 44) | Konteksto inžinerija: kaip „valdyti“ DI (+ InstructGPT įrodymas) | Apibrėžiama pagrindinė modulio sąvoka; OpenAI tyrimo įrodymas (vaidmuo, formatas, ribos); paruošia visas tolesnes temas. Buvusi atskira skaidrė InstructGPT (4.8) sujungta čia. |
| 3 | 4.1a2 | 4 dedamosios | Konceptualus rėmas (inžinerija, kalba, psichologija, komunikacija) – suderinama su oficialiais šaltiniais; padeda suprasti, „kur“ dirba promptų inžinierius. |
| 3a | 4.1-system-master | System prompt vs Master prompt | Tiesiog po 4 dedamųjų – rolė ir kontekstas; kaip DI „žino“, kas tu esi. |
| 3b | 4.1b2 | Proceso prompt ir workflow sudarymas | Tiesiog po System vs Master – proceso promptai, šablonai. |
| 4 | 4.1a2-viz | Custom GPT kūrimo procesas | Vizualizuoja inžinerijos dedamąją (8 žingsnių schema); optional giliam įsigilinimui. |
| 5 | 4.1a4 | 5 principai, kurie realiai pagerina bet kurį promptą | Patarimai inžinieriui – outcome-driven; 5 principai veiksmo forma; „Kodėl tai svarbu?“; vertinimo promptas. Pirmiau nei RL/RLHF – praktika prieš teoriją. |
| 7 | 4.1a3 | Kas yra paskatinamasis mokymas (RL/RLHF)? | Po patarimų – paaiškina, kodėl DI „stengiasi įtikti“; paruošia Quality ir žinių patikrinimo temas. |
| 8 | 4.1a5 | Parametrų laukas | „Žemėlapis“ – kur dirba inžinierius (6 parametrų grupės); susieja Modulį 1 su 4. |
| ~~9~~ | ~~4.1a5-style~~ | ~~Stilių naudojimas promptuose~~ | **Perkelta į Modulio 2 kaip bonusas po testo** – žr. Modulį 2 (po žinių patikrinimo). |
| ~~10~~ | ~~4.1a5-practice~~ | ~~Praktinės užduotys (po Stilių)~~ | **Perkelta į Modulio 2 kaip bonusas po testo** – žr. Modulį 2. |
| 11 | 4.1 | Įvadas į konteksto inžineriją | Kas bus modulyje (RAG, Deep research, tokenai, manipuliacijos, patikrinimas); nuoroda į 6 blokus. |
| 12 | 4.1-tools | Pagrindiniai įrankiai | Paruošia workflow – kokius įrankius naudoti (ChatGPT, Claude, Gemini, Gamma ir kt.). |
| 13 | 4.1-prompts | Metodinis vs Agentinis promptas | Skiria „pateikti metodiką“ nuo „atlikti workflow“ – paruošia RAG/Deep research (agentinis = paieška, šaltiniai). |
| 14 | 4.1b | Darbas su DI: struktūruotas procesas | 8 žingsnių workflow – kaip sistemingai dirbti su DI; pagrindas visiems tolesniems metodams. |
| 15 | **56** | **RAG: kas tai ir pabandyk** (4.1c+4.2 suliesta) | Viena skaidrė: konceptualus RAG (įvestis → DI → išvestis, šaltiniai) + praktika „pabandyk iš karto“ – kopijuojamas promptas, agentinė vizualizacija, optional collapsible. Buvo atskiros 4.1c ir 4.2 – dabar id 56. |
| 20 | 4.2-open | Atviros duomenų bazės ir RAG | Oficialūs šaltiniai (Eurostat, data.gov); praktika RAG. |
| 21 | 4.2a | Darbas su RAG: memory, išoriniai įrankiai | Memory, NoteLM, Trello; duomenų paruošimas su nuorodomis. |
| 22 | 4.2a-academic | DI įrankiai, kurie taupo jūsų laiką informacijos paieškai | Optional – verslo kontekstui (ne studentams). whyBenefit „Atlik bet kokį tyrimą mažiau nei per 30 min!“; 4 įrankiai su nuorodomis, collapsible patarimai, tipinė eiga. |
| 23 | 4.2b | Basic duomenų paruošimas RAG patikimumui | Išvalymas, santraukos, metaduomenys – kad RAG būtų patikimesnis. |
| 24 | 4.2c | 4 strategijos, kurios pakelia DI atsakymų kokybę | Žingsnis po žingsnio, CoT, palyginimai, idėjų medis (ToT) – su copyable pavyzdžiais; tiltelis į Deep research. |
| 24b | 4.2c-combo | Praktika: COMBO | Sujungti kelis metodus viename prompte (rolė + žingsniai + palyginimas + išvestis); paruošia M6 projektui. |
| 24a | 4.2-check | Savitikra: RAG | Formatinis grįžtamasis ryšys – 2–3 klausimai po RAG temos; dalyvis patikrina supratimą. Pedagoginė analizė §2.3. |
| 25 | 4.3 | Deep research (Gilusis tyrimas) | Multi-step tyrimas su DI; naudoja RAG; CoT/ToT. Logiška po RAG – „RAG + kelios pakopos“. |
| 26 | 4.3a | Praktinės užduotys: promptų sekos (sequence, CoT, ToT) | Kaip prašyti DI sugeneruoti promptų sekas/grandines/medžius. |
| 26b | 4.3b | Bridžinė praktika: RAG + Deep research | Jungiamoji 5–10 min užduotis – sujungti RAG ir Deep research su šaltiniais vienoje praktikoje; tiltelis prieš tokenus. |
| 26c | 4.3-check | Savitikra: Deep research | Formatinis grįžtamasis ryšys – 2 klausimai po Deep research temos. Pedagoginė analizė §2.3. |
| 26d | **65.8** | **Skyrius: Tokenai ir technikos (section-break)** | Skiriamoji skaidrė – atskiria RAG/Deep research (4.3) nuo Tokenų ekonomikos (4.4). Recap 7 promptų technikų (Sisteminis, Master, Procesas, Metodinis, Agentinis, RAG promptai, Combo promptai); celebration hero, nextSteps, footer. |
| 27 | 4.4 | Tokenų ekonomika | Kas yra tokenai, konteksto langas, max_tokens; kaip taupyti ir išlaikyti kokybę. Po RAG/Deep research – dabar aišku, *kiek* konteksto „telpa“. |
| 27b | 4.4-degradation | Konteksto degradacija: kodėl modeliai „pamiršta“? | Po tokenų – aiškina, kodėl ilgas kontekstas praranda kokybę (Lost in the Middle, dėmesio sklaida, FIFO); paruošia 4.4-check ir 4.5. |
| 27a | 4.4-check | Savitikra: Tokenai | Formatinis grįžtamasis ryšys – 2 klausimai po tokenų temos. Pedagoginė analizė §2.3. |
| 27b | 66.6 | Neigiami promptai (no prompts) | Ko vengti ir kaip perrašyti – neaiškūs, per trumpi, šališki promptai. |
| 28 | 69 | Žodynėlis | Pagrindiniai Modulio 4 terminai – RAG, Deep research, tokenas, haliucinacija ir kt. |
| 29 | **66.95** | **Konteksto inžinerijos atspaudas** | Section-break: 7 promptų technikų recap (Sisteminis, Master, Procesas, RAG, Deep research, tokenai). Ką toliau: Testas (M5) ir Projektas (M6). |
| 30 | 66.97 | 3 klausimai sau | Refleksijos promptas (3 klausimai) + CopyButton; pagal SUMMARY_SLIDE_SPEC. CTA į tolesnį žingsnį. |
| 31 | 66.99 | Pasirink tolesnį žingsnį (interaktyvi) | Pasirinkimai: (1) Modulio 5 testas, (2) RAG/Deep research pakartojimas, (3) Modulio 6 projektas, (4) M4 santraukos PDF. M4 baigiasi šia skaidre. |

**Perkelta į Modulį 7:** Skyrius „Patikrumas ir etika“ (66.9, 67, 67.3, 67.5, 67.8, 68, 200, 201, 68.5) – žr. MODULIO_7_SKAIDRIU_EILES.md. Modulio 4 santrauka (4.7 / id 70) pakeista uždarymu: atspaudas + 3 klausimai + interaktyvi skaidrė.

---

## Trumpos taisyklės

- **38 (action-intro) visada pirmas** – itraukimas, hook, CTA; po jo **4.0** – DI kontekstas.
- **4.1a (id 44)** – sujungta su buvusia skaidre InstructGPT (4.8): sąvoka + OpenAI tyrimo įrodymas vienoje skaidrėje; toliau – 4.1a2 (4 dedamosios).
- **4.1a2 (4 dedamosios) → System vs Master → Proceso prompt** – sąvokos tiesiog po 4 dedamųjų; po jų Skyriaus riba, tada Metodinis vs Agentinis, Custom GPT.
- **4.1a → 4.1a5 → 4.1** – konceptualus pagrindas ir parametrų laukas, tada įvadas „kas bus modulyje“.
- **4.1b po 4.1** – struktūruotas procesas prieš schemas (4.1c, 4.1d).
- **4.1c ir 4.2 suliesta** – viena skaidrė id 56 „RAG: kas tai ir pabandyk“ (suvienyta schema + praktika); toliau 4.2-open, 4.2a ir kt.
- **56 → 4.2-open → 4.3** – RAG praktika, tada atviros bazės, Deep research kaip multi-step RAG.
- **4.2-check, 4.3-check, 4.4-check** – savitikros (warm-up-quiz) po atitinkamų temų; formatinis grįžtamasis ryšys.
- **4.4 po 4.3** – tokenai po „ką įtraukiame“ (RAG, Deep research); dabar „kiek telpa“.
- **4.4 → 4.4-degradation → 4.4-check** – tokenai, tada degradacija ir mitigacijos, tada savitikra.
- **M4 pabaiga** – po 4.4-check ir Neigiamų promptų (66.6): Žodynėlis (69) → Konteksto inžinerijos atspaudas (66.95) → 3 klausimai sau (66.97) → Pasirink tolesnį žingsnį (66.99). M4 nebepasibaigia klasikine santrauka (4.7) – uždarymas atspaudu, refleksija ir interaktyvi skaidrė.
- **Patikrumas ir etika** – visas blokas (66.9, 67, 67.3, 67.5, 67.8, 68, 200, 201, 68.5) perkeltas į **Modulį 7** po skaidrės 891 (Duomenų paruošimas); žr. MODULIO_7_SKAIDRIU_EILES.md.
- **4.1-workflow-ex (8 skaidrių prezentacija)** – perkelta į Modulį 5 kaip pirmoji skaidrė (id 47); čia nebeskaičiuojama.
- **Praktika: DI visata (4.0-praktika, id 39.5)** – `modules.json` eilėje dabar **prieš Skyriaus ribą** (40.5 „Pirma dalis baigta“), t. y. po „Darbas su DI: struktūruotas procesas“ (43).

---

## Nuorodos

- Turinio SOT: `docs/turinio_pletra_moduliai_4_5_6.md` (skyrius 2, 2.1 lentelė ir 2.2 temų detalė).
- Modulių atpažinimas: `docs/CONTENT_MODULIU_ATPAZINIMAS.md`.
- Sinchronizacija su UI: `src/data/modules.json` – skaidrių eilė turi atitikti šią seką.
