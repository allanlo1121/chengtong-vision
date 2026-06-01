import { Database } from "@/lib/core/database/types";

export type TunnelDailyProgressRow = Database["public"]["Tables"]["tunnel_daily_progress"]["Row"];
export type TunnelDailyProgressInsertRow =
  Database["public"]["Tables"]["tunnel_daily_progress"]["Insert"];
export type TunnelDailyProgressUpdateRow =
  Database["public"]["Tables"]["tunnel_daily_progress"]["Update"];

export type TunnelDailyProgressView = Database["public"]["Views"]["v_tunnel_daily_progress"]["Row"];

export interface TunnelDailyProgressItem {
  id: string;
  tunnelId: string;
  tbmId: string | null;
  workDate: string;
  ringStart: number | null;
  ringEnd: number | null;
  planRingCount: number | null; // 可选，表示计划进度
  chainageStart: number | null;
  chainageEnd: number | null;
}
