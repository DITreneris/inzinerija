# TODO – Promptų anatomija

**Tikslas:** Vienas working failas – prioritetai, pipeline, nuorodos. SOT: `docs/DOCUMENTATION_INDEX.md`. Agentai: `docs/development/AGENT_ORCHESTRATOR.md`.  
**Legenda:** P0 = produkto / monetizacija (top), P1 = aukštas (release/kokybė), P2 = vidutinis, P3 = žemas. **Atnaujinta:** 2026-07-16.

**Dabartinis fokusas:** **MON P0 + release QA**. M7 Lygis C launch blockers (overlay indeksai, LT viz split, `Database` journey icon, journey preflight gates) uždaryti 2026-07-16 — lieka rankinis browser smoke + MON-1/3/5/8. UX planas: `docs/development/SLIDE_UX_INTERACTIVITY_PLAN_M1_M15.md`. **Docs sync prieš release:** `docs/development/DOCS_MAINTENANCE.md` + `DOCS_SYNC_CHECKLIST.md`.

**Release vartai (apibrėžimai):**

- **Release-ready (nemokamas lead magnet):** MON-1, MON-3, MON-5 praeina + Release QA #6 (mobile spot-check).
- **Monetization-ready (mokamas M4+):** visi P0 MON-\* + Release QA #1–#2 (PDF) + MON-4 dashboard gyvas.

---

## 1. Aktualus pipeline (kas toliau)

### §1.0a P0 – M1–15 mokymų UX / interaktyvumas (**dabartinis fokusas**)

> **Planas:** [docs/development/SLIDE_UX_INTERACTIVITY_PLAN_M1_M15.md](docs/development/SLIDE_UX_INTERACTIVITY_PLAN_M1_M15.md)  
> **Audit:** `npm run audit:slide-interactivity` (dabartinė būklė 2026-07-09 po Bangos 1–4: 262 skaidrės; warm-up=15, path=12, intro-action-pie=2, evaluator=2, embed=9). M1 įspėjimas uždarytas. Pattern katalogas: `npm run audit:embed-catalog`.

| ID         | Banga | Užduotis                                                                        | Status |
| ---------- | ----- | ------------------------------------------------------------------------------- | ------ |
| **UX-0**   | 0     | Planas + audit skriptas + TODO sync                                             | [x]    |
| **UX-1.1** | 1     | M7: +4 `warm-up-quiz` (73.5, 731.5, 891.5, 74.5) + 68.5 į branduolį             | [x]    |
| **UX-1.2** | 1     | M7: 1× `intro-action-pie` po 70 journey; PDF bleed closure                      | [x]    |
| **UX-1.3** | 1     | M10: +2 `warm-up-quiz`                                                          | [x]    |
| **UX-1.4** | 1     | M10: 1× `evaluator-prompt-block`                                                | [x]    |
| **UX-1.5** | 1     | M13: +2 `warm-up-quiz`                                                          | [x]    |
| **UX-1.6** | 1     | M13: 1× `recognitionExercise`                                                   | [x]    |
| **UX-2**   | 2     | M6/M12/M15 path-step; M5 warm-up; M6 correctPromptPractice (visi ✅ 2026-07-08) | [x]    |
| **UX-3**   | 3     | M1 micro-win ✅; M2 bonus collapsible + M11/M14 scenario share ✅ 2026-07-08    | [x]    |
| **UX-4**   | 4     | GOLDEN_STANDARD §3.8; M4 pattern katalogas; EN overlay sync Banga 1–2           | [x]    |

**Pipeline:** CURRICULUM → CONTENT → DATA → `validate:schema` → EN audit (M10+) → QA.

### §1.0d M4 sk. 53.5 news-portal (follow-up po 2026-07-13 sesijos)

> **Retrospektyva:** [docs/development/M4_SK_53_5_SESSION_RETROSPECTIVE.md](docs/development/M4_SK_53_5_SESSION_RETROSPECTIVE.md)  
> **Storyboard:** [NEWS_PORTAL_SLIDE_53_5.md](docs/development/NEWS_PORTAL_SLIDE_53_5.md) | **Diagramos:** [PORTAL_BEAT_DIAGRAMS.md](docs/development/PORTAL_BEAT_DIAGRAMS.md)  
> **UI audit:** [PORTAL_2_1_UI_AUDIT.md](docs/development/PORTAL_2_1_UI_AUDIT.md) | **Gairės:** [PORTAL_2_1_IMPROVEMENT_GUIDE.md](docs/development/PORTAL_2_1_IMPROVEMENT_GUIDE.md)

