// import { Severity } from "../types/Severity.js";
// import type { ThresholdRule } from "../types/ThresholdRule.js";

// export function computeAlarmLevel(
//     v: number | null | undefined,
//     rule: ThresholdRule
// ): { severity: number; level: number } {

//     const {
//         warning_low,
//         warning_high,
//         critical_low,
//         critical_high,
//         step,
//     } = rule;

//     // ⭐ 1) 无效数值 → Normal
//     if (v == null || Number.isNaN(v)) {
//         return { severity: Severity.Normal, level: 0 };
//     }

//     // -------------------------
//     // 1. 正向 critical
//     // -------------------------
//     if (critical_high !== null && v >= critical_high) {
//         const level = Math.floor((v - critical_high) / step);
//         return { severity: Severity.Critical, level: level };
//     }

//     // -------------------------
//     // 2. 反向 critical
//     // -------------------------
//     if (critical_low !== null && v <= critical_low) {
//         const level = Math.floor((critical_low - v) / step);
//         return { severity: Severity.Critical, level: level };
//     }

//     // -------------------------
//     // 3. 正向 warning
//     // -------------------------
//     if (warning_high !== null && v >= warning_high) {
//         const level = Math.floor((v - warning_high) / step);
//         return { severity: Severity.Warning, level: level };
//     }

//     // -------------------------
//     // 4. 反向 warning
//     // -------------------------
//     if (warning_low !== null && v <= warning_low) {
//         const level = Math.floor((warning_low - v) / step);
//         return { severity: Severity.Warning, level: level };
//     }

//     // -------------------------
//     // 5. normal
//     // -------------------------

//     return { severity: Severity.Normal, level: 0 };
// }
