import MemberCard from "@/components/MemberCard";

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
