# M9 Practice Quest Intro (`practice-quest-intro`)

> Feature Doc Contract (§1b). Pattern: `interactive-control-lab`. Shell: **Ne**.  
> elementId: `slide-type:practice-quest-intro`. Slide: M9 / 90.  
> Atnaujinta: 2026-07-26.

## Paskirtis

Pirmasis Modulio 9 viewport – **analitinio rinkinio stalas**, ne briefing siena. Mokytojas:

1. Pasirenka / patvirtina sritį (6 journey id, kaip M7).
2. Mato 5-step quest map.
3. Vienu CTA eina į pirmą MUST praktiką (šaltinių katalogas).

## Pattern / Shell

| Laukas         | Reikšmė                                            |
| -------------- | -------------------------------------------------- |
| Pattern        | `interactive-control-lab`                          |
| Shell          | **Ne** (nėra SVG InteractiveDiagramShell)          |
| Render         | `PracticeQuestIntroSlide`                          |
| ChoiceControl  | brand-only; `value: null` kol nepatvirtinta        |
| Soft-preselect | `moduleJourneyFocus[7]` hint – **ne** auto-confirm |

## DoD

- [x] Confirm prieš primary CTA.
- [x] Soft highlight iš M7 + privalomas patvirtinimas → `moduleJourneyFocus[9]`.
- [x] Quest map 5 mazgai: Start → Katalogas → CSV → 8 žingsniai → Rinkinys.
- [x] Hub / veikėjai **ne** first viewport; hub = **12** (4×3), ne 16.
- [x] Kit checklist ant 92: katalogas + CSV + suvestinė + patikros taisyklė.
- [x] Overlay + TE registry + GOLDEN §3.1b / §3.4e consumer.
- [x] Runtime JSON + tests (I3–I4); soft-preselect `value=null` kol nepatvirtinta; quest map current/done.
- [x] Practice 93.1/93.2 paste templates inherit journey via `applyM9PracticeTemplate` (theme + `[STULPELIAI]`/`[COLUMNS]`).
- [x] Hub CharacterCard = text-first until `public/characters/veikejas-*.png` exist (`onError` fallback).

## Susiję

- Curriculum: `docs/MODULIO_9_SKAIDRIU_EILES.md`
- SOT: `docs/turinio_pletra_moduliai_7_8_9.md` §10.3
- Journey slotai: `src/data/modules-journey-m9.json`
- Satellite: `docs/development/DIAGRAMU_M7_M12_REGISTRY.md`
