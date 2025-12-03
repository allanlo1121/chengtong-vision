

import type { RealdataPayload } from "@/models/tbm/realdata.types.js";
import { ThresholdRule } from "../types/ThresholdRule.js";

export enum Trend {
    Rising = "rising",     // 上升
    Falling = "falling",   // 下降
    Stable = "stable"      // 平稳
}



/** Active 表字段类型 */
export interface ActiveStaticState {
    id?: string;
    tbm_id: string;
    ring_no?: number | null;
    param_code: string;
    severity: number;
    level: number;
    trend?: Trend;
    data_quality: number;
    value: number;
    rule?: ThresholdRule | null;
    payload: RealdataPayload | null;

}

