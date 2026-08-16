# Sertifikatų turinio SOT

> **Runtime / redagavimo tiesa:** [`src/data/certificateContent.json`](../../src/data/certificateContent.json) (LT) ir [`src/data/certificateContent-en.json`](../../src/data/certificateContent-en.json) (EN, tiesioginis — ne `build-en-*`).  
> Šis failas – trumpas indeksas agentams (GOLDEN §3.7). Tekstų keitimai – per JSON; po to – PDF smoke (RELEASE_QA).

## Veidas vs eligibility

PDF veidas (opcija B): oficialus kelio vardas + **viena** kompetencijos eilutė.

Ant veido **nėra** modulių numerių, _≥ 70 %_, baigiamojo / finalinio projekto. Tie kriterijai lieka `certificateEligibility.ts` ir unlock kortelėse (`lt.json` / `en.json`).

| Laukas           | Veide    | Prasmė                                                       |
| ---------------- | -------- | ------------------------------------------------------------ |
| `completionLine` | Taip     | _sėkmingai baigė_ + kelio vardas (LT galininkas). ≤ 70 simb. |
| `programName`    | Taip     | Kompetencija (_Išmoko…_). ≤ 55 simb.                         |
| `label`          | Ne (PDF) | Nominatyvas katalogui                                        |
| `footerText`     | Taip     | Bendras issuer, be „promptų struktūros mokymas“              |

## Bendri root laukai

| Laukas                       | Paskirtis                        |
| ---------------------------- | -------------------------------- |
| `programTitle`               | Programos pavadinimas PDF        |
| `websiteUrl` / `websiteCta`  | Privaloma nuoroda po sertifikato |
| `authorBy` / `authorProduct` | Autorius / produktas             |
| `serialLabel`                | Sertifikato Nr. etiketė          |

## Tier lentelė (1–5)

| Tier | `label` (santrauka)         | Kada (produkto logika)                         |
| ---- | --------------------------- | ---------------------------------------------- |
| 1    | 6 blokų sistema             | Po M1–3 (MVP kelias)                           |
| 2    | Konteksto inžinerija / M4–6 | Po ≥6 modulių + branduolio pasitikrinimas ≥70% |
| 3    | Duomenų analizės kelias     | Po M7–9 + M8 ≥70%                              |
| 4    | Agentų kelias               | Po M10–12 + M11 ≥70%                           |
| 5    | Turinio inžinerijos kelias  | Po M13–15 + M14 ≥70%                           |

Tikslūs `introLine` / `completionLine` / `programName` / `footerText` – **tik** `certificateContent.json` / `-en.json`.

## Related

- GOLDEN_STANDARD §3.7
- `src/utils/certificateEligibility.ts` / ModuleCompleteScreen
- Practice closer’iai: [`PRACTICE_CLOSER_PLAN.md`](PRACTICE_CLOSER_PLAN.md)
