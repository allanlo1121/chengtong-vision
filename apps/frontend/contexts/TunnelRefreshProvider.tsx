// components/TunnelRefreshProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

const TunnelRefreshContext = createContext<{ tunnelRefreshCount: number }>({ tunnelRefreshCount: 0 });

export function useTunnelRefresh() {
  return useContext(TunnelRefreshContext);
}

export function TunnelRefreshProvider({ children }: { children: ReactNode }) {
  const [tunnelRefreshCount, setTunnelRefreshCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("tunnels_update_channel")
      .on(
        "postgres_changes",
        {
          event: "*", // 可指定 INSERT/UPDATE/DELETE
          schema: "public",
          table: "tunnels",
        },
        (payload) => {
          console.log("🚨 tunnels 表变更：", payload);
          setTunnelRefreshCount((c) => c + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <TunnelRefreshContext.Provider value={{ tunnelRefreshCount}}>
      {children}
    </TunnelRefreshContext.Provider>
  );
}
