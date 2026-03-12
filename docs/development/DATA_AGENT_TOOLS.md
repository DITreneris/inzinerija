# DATA_AGENT: Įrankių (tools.json) rinkimas ir atnaujinimas

> Šaltiniai ir procedūra, kad DATA_AGENT reguliariai galėtų rinkti įrankius, minimus mokymuose, ir atnaujinti skiltį **Įrankiai**.

**Architektūra A:** `src/data/tools.json` yra full redagavimo SOT. `src/data/tools-m1-m6.json` ir `src/data/tools-en-m1-m6.json` yra core `1–6` build/runtime failai.

---

## 1. Šaltiniai įrankiams

| Šaltinis | Kas ištraukiama |
|----------|------------------|
| **docs/turinio_pletra_moduliai_4_5_6.md** | Lentelės „Įrankis \| Nuoroda \| …“, blokai apie įrankius (Gamma, Perplexity, Elicit, NoteLM, Trello, prezentacijų įrankiai, DI studentams). |
| **src/data/modules.json** | Full redagavimo SOT. Iš čia traukiami `slides[].content.tools` (tipas `action-intro`) – Moduliai 1 ir 4; content-block skaidrės su lentelėmis („PAGRINDINIAI ĮRANKIAI“, prezentacijų įrankiai, DI studentams); `content.groups` (ai-workflow) – name, url, tooltip; `content.presentationTools`; workflow pavyzdžiai (`chain` masyvai) – unikalūs įrankių pavadinimai. |

---

## 2. Struktūra tools.json

- Full redagavimo failas: **src/data/tools.json**
- Core build/runtime failai: **src/data/tools-m1-m6.json**, **src/data/tools-en-m1-m6.json**
- Schema: **scripts/schemas/tools.schema.json**
- Laukai įrašui: `name` (privaloma), `moduleId` (privaloma), `url`, `description`, `category` (neprivaloma; pvz. „Pokalbių DI“, „Prezentacijos“, „RAG / tyrimai“, „RAG / išoriniai šaltiniai“, „Vizualas“).

---

## 3. Procedūra (periodinis atnaujinimas)

1. Perskaityti turinio SOT (`docs/turinio_pletra_moduliai_4_5_6.md`) – lentelės ir blokai su įrankių pavadinimais, nuorodomis, aprašymais.
2. Iš **modules.json** ištraukti:
   - Visus `content.tools` iš skaidrių su `type: "action-intro"` (Moduliai 1, 4).
   - Lentelių eilutes iš content-block skaidrių (pvz. „Pagrindiniai įrankiai“, „DI įrankiai studentams“).
   - `content.groups` iš skaidrių tipo `ai-workflow` (name, url, tooltip → description).
   - `content.presentationTools` (name, url, forWhom → description).
   - Workflow `chain` masyvus – unikalius įrankių pavadinimus; suderinti su jau esančiais įrašais arba pridėti naujus su tinkamu moduleId (pvz. 4) ir category.
3. Suformuoti / atnaujinti įrašus: `name`, `url`, `description`, `moduleId`, `category`. Išvengti dublikatų (lyginti pagal normalizuotą pavadinimą, pvz. „ChatGPT“ ir „ChatGPT (OpenAI)“ – vienas įrašas).
4. Įrašyti atnaujintą sąrašą į **src/data/tools.json**.
5. Jei pakeitimas turi patekti į core `1–6` build profilį, atnaujinti ir **src/data/tools-m1-m6.json** (bei EN variantą, jei reikia).
6. Paleisti **npm run validate:schema** – įsitikinti, kad full ir core tools failai atitinka schemą.

---

## 4. Kada atnaujinti (periodiškumas)

- **Pagal reikalavimus:** po pakeitimų turinio SOT (nauji įrankiai, naujos lentelės) arba **modules.json** (naujos skaidrės su tools, groups, presentationTools arba workflow chain).
- **Jei keitimas liečia core `1–6`:** po full failo atnaujinimo suderinti **tools-m1-m6.json** ir, jei reikia, **tools-en-m1-m6.json**.
- **Periodiškai:** kartą per sprintą arba **prieš kiekvieną release** – ištraukti visus minimus įrankius iš SOT ir modules.json, atnaujinti tools.json, patikrinti nuorodas (url).

Bendras duomenų atnaujinimo periodiškumas (visi DATA_AGENT failai): žr. **`docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`**.
