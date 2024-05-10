import { useNavigate } from "react-router-dom";
import ProjectIcon from "../assets/icons/ProjectIcon.svg";
import CollegeIcon from "../assets/icons/CollegeIcon.svg";
import WorkIcon from "../assets/icons/WorkIcon.svg";
import CalenderIcon from "../assets/icons/CalenderIcon.svg";

const BottomBar = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="fixed flex items-center justify-between bottom-0 w-full bg-black text-white px-5 py-4 text-center rounded-t-lg">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/projects')}>
          <img
            src={ProjectIcon}
            className="w-6 h-6"
            alt="Project Icon"
          />
          <span>Projects</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/college')}>
          <img
            src={CollegeIcon}
            className="w-6 h-6 cursor-pointer"
            alt="College Icon"
          />
          <span>College</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/work')}>
          <img
            src={WorkIcon}
            className="w-6 h-6 cursor-pointer"
            alt="Work Icon"
          />
          <span>Work</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/events')}>
          <img
            src={CalenderIcon}
            className="w-6 h-6 cursor-pointer"
            alt="Calender Icon"
          />
          <span>Events</span>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
