import { ScrollArea } from "@/components/ui/scroll-area";

const ChatPage = () => {
  const dummyList = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="flex gap-5">
      <ScrollArea className="h-[100vh] w-[20%] rounded-md border p-4">
        {dummyList.map((item, index) => (
          <div key={index}>{item}</div>
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
