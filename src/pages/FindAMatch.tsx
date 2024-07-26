import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactCard from "@/components/ContactCard";
import { RootState } from "@/redux/store";
import {
  fetchAllUsers,
  fetchLikedUsers,
  fetchMatchedUsers,
} from "@/redux/users/usersActions";

const FindAMatch = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const likedUsers = useSelector((state: RootState) => state.users.likedUsers);
  const matchedUsers = useSelector((state: RootState) => state.users.matchedUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all-users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchLikedUsers() as any);
        await dispatch(fetchMatchedUsers() as any);
        await dispatch(fetchAllUsers() as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  function handleSelect(name: string) {
    console.log(name);
  }

  const likedAndMatchedUserIds = new Set([
    ...likedUsers.map((user) => user.user_id),
    ...matchedUsers.map((user) => user.user_id),
  ]);

  const allUsers = users.filter((user) => !likedAndMatchedUserIds.has(user.user_id)) || [];
  const filteredUsers = allUsers?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  const renderContent = () => {
    switch (selectedTab) {
      case "all-users":
        return (
          <>
            <input
              type="text"
              placeholder="Search for users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[99vw] mb-3 bg-[#262626] text-white px-3 py-2 rounded-lg border border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:border-blue-500"
            />
            {filteredUsers.map((user) => (
              <ContactCard
                key={user.user_id}
                user={user}
                onClick={() => handleSelect(user.name)}
              />
            ))}
          </>
        );
      case "liked-users":
        return (
          <>
            {likedUsers.map((user) => (
              <ContactCard
                key={user.user_id}
                user={user}
                onClick={() => handleSelect(user.name)}
              />
            ))}
          </>
        );
      case "matches":
        return (
          <>
            {matchedUsers.map((user) => (
              <ContactCard
                key={user.user_id}
                user={user}
                onClick={() => handleSelect(user.name)}
              />
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 bg-black w-full">
        <button
          className={`w-[33%] ${selectedTab === "all-users" ? "bg-gray-800" : "bg-black"} text-white`}
          onClick={() => setSelectedTab("all-users")}
        >
          All Users
        </button>
        <button
          className={`w-[33%] ${selectedTab === "liked-users" ? "bg-gray-800" : "bg-black"} text-white`}
          onClick={() => setSelectedTab("liked-users")}
        >
          Liked Users
        </button>
        <button
          className={`w-[33%] ${selectedTab === "matches" ? "bg-gray-800" : "bg-black"} text-white`}
          onClick={() => setSelectedTab("matches")}
        >
          Matches
        </button>
      </div>
      <div className="h-[100vh] w-full overflow-scroll">
        {renderContent()}
      </div>
    </div>
  );
};

export default FindAMatch;
