# M7–M9 patch skriptų registras

> **Tikslas:** Vienas sąrašas idempotentinių M79 patch skriptų, paleidimo tvarka ir EN overlay taisyklės.
> **Operacinis SOT:** iteraciniai UX polish pakeitimai fiksuojami čia + [`TEST_REPORT.md`](TEST_REPORT.md) + [`CHANGELOG.md`](../../CHANGELOG.md).
> **Atnaujinta:** 2026-07-15

---

## 1. Skriptų lentelė

| Skriptas                       | Paskirtis                                                     | Kada paleisti             | Priklausomybės          |
| ------------------------------ | ------------------------------------------------------------- | ------------------------- | ----------------------- |
| `patch-m79-iterations.mjs`     | Ankstyvos M79 iteracijos (cross-ref, footer, kelio žemėlapis) | Vienkartinis / legacy     | `modules.json`          |
| `patch-m79-en-overlay.mjs`     | EN overlay bazinis sync                                       | Po didelių LT pakeitimų   | `modules-en-m7-m9.json` |
| `patch-m79-patikra-batch2.mjs` | M7 Patikra de-boilerplate (batch 2)                           | Vienkartinis              | `modules.json`          |
| `patch-m79-phase2.mjs`         | Phase 2 LT (78.5, 93.1/93.2, footer B, macro)                 | Vienkartinis              | `modules.json`          |
| `patch-m79-phase2-en.mjs`      | Phase 2 EN overlay                                            | Po `patch-m79-phase2.mjs` | `modules-en-m7-m9.json` |
| `patch-m79-phase2-audit.mjs`   | Phase 2 audit batch (M8/M9/M7 targeted)                       | Po phase2                 | Abu JSON                |
| `patch-m79-ux-polish.mjs`      | Top 5 UX polish LT (93, 94, 76, 89/73, 99/90)                 | Vienkartinis              | `modules.json`          |
| `patch-m79-ux-polish-en.mjs`   | Top 5 EN overlay                                              | Po ux-polish LT           | `modules-en-m7-m9.json` |
| `patch-m79-p2-polish.mjs`      | P2 polish LT (etika, filtrai, M9, optional, sk. 74)           | Vienkartinis              | `modules.json`          |
| `patch-m79-p2-polish-en.mjs`   | P2 polish EN overlay                                          | Po p2-polish LT           | `modules-en-m7-m9.json` |

**Paleidimo tvarka (jei reikia iš naujo):** LT patch → `npm run validate:schema` → EN patch → `npm run audit:m79` → `npm run generate:core-data` (jei M1–9 core).

```bash
node scripts/patch-m79-p2-polish.mjs
node scripts/patch-m79-p2-polish-en.mjs
npm run validate:schema
npm run generate:core-data
npm run audit:m79
```

---

## 2. EN overlay deep-merge taisyklė (kritinė)

`modulesLoader` merge'ina EN overlay **pagal sekcijų indeksą** (`deepMerge` by index).

| Veiksmas                                       | Rezultatas                                                    |
| ---------------------------------------------- | ------------------------------------------------------------- |
| Partial EN `body` / `copyable` viename indekse | LT lieka likusiuose laukuose → `audit:m79` LT diacritics FAIL |
| Pilnas `sections[]` masyvas pakeistai skaidrei | Saugu – indeksai sutampa                                      |

**Taisyklė:** keitus `content.sections` EN overlay – **perrašyti visą `sections` masyvą** toje skaidrėje, ne tik vieną lauką.

**Pavyzdys:** [`scripts/patch-m79-p2-polish-en.mjs`](../../scripts/patch-m79-p2-polish-en.mjs) – pilni section veidrodžiai sk. 77.5, 101 (M7), etika, filtrai.

---

## 3. Susiję UI pattern'ai (ne patch, bet registry)

| Pattern                            | Komponentas / laukas                                     | Skaidrės (pavyzdžiai)            |
| ---------------------------------- | -------------------------------------------------------- | -------------------------------- |
| `toolChoiceBar` + `linkedRowIndex` | `ContentSlides.tsx`                                      | M7: 734, 731, 733, 77; Top 5: 76 |
| `M9WorkflowStepCopyBlock`          | `diagramRenderers.tsx`                                   | M9 sk. 94                        |
| Bar be `table`                     | `ContentSlides` – bar render be `presentationToolsBlock` | 734, 731, 733, 77                |

Žr. [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) §3.8.1, [`LENTELIU_STANDARTAS.md`](LENTELIU_STANDARTAS.md).

---

## 4. Vartai po patch

| Vartas         | Komanda                      |
| -------------- | ---------------------------- |
| Schema         | `npm run validate:schema`    |
| M7–M9 EN/LT    | `npm run audit:m79`          |
| Core profiliai | `npm run generate:core-data` |
| Testai         | `npm run test:run`           |

---

## 5. Nuorodos

- Backlog DoD: [`07_08_09_backlog.md`](07_08_09_backlog.md) §11 (Phase 2), §12 (P2 polish)
- Priežiūra: [`DOCS_MAINTENANCE.md`](DOCS_MAINTENANCE.md)
- DATA gairės: [`DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`](DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md) §3.1 M7–M9 EN
