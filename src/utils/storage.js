const STORAGE_KEY = "hamrah_govahiname_stats";

export function getStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        attempts: [],
        totalAttempts: 0,
        passedAttempts: 0,
        bestFehlerpunkte: null,
        averageFehlerpunkte: null
      };
    }

    return JSON.parse(raw);
  } catch {
    return {
      attempts: [],
      totalAttempts: 0,
      passedAttempts: 0,
      bestFehlerpunkte: null,
      averageFehlerpunkte: null
    };
  }
}

export function saveAttempt(attempt) {
  const current = getStats();
  const attempts = [
    {
      id: Date.now(),
      date: new Date().toISOString(),
      ...attempt
    },
    ...current.attempts
  ].slice(0, 50);

  const examAttempts = attempts.filter((a) => a.isExamMode);
  const passedAttempts = attempts.filter((a) => a.passed).length;

  const fehlerList = examAttempts
    .map((a) => a.fehlerpunkte)
    .filter((n) => typeof n === "number");

  const bestFehlerpunkte =
    fehlerList.length > 0 ? Math.min(...fehlerList) : null;

  const averageFehlerpunkte =
    fehlerList.length > 0
      ? Math.round(fehlerList.reduce((a, b) => a + b, 0) / fehlerList.length)
      : null;

  const stats = {
    attempts,
    totalAttempts: attempts.length,
    passedAttempts,
    bestFehlerpunkte,
    averageFehlerpunkte
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats;
}

export function clearStats() {
  localStorage.removeItem(STORAGE_KEY);
}