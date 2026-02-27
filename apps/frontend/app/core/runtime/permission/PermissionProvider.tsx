// permission/PermissionProvider.tsx

import { createContext, useContext, useMemo } from "react";
import { useUser } from "../user/useUser";

interface PermissionContextType {
  can: (code: string) => boolean;
  hasRole: (role: string) => boolean;
}

export const PermissionContext = createContext<PermissionContextType | null>(null);

export function PermissionProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();

  const permissionSet = useMemo(() => new Set(user.permissions), [user.permissions]);

  const roleSet = useMemo(() => new Set(user.roles), [user.roles]);

  const value = {
    can: (code: string) => permissionSet.has(code),
    hasRole: (role: string) => roleSet.has(role),
  };

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

// export const usePermission = () => {
//   const ctx = useContext(PermissionContext)
//   if (!ctx) throw new Error("PermissionProvider missing")
//   return ctx
// }
