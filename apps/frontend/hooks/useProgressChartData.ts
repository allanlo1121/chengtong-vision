// hooks/useProgressChartData.ts
"use client";

import { useEffect, useState } from "react";
import { getProgressChartData } from "@/lib/project/progress/dashboard-data";

export type ProgressMode = "day" | "week" | "month";

export interface ITunnelProgressChartData {
    label: string;
    plan: number;
    completed: number;
}



export function useProgressChartData(
    from: Date,
    to: Date,
    mode: ProgressMode,
    tunnelIds: string[],
    refreshToken?: any
) {
    const [data, setData] = useState<ITunnelProgressChartData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!tunnelIds.length) return;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getProgressChartData(from, to, mode, tunnelIds);
                console.log("ProgressChartData", result);
                
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [from, to, mode, tunnelIds,refreshToken]);

    return { data, loading, error };
}
