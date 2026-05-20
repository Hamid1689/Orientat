import { C } from "../constants/colors";
import { fmtFee, minFee } from "../utils/helpers";

export default function HomeScreen({ lang, t, faculties, resetQuiz, setScreen }) {
  const stats = [
    ["5",    { ru: "Факультетов",    kg: "Факультет",          en: "Faculties"    }],
    ["25+",  { ru: "Программ",       kg: "Программа",          en: "Programs"     }],
    ["110",  { ru: "Мин. ОРТ",       kg: "ОРТ мин.",           en: "Min. ORT"     }],
    ["100%", { ru: "Макс. скидка",   kg: "Макс. арзандатуу",   en: "Max discount" }],
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: C.purple, borderRadius: 12, padding: "44px 36px", marginBottom: 20, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, background: C.red, borderRadius: "12px 0 0 12px" }} />
        <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 4, fontSize: 12, background: C.red, color: C.white, marginBottom: 16, fontWeight: 700, letterSpacing: .5 }}>
          {t.intake}
        </span>
        <h1 style={{ fontSize: "clamp(26px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 12px", letterSpacing: -1.5, color: C.white }}>
          {t.heroTitle[0]}<br />
          <span style={{ color: C.red }}>{t.heroTitle[1]}</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, maxWidth: 500, margin: "0 0 28px", lineHeight: 1.7 }}>{t.heroSub}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={resetQuiz} style={{ padding: "13px 30px", borderRadius: 8, border: "none", background: C.red, color: C.white, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            {t.startQuiz}
          </button>
          <button onClick={() => setScreen("chat")} style={{ padding: "13px 30px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.35)", background: "transparent", color: C.white, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
            {t.openChat}
          </button>
        </div>
        <div style={{ display: "flex", gap: 0, marginTop: 34, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.15)", flexWrap: "wrap" }}>
          {stats.map(([n, labels]) => (
            <div key={n} style={{ flex: "1 1 110px", paddingRight: 20, marginRight: 20, borderRight: "1px solid rgba(255,255,255,0.15)", marginBottom: 8 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.red }}>{n}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{labels[lang]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div style={{ background: "#fffbeb", border: "1px solid #f59e0b", borderLeft: "4px solid #f59e0b", borderRadius: 8, padding: "12px 16px", marginBottom: 22, fontSize: 13, color: "#78350f", lineHeight: 1.7 }}>
        {t.notice}
      </div>

      {/* Faculties grid */}
      <h2 style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: C.textDark, borderBottom: `2px solid ${C.purple}`, paddingBottom: 8 }}>
        {t.facultiesTitle}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
        {faculties.map(f => {
          const lo = minFee(f.id);
          return (
            <div key={f.id}
              onClick={() => setScreen("faculty:" + f.id)}
              style={{ background: C.purple, border: `1px solid ${C.border}`, borderTop: `4px solid ${f.color}`, borderRadius: 12, padding: "20px 22px", cursor: "pointer", transition: "all 0.15s", display: "flex", flexDirection: "column", minHeight: 220 }}
              onMouseEnter={e => { e.currentTarget.style.background = "#3a3468"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,39,82,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.purple; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, background: f.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {f.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: C.white, lineHeight: 1.2 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 500, marginTop: 3 }}>{t.ortFrom} {f.ort} · {t.contractOnly}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.80)", fontWeight: 400, margin: "0 0 10px", lineHeight: 1.6, flex: 1 }}>{f.desc}</p>
              {f.ortExtra && (
                <div style={{ fontSize: 11, fontWeight: 600, color: "#fcd34d", background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 6, padding: "6px 10px", marginBottom: 12 }}>
                  📋 {f.ortExtra}
                </div>
              )}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: .7 }}>{t.krFee} {t.perYear}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: f.color, marginTop: 4 }}>от {fmtFee(lo)}</div>
                </div>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
