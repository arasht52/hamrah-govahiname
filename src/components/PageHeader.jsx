export default function PageHeader({ title, onBack }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={onBack}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: 16,
          marginBottom: 12,
          fontFamily: "inherit",
          color: "#166534",
          fontWeight: 800
        }}
      >
        ← بازگشت
      </button>

      <h2 style={{ margin: 0 }}>{title}</h2>
    </div>
  );
}