import SideBar from "../components/SideBar";
import useTokenVerification from "../hooks/auth/useTokenVerification";

const Dashboard = () => {
  const isLoading = useTokenVerification();

  const handleButtonClick = (buttonLabel: string) => {
    console.log(`Button "${buttonLabel}" clicked`);
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      ) : (
        <SideBar
          buttons={["Explore Projects", "Projects Showcase", "Alumni Stories"]}
          onButtonClick={handleButtonClick}
        />
      )}
    </>
  );
};

export default Dashboard;
