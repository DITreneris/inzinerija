# Handout maturity (M1–15)

> **Paskirtis:** trumpas kontraktas PDF atmintinių brandai. Maketo detalės – [`PDF_MAKETO_GAIRES.md`](PDF_MAKETO_GAIRES.md). Entry points – [`completionArtifacts.json`](../../src/data/completionArtifacts.json). Sertifikatai – GOLDEN §3.7 / [`CERTIFICATE_CONTENT_SOT.md`](CERTIFICATE_CONTENT_SOT.md).

## Klasės

| Klasė         | Artefaktai           | CTA intensyvumas                                     | Density (1 psl.)           |
| ------------- | -------------------- | ---------------------------------------------------- | -------------------------- |
| `value-only`  | M1, M4               | Be outbound nuorodų                                  | `regular`                  |
| `footer`      | M5, M6               | Minimalus website footer (`doc.link` + label)        | M5=`compact`, M6=`regular` |
| `path-funnel` | M7–9, M10–12, M13–15 | 2 psl.: value + ecosystem CTA (`utm_medium=handout`) | `compact`                  |

> **M5:** pilnas body (įrankiai + promptai + seka + QC + slenksčiai) netelpa į A4 su `regular` (~55 mm overflow → footer overlap). Fit guard: `HANDOUT_CONTENT_BOTTOM` + `m5HandoutPdf.fit.test.ts`.

## Privalomi laukai pagal klasę

| Klasė         | Privaloma                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `value-only`  | Starter / checklist / QC (arba lygiavertis); tu-forma; DI (LT)                                                                   |
| `footer`      | Praktinis workflow + QC arba refleksija 24–48 val.; footer CTA                                                                   |
| `path-funnel` | Sąrašai pagal kelią + **starterPrompt** (M79/M1012) arba modality šablonai (M1315) + 48 val. veiksmas + **path-fit** primary CTA |

## Path-fit primary CTA

| Bundle | Primary blog slug                    |
| ------ | ------------------------------------ |
| M7–9   | `ai-workflow-canvas-template`        |
| M10–12 | `agent-orchestrator-operating-model` |
| M13–15 | `prompt-anatomy-ecosystem-map`       |

Secondary „Decide“: hub URL su `utm_campaign=m{N}_handout_decide` (kol `.pro` nestabilus).

## Nuorodų taisyklė

1. Matomas label (mėlyna + underline).
2. Path CTA: po label – **pilnas URL** (small).
3. Hitbox: `doc.link` su padding (`src/utils/pdfLink.ts`) – nepasikliauti vien `textWithLink`.

## Backlog decisions (Horizon A — CORP-M2 ✅ 2026-07-28)

| Sprendimas          | Apimtis                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Keep**            | Klasės `value-only` / `footer` / `path-funnel`; entry = ModuleComplete + „Mano medžiaga“ (`completionArtifacts.json`) |
| **Won’t-now**       | Papildomos mid-path PDF atmintinės (pvz. po M2/M5 mid-module); sertifikatų skills-QR — be atskiro product ticket      |
| **Revisit trigger** | Product call arba Horizon C capacity                                                                                  |

Rationale: M1/M4/M5/M6/M79/M1012/M1315 + PDF-FIT-1 ✅; mid-path / QR = naujas epic be capacity.

## Related

- Kit: `src/utils/handoutPdfKit.ts`
- Annots smoke: `src/utils/__tests__/handoutPdfLinks.annots.test.ts`
