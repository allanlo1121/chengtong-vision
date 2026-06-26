// providers/workspace/TunnelWorkspaceProvider.tsx
"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface TunnelWorkspaceScope {
  tunnelId: string;
  tunnelName: string;

  projectId?: string | null;
  projectName?: string | null;

  tbmId?: string | null;
  tbmName?: string | null;

  totalRing?: number | null;

  startDate?: string | null;
  endDate?: string | null;
}

interface TunnelWorkspaceContextValue {
  scope: TunnelWorkspaceScope;
  tunnelOptions: TunnelWorkspaceScope[];
}

const TunnelWorkspaceContext = createContext<TunnelWorkspaceContextValue | null>(null);

interface TunnelWorkspaceProviderProps {
  children: ReactNode;
  scope: TunnelWorkspaceScope;
  tunnelOptions?: TunnelWorkspaceScope[];
}

export function TunnelWorkspaceProvider({
  children,
  scope,
  tunnelOptions,
}: TunnelWorkspaceProviderProps) {
  const value = useMemo<TunnelWorkspaceContextValue>(
    () => ({
      scope,
      tunnelOptions: tunnelOptions || [],
    }),
    [scope, tunnelOptions]
  );

  return (
    <TunnelWorkspaceContext.Provider value={value}>{children}</TunnelWorkspaceContext.Provider>
  );
}

export function useTunnelWorkspace() {
  const context = useContext(TunnelWorkspaceContext);

  if (!context) {
    throw new Error("useTunnelWorkspace must be used within TunnelWorkspaceProvider");
  }

  return context;
}
