import { C } from "../constants/colors";
import Logo from "./Logo";

export default function Header({ lang, t, screen, switchLang, setScreen, resetQuiz }) {
  return (
    <header style={{ background: C.purple, borderBottom: `3px solid ${C.red}`, padding: "14px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setScreen("home")}>
          <Logo size={42} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span style={{ fontWeight: 900, fontSize: 20, color: C.white, letterSpacing: .3 }}>Orient</span>
              <span style={{ fontWeight: 900, fontSize: 20, color: C.red, letterSpacing: .3 }}>AT</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: .6, marginTop: 1 }}>{t.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: 3, border: "1px solid rgba(255,255,255,0.2)", marginRight: 6 }}>
            {[["kg", "КЫР"], ["ru", "РУС"], ["en", "ENG"]].map(([l, lb]) => (
              <button key={l} onClick={() => switchLang(l)}
                style={{ padding: "5px 12px", borderRadius: 4, border: "none", background: lang === l ? C.red : "transparent", color: C.white, fontSize: 11, fontWeight: lang === l ? 700 : 400, cursor: "pointer", transition: "background 0.15s" }}>
                {lb}
              </button>
            ))}
          </div>

          {[["home", 0], ["quiz", 1], ["chat", 2]].map(([s, i]) => (
            <button key={s} onClick={() => s === "quiz" ? resetQuiz() : setScreen(s)}
              style={{ padding: "8px 18px", border: "none", background: screen === s ? C.red : "transparent", color: C.white, fontSize: 13, cursor: "pointer", fontWeight: screen === s ? 700 : 400, borderRadius: 6, transition: "background 0.15s" }}>
              {t.nav[i]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
