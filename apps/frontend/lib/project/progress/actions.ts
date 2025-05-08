"use server";

import { z } from "zod";
import { generateDateRange } from "@/utils/dateFormat";
import { ITunnelProgressData } from "./types";
import {
  insertManyTunnelProgressData,
  updateTunnelProgressData,
} from "./mutations";

export async function initialTunnelProgressData(
  startDate: string,
  endDate: string,
  tunnelId: string
) {
  const dateRanges = generateDateRange(startDate, endDate);
  const progressInsertData: Omit<ITunnelProgressData, "id">[] = dateRanges.map(
    (d) => ({
      tunnel_id: tunnelId,
      progress_at: d.toISOString(),
      plan_ring_count: null,
      ring_start: null,
      ring_end: null,
      op_num_start: null,
      op_num_end: null,
    })
  );

  const data = insertManyTunnelProgressData(progressInsertData);
  console.log("插入进度数据", data);
  return data;
}

// ✅ 类型定义
const TunnelProgressSchema = z.object({
  id: z.string().uuid(),
  plan_ring_count: z.coerce.number().nullable(),
  ring_start: z.coerce.number().nullable(),
  ring_end: z.coerce.number().nullable(),
  op_num_start: z.coerce.number().nullable(),
  op_num_end: z.coerce.number().nullable(),
});

// ✅ server action，接收 formData，校验 + 更新
export async function updateTunnelProgressDataAction(
  prevState: any,
  formData: FormData
) {
  console.log("formData", formData);

  const raw = {
    id: formData.get("id"),
    plan_ring_count: formData.get("plan_ring_count"),
    ring_start: formData.get("ring_start"),
    ring_end: formData.get("ring_end"),
    op_num_start: formData.get("op_num_start"),
    op_num_end: formData.get("op_num_end"),
  };

  const parseResult = TunnelProgressSchema.safeParse(raw);

  if (!parseResult.success) {
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const { id, ...updateData } = parseResult.data;

  console.log("更新进度数据", id, updateData);

  updateTunnelProgressData({
    id,
    ...updateData,
  });

  return { success: true };
}
