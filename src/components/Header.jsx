export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#0A2540",
        borderBottom: "1px solid #1e3a5f",
        padding: "12px 16px"
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: "#FF9500",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20
            }}
          >
            🚗
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>
              همراه گواهینامه
            </div>
            <div style={{ fontSize: 11, color: "#8B949E", marginTop: 2 }}>
              راهنمای فارسی‌زبانان آلمان
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,149,0,0.12)",
            border: "1px solid rgba(255,149,0,0.25)",
            borderRadius: 20,
            padding: "5px 12px",
            fontSize: 12,
            fontWeight: 700,
            color: "#FFB340"
          }}
        >
          MVP
        </div>
      </div>
    </header>
  );
}