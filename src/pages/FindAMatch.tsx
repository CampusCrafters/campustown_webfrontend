import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import {
  fetchAllUsers,
  fetchLikedUsers,
  fetchMatchedUsers,
} from "@/redux/users/usersActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactCard from "@/components/ContactCard";

const FindAMatch = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users || []);
  const likedUsers = useSelector(
    (state: RootState) => state.users.likedUsers || []
  );
  const matchedUsers = useSelector(
    (state: RootState) => state.users.matchedUsers || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllUsers() as any);
        await dispatch(fetchLikedUsers() as any);
        await dispatch(fetchMatchedUsers() as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  function handleSelect(name: string) {
    console.log(name);
  }

  const allUsers =
    users?.filter(
      (user) => !likedUsers?.includes(user) && !matchedUsers?.includes(user)
    ) || [];
  const filteredUsers =
    allUsers?.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <Tabs defaultValue="all-users" className="w-full">
      <TabsList className="mb-2 bg-black w-full">
        <TabsTrigger className="w-[33%]" value="all-users">
          All Users
        </TabsTrigger>
        <TabsTrigger className="w-[33%]" value="liked-users">
          Liked Users
        </TabsTrigger>
        <TabsTrigger className="w-[33%]" value="matches">
          Matches
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all-users">
        <div className="h-[100vh] w-full overflow-scroll">
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
        </div>
      </TabsContent>
      <TabsContent value="liked-users">
        <div className="h-[100vh] w-full overflow-scroll">
          {likedUsers?.length === 0 && (
            <h2>Don't be shy and start liking and find a match.</h2>
          )}
          {likedUsers?.map((user) => (
            <ContactCard
              key={user.user_id}
              user={user}
              onClick={() => handleSelect(user.name)}
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="matches">
        <div className="h-[100vh] w-full overflow-scroll">
          {matchedUsers?.length === 0 && (
            <h2 className="text-white text-center">
              You have no matches at the moment.
            </h2>
          )}
          {matchedUsers?.map((user) => (
            <ContactCard
              key={user.user_id}
              user={user}
              onClick={() => handleSelect(user.name)}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FindAMatch;
