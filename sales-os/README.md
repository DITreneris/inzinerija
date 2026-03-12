# Sales OS – Promptų anatomija

Minimalus pardavimų paketas. Mažiau = daugiau €.

---

## Failai

| Failas | Paskirtis |
|--------|-----------|
| `product_snapshot.md` | Kam, problema, rezultatas, kodėl dabar, kaina |
| `marketing_plan.md` | ICP, pasiūlymas, kanalas, 30d tikslas, KPI, segmentai |
| `crm_active.md` | Top 20 (A segmentas) + aktyvūs kontaktai |

---

## Kiss–Marry–Kill (ką įtraukta ir ko ne)

| Kategorija | Įtraukta (Marry) | Neįtraukta (Kill) |
|------------|------------------|-------------------|
| **Kontaktai** | Top 20 iš `dalyviu_sarasas.md` (A segmentas) | Pilnas 132 sąrašas – vietinis failas (root) |
| **Segmentai** | A/B/C strategija, 3 pitch'ai pagal rolę | Masinė komunikacija |
| **Įmonės** | Telia, VMG, KN Energies, VU, KTU, Registrų centras, Inovacijų agentūra, Verslo žinios | — |
| **Šaltiniai** | `dalyviu_sarasas.md`, `docs/marketing_plan.md`, `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` | src/, docs/, workflow, roadmap, design system |

**Kiss:** Vienas pagrindinis pranešimas, vienas kanalas (LinkedIn DM), vienas CTA (WhatsApp).
