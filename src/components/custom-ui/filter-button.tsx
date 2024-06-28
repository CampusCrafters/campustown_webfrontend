import React, { useState } from "react";
import dropdownArrow from "../../assets/icons/chevron-down.svg";

const FilterButton: React.FC<FilterButtonProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={filterButtonStyles} onClick={toggleMenu}>
        <div>{title}</div>
        <img src={dropdownArrow} alt="dropdown arrow" />
      </div>
      {isOpen && (
        <div style={{border: '0.5px solid #9C9C9C', borderRadius: '9px', width: '100px', color: 'white', fontFamily: 'Raleway', fontSize: '10px', padding: '2px', marginTop: '2px'}}>
          {options.map((option, index) => (
            <div key={index} className="flex gap-1 m-1">
              <input type="checkbox" value={option} />
              <p >{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;

// Props interface
interface FilterButtonProps {
  title: string;
  options: string[];
}

const filterButtonStyles: React.CSSProperties = {
  border: "1px solid #9C9C9C",
  width: "95px",
  height: "37px",
  borderRadius: "9px",
  fontFamily: "Raleway",
  fontSize: "12px",
  color: "#ffffff", // White text color
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "10px",
  paddingRight: "10px",
  cursor: "pointer",
  position: "relative", // Ensure relative positioning
};
