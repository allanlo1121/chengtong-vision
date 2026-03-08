// permission/PermissionProvider.tsx
"use client";

import { createContext, useMemo } from "react";
import { useUser } from "../user/useUser";
import type { PermissionState } from "./types";

export const PermissionContext = createContext<PermissionState | undefined>(undefined);

export function PermissionProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  const permissionSet = useMemo(() => new Set(user.permissions), [user.permissions]);

  const roleSet = useMemo(() => new Set(user.roles), [user.roles]);

  const value: PermissionState = {
    hasPermission: (code) => permissionSet.has(code),
    hasAnyPermission: (codes) => codes.some((c) => permissionSet.has(c)),
    hasRole: (role) => roleSet.has(role),
    isSuperAdmin: roleSet.has("SUPER_ADMIN"),
  };

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}
