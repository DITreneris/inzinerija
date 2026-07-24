# Design System — Promptų anatomija

> **Produktinė DS versija:** **0.2.0 shipped** (2026-05-19) + **0.3.1 dalys** (BrandMark, icon registry, SlideWorkspace, surfaceGlass).  
> **Paskutinis sync:** 2026-07-20 (DS max-ROI compliance).  
> **Turinio / layout etalonas (nelaužomas):** [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) **2.3.9** — tipografija, paletė, `blockVariant`, skaidrių schemos. **Nekartoti** čia.  
> **UI katalogas (kodas):** [`src/components/ui/README.md`](../../src/components/ui/README.md)  
> **v0.2 vykdymo planas (archyvas, ✅ baigtas):** [`DESIGN_SYSTEM_V0_2.md`](DESIGN_SYSTEM_V0_2.md) — ne naujiems darbams; istorinis E1–E7.

---

## 0. Kas yra „tiesa“ (sluoksniai)

| Sluoksnis             | Dokumentas / kodas                                                      | Paskirtis                                                                        |
| --------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Produktinė DS**     | šis failas + `src/components/ui/` + `src/design-tokens.ts`              | Primitivai, token helperiai, modulio identitetas, brand mark, ikonos, CI auditai |
| **GOLDEN (etalonas)** | `GOLDEN_STANDARD.md` 2.3.9                                              | Šriftai, spalvos, blockVariant, content-block schema, footeriai, sticky, a11y    |
| **Diagramos**         | `DIAGRAM_KIT_STANDARD.md` + `diagramTokens.ts` + `diagramLayoutMath.ts` | InteractiveDiagramShell, LMS token floors, hit zones, dark palette               |
| **Turinys**           | `modules.json` (+ EN overlays)                                          | `blockVariant`, accent biudžetas — ne React                                      |

**Nėra atskiros „DS 1.0“ paletės.** Naujas vizualinis darbas = GOLDEN + šio dokumento primitivai. Redesign / nauja paletė = out of scope (v0.3+ backlog).

---

## 1. Tipografija ir spalvos

**SOT:** [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) §1–§2.

Trumpai (nekartoti klasių čia):

- Sans: Plus Jakarta Sans · Mono: JetBrains Mono
- Brand `#627d98` · Accent `#d4a520` · Gold `#f3cc30` · Slate neutrals
- `blockVariant`: `accent` (CTA / Trumpai / Patikra) · `brand` (pagrindinė info / Daryk) · `terms` (šalutinė) · track `emerald` / `violet` tik modulio kontekste
- Implementacija: `getContentBlockVariantClasses()` → `src/components/slides/utils/blockVariantClasses.ts`

### 1.1 Accent biudžetas (GOLDEN §3.2)

Content-block / evaluator-prompt-block:

| Sekcija                    | `blockVariant`       |
| -------------------------- | -------------------- |
| Trumpai / In short         | `accent`             |
| Patikra / Quality check    | `accent`             |
| Daryk dabar / Do now / CTA | `brand`              |
| Kitos                      | `brand` arba `terms` |

Max **2×** `accent` vienoje skaidrėje.

```bash
npm run audit:accent-budget           # LT modules.json + visi EN overlay (release-preflight)
npm run audit:accent-budget:m1012     # greitas M10–12
```

---

## 2. Tokenai ir auditas

Canonical sluoksniai:

- `tailwind.config.js` — product UI spalvos, šriftai, animacijos ir safelist.
- `src/components/slides/shared/diagramTokens.ts` — SVG paletė, tipografija, stroke/radius/arrow; **LMS floors** (`opacity.inactive` 0.88, `stroke.flow` 3.5, title 17/700); `getDiagramPalette()` / `getDiagramToneColors()`; M10/M12: `DIAGRAM_ROLE_COLORS` / `getDiagramActiveStroke()`. `lmsCycle` = deprecated alias. DS v0.2 **B1** partially closed via this promote.
- `src/components/slides/shared/diagramLayoutMath.ts` — `centerAxisStart`, shaft floor helpers (ne AgentWorkflow BOX clone).
- `src/design-tokens.ts` — spacing, radius, 44px touch target, focus ring, sticky stacking, z-index ir **`surfaceGlass`** (`shell` / `panel` / `overlay`).

