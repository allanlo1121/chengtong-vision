// providers/workspace/TunnelWorkspaceProvider.tsx
"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface TunnelWorkspaceTunnel {
  id: string;
  name: string;

  projectId?: string | null;
  projectName?: string | null;

  tbmId?: string | null;
  tbmName?: string | null;

  totalRing?: number | null;

  startDate?: string | null;
  endDate?: string | null;
}

interface TunnelWorkspaceContextValue {
  tunnel: TunnelWorkspaceTunnel;
  tunnelId: string;
  projectId?: string | null;
  tbmId?: string | null;
}

const TunnelWorkspaceContext = createContext<TunnelWorkspaceContextValue | null>(null);

interface TunnelWorkspaceProviderProps {
  children: ReactNode;
  tunnel: TunnelWorkspaceTunnel;
}

export function TunnelWorkspaceProvider({ children, tunnel }: TunnelWorkspaceProviderProps) {
  const value = useMemo<TunnelWorkspaceContextValue>(
    () => ({
      tunnel,
      tunnelId: tunnel.id,
      projectId: tunnel.projectId,
      tbmId: tunnel.tbmId,
    }),
    [tunnel]
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
