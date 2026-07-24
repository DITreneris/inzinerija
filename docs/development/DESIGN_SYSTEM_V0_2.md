# Design System v0.2 — Konsolidacija ir modulio identitetas

> **ARCHYVAS (2026-07-20):** v0.2 **shipped**. Gyvas SOT indeksas → [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md). Tipografija/schemos → [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) 2.3.9. Šis failas – istorinis E1–E7 planas; **ne** naujų task'ų šaltinis.
>
> **Versija:** 0.2.0 | **Data:** 2026-05-19 | **Status:** ✅ shipped (E1–E7 baigti; žr. `DESIGN_SYSTEM.md` §9)
> **Pirminis SOT (nelaužomas):** [`docs/development/GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md)
> **Auditas (pamatas):** v0.1 → v0.2 audito ataskaita (chat 2026-05-19, „Design System v0.1 → v0.2 auditas — Promptų anatomija (~120 skaidrių)“)
> **Tech apžvalga:** [`docs/development/GOLD_LEGACY_STANDARD.md`](GOLD_LEGACY_STANDARD.md)
> **Apimtis:** ~1.5–2 darbo dienos; 7 etapai; 28 atominiai task'ai
> **NEapima:** turinio redagavimo, diagramos refactor'inimo, naujų skaidrių tipų, paletės keitimo

---

## 0. Trumpa santrauka

**Tikslas.** Saugiai pakelti esamą design system iš v0.1 į v0.2 — **konsoliduoti dublikatus**, sukurti **modulio savitumą per accent token + identity icon** ir pridėti **automatinį auditavimą** (warn-only) prieš v0.3 refactor'ą. **Turinio nekeisti.** Jokio redesign'o.

**Trys pamatiniai pakeitimai.**

1. **Konsolidacija** — `Card` / `.card` ir kiti dublikatai gauna canonical pasirinkimą + `@deprecated` JSDoc kitam.
2. **Modulio identitetas** — `module.accent` + `module.identityIcon` data laukai + **3 vietos** UI'e (ModulesPage card top bar, intro eyebrow, section-break badge).
3. **Auditavimas** — `scripts/audit-design-tokens.mjs` warn-only kaip baseline; ateityje (v0.3) gali tapti pre-commit gate.

**Etapų lentelė.**

| Etapas | Pavadinimas                            | Task'ai | Trukmė    | Pagrindinis agentas   | Status                |
| ------ | -------------------------------------- | ------- | --------- | --------------------- | --------------------- |
| E1     | Repo audit                             | 1       | ✅ baigta | UI_UX + CODE_REVIEW   | done (auditas chat'e) |
| E2     | Token inventory                        | 3       | 1–2 val.  | CODING + QA           | planuojama            |
| E3     | Style inconsistencies map              | 3       | 1–2 val.  | CODE_REVIEW + CODING  | planuojama            |
| E4     | Component normalization                | 5       | 2–3 val.  | CODING + UI_UX        | planuojama            |
| E5     | Module identity layer                  | 7       | 2–3 val.  | DATA + CODING + UI_UX | planuojama            |
| E6     | Microcopy QA pass (be turinio keitimo) | 3       | 1 val.    | QA                    | planuojama            |
| E7     | Before/after dokumentacija             | 4       | 1 val.    | QA + UI_UX            | planuojama            |
| E_BL   | Backlog'as v0.3 (out of scope)         | —       | —         | —                     | matomas šiame doc     |

---

## 1. Sprendimai (zafiksuoti 2026-05-19)

| Sprendimas                | Vertė                                                                                   | Priežastis                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Dokumento vieta**       | `docs/development/DESIGN_SYSTEM_V0_2.md`                                                | Šalia `GOLDEN_STANDARD.md`, `GOLD_LEGACY_STANDARD.md` — vienoje vietoje             |
| **Darbo aplinkos scope**  | Standard: planas + audit skriptas + Cursor rule + TODO atnaujinimas                     | Pakanka pradėti E2; nereikalauja branch'o ar pre-commit gate                        |
| **Modulio accent palete** | Spektras: **M1=brand · M2=slate · M3=emerald · M4=violet · M5=cyan · M6=accent (gold)** | Maks. diferenciavimas, visi token'ai jau egzistuoja `tailwind.config.js` safelist'e |
| **Canonical Card**        | `<Card />` JSX primitive `src/components/ui/Card.tsx`                                   | Type safety, variantai, lengviau auditatuoti; `.card` CSS klasė → `@deprecated`     |

**Modulio identity icon žemėlapis** (sutarta su `ModulesPage.tsx` jau importuojamomis ikonomis):

| Modulis                  | Accent    | Identity icon (lucide) |
| ------------------------ | --------- | ---------------------- |
| M1 — Pagrindai / Mokymas | `brand`   | `BookOpen`             |
| M2 — Testas              | `slate`   | `ClipboardList`        |
| M3 — Praktika            | `emerald` | `Briefcase`            |
| M4 — Teorija (gilesnė)   | `violet`  | `Brain`                |
| M5 — Testas 2            | `cyan`    | `ClipboardCheck`       |
| M6 — Projektas           | `accent`  | `Rocket`               |

**Pastaba:** identity icon ≠ CTA icon. CTA mygtukai lieka su GOLDEN_STANDARD §2.2 spalvomis (accent / brand). Identity icon naudojama TIK 3 vietose (žr. E5).

---

## 2. Darbo aplinkos paruošimas (atliekamas ŠIOJE sesijoje)

Šie failai sukuriami iškart, kad E2–E7 darbas vyktų efektyviai be papildomo bootstrap'o:

| #             | Failas                                                          | Paskirtis                                                     | Statusas                                          |
| ------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| W1            | `docs/development/DESIGN_SYSTEM_V0_2.md`                        | Šis planas — SOT'as E2–E7 vykdymui                            | **šioje sesijoje**                                |
| W2            | `scripts/audit-design-tokens.mjs`                               | Warn-only hex/inline-style auditas                            | **šioje sesijoje (skelet)**                       |
| W3            | `.cursor/rules/design-system-v02.mdc`                           | Cursor rule — v0.2 scope guard ir fail-safe                   | **šioje sesijoje**                                |
| W4            | `TODO.md` (atnaujinimas)                                        | „P1 — Design System v0.2“ skyrius su 28 task'ais              | **šioje sesijoje**                                |
| W6            | `docs/archive/development/DESIGN_SYSTEM_V0_2_EXECUTION_PLAN.md` | Operacinis vykdymo planas E4–E7 (archyvas; stub development/) | **2026-05-19**                                    |
| W5 (optional) | `feat/design-system-v0.2` branch                                | Izoliacija nuo `main`                                         | **vartotojo sprendimas; rekomenduojama prieš E4** |

---

## 3. Bendros taisyklės (fail-safe iš v0.1 audito §9)

Šios taisyklės **galioja kiekvienam** v0.2 task'ui. Jei task'as jas pažeidžia → task'as priklauso v0.3, ne v0.2.

1. **5+ failų taisyklė.** Jei diff paliečia >5 komponentus arba >2 modulius → refactor, ne micro-iteration.
2. **Turinio neliečimo taisyklė.** Jokių pakeitimų `modules.json` tekstuose, `lt.json`, `en.json` ar SOT'uose (`turinio_pletra*.md`). Išimtis: `module.accent` ir `module.identityIcon` laukai (E5) — tai data struktūra, ne turinys.
3. **Aiškumo prioriteto taisyklė.** Estetika nesumažina kontrasto, focus ring, hierarchijos.
4. **Modulio savitumo balanso taisyklė.** Modulio identity matomas ≤3 vietose vienoje skaidrėje.
5. **Vienas accent per skaidrę.** GOLDEN_STANDARD §2.2 — max 2 semantinės + 1 CTA accent. `module.accent` neatrakina trijų accent'ų.
6. **„Veikia — nelaužti“.** `summary`, `section-break recap`, `Diagram+Block`, `lazyWithRetry`, `validate:schema` — v0.2 jų neliečia.
7. **Lokalūs TOKENS diagramose.** v0.2 metu **nepalietami** — tik flag'inami audit'o (E2). Refactor — v0.3.

---

## 4. Etapas E1 — Repo audit ✅ BAIGTAS

|                           |                                                                                                                                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**                | ✅ atlikta 2026-05-19                                                                                                                                                                                                              |
| **Rezultatas**            | Audito ataskaita chat'e — „Design System v0.1 → v0.2 auditas — Promptų anatomija (~120 skaidrių)“                                                                                                                                  |
| **Pagrindiniai radiniai** | (a) Du `Card` šaltiniai (`.card` vs `Card.tsx`), (b) 19+ diagramos failų su lokaliais `TOKENS = { ... '#hex' ... }`, (c) modulio identitetas neegzistuoja — `practice` ir `test` gradient identiški, (d) safelist 10 spalvų šeimų. |
| **Exit-kriterijai**       | Audito ataskaita su 10 skyrių (Bottom line, OK/FAIL, kategorijų diagnozė, principai, modulių savitumo sistema, low-hanging fruits, do/don't, veiksmų seka, fail-safe, galutinis deliverable).                                      |

---

## 5. Etapas E2 — Token inventory

**Tikslas.** Užfiksuoti baseline'ą — kiek hex'ų ir inline `style` yra šiandien, kuriuose failuose. Be šios baseline'os v0.3 refactor'ui nebus „prieš/po“ metrikų.

### Task E2.1 — sukurti `scripts/audit-design-tokens.mjs` (warn-only)

|                         |                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**             | CODING_AGENT                                                                                                                                                                                                                                                                                                      |
| **Inputas (read-only)** | `src/components/**/*.tsx`, `tailwind.config.js`, esami audit skriptai (`scripts/audit-collapsible-sections.mjs`, `audit-footer-length.mjs`)                                                                                                                                                                       |
| **Outputas**            | `scripts/audit-design-tokens.mjs` — Node.js script, warn-only (exit 0 visada), per failą flag'ina: (a) `#[0-9a-fA-F]{3,6}` hex'us, (b) `style={{ background, boxShadow, color, fill, stroke }}`, (c) `fill="#..."`, `stroke="#..."` SVG. **Šiame sesijoje sukuriamas skelet'as (W2)** — pilna logika E2.1 task'e. |
| **Token bud.**          | ~4K (skripto kodas + komentarai)                                                                                                                                                                                                                                                                                  |
| **Sudėtingumas**        | S                                                                                                                                                                                                                                                                                                                 |
| **Priklausomybės**      | W2 skelet'as (jau sukurtas šioje sesijoje)                                                                                                                                                                                                                                                                        |
| **Exit-kriterijai**     | 1. `node scripts/audit-design-tokens.mjs` veikia ir grąžina ataskaitą. 2. Output formatas: `[FILE_PATH:LINE] [CATEGORY] preview`. 3. CI integration: pridėtas į `package.json` kaip `"audit:design-tokens": "node scripts/audit-design-tokens.mjs"`. 4. NE prebuild (warn-only — neturi blokuoti build'o).        |
| **Rollback**            | `git revert` — vienas commit'as, neturi runtime efektų.                                                                                                                                                                                                                                                           |

### Task E2.2 — paleisti audit ir sukurti baseline dokumentą

|                     |                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT                                                                                                                                                   |
| **Inputas**         | `node scripts/audit-design-tokens.mjs` output                                                                                                              |
| **Outputas**        | `docs/archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-05.md` — lentelė „failas → hex skaičius → inline style skaičius“ + top-5 „dirtiest“ failai. |
| **Token bud.**      | ~5K                                                                                                                                                        |
| **Sudėtingumas**    | S                                                                                                                                                          |
| **Priklausomybės**  | E2.1                                                                                                                                                       |
| **Exit-kriterijai** | 1. Lentelėje matoma ≥15 failų (lūkestis pagal auditą — ~19). 2. Yra „Top-5 dirtiest“ skyrius. 3. Pridėta nuoroda į šį planą (`DESIGN_SYSTEM_V0_2.md §5`).  |
| **Rollback**        | `git rm` — vienas naujas docs failas.                                                                                                                      |

### Task E2.3 — `npm run audit:design-tokens` integracija į RELEASE_QA_CHECKLIST

|                     |                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT                                                                                                                                    |
| **Inputas**         | `docs/development/RELEASE_QA_CHECKLIST.md`                                                                                                  |
| **Outputas**        | Pridėtas naujas eilutė §X „Design tokens baseline regression“ — „palyginti dabartinį output su baseline; tendencija turi būti ↓ arba lygi“. |
| **Token bud.**      | ~2K                                                                                                                                         |
| **Sudėtingumas**    | XS                                                                                                                                          |
| **Priklausomybės**  | E2.1, E2.2                                                                                                                                  |
| **Exit-kriterijai** | RELEASE_QA_CHECKLIST turi naują eilutę su nuoroda į baseline.                                                                               |
| **Rollback**        | StrReplace atgal.                                                                                                                           |

**Etapo E2 exit-kriterijai.** Skripto egzistuoja; baseline užfiksuotas dokumente; RELEASE_QA žino apie regression check'ą. **NEdaroma** jokio refactor'o šiame etape.

---

## 6. Etapas E3 — Style inconsistencies map

**Tikslas.** Sukurti dublikatų lentelę ir pažymėti `@deprecated` ant ne-canonical versijų. Be migravimo.

### Task E3.1 — dublikatų lentelės sudarymas

|                         |                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **Agentas**             | CODE_REVIEW_AGENT                                                                                                       |
| **Inputas (read-only)** | `src/index.css`, `src/components/ui/*.tsx`, `src/components/ui/index.ts`                                                |
| **Outputas**            | `docs/archive/development/analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md` — lentelė: „Koncepcija                          | CSS klase / failas | JSX primitive / failas | Canonical (šiame v0.2) | Naudotojų skaičius (apytiksliai)“. **Min. 5 įrašai:** Card, Button (CTA), Badge, Banner/Callout, Input. |
| **Token bud.**          | ~4K                                                                                                                     |
| **Sudėtingumas**        | S                                                                                                                       |
| **Priklausomybės**      | nė vienos                                                                                                               |
| **Exit-kriterijai**     | Lentelė turi „Canonical“ sprendimą kiekvienam dublikatui. Card pažymėta: canonical = `<Card />` JSX (per §1 sprendimą). |
| **Rollback**            | `git rm`.                                                                                                               |

### Task E3.2 — `@deprecated` JSDoc pridėjimas `.card` ir kitiems CSS klasiams

|                     |                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentas**         | CODING_AGENT                                                                                                                                                                                                                                                                                                                   |
| **Inputas**         | E3.1 lentelė                                                                                                                                                                                                                                                                                                                   |
| **Outputas**        | `src/index.css` — virš `.card`, `.card-hover`, `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.badge`, `.badge-brand`, `.badge-accent` pridedami **CSS komentarai** stiliumi `/* @deprecated v0.2 — naudoti <Card /> (src/components/ui/Card.tsx). Migracija — v0.3. */`. **Kodas NEšalinamas** — esamas naudojimas veikia. |
| **Token bud.**      | ~3K                                                                                                                                                                                                                                                                                                                            |
| **Sudėtingumas**    | XS                                                                                                                                                                                                                                                                                                                             |
| **Priklausomybės**  | E3.1                                                                                                                                                                                                                                                                                                                           |
| **Exit-kriterijai** | 1. Visi flag'inti utility'iai turi `@deprecated` komentarą. 2. `npm run build` veikia (komentarai neturi efekto runtime). 3. `npm test` praeina.                                                                                                                                                                               |
| **Rollback**        | `git revert` — 1 failo diff.                                                                                                                                                                                                                                                                                                   |

### Task E3.3 — Banner / Callout — `border-l-4` blockVariant atitiktis

|                     |                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentas**         | UI_UX_AGENT                                                                                                                                                                          |
| **Inputas**         | `src/components/ui/Banner.tsx`, GOLDEN_STANDARD §2.2 (blockVariant `accent/brand/terms`)                                                                                             |
| **Outputas**        | `Banner` props išplėtimas: pridėti **optional** variant `'terms'` (slate paletė) → atitinka §2.2 lentelę. Pažymėta `@since v0.2`. Egzistuojantys `info`, `success`, `warning` lieka. |
| **Token bud.**      | ~2K                                                                                                                                                                                  |
| **Sudėtingumas**    | XS                                                                                                                                                                                   |
| **Priklausomybės**  | nė vienos                                                                                                                                                                            |
| **Exit-kriterijai** | 1. `Banner` turi 4 variantus. 2. `npm run typecheck` praeina. 3. NEbūtina taikyti existing slide'uose.                                                                               |
| **Rollback**        | `git revert`.                                                                                                                                                                        |

**Etapo E3 exit-kriterijai.** Dublikatų lentelė egzistuoja; canonical pasirinkimai pažymėti; `.card` ir co. turi `@deprecated`; Banner papildytas `terms` variantu (opt-in).

---

## 7. Etapas E4 — Component normalization

**Tikslas.** Pridėti 3 mažus primitivus į `src/components/ui/`, kurių trūkimas šiandien sukelia stiliaus dubliavimą. **Kiekvienas primitive turi turėti bent 1 realų panaudojimą šiame etape** — kitaip pažeidžia rule §7 (nesukurti „dead“ primitives).

### Task E4.1 — `Eyebrow` primitive

|                     |                                                                                                                                                                                                                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | CODING_AGENT (su UI_UX_AGENT review)                                                                                                                                                                                                                                                                                       |
| **Inputas**         | `src/components/ui/Card.tsx` (kaip API etalono pavyzdys), GOLDEN_STANDARD §1 (text-xs tipografija)                                                                                                                                                                                                                         |
| **Outputas**        | `src/components/ui/Eyebrow.tsx` — komponentas: `<Eyebrow icon={LucideIcon?} accent={ColorKey}>{children}</Eyebrow>`. Stiluje: `text-xs font-semibold uppercase tracking-wider` + `text-{accent}-700 dark:text-{accent}-300` + `flex items-center gap-2 mb-2`. `accent` defaults to `brand`. Pridėtas `index.ts` export'as. |
| **Token bud.**      | ~3K                                                                                                                                                                                                                                                                                                                        |
| **Sudėtingumas**    | S                                                                                                                                                                                                                                                                                                                          |
| **Priklausomybės**  | nė vienos                                                                                                                                                                                                                                                                                                                  |
| **Exit-kriterijai** | 1. Komponentas su 4–6 accent variantais (`brand`, `accent`, `slate`, `emerald`, `violet`, `cyan` — atitinka §1 modulio palette). 2. Tailwind safelist tikrinta — visos spalvos jau yra. 3. JSDoc su naudojimo pavyzdžiu. 4. Unit testas (smoke) `src/components/ui/__tests__/Eyebrow.test.tsx`.                            |
| **Rollback**        | `git rm src/components/ui/Eyebrow*`.                                                                                                                                                                                                                                                                                       |

### Task E4.2 — `IconChip` primitive

|                     |                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | CODING_AGENT                                                                                           |
| **Inputas**         | E4.1 patternai                                                                                         |
| **Outputas**        | `src/components/ui/IconChip.tsx` — `<IconChip icon={LucideIcon} role={'role-key'} size={'sm'           | 'md' | 'lg'} />`. Naudojama callout'uose, kortelėse — apvali piktograma su `bg-{role}-100 text-{role}-700 dark:bg-{role}-900/30 dark:text-{role}-300`. Role žemėlapis: `cta`(accent),`info`(brand),`warn`(amber),`success`(emerald),`error` (rose). |
| **Token bud.**      | ~3K                                                                                                    |
| **Sudėtingumas**    | S                                                                                                      |
| **Priklausomybės**  | nė vienos (paralelai su E4.1)                                                                          |
| **Exit-kriterijai** | 1. 5 role'ės. 2. 3 dydžiai (`sm=28px`, `md=36px`, `lg=44px` — atitinka touch target). 3. Smoke testas. |
| **Rollback**        | `git rm`.                                                                                              |

### Task E4.3 — `SectionDivider` primitive

|                     |                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | CODING_AGENT                                                                                                                                                                                                                                                                                                      |
| **Inputas**         | `index.css` — esami `.glass-card`, `.hover-card` analogai                                                                                                                                                                                                                                                         |
| **Outputas**        | `src/components/ui/SectionDivider.tsx` — `<SectionDivider label?={string} accent?={ColorKey} />` — horizontalus separator'is (1px linija `border-t border-{accent}-200 dark:border-{accent}-800`) su optional label centre (`bg-white dark:bg-gray-900 px-3 text-xs uppercase tracking-wider text-{accent}-700`). |
| **Token bud.**      | ~3K                                                                                                                                                                                                                                                                                                               |
| **Sudėtingumas**    | S                                                                                                                                                                                                                                                                                                                 |
| **Priklausomybės**  | nė vienos (paralelai)                                                                                                                                                                                                                                                                                             |
| **Exit-kriterijai** | 1. 2 variantai (su label / be label). 2. Smoke testas.                                                                                                                                                                                                                                                            |
| **Rollback**        | `git rm`.                                                                                                                                                                                                                                                                                                         |

### Task E4.4 — Proof of usage (po vieną panaudojimą)

|                     |                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentas**         | UI_UX_AGENT + CODING_AGENT                                                                                                                                                                                                                                                                                                                                                           |
| **Inputas**         | E4.1–E4.3 primitivai; ModulesPage / Intro slide kaip taikinai                                                                                                                                                                                                                                                                                                                        |
| **Outputas**        | **3 mažus diff'us**, po 1 panaudojimą kiekvienam: <br/>(a) `Eyebrow` → `ModulesPage.tsx` kortelės top vieta (Modulis N · Mokymas) — pakeičia esamą inline badge'ą; <br/>(b) `IconChip` → `Banner.tsx` ikona prie variant (jei jau yra) arba `ModuleCompleteScreen` „Kur pritaikyti?“ blokas; <br/>(c) `SectionDivider` → `ContentSlides.tsx` `SummarySlide` tarp 4-to ir 5-to bloko. |
| **Token bud.**      | ~6K                                                                                                                                                                                                                                                                                                                                                                                  |
| **Sudėtingumas**    | M                                                                                                                                                                                                                                                                                                                                                                                    |
| **Priklausomybės**  | E4.1, E4.2, E4.3                                                                                                                                                                                                                                                                                                                                                                     |
| **Exit-kriterijai** | 1. Kiekvienas primitive turi ≥1 panaudojimą. 2. `npm run lint`, `npm run typecheck`, `npm test` praeina. 3. Vizualus regress 2 skaidrėse (ModulesPage, M1 summary).                                                                                                                                                                                                                  |
| **Rollback**        | `git revert` per task'ą — 3 atskiri commit'ai.                                                                                                                                                                                                                                                                                                                                       |

### Task E4.5 — UI primitive katalogo atnaujinimas

|                     |                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentas**         | QA_AGENT                                                                                                                                                                                               |
| **Inputas**         | `src/components/ui/index.ts`; egzistuojantys primitives                                                                                                                                                |
| **Outputas**        | `index.ts` papildytas su Eyebrow, IconChip, SectionDivider export'ais. Pridėta `src/components/ui/README.md` (jei nėra) — trumpas katalogas su API ir naudojimo pavyzdžiais (po 5 eilutes kiekvienam). |
| **Token bud.**      | ~4K                                                                                                                                                                                                    |
| **Sudėtingumas**    | S                                                                                                                                                                                                      |
| **Priklausomybės**  | E4.1–E4.4                                                                                                                                                                                              |
| **Exit-kriterijai** | `index.ts` turi 7 export'us (LoadingSpinner, ErrorBoundary, Card, CTAButton, Banner, Table, + 3 nauji). README turi 7 sekcijas.                                                                        |
| **Rollback**        | `git revert`.                                                                                                                                                                                          |

**Etapo E4 exit-kriterijai.** 3 nauji primitivai sukurti, kiekvienas turi 1+ realų panaudojimą, katalogas atnaujintas. **Migravimas senose vietose — NE v0.2 darbas.**

---

## 8. Etapas E5 — Module identity layer

**Tikslas.** Modulis 4 vizualiai ≠ Modulis 1 per 1 sekundę. Tik 3 vietos. Tik 6 moduliai (M1–M6 — pilnai įgyvendinti).

### Task E5.1 — schema atnaujinimas (`modules.schema.json`)

|                     |                                                                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | DATA_AGENT                                                                                                                                                                                               |
| **Inputas**         | `scripts/schemas/modules.schema.json`                                                                                                                                                                    |
| **Outputas**        | Schema papildyta optional laukais:<br/>- `module.accent`: enum [`brand`, `slate`, `emerald`, `violet`, `cyan`, `accent`]<br/>- `module.identityIcon`: string (lucide icon name, validuojamas pattern'u). |
| **Token bud.**      | ~3K                                                                                                                                                                                                      |
| **Sudėtingumas**    | XS                                                                                                                                                                                                       |
| **Priklausomybės**  | nė vienos                                                                                                                                                                                                |
| **Exit-kriterijai** | 1. `npm run validate:schema` praeina (laukai optional). 2. Schema turi `description` kiekvienam laukui su nuoroda į šį planą.                                                                            |
| **Rollback**        | `git revert`.                                                                                                                                                                                            |

### Task E5.2 — `modules.json` (M1–M6) data pridėjimas

|                     |                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | DATA_AGENT                                                                                                                                          |
| **Inputas**         | §1 lentelė (accent + identityIcon žemėlapis)                                                                                                        |
| **Outputas**        | `src/data/modules.json` — M1–M6 modulių objektams pridedami `accent` ir `identityIcon` laukai pagal §1 lentelę. M7–M15 — palieka tuščia (optional). |
| **Token bud.**      | ~3K                                                                                                                                                 |
| **Sudėtingumas**    | XS                                                                                                                                                  |
| **Priklausomybės**  | E5.1                                                                                                                                                |
| **Exit-kriterijai** | 1. `npm run validate:schema` praeina. 2. M1–M6 turi abu laukus. 3. M7–M15 — nepakeisti.                                                             |
| **Rollback**        | `git revert`.                                                                                                                                       |

### Task E5.3 — `modules-en.json` ir `modules-m1-m6.json` sinchronas

|                     |                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | DATA_AGENT                                                                                                                                                                |
| **Inputas**         | E5.2 pakeitimai                                                                                                                                                           |
| **Outputas**        | `src/data/modules-en.json` (M1–M6) ir `src/data/modules-m1-m6.json` — tie patys `accent` + `identityIcon` laukai. (Šie laukai language-agnostic, todėl vertimo nereikia.) |
| **Token bud.**      | ~3K                                                                                                                                                                       |
| **Sudėtingumas**    | XS                                                                                                                                                                        |
| **Priklausomybės**  | E5.2                                                                                                                                                                      |
| **Exit-kriterijai** | Visi 3 JSON failai turi tuos pačius modulių `accent` ir `identityIcon` laukus. `validate:schema` praeina.                                                                 |
| **Rollback**        | `git revert`.                                                                                                                                                             |

### Task E5.4 — `ModulesPage` card top bar — `module.accent`

|                     |                                                                                                                                                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | CODING_AGENT (su UI_UX_AGENT)                                                                                                                                                                                                                                                   |
| **Inputas**         | `src/components/ModulesPage.tsx` — `useLevelStyles` ir gradient bar                                                                                                                                                                                                             |
| **Outputas**        | `useLevelStyles` papildyta optional `accent` parameter; gradient bar (top 4px) naudoja `bg-{accent}-500` jei `module.accent` egzistuoja, antraip — esamas `learn/test/practice` gradient. **`practice` lygis** taip pat gauna emerald differentiation (žr. v0.1 audito LHF #5). |
| **Token bud.**      | ~5K                                                                                                                                                                                                                                                                             |
| **Sudėtingumas**    | M                                                                                                                                                                                                                                                                               |
| **Priklausomybės**  | E5.2                                                                                                                                                                                                                                                                            |
| **Exit-kriterijai** | 1. M1–M6 kortelės turi 6 skirtingas top stripe spalvas. 2. `npm run lint`, `npm test` praeina. 3. Vizualus regress: ModulesPage prieš/po.                                                                                                                                       |
| **Rollback**        | `git revert`.                                                                                                                                                                                                                                                                   |

### Task E5.5 — Intro slide eyebrow su `module.identityIcon`

|                     |                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | CODING_AGENT                                                                                                                                                                                                                                                                                                                                |
| **Inputas**         | `src/components/slides/types/content/ActionIntroSlide.tsx`; E4.1 `Eyebrow` primitive; lucide-react                                                                                                                                                                                                                                          |
| **Outputas**        | `ActionIntroSlide` virš H1 pridėtas `<Eyebrow icon={moduleIdentityIcon} accent={moduleAccent}>{`Modulis ${moduleId} · ${moduleType}`}</Eyebrow>`. Icon mapping: `BookOpen`/`ClipboardList`/`Briefcase`/`Brain`/`ClipboardCheck`/`Rocket` (dynamic import iš `lucide-react` arba įprastas import su `Record<string, LucideIcon>` mapping'u). |
| **Token bud.**      | ~5K                                                                                                                                                                                                                                                                                                                                         |
| **Sudėtingumas**    | M                                                                                                                                                                                                                                                                                                                                           |
| **Priklausomybės**  | E4.1, E5.2                                                                                                                                                                                                                                                                                                                                  |
| **Exit-kriterijai** | 1. M1–M6 intro skaidrės turi 6 skirtingas eyebrow piktogramas + spalvas. 2. `npm test` praeina. 3. Skaidrės nepasikeičia layout'u (eyebrow telpa virš H1 esamoje vietoje).                                                                                                                                                                  |
| **Rollback**        | `git revert`.                                                                                                                                                                                                                                                                                                                               |

### Task E5.6 — Section-break badge — `module.accent`

|                     |                                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | CODING_AGENT                                                                                                                                                                                                                                                                     |
| **Inputas**         | `src/components/slides/types/ContentSlides.tsx` → `SectionBreakSlide` (GOLDEN_STANDARD §3.4c)                                                                                                                                                                                    |
| **Outputas**        | Section badge (`sectionNumber`, pvz. „4.1“) naudoja `bg-{moduleAccent}-100 text-{moduleAccent}-700` vietoj fiksuoto brand. **Celebration hero ir spinoff CTA — NEpalieka** (lieka brand / accent pagal §3.4c — modulio savitumas balansuojamas su sistemos vientisumu, rule §4). |
| **Token bud.**      | ~3K                                                                                                                                                                                                                                                                              |
| **Sudėtingumas**    | S                                                                                                                                                                                                                                                                                |
| **Priklausomybės**  | E5.2                                                                                                                                                                                                                                                                             |
| **Exit-kriterijai** | 1. M4 section-break badge violet'as, M5 cyan, M6 accent. 2. Hero ir spinoff lieka tokie patys. 3. `npm test` praeina.                                                                                                                                                            |
| **Rollback**        | `git revert`.                                                                                                                                                                                                                                                                    |

### Task E5.7 — Vizualinis regress + dark mode patikra

|                     |                                                                                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentas**         | QA_AGENT                                                                                                                                                                                                                                                                                   |
| **Inputas**         | E5.4–E5.6 pakeitimai; `npm run dev` arba preview build                                                                                                                                                                                                                                     |
| **Outputas**        | `docs/archive/development/analysis/MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md` — 12 screenshot'ų (6 moduliai × 2 vietos: ModulesPage card + intro skaidrė) light + dark mode. **Privaloma:** patikrinta GOLDEN_STANDARD §2.2 — vienoje skaidrėje max 2 semantinės + 1 CTA accent (rule §5). |
| **Token bud.**      | ~3K                                                                                                                                                                                                                                                                                        |
| **Sudėtingumas**    | S                                                                                                                                                                                                                                                                                          |
| **Priklausomybės**  | E5.4, E5.5, E5.6                                                                                                                                                                                                                                                                           |
| **Exit-kriterijai** | 1. Visi 12 screenshot'ų. 2. Kontrasto patikra (WCAG AA) — accent text ant 50 bg, accent text ant 900/20 bg dark mode. 3. Rule §5 patvirtinta.                                                                                                                                              |
| **Rollback**        | Nereikia (tik dokumentas).                                                                                                                                                                                                                                                                 |

**Etapo E5 exit-kriterijai.** Schema papildyta, M1–M6 data laukai pridėti (3 JSON failuose), 3 UI vietos (card, intro, section-break) naudoja modulio identitetą, vizualinis regress dokumentuotas. **Diagramose, CTA, body — accent NEnaudojama.**

---

## 9. Etapas E6 — Microcopy QA pass (be turinio keitimo!)

**Tikslas.** Pažymėti, NE pakeisti. CONTENT_AGENT'ui paruošiamas backlog'as v0.3 ar vėlesniam darbui.

### Task E6.1 — `scripts/audit-footer-length.mjs` jau egzistuoja, tik patikrinti

|                     |                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT                                                                                                                                                                  |
| **Inputas**         | `scripts/audit-footer-length.mjs` (jau yra)                                                                                                                               |
| **Outputas**        | Paleisti `node scripts/audit-footer-length.mjs`; rezultatas užregistruotas `docs/archive/development/analysis/MICROCOPY_LENGTHS_2026-05.md` skyriuje „Footers >55 chars“. |
| **Token bud.**      | ~2K                                                                                                                                                                       |
| **Sudėtingumas**    | XS                                                                                                                                                                        |
| **Priklausomybės**  | nė vienos                                                                                                                                                                 |
| **Exit-kriterijai** | Dokumente yra sąrašas (gali būti tuščias — tai irgi rezultatas).                                                                                                          |
| **Rollback**        | `git rm`.                                                                                                                                                                 |

### Task E6.2 — Manualinis microcopy pass M1, M4, M6

|                     |                                                                                                                                                                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT + CONTENT_AGENT (read-only)                                                                                                                                                                                                                                                                     |
| **Inputas**         | `src/data/modules.json` M1, M4, M6 skaidrės; GOLDEN_STANDARD §4.4 (trumpi sakiniai iki ~20 žodžių, max 2 eilutės content-block sekcijoje)                                                                                                                                                                |
| **Outputas**        | `docs/archive/development/analysis/MICROCOPY_LENGTHS_2026-05.md` skyriai: „M1 — pertekliniai tekstai“, „M4 — pertekliniai tekstai“, „M6 — pertekliniai tekstai“. **Tik sąrašas su lokacijomis** (skaidrė ID + sekcijos heading + dabartinis tekstas), **be pasiūlymų**. CONTENT_AGENT'as nuspręs vėliau. |
| **Token bud.**      | ~6K                                                                                                                                                                                                                                                                                                      |
| **Sudėtingumas**    | M                                                                                                                                                                                                                                                                                                        |
| **Priklausomybės**  | E6.1                                                                                                                                                                                                                                                                                                     |
| **Exit-kriterijai** | 1. Kiekvienam moduliui (M1/M4/M6) ≥3 įrašai (arba „nieko nerasta“ aiškiai parašyta). 2. Jokių JSON pakeitimų.                                                                                                                                                                                            |
| **Rollback**        | `git rm`.                                                                                                                                                                                                                                                                                                |

### Task E6.3 — Microcopy backlog'as TODO.md'e

|                     |                                                                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT                                                                                                                                                                           |
| **Inputas**         | E6.2 dokumentas                                                                                                                                                                    |
| **Outputas**        | `TODO.md` „P3 — žemesnis prioritetas“ skyriuje pridėta eilutė „**Microcopy v0.3 backlog** — žr. `docs/archive/development/analysis/MICROCOPY_LENGTHS_2026-05.md` (CONTENT_AGENT)“. |
| **Token bud.**      | ~1K                                                                                                                                                                                |
| **Sudėtingumas**    | XS                                                                                                                                                                                 |
| **Priklausomybės**  | E6.2                                                                                                                                                                               |
| **Exit-kriterijai** | TODO.md turi naują eilutę.                                                                                                                                                         |
| **Rollback**        | StrReplace.                                                                                                                                                                        |

**Etapo E6 exit-kriterijai.** Backlog'as paruoštas, JOKIO turinio nepakeista, CONTENT_AGENT'as turi sąrašą v0.3 ar vėlesniam etapui.

---

## 10. Etapas E7 — Before/after dokumentacija ir release

### Task E7.1 — Vizualinis screenshot rinkinys

|                     |                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | UI_UX_AGENT (manualinis)                                                                                                                                                      |
| **Inputas**         | `npm run dev` + browser screenshot                                                                                                                                            |
| **Outputas**        | `docs/archive/development/analysis/DESIGN_SYSTEM_V0_2_VISUAL_DIFF/` — 8 screenshot'ai: ModulesPage prieš/po, M1 intro prieš/po, M4 intro prieš/po, M6 section-break prieš/po. |
| **Token bud.**      | ~1K (file references)                                                                                                                                                         |
| **Sudėtingumas**    | M (manualinis, ne agent'inis)                                                                                                                                                 |
| **Priklausomybės**  | E5 baigta                                                                                                                                                                     |
| **Exit-kriterijai** | 8 PNG failai, kiekvienas <500KB.                                                                                                                                              |
| **Rollback**        | `rm -rf` folder.                                                                                                                                                              |

### Task E7.2 — `docs/development/DESIGN_SYSTEM.md` skelet'o sukūrimas

|                     |                                                                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT                                                                                                                                                                                                                                                            |
| **Inputas**         | v0.1 audito §10.5 (DESIGN_SYSTEM.md siūloma struktūra)                                                                                                                                                                                                              |
| **Outputas**        | `docs/development/DESIGN_SYSTEM.md` — primitivų ir tokenų katalogas (10 skyrių pagal §10.5). v0.2 metu užpildoma TIK „Primitivos“ (su Eyebrow, IconChip, SectionDivider iš E4) ir „Modulio identitetas“ (su §1 lentele) skyriai. Kiti — placeholder'iai (TBD v0.3). |
| **Token bud.**      | ~6K                                                                                                                                                                                                                                                                 |
| **Sudėtingumas**    | M                                                                                                                                                                                                                                                                   |
| **Priklausomybės**  | E4 baigta, E5 baigta                                                                                                                                                                                                                                                |
| **Exit-kriterijai** | 1. Dokumentas turi 10 skyrių. 2. Bent 2 skyriai (Primitivos, Modulio identitetas) — pilni. 3. Kiti — su `_TBD v0.3_` placeholder'iu. 4. Nuoroda į GOLDEN_STANDARD §1 (tipografija) — nepakartoti to, kas jau ten yra.                                               |
| **Rollback**        | `git rm`.                                                                                                                                                                                                                                                           |

### Task E7.3 — `CHANGELOG.md` v0.2 įrašas

|                     |                                                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Agentas**         | QA_AGENT                                                                                                                                                                                                                 |
| **Inputas**         | E1–E7 commit'ai                                                                                                                                                                                                          |
| **Outputas**        | `CHANGELOG.md` `## [Unreleased]` skyriuje pridėtas `## [v0.2.0] — Design System konsolidacija ir modulio identitetas` su Added / Changed / Deprecated / Not changed / Migration notes — pagal v0.1 audito §10.6 šabloną. |
| **Token bud.**      | ~3K                                                                                                                                                                                                                      |
| **Sudėtingumas**    | S                                                                                                                                                                                                                        |
| **Priklausomybės**  | visi E1–E7                                                                                                                                                                                                               |
| **Exit-kriterijai** | CHANGELOG turi naują skyrių su 5 poskyriais.                                                                                                                                                                             |
| **Rollback**        | StrReplace.                                                                                                                                                                                                              |

### Task E7.4 — Release patikra (E2.3 baseline regression)

|                     |                                                                                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agentas**         | QA_AGENT                                                                                                                                                                                        |
| **Inputas**         | `node scripts/audit-design-tokens.mjs` rezultatas po E5                                                                                                                                         |
| **Outputas**        | Patvirtinimas, kad hex skaičius ≤ baseline (E2.2). Jei naujas hex pridėtas (E5 metu — pvz. nauja accent spalva diagramose), tai turi būti **paaiškinta** komentaru `// v0.2 — module identity`. |
| **Token bud.**      | ~2K                                                                                                                                                                                             |
| **Sudėtingumas**    | XS                                                                                                                                                                                              |
| **Priklausomybės**  | E2.2, E5                                                                                                                                                                                        |
| **Exit-kriterijai** | Hex skaičius nepablogėjo arba paaiškinimas yra.                                                                                                                                                 |
| **Rollback**        | Jei pablogėjo — rollback E5 vietos, ne v0.2 kaip visumos.                                                                                                                                       |

**Etapo E7 exit-kriterijai.** Screenshot'ai egzistuoja, DESIGN_SYSTEM.md skelet'as sukurtas, CHANGELOG papildytas, baseline regression patvirtintas. **v0.2 PARUOŠTA RELEASE'UI.**

---

## 11. Backlog'as v0.3 (out of scope — su priežastimi)

| #   | Užduotis                                                                                   | Kodėl ne v0.2                                                    |
| --- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| B1  | Diagramos `TOKENS` objektų konsolidacija į `src/components/slides/shared/diagramTokens.ts` | 19+ failų refactor — pažeidžia rule §1 (5+ failai).              |
| B2  | Tailwind safelist auditas (10 → 6 spalvų šeimos)                                           | Sulaužys runtime renderinimą jei klystamai pašalinama.           |
| B3  | `Heading` ESLint custom rule                                                               | Reikalauja AST plugin'o; tai infrastruktūra, ne micro-iteration. |
| B4  | Visi 120 skaidrių heading hierarchy normalize                                              | Sulaužys micro-spacing 100+ vietose.                             |
| B5  | Inline `style={{ ... }}` → utility klases                                                  | Diagramose dažnai būtina dinamiškumui (computeReturnPath).       |
| B6  | Sukurti `SlideShell` primitive ir migrate visus 25 tipų                                    | Refactor scope; v0.3 kandidatas.                                 |
| B7  | Pre-commit gate iš `audit-design-tokens.mjs`                                               | Užblokuos legitimius case'us (PDF generation, certificate).      |
| B8  | Modulio identity diagramose                                                                | Susilpnins rule §5 (vienas accent per skaidrę).                  |

> **DS v0.3 (2026-06-29) — modulių takų stilistika.** Backlog'o sprendimas „M7–M15 palieka tuščia" (§8 E5.2) sąmoningai pakeistas: M7–15 gavo `accent` per **taką** (sky=Duomenų analizė M7-9, fuchsia=Agentai M10-12, rose=Turinys M13-15) + `identityIcon`. Modelis „spalva=takas, lygis=gradientas+badge". Pakeisti: `ModuleAccent`/`ModuleIcon`/`ModuleIdentityIcon` tipai, `moduleIdentity.ts` (+`MODULE_ICON_MAP`), `Eyebrow`/`SectionDivider`, safelist, schema, `modules.json`. Pakeliui pataisytos M10 (`Cpu`)/M13 (`Image`) tuščios kortelių ikonos. B8 (identity diagramose) — toliau NEpaliestas.
> **DS v0.3.1 (2026-06-30) — `module.icon` = `identityIcon`.** M1–M6 kortelių ikonos suvienodintos su `identityIcon` (nebe learn/test/practice ciklas Target/Brain/Settings). `ModuleIcon` tipas = `ModuleIdentityIcon`; `validate:schema` tikrina sutapimą. Sync: `node scripts/sync-module-icons.mjs`.
> **DS v0.3.1 (2026-06-30) — brand mark.** Nav/hero/footer ženklas suvienodintas į `BrandMark` (`Zap` + gold ant `brand-900`; footer migravo iš `Sparkles`+gradiento). Konstantos `src/constants/brand.ts`; spec `BRAND_MARK_SPEC.md`; favicon sinchronizuotas su hub (`#050d14→#103b5a`, `#fbd304`).
> | B9 | Microcopy trimming M1/M4/M6 | Pažeidžia rule §2 (turinio neliečimo). |
> | B10 | `practice` vs `test` semantinis level diferenciavimas (po accent) | Ant accent virš level — perpildo identitetą. |
> | B12 | `packages/brand` extract (BrandMark + brand.ts + favicon) į promptanatomy monorepo, hub `Navbar` import | Phase 2 — atskiras PR; kontraktas `PACKAGES_BRAND_CONTRACT.md`. |

---

## 12. Sėkmės metrikos

| Metrika                                   | Baseline (v0.1)               | Tikslas (v0.2)                                | Matavimas                            |
| ----------------------------------------- | ----------------------------- | --------------------------------------------- | ------------------------------------ |
| Hex'ų skaičius `src/components/**/*.tsx`  | ~250+ (apytiksliai, bus E2.2) | ≤ baseline                                    | `scripts/audit-design-tokens.mjs`    |
| Stylinių dublikatų (Card vs .card ir co.) | 5+                            | 0 (visi turi canonical sprendimą)             | E3.1 lentelė                         |
| UI primitivų katalogo dydis               | 6                             | 9 (+3)                                        | `src/components/ui/index.ts`         |
| Modulių su identity'iu (accent + icon)    | 0                             | 6 (M1–M6)                                     | `modules.json`                       |
| Vietos UI'e su modulio identity           | 0                             | 3 (card, intro, section-break)                | E5.4–E5.6 commit'ai                  |
| Audit skriptų skaičius                    | 4                             | 5 (+1: design-tokens)                         | `scripts/audit-*.mjs`                |
| Cursor rules count                        | 9                             | 10 (+1: design-system-v02)                    | `.cursor/rules/*.mdc`                |
| Backlog'ų dokumentų                       | 0                             | 2 (DESIGN_TOKENS_BASELINE, MICROCOPY_LENGTHS) | `docs/archive/development/analysis/` |

---

## 13. Rollback planas

**Per task'ą.** Kiekvienas task'as turi atskirą `git revert` apibrėžtą `Rollback` eilutėje. Niekas task'as nepriklauso nuo daugiau nei 2 ankstesnių (galima atšaukti point'inai).

**Per etapą.** Etapas E5 (modulio identity) — vienintelis su daugiau nei 3 failais; jei reikia rollback'o: `git revert` per task'ą (E5.4, E5.5, E5.6 atskirai); JSON laukai (`module.accent`, `module.identityIcon`) — optional, todėl rollback'as komponentuose nereikalauja JSON rollback'o.

**Visas v0.2.** Jei reikia atšaukti visą v0.2: `git revert` per commit'ų grupę pagal `feat/design-system-v0.2` branch'ą. Jokie senesni failai nebuvo ištrinti (visi `@deprecated` lieka, primitivai pridėti, ne keisti).

---

## 14. Agentų skirstymas (pagal AGENT_ORCHESTRATOR.md)

| Agentas               | Task'ai                                                      | Pagrindiniai dokumentai                      |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| **CODING_AGENT**      | E2.1, E3.2, E4.1, E4.2, E4.3, E4.4 (kartu), E5.4, E5.5, E5.6 | GOLDEN_STANDARD, šis planas                  |
| **UI_UX_AGENT**       | E3.3, E4.1 review, E4.4, E5.4 (UI dalis), E7.1               | GOLDEN_STANDARD, UI_UX_AGENT.md              |
| **DATA_AGENT**        | E5.1, E5.2, E5.3                                             | modules.schema.json, DATA_AGENT.md           |
| **QA_AGENT**          | E2.2, E2.3, E4.5, E5.7, E6.1, E6.2, E6.3, E7.2, E7.3, E7.4   | RELEASE_QA_CHECKLIST.md                      |
| **CODE_REVIEW_AGENT** | E3.1, vizualinis kiekvieno etapo review                      | šis planas                                   |
| **CONTENT_AGENT**     | E6.2 (read-only — be pakeitimų)                              | PAPRASTOS_KALBOS_GAIRES.md, CONTENT_AGENT.md |

**Parallelizmas.** E2 ir E3 — gali eiti **paraleliai** (skirtingi failai, skirtingi agentai). E4.1, E4.2, E4.3 — paraleliai (skirtingi primitive failai). E5 — sekos darbas (E5.1 → E5.2 → E5.3 → E5.4 → E5.5 → E5.6 → E5.7). E6 — gali eiti paraleliai su E5 (skirtingi agentai, skirtingi failai). E7 — po visų ankstesnių.

---

## 15. Nuorodos

| Sritis                           | Failas                                                                           |
| -------------------------------- | -------------------------------------------------------------------------------- |
| **Golden standard (nelaužomas)** | `docs/development/GOLDEN_STANDARD.md`                                            |
| **Tech inventorius**             | `docs/development/GOLD_LEGACY_STANDARD.md`                                       |
| **Agentų orkestratorius**        | `docs/development/AGENT_ORCHESTRATOR.md`, `.cursor/rules/agent-orchestrator.mdc` |
| **Šio v0.2 plano Cursor rule**   | `.cursor/rules/design-system-v02.mdc` (sukurta W3)                               |
| **Auditavimo skriptas**          | `scripts/audit-design-tokens.mjs` (sukurtas W2)                                  |
| **Tokenai (esami)**              | `tailwind.config.js`, `src/design-tokens.ts`, `src/index.css`                    |
| **UI primitivai**                | `src/components/ui/` + `src/components/ui/index.ts`                              |
| **Skaidrių routing**             | `src/components/SlideContent.tsx`, `src/components/ModuleView.tsx`               |
| **Duomenys (full SOT)**          | `src/data/modules.json`, `src/data/glossary.json`, `src/data/tools.json`         |
| **Duomenys (core 1–6 profilis)** | `src/data/modules-m1-m6.json` ir kt.                                             |
| **TODO ir backlog'as**           | `TODO.md` (E6.3 atnaujins)                                                       |

---

_Šis dokumentas — vienas SOT'as v0.2 vykdymui. Tobulinimai per PR. Pabaiga v0.2 = E7.3 commit'as._
