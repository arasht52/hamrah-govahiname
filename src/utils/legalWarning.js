export function updateQuestionStats(prevStats, answers) {
  const next = { ...prevStats };
  const now = new Date().toISOString();

  answers.forEach(({ question, correct }) => {
    const id = String(question.id);

    const prev = next[id] || {
      timesCorrect: 0,
      timesWrong: 0,
      lastSeen: null,
      mastery: 0
    };

    const timesCorrect = prev.timesCorrect + (correct ? 1 : 0);
    const timesWrong = prev.timesWrong + (correct ? 0 : 1);
    const total = timesCorrect + timesWrong;

    const mastery =
      total === 0
        ? 0
        : Math.min(
            100,
            Math.round((timesCorrect / total) * 100 * Math.min(1, total / 3))
          );

    next[id] = {
      timesCorrect,
      timesWrong,
      lastSeen: now,
      mastery
    };
  });

  return next;
}

export function selectQuestions(pool, questionStats, count) {
  const weighted = pool.map((question) => {
    const stats = questionStats[String(question.id)] || {
      timesCorrect: 0,
      timesWrong: 0,
      mastery: 0
    };

    const weight = 1 + stats.timesWrong * 2 - stats.mastery / 50;

    return {
      question,
      weight: Math.max(0.5, weight)
    };
  });

  const result = [];
  const remaining = [...weighted];

  while (result.length < Math.min(count, remaining.length)) {
    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;

    for (let i = 0; i < remaining.length; i++) {
      random -= remaining[i].weight;

      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }

    result.push(remaining[selectedIndex].question);
    remaining.splice(selectedIndex, 1);
  }

  return result;
}