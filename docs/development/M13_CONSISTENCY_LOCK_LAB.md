# M13 Consistency Drift Lab (`m13_consistency_lab`)

> Feature Doc Contract (§1b). Pattern: **`interactive-control-lab`**. Shell: **Ne**.  
> elementId: `lab:m13_consistency_lab`.  
> Slide: M13 / **13.325** (po 13.32, prieš 13.33).  
> Atnaujinta: 2026-08-19 (SYS-G workshop feel: thumbs + image Before/After + sample Stage + plain LT).

## Paskirtis

Po Character / product consistency (13.32) – praktikos įrankis: **ref sheet checklist** + **drift diagnosis** → vienas Copy artefaktas (fix + lock taisyklė, arba fresh generate kai briefas keičiasi). Brand-only (kaip 10.45) – **ne** 10.26 risk strip. Etalonas kontrasto panelės: M7/67 (Simptomas | Fix).

## Pattern / Shell

| Laukas      | Reikšmė                       |
| ----------- | ----------------------------- |
| Pattern     | `interactive-control-lab`     |
| Shell       | **Ne**                        |
| Render      | `M13ConsistencyLockLabBlock`  |
| Image key   | `m13_consistency_lab`         |
| Slide ID    | **13.325**                    |
| Content SOT | `m13ConsistencyLabContent.ts` |

## UI

1. Trumpai (content-block) – refs + drift vs fresh brief
2. Lab surface:
   - Serija **Ąžuolo puodelis / Oak Mug** – 4 fixture thumbs ant checkbox eilučių (priekis / ¾ / detalė / šviesa); statusas `Turi N/4`
   - Status mirror: pavyzdžių skaičius + aktyvus režimas
   - Prieš/Po = **poros vaizdai** (slinktis vs užraktas), ne tik tekstas
   - ChoiceControl ×5 (4 slinktys + užduoties aprašas→naujas); null iki pick; `columns={2}`
   - Po pick: **Simptomas | Taisymas** kontrastas (`driftSignal` / `fixCue`)
   - First-screen **pavyzdinis Stage** (read-only) iki režimo; `CopyButton` tik po pasirinkimo; jei `N < 3` – eilutė „Trūksta: …“
   - First-screen LT be `reference` / `Drift` / `Ref lock` / `Fix` / `brief` (EN gloss antras)
3. Patikra (content-block)

## Artefaktai

| Kelias          | Klasė (M13P)              | Turinys                                                     |
| --------------- | ------------------------- | ----------------------------------------------------------- |
| Drift (4 tipai) | Lab + Stage lock skeleton | Fix cue + reference lock taisyklė + optional trūkstami refs |
| Fresh (brief)   | Lab fixture               | Be lock – naujas look šablonas                              |

## DoD

- [x] Feature Doc + TE overlay + `DIAGRAMU_M13_M15_REGISTRY`
- [x] Curriculum eilė `MODULIO_13_SKAIDRIU_EILES.md`
- [x] `modules.json` + EN + footers §3.6 (13.32 be dublikatinio copyable)
- [x] `diagramRenderers` + unit smoke (checklist, drift, fresh, missing refs)
- [x] `audit:teaching-elements --strict`
- [x] SYS-G 2026-08-19: fixture thumbs + image Before/After + sample artefact + plain LT (tas pats `elementId`)

## Susiję

- Sibling Shell: `m13_consistency_lock` (13.32) – procesinė schema; Copy tik lab’e (GOLDEN §3.1c)
- Etalonas UI: `M10DepthRolesLabBlock` (brand-only); kontrastas – `ManipulationContrastToolSurface` (M7/67)
- Maturity: `M13_PROMPT_MATURITY.md`
- Intake: `docs/development/intake/M13_M15_JOURNEY_UX_INTAKE_2026-07.md`
