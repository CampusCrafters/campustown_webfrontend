import { To, useNavigate } from "react-router-dom";
import HomeButtonActive from "../assets/icons/home-icon.svg";
import ChatIcon from "../assets/icons/chat-icon.svg";
import ApplicationIcon from "../assets/icons/applications-icon.svg";
import EventsIcon from "../assets/icons/events-icon.svg";

const BottomBar = ({
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
      <div
        className="fixed flex items-center justify-between bottom-0 w-full text-white text-center h-[60px]"
        style={bottomBarStyles}
      >
        <div onClick={() => handleTabClick("/explore-all", "Projects")}>
          <img src={HomeButtonActive} alt="home icon" />
        </div>
        <div
          onClick={() => handleTabClick("/myApplications", "My Applications")}
        >
          <img src={ApplicationIcon} alt="Folder Icon" />
        </div>
        <div onClick={() => handleTabClick("/chat", "chat")}>
          <img src={ChatIcon} alt="Chat Icon" />
        </div>
        <div onClick={() => handleTabClick("/events", "Events")}>
          <img src={EventsIcon} alt="Events Icon" />
        </div>
      </div>
    </>
  );
};

export default BottomBar;

const bottomBarStyles: React.CSSProperties = {
  background: "black",
  boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.25)",
  padding: "0 30px",
};
