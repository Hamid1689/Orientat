import { C } from "../constants/colors";
import { fmtFee, minFee } from "../utils/helpers";

export default function ResultScreen({ t, results, resetQuiz, setScreen }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 42, marginBottom: 8 }}>🎯</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 5, color: C.textDark }}>{t.yourResult}</h2>
        <p style={{ color: C.textMuted, fontSize: 13 }}>{t.resultSub}</p>
      </div>

      {results.map((f, i) => {
        const lo = minFee(f.id);
        return (
          <div key={f.id}
            onClick={() => setScreen("faculty:" + f.id)}
            style={{ background: C.cardBg, border: `1.5px solid ${i === 0 ? f.color : C.border}`, borderLeft: `4px solid ${f.color}`, borderRadius: 10, padding: "16px 18px", marginBottom: 10, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
            onMouseLeave={e => e.currentTarget.style.background = C.cardBg}>
            {i === 0 && (
              <span style={{ display: "inline-block", fontSize: 10, padding: "2px 9px", borderRadius: 4, background: C.red, color: C.white, fontWeight: 700, marginBottom: 8, letterSpacing: .5 }}>
                {t.bestChoice}
              </span>
            )}
            <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
              <span style={{ fontSize: 28 }}>{f.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.textDark }}>{f.name}</div>
                <div style={{ fontSize: 11, color: C.textMid, marginTop: 3 }}>{f.desc}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: f.color }}>от {fmtFee(lo)}</div>
                <div style={{ fontSize: 9, color: C.textMuted }}>{t.krFee}</div>
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button onClick={resetQuiz}
          style={{ padding: "11px 20px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: "transparent", color: C.textDark, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          {t.tryAgain}
        </button>
        <button onClick={() => setScreen("chat")}
          style={{ padding: "11px 20px", borderRadius: 8, border: "none", background: C.red, color: C.white, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          {t.askBot}
        </button>
      </div>
    </div>
  );
}
