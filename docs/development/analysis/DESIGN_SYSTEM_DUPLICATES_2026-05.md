# Design System — Stylinių dublikatų lentelė (v0.2)

> **Tikslas:** Užfiksuoti dubliuojamus stiliaus „šaltinius" tarp `src/index.css` (CSS @apply utility'os) ir `src/components/ui/*` (JSX primitive'ai). Pažymėti **canonical** sprendimą kiekvienam dublikatui prieš v0.3 migraciją. **Migravimas senose vietose — NE v0.2 darbas**, žr. plano §3 rule §6.
>
> **SOT (planas):** [`docs/development/DESIGN_SYSTEM_V0_2.md §6`](../DESIGN_SYSTEM_V0_2.md) (Etapas E3 — Style inconsistencies map).
> **Canonical sprendimai (užfiksuoti):** [`.cursor/rules/design-system-v02.mdc`](../../../.cursor/rules/design-system-v02.mdc) — „Canonical sprendimai" lentelė.
> **Task ID:** **E3.1** (CODE_REVIEW_AGENT).
> **Data:** 2026-05-19. **Agentas:** CODE_REVIEW_AGENT.

---

## 1. Suvestinė lentelė

| #   | Koncepcija           | CSS klase / failas                                                                                                            | JSX primitive / failas                                                                                                                              | Canonical (v0.2)                                                                                   | CSS klases naudotojų sk. (apytiksliai)                                                                                                | JSX primitive'o naudotojų sk.                  |
| --- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | **Kortelė**          | `.card`, `.card-hover` ([src/index.css:247-253](../../../src/index.css))                                                      | `<Card variant="default\|brand\|accent" />` ([src/components/ui/Card.tsx](../../../src/components/ui/Card.tsx))                                     | **JSX `<Card />`** (plano §1)                                                                      | `card-hover`: **5** failuose (`HomePage` ×4, `ModulesPage` ×1)                                                                        | **0** (rg `<Card\b` — nė vienoje vietoje)      |
| 2   | **CTA mygtukas**     | `.btn-primary`, `.btn-secondary`, `.btn-accent` ([src/index.css:227-244](../../../src/index.css))                             | `<CTAButton variant="primary\|secondary\|accent\|hero" />` ([src/components/ui/CTAButton.tsx](../../../src/components/ui/CTAButton.tsx))            | **JSX `<CTAButton />`** (plano §1; vidiniai naudoja `.btn-*` per `variantClasses` — backend lieka) | `btn-primary`: ~26 naudojimų; `btn-secondary`: ~27; `btn-accent`: 0 (tik index.css + CTAButton.tsx)                                   | **0** (rg `<CTAButton\b` — nė vienoje vietoje) |
| 3   | **Badge**            | `.badge`, `.badge-brand`, `.badge-accent`, `.badge-success`, `.badge-slate` ([src/index.css:256-274](../../../src/index.css)) | (nėra)                                                                                                                                              | **CSS `.badge-*`** (kol nėra primitivo) — JSX Badge primitive **v0.3 backlog**                     | `badge-{brand,accent,success,slate}`: ~9 naudojimų (`HomePage`, `ModuleCompleteScreen`, `ModuleView`, `ModulesPage`, `PromptLibrary`) | N/A                                            |
| 4   | **Banner / Callout** | inline `border-l-4 ...` blok'ai (~150+ atvejai per `src/components/`)                                                         | `<Banner variant="info\|success\|warning\|terms" />` ([src/components/ui/Banner.tsx](../../../src/components/ui/Banner.tsx); po E3.3 — 4 variantai) | **JSX `<Banner />`** (plano §1; po E3.3 — `terms` slate variantas)                                 | inline `border-l-4`: **161** atvejų 28 failuose (didžiausi: `BlockSlides` ×30, `ContentSlides` ×56, `TestPracticeSlides` ×21)         | **0** (rg `<Banner\b` — nė vienoje vietoje)    |
| 5   | **Input (textarea)** | `.input` ([src/index.css:277-282](../../../src/index.css))                                                                    | (nėra)                                                                                                                                              | **CSS `.input`** (kol nėra primitivo) — JSX Input primitive **v0.3 backlog**                       | **1** naudojimas ([src/components/slides/shared/PracticalTask.tsx:429](../../../src/components/slides/shared/PracticalTask.tsx))      | N/A                                            |

> **Pastaba.** „Naudotojų skaičius" — `rg`-based apytikslis (lentelės §3 reproducibilumo komandos). Skaičiai neatima `index.css` ir paties primitivo failų (`ui/CTAButton.tsx` ir kt.) — tik vartotojų pusės skaičius pateiktas „User-side" stulpelyje §2.

---

## 2. Detalizacija (canonical pasirinkimo logika)

### 2.1 Kortelė — `<Card />` canonical

