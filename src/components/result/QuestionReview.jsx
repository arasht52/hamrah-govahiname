import { COLORS } from "../../theme/colors";

export default function QuestionReview({ item, index }) {
  const q = item.question || {};
  const questionText = q.q_de || q.q || "Frage";
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const correctAnswers = Array.isArray(q.ok)
    ? q.ok
    : q.ok !== undefined
    ? [q.ok]
    : [];

  return (
    <details style={reviewItem}>
      <summary style={reviewSummary}>
        <span>
          {index + 1}. {questionText}
        </span>

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
                  ? COLORS.green
                  : userSelected
                  ? COLORS.danger
                  : COLORS.borderSoft,
                background: isCorrect
                  ? COLORS.bgSoft
                  : userSelected
                  ? COLORS.dangerSoft
                  : COLORS.white
              }}
            >
              <span
                style={{
                  ...checkMark,
                  color: isCorrect
                    ? COLORS.green
                    : userSelected
                    ? COLORS.danger
                    : "transparent"
                }}
              >
                {isCorrect ? "✓" : userSelected ? "✕" : ""}
              </span>

              <div>
                <div style={optionText}>{option}</div>
                {optionsFa[i] && <div style={optionFa}>{optionsFa[i]}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {(q.exp_fa || q.exp || q.tip_fa || q.tip) && (
        <div style={explanationBox}>
          {q.exp_fa || q.exp}

          {(q.tip_fa || q.tip) && (
            <div style={{ marginTop: 8 }}>💡 {q.tip_fa || q.tip}</div>
          )}
        </div>
      )}
    </details>
  );
}

const reviewItem = {
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 14,
  marginBottom: 10,
  overflow: "hidden",
  background: COLORS.white
};

const reviewSummary = {
  cursor: "pointer",
  padding: 14,
  color: COLORS.text,
  fontWeight: 900,
  fontSize: 13,
  lineHeight: 1.7,
  display: "flex",
  justifyContent: "space-between",
  gap: 10
};

const pointsBadge = {
  flexShrink: 0,
  background: COLORS.bgSoft,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.green,
  borderRadius: 8,
  padding: "3px 8px",
  fontSize: 11,
  fontWeight: 900
};

const translationText = {
  margin: "0 14px 12px",
  padding: 12,
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 10,
  color: COLORS.muted,
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
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 950,
  flexShrink: 0
};

const optionText = {
  color: COLORS.text,
  fontWeight: 800
};

const optionFa = {
  marginTop: 4,
  color: COLORS.muted,
  fontSize: 12,
  lineHeight: 1.6
};

const explanationBox = {
  margin: "0 14px 14px",
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  borderRadius: 12,
  padding: 12,
  color: COLORS.warningText,
  fontSize: 12,
  lineHeight: 1.8
};