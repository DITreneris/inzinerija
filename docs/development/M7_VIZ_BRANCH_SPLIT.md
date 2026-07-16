# M7 viz šakų split (M79-40)

> **Epic:** M79-40 (RC-2)  
> **SOT:** `src/data/modules.json` (M7 skaidrės 70, 861, 99.9, 100–104, 106)  
> **Statusas:** įgyvendinta LT+EN 2026-07-16 (LT `modules.json` pathBranch + sk. 70 `branchIds`; EN overlay jau turėjo `viz-sales`/`viz-mkt`)

---

## Problema

`pardavimai` ir `rinkodara` dalinosi tą pačią `viz` šaką — 7 skaidrės su pardavimų semantika buvo rodomos ir rinkodaros keliui.

## Sprendimas

| Senas ID | Naujas ID   | Paskirtis                                               |
| -------- | ----------- | ------------------------------------------------------- |
| `viz`    | `viz-sales` | Pardavimų vizualizacija (executive dashboard, KPI)      |
| `viz`    | `viz-mkt`   | Rinkodaros vizualizacija (kanalai, turinys, kampanijos) |

## Skaidrės 70 `branchIds`

| `journeyId`  | `branchIds`                 |
| ------------ | --------------------------- |
| `pardavimai` | `["viz-sales"]`             |
| `rinkodara`  | `["viz-mkt"]`               |
| kiti         | be viz šakų (kaip anksčiau) |

## `pathBranch` žemėlapis

| Skaidrė | `pathBranch`           | Pastaba                                      |
| ------- | ---------------------- | -------------------------------------------- |
| 861     | `viz-sales`, `viz-mkt` | Bendri paprasti viz promptai                 |
| 99.9    | `viz-sales`, `viz-mkt` | Section-break įžanga                         |
| 101     | `viz-sales`, `viz-mkt` | Vizualinio grupavimo principai               |
| 106     | `viz-sales`, `viz-mkt` | DI pagalba + super promptas                  |
| **100** | `viz-mkt`              | Tik rinkodara — data storytelling ciklas     |
| **103** | `viz-mkt`              | Tik rinkodara — sustiprinti viz promptai     |
| **104** | `viz-sales`            | Tik pardavimai — executive dashboard modelis |

## Invariantai (nekeisti)

- M8 `relatedSlideId` taikiniai (73, 74, 86, 92, 731, 732, 733, 891) **negali** turėti `pathBranch`.
- Branduolio skaidrės be `pathBranch` — matomos visiems keliams.
- Navigacija: `useSlideNavigation.isSlideHiddenForNav` — šaka matoma, kai `activeBranchIds` ∩ `pathBranch` ≠ ∅.

## EN sinchronizacija

- `modules-en-m7-m9.json` sk. 70: `viz-sales` / `viz-mkt` + atnaujintas `heroSubText` / `confirmMessage`.
- Viz skaidrių subtitle EN atitinka LT semantiką (sales vs marketing path).

## QA

```bash
npm run audit:m7-pathbranch
npm run audit:m7-journey-indices
npm run validate:schema
```

`audit:m7-pathbranch` taip pat tikrina, kad `pathBranch` tokenai sutampa su sk. 70 `branchIds` (nėra orphan `viz` vs `viz-sales`/`viz-mkt`).
