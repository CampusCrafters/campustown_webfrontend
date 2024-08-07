import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomBar from "./BottomBar";
import TopBar from "./TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PostIcon from "../assets/icons/post-icon.svg";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showPostIcon = ["/myApplications", "/events", "/profile"].includes(
    location.pathname
  );

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="py-[5rem]">
        <ScrollArea className="h-[80vh] w-full rounded-md pt-4 bg-black">
          <Outlet />
        </ScrollArea>
      </div>
      <BottomBar />
      <div className="fixed bottom-[80px] right-4 z-50">
        {showPostIcon && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
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
              <DropdownMenuItem onClick={() => navigate('/postEvent')}>Event</DropdownMenuItem>
              <DropdownMenuItem>Workshop</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Layout;
