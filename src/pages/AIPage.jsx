export default function AIPage({ onBack }) {
  return (
    <div style={{ fontFamily: "'Vazirmatn',sans-serif", direction: "rtl" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={onBack}
          style={{ background: "transparent", border: "1px solid #1e3a5f", borderRadius: 8, padding: "6px 12px", color: "#8B949E", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
          ← برگشت
        </button>
        <div style={{ fontWeight: 900, fontSize: 16 }}>🤖 FahrKI Assistant</div>
      </div>
      <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 12, padding: "12px 14px", fontSize: 13, color: "#FCD34D", lineHeight: 1.7 }}>
        🚧 <strong>Beta</strong> — دستیار هوشمند در نسخه بعدی فعال خواهد شد.
      </div>
    </div>
  );
}
