import { useNavigate } from "react-router-dom";
import HomeButton from "../assets/icons/bottom-bar/home.svg";
import HomeButtonActive from "../assets/icons/bottom-bar/home-active.svg";
import ApplicationIcon from "../assets/icons/bottom-bar/applications.svg";
import ApplicationIconActive from "../assets/icons/bottom-bar/applications-active.svg";
import Heart from "../assets/icons/bottom-bar/heart.svg";
import HeartActive from "../assets/icons/bottom-bar/heart-active.svg";
import EventsIcon from "../assets/icons/bottom-bar/events.svg";
import EventsIconActive from "../assets/icons/bottom-bar/events-active.svg";
import { useState, useEffect } from "react";

const BottomBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const path = location.pathname;
    if (path === "/explore-all") return "explore-all";
    if (path === "/my-listings") return "my-listings";
    if (path === "/myApplications") return "myApplications";
    if (path === "/events") return "events";
    if (path === "/chat") return "chat";
    return "explore-all";
  });

  useEffect(() => {
    const path = location.pathname;
    setActiveTab(path.substring(1));
  }, []);

  return (
    <div
      className="fixed flex items-center justify-between bottom-0 w-full text-white text-center h-[7vh]"
      style={bottomBarStyles}
    >
      <div
        className="cursor-pointer"
        onClick={() => {
          setActiveTab("explore-all");
          navigate("/explore-all");
        }}
      >
        {activeTab === "explore-all" ? (
          <img src={HomeButtonActive} alt="home icon" />
        ) : (
          <img src={HomeButton} alt="home icon" />
        )}
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          setActiveTab("myApplications");
          navigate("/myApplications");
        }}
      >
        {activeTab === "myApplications" ? (
          <img src={ApplicationIconActive} alt="Folder Icon" />
        ) : (
          <img src={ApplicationIcon} alt="Folder Icon" />
        )}
      </div>
      {/* <div
        className="cursor-pointer"
        onClick={() => {
          setActiveTab("chat");
          navigate("/chat");
        }}
      >
        {activeTab === "chat" ? (
          <img src={ChatIconActive} alt="Chat Icon" />
        ) : (
          <img src={ChatIcon} alt="Chat Icon" />
        )}
      </div> */}
      <div
        className="cursor-pointer"
        onClick={() => {
          setActiveTab("findAMatch");
          navigate("/findAMatch");
        }}
      >
        {activeTab === "findAMatch" ? (
          <img src={HeartActive} alt="heart icon" />
        ) : (
          <img src={Heart} alt="heart icon" />
        )}
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          setActiveTab("events");
          navigate("/events");
        }}
      >
        {activeTab === "events" ? (
          <img src={EventsIconActive} alt="Events Icon" />
        ) : (
          <img src={EventsIcon} alt="Events Icon" />
        )}
      </div>
    </div>
  );
};

export default BottomBar;

const bottomBarStyles: React.CSSProperties = {
  background: "black",
  boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.25)",
  padding: "0 30px",
};
