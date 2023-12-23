import { Header } from "./Header";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";

export function Chat() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Messages />
      <MessageInput />
    </div>
  );
}
