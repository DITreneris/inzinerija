# M10–12 turinio panaudojimo brief

> **Paskirtis:** greitas marketingo / turinio komandos handoff iš jau paruošto Agentų inžinerijos kelio. Tai nėra naujas mokymo turinys ir nekeičia `modules.json`.
>
> **Statusas:** M10–12 yra authoring kataloge ir production bundle šiuo metu nepasiekia. Šis brief siūlo naudoti jau parašytą turinį kaip išorinius straipsnius, lead magnet ar socialinių įrašų seriją be papildomo mokymo app vystymo.

## Pagrindiniai šaltiniai

- `docs/turinio_pletra_moduliai_10_11_12.md` – turinio SOT Agentų inžinerijos keliui.
- `docs/MODULIO_10_SKAIDRIU_EILES.md` – M10–M12 skaidrių seka ir kur kiekviena tema rodoma kurse.
- `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md` §17–26 – praktiniai lab'ai, workflow specifikacija, testavimas, saugumas, ROI skaičiuoklė, įrankių pasirinkimas.
- `docs/development/BLOG_CURRICULUM_LINKS.yaml` – jau suplanuoti M10–M12 blog / ekosistemos touchpoint'ai.

## Greičiausiai panaudojami turinio vienetai

### 1. Penki workflow šablonai verslui

**Šaltinis:** `docs/turinio_pletra_moduliai_10_11_12.md` §3b3, M10 skaidrė 10.48.

Panaudojimo formatas:

- LinkedIn carousel: „5 DI agentų workflow šablonai verslui“.
- Blog įrašas: vienas šablonas = viena trumpa sekcija su pavyzdžiu.
- Webinar mini dalis: 10 min praktinis pasirinkimas „kuris šablonas tinka mano procesui?“.

Šablonai:

- Grandinė: užklausa → klasifikacija → juodraštis → siuntimas.
- Maršrutizavimas: skundas / užklausa / pasiūlymas → skirtingos šakos.
- Lygiagretus darbas: CRM + el. paštas vienu metu → sujungimas.
- Koordinatorius + specialistai: duomenys + tendencijos → viena vadovo santrauka.
- Generatorius + vertintojas: juodraštis → kokybės patikra → pataisa.

Jau suplanuotas blog slug: `how-to-design-an-ai-agent-workflow`.

### 2. 3A strategija: Automatize / Augment / Autonomize

**Šaltinis:** `docs/turinio_pletra_moduliai_10_11_12.md` §3b ir `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md` §11.

Panaudojimo formatas:

- Lead magnet: „80 / 15 / 5 DI automatizavimo taisyklė“.
- Sales enablement one-pager: kaip saugiai pradėti nuo taisyklių, tada pridėti DI pagalbą, tik galiausiai ribotą autonomiją.
- Trumpas video: „Kodėl ne viską verta daryti autonomiškai“.

Pagrindinė žinutė:

- 80 % – paprasti taisyklėmis paremti srautai.
- 15 % – žmogus sprendžia, DI padeda.
- 5 % – ribota autonomija su saugikliais, vertintoju ir žmogaus priežiūra.

### 3. Agentinio prompto šablonas

**Šaltinis:** `docs/turinio_pletra_moduliai_10_11_12.md` §4.3a, M10 skaidrė 10.5.

Panaudojimo formatas:

- Copyable prompt social post.
- Downloadable checklist: „5 dalys agentiniam promptui“.
- Newsletter įrašas su prieš / po pavyzdžiu.

Šablono dalys:

- Rolė.
- Užduotis žingsniais.
- Įrankiai ir kada juos naudoti.
- Išvesties formatas.
- Klaidos tvarkymas.

Svarbi kalbos taisyklė: LT tekstuose naudoti **DI**, ne „AI“. EN straipsnių sluguose „AI“ gali likti, nes tai išorinis / EN kontekstas.

### 4. ROI skaičiuoklės šablonas

