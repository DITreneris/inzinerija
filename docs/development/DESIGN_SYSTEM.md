# Design System — Promptų anatomija

> **Versija:** 0.2.0 (2026-05-19)  
> **Tipografija, spalvos, skaidrių išdėstymas:** [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) — **nepakartoti** čia.  
> **Plėtros planas:** [`DESIGN_SYSTEM_V0_2.md`](DESIGN_SYSTEM_V0_2.md)  
> **UI katalogas (kodas):** [`src/components/ui/README.md`](../../src/components/ui/README.md)

---

## 1. Tipografija ir spalvos

_TBD v0.3 — žr. [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) §1–§2 (šriftai, paletė, blockVariant)._

---

## 2. Tokenai ir auditas

Canonical sluoksniai:

- `tailwind.config.js` — product UI spalvos, šriftai, animacijos ir safelist.
- `src/design-tokens.ts` — spacing, radius, 44px touch target, focus ring, sticky stacking, z-index ir **`surfaceGlass`** (`shell` / `panel` / `overlay`) class helperiai.
- `src/components/slides/shared/diagramTokens.ts` — SVG diagramų paletė, tipografija, stroke/radius/arrow reikšmės ir `getDiagramPalette()` / `getDiagramToneColors()` dark/light parinkimas.

Baseline: [`analysis/DESIGN_TOKENS_BASELINE_2026-07.md`](../archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-07.md). Vykdymo tikslas: [`analysis/DESIGN_SYSTEM_REVISION_2026-07.md`](../archive/development/analysis/DESIGN_SYSTEM_REVISION_2026-07.md).

```bash
npm run audit:design-tokens
npm run audit:design-tokens:gate   # exit 1 jei regresija vs 2026-07 baseline
npm run audit:module-identity      # M1–15 accent + identityIcon
```

Auditas yra warn-only (be `:gate`). Jis skaičiuoja hex, inline style, SVG fill/stroke ir Tailwind arbitrary styling (`bg-[#...]`, `border-[#...]`, `shadow-[...]`).

2026-07 leftovers pass trend: `ContentSlides.tsx` arbitrary-class cleanup ir primitive pilotai sumažino auditą nuo `539` iki `521` radinio (`80 → 66` arbitrary class; `13 → 12` inline style). **DS hardening (2026-07-08):** `<Banner>` ≥35 production naudojimų, `<CTAButton>` ≥30, `SlideWorkspace` M1/M4/M7/M10/M13, `surfaceGlass.shell` sticky sluoksniuose. **DS Next Waves W7–W10:** auditas sumažintas iki `417` radinių (`59` arbitrary class), o `audit:release-preflight` vykdo `audit:design-tokens:gate` + `audit:module-identity`.

---

## 3. Primitivai (v0.2 — pilna)

Canonical JSX komponentai: `src/components/ui/`. Dublikatų žemėlapis: [`analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md`](../archive/development/analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md).

| Komponentas                       | Paskirtis                                       | Pastaba                                    |
| --------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| `Card`                            | Kortelės fonas / rėmelis                        | `@deprecated` `.card` CSS — migracija v0.3 |
| `CTAButton`                       | Primary / secondary / accent mygtukai           | Naudoja `.btn-*` kaip backend              |
| `Banner`                          | Callout (`info`, `success`, `warning`, `terms`) |                                            |
| `Table`                           | Lentelės subkomponentai                         |                                            |
| `LoadingSpinner`                  | Krautuvas                                       |                                            |
| `ErrorBoundary`                   | Klaidų riba                                     |                                            |
| **Eyebrow** (E4)                  | Maža uppercase antraštė, 6 accent               | Proof: ModulesPage, ActionIntroSlide       |
| **IconChip** (E4)                 | Apvali piktograma, 5 role, 3 size               | Proof: ModuleCompleteScreen                |
| **SectionDivider** (E4)           | Skiriamoji linija su/be label                   | Proof: SummarySlide                        |
| **BrandMark** (v0.3.1)            | Ženklas (`Zap` + gold ant `brand-900`)          | nav / hero / footer; § 4a                  |
| **SlideWorkspace** (DS hardening) | Vieningas `content-block` vertikalus tarpas     | Pilotas M4 + M10 per `SlideContent.tsx`    |

Detalus API: [`src/components/ui/README.md`](../../src/components/ui/README.md).

---

## 4. Modulio identitetas (v0.2 — pilna)

