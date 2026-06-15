import { useEffect } from "react";
import { saveAttempt } from "../utils/storage";
import { COLORS } from "../theme/colors";
import {
  page,
  primaryButton,
  secondaryButton
} from "../theme/components";

import ResultSummary from "../components/result/ResultSummary";
import QuestionReview from "../components/result/QuestionReview";
import ResultSection from "../components/result/ResultSection";

export default function ResultPage({
  result,
  onRetry,
  onHome,
  onWrongQuestions
}) {
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
      percent,
      answersList
    });
  }, []);

  return (
    <div style={page}>
      <ResultSummary
        passed={passed}
        isExamMode={isExamMode}
        fehlerpunkte={fehlerpunkte}
        percent={percent}
        failedByFivePointRule={failedByFivePointRule}
        total={total}
        correct={correct}
        wrong={wrong}
        fiveWrong={fiveWrong}
      />

      <ResultSection title="ارزیابی آزمون">
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
      </ResultSection>

      {markedAnswers.length > 0 && (
        <ResultSection title="🚩 سؤال‌های علامت‌گذاری‌شده">
          {markedAnswers.map((a, index) => (
            <QuestionReview key={`marked-${index}`} item={a} index={index} />
          ))}
        </ResultSection>
      )}

      {wrongAnswers.length > 0 && (
        <ResultSection title="سؤال‌های اشتباه" danger>
          {wrongAnswers.map((a, index) => (
            <QuestionReview key={`wrong-${index}`} item={a} index={index} />
          ))}
        </ResultSection>
      )}

      <div style={buttonRow}>
        <button onClick={onHome} style={secondaryAction}>
          خانه
        </button>

        {wrongAnswers.length > 0 && (
          <button onClick={onWrongQuestions} style={wrongAction}>
            سؤال‌های غلط
          </button>
        )}

        <button onClick={onRetry} style={primaryAction}>
          آزمون مجدد
        </button>
      </div>
    </div>
  );
}

const ruleLine = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: `1px solid ${COLORS.borderSoft}`,
  padding: "10px 0",
  color: COLORS.textSoft,
  fontSize: 13
};

const buttonRow = {
  display: "flex",
  gap: 10,
  marginBottom: 20
};

const secondaryAction = {
  ...secondaryButton,
  flex: 1,
  borderRadius: 14
};

const wrongAction = {
  ...secondaryButton,
  flex: 1.4,
  borderRadius: 14,
  color: COLORS.danger,
  borderColor: COLORS.dangerBorder
};

const primaryAction = {
  ...primaryButton,
  flex: 1.4,
  borderRadius: 14
};