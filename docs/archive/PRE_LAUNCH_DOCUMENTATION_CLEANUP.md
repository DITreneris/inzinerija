# Pre-launch dokumentacijos išvalymas

> **Data:** 2026-03-09  
> **Tikslas:** Repo paruoštas deploy – apvalyta dokumentacija, seni dokumentai archyve, sumažintos ilgos failų grandinės (tokenų taupymas).

---

## Kas padaryta

### 1. Greita nuoroda (mažiau tokenų)
- **`docs/DOCUMENTATION_QUICK_REF.md`** – vienas failas su SOT lentele ir kritiniais keliais; agentams naudoti pirmiausia vietoj pilno indekso.
- **`.cursor/rules/agent-orchestrator.mdc`** – nurodyta: pirmiausia `DOCUMENTATION_QUICK_REF.md`, pilnas sąrašas – `DOCUMENTATION_INDEX.md`.

### 2. Indeksas ir archyvas
- **`docs/DOCUMENTATION_INDEX.md`** – viršuje pridėta nuoroda agentams naudoti QUICK_REF pirmiausia; atnaujinta data (pre-launch 2026-03-09).
- **`docs/archive/README.md`** – atnaujinta: pre-launch būsena, nuoroda į QUICK_REF; patvirtinta, kad Tier 1–4 jau perkelti į `archive/development/` (lokaliai).
- **`docs/development/DOKUMENTACIJOS_ARCHYVAVIMO_PLANAS.md`** – pažymėta įgyvendinimo data (2026-03-09).

### 3. Archyvo būsena
- **archive/development/** – jau pilnas pagal planą (Tier 1–4: įgyvendinti auditai, vienkartiniai planai, LLM/schema dokumentai).
- **archive/root/**, **archive/moduliai_7_8_9/** – struktūra ir turinys atitinka archive README (lokaliai).
- Aktyvūs dokumentai lieka tik **docs/** ir **docs/development/**; niekas iš aktyvių nenuveda į archyvą kaip SOT.

### 4. Grandinių nutraukimas
- Agentai gali krauti tik **DOCUMENTATION_QUICK_REF.md** arba **LEAN_INDEX.md** (~20 failų branduolys) vietoj pilno indekso.
- Pilnas sąrašas – tik kai užduotis reikalauja (konkretus modulis/agentas).

### 5. Lean repo (2026-03-09)
- **docs/LEAN_INDEX.md** – vienas lean branduolys: SOT + agentai + M4 eilė + kokybė (~20 failų); prieinama agentams.
- **~46 dokumentų** perkelta iš `docs/development/` į `docs/archive/development/`: User Journey analizės, ANALIZE_*, M4_SKAIDRE_* auditai, kalbos/UI auditai, planai, ataskaitos. `docs/development/` dabar **~33 .md** failai (buvo 82).
- Nuorodos atnaujintos: AGENT_ORCHESTRATOR, USER_JOURNEY_AGENT, agent-orchestrator.mdc → archive keliai kur reikia.

---

## Kas toliau (prieš deploy)

- [ ] Paleisti `RELEASE_QA_CHECKLIST.md` (a11y, lietuviškos raidės, MVP).
- [ ] Patikrinti, kad build/test eina per `npm run build` (jei taikoma).
- [ ] Jei reikia – atnaujinti `README.md` / deployment gidus su nuoroda į `docs/DOCUMENTATION_QUICK_REF.md` arba `docs/getting-started/QUICK_START.md`.
