import React from "react";
import { useGetHomeChats } from "../query/home.query";
import { useWebSocket } from "../components/ws-provider";
import { wsContext } from "../contexts";

interface Props {}

function ChatHome(props: Props) {
  const { data: homeChats, isLoading: isChatsLoading } = useGetHomeChats();
  const [activeUserId, setActiveUserId] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const wsData = React.useContext(wsContext);
  const socket = wsData!.socket;

  const {} = props;
  const activeChats =
    homeChats && activeUserId ? (homeChats as any)[activeUserId] : [];

  const handleTextMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputRef.current?.value;
    if (text && socket) {
      console.log('sending message')
      socket.send(
        JSON.stringify({ data: text, targetUserId: 3, type: "message" })
      );
    }
  };
  return (
    <div className="flex h-screen items-stretch">
      <div className="w-64 bg-green-300">
        {Object.keys(homeChats ?? {}).map((userId) => {
          return (
            <button
              onClick={() => setActiveUserId(Number(userId))}
              className="text-xl py-2 text-center bg-gray-400 mb-2 block w-full"
            >
              User-{userId}
            </button>
          );
        })}
      </div>
      <div className="grow bg-blue-300 flex flex-col">
        {activeChats.map((chat: any) => {
          console.log({ chat });

          if (chat.type == "received")
            return <div className="self-end">{chat.msg}</div>;
          else if (chat.type == "sent")
            return <div className="self-start">{chat.msg}</div>;
        })}

        {activeUserId && (
          <div className="h-8 bg-white justify-self-end mt-auto mb-4">
            <form onSubmit={handleTextMsg}>
              <input className="border" type="text" ref={inputRef} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatHome;
