import { C } from "../constants/colors";
import Logo from "./Logo";

export default function Footer({ t }) {
  return (
    <footer style={{ background: C.purple, borderTop: `3px solid ${C.red}`, padding: "18px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={32} />
          <div>
            <span style={{ color: C.white, fontSize: 13, fontWeight: 700 }}>Orient</span>
            <span style={{ color: C.red, fontSize: 13, fontWeight: 700 }}>AT</span>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>Ала-Тоо · Бишкек · 2026</div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>{t.contacts}</div>
      </div>
    </footer>
  );
}
