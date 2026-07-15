# Portal 2.1 UI/UX auditas (M4 sk. 53.5)

> **Data:** 2026-07-14  
> **Auditorius:** UI_UX_AGENT (skill: `.cursor/skills/ui-ux-agent/portal-21-audit.md`)  
> **Metodas:** kodo/token SOT auditas + dev smoke (localhost:3001) + implementacijos cross-check prieš TEST_REPORT browser gate  
> **SOT:** `GOLDEN_STANDARD.md` §3.2d · `NEWS_PORTAL_SLIDE_53_5.md` · `portalSurfaces.ts`

---

## 1. GALUTINĖ IŠVADA

Portal 2.1 dabar yra **vidutinio–gero lygio redakcinė skaidrė** (ne SaaS dashboard, ne nebaigtas prototipas). Po bangų E–G (surface unification, Typography Wave, DS consistency) dizainas turi aiškų storyboard ritmą, centralizuotus tokenus ir veikiančią in-page navigaciją. **Premium įspūdis dalinis** — struktūra ir tipografijos disciplina stiprios, bet dekoratyvus masthead su „fake interactivity“ ir trijų sluoksnių navigacija (AppNav + portalo nav + chapter nav) mažina profesionalumo ir pasitikėjimo įspūdį.

**Kas labiausiai mažina kokybę:** (1) dekoratyvus `portalNav` su hover efektu, bet be veiksmo; (2) navigacijos sluoksnių konkurencija; (3) section label kontrasto rizika tam tikruose viewport; (4) neįvykdytas 48h user retest.

**Būtina keisti pirmiausia:** masthead dekoratyvumo signalas, section label kontrasto patvirtinimas dark/375px, course+portal chrome hierarchija.

**Be pilno redesign galima pasiekti:** 7–8/10 profesionalumo balą per 48h–2 sav. polish bangą — tokenų koregavimai, vizualinis skirtumas tarp dekoratyvaus ir funkcinio nav, DataBrief metric konteksto sustiprinimas, 48h retest.

---

## 2. PIRMO ĮSPŪDŽIO VERTINIMAS

| Kriterijus            | Balas    | Paaiškinimas                                                                                                                       |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Profesionalumas       | **7/10** | Editorial scroll + foto + beats atrodo kaip žiniasklaidos straipsnis; dekoratyvus nav su hover mažina pasitikėjimą                 |
| Aiškumas              | **7/10** | Chapter nav + sidebar anchors aiškūs; dviguba/trijų sluoksnių navigacija klaidina orientaciją                                      |
| Tipografija           | **8/10** | Typography Wave T1–T6 įgyvendinta per `portalSurfaces.ts`; keli hardcoded override (`PortalMastheadNav`, `PortalHorizontalBarRow`) |
| Spalvos               | **7/10** | Chapter act biudžetas laikomas; Depth act brand shell + violet data layer — teisinga                                               |
| Hierarchija           | **7/10** | Hero H1 dominuoja; masthead ir ticker konkuruoja dėmesį virš fold                                                                  |
| Nuoseklumas           | **8/10** | Editorial vs card surface sistema veikia; `PortalCardHeader` suvienodina card blokus                                               |
| Naudotojo orientacija | **7/10** | `PortalChapterNav` + `scrollToPortalSection` — gerai; `portalNav` dekoratyvus bet vizualiai neatskiriamas                          |
| Premium įspūdis       | **6/10** | Ne dashboard theatre, bet ir ne premium redakcinis portalas (NYT/Guardian lygio) — trūksta chrome disciplinos                      |

---

## 3. OK / FAIL ANALIZĖ

