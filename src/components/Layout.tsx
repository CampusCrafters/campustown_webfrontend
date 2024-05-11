import { useState } from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [activeTab, setActiveTab] = useState("Projects");
  return (
    <div>
      <TopBar activeTab={activeTab}/>
      <div className="flex-grow max-w-full flex justify-center overflow-auto pt-[5rem]">
        <Outlet />
      </div>
      <BottomBar activeTab={activeTab}
        onTabClick={(tabName) => setActiveTab(tabName)}/>
    </div>
  );
};

export default Layout;