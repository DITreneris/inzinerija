# M9 copyable promptų branda (M9P)

> **Statusas:** aktyvus kontraktas (2026-07-26).  
> **Turinio SOT:** [`turinio_pletra_moduliai_7_8_9.md`](../turinio_pletra_moduliai_7_8_9.md) §10.  
> **Journey overlay:** [`modules-journey-m9.json`](../../src/data/modules-journey-m9.json).

## Tikslas

Fit-for-purpose promptai MUST kelyje ir hub bibliotekoje – be naujų skaidrių ir be force-META visiems.

## Klasės

| Klasė            | Kur                                        | Minimalus DoD                                                                             |
| ---------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **F – Flagship** | Sk. 93 step prompts; 93.1 / 93.2 templates | ROLE/TASK/OUTPUT arba aiškus OUTPUT; `[X]` tema; „Nežinau“ kai trūksta duomenų / šaltinio |
| **S – Stage**    | Hub scenarijai (101–116 live 12)           | Trumpas paste-and-run; `doneWhen` leidžia copy arba artefaktą                             |

## Tokenai

- Canonical: `[X]` (themePlaceholder iš journey overlay).
- Legacy brackets (`[TAVO TEMA…]`, `[YOUR TOPIC…]`) – keičiami per `applyM9JourneyTheme`.
- Flagship 93.1: `[įmonės / sektoriaus]` / EN `[company / sector]` → `themePlaceholder` (`applyM9PracticeTemplate`).
- Flagship 93.2: `[STULPELIAI]` / EN `[COLUMNS]` → `sampleColumns` iš journey overlay.
- Sektoriaus banner 93.1 / stulpelių banner 93.2 – `resolveM9JourneySlots` (UI hint; paste = tas pats inject).

## Lygiai (sk. 93)

Bronze = 2 · Silver = 5 · Gold = 8. Pakanka 1–2 DI įrankių.

## Nedaryti

Naujo ethics lab M9; `manipulation-contrast` / `hallucination-pipeline` kopijų; ES-27 default kelio.
