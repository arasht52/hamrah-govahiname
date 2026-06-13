export default function ResultPage({ result, onRetry, onHome }) {
  const score = result?.score ?? 0;
  const total = result?.total ?? 10;

  const percent = Math.round((score / total) * 100);
  const passed = percent >= 70;

  return (
    <div>
      {/* نتیجه اصلی */}
      <div
        style={{
          textAlign: "center",
          background: "#1a2f52",
          border: "1px solid #1e3a5f",
          borderRadius: 20,
          padding: 28,
          marginBottom: 20
        }}
      >
        <div style={{ fontSize: 60 }}>
          {passed ? "🎉" : "😕"}
        </div>

        <h2
          style={{
            color: passed ? "#7EE787" : "#FCA5A5",
            fontSize: 24,
            fontWeight: 900
          }}
        >
          {passed ? "قبول شدی!" : "نیاز به تمرین بیشتر"}
        </h2>

        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFB340",
            marginTop: 16
          }}
        >
          {percent}%
        </div>

        <div
          style={{
            color: "#8B949E",
            marginTop: 10,
            fontSize: 14
          }}
        >
          {score} پاسخ صحیح از {total} سوال
        </div>
      </div>

      {/* کارت اطلاعات */}
      <div
        style={{
          background: "#1a2f52",
          border: "1px solid #1e3a5f",
          borderRadius: 16,
          padding: 20,
          marginBottom: 20
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            marginBottom: 12
          }}
        >
          امکانات نسخه کامل
        </div>

        <div
          style={{
            color: "#8B949E",
            lineHeight: 2
          }}
        >
          ✅ بانک سوالات کامل
          <br />
          ✅ سوالات تصویری
          <br />
          ✅ تحلیل نقاط ضعف
          <br />
          ✅ توضیح فارسی
          <br />
          ✅ نکات فرهنگی ایران و آلمان
          <br />
          ✅ دستیار هوشمند
          <br />
          ✅ معرفی آموزشگاه‌های همکار
        </div>
      </div>

      {/* دکمه‌ها */}
      <div
        style={{
          display: "flex",
          gap: 12
        }}
      >
        <button
          onClick={onHome}
          style={{
            flex: 1,
            background: "#1a2f52",
            border: "1px solid #1e3a5f",
            borderRadius: 12,
            padding: "14px 0",
            color: "#8B949E",
            fontWeight: 700,
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
            padding: "14px 0",
            color: "#0A2540",
            fontWeight: 800,
            fontFamily: "inherit"
          }}
        >
          آزمون مجدد ←
        </button>
      </div>
    </div>
  );
}