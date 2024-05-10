import SearchIcon from "../assets/icons/SearchIcon.svg";
import { Button } from "@/components/ui/button"

const TopBar = () => {
    return (
        <nav className="fixed w-full bg-gray-800 text-white flex items-center justify-between px-4">
            <img src={SearchIcon}></img>

            <div className="flex-grow">TopBar</div>
            <Button>Click me</Button>

        </nav>
    );
};

export default TopBar;