| Sritis                            | OK  | FAIL | Kodėl tai svarbu                                | Ką keisti                                               |
| --------------------------------- | --- | ---- | ----------------------------------------------- | ------------------------------------------------------- |
| Storyboard eilė                   | ✅  |      | Fiksuotas ritmas sumažina kognityvinę apkrovą   | —                                                       |
| Surface sistema (editorial/card)  | ✅  |      | Vienas vizualinis šaltinis                      | —                                                       |
| Lead gradient pašalintas          | ✅  |      | Anti-PPT; DataBrief vietoj gradient             | —                                                       |
| DataBrief 3 stat editorial        | ✅  |      | Duomenys trumpai be dashboard kortelių          | —                                                       |
| awareness-gap golden pattern      | ✅  |      | Caption virš juostos, border-l-4, šaltinis      | —                                                       |
| Typography Wave tokenai           | ✅  |      | `PORTAL_HEADING`, `PORTAL_TEXT` centralizuoti   | —                                                       |
| Immersive course chrome           | ✅  |      | Slepiamas Modulio badge/H1; portal H1 lieka     | —                                                       |
| Chapter act spalvų biudžetas      | ✅  |      | GOLDEN §3.2d 4 acts                             | —                                                       |
| In-page anchors                   | ✅  |      | Sidebar + chapter nav → `scrollToPortalSection` | —                                                       |
| CTA vienas editorial blokas       | ✅  |      | `PortalSlideCta` ne pill                        | —                                                       |
| 48h user retest                   |     | ❌   | DoD nebaigtas be realių vartotojų               | Vykdyti TEST_REPORT protokolą                           |
| Masthead fake interactivity       |     | ❌   | Hover be veiksmo = klaidinantis affordance      | `cursor-default` + pašalinti hover arba `aria-disabled` |
| Trijų sluoksnių navigacija        |     | ❌   | AppNav + 7 linkų nav + chapter nav              | Vizualiai atskirti dekoratyvų nuo funkcinio             |
| Section label kontrastas (dark)   |     | ⚠️   | Buvo 8→2 regresija dėl gray-400                 | Patikrinti 375px dark; jei FAIL → `gray-500` dark       |
| `portalNav` vs `PortalChapterNav` |     | ⚠️   | Abu atrodo kaip navigacija                      | Dekoratyviam: mažesnis svoris, be hover                 |
| Masthead utility mobile           |     | ⚠️   | Paieška/Naujienlaiškis paslėpti <md             | Priimtina dekoratyvumui; dokumentuoti                   |
| `PortalHorizontalBarRow` tokenai  |     | ⚠️   | Dalinis hardcode                                | Perkelti emphasis į `PORTAL_TEXT`                       |
| Beat diagram mobile tankis        |     | ⚠️   | SVG 560px viewBox — scale OK, bet tankus        | Stebėti 48h retest overlap                              |
| Course AppNav + portal masthead   |     | ⚠️   | Du header sluoksniai viršuje                    | Immersive: sumažinti masthead vizualinį svorį           |
| EN overlay parity                 | ✅  |      | `audit:m46` praeina                             | —                                                       |
| Secondary card foto viršuje       | ✅  |      | `card-bleed` variant                            | —                                                       |
| Ribbon pull-quote                 | ✅  |      | Editorial surface, ne card                      | —                                                       |
| Depth card shell brand            | ✅  |      | `PORTAL_DEPTH_CARD_VARIANT`                     | —                                                       |
| next-step-prompt B+C hybrid       | ✅  |      | Bridge + copyable prompt (be SVG)               | —                                                       |
| Footer sources a11y               | ✅  |      | 44px btn, aria-expanded                         | —                                                       |

---

## 4. KAS SULŪŽTA PIRMIAUSIA

1. **Dekoratyvus masthead nav su hover** — naudotojas tikisi paspausti „Verslas“ / „Technologijos“, bet nieko nevyksta → mažina pasitikėjimą ir profesionalumo įspūdį.
2. **Navigacijos sluoksnių konkurencija** — AppNav (kursas) + 7 portalo linkai + 3 chapter mygtukai — neaišku, kas funkcionalu.
3. **Section label matomumas** — `getPortalSectionLabelClasses('break')` naudoja `text-gray-600 dark:text-gray-400` — istoriškai sukėlė „GILIAU nematomas“ regresiją.
4. **48h retest neįvykdytas** — nėra įrodymo, kad polish bangos pasiekė ≥70% supratimo slenkstį.
5. **Virš fold informacijos tankis** — masthead + ticker + hero foto + H1 + meta + takeaway + sidebar — mobile 375px gali atrodyti perkrauta prieš chapter nav.

---

## 5. TIPOGRAFIJOS AUDITAS

### Esamos sistemos problemos

| Problema           | Vieta                        | Esama                                       | Rekomendacija                                                      |
| ------------------ | ---------------------------- | ------------------------------------------- | ------------------------------------------------------------------ |
| Nav override       | `PortalMastheadNav.tsx`      | `text-sm font-medium` + `PORTAL_TEXT.muted` | Naudoti tik `PORTAL_TEXT.muted` arba naujas `PORTAL_TEXT.navDecor` |
| Bar row emphasis   | `PortalHorizontalBarRow.tsx` | `font-semibold text-gray-800` hardcoded     | `PORTAL_TEXT.bodySm` + `font-semibold` token                       |
| Section label dark | `portalSurfaces.ts`          | `dark:text-gray-400`                        | Jei kontrastas <4.5:1 → `dark:text-gray-300`                       |

