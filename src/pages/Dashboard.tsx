import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="max-w-full flex justify-center overflow-auto pt-[5rem] ">
          <div className="flex flex-col items-center space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="bg-gray-200 p-4 rounded-md">
                Item {i + 1}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
