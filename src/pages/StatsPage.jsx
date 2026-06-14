import { getStats } from "../utils/storage";

export default function StatsPage() {
  const stats = getStats();

  return (
    <div>
      <h2>📊 آمار و پیشرفت</h2>

      <div>
        <p>تعداد آزمون‌ها: {stats.totalAttempts}</p>
        <p>تعداد قبولی‌ها: {stats.passedAttempts}</p>
        <p>بهترین Fehlerpunkte: {stats.bestFehlerpunkte ?? "-"}</p>
        <p>میانگین Fehlerpunkte: {stats.averageFehlerpunkte ?? "-"}</p>
      </div>
    </div>
  );
}