# Design Tokens — Baseline 2026-05

> **Tikslas:** Užfiksuoti Design System v0.2 pradinę būklę (hex spalvų, inline style, SVG fill/stroke literalų skaičių) **prieš** E3–E5 etapus. Tai „prieš/po“ matavimo etalonas E7.4 release patikroms.
>
> **SOT (planas):** [`docs/development/DESIGN_SYSTEM_V0_2.md §5`](../DESIGN_SYSTEM_V0_2.md) (Etapas E2 — Token inventory).
> **Skriptas:** [`scripts/audit-design-tokens.mjs`](../../../scripts/audit-design-tokens.mjs) (warn-only, exit 0).
> **Task ID:** **E2.2** (QA_AGENT) — baseline dokumentas.
> **Data:** 2026-05-19. **Agentas:** QA_AGENT.

---

## 1. Suvestinė

| Metrika                                           | Reikšmė |
| ------------------------------------------------- | ------- |
| Skaitytų `.ts(x)` failų                           | **164** |
| Failų su radiniais (>0)                           | **41**  |
| Hex literal'ai (`#abc` / `#abcdef` / `#aabbccdd`) | **351** |
| Inline `style={{ ... }}` su spalvų savybėmis      | **13**  |
| SVG `fill="#..."` / `stroke="#..."`               | **116** |
| **TOTAL findings**                                | **480** |

> **Pastaba.** „False positive"-ai (`#fff`, `#000`, `#ffffff`, `#000000`) skripte yra praleidžiami — į skaičių **480** jie neįeina. Skenuoti katalogai: `src/components/**`, `src/utils/**`. Praleisti: `*.test.tsx`, `*.d.ts`, `node_modules/`.

**Komanda atkartoti:**

```bash
node scripts/audit-design-tokens.mjs --json
node scripts/audit-design-tokens.mjs --top=20
```

---

## 2. Pagal direktorijas

| Direktorija                     | Failų su radiniais | Findings | Dalis nuo bendro |
| ------------------------------- | ------------------ | -------- | ---------------- |
| `src/components/slides/shared/` | 30                 | 440      | 91.7 %           |
| `src/components/slides/types/`  | 2                  | 20       | 4.2 %            |
| `src/components/` (root)        | 4                  | 10       | 2.1 %            |
| `src/utils/`                    | 5                  | 10       | 2.1 %            |
| **Iš viso**                     | **41**             | **480**  | **100 %**        |

**Pastaba (rule §7).** Pagrindinis „nešvarumo" šaltinis — diagramos (`slides/shared/*Diagram*.tsx`, `*Config.ts`) su lokaliais `TOKENS = { ... '#hex' }` objektais. Pagal `.cursor/rules/design-system-v02.mdc` §7 jie **v0.2 metu nepalietami** — tik flag'inami čia. Refactor planuojamas v0.3 (Backlog **B1**, žr. plano §11).

---

## 3. Top-5 „dirtiest" failai

| #   | Failas                                                      | Total  | hex | inline | svg | v0.3 backlog     |
| --- | ----------------------------------------------------------- | ------ | --- | ------ | --- | ---------------- |
| 1   | `src/components/slides/shared/CustomGptProcessDiagram.tsx`  | **42** | 24  | 0      | 18  | B1 (TOKENS)      |
| 2   | `src/components/slides/shared/LlmArchDiagramDiagram.tsx`    | **25** | 15  | 10     | 0   | B1 + B5 (inline) |
| 3   | `src/components/slides/shared/M10SpecIncidentDiagram.tsx`   | **24** | 12  | 0      | 12  | B1               |
| 4   | `src/components/slides/shared/LlmAutoregressiveDiagram.tsx` | **23** | 20  | 0      | 3   | B1               |
| 5   | `src/components/slides/shared/M13RuleOfThirdsDiagram.tsx`   | **20** | 10  | 0      | 10  | B1               |

> Šie 5 failai sudaro **134 / 480 = 27.9 %** visų radinių. Konsolidavimas į `src/components/slides/shared/diagramTokens.ts` (Backlog B1) duotų didžiausią ROI v0.3 etape.

---

## 4. Pilnas sąrašas (visi 41 failai su radiniais > 0)

