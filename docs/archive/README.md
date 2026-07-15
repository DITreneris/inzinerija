# Archyvas – pasenę dokumentai (ne SOT)

> **Atnaujinta:** 2026-07-14  
> **Taisyklė agentams ir žmonėms:** šiame kataloge esantys failai **nėra šaltinis tiesos**. Prieš bet kokį darbą naudokite `docs/DOCUMENTATION_QUICK_REF.md` → `docs/LEAN_INDEX.md` → `docs/DOCUMENTATION_INDEX.md` §1–2.

---

## Kodėl archyvas egzistuoja

- Vienkartinės analizės, auditai ir įgyvendinti planai lieka istorijai.
- Aktyvūs agentų specai, SOT ir checklist'ai lieka `docs/development/` ir `docs/` (ne čia).
- Konfliktas tarp archyvo ir aktyvaus dokumento – **laimi aktyvus** (SOT → JSON → UI).

---

## Struktūra

| Katalogas | Turinys |
|-----------|---------|
| `docs/archive/` | Seni root lygio auditai, pre-launch cleanup, UX mikro auditas |
| `docs/archive/audits/` | Modulių 1–6 UX/mobile audito ataskaitos (2026-03) |
| `docs/archive/development/` | Įgyvendinti planai, vienkartiniai auditai, EN checklist |
| `docs/archive/development/analysis/` | Vienkartinės analizės (DS baseline, CTA, footer, M1–M9 EN ir kt.) |
| `docs/archive/moduliai_7_8_9/` | M7–M9 detalios analizės (verdiktas – `turinio_pletra_moduliai_7_8_9.md`) |
| `docs/archive/root/` | Iš projekto šaknies perkelti txt/md (testai, portalas – konfidencialūs) |

**Pastaba:** šaknies `archive/` (be `docs/`) yra `.gitignore` – senas lokalinis katalogas; naudokite **`docs/archive/`**.

---

## Perkelta 2026-07-14 (iš aktyvių kelių)

| Buvęs kelias | Naujas kelias | Priežastis |
|--------------|---------------|------------|
| `docs/PRE_LAUNCH_DOCUMENTATION_CLEANUP.md` | `docs/archive/PRE_LAUNCH_DOCUMENTATION_CLEANUP.md` | Įgyvendintas pre-launch checklist |
| `docs/REPO_DOKUMENTACIJOS_AUDITAS_2026.md` | `docs/archive/REPO_DOKUMENTACIJOS_AUDITAS_2026.md` | Vienkartinis repo doc auditas |
| `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md` | `docs/archive/UX_AUDIT_MICRO_IMPROVEMENTS.md` | UX mikro auditas – rezultatai įgyvendinti arba TEST_REPORT |
| `docs/MODULIO_1_ADVANCED_SKAIDRIU_VEIKSMO_PRAKTIKOS_ANALIZE.md` | `docs/archive/...` | Analizė įgyvendinta (veiksmoIntro JSON) |
| `docs/AUDITO_ATASKAITA_MODULIAI_1_6_*.md` | `docs/archive/audits/` | Istorinės UX/mobile ataskaitos |
| `docs/development/VERSION_AUDIT_2026-03-16.md` | `docs/archive/development/` | Vienkartinis versijos auditas |
| `docs/development/PRE_DEPLOY_AUDIT_2026-03-13.md` | `docs/archive/development/` | Pre-deploy auditas atliktas |
| `docs/development/ARCHITEKTUROS_1_6_7_15_TVARKYMO_PLANAS.md` | `docs/archive/development/` | Architektūros planas – įgyvendinta dalis |
| `docs/development/PLAN_JUS_TU_DI_AI_SLIDES.md` | `docs/archive/development/` | Įgyvendintas i18n planas |
| `docs/development/MOKYMU_PROMPTU_KONTEKSTO_AUDITAS_MODULIAI_1_6.md` | `docs/archive/development/` | Vienkartinis konteksto auditas |
| `docs/development/AUDIT_SKAIDRE_63_SUPER_PROMPTAI.md` | `docs/archive/development/` | Skaidrė 63 perkelta į M7 |
| `docs/development/MODULIU_7_8_9_GILI_ANALIZE_VERDIKTAS.md` | `docs/archive/development/` | Istorinė analizė; dalis nebevalidi po 1.4.0 |
| `docs/development/EN_UI_US_CONTEXT_CHECKLIST.md` | `docs/archive/development/` | Vienkartinis EN checklist |
| `docs/archive/development/analysis/*` | `docs/archive/development/analysis/*` | Vienkartinės analizės – ne kasdieninis SOT |

---

## Aktyvūs dokumentai (kur eiti vietoj archyvo)

| Sritis | Naudokite |
|--------|-----------|
| Navigacija | `docs/DOCUMENTATION_QUICK_REF.md`, `docs/LEAN_INDEX.md` |
| Turinys M1–15 | `turinio_pletra.md`, `docs/turinio_pletra_moduliai_*.md` |
| Dizainas | `docs/development/GOLDEN_STANDARD.md` |
| Agentai | `docs/development/*_AGENT.md`, `docs/development/AGENT_ORCHESTRATOR.md` |
| Klaidos / QA | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md` |
| M4 sk. 53.5 news-portal | `docs/development/NEWS_PORTAL_SLIDE_53_5.md`, `PORTAL_BEAT_DIAGRAMS.md` |
| DS baseline (referencui) | `docs/archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-05.md` – **tik istorijai**; aktyvus SOT – `DESIGN_SYSTEM_V0_2.md` |

---

## Senesni archyvo failai (2026-02 – 2026-03)

Žr. poaplankius `development/`, `moduliai_7_8_9/`, `root/` – agentų sekos, M4 skaidrių auditai, marketingo superseded versijos, User Journey analizės. Visi pažymėti kaip **ARCHIVED** antraštėse arba README skyriuose.

**Nenaudoti** kaip pagrindinio šaltinio – tik istorinei informacijai arba „kodėl taip padarėme“ kontekstui.
