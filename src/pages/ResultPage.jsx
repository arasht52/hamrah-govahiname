export default function ResultPage({ result, onRetry, onHome }) {
  const answersList = result?.answersList || [];
  const isExamMode  = result?.isExamMode ?? false;
  const total        = answersList.length;
  const correct      = answersList.filter(a => a.correct).length;
  const fehlerpunkte = answersList.reduce((acc, a) => acc + (a.fehlerpunkte || 0), 0);
  const fiveWrong    = answersList.filter(a => !a.correct && a.question?.points === 5).length;
  const passed       = isExamMode
    ? fehlerpunkte <= 10 && fiveWrong < 2
    : total > 0 && Math.round((correct / total) * 100) >= 70;

  return (
    <div>
      <div style={{ textAlign: "center", background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 20, padding: 28, marginBottom: 20 }}>
        <div style={{ fontSize: 60, marginBottom: 10 }}>{passed ? "🎉" : "😕"}</div>
        <h2 style={{ color: passed ? "#7EE787" : "#FCA5A5", fontSize: 24, fontWeight: 900, margin: 0 }}>
          {passed ? "Bestanden! قبول شدی" : "Nicht bestanden — دوباره تلاش کن"}
        </h2>
        {isExamMode ? (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: fehlerpunkte <= 10 ? "#7EE787" : "#EF4444" }}>{fehlerpunkte}</div>
            <div style={{ color: "#8B949E", fontSize: 14, marginTop: 4 }}>Fehlerpunkte (حداکثر مجاز: ۱۰)</div>
            {fiveWrong >= 2 && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #EF4444", borderRadius: 8, padding: "8px 12px", marginTop: 12, fontSize: 12, color: "#FCA5A5" }}>
                ⚠️ {fiveWrong} سوال ۵ امتیازی غلط — مردود خودکار
              </div>
            )}
            <div style={{ color: "#8B949E", fontSize: 13, marginTop: 8 }}>{correct} صحیح · {total - correct} غلط از {total} سوال</div>
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 54, fontWeight: 900, color: "#FFB340" }}>{total > 0 ? Math.round((correct / total) * 100) : 0}%</div>
            <div style={{ color: "#8B949E", fontSize: 14, marginTop: 6 }}>{correct} پاسخ صحیح از {total} سوال</div>
          </div>
        )}
      </div>

      {answersList.filter(a => !a.correct).length > 0 && (
        <div style={{ background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: "#FCA5A5" }}>❌ سوالات غلط</div>
          {answersList.filter(a => !a.correct).map((a, i) => (
            <div key={i} style={{ borderBottom: "1px solid #1e3a5f", paddingBottom: 12, marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: "#E6EDF3", marginBottom: 6, direction: "ltr", textAlign: "left" }}>
                {a.question.q_de || a.question.q}
              </p>
              {a.question.exp_fa && (
                <p style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.7, margin: 0 }}>{a.question.exp_fa}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onHome}
          style={{ flex: 1, background: "#1a2f52", border: "1px solid #1e3a5f", borderRadius: 12, padding: "14px 0", color: "#8B949E", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          خانه
        </button>
        <button onClick={onRetry}
          style={{ flex: 2, background: "#FF9500", border: "none", borderRadius: 12, padding: "14px 0", color: "#0A2540", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
          دوباره ←
        </button>
      </div>
    </div>
  );
}
