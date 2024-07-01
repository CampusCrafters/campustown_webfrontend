import { Outlet } from "react-router-dom";
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
  const handleTabClick = (path: string, title: string) => {
    // Implement your navigation and tab click handling logic here
    console.log(`Navigating to ${path} with title ${title}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="py-[5rem]">
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
            <DropdownMenuItem
              onClick={() => handleTabClick("/postProject", "Post a Project")}
            >
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

export default Layout;
