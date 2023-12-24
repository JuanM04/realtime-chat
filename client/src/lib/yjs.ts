/**
 * @fileoverview
 * Yjs-related code.
 */

import { HocuspocusProvider } from "@hocuspocus/provider";
import {
  DOCUMENT_NAME,
  MESSAGES_NAME,
  PORT,
  USER_DATA_NAME,
  type Message,
  type UserData,
} from "@realtime-chat/shared";
import { proxy, useSnapshot } from "valtio";
import { bind } from "valtio-yjs";

export const yProvider = new HocuspocusProvider({
  url: `ws://${window.location.hostname}:${PORT}`,
  name: DOCUMENT_NAME,
});

const yUsers = proxy<Record<string, UserData>>({});
bind(yUsers, yProvider.document.getMap(USER_DATA_NAME));
export const useUsers = () => useSnapshot(yUsers);

const yMessages = proxy<Message[]>([]);
bind(yMessages, yProvider.document.getArray(MESSAGES_NAME));
export const useMessages = () => useSnapshot(yMessages);
