# Docs sync checklist

> Tikslas: viena vieta po release ar didesnio Unreleased sprinto patikrinti, ar agentų įėjimo dokumentai, release/ops dokumentai ir techniniai registry atitinka faktinę kodo bazę.

**Baseline:** 1.4.2 + Unreleased  
**Testai:** 60 failų / 403 testai  
**Data:** 2026-07-06  
**Šaltiniai:** `package.json`, `CHANGELOG.md`, `docs/development/RELEASE_QA_RUN.md`, `docs/development/RELEASE_QA_CHECKLIST.md`.

## Sync lentelė

| #   | Failas                                           | Laukas                             | Buvo                                   | Turi būti                                                | Done |
| --- | ------------------------------------------------ | ---------------------------------- | -------------------------------------- | -------------------------------------------------------- | ---- |
| 1   | `README.md`                                      | versija                            | 1.4.1                                  | 1.4.2 + Unreleased nuoroda                               | [x]  |
| 2   | `docs/development/CODEBASE_WHAT_IS_DONE.md`      | release / testai / backlog         | 1.4.1, 53/323, M4 footer backlog       | 1.4.2, 60/403, MON/PDF/backlog tik aktualus              | [x]  |
| 3   | `docs/DOCUMENTATION_QUICK_REF.md`                | atnaujinimo data / vartai          | 2026-06-30, be m1012/preflight         | 2026-07-06, `audit:m1012`, `audit:release-preflight`     | [x]  |
| 4   | `docs/LEAN_INDEX.md`                             | codebase summary eilutė            | 1.4.1                                  | 1.4.2 + 60/403                                           | [x]  |
| 5   | `docs/DOCUMENTATION_INDEX.md`                    | release / aktyvūs dokumentai       | 1.4.1                                  | 1.4.2 + docs sync + M7-M12 registry                      | [x]  |
| 6   | `docs/development/VERSION_ANALIZE.md`            | versija                            | 1.4.1                                  | 1.4.2; kitas release 1.4.3 arba 1.5.0                    | [x]  |
| 7   | `docs/development/AUDIT_2026-06_SUMMARY.md`      | testų metrika                      | ~38 testų failų                        | istorinė pastaba + 60/403 dabartinis baseline            | [x]  |
| 8   | `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md` | submodule pin                      | v1.4.1 paskutinis patch                | v1.4.2 + Unreleased HEAD SHA pastaba                     | [x]  |
| 9   | `ROADMAP.md`                                     | testų metrika / M10-12 gate        | 57/367                                 | 60/403 po Unreleased; `audit:m1012` prieš M10-12 release | [x]  |
| 10  | `CHANGELOG.md`                                   | santrauka                          | 57/367                                 | 60/403 + docs sync įrašas                                | [x]  |
| 11  | `docs/development/DIAGRAMU_M7_M12_REGISTRY.md`   | M8/M10 statusai                    | keli pasenę „Reikia“ / „Registry only“ | deep-link/shell/test statusai pagal Unreleased           | [x]  |
| 12  | `docs/development/GOLD_LEGACY_STANDARD.md`       | release header / AgentOrchestrator | 1.4.1 / aktyvus inventorius            | 1.4.2 / deprecated + M12 multi-agent eilutė              | [x]  |

## Kartojimo procedūra

1. Paleisti `npm run test:run` ir užrašyti faktinį testų failų / testų skaičių.
2. Patikrinti `package.json` `version` ir naujausią `CHANGELOG.md` release antraštę.
3. Jei yra didelis Unreleased sprintas, atskirti istorinį release skaičių nuo dabartinio HEAD skaičiaus.
4. Atnaujinti agentų įėjimo dokumentus pirmiausia: `README.md`, `DOCUMENTATION_QUICK_REF.md`, `LEAN_INDEX.md`, `DOCUMENTATION_INDEX.md`, `CODEBASE_WHAT_IS_DONE.md`.
5. Tik tada atnaujinti ops ir registry dokumentus: `VERSION_ANALIZE.md`, `AUDIT_2026-06_SUMMARY.md`, `MARKETING_HANDOFF_CHECKLIST.md`, `ROADMAP.md`, `DIAGRAMU_M7_M12_REGISTRY.md`, `GOLD_LEGACY_STANDARD.md`.

## Sąmoningai nekeisti

| Tema                                                | Kodėl                                                                                                    |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `CHANGELOG.md` `[1.4.2]` Gate eilutė su 367 testais | Tai istorinė release 1.4.2 būsena. Dabartinis HEAD skaičius fiksuojamas santraukoje ir Unreleased įraše. |
| Archyvinės analizės `docs/development/analysis/*`   | Jos aprašo konkrečios dienos auditą, ne dabartinį runtime SOT.                                           |
| `package-lock.json` versija                         | Tai npm artefaktas; keisti tik per versijavimo / install žingsnį, ne docs sync rankiniu edit'u.          |
