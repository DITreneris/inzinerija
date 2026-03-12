# Agentų verifikacija: kad nepraneštų „padaryta“, kai darbas neapdarytas

> **Kontekstas:** Vartotojas gavo agento ataskaitą, kad Schema 3 ir Schema 4 įgyvendintos kaip React komponentai, statinis SVG – tik fallback. Screenshot rodo naršyklėje atidarytą **statinį SVG** (`localhost:3000/schema4_multimodal.svg`). Vartotojo išvada: agentas „padarė“ darbus tik ataskaitoje, o realiai pilname dydyje matomas senasis SVG, ne React.

---

## 1. Kas realiai nutiko (diagnozė)

| Vieta | Kas įvyksta |
|-------|-------------|
| **Skaidrėje** | `ContentSlides.tsx`: kai `section.image.includes('schema4')`, renderinamas `<Schema4Diagram />` – tai **React komponentas**. Skaidrėje vartotojas iš tiesų mato React. |
| **Nuoroda „Peržiūrėti pilname dydyje“** | `href={... section.image ...}` → `schema4_multimodal.svg` → atsidaro **statinis SVG failas** (pvz. `localhost:3000/schema4_multimodal.svg`). |
| **Vartotojo kelias** | Paspaudė „Peržiūrėti pilname dydyje“ → naršyklė atidaro tik SVG. Vartotojas mano: „tai ir yra tas patobulintas rezultatas“ – ir mato failą, ne React. |

**Išvada:** Techniškai skaidrėje rodomas React komponentas, bet **vienintelis akivaizdus veiksmas „peržiūrėti didesnį vaizdą“ veda į statinį SVG**. Ataskaitoje rašoma „statinis SVG – tik fallback“, bet vartotojo patirtis yra: „pilname dydyje“ = SVG. Todėl ataskaita skamba kaip melagystė: „padarėme React, SVG tik fallback“, o vartotojas to fallback ir mato kaip pagrindinį vaizdą.

---

## 2. Hipotezės: kodėl agentai raportuoja „padaryta“, nors darbas neapdarytas / klaidinantis

| # | Hipotezė | Paaiškinimas |
|---|----------|--------------|
| H1 | **Tikrinamas tik kodas, ne vartotojo kelias** | Agentas patikrina: ar failas `Schema4Diagram.tsx` egzistuoja, ar `ContentSlides.tsx` turi šaką `section.image.includes('schema4')` → `<Schema4Diagram />`. **Nepatikrina:** kas nutinka, kai vartotojas paspaudžia „Peržiūrėti pilname dydyje“ – ar jis mato tą patį React, ar statinį SVG. |
| H2 | **Nuorodos semantika neįvertinta** | „Pilname dydyje“ vartotojui reiškia „tą patį turinį, tik didesnį“. Jei nuoroda veda į kitą šaltinį (SVG failą), tai jau **ne** „tas pats turinys“ – tai kitas kanalas. Agentas to neįskaitė kaip dalies „įgyvendinimo“. |
| H3 | **Raportuojama pagal SOT dokumentą, ne pagal UI** | SCHEME_AGENT.md sako: „geometrijos tiesa – React komponente; statinis SVG – tik fallback“. Agentas ataskaitoje cituoja SOT, bet **nesulygina SOT su realiu UI**: ar „fallback“ nėra vienintelis įmanomas pilno dydžio vaizdas. |
| H4 | **Nėra privalomos „user path“ patikros** | Orkestratoriuje ir SCHEME_AGENT nėra aiškaus reikalavimo: „Po schemos pakeitimų privaloma patikrinti: (1) skaidrėje matomas React, (2) veiksmas „Peržiūrėti pilname dydyje“ atidaro X – jei X = statinis SVG, tai turi būti aiškiai nurodyta ataskaitoje arba pakeista į React.“ Be to, agentas gali raportuoti „OK“, neįsitikinęs. |

---

## 3. Sprendimai (įgyvendinta / rekomenduojama)

### 3.1 Produktas: „Pilname dydyje“ = tas pats React (ne SVG)

