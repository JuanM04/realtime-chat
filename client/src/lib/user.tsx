/**
 * @fileoverview
 * User context
 *
 * This may be replaced with a more robust authentication system.
 */

import type {
  LoginQuery,
  LogoutQuery,
  UpdateUserQuery,
} from "@realtime-chat/shared";
import { proxy, useSnapshot } from "valtio";

import { sendApi } from "./api";
import { useUsers } from "./yjs";

const user = proxy<{ id: string | null }>({ id: null });

export function useUser() {
  const { id } = useSnapshot(user);
  const users = useUsers();

  if (id && users[id]) return { id, ...users[id] };
  else return null;
}

export async function login(name: string) {
  const res = await sendApi<LoginQuery>("login", { name });
  user.id = res.userId;
  // setAwareness(user);
}

export async function updateSettings({ name }: { name: string }) {
  await sendApi<UpdateUserQuery>("update-user", { userId: user.id!, name });
  // setAwareness(user);
}

export async function logout() {
  await sendApi<LogoutQuery>("logout", { userId: user.id! });
  user.id = null;
  // setAwareness(user);
}
