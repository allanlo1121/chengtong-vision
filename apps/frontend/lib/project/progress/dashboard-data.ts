import { createClient } from "@/utils/supabase/client";

import {
    subDays,
    startOfDay,
    endOfDay,
    startOfYear,
    endOfWeek,
    parseISO,
    startOfWeek,
    addWeeks,
    isBefore,
    startOfMonth,
    endOfMonth,
    addMonths,
    format,
} from "date-fns";

import {
    getStartOfYear,
    getStartOfMonth,
    getStartOfWeek,
} from "@/utils/dateFormat";
import { CardStats, ITunnelProgressChartData } from "./types"
import { fetchStartRingSumOfDay, fetchPlanSumBetween } from "./fetchRingAndPlanHelpers";




type TunnelProgress = {
    ring_start: number | null;
    ring_end: number | null;
};

export async function fetchDayRingsSum(
    day: Date
): Promise<number> {
    const supabase = createClient();
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
    const supabase = createClient();
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





export async function getYearToWeekProgress(): Promise<
    { week: string; completed: number; plan: number }[]
> {
    const supabase = createClient();
    const now = new Date();
    const start = startOfWeek(startOfYear(now), { weekStartsOn: 1 }); // 第1周的周一
    const end = endOfWeek(now, { weekStartsOn: 1 }); // 当前周的周日

    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("progress_at, ring_start, ring_end, plan_ring_count")
        .gte("progress_at", start.toISOString())
        .lte("progress_at", end.toISOString());

    if (error) throw error;

    // 按周起始日分组：yyyy-MM-dd => { completed, plan }
    const weeklyMap: Record<string, { completed: number; plan: number }> = {};

    data.forEach((row) => {
        const date = parseISO(row.progress_at);
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const key = format(weekStart, "yyyy-MM-dd");

        const completed =
            row.ring_start != null && row.ring_end != null
                ? row.ring_end - row.ring_start
                : 0;
        const plan = row.plan_ring_count ?? 0;

        if (!weeklyMap[key]) {
            weeklyMap[key] = { completed: 0, plan: 0 };
        }
        weeklyMap[key].completed += completed;
        weeklyMap[key].plan += plan;
    });

    // 排序输出：第X周
    const result: { week: string; completed: number; plan: number }[] = [];
    let cursor = start;
    let weekNumber = 1;

    while (isBefore(cursor, end)) {
        const key = format(cursor, "yyyy-MM-dd");
        const { completed = 0, plan = 0 } = weeklyMap[key] ?? {};
        result.push({
            week: `第${weekNumber}周`,
            completed,
            plan,
        });
        cursor = addWeeks(cursor, 1);
        weekNumber++;
    }

    return result;
}



export async function getYearToMonthProgress(): Promise<
    { month: string; completed: number; plan: number }[]
> {
    const supabase = createClient();
    const now = new Date();
    const start = startOfYear(now);
    const end = endOfMonth(now); // 当前月末

    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("progress_at, ring_start, ring_end, plan_ring_count")
        .gte("progress_at", start.toISOString())
        .lte("progress_at", end.toISOString());

    if (error) throw error;

    const monthlyMap: Record<string, { completed: number; plan: number }> = {};

    data.forEach((row) => {
        const date = parseISO(row.progress_at);
        const monthStart = startOfMonth(date);
        const key = format(monthStart, "yyyy-MM"); // 用于分组

        const completed =
            row.ring_start != null && row.ring_end != null
                ? row.ring_end - row.ring_start
                : 0;
        const plan = row.plan_ring_count ?? 0;

        if (!monthlyMap[key]) {
            monthlyMap[key] = { completed: 0, plan: 0 };
        }
        monthlyMap[key].completed += completed;
        monthlyMap[key].plan += plan;
    });

    // 排序输出：1月、2月...
    const result: { month: string; completed: number; plan: number }[] = [];
    let cursor = start;
    let monthIndex = 1;

    while (isBefore(cursor, end)) {
        const key = format(cursor, "yyyy-MM");
        const { completed = 0, plan = 0 } = monthlyMap[key] ?? {};
        result.push({
            month: `${monthIndex}月`,
            completed,
            plan,
        });
        cursor = addMonths(cursor, 1);
        monthIndex++;
    }

    return result;
}



export type ProgressMode = "day" | "week" | "month";

export async function getProgressChartData(
    from: Date,
    to: Date,
    mode: ProgressMode,
    tunnelIds: string[]
): Promise<ITunnelProgressChartData[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("progress_at, ring_start, ring_end, plan_ring_count, tunnel_id")
        .in("tunnel_id", tunnelIds)
        .gte("progress_at", startOfDay(from).toISOString())
        .lte("progress_at", endOfDay(to).toISOString());

    if (error) throw error;

    const grouped: Record<string, { plan: number; completed: number }> = {};

    data.forEach((row) => {
        const date = parseISO(row.progress_at);
        let key = "";

        switch (mode) {
            case "day":
                key = format(date, "yyyy-MM-dd");
                break;
            case "week": {
                const weekStart = startOfWeek(date, { weekStartsOn: 1 });
                const weekNumber = Math.floor(
                    (Number(weekStart) - Number(startOfWeek(from, { weekStartsOn: 1 }))) /
                    (7 * 24 * 60 * 60 * 1000)
                ) + 1;
                key = `第${weekNumber}周`;
                break;
            }
            case "month":
                key = `${date.getMonth() + 1}月`;
                break;
        }

        if (!grouped[key]) grouped[key] = { plan: 0, completed: 0 };
        grouped[key].plan += row.plan_ring_count ?? 0;
        if (row.ring_end != null && row.ring_start != null) {
            grouped[key].completed += row.ring_end - row.ring_start;
        }
    });

    return Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b, "zh-CN", { numeric: true }))
        .map(([label, { plan, completed }]) => ({ label, plan, completed }));
}



