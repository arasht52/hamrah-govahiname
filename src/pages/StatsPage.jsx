import PageHeader from "../components/PageHeader";
import { getStats, clearStats } from "../utils/storage";
import { COLORS } from "../theme/colors";
import {
  badge,
  card,
  dangerButton,
  heroCard,
  mutedText,
  page,
  pageTitle,
  sectionTitle
} from "../theme/components";

export default function StatsPage({ onBack }) {
  const stats = getStats();
  const attempts = stats.attempts || [];
  const lastAttempt = stats.lastAttempt || attempts[0] || null;

  return (
    <div style={page}>
      <PageHeader title="آمار" onBack={onBack} />

      <div style={heroCard}>
        <div style={badge}>📊 Statistik</div>

        <h2 style={pageTitle}>آمار و پیشرفت</h2>

        <p style={mutedText}>
          خلاصه عملکرد شما در تمرین‌ها و آزمون‌های شبیه‌سازی‌شده.
        </p>
      </div>

      <div style={summaryCard}>
        <div>
          <div style={summaryLabel}>درصد قبولی</div>
          <div style={summaryValue}>{stats.passRate || 0}%</div>
        </div>

        <div style={summaryDivider} />

        <div>
          <div style={summaryLabel}>آخرین نتیجه</div>
          <div
            style={{
              ...summaryStatus,
              color: lastAttempt?.passed ? COLORS.green : COLORS.danger
            }}
          >
            {lastAttempt ? (lastAttempt.passed ? "قبول" : "مردود") : "-"}
          </div>
        </div>
      </div>

      <div style={grid}>
        <StatCard label="کل تلاش‌ها" value={stats.totalAttempts || 0} />
        <StatCard label="تمرین‌ها" value={stats.practiceAttempts || 0} />
        <StatCard label="آزمون‌ها" value={stats.examAttempts || 0} />
        <StatCard label="قبولی‌ها" value={stats.passedAttempts || 0} />
        <StatCard
          label="بهترین Fehlerpunkte"
          value={stats.bestFehlerpunkte ?? "-"}
        />
        <StatCard
          label="بدترین Fehlerpunkte"
          value={stats.worstFehlerpunkte ?? "-"}
        />
        <StatCard
          label="میانگین Fehlerpunkte"
          value={stats.averageFehlerpunkte ?? "-"}
        />
        <StatCard
          label="آخرین Fehlerpunkte"
          value={lastAttempt?.fehlerpunkte ?? "-"}
        />
      </div>

      <div style={card}>
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
                  {typeof a.fehlerpunkte === "number"
                    ? ` · ${a.fehlerpunkte} Fehlerpunkte`
                    : ""}
                </div>
              </div>

              <div
                style={{
                  ...statusBadge,
                  background: a.passed ? COLORS.bgSoft : COLORS.dangerSoft,
                  color: a.passed ? COLORS.green : COLORS.danger,
                  borderColor: a.passed ? COLORS.border : COLORS.dangerBorder
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
          style={dangerButton}
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

const summaryCard = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 20,
  padding: 18,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const summaryLabel = {
  color: COLORS.muted,
  fontSize: 12,
  fontWeight: 900,
  marginBottom: 6
};

const summaryValue = {
  color: COLORS.green,
  fontSize: 34,
  fontWeight: 950
};

const summaryStatus = {
  fontSize: 22,
  fontWeight: 950
};

const summaryDivider = {
  width: 1,
  height: 46,
  background: COLORS.borderSoft
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10
};

const statCard = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 16,
  textAlign: "center"
};

const statValue = {
  color: COLORS.green,
  fontSize: 30,
  fontWeight: 950
};

const statLabel = {
  color: COLORS.muted,
  fontSize: 12,
  fontWeight: 900,
  marginTop: 4
};

const emptyBox = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 12,
  padding: 16,
  color: COLORS.muted,
  textAlign: "center"
};

const attemptRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  borderBottom: `1px solid ${COLORS.borderSoft}`
};

const attemptTitle = {
  color: COLORS.text,
  fontWeight: 950,
  fontSize: 13
};

const attemptMeta = {
  color: COLORS.muted,
  fontSize: 11,
  marginTop: 4
};

const statusBadge = {
  border: "1px solid",
  borderRadius: 12,
  padding: "6px 10px",
  fontSize: 12,
  fontWeight: 950,
  flexShrink: 0
};