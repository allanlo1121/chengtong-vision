import { Database } from "@/lib/core/database/types";
import { Camelize } from "@/lib/utils/case-converter";

export type TbmDailyProgressRow = Database["eqp"]["Tables"]["tbm_daily_progress"]["Row"];

export type TbmDailyProgress = Camelize<TbmDailyProgressRow>;
export type TbmDailyProgressInsertRow = Database["eqp"]["Tables"]["tbm_daily_progress"]["Insert"];
export type TbmDailyProgressUpdateRow = Database["eqp"]["Tables"]["tbm_daily_progress"]["Update"];

export type TbmDailyProgressListRow = Database["eqp"]["Views"]["v_tbm_daily_progress"]["Row"];

export interface TbmDailyProgressListItem {
  id: string;
  tbmId: string | null;
  workDate: string;
  ringStart: number | null;
  ringEnd: number | null;
  planRingCount: number | null; // 可选，表示计划进度
  chainageStart: number | null;
  chainageEnd: number | null;
}
