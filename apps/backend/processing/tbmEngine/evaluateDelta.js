/**
 * evaluateDelta.js
 * -----------------------------------------
 * 历史窗口来自 historyStore（10 分钟）
 * 计算 max - min 的波动量 Δ
 * 
 * thresholdDefinition.thresholds:
 * {
 *    delta_warning: 10,
 *    delta_critical: 20
 * }
 * 
 * 返回:
 * {
 *    severity: "normal" | "warning" | "critical",
 *    deltaValue: number
 * }
 */

import historyStore from "./historyStore.js";

export default function evaluateDelta(tbmId, param, definition) {
    if (!definition || !definition.thresholds) return null;

    const { delta_warning, delta_critical } = definition.thresholds;
    const history = historyStore.getHistory(tbmId, param);

    if (!history || history.length < 2) {
        // 只有一条，无法比较波动
        return {
            severity: "normal",
            deltaValue: 0,
        };
    }

    // 从窗口计算 min / max
    let minValue = Infinity;
    let maxValue = -Infinity;

    for (const h of history) {
        if (h.value < minValue) minValue = h.value;
        if (h.value > maxValue) maxValue = h.value;
    }

    const deltaValue = maxValue - minValue;

    // ---- Critical ----
    if (delta_critical !== undefined && deltaValue > delta_critical) {
        return {
            severity: "critical",
            deltaValue,
        };
    }

    // ---- Warning ----
    if (delta_warning !== undefined && deltaValue > delta_warning) {
        return {
            severity: "warning",
            deltaValue,
        };
    }

    return {
        severity: "normal",
        deltaValue,
    };
};
