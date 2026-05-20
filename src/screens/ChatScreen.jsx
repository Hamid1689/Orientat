import { useRef, useEffect } from "react";
import { C } from "../constants/colors";

export default function ChatScreen({ t, msgs, input, setInput, loading, sendMsg }) {
  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 480 }}>
      {/* Chat header */}
      <div style={{ background: C.purple, borderRadius: "10px 10px 0 0", padding: "16px 18px", border: `1px solid ${C.border}`, borderBottom: "none" }}>
        <h2 style={{ fontWeight: 800, fontSize: 17, margin: 0, color: C.white }}>{t.chatTitle}</h2>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", margin: "3px 0 0" }}>{t.chatSub}</p>
      </div>

      {/* Quick questions */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderTop: "none", borderBottom: "none", padding: "10px 14px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {t.quickQ.map(q => (
          <button key={q} onClick={() => setInput(q)}
            style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer", border: `1px solid ${C.border}`, background: C.cardBg, color: C.purple, transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = C.purple; e.currentTarget.style.color = C.white; e.currentTarget.style.borderColor = C.purple; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.cardBg; e.currentTarget.style.color = C.purple; e.currentTarget.style.borderColor = C.border; }}>
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px", background: C.cardBg, border: `1px solid ${C.border}`, borderTop: "none", borderBottom: "none" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8 }}>
            {m.role === "assistant" && (
              <div style={{ width: 30, height: 30, background: C.purple, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, marginTop: 2 }}>🎓</div>
            )}
            <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: m.role === "user" ? "10px 10px 3px 10px" : "10px 10px 10px 3px", background: m.role === "user" ? C.red : C.purpleLight, color: m.role === "user" ? C.white : C.textDark, fontSize: 13, lineHeight: 1.6, border: m.role === "assistant" ? `1px solid ${C.border}` : "none" }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 30, height: 30, background: C.purple, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎓</div>
            <div style={{ padding: "10px 14px", borderRadius: "10px 10px 10px 3px", background: C.purpleLight, border: `1px solid ${C.border}`, fontSize: 13, color: C.textMuted }}>
              {t.thinking}
            </div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>

      {/* Input row */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMsg()}
          placeholder={t.inputPlaceholder}
          style={{ flex: 1, padding: "11px 14px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.cardBg, color: C.textDark, fontSize: 13, outline: "none" }}
        />
        <button onClick={sendMsg} disabled={loading}
          style={{ padding: "11px 20px", borderRadius: 8, border: "none", background: loading ? C.purpleLight : C.red, color: C.white, fontWeight: 700, fontSize: 13, cursor: loading ? "not-allowed" : "pointer", minWidth: 80, opacity: loading ? 0.6 : 1 }}>
          {loading ? t.sending : t.send}
        </button>
      </div>

      <div style={{ textAlign: "center", fontSize: 10, color: C.textMuted, marginTop: 8 }}>{t.contacts}</div>
    </div>
  );
}
