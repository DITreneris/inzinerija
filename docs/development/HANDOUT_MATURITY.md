# Handout maturity (M1–15)

> **Paskirtis:** trumpas kontraktas PDF atmintinių brandai. Maketo detalės – [`PDF_MAKETO_GAIRES.md`](PDF_MAKETO_GAIRES.md). Entry points – [`completionArtifacts.json`](../../src/data/completionArtifacts.json). Sertifikatai – GOLDEN §3.7 / [`CERTIFICATE_CONTENT_SOT.md`](CERTIFICATE_CONTENT_SOT.md).

## Klasės

| Klasė         | Artefaktai           | CTA intensyvumas                                     |
| ------------- | -------------------- | ---------------------------------------------------- |
| `value-only`  | M1, M4               | Be outbound nuorodų                                  |
| `footer`      | M5, M6               | Minimalus website footer (`doc.link` + label)        |
| `path-funnel` | M7–9, M10–12, M13–15 | 2 psl.: value + ecosystem CTA (`utm_medium=handout`) |

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

## Related

- Kit: `src/utils/handoutPdfKit.ts`
- Annots smoke: `src/utils/__tests__/handoutPdfLinks.annots.test.ts`
