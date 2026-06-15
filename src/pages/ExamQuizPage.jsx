import { useEffect, useRef, useState } from "react";
import { ALL_QUESTIONS } from "../data/allQuestions";
import { COLORS } from "../theme/colors";
import {
  card,
  page,
  primaryButton,
  secondaryButton
} from "../theme/components";

import QuestionCard from "../components/quiz/QuestionCard";
import OptionList from "../components/quiz/OptionList";
import { saveExamSession } from "../utils/examSession";

const EXAM_LIMIT_MS = 45 * 60 * 1000;

function selectQuestions(pool, count) {
  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, pool.length));
}

function getQuestionKey(q, index) {
  return q.id || q.q_de || q.q || `question-${index}`;
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

function buildResult(queue, answers) {
  return queue.map((q, index) => {
    const key = getQuestionKey(q, index);
    const saved = answers[key] || {};
    const chosenAnswers = saved.chosenAnswers || [];
    const correctAnswers = normalizeOk(q.ok);
    const correct =
      chosenAnswers.length > 0 && isExactAnswer(chosenAnswers, correctAnswers);

    return {
      question: q,
      correct,
      chosenAnswers,
      fehlerpunkte: correct ? 0 : q.points || 2,
      marked: !!saved.marked
    };
  });
}

export default function ExamQuizPage({
  onFinish,
  onBack,
  savedSession = null,
  onStartNewExam
}) {
  const [queue] = useState(() => {
    if (savedSession?.queue?.length) return savedSession.queue;
    return selectQuestions(ALL_QUESTIONS, 30);
  });

  const [idx, setIdx] = useState(() => savedSession?.idx || 0);
  const [answers, setAnswers] = useState(() => savedSession?.answers || {});
  const [showTranslation, setShowTranslation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showResumeBox, setShowResumeBox] = useState(Boolean(savedSession));

  const startedAtRef = useRef(savedSession?.startedAt || Date.now());

  const latestRef = useRef({
    queue: [],
    answers: {},
    idx: 0
  });

  const q = queue[idx];
  const currentKey = q ? getQuestionKey(q, idx) : null;
  const currentAnswer = currentKey ? answers[currentKey] || {} : {};
  const chosenAnswers = currentAnswer.chosenAnswers || [];
  const currentMarked = !!currentAnswer.marked;

  useEffect(() => {
    latestRef.current = { queue, answers, idx };

    if (!finished && queue.length > 0) {
      saveExamSession({
        queue,
        idx,
        answers,
        startedAt: startedAtRef.current
      });
    }
  }, [queue, answers, idx, finished]);

  useEffect(() => {
    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(EXAM_LIMIT_MS - elapsed, 0);

    const timer = setTimeout(() => {
      finishExam(true);
    }, remaining);

    return () => clearTimeout(timer);
  }, []);

  if (!q) return null;

  const options = q.opts_de || q.opts || [];
  const optionsFa = q.opts_fa || [];

  function updateCurrentAnswer(nextData) {
    setAnswers((prev) => ({
      ...prev,
      [currentKey]: {
        chosenAnswers: prev[currentKey]?.chosenAnswers || [],
        marked: prev[currentKey]?.marked || false,
        ...nextData
      }
    }));
  }

  function toggleAnswer(optionIndex) {
    if (finished) return;

    const current = chosenAnswers;

    const nextChosen = current.includes(optionIndex)
      ? current.filter((x) => x !== optionIndex)
      : [...current, optionIndex];

    updateCurrentAnswer({ chosenAnswers: nextChosen });
  }

  function toggleMarked() {
    updateCurrentAnswer({ marked: !currentMarked });
  }

  function goToQuestion(nextIndex) {
    if (nextIndex < 0 || nextIndex >= queue.length) return;

    setIdx(nextIndex);
    setShowTranslation(false);
  }

  function finishExam(timedOut = false) {
    if (finished) return;

    const latest = latestRef.current;
    const answersList = buildResult(latest.queue, latest.answers);

    setFinished(true);

    onFinish({
      answersList,
      isExamMode: true,
      timedOut
    });
  }

  if (showResumeBox) {
    return (
      <div style={page}>
        <div style={resumeCard}>
          <div style={resumeIcon}>📝</div>

          <h2 style={resumeTitle}>آزمون نیمه‌تمام پیدا شد</h2>

          <p style={resumeText}>
            یک آزمون رسمی قبلاً شروع شده و هنوز تمام نشده است.
          </p>

          <div style={resumeMeta}>
            سؤال {idx + 1} از {queue.length}
          </div>

          <button onClick={() => setShowResumeBox(false)} style={primaryAction}>
            ادامه آزمون
          </button>

          <button onClick={onStartNewExam} style={secondaryFull}>
            شروع آزمون جدید
          </button>
        </div>
      </div>
    );
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

      <div style={questionGrid}>
        {queue.map((item, i) => {
          const key = getQuestionKey(item, i);
          const saved = answers[key] || {};
          const answered = (saved.chosenAnswers || []).length > 0;
          const isCurrent = i === idx;
          const isMarked = !!saved.marked;

          return (
            <button
              key={key}
              onClick={() => goToQuestion(i)}
              style={{
                ...gridItem,
                background: isCurrent
                  ? COLORS.text
                  : isMarked
                  ? "#FACC15"
                  : answered
                  ? COLORS.green
                  : COLORS.white,
                color: isCurrent
                  ? COLORS.white
                  : isMarked
                  ? COLORS.text
                  : answered
                  ? COLORS.white
                  : COLORS.green,
                borderColor: isCurrent ? COLORS.text : COLORS.border
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div style={actionRow}>
        <button
          onClick={toggleMarked}
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
          onClick={() => finishExam(false)}
          style={primaryAction}
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

const questionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  gap: 6
};

const gridItem = {
  height: 34,
  border: "1px solid",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 950,
  fontFamily: "inherit",
  cursor: "pointer"
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

const secondaryFull = {
  ...secondaryButton,
  borderRadius: 14,
  padding: "14px 0",
  marginTop: 10
};

const resumeCard = {
  ...card,
  textAlign: "center",
  padding: 24
};

const resumeIcon = {
  fontSize: 44,
  marginBottom: 10
};

const resumeTitle = {
  margin: "0 0 10px",
  color: COLORS.text,
  fontSize: 22,
  fontWeight: 950
};

const resumeText = {
  color: COLORS.muted,
  fontSize: 13,
  lineHeight: 1.9,
  margin: "0 0 14px"
};

const resumeMeta = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 14,
  padding: 12,
  color: COLORS.green,
  fontWeight: 950,
  marginBottom: 14
};