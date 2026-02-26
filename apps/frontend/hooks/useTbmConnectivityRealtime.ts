import { useEffect, useState, useCallback } from "react";
import { useRealtimeEventBus } from "@/core/event/RealtimeEventBus";

export function useTbmConnectivityRealtime() {
  const { lastEvent } = useRealtimeEventBus();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    console.log("useTbmConnectivityRealtime");

    setLoading(true);
    try {
      const res = await fetch("/api/realtime/tbm-connectivity", {
        cache: "no-store",
      });
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }, []);

  // 首次加载
  useEffect(() => {
    console.log("🔔 first mounted:");
    refetch();
  }, [refetch]);

  // 事件驱动刷新
  useEffect(() => {
    console.log("🔔 lastEvent changed:", lastEvent);
    if (
      lastEvent?.type === "tbm_connectivity_changed" ||
      lastEvent?.type === "tbm_assignment_changed"
    ) {
      refetch();
    }
  }, [lastEvent, refetch]);

  return {
    data,
    loading,
    refetch,
  };
}
