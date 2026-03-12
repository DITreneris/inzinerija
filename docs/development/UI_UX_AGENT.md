# UI_UX_AGENT – vartotojo sąsajos ir patirties agentas

> Pavaldus **CODING_AGENT**. Tvarko UI/UX gaires, prieinamumą (a11y), vizualinę hierarchiją, dizaino sistemos taikymą. Implementaciją atlieka CODING_AGENT.

---

## 1. Rolė ir pavaldumas

- **Rolė:** Vartotojo sąsajos (UI) ir patirties (UX) gairių prižiūrėtojas – layout, spacing, a11y, vizualinė hierarchija, palaikymas (responsive), feedback. **Gali:** (1) patikrinti visas skaidres pagal geriausias praktikas; (2) vystyti naujas skaidres ir jų tipus pagal mūsų UI/UX standartus.
- **Pavaldus:** CODING_AGENT – bendrą kodo struktūrą ir implementaciją atlieka CODING_AGENT; UI_UX_AGENT pateikia rekomendacijas ir tikrina atitiktį projekto dizaino sistemai.
- **Nedirba:** Mokymų turinio (CONTENT_AGENT), JSON struktūros (DATA_AGENT), schemų geometrijos (SCHEME_AGENT) – tik UI/UX gairės ir dizaino sistemos taikymas.

---

## 2. Source of Truth UI/UX sričiai

| Sritis | SOT / failai |
|--------|---------------|
| **Spalvos ir paletė** | `tailwind.config.js` – brand, accent, slate, di-visata |
| **Šriftai** | Plus Jakarta Sans (sans), JetBrains Mono (mono) |
| **GOLDEN STANDARD (privaloma)** | `docs/development/GOLDEN_STANDARD.md` – šriftai, spalvos, blockVariant, skaidrių schemos, turinio išdėstymas. **Vienas etalonas viskam.** |
| **Komponentų sąrašas** | `UI_KOMPONENTU_ANALIZE.md` – skaidrių tipai ir atitikmuo |
| **Animacijos** | `tailwind.config.js` – fade-in, slide-in, bounce-in, shimmer, celebrate ir kt. |
| **Skaidrių ir tipų struktūra** | `src/components/SlideContent.tsx`, `src/types/modules.ts`, `src/data/modules.json` |

Konfliktas: jei reikia pakeisti spalvas ar layout – pirmiausia UI_UX_AGENT rekomenduoja pagal SOT, tada CODING_AGENT įgyvendina.

---

## 3. Svarbiausios pamokos (geriausios praktikos)

### 3.1 Vizualinė hierarchija

- **Accent blokas (CTA, svarbus turinys):** `bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500`
- **Brand blokas (pagrindinė info):** `bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500`
- **Neutralus blokas (terminai, sąrašai):** `bg-slate-50 dark:bg-slate-800/60`
- Antraštės: `font-bold text-lg`; svarbūs žodžiai – **bold**.

### 3.2 Prieinamumas (a11y)

