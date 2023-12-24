/**
 * @fileoverview
 * Main entrypoint for the server. This file is responsible for setting up the
 * server and handling incoming connections.
 *
 * It uses Koa as the webserver, and koa-easy-ws to handle websocket connections,
 * then passed to Hocuspocus to handle the actual logic.
 */

import cors from "@koa/cors";
import Koa from "koa";
import websocket from "koa-easy-ws";
import type WebSocket from "ws";

import { hocuspocus } from "./hocuspocus";
import { router } from "./routes";
import { PORT } from "@realtime-chat/shared";

const app = new Koa();

app
  .use(cors())
  .use(websocket())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx) => {
  if (ctx.ws) {
    const ws = (await ctx.ws()) as WebSocket;
    hocuspocus.handleConnection(ws, ctx.req);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
