import { Database } from "@hocuspocus/extension-database";
import { Logger } from "@hocuspocus/extension-logger";
import { Hocuspocus } from "@hocuspocus/server";
import {
  DOCUMENT_NAME,
  MESSAGES_NAME,
  Message,
  USER_DATA_NAME,
  UserData,
} from "@realtime-chat/shared";
import Y from "yjs";

let mainDocument: Uint8Array = Y.encodeStateAsUpdate(new Y.Doc());

export const hocuspocus = new Hocuspocus({
  debounce: 0,
  extensions: [
    new Logger(),
    new Database({
      async fetch({ documentName }) {
        if (documentName !== DOCUMENT_NAME) {
          throw new Error("Invalid document name");
        }
        return mainDocument;
      },
      async store({ documentName, state }) {
        if (documentName !== DOCUMENT_NAME) {
          throw new Error("Invalid document name");
        }
        mainDocument = new Uint8Array(state);
      },
    }),
  ],

  async onConnect(data) {
    data.connection.readOnly = true;
  },
});

export async function transact(
  handler: (obj: { messages: Y.Array<Message>; users: Y.Map<UserData> }) => void
) {
  const connection = await hocuspocus.openDirectConnection(DOCUMENT_NAME);
  await connection.transact((doc) => {
    const messages = doc.getArray<Message>(MESSAGES_NAME);
    const users = doc.getMap<UserData>(USER_DATA_NAME);
    handler({ messages, users });
  });
  await connection.disconnect();
}
