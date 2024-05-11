import { To, useNavigate } from "react-router-dom";
import ProjectIcon from "../assets/icons/ProjectIcon.svg";
import CollegeIcon from "../assets/icons/CollegeIcon.svg";
import WorkIcon from "../assets/icons/WorkIcon.svg";
import CalenderIcon from "../assets/icons/CalenderIcon.svg";

const BottomBar = ({ activeTab, onTabClick }: { activeTab: string, onTabClick: (tabName: string) => void }) => {
  const navigate = useNavigate();

  const handleTabClick = (path: To, tabName: string) => {
    onTabClick(tabName);
    navigate(path);
  };

  return (
    <>
      <div className="fixed flex items-center justify-between bottom-0 w-full bg-black text-white px-5 py-4 text-center rounded-t-lg">
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "Projects" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/projects", "Projects")}
        >
          <img src={ProjectIcon} className="w-6 h-6" alt="Project Icon" />
          <span>Projects</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "College" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/college", "College")}
        >
          <img src={CollegeIcon} className="w-6 h-6" alt="College Icon" />
          <span>College</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "Work" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/work", "Work")}
        >
          <img src={WorkIcon} className="w-6 h-6" alt="Work Icon" />
          <span>Work</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "Events" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/events", "Events")}
        >
          <img src={CalenderIcon} className="w-6 h-6" alt="Calender Icon" />
          <span>Events</span>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
