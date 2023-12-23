/**
 * @fileoverview
 * User context
 *
 * This may be replaced with a more robust authentication system.
 */

import { nanoid } from "nanoid";
import { useCallback } from "react";
import { proxy, useSnapshot } from "valtio";
import { yUsers } from "./yjs";

type User = { id: string | null; name: string };
const user = proxy<User>({ id: null, name: "" });

export function useUser() {
  // const user = useSnapshot(userState);

  const login = useCallback((name: string) => {
    user.id = nanoid();
    user.name = name;
    yUsers[user.id] = user;
    // setAwareness(user);
  }, []);

  const updateName = useCallback((name: string) => {
    if (!user.id) return;
    user.name = yUsers[user.id].name = name;
    // setAwareness(user);
  }, []);

  const logout = useCallback(() => {
    if (!user.id) return;
    delete yUsers[user.id];
    user.id = null;
    // setAwareness(user);
  }, []);

  return { user: useSnapshot(user), login, updateName, logout };
}
