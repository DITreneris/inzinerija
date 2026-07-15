# Versijos auditas – 2026-03-16

> **Tikslas:** Fiksuoti dabartinę projekto versiją, CHANGELOG struktūrą ir neatitikimus. Gilus tyrimas pagal kodo bazę ir changelog.

---

## 1. Dabartinė versija

| Šaltinis                              | Versija                  | Pastaba                                                            |
| ------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| **package.json**                      | **1.3.0**                | Oficiali aplikacijos versija (npm/build).                          |
| **CHANGELOG.md** – paskutinė išleista | **[1.3.0] – 2026-03-16** | Production release: deploy, integruoti mokėjimai, pirmas pirkimas. |
| **CHANGELOG.md – viršus**             | **[Unreleased]**         | Būsimi pakeitimai.                                                 |

**Išvada:** Projekto **dabartinė versija yra 1.3.0**. 2026-03-16 išleistas 1.3.0 (production, mokėjimai, pirmas pirkimas).

---

## 2. CHANGELOG struktūra ir versijų eilė

Changelog seka (nuo naujausio):

1. **[Unreleased]** – pakeitimai 2026-03-12–2026-03-16 (CI, brand, mobile, M1–M6 bug bundle, TypeScript, ESLint, deploy, Golden/Gold Legacy, swipe guard, sertifikatas, LoadingSpinner, ir kt.).
2. **[1.2.0] – 2026-02-11** – MVP release, modulių aprašymai, remediation, JSON schema, KPI/events, veiksmo skaidrės, 6 scenarijai M3, ir kt.
3. **[2.1.0] – 2026-02-02** – Error Boundary, Loading states, lazy loading, TypeScript tipai, localStorage validacija, testai, CI.
4. **[2.0.0] – 2026-02** – Skaidrės „Ką reiškia promptas“, promptų tipai, biblioteka, 13 skaidrių M1, AI→DI, Navy/Gold.
5. **[1.0.0] – 2024** – Pradinė versija, 3 moduliai, progresas, tamsusis režimas, responsive.

**Pastaba:** Datos 2.1.0 (2026-02-02) ir 2.0.0 (2026-02) yra ankstesnės nei 1.2.0 (2026-02-11). Paskutinė išleista versija – **1.3.0** (2026-03-16).

---

## 3. Kas yra „Unreleased“

„Unreleased“ bloke surašyti pakeitimai apima (trumpai):

- **CI/workflow:** Node 24 opt-in, actions v6, typecheck žingsnis, package-lock sinchronizacija.
- **Production hardening:** `.nvmrc`, `robots.txt`, favicon, apple-touch-icon, og-image, meta žymės, husky, lint-staged, `prefers-reduced-motion`, rollup-plugin-visualizer.
- **Brand/UI:** gold spalva, brand identity, AppNav/HomePage logo (Zap), dark `#0d0d0d`.
- **Mobile/UI:** M1–M6 bug bundle (locale leak'ai, Custom GPT schema, mobile reflow), swipe-lock, compact viewport, EN mobile reliktai, viena navigacija, breakpoint `md:`→`lg:` (1024px), de-clutter.
- **Fix:** Sertifikato PDF (Tier 1), LoadingSpinner duplicate key, TypeScript/ESLint regresijos, ResizeObserver guard (LlmArchDiagram), README base path.
- **Docs/struktūra:** Golden vs Gold Legacy SOT, M7 haliucinacijos, deploy inzinerija, pre-deploy auditas.

**Atnaujinta 2026-03-16:** Šie pakeitimai išleisti kaip **1.3.0** (production release, deploy, mokėjimai, pirmas pirkimas).

---

## 4. Kiti šaltiniai

| Failas                                        | Versija / nuoroda                                                                                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **docs/development/GOLD_LEGACY_STANDARD.md**  | Antraštėje: „Promptų anatomija v1.3.0“, „Production deploy būsena (v1.3.0, 2026-03-16)“. Dokumento savo versija: **1.1.0**, data 2026-03-14. |
| **docs/development/CODEBASE_WHAT_IS_DONE.md** | Atnaujinta: 2026-03-11; neversionuota.                                                                                                       |
| **docs/DOCUMENTATION_QUICK_REF.md**           | Atnaujinta: 2026-03-11 (architektūra A).                                                                                                     |
| **index.html**                                | Nėra `version` meta; title/description atitinka produktą.                                                                                    |

Nenuoseklumų: nėra. GOLD_LEGACY dokumente „v1.3.0“ nurodo **aplikacijos** versiją, o „Versija: 1.1.0“ – **dokumento** versiją.

---

## 5. Rekomenduojami žingsniai

1. **Dabartinė versija:** package.json ir CHANGELOG – **1.3.0** (2026-03-16).
2. **Kiti release:** Naujus pakeitimus rašyti po `## [Unreleased]` CHANGELOG viršuje; išleidus – įrašyti `## [1.3.1]` arba `## [1.4.0]`, atnaujinti `package.json`.
3. **Prieš release:** Vykdyti `docs/development/RELEASE_QA_CHECKLIST.md`; footer skaidrių numeriai – pagal `.cursor/rules/footer-slide-numbers.mdc` (release gate).

---

## 6. Santrauka

| Klausimas                        | Atsakymas                                                              |
| -------------------------------- | ---------------------------------------------------------------------- |
| Kokia dabar mūsų versija?        | **1.3.0** (package.json ir CHANGELOG [1.3.0] – 2026-03-16).            |
| Ar CHANGELOG atitinka tikrovę?   | Taip – viršuje [Unreleased], po to [1.3.0]; 1.2.0 ir 2.x – istoriniai. |
| Ar reikia ką nors taisyti dabar? | Nebūtina; versija 1.3.0 užfiksuota.                                    |

---

_Dokumentas sukurtas 2026-03-16; tyrimas pagal CHANGELOG.md, package.json, GOLD_LEGACY_STANDARD.md, CODEBASE_WHAT_IS_DONE.md._
