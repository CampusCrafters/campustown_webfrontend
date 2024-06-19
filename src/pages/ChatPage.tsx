import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactCard from "../components/ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllUsers } from "@/redux/usersActions";
import axios from "axios";

const ChatPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserConversations, setSelectedUserConversations] = useState(
    []
  );

  useEffect(() => {
    dispatch(fetchAllUsers() as any);
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelect = async (contactName: string) => {
    setSelectedUser(contactName);
    const selectedUserConversations = await axios.get(
      `http://localhost:3000/chat/:${contactName}`,
      {
        withCredentials: true,
      }
    );
    console.log(selectedUserConversations);
    setSelectedUserConversations(selectedUserConversations.data);
  };

  interface conversation {
    from: string;
    to: string;
    message: string;
    timestamp: string;
  }

  return (
    <div className="flex gap-5">
      <ScrollArea className="h-[100vh] w-[20%] rounded-md border p-4">
        <input
          type="text"
          placeholder="Search for users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border"
        />
        {filteredUsers.map((user) => (
          <ContactCard
            key={user.user_id}
            user={user}
            onClick={() => handleSelect(user.name)}
          />
        ))}
      </ScrollArea>
      <ScrollArea className="h-[100vh] w-[80%] rounded-md border p-4 flex flex-col-reverse overflow-y-auto">
        <div className="h-screen w-4/5 rounded-md border p-4 flex flex-col overflow-y-auto">
          <div className="flex-1 flex flex-col-reverse overflow-y-auto">
            {selectedUser === "" ? (
              <p className="text-center text-gray-500">
                Select a user to start chatting
              </p>
            ) : (
              <div>
                <p className="text-center font-bold text-lg mb-4">
                  {selectedUser}
                </p>
                {selectedUserConversations &&
                selectedUserConversations.length > 0 ? (
                  selectedUserConversations.map(
                    (conversation: conversation, index) => (
                      <div
                        key={index}
                        className="mb-4 p-3 rounded-lg border bg-white shadow-sm"
                      >
                        <p className="text-sm text-gray-500">
                          From:
                          <span className="font-medium">
                            {conversation.from}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          To:
                          <span className="font-medium">{conversation.to}</span>
                        </p>
                        <p className="text-base my-2">{conversation.message}</p>
                        <p className="text-xs text-gray-400">
                          {conversation.timestamp}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <p>No conversations yet. Start chatting!</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {selectedUser && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                Send
              </button>
            </div>
          )}
        </div>{" "}
      </ScrollArea>
    </div>
  );
};

export default ChatPage;
