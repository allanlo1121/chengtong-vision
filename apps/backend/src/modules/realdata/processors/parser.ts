// src/modules/realdata/processors/parser.ts

/**
 * RealdataParser
 * 负责：
 *  - JSON 转换
 *  - 字段名修正（如 s1002060010 → s100206010）
 *  - 强制类型转换
 */
export const RealdataParser = {
  /**
   * @param raw 来自 MQTT 的 JSON 对象
   */
  parse(raw: any): Record<string, any> {
    const output: Record<string, any> = {};

    for (const [key, value] of Object.entries(raw)) {
      let fixedKey = key;

      /* ============================================
       * 1. 修正类似 s1002060010 → s100206010 的问题
       * ============================================ */
      if (/^s\d{9,}$/.test(key)) {
        // 去除多出的一位 0
        fixedKey = fixParameterKey(key);
      }

      /* ============================================
       * 2. 数值字段统一转 number
       * ============================================ */
      if (typeof value === "string" && !isNaN(Number(value))) {
        output[fixedKey] = Number(value);
      } else {
        output[fixedKey] = value;
      }
    }

    return output;
  },
};

/** 修正 TBM 参数 key，比如 s1002060010 → s100206010 */
function fixParameterKey(key: string): string {
  // 若倒数第 5 位是 0 → 移除
  // s1002060010 → s100206010
  if (key.length === 11 && key.startsWith("s")) {
    return key.slice(0, 7) + key.slice(8);
  }
  return key;
}
