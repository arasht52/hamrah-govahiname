import { useEffect, useRef, useState } from "react";
import { ALL_QUESTIONS } from "../data/allQuestions";
import { COLORS } from "../theme/colors";
import {
  card,
  page,
  primaryButton,
  secondaryButton,
  softCard
} from "../theme/components";

const EXAM_LIMIT_MS = 45 * 60 * 1000;

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

function buildAnswerRecord(question, chosenAnswers, marked) {
  const correctAnswers = normalizeOk(question.ok);
  const correct = isExactAnswer(chosenAnswers, correctAnswers);

  return {
    question,
    correct,
    chosenAnswers: [...chosenAnswers],
    fehlerpunkte: correct ? 0 : question.points || 2,
    marked
  };
}

function buildWrongRecord(question, marked) {
  return {
    question,
    correct: false,
    chosenAnswers: [],
    fehlerpunkte: question.points || 2,
    marked
  };
}

export default function ExamQuizPage({ onFinish, onBack }) {
  const [queue] = useState(() => selectQuestions(ALL_QUESTIONS, 30));
  const [idx, setIdx] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [answersList, setAnswersList] = useState([]);
  const [marked, setMarked] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [finished, setFinished] = useState(false);

  const latestRef = useRef({
    idx: 0,
    chosenAnswers: [],
    answersList: [],
    marked: {},
    queue: []
  });

  useEffect(() => {
    latestRef.current = {
      idx,
      chosenAnswers,
      answersList,
      marked,
      queue
    };
  }, [idx, chosenAnswers, answersList, marked, queue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      finishByTimeout();
    }, EXAM_LIMIT_MS);

    return () => clearTimeout(timer);
  }, []);

  const q = queue[idx];
  if (!q) return null;

  const questionText = q.q_de || q.q;
  const questionFa = q.q_fa;
  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
  const hasTranslation = Boolean(questionFa || optionsFa.length);
  const currentMarked = !!marked[q.id];

  function finishByTimeout() {
    const latest = latestRef.current;

    if (!latest.queue.length) return;

    const finalAnswers = [...latest.answersList];

    for (let i = latest.answersList.length; i < latest.queue.length; i++) {
      const question = latest.queue[i];
      const isCurrent = i === latest.idx;
      const questionMarked = !!latest.marked[question.id];

      if (isCurrent && latest.chosenAnswers.length > 0) {
        finalAnswers.push(
          buildAnswerRecord(question, latest.chosenAnswers, questionMarked)
        );
      } else {
        finalAnswers.push(buildWrongRecord(question, questionMarked));
      }
    }

    setFinished(true);

    onFinish({
      answersList: finalAnswers,
      isExamMode: true,
      timedOut: true
    });
  }

  function toggleAnswer(optionIndex) {
    if (finished) return;

    setChosenAnswers((prev) =>
      prev.includes(optionIndex)
        ? prev.filter((x) => x !== optionIndex)
        : [...prev, optionIndex]
    );
  }

  function submitAnswer() {
    if (chosenAnswers.length === 0 || finished) return;

    const record = buildAnswerRecord(q, chosenAnswers, currentMarked);
    const updated = [...answersList, record];

    setAnswersList(updated);

    if (idx + 1 >= queue.length) {
      setFinished(true);

      onFinish({
        answersList: updated,
        isExamMode: true
      });

      return;
    }

    setIdx((prev) => prev + 1);
    setChosenAnswers([]);
    setShowTranslation(false);
  }

  return (
    <div style={page}>
      <div style={examHeader}>
        <button onClick={onBack} style={secondaryAction}>
          ← Ende
        </button>

        <div style={modeBadge}>Prüfung</div>

        <div style={pointsBadge}>{q.points || 2} Punkte</div>
      </div>

      <div style={questionCard}>
        <div style={questionTopRow}>
          <h2 style={questionTitle}>{questionText}</h2>

          {hasTranslation && (
            <button
              onClick={() => setShowTranslation((prev) => !prev)}
              style={translationBtn}
            >
              فارسی
            </button>
          )}
        </div>

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

          return (
            <button
              key={i}
              onClick={() => toggleAnswer(i)}
              style={{
                ...optionBtn,
                border: selected
                  ? `2px solid ${COLORS.green}`
                  : `2px solid ${COLORS.border}`,
                background: selected ? COLORS.bgSoft : COLORS.white
              }}
            >
              <span
                style={{
                  ...checkbox,
                  background: selected ? COLORS.green : COLORS.white,
                  borderColor: selected ? COLORS.green : "#9CA3AF",
                  color: selected ? COLORS.white : "transparent"
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

      <div style={actionRow}>
        <button
          onClick={() =>
            setMarked((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
          }
          style={{
            ...markBtn,
            background: currentMarked ? "#FACC15" : COLORS.white,
            color: currentMarked ? COLORS.text : COLORS.green,
            borderColor: currentMarked ? "#FACC15" : COLORS.border
          }}
        >
          {currentMarked ? "Markiert" : "Markieren"}
        </button>

        <button
          onClick={submitAnswer}
          disabled={chosenAnswers.length === 0}
          style={{
            ...primaryAction,
            opacity: chosenAnswers.length === 0 ? 0.45 : 1,
            cursor: chosenAnswers.length === 0 ? "default" : "pointer"
          }}
        >
          Abgabe
        </button>
      </div>
    </div>
  );
}

const examHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10
};

const modeBadge = {
  display: "inline-block",
  background: COLORS.bgSoft,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.green,
  borderRadius: 18,
  padding: "6px 14px",
  fontSize: 12,
  fontWeight: 950
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

const questionCard = {
  ...card,
  boxShadow: "0 6px 18px rgba(22,138,58,0.08)"
};

const questionTopRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 12
};

const questionTitle = {
  margin: 0,
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
  color: COLORS.text,
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

const actionRow = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: 10,
  marginBottom: 20
};

const markBtn = {
  border: "1px solid",
  borderRadius: 14,
  padding: "15px 0",
  fontWeight: 950,
  fontFamily: "inherit",
  cursor: "pointer"
};

const primaryAction = {
  ...primaryButton,
  borderRadius: 14,
  padding: "15px 0",
  fontSize: 15
};

const secondaryAction = {
  ...secondaryButton,
  width: "auto",
  borderRadius: 10,
  padding: "8px 12px"
};