Baseline (istorinis startas): [`analysis/DESIGN_TOKENS_BASELINE_2026-07.md`](../archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-07.md).  
Revision tikslas: [`analysis/DESIGN_SYSTEM_REVISION_2026-07.md`](../archive/development/analysis/DESIGN_SYSTEM_REVISION_2026-07.md).

```bash
npm run audit:design-tokens        # warn-only inventory
npm run audit:design-tokens:gate   # exit 1 jei regresija vs skripto BASELINE
npm run audit:module-identity      # M1–15 accent + identityIcon
npm run audit:slide-icons          # Lucide raktų allowlist
npm run audit:accent-budget        # GOLDEN §3.2
```

**Gate baseline** (skripte `scripts/audit-design-tokens.mjs`, 2026-07-20):  
`hex ≤ 295` · `inlineStyle ≤ 12` · `svgFill ≤ 51` · `arbitraryClass ≤ 59` · `total ≤ 417`.

**Trend:** 539 → 417 (W7–W10) → **~344** (max-ROI; `inlineStyle` 12, gate PASS). Daugiausia „hex“ lieka kanoniniame `diagramTokens.ts` ir legacy diagramose (LlmArch, CustomGpt) — ne klaida, o v0.3 backlog.

---

## 3. Primitivai (v0.2 + 0.3.1)

Canonical JSX: `src/components/ui/`. Dublikatų žemėlapis (istorinis): [`analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md`](../archive/development/analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md).

| Komponentas      | Paskirtis                                       | Statusas                                              |
| ---------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `Card`           | Kortelės fonas / rėmelis                        | Canonical; `.card` CSS `@deprecated` → migracija v0.3 |
| `CTAButton`      | Primary / secondary / accent                    | Canonical; viduje dar `.btn-*`                        |
| `Banner`         | Callout (`info`, `success`, `warning`, `terms`) | Canonical; plačiai M1–15                              |
| `Table`          | Lentelės subkomponentai                         | Canonical                                             |
| `LoadingSpinner` | Krautuvas                                       | Canonical                                             |
| `ErrorBoundary`  | Klaidų riba                                     | Canonical                                             |
| `Eyebrow`        | Uppercase antraštė pagal `module.accent`        | ModulesPage, ActionIntroSlide                         |
| `IconChip`       | Apvali piktograma (role × size)                 | ModuleCompleteScreen ir kt.                           |
| `SectionDivider` | Skiriamoji linija                               | SummarySlide                                          |
| `BrandMark`      | Ženklas (Zap + gold)                            | nav / hero / footer — §4a                             |
| `SlideWorkspace` | `space-y-6` chrome content-block                | **Visi M1–15** (`SlideContent.tsx`)                   |

API: [`src/components/ui/README.md`](../../src/components/ui/README.md).

---

## 4. Modulio identitetas

**Duomenys (M1–M15):** `module.accent`, `module.identityIcon`, `module.icon` — `src/data/modules.json`.  
`module.icon` = `module.identityIcon` (ModulesPage kortelė). Lygis (`learn` / `test` / `practice`) — gradientas + Eyebrow badge, ne kita ikona.

| Track        | Moduliai | `accent`                      | Tipinės ikonos                     |
| ------------ | -------- | ----------------------------- | ---------------------------------- |
| Foundation   | M1–M3    | `brand` / `slate` / `emerald` | BookOpen, ClipboardList, Briefcase |
| Theory       | M4–M6    | `violet` / `cyan` / `accent`  | Brain, ClipboardCheck, Rocket      |
| Data (corp)  | M7–M9    | `sky`                         | BarChart3, ClipboardCheck, Rocket  |
| Agents       | M10–M12  | `fuchsia`                     | Cpu, ClipboardCheck, Rocket        |
| Content eng. | M13–M15  | `rose`                        | Image, ClipboardCheck, Rocket      |

