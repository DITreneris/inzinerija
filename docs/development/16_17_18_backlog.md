# M16–M18 backlog (Kodo inžinerija / vibe-coding)

> **Statusas:** `authoring done` + **TE Must + Should S1–S4 + C2 done** (2026-08-01) — `M1618-D0`…`F8` ✅ · `TE-M1618-0`…`M5` ✅ · S1–S4 ✅ · C2 ✅ · R1–R6 ✅. Open Could → C1 park (sales gate) [`TODO.md`](../../TODO.md) §1.2g. C3–C5 won’t-now. Wave D3 corporate18 Deferred.  
> **Tikslas:** Vienas darbo sąrašas Kodo inžinerijos keliui. Authoring ticket’ai čia (F\*); open TE → TODO §1.2g.  
> **SOT (gates):** [`turinio_pletra_moduliai_16_17_18.md`](../turinio_pletra_moduliai_16_17_18.md) §0 · §6 · **§8** (freeze lifted for F1–F8).  
> **Ladder:** [`ROADMAP.md`](../../ROADMAP.md) Horizon D.  
> **Agent route:** CURRICULUM → CONTENT → DATA → SCHEME/CODING → QA. Feature Doc **tik** jei ChoiceControl A/B/C arba progress-saved brief (SOT §5.3) — v1 = lentelės / copyables.  
> **Ne šiame faile:** Wave D3 corporate18 implementacija.

---

## 1. Entry / Exit

### 1.1 Entry (un-defer)

| Vartas                                                   | Būsena                       |
| -------------------------------------------------------- | ---------------------------- |
| CQ-M79-1 / CQ-M79-2                                      | ✅ (2026-07-26)              |
| CQ-PORTAL 48h                                            | ✅ (2026-07-27)              |
| Product call „kitas kelias = Kodo inžinerija“ + capacity | ✅ (2026-08-01) — `M1618-D0` |
| Learning open P0                                         | nėra                         |

### 1.2 Partial exit — Wave D0 / D1 (seed)

1. Product call + capacity užfiksuoti; TODO/ROADMAP pointeriai un-park ✅.
2. `MODULIO_16_SKAIDRIU_EILES.md` — M16+M17+M18 sekcijos (F1–F3).
3. **JSON** — po F1–F3 lock (Wave D2).

### 1.3 Full exit — Wave D2 (authoring brandumas)

1. Skaidrių eilės: M16 + M17 Path Test + M18 iš SOT §2–§4.
2. LT full authoring `src/data/modules.json` + schema; EN overlay; **`generate:core-data` N/A** (M16+).
3. Cursor eilutė `tools.json` + `tools-en.json` + `npm run audit:tools`.
4. Schemos / UI: reuse process Shell + content-block; naujas Pattern tik su Feature Doc Contract.
5. Path Test shell parity (GOLDEN §3.4a1); footer/CTA; `TEST_REPORT` smoke + `CHANGELOG`.

**Po D2:** kelias gyvas authoring kataloge. Corporate18 (Wave D3) — atskiras product/pricing call; žr. §4.

---

## 2. Ambition / artefaktų grandinė

```text
M16 planavimas              M17 testas         M18 packet → build → deploy
D1 kortelė ──► D2 brief ──► (patikra) ──► PACKET + rules + Cursor + smoke/Git/DoD
```

| Laukas             | Reikšmė                                                       |
| ------------------ | ------------------------------------------------------------- |
| Žemėlapis          | **M16 = D1+D2** · **M17 = testas** · **M18 = D3+D4+D5**       |
| Stack              | Cursor-first                                                  |
| Framing            | Vibe coding **su disciplina** (brief/PACKET prieš generavimą) |
| Canonical pavyzdys | Dienos prioritetų įrankis (ne vienintelė idėja)               |
| Soft DoD           | Viešas URL **arba** lokalus paleidimo įrodymas + GitHub       |
| Prielaida          | M1–6 baigti; M7–15 neprivalomi                                |
| ≠                  | M7 optional viz (sk. 100–106)                                 |

Biudžetas: M16 ~18–22 sk. · M18 ~22–28 sk. (+ M17 Path Test shell) ≈ **45–55** teaching slides + testas.

---

## 3. Ticket’ai (Waves D0–D2)

### Milestone santrauka

| Phase | ID           | Wave | Owner           | Deliverable                                 | Depends | Status |
| ----- | ------------ | ---- | --------------- | ------------------------------------------- | ------- | ------ |
| I0    | **M1618-D0** | D0   | ORCH / product  | Product call + capacity; un-park            | —       | ✅     |
| I1    | **M1618-F1** | D1   | CURRICULUM      | `MODULIO_16_SKAIDRIU_EILES.md` M16 (~18–22) | D0      | ✅     |
| I2    | **M1618-F2** | D2   | CURRICULUM      | M17 Path Test outline; GOLDEN §3.4a1        | F1      | ✅     |
| I3    | **M1618-F3** | D2   | CURRICULUM      | M18 eilė (~22–28; A→B→C)                    | F1      | ✅     |
| I4    | **M1618-F4** | D2   | CONTENT         | LT copy + copyables (SOT §5.2)              | F1–F3   | ✅     |
| I5    | **M1618-F5** | D2   | DATA            | LT `modules.json` + EN overlay              | F4      | ✅     |
| I6    | **M1618-F6** | D2   | DATA            | Cursor `tools.json` + EN + `audit:tools`    | F5      | ✅     |
| I7    | **M1618-F7** | D2   | SCHEME / CODING | Reuse Shell / content-block                 | F5      | ✅     |
| I8    | **M1618-F8** | D2   | QA              | Path Test parity; TEST_REPORT; CHANGELOG    | F5–F7   | ✅     |

