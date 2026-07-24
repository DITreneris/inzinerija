# Practice closer plan – M3 · M6 · M9 · M12 · M15

> **Status:** locked decisions 2026-07-24 (po lyginamojo audito).  
> **Tikslas:** pakelti GOLDEN grindis (CTA, footers, MUST signalai, uždarymas), **nekeičiant** kiekvieno modulio pedagoginės / dizaino tapatybės.  
> **Ticketai:** `TODO.md` §1.0e (`PC-*`).

## Užrakinti sprendimai

| #   | Klausimas                       | Sprendimas                                                                                              |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | M9 completion                   | **Soft:** `recommended` + badge’ai / intro hierarchija. **Ne** hard `minScenariosToComplete` ant hub’o. |
| 2   | M6 uždarymas                    | **Nauja `summary` skaidrė** (refleksijos echo + handout CTA) – ne tik complete-screen copy.             |
| 3   | Sprint 4 (individualumo polish) | **Backlog po P0–P1** (`PC-4.*`) – nepradėti kol PC-0…PC-3 uždaryti.                                     |

## Guardrails (nedaryti)

- Vieno `PracticeCloserTemplate` visiems penkiems.
- M9 hub’o išmetimo / suvedimo į 11 skaidrių „kaip M12“.
- Diagramų primetimo M3/M6.
- M15 `minScenariosToComplete` kėlimo iki 3.
- Optional M15 151–154 vertimo į pilną content-block triadą.

## Kontraktas (grindys – kopijuoti iš M12 chrome, ne turinį)

Privaloma kiekvienam practice closer:

1. `practice-intro` + `whyBenefit` + `firstActionCTA`
2. Aiškus completion signalas (M3: ≥2; M6: 1 iš {61,67}; M9: soft MUST path; M12: ≥3; M15: ≥1)
3. Uždarymo gestas (`summary` | `practice-summary` | M6 nauja summary)
4. Footers GOLDEN §3.6 ant **primary** kelio

Leidžiama skirtinga: hub (M9), 6-blokų accordion (M3), dual-path (M12/M15), technikų buffet (M6).

## Sprintai

| Sprint | ID      | Turinys                                                                   | Prioritetas          |
| ------ | ------- | ------------------------------------------------------------------------- | -------------------- | --------------- |
| 0      | PC-0    | Šis kontraktas + TODO/ROADMAP sync                                        | Docs                 | done            |
| 1      | PC-1    | M9 MUST vs biblioteka (soft + badge’ai), eilė, footers primary            | P0                   | done 2026-07-24 |
| 2A     | PC-2a   | M3 `firstActionCTA`                                                       | P0                   | done 2026-07-24 |
| 2B     | PC-2b   | M6 gate (1 iš 2) + **nauja summary** + Patikra/footer spragos             | P0                   | done 2026-07-24 |
| 3      | PC-3    | M15 footers; eilės docs M3/M6/M9; certificate SOT nuoroda; M12 audit-only | P1                   | done 2026-07-24 |
| 4      | PC-4.\* | Individualumo polish (portfolio chip, hub filtrai, …)                     | **Backlog po P0–P1** | open            |

### Sprint 1 – M9 (detaliau)

- **MUST path:** 90 → 93 → 93.1 → 93.2 → 94 → (rekomenduojama 104) → 92.
- **Biblioteka:** hub 99 + 101–117 – badge „papildoma“, ne privaloma baigti.
- `docs/MODULIO_9_SKAIDRIU_EILES.md`.
- DATA: `modules.json` + `generate:core-data` + `modules-en-m7-m9.json`.
- CODING: intro/hub MUST vs SHOULD vizualas (esami tipai).

### Sprint 2B – M6 summary

- Nauja `summary` skaidrė eilės gale (po scaffolding / prieš arba po optional – pagal SOT eilę; default: po 64/65 kelio, prieš optional 66/67 arba po abiejų fork’ų – CURRICULUM fiksuoja eilėje).
- Completion: Tyrimo ataskaita **arba** Custom GPT (1 iš 2) – soft UI + intro copy; hard minComplete optional vėliau.
- EN: `modules-en-m4-m6.json`.

## Pipeline

CURRICULUM (jei struktūra) → CONTENT (SOT) → DATA → CODING (jei UI) → UI_UX → QA (`CHANGELOG`, lint/test).

## Nuorodos

- Audito kontekstas: chat 2026-07-24 practice closer lyginamoji analizė.
- GOLDEN: `GOLDEN_STANDARD.md` §3.2 / §3.6 / §4.2.
- SOT: `turinio_pletra.md` (M3), `turinio_pletra_moduliai_4_5_6.md` (M6), `…_7_8_9.md` (M9), `…_10_11_12.md` (M12), `…_13_14_15.md` (M15).