**3 UI vietos (identity biudžetas):**

1. **ModulesPage** — top juosta (`accentTopBarClasses`) + ikona (`resolveModuleIcon`)
2. **ActionIntroSlide** — `<Eyebrow>`
3. **SectionBreakSlide** — `sectionNumber` badge (`sectionBreakBadgeByAccent`)

Papildomai (ne identity “4-ta vieta”, o chrome): **ModuleCompleteScreen** top juosta per `resolveModuleAccent`.

Helpers: [`src/utils/moduleIdentity.ts`](../../src/utils/moduleIdentity.ts).  
CI: `npm run audit:module-identity`.

---

## 4a. Brand mark (0.3.1)

[`src/components/ui/BrandMark.tsx`](../../src/components/ui/BrandMark.tsx) — Lucide `Zap` (gold) ant `brand-900`. Spec: [`BRAND_MARK_SPEC.md`](BRAND_MARK_SPEC.md). Konstantos: [`src/constants/brand.ts`](../../src/constants/brand.ts).

| Variantas   | Vieta        | Badge / glifas               |
| ----------- | ------------ | ---------------------------- |
| `nav`       | `AppNav`     | `rounded-xl p-2.5` / `w-5`   |
| `hero`      | `HomePage`   | `rounded-3xl p-6` / `w-16`   |
| `footer`    | `App` footer | `rounded-lg p-1.5` / `w-3.5` |
| `icon-only` | bendras      | `rounded-lg p-1.5` / `w-5`   |

A11y: be `aria-label` → dekoratyvus; su label → `role="img"`. ActionIntro CTA `Zap` (veiksmo semantika) lieka atskirai.

---

## 4b. Icons (0.3)

SOT: [`src/icons/types.ts`](../../src/icons/types.ts), [`registry.ts`](../../src/icons/registry.ts), [`resolveIcon.ts`](../../src/icons/resolveIcon.ts), [`iconSizes.ts`](../../src/icons/iconSizes.ts).

| Konvencija     | Kur                    | Pavyzdys                       |
| -------------- | ---------------------- | ------------------------------ |
| PascalCase     | slide JSON             | `Target`, `Workflow`, `Repeat` |
| kebab-case     | news-portal `iconKey`  | `trending-up`                  |
| emoji (legacy) | tik `insights[].emoji` | ne `icon` lauke                |

Fallback: nežinomas raktas → `HelpCircle`. CI: `npm run audit:slide-icons`. Helper: [`SlideLucideIcon`](../../src/icons/SlideLucideIcon.tsx).

---

## 5. Skaidrių tipai ir layout

**SOT:** [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) §3–§4 · tipų inventorius: [`docs/SKAIDRIU_TIPU_ANALIZE.md`](../SKAIDRIU_TIPU_ANALIZE.md) · render: `SlideContent.tsx` + `src/components/slides/types/`.

Layout chrome:

- **SlideWorkspace** — visada ant `content-block` / `evaluator-prompt-block` (M1–15).
- Tarpai: `design-tokens` `spacingClasses.blockGap` (`space-y-6`) — GOLDEN §3.7 / UI_UX §3.7.
- Sticky: `stickyClasses.belowAppNav` + `--app-nav-height` (GOLDEN §5.5).

---

## 6. Diagramos ir schemos

Canonical kelias: [`DIAGRAM_KIT_STANDARD.md`](DIAGRAM_KIT_STANDARD.md).

- Keyboard: HTML `DiagramStepNav`.
- SVG hit: `DiagramStepHitArea` (pointer only; be `role="button"` / `tabIndex`).
- Dark: `getDiagramPalette()` / `getDiagramToneColors()`.
- Shell: `InteractiveDiagramShell` (status, step nav, explanation).

**Būsena (2026-07):**

