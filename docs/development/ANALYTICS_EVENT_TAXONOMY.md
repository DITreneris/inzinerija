# Analytics event taxonomy – MVP (Promptų anatomija)

> **Tikslas:** Vienas šaltinis tiesa eventų pavadinimams, apibrėžimams, properties ir dedupe taisyklėms. Naudoti instrumentuojant ir kuriant funnel/dashboard.

---

## 1. Event tracking spec (lentelė)

| event_name | Kada triggerinamas (definition) | Required properties | Optional | Dedupe taisyklė |
|------------|----------------------------------|---------------------|----------|------------------|
| **slide_view** | Skaidrė tampa matoma viewport (arba pirmas paint po navigacijos) | `module_id`, `slide_id`, `session_id`, `anon_id` | `slide_index`, `slide_type`, `utm_source`, `utm_medium`, `timestamp` | 1x per session per (module_id, slide_id) |
| **slide_complete** | Vartotojas pereina į kitą skaidrę (next) arba baigia modulį (paskutinė skaidrė) | `module_id`, `slide_id`, `session_id`, `anon_id` | `slide_index`, `time_on_slide_sec`, `timestamp` | 1x per session per (module_id, slide_id) |
| **practice_start** | Atidaroma/pradėta praktinė užduotis (pirmas focus/click į input arba „Pradėti“) | `module_id`, `slide_id`, `practice_id`, `session_id`, `anon_id` | `timestamp` | 1x per session per (module_id, practice_id) |
| **practice_complete** | Vartotojas pažymi užduotį kaip atliktą (success/check) arba Copy + paste | `module_id`, `slide_id`, `practice_id`, `session_id`, `anon_id` | `time_to_complete_sec`, `timestamp` | 1x per session per (module_id, practice_id) |
| **cta_click** | Paspaudimas į CTA (nuoroda/mygtukas: kitas modulis, spin-off, copy, išorinis) | `module_id`, `slide_id`, `cta_id`, `session_id`, `anon_id` | `cta_label`, `destination` (internal/external/spin-off), `utm_source`, `timestamp` | Nėra (kiekvienas click skaičiuojamas) |
| **collapse_open** | Vartotojas atidaro collapsible sekciją (expand) | `module_id`, `slide_id`, `section_index`, `session_id`, `anon_id` | `timestamp` | 1x per session per (module_id, slide_id, section_index) |
| **rl_step_click** | Paspaudimas į RL proceso diagramos žingsnį (1–4) – mokymosi signalas | `module_id`, `slide_id`, `step_index`, `session_id`, `anon_id` | `timestamp` | Nėra (kiekvienas click skaičiuojamas) |

---

## 2. Identifikatoriai

- **anon_id:** Pirmą kartą lankytojui generuojamas UUID, saugomas localStorage (`prompt-anatomy-anon-id`). Nenaudoti cookie.
- **session_id:** Nauja sesija = atsidarymas/refresh arba 30 min neaktyvumo. Saugoma `prompt-anatomy-session-id`, `prompt-anatomy-session-start`.

---

## 3. Privacy

- Tik anonymous events (PostHog: `$process_person_profile: false`).
- Nekaupti email, IP vardan KPI.
- UTM – tik source/medium (iš URL).

---

## 4. Funnel definicijos

Etapai:

1. **Landing** – page_view `/` (arba pirmas slide_view bet kurio modulio)
2. **M1_start** – slide_view module_id=1
3. **M1_complete** – module_completed (esančio learningEvents) arba slide_complete paskutinė M1 skaidrė
4. **M3_start** – slide_view module_id=3
5. **M3_complete** – module_completed M3
6. **M4_start** – slide_view module_id=4 arba cta_click destination=M4
7. **Spin_off_enter** – cta_click destination=spin-off

Conversion: unikalūs anon_id, laiko langas 30 d. nuo pirmo Landing.

---

## 5. Implementacija

- **Modulis:** `src/utils/analytics.ts` – `track(eventName, properties)`, dedupe in-memory per session.
- **Integracija:** ModuleView (slide_view, slide_complete), SlideContent/PracticalTask (practice_start, practice_complete), CTA mygtukai/nuorodos (cta_click), ContentSlides collapsible (collapse_open).

---

## 6. PostHog (optional)

- Nustatyti `VITE_POSTHOG_KEY` ir `VITE_POSTHOG_HOST`; įkelti PostHog snippet į index.html (arba lazy init App mount).
- `analytics.ts` kviečia `posthog.capture(eventName, { ...properties, $process_person_profile: false })` kai `window.posthog` yra.
- Dashboard ir funnel: PostHog Funnel / Insights; žr. `docs/development/ANALYTICS_DASHBOARD_MVP.md`.
