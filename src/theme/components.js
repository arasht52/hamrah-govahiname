import { COLORS } from "./colors";

export const page = {
  display: "flex",
  flexDirection: "column",
  gap: 14
};

export const card = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 20,
  padding: 18
};

export const heroCard = {
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 22,
  padding: 20,
  boxShadow: "0 8px 24px rgba(22,138,58,0.08)"
};

export const softCard = {
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  borderRadius: 16,
  padding: 14
};

export const badge = {
  display: "inline-block",
  background: COLORS.cardSoft,
  border: `1px solid ${COLORS.borderSoft}`,
  color: COLORS.green,
  borderRadius: 18,
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 950
};

export const pageTitle = {
  margin: "0 0 8px",
  color: COLORS.text,
  fontSize: 24,
  fontWeight: 950
};

export const sectionTitle = {
  margin: "0 0 12px",
  color: COLORS.green,
  fontSize: 16,
  fontWeight: 950
};

export const mutedText = {
  color: COLORS.muted,
  lineHeight: 1.9,
  fontSize: 14,
  margin: 0
};

export const primaryButton = {
  width: "100%",
  background: COLORS.green,
  border: "none",
  borderRadius: 16,
  padding: "14px 0",
  color: COLORS.white,
  fontWeight: 950,
  fontFamily: "inherit",
  cursor: "pointer"
};

export const secondaryButton = {
  width: "100%",
  background: COLORS.white,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 16,
  padding: "14px 0",
  color: COLORS.green,
  fontWeight: 950,
  fontFamily: "inherit",
  cursor: "pointer"
};

export const dangerButton = {
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