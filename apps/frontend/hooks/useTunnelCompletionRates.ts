// hooks/useTunnelProgress.ts
"use client";

import { useEffect, useState } from "react";
import { getTunnelCompletedMap } from "@/lib/project/progress/dashboard-data";

interface TunnelInfo {
  id: string;
  shortName: string;
  total: number;
}

interface TunnelProgress {
  label: string;
  total: number;
  completed: number;
  percentage: number;
}

export function useTunnelCompletionRates(
  tunnels: TunnelInfo[],
  refreshToken?: any,
  options?: {
    sortBy?: "percentage" | "completed";
    limit?: number;
    filterZero?: boolean;
  }
) {
  const [data, setData] = useState<TunnelProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tunnels.length) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const completedMap = await getTunnelCompletedMap(tunnels.map(t => t.id));
        let result = tunnels.map(t => {
          const completed = completedMap[t.id] ?? 0;
          return {
            label: t.shortName,
            total: t.total,
            completed,
            percentage: t.total ? +(completed / t.total * 100).toFixed(1) : 0,
          };
        });

        // ✅ 可选过滤
        if (options?.filterZero) {
          result = result.filter(r => r.completed > 0);
        }

        // ✅ 可选排序
        if (options?.sortBy === "percentage") {
          result.sort((a, b) => b.percentage - a.percentage);
        } else if (options?.sortBy === "completed") {
          result.sort((a, b) => b.completed - a.completed);
        }

        // ✅ 可选截断 Top N
        if (options?.limit) {
          result = result.slice(0, options.limit);
        }

        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tunnels, refreshToken, options?.sortBy, options?.limit, options?.filterZero]);

  return { data, loading, error };
}