| P   | Užduotis                                                                           | Agentas            | Failai                                                   | Status                                     |
| --- | ---------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------- | ------------------------------------------ |
| P0  | Portal 2.1 surface polish (portalSurfaces, legacy kill, metric, dedup)             | CODING → DATA → QA | news-portal/, modules.json                               | ✅ 2026-07-14                              |
| P0  | Portal 2.1: nav + sidebar + DataBriefRow + pull-quote ribbon + hero metadata       | CODING → DATA → QA | news-portal/, modules.json                               | ✅ 2026-07-14                              |
| P0  | Rich Portal 2.0: 4 foto + hero grid + gradient virš fold + insight strip           | CODING → DATA → QA | NewsPortalInfographicSlide, modules.json                 | ✅ 2026-07-14 (Lead gradient → Portal 2.1) |
| P0  | Hybrid recovery: sticky FAB, tipografijos floor, mainInsightBlock 32,7%            | CODING → DATA → QA | ModuleView, news-portal/\*, modules.json                 | ✅ 2026-07-14                              |
| P1  | Portal 2.1 UI audit Wave 4: masthead fake hover fix                                | CODING → UI_UX     | PortalMastheadNav.tsx                                    | ✅ 2026-07-14                              |
| P1  | Portal 2.1 UI audit Wave 4: section label dark contrast                            | CODING → UI_UX     | portalSurfaces.ts                                        | ✅ 2026-07-14                              |
| P2  | Portal 2.1 UI audit Wave 5: navDecor, chapter nav, DataBrief source, ticker mobile | CODING → UI_UX     | news-portal/\*                                           | ✅ 2026-07-14                              |
| P1  | 48h anti-PPT retest (5 mobile, 375px; portal ≥70%, PPT ≤30%, skaitomumas ≥70%)     | USER_JOURNEY / QA  | TEST_REPORT.md §53.5 anti-PPT, NEWS_PORTAL_SLIDE_53_5.md | ⬜ paruošta                                |
| P1  | CONTENT: patvirtinti 86/38/48 šaltinį arba softinti formulę                        | CONTENT            | portalBeatContent.ts, modules.json                       | ✅ 2026-07-14                              |
| P2  | Anti-PPT overhaul (DS shell, hero, immersive nav, KPI dedup, chapters)             | CODING → DATA      | PortalBlockShell, ModuleView, modules.json               | ✅                                         |
| P2  | lithuania-context beat polish (awareness golden pattern)                           | SCHEME → CODING    | LithuaniaContextDiagram.tsx, PortalBeatDiagram.tsx       | ✅                                         |
| P2  | next-step-prompt B+C hybrid (bridge + copyable prompt, be SVG)                     | CONTENT → CODING   | PortalNextStepPromptBlock.tsx                            | ✅                                         |
| P2  | SecondaryCards + Tools + InsightCard polish                                        | CODING             | NewsPortalInfographicSlide.tsx                           | ✅                                         |
| P2  | 03/04 Variant B: Ranking vs Hero KPI komponentai                                   | CONTENT → CODING   | PortalRankingBlock, PortalHeroKpiBlock, modules.json     | ✅                                         |
| P2  | 03/04 derived insights + stacked hero be foto                                      | CONTENT → CODING   | PortalHorizontalBarRow.tsx, modules.json                 | ✅                                         |
| P3  | Pašalinti nebenaudojamus `public/di_portal_meme_0*.png`                            | QA                 | public/, CHANGELOG                                       | ✅ 2026-07-14                              |
| P3  | EN mobile: „percentage points“ overlap – HTML bars fallback?                       | UI_UX → CODING     | AwarenessGapDiagram.tsx                                  | ✅ nebereikia (EN `pp`)                    |

**awareness-gap P1 polish:** ✅ (2026-07-13) – juostos, 48 pp, border-l-4, HTML šaltinis.  
**CONTENT softinimas:** ✅ (2026-07-14) – illustracinė spraga, tendencijų disclaimer, EN `pp`.  
**Full slide polish:** ✅ (2026-07-13) – beats 2–3, storyboard blokai, JSON LT/EN.  
**48h retest:** ⬜ paruošta – vykdyti su 5 dalyviais (375px) po šios sesijos.

### §1.0b Design System hardening ✅ (2026-07-08)

> **Planas:** `.cursor/plans/design_system_hardening_b6c90015.plan.md` (nekeisti). **Baseline:** `docs/archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-07.md`.

| ID              | Fazė | Užduotis                                                              | Status |
| --------------- | ---- | --------------------------------------------------------------------- | ------ |
| **DS-0-sot**    | 0    | GOLDEN_STANDARD §2.2/§6, `surfaceGlass`, audit regression gate        | [x]    |
| **DS-1-shell**  | 1    | `surfaceGlass.shell` AppNav / ModuleView / TestPracticeSlides         | [x]    |
| **DS-1-block**  | 1    | ContentSlides blockVariant → `getContentBlockVariantClasses()`        | [x]    |
| **DS-1-banner** | 1    | Banner pilot ContentSlides + BlockSlides + TestPracticeSlides (≥10)   | [x]    |
| **DS-1-prim**   | 1    | Card/CTAButton HomePage, ModulesPage, ModuleView                      | [x]    |
| **DS-1-arb**    | 1    | Targeted `text-[11px]` cleanup; audit ≤521 baseline                   | [x]    |
| **DS-2-id**     | 2    | `audit:module-identity`; diagram P2 (M10/M12/M13)                     | [x]    |
| **DS-3-ws**     | 3    | `SlideWorkspace` + M4/M10 content-block pilot                         | [x]    |
| **DS-4-exp**    | 4    | Banner batch BlockSlides + TestPracticeSlides (ongoing backlog likęs) | [x]    |
| **DS-5-qa**     | 5    | CHANGELOG, DESIGN_SYSTEM, RELEASE_QA #6 smoke docs                    | [x]    |

**Vartai:** `npm run audit:design-tokens`, `npm run audit:design-tokens:gate`, `npm run audit:module-identity`, `npm run lint`, `npm run test:run`.

### §1.0c DS Next Waves (W6–W10)

> **Planas:** `.cursor/plans/ds_next_waves_0ac88414.plan.md` (nekeisti). **W6 smoke:** RELEASE_QA §7 DS visual smoke (M1/M4/M7/M10/M13).

