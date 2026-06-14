export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#ffffff",
        borderBottom: "1px solid #BBD7C0",
        padding: "12px 16px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
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
              background: "#168A3A",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#fff"
            }}
          >
            🚗
          </div>

          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 16,
                color: "#111827",
                lineHeight: 1
              }}
            >
              همراه گواهینامه
            </div>

            <div
              style={{
                fontSize: 11,
                color: "#64736A",
                marginTop: 4
              }}
            >
              شبیه‌ساز فارسی آزمون رانندگی آلمان
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#E8F6E8",
            border: "1px solid #BBD7C0",
            color: "#168A3A",
            borderRadius: 20,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 900
          }}
        >
          TÜV Demo
        </div>
      </div>
    </header>
  );
}