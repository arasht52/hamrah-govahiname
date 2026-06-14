import PageHeader from "../components/PageHeader";
import { clearStats } from "../utils/storage";
import { COLORS } from "../theme/colors";

export default function SettingsPage({ onBack }) {
  const handleClearStats = () => {
    const ok = window.confirm("آیا مطمئن هستید که می‌خواهید آمار پاک شود؟");
    if (!ok) return;

    clearStats();
    alert("آمار پاک شد.");
    window.location.reload();
  };

  return (
    <div>
      <PageHeader title="تنظیمات" onBack={onBack} />

      <div style={card}>
        <div style={label}>نسخه برنامه</div>
        <div style={value}>1.0.0</div>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>مدیریت داده‌ها</h3>

        <p style={text}>
          آمار آزمون‌ها و تمرین‌ها در حافظه مرورگر ذخیره می‌شود.
        </p>

        <button onClick={handleClearStats} style={dangerBtn}>
          پاک کردن آمار
        </button>
      </div>
    </div>
  );
}

const card = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 20,
  padding: 18,
  marginBottom: 14
};

const label = {
  color: COLORS.muted,
  fontSize: 13,
  fontWeight: 800,
  marginBottom: 6
};

const value = {
  color: COLORS.text,
  fontSize: 18,
  fontWeight: 950
};

const sectionTitle = {
  margin: "0 0 10px",
  color: COLORS.green,
  fontSize: 16,
  fontWeight: 950
};

const text = {
  color: COLORS.muted,
  lineHeight: 1.9,
  margin: "0 0 14px",
  fontSize: 14
};

const dangerBtn = {
  width: "100%",
  background: COLORS.dangerSoft,
  border: `1px solid ${COLORS.dangerBorder}`,
  color: COLORS.danger,
  borderRadius: 14,
  padding: "13px 0",
  fontWeight: 950,
  fontFamily: "inherit",
  cursor: "pointer"
};