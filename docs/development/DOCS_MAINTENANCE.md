# Dokumentacijos priežiūra (ilgalaikis vadovas)

> **Tikslas:** Vienas vadovas dokumentacijos sluoksniams, dual SOT taisyklei ir release sync procedūrai. Papildo [`DOCS_SYNC_CHECKLIST.md`](DOCS_SYNC_CHECKLIST.md) (konkretūs failų diff'ai po sprinto).
> **Atnaujinta:** 2026-07-24
> **Cadence:** pilnas meta sync **prieš kiekvieną release** (1.4.x tag). Tarp release – pakanka `CHANGELOG` + `TEST_REPORT` + Feature Doc Contract (§1b) naujiems interaktyviems įrankiams.
> **Master registry:** [`TEACHING_ELEMENTS_REGISTRY.md`](TEACHING_ELEMENTS_REGISTRY.md) + [`teaching-elements-overlay.json`](teaching-elements-overlay.json); drift – `npm run audit:teaching-elements`.

---

## 1. Dokumentacijos sluoksniai

| Sluoksnis              | Kas                                       | Pavyzdžiai                                                                                                          | Kada keisti                                          |
| ---------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Turinio SOT**        | Pedagogika, struktūra, modulio intent     | `turinio_pletra*.md`, `MODULIO_*_SKAIDRIU_EILES.md`                                                                 | Nauja skaidrė, sekos keitimas, curriculum sprendimas |
| **Duomenų SOT**        | Runtime turinys                           | `modules.json`, EN overlay, `modules.schema.json`                                                                   | Po turinio SOT arba patch skripto                    |
| **Operacinis SOT**     | Iteracinis UX polish, testų žurnalas      | `TEST_REPORT.md`, `CHANGELOG [Unreleased]`, `07_08_09_backlog.md`, [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md) | Po kiekvieno funkcionalumo sprinto                   |
| **Meta dokumentacija** | Kas įgyvendinta, metrikos, agentų įėjimas | `CODEBASE_WHAT_IS_DONE.md`, `DOCUMENTATION_QUICK_REF.md`, `LEAN_INDEX.md`, `ROADMAP.md`                             | Prieš release                                        |
| **Archyvas**           | Istorinė informacija (ne SOT)             | `docs/archive/`                                                                                                     | Retai; per release peržiūra                          |

**Konflikto tvarka:** Turinio SOT → JSON → UI. Operacinis SOT **nepakeičia** turinio SOT struktūriniams pakeitimams.

---

## 1b. Feature Doc Contract (nauji interaktyvūs mokymo įrankiai)

Kai pridedamas naujas interaktyvus mokymo įrankis (`sections[].image`, off-renderer diagrama, ChoiceControl lab, naujas embed laukas), prieš „done“:

1. **Curriculum SOT** + skaidrių eilė (`turinio_pletra*`, `MODULIO_*_SKAIDRIU_EILES.md`) – jei nauja skaidrė.
2. **Master overlay** – eilutė [`teaching-elements-overlay.json`](teaching-elements-overlay.json) (`elementId`, Pattern, Shell Y/N/n/a, render) **prieš** JSON; žr. [`TEACHING_ELEMENTS_REGISTRY.md`](TEACHING_ELEMENTS_REGISTRY.md).
3. **Satelitas** (detalės) – diagram/lab: `DIAGRAMU_M7_M12_REGISTRY.md` / `DIAGRAMU_M13_M15_REGISTRY.md` pagal modulį; `DIAGRAMU_M1_M9_AUDITAS.md` = rubrika (ne privalomas inventorius).
4. **Jei keičiasi UI primityvas** → `GOLDEN_STANDARD.md` + `src/components/ui/README.md` consumers.
5. **Agentų savininkų docs** – SCHEME / CONTENT / DATA / UI_UX / CODING pagal taikomumą (įsk. §2.2c jei Shell = Ne).
6. **Viena `lessons.md` eilutė** kiekvienam agentui, kuris rado pitfall.
7. **`CHANGELOG`** Unreleased; prieš release – meta indeksai per [`DOCS_SYNC_CHECKLIST.md`](DOCS_SYNC_CHECKLIST.md) + `npm run audit:teaching-elements --strict`.
8. **Blokuojantis drift:** naujas `image` key / off-renderer / lab be master overlay Pattern + Shell.

Pavyzdys (2026-07-23): M10 `m10_human_control_simulator` – Pattern `interactive-control-lab`, Shell: Ne; W1.1 risk strip + lab CopyButton artefaktas (ne JSON copy wall).

---

## 1c. Docs Lean rules

Agentų konteksto taršos kontrolė (TODO §1.0h DL-\*):

1. **`TODO.md` §1** = tik **open** P0/P1 (ir aiškūs P2 `[ ]`). Done epic’ai → `docs/archive/` snapshot + trumpa §2 santrauka; neatnaujink Done lentelių §1.
2. **`LEAN_INDEX.md`** ≤ **25** keliai; ANALIZE / PLAN snapshot / backlog / GOLD_LEGACY **ne** lean core.
3. **Indeksai:** `DOCUMENTATION_QUICK_REF.md` = startas; LEAN = minimalus rinkinys; `DOCUMENTATION_INDEX.md` = pilnas katalogas.
4. **Archyvas** (`docs/archive/`) = ne SOT. Konfliktas → turinio SOT / `TEACHING_ELEMENTS_REGISTRY` / `GOLDEN_STANDARD`.
5. **Audit ≠ primary SOT:** gyvas inventorius = Teaching Elements overlay; `DIAGRAMU_M1_M9_AUDITAS` = rubrika / istorinis smoke.

---

## 2. Dual SOT taisyklė (M7–M9 ir panašūs polish sprintai)

### Struktūriniai pakeitimai → `turinio_pletra*`

- Nauja skaidrė ar modulio seka
- Naujas `pathBranch` / journey choice
- Curriculum sprendimas (pvz. optional šaka „Vidiniai duomenys“)
- Naujas slide tipas

**Pipeline:** CURRICULUM → CONTENT (`turinio_pletra*`) → DATA (`modules.json`) → CODING.

### Iteracinis UX polish → operacinis SOT

- Collapsible / dedup / Patikra microcopy
- `toolChoiceBar` + `linkedRowIndex` filtrai
- M9 scenarijų intro, hub CTA
- UI-only pataisymai (pvz. `HallucinationRatesDashboard` intro)

**Pipeline:** CONTENT (microcopy spec) → patch skriptas → `modules.json` → įrašas į `TEST_REPORT` + `CHANGELOG` + [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md).

**Ne reikalauti** pilno `turinio_pletra_moduliai_7_8_9.md` rewrite kiekvienam polish – pakanka **rodyklės** bloke „Operacinis polish“ + operacinio žurnalo.

Žr. [`dod_01.md`](dod_01.md) §2 – CONTENT handoff išimtis.

---

## 3. Release vartas (prieš 1.4.x tag, ~30–45 min)

1. `npm run test:run` → užfiksuoti N failų / M testų
2. [`DOCS_SYNC_CHECKLIST.md`](DOCS_SYNC_CHECKLIST.md) – nauja lentelė (data, N/M, Unreleased scope)
3. Atnaujinti meta doc metrikas: [`CODEBASE_WHAT_IS_DONE.md`](CODEBASE_WHAT_IS_DONE.md), [`ROADMAP.md`](../../ROADMAP.md), [`LEAN_INDEX.md`](../LEAN_INDEX.md)
4. [`CHANGELOG.md`](../../CHANGELOG.md) – §„Kas įgyvendinta“ + paruoštas `[1.4.x]` blokas
5. [`TEST_REPORT.md`](TEST_REPORT.md) – nėra `nauja` be statuso / veiksmo
6. `node scripts/validate-sot-index.mjs`
7. [`RELEASE_QA_CHECKLIST.md`](RELEASE_QA_CHECKLIST.md) §Docs sync + `npm run audit:release-preflight`
8. Dual SOT: ar struktūriniai pakeitimai atspindėti `turinio_pletra*` (ne tik JSON)

**Ne release blokeris:** rankinis 375px browser smoke (`TEST_REPORT` ⬜).

---

## 4. Savininkai

| Veikla                             | Agentas / rolė              |
| ---------------------------------- | --------------------------- |
| Meta sync (metrikos, indeksai)     | QA_AGENT                    |
| Schema, patch registry, EN overlay | DATA_AGENT                  |
| Turinio SOT struktūra              | CONTENT / CURRICULUM        |
| `modules.schema.json` nauji laukai | DATA_AGENT + CODING (tipai) |

---

## 5. Drift signalai (kada docs „atsilikę“)

| Signalas                                                   | Kur tikrinti                                                                        | Veiksmas                                                            |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Testų skaičius                                             | `CODEBASE_WHAT_IS_DONE`, `ROADMAP`, `CHANGELOG` santrauka                           | `npm run test:run` → sync                                           |
| Backlog „problema“ vs kodas                                | `07_08_09_backlog.md` §4.6                                                          | `grep` modules.json → atnaujinti statusą                            |
| Naujas JSON laukas be schemos                              | `modules.schema.json`, `modules.ts`                                                 | DATA formalizuoja                                                   |
| EN LT liekanos                                             | `npm run audit:m79`                                                                 | Pilnas EN `sections[]` veidrodis (žr. M79 registry)                 |
| Pasenęs SOT aprašymas                                      | `turinio_pletra*` vs JSON                                                           | Rodyklė arba struktūrinis atnaujinimas                              |
| Naujas `image` key / lab / off-renderer be Pattern / Shell | `teaching-elements-overlay.json` + satelitai vs `diagramRenderers` / `modules.json` | `audit:teaching-elements --strict`; Feature Doc §1b; blokuoti merge |

---

## 6. Ką sąmoningai nekeisti

| Tema                                       | Kodėl                                             |
| ------------------------------------------ | ------------------------------------------------- |
| `CHANGELOG [1.4.x]` istoriniai gate įrašai | Istorinė release būsena                           |
| `docs/archive/*`                           | Vienkartinės analizės – ne runtime SOT            |
| `package-lock.json` versija                | Keičiasi per `npm install`, ne rankiniu docs edit |

---

## 7. Nuorodos

| Dokumentas                                                                   | Paskirtis                                  |
| ---------------------------------------------------------------------------- | ------------------------------------------ |
| [`DOCS_SYNC_CHECKLIST.md`](DOCS_SYNC_CHECKLIST.md)                           | Konkretūs failų diff'ai po sprinto         |
| [`TEACHING_ELEMENTS_REGISTRY.md`](TEACHING_ELEMENTS_REGISTRY.md)             | Master mokymo elementų registry + brandą   |
| [`M79_PATCH_REGISTRY.md`](M79_PATCH_REGISTRY.md)                             | M7–M9 patch skriptai ir EN merge taisyklės |
| [`RELEASE_QA_CHECKLIST.md`](RELEASE_QA_CHECKLIST.md) §Docs sync              | Release checklist                          |
| [`context-engineering/sot_index.json`](context-engineering/sot_index.json)   | Modulių ir SOT registras                   |
| [`.cursor/skills/qa-agent/SKILL.md`](../../.cursor/skills/qa-agent/SKILL.md) | QA_AGENT workflow                          |
