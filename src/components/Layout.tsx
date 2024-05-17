import { useState } from "react";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("Projects");
  return (
    <div className="flex flex-col h-screen">
      <TopBar activeTab={activeTab} />
      <div className="py-[5rem]">
      <ScrollArea className="h-[75vh] w-full rounded-md border p-4">
        <Outlet />
      </ScrollArea>


      </div>
      <BottomBar
        activeTab={activeTab}
        onTabClick={(tabName) => setActiveTab(tabName)}
      />
    </div>
  );
};

export default Layout;
