// components/ProgressRefreshProvider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

const ProgressRefreshContext = createContext<{ refreshCount: number }>({ refreshCount: 0 });

export function useProgressRefresh() {
  return useContext(ProgressRefreshContext);
}

export function ProgressRefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel("progress_update_channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tunnel_daily_progress",
        },
        (payload) => {
          console.log("🚨 监听到进度更新：", payload);
          setRefreshCount((count) => count + 1); // 通知所有子组件刷新
        }
      )
       // 监听 tunnels 表新增、更新、删除
    .on(
      "postgres_changes",
      {
        event: "*", // 可选 "INSERT" | "UPDATE" | "DELETE"
        schema: "public",
        table: "tunnels",
      },
      (payload) => {
        console.log("🚨 监听到 tunnels 表变更：", payload);
        setRefreshCount((count) => count + 1);
      }
    )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <ProgressRefreshContext.Provider value={{ refreshCount }}>
      {children}
    </ProgressRefreshContext.Provider>
  );
}
