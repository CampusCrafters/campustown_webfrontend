import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/SearchIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
    const navigate = useNavigate();
    return (
        <nav className="fixed w-full bg-black text-white flex items-center justify-between px-4 py-3 rounded-b-lg">
            <img src={SearchIcon} className="cursor-pointer"></img>
            <div>TopBar</div>
            <Avatar className="cursor-pointer" onClick={() => {navigate("/profile")}}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </nav>
    );
};

export default TopBar;
