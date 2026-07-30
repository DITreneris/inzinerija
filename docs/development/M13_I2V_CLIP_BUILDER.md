# M13 I2V Clip Builder (`i2v-generatorius`)

> Feature Doc Contract (§1b). Pattern: **special** (slide-type mirror of `vaizdo-generatorius`). Shell: **Ne**.  
> elementId: `slide-type:i2v-generatorius`. Slide: M13 / **13.47**.  
> Atnaujinta: 2026-07-28.

## Paskirtis

Po scenarijaus (13.4), prieš video įrankių matricą (13.5) – in-app **image→video** promptų generatorius: keyframe / scena → 3–5 s → kameros judesys → same style/product → copy + open.

## Pattern / Shell

| Laukas    | Reikšmė                                     |
| --------- | ------------------------------------------- |
| Pattern   | `special` (overlay `pattern`: `slide-type`) |
| Shell     | **Ne**                                      |
| Render    | `I2vGeneratoriusSlide`                      |
| Slide ID  | **13.47**                                   |
| Type JSON | `i2v-generatorius`                          |

## Laukai

1. Keyframe / scena (required text)
2. Trukmė: 3 | 4 | 5 s
3. Kameros judesys (select)
4. Same style / same product (checkboxes → prompt frazės)
5. Output prompt + copy + video tools grid
6. Mini readiness: keyframe filled + duration ≤5 → Ready (N/4)

## DoD

- [x] Feature Doc + TE overlay eilutė
- [x] Curriculum eilė po 13.4, prieš 13.5
- [x] SOT §4 poskyris
- [x] `modules.json` + EN + schema
- [x] `I2vGeneratoriusSlide` + SlideContent + vite alias
- [x] Copy+open (gesture: open first, then copy)
- [x] `audit:teaching-elements --strict` + footer numbers

## Susiję

- Curriculum: `docs/MODULIO_13_SKAIDRIU_EILES.md`
- SOT: `docs/turinio_pletra_moduliai_13_14_15.md` §4
- Intake: `docs/development/intake/M13_GEN_METER_I2V_INTAKE_2026-07.md`
- Sibling still tool: 13.37 `vaizdo-generatorius`
- Satellite: `docs/development/DIAGRAMU_M13_M15_REGISTRY.md`
