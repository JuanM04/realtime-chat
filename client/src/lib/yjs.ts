import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useState } from "react";
import { YArrayEvent } from "yjs";

const provider = new HocuspocusProvider({
  url: `ws://${window.location.hostname}:1234`,
  name: "group-chat",
});

type Message = { userId: string; content: string };
type MessageHanlder = (event: YArrayEvent<Message>) => void;

const yMessages = provider.document.getArray<Message>("messages");
export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handler: MessageHanlder = () => {
      setMessages(yMessages.toArray());
    };

    yMessages.observe(handler);
    return () => yMessages.unobserve(handler);
  }, [messages]);

  const sendMessage = (content: string) => {
    yMessages.push([{ userId: "1", content }]);
  };

  return [messages, sendMessage] as const;
}
