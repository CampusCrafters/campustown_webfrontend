import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PostIcon from "../assets/icons/post-icon.svg";
import MenuButton from "../components/custom-ui/menu-button";
import ListingTypePill from "../components/custom-ui/listing-type-pill";

const HomeLayout = () => {
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
            title="explore all"
            active={activeTab === "explore-all"}
            onClick={() => {
              setActiveTab("explore-all");
              navigate("/explore-all");
            }}
          />
          <MenuButton
            title="my listings"
            active={activeTab === "my-listings"}
            onClick={() => {
              setActiveTab("my-listings");
              navigate("/my-listings");
            }}
          />
        </div>
        <div
          className="flex gap-5 mt-4 pl-5 mw-[100vw] overflow-x-auto hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ListingTypePill type="Projects" />
          <ListingTypePill type="Internships" />
          <ListingTypePill type="Ideas" />
          <ListingTypePill type="Hackathons" />
          <ListingTypePill type="Contests" />
        </div>
        <div className="h-[73vh] w-full rounded-md mt-4 overflow-scroll">
          <Outlet />
        </div>
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
            <DropdownMenuItem>Startup Idea</DropdownMenuItem>
            <DropdownMenuItem>Event</DropdownMenuItem>
            <DropdownMenuItem>Workshop</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HomeLayout;
