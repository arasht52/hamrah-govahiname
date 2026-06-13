export default function BottomNav({ active, onSelect }) {
  const tabs = [
    { id: "home", icon: "🏠", label: "خانه" },
    { id: "quiz", icon: "📝", label: "آزمون" },
    { id: "laws", icon: "📚", label: "قوانین" },
    { id: "fahrschulen", icon: "🏫", label: "آموزشگاه" },
    { id: "ai", icon: "🤖", label: "دستیار" }
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0A2540",
        borderTop: "1px solid #1e3a5f",
        display: "flex",
        zIndex: 50
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "10px 4px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: active === tab.id ? "#FFB340" : "#8B949E",
            borderTop: `2px solid ${
              active === tab.id ? "#FF9500" : "transparent"
            }`,
            marginTop: -1,
            fontFamily: "inherit",
            fontSize: 11,
            fontWeight: 600
          }}
        >
          <span style={{ fontSize: 22 }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}