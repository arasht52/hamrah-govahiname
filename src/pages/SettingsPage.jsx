export default function SettingsPage({ onBack }) {
  const handleClearStats = () => {
    const ok = window.confirm("آیا مطمئن هستید که می‌خواهید آمار پاک شود؟");
    if (!ok) return;

    localStorage.removeItem("driving_app_attempts");
    alert("آمار پاک شد.");
  };

  return (
    <div style={{ padding: 20, direction: "rtl" }}>
      <button onClick={onBack}>بازگشت</button>

      <h1>⚙️ تنظیمات</h1>

      <div
        style={{
          background: "#fff",
          border: "1px solid #dfeee6",
          borderRadius: 16,
          padding: 16,
          marginTop: 16,
        }}
      >
        <p>نسخه برنامه: 1.0.0</p>

        <button
          onClick={handleClearStats}
          style={{
            marginTop: 16,
            background: "#d93025",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "12px 16px",
            cursor: "pointer",
          }}
        >
          پاک کردن آمار
        </button>
      </div>
    </div>
  );
}