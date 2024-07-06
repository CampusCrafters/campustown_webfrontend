import React from "react";
import ProfileIcon from "./custom-ui/profile-icon";
import YearPill from "./custom-ui/year-pill";
import dropdownArrow from "../assets/icons/chevron-down.svg";

const ApplicantCard: React.FC<
  MemberCardProps & {
    onActionSelect: (action: string) => void;
    selectedAction: string;
    isDropdownOpen: boolean;
  }
> = ({
  src,
  name,
  batch,
  role,
  onActionSelect,
  selectedAction,
  isDropdownOpen,
}) => {
  return (
    <div style={applicantCardStyles}>
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Raleway",
          color: "white",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "11px", fontWeight: 400 }}>role</p>
        <p style={{ fontSize: "13px", fontWeight: 700 }}>{role}</p>
        <div className="relative">
          <button
            onClick={() => onActionSelect(selectedAction ? "" : "Expand")}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {selectedAction ? "Collapse" : "Expand"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              {/* Icon */}
            </svg>
          </button>

          {isDropdownOpen && selectedAction && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => onActionSelect("Select")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Select
                </button>
                <button
                  onClick={() => onActionSelect("Shortlist")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => onActionSelect("Reject")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;

const applicantCardStyles: React.CSSProperties = {
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
