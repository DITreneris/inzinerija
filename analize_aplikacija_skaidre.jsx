import { useState, useMemo, useCallback, useEffect } from "react";

const DATA = {
  shifts: [
    { year: "2024", theme: "Produktyvumo įrankis", sub: "Kūryba · Tekstas · Paieška",          accent: "#1d4ed8", light: "#eff6ff", border: "#bfdbfe",
      ctx: "AI naudojamas kaip produktyvumo multiplikatorius: greičiau kuriamas turinys, redaguojami tekstai, ieškoma informacija." },
    { year: "2025", theme: "Asmeninis asistentas",  sub: "Emocija · Struktūra · Mokymasis",     accent: "#0369a1", light: "#f0f9ff", border: "#bae6fd",
      ctx: "Ryškus poslinkis į asmeninę vertę: emocinė parama, kasdienė struktūra, mokymasis ir profesionalus kodavimas." },
    { year: "2026", theme: "Kognityvinė OS",        sub: "Sprendimai · Sistema · Kompetencija", accent: "#0f172a", light: "#f8fafc", border: "#cbd5e1",
      ctx: "AI pereina į kognityvinės infrastruktūros vaidmenį: sprendimų paruošimas, sisteminis planavimas ir profesionalūs workflow'ai." },
  ],
  categories: [
    { id: "Kūryba",      color: "#1d4ed8", bg: "#eff6ff" },
    { id: "Emocinis",    color: "#0369a1", bg: "#f0f9ff" },
    { id: "Informacija", color: "#0891b2", bg: "#ecfeff" },
    { id: "Struktūra",   color: "#1e3a8a", bg: "#eef2ff" },
    { id: "Augimas",     color: "#0f766e", bg: "#f0fdfa" },
    { id: "Technika",    color: "#374151", bg: "#f9fafb" },
  ],
  useCases: [
    { id: "ideas",     label: "Idėjų generavimas",      cat: "Kūryba",      emoji: "💡", ranks: { "2024": 1, "2025": null, "2026": null },
      insight: "Dominavo 2024 m. kaip pagrindinis kūrybinis įrankis. Šiandien – higiena, ne diferenciatorius. Kūrybinė pagalba tapo standartu, ne pranašumu." },
    { id: "therapy",   label: "Emocinė parama",         cat: "Emocinis",    emoji: "🤝", ranks: { "2024": 2, "2025": 1,    "2026": 1    },
      insight: "Nuosekliai #1–2 pozicijoje visuose trijuose reitinguose. Rodo gilų, neišpildytą žmonių poreikį. Verslo galimybė: well-being ir career coaching platformos." },
    { id: "search",    label: "Specifinė paieška",      cat: "Informacija", emoji: "🔍", ranks: { "2024": 3, "2025": null, "2026": null },
      insight: "2024 m. TOP 3, vėliau išstumta kontekstualesnių poreikių. Tradicinė paieška tampa foniniu įrankiu." },
    { id: "editing",   label: "Teksto redagavimas",     cat: "Kūryba",      emoji: "✏️", ranks: { "2024": 4, "2025": null, "2026": null },
      insight: "Stiprus 2024 m., paskui dingsta iš radaro. Tapo automatiniu foniniu procesu – nebemano, kad tai atskira veikla." },
    { id: "topics",    label: "Temų tyrinėjimas",       cat: "Informacija", emoji: "🗺️", ranks: { "2024": 5, "2025": null, "2026": null },
      insight: "Buvo svarbu AI naujokams. Didėjant kompetencijai, vartotojai ieško gilesnių, specifinių atsakymų." },
    { id: "organize",  label: "Gyvenimo organizavimas", cat: "Struktūra",   emoji: "📋", ranks: { "2024": null, "2025": 2,    "2026": 2    },
      insight: "Naujas 2025 m. ir išlaiko poziciją. AI tampa kasdienio planavimo dalimi. Potencialas: produktyvumo įrankiai su AI integracijom." },
    { id: "purpose",   label: "Prasmės ieškojimas",     cat: "Emocinis",    emoji: "🧭", ranks: { "2024": null, "2025": 3,    "2026": null },
      insight: "Trumpalaikis poreikis 2025 m. Verslo lensas: career coaching, mentorystė, tikslų nustatymas su AI." },
    { id: "learning",  label: "Mokymasis",               cat: "Augimas",     emoji: "📚", ranks: { "2024": null, "2025": 4,    "2026": 3    },
      insight: "Didžiausia verslo grąža: mažiau klaidų, greitesnis onboarding, aukštesnė kompetencija. L&D gauna AI partnerį." },
    { id: "coding",    label: "Kodavimas (pro)",         cat: "Technika",    emoji: "⌨️", ranks: { "2024": null, "2025": 5,    "2026": 4    },
      insight: "Augimas tęsiasi. Bet greitis be QA ir architektūros = rizika. Strategija: greitis + governance." },
    { id: "decisions", label: "Sprendimų paruošimas",   cat: "Struktūra",   emoji: "⚖️", ranks: { "2024": null, "2025": null, "2026": 5    },
      insight: "2026 m. naujienokė. AI tampa sprendimų partneriu – judgment support. Aukštas verslo potencialas C-level srityje." },
  ],
};

