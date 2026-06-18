import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import { createClient } from "@/lib/infra/supabase/client";

type TableChange = {
  schema: string;
  table: string;
};

type UseSupabaseRealtimeSWROptions<TData, TFilter> = {
  key: any;
  fetcher: (filter?: TFilter) => Promise<TData>;
  filter?: TFilter;
  realtime?: TableChange[];
  debounceMs?: number;
  enabled?: boolean;
};

export function useSupabaseRealtimeSWR<TData, TFilter = any>(
  options: UseSupabaseRealtimeSWROptions<TData, TFilter>
) {
  const { key, fetcher, filter, realtime = [], debounceMs = 300, enabled = true } = options;

  const supabase = useMemo(() => createClient(), []);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const instanceIdRef = useRef(Math.random().toString(36).slice(2, 10));

  const keyString = useMemo(() => {
    return Array.isArray(key) ? key.join(":") : String(key);
  }, [Array.isArray(key) ? key.join(":") : String(key)]);

  const swrKey = enabled ? key : null;

  const channelName = useMemo(() => {
    const base = keyString.startsWith("realtime:") ? keyString : `realtime:${keyString}`;

    return `${base}:${instanceIdRef.current}`;
  }, [keyString]);

  const realtimeKey = useMemo(() => {
    return realtime.map((r) => `${r.schema}.${r.table}`).join("|");
  }, [realtime]);

  const { data, error, isLoading, mutate } = useSWR(swrKey, () => fetcher(filter), {
    revalidateOnFocus: false,
    dedupingInterval: 10_000,
  });

  useEffect(() => {
    if (!enabled || realtime.length === 0) return;

    console.log("create channel", channelName);

    const channel = supabase.channel(channelName);

    const triggerRefresh = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        console.log("🔴 realtime trigger", channelName);
        mutate();
      }, debounceMs);
    };

    for (const r of realtime) {
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: r.schema,
          table: r.table,
        },
        triggerRefresh
      );
    }

    channel.subscribe((status) => {
      console.log("realtime status", channelName, status);
    });

    return () => {
      console.log("remove channel", channelName);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      supabase.removeChannel(channel);
    };
  }, [enabled, channelName, realtimeKey, debounceMs, mutate, supabase]);

  return {
    data,
    error,
    isLoading,
    loading: isLoading,
    mutate,
  };
}
