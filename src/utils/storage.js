const STORAGE_KEY = "hamrah_govahiname_stats";

const EMPTY_STATS = {
  attempts: [],
  totalAttempts: 0,
  practiceAttempts: 0,
  examAttempts: 0,
  passedAttempts: 0,
  passRate: 0,
  bestFehlerpunkte: null,
  worstFehlerpunkte: null,
  averageFehlerpunkte: null,
  lastAttempt: null
};

export function getStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATS;

    return {
      ...EMPTY_STATS,
      ...JSON.parse(raw)
    };
  } catch {
    return EMPTY_STATS;
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

  const totalAttempts = attempts.length;
  const practiceAttempts = attempts.filter((a) => !a.isExamMode).length;
  const examAttempts = attempts.filter((a) => a.isExamMode).length;
  const passedAttempts = attempts.filter((a) => a.passed).length;

  const passRate =
    totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100) : 0;

  const fehlerList = attempts
    .filter((a) => a.isExamMode)
    .map((a) => a.fehlerpunkte)
    .filter((n) => typeof n === "number");

  const bestFehlerpunkte =
    fehlerList.length > 0 ? Math.min(...fehlerList) : null;

  const worstFehlerpunkte =
    fehlerList.length > 0 ? Math.max(...fehlerList) : null;

  const averageFehlerpunkte =
    fehlerList.length > 0
      ? Math.round(fehlerList.reduce((a, b) => a + b, 0) / fehlerList.length)
      : null;

  const stats = {
    attempts,
    totalAttempts,
    practiceAttempts,
    examAttempts,
    passedAttempts,
    passRate,
    bestFehlerpunkte,
    worstFehlerpunkte,
    averageFehlerpunkte,
    lastAttempt: attempts[0] || null
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  return stats;
}

export function clearStats() {
  localStorage.removeItem(STORAGE_KEY);
}