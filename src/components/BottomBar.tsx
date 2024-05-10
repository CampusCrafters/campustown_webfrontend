import { GrProjects } from "react-icons/gr";
import CollegeIcon from "../assets/icons/CollegeIcon.svg";
import WorkIcon from "../assets/icons/WorkIcon.svg";
import CalenderIcon from "../assets/icons/CalenderIcon.svg";
import GroupIcon from "../assets/icons/GroupIcon.svg";

const BottomBar = () => {
  return (
    <>
      <div className="fixed flex items-center justify-between bottom-0 w-full bg-black text-white px-5 py-4 text-center rounded-t-lg">
        <GrProjects />
        <img src={CollegeIcon} className="w-6 h-6" alt="College Icon" />
        <img src={WorkIcon} className="w-6 h-6" alt="Work Icon" />
        <img src={CalenderIcon} className="w-6 h-6" alt="Calender Icon" />
        <img src={GroupIcon} className="w-6 h-6" alt="Group Icon" />
      </div>
    </>
  );
};

export default BottomBar;
