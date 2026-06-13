import { LAWS } from "../data/laws";
import LawCard from "../components/LawCard";
import SectionTitle from "../components/SectionTitle";

export default function LawsPage() {
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg,#1a2f52,#0A2540)",
          border: "1px solid #1e3a5f",
          borderRadius: 20,
          padding: 20,
          marginBottom: 20
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 900,
            marginBottom: 10
          }}
        >
          📚 قوانین رانندگی آلمان
        </h2>

        <div
          style={{
            color: "#8B949E",
            lineHeight: 1.9,
            fontSize: 13
          }}
        >
          توضیح ساده قوانین مهم رانندگی آلمان به زبان فارسی همراه با تفاوت‌های
          فرهنگی و اصطلاحات آلمانی.
        </div>
      </div>

      <SectionTitle>
        📖 قوانین مهم
      </SectionTitle>

      {LAWS.map((law) => (
        <LawCard key={law.id} law={law} />
      ))}
    </div>
  );
}