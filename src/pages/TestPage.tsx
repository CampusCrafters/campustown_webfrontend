import TopBar from "../layout/TopBar";

const TestPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-black">
      <div className="flex"></div>

      <TopBar />
      <BottomBar />
    </div>
  );
};

export default TestPage;
