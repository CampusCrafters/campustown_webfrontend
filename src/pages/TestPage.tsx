import ApplicantCard from "@/components/ApplicantCard";
import TopBar from "@/components/TopBar";
import ApplicationCard from "@/components/ApplicationCard";

const TestPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-black">
      <div className="flex"></div>

      <ApplicationCard
        date="23 March 2022"
        name="M RAMKISHORE"
        projectName="React Project"
        status="Accepted"
        role="Designer Role"
      />
    </div>
  );
};

export default TestPage;
