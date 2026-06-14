const EXAM_SESSION_KEY = "hamrah_govahiname_active_exam";

export function saveExamSession(session) {
  localStorage.setItem(EXAM_SESSION_KEY, JSON.stringify(session));
}

export function getExamSession() {
  try {
    const raw = localStorage.getItem(EXAM_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearExamSession() {
  localStorage.removeItem(EXAM_SESSION_KEY);
}

export function hasExamSession() {
  return Boolean(getExamSession());
}