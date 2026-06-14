export default function BottomNav({ active, onSelect }) {
  const tabs = [
    { id: "home", icon: "🏠", label: "خانه" },
    { id: "quiz", icon: "📝", label: "آزمون" },
    { id: "ai", icon: "🤖", label: "دستیار" },
    { id: "more", icon: "☰", label: "بیشتر" }
  ];

  return (
    <nav style={navStyle}>
      {tabs.map((tab) => {
        const selected = active === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{
              ...btnStyle,
              background: selected ? "#E8F6E8" : "transparent",
              color: selected ? "#168A3A" : "#64736A",
              borderTop: `3px solid ${selected ? "#168A3A" : "transparent"}`
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

const navStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#FFFFFF",
  borderTop: "1px solid #BBD7C0",
  display: "flex",
  zIndex: 50,
  boxShadow: "0 -2px 10px rgba(0,0,0,0.04)"
};

const btnStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  padding: "9px 2px",
  border: "none",
  cursor: "pointer",
  marginTop: -1,
  fontFamily: "inherit",
  fontSize: 10,
  fontWeight: 800
};