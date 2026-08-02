# M16–18 copyable promptų branda (TE-M1618-S4)

> Fit-for-purpose klasės Kodo inžinerijos kelyje – **ne** „ilgesnis = brandesnis“.  
> Mirror: [`M13_PROMPT_MATURITY.md`](M13_PROMPT_MATURITY.md) / [`M7_PROMPT_MATURITY.md`](M7_PROMPT_MATURITY.md).  
> SOT: [`turinio_pletra_moduliai_16_17_18.md`](../turinio_pletra_moduliai_16_17_18.md) §5.2. Ticket: `TE-M1618-S4`.

## Klasės

| Klasė       | Paskirtis                                | Tipinis ilgis | Gate                     |
| ----------- | ---------------------------------------- | ------------- | ------------------------ |
| **Brief**   | 11 laukų MVP brief pagalbininkas (16.21) | 6–12 eil.     | `briefCheck` + `preCopy` |
| **Rules**   | `PROJECT_RULES.md` agentui (18.6)        | 8–12 eil.     | `preCopy`                |
| **Cursor**  | Vertikalus pjūvis – 1 Must fn (18.7)     | 5–10 eil.     | `preCopy`                |
| **Klaidos** | Klaidos kontekstas (18.11)               | 4–8 eil.      | `preCopy`                |
| **Planas**  | Planas prieš kodą / approve gate (18.8)  | 4–8 eil.      | `preCopy`                |

## Inventorizacija (live)

| Skaidrė | Klasė                      | Pastaba                                                       |
| ------- | -------------------------- | ------------------------------------------------------------- |
| 16.12   | Skeptikas (Brief sibling)  | Prieš/Po kritika; `preCopy`                                   |
| 16.21   | **Brief**                  | 11 laukų; alias M18 `mvp_brief.md`                            |
| 18.6    | **Rules**                  | Repo šaknis; Must/Won’t/Done/saugumas                         |
| 18.7    | **Cursor**                 | Viena fn; planas prieš generate                               |
| 18.8    | **Planas**                 | Failai → Done → Won’t → „taip“                                |
| 18.11   | **Klaidos**                | Blogas\|Geras kontekstas; `preCopy`                           |
| 18.17   | **Klaidos** (Lab contrast) | `.env` manipulation-contrast; Geras copyables = Rules hygiene |

## DoD (branda)

1. Kreipinys **tu**; **DI** (ne AI) LT; „promptas“ be apostrofų.
2. Be curriculum ID learner body.
3. PreCopy / briefCheck prieš copyable, kai GOLDEN §3.8 ritmas (Must M2).
4. EN via `build:modules-en-m16-m18` – ne `generate:core-data`.
5. Naujas copyable = priskirti klasę čia; ne naujas SlideType.

## WON’T

- Live Cursor / IDE embed kaip copyable pakaitalas.
- MCP / Spec Kit kaip privaloma promptų klasė.
- Flagship „sukurk visą app“ be Must/Won’t.