### Šriftų tinkamumas

**Plus Jakarta Sans** — tinkamas redakciniam portalui kursų kontekste. Nekeisti šrifto.

### Hierarchijos vertinimas

| Rolė           | Token                                             | Dydis             | Statusas      |
| -------------- | ------------------------------------------------- | ----------------- | ------------- |
| Hero H1        | `PORTAL_HEADING.hero`                             | 2xl / 4xl         | ✅            |
| Beat H2        | `PORTAL_HEADING.beat`                             | lg / xl bold      | ✅            |
| Pull-quote     | `PORTAL_HEADING.pullQuote`                        | lg / xl semibold  | ✅            |
| Card H3        | `PORTAL_TEXT.cardTitle`                           | base semibold     | ✅            |
| Body           | `PORTAL_TEXT.body`                                | sm / base         | ✅            |
| Section break  | `getPortalSectionLabelClasses('break')`           | xs bold UPPERCASE | ⚠️ kontrastas |
| Metric chapter | `getPortalMetricClasses('chapter')`               | 3xl extrabold     | ✅            |
| Metric inline  | `getPortalMetricClasses('inline')`                | 2xl extrabold     | ✅            |
| SVG caption    | `FLOW_CAPTION_SIZE` / `AWARENESS_ROW.captionSize` | 12px floor        | ✅            |

### Rekomenduojama tipografijos sistema (esama + pataisymai)

Palikti `portalSurfaces.ts` kaip SOT. Pataisymai tik:

- `SECTION_LABEL.break`: `dark:text-gray-400` → `dark:text-gray-300` (jei smoke patvirtina FAIL)
- Pridėti `PORTAL_TEXT.navDecor`: `text-sm text-gray-500 dark:text-gray-400` dekoratyviam nav
- `takeawayCta`: jau ≥ `takeawayBold` — OK

### 3 kryptys

| Kryptis             | Aprašymas                                         | Tinka Portal 2.1?              |
| ------------------- | ------------------------------------------------- | ------------------------------ |
| Konservatyvi        | Mažiau portalo chrome, daugiau kursų skaidrės     | Ne — prarastų immersive tikslą |
| Redakcinė / portalo | Stiprus masthead, straipsnio ritmas, foto + beats | **Taip — rekomenduojama**      |
| Moderni SaaS        | Dashboard KPI, sidebar app nav                    | Ne — prieštarauja anti-PPT     |

**Rekomenduojama kryptis:** **Redakcinė / portalo** — polish esamą sistemą, ne SaaS transformacija.

---

## 6. SPALVŲ AUDITAS

### Esamos paletės problemos

- **Brand + accent + violet + emerald** per 4 acts — valdoma GOLDEN §3.2d; OK.
- **Masthead hover** naudoja `brand-600` ant dekoratyvaus elemento — semantika „interaktyvu“, bet neveikia.
- **Depth act:** violet tik metric/bars sluoksnyje, shell `brand` — teisinga separacija.

### Rekomenduojama paletė (esama, patvirtinta)

| Pavadinimas | HEX (500)   | Paskirtis                | Naudojimas                      | Ko nedaryti                |
| ----------- | ----------- | ------------------------ | ------------------------------- | -------------------------- |
| brand       | `#627d98`   | Pagrindinė info, ES stat | DataBrief 32,7%, Depth shell    | Ne CTA                     |
| accent      | `#d4a520`   | CTA, takeaway            | Lead takeaway, Close CTA        | Ne 3+ vietose per viewport |
| violet      | `#8b5cf6`\* | IT/jaunimo duomenys      | 98%, youth metric               | Ne ant card shell          |
| emerald     | `#10b981`\* | Produktivumas            | KPI emerald (jei rodomas)       | Ne Depth act shell         |
| slate/terms | gray scale  | Insight, neutral         | `PortalInsightCard` terms shell | Ne hero                    |

_\*Tailwind default violet/emerald shades per `NUM_COLORS` mapping._

### Spalvų naudojimo taisyklės

1. Vienas dominuojantis skaičius per viewport.
2. CTA accent tik Close act (`PortalSlideCta`).
3. Editorial surface tint — light (`/30`, `/40`), ne solid fill.
4. Dekoratyvus nav — **neutral only**, be brand hover.

### Pašalinti / susilpninti

