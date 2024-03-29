import React from "react";

interface SideBarProps {
  buttons: string[]; // Array of button labels
  onButtonClick: (buttonLabel: string) => void; // Function to handle button click
}

const SideBar: React.FC<SideBarProps> = ({ buttons, onButtonClick }) => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <button className="w-full py-1 px-1 text-lg text-white bg-gray-700 hover:bg-gray-600 rounded-md transition duration-300">
          Username
        </button>{" "}
        <button className="w-full py-1 px-1 text-lg text-white bg-gray-700 hover:bg-gray-600 rounded-md transition duration-300">
          Post a new project
        </button>
      </div>
      <ul className="flex-grow flex flex-col justify-between py-4">
        {buttons.map((buttonLabel, index) => (
          <li key={index}>
            <button
              className="w-full py-3 px-6 text-lg text-white bg-gray-700 hover:bg-gray-600 rounded-md transition duration-300"
              onClick={() => onButtonClick(buttonLabel)}
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
