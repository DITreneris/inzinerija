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

_TBD v0.3 — žr. [`analysis/DESIGN_TOKENS_BASELINE_2026-05.md`](analysis/DESIGN_TOKENS_BASELINE_2026-05.md), `npm run audit:design-tokens`._

---

## 3. Primitivai (v0.2 — pilna)

Canonical JSX komponentai: `src/components/ui/`. Dublikatų žemėlapis: [`analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md`](analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md).

| Komponentas             | Paskirtis                                       | Pastaba                                    |
| ----------------------- | ----------------------------------------------- | ------------------------------------------ |
| `Card`                  | Kortelės fonas / rėmelis                        | `@deprecated` `.card` CSS — migracija v0.3 |
| `CTAButton`             | Primary / secondary / accent mygtukai           | Naudoja `.btn-*` kaip backend              |
| `Banner`                | Callout (`info`, `success`, `warning`, `terms`) |                                            |
| `Table`                 | Lentelės subkomponentai                         |                                            |
| `LoadingSpinner`        | Krautuvas                                       |                                            |
| `ErrorBoundary`         | Klaidų riba                                     |                                            |
| **Eyebrow** (E4)        | Maža uppercase antraštė, 6 accent               | Proof: ModulesPage, ActionIntroSlide       |
| **IconChip** (E4)       | Apvali piktograma, 5 role, 3 size               | Proof: ModuleCompleteScreen                |
| **SectionDivider** (E4) | Skiriamoji linija su/be label                   | Proof: SummarySlide                        |

Detalus API: [`src/components/ui/README.md`](../../src/components/ui/README.md).

---

## 4. Modulio identitetas (v0.2 — pilna)

**Duomenys (M1–M6):** `module.accent`, `module.identityIcon` — `src/data/modules.json` (optional schema laukai).

| Modulis | `accent`  | `identityIcon`   |
| ------- | --------- | ---------------- |
| M1      | `brand`   | `BookOpen`       |
| M2      | `slate`   | `ClipboardList`  |
| M3      | `emerald` | `Briefcase`      |
| M4      | `violet`  | `Brain`          |
| M5      | `cyan`    | `ClipboardCheck` |
| M6      | `accent`  | `Rocket`         |

**3 UI vietos (v0.2):**

1. **ModulesPage** — kortelės viršutinė juosta (`accentTopBarClasses`)
2. **ActionIntroSlide** — `<Eyebrow>` virš hero
3. **SectionBreakSlide** — tik `sectionNumber` badge (`sectionBreakBadgeByAccent`); hero lieka `heroColorKey`

Helpers: `src/utils/moduleIdentity.ts`. Vizualinė patikra: [`analysis/MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md`](analysis/MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md).

---

## 5. Skaidrių tipai ir layout

_TBD v0.3 — žr. `GOLDEN_STANDARD.md` §3–§4, `docs/SKAIDRIU_TIPU_ANALIZE.md`._

---

## 6. Diagramos ir schemos

_TBD v0.3 — žr. `SCHEME_AGENT.md`, backlog B1 (`diagramTokens.ts`)._

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
npm run audit:design-tokens   # TOTAL <= 480 (baseline)
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