export async function get7DayTunnelProgressSummary(
    tunnelInfos: { id: string; shortName: string }[]
): Promise<{
    tunnel_id: string;
    tunnel_short_name: string;
    sum: number;
    data: { date: string; completed: number }[];
}[]> {
    if (!tunnelInfos.length) return [];

    const supabase = createClient();
    const today = startOfDay(new Date());
    const sevenDaysAgo = subDays(today, 6); // 包括今天共7天

    const tunnelIds = tunnelInfos.map((t) => t.id);

    // ✅ 创建 id -> name 映射
    const tunnelMap = Object.fromEntries(
        tunnelInfos.map((tunnel) => [tunnel.id, tunnel.shortName])
    );

    // ✅ 获取 7 日内进度数据
    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("tunnel_id, progress_at, ring_start, ring_end")
        .in("tunnel_id", tunnelIds)
        .gte("progress_at", sevenDaysAgo.toISOString())
        .lte("progress_at", endOfDay(today).toISOString());

    if (error) throw error;

    // ✅ 聚合数据: { tunnel_id => { date => completed } }
    const grouped: Record<string, Record<string, number>> = {};

    for (const row of data) {
        const date = format(parseISO(row.progress_at), "yyyy-MM-dd");
        const tunnelId = row.tunnel_id;

        const completed =
            row.ring_start != null && row.ring_end != null
                ? row.ring_end - row.ring_start
                : 0;

        if (!grouped[tunnelId]) grouped[tunnelId] = {};
        if (!grouped[tunnelId][date]) grouped[tunnelId][date] = 0;

        grouped[tunnelId][date] += completed;
    }

    // ✅ 构造 7 天日期列表
    const last7Days = Array.from({ length: 7 }, (_, i) =>
        format(subDays(today, 6 - i), "yyyy-MM-dd")
    );

    // ✅ 构建最终返回结构
    const result: {
        tunnel_id: string;
        tunnel_short_name: string;
        sum: number;
        data: { date: string; completed: number }[];
    }[] = [];

    for (const tunnelId of tunnelIds) {
        const tunnelData: { date: string; completed: number }[] = [];
        let sum = 0;

        for (const date of last7Days) {
            const value = grouped[tunnelId]?.[date] ?? 0;
            tunnelData.push({ date, completed: value });
            sum += value;
        }

        result.push({
            tunnel_id: tunnelId,
            tunnel_short_name: tunnelMap[tunnelId] ?? "未知隧道",
            sum,
            data: tunnelData,
        });
    }

    return result;
}


