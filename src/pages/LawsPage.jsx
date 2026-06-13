import { useState } from "react";
import { LAWS } from "../data/laws";

const CATEGORIES = [
  { id: "all", label: "همه", icon: "📋" },
  { id: "Vorfahrt", label: "حق تقدم", icon: "🚦" },
  { id: "Geschwindigkeit", label: "سرعت", icon: "⚡" },
  { id: "Sicherheit", label: "ایمنی", icon: "🛡️" },
  { id: "Verkehrszeichen", label: "علائم", icon: "🔵" },
  { id: "Alkohol", label: "الکل", icon: "🍺" },
];

const LAW_CATEGORIES = {
  1: "Vorfahrt", 5: "Vorfahrt", 10: "Vorfahrt", 11: "Vorfahrt", 15: "Vorfahrt",
  2: "Geschwindigkeit", 13: "Geschwindigkeit", 17: "Geschwindigkeit", 18: "Geschwindigkeit",
  6: "Sicherheit", 7: "Sicherheit", 8: "Sicherheit", 9: "Sicherheit", 14: "Sicherheit", 16: "Sicherheit", 19: "Sicherheit",
  12: "Verkehrszeichen", 20: "Verkehrszeichen",
  3: "Alkohol", 4: "Alkohol",
};

export default function LawsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = LAWS.filter(law => {
    const matchCat = category === "all" || LAW_CATEGORIES[law.id] === category;
    const matchSearch = !search.trim() ||
      law.title.includes(search) ||
      law.paragraph.includes(search) ||
      law.tip.includes(search) ||
      (law.terms || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "inherit" }}>
      {/* هدر */}
      <div style={{ background: "linear-gradient(135deg,#1a2f52,#0A2540)", border: "1px solid #1e3a5f", borderRadius: 20, padding: 20, marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>📚 قوانین رانندگی آلمان</h2>
        <p style={{ fontSize: 13, color: "#8B949E", margin: 0 }}>توضیح ساده به فارسی · تفاوت با ایران · اصطلاحات آلمانی</p>
      </div>

      {/* جستجو */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#8B949E" }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="جستجو در قوانین..."
          style={{ width: "100%", background: "#112240", border: "1px solid #1e3a5f", borderRadius: 10, padding: "10px 38px 10px 12px", fontSize: 14, color: "#E6EDF3", outline: "none", fontFamily: "inherit", direction: "rtl" }}
        />
        {search && (
          <button onClick={() => setSearch("")}
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: "#8B949E", cursor: "pointer", fontSize: 18 }}>×</button>
        )}
      </div>

      {/* فیلتر موضوعی */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)}
            style={{ flexShrink: 0, background: category === c.id ? "rgba(255,149,0,0.15)" : "#1a2f52", border: `1px solid ${category === c.id ? "#FF9500" : "#1e3a5f"}`, borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: category === c.id ? "#FFB340" : "#8B949E", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* نتیجه */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#8B949E" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
          <div>نتیجه‌ای یافت نشد</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(law => (
            <div key={law.id}
              style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
              {/* هدر کارت */}
              <button onClick={() => setExpanded(expanded === law.id ? null : law.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{law.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: "#0A2540" }}>{law.title}</div>
                    <div style={{ fontSize: 11, color: "#FF9500", marginTop: 2, fontWeight: 700 }}>{law.law}</div>
                  </div>
                </div>
                <span style={{ color: "#8B949E", fontSize: 18, flexShrink: 0 }}>{expanded === law.id ? "▲" : "▼"}</span>
              </button>

              {/* توضیح اصلی — همیشه نمایش */}
              <div style={{ padding: "0 16px 14px", borderTop: "1px solid #F0F4F8" }}>
                <p style={{ fontSize: 14, color: "#1a2f52", lineHeight: 1.8, margin: "10px 0 0" }}>{law.paragraph}</p>
              </div>

              {/* جزئیات — فقط وقتی باز است */}
              {expanded === law.id && (
                <div style={{ padding: "0 16px 16px" }}>
                  {/* تفاوت با ایران */}
                  <div style={{ background: "#FFF8F0", border: "1px solid #FFE5C2", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#FF9500", marginBottom: 5 }}>🇮🇷 تفاوت با ایران</div>
                    <p style={{ fontSize: 13, color: "#6B4C2A", lineHeight: 1.7, margin: 0 }}>{law.difference}</p>
                  </div>

                  {/* اصطلاحات */}
                  {law.terms && law.terms.length > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#1a2f52", marginBottom: 6 }}>🇩🇪 اصطلاحات آلمانی</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {law.terms.map(t => (
                          <span key={t} style={{ background: "#EEF2FF", color: "#4338CA", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* نکته */}
                  <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A", marginBottom: 4 }}>💡 نکته کلیدی</div>
                    <p style={{ fontSize: 13, color: "#166534", lineHeight: 1.7, margin: 0 }}>{law.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}
