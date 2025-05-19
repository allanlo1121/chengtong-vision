import { ITunnelProgressData } from "@/lib/project/progress/types";
import { createClient } from "@/utils/supabase/server";

const ITEMS_PER_PAGE = 20;

export async function fetchProgressByTunnelId(
  id: string
): Promise<ITunnelProgressData[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("tunnel_daily_progress")
      .select("id,tunnel_id,progress_at,plan_ring_count,ring_start,ring_end,op_num_start,op_num_end")
      .eq("tunnel_id", id) // 👈 tunnel_id匹配
      .order("progress_at", { ascending: false });

    if (error) throw error;
    if (!data) return [];

    const tunnelProgressData = data.map((item) => ({
      id: item.id,
      tunnel_id: item.tunnel_id,
      progress_at: item.progress_at,
      plan_ring_count: item.plan_ring_count,
      ring_start: item.ring_start,
      ring_end: item.ring_end,
      op_num_start: item.op_num_start,
      op_num_end: item.op_num_end,
    })) as ITunnelProgressData[];

    return tunnelProgressData;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch progress.");
  }
}

export async function fetchTunnelProgress(
  tunnelId: string,
  options?: { from?: Date; to?: Date }
): Promise<ITunnelProgressData[]> {
  const supabase = await createClient();

  const query = supabase
    .from("tunnel_daily_progress")
    .select(
      "id, tunnel_id, progress_at, plan_ring_count, ring_start, ring_end, op_num_start, op_num_end"
    )
    .eq("tunnel_id", tunnelId)
    .order("progress_at", { ascending: false});

  // 添加可选的日期范围过滤
  if (options?.from) {
    query.gte("progress_at", options.from.toISOString().split("T")[0]); // 转为 YYYY-MM-DD
  }
  if (options?.to) {
    query.lte("progress_at", options.to.toISOString().split("T")[0]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch tunnel progress:", error);
    throw new Error("进度数据获取失败");
  }

  return data ?? [];
}

export async function fetchFilterTunnelProgressPages(
  tunnelId: string,
  options?: { from?: Date; to?: Date }
): Promise<number> {
  const supabase = await createClient();

  const query = supabase
    .from("tunnel_daily_progress")
    .select("*", { count: "exact" })
    .eq("tunnel_id", tunnelId)
    .order("progress_at", { ascending: true });

  // 添加可选的日期范围过滤
  if (options?.from) {
    query.gte("progress_at", options.from.toISOString().split("T")[0]); // 转为 YYYY-MM-DD
  }
  if (options?.to) {
    query.lte("progress_at", options.to.toISOString().split("T")[0]);
  }

  const { count, error } = await query;

  if (error) {
    console.error("Failed to fetch tunnel progress:", error);
    throw new Error("进度数据获取失败");
  }
    if (!count) return 0; // 如果没有数据，返回 0

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    console.log("Total Pages:", totalPages); // 打印总页数
    return totalPages;
}


export async function fetchFilterTunnelProgress(
  tunnelId: string,
  currentPage: number,
  options?: { from?: Date; to?: Date }
): Promise<ITunnelProgressData[]> {
  const supabase = await createClient();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const query = supabase
    .from("tunnel_daily_progress")
    .select(
      "id, tunnel_id, progress_at, plan_ring_count, ring_start, ring_end, op_num_start, op_num_end"
    )
    .eq("tunnel_id", tunnelId)
    .range(offset, offset + ITEMS_PER_PAGE - 1) // 设置分页范围
    .order("progress_at", { ascending: false});

  // 添加可选的日期范围过滤
  if (options?.from) {
    query.gte("progress_at", options.from.toISOString().split("T")[0]); // 转为 YYYY-MM-DD
  }
  if (options?.to) {
    query.lte("progress_at", options.to.toISOString().split("T")[0]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch tunnel progress:", error);
    throw new Error("进度数据获取失败");
  }

  return data ?? [];
}
