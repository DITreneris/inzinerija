# Modulio 13 skaidrių eilė (oficiali)

> **Paskirtis:** Rekomenduojama Modulio 13 (Turinio inžinerija) skaidrių/temų seka su trumpu pateisinimu. SOT: `docs/turinio_pletra_moduliai_13_14_15.md`. Atpažinimas: 13.1–13.11 = tik Modulio 13 (įsk. temą **13.10 Verslas ir rizikos**, 13.11 Workflow) (`docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6). **Techninis pastebėjimas:** `modules.json` skaidrei „Verslas ir rizikos“ naudojamas **`id`: 13.101** (unikalus skaičius JS), nes JSON skaičius **13.10** suparsinamas kaip **13.1** ir sutaptų su skaidre „Turinio inžinerijos kelias – ką čia rasite“.

---

## Pilna seka (Modulis 13)

| Eilė | ID                          | Skaidrė / tema                                   | Kodėl čia?                                                                                                                                                                                                            |
| ---- | --------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0    | 130                         | Modulio 13 įvadas / įtraukimas (action-intro)    | Pirmoji skaidrė – hook, whyBenefit, firstActionCTA; auditorija: rinkodara, komunikacijos.                                                                                                                             |
| 1    | 13.1                        | Turinio inžinerijos kelias – ką čia rasite       | Gilesnis nei įvanga sluoksnis: kampanijos tikslų modelis ir kur pritaikyti; įvangoje – tik trys kryptys (mažiau kartojimosi su 130).                                                                                  |
| 2    | **13.15**                   | **Skyrius: Vaizdo generavimas (section-break)**  | Skiriamoji skaidrė – vizualiai atskiria skyrių „Vaizdai“; apžvelgia: vaizdo promptai (objektas, kontekstas, stilius), proporcijos, brand, įrankiai (DALL·E, Midjourney, Ideogram).                                    |
| 3    | 13.2                        | Vaizdo prompto pagrindai                         | Content-block: Trumpai, **vienas** blokas „Formulė ir trys sluoksniai“ + diagrama, minimalūs reikalavimai; Daryk dabar → CopyButton → Patikra; collapsible „Kodėl tai veikia“.                                        |
| 4    | 13.3                        | Stilius ir proporcijos (vaizdai)                 | Content-block; CopyButton – stilius, aspect ratio; **Brand consistency (MUST);** collapsible „Kuris įrankis kam“ (įrankių pozicionavimas).                                                                            |
| 4a   | **13.33**                   | **Kompozicija ir kadras (optional)**             | Optional: tie patys kadravimo principai kaip video skaidrėje – čia pritaikymas **statinio vaizdo** promptui; trečdalių taisyklė, kameros kampas; collapsible naratyvinis vaizdas.                                     |
| 4b   | **13.35**                   | **Workflow ir MASTER šablonai (optional)**       | Viršuje – „Kaip naudotis šia skaidre“ (vienas MASTER arba vienas ready); 5 žingsnių workflow, #1000Books, MASTER, 3 ready + collapsible „Visi 8“; 13.11 tekste – nuoroda į šią skaidrę kaip į techninį pipeline.      |
| 4c   | **13.37**                   | **Vaizdo generatorius (interaktyvus)**           | Interaktyvus generatorius; LT `vaizdoGen.tldr` siejamas su optional MASTER (13.35). Įrankių tinklelis.                                                                                                                |
| 5    | **13.36**                   | **Skyrius: Video generavimas (section-break)**   | Skiriamoji skaidrė – skyrius „Video“; apžvelgia: scenarijus, kadravimas, formatas, kodėl DI video verta dėmesio, įrankiai (Sora, Runway, Veo 3).                                                                      |
| 6    | 13.4                        | Scenarijus trumpam vaizdo įrašui                 | Content-block; Kadravimas ir kameros kampas (brand); CopyButton – video scenarijus.                                                                                                                                   |
| 7    | 13.5                        | Video įrankiai ir formatas                       | Vienas accent „Kodėl verta ir ką nurodyti“; ilgas įrankių sąrašas – **collapsible** „Visi video įrankiai“; collapsible „Video prompt laukai“.                                                                         |
| 8    | **13.56**                   | **Skyrius: Muzikos generavimas (section-break)** | Skiriamoji skaidrė – skyrius „Muzika“; apžvelgia: nuotaika, stilius, tempo, foninė muzika, naudojimo teisės, įrankiai (Suno, Udio, Soundraw).                                                                         |
| 9    | 13.6                        | Muzikos aprašymas                                | LT trumpai (be „demokratizacijos“ žargono); **Angliškas MASTER** su LT paaiškinimu; collapsible „Papildomi pavyzdžiai…“; CopyButton – lietuviškas fragmentas.                                                         |
| 10   | 13.7                        | Muzikos garsai ir naudojimo teisės               | Content-block; CopyButton – garsų efektai; licencija.                                                                                                                                                                 |
| 11   | **13.101** (tema **13.10**) | **Verslas ir rizikos (MUST)**                    | Trumpas accent „Trumpai“; KPI/A/B – **collapsible**; CopyButton – A/B hipotezė; teisės/verslas – **collapsible**; QA ir versijos – **collapsible**; matomas „Top 3 pitfalls“.                                         |
| 12   | **13.11**                   | **Workflow: nuo brief iki publikacijos (MUST)**  | Trumpai + nuoroda į optional **13.35**; diagrama; CopyButton – brief į promptą. SHOULD: platformos, funnel, data-driven, automation, storyselling.                                                                    |
| 13   | 13.8                        | Žodynėlis (optional)                             | Terminai: vaizdo promptas, aspect ratio, scenarijus, BPM, nuotaika, stilius, naudojimo teisės, foninė muzika, trečdalių taisyklė, kameros kampas, naratyvinis vaizdas, CTR, CVR, CPM. Collapsible arba viena skaidrė. |
| 14   | 13.9                        | Modulio 13 santrauka                             | 5 blokų modelis (summary); statistika „Šablonai ir generatoriai: 5+“; CTA į M14 (testas), M15 (projektas).                                                                                                            |

---

## Modulis 14 (testas) – skaidrių eilė

| Eilė | ID  | Skaidrė / tipas | Kodėl čia?                                                                                                                 |
| ---- | --- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 0    | 140 | test-intro      | firstActionCTA apima ir rizikas/workflow; `thresholdExplanation` – „peržiūrėti“ (ne maišyti su imperatyvu).                |
| 1    | 141 | test-section    | 6 MCQ; tarp jų – veidas/balsas ir rizikos (**13.101**), workflow po brief (**13.11**); remediation `relatedSlideId` į M13. |
| 2    | 142 | test-results    | **useCaseBlock** – „Kitas žingsnis: Modulis 15“ (ne trečias „Kur pritaikyti?“ kartojimas).                                 |

---

## Modulis 15 (praktika) – skaidrių eilė

| Eilė (UI 1…N) | ID     | Skaidrė / tipas   | Kodėl čia?                                                                                                                                               |
| ------------- | ------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1             | 150    | practice-intro    | whyBenefit, duration ~20–40 min, firstActionCTA, `recommendedSlideIds` (įskaitant 150.25). Bent vienas artefaktas (vaizdas / video / muzika) + promptas. |
| 2             | 150.25 | content-block     | Projekto ciklas (šaka + iteracija) – schema `m15_practice_loop`. Footer: „Toliau – skaidrė 3“ → 151.                                                     |
| 3             | 151    | practice-scenario | Scenarijus 1: Vaizdas – stilius, proporcijos, promptas.                                                                                                  |
| 4             | 152    | practice-scenario | Scenarijus 2: Trumpas vaizdo įrašas – scenarijus, formatas.                                                                                              |
| 5             | 153    | practice-scenario | Scenarijus 3: Muzikos fragmentas – nuotaika, stilius, naudojimo teisės.                                                                                  |
| 6             | 158    | summary           | 5 blokų santrauka (`SummarySlide`): hero, kortelės (vaizdas / video / muzika / kitas žingsnis), refleksijos promptas.                                    |

---

## Trumpos taisyklės

- **130 (action-intro) visada pirmas** – whyBenefit, hook, firstActionCTA.
- **13.15, 13.36, 13.56** – section-break skaidrės (Vaizdai / Video / Muzika); vizualiai skiria modulio skyrius; turi title, subtitle, sectionNumber, footer.
- **13.2–13.7, 13.101 (Verslas), 13.11** – content-block schema: Trumpai (accent) → Daryk dabar (brand) → CopyButton → Patikra (accent) → Optional (terms). Verslas = KPI/A/B + Legal + QA su collapsible grupėmis; 13.11 = Workflow + SHOULD.
- **13.37** – interaktyvus vaizdo generatorius (type: `vaizdo-generatorius`); atskiras React komponentas su forma ir generuojamu promptu; po 13.35 MASTER, prieš 13.36 Video.
- **13.9 santrauka** – 5 blokų modelis pagal content-agent-summary-slide.mdc.
- **M14** – test-results `useCaseBlock`: „Kitas žingsnis: Modulis 15“ (accent); intro CTA atitinka 6 klausimų turinį.
- **M15** – MUST: bent vienas artefaktas (vaizdas / video / muzika) + naudotas promptas; po įvado – optional schema **150.25**; 3 practice-scenario (151–153), tada 158 summary.

---

## Nuorodos

- **Turinio SOT:** [docs/turinio_pletra_moduliai_13_14_15.md](turinio_pletra_moduliai_13_14_15.md)
- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6
- **Santraukos skaidrės:** [.cursor/rules/content-agent-summary-slide.mdc](../.cursor/rules/content-agent-summary-slide.mdc)
