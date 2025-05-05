import { createClient } from "@/utils/supabase/server";

const ITEMS_PER_PAGE = 20;

export async function fetchProgressByTunnelId(id: string): Promise<any> {
  const supabase = await createClient();
  try {
    // 查询员工信息，仅选择需要的字段，并按员工编号排序
    const { data, error } = await supabase
      .from("tbm_daily_report")
      .select("*")
      .eq("tunnel_id", id) // 👈 tunnel_id匹配
      .lte("report_date", new Date().toISOString().slice(0, 10)) // 从今天开始
      .gt(
        "report_date",
        new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString().slice(0, 10)
      ) // 未来30天
      .not("end_ring", "is", null) // end_ring 必须有值
      .order("report_date", { ascending: false });

    if (error) throw error;
    if (!data) throw new Error("tunnel not found.");

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}
