import { C } from "../constants/colors";
import { fmtFee } from "../utils/helpers";
import { PROGRAMS } from "../constants/data";

export default function FacultyScreen({ lang, t, faculties, detailFaculty, setScreen }) {
  const f = faculties.find(x => x.id === detailFaculty);
  const progs = Object.entries(PROGRAMS).filter(([, p]) => p.faculty === detailFaculty);

  if (!f) return null;

  return (
    <div style={{ maxWidth: 740, margin: "0 auto" }}>
      <button onClick={() => setScreen("home")}
        style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 13, marginBottom: 16, fontWeight: 600 }}>
        {t.back}
      </button>

      {/* Faculty header */}
      <div style={{ background: f.color, border: `1px solid ${C.border}`, borderRadius: 12, padding: "22px 24px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
            {f.emoji}
          </div>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 20, margin: 0, color: C.white }}>{f.name}</h2>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>AIU · {t.contractOnly} · {t.ortFrom} {f.ort}</div>
          </div>
        </div>
        {f.ortExtra && (
          <div style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.4)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#fcd34d", fontWeight: 600 }}>
            📋 {f.ortExtra}
          </div>
        )}
      </div>

      <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600, marginBottom: 10 }}>{t.programsLabel} ({progs.length})</div>

      {/* Programs list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {progs.map(([key, p], idx) => (
          <div key={key}
            style={{ background: C.purple, border: `1px solid ${C.border}`, borderLeft: `3px solid ${idx % 2 === 0 ? C.red : C.purple}`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#3a3468"}
            onMouseLeave={e => e.currentTarget.style.background = C.purple}>
            <span style={{ fontSize: 22, marginTop: 2, flexShrink: 0 }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.white, marginBottom: 4 }}>{p[lang].name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 6 }}>{p[lang].desc}</div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: 4 }}>🌐 {p.lang}</span>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, minWidth: 110 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.red }}>{fmtFee(p.kr)}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{t.krFee} {t.perYear}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 6, fontWeight: 600 }}>{fmtFee(p.int)}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{t.intFee}</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setScreen("chat")}
        style={{ marginTop: 16, width: "100%", padding: "13px", borderRadius: 10, border: "none", background: C.red, color: C.white, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
        {t.askAboutFaculty}
      </button>
    </div>
  );
}
