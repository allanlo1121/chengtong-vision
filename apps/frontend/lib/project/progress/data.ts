import { ITunnelProgressData } from "@/lib/project/progress/types";
import { createClient } from "@/utils/supabase/server";

export async function fetchProgressByTunnelId(
  id: string
): Promise<ITunnelProgressData[]> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("tunnel_daily_progress")
      .select("*")
      .eq("tunnel_id", id) // 👈 tunnel_id匹配
      .order("progress_at", { ascending: false });

    if (error) throw error;
    if (!data) throw new Error("tunnel not found.");

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
    throw new Error("Failed to fetch employees.");
  }
}
