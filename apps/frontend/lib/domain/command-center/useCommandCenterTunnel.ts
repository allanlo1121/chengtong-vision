// hooks/use-command-center-summary.ts

"use client";

import * as React from "react";
import { createClient } from "@/lib/infra/supabase/client";
import { fetchCommandCenterTunnel } from "@/lib/domain/command-center/client.service";
import { type TunnelRuntimeCardData } from "@/lib/domain/command-center/types";

function useDebouncedCallback(callback: () => void, delay = 500) {
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);
}

export function useCommandCenterTunnel(initialData: TunnelRuntimeCardData[]) {
  const supabase = React.useMemo(() => createClient(), []);

  const [data, setData] = React.useState<TunnelRuntimeCardData[] | null>(initialData);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const refetch = React.useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);

      const next = await fetchCommandCenterTunnel();
      setData(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取指挥中心隧道数据失败");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const debouncedRefetch = useDebouncedCallback(refetch, 500);

  React.useEffect(() => {
    refetch();

    const channel = supabase
      .channel("command-center-active-tables")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "eqp",
          table: "tbm_connection_status",
        },
        debouncedRefetch
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "eqp",
          table: "tbm_phase_active",
        },
        debouncedRefetch
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "eqp",
          table: "tbm_assignments",
        },
        debouncedRefetch
      )
      // .on(
      //     "postgres_changes",
      //     {
      //         event: "*",
      //         schema: "warning",
      //         table: "warning_events",
      //     },
      //     debouncedRefetch
      // )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, refetch, debouncedRefetch]);

  return {
    data,
    loading,
    refreshing,
    error,
    refetch,
  };
}
