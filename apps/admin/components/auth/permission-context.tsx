"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";

interface PermissionContextType {
  permissions: string[];
  hasPermission: (code: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType>({
  permissions: [],
  hasPermission: () => false,
});

export function PermissionProvider({
  permissions,
  children,
}: {
  permissions: string[];
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      permissions,
      hasPermission: (code: string) => permissions.includes(code),
    }),
    [permissions]
  );

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function usePermission() {
  return useContext(PermissionContext);
}
