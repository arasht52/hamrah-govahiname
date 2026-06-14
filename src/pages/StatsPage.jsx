const hero = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 22,
  padding: 20,
  marginBottom: 16,
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

const badge = {
  display: "inline-block",
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  color: COLORS.green,
  borderRadius: 18,
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 950,
  marginBottom: 12
};

const title = {
  margin: "0 0 8px",
  color: COLORS.text,
  fontSize: 24,
  fontWeight: 950
};

const subtitle = {
  color: COLORS.muted,
  lineHeight: 1.9,
  fontSize: 13,
  margin: 0
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginBottom: 16
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

const listCard = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 18,
  padding: 16,
  marginBottom: 16
};

const sectionTitle = {
  margin: "0 0 12px",
  color: COLORS.green,
  fontSize: 15,
  fontWeight: 950
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