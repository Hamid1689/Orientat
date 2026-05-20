import { C } from "../constants/colors";

export default function QuizScreen({ t, quiz, step, selected, pickAnswer, setScreen }) {
  const letters = ["A", "B", "C", "D"];

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600 }}>{t.question} {step + 1} {t.of} {quiz.length}</span>
          <button onClick={() => setScreen("home")}
            style={{ fontSize: 11, color: C.textDark, background: "none", border: `1px solid ${C.border}`, cursor: "pointer", padding: "3px 10px", borderRadius: 4 }}>
            {t.exit}
          </button>
        </div>
        <div style={{ height: 4, background: C.purpleLight, borderRadius: 99 }}>
          <div style={{ height: "100%", borderRadius: 99, background: C.red, width: `${(step / quiz.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px", boxShadow: "0 2px 12px rgba(45,39,82,0.08)" }}>
        <h2 style={{ fontSize: "clamp(17px,4vw,22px)", fontWeight: 800, marginBottom: 22, lineHeight: 1.3, color: C.textDark }}>
          {quiz[step].q}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {quiz[step].opts.map((opt, i) => (
            <button key={i} onClick={() => pickAnswer(opt.t)}
              style={{ padding: "14px 18px", borderRadius: 8, textAlign: "left", border: `1.5px solid ${selected === opt.t ? C.red : C.border}`, background: selected === opt.t ? "rgba(213,13,31,0.06)" : C.cardBg, color: selected === opt.t ? C.red : C.textDark, fontSize: 14, fontWeight: selected === opt.t ? 700 : 400, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: selected === opt.t ? C.red : C.purpleLight, color: selected === opt.t ? C.white : C.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {letters[i]}
              </span>
              {opt.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