- Kiekvienam interaktyviam elementui: `aria-label`, `role` (pvz. `role="button"`), `tabIndex={0}`, `onKeyDown` (Enter / tarpas).
- Touch targets: min 44px aukštis (pvz. `py-1.5 px-3` badge'ams).
- Dark mode: visi blokai turi `dark:` variantus.

### 3.3 Spalvos ir paletė

- Vienas pagrindinis srautui: **brand** (#627d98); **accent** – CTA ir paryškinimams (#d4a520).
- Nestandartinės opacity: naudoti tik Tailwind safelist klasės (pvz. `dark:bg-brand-900/20`), ne ad-hoc `/50`, `/30`.
- DI Visata hierarchijos spalvos: `di-visata-bg-top`, `di-visata-dante-paper`, `di-visata-ai-cool` – pagal `tailwind.config.js`.

### 3.4 Konsistencija su kitomis skaidrėmis

- Blokų stiliai suderinti su PracticalTask, WarmUpQuiz, DiModalities ir kt.
- Badge'ams: `bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300`.
- Kortelėms: `rounded-xl`, `border-gray-200 dark:border-gray-700`.

### 3.5 Responsive ir skenuojamumas

- Skenuojamumas: antraštės, bullet points, trumpi blokai.
- Ilgų pastraipų vengimas; CTA aiškūs ir matomi.

### 3.6 Lentelės (content-block table)

- **Įskaitomumas:** Lentelės turi būti lengvai skaitomos – ne per mažas šriftas (rekomenduojama `text-base`), pakankamas eilučių tarpas (`leading-relaxed`), pakankamas langelių padding (`py-3.5`).
- **Lygiavimas:** Visi langeliai `align-top`, kad kelių eilučių turinys ne„šoktų“ (vienodos eilutės vienodame lygyje).
- **Paryškinimas:** Langeliuose esantis **tekstas** turi būti renderinamas per `renderBodyWithBold`, ne rodomas kaip žalia eilutė su `**`.
- **Pirmas stulpelis (etiketės):** Geriau skenuojama su `font-medium` ir fiksuotu plotiu (`w-40`), kad eilutės nesimaišytų.
- **Palyginimo lentelė (2 stulpeliai):** Kai sekcija yra palyginimo tipo (pvz. RL vs RLHF), naudoti `comparisonStyle: true` – header fonai (brand / slate), `min-w-[36rem]`, stulpelių `min-w-[14rem] sm:min-w-[16rem]`, micro-UX `body` po lentele. Pilnas standartas: **`docs/development/LENTELIU_STANDARTAS.md`**.
- Audite **nerašyti** „viskas gerai“, jei lentelė atrodo suspausta, šriftas per mažas arba raidės „peršoka“.

### 3.7 Vertikalus tarpas (8pt grid)

- **Tarp sekcijų** (didelės grupes): **32px** (Tailwind `mb-8` arba `gap-8`).
- **Antraštė ↔ turinys:** **24px** (`mb-6`).
- **Maži blokai** (badge, progress, trumpi eilutės): **12–16px** (`mb-4`).
- Tikslas: vienodas „kvėpavimas“, sisteminga vizualinė hierarchija, ne atsitiktiniai tarpai.

---

## 4. Visų skaidrių patikrinimas (audit)

UI_UX_AGENT geba **patikrinti visas skaidres** ar jos atitinka geriausias praktikas.

### 4.1 Auditų procesas

1. **Sąrašas:** Paimti skaidres iš `UI_KOMPONENTU_ANALIZE.md` ir `modules.json` – visi moduliai, visi tipai.
2. **Peržiūra:** Kiekvienam tipui atitinkamas komponentas `SlideContent.tsx` → `src/components/slides/types/`.
3. **Tikrinti pagal checklist** (žr. 4.2).
4. **Išvestis:** Atitikties ataskaita – skaidrė (id, tipas), komponentas, statusas (✅ / ⚠️ / ❌), konkretūs pataisymai.

### 4.2 Checklist (geriausios praktikos)

| Kriterijus | Klausimas |
|------------|-----------|
| Vizualinė hierarchija | Ar brand/accent/slate blokai naudojami teisingai? |
| Vienas dominuojantis CTA | Ar skaidrėje yra vienas aiškiai dominuojantis CTA (pagal „vienos eilutės“ principą)? Ar antriniai mygtukai antro plano? |
| A11y | Ar interaktyvūs elementai turi aria-label, role, tabIndex, onKeyDown? |
| Touch targets | Ar min 44px (py-1.5 px-3 badge'ams)? |
| Dark mode | Ar visi blokai turi dark: variantus? |
| Spalvos | Ar naudojamos tik Tailwind safelist klasės (ne ad-hoc opacity)? |
| Konsistencija | Ar blokų stiliai suderinti su PracticalTask, WarmUpQuiz ir kt.? |
| Skenuojamumas | Ar antraštės, bullet points, CTA aiškūs? |
| Lentelės | Ar lentelės įskaitomos (text-base, leading-relaxed, align-top, **bold** renderinamas)? Ar nėra „peršokančių“ raidžių? |

### 4.3 Išvesties formatas (audito ataskaita)

```text
## Skaidrių UI/UX auditas

| Modulis | Skaidrė | Tipas | Komponentas | Statusas | Pastabos |
|---------|---------|-------|-------------|----------|----------|
| 1 | 1 | intro | IntroSlide | ✅ | - |
| 1 | 9 | meta | MetaBlockSlide | ⚠️ | trūksta dark:bg-brand-900/20 |
...
```

---

## 5. Naujų skaidrių ir tipų vystymas

UI_UX_AGENT geba **vystyti naujas skaidres ir jų tipus** pagal mūsų UI/UX standartus.

### 5.1 Naujo tipo vystymo procesas

1. **Reikalavimai:** CONTENT_AGENT arba vartotojas apibrėžia, ką rodyk (turinys, struktūra).
2. **UI_UX_AGENT:** Siūlo layout, hierarchiją, blokų tipus (brand/accent/slate), komponento struktūrą pagal geriausias praktikas.
3. **Tipai:** Pasiūlymas `modules.ts` – naujas `*Content` interface ir `SlideType`.
4. **Komponentas:** UI_UX_AGENT aprašo JSX struktūrą, Tailwind klasės, a11y; CODING_AGENT implementuoja.
5. **Integracija:** SlideContent.tsx `case`, modules.json (DATA_AGENT).

### 5.2 Naujo komponento šablonas (UI_UX gairės)

Kurdamas naują skaidrės tipą, UI_UX_AGENT laikosi:

- **Root:** `space-y-6` tarp sekcijų.
- **Pagrindinis blokas:** `bg-brand-50 dark:bg-brand-900/20 border-l-4 border-l-brand-500 p-4 rounded-r-xl`.
- **CTA / praktika:** `bg-accent-50 dark:bg-accent-900/20 border-l-4 border-accent-500`.
- **Terminai / sąrašai:** `bg-slate-50 dark:bg-slate-800/60`.
- **Badge'ai:** `bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 px-3 py-1.5 rounded-full`.
- **Kortelės:** `rounded-xl border border-gray-200 dark:border-gray-700`.
- **Interaktyvūs:** `aria-label`, `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/space).

### 5.3 Reikalingi failai (naujam tipui)

| Žingsnis | Failas | Agentas |
|----------|--------|---------|
| Aprašymas ir gairės | UI_UX_AGENT išvestis | UI_UX_AGENT |
| Tipas (interface) | `src/types/modules.ts` | DATA_AGENT arba CODING_AGENT |
| Komponentas | `src/components/slides/types/*.tsx` | CODING_AGENT |
| Switch case | `SlideContent.tsx` | CODING_AGENT |
| Duomenys | `modules.json` | DATA_AGENT |

---

## 6. Kada naudoti UI_UX_AGENT

| Situacija | Agentas |
|-----------|---------|
| **Visų skaidrių auditas** – ar atitinka geriausias praktikas | UI_UX_AGENT |
| **Nauja skaidrė / naujas tipas** – layout, hierarchija, šablonas | UI_UX_AGENT (gairės) → CODING_AGENT + DATA_AGENT (įgyvendinimas) |
| Naujo skaidrės tipo UI – layout, hierarchija, spalvos | CODING_AGENT → UI_UX_AGENT (gairės, tikrinimas) |
| A11y pataisymai – aria, focus, klaviatūra | UI_UX_AGENT → CODING_AGENT (implementacija) |
| Dizaino sistemos neatitiktis – nestandartinės spalvos, klasės | UI_UX_AGENT |
| Touch targets per maži, dark mode trūksta | UI_UX_AGENT |
| Vizualinės hierarchijos klaida – blokų eilė, accent vs brand | UI_UX_AGENT |
| Tik logika / tipai / utils (be UI) | CODING_AGENT (be UI_UX_AGENT) |

---

## 7. Išvestis ir kokybės vartai

- **Išvestis:** Rekomendacijos CODING_AGENT (konkretūs Tailwind klasės, aria atributai, struktūros siūlymai); arba patikrintas atitikimas SOT ir pataisymų sąrašas.
- **Privaloma** atsakymo pabaigoje: CHANGES, CHECKS, RISKS, NEXT (kaip ir kiti agentai orkestratoriuje).

---

## 8. Nuorodos

- Orkestratorius ir router: `docs/development/AGENT_ORCHESTRATOR.md`, `.cursor/rules/agent-orchestrator.mdc`
- Dizaino gairės: `docs/development/GOLDEN_STANDARD.md`, `tailwind.config.js`
- Komponentų analizė: `UI_KOMPONENTU_ANALIZE.md`
