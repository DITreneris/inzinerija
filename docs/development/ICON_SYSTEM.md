# Icon system (Lucide + slide JSON)

> **SOT kodui:** `src/icons/types.ts` (allowlist), `src/icons/registry.ts` (named imports), `src/icons/resolveIcon.ts` (resolver).  
> **DS santrauka:** `docs/development/DESIGN_SYSTEM.md` §4b.  
> **CI:** `npm run audit:slide-icons` (įtraukta į `audit:release-preflight`).

## Naming conventions

| Kontekstas                                            | JSON laukas                    | Formatas                | Pavyzdys                       |
| ----------------------------------------------------- | ------------------------------ | ----------------------- | ------------------------------ |
| Journey, summary, intro-pie, definitions, infographic | `icon`                         | PascalCase Lucide       | `Target`, `Workflow`, `Repeat` |
| News portal KPI / tools                               | `iconKey`                      | kebab-case              | `trending-up`, `building-2`    |
| Modulio identitetas                                   | `module.icon` / `identityIcon` | PascalCase (9 reikšmės) | `BarChart3`                    |
| Legacy (vengti naujai)                                | `insights[].emoji`             | emoji                   | atskiras laukas, ne `icon`     |

**Semantika:** `Workflow` = proceso/srauto glifas; `Repeat` = iteracijos ciklas — **atskiri raktai**, ne sinonimai.

## Kontekstiniai allowlist (`src/icons/types.ts`)

| Tipas                                    | Slide type / vieta                                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `JourneyIcon`                            | `action-intro-journey` → `journeyChoices[].icon`                                                               |
| `IntroPieIcon`                           | `intro-action-pie` → `cards[].icon`                                                                            |
| `SummaryIcon`                            | `summary` → `sections[].icon`                                                                                  |
| `AspectIcon`                             | `definitions` → `aspects[].icon`                                                                               |
| `InfographicIcon`                        | `infographic`, `di-paradox`, `advanced` → `cards`, `paradoxCards`, `pipeline`, `examples`, `conclusionSection` |
| `ScenarioHubIcon`                        | `practice-scenario-hub` → `level1Choices[].icon`                                                               |
| `PortalKpiIconKey` / `PortalToolIconKey` | news-portal `iconKey`                                                                                          |
| `ModuleIcon`                             | `module.icon` / `identityIcon`                                                                                 |

## UI resolver (CODING)

- **Slide JSON ikonoms:** `resolveLucideIcon(key, context)` arba `SlideLucideIcon` (`src/icons/SlideLucideIcon.tsx`).
- **Modulio kortelei:** `resolveModuleIcon()` (`src/utils/moduleIdentity.ts` → deleguoja į registry).
- **Portal:** `resolvePortalKpiIcon` / `resolvePortalToolIcon` (`portalKpiIcons.ts`).
- **Dydžiai:** `iconSizes.ts` + `IconChip` — ne hardcoded `w-5 h-5` naujose kortelėse.

**Fallback:** nežinomas Lucide raktas → `HelpCircle` + `console.warn` (dev). **Niekada** nerodyti raw icon key teksto (pvz. `"Target"` kaip string).

**Anti-pattern:** lokalius `INTRO_PIE_ICONS` / `JOURNEY_ICONS` map'us komponentuose — viskas per `src/icons/`.

## Checklist: pridėti naują icon key

1. **Lucide komponentas** — importuoti `registry.ts` (named import, ne `import *`).
2. **Allowlist** — pridėti raktą į atitinkamą masyvą `types.ts` (pvz. `SUMMARY_ICONS`).
3. **Audit script** — atnaujinti tą patį Set `scripts/audit-slide-icons.mjs` (kol nėra auto-gen).
4. **Schema** (optional) — `scripts/schemas/modules.schema.json` `$defs/*IconKey` enum, jei slide tipas jau turi enum.
5. **JSON** — naudoti PascalCase raktą `modules.json` (full SOT); po M1–6 → `npm run generate:core-data`.
6. **Patikra** — `npm run audit:slide-icons` + `npm run validate:schema`.
7. **Testas** — jei naujas kontekstas ar regresijos rizika → `src/icons/__tests__/resolveIcon.test.ts`.

## Checklist: naujas slide tipas su ikonomis

1. DATA: apibrėžti JSON `icon` lauką + allowlist tipą `types.ts`.
2. CODING: renderinti per `resolveLucideIcon` / `SlideLucideIcon`, ne emoji string.
3. DATA: pridėti `case` į `audit-slide-icons.mjs`.
4. QA: DESIGN_SYSTEM §4b + CHANGELOG jei naujas gate ar konvencija.

## Agentai

| Agentas               | Kada                                                             |
| --------------------- | ---------------------------------------------------------------- |
| **DATA_AGENT**        | Keičia `modules.json` icon laukus; paleidžia `audit:slide-icons` |
| **CODING_AGENT**      | Render, nauji slide tipai; naudoja `src/icons/`                  |
| **CODE_REVIEW_AGENT** | Tikrina SOT → JSON → `resolveIcon` grandinę                      |
| **QA_AGENT**          | Release: `audit:release-preflight`                               |

## Pamokos (2026-07-15)

- M7 sk. 70.5 bugas: lokaliame `INTRO_PIE_ICONS` nebuvo M7 raktų → UI rodė **Lucide pavadinimą kaip tekstą** mažoje dėžutėje. Fix: centralizuotas registry + CI audit.
- `SectionIcon` anksčiau mapino `"Workflow"` → `Repeat` — neteisinga semantika; dabar `Workflow` ir `Repeat` atskirai.
- EN overlay **netransliuoja** `icon` laukų (Lucide vardai lieka EN/LT); keisti tik LT SOT + registry.
