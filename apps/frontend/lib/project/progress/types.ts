export interface ITunnelPlanData {
  tunnel_id: string;
  plan_at: string; // timestamp
  plan_ring_count: number | null; // 计划环数
  create_at?: string; // timestamp
}
