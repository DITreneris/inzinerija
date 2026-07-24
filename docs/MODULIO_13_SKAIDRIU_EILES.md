# Modulio 13 skaidrių eilė (oficiali)

> **Paskirtis:** Rekomenduojama Modulio 13 (Turinio inžinerija) skaidrių/temų seka su trumpu pateisinimu. SOT: `docs/turinio_pletra_moduliai_13_14_15.md`. Atpažinimas: 13.1–13.11 + 13.12 / 13.32 / 13.52 = Modulio 13 (`docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6). **Techninis pastebėjimas:** `modules.json` skaidrei „Verslas ir rizikos“ naudojamas **`id`: 13.101** (unikalus skaičius JS), nes JSON skaičius **13.10** suparsinamas kaip **13.1**.

---

## Pilna seka (Modulis 13)

| Eilė | ID                          | Skaidrė / tema                                  | Kodėl čia?                                                                                        |
| ---- | --------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 0    | 130                         | Modulio 13 įvadas / įtraukimas (action-intro)   | Pirmoji skaidrė – hook, whyBenefit, firstActionCTA; auditorija: rinkodara, komunikacijos.         |
| 1    | 13.1                        | Turinio inžinerijos kelias – ką čia rasite      | Gilesnis nei įvanga sluoksnis: kampanijos tikslų modelis ir kur pritaikyti.                       |
| 2    | **13.12**                   | **Generatyvinės medijos pipeline (MUST)**       | Brief → stills → refs → I2V → garsas → edit → QA/provenance. 2026 stuburas prieš įrankių detales. |
| 3    | **13.15**                   | **Skyrius: Vaizdo generavimas (section-break)** | Skiriamoji skaidrė – vizualiai atskiria skyrių „Vaizdai“.                                         |
| 4    | 13.2                        | Vaizdo prompto pagrindai                        | Content-block: Trumpai, formulė, CopyButton, Patikra.                                             |
| 5    | 13.3                        | Stilius ir proporcijos (vaizdai)                | Brand consistency (MUST); collapsible įrankių pozicionavimas (FLUX, GPT-Image, …).                |
| 5a   | **13.31**                   | **Savitikra: stilius ir proporcijos**           | Warm-up po 13.3.                                                                                  |
| 5b   | **13.32**                   | **Character / product consistency (MUST)**      | 3–5 refs, same-product lock; po brand, prieš kompoziciją.                                         |
| 5c   | **13.33**                   | **Kompozicija ir kadras (optional)**            | Optional: trečdalių taisyklė, kamera.                                                             |
| 5d   | **13.34**                   | **Praktika: atpažink stilių ir proporcijas**    | Recognition pratimas.                                                                             |
| 5e   | **13.35**                   | **Workflow ir MASTER šablonai (optional)**      | 5 žingsnių workflow, MASTER, ready prompts.                                                       |
| 5f   | **13.37**                   | **Vaizdo generatorius (interaktyvus)**          | Interaktyvus generatorius.                                                                        |
| 6    | **13.36**                   | **Skyrius: Video generavimas (section-break)**  | Skyrius „Video“.                                                                                  |
| 7    | 13.4                        | Scenarijus trumpam vaizdo įrašui                | Storyboard, 3–5 s klipai, image→video, audio-first hint.                                          |
| 8    | 13.5                        | Video įrankiai, formatas ir CPI                 | 2026 matrix (Seedance, Kling, Veo 3.1, Sora 2) + CPI.                                             |
| 8a   | **13.51**                   | **Savitikra: video promptas ir formatas**       | Warm-up po 13.5.                                                                                  |
| 8b   | **13.52**                   | **Post-production (MUST)**                      | AI = raw; CapCut cut/grade/mix; LUFS hint.                                                        |
| 9    | **13.56**                   | **Skyrius: Garsas (section-break)**             | Skyrius „Garsas“ (VO / SFX / music); ne tik muzika.                                               |
| 10   | 13.6                        | Audio-first: VO ir muzikos aprašymas            | Audio-first; VO + bed promptai; licensed vs demo.                                                 |
| 11   | 13.7                        | Garsai, licencijos ir loudness                  | SFX + commercial license + LUFS.                                                                  |
| 12   | **13.101** (tema **13.10**) | **Verslas ir rizikos (MUST)**                   | KPI/A/B + Legal + **C2PA/SynthID/disclosure** + QA.                                               |
| 13   | **13.11**                   | **Workflow: nuo brief iki publikacijos (MUST)** | Verslo ciklas; nuoroda į **13.12** techninį pipeline.                                             |
| 14   | 13.8                        | Žodynėlis (optional)                            | + CPI, C2PA, Soft Binding, audio-first, reference lock.                                           |
| 15   | 13.9                        | Modulio 13 santrauka                            | 5 blokų modelis; CTA į M14 / M15.                                                                 |

---

## Modulis 14 (testas) – skaidrių eilė

| Eilė | ID  | Skaidrė / tipas | Kodėl čia?                                                                                 |
| ---- | --- | --------------- | ------------------------------------------------------------------------------------------ |
| 0    | 140 | test-intro      | firstActionCTA – 12 klausimų (pipeline, audio-first, licencijos, C2PA + ankstesnės temos). |
| 1    | 141 | test-section    | 12 MCQ; remediation `relatedSlideId` į M13 (įsk. 13.12, 13.6, 13.7, 13.101).               |
| 2    | 142 | test-results    | **useCaseBlock** – „Kitas žingsnis: Modulis 15“.                                           |

---

## Modulis 15 (praktika) – skaidrių eilė

| Eilė (UI 1…N) | ID         | Skaidrė / tipas   | Kodėl čia?                                                                                                                   |
| ------------- | ---------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1             | 150        | practice-intro    | whyBenefit, duration ~20 min quick / ~60–90 min full, `minScenariosToComplete: 1`, `recommendedSlideIds`: `[150.5, 150.25]`. |
| 2             | 150.5      | practice-scenario | **MUST greitas startas:** hero vaizdas + promptas + brief.                                                                   |
| 3             | 150.25     | content-block     | Projekto ciklas – schema `m15_practice_loop`.                                                                                |
| 4             | **150.26** | path-step         | Checkpoint quick vs full; full → 151–**154**.                                                                                |
| 5             | 151        | practice-scenario | **Optional** full: keyframe (+ refs).                                                                                        |
| 6             | 152        | practice-scenario | **Optional** full: 3–5 s I2V.                                                                                                |
| 7             | 153        | practice-scenario | **Optional** full: VO arba bed + teisės.                                                                                     |
| 8             | **154**    | practice-scenario | **Optional** full: montažas 15–30 s + CPI pastaba.                                                                           |
| 9             | 158        | summary           | 5 blokų santrauka.                                                                                                           |

---

## Trumpos taisyklės

- **130 (action-intro) visada pirmas** – whyBenefit, hook, firstActionCTA.
- **13.12** – MUST pipeline prieš Vaizdai section-break.
- **13.15, 13.36, 13.56** – section-break (Vaizdai / Video / Garsas).
- **13.32, 13.52** – MUST consistency ir post-prod.
- **13.2–13.7, 13.101, 13.11** – content-block schema.
- **13.31 ir 13.51** – warm-up-quiz.
- **M15** – MUST: **150.5**. Optional full: 151→152→153→**154**. Completion = 150.5.

---

## Nuorodos

- **Turinio SOT:** [docs/turinio_pletra_moduliai_13_14_15.md](turinio_pletra_moduliai_13_14_15.md)
- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6
- **Santraukos skaidrės:** [docs/development/SUMMARY_SLIDE_SPEC.md](development/SUMMARY_SLIDE_SPEC.md)