**Duomenys (M1–M6):** `module.accent`, `module.identityIcon`, `module.icon` — `src/data/modules.json`. **DS v0.3.1:** `module.icon` = `module.identityIcon` (unikali ModulesPage kortelės ikona); modulio **lygis** (`learn` / `test` / `practice`) diferencijuojamas per gradientą ir Eyebrow badge, ne per `icon`.

| Modulis | `accent`  | `identityIcon` / `icon` |
| ------- | --------- | ----------------------- |
| M1      | `brand`   | `BookOpen`              |
| M2      | `slate`   | `ClipboardList`         |
| M3      | `emerald` | `Briefcase`             |
| M4      | `violet`  | `Brain`                 |
| M5      | `cyan`    | `ClipboardCheck`        |
| M6      | `accent`  | `Rocket`                |
| M7      | `sky`     | `BarChart3`             |
| M8      | `sky`     | `ClipboardCheck`        |
| M9      | `sky`     | `Rocket`                |
| M10     | `fuchsia` | `Cpu`                   |
| M11     | `fuchsia` | `ClipboardCheck`        |
| M12     | `fuchsia` | `Rocket`                |
| M13     | `rose`    | `Image`                 |
| M14     | `rose`    | `ClipboardCheck`        |
| M15     | `rose`    | `Rocket`                |

**3 UI vietos (v0.2 + v0.3.1):**

1. **ModulesPage** — kortelės viršutinė juosta (`accentTopBarClasses`) + didelė ikona (`resolveModuleIcon(module.icon)`)
2. **ActionIntroSlide** — `<Eyebrow>` virš hero
3. **SectionBreakSlide** — tik `sectionNumber` badge (`sectionBreakBadgeByAccent`); hero lieka `heroColorKey`

Helpers: `src/utils/moduleIdentity.ts`. Vizualinė patikra: [`analysis/MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md`](../archive/development/analysis/MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md).

---

## 4a. Brand mark (v0.3.1)

Vienas ženklo komponentas — [`src/components/ui/BrandMark.tsx`](../../src/components/ui/BrandMark.tsx). Glifas: Lucide `Zap` (gold) ant `brand-900` badge; atitinka hub favicon. Iki v0.3.1 nav/hero naudojo `Zap`, footer — `Sparkles` + gradientą (nenuoseklu); nuo v0.3.1 visos trys vietos naudoja `BrandMark`.

| Variantas   | Vieta           | Badge / glifas (nekeičiamas dydis)     |
| ----------- | --------------- | -------------------------------------- |
| `nav`       | `AppNav`        | `rounded-xl p-2.5` / `w-5`             |
| `hero`      | `HomePage` hero | `rounded-3xl p-6` / `w-16` (+ animate) |
| `footer`    | `App` footer    | `rounded-lg p-1.5` / `w-3.5`           |
| `icon-only` | bendras         | `rounded-lg p-1.5` / `w-5`             |

Konstantos: [`src/constants/brand.ts`](../../src/constants/brand.ts) (`BRAND`, `brandName`). Spec: [`BRAND_MARK_SPEC.md`](BRAND_MARK_SPEC.md). Phase 2 (`packages/brand`) extract kontraktas: [`PACKAGES_BRAND_CONTRACT.md`](PACKAGES_BRAND_CONTRACT.md). A11y: be `aria-label` — dekoratyvus (`aria-hidden`); su `aria-label` — `role="img"`. `ActionIntroSlide` CTA `Zap` (veiksmo semantika) **lieka** atskirai.

---

## 4b. Icons (v0.3 — slide JSON + Lucide)

**SOT:** [`src/icons/types.ts`](../../src/icons/types.ts) (allowlist pagal kontekstą), [`src/icons/registry.ts`](../../src/icons/registry.ts) (named Lucide imports), [`src/icons/resolveIcon.ts`](../../src/icons/resolveIcon.ts) (resolver).

| Konvencija     | Kur                                                           | Pavyzdys                         |
| -------------- | ------------------------------------------------------------- | -------------------------------- |
| PascalCase     | slide JSON (`journeyChoices`, `cards`, `sections`, `aspects`) | `Target`, `Workflow`, `Repeat`   |
| kebab-case     | news-portal `iconKey`                                         | `trending-up`, `building-2`      |
| emoji (legacy) | `insights[].emoji` tik                                        | ne `icon` lauke — naudoti Lucide |

