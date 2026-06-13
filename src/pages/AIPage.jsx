export default function AIPage({ onBack }) {
  return (
    <div>
      <div
        style={{
          background: "#1a2f52",
          border: "1px solid #1e3a5f",
          borderRadius: 18,
          padding: 20,
          marginBottom: 16
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(251,191,36,0.15)",
            border: "1px solid rgba(251,191,36,0.3)",
            color: "#FCD34D",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
            marginBottom: 12
          }}
        >
          Demo Mode
        </div>

        <h2
          style={{
            fontSize: 20,
            fontWeight: 900,
            marginBottom: 8
          }}
        >
          🤖 دستیار آموزشی گواهینامه
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "#8B949E",
            lineHeight: 1.8
          }}
        >
          در این نسخه، پاسخ‌های دستیار از نمونه‌های آماده تولید می‌شوند. تحلیل
          واقعی تصویر و اتصال به هوش مصنوعی در نسخه بعدی اضافه خواهد شد.
        </p>
      </div>

      <div
        style={{
          background: "#112240",
          border: "1px solid #1e3a5f",
          borderRadius: 14,
          padding: 16,
          marginBottom: 12,
          fontSize: 13,
          lineHeight: 1.8
        }}
      >
        <strong>نمونه سؤال:</strong>
        <br />
        Rechts vor Links یعنی چه؟
        <br />
        <br />
        یعنی در تقاطع بدون تابلو، خودرویی که از سمت راست می‌آید حق تقدم دارد.
        این یکی از تفاوت‌های مهم رانندگی در آلمان برای فارسی‌زبانان است.
      </div>

      <button
        onClick={onBack}
        style={{
          width: "100%",
          background: "#FF9500",
          border: "none",
          borderRadius: 12,
          padding: "14px 0",
          fontSize: 15,
          fontWeight: 800,
          color: "#0A2540",
          cursor: "pointer",
          fontFamily: "inherit"
        }}
      >
        بازگشت به خانه
      </button>
    </div>
  );
}