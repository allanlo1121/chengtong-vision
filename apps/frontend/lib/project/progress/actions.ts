"use server";

import { z } from "zod";
import { generateDateRange } from "@/utils/dateFormat";
import { ITunnelProgressData,TunnelProgressSchema,TypeTunnelProgressSchema } from "./types";
import {
  insertTunnelProgressData,
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

const createProgress = TunnelProgressSchema.omit({ id: true });
const updateProgress = TunnelProgressSchema.omit({ tunnel_id: true, progress_at: true });

// ✅ server action，接收 formData，校验 + 更新
export async function createTunnelProgressDataAction(
  prevState: any,
  formData: FormData
) {
  console.log("formData", formData);

  const raw = {
    tunnel_id: formData.get("tunnel_id"),
    progress_at: formData.get("progress_at"),
    plan_ring_count: formData.get("plan_ring_count"),
    ring_start: formData.get("ring_start"),
    ring_end: formData.get("ring_end"),
    op_num_start: formData.get("op_num_start"),
    op_num_end: formData.get("op_num_end"),
  };

  const parseResult = createProgress.safeParse(raw);

  if (!parseResult.success) {
    return {
      success: false,
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const {
    tunnel_id,
    progress_at,
    plan_ring_count,
    ring_start,
    ring_end,
    op_num_start,
    op_num_end,
  } = parseResult.data;

  const inserDate:Omit<TypeTunnelProgressSchema, "id"> = {
    tunnel_id,
    progress_at,
    plan_ring_count,
    ring_start,
    ring_end,
    op_num_start,
    op_num_end,
  };

  console.log("新增进度数据", inserDate);

  await insertTunnelProgressData(inserDate); // 👈 记得 await

  return { success: true };
}

// ✅ server action，接收 formData，校验 + 更新
export async function updateTunnelProgressDataAction(
  prevState: any,
  formData: FormData
) {
 // console.log("formData", formData);

  const raw = {
    id: formData.get("id"),
    plan_ring_count: formData.get("plan_ring_count"),
    ring_start: formData.get("ring_start"),
    ring_end: formData.get("ring_end"),
    op_num_start: formData.get("op_num_start"),
    op_num_end: formData.get("op_num_end"),
  };

  const parseResult = updateProgress.safeParse(raw);

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
