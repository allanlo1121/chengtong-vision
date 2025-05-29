import { z } from "zod";

export interface ITunnelPlanData {
  tunnel_id: string;
  plan_at: string; // timestamp
  plan_ring_count: number | null; // 计划环数
  create_at?: string; // timestamp
}

export interface ITunnelProgressData {
  id: string;
  tunnel_id: string;
  progress_at: string; // timestamp
  plan_ring_count: number | null; // 计划环数
  ring_start: number | null; // 环开始
  ring_end: number | null; // 环结束
  op_num_start: number | null; // 开挖开始
  op_num_end: number | null; // 开挖结束
  create_at?: string; // timestamp
}

// ✅ 类型定义
export const TunnelProgressSchema = z.object({
  id: z.string().uuid(),
  progress_at: z.string().min(1),
  tunnel_id: z.string().uuid(),
  plan_ring_count: z.coerce.number().nullable(),
  ring_start: z.coerce.number().nullable(),
  ring_end: z.coerce.number().nullable(),
  op_num_start: z.coerce.number().nullable(),
  op_num_end: z.coerce.number().nullable(),
});

export type TypeTunnelProgressSchema = z.infer<typeof TunnelProgressSchema>;

export interface CardStats {
  tunnelCount: number;
  completedTunnelCount: number;
  ringCountOfWeek: number;
  ringCountOfMonth: number;
  ringCountOfYear: number;
}

export interface ITunnelProgressChartData {
  label: string;
  plan: number;
  completed: number;
}