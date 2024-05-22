import { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactCard from '../components/ContactCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchAllUsers } from '@/redux/usersActions';

const ChatPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const dummyList = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers() as any);
  }, [dispatch]);

  return (
    <div className="flex gap-5">
      <ScrollArea className="h-[100vh] w-[20%] rounded-md border p-4">
        <input
          type="text"
          placeholder="Search for users"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border"
        />
        {users.map (user => ( 
          <ContactCard key={user.user_id} user={user} />
        ))}
      </ScrollArea>
      <ScrollArea className="h-[100vh] w-[80%] rounded-md border p-4">
        {dummyList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatPage;