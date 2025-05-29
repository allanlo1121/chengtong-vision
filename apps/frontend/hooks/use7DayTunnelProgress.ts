"use client";

import { useEffect, useState } from "react";
import { get7DayTunnelProgressSummary } from "@/lib/project/progress/dashboard-data";

interface TunnelInfo {
  id: string;
  shortName: string;
}

export function use7DayTunnelProgress(tunnelInfos: TunnelInfo[], refreshToken?: any) {
  const [data, setData] = useState<ReturnType<typeof get7DayTunnelProgressSummary> extends Promise<infer R> ? R : never>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    if (!tunnelInfos.length) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await get7DayTunnelProgressSummary(tunnelInfos);
        setData(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tunnelInfos, refreshToken]); // 监听 tunnelInfos 和 refreshToken 的变化

  return { data, loading, error };
}
