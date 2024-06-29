import ProfileIcon from "./custom-ui/profile-icon";
import YearPill from "./custom-ui/year-pill";
import line from '../assets/icons/line1.svg';
import dropdownArrow from "../assets/icons/chevron-down.svg";

const MemberCard: React.FC<MemberCardProps> = ({ src, name, batch, role }) => {
  return (
    <div style={memberCardStyles}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProfileIcon src={src} size={"small"} />
        <div style={nameStyles}>{name}</div>
        <YearPill batch={batch} />
      </div>
      <img src={dropdownArrow} alt="dropdown arrow" />   
      <div style={{display: 'flex', flexDirection: 'column', fontFamily: 'Raleway', color: 'white', alignItems: 'center'}}>
        <p style={{fontSize: '11px', fontWeight: 400}}>role</p>
        <p style={{fontSize: '13px', fontWeight: 700}}>{role}</p>
      </div>
    </div>
  );
};

export default MemberCard;

const memberCardStyles: React.CSSProperties = {
  width: "100%",
  height: "71px",
  padding: "15px",
  backgroundColor: "#151515",
  borderRadius: "14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const nameStyles: React.CSSProperties = {
  color: "#D1C7C7",
  fontFamily: "Arial",
  fontWeight: 400,
  fontSize: "13px",
  alignContent: "center",
};

interface MemberCardProps {
  src: string;
  name: string;
  batch: number;
  role: string;
}
