# Analytics dashboard MVP – wireframe ir KPI

> **Tikslas:** Vienas dashboard aprašymas ir KPI baseline interpretacijos. Faktinė implementacija – PostHog arba GA4 (žr. ANALYTICS_EVENT_TAXONOMY.md, PostHog setup žemiau).

---

## 1. Dashboard wireframe (4 blokai)

### Blokas 1 – Completion %

- **Overall:** M1 complete / M1 start; M3 complete / M3 start (unikalūs anon_id).
- **By module:** M1, M2, M3 atskirai (complete / start).
- **Optional:** by cohort/source (utm_source breakdown).

### Blokas 2 – Drop-off %

- **Top 5 drop points:** kur daugiausiai prarandama – slide_id arba slide_index (pvz. M1 slide 1→2, M1 paskutinė → M2, M2 → M3).
- Metrika: slide_view to slide N, bet ne slide_complete to slide N (arba ne slide_view to slide N+1).

### Blokas 3 – CTA conversion %

- **By module, by slide, by cta_id:** cta_click / unique visitors to that slide (slide_view to that slide).
- Filtruoti destination: internal, spin-off, external.

### Blokas 4 – Practice success %

- practice_complete / practice_start (bendras ir by module, by practice_id).
- Optional: time_to_complete_sec (mediana), common fail points (slide_id kur start >> complete).

---

## 2. KPI baseline ir interpretacijos

| KPI | Jei krenta | Jei kyla |
|-----|-------------|----------|
| M1 completion rate | Drop-off per anksti; per sunkios pirmos skaidrės arba trūksta motyvacijos | Geras įsitraukimas |
| M3 completion rate | Praktikos per sunkios arba laiko trūkumas | Praktika veikia |
| Overall funnel (Landing → M3 complete) | Silpna pirmoji skaidrė arba per daug žingsnių | Stiprus funnel |
| Practice completion rate | Per sunki užduotis arba neaiškus CTA | Geras practice design |
| CTA conversion (po M3) | CTA neaiškus arba per vėlus | Aiškus „kitas žingsnis“ |
| Drop-off at first slide (M1) | Pirmoji skaidrė nepatraukli | Geras hook |

Baseline bus žinomas po 2–4 sav. instrumentacijos (žr. planą „Patvirtintas kontekstas“).

---

## 3. PostHog setup (optional)

1. **Sąskaita:** [posthog.com](https://posthog.com), Cloud EU (Frankfurt) jei GDPR prioritetas.
2. **Projektas:** Sukurti projektą „Promptų anatomija“, gauti Project API Key.
3. **Env:**  
   `VITE_POSTHOG_KEY=<key>`  
   `VITE_POSTHOG_HOST=https://eu.i.posthog.com` (arba US)
4. **Įkelti skriptą:** index.html arba App.tsx mount – PostHog snippet su `person_profiles: 'identified_only'` arba anonymous (nekurti person profile).
5. **Kodas:** `src/utils/analytics.ts` jau siunčia eventus per `posthog.capture(eventName, { ...properties, $process_person_profile: false })` kai `window.posthog` ir env nustatyti.

---

## 4. Rekomenduojami veiksmai (ne įdiegta kode)

- **Micro-win M1:** Pirmos 1–2 skaidrės – trumpas copy/paste arba vienas klausimas (turinio pakeitimas, SOT / modules.json).
- **A/B CTA tekstų:** Po surinkimo duomenų – testuoti skirtingus CTA tekstus (dashboard by cta_id).