### 3.1 M1618-D0 — Product call / un-park

- [x] **M1618-D0** Product call „kitas kelias = Kodo inžinerija“ + capacity window (2026-08-01)

**Acceptance:** Explicit product decision + capacity for F1–F8 authoring; `TODO.md` §1.2f open; agents may start F1.

### 3.2–3.9 F1–F8

Žr. milestone lentelę + [`MODULIO_16_SKAIDRIU_EILES.md`](../MODULIO_16_SKAIDRIU_EILES.md). Acceptance criteria nepakitę nuo seed versijos (kortelė 5 laukai; brief 11; Path Test shell; PACKET; soft DoD; no Feature Doc v1).

---

## 4. Wave D3 — Corporate18 (future, parked)

> **Ne pradėti dabar.** Prerequisite: F8 authoring brandumas **ir** atskiras product/pricing call.

| Phase | ID           | Deliverable                                                        |
| ----- | ------------ | ------------------------------------------------------------------ |
| I0    | **M1618-C0** | Intake (entry/exit/ne-scope)                                       |
| I1    | **M1618-C1** | `VITE_MAX_BUILD_MODULE=18` + `build:corporate18` + `*-m1-m18.json` |
| I2    | **M1618-C2** | Magic-link tier **18** + testai                                    |
| I3    | **M1618-C3** | `audit:m1618` + RELEASE_QA §6c + CI step                           |
| I4    | **M1618-C4** | DEPLOYMENT + ROADMAP exit + CHANGELOG + marketing handoff          |

---

## 5. Ne-scope / WON’T

| Draudžiama                                        | Kodėl                             |
| ------------------------------------------------- | --------------------------------- |
| MCP / Spec Kit CLI kaip privalomas kelias         | SOT §0 / §6 WON’T                 |
| M7 viz (100–106) perkėlimas į M16–18              | Kitas kelias                      |
| M19–21 DI politikos SOT                           | Ne prieš F1–F3                    |
| Formalus Density DoD / CI                         | Produktinis sprendimas 2026-07-31 |
| MON / PostHog / CRO                               | Kitas repo                        |
| Live Cursor IDE app’e                             | Ne produkto scope                 |
| ChoiceControl A/B/C lab / progress-saved brief v1 | Feature Doc vėliau; v1 = lentelės |
| Wave D3 corporate18                               | Atskiras call                     |

---

## 6. Defaults (architektūra)

| Tema                     | Default                                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| Authoring vs core        | Full `modules.json` iki Wave D3; core profiliai be M16+                  |
| EN                       | `modules-en-m16-m18.json` + `build:modules-en-m16-m18`; ne core generate |
| `generate:core-data`     | N/A M16+                                                                 |
| Feature Doc              | Tik naujas Pattern (v1 — ne)                                             |
| Schemos                  | Reuse InteractiveDiagramShell / process / content-block                  |
| Enlarge                  | `showEnlargeControl` default false                                       |
| Transfer                 | Reuse UJ-MUST ant M18 kai JSON                                           |
| Access / pricing tier 18 | Tik Wave D3                                                              |

---

## 7. Related

| Kas                        | Kur                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------- |
| Turinio SOT                | [`docs/turinio_pletra_moduliai_16_17_18.md`](../turinio_pletra_moduliai_16_17_18.md)  |
| Eilė                       | [`docs/MODULIO_16_SKAIDRIU_EILES.md`](../MODULIO_16_SKAIDRIU_EILES.md)                |
| Content draft              | [`docs/development/intake/M16_M18_CONTENT_DRAFT.md`](intake/M16_M18_CONTENT_DRAFT.md) |
| ROADMAP Horizon D          | [`ROADMAP.md`](../../ROADMAP.md)                                                      |
| TODO open                  | [`TODO.md`](../../TODO.md) §1.2f                                                      |
| Mirror backlog (uždarytas) | [`07_08_09_backlog.md`](07_08_09_backlog.md)                                          |

---

## 8. Sinchronas

| Etapas                           | Būsena                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- |
| Šis backlog                      | **Active** (F1–F8 ✅; R\* ✅; TE Must/Should/C2 ✅; C1 park; C3–C5 won’t-now) |
| SOT §8 freeze                    | Lifted for F1–F8 (2026-08-01)                                                 |
| Open TODO §1.2f `M1618-F*`       | Done 2026-08-01                                                               |
| Open TODO §1.2g `TE-M1618-*`     | Must ✅ · Should S1–S4 ✅ · C2 ✅ · C1 park · C3–C5 won’t-now                 |
| Dens polish pass (I1–I5)         | Done 2026-08-01 — thin tables + m17-q11 + preCopy 16.12/18.11; C1 still park  |
| Open TODO §1.2h `M1618-R*`       | Done 2026-08-01 (M16=22 · M18=28; Soft DoD path-step)                         |
| F1–F3 eilės + JSON / EN / Cursor | Wave D2 done                                                                  |
| Wave D3 corporate18              | Future outline only (§1.5)                                                    |
