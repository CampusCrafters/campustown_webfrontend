import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import MenuButton from "../components/custom-ui/menu-button";

const ManageProjectLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project_id");
  const projectID = parseInt(projectId || "", 10);


const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes("/editProject")) return "edit project";
    if (path.includes("/members")) return "members";
    if (path.includes("/applicants")) return "applicants";
    return "edit project"; 
});

useEffect(() => {
    const path = location.pathname;
    if (path.includes("/editProject")) setActiveTab("edit project");
    if (path.includes("/members")) setActiveTab("members");
    if (path.includes("/applicants")) setActiveTab("applicants");
}, [location.pathname]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="py-[5rem]">
        <div className="flex gap-2 justify-center mt-3">
          <MenuButton
            title="edit project"
            active={activeTab === "edit project"}
            onClick={() => {
              setActiveTab("edit project");
              navigate("/manageproject/editProject?project_id=" + projectID);
            }}
          />
          <MenuButton
            title="members"
            active={activeTab === "members"}
            onClick={() => {
              setActiveTab("members");
              navigate("/manageproject/members?project_id=" + projectID);
            }}
          />
          <MenuButton
            title="applicants"
            active={activeTab === "applicants"}
            onClick={() => {
              setActiveTab("applicants");
              navigate("/manageproject/applicants?project_id=" + projectID);
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
