import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactCard from "../components/ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchAllUsers } from "@/redux/usersActions";
import axios from "axios";

const ChatPage = () => {
  const chat_server_http = import.meta.env.VITE_CHATSERVER_HTTP_URL;
  const chat_server_ws = import.meta.env.VITE_CHATSERVER_WS_URL;
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserConversations, setSelectedUserConversations] = useState<
    conversation[]
  >([]);
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    dispatch(fetchAllUsers() as any);
  }, [dispatch]);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift(); // Add null check using '?'
      return null;
    };
    const token = getCookie("jwt");
    console.log(token);    
    console.log(token);
    const socket = new WebSocket(`${chat_server_ws}?token=${token}`);
    socket.onopen = () => {
      console.log("Connected to web-socket server");
      setSocket(socket);
    };
    socket.onclose = () => {
      console.log("Disconnected from web-socket server");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSend = async () => {
    if (newMessage === "") {
      alert("Message cannot be empty");
      return;
    }
    if (!socket) {
      alert("Socket not connected");
      return;
    }

    const message = {
      to: selectedUser,
      message: newMessage,
    };

    // Capture the current timestamp before clearing newMessage
    const timestamp = new Date().toISOString();

    socket.send(JSON.stringify(message)); // Convert message object to JSON string before sending

    setNewMessage("");

    const newConversation = {
      from: "me",
      to: selectedUser,
      message: newMessage,
      timestamp: timestamp, // Use the captured timestamp
    };
    console.log(newConversation);

    setSelectedUserConversations([
      ...selectedUserConversations,
      newConversation,
    ]);
  };

  const handleSelect = async (contactName: string) => {
    setSelectedUser(contactName);

    const selectedUserConversations = await axios.get(
      `${chat_server_http}/chat/:${contactName}`,
      {
        withCredentials: true,
      }
    );
    console.log(selectedUserConversations);
    setSelectedUserConversations(selectedUserConversations.data);

    if (socket) {
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(data);

        const newConversation = {
          from: data.from,
          to: data.to,
          message: data.message,
          timestamp: data.timestamp,
        };
        console.log(newConversation);

        setSelectedUserConversations((prevConversations) => [
          ...prevConversations,
          newConversation,
        ]);
      };
    }
  };

  interface conversation {
    from: string;
    to: string;
    message: string;
    timestamp: string;
  }

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleOnChange = (e: any) => {
    e.preventDefault();
    setNewMessage(e.target.value);
  };

  if (!socket) {
    return <div>Connecting to the web-socket server...</div>;
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
                {(selectedUserConversations || []).length > 0 ? (
                  (selectedUserConversations || []).map(
                    (conversation: conversation, index) => (
                      <div
                        key={index}
                        className={`mb-4 p-3 rounded-lg border shadow-sm max-w-[70%] ${
                          conversation.from === selectedUser
                            ? "bg-white self-start text-left"
                            : "bg-blue-100 self-end text-right"
                        }`}
                      >
                        <p className="text-base my-2">{conversation.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(conversation.timestamp).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            }
                          )}
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
                onChange={(e) => handleOnChange(e)}
                className="flex-grow px-4 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatPage;
