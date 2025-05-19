import { createClient } from "@/utils/supabase/server";
import { startOfDay, endOfDay,format } from "date-fns";
import {
    getStartOfYear,
    getStartOfMonth,
    getStartOfWeek,
} from "@/utils/dateFormat";
import { CardStats } from "./types"





// export async function fetchCardData() {
//     const supabase = await createClient();

//     try {
//         // 查询工程项目信息，仅选择需要的字段，并按编号排序
//         const tunnelCountPromise = supabase
//             .from("tunnels")
//             .select("*", {
//                 count: "exact",
//             })
//             .in("status", ["NotStarted", "InProgress", "Suspended"]);
//         // .order("id", { ascending: true });

//         const completedTunnelCountPromise = supabase
//             .from("tunnels")
//             .select("*", { count: "exact" })
//             .eq("status", "Completed")
//             .gte("actual_breakthrough_date", getStartOfYear().toISOString())


//         const allRingCountOfYearPromise = supabase
//             .rpc("get_yearly_max_ring_end", { year_start: getStartOfYear() });

//         const startRingCountOfWeekPromise = supabase
//             .from("tunnel_daily_progress")
//             .select("ring_start")
//             .gte("progress_at", startOfDay(getStartOfWeek()).toISOString())
//             .lte("progress_at", endOfDay(getStartOfWeek()).toISOString());

//         const startRingCountOfMonthPromise = supabase
//             .from("tunnel_daily_progress")
//             .select("ring_start")
//             .gte("progress_at", startOfDay(getStartOfMonth()).toISOString())
//             .lte("progress_at", endOfDay(getStartOfMonth()).toISOString());

//         const startRingCountOfYearPromise = supabase
//             .from("tunnel_daily_progress")
//             .select("ring_start")
//             .gte("progress_at", startOfDay(getStartOfYear()).toISOString())
//             .lte("progress_at", endOfDay(getStartOfYear()).toISOString());


//         const [
//             tunnelCount,
//             completedTunnelCount,
//             startRingCountOfWeek,
//             startRingCountOfMonth,
//             startRingCountOfYear,
//             allRingCountOfYear] = await Promise.all([
//                 tunnelCountPromise,
//                 completedTunnelCountPromise,
//                 startRingCountOfWeekPromise,
//                 startRingCountOfMonthPromise,
//                 startRingCountOfYearPromise,
//                 allRingCountOfYearPromise
//             ]);
//         // 处理查询结果

//         const startRingCountOfWeekData = startRingCountOfWeek?.data?.reduce((sum, row) => sum + (row.ring_start || 0), 0);
//         const startRingCountOfMonthData = startRingCountOfMonth?.data?.reduce((sum, row) => sum + (row.ring_start || 0), 0);
//         const startRingCountOfYearData = startRingCountOfYear?.data?.reduce((sum, row) => sum + (row.ring_start || 0), 0);
//         const allRingCountOfYearData = allRingCountOfYear?.data?.reduce((sum, row) => sum + (row.max_ring_end || 0), 0);
//         const tunnelCountData = tunnelCount?.count || 0;
//         const completedTunnelCountData = completedTunnelCount?.count || 0;
//         console.log(
//             "tunnelCount:", tunnelCountData,
//             "completedTunnelCount:", completedTunnelCountData,
//             "startRingCountOfWeekData:", startRingCountOfWeekData,
//             "startRingCountOfMonthData:", startRingCountOfMonthData,
//             "startRingCountOfYearData:", startRingCountOfYearData,
//             "allRingCountOfYearData:", allRingCountOfYearData
//         );



//         return {
//             tunnelCount: tunnelCountData,
//             completedTunnelCount: completedTunnelCountData,
//             ringCountOfWeek: allRingCountOfYear ?? 0 - startRingCountOfWeekData ?? 0,
//             ringCountOfMonth: allRingCountOfYear ?? 0 - startRingCountOfMonthData ?? 0,
//             ringCountOfYear: allRingCountOfYear ?? 0 - startRingCountOfYearDatav ?? 0,
//         }



