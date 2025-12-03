

// import type { ThresholdRule } from "../types/ThresholdRule.js";

// export function computeWarningLevel(
//   v: number,
//   rule: ThresholdRule
// ) {
//   const { warning_low, warning_high, critical_low, critical_high, step } = rule;

//   // CRITICAL 区间（正方向）
//   if (critical_high !== null && v >= critical_high) {
//     return Math.floor((v - critical_high) / step);
//   }

//   // CRITICAL 区间（负方向）
//   if (critical_low !== null && v <= critical_low) {
//     return Math.floor((critical_low - v) / step);
//   }

//   // WARNING 区间（正方向）
//   if (warning_high !== null && v >= warning_high) {
//     return Math.floor((v - warning_high) / step);
//   }

//   // WARNING 区间（负方向）
//   if (warning_low !== null && v <= warning_low) {
//     return Math.floor((warning_low - v) / step);
//   }

//   return 0;
// }
