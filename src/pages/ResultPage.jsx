export default function ResultPage({ result, onRetry, onHome }) {
  const answersList = result?.answersList || [];
  const isExamMode = result?.isExamMode ?? false;

  const total = answersList.length;
  const correct = answersList.filter((a) => a.correct).length;
  const wrong = total - correct;

  const fehlerpunkte = answersList.reduce(
    (acc, a) => acc + (a.fehlerpunkte || 0),
    0
  );

  const fiveWrong = answersList.filter(
    (a) => !a.correct && Number(a.question?.points) === 5
  ).length;

  const failedByFivePointRule = fiveWrong >= 2;

  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  const passed = isExamMode
    ? fehlerpunkte <= 10 && !failedByFivePointRule
    : percent >= 70;

  const wrongAnswers = answersList.filter((a) => !a.correct);
  const markedAnswers = answersList.filter((a) => a.marked);

  return (
    <div>
      <div style={summaryCard}>
        <div style={statusIcon}>{passed ? "✅" : "❌"}</div>

        <h2
          style={{
            ...statusTitle,
            color: passed ? "#168A3A" : "#DC2626"
          }}
        >
          {passed ? "Bestanden" : "Nicht bestanden"}
        </h2>

        <div style={subTitle}>
          {passed ? "قبول شدی" : "نیاز به تمرین بیشتر داری"}
        </div>

        {isExamMode ? (
          <div style={scoreBox}>
            <div style={scoreNumber}>{fehlerpunkte}</div>
            <div style={scoreLabel}>Fehlerpunkte</div>
            <div style={limitText}>Grenze: maximal 10 Fehlerpunkte</div>
          </div>
        ) : (
          <div style={scoreBox}>
            <div style={scoreNumber}>{percent}%</div>
            <div style={scoreLabel}>Lernmodus Ergebnis</div>
            <div style={limitText}>حد پیشنهادی تمرین: حداقل ۷۰٪</div>
          </div>
        )}

        {failedByFivePointRule && (
          <div style={dangerBox}>
            Nicht bestanden wegen mehrerer Fehlerfragen mit 5 Punkten.
            <br />
            به دلیل دو یا چند سؤال ۵ امتیازی اشتباه، مردود محسوب می‌شوی.
          </div>
        )}

        <div style={miniStats}>
          <div style={miniStat}>
            <strong>{total}</strong>
            <span>Fragen</span>
          </div>

          <div style={miniStat}>
            <strong>{correct}</strong>
            <span>Richtig</span>
          </div>

          <div style={miniStat}>
            <strong>{wrong}</strong>
            <span>Falsch</span>
          </div>

          <div style={miniStat}>
            <strong>{fiveWrong}</strong>
            <span>5-Punkte Fehler</span>
          </div>
        </div>
      </div>

      <div style={infoCard}>
        <h3 style={sectionHeading}>Prüfungsbewertung</h3>

        <div style={ruleLine}>
          <span>Maximal erlaubte Fehlerpunkte</span>
          <strong>10</strong>
        </div>

        <div style={ruleLine}>
          <span>Deine Fehlerpunkte</span>
          <strong style={{ color: passed ? "#168A3A" : "#DC2626" }}>
            {fehlerpunkte}
          </strong>
        </div>

        <div style={ruleLine}>
          <span>Falsche 5-Punkte-Fragen</span>
          <strong>{fiveWrong}</strong>
        </div>
      </div>

      {markedAnswers.length > 0 && (
        <div style={listCard}>
          <h3 style={sectionHeading}>🚩 Markierte Fragen</h3>

          {markedAnswers.map((a, index) => (
            <QuestionReview key={`marked-${index}`} item={a} index={index} />
          ))}
        </div>
      )}

      {wrongAnswers.length > 0 && (
        <div style={listCard}>
          <h3 style={{ ...sectionHeading, color: "#DC2626" }}>
            Falsche Fragen
          </h3>

          {wrongAnswers.map((a, index) => (
            <QuestionReview key={`wrong-${index}`} item={a} index={index} />
          ))}
        </div>
      )}

      <div style={buttonRow}>
        <button onClick={onHome} style={secondaryBtn}>
  خانه
       </button>

       <button onClick={onRetry} style={primaryBtn}>
  آزمون مجدد
      </button>
      </div>
    </div>
  );
}

