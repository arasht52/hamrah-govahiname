import { useEffect, useRef, useState } from "react";
import { ALL_QUESTIONS } from "../data/allQuestions";
import { COLORS } from "../theme/colors";
import {
  page,
  primaryButton,
  secondaryButton
} from "../theme/components";

import QuestionCard from "../components/quiz/QuestionCard";
import OptionList from "../components/quiz/OptionList";

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

  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];
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

      <QuestionCard
        question={q}
        showTranslation={showTranslation}
        setShowTranslation={setShowTranslation}
      />

      <OptionList
        options={options}
        optionsFa={optionsFa}
        chosenAnswers={chosenAnswers}
        submitted={false}
        showTranslation={showTranslation}
        onToggle={toggleAnswer}
      />

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