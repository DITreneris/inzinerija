# Modulio 10 skaidrių eilė (oficiali)

> **Paskirtis:** Rekomenduojama Modulio 10 (Agentų inžinerija) skaidrių/temų seka su trumpu pateisinimu. SOT: `docs/turinio_pletra_moduliai_10_11_12.md`. Atpažinimas: 10.1–10.8 = tik Modulio 10 (`docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6).  
> **Lean branduolys:** ~15–22 skaidrės (planas – apie 11–12 M10 teorijos skaidrių + M11 testas + M12 praktika).  
> **Atnaujinta:** 2026-07-05 – pridėtas uždaro mokymosi ciklas (10.49): taisyklės, įgūdžiai, veiksmų istorija, patikra, pamokos ir atnaujinimas.

---

## Pilna seka ir motyvacija (Modulis 10)

| Eilė | ID         | Skaidrė / tema                                           | Kodėl čia?                                                                                                                 |
| ---- | ---------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 0    | 100        | Modulio 10 įvadas / įtraukimas (action-intro)            | Pirmoji skaidrė – hook, whyBenefit, firstActionCTA; auditorija: verslo specialistai + inžinieriai.                         |
| 1    | 10.1       | Agentų inžinerijos kelias – ką čia rasite                | Kelio apžvalga; sąvokų apibrėžimų **nėra** (jie – skaidrėje 10.15).                                                        |
| 2    | 10.2       | Agentų ciklas ir architektūra                            | Proceso diagrama; ReAct-style ciklas; „Kada naudoti agentą“.                                                               |
| 2a   | **10.21**  | **Kontrolinis taškas: agentų ciklas**                    | **NAUJA** – path-step greita pergalė; dalyvis patikrina 1 agentinę užklausą prieš gilesnę teoriją.                         |
| 2b   | **10.22**  | **Savitikra: agentų ciklas**                             | Warm-up po 10.2 / 10.21; 3 klausimai apie agentinį ciklą, paprastą promptą ir klaidos pranešimą.                           |
| 3    | 10.25      | 3A strategija                                            | Verslo kontekstas prieš workflow – Automatize / Augment / Autonomize.                                                      |
| 4    | **10.45**  | **DI agentų tipai ir rolės**                             | **NAUJA** – L0–L3 taksonomija; koordinatorius, specialistas, vertintojas, maršrutizatorius; CopyButton.                    |
| 4a   | **10.451** | **Kontrolinis taškas: rolės ir perdavimas**              | **NAUJA** – path-step; įvestys / išvestys ir perdavimo taisyklė prieš workflow šablonus.                                   |
| 5    | **10.48**  | **5 workflow šablonai verslui**                          | **NAUJA** – grandinė, maršrutizavimas, lygiagretus, koordinatorius+specialistai, generatorius+vertintojas.                 |
| 5a   | **10.481** | **Skyrius: Multi-agent → workflow** (section-break)      | Recap po 10.48; spinoffCta → blog `how-to-design-an-ai-agent-workflow`.                                                    |
| 5b   | **10.482** | **Agentų orkestravimo simuliacija**                      | DiagramKit walkthrough (`m10_agent_orchestrator`); Router≠orkestratorius; prieš 10.485.                                    |
| 5c   | **10.485** | **Savitikra: workflow šablonai**                         | Warm-up po orkestravimo; 3 klausimai (įsk. orkestravimas).                                                                 |
| 5d   | **10.49**  | **Uždaro mokymosi ciklas: taisyklės, įgūdžiai, pamokos** | Po workflow šablonų: vykdymas → veiksmų istorija → patikra → pamokos → atnaujinimas.                                       |
| 6    | 10.3       | Rolės ir sisteminio prompto šablonas                     | Content-block: Trumpai → Daryk dabar → CopyButton → Patikra.                                                               |
| 7    | 10.4       | Įrankių pasirinkimas ir apribojimai                      | DI platformos; įrankių pasirinkimo medis.                                                                                  |
| 8    | 10.5       | Kada rinktis agentą, kada – paprastą promptą             | Agentinis šablonas (5 dalių); nuoroda į 10.48.                                                                             |
| 8a   | **10.51**  | **Kontrolinis taškas: agentinis promptas**               | **NAUJA** – path-step; 5 dalių promptas + workflow spec juodraštis prieš M12.                                              |
| 9    | 10.6       | Klaidos tvarkymas ir ribos                               | CopyButton – „Jei nepavyksta – parašyk kodėl“.                                                                             |
| 9a   | **10.61**  | **Savitikra: prieš workflow sąvokas**                    | Warm-up po 10.6; 3 klausimai prieš 10.15.                                                                                  |
| 10   | 10.15      | Pagrindinės sąvokos: trigger, action, condition, webhook | **Perkelta** po agentų mąstymo – workflow terminai.                                                                        |
| 10b  | **10.151** | **Skyrius: Workflow → automatizavimas** (section-break)  | Recap po 10.15; spinoffCta → blog `choosing-workflow-automation-ai-pipelines`. (JSON id `10.151`; kurikulo alias 10.15b)   |
| 11   | 10.35      | Verslo automatizavimo įrankiai                           | Zapier, Make, n8n, Power Automate.                                                                                         |
| 12   | 10.65      | Workflow spec, testavimas, saugumas                      | Optional; + 3 DI agento QC testai.                                                                                         |
| 12a  | **10.66**  | **Agentų QC vertintojas**                                | `evaluator-prompt-block`; vienas vertintojo promptas patikrina tikslą, įvestis, įrankius, klaidas ir žmogaus patvirtinimą. |
| 13   | 10.7       | Žodynėlis (optional)                                     | + Koordinatorius, Vertintojas, Maršrutizatorius, ReAct.                                                                    |
| 14   | 10.8       | Modulio 10 santrauka                                     | 5 blokų modelis + use case katalogas (4 sritys).                                                                           |

---

## Modulis 11 (testas) – skaidrių eilė

| Eilė | ID        | Skaidrė / tipas | Kodėl čia?                                                                                                                                    |
| ---- | --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 0    | 110       | test-intro      | whyBenefit, duration ~10–12 min, firstActionCTA, slenksčiai (≥70 % → M12).                                                                    |
| 0a   | **110.5** | warm-up-quiz    | Pre-test savitikra: agentas vs promptas, 3A juosta, router ≠ orkestratorius.                                                                  |
| 1    | 111       | test-section    | 9 MCQ (daugiau situacinių); q1 diagnostika, q3/q5/q6 – taksonomija ir multi-agent, q9 – uždaro mokymosi ciklas; remediation slideIds į M10.   |
| 2    | 112       | test-results    | failedMessage rodo žmogiškas temas (ciklas, 3A, multi-agent rolės, workflow, įrankiai), o remediation chips išlaiko deep-link į M10 skaidres. |
| 3    | 113       | bonus content   | 5 min agentų promptų procesas: koordinatorius → specialistas → vertintojas.                                                                   |

---

## Modulis 12 (praktika) – skaidrių eilė

| Eilė (UI 1…N) | ID         | Skaidrė / tipas   | Kodėl čia?                                                                                                |
| ------------- | ---------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| 1             | 120        | practice-intro    | whyBenefit; linijinis greitas startas **124.5 → 124**, tada 3A **121–123** (`minScenariosToComplete: 3`). |
| 2             | 120.25     | content-block     | Trys praktikos (3A) – schema `m12_three_labs` + Trumpai/Daryk/Patikra. Footer → 120.5.                    |
| 3             | 120.5      | content-block     | **Privaloma:** Verslo multi-agent schema + GOLDEN. Footer → 120.55.                                       |
| 4             | **120.55** | path-step         | Kontrolinis taškas prieš greitą startą. Footer → **124.5**.                                               |
| 5             | **124.5**  | practice-scenario | Greitas startas: Koordinatorius + 2 specialistai (tik promptai). Footer → 124.                            |
| 6             | **124**    | practice-scenario | Tyrimo agentas (tik promptai). Footer → 121.                                                              |
| 7–9           | 121–123    | practice-scenario | MUST lab'ai užbaigimui: Automatize, Augment, Autonomize (platforma arba kelias tik su promptais).         |
| 10            | 125        | content-block     | Optional: M10 pakartojimas.                                                                               |
| 11            | 128        | summary           | 5 blokų santrauka.                                                                                        |

---

## Nuorodos

- **Turinio SOT:** [docs/turinio_pletra_moduliai_10_11_12.md](turinio_pletra_moduliai_10_11_12.md)
- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6
- **Santraukos skaidrės:** [docs/development/SUMMARY_SLIDE_SPEC.md](development/SUMMARY_SLIDE_SPEC.md)
