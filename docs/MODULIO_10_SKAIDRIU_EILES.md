# Modulio 10 skaidrių eilė (oficiali)

> **Paskirtis:** Rekomenduojama Modulio 10 (Agentų inžinerija) skaidrių/temų seka su trumpu pateisinimu. SOT: `docs/turinio_pletra_moduliai_10_11_12.md`. Atpažinimas: 10.1–10.8 = tik Modulio 10 (`docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6).  
> **Lean branduolys:** ~15–22 skaidrės (planas – apie 9–10 M10 teorijos skaidrių + M11 testas + M12 praktika).

---

## Pilna seka ir motyvacija (Modulis 10)

| Eilė | ID    | Skaidrė / tema                                           | Kodėl čia?                                                                                                                                                                                 |
| ---- | ----- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0    | 100   | Modulio 10 įvadas / įtraukimas (action-intro)            | Pirmoji skaidrė – hook, whyBenefit, firstActionCTA; nuoroda į M4–M6.                                                                                                                       |
| 1    | 10.1  | Agentų inžinerijos kelias – ką čia rasite                | Kelio apžvalga ir „ką rasite“ eilė; sąvokų apibrėžimų **nėra** (jie – skaidrėje 10.15).                                                                                                    |
| 2    | 10.2  | Agentų ciklas ir architektūra                            | Proceso diagrama; **papildyti:** ReAct-style ciklas (suprasti→įrankis→stebėjimas→kartoti), „Kada naudoti agentą“.                                                                          |
| 3    | 10.15 | Pagrindinės sąvokos: trigger, action, condition, webhook | Viena skaidrė – apibrėžimai ir 1–2 pavyzdžiai (formos pateikimas→CRM; PayPal→webhook→sistema).                                                                                             |
| 4    | 10.25 | 3A strategija                                            | Lentelė: Automatize 80 %, Augment 15 %, Autonomize 5 %; „Kur pritaikyti“.                                                                                                                  |
| 5    | 10.3  | Rolės ir sisteminio prompto šablonas                     | Content-block: Trumpai → Daryk dabar → CopyButton (sisteminis promptas agentui) → Patikra → Optional.                                                                                      |
| 6    | 10.4  | Įrankių pasirinkimas ir apribojimai                      | DI platformos (ChatGPT/Claude/Gemini); **matomas** įrankių pasirinkimo medis (Office 365→Power Automate, non-tech→Zapier, sudėtinga logika→Make, savihost→n8n, enterprise→Workato).        |
| 7    | 10.35 | Verslo automatizavimo įrankiai                           | Zapier, Make, n8n, Power Automate – aprašymai, stiprybės/silpnybės, tipiniai pavyzdžiai (doc §4, 8, 9, 10, 12).                                                                            |
| 8    | 10.5  | Kada rinktis agentą, kada – paprastą promptą             | Content-block; CopyButton – agentinė užduotis (žingsniai, įrankiai).                                                                                                                       |
| 9    | 10.6  | Klaidos tvarkymas ir ribos                               | Content-block; CopyButton – „Jei nepavyksta – parašyk kodėl“.                                                                                                                              |
| 10   | 10.65 | Workflow spec, testavimas, saugumas                      | **Matomas turinys:** spec diagrama ir 8 blokai (§18), 10 testų + **idempotency** paprasta kalba (§19), saugumas ir incident playbook (§20); įrankių medis – **nuoroda į 10.4**, ne dublis. |
| 11   | 10.7  | Žodynėlis (optional)                                     | 8–12 terminų (agentas, įrankis, trigger, action, condition, webhook, sisteminis promptas, integracija, vykdymas, ribos, klaidos tvarkymas).                                                |
| 12   | 10.8  | Modulio 10 santrauka                                     | 5 blokų modelis (summary); CTA į M11 (testas), M12 (projektas); „Pirmas veiksmas po modulio“.                                                                                              |

---

## Modulis 11 (testas) – skaidrių eilė

| Eilė | ID  | Skaidrė / tipas | Kodėl čia?                                                                                 |
| ---- | --- | --------------- | ------------------------------------------------------------------------------------------ |
| 0    | 110 | test-intro      | whyBenefit, duration ~10–12 min, firstActionCTA, microWinPhrase, slenksčiai (≥70 % → M12). |
| 1    | 111 | test-section    | 8 MCQ (įskaitant 2 situacinius); remediation slideIds į M10.                               |
| 2    | 112 | test-results    | passedMessage, failedMessage, useCaseBlock (accent), thresholdExplanation.                 |

---

## Modulis 12 (praktika) – skaidrių eilė

| Eilė (UI 1…N) | ID      | Skaidrė / tipas          | Kodėl čia?                                                                                                                                                                                                                                                                 |
| ------------- | ------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1             | 120     | practice-intro           | whyBenefit, duration ~20–30 min per lab'ą, firstActionCTA, `recommendedSlideIds` (įskaitant 120.25). **MUST:** 3 lab'ai (Automatize / Augment / Autonomize) su artefaktais; **SHOULD:** 4 papildomi scenarijai.                                                            |
| 2             | 120.25  | content-block            | Trys praktikos (3A) – interaktyvi schema `m12_three_labs` (kur žmogaus patvirtinimas). Footer: „Toliau – skaidrė 3“ → 120.5.                                                                                                                                               |
| 3             | 120.5   | content-block (optional) | Agentų orkestratorius – `agent_orchestrator_v2`. Footer: „Toliau – skaidrė 4“ → 121.                                                                                                                                                                                       |
| 4–6           | 121–123 | practice-scenario        | **MUST – 3 lab'ai:** Lab #1 Automatize (Form→Sheets/CRM→Email→Slack), Lab #2 Augment (laiškas→DI santrauka→approve→siuntimas), Lab #3 Autonomize (atsiliepimai→sentiment→eskalacija→ticket). Artefaktai: workflow schema, laukų mappingas, test cases, logų screenshot'ai. |
| 7–10          | 124–127 | practice-scenario        | **SHOULD:** 4 scenarijai: Tyrimo agentas, Ataskaitos generatorius, Įrankių naudojimas, Klaidos tvarkymas. taskFrame, scenario, template, instructions.                                                                                                                     |
| 11            | 128     | summary                  | 5 blokų santrauka (`SummarySlide`): hero, žinių kortelės, refleksijos promptas, CTA į Modulį 13 / sąrašą.                                                                                                                                                                  |

---

## Trumpos taisyklės

- **10.15 „Pagrindinės sąvokos“:** turinys sutrauktas į mažiau sekcijų; `blockVariant` pagal **GOLDEN_STANDARD.md** §2.2 (vienoje skaidrėje – ribotas `accent` skaičius; sąvokos – `brand` / `terms`).
- **100 (action-intro) visada pirmas** – whyBenefit, hook, nuoroda į M4–M6, firstActionCTA.
- **10.2 Agentų ciklas** – vizualizacija pagal SCHEME_AGENT.md; „Peržiūrėti pilname dydyje“ – tas pats React per EnlargeableDiagram.
- **10.3–10.6** – content-block schema: Trumpai (accent) → Daryk dabar (brand) → CopyButton → Patikra (accent) → Optional (terms).
- **10.8 santrauka** – 5 blokų modelis pagal content-agent-summary-slide.mdc.
- **M11** – test-results useCaseBlock su blockVariant: accent.
- **M12** – po įvado (**120**) – schema **120.25** (`m12_three_labs`); optional **120.5** (orkestratorius). **MUST:** 3 lab'ai (121–123) su artefaktais; **SHOULD:** 4 rekomenduojami scenarijai (124–127). SOT §8.2, §11; [AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md](AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md) §17.

---

## Nuorodos

- **Turinio SOT:** [docs/turinio_pletra_moduliai_10_11_12.md](turinio_pletra_moduliai_10_11_12.md)
- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6
- **Santraukos skaidrės:** [.cursor/rules/content-agent-summary-slide.mdc](../.cursor/rules/content-agent-summary-slide.mdc)
- **Schemos:** [docs/development/SCHEME_AGENT.md](development/SCHEME_AGENT.md)