| Failas                                                             | Total | hex | inline | svg |
| ------------------------------------------------------------------ | ----- | --- | ------ | --- |
| `src/components/slides/shared/CustomGptProcessDiagram.tsx`         | 42    | 24  | 0      | 18  |
| `src/components/slides/shared/LlmArchDiagramDiagram.tsx`           | 25    | 15  | 10     | 0   |
| `src/components/slides/shared/M10SpecIncidentDiagram.tsx`          | 24    | 12  | 0      | 12  |
| `src/components/slides/shared/LlmAutoregressiveDiagram.tsx`        | 23    | 20  | 0      | 3   |
| `src/components/slides/shared/M13RuleOfThirdsDiagram.tsx`          | 20    | 10  | 0      | 10  |
| `src/components/slides/shared/M15PracticeLoopDiagram.tsx`          | 20    | 11  | 0      | 9   |
| `src/components/slides/shared/DiPrezentacijosWorkflowDiagram.tsx`  | 18    | 12  | 0      | 6   |
| `src/components/slides/shared/M7DataPrepWorkflowDiagram.tsx`       | 18    | 12  | 0      | 6   |
| `src/components/slides/shared/M7ThreeAgentsDiagram.tsx`            | 18    | 11  | 0      | 7   |
| `src/components/slides/shared/M9DataWorkflowDiagram.tsx`           | 18    | 12  | 0      | 6   |
| `src/components/slides/shared/TurinioWorkflowDiagram.tsx`          | 18    | 12  | 0      | 6   |
| `src/components/slides/shared/contextEngineeringPipelineConfig.ts` | 16    | 16  | 0      | 0   |
| `src/components/slides/shared/M10ToolDecisionTreeDiagram.tsx`      | 16    | 11  | 0      | 5   |
| `src/components/slides/shared/M10TriggerFlowDiagram.tsx`           | 16    | 10  | 0      | 6   |
| `src/components/slides/shared/RlProcessDiagram.tsx`                | 16    | 16  | 0      | 0   |
| `src/components/slides/shared/workflowComparisonConfig.ts`         | 16    | 16  | 0      | 0   |
| `src/components/slides/shared/M12ThreeLabsDiagram.tsx`             | 13    | 8   | 0      | 5   |
| `src/components/slides/shared/M7AnalysisTypesDiagram.tsx`          | 12    | 8   | 0      | 4   |
| `src/components/slides/types/ContentSlides.tsx`                    | 12    | 12  | 0      | 0   |
| `src/components/slides/shared/Schema4Diagram.tsx`                  | 11    | 11  | 0      | 0   |
| `src/components/slides/shared/ContextFlowDiagram.tsx`              | 10    | 10  | 0      | 0   |
| `src/components/slides/shared/M10ThreeAStrategyDiagram.tsx`        | 10    | 8   | 0      | 2   |
| `src/components/slides/shared/Schema3InteractiveDiagram.tsx`       | 10    | 10  | 0      | 0   |
| `src/components/slides/shared/AgentWorkflowDiagram.tsx`            | 9     | 9   | 0      | 0   |
| `src/components/slides/shared/M13AecFunnelDiagram.tsx`             | 9     | 6   | 0      | 3   |
| `src/components/slides/shared/RadarChart.tsx`                      | 8     | 4   | 0      | 4   |
| `src/components/slides/shared/Schema3Diagram.tsx`                  | 8     | 8   | 0      | 0   |
| `src/components/slides/types/content/IntroActionPieSlide.tsx`      | 8     | 8   | 0      | 0   |
| `src/components/slides/shared/M13PromptStackDiagram.tsx`           | 6     | 4   | 0      | 2   |
| `src/components/slides/shared/InstructGptQualityBlock.tsx`         | 5     | 5   | 0      | 0   |
| `src/components/CertificateScreen.tsx`                             | 4     | 3   | 1      | 0   |
| `src/components/slides/shared/TestKnowledgeScopeDiagram.tsx`       | 4     | 2   | 0      | 2   |
| `src/utils/introPiePdf.ts`                                         | 4     | 4   | 0      | 0   |
| `src/components/Celebration.tsx`                                   | 2     | 2   | 0      | 0   |
| `src/components/CircularProgress.tsx`                              | 2     | 2   | 0      | 0   |
| `src/components/HallucinationRatesDashboard.tsx`                   | 2     | 1   | 1      | 0   |
| `src/utils/certificatePdf.ts`                                      | 2     | 2   | 0      | 0   |
| `src/utils/useQuizState.ts`                                        | 2     | 2   | 0      | 0   |
| `src/components/slides/shared/EnlargeableDiagram.tsx`              | 1     | 0   | 1      | 0   |
| `src/utils/m5HandoutPdf.ts`                                        | 1     | 1   | 0      | 0   |
| `src/utils/m6HandoutPdf.ts`                                        | 1     | 1   | 0      | 0   |

---

## 5. Stebėjimai

