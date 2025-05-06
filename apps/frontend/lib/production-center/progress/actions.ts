"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const PlanSchema = z.object({
  tunnel_id: z.string().uuid(),
  plan_at: z.string().transform((val) => {
    // 允许日期为 "2025-05-01" 或完整 ISO 格式
    const d = new Date(val);
    if (isNaN(d.getTime())) throw new Error("无效日期格式");
    return d;
  }),
  plan_ring_count: z.coerce.number().int().min(0),
});

export async function confirmUploadCsvAction(data: any[]) {
  const validRows = [];
  for (const row of data) {
    const validated = PlanSchema.safeParse(row);
    if (validated.success) {
      validRows.push(validated.data);
    }
  }

  if (validRows.length === 0) {
    return { message: "⚠️ 没有解析出有效数据，请检查格式" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("tunnel_daily_plans")
    .upsert(validRows, {
      onConflict: "tunnel_id,plan_at",
    });

  if (error) {
    console.error("Supabase 插入失败:", error);
    return { message: "导入失败: " + error.message };
  }

  return { message: `✅ 成功导入 ${validRows.length} 条记录` };
}
