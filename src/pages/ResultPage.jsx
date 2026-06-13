export default function ResultPage({ result, onRetry, onHome }) {
  const score = result?.score ?? 0;
  const passed = score > 0;

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          background: "#1a2f52",
          border: "1px solid #1e3a5f",
          borderRadius: 18,
          padding: 24,
          marginBottom: 20
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>
          {passed ? "✅" : "❌"}
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            marginBottom: 8,
            color: passed ? "#7EE787" : "#FCA5A5"
          }}
        >
          {passed ? "پاسخ درست بود" : "پاسخ اشتباه بود"}
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "#8B949E",
            lineHeight: 1.8
          }}
        >
          این فقط یک نتیجه نمونه برای MVP است. در نسخه بعدی، تحلیل کامل نقاط ضعف
          و نمره منفی اضافه می‌شود.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={onHome}
          style={{
            flex: 1,
            background: "#1a2f52",
            border: "1px solid #1e3a5f",
            borderRadius: 12,
            padding: "13px 0",
            fontSize: 14,
            fontWeight: 700,
            color: "#8B949E",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          خانه
        </button>

        <button
          onClick={onRetry}
          style={{
            flex: 2,
            background: "#FF9500",
            border: "none",
            borderRadius: 12,
            padding: "13px 0",
            fontSize: 15,
            fontWeight: 800,
            color: "#0A2540",
            cursor: "pointer",
            fontFamily: "inherit"
          }}
        >
          آزمون مجدد ←
        </button>
      </div>
    </div>
  );
}