const catMeta = (id) => DATA.categories.find((c) => c.id === id) || { color: "#374151", bg: "#f9fafb" };

const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f1f5f9; color: #1e293b; font-family: 'IBM Plex Sans', system-ui, sans-serif; min-height: 100vh; -webkit-font-smoothing: antialiased; }
  button { font-family: inherit; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
`;

function YearTab({ s, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "18px 16px", border: "none",
      borderBottom: active ? "3px solid " + s.accent : "3px solid transparent",
      background: active ? "#ffffff" : "transparent",
      cursor: "pointer", transition: "all 0.18s ease",
      textAlign: "left", display: "flex", flexDirection: "column", gap: 3,
    }}>
      <span style={{ fontSize: 24, fontWeight: 900, color: active ? s.accent : "#94a3b8",
        fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}>{s.year}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: active ? s.accent : "#94a3b8" }}>{s.theme}</span>
      <span style={{ fontSize: 10, color: active ? "#64748b" : "#cbd5e1" }}>{s.sub}</span>
    </button>
  );
}

function KpiCard({ emoji, label, value, sub, accent, delay }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay || 0);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      background: "#ffffff", border: "1px solid #e2e8f0",
      borderTop: "3px solid " + accent, borderRadius: 10, padding: "22px 24px",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 26, marginBottom: 10 }}>{emoji}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: accent,
        fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: -0.5, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginTop: 8 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 3 }}>{sub}</div>
    </div>
  );
}

function RankPill({ rank, accent }) {
  if (!rank) return <span style={{ fontSize: 11, color: "#e2e8f0", fontFamily: "monospace" }}>—</span>;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 28, height: 28, borderRadius: "50%",
      background: accent + "18", border: "1.5px solid " + accent,
      color: accent, fontSize: 11, fontWeight: 700, fontFamily: "monospace",
    }}>{rank}</span>
  );
}

function MiniSparkline({ use, activeYear }) {
  const years = ["2024", "2025", "2026"];
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
      {years.map((y) => {
        const r = use.ranks[y];
        const pct = r ? Math.round(((6 - r) / 5) * 100) : 0;
        const isA = y === activeYear;
        const cm = catMeta(use.cat);
        return (
          <div key={y} title={y + ": " + (r ? "#" + r : "nėra TOP 5")} style={{
            width: 9, height: pct ? pct + "%" : "3px", minHeight: 3,
            background: r ? (isA ? cm.color : cm.color + "55") : "#e2e8f0",
            borderRadius: 3, transition: "all 0.3s ease",
          }} />
        );
      })}
    </div>
  );
}

function UseCaseRow({ use, selectedYear, onClick, isSelected, index }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 50 + index * 35);
    return () => clearTimeout(t);
  }, [index, selectedYear]);

  const cm = catMeta(use.cat);
  const rank = use.ranks[selectedYear];
  const inTop = !!rank;

  return (
    <div onClick={() => onClick(use)} style={{
      display: "grid", gridTemplateColumns: "32px 1fr 52px 70px",
      alignItems: "center", gap: 14, padding: "14px 20px",
      background: isSelected ? cm.bg : "#ffffff",
      borderLeft: "3px solid " + (isSelected ? cm.color : "transparent"),
      borderBottom: "1px solid #f1f5f9",
      cursor: "pointer",
      opacity: vis ? (inTop ? 1 : 0.42) : 0,
      transform: vis ? "translateX(0)" : "translateX(-8px)",
      transition: "opacity 0.35s ease, transform 0.35s ease, background 0.15s, border-left-color 0.15s",
    }}>
      <RankPill rank={rank} accent={cm.color} />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <span style={{ fontSize: 16 }}>{use.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: inTop ? "#1e293b" : "#94a3b8", lineHeight: 1.2 }}>{use.label}</span>
        </div>
        <span style={{
          fontSize: 10, padding: "2px 8px", borderRadius: 99,
          background: cm.bg, color: cm.color, border: "1px solid " + cm.color + "33",
        }}>{use.cat}</span>
      </div>
      <MiniSparkline use={use} activeYear={selectedYear} />
      <div style={{ textAlign: "right", fontSize: 10, color: isSelected ? cm.color : "#cbd5e1", fontWeight: 600 }}>
        {isSelected ? "▲ uždaryti" : "→"}
      </div>
    </div>
  );
}

function DetailPanel({ use, onClose, activeYear }) {
  const cm = catMeta(use.cat);
  const years = ["2024", "2025", "2026"];
  return (
    <div style={{
      background: "#ffffff", border: "1px solid #e2e8f0",
      borderTop: "4px solid " + cm.color, borderRadius: 12,
      overflow: "hidden", animation: "slideUp 0.22s ease",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    }}>
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f1f5f9",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 34 }}>{use.emoji}</span>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a",
              fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.2 }}>{use.label}</div>
            <span style={{ fontSize: 11, color: cm.color, fontWeight: 600 }}>{use.cat}</span>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
          width: 32, height: 32, cursor: "pointer", color: "#64748b", fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>✕</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {years.map((y, i) => {
          const r = use.ranks[y];
          const s = DATA.shifts.find((sh) => sh.year === y);
          const isA = y === activeYear;
          return (
            <div key={y} style={{
              padding: "16px 14px", textAlign: "center",
              borderRight: i < 2 ? "1px solid #f1f5f9" : "none",
              borderBottom: "1px solid #f1f5f9",
              background: isA ? cm.bg : "#ffffff",
            }}>
              <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 8,
                fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{y}</div>
              {r ? (
                <div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: isA ? cm.color : "#1e3a8a",
                    fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}>{"#" + r}</div>
                  <div style={{ fontSize: 10, color: cm.color, marginTop: 4, fontWeight: 600 }}>TOP 5</div>
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 12 }}>nėra</div>
              )}
              <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 8, lineHeight: 1.4 }}>{s.theme}</div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8",
          letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Verslo įžvalga</div>
        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.75 }}>{use.insight}</p>
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div style={{ padding: 48, textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 6 }}>Nėra rezultatų</div>
      <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
        Šiai kategorijai nėra scenarijų pasirinktais metais.
      </div>
      <button onClick={onReset} style={{
        padding: "8px 20px", borderRadius: 8, border: "1px solid #bfdbfe",
        background: "#eff6ff", color: "#1d4ed8", fontSize: 12, fontWeight: 600, cursor: "pointer",
      }}>Rodyti visus scenarijus</button>
    </div>
  );
}

function CtaBlock({ shift }) {
  return (
    <div style={{ background: "#0f172a", borderRadius: 12, padding: "24px 22px",
      boxShadow: "0 4px 12px rgba(15,23,42,0.15)" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: "#334155",
        letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Veiksmų planas</div>
      <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9",
        fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.35, marginBottom: 18 }}>
        Kaip pritaikyti šiuos duomenis savo organizacijoje?
      </div>
      {[
        "Identifikuokite, kurie AI scenarijai jau naudojami jūsų komandoje.",
        "Įvertinkite, kur didžiausia grąža: mokymasis, sprendimai, kodavimas.",
        "Integruokite governance: QA, architektūra, atsakomybė.",
      ].map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
          <span style={{
            width: 22, height: 22, borderRadius: "50%", background: "#1d4ed8",
            color: "#ffffff", fontSize: 10, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 1,
          }}>{i + 1}</span>
          <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.65 }}>{s}</span>
        </div>
      ))}
      <a href="https://hbr.org/topic/subject/ai" target="_blank" rel="noreferrer" style={{
        display: "block", textAlign: "center", padding: "12px 16px", borderRadius: 8,
        background: "#1d4ed8", color: "#ffffff", fontSize: 13, fontWeight: 700,
        textDecoration: "none", marginTop: 20, letterSpacing: 0.2,
      }}>Skaityti pirminius šaltinius →</a>
    </div>
  );
}

export default function App() {
  const [year, setYear]       = useState("2025");
  const [cat, setCat]         = useState("Visos");
  const [selected, setSelected] = useState(null);

  const shift = DATA.shifts.find((s) => s.year === year);

  const filtered = useMemo(() =>
    DATA.useCases
      .filter((u) => cat === "Visos" || u.cat === cat)
      .sort((a, b) => (a.ranks[year] || 99) - (b.ranks[year] || 99)),
    [year, cat]
  );

  const kpis = useMemo(() => {
    const top = DATA.useCases.filter((u) => u.ranks[year]);
    const catCount = top.reduce((acc, u) => { acc[u.cat] = (acc[u.cat] || 0) + 1; return acc; }, {});
    const dom = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0];
    const newEntries = top.filter((u) =>
      ["2024", "2025", "2026"].filter((y2) => y2 < year).every((y2) => !u.ranks[y2])
    );
    return { topCount: top.length, dom, newCount: newEntries.length };
  }, [year]);

  const handleClick = useCallback((use) => {
    setSelected((prev) => (prev && prev.id === use.id ? null : use));
  }, []);

  const resetCat = useCallback(() => { setCat("Visos"); setSelected(null); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <style>{globalCSS}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap" />

      <header style={{
        background: "#0f172a", borderBottom: "1px solid #1e293b",
        padding: "0 28px", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex",
          alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 30, height: 30, background: "#1d4ed8", borderRadius: 7,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📊</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>AI Panaudojimo Analizė</div>
              <div style={{ fontSize: 10, color: "#475569" }}>Strateginis poslinkis 2024–2026</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#334155", letterSpacing: 0.8, textTransform: "uppercase" }}>Šaltiniai:</span>
            <span style={{ fontSize: 11, color: "#64748b" }}>HBR · Filtered AI in the Wild</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 80px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "flex-end", marginBottom: 36, animation: "fadeIn 0.5s ease" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 2, background: shift.accent }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: shift.accent,
                letterSpacing: 2, textTransform: "uppercase" }}>Strateginis poslinkis · {year}</span>
            </div>
            <h1 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900, color: "#0f172a", lineHeight: 1.1, marginBottom: 14 }}>
              Kaip žmonių santykis su<br />
              <em style={{ fontStyle: "italic", color: shift.accent }}>dirbtiniu intelektu keičiasi</em>
            </h1>
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 520, lineHeight: 1.7 }}>
              Duomenų pagrindu pagrįsta analizė: kokie DI naudojimo scenarijai dominuoja
              ir ką tai reiškia verslo strategijai.
            </p>
          </div>
          <div style={{ background: shift.light, border: "1px solid " + shift.border,
            borderRadius: 12, padding: "16px 22px", minWidth: 220 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: shift.accent,
              letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{year} m. paradigma</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: shift.accent,
              fontFamily: "'Playfair Display', Georgia, serif" }}>{shift.theme}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{shift.sub}</div>
          </div>
        </div>

        <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #e2e8f0",
          marginBottom: 28, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            {DATA.shifts.map((s) => (
              <YearTab key={s.year} s={s} active={year === s.year}
                onClick={() => { setYear(s.year); setSelected(null); }} />
            ))}
          </div>
          <div style={{ padding: "14px 20px", background: shift.light, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 4, height: 44, background: shift.accent, borderRadius: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: shift.accent, marginBottom: 3 }}>Strateginis kontekstas</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, maxWidth: 680 }}>{shift.ctx}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          <KpiCard emoji="🏆" label="TOP 5 scenarijai" value={kpis.topCount + "/10"}
            sub={year + " m. reitinge"} accent={shift.accent} delay={0} />
          <KpiCard emoji="📌" label="Dominuojanti kategorija" value={kpis.dom ? kpis.dom[0] : "—"}
            sub={(kpis.dom ? kpis.dom[1] : 0) + " scenarijai TOP 5"}
            accent={catMeta(kpis.dom ? kpis.dom[0] : null).color} delay={80} />
          <KpiCard emoji="🆕" label="Nauji scenarijai" value={kpis.newCount}
            sub="pirmą kartą TOP 5" accent={shift.accent} delay={160} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, alignItems: "start" }}>

          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12,
            overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", background: "#f8fafc",
              display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8",
                textTransform: "uppercase", letterSpacing: 0.8, marginRight: 4 }}>Filtruoti:</span>
              {["Visos", ...DATA.categories.map((c) => c.id)].map((c) => {
                const active = cat === c;
                const cm2 = c === "Visos" ? { color: "#1e3a8a", bg: "#eef2ff" } : catMeta(c);
                return (
                  <button key={c} onClick={() => { setCat(c); setSelected(null); }} style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s",
                    background: active ? cm2.bg : "transparent",
                    border: "1px solid " + (active ? cm2.color : "#e2e8f0"),
                    color: active ? cm2.color : "#94a3b8",
                  }}>{c}</button>
                );
              })}
              {cat !== "Visos" && (
                <button onClick={resetCat} style={{
                  padding: "4px 10px", borderRadius: 6, border: "1px solid #e2e8f0",
                  background: "transparent", color: "#94a3b8", fontSize: 11, cursor: "pointer",
                }}>↺ Atstatyti</button>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 52px 70px",
              gap: 14, padding: "8px 20px", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
              {["Reit.", "Scenarijus", "Trend.", ""].map((h, i) => (
                <span key={i} style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8",
                  letterSpacing: 0.8, textTransform: "uppercase",
                  textAlign: i === 3 ? "right" : "left" }}>{h}</span>
              ))}
            </div>

            {filtered.length === 0
              ? <EmptyState onReset={resetCat} />
              : filtered.map((use, i) => (
                  <UseCaseRow key={use.id} use={use} selectedYear={year}
                    onClick={handleClick} isSelected={selected && selected.id === use.id} index={i} />
                ))
            }
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {!selected ? (
              <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12,
                padding: 32, textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                animation: "fadeIn 0.3s ease" }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>👆</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b",
                  fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 8 }}>Pasirinkite scenarijų</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
                  Spauskite ant eilutės kairėje — pamatysite strateginę įžvalgą,
                  reitingus per trejus metus ir verslo implikacijas.
                </div>
              </div>
            ) : (
              <DetailPanel key={selected.id} use={selected} onClose={() => setSelected(null)} activeYear={year} />
            )}

            <div style={{ background: "#fffbeb", border: "1px solid #fde68a",
              borderLeft: "4px solid #f59e0b", borderRadius: 10, padding: "16px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#92400e",
                letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>Metodologiniai apribojimai</div>
              {[
                "2026 m. – tendencijų suvestinė, ne oficialus reitingas su tiksliais rangais.",
                "Naudojimo scenarijus ≠ industrijos ar sektoriaus metrika.",
                "Šaltiniai: HBR, Filtered AI in the Wild ataskaitos, 2024–2025.",
              ].map((w, i) => (
                <div key={i} style={{ fontSize: 12, color: "#78350f",
                  display: "flex", gap: 8, marginBottom: i < 2 ? 7 : 0, lineHeight: 1.6 }}>
                  <span style={{ color: "#d97706", flexShrink: 0 }}>·</span>{w}
                </div>
              ))}
            </div>

            <CtaBlock shift={shift} />
          </div>
        </div>

        <div style={{
          marginTop: 36, padding: "20px 28px",
          background: "#ffffff", border: "1px solid #e2e8f0",
          borderLeft: "4px solid #1e3a8a", borderRadius: 10,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8",
            letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Vienos eilutės išvada</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", lineHeight: 1.6, flexWrap: "wrap", display: "flex", gap: 4, alignItems: "center" }}>
            <span style={{ color: "#1d4ed8" }}>2024: produktyvumas</span>
            <span style={{ color: "#94a3b8", margin: "0 8px", fontWeight: 400 }}>→</span>
            <span style={{ color: "#0369a1" }}>2025: asmeninė struktūra</span>
            <span style={{ color: "#94a3b8", margin: "0 8px", fontWeight: 400 }}>→</span>
            <span style={{ color: "#0f172a", fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif" }}>
              2026: AI kaip kognityvinė operacinė sistema
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
