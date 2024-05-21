import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/SearchIcon.svg";
import BellIcon from "../assets/icons/BellIcon.svg";
import ChatIcon from "../assets/icons/ChatIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile } from "../redux/profileActions";
import { RootState } from "../redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { setSearchQuery } from "@/redux/searchSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  const [clicked, setClicked] = useState(false);
  const location = useLocation();
  const showSearchIcon = [
    "/projects",
    "/myApplications",
    "/events",
    "/chat",
  ].includes(location.pathname);
  const activeTab = location.pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    window.location.href = "/";
  };

  const handleSearch = (e: any) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <nav className="fixed w-full bg-black text-white flex items-center justify-between px-4 py-3 rounded-b-lg">
      {showSearchIcon && (
        <div className="flex gap-2 items-center">
          <img
            src={SearchIcon}
            className="cursor-pointer"
            onClick={() => setClicked(!clicked)}
          />
          <input
            onChange={handleSearch}
            type="text"
            className={`${
              clicked ? "opacity-100 w-96" : "opacity-0 w-0"
            } text-black px-3 py-2 rounded-2xl transition-all duration-300 ease-in-out`}
          />
        </div>
      )}
      <div className="font-bold text-lg">{activeTab}</div>
      <div className="flex gap-5">
        <img
          src={ChatIcon}
          onClick={() => {
            navigate("/chat");
          }}
          className="cursor-pointer"
        ></img>
        <img src={BellIcon} className="cursor-pointer"></img>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              {profile && profile.profile_picture ? (
                <AvatarImage src={profile.profile_picture} />
              ) : (
                <AvatarFallback>CN</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TopBar;