- **Problema:** Nuoroda „Peržiūrėti pilname dydyje“ atidaro statinį SVG; vartotojas mano, kad tai pagrindinis rezultatas.
- **Sprendimas:** Schema 3 ir Schema 4 skaidrėse „Peržiūrėti pilname dydyje“ **nebeveda į .svg failą**, o atidaro **tą patį React komponentą** pilname dydyje (modalas), kaip jau rodoma skaidrėje. Taip vartotojas visur mato tą pačią geometrijos tiesą (React).
- **Implementacija:** Komponentas `EnlargeableDiagram`: rodo diagramą (children/renderContent) ir mygtuką „Peržiūrėti pilname dydyje“; paspaudus atidaromas modalas su tuo pačiu React komponentu. Atsarginė nuoroda į SVG (jei reikia) gali būti mažu šriftu: „Atidaryti SVG failą (atsarginė kopija)“.

### 3.2 Procesas: SCHEME_AGENT privaloma verifikacija

- **Problema:** Agentas raportuoja pagal kodą, ne pagal tai, ką vartotojas mato.
- **Sprendimas:** SCHEME_AGENT.md papildyti skyriumi **„Privaloma verifikacija – nemeluoti“** (§ žr. dokumente):
  - Po schemos/React diagramos pakeitimų **privaloma** patikrinti:
    1. **Skaidrėje:** ar tikrai renderinamas React komponentas (ne `<img src="...svg">`).
    2. **„Peržiūrėti pilname dydyje“:** ar vartotojas gauna **tą patį** turinį (React) – pvz. modalas su React, arba aiškiai parašyti ataskaitoje: „Pilname dydyje nuoroda šiuo metu atidaro statinį SVG (fallback); geometrijos tiesa skaidrėje – React.“
  - **Draudžiama** raportuoti „Schema X įgyvendinta kaip React, SVG tik fallback“, jei nepatikrinta, kad pilname dydyje vartotojas nemato tik SVG kaip pagrindinį vaizdą (arba ataskaitoje aiškiai nurodyti išimtį).

### 3.3 Orkestratorius: CHECKS = „ką vartotojas mato“

- **Problema:** CHECKS dažnai aprašo tik „build/test/lint“ arba „atidarėme failą X“.
- **Sprendimas:** Kai CHANGES liečia skaidrių vizualizaciją (diagramos, nuorodos), CHECKS **privalo** įtraukti: „Vartotojo kelias: skaidrė X – ar rodomas [React/komponentas]; nuoroda „Peržiūrėti pilname dydyje“ – ar atidaro [tą patį React / modalą / aiškiai fallback].“ Tai sumažina „padaryta tik ataskaitoje“ situacijas.

### 3.4 Dokumentuoti „fallback“ sąžiningai

- Jei kur nors dar lieka nuoroda į statinį SVG (pvz. „Atidaryti SVG failą“), SOT ir ataskaitose **aiškiai** rašyti: „Statinis SVG naudojamas tik kaip atsarginė nuoroda / atsisiuntimui; **geometrijos ir turinio tiesa – React komponente**; pilname dydyje pagrindinis būdas – modalas su React.“

---

## 4. Santrauka

| Problema | Priežastis | Sprendimas |
|----------|------------|------------|
| Vartotojas mato SVG pilname dydyje | Nuoroda „Peržiūrėti pilname dydyje“ = href į .svg | Pilname dydyje rodyti React (modalas); SVG tik atsarginė nuoroda |
| Agentas raportuoja „padaryta“, nors UX klaidinantis | Nėra privalomos vartotojo kelio patikros | SCHEME_AGENT + orkestratorius: verifikacija „ką vartotojas mato“ ir „ką atidaro nuoroda“ |
| SOT „SVG tik fallback“ skamba netikėtai | Fallback yra vienintelis pilno dydžio vaizdas | SOT atitinka realybę: pilname dydyje – React (modalas); SVG – tik atsarginė nuoroda |

---

**Failai:** `docs/development/SCHEME_AGENT.md` (verifikacijos skyrius), `src/components/slides/shared/EnlargeableDiagram.tsx` (naujas), `ContentSlides.tsx` (schema3/schema4 naudoja EnlargeableDiagram), `.cursor/rules/agent-orchestrator.mdc` (CHECKS = vartotojo kelias, kai keičiama vizualizacija).