**Šaltinis:** `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md` §22.

Panaudojimo formatas:

- Lead magnet skaičiuoklė Google Sheets / Airtable.
- Pricing puslapio papildomas blokas: „pasiskaičiuok, kiek sutaupytų 3 automatizacijos“.
- B2B discovery call worksheet.

Formulė:

```text
(Užduotys per savaitę) × (laikas vienai užduočiai val.) × (valandos kaina €)
- (įrankio kaina per mėn. + priežiūros laikas)
```

Rekomenduojami scenarijai: dabar, +3 mėn., +12 mėn.

### 5. Įrankių pasirinkimo sprendimų medis

**Šaltinis:** `docs/turinio_pletra_moduliai_10_11_12.md` §3c ir `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md` §21.

Panaudojimo formatas:

- Interaktyvus website blokas: „kurį įrankį rinktis?“.
- Pardavimo konsultacijos klausimynas.
- Blog įrašas apie Zapier, Make, n8n, Power Automate ir Workato.

Trumpas medis:

- Microsoft ekosistema → Power Automate.
- Non-tech komanda ir greitas startas → Zapier.
- Sudėtingesnė logika ir kaina → Make.com.
- Pilna kontrolė ir savihost → n8n.
- Enterprise governance / compliance → Workato.

Jau suplanuotas blog slug: `choosing-workflow-automation-ai-pipelines`.

## Praktikos turinys, tinkamas lead magnet'ams

**Šaltinis:** `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md` §17–20, M12 skaidrės 121–123.

- Lab #1 Automatize: forma → Sheets / CRM → laiškas → Slack / Teams.
- Lab #2 Augment: laiškas → DI santrauka → žmogaus patvirtinimas → siuntimas.
- Lab #3 Autonomize: atsiliepimai → nuotaika (sentimentas) → eskalacija → ticket / užduotis.
- Workflow specifikacija: trigger, input schema, condition, actions, output, SLA / retries / rate limits, error handling, audit log.
- Testavimo rinkinys: 10 edge-case scenarijų prieš paleidžiant gyvai.
- Saugumo mini-modulis: PII, access kontrolė, API raktai, incident playbook, human-in-the-loop.

Rekomenduojamas paketas: „3 praktinės DI automatizacijos per 30 minučių“ kaip PDF / webinar worksheet.

## Jau suplanuoti ekosistemos touchpoint'ai

**Šaltinis:** `docs/development/BLOG_CURRICULUM_LINKS.yaml`.

- `how-to-design-an-ai-agent-workflow` – po M10 10.48, multi-agent šablonai.
- `choosing-workflow-automation-ai-pipelines` – po M10 10.15, workflow ir įrankių pasirinkimas.
- `evaluating-agents-with-clear` – M11 test-fail deepen.
- `agent-orchestrator-operating-model` – M10 module-complete.
- `audit-trails-for-ai-workflows` – M12 module-complete.
- `model-context-protocol-enterprise` – optional reading, M10 MCP tema.

## Rekomenduojamas 2 savaičių panaudojimo planas

1. Savaitė 1: paruošti 3 socialinius įrašus iš 3A, 5 workflow šablonų ir agentinio prompto šablono.
2. Savaitė 1: iš ROI formulės padaryti paprastą Google Sheets skaičiuoklę arba lead magnet PDF.
3. Savaitė 2: paruošti vieną ilgesnį blog įrašą pagal `how-to-design-an-ai-agent-workflow`.
4. Savaitė 2: paruošti webinar / demo outline pagal tris M12 lab'us.

## Kas nėra šio brief apimtyje

- Nekeisti `src/data/modules.json` ar M10–12 skaidrių.
- Neįtraukti M10–12 į `build:production`.
- Nekurti naujo mokymo app feature be atskiro produkto sprendimo.
- Neperrašyti TODO / ROADMAP vartų: M10–12 monetizacija lieka Deferred, kol MON P0 ir baseline konversijos nepatvirtintos.
