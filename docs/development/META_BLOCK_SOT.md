# Meta bloko SOT (Source of Truth)

**Tikslas:** Vienoda Meta bloko semantika ir šablonas visur (Modulio 1 skaidrė, quiz, glossary, UI).

## Semantinis apibrėžimas

**Meta blokas** nustato DI tapatybę ir kontekstą. Jis apima:

| Komponentas | Aprašymas (LT) | Aprašymas (EN) |
|-------------|----------------|----------------|
| **Rolė** | specializacija, patirties lygis | role, experience level |
| **Domeno kontekstas** | pramonė, specifika | industry, domain specifics |
| **Tikslinė auditorija** | kam skirtas rezultatas | who the result is for |
| **Verslo kontekstas** | kodėl tai svarbu | why it matters (business context) |

Pagrindinis klausimas: **Kas esi ir ką darai?** / **Who are you and what do you do?**

## Šablonas (copyable)

- **LT:** `META: Tu esi [vaidmuo]. Tikslas: [rezultatas]. Auditorija: [kam].`
- **EN:** `META: You are [role]. Goal: [result]. Audience: [who].`

## Hero pavyzdys (suvienodintas)

- **Blogas:** „Sukurk man pardavimų ataskaitą.“ / “Write me a sales report.” (neaiški perspektyva)
- **Geras:** Vyresnysis verslo analitikas, 10 m. patirtis e-commerce, tikslas – pardavimų ataskaita valdybos nariams, Q4 strateginiai sprendimai.  
  - **EN:** “You are a senior business analyst with 10 years of experience in e-commerce. Your goal is to prepare a sales report for the board, who will make strategic decisions for Q4.”

## Kur laikomas SOT

- **Skaidrės turinys (UI):** `src/locales/lt.json` ir `src/locales/en.json` – raktai `contentSlides.blockMeta*`.
- **Modulio JSON:** `modules.json` / `modules-en.json` – skaidrės `title`, `subtitle`, `keyQuestion` (jau atitinka).
- **Quiz:** `quiz-en.json` ir LT quiz – paaiškinimuose naudoti tą patį hero pavyzdį (senior analyst, 10 years, e-commerce, board, Q4).
