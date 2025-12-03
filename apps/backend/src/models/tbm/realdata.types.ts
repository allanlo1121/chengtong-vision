// 只缓存关心的参数（可配置）
export const CACHED_PARAMETERS = new Set<string>([
    "s100206003",   // rear_Y
    "s100206004",   // rear_X
    "s100206006",   // rear_Y
    "s100206007",   // rear_X
]);

// 窗口大小：10 分钟
export const WINDOW_MS = 10 * 60 * 1000;

// 单条缓存记录（只含 ts + 关心的参数）
export interface RealdataRecord {
    ts: number;
    [paramCode: string]: number | null;
}


export interface ParameterMetadata {
    id: string;
    code: string;
    name: string;
    unit: string | null;
    group_code: string | null;
    group_name: string | null;

    subsystem_id: string | null;
    subsystem_code: string | null;
    subsystem_name: string | null;
}


export interface RealdataPayload {
    tbm_id: string; // 必须字段

    // 动态字段，可无限扩展，不限制命名
    [paramCode: string]: number | string | boolean | null;
}