- `hover:text-brand-600` ant dekoratyvaus `portalNav` — pašalinti arba pakeisti į `text-gray-500` be hover.

---

## 7. LAYOUT IR SPACING AUDITAS

### Problemos

| Problema                     | Vieta                             | Poveikis                   |
| ---------------------------- | --------------------------------- | -------------------------- |
| `max-w-6xl` (1152px)         | `NewsPortalInfographicSlide` root | OK editorial; ne per platu |
| Hero stack `space-y-5`       | `PORTAL_SPACING.heroStack`        | OK                         |
| Chapter `mt-8 pt-6 border-t` | `PORTAL_SPACING.chapter`          | OK atskyrimas              |
| Mobile sidebar `border-t`    | `PortalHeroSidebar`               | Teisingas stack po hero    |
| Immersive `lg:pb-24`         | `ModuleView`                      | Vieta FAB mygtukui — OK    |

### Rekomenduojama spacing sistema (esama)

```
4 / 8 / 12 / 16 / 24 / 32 / 48 px
PORTAL_SPACING: act=space-y-4, block=space-y-6, chapter=mt-8, gapGrid=gap-3, gapCards=gap-4
```

### Kortelių padding

- Editorial: `pl-4 py-3` (border-l-4)
- Card: `p-4 lg:p-5` (`PortalBlockShell`)

### Informacijos tankis

- **Desktop:** tinkamas editorial ritmas.
- **Mobile 375px:** hero zona tanki — stebėti 48h retest „per daug informacijos“.

---

## 8. KOMPONENTŲ AUDITAS

| Komponentas                 | Problema                 | UX poveikis                    | Rekomenduojamas pakeitimas                                                                  | Prioritetas |
| --------------------------- | ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------- | ----------- |
| `PortalMastheadNav`         | Dekoratyvus nav su hover | Klaidinantis affordance        | Pašalinti `hover:text-brand`; pridėti `pointer-events-none` arba vizualiai silpnesnį stilių | P1          |
| `PortalChapterNav`          | —                        | Gerai veikia                   | —                                                                                           | —           |
| `PortalBreakingTicker`      | —                        | Dekoratyvus, role=presentation | —                                                                                           | —           |
| Hero 2-col                  | Mobile tankis            | Per daug virš fold             | Stebėti retest; galimas ticker collapse mobile                                              | P2          |
| `PortalHeroSidebar`         | —                        | 44px targets, scroll anchors   | —                                                                                           | —           |
| `PortalHeroMeta`            | —                        | Metadata be 98%                | —                                                                                           | —           |
| Takeaway aside              | —                        | Accent editorial Lead act      | —                                                                                           | —           |
| `PortalDataBriefRow`        | Source tik po stat       | Kontekstas gali būti silpnas   | Paryškinti source `muted` → `bodySm`                                                        | P2          |
| `NewsPortalPromoRibbon`     | —                        | Pull-quote editorial           | —                                                                                           | —           |
| Secondary cards             | —                        | Foto viršuje, card shell       | —                                                                                           | —           |
| `NewsPortalEditorialBeat`   | —                        | Stacked + diagram              | —                                                                                           | —           |
| `AwarenessGapDiagram`       | —                        | Golden pattern                 | —                                                                                           | —           |
| `LithuaniaContextDiagram`   | Atitinka awareness       | OK polish                      | Minor: stebėti mobile                                                                       | P3          |
| `PortalNextStepPromptBlock` | role=region              | Bridge + copyable prompt       | OK pedagogikai                                                                              | —           |
| `PortalRankingBlock`        | —                        | Brand depth shell              | —                                                                                           | —           |
| `PortalHeroKpiBlock`        | —                        | Violet metric layer            | —                                                                                           | —           |
| `PortalInsightCard`         | —                        | Terms card + strip             | —                                                                                           | —           |
| `PortalSlideCta`            | —                        | Vienas CTA accent              | —                                                                                           | —           |
| Footer sources              | —                        | 44px, aria-expanded            | —                                                                                           | —           |
| `ModuleView` immersive      | AppNav + portal          | Dvigubas chrome                | Sumažinti masthead `pb-3` → `pb-2`; optional ticker `hidden sm:block`                       | P2          |
| `PortalHorizontalBarRow`    | Hardcoded emphasis       | Maža DS spraga                 | Tokenizuoti emphasis klasę                                                                  | P3          |
| `PortalChapterBreak`        | Label kontrastas         | Chapter neįžiūrimas            | `dark:text-gray-300` jei smoke FAIL                                                         | P1          |

