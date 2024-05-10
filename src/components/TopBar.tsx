import SearchIcon from '../assets/icons/SearchIcon.svg';

const TopBar = () => {
    return (
        <nav className="h-16 bg-gray-800 text-white flex items-center justify-between px-4">
            <div className="flex-grow">
                <img src={SearchIcon}></img>
                TopBar</div>
        </nav>
    );
};

export default TopBar;
