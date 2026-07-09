# MON-4 – PostHog production deploy

> **Tikslas:** Įjungti produktinę analitiką marketing monorepo + training app funnel.  
> **Repo:** [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy) (env + snippet); eventai instrumentuoti **inzinerija** (`src/utils/analytics.ts`).  
> **Atnaujinta:** 2026-07-09  
> **SOT:** [`ANALYTICS_DASHBOARD_MVP.md`](../development/ANALYTICS_DASHBOARD_MVP.md), [`ANALYTICS_EVENT_TAXONOMY.md`](../development/ANALYTICS_EVENT_TAXONOMY.md)

---

## Būsena (2026-07-09)

| Punktas                                   | Būsena                                  |
| ----------------------------------------- | --------------------------------------- |
| Eventai kode (`track()`, `pricing_click`) | ✅ inzinerija                           |
| `VITE_POSTHOG_KEY` production             | ⏳ Marketing Vercel                     |
| PostHog snippet gyvas                     | ⏳ Marketing layout arba training index |
| Dashboard 4 widgetai                      | ⏳ Po snippet                           |

**Blokeris monetization scale:** be MON-4 negalima matuoti MON-7 baseline.

---

## 1. Vercel env (marketing repo)

| Kintamasis          | Reikšmė                                                         |
| ------------------- | --------------------------------------------------------------- |
| `VITE_POSTHOG_KEY`  | PostHog Project API Key                                         |
| `VITE_POSTHOG_HOST` | `https://eu.i.posthog.com` (EU) arba `https://us.i.posthog.com` |

Training build per monorepo paveldi env, jei snippet naudoja `import.meta.env.VITE_POSTHOG_KEY`.

---

## 2. Snippet vieta (pasirinkti vieną)

**A) Marketing frontend layout** (rekomenduojama – visi puslapiai):

- Įkelti PostHog init į marketing `frontend/` root layout
- Training `/anatomy/` inherit per shared shell arba atskirą snippet training `index.html`

**B) Training index per monorepo build:**

- PostHog init `apps/prompt-anatomy/index.html` arba `App.tsx` mount (jau paruošta per `analytics.ts`)

---

## 3. Dashboard widgetai (minimalus MVP)

Pagal `ANALYTICS_DASHBOARD_MVP.md` §2:

1. **M1 completion rate** – modulis 1 baigtas / pradėtas
2. **M3 completion rate**
3. **Drop-off** – paskutinė skaidrė prieš išėjimą
4. **`pricing_click`** – `m3_upsell_pricing`, `m6_upsell_tier9`, `access_gate_pricing`

---

## 4. Prod patikra

1. Atidaryti `https://www.promptanatomy.app/anatomy/` (incognito)
2. DevTools → Network → filtras `posthog` arba `i.posthog`
3. Atlikti: gate CTA click, modulio complete (jei tier > 0)
4. PostHog Live events – matyti `pricing_click` arba progress eventus

---

## 5. Po deploy (MON-7)

Po **2–4 sav.** surinkti baseline ir koreguoti KPI interpretacijas (`ANALYTICS_DASHBOARD_MVP.md` §2).

---

## Checklist

- [ ] `VITE_POSTHOG_KEY` Vercel Production
- [ ] Snippet deploy'intas
- [ ] Live events matomi PostHog
- [ ] 4 dashboard widgetai sukurti
- [ ] `RELEASE_QA_RUN.md` – MON-4 pažymėtas ✅
