# M7–9 skaitomumo / scheme ROI – vykdymo planas

> **Data:** 2026-07-31  
> **Statusas:** **done** 2026-07-31 (Sprint 1–3; soft residual žemiau).  
> **SOT auditas:** [`M7_M9_SCHEME_AUDIT.md`](../M7_M9_SCHEME_AUDIT.md)  
> **Tickets:** archive [`TODO_DONE_SPRINTS_2026-07-31.md`](../../archive/development/TODO_DONE_SPRINTS_2026-07-31.md) (`M79-S*` + `A11Y-*`)  
> **Produktiniai sprendimai (2026-07-31):** (1) **gylis lieka** – Flagship / Stage copyable netrumpinti „greičio“ vardan; (2) **M79-S\*** epic **done** 2026-07-31; (3) **Density DoD = ne** (žr. §2); (4) M13 residual 13.3/13.4 – **`M1315-DENS` done** 2026-07-31 (soft pass).

---

## 1. Tikslas

Pakelti M7–9 mokymosi skaitomumą per **extraneous load** sumažinimą: atlygis be darbo, melagingi gate’ai, neįskaitoma compact tipografija, a11y tab hell — **ne** per turinio išretinimą ar formalų density CI.

Exit (šiame repo): A1–A2 FAIL uždaryti + tipografijos grindys + miręs kadras; A5-INDIV / A6-REGISTRY be naujo cut; `build:production` žalias; CHANGELOG + TEST_REPORT.

---

## 2. Density – ORCHESTRATOR sprendimas

| Variantas                        | Verdiktas                                      |
| -------------------------------- | ---------------------------------------------- |
| Formalus Density DoD + CI fail   | **Won’t** – kerta gylį (Flagship / deep craft) |
| Soft CONTENT checklist (žemiau)  | **Yes** – taikyti M79 polish ir vėliau dens    |
| `audit-long-without-collapsible` | Lieka **warn / rankinis**; ne release blocker  |

**Soft checklist (ne CI):**

1. MUST skaidrė: `Trumpai` 1–2 sakiniai first viewport (GOLDEN §3.2).
2. Optional / legal / MASTER sienos → collapsible; MUST veiksmas (Daryk / Copy) lieka atviras.
3. Interakcija: null iki pasirinkimo; jokių fake „prieš copy“ be realaus gate.
4. Ilgis OK, jei progressive disclosure + vienas primary action.
5. Drausti Trumpai ≈ takeaway echo (coherence).

M13 **13.3 / 13.4** residual dens → `TODO` **M1315-DENS** (**done** 2026-07-31 soft pass).

---

## 3. Sprintų eilė (worst-first)

### Sprint 1 – korektiškumas mokiniui (A1 + A2-CARDS)

| ID          | Owner                                | DoD (trumpai)                                                                                    |
| ----------- | ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **M79-S1a** | CODING (+ CONTENT jei pervadinti)    | Realus Copy gate **arba** pervadinti; ChoiceControl; `aria-live`; 67.8 copyable arba kitas tipas |
| **M79-S1b** | CODING + CONTENT (`whenHint`) + DATA | `autoSelect` off / null; testo perrašymas (ne skip); `whenHint` ×9; `aria-live` linked           |
| **M79-S2a** | CODING                               | Kortelės `tabIndex={-1}` + `aria-hidden`; `role="img"` kolizija; guard test                      |

**QA:** LT/EN dark+light ant 67, 67.8, vienos chip skaidrės, 74 + M9/93.  
**Rizika:** S1b laužo praeinantį auto-select testą – diff’e perrašymas.

### Sprint 2 – scope + tipografija (A2-SCOPE + A3 + A4)

| ID             | Owner               | DoD                                                                        |
| -------------- | ------------------- | -------------------------------------------------------------------------- |
| **M79-S2b**    | CONTENT→DATA→CODING | Scope bubble SOT; unikalūs deep-link; tokenai; mirusių šakų šalinimas      |
| **M79-S3**     | SCHEME→CODING       | Globalūs `diagramTokens` compact floors; 92/94/100 re-fit; cross-mod smoke |
| **M79-S4**     | SCHEME→CODING       | viewBox kirpimas (oras↓), ne BOX↑                                          |
| **A11Y-GUARD** | CODING / QA         | Registry render → drausti focusable vaikus `[role="img"]` viduje           |

**Rizika:** S3 liečia M1–15 compact defaults – re-fit sibling’us, ne tik M7.

### Sprint 3 – polish + registry (A5 + A6 + sweep)

| ID             | Owner                 | DoD                                                                 |
| -------------- | --------------------- | ------------------------------------------------------------------- |
| **M79-S5**     | SCHEME→CONTENT→CODING | Metafora 73 vs 89 (+ kitos); be pixel-parity DoD                    |
| **M79-S6**     | SCHEME / DATA         | Overlay dublių šalinimas; `contentSot` korekcijos                   |
| **A11Y-SWEEP** | CODING                | Schema3 / Rag / WorkflowComparison / ContextEng / LlmAutoregressive |

---

## 4. Agentų kelias (tipinis batch)

CODING (gate/chips/a11y) · CONTENT (`whenHint`, pervadinimai, soft density) · DATA (LT+EN + `generate:core-data` kai M1–9) · SCHEME (tokenai / viewBox / metafora) · UI_UX (§4.2 spot) · QA (TEST_REPORT + preflight).

Feature Doc **nereikia** – nėra naujo Pattern; enhancement ant esamų embed/Shell.

---

## 5. Ne šiame plane

- M13 13.3/13.4 dens trim → **M1315-DENS** (**done** 2026-07-31 soft pass)
- M1315-S6/S7 process individuality → **done** 2026-07-31 (S4-INDIV + S5-THIRDS)
- Formalus Density DoD / CI
- Horizon D / MON kaip learning P0
- Nauji lab’ai „skaitomumui“

---

## 6. Definition of done (epic)

- [x] Sprint 1: `M79-S1a` + `S1b` + `S2a` (2026-07-31)
- [x] `M79-S2b`…`S4` + `A11Y-GUARD` (2026-07-31)
- [x] Soft density checklist – apply when CONTENT already in PR (no CI; not a blocker)
- [x] Focused lint + vitest green (`diagramRoleImgFocusableGuard`, individuality, scope, story cycle)
- [x] CHANGELOG + TEST_REPORT (Sprint 1 + Sprint 2–3)
- [x] S5/S6/A11Y-SWEEP done; soft residual listed below (not separate tickets)

**Soft residual:** ✅ cleared 2026-07-31 — (71) focus ring on button; (731) no feDropShadow + `stroke.active`; (67.7) single Shell `aria-live`; (M9/90) quest map `role="group"`.

```text
CHANGES: M79 Sprint 2–3 done 2026-07-31; soft residual cleared same day
CHECKS: vitest path-map focus + M1315 individuality + teaching-elements:strict
RISKS: none learning-P0 dens residual
NEXT: MON out of scope; Horizon D parked
```