1. **Diagramos = 91.7 % radinių.** 30 failų `slides/shared/` direktorijoje (daugiausia `*Diagram*.tsx` ir `*Config.ts`) sudaro 440 / 480 radinių. Tai patvirtina v0.1 audito (E1) išvadą — lokalūs `TOKENS = { ... '#hex' }` objektai yra v0.3 refactor'o pagrindinis taikinys (Backlog **B1**).
2. **Inline `style={{ ... }}` — tik 13 atvejų** ir koncentruoti 4 failuose: `LlmArchDiagramDiagram.tsx` (10), `EnlargeableDiagram.tsx` (1), `CertificateScreen.tsx` (1), `HallucinationRatesDashboard.tsx` (1). Daugumoje atvejų — dinamiški `transform`/`width`/`backgroundImage`, kurie sunku perkelti į utility klases (Backlog **B5**).
3. **Ne-diagramos failai (utils, root komponentai) — 20 radinių.** PDF generavimo (`introPiePdf.ts`, `certificatePdf.ts`, `m5HandoutPdf.ts`, `m6HandoutPdf.ts`) ir certifikato/celebration komponentai naudoja hex'us `jspdf` API tikslams (RGB spalvos PDF kontekste — neturi tailwind atitikmens). **Šie atvejai legitimūs ir liks `@allowed`** v0.3 refactor'e (Backlog **B7** atsižvelgs).
4. **`ContentSlides.tsx` (12 hex) ir `IntroActionPieSlide.tsx` (8 hex)** — vieninteliai aukšti ne-diagramos slide failai. Verta peržiūrėti v0.3 metu, ar nėra tailwind alternatyvų (tai ne v0.2 darbas; rule §1 — turinio neliečiame).
5. **Naujų hex'ų atsiradimas v0.2 metu — alarm bell.** E5 etape (`module.accent`, `module.identityIcon`) **neturi pridėti naujų hex'ų** komponentuose — accent token'ai jau egzistuoja `tailwind.config.js` safelist'e (žr. plano §1). Jei E5 vis tiek prideda hex'ų — tai turi būti pažymėta komentaru `// v0.2 — module identity` ir paaiškinta release patikroje (E7.4).

---

## 6. Naudojimas E7.4 (release regression check)

Po E5 etapo:

```bash
node scripts/audit-design-tokens.mjs
```

Lygina su šio dokumento §1 lentele:

| Metrika         | Baseline (2026-05-19) | Po E5 (tikslas) |
| --------------- | --------------------- | --------------- |
| Hex literal'ai  | **351**               | ≤ 351           |
| Inline style    | **13**                | ≤ 13            |
| SVG fill/stroke | **116**               | ≤ 116           |
| **TOTAL**       | **480**               | **≤ 480**       |

### E7.4 patikra (2026-05-19, po E5–E7)

```bash
npm run audit:design-tokens
```

| Metrika         | Baseline | Po E5–E7 (faktas) | Statusas |
| --------------- | -------- | ----------------- | -------- |
| Hex             | 351      | 351               | OK       |
| Inline style    | 13       | 13                | OK       |
| SVG fill/stroke | 116      | 116               | OK       |
| **TOTAL**       | **480**  | **480**           | **OK**   |

**Paaiškinimas:** E5–E7 naudojo tik Tailwind utility klases (`Record` map'ai) — naujų hex/inline/svg literalų nepridėta. Diagramos neliestos.

**Jei skaičius padidėja** → reikia paaiškinimo komentaro kode (`// v0.2 — module identity`) arba rollback'o E5 task'ui (žr. plano §10 E7.4 Exit-kriterijai). Žr. taip pat `docs/development/RELEASE_QA_CHECKLIST.md` §8 (Design tokens baseline regression).

---

## 7. Nuorodos

| Sritis          | Failas                                                    |
| --------------- | --------------------------------------------------------- |
| Planas (SOT)    | `docs/development/DESIGN_SYSTEM_V0_2.md` §5 (E2 etapas)   |
| Cursor rule     | `.cursor/rules/design-system-v02.mdc`                     |
| Skriptas        | `scripts/audit-design-tokens.mjs`                         |
| Backlog v0.3    | `docs/development/DESIGN_SYSTEM_V0_2.md` §11 (B1, B5, B7) |
| Release QA      | `docs/development/RELEASE_QA_CHECKLIST.md` §8             |
| Sėkmės metrikos | `docs/development/DESIGN_SYSTEM_V0_2.md` §12              |

---

_Šis dokumentas — vienkartinė E2.2 baseline ataskaita. Atnaujinama TIK po v0.2 release (E7.4) — tada pridedama §6 lentelės „Po E5" stulpelis. v0.3 refactor sukurs naują baseline'ą._
