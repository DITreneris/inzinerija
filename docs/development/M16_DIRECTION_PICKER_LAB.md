# M16 Direction Picker Lab (`lab:m16_direction_picker`)

> Feature Doc Contract (§1b). Pattern: **`interactive-control-lab`**. Shell: **Ne**.  
> elementId: `lab:m16_direction_picker`.  
> Slides: M16 / **16.14–16.15** (po A/B/C lentelės → score → pick).  
> Ticket: `TE-M1618-S1`. Status: **implemented** (2026-08-01).

## Paskirtis

Po trijų krypčių lentelės (16.14) ir 1–5 score (16.15) – ChoiceControl lab: pasirink A/B/C (null iki pick), parodyk score mirror + vieną „kodėl patikrinamiausia“ copyable artefaktą. Brand-only (kaip 10.45 / 13.325) – **ne** risk strip. v1 lentelės lieka; lab **nekeičia** curriculum eilės.

## Pattern / Shell

| Laukas      | Reikšmė                        |
| ----------- | ------------------------------ |
| Pattern     | `interactive-control-lab`      |
| Shell       | **Ne**                         |
| Render      | `M16DirectionPickerLabBlock`   |
| Image key   | `m16_direction_picker`         |
| Slide ID    | **16.15**                      |
| Content SOT | `m16DirectionPickerContent.ts` |

## UI (planned)

1. Trumpai – rinkis patikrinamiausią, ne gražiausią
2. Lab: ChoiceControl ×3 (A/B/C); null iki pick; po pick – score strip + Copy artefaktas
3. Patikra – ar nugalėtojas patikrinamas per dieną?

## DoD

- [x] Feature Doc (šis failas)
- [x] TE overlay `lab:m16_direction_picker` + `DIAGRAMU_M16_M18_REGISTRY` Should row
- [x] CONTENT LT/EN + DATA (ne core)
- [x] CODING `M16DirectionPickerLabBlock` + `diagramRenderers`
- [x] UI_UX brand-only; `audit:teaching-elements --strict`

## WON’T

- ChoiceControl prieš Must lenteles/schemas (užblokuota – Must dabar ✅)
- Naujas SlideType vietoj lab Pattern
- Soft-preselect = auto-confirm

## Susiję

- Etalonas: `M10DepthRolesLabBlock` / `M13ConsistencyLockLabBlock`
- Lentelės v1: 16.14 / 16.15 (`TE-M1618-M1`)
- Maturity: [`M16_M18_PROMPT_MATURITY.md`](M16_M18_PROMPT_MATURITY.md)
