/**
 * @fileoverview
 * Here we define the types and endpoints that are shared between the client and
 * server. This file is imported by both the client and server, so we can be
 * sure that the types and endpoints are always in sync.
 *
 * Part of this could be replaced by a library like tRPC to support more
 * endpoints with minimal boilerplate.
 */

import { z } from "zod";

// Types
export const Message = z.object({
  userId: z.string(),
  content: z.string(),
  createdAt: z.number(),
});
export type Message = z.infer<typeof Message>;

export const UserData = z.object({
  name: z.string(),
});
export type UserData = z.infer<typeof UserData>;

// Endpoints
const ErrorResponse = z.object({
  success: z.literal(false),
  error: z.string(),
});

export const LoginRequest = z.object({ name: z.string() });
export type LoginRequest = z.infer<typeof LoginRequest>;
export const LoginResponse = z
  .object({ success: z.literal(true), userId: z.string() })
  .or(ErrorResponse);
export type LoginResponse = z.infer<typeof LoginResponse>;
export type LoginQuery = [LoginRequest, LoginResponse];

export const MessageRequest = z.object({
  userId: z.string(),
  content: z.string(),
});
export type MessageRequest = z.infer<typeof MessageRequest>;
export const MessageResponse = z
  .object({ success: z.literal(true) })
  .or(ErrorResponse);
export type MessageResponse = z.infer<typeof MessageResponse>;
export type MessageQuery = [MessageRequest, MessageResponse];

export const ClearChatRequest = z.object({});
export type ClearChatRequest = z.infer<typeof ClearChatRequest>;
export const ClearChatResponse = z
  .object({ success: z.literal(true) })
  .or(ErrorResponse);
export type ClearChatResponse = z.infer<typeof ClearChatResponse>;
export type ClearChatQuery = [ClearChatRequest, ClearChatResponse];

export const UpdateUserRequest = z.object({
  userId: z.string(),
  name: z.string(),
});
export type UpdateUserRequest = z.infer<typeof UpdateUserRequest>;
export const UpdateUserResponse = z
  .object({ success: z.literal(true) })
  .or(ErrorResponse);
export type UpdateUserResponse = z.infer<typeof UpdateUserResponse>;
export type UpdateUserQuery = [UpdateUserRequest, UpdateUserResponse];

export const LogoutRequest = z.object({ userId: z.string() });
export type LogoutRequest = z.infer<typeof LogoutRequest>;
export const LogoutResponse = z
  .object({ success: z.literal(true) })
  .or(ErrorResponse);
export type LogoutResponse = z.infer<typeof LogoutResponse>;
export type LogoutQuery = [LogoutRequest, LogoutResponse];

// Constants
export const PORT = 1234 as const;
export const DOCUMENT_NAME = "group-chat" as const;
export const MESSAGES_NAME = "messages" as const;
export const USER_DATA_NAME = "users" as const;