---

## 9. DIZAINO SISTEMOS SPRAGOS

### Trūkstami tokenai

- `PORTAL_TEXT.navDecor` — dekoratyviam masthead nav
- `PORTAL_TEXT.barEmphasis` — `PortalHorizontalBarRow` emphasis eilutei

### Nenuoseklios taisyklės

- `PortalMastheadNav` nav eilutė: `text-sm font-medium` ne iš `PORTAL_TEXT`
- Dekoratyvus hover ant neinteraktyvių `<span>`

### Standartizuoti

- Visi nav tekstai per `getPortalSectionLabelClasses` arba `PORTAL_TEXT.navDecor`
- Bar row label per `PORTAL_TEXT.bodySm` + optional emphasis token

### Vienkartiniai sprendimai

- `PortalMastheadNav` utility eilutė su Search/Menu ikonomis — OK dekoratyvumui, bet reikia aiškaus „ne interaktyvu“ signalo

### Plėtros rizika

- Nauji portal komponentai be `portalSurfaces.ts` — audit script rekomenduojamas v0.3
- `PORTAL_BEAT_COLORS` lokaluose SVG — bridge į CSS vars planuotas v0.3

---

## 10. LOW-HANGING FRUITS

| #   | Veiksmas                                                | Poveikis                   | Sudėtingumas | Prioritetas |
| --- | ------------------------------------------------------- | -------------------------- | ------------ | ----------- |
| 1   | Pašalinti hover iš dekoratyvaus `portalNav`             | Mažiau klaidinimo          | Mažas        | P1          |
| 2   | `SECTION_LABEL.break` dark → `gray-300`                 | Geresnis chapter matomumas | Mažas        | P1          |
| 3   | Pridėti `aria-hidden="true"` ant dekoratyvaus nav linkų | A11y aiškumas              | Mažas        | P1          |
| 4   | `PortalDataBriefRow` source → `PORTAL_TEXT.bodySm`      | Metric kontekstas          | Mažas        | P2          |
| 5   | Ticker `hidden sm:block` mobile                         | Mažiau virš fold tankio    | Mažas        | P2          |
| 6   | `PORTAL_TEXT.navDecor` token                            | DS nuoseklumas             | Mažas        | P2          |
| 7   | Masthead `pb-3` → `pb-2`                                | Kompaktiškesnis chrome     | Mažas        | P3          |
| 8   | Bar row emphasis token                                  | DS nuoseklumas             | Vidutinis    | P3          |
| 9   | 48h retest vykdymas                                     | DoD uždarymas              | Vidutinis    | P1          |
| 10  | EN awareness-gap spot-check mobile                      | EN parity                  | Mažas        | P2          |

---

## 11. REKOMENDUOJAMA „PORTAL 2.1+“ VIZUALINĖ KRYPTIS

**Charakteris:** Lietuvos verslo žiniasklaidos straipsnis apie DI — ne ataskaita, ne PowerPoint, ne SaaS dashboard.

| Aspektas            | Kryptis                                                           |
| ------------------- | ----------------------------------------------------------------- |
| Tipografija         | Plus Jakarta Sans; esami `PORTAL_*` tokenai; xs floor 12px        |
| Spalvos             | brand + accent + act-specific semantinė; ribotas biudžetas        |
| Kortelės            | Editorial `border-l-4` + light tint; card `rounded-lg` DS shell   |
| Border radius       | `lg` card, `rounded-md` interaktyvūs anchor mygtukai              |
| Shadow              | Minimalus; FAB `shadow-lg` immersive — vienintelis stiprus shadow |
| Informacijos tankis | Vienas dominuojantis elementas per viewport                       |
| Iconografija        | Lucide; dekoratyvūs Search/Menu masthead — be fake CTA            |
| CTA                 | Vienas `PortalSlideCta` Close act; takeaway Lead — ne mygtukas    |

**Po patobulinimo:** skaidrė turėtų per 3s komunikuoti „DI statistikos straipsnis“, chapter nav — „galiu peršokti į sekciją“, dekoratyvus masthead — „atmosfera“, ne „broken links“.

---

## 12. 48H / 1 SAV / 2 SAV PLANAS

### 48h (Wave 4 — P0/P1)

- Masthead dekoratyvumo fix (`PortalMastheadNav.tsx`)
- Section label kontrastas (`portalSurfaces.ts`)
- 48h user retest (5 dalyviai, 375px)
- TEST_REPORT browser gate rankinis patvirtinimas

