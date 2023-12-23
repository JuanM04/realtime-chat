import { HocuspocusProvider } from "@hocuspocus/provider";
import { proxy } from "valtio";
import { bind } from "valtio-yjs";
import { useProxy } from "valtio/utils";

const provider = new HocuspocusProvider({
  url: `ws://${window.location.hostname}:1234`,
  name: "group-chat",
});

export type UserType = { name: string };
export const yUsers = proxy<Record<string, UserType>>({});
bind(yUsers, provider.document.getMap("users"));
export const useUsers = () => useProxy(yUsers);

export type MessageType = {
  userId: string;
  content: string;
  createdAt: number;
};
export const yMessages = proxy<MessageType[]>([]);
bind(yMessages, provider.document.getArray("messages"));
export const useMessages = () => useProxy(yMessages);

export function setAwareness({
  userId,
  name,
}: {
  userId: string;
  name: string;
}) {
  provider.setAwarenessField("user", { userId, name });
}
