const ListingTypePill = ({ type }: { type: string }) => {
  return <div style={pillStyles}>{type}</div>;
};

export default ListingTypePill;

const pillStyles: React.CSSProperties = {
  cursor: "pointer",
  width: "94px",
  height: "24.83px",
  flexShrink: 0,
  borderRadius: "17px",
  background: "#4d4d50",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#D7D7D7",
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: 400,
};
