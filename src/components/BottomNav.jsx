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
        background: "#ffffff",
        borderTop: "1px solid #BBD7C0",
        display: "flex",
        zIndex: 50,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.04)"
      }}
    >
      {tabs.map((tab) => {
        const selected = active === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "9px 2px",
              border: "none",
              background: selected ? "#E8F6E8" : "transparent",
              cursor: "pointer",
              color: selected ? "#168A3A" : "#64736A",
              borderTop: `3px solid ${selected ? "#168A3A" : "transparent"}`,
              marginTop: -1,
              fontFamily: "inherit",
              fontSize: 10,
              fontWeight: 800
            }}
          >
            <span style={{ fontSize: 21 }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}