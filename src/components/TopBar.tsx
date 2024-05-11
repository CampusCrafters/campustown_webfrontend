import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/SearchIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../redux/profileActions";
import { RootState } from "../redux/store";

const TopBar = ({activeTab}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  return (
    <nav className="fixed w-full bg-black text-white flex items-center justify-between px-4 py-3 rounded-b-lg">
      <img src={SearchIcon} className="cursor-pointer"></img>
      <div className="font-bold text-lg">{activeTab}</div>
      <Avatar
        className="cursor-pointer"
        onClick={() => {
          navigate("/profile");
        }}
      >
        {profile && profile.profile_picture ? (
          <AvatarImage src={profile.profile_picture} />
        ) : (
          <AvatarFallback>CN</AvatarFallback>
        )}
      </Avatar>
    </nav>
  );
};

export default TopBar;
