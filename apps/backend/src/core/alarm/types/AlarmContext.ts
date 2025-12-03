
import type { ThresholdRule } from "./ThresholdRule.js";
import type { RealdataPayload } from "@/models/tbm/realdata.types.js";






/** 传入 evaluate 的上下文数据 */
export interface AlarmContext {
    tbmId: string;
    ringNo?: number | null;
    paramCode: string;
    rule: ThresholdRule;
    value: number;
    payload?: RealdataPayload;
    recentValues?: number[];
}
