# Module identity visual regress — DS v0.2 E5.7

> **Data:** 2026-05-19  
> **Etapas:** E5 Module identity layer  
> **SOT:** [`DESIGN_SYSTEM_V0_2.md`](../DESIGN_SYSTEM_V0_2.md) §8

## Apimtis

6 moduliai (M1–M6) × 2 UI vietos:

1. **ModulesPage** — kortelės viršutinė juosta (`module.accent` → `bg-{accent}-500`)
2. **Action intro** — pirmoji `action-intro` skaidrė, `<Eyebrow>` su `identityIcon`

Papildomai (rankinė patikra): **section-break** `sectionNumber` badge — `moduleAccent` (hero lieka `heroColorKey`).

## Tikėtinos spalvos / ikonos

| Modulis | Top stripe    | Eyebrow accent | Identity icon  | Section-break badge (jei yra) |
| ------- | ------------- | -------------- | -------------- | ----------------------------- |
| M1      | brand         | brand          | BookOpen       | brand                         |
| M2      | slate         | slate          | ClipboardList  | slate                         |
| M3      | emerald       | emerald        | Briefcase      | emerald                       |
| M4      | violet        | violet         | Brain          | violet                        |
| M5      | cyan          | cyan           | ClipboardCheck | cyan                          |
| M6      | accent (gold) | accent         | Rocket         | accent                        |

## Screenshot checklist (12 + dark)

Įkelti į `docs/archive/development/analysis/screenshots/module-identity-2026-05/`:

| #   | Modulis | Vieta                | Light                  | Dark                  |
| --- | ------- | -------------------- | ---------------------- | --------------------- |
| 1   | M1      | ModulesPage kortelė  | `m1-modules-light.png` | `m1-modules-dark.png` |
| 2   | M2      | ModulesPage kortelė  | …                      | …                     |
| 3   | M3      | ModulesPage kortelė  | …                      | …                     |
| 4   | M4      | ModulesPage kortelė  | …                      | …                     |
| 5   | M5      | ModulesPage kortelė  | …                      | …                     |
| 6   | M6      | ModulesPage kortelė  | …                      | …                     |
| 7   | M1      | action-intro skaidrė | `m1-intro-light.png`   | `m1-intro-dark.png`   |
| 8   | M2      | action-intro         | …                      | …                     |
| 9   | M3      | action-intro         | …                      | …                     |
| 10  | M4      | action-intro         | …                      | …                     |
| 11  | M5      | action-intro         | …                      | …                     |
| 12  | M6      | action-intro         | …                      | …                     |

**Kaip fotografuoti:** `npm run dev` → Moduliai → kortelė; atidaryti modulį → pirmoji intro skaidrė. Perjungti light/dark (sistemos arba app tema).

## GOLDEN_STANDARD §2.2 / rule §5

- [ ] Vienoje skaidrėje max **2 semantinės** + **1 CTA** accent (section-break hero lieka pagal `heroColorKey`, badge — modulio accent)
- [ ] Intro: Eyebrow (modulio accent) + hero viduje brand gradient — ne trijų accent konfliktas viename bloke

## WCAG AA (kontrastas)

Rankinė patikra DevTools Contrast arba axe:

| Poros                                           | Light                                   | Dark                                         |
| ----------------------------------------------- | --------------------------------------- | -------------------------------------------- |
| Eyebrow `text-{accent}-700` ant puslapio fono   | AA normal text                          | `text-{accent}-300` ant `gray-900`           |
| Badge `text-{accent}-700` ant `bg-{accent}-100` | AA                                      | `text-{accent}-300` ant `bg-{accent}-900/40` |
| Top stripe `bg-{accent}-500`                    | dekoratyvus (nereikia teksto kontrasto) | tas pats                                     |

## Implementacijos nuorodos

- Data: `module.accent`, `module.identityIcon` — `src/data/modules.json` (M1–M6)
- UI: `ModulesPage.tsx`, `ActionIntroSlide.tsx`, `SectionBreakSlide` badge — `ContentSlides.tsx`
- Helpers: `src/utils/moduleIdentity.ts`

## Patikra po release (E7.4)

```bash
npm run audit:design-tokens   # TOTAL <= 480 (baseline DESIGN_TOKENS_BASELINE_2026-05.md)
```

**Statusas screenshot'ų:** Katalogas sukurtas (`screenshots/module-identity-2026-05/.gitkeep`). **Laukia rankinio įkėlimo** 12 PNG + 8 PNG (`DESIGN_SYSTEM_V0_2_VISUAL_DIFF/`) prieš release gate.
