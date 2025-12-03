

// import { Severity } from "../types/Severity";
// import type { ThresholdRule } from "../types/ThresholdRule.js";


// export function computeSeverity(
//     v: number,
//     rule: ThresholdRule
// ): Severity {

//     const { warning_low, warning_high, critical_low, critical_high } = rule;

//     // critical 优先
//     if (critical_low !== null && v <= critical_low) return Severity.Critical;
//     if (critical_high !== null && v >= critical_high) return Severity.Critical;

//     // warning 次之
//     if (warning_low !== null && v <= warning_low) return Severity.Warning;
//     if (warning_high !== null && v >= warning_high) return Severity.Warning;

//     return Severity.Normal;
// }