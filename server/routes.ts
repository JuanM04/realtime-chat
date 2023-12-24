import Router from "@koa/router";
import {
  ClearChatRequest,
  ClearChatResponse,
  DOCUMENT_NAME,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  MessageRequest,
  MessageResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "@realtime-chat/shared";
import { koaBody } from "koa-body";
import { nanoid } from "nanoid";

import { transact } from "./hocuspocus";

const router = new Router();
const bodyParser = koaBody({ json: true });

router.post("/api/login", bodyParser, async (ctx) => {
  try {
    const { name } = LoginRequest.parse(ctx.request.body);
    const userId = nanoid();
    await transact(({ users }) => users.set(userId, { name }));
    ctx.body = { success: true, userId } satisfies LoginResponse;
  } catch (error) {
    ctx.body = { success: false, error: String(error) } satisfies LoginResponse;
  }
});

router.post("/api/update-user", bodyParser, async (ctx) => {
  try {
    const { userId, ...data } = UpdateUserRequest.parse(ctx.request.body);
    await transact(({ users }) => users.set(userId, data));
    ctx.body = { success: true } satisfies UpdateUserResponse;
  } catch (error) {
    ctx.body = {
      success: false,
      error: String(error),
    } satisfies UpdateUserResponse;
  }
});

router.post("/api/logout", bodyParser, async (ctx) => {
  try {
    // const { userId } = LogoutRequest.parse(ctx.request.body);
    ctx.body = { success: true } satisfies LogoutResponse;
  } catch (error) {
    ctx.body = {
      success: false,
      error: String(error),
    } satisfies LogoutResponse;
  }
});
``;

router.post("/api/send-message", bodyParser, async (ctx) => {
  try {
    const { userId, content } = MessageRequest.parse(ctx.request.body);
    await transact(({ messages }) =>
      messages.push([{ userId, content, createdAt: Date.now() }])
    );
    ctx.body = { success: true } satisfies MessageResponse;
  } catch (error) {
    ctx.body = {
      success: false,
      error: String(error),
    } satisfies MessageResponse;
  }
});

router.post("/api/clear-chat", bodyParser, async (ctx) => {
  try {
    ClearChatRequest.parse(ctx.request.body);
    await transact(({ messages }) => messages.delete(0, messages.length));
    ctx.body = { success: true } satisfies ClearChatResponse;
  } catch (error) {
    ctx.body = {
      success: false,
      error: String(error),
    } satisfies ClearChatResponse;
  }
});

export { router };
