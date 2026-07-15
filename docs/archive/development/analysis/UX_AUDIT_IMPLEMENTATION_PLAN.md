# UX audito įgyvendinimo planas

> **Šaltinis:** `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md`  
> **Tikslas:** Struktūruotas planas micro-UX pataisymų įgyvendinimui – fazės, užduotys, atsakingieji, laikai.  
> **Versija:** 1.0 | **Data:** 2026-03-11

---

## Santrauka

| Faze | Apimtis | Laikas (apytikslis) | Prioritetas |
|------|---------|----------------------|-------------|
| **Faze 1** | Greičiausi 10 (low-hanging) | ~4–5 val. | P2 – pirmiausia |
| **Faze 2** | Kiti micro-UX (3–30 iš audito) | ~6–8 val. | P2 |
| **Faze 3** | Modulių specifiniai (M1–M6) | ~4–6 val. | P2/P3 |
| **Faze 4** | Premium SaaS polish (šešėliai, kontrastas, empty states) | ~2–3 val. | P3 |

---

## Faze 1 – Greičiausi 10 (1–2 val. vienam blokui)

Įgyvendinti eilės tvarka. Po kiekvieno – trumpa vizualinė/regresinė patikra.

| # | Užduotis | Failas / vieta | Laikas | Agentas | Statusas |
|---|----------|----------------|--------|---------|----------|
| 1.1 | Body tekstas content-block: `text-sm` → `text-base` pagrindiniam body | `ContentSlides.tsx` – ContentBlockSlide, sekcijų body | ~30 min | CODING | [x] |
| 1.2 | Max eilučių ilgis: body wrapper `max-w-prose` (arba 65ch) + `mx-auto` | Tas pats – content-block sekcijų wrapper | ~20 min | CODING | [x] |
| 1.3 | Sticky juosta: kompaktinis „Skaidrė 12/41“ + optional 2px progress line (width %) | `ModuleView.tsx` – sticky nav | ~45 min | CODING | [x] |
| 1.4 | Tarpai tarp sekcijų: `space-y-6` content-block ir section-break | ContentBlockSlide, SectionBreakSlide (ContentSlides.tsx) | ~20 min | CODING | [x] |
| 1.5 | Modulių kortelė: badge max 2–3 (Modulis N + level arba Rekomenduojama; Baigta atskirai) | `ModulesPage.tsx` | ~30 min | CODING | [x] |
| 1.6 | Slide dots: gradient mask dešinėje („yra daugiau“) | `ModuleView.tsx` – slide dots wrapper | ~25 min | CODING | [x] |
| 1.7 | Footer ilgis M4/M5/M6: „Toliau – skaidrė N“ ≤55 simb.; shortTitle | `modules.json` (DATA_AGENT) | ~30 min | DATA | [x] (audit OK) |
| 1.8 | Callout: visiems blockVariant `border-l-4` + `p-4 md:p-5` | ContentSlides – sekcijų wrapper, getColorClasses | ~25 min | CODING | [x] |
| 1.9 | H2/H3: H2 `text-lg md:text-xl font-bold`, H3 `text-base font-semibold` | SlideContent, ContentSlides, BlockSlides | ~40 min | CODING | [x] |
| 1.10 | Mobile: sticky juostoje „12/41“ (jei dar nėra) | ModuleView.tsx – sticky nav (mobile) | ~20 min | CODING | [x] |

**Kontrolė po Faze 1:** Build, lint, rankinė peržiūra 2–3 skaidrėse (M1, M4); GOLDEN_STANDARD §1, §5.

---

## Faze 2 – Kiti micro-UX (audito punktai 3–30)

Pasirinkti pagal prioritetą; galima daryti poromis.

| # | Audito nr. | Užduotis | Vieta | Laikas | Statusas |
|---|------------|----------|-------|--------|----------|
| 2.1 | 5 | CTA hierarchija: vienas primary, antriniai secondary / nuorodos | Skaidrės su keliais CTA | ~45 min | [ ] (peržiūrėta – jau atitinka) |
| 2.2 | 9 | Sticky bar aukštis: py-2 vietoj py-3 (arba optional hide on scroll) | ModuleView.tsx | ~30 min | [x] |
| 2.3 | 11 | Footer ≤55 simb. – validacija / skriptas | FOOTER_NEXT_SLIDE_ANALIZE, scripts | ~20 min | [x] |
| 2.4 | 12 | Dark mode kontrastas: gray-400 → gray-300 kur reikia (WCAG AA) | Global / slide blokai | ~30 min | [x] |
| 2.5 | 14 | Rekomenduojama kortelė: švelnus pulse arba shadow accent | ModulesPage.tsx | ~20 min | [x] |
| 2.6 | 17 | Quiz rezultatai: pirmas klaidingas vizualiai (border-left rose) | QuizResultsView | ~15 min | [x] |
| 2.7 | 18 | Section-break: hero dominuoja, kiti blokai kompaktiški | SectionBreakSlide | ~40 min | [x] |
| 2.8 | 20 | TemplateBlock „Kopijuoti“ – min-h 44px, accent/brand | ContentSlides / shared | ~20 min | [x] |
| 2.9 | 22 | Lentelės: pirmas stulpelis min-w, align-top, py-3.5 | ContentSlides table render | ~25 min | [x] |
| 2.10 | 23 | Collapsible: open būsena – border-l-4, švelnus fonas | ContentSlides details/summary | ~20 min | [x] |
| 2.11 | 25 | ModuleComplete: vienas pagrindinis CTA, kiti secondary | ModuleCompleteScreen.tsx | ~30 min | [x] |
| 2.12 | 28 | Empty state: ikona, fonas brand-50, vienas CTA | ModuleView fallback, klaidos | ~25 min | [x] |
| 2.13 | 30 | Mobile: modulių kontekstas (M4 badge arba „Modulis 4 · 12/41“) | ModuleView.tsx | ~30 min | [x] |

