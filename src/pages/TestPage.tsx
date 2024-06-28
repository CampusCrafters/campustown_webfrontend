import MemberCard from "@/components/MemberCard";
import FilterButton from "@/components/custom-ui/filter-button";
import MenuButton from "@/components/custom-ui/menu-button";
import ProfileIcon from "@/components/custom-ui/profile-icon";
import YearPill from "@/components/custom-ui/year-pill";

const TestPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-black p-[15px]">
      <div className="flex">
        <MemberCard src={"https://campusconnectapp.s3.ap-south-1.amazonaws.com/RamKishore+Profile+Picture.jpg"} name={"M RAMKISHORE"} batch={2023} role={"Full Stack Developer"}/>
      </div>
    </div>
  );
};

export default TestPage;
