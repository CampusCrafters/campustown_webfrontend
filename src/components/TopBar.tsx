import SearchIcon from "../assets/icons/SearchIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
    return (
        <nav className="fixed w-full bg-black text-white flex items-center justify-between px-4 py-3 rounded-b-lg">
            <img src={SearchIcon}></img>
            <div>TopBar</div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </nav>
    );
};

export default TopBar;