//     } catch (error) {
//         console.error("Database Error:", error);
//         throw new Error("Failed to fetch projects.");
//     }

// }


async function fetchStartRingSumBetween(supabase, from: Date, to: Date): Promise<number> {
    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("ring_start")
        .gte("progress_at", startOfDay(from).toISOString())
        .lte("progress_at", endOfDay(to).toISOString());

    if (error) throw error;
    return data.reduce((sum, row) => sum + (row.ring_start || 0), 0);
}

export async function fetchCardData(): Promise<CardStats> {
    const supabase = await createClient();

    try {
        const startOfYear = getStartOfYear();
        const startOfMonth = getStartOfMonth();
        const startOfWeek = getStartOfWeek();

        const [
            tunnelCount,
            completedTunnelCount,
            allRingCountOfYear,
            startRingCountOfWeekData,
            startRingCountOfMonthData,
            startRingCountOfYearData
        ] = await Promise.all([
            supabase
                .from("tunnels")
                .select("id", { count: "exact" })
                .in("status", ["NotStarted", "InProgress", "Suspended"]),

            supabase
                .from("tunnels")
                .select("id", { count: "exact" })
                .eq("status", "Completed")
                .gte("actual_breakthrough_date", startOfYear.toISOString()),

            supabase.rpc("get_yearly_max_ring_end", { year_start: startOfYear }),

            fetchStartRingSumBetween(supabase, startOfWeek, startOfWeek),
            fetchStartRingSumBetween(supabase, startOfMonth, startOfMonth),
            fetchStartRingSumBetween(supabase, startOfYear, startOfYear),
        ]);

        const totalMaxRing = allRingCountOfYear.data?.reduce(
            (sum, row) => sum + (row.max_ring_end || 0),
            0
        ) ?? 0;

        return {
            tunnelCount: tunnelCount.count || 0,
            completedTunnelCount: completedTunnelCount.count || 0,
            ringCountOfWeek: totalMaxRing - startRingCountOfWeekData,
            ringCountOfMonth: totalMaxRing - startRingCountOfMonthData,
            ringCountOfYear: totalMaxRing - startRingCountOfYearData,
        };
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch card data.");
    }
}





type TunnelProgress = {
    ring_start: number | null;
    ring_end: number | null;
};

export async function fetchDayRingsSum(
    day: Date
): Promise<number> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("ring_start, ring_end")
        .gte("progress_at", startOfDay(day).toISOString())
        .lte("progress_at", endOfDay(day).toISOString());

    if (error) throw error;

    return data.reduce((sum: number, row: TunnelProgress) => {
        const start = typeof row.ring_start === "number" ? row.ring_start : null;
        const end = typeof row.ring_end === "number" ? row.ring_end : null;

        if (start !== null && end !== null && end >= start) {
            return sum + (end - start);
        }

        return sum;
    }, 0);
}

export async function getDailyProgressChartData(from: Date, to: Date): Promise<any[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("progress_at, ring_start, ring_end,plan_ring_count")
        .gte("progress_at", startOfDay(from).toISOString())
        .lte("progress_at", endOfDay(to).toISOString());
    if (error) throw error;
   // 聚合为每日
  const grouped: Record<string, { plan: number; completed: number }> = {};

  data.forEach((row) => {
    const date = new Date(row.progress_at);
    const key = format(date, "yyyy-MM-dd");

    if (!grouped[key]) grouped[key] = { plan: 0, completed: 0 };
    grouped[key].plan += row.plan_ring_count ?? 0;
    if (row.ring_end != null && row.ring_start != null) {
      grouped[key].completed += row.ring_end - row.ring_start;
    }
  });

  return Object.entries(grouped).map(([label, { plan, completed }]) => ({
    label,
    plan,
    completed,
  }));
}