import PageHeader from "../components/PageHeader";
import { getStats, clearStats } from "../utils/storage";
import { COLORS } from "../theme/colors";

export default function StatsPage({ onBack }) {
  const stats = getStats();
  const attempts = stats.attempts || [];

  return (
    <div>
      <PageHeader title="آمار" onBack={onBack} />

      <div style={hero}>
        <div style={badge}>📊 Statistik</div>

        <h2 style={title}>آمار و پیشرفت</h2>

        <p style={subtitle}>
          خلاصه عملکرد شما در تمرین‌ها و آزمون‌های شبیه‌سازی‌شده.
        </p>
      </div>

      <div style={grid}>
        <StatCard label="کل تلاش‌ها" value={stats.totalAttempts || 0} />
        <StatCard label="قبولی‌ها" value={stats.passedAttempts || 0} />
        <StatCard
          label="بهترین Fehlerpunkte"
          value={stats.bestFehlerpunkte ?? "-"}
        />
        <StatCard
          label="میانگین Fehlerpunkte"
          value={stats.averageFehlerpunkte ?? "-"}
        />
      </div>

      <div style={listCard}>
        <h3 style={sectionTitle}>آخرین نتایج</h3>

        {attempts.length === 0 ? (
          <div style={emptyBox}>هنوز نتیجه‌ای ذخیره نشده است.</div>
        ) : (
          attempts.slice(0, 10).map((a) => (
            <div key={a.id} style={attemptRow}>
              <div>
                <div style={attemptTitle}>
                  {a.isExamMode ? "آزمون رسمی" : "تمرین آموزشی"}
                </div>

                <div style={attemptMeta}>
                  {new Date(a.date).toLocaleDateString("fa-IR")} ·{" "}
                  {a.correct} درست از {a.total}
                </div>
              </div>

              <div
                style={{
                  ...statusBadge,
                  background: a.passed ? COLORS.bgSoft : COLORS.dangerSoft,
                  color: a.passed ? COLORS.green : COLORS.danger,
                  borderColor: a.passed
                    ? COLORS.border
                    : COLORS.dangerBorder
                }}
              >
                {a.passed ? "قبول" : "مردود"}
              </div>
            </div>
          ))
        )}
      </div>

      {attempts.length > 0 && (
        <button
          onClick={() => {
            clearStats();
            window.location.reload();
          }}
          style={dangerBtn}
        >
          پاک کردن آمار
        </button>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={statCard}>
      <div style={statValue}>{value}</div>
      <div style={statLabel}>{label}</div>
    </div>
  );
}