- **`<Card />` neneša`.card` CSS klasės.** Card.tsx turi `variantClasses` su Tailwind utility'omis tiesiogiai (`bg-white dark:bg-gray-800 rounded-2xl shadow-md ...`). Todėl `.card` klasė ir `<Card />` yra **du nepriklausomi šaltiniai** to paties stiliaus.
- **`.card-hover` = `.card` + `hover:shadow-lg hover:-translate-y-0.5 transition-all`** (žr. [src/index.css:251-253](../../../src/index.css)). Migracijai į `<Card />` reikės arba (a) pridėti `hover` variantą primitive'ui, arba (b) palikti hover utility'es JSX'e.
- **Migracija (v0.3):** ~5 vietose `card-hover`, plius platus paviršinis `card` paieškos rezultatas (žr. §3 reproducibilumo komandos) — vidutinis darbo dydis.

### 2.2 CTA mygtukas — `<CTAButton />` canonical

- **`<CTAButton />` viduje naudoja `.btn-*` klases** per `variantClasses: Record<CTAButtonVariant, string>` map'ą:
  - `primary` → `btn-primary`
  - `secondary` → `btn-secondary`
  - `accent` → `btn-accent`
  - `hero` → `btn-primary btn-hero-cta`
- **Todėl `.btn-*` deprecation komentaras (E3.2)** turi sakyti **„JSX'e naudoti `<CTAButton />`. Klasė lieka kaip canonical primitive bekendas (CTAButton.tsx). Migracija — v0.3."** — t.y. klasių NEPAŠALINI v0.3 metu (nebent CTAButton.tsx pakeičiamas naudoti tiesiogiai utility'es).
- **Naudojimas šiandien:** `.btn-primary` ir `.btn-secondary` plačiai paplitę (~50+ vietose tarp `HomePage`, `ModulesPage`, `ModuleView`, `QuizPage`, `TestPracticeSlides`, `ContentSlides`, `ModuleCompleteScreen`, `CertificateScreen`). `.btn-accent` — neplitęs (0 vartotojų).

### 2.3 Badge — kol kas CSS canonical

- **JSX primitive'o nėra.** Plano §11 Backlog'as **NE-įtraukia** Badge primitive'o kaip explicit task'o, bet praktiškai tai būtų logiška sekti Card + CTAButton + Banner pavyzdžiu.
- **Naudojimas:** `badge-brand`/`-accent`/`-success`/`-slate` — ~9 vartotojų vietose (M1–M6 `ModuleCompleteScreen` „Kur pritaikyti?", `ModulesPage` lygio žymės, `PromptLibrary` kategorijos).
- **Canonical (v0.2):** **CSS `.badge-*`** lieka. **NE deprecated** v0.2 metu — nėra alternatyvos.
- **v0.3 backlog'as (rekomendacija):** `src/components/ui/Badge.tsx` su variantais `brand|accent|success|slate|warning`. Šis dokumentas tai pažymi, bet plano §11 oficialiai nepridedama.

### 2.4 Banner / Callout — `<Banner />` canonical (po E3.3 — 4 variantai)

- **Inline `border-l-4` paplitimas — 161 atvejis 28 failuose.** Tai didžiausia migracijos zona v0.3 etape.
- **`<Banner />` po E3.3:** 4 variantai (`info`, `success`, `warning`, `terms`) — atitinka GOLDEN_STANDARD §2.2 blockVariant `accent|brand|terms` + 2 semantiniai (`success`, `warning`).
- **Canonical (v0.2):** **JSX `<Banner />`**. Egzistuojantys `border-l-4` blok'ai NE deprecated CSS lygyje (tai ne CSS klase, o ad-hoc Tailwind utility'os) — migracijos taisyklės plano §3 rule §6: „veikia — nelaužti".
- **Migracija (v0.3):** Aukšto effort'o, bet aukšto value. Bus dalis B6 backlog'o (`SlideShell` primitive — kandidatas).

### 2.5 Input — kol kas CSS canonical, bet vienintelis naudotojas

- **Tik 1 naudojimas:** [src/components/slides/shared/PracticalTask.tsx:429](../../../src/components/slides/shared/PracticalTask.tsx) — textarea su `className="input min-h-[120px] font-mono text-sm"`.
- **Canonical (v0.2):** **CSS `.input`** lieka, NE deprecated.
- **v0.3 backlog'as:** Tikriausiai šio primitive'o NEreikia — 1 naudotojas pakeistų inline Tailwind utility'omis. Bus svarstoma per `Input` primitive'o ar utility'os keliu.

---

## 3. Reproducibilumo komandos (rg-based)

