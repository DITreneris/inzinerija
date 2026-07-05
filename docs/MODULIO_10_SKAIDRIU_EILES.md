# Modulio 10 skaidrių eilė (oficiali)

> **Paskirtis:** Rekomenduojama Modulio 10 (Agentų inžinerija) skaidrių/temų seka su trumpu pateisinimu. SOT: `docs/turinio_pletra_moduliai_10_11_12.md`. Atpažinimas: 10.1–10.8 = tik Modulio 10 (`docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6).  
> **Lean branduolys:** ~15–22 skaidrės (planas – apie 11–12 M10 teorijos skaidrių + M11 testas + M12 praktika).  
> **Atnaujinta:** 2026-07-05 – pridėtas uždaro mokymosi ciklas (10.49): taisyklės, įgūdžiai, veiksmų istorija, patikra, pamokos ir atnaujinimas.

---

## Pilna seka ir motyvacija (Modulis 10)

| Eilė | ID         | Skaidrė / tema                                           | Kodėl čia?                                                                                                               |
| ---- | ---------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 0    | 100        | Modulio 10 įvadas / įtraukimas (action-intro)            | Pirmoji skaidrė – hook, whyBenefit, firstActionCTA; auditorija: verslo specialistai + inžinieriai.                       |
| 1    | 10.1       | Agentų inžinerijos kelias – ką čia rasite                | Kelio apžvalga; sąvokų apibrėžimų **nėra** (jie – skaidrėje 10.15).                                                      |
| 2    | 10.2       | Agentų ciklas ir architektūra                            | Proceso diagrama; ReAct-style ciklas; „Kada naudoti agentą“.                                                             |
| 2a   | **10.21**  | **Checkpoint: agentų ciklas**                            | **NAUJA** – path-step micro-win; dalyvis patikrina 1 agentinę užklausą prieš gilesnę teoriją.                            |
| 3    | 10.25      | 3A strategija                                            | Verslo kontekstas prieš workflow – Automatize / Augment / Autonomize.                                                    |
| 4    | **10.45**  | **DI agentų tipai ir rolės**                             | **NAUJA** – L0–L3 taksonomija; koordinatorius, specialistas, vertintojas, maršrutizatorius; CopyButton.                  |
| 4a   | **10.451** | **Checkpoint: rolės ir handoff**                         | **NAUJA** – path-step; įvestys / išvestys ir perdavimo taisyklė prieš workflow šablonus.                                 |
| 5    | **10.48**  | **5 workflow šablonai verslui**                          | **NAUJA** – grandinė, maršrutizavimas, lygiagretus, koordinatorius+specialistai, generatorius+vertintojas.               |
| 5b   | **10.481** | **Skyrius: Multi-agent → workflow** (section-break)      | Recap po 10.48; spinoffCta → blog `how-to-design-an-ai-agent-workflow`. (JSON id `10.481`; kurikulo alias 10.48b)        |
| 5c   | **10.49**  | **Uždaro mokymosi ciklas: taisyklės, įgūdžiai, pamokos** | **NAUJA** – po workflow šablonų parodo visą sistemą: vykdymas → veiksmų istorija → patikra → pamokos → atnaujinimas.     |
| 6    | 10.3       | Rolės ir sisteminio prompto šablonas                     | Content-block: Trumpai → Daryk dabar → CopyButton → Patikra.                                                             |
| 7    | 10.4       | Įrankių pasirinkimas ir apribojimai                      | DI platformos; įrankių pasirinkimo medis.                                                                                |
| 8    | 10.5       | Kada rinktis agentą, kada – paprastą promptą             | Agentinis šablonas (5 dalių); nuoroda į 10.48.                                                                           |
| 8a   | **10.51**  | **Checkpoint: agentinis promptas**                       | **NAUJA** – path-step; 5 dalių promptas + workflow spec juodraštis prieš M12.                                            |
| 9    | 10.6       | Klaidos tvarkymas ir ribos                               | CopyButton – „Jei nepavyksta – parašyk kodėl“.                                                                           |
| 10   | 10.15      | Pagrindinės sąvokos: trigger, action, condition, webhook | **Perkelta** po agentų mąstymo – workflow terminai.                                                                      |
| 10b  | **10.151** | **Skyrius: Workflow → automatizavimas** (section-break)  | Recap po 10.15; spinoffCta → blog `choosing-workflow-automation-ai-pipelines`. (JSON id `10.151`; kurikulo alias 10.15b) |
| 11   | 10.35      | Verslo automatizavimo įrankiai                           | Zapier, Make, n8n, Power Automate.                                                                                       |
| 12   | 10.65      | Workflow spec, testavimas, saugumas                      | Optional; + 3 DI agento QC testai.                                                                                       |
| 13   | 10.7       | Žodynėlis (optional)                                     | + Koordinatorius, Vertintojas, Maršrutizatorius, ReAct.                                                                  |
| 14   | 10.8       | Modulio 10 santrauka                                     | 5 blokų modelis + use case katalogas (4 sritys).                                                                         |

---

## Modulis 11 (testas) – skaidrių eilė

| Eilė | ID  | Skaidrė / tipas | Kodėl čia?                                                                                                                                  |
| ---- | --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 0    | 110 | test-intro      | whyBenefit, duration ~10–12 min, firstActionCTA, slenksčiai (≥70 % → M12).                                                                  |
| 1    | 111 | test-section    | 9 MCQ (daugiau situacinių); q1 diagnostika, q3/q5/q6 – taksonomija ir multi-agent, q9 – uždaro mokymosi ciklas; remediation slideIds į M10. |
| 2    | 112 | test-results    | failedMessage naudoja slide ID (10.45, 10.48 ir kt.), ne UI numerius.                                                                       |
| 3    | 113 | bonus content   | 5 min prompt-only agent pipeline: koordinatorius → specialistas → vertintojas.                                                              |

---

## Modulis 12 (praktika) – skaidrių eilė

| Eilė (UI 1…N) | ID                  | Skaidrė / tipas                   | Kodėl čia?                                                                                                                   |
| ------------- | ------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1             | 120                 | practice-intro                    | whyBenefit; prompt-first startas 124.5; full delivery-first kelias – 3 lab'ai.                                               |
| 2             | 120.25              | content-block                     | Trys praktikos (3A) – schema `m12_three_labs`. Footer → 120.5.                                                               |
| 3             | 120.5               | content-block                     | **Privaloma:** Verslo multi-agent schema (ne meta AGENTS.md). Footer → 121.                                                  |
| 4–6           | 121–123             | practice-scenario                 | MUST lab'ai: Automatize, Augment (+ vertintojo promptas), Autonomize (+ rolės etiketės).                                     |
| 7–9           | 124, **124.5**, 125 | practice-scenario + content-block | SHOULD: 2 scenarijai + 1 sujungta M10 pakartojimo skaidrė; **124.5 Koordinatorius + 2 specialistai** – prompt-first startas. |
| 10            | 128                 | summary                           | 5 blokų santrauka.                                                                                                           |

---

## Nuorodos

- **Turinio SOT:** [docs/turinio_pletra_moduliai_10_11_12.md](turinio_pletra_moduliai_10_11_12.md)
- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6
- **Santraukos skaidrės:** [docs/development/SUMMARY_SLIDE_SPEC.md](development/SUMMARY_SLIDE_SPEC.md)
