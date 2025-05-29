// hooks/useCardProgress.ts
"use client";

import { useEffect, useState } from "react";
import { fetchCardDataForTunnels } from "@/lib/project/progress/dashboard-data";

interface CardProgress {
  ringCountOfDay: number;
  planCountOfDay: number;
  ringCountOfWeek: number;
  planCountOfWeek: number;
  ringCountOfMonth: number;
  planCountOfMonth: number;
  ringCountOfYear: number;
  planCountOfYear: number;
}

export function useTotalTunnelProgress(tunnels: { id: string }[], refreshToken?: any) {
  const [data, setData] = useState<CardProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tunnels.length) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCardDataForTunnels(tunnels.map(t => t.id));
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tunnels, refreshToken]);

  return { data, loading, error };
}
