# Modulio 10 skaidrių eilė (oficiali)

> **Paskirtis:** Rekomenduojama Modulio 10 (Agentų inžinerija) skaidrių/temų seka su trumpu pateisinimu. SOT: `docs/turinio_pletra_moduliai_10_11_12.md`. Atpažinimas: 10.1–10.8 = tik Modulio 10 (`docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6).  
> **Lean branduolys:** ~15–22 skaidrės (planas – apie 11–12 M10 teorijos skaidrių + M11 testas + M12 praktika).  
> **Atnaujinta:** 2026-06-29 – multi-agent taksonomija (10.45, 10.48), workflow sąvokos perkeltos po agentų mąstymo.

---

## Pilna seka ir motyvacija (Modulis 10)

| Eilė | ID         | Skaidrė / tema                                           | Kodėl čia?                                                                                                               |
| ---- | ---------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 0    | 100        | Modulio 10 įvadas / įtraukimas (action-intro)            | Pirmoji skaidrė – hook, whyBenefit, firstActionCTA; auditorija: verslo specialistai + inžinieriai.                       |
| 1    | 10.1       | Agentų inžinerijos kelias – ką čia rasite                | Kelio apžvalga; sąvokų apibrėžimų **nėra** (jie – skaidrėje 10.15).                                                      |
| 2    | 10.2       | Agentų ciklas ir architektūra                            | Proceso diagrama; ReAct-style ciklas; „Kada naudoti agentą“.                                                             |
| 3    | 10.25      | 3A strategija                                            | Verslo kontekstas prieš workflow – Automatize / Augment / Autonomize.                                                    |
| 4    | **10.45**  | **DI agentų tipai ir rolės**                             | **NAUJA** – L0–L3 taksonomija; koordinatorius, specialistas, vertintojas, maršrutizatorius; CopyButton.                  |
| 5    | **10.48**  | **5 workflow šablonai verslui**                          | **NAUJA** – grandinė, maršrutizavimas, lygiagretus, koordinatorius+specialistai, generatorius+vertintojas.               |
| 5b   | **10.481** | **Skyrius: Multi-agent → workflow** (section-break)      | Recap po 10.48; spinoffCta → blog `how-to-design-an-ai-agent-workflow`. (JSON id `10.481`; kurikulo alias 10.48b)        |
| 6    | 10.3       | Rolės ir sisteminio prompto šablonas                     | Content-block: Trumpai → Daryk dabar → CopyButton → Patikra.                                                             |
| 7    | 10.4       | Įrankių pasirinkimas ir apribojimai                      | DI platformos; įrankių pasirinkimo medis.                                                                                |
| 8    | 10.5       | Kada rinktis agentą, kada – paprastą promptą             | Agentinis šablonas (5 dalių); nuoroda į 10.48.                                                                           |
| 9    | 10.6       | Klaidos tvarkymas ir ribos                               | CopyButton – „Jei nepavyksta – parašyk kodėl“.                                                                           |
| 10   | 10.15      | Pagrindinės sąvokos: trigger, action, condition, webhook | **Perkelta** po agentų mąstymo – workflow terminai.                                                                      |
| 10b  | **10.151** | **Skyrius: Workflow → automatizavimas** (section-break)  | Recap po 10.15; spinoffCta → blog `choosing-workflow-automation-ai-pipelines`. (JSON id `10.151`; kurikulo alias 10.15b) |
| 11   | 10.35      | Verslo automatizavimo įrankiai                           | Zapier, Make, n8n, Power Automate.                                                                                       |
| 12   | 10.65      | Workflow spec, testavimas, saugumas                      | Optional; + 3 DI agento QC testai.                                                                                       |
| 13   | 10.7       | Žodynėlis (optional)                                     | + Koordinatorius, Vertintojas, Maršrutizatorius, ReAct.                                                                  |
| 14   | 10.8       | Modulio 10 santrauka                                     | 5 blokų modelis + use case katalogas (4 sritys).                                                                         |

---

## Modulis 11 (testas) – skaidrių eilė

| Eilė | ID  | Skaidrė / tipas | Kodėl čia?                                                                                |
| ---- | --- | --------------- | ----------------------------------------------------------------------------------------- |
| 0    | 110 | test-intro      | whyBenefit, duration ~10–12 min, firstActionCTA, slenksčiai (≥70 % → M12).                |
| 1    | 111 | test-section    | 8 MCQ (2 situaciniai); q3/q5/q6 – taksonomija ir multi-agent; remediation slideIds į M10. |
| 2    | 112 | test-results    | failedMessage naudoja slide ID (10.45, 10.48 ir kt.), ne UI numerius.                     |

---

## Modulis 12 (praktika) – skaidrių eilė

| Eilė (UI 1…N) | ID                 | Skaidrė / tipas   | Kodėl čia?                                                                               |
| ------------- | ------------------ | ----------------- | ---------------------------------------------------------------------------------------- |
| 1             | 120                | practice-intro    | whyBenefit; MUST 3 lab'ai; recommendedSlideIds: 120.25, 120.5, 121–123, 124.5.           |
| 2             | 120.25             | content-block     | Trys praktikos (3A) – schema `m12_three_labs`. Footer → 120.5.                           |
| 3             | 120.5              | content-block     | **Privaloma:** Verslo multi-agent schema (ne meta AGENTS.md). Footer → 121.              |
| 4–6           | 121–123            | practice-scenario | MUST lab'ai: Automatize, Augment (+ vertintojo promptas), Autonomize (+ rolės etiketės). |
| 7–11          | 124–127, **124.5** | practice-scenario | SHOULD: 4 scenarijai + **124.5 Koordinatorius + 2 specialistai** (3 promptai, handoff).  |
| 12            | 128                | summary           | 5 blokų santrauka.                                                                       |

---

## Nuorodos

- **Turinio SOT:** [docs/turinio_pletra_moduliai_10_11_12.md](turinio_pletra_moduliai_10_11_12.md)
- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6
- **Santraukos skaidrės:** [docs/development/SUMMARY_SLIDE_SPEC.md](development/SUMMARY_SLIDE_SPEC.md)