| ID      | Banga            | Užduotis                                                         | Status                                                                                              |
| ------- | ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **W6**  | QA closure       | DS smoke docs + sticky baseline sync + commit checkpoint         | [x]                                                                                                 |
| **W7a** | Banner           | BlockSlides batch (~15 callout'ų)                                | [x]                                                                                                 |
| **W7b** | Banner           | TestPracticeSlides likutis                                       | [x]                                                                                                 |
| **W7c** | Banner           | AdvancedBlockSlide + ActionIntroSlide + RecognitionExerciseBlock | [x]                                                                                                 |
| **W7d** | Banner           | ContentSlides mažais batch'ais (optional)                        | [x] 2026-07-09 – help tabs, whyBenefit → `getContentBlockVariantClasses`; `border-l-4` likučių nėra |
| **W8**  | SlideWorkspace   | M1/M7/M13 + evaluator-prompt-block                               | [x]                                                                                                 |
| **W9**  | Primitives       | CTAButton/Card TestPractice + shell + HomePage                   | [x]                                                                                                 |
| **W10** | Diagrams + gates | M13/M15 P2 + baseline 417 + release-preflight                    | [x]                                                                                                 |

### §1.0 Release 1.4.2 ✅ (2026-07-01)

| Kas                                           | Būsena        | Pastaba                                                                                                             |
| --------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- |
| DiagramKit M1–9, design tokens, M7–9 EN sweep | ✅ Shipped    | CHANGELOG `[1.4.2]`                                                                                                 |
| Lint + test (367) + `build:production`        | ✅            | CI lokaliai                                                                                                         |
| M7–12 schema-consistency sprint               | ✅ 2026-07-06 | `DIAGRAMU_M7_M12_REGISTRY.md`, M10 shell/testai, M8 scope deep-link, legacy cleanup                                 |
| Diagram browser smoke (B2.5)                  | ⏳ Pending    | M10–12 LT/EN audit + UI/UX sync auto gates ✅ 2026-07-06; rankinė 10.2/10.45/10.49/10.65/120.5 – Release QA #6      |
| Submodule pin marketing (MON-2)               | ⏳ Runbook    | [`MARKETING_SUBMODULE_PIN_1.4.4.md`](docs/deployment/MARKETING_SUBMODULE_PIN_1.4.4.md) – vykdyti promptanatomy repo |

### §1.1 P0 – Monetizacija ir integracija (top priority – **kitas sprintas**)

| ID            | Užduotis                                                                                                                                                                             | Status | Savininkas         | Repo                       | Pastaba                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------------------ | -------------------------- | --------------------------------------------------------------------------------------------------- |
| **MON-1**     | Production env audit: **nėra** `VITE_MAX_ACCESSIBLE_MODULE=6` promptanatomy.app; `VITE_VERIFY_ACCESS_URL` → domain root `/api/verify-access`                                         | [ ]    | DevOps             | Marketing                  | Rankinė Vercel grep; build script OK (`vercel-build.sh`)                                            |
| **MON-2**     | Submodule pin: dokumentuoti reikalaujamą inzinerija commit (**v1.4.4**); gate fix, be MVP tier fallback; marketing deploy runbook                                                    | ⏳     | DevOps             | Marketing                  | Runbook ✅; marketing local `db1024a` + `a038404` (059_home_page) → **git push + Vercel** ⏳        |
| **MON-3**     | Verify-access smoke: magic link → `GET /api/verify-access` → 200 → SPA `verified_access_tier` → M1 atrakinta (**+ tier 9**)                                                          | ⏳     | QA                 | Abu                        | API prod ✅ 2026-07-09 (400/401); Stripe+Supabase browser ⏳ `RELEASE_QA_RUN.md` §MON-5             |
| **MON-4**     | PostHog (arba GA4) production: `VITE_POSTHOG_KEY`, snippet marketing shell; funnel dashboard pagal `ANALYTICS_DASHBOARD_MVP.md`                                                      | [ ]    | CODING / QA        | Marketing shell + šis repo | Checklist ✅ [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md)                   |
| **MON-5**     | Gate regression: neapmokėtas `/anatomy/` → `AccessGateScreen`, ne modulių sąrašas                                                                                                    | ⏳     | QA                 | Šis repo                   | Auto ✅ `gate.smoke.test.tsx`; prod API ✅ 2026-07-09; browser tier 0 ⏳ `RELEASE_QA_RUN.md` §MON-5 |
| ~~**MON-6**~~ | ~~Dokumentuoti client-side paywall limitą (localStorage bypass, JSON bundle) kaip priimtą MVP riziką~~ ✅ 2026-06-29 (`AUDIT_2026-06_SUMMARY.md` skyrius „Client-side paywall riba") | ✅     | QA                 | Šis repo docs              | —                                                                                                   |
| **MON-7**     | Po 2–4 sav. duomenų (po MON-4): baseline (M1/M3 completion, drop-off), koreguoti KPI (ANALYTICS_DASHBOARD_MVP §2)                                                                    | [ ]    | QA / Product       | —                          | Buvęs Post-release #3; **po MON P0**                                                                |
| **MON-8**     | Marketing prod env: nuimti `VITE_MVP_MODE`, `VITE_MAX_BUILD_MODULE=9`, `build:production`; marketing API tier 9; preview smoke                                                       | ⏳     | DevOps / Marketing | Marketing                  | `vercel-build.sh` ✅ M1–9; Vercel env rankinė ⏳; smoke ⏳                                          |

### §1.2 P1 – Release QA (kokybė)

| #     | Užduotis                                                                                                                                                                                                              | Agentas / pastaba |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 1     | **M5 PDF – rankinė patikra** – M5 baigti testą → „Parsisiųsti Modulio 5 atmintinę (PDF)“ → atsidaryti PDF: ą, ė, į, š, ų, ū, ž teisingai. NotoSans production. Žr. RELEASE_QA_CHECKLIST §5d, PDF_DOWNLOAD_TESTING.md. | QA_AGENT / ranka  |
| 2     | **M6 PDF – rankinė patikra** – skaidrė 64 + ModuleCompleteScreen → PDF, lietuviškos raidės. RELEASE_QA_CHECKLIST §5d.                                                                                                 | QA_AGENT / ranka  |
| ~~3~~ | ~~**M4 footer 65.8 / 66.9**~~                                                                                                                                                                                         | ✅ 2026-03-11     |
| 4     | **Rankinė peržiūra M4 skaidrės 56** – „RAG: kas tai ir pabandyk“: navigacija, LlmArch tabai, copyable promptas, „Peržiūrėti pilname dydyje“. Žr. RELEASE_QA_CHECKLIST §5d.                                            | QA_AGENT / ranka  |
| 5     | **Rankinė peržiūra M6 skaidrės 64** – „Pagalbinis promptas: duomenų tvarkymo sistema“, Kopijuoti, lietuviškos raidės. Žr. RELEASE_QA_CHECKLIST §5d.                                                                   | QA_AGENT / ranka  |
| 6     | **Bug bundle browser spot-check (M1 / M4 / M6)** – 390px: M1 EN; M4/M6 Custom GPT LT/EN + light/dark; reflow. `M1_M6_BUG_BUNDLE_AUDIT_MATRIX.md`.                                                                     | QA_AGENT / ranka  |
| 7     | **Bug bundle PDF / handout entry point spot-check (M5 / M6)** – PDF/handout mygtukai, completion flow LT/EN.                                                                                                          | QA_AGENT / ranka  |

### §1.3 P1 – Konversija (šis repo, po Release QA)

| ID             | Užduotis                                                                                                                                                                                    | Failai                                                           | Pastaba                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------- |
| ~~**CONV-1**~~ | ~~M3 completion upsell: CTA į kainodarą, kai `maxAccessible < 6` ir modulis 3 baigtas~~ ✅ 2026-06-29 (`ModuleCompleteScreen.tsx` upsell blokas, `pricing_click`, LT/EN `module.upsellM3*`) | `ModuleCompleteScreen.tsx`, `locales/*.json`                     | Audit §11                               |
| ~~**CONV-2**~~ | ~~Sutvirtinti neapmokėtą scope: gate quiz (arba sample-only), kai `maxAccessible === 0`~~ ✅ 2026-06-29 (`App.tsx` quiz route → `AccessGateScreen`, kai tier 0)                             | `App.tsx`                                                        | Home/tools lieka pasiekiami; quiz gated |
| ~~**CONV-3**~~ | ~~Playwright smoke: gate screen + tier-3 `getModule(4) === null`~~ ✅ 2026-06-29 (vitest `gate.smoke.test.tsx`; Playwright neįdiegtas)                                                      | `src/components/__tests__/gate.smoke.test.tsx`                   | ROADMAP E2E gap (vitest variantas)      |
| ~~**CONV-4**~~ | ~~`pricing_click` event M3 upsell + AccessGateScreen CTA~~ ✅ 2026-06-29 (`analytics.ts` event + taxonomy; triggerina M3 upsell ir `AccessGateScreen` CTA)                                  | `analytics.ts`, `AccessGateScreen.tsx`, ANALYTICS_EVENT_TAXONOMY | MON-4 dashboard                         |
| ~~**CONV-5**~~ | ~~M6 completion upsell tier 9 (Duomenų analizės kelias)~~ ✅ 2026-06-30 (`ModuleCompleteScreen.tsx`, `upsellM6*`, `m6_upsell_tier9`)                                                        | `ModuleCompleteScreen.tsx`, `locales/*.json`                     | Tier 9 funnel                           |

### §1.4 P2 – Turinys, UX, backlog (aktyvu)

#### P2 artefaktai ir docs sync ✅ (2026-07-09)

| ID         | Užduotis                                                                | Status |
| ---------- | ----------------------------------------------------------------------- | ------ |
| **ART-P2** | Tier 4/5 sertifikatai + `m1012` / `m1315` atmintinės (commit `2096923`) | [x]    |
| **DOC-P2** | Post-P2 docs sync: agentų įėjimai, DATA registry, PDF QA, skills        | [x]    |

| #            | Užduotis                                                                                                                                                                                                                                  | Agentas / pastaba |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| ~~14~~       | ~~**Likusių `ContentSlides` locale fallback salų sweep**~~ ✅ 2026-07-09 – prioritetiniai aria (lentelės, choice, strength badge) → `lt.json`/`en.json`.                                                                                  | CODING + QA       |
| ~~UX-MOB-1~~ | ~~**UX audito planas**~~ ✅ 2026-07-09 – ModuleView `M{n} · pos/total`, safe-area; `scrollToFirstAction` išplėstas.                                                                                                                       | CODING + DATA     |
| ~~15~~       | ~~**RAG optional (žr. §3)**~~ ✅ 2026-07-09 – sk.61 `optional`, sk.63.7 papildomas skaitymas; EN overlay.                                                                                                                                 | CONTENT + DATA    |
| 16           | **PDF doc** – PDF_GENERATION_AGENT_MEMORY.md sinchronas. Ranks – M5/M6 (#1, #2).                                                                                                                                                          | QA_AGENT          |
| ~~17~~       | ~~**Micro-win M1** – M1 skaidrės 1–2 copy/paste arba vienas klausimas (SOT / modules.json). Buvęs Post-release #2.~~ ✅ 2026-07-07 – M1 pridėta `path-step` 1.1 ir `warm-up-quiz` 16.5; `audit:slide-interactivity` M1 warning uždarytas. | CONTENT + DATA    |

### §1.5 Atidėta iki revenue test (Deferred)

> **Taisyklė:** nepradėti, kol MON-\* (P0) užbaigti **ir** ≥5 mokamų konversijų (M4 upsell pilotas). Audit: M7–15 ne core build; plėtra prieš M4 monetizacijos validaciją.
>
> **Atnaujinta 2026-06-29:** korporatyvinis klientas (50 licencijų) įsigijo **kelią 7–9 (tier 9)** → Deferred vartas **M7–9 turiniui praeitas**. M7–9 dabar aktyvus production track (release 1.4.0–1.4.2).
>
> **M10–15 turinys/monetizacija – ne prioritetas:** authoring katalogas ir monetizacijos plėtra lieka **Deferred** iki MON P0 + baseline (MON-7). **Išimtis:** M7–12 schema-consistency darbai aktyvūs, nes saugo esamų schemų priežiūrą ir testų vartus.

| ID         | Užduotis                                                                                                           | Buvęs prioritetas  | Būsena                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------------------------------------------------------------------- |
| ~~M13-1~~  | ~~M13–M14 EN sinchronas~~                                                                                          | P2                 | ✅ 2026-07-06 – M13–15 `modules-en-m13-m15.json` + `audit:m1315`       |
| ~~M13-2~~  | ~~M13 footerių release QA~~                                                                                        | P2                 | ✅ 2026-07-06 – M13 LT/EN footer audit gate paleistas                  |
| ~~M13-3~~  | ~~`slidePhaseConfig.test.ts` M13 regresija~~                                                                       | P2 optional        | ✅ 2026-07-06 – M13 fazių LT/EN regresijos testai                      |
| DEF-1a     | **Moduliai 7–9 turinys** (lean M7, Kur pritaikyti?, M8 scenarijai, M9 sample output, reflection META+INPUT+OUTPUT) | P3 / §3            | **Aktyvu / iš esmės padaryta (2026-06-29)** – korporatyvinis tier 9    |
| DEF-1b     | Moduliai 10–15 turinys / authoring (Arch-B, Orch schema, Reflection prompts)                                       | P3 / §3 backlog    | **Deferred – ne prioritetas** (M10+ vizualinis backlog atskirai)       |
| M10-DIA-01 | M11 `TestKnowledgeScopeDiagram` clickable bubbles → M10 skaidrės deep-link + sync su `TestRemediationChips`        | P3 / schema UX     | ✅ 2026-07-09 – M11 M10 deep-links; M14 → M13 deep-links               |
| M10-DIA-02 | M10 Learning Loop pilnas 9-node step nav                                                                           | P3 / schema UX     | Aktyvus backlog – 4 makro žingsniai palikti kaip dabartinis kontraktas |
| M10-DIA-03 | M12 evaluator→coordinator feedback vizualizacija                                                                   | P3 / schema UX     | Aktyvus backlog – reikia SOT / geometrijos sprendimo                   |
| M10-DIA-04 | P2 polish: TriggerFlow webhook polygon, ThreeA 5% sub, ThreeLabs connectors                                        | P3 / visual polish | ✅ 2026-07-09 – ThreeA H5, ThreeLabs markers, TriggerFlow tokens       |
| DEF-2      | DS v0.3 microcopy backlog (P3 #7)                                                                                  | P3                 | ✅ 2026-07-09 – M1 sk.8–11 „Kodėl tai veikia“; M4/M6 anksčiau          |

### P2 – darbai eilėje

| #      | Užduotis                                                                                                                     | Agentai           |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| ~~1~~  | ~~**M5 skaidrė 47 – artefakto atsisiuntimas**~~ ✅ 2026-07-09 – `artifactDownload` + `DownloadTemplateButton`                | CODING + DATA     |
| 2      | **Testų infrastruktūra T2** – po Vitest `process.on` fix peržiūrėti/atnaujinti testus (App, QuizPage, progress, useAutoSave) | CODING + QA       |
| 3      | **S-R4 (optional)** – `src/types/modules.ts` padalinti (modules-core, modules-slide-content, re-export)                      | CODING            |
| 4      | ~~**Mobile P2**~~ ✅ 2026-07-09 – RadarChart i18n/size; CharacterCard `grid-cols-1`; TEST_REPORT Mobile P2 skyrius           | UI_UX / CODING    |
| L0     | ~~**M7 Markdown→table migracija**~~ ✓ 2026-07-09                                                                             | DATA_AGENT        |
| ~~L1~~ | ~~**Lentelių auditas**~~ ✅ 2026-07-09 – 17 lentelių inventorius, checklist `TEST_REPORT.md`                                 | UI_UX_AGENT       |
| ~~L2~~ | ~~**comparisonStyle / body**~~ ✅ 2026-07-09 – M4 48/55/66.6, M7 76/78                                                       | DATA_AGENT        |
| ~~L3~~ | ~~**Min-width ir header**~~ ✅ 2026-07-09 – `ContentSlides` comparison mode `min-w-[36rem]`                                  | CODING_AGENT      |
| ~~L4~~ | ~~**Lentelių spot-check**~~ ✅ 2026-07-09 – `validate:schema`, `audit:markdown-tables` PASS                                  | CODE_REVIEW_AGENT |

### P3 – žemesnis prioritetas

| #     | Užduotis                                                                                                                                                                                | Agentai                    |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------- |
| 1     | ~~**Savitikros M4** (4.2-check, 4.3-check, 4.4-check) – „Jei klaidingai – žr. skaidrę X“~~ ✓ 2026-06-29 (patikrinta – remediation pilna visose savitikrose)                             | CONTENT + DATA             |
| 2     | ~~**CoVe, chunk, bridžinė, „Pataisyk promptą“** – sinchronas su SOT/modules.json~~ ✓ 2026-06-29 (patikrinta – CoVe pilna M7 67.8 + nuoroda; chunk M4 62; Pataisyk promptą M7)           | CONTENT + DATA             |
| 3     | **Schemų vizualinė patikra** (SCHEME_AGENT §5) – custom_gpt_process, RAG, žinių patikrinimas; tik patikra                                                                               | CODE_REVIEW / SCHEME_AGENT |
| ~~4~~ | ~~**Savitikra 68.5** – 1–2 klausimai apie DI detektorius (po skaidrės 201)~~ ✅ 2026-07-07 – 68.5 dabar M7 branduolio warm-up su 4 klausimais; žr. `docs/MODULIO_7_SKAIDRIU_EILES.md`.  | CONTENT + DATA             |
| 5     | **Mobile P3** – pilnas mobile audit (1–2 skaidrės/modulį); LlmArchDiagram 375px. MOBILE_UI_UX_AUDIT §6 P3.                                                                              | UI_UX / CODE_REVIEW        |
| 6     | **ProcessStepper duomenys** – optional: perkelti CUSTOM_GPT_STEPS / CUSTOM_GPT_STEPS_EN į bendrą duomenų failą arba i18n, kad vengti dubliavimo struktūroje.                            | DATA_AGENT / CODING        |
| 7     | **Microcopy v0.3 backlog** – sutrumpinti perteklinius content-block tekstus M1/M4/M6 (footers OK); žr. `docs/archive/development/analysis/MICROCOPY_LENGTHS_2026-05.md` (CONTENT_AGENT) | CONTENT_AGENT              | → **DEF-2** (Deferred)                        |
| 7b    | **M7–M9 mikrocopy trumpinimas** – P0–P2 (726, 71, 90, Patikra, M9 UI defaults, viz šaka, EN overlay)                                                                                    | CONTENT/DATA/CODING        | ✅ 2026-07-14 – `migrate-m7-m9-microcopy.mjs` |

---

## 2. Padaryta (santrauka)

- **MVP:** Error Boundary, loading/lazy, TypeScript, progress validacija, ~46 testai, CI, CopyButton, SlideContent refaktoras, Tailwind safelist, Design System (GOLDEN_STANDARD), Emoji→Lucide, HomePage/ModulesPage CTA ir progresas.
- **Moduliai 4–6:** SOT sinchronas, M5 klausimai/įvadas/rezultatai, M6 projekto tikslai/refleksija, section-break, content-block image, warm-up-quiz, SEO, a11y, užrakinimas. User Journey M4/M5/M6. DI detektorių skaidrė (201). MUST/SHOULD M4 (RAG, CoVe, chunk, optional, shortTitle, saugumo 67.5).
- **M4 skaidrės:** 4 dedamosios, RL/RLHF (4.1a3), 5 principai (4.1a4), parametrai/stiliai/praktika (50–52), promptų poros (54), proceso prompt (55), Custom GPT ProcessStepper, M5 skaidrė 47 (8 skaidrių prezentacija). Low-hanging fruits (2026-02-15).
- **Refaktoringas:** M-R1 AllSlides padalintas; S-R1 AppNav/useTheme, S-R2 useSlideNavigation/ModuleCompleteScreen, S-R3 useQuizState/QuizResultsView. A-M1 schema + validate-schema.mjs, A-M2 learningEvents, A-M3 remediation, A-M4 RELEASE_QA_CHECKLIST. A-S1–A-S4 (6 blokai, axe-core, Design system, Fast track).
- **Modulio 2 testas v2.5:** 5 tipai (MCQ, T/F, Matching, Ordering, Scenario), 15 kl., Bloom, hints, gamifikacija, žinių žemėlapis, remediation. F2 (pool, radar, deep links, score), F3-1 (Confidence).
- **P1–P3 sesija (2026-02-18):** M3 apšilimas (30.5), M3 „Situacija“ (6 scenarijai), M3 CTA į promptų biblioteką, M1 collapsible „Kodėl tai veikia“ (9,10,11), M3 pasirenkamos praktikos, M1 DI mąstymo logikos collapsible (8). Terminologija: įkaitinimas→apšilimas.
- **Context Engineering:** context_budget, memory_schema, eval_rubric↔RELEASE_QA, sot_index.json (validate-sot-index.mjs), CE-1–CE-6.
- **Gili analizė (2026-02-16):** badgeVariant, recommended, unlocksAfter; footer spot-check M1/M4.
- **MVP Analytics (2026-02-21):** anon_id, session_id, track(), 6 eventai, progreso juosta, practice feedback, nudge beforeunload, ANALYTICS_EVENT_TAXONOMY.md, ANALYTICS_DASHBOARD_MVP.md.
- **RAG 6 skaidrės suliejimas (2026-02-21):** 56+58 → viena skaidrė „RAG: kas tai ir pabandyk“ (SOT, modules.json, footeriai M4 21→22…48), 58 pašalinta; TODO.md RAG optional skyrius + nuorodos į Duomenų analizės kelį (turinio_pletra_moduliai_7_8_9.md, DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md). Liko rytoj: rankinė peržiūra skaidrės 56, MODULIO_4_SKAIDRIU_EILES.md atnaujinimas, RAG optional užduotys (§3).
- **ProcessStepper EN (2026-03-07):** Pilnas EN turinys Custom GPT žingsniams – `CUSTOM_GPT_STEPS_EN` (title, description, actionChecklist, tip, externalLink); `steps` pagal locale; žingsnio 4 šablonų nuoroda ir žingsnio 8 santrauka per `stepper.templateHint`, `summaryHeading`, `summaryBullet1–4`. Kortelė ir aria-labels EN, kai `locale === 'en'`.
- **Modulio 1 EN P2 (2026-03):** Skaidrės 13–21 – ReasoningModelsSlide, ReasoningBlockSlide, QualityBlockSlide, AdvancedParameters2Slide, FullExampleSlide pilnai i18n (lt.json/en.json contentSlides.blockReasoningModels*, blockReasoning*, blockQuality*, blockAdvanced2*, blockFullExample\*). VeiksmoIntroBlock turinys – iš modules-en.json, ne iš locale. Žr. docs/archive/development/analysis/MODULIO_1_EN_UI_DIAGNOZE.md §3.1, §5.
- **Audito planas Faze 1.1 (2026-03-11):** Quiz rezultatų ekranas – scroll į pirmą klaidingą atsakymą (RAF + setTimeout 150 ms), aria-live ir id pirmam klaidingam blokui; TEST*REPORT – išspręsta (scroll / M2 M5). Žr. .cursor/plans/audito*įgyvendinimo_planas_agentams_36a36f45.plan.md.
- **Audito planas Faze 2 (2026-03-11):** „Kur pritaikyti?“ (MUST M5) – ModuleCompleteScreen po Modulio 1: blokas su antrašte ir 4 use-case (projektų vadovas, marketingas, HR, analitikas). SOT: turinio_pletra.md; i18n lt/en; VARTOTOJU_ATSILIEPIMAI §8 M5 – pažymėta įgyvendinta.
- **Integracija kaip subproject (2026-03-10):** INTEGRATION_OVERVIEW.md (subproject modelis, API kontraktas verify-access), DOCUMENTATION_QUICK_REF skyrius „Išoriniams integratoriams“, DEPLOYMENT skyrius „Integracija kaip subproject“, README nuoroda; VITE_BASE_PATH (vite.config), VITE_VERIFY_ACCESS_URL (App.tsx). Toliau – marketingo repo: įtraukti šį repo kaip apps/prompt-anatomy, build:training, Vercel rewrites, verify-access endpoint.
- **Vartotojui paruošta – Faze 2 ir Faze 3 (2026-03-11):** Faze 2: „Pereiti prie veiksmo“ (mobile, scroll į CTA), lentelės sticky pirmas stulpelis, bottom nav „Tęsti“ per ilgas → fallback „Tęsti“, slide dots Safari. Faze 3: Mobile QA checklist TEST*REPORT (1 skaidrė/modulis, 375px), UX_AUDIT_IMPLEMENTATION_PLAN Mobile skyrius, TODO sinchronas (UX-1, Mobile P2, P1). Žr. CHANGELOG, .cursor/plans/vartotojui_paruošta*įrankis_cfe90c31.plan.md.
- **Architektūra A (2026-03-11):** Dokumentacija ir agentų taisyklės suvienodintos pagal dabartinę techninę realybę. `modules.json`, `glossary.json`, `tools.json` lieka full redagavimo SOT; `*-m1-m6.json` failai aprašyti kaip core `1–6` build/runtime profilis per `VITE_MVP_MODE=1`. Atnaujinti: architektūros planas, README, indeksai, deployment docs, AGENT_ORCHESTRATOR, DATA_AGENT docs, `sot_index.json`. **Sprendimas B** (atskiri 1–6 / 7–15 redagavimo failai, agreguotas `modules.json`) paliktas kaip atskiras būsimas refaktoringo projektas.
- **Pirmyn/Atgal (TODO #0) – įgyvendinta:** ModuleView – viena viršutinė **sticky** navigacijos juosta (`sticky top-16 z-20`), primary CTA „Tęsti“ (didesnis, brand, hover lift), „Atgal“ – ghost; grid vieno stulpelio, dešinėje atskiros nav kolonos nėra. Žr. CHANGELOG 2026-02-26, 2026-02-28 (Pirmyn→Tęsti).
- **EN UI, PDF ir schemų skaidrės (2026-03-11):** Dokumento title/meta pagal locale (seo namespace); CertificateScreen analytics cta_label per t(); EnlargeableDiagram – viewFullSize, diagramFullSizeAria, close i18n; schemų blokai (AgentOrchestrator, AgentWorkflow, TurinioWorkflow, ContextFlow) enlargeLabel iš diagrams; ContextFlowDiagram LT/EN per contextFlowDiagramLabels.ts; M5/M6 PDF default filename EN; ContentSlides .txt šablonas – pavadinimas ir mygtukas pagal locale; Intro Action Pie – introPiePdfContent-en.json, loaderis, i18n mygtukai, introPiePdf locale (pavadinimas, footer, filename); ActionIntroSlide – visi aria/vietiniai tekstai per t(), CTA fallback (actionIntroCtaReveal/Default); Intro Pie PDF – getGlossary(locale), EN segmentų glossaryTermNames iš glossary-en.json. Žr. CHANGELOG 2026-03-11.
- **M13–M14 LT tobulinimas (2026-04-12):** Mažesnis turinio dubliavimas ir perkrova (collapsible, vienas accent 13.5), santraukos statistika, M14 rezultatų „Kitas žingsnis: M15“, testo klausimai (rizikos/workflow), „Verslas ir rizikos“ techninis **`id: 13.101`** (JSON 13.10 ↔ JS 13.1 kolizija). Žr. CHANGELOG [Unreleased] Changed (2026-04-12); `docs/MODULIO_13_SKAIDRIU_EILES.md`, `docs/turinio_pletra_moduliai_13_14_15.md`. EN/footer QA → **§1.5 Deferred** (M13-1, M13-2).
- **M1-M6 bug bundle (2026-03-14):** Shared locale leak'ai ir mobile diagramų politika sutvarkyti sistemiškai: `CustomGptProcessDiagram` locale + compact mobile layout, `ProcessStepper` reflow, `ContentSlides` M1 EN helper label cleanup, `InstructGptQualityBlock` / `WorkflowChainsBlock` / `FigmaEmbed` locale fix, nauji smoke testai `ProcessStepper.locale.test.tsx` ir `ContentSlides.locale.test.tsx`, audit matrica `docs/archive/development/analysis/M1_M6_BUG_BUNDLE_AUDIT_MATRIX.md`. Liko rankinis browser spot-check ir PDF entry point patikra (#6, #7).
- **Design System v0.2 (2026-05-19):** E1–E7 ✅ — Eyebrow, IconChip, SectionDivider, module.accent/identityIcon M1–M6, audit-design-tokens (baseline 480), DESIGN_SYSTEM.md, CHANGELOG `[v0.2.0]`. Detalus DS-E\* sąrašas: `docs/development/DESIGN_SYSTEM_V0_2_EXECUTION_PLAN.md`.
- **Icon system P0–P2 (2026-07-15):** ✅ `src/icons/` registry + `audit:slide-icons` + emoji→Lucide migracija + M9 scenario-hub ikonos — žr. DESIGN_SYSTEM §4b, CHANGELOG [Unreleased].
- **M7–M9 A–C residual (2026-07-16):** ✅ M79-44 (sk. 97), M79-45 (W4/W5 plain), M79-50 smoke protokolas (kodo ✅). Docs: backlog §13, `M79_PATCH_REGISTRY`, `TEST_REPORT`. **Liko:** S1–S7 browser @375px prieš release.
- **M8/M9 kasdienis darbas (2026-07-16):** ✅ M79-51…55 — M9 90/93.1/93.2/99 + sample CSV + M8 vignette; EN sync; `audit:m79` PASS. **Liko:** browser E1–E6 @375px.
- **TODO/ROADMAP audit sync (2026-06-29):** P0 MON-_ monetizacijos track, CONV-_ konversija, Deferred M13/M7–15; `AUDIT_2026-06_SUMMARY.md`, `MARKETING_HANDOFF_CHECKLIST.md`.
- **Release 1.4.2 + MON P0 planas (2026-07-01):** DiagramKit M1–9, design tokens, M7–9 EN sweep, startup fix; 367 testai; `MON_P0_EXECUTION_PLAN.md`; TODO/ROADMAP v2.5 sinchronas. **Kitas sprintas:** MON-1…8 (marketing + QA).
- **M7 warm-up banga (2026-07-07):** +4 branduolio `warm-up-quiz` (73.5, 731.5, 891.5, 74.5), 68.5 perkelta į branduolį, LT/EN overlay ir footeriai suderinti, `generate:core-data` paleistas, `audit:slide-interactivity` skaičiuoja branch-aware streak. Žr. `CHANGELOG.md`, `docs/MODULIO_7_SKAIDRIU_EILES.md`.

---

## 3. Optional / Backlog

### RAG skyrius (M4) – optional turinys ir Duomenų analizės kelias

- [x] **RAG optional (id 61):** Pilna atmintinė grąžinta į M4 sk. **61** (2026-07-15); M7 sk. **71.35** – kontekstinė kopija po lygiagrečių tyrimų. Stub nukreipimas pašalintas.
- [x] **RAG 63/63.7:** Strategijos + COMBO; sk.63.7 „📎 Papildomas skaitymas“ sekcija (2026-07-09).
- [ ] **Duomenų analizės kelias (M7–M9):** Dokumentuose `docs/turinio_pletra_moduliai_7_8_9.md` ir `docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md` nurodyti, kad papildomas RAG/tyrimų įrankių turinys (pvz. id 61) gali būti integruotas į kelio aprašymą arba „Papildomas skaitymas“.
- [x] **Duomenų analizės kelias: path-step tipas, badge, žodynėlis:** Įgyvendinta – tipas `path-step`, PathStepSlide, progresas, GlossaryPage locked/unlocked; SOT §8.2, GOLDEN_STANDARD §3.4d; glossary.json `unlockedBy` 3 terminams (Deep research, Master promptas 71.2; RAG 71.3); MODULE_LABELS[7]. Optional vėliau: pridėti žodynėlio terminus (EDA, Duomenų analizės pipeline, Sintetinimas, Vizualizacija ir kt.) su unlockedBy 71.1, 71.4, 71.5. Planas: `.cursor/plans/duomenų_analizės_kelias_ir_badge_70d5e403.plan.md`.

### Marketing homepage / CRO backlog

- [ ] **Landingo positioning suvienodinimas:** suvienodinti framing tarp „sistema / mokymai / bendruomenė“, kad `Hero`, `What is` ir `Pricing` kalbėtų tuo pačiu produkto modeliu.
- [ ] **Hero value proposition ir CTA perrašymas:** aiškiau įvardyti kam skirta ir kokį konkretų rezultatą duoda; peržiūrėti CTA formuluotes (`Žiūrėti planus` vs. stipresnis pirkimo/demo veiksmas).
- [ ] **Trust / social proof blokas prie sprendimo momento:** pridėti realesnius įrodymus prie `Hero` arba prieš `Pricing` (logotipai, trumpas testimonial, konkretūs outcome skaičiai), vietoje silpnesnių placeholder signalų.
- [ ] **`Pricing` srauto prioritetai naujam lankytojui:** peržiūrėti sekos logiką, kad naujam vartotojui planai būtų matomi anksčiau nei `Patikrink prieigą`, o returning-user flow liktų aiškus.
- [x] **`Ecosystem` integracija M1–M6 (training app):** `docs/ECOSYSTEM_MAP.md`, M4 spin-off URL (space/blog/site), completion/gate/footer touchpoints, `cta_click` spin-off analytics. Marketing site funnel (§143) – atskiras backlog site repo.
- [x] **Ecosystem M7–12 blog deepen (training repo):** `BLOG_CURRICULUM_LINKS.yaml`, M7/M10 section-break spinoff, M8/M11 test-fail deepen, M9/M10/M12 ModuleComplete, M4 65.8 deep link.
- [x] **Agent spine – ekosistemos žinios:** `AGENTS.md` §Ecosystem, `sot_index.json`, orchestrator SKILL, agent lessons, RELEASE_QA §5f, ANALYTICS §4a.

- **A1** Moduliai 7+ Jūs vs tu (atskira eiga: GOLDEN_STANDARD §4.2 + grep).
- **A2** Footer „Toliau – skaidrė X“ – **M10 ✅ release QA** (2026-06-29: 10.45/10.48 numeriai OK, EN footers); likusiems moduliams – globali patikra prieš release pagal `.cursor/rules/footer-slide-numbers.mdc`.
- **A3** blockVariant – likusios sekcijos (accent/brand/terms).
- ~~**Orch** Agentų orkestratoriaus schema į kursą~~ ✅ 2026-07-05 – M12 **120.5** verslo multi-agent schema (ne meta AGENTS.md) turi React diagramą `m12_multi_agent_schema`; legacy `agent_orchestrator_v2` lieka neaktyvus. ~~Likęs SCHEME darbas – optional vizualizacija M10 10.45.~~ ✅ **10.45** `M10AgentTaxonomyDiagram` (L0–L3 + rolės).
- **Arch-B** Jei kada nors bus reikalingas modelis B – atskiri `modules-m1-m6.json` + `modules-m7-m15.json` kaip authoring failai ir agreguotas `modules.json` – tai daryti tik kaip atskirą architektūrinį projektą (scripts, validacija, loaderiai, testai, docs), ne šioje iteracijoje.
- **N-DS3** Dizaino gidas → Gamma/Figma. **CE-7, CE-8** gating iš sot_index; eval_rubric heuristikas CI.
- **9a** Favicon. **10** Block skaidrės content-driven. **11** „Kaip naudoti modulį“ M4/M6. **12** Žodynėlis M4 (8–10 terminų). **13** Alternatyvūs kontekstai M6. **14** Monitoring, PWA, Eksportas, Sertifikatas, Multi-language. **15** M2 F3-2–F3-5. **UJ-4, UJ-5** 5 principai: checkbox, collapse.

- [x] **Reflection prompts M8–M15:** M8 sk.82, M10.8, M11 sk.112, M13.9, M14 sk.142 atnaujinti į META + INPUT + OUTPUT (2026-07-09); EN overlay sinchronizuotas. M9/M12/M15 jau turėjo formatą.

**Peržiūrai (netraukti):** M7 branduolys dabar 34 skaidrės + 5 warm-up savitikros; kryptis – sąmoningas interaktyvumo ritmas, ne lean-only mažinimas. Vizualinis triukšmas (GOLDEN_STANDARD – 2–3 spalvos) lieka atskiras peržiūros kriterijus.

---

## 4. Nuorodos

| Kas                                               | Kur                                                                                                                          |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Klaidos                                           | `docs/development/TEST_REPORT.md`                                                                                            |
| Release QA                                        | `docs/development/RELEASE_QA_CHECKLIST.md`                                                                                   |
| PDF testavimas (introPie, M5, M6)                 | `docs/development/PDF_DOWNLOAD_TESTING.md`                                                                                   |
| PDF santrauka ir agentų atmintis                  | `docs/development/PDF_GENERATION_AGENT_MEMORY.md`, `docs/development/PDF_MAKETO_GAIRES.md`                                   |
| Golden Standard                                   | `docs/development/GOLDEN_STANDARD.md`                                                                                        |
| Turinio SOT M1–3 / M4–6                           | `turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md`                                                                 |
| M4 skaidrių eilė, tobulinimai                     | `docs/MODULIO_4_SKAIDRIU_EILES.md`, `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md`                                     |
| UX todo M4–6                                      | `docs/development/ux_todo.md`                                                                                                |
| UX auditas ir įgyvendinimo planas                 | `docs/archive/UX_AUDIT_MICRO_IMPROVEMENTS.md`, `docs/archive/development/analysis/UX_AUDIT_IMPLEMENTATION_PLAN.md`           |
| Mobile P2/P3                                      | `docs/archive/development/MOBILE_UI_UX_AUDIT.md`                                                                             |
| Lentelių standartas                               | `docs/development/LENTELIU_STANDARTAS.md`                                                                                    |
| MUST/SHOULD, agentai                              | `docs/development/PLAN_AGENTAI_DARBAI.md`                                                                                    |
| SCHEME_AGENT, skaidrių tipai                      | `docs/development/SCHEME_AGENT.md`, `docs/SKAIDRIU_TIPU_ANALIZE.md`                                                          |
| MVP Analytics                                     | `docs/development/ANALYTICS_EVENT_TAXONOMY.md`, `docs/development/ANALYTICS_DASHBOARD_MVP.md`                                |
| Production audit (2026-06)                        | `docs/development/AUDIT_2026-06_SUMMARY.md`                                                                                  |
| Integracija (subproject, Vercel, marketingo repo) | `docs/deployment/INTEGRATION_OVERVIEW.md`, `docs/deployment/DEPLOYMENT.md`, `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md` |
| Monetizacija / roadmap                            | `ROADMAP.md` §4.1 (MON-\*), `docs/deployment/MON_P0_EXECUTION_PLAN.md`, `docs/marketing_plan.md`                             |

_Naujos klaidos → TEST_REPORT.md; QA_AGENT atnaujina prioritetus čia._
