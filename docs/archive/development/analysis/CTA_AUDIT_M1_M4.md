# CTA auditas: vienas dominuojantis CTA per skaidrę (Faze 1.2)

**Šaltinis:** [audito planas](.cursor/plans/audito_įgyvendinimo_planas_agentams_36a36f45.plan.md) §1.2; [GOLDEN_STANDARD.md](GOLDEN_STANDARD.md) §4.2 – vienas akcentuotas CTA, antriniai – slate/mažesnis.

**Kriterijus:** Skaidrėje – vienas aiškiai paryškintas pagrindinis veiksmas (accent/brand). Antriniai („Peržiūrėti“, „Paslėpti“, antras „Kopijuoti“) – vizualiai antro plano (slate, mažesnis). Sekcijoje su copyable – vienas „Kopijuoti“ mygtukas.

---

## Rezultatų lentelė (3–5 skaidrės M1 ir M4)

| Skaidrės id | Modulis | Tipas | Vieta (modules.json) | OK / FAIL | Pastaba |
|-------------|---------|--------|------------------------|-----------|---------|
| 1 | M1 | action-intro | modules[0].slides[0] | **OK** | Vienas CTA: ctaText „Pamatyk skirtumą per 30 sekundžių!“. Hero + reveal, be konkuruojančių mygtukų. |
| 2 | M1 | definitions | modules[0].slides[2] | **OK** | Nėra copyable nei pagrindinio CTA; informacinė skaidrė. |
| 5 | M1 | meta | modules[0].slides[4] | **OK** | Meta blokas (BlockSlides): vienas dominuojantis veiksmas – šablono kopijavimas; be dvigubo „Kopijuoti“. |
| 39 | M4 | content-block | M4 slides, id 39 | **OK** | Viena sekcija su copyable (3️⃣ Kopijuojamas promptas); CTA tekste „🔘 Kopijuoti promptą (žemiau)“ – vienas veiksmas. Collapsible ir terms – antro plano. |
| 42 | M4 | intro-action-pie | M4 slides, id 42 | **OK** | Vienas CTA: ctaReveal „Parodyk 2026 duomenis“. Klausimas + pasirinkimas + vienas mygtukas. |
| 45 | M4 | evaluator-prompt-block | M4 slides, id 45 | **OK** | Vienas vertintojo promptas (copyable) + practicalTask žingsniai; vienas dominuojantis „Kopijuoti“/žingsnių CTA. |

---

## Išvada

Pasirinktos 6 skaidrės (M1: 1, 2, 5; M4: 39, 42, 45) atitinka GOLDEN_STANDARD §4.2: **vienas dominuojantis CTA** per skaidrę; antriniai veiksmai (collapsible, terms blokai) – antro plano. Pataisymų (CONTENT_AGENT / DATA_AGENT) **nereikia**.

Jei plėsti auditą – rekomenduojama tikrinti kitas M4 content-block skaidres su keliais copyable (pvz. skaidrės su „Kopijuoti“ keliuose blokuose) ir įsitikinti, kad UI rodo vieną akcentuotą CTA, o antrinius – slate/mažesniu stiliumi.

---

*Data: 2026-03-11. Atliko: UI_UX_AGENT (auditas pagal planą).*
