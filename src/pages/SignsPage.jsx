export default function SignsPage({ onBack }) {
  const cardStyle = {
    background: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer"
  };

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          border: "none",
          background: "transparent",
          fontSize: 16,
          marginBottom: 20,
          cursor: "pointer"
        }}
      >
        ← بازگشت
      </button>

      <h2>تابلوهای رانندگی</h2>

      <div style={cardStyle}>
        <h3>⚠️ تابلوهای هشدار</h3>
        <p>Gefahrzeichen</p>
      </div>

      <div style={cardStyle}>
        <h3>⛔ تابلوهای ممنوعیت</h3>
        <p>Verbotszeichen</p>
      </div>

      <div style={cardStyle}>
        <h3>🔵 تابلوهای دستوری</h3>
        <p>Vorschriftzeichen</p>
      </div>

      <div style={cardStyle}>
        <h3>🛣️ تابلوهای راهنما</h3>
        <p>Richtzeichen</p>
      </div>
    </div>
  );
}