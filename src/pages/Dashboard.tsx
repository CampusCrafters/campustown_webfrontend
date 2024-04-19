import SideBar from "../components/SideBar";
import useTokenVerification from "../hooks/auth/useTokenVerification";

const Dashboard = () => {
  const isLoading = useTokenVerification();

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="flex">
          <SideBar
            buttons={["Explore Projects", "Projects Showcase", "Alumni Stories"]}
            onButtonClick={(buttonLabel: string) => {
              // Handle button click
            }}
          />
          <div className="flex-grow p-8">
            <h1 className="text-4xl font-bold mb-8 text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder cards */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-white">Project Title</h2>
                <p className="text-lg text-gray-300">Project description goes here.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-white">Project Title</h2>
                <p className="text-lg text-gray-300">Project description goes here.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-white">Project Title</h2>
                <p className="text-lg text-gray-300">Project description goes here.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
