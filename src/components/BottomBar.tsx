import { To, useNavigate } from "react-router-dom";
import CalenderIcon from "../assets/icons/CalenderIcon.svg";
import AddIcon from "../assets/icons/Menu 3.svg";
import FolderIcon from "../assets/icons/Menu 6.svg";
import HomeButtonActive from '../assets/icons/Menu 1.svg';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BottomBar = ({
  activeTab,
  onTabClick,
}: {
  activeTab: string;
  onTabClick: (tabName: string) => void;
}) => {
  const navigate = useNavigate();

  const handleTabClick = (path: To, tabName: string) => {
    onTabClick(tabName);
    navigate(path);
  };

  return (
    <>
      <div className="fixed flex items-center justify-between bottom-0 w-full text-white text-center h-[86px]" style={bottomBarStyles}>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "Projects" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/explore-all", "Projects")}
        >
          <img src={HomeButtonActive} className="w-[81px] h-[46px]" alt="Project Icon" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={`flex flex-col items-center cursor-pointer ${
                activeTab === "Post a Project" ? "text-blue-500" : ""
              }`}
            >
              <img src={AddIcon} className="w-[82px] h-[78px]" alt="Add Icon" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleTabClick("/postProject", "Post a Project")}
            >
              Project
            </DropdownMenuItem>
            <DropdownMenuItem>Internship</DropdownMenuItem>
            <DropdownMenuItem>Startup Idea</DropdownMenuItem>
            <DropdownMenuItem>Event</DropdownMenuItem>
            <DropdownMenuItem>Workshop</DropdownMenuItem>
            <DropdownMenuItem>Hackathon</DropdownMenuItem>
            <DropdownMenuItem>Contest</DropdownMenuItem>
            <DropdownMenuItem>CTF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            activeTab === "My Applications" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("/myApplications", "My Applications")}
        >
          <img src={FolderIcon} className="w-[81px] h-[46px]" alt="Folder Icon" />
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

const bottomBarStyles: React.CSSProperties = { 
  background: 'black',
  boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.25)',
  padding: '0 12px',
}
