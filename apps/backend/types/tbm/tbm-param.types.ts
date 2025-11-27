export type Severity = "normal" | "warning" | "critical";

/**
 * TBM 参数名（未来可以改为 enum 或从数据库生成）
 */
export type TbmParamCode = string;

/**
 * 参数基值（原始值 + 清洗后值）
 */
export interface TbmParamValue {
  param: TbmParamCode;
  value: number;
  ts: number;
}
