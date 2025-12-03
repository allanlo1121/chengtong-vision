// guidance-robust.ts
// ===============================================================
// 导向鲁棒分析模块
// ===============================================================


import { analyzeFluctuation } from "@utils/analyzeFluation"

import type { GuidanceWindowRecord } from "@/cache/realdataWindowCache";

export const CACHED_PARAMETERS = [
    "s100206003",   // rear_Y
    "s100206004",   // rear_X
    "s100206006",   // front_Y
    "s100206007",   // front_X
] as const;

export type GuidanceParam = typeof CACHED_PARAMETERS[number];

export interface GuidanceQualityConfig {
    suspiciousShift: number;   // meanShift ≥ suspicious
    badShift: number;          // meanShift ≥ bad
}

export const DEFAULT_GUIDANCE_CONFIG: GuidanceQualityConfig = {
    suspiciousShift: 20,
    badShift: 40
};

export type GuidanceParamResult = {
    paramCode: GuidanceParam;
    value: number | null;
    deltaValue: number | null;
    dataQuality: 'good' | "suspicious" | 'bad';
    message?: string;
}




export interface SeriesResult {
    value: number | null;
    count: number;
    MAD: number;
    stdRange: number;
    fluctuation: number;
    meanShift: number;
    series: number[];
}

export type GuidanceWindowResult = Record<GuidanceParam, SeriesResult>;

// ===============================================================
// 工具函数：分位数、MAD、Hybrid 波动算法
// ===============================================================



// ===============================================================
// 提取某个参数的 series
// ===============================================================
function extractSeries(records: GuidanceWindowRecord[], param: GuidanceParam): number[] {
    return records
        .map(r => r[param])
        .filter((v): v is number => typeof v === "number");
}

// ===============================================================
// 主流程：处理 4 个导向参数
// ===============================================================


export function runGuidanceRobustCheck(
    newPayload: Record<string, number>,
    windowData: GuidanceWindowRecord[],
    config: GuidanceQualityConfig = DEFAULT_GUIDANCE_CONFIG
): GuidanceParamResult[] {

    const results: GuidanceParamResult[] = [];

    for (const param of CACHED_PARAMETERS) {

        // === 原始最新值 ===
        const rawValue = newPayload[param];

        // === 提取窗口序列（包含新值）===
        const series = extractSeries(windowData, param);

        // === 鲁棒波动分析 ===
        const stats = analyzeFluctuation(series);
        const fluctuation = stats.metrics.hybridEnhanced;  // 波动值
        const meanShift = stats.metrics.meanShift;         // 当前值偏移

        // === 数据质量判断（可配置）===
        const absShift = Math.abs(meanShift);
        const dataQuality =
            absShift >= config.badShift
                ? "bad"
                : absShift >= config.suspiciousShift
                    ? "suspicious"
                    : "good";

        // === 推入最终结果 ===
        results.push({
            paramCode: param,
            value: rawValue,
            deltaValue: fluctuation,
            dataQuality: dataQuality,
            message: ""
        });
    }

    return results;
}


