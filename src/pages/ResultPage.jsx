import { useEffect } from "react";
import { saveAttempt } from "../utils/storage";
import { COLORS } from "../theme/colors";
import {
  card,
  dangerButton,
  page,
  primaryButton,
  secondaryButton,
  sectionTitle,
  softCard
} from "../theme/components";

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

  useEffect(() => {
    if (!answersList.length) return;

    saveAttempt({
      isExamMode,
      passed,
      total,
      correct,
      wrong,
      fehlerpunkte,
      fiveWrong,
      percent
    });
  }, []);

  return (
    <div style={page}>
      <div style={summaryCard}>
        <div style={statusIcon}>{passed ? "✅" : "❌"}</div>

        <h2
          style={{
            ...statusTitle,
            color: passed ? COLORS.green : COLORS.danger
          }}
        >
          {passed ? "قبول شدی" : "مردود شدی"}
        </h2>

        <div style={subTitle}>{passed ? "Bestanden" : "Nicht bestanden"}</div>

        {isExamMode ? (
          <div style={scoreBox}>
            <div style={scoreNumber}>{fehlerpunkte}</div>
            <div style={scoreLabel}>Fehlerpunkte</div>
            <div style={limitText}>حد مجاز: حداکثر ۱۰ امتیاز منفی</div>
          </div>
        ) : (
          <div style={scoreBox}>
            <div style={scoreNumber}>{percent}%</div>
            <div style={scoreLabel}>نتیجه تمرین آموزشی</div>
            <div style={limitText}>حد پیشنهادی تمرین: حداقل ۷۰٪</div>
          </div>
        )}

        {failedByFivePointRule && (
          <div style={dangerBox}>
            به دلیل دو یا چند سؤال ۵ امتیازی اشتباه، مردود محسوب می‌شوی.
            <br />
            Nicht bestanden wegen mehrerer 5-Punkte-Fehler.
          </div>
        )}

        <div style={miniStats}>
          <MiniStat value={total} label="سؤال" />
          <MiniStat value={correct} label="درست" />
          <MiniStat value={wrong} label="غلط" />
          <MiniStat value={fiveWrong} label="۵ امتیازی غلط" />
        </div>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>ارزیابی آزمون</h3>

        <div style={ruleLine}>
          <span>حداکثر امتیاز منفی مجاز</span>
          <strong>10</strong>
        </div>

        <div style={ruleLine}>
          <span>امتیاز منفی شما</span>
          <strong style={{ color: passed ? COLORS.green : COLORS.danger }}>
            {fehlerpunkte}
          </strong>
        </div>

        <div style={ruleLine}>
          <span>تعداد سؤال‌های ۵ امتیازی غلط</span>
          <strong>{fiveWrong}</strong>
        </div>
      </div>

      {markedAnswers.length > 0 && (
        <div style={card}>
          <h3 style={sectionTitle}>🚩 سؤال‌های علامت‌گذاری‌شده</h3>

          {markedAnswers.map((a, index) => (
            <QuestionReview key={`marked-${index}`} item={a} index={index} />
          ))}
        </div>
      )}

      {wrongAnswers.length > 0 && (
        <div style={card}>
          <h3 style={{ ...sectionTitle, color: COLORS.danger }}>
            سؤال‌های اشتباه
          </h3>

          {wrongAnswers.map((a, index) => (
            <QuestionReview key={`wrong-${index}`} item={a} index={index} />
          ))}
        </div>
      )}

      <div style={buttonRow}>
        <button onClick={onHome} style={secondaryAction}>
          خانه
        </button>

        <button onClick={onRetry} style={primaryAction}>
          آزمون مجدد
        </button>
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div style={miniStat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function QuestionReview({ item, index }) {
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

const summaryCard = {
  ...card,
  padding: 26,
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
  color: COLORS.muted,
  marginTop: 6,
  fontSize: 13,
  fontWeight: 800
};

const scoreBox = {
  ...softCard,
  marginTop: 20,
  padding: 18
};

const scoreNumber = {
  fontSize: 52,
  fontWeight: 950,
  color: COLORS.green,
  lineHeight: 1
};

const scoreLabel = {
  marginTop: 6,
  color: COLORS.text,
  fontWeight: 900
};

const limitText = {
  marginTop: 4,
  color: COLORS.muted,
  fontSize: 12
};

const dangerBox = {
  marginTop: 14,
  background: COLORS.dangerSoft,
  border: `1px solid ${COLORS.dangerBorder}`,
  color: COLORS.danger,
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
  background: COLORS.white,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 12,
  padding: "10px 4px",
  display: "flex",
  flexDirection: "column",
  gap: 3,
  color: COLORS.muted,
  fontSize: 10
};

const ruleLine = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: `1px solid ${COLORS.borderSoft}`,
  padding: "10px 0",
  color: COLORS.textSoft,
  fontSize: 13
};

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

const buttonRow = {
  display: "flex",
  gap: 12,
  marginBottom: 20
};

const secondaryAction = {
  ...secondaryButton,
  flex: 1,
  borderRadius: 14
};

const primaryAction = {
  ...primaryButton,
  flex: 2,
  borderRadius: 14
};