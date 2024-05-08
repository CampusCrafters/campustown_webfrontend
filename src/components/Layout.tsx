import BottomBar from "./BottomBar";
import TopBar from "./TopBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBar />
      <main className="flex-grow">{children}</main>
      <BottomBar />
    </div>
  );
};

export default Layout;
