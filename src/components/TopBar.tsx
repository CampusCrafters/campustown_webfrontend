import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/SearchIcon.svg";
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
  const activeTab = location.pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  const handleLogout = () => {
    Cookies.remove("jwt");
    window.location.href = "/";
  };

  const handleSearch = (e: any) => { 
    dispatch(setSearchQuery(e.target.value));
  }

  return (
    <nav className="fixed w-full bg-black text-white flex items-center justify-between px-4 py-3 rounded-b-lg">
      <div className="flex gap-2">
        <img src={SearchIcon} className="cursor-pointer" onClick={() => setClicked(!clicked)}></img>
        <input onChange={(e) => handleSearch(e)} type="text" className={`${clicked ? 'block' : 'hidden'} text-black px-3 py-2 rounded-2xl w-96`}></input>
      </div>
      <div className="font-bold text-lg">{activeTab}</div>  
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
    </nav>
  );
};

export default TopBar;
