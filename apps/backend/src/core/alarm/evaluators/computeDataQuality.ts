
import { DataQuality } from "../types/DataQuality";


/** 数据质量计算（鲁棒性处理） */
import { analyzeFluctuation } from "@utils/analyzeFluation.js";

/**
 * 数据质量判定（工业级鲁棒算法）
 */
export function computeDataQuality(
    value: number | null,
    window_data: number[]
): number {
    if (value == null) return DataQuality.Missing;
    if (!window_data || window_data.length < 3) return DataQuality.Normal;

    const analysis = analyzeFluctuation(window_data);
    const { hybridEnhanced } = analysis.metrics;
    const lastValue = window_data[window_data.length - 1];
    const diff = Math.abs(lastValue - value);

    /**
     * data quality 分三档：
     * 0 = Normal
     * 1 = Noisy（噪声明显但可用）
     * 2 = Outlier（强噪声、跳变、离群点）
     */
    let quality = DataQuality.Normal;

    // 1️⃣ 离群点判定（极高波动）
    if (hybridEnhanced > 50) quality = DataQuality.Outlier;

    // 2️⃣ 噪声判定
    if (hybridEnhanced > 15) quality = DataQuality.Noisy;

    // 3️⃣ 值突然偏离当前窗口波动均值
    if (diff > analysis.metrics.quantileRange * 0.8) {
        quality = DataQuality.Noisy;
    }

    return quality;
}