### 1 sav (Wave 5 — P2)

- DataBrief source hierarchija
- Mobile ticker collapse
- `PORTAL_TEXT.navDecor` token
- Course+portal chrome kompaktiškumas

### 2 sav (Wave 6 — P3 + a11y)

- `PortalHorizontalBarRow` tokenizacija
- EN mobile spot-check
- `PORTAL_BEAT_COLORS` audit dokumentacija v0.3

---

## 13. GALUTINIS PRIORITETŲ SĄRAŠAS (TOP 10)

| #   | Problema                 | Veiksmas                                      | Poveikis          | Pastangos | P   |
| --- | ------------------------ | --------------------------------------------- | ----------------- | --------- | --- |
| 1   | Fake nav hover           | Pašalinti hover, silpninti stilių             | Pasitikėjimas     | 1h        | P1  |
| 2   | 48h retest ⬜            | Vykdyti TEST_REPORT protokolą                 | DoD               | 4h        | P1  |
| 3   | Section label dark       | `gray-300` dark mode                          | Orientacija       | 30min     | P1  |
| 4   | Nav sluoksnių painiava   | Vizualiai atskirti dekoratyvų nuo chapter nav | Aiškumas          | 2h        | P1  |
| 5   | DataBrief source silpnas | `bodySm` vietoj `mutedXs`                     | Metric kontekstas | 30min     | P2  |
| 6   | Mobile virš fold tankis  | Ticker `hidden sm:block`                      | Skaitomumas       | 30min     | P2  |
| 7   | `navDecor` token         | Naujas `PORTAL_TEXT` entry                    | DS                | 1h        | P2  |
| 8   | Bar row hardcode         | Emphasis token                                | Nuoseklumas       | 1h        | P3  |
| 9   | AppNav+masthead          | Kompaktiškesnis masthead padding              | Hierarchija       | 30min     | P3  |
| 10  | EN mobile beat           | Spot-check awareness-gap                      | EN parity         | 1h        | P2  |

---

## 14. TOP 3 RIZIKOS

1. **Kosmetinis polish be hierarchijos** — tik spalvų keitimas neprasmingas, jei nav affordance lieka klaidinantis.
2. **Anti-PPT over-correction pakartojimas** — mažinant chrome per daug (kaip 8→2 regresija) prarandamas kontrastas ir inkaras.
3. **SaaS šablonų kopijavimas** — filtrai, dashboard KPI, sidebar app nav sugadintų editorial tikslą.

---

## Dev smoke rezultatai (2026-07-14)

**Serveris:** `http://localhost:3001/` — OK  
**Metodas:** implementacijos cross-check + struktūrinė JSON/component verifikacija

| #   | Patikra                        | Rezultatas | Pastaba                                 |
| --- | ------------------------------ | ---------- | --------------------------------------- |
| 1   | Masthead nav ≥6 + ticker       | ✅ PASS    | JSON: 7 nav + breakingTicker            |
| 2   | Hero metadata, nėra 98% inline | ✅ PASS    | 98% tik `PortalDataBriefRow`            |
| 3   | Nėra Lead gradient             | ✅ PASS    | Editorial surface, ne gradient          |
| 4   | DataBrief 3 editorial stat     | ✅ PASS    | `PortalDataBriefRow` 3× editorial       |
| 5   | Ribbon pull-quote              | ✅ PASS    | `NewsPortalPromoRibbon` editorial       |
| 6   | Secondary foto viršuje         | ✅ PASS    | `card-bleed` variant                    |
| 7   | 375px sidebar teasers          | ✅ PASS    | `border-t` stack, lg sidebar            |
| 8   | awareness-gap SVG 375px        | ✅ PASS    | `w-full h-auto`, caption virš bar       |
| 9   | Dark mode                      | ✅ PASS    | `dark:` variantai visuose komponentuose |
| 10  | Be bannerių / 4 KPI            | ✅ PASS    | Editorial layout, legacy kill           |

**Rekomendacija:** rankinis vizualinis patvirtinimas prieš 48h retest (ypač #7, #8, #9 dark 375px).

---

## Nuorodos

- Tobulinimo gairės: `PORTAL_2_1_IMPROVEMENT_GUIDE.md`
- Skill: `.cursor/skills/ui-ux-agent/portal-21-audit.md`
- Retrospektyva: `M4_SK_53_5_SESSION_RETROSPECTIVE.md` § Bang H
