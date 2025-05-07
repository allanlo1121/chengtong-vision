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