```bash
# .card-hover naudotojai (canonical: <Card />)
rg -c "card-hover" src/

# .btn-* naudotojai (canonical: <CTAButton />)
rg -c "btn-primary" src/
rg -c "btn-secondary" src/
rg -c "btn-accent" src/

# .badge-* naudotojai (canonical: CSS, kol nėra primitivo)
rg -c "badge-(brand|accent|success|slate)" src/

# inline border-l-4 callout'ai (canonical: <Banner />)
rg -c "border-l-4" src/

# .input naudotojai (canonical: CSS, kol nėra primitivo)
rg -n "className=.*\binput\b" src/ -g "*.tsx"

# JSX primitive'ų naudotojai (turi būti 0 šiuo metu)
rg -c "<Card\b" src/
rg -c "<CTAButton\b" src/
rg -c "<Banner\b" src/
```

> **Patikrinta 2026-05-19:** rezultatai atitinka §1 lentelę.

---

## 4. Sąsaja su E3.2 (`@deprecated` komentarai)

E3.2 task'as pridės `/* @deprecated v0.2 — ... */` komentarus virš šių klasių `src/index.css`'e:

| CSS klase        | Komentaras (formuluotė)                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `.btn-primary`   | „JSX'e naudoti `<CTAButton variant=\"primary\" />`. Klasė lieka kaip canonical primitive bekendas (CTAButton.tsx). Migracija — v0.3." |
| `.btn-secondary` | analogiškas, `variant=\"secondary\"`                                                                                                  |
| `.btn-accent`    | analogiškas, `variant=\"accent\"`                                                                                                     |
| `.card`          | „naudoti `<Card />` (src/components/ui/Card.tsx). Migracija — v0.3."                                                                  |
| `.card-hover`    | „naudoti `<Card />` + Tailwind hover:\* utility'es. Migracija — v0.3."                                                                |
| `.badge`         | „laukti Badge primitive (v0.3) arba inline Tailwind utility."                                                                         |
| `.badge-brand`   | analogiškas                                                                                                                           |
| `.badge-accent`  | analogiškas                                                                                                                           |

**NEpalietama** (utility helper'iai arba „be alternatyvos"): `.glass-card`, `.hover-card`, `.input`, `.badge-success`, `.badge-slate`, `.mono`, `.btn-hero-cta`.

---

## 5. Sąsaja su E3.3 (Banner `terms` variantas)

E3.3 task'as papildys `<Banner />` 4-tu variantu `terms` (slate paletė) — atitinka GOLDEN_STANDARD §2.2 blockVariant `terms`. Tai uždaro **Banner ↔ inline `border-l-4`** dublikatų lentelę: po E3.3 `<Banner />` palaiko visas 4 v0.2 semantines paletes (`info=brand`, `success=emerald`, `warning=amber`, `terms=slate`), todėl būsima v0.3 migracija turės pilną canonical paletę.

---

## 6. Stebėjimai

1. **JSX primitive'ai šiandien — 0 naudotojų.** Visi 3 (`<Card />`, `<CTAButton />`, `<Banner />`) yra apibrėžti `src/components/ui/`, bet niekur nenaudojami. Tai patvirtina, kad **v0.2 yra konsolidacijos pradžia**, ne pabaiga — migracija tikra v0.3 darbas.
2. **`.btn-accent` ir `.input` — žemos vertės kandidatai.** Atitinkamai 0 ir 1 naudotojas — galima ateityje pašalinti su minimalia rizika (v0.3+).
3. **`.btn-hero-cta`** — speciali klasė (Hero gradient overlay), naudojama per `<CTAButton variant="hero">`. Lieka. Žr. [src/index.css:178-214](../../../src/index.css).
4. **`.glass-card` ir `.hover-card`** — utility helper'iai (mixin'ai), NE komponentų dublikatai. NE deprecated.
5. **161 inline `border-l-4` callout'as** — didžiausia v0.3 refactor zona. Verta apsvarstyti `SlideShell` primitive'o (Backlog **B6**) sukūrimą kaip atskirą task'ą.

---

## 7. Nuorodos

| Sritis                 | Failas                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| Planas (SOT)           | `docs/development/DESIGN_SYSTEM_V0_2.md` §6 (E3 etapas)                                         |
| Cursor rule            | `.cursor/rules/design-system-v02.mdc`                                                           |
| Baseline (E2.2)        | `docs/development/analysis/DESIGN_TOKENS_BASELINE_2026-05.md`                                   |
| GOLDEN_STANDARD §2.2   | `docs/development/GOLDEN_STANDARD.md`                                                           |
| Canonical primitive'ai | `src/components/ui/Card.tsx`, `src/components/ui/CTAButton.tsx`, `src/components/ui/Banner.tsx` |
| Backlog v0.3           | `docs/development/DESIGN_SYSTEM_V0_2.md` §11 (B6 — `SlideShell`)                                |

---

_Šis dokumentas — vienkartinė E3.1 dublikatų lentelė. Atnaujinama TIK po v0.3 migracijos arba po naujų primitive'ų pridėjimo (E4 etapas — Eyebrow/IconChip/SectionDivider, kurie NE-yra dublikatai)._
