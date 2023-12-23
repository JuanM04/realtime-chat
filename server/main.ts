import { Hocuspocus } from "@hocuspocus/server";
import { Logger } from "@hocuspocus/extension-logger";
import { Doc } from "yjs";

const documents = new Map<string, Doc>();

const server = new Hocuspocus({
  port: 1234,
  extensions: [new Logger()],
  debounce: 0,
  async onStoreDocument(data) {
    documents.set(data.documentName, data.document);
  },

  async onLoadDocument(data): Promise<Doc> {
    if (documents.has(data.documentName)) {
      return documents.get(data.documentName)!;
    } else {
      const doc = new Doc();
      documents.set(data.documentName, doc);
      return doc;
    }
  },
});

server.listen();
