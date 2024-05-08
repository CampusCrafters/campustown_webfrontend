import SearchIcon from './assets/SearchIcon.svg';

const TopBar = () => {
    return (
        <nav className="h-16 bg-gray-800 text-white flex items-center justify-between px-4">
            <div className="flex-grow">
                <SearchIcon/>
                TopBar</div>
        </nav>
    );
};

export default TopBar;
