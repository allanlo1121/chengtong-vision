

import type { ActiveStaticState, Trend } from "@core/alarm/types/ActiveState.js";
import { ThresholdRule } from "../alarm/types/ThresholdRule.js";
/* ============================================================
 * 1. Event Data Types
 * ============================================================ */

export type EventSeverity = "normal" | "warning" | "critical";

export enum SeverityLevel {
    Normal = 0,
    Warning = 1,
    Critical = 2,
}


// 事件字段
export interface EventType {
    topic: string;
    tbmId: string;
    paramCode: string;
    ringNo?: number | null;
    value: number;
    timestamp: number;
    severity: SeverityLevel;
    level: number;
    trend?: Trend;
    dataQuality?: number;
    rule?: ThresholdRule | null;
    payload?: any;
    groupActives?: ActiveStaticState[];
}

