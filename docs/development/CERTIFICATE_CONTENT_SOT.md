# Sertifikatų turinio SOT

> **Runtime / redagavimo tiesa:** [`src/data/certificateContent.json`](../../src/data/certificateContent.json).  
> Šis failas – trumpas indeksas agentams (GOLDEN §3.7). Tekstų keitimai – per JSON; po to – PDF smoke (RELEASE_QA).

## Bendri root laukai

| Laukas                       | Paskirtis                        |
| ---------------------------- | -------------------------------- |
| `programTitle`               | Programos pavadinimas PDF        |
| `websiteUrl` / `websiteCta`  | Privaloma nuoroda po sertifikato |
| `authorBy` / `authorProduct` | Autorius / produktas             |
| `serialLabel`                | Sertifikato Nr. etiketė          |

## Tier lentelė (1–5)

| Tier | `label` (santrauka)         | Kada (produkto logika)          |
| ---- | --------------------------- | ------------------------------- |
| 1    | 6 blokų sistema             | Po M1–3 (MVP kelias)            |
| 2    | Konteksto inžinerija / M4–6 | Po ≥6 modulių + final quiz ≥70% |
| 3    | Duomenų analizės kelias     | Po M7–9 + M8 ≥70%               |
| 4    | Agentų kelias               | Po M10–12 + M11 ≥70%            |
| 5    | Turinio inžinerijos kelias  | Po M13–15 + M14 ≥70%            |

Tikslūs `introLine` / `completionLine` / `programName` / `footerText` – **tik** `certificateContent.json`.

## Related

- GOLDEN_STANDARD §3.7
- `src/utils/certificateEligibility.ts` (jei egzistuoja) / ModuleCompleteScreen
- Practice closer’iai: [`PRACTICE_CLOSER_PLAN.md`](PRACTICE_CLOSER_PLAN.md)
