import Layout from "../components/Layout";
import useTokenVerification from "../hooks/auth/useTokenVerification";

const Dashboard = () => {
  const isLoading = useTokenVerification();

  return (
    <>
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      {!isLoading && (
        <Layout>
          <div className="max-w-full flex justify-center">Dashboard</div>
        </Layout>
      )}
    </>
  );
};

export default Dashboard;