export async function getTunnelCompletedMap(
    tunnelIds: string[]
): Promise<Record<string, number>> {
    if (!tunnelIds.length) return {};

    const supabase = createClient();
    const { data, error } = await supabase
        .from("tunnel_daily_progress")
        .select("tunnel_id, ring_end")
        .in("tunnel_id", tunnelIds)
        .order("ring_end", { ascending: false });

    if (error) throw error;

    const result: Record<string, number> = {};

    for (const row of data) {
        if (row.ring_end != null && !result[row.tunnel_id]) {
            result[row.tunnel_id] = row.ring_end; // ✅ 只保留最大值
        }
    }

    return result;
}


export async function fetchCardDataForTunnels(tunnelIds: string[]): Promise<{
    ringCountOfDay: number;
    planCountOfDay: number;
    ringCountOfWeek: number;
    planCountOfWeek: number;
    ringCountOfMonth: number;
    planCountOfMonth: number;
    ringCountOfYear: number;
    planCountOfYear: number;
}> {
    const supabase = createClient();
    if (!tunnelIds.length) return {
        ringCountOfDay: 0, planCountOfDay: 0,
        ringCountOfWeek: 0, planCountOfWeek: 0,
        ringCountOfMonth: 0, planCountOfMonth: 0,
        ringCountOfYear: 0, planCountOfYear: 0,
    };

    try {
        const today = startOfDay(new Date());
        const startOfWeek = getStartOfWeek();
        const startOfMonth = getStartOfMonth();
        const startOfYear = getStartOfYear();

        // 获取 max ring_end（实际完成）视图中已封装
        const { data: ringMaxData, error: maxError } = await supabase
            .from("v_tunnel_ring_max")
            .select("tunnel_id, max_ring")
            .in("tunnel_id", tunnelIds);

        if (maxError) throw maxError;

        const totalMaxRing = ringMaxData?.reduce((sum, row) => sum + (row.max_ring || 0), 0) ?? 0;

        // 获取每个周期开始日的 ring_start 总和
        const [startDay, startWeek, startMonth, startYear] = await Promise.all([
            fetchStartRingSumOfDay(supabase, today, tunnelIds),
            fetchStartRingSumOfDay(supabase, startOfWeek, tunnelIds),
            fetchStartRingSumOfDay(supabase, startOfMonth, tunnelIds),
            fetchStartRingSumOfDay(supabase, startOfYear, tunnelIds),
        ]);

        // 获取对应期间的计划总数
        const [planDay, planWeek, planMonth, planYear] = await Promise.all([
            fetchPlanSumBetween(supabase, today, today, tunnelIds),
            fetchPlanSumBetween(supabase, startOfWeek, today, tunnelIds),
            fetchPlanSumBetween(supabase, startOfMonth, today, tunnelIds),
            fetchPlanSumBetween(supabase, startOfYear, today, tunnelIds),
        ]);

        return {
            ringCountOfDay: totalMaxRing - startDay,
            planCountOfDay: planDay,
            ringCountOfWeek: totalMaxRing - startWeek,
            planCountOfWeek: planWeek,
            ringCountOfMonth: totalMaxRing - startMonth,
            planCountOfMonth: planMonth,
            ringCountOfYear: totalMaxRing - startYear,
            planCountOfYear: planYear,
        };
    } catch (error) {
        console.error("fetchCardDataForTunnels Error:", error);
        throw new Error("Failed to fetch card data.");
    }
}
