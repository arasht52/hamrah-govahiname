export function calcFehlerpunkte(answers) {
  let total = 0;
  let fivePointWrong = 0;

  answers.forEach(({ question, correct }) => {
    if (!correct) {
      total += question.points || 0;

      if (question.points === 5) {
        fivePointWrong++;
      }
    }
  });

  const passed = total <= 10 && fivePointWrong < 2;

  return {
    total,
    fivePointWrong,
    passed
  };
}

export function analyzeWeaknesses(answers) {
  const stats = {};

  answers.forEach(({ question, correct }) => {
    const topic = question.topic;

    if (!stats[topic]) {
      stats[topic] = {
        correct: 0,
        total: 0
      };
    }

    stats[topic].total++;

    if (correct) {
      stats[topic].correct++;
    }
  });

  return Object.entries(stats)
    .map(([topic, value]) => ({
      topic,
      correct: value.correct,
      total: value.total,
      pct: Math.round((value.correct / value.total) * 100),
      weak: value.correct / value.total < 0.6
    }))
    .sort((a, b) => a.pct - b.pct);
}