- M1–M9 DiagramKit migracija + leftovers (DiPrezentacijos, Turinio, AgentWorkflow, CustomGpt hit zones) — done / dalinis.
- M10–M12 process diagramos — shell + layout SOT; vizualinis backlog dauguma **Done**: [`M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md`](../archive/development/analysis/M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md).
- **v0.3 backlog:** CustomGpt hex; `ContentSlides` arbitrary class. (`LlmArch` B3 / W6 etalon ✅ 2026-07 — [`LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md`](LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md).)

---

## 7. Deprecations ir migracija

| Legacy                                            | Canonical                     | Statusas                                      |
| ------------------------------------------------- | ----------------------------- | --------------------------------------------- |
| `.btn-primary` / `.btn-secondary` / `.btn-accent` | `<CTAButton />`               | CSS lieka; JSX → CTAButton (dalinė migracija) |
| `.card` / `.card-hover`                           | `<Card />`                    | CSS lieka; migracija v0.3                     |
| `.badge-*`                                        | Badge primitive (v0.3)        | CSS lieka                                     |
| Local SVG `style={{ background }}` ant diagramų   | `<linearGradient>` + `<rect>` | preferuoti (pvz. M10Orchestrator)             |

`@deprecated` ≠ delete. Senas CSS veikia, kol v0.3 cleanup.

---

## 8. Kokybės vartai

Lokaliai prieš didesnį DS diff:

```bash
npm run lint && npm run typecheck && npm run test:run
npm run validate:schema
npm run audit:design-tokens:gate
npm run audit:module-identity
npm run audit:slide-icons
npm run audit:accent-budget
node scripts/audit-footer-length.mjs
```

**Release:** `npm run audit:release-preflight` — įskaitant tokens gate, module-identity, slide-icons, **pilną** accent-budget, slide-titles, M4–9 EN/LT.  
Checklist: [`RELEASE_QA_CHECKLIST.md`](RELEASE_QA_CHECKLIST.md) (§8 design tokens, accent budget).

---

## 9. Versijų istorija

| Versija                     | Kas                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **0.1**                     | GOLDEN_STANDARD, pradiniai `Card` / `CTAButton` / `Banner`                                                         |
| **0.2.0**                   | Konsolidacija, Eyebrow/IconChip/SectionDivider, M1–6 identity, `audit:design-tokens` — `CHANGELOG` `[v0.2.0]`      |
| **0.3.1 dalys**             | BrandMark, icon registry, `module.icon` = identityIcon, M7–15 track accents                                        |
| **DS hardening / W7–W10**   | Banner/CTAButton/Card pilotai, `surfaceGlass`, SlideWorkspace, tokens gate baseline 417                            |
| **DS max-ROI (2026-07-20)** | Accent biudžetas M4–M9/M13 + EN; SlideWorkspace all M1–15; Orchestrator be inline bg; preflight full accent-budget |

Detalu: `CHANGELOG.md` `[Unreleased]` · **DS max-ROI compliance**.

---

## 10. Backlog (v0.3+) — ne ši DS linija

- LlmArch B3 / W6 etalon ✅ (2026-07)
- `ContentSlides.tsx` arbitrary Tailwind cleanup
- `.card` / `.btn-*` CSS pašalinimas po pilnos JSX migracijos
- Badge primitive
- Nauja paletė / „premium SaaS“ look — **neplanuota** be atskiro produkto sprendimo

---

## 11. Nuorodos

| Dokumentas               | Kelias                                                              |
| ------------------------ | ------------------------------------------------------------------- |
| GOLDEN etalonas          | `GOLDEN_STANDARD.md`                                                |
| UI/UX agentas            | `UI_UX_AGENT.md`                                                    |
| v0.2 planas (archyvas)   | `DESIGN_SYSTEM_V0_2.md`                                             |
| v0.2 vykdymas (archyvas) | `DESIGN_SYSTEM_V0_2_EXECUTION_PLAN.md`                              |
| DiagramKit               | `DIAGRAM_KIT_STANDARD.md`                                           |
| Brand mark               | `BRAND_MARK_SPEC.md`                                                |
| Release QA               | `RELEASE_QA_CHECKLIST.md`                                           |
| Token baseline           | `../archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-07.md` |
