import { useState } from "react";
import { ALL_QUESTIONS } from "../data/allQuestions";
import { COLORS } from "../theme/colors";
import {
  card,
  page,
  primaryButton,
  secondaryButton,
  softCard
} from "../theme/components";

function selectQuestions(pool, count) {
  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, pool.length));
}

function normalizeOk(ok) {
  return Array.isArray(ok) ? ok : [ok];
}

function isExactAnswer(chosen, correct) {
  return (
    chosen.length === correct.length &&
    chosen.every((x) => correct.includes(x))
  );
}

function buildAnswerRecord(question, chosenAnswers, correctAnswers) {
  const correct = isExactAnswer(chosenAnswers, correctAnswers);

  return {
    question,
    correct,
    chosenAnswers: [...chosenAnswers],
    fehlerpunkte: correct ? 0 : question.points || 2,
    marked: false
  };
}

export default function PracticeQuizPage({ onFinish, onBack }) {
  const [queue] = useState(() => selectQuestions(ALL_QUESTIONS, 10));
  const [idx, setIdx] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [answersList, setAnswersList] = useState([]);
  const [showTranslation, setShowTranslation] = useState(false);

  const q = queue[idx];
  if (!q) return null;

  const questionText = q.q_de || q.q;
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const correctAnswers = normalizeOk(q.ok);
  const progress = ((idx + 1) / queue.length) * 100;
  const hasTranslation = Boolean(questionFa || optionsFa.length);
  const answerIsCorrect = isExactAnswer(chosenAnswers, correctAnswers);

  function toggleAnswer(optionIndex) {
    if (submitted) return;

    setChosenAnswers((prev) =>
      prev.includes(optionIndex)
        ? prev.filter((x) => x !== optionIndex)
        : [...prev, optionIndex]
    );
  }

  function submitAnswer() {
    if (chosenAnswers.length === 0) return;
    setSubmitted(true);
  }

  function nextQuestion() {
    const record = buildAnswerRecord(q, chosenAnswers, correctAnswers);
    const updated = [...answersList, record];

    setAnswersList(updated);

    if (idx + 1 >= queue.length) {
      onFinish({
        answersList: updated,
        isExamMode: false
      });
      return;
    }

    setIdx((prev) => prev + 1);
    setChosenAnswers([]);
    setSubmitted(false);
    setShowTranslation(false);
  }

  return (
    <div style={page}>
      <div style={topBar}>
        <button onClick={onBack} style={secondaryAction}>
          ← برگشت
        </button>

        <div style={topInfo}>
          <div style={modeBadge}>تمرین آموزشی</div>
          <div style={counter}>
            سؤال {idx + 1} از {queue.length}
          </div>
        </div>

        <div style={pointsBadge}>{q.points || 2} امتیاز</div>
      </div>

      <div style={progressBar}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      <div style={questionCard}>
        <h2 style={questionTitle}>{questionText}</h2>

        {hasTranslation && (
          <button
            onClick={() => setShowTranslation((prev) => !prev)}
            style={translationBtn}
          >
            فارسی
          </button>
        )}

        {showTranslation && questionFa && (
          <div style={translationBox}>{questionFa}</div>
        )}

        {q.image_url && (
          <img src={q.image_url} alt="Frage" style={mediaStyle} />
        )}

        {q.video_url && (
          <video src={q.video_url} controls style={mediaStyle} />
        )}
      </div>

      <div style={optionsBox}>
        {options.map((option, i) => {
          const selected = chosenAnswers.includes(i);
          const isCorrect = correctAnswers.includes(i);

          const visual = getOptionVisual({
            submitted,
            selected,
            isCorrect
          });

          return (
            <button
              key={i}
              onClick={() => toggleAnswer(i)}
              style={{
                ...optionBtn,
                border: `2px solid ${visual.border}`,
                background: visual.background,
                color: visual.color
              }}
            >
              <span
                style={{
                  ...checkbox,
                  borderColor:
                    selected || (submitted && isCorrect)
                      ? visual.border
                      : "#9CA3AF",
                  background:
                    selected || (submitted && isCorrect)
                      ? visual.border
                      : COLORS.white,
                  color:
                    selected || (submitted && isCorrect)
                      ? COLORS.white
                      : "transparent"
                }}
              >
                ✓
              </span>

              <span style={{ flex: 1 }}>
                <span>{option}</span>

                {showTranslation && optionsFa[i] && (
                  <span style={optionTranslation}>{optionsFa[i]}</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div style={explanationCard}>
          <div
            style={{
              ...explanationTitle,
              color: answerIsCorrect ? COLORS.green : COLORS.danger
            }}
          >
            {answerIsCorrect ? "✅ پاسخ درست بود" : "❌ پاسخ اشتباه بود"}
          </div>

          <div style={explanationText}>
            {q.exp_fa ||
              q.exp ||
              "برای این سؤال هنوز توضیح فارسی ثبت نشده است."}
          </div>

          {(q.tip_fa || q.tip) && (
            <div style={tipBox}>💡 {q.tip_fa || q.tip}</div>
          )}
        </div>
      )}

      <div style={actionRow}>
        {!submitted ? (
          <button
            onClick={submitAnswer}
            disabled={chosenAnswers.length === 0}
            style={{
              ...primaryAction,
              opacity: chosenAnswers.length === 0 ? 0.45 : 1,
              cursor: chosenAnswers.length === 0 ? "default" : "pointer"
            }}
          >
            ثبت پاسخ
          </button>
        ) : (
          <button onClick={nextQuestion} style={primaryAction}>
            {idx + 1 < queue.length ? "سؤال بعدی" : "مشاهده نتیجه"}
          </button>
        )}
      </div>
    </div>
  );
}

function getOptionVisual({ submitted, selected, isCorrect }) {
  if (!submitted && selected) {
    return {
      border: COLORS.green,
      background: COLORS.bgSoft,
      color: COLORS.text
    };
  }

  if (submitted && isCorrect) {
    return {
      border: COLORS.green,
      background: COLORS.bgSoft,
      color: "#14532D"
    };
  }

  if (submitted && selected && !isCorrect) {
    return {
      border: COLORS.danger,
      background: COLORS.dangerSoft,
      color: COLORS.danger
    };
  }

  return {
    border: COLORS.border,
    background: COLORS.white,
    color: COLORS.text
  };
}

const topBar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10
};

const secondaryAction = {
  ...secondaryButton,
  width: "auto",
  borderRadius: 10,
  padding: "8px 12px"
};

const topInfo = {
  textAlign: "center"
};

const modeBadge = {
  display: "inline-block",
  background: COLORS.bgSoft,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.green,
  borderRadius: 18,
  padding: "4px 10px",
  fontSize: 11,
  fontWeight: 950,
  marginBottom: 4
};

const counter = {
  color: COLORS.text,
  fontSize: 13,
  fontWeight: 900
};

const pointsBadge = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.text,
  borderRadius: 10,
  padding: "8px 10px",
  fontSize: 12,
  fontWeight: 950
};

const progressBar = {
  height: 6,
  background: COLORS.borderSoft,
  borderRadius: 6,
  overflow: "hidden"
};

const progressFill = {
  height: "100%",
  background: COLORS.green,
  transition: "width .25s"
};

const questionCard = {
  ...card,
  boxShadow: "0 6px 18px rgba(22,138,58,0.08)"
};

const questionTitle = {
  margin: "0 0 14px",
  color: COLORS.text,
  fontSize: 18,
  lineHeight: 1.6,
  fontWeight: 950,
  direction: "ltr",
  textAlign: "left"
};

const translationBtn = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 10,
  padding: "7px 14px",
  color: COLORS.green,
  fontWeight: 900,
  fontFamily: "inherit",
  cursor: "pointer"
};

const translationBox = {
  ...softCard,
  marginTop: 12,
  color: COLORS.textSoft,
  fontSize: 13,
  lineHeight: 1.9
};

const mediaStyle = {
  width: "100%",
  borderRadius: 14,
  marginTop: 14,
  border: `1px solid ${COLORS.borderSoft}`
};

const optionsBox = {
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const optionBtn = {
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "15px 16px",
  borderRadius: 14,
  fontFamily: "inherit",
  fontSize: 15,
  fontWeight: 800,
  textAlign: "left",
  cursor: "pointer",
  direction: "ltr"
};

const checkbox = {
  width: 28,
  height: 28,
  borderRadius: 7,
  border: "2px solid",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 950,
  flexShrink: 0
};

const optionTranslation = {
  display: "block",
  marginTop: 6,
  direction: "rtl",
  textAlign: "right",
  color: COLORS.muted,
  fontSize: 12,
  lineHeight: 1.7
};

const explanationCard = {
  ...card,
  marginTop: 6
};

const explanationTitle = {
  fontSize: 14,
  fontWeight: 950,
  marginBottom: 8
};

const explanationText = {
  color: COLORS.textSoft,
  fontSize: 13,
  lineHeight: 1.9
};

const tipBox = {
  marginTop: 10,
  background: COLORS.warningSoft,
  border: `1px solid ${COLORS.warningBorder}`,
  color: COLORS.warningText,
  borderRadius: 12,
  padding: 10,
  fontSize: 12,
  lineHeight: 1.8
};

const actionRow = {
  marginTop: 4
};

const primaryAction = {
  ...primaryButton,
  borderRadius: 14,
  padding: "15px 0",
  fontSize: 15
};