---

## Faze 3 – Modulių specifiniai (M1–M6)

Pagal UX audito skyrių 5 – 3–5 pataisymai per modulį.

| Modulis | Užduotys (trumpai) | Laikas | Statusas |
|---------|--------------------|--------|----------|
| **M1** | „Kas čia?“ blokas pirmose skaidrėse (contextIntro ContentBlock); body text-base + max-w-prose (F1); vienas CTA PracticalTask; santrauka space-y-8 (jau yra) | ~1 val. | [x] |
| **M2** | Test-intro whyBenefit + firstActionCTA (jau); progresas virš klausimo „5/15“; rezultatų klaidingi (F2.6); remediacija vienas mygtukas | ~45 min | [x] |
| **M3** | Hub vienas CTA per scenarijų (pirmas primary); Copy blokas virš CTA (PracticalTask); nextSlideContextLabel (title + truncate); santraukos mygtukas | ~45 min | [x] |
| **M4** | Slide dots + fade (F1.6); section-break hero (F2.7); content-block space-y-6 (F1.4); DiModalities „Rek.“ legend (jau); lentelės comparisonStyle (jau) | ~1.5 val. | [x] |
| **M5** | Test-intro aiškūs laukai (jau); rezultatų scroll + remediacija; <70% pranešimas + CTA (jau) | ~30 min | [x] |
| **M6** | Practice-intro vizualus atskyrimas; vienas CTA; completion „Kur pritaikyti?“ kompaktiškai | ~30 min | [x] |

---

## Faze 4 – Premium SaaS polish

| # | Užduotis | Vieta | Laikas | Statusas |
|---|----------|-------|--------|----------|
| 4.1 | Progress juostos: transition-all duration-500 (jei dar nėra) | ModulesPage, CircularProgress, ModuleView | ~15 min | [x] |
| 4.2 | Šešėlių konsistencija: shadow-md / shadow-lg pagal GOLDEN_STANDARD §5.3 | Kortelės, CTA | ~20 min | [x] |
| 4.3 | Focus states: focus-visible ring visiems interaktyviems (patikra) | Global / index.css | ~20 min | [x] |
| 4.4 | Spalvų ribojimas 2–3 per skaidrę (audito #26) – spot-check M4 | ContentSlides, section-break | ~30 min | [x] |

**4.4 pastaba:** content-block ir section-break naudoja blockVariant (accent, brand, terms) – max 2 semantinės + 1 CTA per skaidrę (GOLDEN_STANDARD §2.2). Spot-check M4 – OK.

---

## Mobile-specific ir QA

**Mobilios UX auditas (1 skaidrė/modulis, 375px):** Kriterijai ir patikros lentelė – `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` §3 (navigacija, skaitomumas, tankis, CTA, hierarchija, scroll). Rezultatų įrašymas – `docs/development/TEST_REPORT.md` skyrius „Mobile QA (Faze 3.1)“.

**Faze 1.7 (footer ≤55 simb.):** Statusas [x] (audit OK). Galutinė footer skaidrių numerių ir ilgio patikra atliekama prieš release pagal `.cursor/rules/footer-slide-numbers.mdc` ir `docs/development/RELEASE_QA_CHECKLIST.md`.

---

## Nuorodos

| Dokumentas | Paskirtis |
|------------|-----------|
| `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` | Mobilios UX auditas M1–M6, §3 checklist, „Dabar“ / V1 / V2 prioritetai |
| `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md` | Pilnas UX auditas – diagnozė, 30 patobulinimų, moduliai, TOP 10 |
| `docs/development/GOLDEN_STANDARD.md` | Dizaino SOT – šriftai, spalvos, skaidrių schemos |
| `docs/development/UI_UX_AGENT.md` | UI/UX gairės ir checklist |
| `docs/development/LENTELIU_STANDARTAS.md` | Lentelių vizualinė ir duomenų logika |
| `src/design-tokens.ts` | Spacing, radius klasės |

---

## Naudojimas

1. **Pradėti nuo Faze 1** – pažymėti atliktus punktus (Statusas: [x]).
2. **Agentams:** CODING_AGENT – komponentai, stiliai; DATA_AGENT – modules.json footeriai; UI_UX_AGENT – gairių tikrinimas.
3. **Po fazės:** build, lint, rankinė 1–2 skaidrės/modulis; jei reikia – atnaujinti GOLDEN_STANDARD arba UI_UX_AGENT.
4. **TODO.md:** Nuoroda į šį planą – skyrius „UX audito įgyvendinimas“.
