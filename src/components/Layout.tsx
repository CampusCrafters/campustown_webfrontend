import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <TopBar />
      <div className="flex-growmax-w-full flex justify-center overflow-auto pt-[5rem]">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
};

export default Layout;
