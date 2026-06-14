import PageHeader from "../components/PageHeader";
import { clearStats } from "../utils/storage";
import { COLORS } from "../theme/colors";
import {
  card,
  dangerButton,
  mutedText,
  page,
  sectionTitle
} from "../theme/components";

export default function SettingsPage({ onBack }) {
  const handleClearStats = () => {
    const ok = window.confirm("آیا مطمئن هستید که می‌خواهید آمار پاک شود؟");
    if (!ok) return;

    clearStats();
    alert("آمار پاک شد.");
    window.location.reload();
  };

  return (
    <div style={page}>
      <PageHeader title="تنظیمات" onBack={onBack} />

      <div style={card}>
        <div style={label}>نسخه برنامه</div>
        <div style={value}>1.0.0</div>
      </div>

      <div style={card}>
        <h3 style={sectionTitle}>مدیریت داده‌ها</h3>

        <p style={{ ...mutedText, marginBottom: 14 }}>
          آمار آزمون‌ها و تمرین‌ها در حافظه مرورگر ذخیره می‌شود.
        </p>

        <button onClick={handleClearStats} style={dangerButton}>
          پاک کردن آمار
        </button>
      </div>
    </div>
  );
}

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