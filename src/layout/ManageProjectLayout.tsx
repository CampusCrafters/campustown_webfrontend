import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PostIcon from "../assets/icons/post-icon.svg";
import MenuButton from "../components/custom-ui/menu-button";

const ManageProjectLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === "/explore-all") return "explore-all";
    if (path === "/my-listings") return "my-listings";
    return "explore-all"; // default tab
  });

  useEffect(() => {
    const path = location.pathname;
    if (path === "/explore-all") setActiveTab("explore-all");
    if (path === "/my-listings") setActiveTab("my-listings");
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="py-[5rem]">
        <div className="flex gap-2 justify-center mt-3">
          <MenuButton
            title="edit project"
            active={activeTab === "explore-all"}
            onClick={() => {
              setActiveTab("explore-all");
              navigate("/explore-all");
            }}
          />
          <MenuButton
            title="members"
            active={activeTab === "my-listings"}
            onClick={() => {
              setActiveTab("my-listings");
              navigate("/my-listings");
            }}
          />
          <MenuButton
            title="applicants"
            active={activeTab === "my-listings"}
            onClick={() => {
              setActiveTab("my-listings");
              navigate("/my-listings");
            }}
          />
        </div>
        <ScrollArea className="h-[80vh] w-full rounded-md pt-4">
          <Outlet />
        </ScrollArea>
      </div>
      <BottomBar />
      <div className="fixed bottom-[80px] right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>
              <img src={PostIcon} alt="Add Icon" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/postProject")}>
              Project
            </DropdownMenuItem>
            <DropdownMenuItem>Internship</DropdownMenuItem>
            <DropdownMenuItem>Startup Idea</DropdownMenuItem>
            <DropdownMenuItem>Event</DropdownMenuItem>
            <DropdownMenuItem>Workshop</DropdownMenuItem>
            <DropdownMenuItem>Hackathon</DropdownMenuItem>
            <DropdownMenuItem>Contest</DropdownMenuItem>
            <DropdownMenuItem>CTF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ManageProjectLayout;
