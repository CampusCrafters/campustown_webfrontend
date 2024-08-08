import React, { useState } from "react";
import ProfileIcon from "./custom-ui/profile-icon";
import YearPill from "./custom-ui/year-pill";
import dropdownArrow from "../assets/icons/chevron-down.svg";
import dropdownArrowUp from "../assets/icons/chevron-up.svg";

const ApplicantCard: React.FC<
  MemberCardProps & {
    onActionSelect: (action: string) => void;
    selectedAction: string;
    isDropdownOpen: boolean;
    status: string;
  }
> = ({ src, name, batch, role, onActionSelect, status }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      style={{
        ...applicantCardStyles,
        maxHeight: isExpanded ? "500px" : "71px",
        overflow: isExpanded ? "visible" : "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <ProfileIcon src={src} size={"small"} />
          <div style={nameStyles}>{name}</div>
          <YearPill batch={batch} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Raleway",
            color: "white",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "11px", fontWeight: 400 }}>Role</p>
          <div
            style={{
              width: "70%",
              height: "1px",
              backgroundColor: "white",
              margin: "5px 0",
            }}
          ></div>
          <p style={{ fontSize: "13px", fontWeight: 700 }}>{role}</p>
        </div>

        <img
          src={isExpanded ? dropdownArrowUp : dropdownArrow}
          alt="dropdown arrow"
          onClick={handleToggleExpand}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div style={expandedContentWrapperStyles}>
        <div style={{ ...expandedContentStyles, opacity: isExpanded ? 1 : 0 }}>
          <p style={{ color: "white", marginTop: "10px" }}>
            Additional information about the applicant goes here.
          </p>
          <div className="flex justify-around">
            <button
              onClick={() => onActionSelect("Select")}
              style={selectButtonStyles}
              role="menuitem"
            >
              Select
            </button>
            {status === "shortlisted" && (
              <button
                onClick={() => onActionSelect("shortlist")}
                style={shortlistButtonStyles}
                role="menuitem"
              >
                Shortlist
              </button>
            )}
            <button
              onClick={() => onActionSelect("Reject")}
              style={rejectButtonStyles}
              role="menuitem"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;

const applicantCardStyles: React.CSSProperties = {
  width: "100%",
  maxHeight: "71px",
  padding: "15px",
  backgroundColor: "#151515",
  borderRadius: "14px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "max-height 0.8s ease, padding 0.8s ease",
  overflow: "hidden",
};

const nameStyles: React.CSSProperties = {
  color: "#D1C7C7",
  fontFamily: "Arial",
  fontWeight: 400,
  fontSize: "13px",
  alignContent: "center",
};

const expandedContentWrapperStyles: React.CSSProperties = {
  width: "100%",
  overflow: "hidden",
  transition: "max-height 0.8s ease",
};

const expandedContentStyles: React.CSSProperties = {
  marginTop: "10px",
  backgroundColor: "rgba(38, 38, 38, 1)",
  padding: "10px",
  borderRadius: "10px",
  width: "100%",
  textAlign: "center",
  transition: "opacity 0.8s ease",
  opacity: 0,
};

const selectButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 18px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  backgroundColor: "rgba(0, 170, 91, 1)",
  color: "white",
  marginTop: "10px",
};

const shortlistButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 18px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  border: "1px solid white",
  color: "white",
  marginTop: "10px",
};

const rejectButtonStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "8px 20px",
  fontSize: "12px",
  fontWeight: "medium",
  textTransform: "lowercase",
  borderRadius: "8px",
  backgroundColor: "rgba(211, 69, 96, 1)",
  color: "white",
  marginTop: "10px",
};

interface MemberCardProps {
  src: string;
  name: string;
  batch: number;
  role: string;
}
