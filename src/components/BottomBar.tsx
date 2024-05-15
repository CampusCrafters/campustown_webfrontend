import { To, useNavigate } from "react-router-dom";
import ProjectIcon from "../assets/icons/ProjectIcon.svg";
import CalenderIcon from "../assets/icons/CalenderIcon.svg";
import AddIcon from "../assets/icons/AddIcon.svg";
import FolderIcon from '../assets/icons/FolderIcon.svg';

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
            activeTab === "Post a Project" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/postProject", "Post a Project")}
        >
          <img src={AddIcon} className="w-6 h-6" alt="Add Icon" />
          <span>Post a Project</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "My Applications" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/myApplications", "My Applications")}
        >
          <img src={FolderIcon} className="w-6 h-6" alt="Folder Icon" />
          <span>My applications</span>
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