function QuestionReview({ item, index }) {
  const q = item.question || {};
  const questionText = q.q_de || q.q || "Frage";
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const correctAnswers = Array.isArray(q.ok) ? q.ok : [q.ok];

  return (
    <details style={reviewItem}>
      <summary style={reviewSummary}>
        <span>{index + 1}. {questionText}</span>
        <span style={pointsBadge}>{q.points || 2} Punkte</span>
      </summary>

      {questionFa && <div style={translationText}>{questionFa}</div>}

      <div style={answersBox}>
        {options.map((option, i) => {
          const userSelected = item.chosenAnswers?.includes(i);
          const isCorrect = correctAnswers.includes(i);

          return (
            <div
              key={i}
              style={{
                ...answerLine,
                borderColor: isCorrect
                  ? "#168A3A"
                  : userSelected
                  ? "#DC2626"
                  : "#D7EADB",
                background: isCorrect
                  ? "#E8F6E8"
                  : userSelected
                  ? "#FEF2F2"
                  : "#FFFFFF"
              }}
            >
              <span style={checkMark}>
                {isCorrect ? "✓" : userSelected ? "✕" : ""}
              </span>

              <div>
                <div style={{ color: "#111827", fontWeight: 800 }}>
                  {option}
                </div>

                {optionsFa[i] && (
                  <div style={optionFa}>{optionsFa[i]}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {(q.exp_fa || q.exp || q.tip_fa || q.tip) && (
        <div style={explanationBox}>
          {q.exp_fa || q.exp}
          {(q.tip_fa || q.tip) && (
            <div style={{ marginTop: 8 }}>
              💡 {q.tip_fa || q.tip}
            </div>
          )}
        </div>
      )}
    </details>
  );
}

const summaryCard = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 22,
  padding: 26,
  marginBottom: 18,
  textAlign: "center",
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

const statusIcon = {
  fontSize: 56,
  marginBottom: 8
};

const statusTitle = {
  fontSize: 28,
  fontWeight: 950,
  margin: 0
};

const subTitle = {
  color: "#64736A",
  marginTop: 6,
  fontSize: 13,
  fontWeight: 800
};

const scoreBox = {
  marginTop: 20,
  background: "#F4FBF4",
  border: "1px solid #D7EADB",
  borderRadius: 18,
  padding: 18
};

const scoreNumber = {
  fontSize: 52,
  fontWeight: 950,
  color: "#168A3A",
  lineHeight: 1
};

const scoreLabel = {
  marginTop: 6,
  color: "#111827",
  fontWeight: 900
};

const limitText = {
  marginTop: 4,
  color: "#64736A",
  fontSize: 12
};

const dangerBox = {
  marginTop: 14,
  background: "#FEF2F2",
  border: "1px solid #FCA5A5",
  color: "#991B1B",
  borderRadius: 12,
  padding: 12,
  fontSize: 12,
  lineHeight: 1.8
};

const miniStats = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 8,
  marginTop: 16
};

const miniStat = {
  background: "#FFFFFF",
  border: "1px solid #D7EADB",
  borderRadius: 12,
  padding: "10px 4px",
  display: "flex",
  flexDirection: "column",
  gap: 3,
  color: "#64736A",
  fontSize: 10
};

const infoCard = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 18,
  padding: 16,
  marginBottom: 18
};

const sectionHeading = {
  margin: "0 0 12px",
  color: "#168A3A",
  fontSize: 15,
  fontWeight: 950
};

const ruleLine = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #E5F2E7",
  padding: "10px 0",
  color: "#374151",
  fontSize: 13
};

const listCard = {
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  borderRadius: 18,
  padding: 16,
  marginBottom: 18
};

const reviewItem = {
  border: "1px solid #D7EADB",
  borderRadius: 14,
  marginBottom: 10,
  overflow: "hidden",
  background: "#FFFFFF"
};

const reviewSummary = {
  cursor: "pointer",
  padding: 14,
  color: "#111827",
  fontWeight: 900,
  fontSize: 13,
  lineHeight: 1.7,
  display: "flex",
  justifyContent: "space-between",
  gap: 10
};

const pointsBadge = {
  flexShrink: 0,
  background: "#E8F6E8",
  border: "1px solid #BBD7C0",
  color: "#168A3A",
  borderRadius: 8,
  padding: "3px 8px",
  fontSize: 11,
  fontWeight: 900
};

const translationText = {
  margin: "0 14px 12px",
  padding: 12,
  background: "#F4FBF4",
  border: "1px solid #D7EADB",
  borderRadius: 10,
  color: "#64736A",
  lineHeight: 1.8,
  fontSize: 12
};

const answersBox = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "0 14px 14px"
};

const answerLine = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  border: "1px solid",
  borderRadius: 12,
  padding: 10
};

const checkMark = {
  width: 24,
  height: 24,
  borderRadius: 6,
  background: "#FFFFFF",
  border: "1px solid #BBD7C0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 950,
  color: "#168A3A",
  flexShrink: 0
};

const optionFa = {
  marginTop: 4,
  color: "#64736A",
  fontSize: 12,
  lineHeight: 1.6
};

const explanationBox = {
  margin: "0 14px 14px",
  background: "#FFF7ED",
  border: "1px solid #FDBA74",
  borderRadius: 12,
  padding: 12,
  color: "#9A3412",
  fontSize: 12,
  lineHeight: 1.8
};

const buttonRow = {
  display: "flex",
  gap: 12,
  marginBottom: 20
};

const secondaryBtn = {
  flex: 1,
  background: "#FFFFFF",
  border: "2px solid #BBD7C0",
  borderRadius: 14,
  padding: "14px 0",
  color: "#168A3A",
  fontWeight: 900,
  cursor: "pointer",
  fontFamily: "inherit"
};

const primaryBtn = {
  flex: 2,
  background: "#168A3A",
  border: "none",
  borderRadius: 14,
  padding: "14px 0",
  color: "#FFFFFF",
  fontWeight: 950,
  cursor: "pointer",
  fontFamily: "inherit"
};