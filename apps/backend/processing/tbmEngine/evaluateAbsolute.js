/**
 * evaluateAbsolute
 * -----------------------------------------
 * 输入:
 *   - value: 清洗后的当前值（Spike 已处理）
 *   - definition: 阈值定义
 * 
 * definition 示例：
 * {
 *    ranges: {
 *       warning_low: -50,
 *       warning_high: 50,
 *       critical_low: -80,
 *       critical_high: 80
 *    }
 * }
 * 
 * 输出:
 * {
 *   severity: "normal" | "warning" | "critical",
 *   threshold: number | null,
 *   range: [low, high] | null
 * }
 */

export default function evaluateAbsolute(value, definition) {
    if (value === null || value === undefined) return null;
    if (!definition || !definition.ranges) return null;

    const {
        warning_low,
        warning_high,
        critical_low,
        critical_high,
    } = definition.ranges;

    let severity = "normal";
    let threshold = null;
    let range = null;

    // ----- Critical -----
    if (critical_low !== undefined && value < critical_low) {
        severity = "critical";
        threshold = critical_low;
        range = [critical_low, critical_high];
    } else if (critical_high !== undefined && value > critical_high) {
        severity = "critical";
        threshold = critical_high;
        range = [critical_low, critical_high];
    }

    // ----- Warning -----
    else if (warning_low !== undefined && value < warning_low) {
        severity = "warning";
        threshold = warning_low;
        range = [warning_low, warning_high];
    } else if (warning_high !== undefined && value > warning_high) {
        severity = "warning";
        threshold = warning_high;
        range = [warning_low, warning_high];
    }

    return { severity, threshold, range };
};
