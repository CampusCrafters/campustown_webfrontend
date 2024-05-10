import BottomBar from "./BottomBar";
import TopBar from "./TopBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBar />
      <div className="flex-growmax-w-full flex justify-center overflow-auto pt-[5rem]">{children}</div>
      <BottomBar />
    </div>
  );
};

export default Layout;