**Semantika:** `Workflow` = proceso/srauto glifas; `Repeat` = iteracijos ciklas — **atskiri raktai**, ne sinonimai.

**Fallback:** nežinomas Lucide raktas → `HelpCircle` (ne raw tekstas). Dev: `console.warn` per `resolveIcon`.

**Dydžiai:** [`src/icons/iconSizes.ts`](../../src/icons/iconSizes.ts) — `sm`/`md`/`lg`; `IconChip` ir slide kortelės naudoja tą patį SOT.

**CI:** `npm run audit:slide-icons` — tikrina `modules.json` icon raktus pagal slide tipą. Release: `audit:release-preflight`.

**UI helper:** [`SlideLucideIcon`](../../src/icons/SlideLucideIcon.tsx) infographics / paradox / pipeline.

---

## 5. Skaidrių tipai ir layout

_TBD v0.3 — žr. `GOLDEN_STANDARD.md` §3–§4, `docs/SKAIDRIU_TIPU_ANALIZE.md`._

---

## 6. Diagramos ir schemos

Canonical interaktyvių diagramų kelias: `DIAGRAM_KIT_STANDARD.md`.

- Klaviatūros kelias: HTML `DiagramStepNav`.
- SVG hit zones: `DiagramStepHitArea` tik pointer sąveikai, be `role="button"` ir be `tabIndex`.
- Dark mode: `diagramTokens.ts` `getDiagramPalette()` / `getDiagramToneColors()` arba SVG `dark:` klasės fonui, rėmui, flow linijoms ir tekstui.
- Wrapper: `InteractiveDiagramShell` su status badge, step nav ir explanation bloku.

`RlProcessBlock` yra pirmas legacy pilotas šiame 2026-07 remonte: shell perkelta į `InteractiveDiagramShell`, SVG keyboard path pašalintas, dark SVG fonas saugomas testu.

2026-07 leftovers pass:

- `DiPrezentacijosWorkflowDiagram`, `TurinioWorkflowDiagram`, `AgentWorkflowDiagram` ir `CustomGptProcessDiagram` SVG hit zonos perkeltos į pointer-only `DiagramStepHitArea`; keyboard kelias lieka HTML `nav button`.
- Sudėtingi spatial/mode komponentai (`WorkflowComparisonDiagram`, `ContextEngineeringPipelineDiagram`) kol kas dokumentuoti kaip atskiro review kandidatai.
- `LlmArch` refaktorius laikomas atskiru B3 tracku: [`LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md`](LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md).
- M10+ vizualinė kokybė sekama atskiru backlog: [`analysis/M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md`](../archive/development/analysis/M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md).

---

## 7. Deprecations ir migracija

| Legacy                                            | Canonical              | Statusas v0.2                       |
| ------------------------------------------------- | ---------------------- | ----------------------------------- |
| `.btn-primary` / `.btn-secondary` / `.btn-accent` | `<CTAButton />`        | CSS lieka; `@deprecated` komentaras |
| `.card` / `.card-hover`                           | `<Card />`             | CSS lieka; migracija v0.3           |
| `.badge-*`                                        | Badge primitive (v0.3) | CSS lieka                           |

---

## 8. Kokybės vartai

```bash
npm run lint && npm run typecheck && npm run test:run && npm run build
npm run validate:schema
npm run audit:design-tokens   # warn-only, lyginti su 2026-07 baseline
npm run audit:design-tokens:gate
npm run audit:module-identity
node scripts/audit-footer-length.mjs
```

Release: [`RELEASE_QA_CHECKLIST.md`](RELEASE_QA_CHECKLIST.md) (§8 design tokens).

---

## 9. Changelog ir versijos

- **v0.2.0** — `CHANGELOG.md` § [v0.2.0]
- **v0.1** — GOLDEN_STANDARD, pradiniai `Card` / `CTAButton` / `Banner`

---

## 10. Nuorodos

| Dokumentas             | Kelias                                              |
| ---------------------- | --------------------------------------------------- |
| SOT v0.2 planas        | `DESIGN_SYSTEM_V0_2.md`                             |
| Vykdymo planas         | `DESIGN_SYSTEM_V0_2_EXECUTION_PLAN.md`              |
| Vizualinis diff (E7)   | `analysis/DESIGN_SYSTEM_V0_2_VISUAL_DIFF/README.md` |
| Microcopy backlog (E6) | `analysis/MICROCOPY_LENGTHS_2026-05.md`             |
