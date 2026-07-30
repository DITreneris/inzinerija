# Pamokos – CODE_REVIEW_AGENT

> Formatas (viena eilutė per pamoką, žr. `docs/development/dod_01.md` §5):
> `YYYY-MM-DD | kontekstas (modulis/skaidrė/failas) | problema | sprendimas | failai`
> Klaidos ir regresijos fiksuojamos `docs/development/TEST_REPORT.md` (nuorodos, ne kopijos); čia – tik diagnostikos šablonai ir tipinės patikros pamokos.

## Pamokos

2026-07-13 | M4 sk. 53.5 Satori→SVG | prarasti caption laukai migracijoje | diff YAML vs portalBeatContent prieš „done“ | portal-beat re migration
2026-07-13 | M4 sk. 53.5 | awareness polish be retest | ne skelbti slide done; 48h protokolas | TEST_REPORT.md
2026-07-13 | M4 sk. 53.5 anti-PPT | SOT→JSON→UI: DS nepririštas | CODE_REVIEW: news-portal turi naudoti getContentBlockVariantClasses per PortalBlockShell; ad-hoc border-l-4 = regress rizika | PortalBlockShell.tsx, blockVariantClasses.ts
2026-06-30 | M9 handout PDF | spinoff utm_medium PDF'e | patikrinti utm_medium=handout, utm_campaign=m9_handout, cta_id m79_handout_pdf; handout ≠ tier3 sertifikatas | ECOSYSTEM_MAP.md, m79HandoutPdf.ts
2026-06-30 | Leader repo PDF | statinis HEAD fallback | mūsų jsPDF runtime – reikia try/catch, ne static PDF probe | m79HandoutPdf.ts, handoutPdfKit.ts
2026-06-30 | buildEcosystemUrl rollout | ne visi touchpointai | JSON spinoffCta.url (M4 info/space/map) vis dar be UTM – SHOULD batch | modules.json, ContentSlides.tsx
