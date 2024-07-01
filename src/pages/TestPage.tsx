import TopBar from "@/components/TopBar";

const TestPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-black">
      <div className="flex">
        <TopBar />
        <div className="mt-20 ml-80 "></div>
      </div>
    </div>
  );
};

export default TestPage;
