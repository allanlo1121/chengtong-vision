// user/UserProvider.tsx
"use client";

import { UserContext } from "./UserContext";
import type { RuntimeUser } from "./types";

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: RuntimeUser;
}) {
  return <UserContext.Provider value={initialUser}>{children}</UserContext.Provider>;
}
